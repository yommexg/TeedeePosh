import axios from "../../api/axios";

const PAY_WITH_PAYSTACK_URL = "/payment/paystack";
const PAY_WITH_FLUTTERWAVE_URL = "/payment/flutterwave";

const initiatePaymentWithFlutterwave = async (
  amount,
  email,
  userId,
  phoneNumber,
  userName
) => {
  try {
    const response = await axios.post(PAY_WITH_FLUTTERWAVE_URL, {
      amount,
      email,
      redirect_url: "http://localhost:3000/success",
      userId,
      phoneNumber,
      userName,
    });

    return response.data.data.link;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Payment initiation failed");
  }
};

const initiatePaymentWithPaystack = async (amount, email) => {
  try {
    const response = await axios.post(
      PAY_WITH_PAYSTACK_URL,
      {
        amount,
        email,
        callback_url: "http://localhost:3000/success",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data.authorization_url;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Payment initiation with Paystack failed");
  }
};

export { initiatePaymentWithFlutterwave, initiatePaymentWithPaystack };
