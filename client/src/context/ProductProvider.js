import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { scrollToTop } from "../utils";
import { convertRangeToArray } from "../utils";
import { useContent } from "../hooks";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { banner } = useContent();

  const sizesArray = (size) => {
    return convertRangeToArray(size);
  };

  const DiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  const [productImageIndex, setproductImageIndex] = useState(0);
  const [productSizeIndex, setproductSizeIndex] = useState("");
  const [selectedproductSize, setSelectedproductSize] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [eachProductCartQuantity, setEachProductCartQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const handleProductImageSelect = (i) => {
    setproductImageIndex(i);
  };

  const handleProductSizeSelect = (i, size) => {
    setproductSizeIndex(i);
    setSelectedproductSize(size);
  };

  const handleProductReset = () => {
    setproductImageIndex(0);
    setproductSizeIndex("");
    setSelectedproductSize("");
    scrollToTop();
  };

  const handleSelectedProductQuantity = (e) => {
    const newSelectedNumber = parseInt(e.target.value);
    setSelectedProductQuantity(newSelectedNumber);
  };

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {}, [eachProductCartQuantity]);

  const handleAddtoCart = async (product) => {
    if (!selectedproductSize) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Please select your{" "}
          <span style={{ color: `var(--color-primary)`, fontWeight: 700 }}>
            {product?.category}
          </span>{" "}
          size
        </div>,
        {
          duration: 5000,
        }
      );
    } else {
      await onAdd(product);
      const existingEachProduct = eachProductCartQuantity.find(
        (prod) => prod.productID === product._id
      );

      if (existingEachProduct) {
        // Increase the quantity for the selected product
        existingEachProduct.selectedProductQuantity += selectedProductQuantity;
      } else {
        // The product doesn't exist ineachProductCartQuantity, add it
        const newProduct = {
          selectedProductQuantity,
          productID: product._id,
        };

        setEachProductCartQuantity((prev) => [...prev, newProduct]);
      }
    }
  };

  const onAdd = async (product) => {
    const bannerProduct = banner.productId === product?._id;

    let discountedPrice;

    if (bannerProduct) {
      discountedPrice = DiscountedPrice(product?.price, banner?.discount);
    } else {
      discountedPrice = DiscountedPrice(product?.price, product?.discount);
    }

    const existingEachProduct = eachProductCartQuantity.find(
      (prod) => prod.productID === product._id
    );

    if (
      (existingEachProduct &&
        existingEachProduct.selectedProductQuantity < product?.stock) ||
      !existingEachProduct
    ) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice + discountedPrice * selectedProductQuantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + selectedProductQuantity
      );

      const existingProduct = cartItems.find(
        (item) =>
          item._id === product._id &&
          item.selectedproductSize === selectedproductSize
      );

      if (existingProduct) {
        const updatedCartItems = cartItems.map((item) => {
          if (
            item._id === product._id &&
            item.selectedproductSize === selectedproductSize
          ) {
            return {
              ...item,
              selectedProductQuantity:
                item.selectedProductQuantity + selectedProductQuantity,
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        // No product with the same ID and size, add it to the cart
        setCartItems([
          ...cartItems,
          {
            ...product,
            selectedProductQuantity,
            discountedPrice,
            selectedproductSize,
          },
        ]);
      }
      toast.success(
        <div style={{ color: `var(--color-primary-variant)` }}>
          <span style={{ color: `var(--color-primary)`, fontWeight: 700 }}>
            {selectedProductQuantity} {product?.name}{" "}
          </span>{" "}
          with size{" "}
          <span style={{ color: `var(--color-primary)`, fontWeight: 700 }}>
            {" "}
            {selectedproductSize}
          </span>{" "}
          has been added to the cart
        </div>,
        {
          duration: 5000,
        }
      );
    } else {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Sorry, we dont have more than{" "}
          <span style={{ color: `var(--color-primary)`, fontWeight: 700 }}>
            {product?.stock} {product?.name}
          </span>{" "}
          availiable at the moment
        </div>,
        {
          duration: 5000,
        }
      );
    }

    setSelectedProductQuantity(1);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.selectedproductSize === product.selectedproductSize
    );

    const newCartItems = cartItems.filter((item) => {
      return (
        item.selectedproductSize !== product.selectedproductSize ||
        item._id !== product._id
      );
    });

    const bannerProduct = banner.productId === product?._id;

    let discountedPrice;

    if (bannerProduct) {
      discountedPrice = DiscountedPrice(foundProduct?.price, banner?.discount);
    } else {
      discountedPrice = DiscountedPrice(
        foundProduct?.price,
        foundProduct?.discount
      );
    }

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - discountedPrice * foundProduct.selectedProductQuantity
    );
    setTotalQuantities(
      (prevTotalQuantities) =>
        prevTotalQuantities - foundProduct.selectedProductQuantity
    );

    setCartItems(newCartItems);
    toast.success(
      <div style={{ color: "lightpink" }}>
        <span style={{ color: `var(--color-primary)`, fontWeight: 700 }}>
          {product?.name}
        </span>{" "}
        with size{" "}
        <span style={{ color: `var(--color-primary)`, fontWeight: 700 }}>
          {" "}
          {product.selectedproductSize}
        </span>{" "}
        removed from cart
      </div>,
      {
        duration: 3000,
      }
    );
  };

  const increaseQty = (product) => {
    const foundProduct = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.selectedproductSize === product.selectedproductSize
    );

    const bannerProduct = banner.productId === product?._id;

    let discountedPrice;

    if (bannerProduct) {
      discountedPrice = DiscountedPrice(foundProduct?.price, banner?.discount);
    } else {
      discountedPrice = DiscountedPrice(
        foundProduct?.price,
        foundProduct?.discount
      );
    }

    const updatedCartItems = cartItems.map((item) => {
      if (
        item._id === product._id &&
        item.selectedproductSize === product?.selectedproductSize
      ) {
        return {
          ...item,
          selectedProductQuantity: item.selectedProductQuantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setTotalQuantities((prev) => prev + 1);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + discountedPrice);
  };

  const decreaseQty = (product) => {
    const foundProduct = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.selectedproductSize === product.selectedproductSize
    );

    const bannerProduct = banner.productId === product?._id;

    let discountedPrice;

    if (bannerProduct) {
      discountedPrice = DiscountedPrice(foundProduct?.price, banner?.discount);
    } else {
      discountedPrice = DiscountedPrice(
        foundProduct?.price,
        foundProduct?.discount
      );
    }

    const updatedCartItems = cartItems.map((item) => {
      if (
        item._id === product._id &&
        item.selectedproductSize === product?.selectedproductSize
      ) {
        // Decrease the quantity by 1, but ensure it doesn't go below 1
        const newQuantity = Math.max(1, item.selectedProductQuantity - 1);

        return {
          ...item,
          selectedProductQuantity: newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    // Check if selectedProductQuantity is already 1
    if (product?.selectedProductQuantity === 1) {
    } else {
      // Decrease the total quantity by 1 if it's greater than 1
      setTotalQuantities((prev) => (prev > 1 ? prev - 1 : prev));

      const priceDecrease = discountedPrice;
      setTotalPrice((prevTotalPrice) => prevTotalPrice - priceDecrease);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productImageIndex,
        productSizeIndex,
        selectedProductQuantity,
        selectedproductSize,
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        eachProductCartQuantity,
        increaseQty,
        decreaseQty,
        sizesArray,
        DiscountedPrice,
        onRemove,
        handleAddtoCart,
        handleProductSizeSelect,
        handleProductImageSelect,
        handleProductReset,
        handleSelectedProductQuantity,
        handleShowCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
