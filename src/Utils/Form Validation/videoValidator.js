export const validateVideoArray = (filearray) => {
  if (filearray.length === 0) {
    return true;
  } else if (
    filearray.filter(
      (video) =>
        video?.type !== "video/mp4" &&
        video?.type !== "video/3gpp " &&
        video?.type !== "video/webp"
    ).length !== 0
  ) {
    return "Only .mp4,3gp files are allowed";
  } else if (filearray.length > 5) {
    return "Only up to 5 Videos Allowed";
  }
  return true;
};
