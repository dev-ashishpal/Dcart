export const formatDate = (timestamp) => {
  const formatMonth = [
    "Jan",
    "Feb",
    "Mar",
	"Apr",
	"May",
    "June",
    "July",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(Number(timestamp) * 1000);
  const day = date.getDate();
  // const mon = date.getMonth();
  const month = formatMonth[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
