import React from "react";
import { Tabs } from "antd";

const Menu = (props) => {
  const onChange = (key) => {
    props.setStatus(key);
  };

  const items = [
    {
      label: "Tất cả",
      key: "",
    },
    {
      label: "Chờ thanh toán",
      key: "confirmed",
    },
    {
      label: "Vận chuyển",
      key: "processing",
    },
    {
      label: "Chờ giao hàng",
      key: "shipped",
    },

    {
      label: "Hoàn thành",
      key: "delivered",
    },
    {
      label: "Đã hủy",
      key: "canceled",
    },
    {
      label: "Trả hàng",
      key: "returned",
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default Menu;
