export const generalValidator = (value) => {
  if (value === "") {
    return "This field Is Required";
  }
  return true;
};
