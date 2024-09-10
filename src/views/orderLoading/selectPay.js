import React from "react";
import { Select, Space } from "antd";

const SelectPay = ({ setPay }) => {
  const handleChange = (value) => {
    setPay(value); // Gọi setPay với giá trị mới
  };

  return (
    <Space wrap>
      <Select
        defaultValue="2"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "1", label: "Thanh toán momo" },
          { value: "2", label: "Thanh toán khi nhận hàng (COD)" },
        ]}
      />
    </Space>
  );
};

export default SelectPay;
