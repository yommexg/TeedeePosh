import "intl";
import "intl/locale-data/jsonp/en";

function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);

  return formattedPrice.replace("₦", "₦ ");
}

export default formatPrice;
