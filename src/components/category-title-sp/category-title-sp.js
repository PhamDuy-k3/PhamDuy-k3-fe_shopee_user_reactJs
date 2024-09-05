import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getCategoryItems = (t) => [
  {
    key: "1",
    icon: <MailOutlined />,
    label: t("side bar.Men_Clothing"),
    children: [
      { key: "11", label: t("side bar.Shirts"), link: "/mens/shirts" },
      { key: "12", label: t("side bar.Pants"), link: "/mens/pants" },
      { key: "13", label: t("side bar.Jackets"), link: "/mens/jackets" },
      { key: "14", label: t("side bar.Suits"), link: "/mens/suits" },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: t("side bar.Women_Clothing"),
    children: [
      { key: "21", label: t("side bar.Dresses"), link: "/womens/dresses" },
      { key: "22", label: t("side bar.Skirts"), link: "/womens/skirts" },
      { key: "23", label: t("side bar.Blouses"), link: "/womens/blouses" },
      { key: "24", label: t("side bar.Coats"), link: "/womens/coats" },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: t("side bar.Accessories"),
    children: [
      { key: "31", label: t("side bar.Hats"), link: "/accessories/hats" },
      { key: "32", label: t("side bar.Bags"), link: "/accessories/bags" },
      { key: "33", label: t("side bar.Belts"), link: "/accessories/belts" },
      { key: "34", label: t("side bar.Scarves"), link: "/accessories/scarves" },
    ],
  },
];

const CategoryTitleSp = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const { t } = useTranslation(["product"]);

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
        {getCategoryItems(t).map((category) => (
          <Menu.SubMenu
            key={category.key}
            icon={category.icon}
            title={category.label}
          >
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
