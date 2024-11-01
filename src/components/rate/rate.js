import React from "react";
import { Rate } from "antd";

const Rates = ({ setValueRate ,valueRate }) => {
  const handle = (value) => {
    setValueRate(value);
  };
  return <Rate defaultValue={valueRate} onChange={(value) => handle(value)} />;
};

export default Rates;
