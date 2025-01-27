const getFormattedDate = () => {
  const date = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options); // Format: 24 Jan 2025
};

export default getFormattedDate;
