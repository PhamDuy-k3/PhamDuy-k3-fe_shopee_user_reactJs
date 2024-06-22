const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

// sale sp
let sale = +$(".sale").innerText;
let cost = +$(".cost").innerText;
let price_sale = cost - cost * (sale / 100);
const VND = new Intl.NumberFormat("vi-VN", {
  // style: 'currency',
  currency: "VND",
});
$(".price-sale").innerText = VND.format(price_sale);
$(".cost").innerText = VND.format(cost);

//spham

const imgSmalls = $$(".item-img-small img");
const imgBigs = $$(".ctsp-product-img-big");
const imgSmallsZoom = $$(".item-img-small-zoom img");
const imgBigsZoom = $$(".ctsp-product-img-big-zoom");
const colorProducts = $$(".color-sp");

function updateActiveImages(index) {
  $(".active-img-small").classList.remove("active-img-small");
  $(".ctsp-product-img-big.active-img-big").classList.remove("active-img-big");
  imgBigs[index].classList.add("active-img-big");
  imgSmalls[index].classList.add("active-img-small");
}
function updateActiveImagesZoom(index) {
  $(".active-img-small-zoom").classList.remove("active-img-small-zoom");
  $(".ctsp-product-img-big-zoom.active-img-big-zoom").classList.remove(
    "active-img-big-zoom"
  );
  imgBigsZoom[index].classList.add("active-img-big-zoom");
  imgSmallsZoom[index].classList.add("active-img-small-zoom");
}

imgSmalls.forEach((imgSmall, index) => {
  imgSmall.onmouseover = function () {
    updateActiveImages(index);
    updateActiveImagesZoom(index);
  };

  imgSmall.onclick = function () {
    opentZoom();
  };
});

imgSmallsZoom.forEach((imgSmallZoom, index) => {
  imgSmallZoom.onclick = function () {
    updateActiveImagesZoom(index);
  };
});
const sizeSPs = $$(".size-sp");
sizeSPs.forEach((sizeSP, index) => {
  sizeSP.onclick = function () {
    sizeSPs.forEach((size_sp) => size_sp.classList.remove("size-clicked"));
    sizeSP.classList.add("size-clicked");
  };
});

// open zoom
function opentZoom() {
  $(".fly-zoom").style.display = "block";
  $(".zoom-in").style.display = "block";
}
// close zoom
let closeZoom = $(".fly-zoom");
closeZoom.addEventListener("click", () => {
  $(".fly-zoom").style.display = "none";
  $(".zoom-in").style.display = "none";
  $(".addres-transport").style.display = "none";
});

//product-op(feed-back)

const product_ops = $$(".product-op");
product_ops.forEach((product_op, index) => {
  product_op.onclick = function () {
    $(".product-op.active-op").classList.remove("active-op");
    product_op.classList.add("active-op");
  };
});

const img_video_ones = $$(".img-video-one");
const img_video_twos = $$(".img-video-two");
img_video_ones.forEach((img_video_one, index) => {
  const img_video_two = img_video_twos[index];
  img_video_one.onclick = function () {
    $(".feed-back-video-onClick").style.display = "block";
    $(".img-video-one.active-img-video-one").classList.remove(
      "active-img-video-one"
    );
    $(".img-video-two.active-img-video-two").classList.remove(
      "active-img-video-two"
    );
    img_video_one.classList.add("active-img-video-one");
    img_video_two.classList.add("active-img-video-two");
  };
});

//love-unit

const loveUnit = $(".fa-heart-love");

loveUnit.addEventListener("click", () => {
  loveUnit.classList.toggle("fas");
});

