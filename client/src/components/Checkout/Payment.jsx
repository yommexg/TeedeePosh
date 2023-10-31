import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { arrayBufferToBase64, FormatPrice } from "../../utils";
import { useAuth, useCountries, useProduct } from "../../hooks";

import { initiatePaymentWithPaystack } from "./PaymentService";

const Payment = ({ setStep }) => {
  const { email, userName, phoneNumber } = useAuth();
  const { selectedCountry, selectedState, selectedlocalGovt, homeAdress } =
    useCountries();

  const formattedAddress = `${homeAdress}, ${selectedlocalGovt}, ${selectedState}, ${selectedCountry}`;

  const { totalPrice, cartItems } = useProduct();

  const [paymentUrl, setPaymentUrl] = useState("");

  const handleInitiatePaymentPaystack = async () => {
    const formattedTotalPrice = parseFloat(totalPrice.toFixed(2));
    console.log(formattedTotalPrice);

    try {
      const url = await initiatePaymentWithPaystack(
        formattedTotalPrice * 100,
        email
      );
      setPaymentUrl(url);
    } catch (error) {
      // Handle error
      console.error("Error initiating Paystack payment:", error);
    }
  };

  return (
    <div className="checkout-container">
      <FaArrowLeft onClick={() => setStep(1)} className="goback" />
      <div className="payment-cart-container">
        {cartItems.map((item, index) => (
          <div className="payment-cart-items">
            <img
              src={`data:${
                item?.productImg[0].contentType
              };base64,${arrayBufferToBase64(item?.productImg[0].data.data)}`}
              height={60}
              width={60}
              alt={item?.name}
            />
            <div>
              <h5 onClick={() => console.log(item)}>
                Name: <span>{item.name}</span>
              </h5>

              <h5>Size: {item?.selectedproductSize}</h5>
              <h5>
                Price:
                <span> {FormatPrice(item?.discountedPrice)}</span>
              </h5>
              <h5>
                Quantity: {item?.selectedProductQuantity}({" "}
                {FormatPrice(
                  item?.discountedPrice * item?.selectedProductQuantity
                )}
                )
              </h5>
            </div>
          </div>
        ))}
      </div>
      <div className="payment-address-container">
        <h4>Item(s) will be shipped to the address below: </h4>
        {formattedAddress}
      </div>
      <div className="payment-contact">
        <p>Name: {userName}</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
      </div>
      <button
        onClick={handleInitiatePaymentPaystack}
        className="paystack-button"
      >
        Pay Now ({FormatPrice(totalPrice)})
      </button>
      {paymentUrl && (
        <a
          style={{ color: "navy", textDecoration: "underline" }}
          href={paymentUrl}
        >
          Proceed to Payment
        </a>
      )}
    </div>
  );
};

export default Payment;
