import { useEffect, useState } from "react";
import imgsidebar from "../../assets/images/img/imgctsp/sidebar.jpg";
function ProductDetailsDescribe({ product }) {
  let brand_id = product && product.brand_id;
  let category_id = product && product.category_id;
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    fetch(`http://localhost:5050/brands/${brand_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + cookies.Products_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBrand(res.data);
      });
  }, [brand_id]);

  useEffect(() => {
    fetch(`http://localhost:5050/categories/${category_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + cookies.Products_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCategory(res.data);
      });
  }, [category_id]);

  return (
    <section className="product-details-describe d-flex">
      <div className="product-details-describe-text">
        <div className="product-details">
          <div className="product-details-title">
            <h1>CHI TIẾT SẢN PHẨM</h1>
          </div>
          <div className="product-details-text">
            <table>
              <tbody>
                <tr>
                  <td>Danh Mục</td>
                  <td>
                    <a href="">
                      Shopee <i className="fas fa-angle-right"></i>
                    </a>
                    <a href="">
                      Thời Trang Nam <i className="fas fa-angle-right"></i>
                    </a>
                    <a href="">
                      Áo <i className="fas fa-angle-right"></i> Áo Phông Vip
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Xuất xứ</td>
                  <td>Việt Nam</td>
                </tr>
                <tr>
                  <td>Chất liệu</td>
                  <td>Boxers & Trunks</td>
                </tr>
                <tr>
                  <td>Thương hiệu</td>
                  <td>{brand && brand.name}</td>
                </tr>
                <tr>
                  <td>Danh mục</td>
                  <td>{category && category.name}</td>
                </tr>
                <tr>
                  <td>Rất lớn</td>
                  <td>Không</td>
                </tr>
                <tr>
                  <td>Số lượng hàng kh..</td>
                  <td>1221</td>
                </tr>
                <tr>
                  <td>Số sản phẩm còn lại</td>
                  <td>109938610</td>
                </tr>
                <tr>
                  <td>Gửi từ</td>
                  <td>Hà Nội</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="product-describe">
          <div className="product-describe-title">
            <h1>MÔ TẢ SẢN PHẨM</h1>
          </div>
          <div className="product-describe-text">
            <p>
              <i className="fas fa-heart"></i>
              Đồ Bộ Nam là phụ kiện thời trang đơn giản nhưng không thể thiếu.
              Các anh có thể mặc đồ bộ nam ờ nhà, hay dùng làm đồ thể thao, tập
              gym rất mát mẻ và thoải mái
            </p>
            <p>
              <i className="fas fa-heart"></i>
              Trong thế giới thời trang của phái mạnh các set thể thao hay bộ
              quần áo nam luôn chiếm một vị trí quan trọng.
            </p>
            <p>
              <i className="fas fa-heart"></i>
              Mang tới cho các anh chàng sự thoải mái khi đi dạo phố hoặc hẹn hò
              bè bạn , những bộ đồ thể thao nam cao cấp đã trở thành người bạn
              không thể thiếu.
            </p>
            <p>
              <i className="fas fa-bullhorn"></i> SHOP CAM KẾT
            </p>
            <ol>
              <li>Chấp nhận đổi hàng khi size không vừa</li>
              <li>Hoàn tiền nếu sản phẩm không giống với mô tả</li>
              <li>Hàng có sẵn, giao hàng ngay khi nhận được đơn</li>
              <li>
                Quần áo được kiểm tra kĩ càng, cẩn thận và tư vấn nhiệt tình
                trước khi gói hàng giao cho Quý Khách
              </li>
              <li>Sản phẩm giống mô tả. Kiểu dáng hoàn toàn giống ảnh mẫu</li>
              <li>
                Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của
                sản phẩm có thể chênh lệch khoảng 3-5%
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="product-details-sidebar">
        <div className="product-details-sidebar-item">
          <p className="top-product">Top Sản Phẩm Bán Chạy</p>
          <h1>CK STORE</h1>
          <img src={imgsidebar} alt="" />
          <p>Áo nam co giãn 4 chiều full size</p>
          <div className="product-details-sidebar-item-price d-flex">
            <p>
              <sup>đ</sup>1.000
            </p>
            <p>-</p>
            <p>
              <sup>đ</sup>2.999
            </p>
          </div>
        </div>
        <div className="product-details-sidebar-item">
          <h1>CK STORE</h1>
          <img src={imgsidebar} alt="" />

          <p>Áo nam co giãn 4 chiều full size</p>
          <div className="product-details-sidebar-item-price d-flex">
            <p>
              <sup>đ</sup>1.000
            </p>
            <p>-</p>
            <p>
              <sup>đ</sup>2.999
            </p>
          </div>
        </div>
        <div className="product-details-sidebar-item">
          <h1>CK STORE</h1>
          <img src={imgsidebar} alt="" />

          <p>Áo nam co giãn 4 chiều full size</p>
          <div className="product-details-sidebar-item-price d-flex">
            <p>
              <sup>đ</sup>1.000
            </p>
            <p>-</p>
            <p>
              <sup>đ</sup>2.999
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDetailsDescribe;
