import "./scssCart/styleCart.scss";
import { useCallback, useEffect, useState } from "react";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { VND } from "../../components/VND/vnd";
import img_voucher from "../../assets/images/img/img_voucher.jpg";

const DiscountCode = (props) => {
  const [discountcodes, setDiscountcodes] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [cookies] = useCookies();
  const [discountcodeFreeShip, setDiscountcodeFreeShip] = useState({});
  const [discountcodeChoese, setDiscountcodeChoese] = useState([]);
  // Hàm lấy dữ liệu mã giảm giá
  const fetchUserVoucher = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5050/user_voucher", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      if (response.status === 200) {
        setDiscountcodes(response.data.data);
      } else {
        setDiscountcodes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [cookies.user_token]);

  const calculateDiscount = () => {
    const selectedDiscountData = discountcodes.filter((item) =>
      discountcodeChoese.includes(item.voucher_id.code)
    );
    const fixedValues = [];
    const percentageValues = [];
    const freeShips = [];

    selectedDiscountData.forEach((item) => {
      if (item.voucher_id.discountType === "fixed") {
        fixedValues.push(item.voucher_id.discountValue);
      } else if (item.voucher_id.discountType === "freeshipping") {
        freeShips.push([item.voucher_id.maxShippingFreeDiscount]);
      } else {
        percentageValues.push(item.voucher_id.discountValue);
      }
    });
    // lưu voucher đã chọn
    props.setValueVoucher(selectedDiscountData);

    // Tính tổng giảm giá
    const discountPercentage = percentageValues.reduce(
      (acc, curr) => acc + curr,
      0
    );
    const discountFixed = fixedValues.reduce((acc, curr) => acc + curr, 0);

    // Tính toán tổng tiền sau khi áp dụng mã giảm giá
    const totalDiscountPercentage = (props.total * discountPercentage) / 100;
    const totalDiscountFixed = discountFixed * 1000;

    let newTotal = props.total;

    if (percentageValues.length > 0 && fixedValues.length === 0) {
      newTotal -= totalDiscountPercentage;
    } else if (percentageValues.length === 0 && fixedValues.length > 0) {
      newTotal -= totalDiscountFixed;
    } else if (percentageValues.length > 0 && fixedValues.length > 0) {
      newTotal = newTotal - totalDiscountPercentage - totalDiscountFixed;
    }
    props.setTotalDiscountcode(newTotal);
  };

  useEffect(() => {
    fetchUserVoucher();
  }, [fetchUserVoucher]);

  const handelIsDisplay = () => {
    setIsDisplay(true);
  };

  document.body.style.overflowY = isDisplay ? "hidden" : "auto";

  const handleDiscountcode = (code) => {
    if (discountcodeChoese.includes(code)) {
      setDiscountcodeChoese(discountcodeChoese.filter((item) => item !== code));
    } else {
      setDiscountcodeChoese([...discountcodeChoese, code]);
    }
  };
  const handleDiscountcodeFreeShip = (code, maxShippingFee) => {
    if (discountcodeFreeShip.code === code) {
      setDiscountcodeFreeShip({});
    } else {
      setDiscountcodeFreeShip({ code, maxShippingFee });
    }
  };
  const choeseDiscountcode = () => {
    calculateDiscount();
    props.setSelectedDiscountCodesFreeShip(discountcodeFreeShip);
    props.setSelectedDiscountCodes(discountcodeChoese);
    setIsDisplay(false);
  };

  return (
    <>
      {isDisplay && <FlyZoom />}

      <div className="shop_voucher d-flex justify-content-between ">
        <div className="d-flex">
          <img src={img_voucher} alt="img_voucher" />
          <p>Shopee Voucher</p>
        </div>
        <p onClick={handelIsDisplay}>Chọn Voucher</p>
      </div>

      {isDisplay && (
        <div id="DiscountCode">
          <p style={{ fontSize: "1.5rem" }}>Chọn Shopee Voucher</p>

          {/* Mã freeship */}
          <div id="items-freeship">
            <p style={{ fontSize: "1.2rem" }}>Mã miễn phí vận chuyển</p>
            {discountcodes.length > 0 ? (
              discountcodes
                .filter(
                  (discountcode) =>
                    discountcode.voucher_id.discountType === "freeshipping"
                )
                .map((discountcode, index) => (
                  <div
                    onClick={() => {
                      if (
                        discountcode.voucher_id.minOrderValue <= props.total
                      ) {
                        handleDiscountcodeFreeShip(
                          discountcode.voucher_id.code,
                          discountcode.voucher_id.maxShippingFreeDiscount
                        );
                      }
                    }}
                    key={index}
                    className={`d-flex ${
                      discountcode.voucher_id.minOrderValue <= props.total &&
                      new Date(discountcode.voucher_id.expirationDate) >
                        new Date()
                        ? ""
                        : "disabled"
                    }`}
                  >
                    <div
                      style={{ backgroundColor: "#26AB9A" }}
                      className="info-shop col-4"
                    >
                      <div className="dots-dis">
                        {[...Array(11)].map((_, i) => (
                          <div className="dot-dis" key={i}></div>
                        ))}
                      </div>
                      <img
                        src={discountcode.voucher_id.logoShop}
                        alt={`${discountcode.voucher_id.shopName} logo`}
                      />
                      <p>{discountcode.voucher_id.shopName}</p>
                    </div>
                    <div className="detail-code col-8">
                      <p>
                        Giảm tối đa:{" "}
                        {VND.format(
                          discountcode.voucher_id.maxShippingFreeDiscount
                        )}
                      </p>
                      <p>
                        Đơn tối thiểu:{" "}
                        {VND.format(discountcode.voucher_id.minOrderValue)}
                      </p>
                      <div className="d-flex">
                        <p>
                          Đã dùng: {discountcode.voucher_id.usedPercentage}%
                        </p>
                        <p>
                          HSD:{" "}
                          {new Date(
                            discountcode.voucher_id.expirationDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="save">
                        <input
                          type="checkbox"
                          name="discount"
                          checked={
                            discountcodeFreeShip.code ===
                            discountcode.voucher_id.code
                          }
                          onChange={() =>
                            handleDiscountcodeFreeShip(
                              discountcode.voucher_id.code,
                              discountcode.voucher_id.maxShippingFreeDiscount
                            )
                          }
                        />
                      </p>

                      <p className="usageLimit">x{discountcode.quantity}</p>
                    </div>
                  </div>
                ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>
          {/* Danh sách mã giảm giá khác */}
          <div id="items-discount-code">
            <p style={{ fontSize: "1.2rem" }}>Giảm giá</p>
            {discountcodes.length > 0 ? (
              discountcodes
                .filter(
                  (discountcode) =>
                    discountcode.voucher_id.discountType !== "freeshipping"
                )
                .map((discountcode, index) => (
                  <div
                    onClick={() => {
                      if (
                        discountcode.voucher_id.minOrderValue <= props.total
                      ) {
                        handleDiscountcode(discountcode.voucher_id.code);
                      }
                    }}
                    key={index}
                    className={`d-flex ${
                      discountcode.voucher_id.minOrderValue <= props.total &&
                      new Date(discountcode.voucher_id.expirationDate) >
                        new Date()
                        ? ""
                        : "disabled"
                    }`}
                  >
                    <div
                      className="info-shop col-4"
                      style={
                        discountcode.voucher_id.discountType === "freeshipping"
                          ? { backgroundColor: "#26AB9A" }
                          : {}
                      }
                    >
                      <div className="dots-dis">
                        {[...Array(11)].map((_, i) => (
                          <div className="dot-dis" key={i}></div>
                        ))}
                      </div>
                      <img
                        src={discountcode.voucher_id.logoShop}
                        alt={`${discountcode.voucher_id.shopName} logo`}
                      />
                      <p>{discountcode.voucher_id.shopName}</p>
                    </div>
                    <div className="detail-code col-8">
                      {discountcode.voucher_id.discountType !==
                        "freeshipping" && (
                        <p>
                          Giảm: {discountcode.voucher_id.discountValue}
                          <span>
                            {discountcode.voucher_id.discountType === "fixed"
                              ? "k"
                              : "%"}
                          </span>
                        </p>
                      )}
                      <p>
                        Đơn tối thiểu:{" "}
                        {VND.format(discountcode.voucher_id.minOrderValue)}
                      </p>
                      <div className="d-flex">
                        <p>
                          Đã dùng: {discountcode.voucher_id.usedPercentage}%
                        </p>
                        <p>
                          HSD:{" "}
                          {new Date(
                            discountcode.voucher_id.expirationDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="save">
                        <input
                          type="checkbox"
                          name="discount"
                          checked={discountcodeChoese.includes(
                            discountcode.voucher_id.code
                          )}
                          onChange={() =>
                            handleDiscountcode(discountcode.voucher_id.code)
                          }
                        />
                      </p>
                      <p className="usageLimit">x{discountcode.quantity}</p>
                    </div>
                  </div>
                ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>

          <div id="action-discountcode">
            <p onClick={() => setIsDisplay(false)}>Trở lại</p>
            <p onClick={choeseDiscountcode}>Ok</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountCode;
