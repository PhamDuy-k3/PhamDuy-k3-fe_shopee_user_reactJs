import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckboxList from "../checkboxs/checkbox";

const getCategoryItems = (t) => [
  {
    key: "1",
    icon: <MailOutlined />,
    label: t("side bar.Men_Clothing"),
    children: [
      {
        key: "11",
        label: <NavLink to="/mens/shirts">{t("side bar.Shirts")}</NavLink>,
      },
      {
        key: "12",
        label: <NavLink to="/mens/pants">{t("side bar.Pants")}</NavLink>,
      },
      {
        key: "13",
        label: <NavLink to="/mens/jackets">{t("side bar.Jackets")}</NavLink>,
      },
      {
        key: "14",
        label: <NavLink to="/mens/suits">{t("side bar.Suits")}</NavLink>,
      },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: t("side bar.Women_Clothing"),
    children: [
      {
        key: "21",
        label: <NavLink to="/womens/dresses">{t("side bar.Dresses")}</NavLink>,
      },
      {
        key: "22",
        label: <NavLink to="/womens/skirts">{t("side bar.Skirts")}</NavLink>,
      },
      {
        key: "23",
        label: <NavLink to="/womens/blouses">{t("side bar.Blouses")}</NavLink>,
      },
      {
        key: "24",
        label: <NavLink to="/womens/coats">{t("side bar.Coats")}</NavLink>,
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: t("side bar.Accessories"),
    children: [
      {
        key: "31",
        label: <NavLink to="/accessories/hats">{t("side bar.Hats")}</NavLink>,
      },
      {
        key: "32",
        label: <NavLink to="/accessories/bags">{t("side bar.Bags")}</NavLink>,
      },
      {
        key: "33",
        label: <NavLink to="/accessories/belts">{t("side bar.Belts")}</NavLink>,
      },
      {
        key: "34",
        label: (
          <NavLink to="/accessories/scarves">{t("side bar.Scarves")}</NavLink>
        ),
      },
    ],
  },
];

const CategoryTitleSp = ({ setProductWithBrands }) => {
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
        items={getCategoryItems(t)} // Sử dụng thuộc tính items
      />
      <CheckboxList setProductWithBrands={setProductWithBrands} />
    </div>
  );
};

export default CategoryTitleSp;
