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

const Cart = () => {
  const cartRef = useRef();
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

  const { handleShowLogin, showLogin } = useLogged();

  const handleCartProceed = () => {
    if (userId) {
      setCheckout(true);
    } else {
      handleShowLogin();
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
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

        {cartItems?.length >= 1 ? (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "40%",
                        padding: 12,
                      }}
                    >
                      Description
                    </th>
                    <th style={{ width: "17%" }}>Size</th>
                    <th style={{ width: "17%" }}>Quantity</th>
                    <th style={{ width: "11%" }}>Remove</th>
                    <th style={{ width: "15%" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="cart-product-image-container">
                        <img
                          src={`data:${
                            item?.productImg[0].contentType
                          };base64,${arrayBufferToBase64(
                            item?.productImg[0].data.data
                          )}`}
                          height={60}
                          width={60}
                          alt={item?.name}
                        />
                        <div>
                          <p>
                            Name: <span>{item.name}</span>
                          </p>
                          <h5>
                            ProductID: <span>{item._id}</span>
                          </h5>
                          <h6>
                            Price:{" "}
                            <span>{FormatPrice(item?.discountedPrice)}</span>
                          </h6>
                        </div>
                      </td>
                      <td className="cart-item-size">
                        {item?.selectedproductSize}
                      </td>
                      <td className="cart-item-quantity-container">
                        <AiFillMinusCircle
                          size={16}
                          color="lightpink"
                          className="quan-icon"
                          onClick={() => decreaseQty(item)}
                        />
                        <span>{item?.selectedProductQuantity}</span>
                        <AiFillPlusCircle
                          size={16}
                          color="lightgreen"
                          className="quan-icon"
                          onClick={() => increaseQty(item)}
                        />
                      </td>
                      <td className="cart-item-remove">
                        <TiDeleteOutline
                          size={18}
                          color="red"
                          className="remove-icon"
                          onClick={() => onRemove(item)}
                        />
                      </td>
                      <td className="cart-item-price">
                        {FormatPrice(
                          item?.discountedPrice * item?.selectedProductQuantity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-bottom-container">
              <Link to="/">
                <button onClick={handleShowCart}>Go to Home Page</button>
              </Link>
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

export default Cart;
