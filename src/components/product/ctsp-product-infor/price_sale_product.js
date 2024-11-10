import React, { useEffect, useState } from "react";
import { VND } from "../../VND/vnd";
import { memo } from "react";
function PriceSaleProduct({
  setSale,
  sale,
  isTimeUp,
  priceSaleFormatted,
  setPriceSaleFormatted,
  product,
}) {
  const [cost, setCost] = useState(0);
  const discount = product?.discount || 0;
  const price = product?.prices || 0;

  useEffect(() => {
    setCost(price);
    if (isTimeUp === true) {
      setSale(discount);
    } else {
      setSale(discount + 10);
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

      <p className="sale_discount" style={{ marginLeft: "1rem" }}>
        <span>{discount}</span>% GIẢM
      </p>
      {isTimeUp === false ? (
        <p className="sale_flastsale">
          <span>{"10"}</span>% FLASTSALE
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(PriceSaleProduct);
