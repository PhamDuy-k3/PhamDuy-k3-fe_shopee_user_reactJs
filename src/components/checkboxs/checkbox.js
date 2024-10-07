import React, { useEffect, useState } from "react";
import { Checkbox, Col, Row } from "antd";
import "./style.scss";
import { useCookies } from "react-cookie";

export default function CheckboxList({ setProductWithBrands }) {
  const [brands, setBrands] = useState([]);
  const [cookies, setCookies] = useCookies([]);

  const onChange = (checkedValues) => {
    setProductWithBrands(checkedValues);
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:5050/brands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data && data.data) {
        setBrands(data.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div>
      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Row className="d-flex flex-column float-left">
          {brands.map((brand) => (
            <Col key={brand._id}>
              <Checkbox value={brand._id}>{brand.name}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
}
