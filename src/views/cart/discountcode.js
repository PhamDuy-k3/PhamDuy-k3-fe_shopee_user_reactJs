import "./scssCart/styleCart.scss";
import { useCallback, useEffect, useState } from "react";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";
import axios from "axios";
import { useCookies } from "react-cookie";

const DiscountCode = (props) => {
  const [discountcodes, setDiscountcode] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [cookies] = useCookies();

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
        setDiscountcode(response.data.data);
      } else {
        setDiscountcode([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [cookies.user_token]);

  const calculateDiscount = () => {
    const selectedDiscountData = discountcodes.filter((item) =>
      props.selectedDiscountCodes.includes(item.voucher_id.code)
    );
    const fixedValues = [];
    const percentageValues = [];

    selectedDiscountData.forEach((item) => {
      if (item.voucher_id.discountType === "fixed") {
        fixedValues.push(item.voucher_id.discountValue);
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
    if (props.selectedDiscountCodes.includes(code)) {
      props.setSelectedDiscountCodes(
        props.selectedDiscountCodes.filter((item) => item !== code)
      );
    } else {
      props.setSelectedDiscountCodes([...props.selectedDiscountCodes, code]);
    }
  };

  const choeseDiscountcode = () => {
    calculateDiscount();
    setIsDisplay(false);
  };

  return (
    <>
      {isDisplay && <FlyZoom />}

      <div className="d-flex" id="discountCode">
        <p>Shopee Voucher</p>
        <p onClick={handelIsDisplay}>Chọn hoặc nhập mã</p>
      </div>

      {isDisplay && (
        <div id="DiscountCode">
          <p style={{ fontSize: "1.5rem" }}>Chọn Shopee Voucher</p>
          <div id="items-discount-code">
            {discountcodes.length > 0 ? (
              discountcodes.map((discountcode, index) => (
                <div
                  onClick={() => {
                    if (discountcode.voucher_id.minOrderValue <= props.total) {
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
                  <div className="info-shop col-4">
                    <div className="dots-dis">
                      {[...Array(11)].map((_, i) => (
                        <div className="dot-dis"></div>
                      ))}
                    </div>
                    <img
                      src={discountcode.voucher_id.logoShop}
                      alt={`${discountcode.voucher_id.shopName} logo`}
                    />
                    <p>{discountcode.voucher_id.shopName}</p>
                    <div id="triangle-left"></div>
                  </div>
                  <div className="detail-code col-8">
                    <p>
                      Giá: {discountcode.voucher_id.discountValue}
                      <span>
                        {discountcode.voucher_id.discountType === "fixed"
                          ? "k"
                          : "%"}
                      </span>
                    </p>
                    <p>
                      Đơn tối thiểu: {discountcode.voucher_id.minOrderValue}
                    </p>
                    <div className="d-flex">
                      <p>Đã dùng: {discountcode.voucher_id.usedPercentage}%</p>
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
                        checked={props.selectedDiscountCodes.includes(
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
