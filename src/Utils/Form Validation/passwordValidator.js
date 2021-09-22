export const validatePassword = (password) => {
  if (password === "") {
    return "This field is Required";
  } else if (password.length < 8) {
    return "Password must have atleast 8 characters";
  }
  return true;
};

export const matchPasswords = (password, confirmpassword) => {
  if (!(password.toString().normalize() === confirmpassword.normalize())) {
    return "Passwords don't Match";
  }
  return true;
};