const changeAddress = $(".change-dress");
changeAddress.addEventListener("click", () => {
  $(".addres-transport").style.display = "block";
  $(".fly-zoom").style.display = "block";
  document.body.style.overflow = "hidden"; // ngưng kéo web
});
const used = $(".Used");
used.addEventListener("click", Used);
let input_search_addres = $(".input-search-addres");
function Used() {
  document.body.style.overflow = "auto";
  $(".addres-transport").style.display = "none";
  $(".fly-zoom").style.display = "none";
  if (input_search_addres.value != "") {
    $(".address-new").innerText = input_search_addres.value;
  }
}
// tăng số lượng sp
const upQuanty = $(".up");
const downQuanty = $(".down");
var value = $(".quanty").value;
let quantity = 1;
upQuanty.addEventListener("click", function () {
  value++;
  quantity = value;
  $(".quanty").value = value;
});
downQuanty.addEventListener("click", function () {
  value--;
  if (value < 1) {
    value = 1;
    $(".quanty").value = 1;
  } else {
    $(".quanty").value = value;
  }
});

///CART
class Product {
  constructor(id, name, color, image, quantity, price, size, sum) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.image = image;
    this.quantity = quantity;
    this.price = price;
    this.size = size;
    this.sum = sum;
  }
}

const cartTransport = document.querySelector(".cart-insert");
const name_sp = document.querySelector(
  ".ctsp-product-infor-title h1"
).innerText;
let arrayTextColorProduct = [];
let img = "";

colorProducts.forEach((colorProduct, index) => {
  colorProduct.onclick = function () {
    //chuyên màu buttom color
    // $('.color-sp.button-clicked').classList.remove("button-clicked");
    colorProducts.forEach((cp) => cp.classList.remove("button-clicked"));
    colorProduct.classList.add("button-clicked");
    // màu theo ảnh
    $(".ctsp-product-img-big.active-img-big").classList.remove(
      "active-img-big"
    );
    imgBigs[index].classList.add("active-img-big");
    // lấy text color và img
    const lastColor = colorProduct.innerText;
    arrayTextColorProduct.push(lastColor);
    if (lastColor == "Màu Trắng") {
      img = "img/imgctsp/banner-con-1.jpg";
    }
    if (lastColor == "Màu Đen") {
      img = "img/imgctsp/banner-con-2.jpg";
    }
    if (lastColor == "Màu Xám") {
      img = "img/imgctsp/banner-con-3.jpg";
    }
    if (lastColor == "Màu Xanh Da Trời") {
      img = "img/imgctsp/banner-con-4.jpg";
    }
  };
});
// lấy id
function generateUniqueId() {
  const timestamp = new Date().getTime();
  return timestamp;
}

const produts = JSON.parse(localStorage.getItem("sp")) || [];
cartTransport.addEventListener("click", () => {
  const uniqueId = generateUniqueId();
  const lastColor = arrayTextColorProduct[arrayTextColorProduct.length - 1];
  let sum = quantity * price_sale;

  const createProduct = (color, productImg) => {
    return new Product(
      uniqueId,
      name_sp.toUpperCase(),
      color,
      productImg,
      quantity,
      VND.format(price_sale),
      "",
      VND.format(sum)
    );
  };

  if (quantity == 1 || (quantity > 1 && img == "")) {
    const product_default = createProduct(
      "Màu Trắng",
      "img/imgctsp/banner-con-1.jpg"
    );
    const isProductInCart = produts.some(
      (pd) =>
        pd.name === product_default.name && pd.color === product_default.color
    );

    if (isProductInCart) {
      alert("Sản phẩm này đã có trong giỏ hàng");
    } else {
      produts.push(product_default);
      localStorage.setItem("sp", JSON.stringify(produts));
    }
  } else {
    const product = createProduct(lastColor, img);
    const isProductInCart = produts.some(
      (pd) => pd.name === product.name && pd.color === product.color
    );

    if (isProductInCart) {
      alert("Sản phẩm này đã có trong giỏ hàng");
    } else {
      produts.push(product);
      localStorage.setItem("sp", JSON.stringify(produts));
    }
  }

  $(".quanty").value = 1;
});
