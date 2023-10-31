export const handleExistImage = ({ item, categoryImg, brandImg }) => {
  const imageData = item[categoryImg]?.data?.data || item[brandImg]?.data?.data;
  const type = item[categoryImg]?.contentType || item[brandImg]?.contentType;
  const filename = item[categoryImg]?.filename || item[brandImg]?.filename;
  const uint8Array = new Uint8Array(imageData);
  const blob = new Blob([uint8Array]);
  const fileEdit = new File([blob], filename, {
    type,
  });

  return fileEdit;
};

export const handleArrayExistImage = ({ productImg }) => {
  return productImg.map((img) => {
    const uint8Array = new Uint8Array(img.data.data);
    const blob = new Blob([uint8Array]);
    const fileEdit = new File([blob], img.filename, {
      type: img.contentType,
    });
    return fileEdit;
  });
};

export const handleSelectProductImage = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return null; // You might want to handle the case where selectedProduct is undefined
  }

  const uint8Array = new Uint8Array(selectedProduct?.imageData);
  const blob = new Blob([uint8Array]);

  const fileEdit = new File([blob], selectedProduct?.filename, {
    type: selectedProduct?.type,
  });

  return fileEdit;
};
