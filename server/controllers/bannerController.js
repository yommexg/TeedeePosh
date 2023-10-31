const Banner = require("../model/Banner");
const User = require("../model/User");
const fs = require("fs");

const handleGetBanner = async (req, res) => {
  const banner = await Banner.findOne();
  if (!banner) return res.status(204).json({ message: "No banner found" });
  res.json(banner);
};

const handleNewBanner = async (req, res) => {
  const {
    userId,
    discount,
    contentType,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    buttonText,
    details,
    productId,
    filename,
  } = req.body;

  const bannerNewImg = {
    data: fs.readFileSync("bannerImgUploads/" + req?.file.filename),
    contentType,
  };
  const bannerImg = {
    data: fs.readFileSync("productsImgUploads/" + filename),
    contentType,
  };

  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (user) {
      const banner = await Banner.findOne();
      if (!banner) {
        Banner.create({
          desc: details,
          discount,
          largeText1,
          largeText2,
          saleTime,
          smallText,
          midText,
          buttonText,
          bannerImg: bannerNewImg,
          productId,
        });
      }
      banner.smallText = smallText;
      banner.largeText1 = largeText1;
      banner.largeText2 = largeText2;
      banner.midText = midText;
      banner.saleTime = saleTime;
      banner.buttonText = buttonText;
      banner.desc = details;
      banner.bannerImg = bannerImg;
      banner.productId = productId;
      banner.discount = discount;
      await banner.save();
      res.status(201).json({ success: `New Banner created` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleGetBanner, handleNewBanner };
