import React, { useEffect, useState } from "react";
import banner from "../../assets/images/img/voucher/voucher.jpg";
import huntvoucher from "../../assets/images/img/voucher/san_voucher.jpg";
import "./style.scss";
import ComponentHeader from "../../components/header/header";
import axios from "axios";
import { VND } from "../../components/VND/vnd";
import Footer from "../../components/footer/footer";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addvoucherimg from "../../assets/images/img/voucher/add_voucher.jpg";
export default function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [cookies] = useCookies();
  const [ids_voucher, setIdsVoucher] = useState([]);
  console.log(ids_voucher);
  const handleUp = () => {
    window.scrollTo(0, 0);
  };
  // lưu voucher
  const addVoucher = async (id_voucher) => {
    try {
      const data = {
        voucher_id: id_voucher,
      };
      const response = await axios.post(
        "http://localhost:5050/user_voucher",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );

      if (response.status === 201) {
        // toast.success("Lưu thành công.");
        userVoucher();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Voucher này đã được lưu trước đó rồi.");
        } else {
          toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
        }
      }
    }
  };
  // danh sach voucher đã lưu
  const userVoucher = async () => {
    try {
      const response = await axios.get("http://localhost:5050/user_voucher", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      if (response.status === 200) {
        const ids = response.data.data.map((voucher) => {
          return voucher.voucher_id;
        });
        setIdsVoucher(ids);
      } else {
        setIdsVoucher([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // danh sach voucher
  const fetchDataDiscountcode = async () => {
    try {
      const response = await axios.get("http://localhost:5050/discountcode");
      if (response.data.status_code === 200) {
        setVouchers(response.data.data);
      } else {
        setVouchers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataDiscountcode();
    userVoucher();
  }, [cookies.user_token]);

  return (
    <div id="box-voucher">
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "330px" }}
      />
      <ComponentHeader />
      <div className="content-voucher">
        <div className="content-voucher__banner">
          <img src={banner} alt="banner" />
        </div>
        <div className="content-voucher__huntvoucher">
          <img src={huntvoucher} alt="huntvoucher" />
        </div>
        <div className="content-voucher__items">
          {vouchers.length > 0 ? (
            vouchers.map((discountcode, index) => (
              <div key={index} className="d-flex">
                <div className="info-shop col-4">
                  <div className="dots-dis">
                    {[...Array(9)].map((_, i) => (
                      <div className="dot-dis"></div>
                    ))}
                  </div>
                  <img
                    src={discountcode.logoShop}
                    alt={`${discountcode.shopName} logo`}
                  />
                  <p>{discountcode.shopName}</p>
                  <div id="triangle-left"></div>
                </div>
                <div className="detail-code col-8">
                  <p>
                    Giảm: {discountcode.discountValue}
                    <span>
                      {discountcode.discountType === "fixed" ? "k" : "%"}
                    </span>
                  </p>
                  <p>Đơn tối thiểu: {VND.format(discountcode.minOrderValue)}</p>
                  <div className="d-flex hsd">
                    <p>Đã dùng: {discountcode.usedPercentage}%</p>
                    <p>
                      HSD:{" "}
                      {new Date(
                        discountcode.expirationDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {ids_voucher.includes(discountcode._id) ? (
                    <div id="up_voucher">
                      <img src={addvoucherimg} alt="addvoucherimg" />
                    </div>
                  ) : (
                    ""
                  )}

                  <p
                    onClick={() => addVoucher(discountcode._id)}
                    className={`save ${
                      ids_voucher.includes(discountcode._id)
                        ? "saved"
                        : "nosave"
                    }`}
                  >
                    {ids_voucher.includes(discountcode._id) ? (
                      <span>Mua ngay</span>
                    ) : (
                      <span>Lưu</span>
                    )}
                  </p>
                  <p className="usageLimit">x{discountcode.usageLimit}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </div>
        <div onClick={handleUp} id="to_up">
          <i class="fas fa-arrow-up"></i>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
