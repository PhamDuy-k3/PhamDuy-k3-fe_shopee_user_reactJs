import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="gach col-12"></div>
      <div className="sections">
        <section className="section">
          <h6>SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE</h6>
          <p>
            Shopee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và
            miễn phí! Shopee là nền tảng giao dịch trực tuyến hàng đầu ở Đông
            Nam Á, có trụ sở chính ở Singapore, đã có mặt ở khắp các khu vực
            <b>
              Singapore, Malaysia, Indonesia, Thái Lan, Philippines, Đài Loan,
              Brazil, México & Colombia.
            </b>
            Với sự đảm bảo của Shopee, bạn sẽ mua hàng trực tuyến an tâm và
            nhanh chóng hơn bao giờ hết!
          </p>
        </section>
        <section className="section">
          <h6>MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN</h6>
          <p>
            Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực tuyến
            thì Shopee.vn là một sự lựa chọn tuyệt vời dành cho bạn. Shopee là
            trang thương mại điện tử cho phép người mua và người bán tương tác
            và trao đổi dễ dàng thông tin về sản phẩm và chương trình khuyến mãi
            của shop. Do đó, việc mua bán trên Shopee trở nên nhanh chóng và đơn
            giản hơn. Bạn có thể trò chuyện trực tiếp với nhà bán hàng để hỏi
            trực tiếp về mặt hàng cần mua. Còn nếu bạn muốn tìm mua những dòng
            sản phẩm chính hãng, uy tín,
            <Link to="https://shopee.vn/mall/">
              <b>Shopee Mall</b>
            </Link>
            chính là sự lựa chọn lí tưởng dành cho bạn. Để bạn có thể dễ dàng
            khi tìm hiểu và sử dụng sản phẩm,
            <Link to="https://shopee.vn/blog/">
              <b>Shopee Blog - trang blog thông tin chính thức của Shopee -</b>
            </Link>
            sẽ giúp bạn có thể tìm được cho mình các kiến thức về xu hướng thời
            trang, review công nghệ, mẹo làm đẹp, tin tức tiêu dùng và deal giá
            tốt bất ngờ.
          </p>
          <p>
            Đến với Shopee, cơ hội để trở thành một nhà bán hàng dễ dàng hơn bao
            giờ hết. Chỉ với vài thao tác trên ứng dụng, bạn đã có thể đăng bán
            ngay những sản phẩm của mình. Không những thế, các nhà bán hàng có
            thể tự
            <Link to="https://banhang.shopee.vn/edu/article/119">
              <b>tạo chương trình khuyến mãi trên Shopee</b>
            </Link>
            để thu hút người mua với những sản phẩm có mức giá hấp dẫn. Khi đăng
            nhập tại Shopee Kênh người bán, bạn có thể dễ dàng phân loại sản
            phẩm, theo dõi đơn hàng, chăm sóc khách hàng và cập nhập ngay các
            hoạt động của shop.
          </p>
        </section>
        <section className="section">
          <h6>TẢI ỨNG DỤNG SHOPEE NGAY ĐỂ MUA BÁN ONLINE MỌI LÚC, MỌI NƠI</h6>
          <p>
            Ưu điểm của ứng dụng Shopee là cho phép bạn mua và bán hàng mọi lúc,
            mọi nơi. Bạn có thể tải ứng dụng Shopee cũng như đăng sản phẩm bán
            hàng một cách nhanh chóng và tiện lợi. Ngoài ra, ứng dụng Shopee còn
            có những ưu điểm sau:
          </p>
          <ol>
            <li>
              Giao diện thân thiện, đơn giản, dễ sử dụng. Bạn sẽ dễ dàng thấy
              được ngay những sản phẩm nổi bật cũng như dễ dàng tìm đến các ô
              tìm kiếm, giỏ hàng hoặc tính năng chat liền ta
            </li>
            <li>
              Ứng dụng tích hợp công nghệ quản lý đơn mua và bán hàng tiện lợi
              trên cùng một tài khoản. Bạn sẽ vừa là người mua hàng, vừa là
              người bán hàng rất linh hoạt, dễ dàng.
            </li>
            <li>
              Cập nhập thông tin khuyến mãi,
              <Link to="https://shopee.vn/flash_sale/">
                <b> Shopee Flash Sale</b>
              </Link>
              nhanh chóng và liên tục.
            </li>
          </ol>
        </section>
      </div>
    </footer>
  );
}
export default Footer;
