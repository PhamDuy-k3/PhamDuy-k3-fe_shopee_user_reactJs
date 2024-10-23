import React, { useEffect, useState } from "react";
import { VND } from "../../VND/vnd";

function PriceSaleProduct({
  isTimeUp,
  priceSaleFormatted,
  setPriceSaleFormatted,
  product,
}) {
  const [sale, setSale] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const price = product?.prices || 0;
    const discount = product?.discount || 0;
    setCost(price);
    if (isTimeUp !== true) {
      setSale(discount + 10);
    } else {
      setSale(discount);
    }
  }, [product]);

  useEffect(() => {
    const calculatePrice = () => {
      const price_sale = cost - cost * (sale / 100);
      setPriceSaleFormatted(price_sale);
    };

    calculatePrice();
  }, [cost, sale, setPriceSaleFormatted]);

  return (
    <div className="price d-flex">
      <p>
        <del>
          <sup>đ</sup>
          <span className="cost"> {VND.format(cost)}</span>
        </del>
      </p>
      <p>
        <sup>đ</sup>
        <span className="price-sale">{VND.format(priceSaleFormatted)}</span>
      </p>
      <p style={{ marginLeft: "1rem", paddingTop: "0.9rem" }}>
        <span className="sale">{sale - 10}</span>% GIẢM
      </p>
      <p>
        <span className="sale">{"10"}</span>% flast_sale
      </p>
    </div>
  );
}

export default PriceSaleProduct;
