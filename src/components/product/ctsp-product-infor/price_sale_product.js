import React, { useEffect, useState } from "react";

function PriceSaleProduct({ priceSaleFormatted, setPriceSaleFormatted }) {
  const [sale, setSale] = useState(10);
  const [cost, setCost] = useState(100);
  //const [priceSaleFormatted, setPriceSaleFormatted] = useState("");

  useEffect(() => {
    const calculatePrice = () => {
      let price_sale = cost - cost * (sale / 100);

      const VND = new Intl.NumberFormat("vi-VN", {
        currency: "VND",
      });

      setCost(VND.format(cost * 1000));
      setPriceSaleFormatted(VND.format(price_sale * 1000));
    };
    calculatePrice();
  }, [sale, cost]);

  return (
    <>
      <div className="price d-flex">
        <p>
          <del>
            <sup>đ</sup>
            <span className="cost"> {cost}</span>
          </del>
        </p>
        <p>
          <sup>đ</sup>
          <span className="price-sale">{priceSaleFormatted}</span>
        </p>
        <p>
          <span className="sale">{sale}</span>% GIẢM
        </p>
      </div>
    </>
  );
}

export default PriceSaleProduct;
