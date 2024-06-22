import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/img/qc_animation.png";
import "./style.scss";
import FlyZoom from "../product/ctsp-product-img/fly-zoom";
function Advertisement() {
  const adverTisement = useRef();
  const [isZoom, setIsZoom] = useState(true);

  
  const closeIsAdvertisement = () => {
    if (adverTisement.current) {
      adverTisement.current.style.display = "none";
      document.body.style.overflowY = "auto";
      setIsZoom(false);
      sessionStorage.setItem("advertisementClosed", "true");
    }
  };

  useEffect(() => {
    const isAdvertisementClosed = sessionStorage.getItem("advertisementClosed");
    // khi chưa close thì isAdvertisementClosed = false vì chưa setItem
    // thì nó chạy useEffect dưới 1 lần sau mouting
    // sau khi close thì isAdvertisementClosed = true nhận từ sessionStorage
    // và ko chạy code useEffect lần nào nữa
    console.log(isAdvertisementClosed);
    if (!isAdvertisementClosed) {
      let timeoutId;

      const displayAdvertisement = () => {
        if (adverTisement.current) {
          adverTisement.current.style.display = "block";
          document.body.style.overflowY = "hidden";
        }
      };

      timeoutId = setTimeout(() => {
        displayAdvertisement();
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <div
      ref={adverTisement}
      className="QC__Advertisement-box"
      style={{ display: "none" }}
    >
      {isZoom && <FlyZoom />}
      <div className="QC__Advertisement">
        <i onClick={closeIsAdvertisement} className="far fa-times-circle"></i>
        <img src={img} alt="Advertisement" />
      </div>
    </div>
  );
}

export default Advertisement;
