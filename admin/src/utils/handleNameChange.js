export const handleNameChange = ({
  e,
  setItemName,
  setItemNameChange,
  brand,
  category,
}) => {
  const inputValue = e.target.value;
  setItemName(inputValue);
  if (category) {
    setItemNameChange(inputValue !== category.categoryName);
  } else {
    setItemNameChange(inputValue !== brand.brandName);
  }
};
