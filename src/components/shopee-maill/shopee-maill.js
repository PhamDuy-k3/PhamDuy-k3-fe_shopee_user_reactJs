import sidebar from "../../assets/images/img/sidebar.jpg";

function ShopeeMaill(props) {
  const listProduct = props.list.slice(20, 28);

  const shopee_maill = listProduct.map((product) => {
    return (
      <div key={product.id} className="shopee-maill-poduct">
        <a href="">
          <div className="shopee-maill-poduct-img">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="shopee-maill-poduct-logo">
            <img src={product.thumbnail} alt={product.title} />
          </div>
        </a>
        <div className="shopee-maill-poduct-text">
          <p>Mua là có quà</p>
        </div>
      </div>
    );
  });

  return (
    <section className="shopee-maill col-12 bg-white">
      <div className="shopee-maill-title d-flex">
        <h1>SHOPEE MAIL</h1>
        <p>
          <i className="fas fa-reply"></i> 7 Ngày Miễn Phí Trả Hàng
        </p>
        <p>
          <i className="fas fa-check-circle"></i> Hàng Chính Hãng 100%
        </p>
        <p>
          <i className="fas fa-truck"></i> Miễn Phí Vận Chuyển
        </p>
        <p>
          Xem Tất Cả <i className="fas fa-angle-right"></i>
        </p>
      </div>
      <div className="shopee-maill-sidebar-poducts d-flex">
        <div className="shopee-maill-sidebar col-4">
          <img src={sidebar} alt="sidebar" />
        </div>
        <div className="shopee-maill-poducts d-flex flex-wrap text-align">
          {shopee_maill}
        </div>
      </div>
    </section>
  );
}
export default ShopeeMaill;
