import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Time from "../timer/time";

function FlastSale(props) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  const progress = (soldQuantity, targetQuantity) => {
    return (soldQuantity / targetQuantity) * 100;
  };

  const listProduct = props.list.slice(10, 22);
  const flast_sale = listProduct.map((product) => (
    <div key={product.id} className="item-fl-sale">
      <div className="item-fl-sale-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="item-fl-sale-text">
        <p>
          <sup>đ</sup>62.000
        </p>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${progress(2000, 3000)}%` }}
        >
          Đã bán 2000 k
        </div>
      </div>
    </div>
  ));

  return (
    <section className="flast-sale bg-white">
      <div className="flast-sale-title d-flex">
        <h1>FLASH SALE</h1>
        <Time />
      </div>
      <div className="items-flast-sale d-flex text-align">
        <Slider {...settings}>{flast_sale} </Slider>
      </div>
    </section>
  );
}

export default FlastSale;
