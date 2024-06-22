function SuperStore(props) {
  const listProduct = props.listSp.slice(13, 18);
  const item_super_shop = listProduct.map((product) => {
    return (
      <div key={product.id} className="item-super-shop">
        <div className="item-super-shop-img">
          <img src={product.thumbnail} alt="" />
        </div>
        <div className="item-super-shop-text">
          <p>SHOP XU HƯỚNG</p>
        </div>
        <div className="item-super-shop-price">
          <p>
            Tư : <sup>đ</sup> <span>1.500</span>
          </p>
        </div>
      </div>
    );
  });
  return (
    <section className="super-store">
      <div className="super-store-titel">
        <h1>SIÊU SHOP THỊNH HÀNH - BUNG DEAL SIÊU PHẨM</h1>
      </div>
      <div className="items-super-shop d-flex flex-wrap text-align">
        {item_super_shop}
      </div>
    </section>
  );
}
export default SuperStore;
