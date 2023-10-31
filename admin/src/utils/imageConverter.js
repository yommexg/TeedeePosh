import arrayBufferToBase64 from "./arrayBuffertobase64";

export const convertImagesToBase64 = (items, categoryImg, brandImg) => {
  return items.map((item) => {
    const ID = item._id;
    const name = item.categoryName || item.brandName || item.name;
    const imageData =
      item[categoryImg]?.data?.data ||
      item[brandImg]?.data?.data ||
      item.productImg[0]?.data?.data;
    const type =
      item[categoryImg]?.contentType ||
      item[brandImg]?.contentType ||
      item.productImg[0]?.contentType;
    const filename =
      item[categoryImg]?.filename ||
      item[brandImg]?.filename ||
      item.productImg[0]?.filename;
    const base64Image = arrayBufferToBase64(imageData);
    return { ID, name, base64Image, type, imageData, filename };
  });
};
