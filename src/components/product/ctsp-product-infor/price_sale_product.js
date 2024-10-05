import React, { useEffect, useState } from "react";
import { VND } from "../../VND/vnd";

function PriceSaleProduct({
  priceSaleFormatted,
  setPriceSaleFormatted,
  product,
}) {
  const [sale, setSale] = useState(10);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const price = product?.prices || 0;
    const discount = product?.discount || 0;
    setCost(price);
    setSale(discount);
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
      <p>
        <span className="sale">{sale}</span>% GIẢM
      </p>
    </div>
  );
}

export default PriceSaleProduct;
