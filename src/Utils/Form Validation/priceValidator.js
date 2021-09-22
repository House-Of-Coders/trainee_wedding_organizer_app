export const validatePrice = (price) => {
  if (price === "") {
    return " This field is Required";
  }
  return true;
};
