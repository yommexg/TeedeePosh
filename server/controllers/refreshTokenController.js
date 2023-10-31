const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log("attempted refresh token reuse!");
        const hackedUser = await User.findOne({
          email: decoded.email,
        }).exec();
        hackedUser.refreshToken = [];
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    if (err) {
      console.log("expired refresh token");
      foundUser.refreshToken = [...newRefreshTokenArray];
      await foundUser.save();
    }
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    // Refresh token was still valid
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
          email: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10s" }
    );

    // const newRefreshToken = jwt.sign(
    //   { username: foundUser.username, email: foundUser.email },
    //   process.env.REFRESH_TOKEN,
    //   { expiresIn: "1d" }
    // );

    const newRefreshToken = jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email,
        _id: foundUser._id,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken }); // Return the new access token in the response
  });
};

module.exports = { handleRefreshToken };
