export const validateDate = (date) => {
  const selecteddate = new Date(date);
  if (date === "") {
    return "This field is Required";
  } else if (selecteddate < new Date()) {
    return "Please provide date in the Future";
  }
  return true;
};
