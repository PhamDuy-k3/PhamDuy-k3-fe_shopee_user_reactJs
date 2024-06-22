import React, { useState } from "react";
import { Menu } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

function getCategoryItems() {
  return [
    {
      key: "1",
      icon: <MailOutlined />,
      label: "Men's Clothing",
      children: [
        { key: "11", label: "Shirts", link: "/mens/shirts" },
        { key: "12", label: "Pants", link: "/mens/pants" },
        { key: "13", label: "Jackets", link: "/mens/jackets" },
        { key: "14", label: "Suits", link: "/mens/suits" }
      ]
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Women's Clothing",
      children: [
        { key: "21", label: "Dresses", link: "/womens/dresses" },
        { key: "22", label: "Skirts", link: "/womens/skirts" },
        { key: "23", label: "Blouses", link: "/womens/blouses" },
        { key: "24", label: "Coats", link: "/womens/coats" }
      ]
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Accessories",
      children: [
        { key: "31", label: "Hats", link: "/accessories/hats" },
        { key: "32", label: "Bags", link: "/accessories/bags" },
        { key: "33", label: "Belts", link: "/accessories/belts" },
        { key: "34", label: "Scarves", link: "/accessories/scarves" }
      ]
    }
  ];
}

const CategoryTitleSp = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  const onOpenChange = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  return (
    <div className="category-title-sp col-2 ">
      <Menu
        mode="inline"
        defaultSelectedKeys={["11"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ width: 200 }}
      >
        {getCategoryItems().map((category) => (
          <Menu.SubMenu key={category.key} icon={category.icon} title={category.label}>
            {category.children.map((item) => (
              <Menu.Item key={item.key}>
                <NavLink to={item.link}>{item.label}</NavLink>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
      {/* <SearchFilters /> */}
    </div>
  );
};

export default CategoryTitleSp;
