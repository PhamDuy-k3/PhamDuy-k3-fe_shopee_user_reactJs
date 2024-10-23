import { Carousel } from "react-bootstrap";
import banner_big2 from "../../assets/images/img/banner-to-2.jfif";
import banner_big3 from "../../assets/images/img/banner-to-3.jfif";
import banner_big1 from "../../assets/images/img/banner-to-1.jfif";
import banner_big4 from "../../assets/images/img/banner-to-4.jfif";
import banner_small_1 from "../../assets/images/img/banner-small-one.jfif";
import banner_small_2 from "../../assets/images/img/banner-small-two.jfif";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <div className="banner d-flex col-12">
        <Carousel className="baner-big col-8" id="myCarousel">
          <Carousel.Item>
            <Link to="">
              <img className="banner-img " src={banner_big1} alt="" />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="">
              <img className="banner-img" src={banner_big2} alt="" />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="">
              <img className="banner-img" src={banner_big3} alt="" />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="">
              <img className="banner-img" src={banner_big4} alt="" />
            </Link>
          </Carousel.Item>
        </Carousel>
        <div className="baner-small col-4">
          <div className="baner-small-one">
            <img src={banner_small_1} alt="" />
          </div>
          <div className="baner-small-two">
            <img src={banner_small_2} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Banner;
