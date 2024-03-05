// function to format large numbers
function formatNumber(number) {
  const formattedNumber = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);

  return formattedNumber;
}

export default formatNumber;
