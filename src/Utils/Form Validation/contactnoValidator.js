export const validateContactNo = (contactno) => {
  const pattern = new RegExp(/^(0|(?:\+94))7[0,1,2,5,6,7,8]{1}[0-9]{7}$/);
  if (contactno === "") {
    return " This field is Required";
  } else if (!pattern.test(contactno)) {
    return " Please provide valid Contact Number";
  }
  return true;
};
