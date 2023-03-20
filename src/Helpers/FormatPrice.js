// const FormatPrice = ({ price }) => {
//   return Intl.NumberFormat("vi", {
//     style: "currency",
//     currency: "VND",
//     maximumFractionDigits: 3,
//   }).format(price / 10);
// };

const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(price / 0.1);
};

//   new Intl.NumberFormat('vi', {
//   style: 'currency',
//   currency: 'VND',
// });

export default FormatPrice;
