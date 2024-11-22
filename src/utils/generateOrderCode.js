export function generateOrderCode(storeCode) {
  // Lấy ngày hiện tại
  const now = new Date();
  const datePart = now
    .toISOString()
    .slice(2, 8)
    .replace(/-/g, ""); // '241116'

  // Mã cửa hàng (truyền vào từ tham số)
  const codePart = storeCode || "PDDCT";

  // Tạo chuỗi ngẫu nhiên 4 ký tự
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase(); // '5BWM'

  // Kết hợp thành mã đơn hàng
  return `${datePart}${codePart}${randomPart}`;
}
