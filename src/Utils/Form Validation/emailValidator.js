import validator from "validator";

export const validateEmail = (email) => {
  if (email === "") {
    return "This field is Required";
  } else if (!validator.isEmail(email)) {
    return "Please provide valid Email Address";
  }
  return true;
};
