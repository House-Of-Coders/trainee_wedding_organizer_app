export const validateDocument = (file) => {
  if (file === null) {
    return true;
  } else if (
    file?.type !== ".doc" &&
    file?.type !== ".docx" &&
    file?.type !== "application/pdf"
  ) {
    return "Only .doc /.docx /.pdf files are allowed";
  }
  return true;
};
