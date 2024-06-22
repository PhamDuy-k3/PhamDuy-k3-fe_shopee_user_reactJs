function ShopeeMaillSp(props) {
   const listProduct = props.listSp.slice(0,12)
   const items_shopee_mail  = listProduct.map((product)=>{
    return(
        <div key={product.id} className="item-shopee-mail">
          <img src={product.thumbnail} alt="" />
        </div>
    );
   })
  return (
    <section className="shopee-Mail-sp">
      <div className="item-shopee-mail-title">
        <h1>SHOPEE MAIL</h1>
      </div>
      <div className="items-shopee-mail d-flex flex-wrap">
        {items_shopee_mail}
      </div>
    </section>
  );
}
export default ShopeeMaillSp;