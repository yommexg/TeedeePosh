import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { useProduct, useLogged, useAuth, useCheckout } from "../../hooks";

import Login from "../Login/Login";

import logo from "../../assets/logo.jpg";
import name from "../../assets/name.jpg";
import cartImg from "../../assets/cart.jpg";

import { arrayBufferToBase64, FormatPrice } from "../../utils";

import "./Cart.css";

const CartSmall = () => {
  const cartRef = useRef();
  const { handleShowLogin, showLogin } = useLogged();
  const { userId } = useAuth();
  const { setCheckout } = useCheckout();

  const {
    totalQuantities,
    totalPrice,
    cartItems,
    handleShowCart,
    onRemove,
    increaseQty,
    decreaseQty,
  } = useProduct();
  const handleCartProceed = () => {
    if (userId) {
      setCheckout(true);
    } else {
      handleShowLogin();
    }
  };

  return (
    <div className="cart-small-wrapper" ref={cartRef}>
      <div className="cart-container">
        <div className="cart-headers">
          <AiOutlineLeft className="icon" onClick={handleShowCart} size={25} />
          <div className="cart-header-image-container">
            <div className="logo-container">
              <img src={logo} alt="logo" width={17} />
              <img src={name} alt="logo" width={80} />
            </div>
            <img src={cartImg} alt="Cart Items" width={22} />
          </div>
          <p>
            items(<span>{totalQuantities}</span>)
          </p>
        </div>
        {cartItems.length >= 1 ? (
          <>
            <div className="cart-small-product-details">
              {cartItems.map((item, index) => (
                <div className="cart-small-product" key={index}>
                  <div>
                    <img
                      src={`data:${
                        item?.productImg[0].contentType
                      };base64,${arrayBufferToBase64(
                        item?.productImg[0].data.data
                      )}`}
                      height={100}
                      width={80}
                      alt={item?.name}
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700 }}>{item?.name}</p>
                    <p style={{ fontSize: "9px", fontWeight: 100 }}>
                      {item?._id}
                    </p>
                    <p>Size: {item?.selectedproductSize}</p>

                    <div className="cart-item-quantity-container">
                      <div>
                        {" "}
                        <AiFillMinusCircle
                          size={21}
                          color="lightpink"
                          className="quan-icon"
                          onClick={() => decreaseQty(item)}
                        />
                        <span>Qty {item?.selectedProductQuantity}</span>
                        <AiFillPlusCircle
                          size={21}
                          color="lightgreen"
                          className="quan-icon"
                          onClick={() => increaseQty(item)}
                        />
                      </div>
                      <div className="cart-item-price">
                        {FormatPrice(
                          item?.discountedPrice * item?.selectedProductQuantity
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="cat-small-price-remove-container">
                    <div className="cart-item-remove">
                      <TiDeleteOutline
                        size={18}
                        color="red"
                        className="remove-icon"
                        onClick={() => onRemove(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-bottom-container">
              <div className="cart-total-price-container">
                <p>
                  Total Price: <span>{FormatPrice(totalPrice)}</span>
                </p>
                <button onClick={handleCartProceed}>Click to Proceed</button>
                {showLogin && <Login />}
              </div>
            </div>
          </>
        ) : (
          <div className="no-items-cart-container">
            <p>Oh No!</p>
            <p>Your bag is empty</p>
            <AiOutlineShopping size={120} color="red" />
            <Link to="/">
              <button onClick={handleShowCart}>Continue Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSmall;
