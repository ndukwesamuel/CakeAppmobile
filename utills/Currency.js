export const formatToCurrency = (number) => {
  if (!number && number !== 0) return "₦0.00"; // Handle cases where number is undefined or null
  let parts = number.toFixed(2).split("."); // Ensures there are always two decimal places
  let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format integer part with commas
  return `₦${integerPart}.${parts[1]}`; // Return formatted currency with Naira symbol
};