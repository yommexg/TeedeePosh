export const handleDrop = ({ e, setImage, setContentType }) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  setImage(files[0]);
  setContentType(files[0].type);
};

export const handleFileChange = ({ e, setImage, setContentType }) => {
  const files = e.target.files;
  setImage(files[0]);
  setContentType(files[0].type);
};

export const handleNullImage = ({ setImage, setContentType }) => {
  setImage(null);
  setContentType("");
};

export const handleEditDrop = ({
  e,
  setItemImage,
  setImageChange,
  setContentType,
  fileEdit,
}) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  setItemImage(files[0]);
  setImageChange(files[0] !== fileEdit);
  setContentType(files[0].type);
};

export const handleEditFileChange = ({
  e,
  setItemImage,
  setImageChange,
  setContentType,
  fileEdit,
}) => {
  const files = e.target.files;
  setItemImage(files[0]);
  setImageChange(files[0] !== fileEdit);
  setContentType(files[0].type);
};
