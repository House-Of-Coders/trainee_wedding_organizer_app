export const validateImage = (file) => {
  if (file === null) {
    return "Please select a Picture";
  } else if (
    file?.type !== "image/jpeg" &&
    file?.type !== "image/png" &&
    file?.type !== "image/jpg"
  ) {
    return "Only .jpg /.jpeg /.png files are allowed";
  }
  return true;
};

export const validateImageArray = (filearray) => {
  if (filearray.length === 0) {
    return "Please select atleast one Picture";
  } else if (
    filearray.filter(
      (image) =>
        image?.type !== "image/jpeg" &&
        image?.type !== "image/png" &&
        image?.type !== "image/jpg"
    ).length !== 0
  ) {
    return "Only .jpg /.jpeg /.png files are allowed";
  } else if (filearray.length > 5) {
    return "Only up to 5 Images Allowed";
  }
  return true;
};

export const validateEmptyImageArray = (filearray) => {
  if (filearray.length === 0) {
    return true;
  } else if (
    filearray.filter(
      (image) =>
        image?.type !== "image/jpeg" &&
        image?.type !== "image/png" &&
        image?.type !== "image/jpg"
    ).length !== 0
  ) {
    return "Only .jpg /.jpeg /.png files are allowed";
  } else if (filearray.length > 5) {
    return "Only up to 5 Images Allowed";
  }
  return true;
};
