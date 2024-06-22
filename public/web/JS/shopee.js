/// slider-banner
let slideImages = document.querySelectorAll(".banner-img");
let banerBig = document.querySelector(".baner-big");
let next = document.querySelector(".next-page-right");
let prev = document.querySelector(".next-page-left");
// console.log(slideImages)
let dots = document.querySelectorAll(".dot");

var counter = 0;

next.addEventListener("click", slidenext);
function slidenext() {
  slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  indiacatort();
}

prev.addEventListener("click", function () {
  slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  indiacatort();
});

function auto() {
  deletInterval = setInterval(timer, 2000);
  function timer() {
    slidenext();
    indiacatort();
  }
}
auto();
banerBig.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

banerBig.addEventListener("mouseout", auto);
// khó
function indiacatort() {
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active_dot", "");
  }
  dots[counter].className += " active_dot";
}

function switchImage(curentImage) {
  curentImage.classList.add("active_dot");
  var imageId = curentImage.getAttribute("attr"); //  vd = 1
  if (imageId > counter) {
    //counter = 0
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards"; //counter = 0
    counter = imageId; // counter = 1
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  } else if (imageId == counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  }
  indiacatort();
}

// flash shale
let endDate = new Date("1/22/2024 00:00:00").getTime();
let check = setInterval(function () {
  let now = new Date().getTime();
  let distance = endDate - now;
  // chuyển mms về ngày , giờ , phút , giây
  let day = Math.floor(distance / (24 * 60 * 60 * 1000));
  //console.log(day)
  let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
  let seconds = Math.floor((distance % (60 * 1000)) / 1000);
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("day").innerText = day;
  document.getElementById("hour").innerText = hour;
  document.getElementById("minute").innerText = minute;
  document.getElementById("seconds").innerText = seconds;
  if (distance <= 0) {
    clearInterval(check);
  }
}, 1000);

///API
var productsEndpoint = "https://dummyjson.com/products";

fetch(productsEndpoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (listProduct) {
    const arrayProduct = listProduct.products;

    /// Category
    const category = arrayProduct
      .slice(0, 20)
      .map(
        (product) => `
            <div class="category-product">
                <a href="sp.html">
                    <div class="category-product-img">
                        <img src="${product.thumbnail}" alt="${product.title}" />
                    </div>
                    <div class="category-product-text">
                        <p>${product.title}</p>
                    </div>
                </a>
            </div>
        `
      )
      .join("");
    console.log(category);
    /// FLASH SALE
    const fl_sale = arrayProduct
      .slice(10, 16)
      .map(
        (product) => `
            <div class="item-fl-sale">
                <div class="item-fl-sale-image">
                    <img src="${product.thumbnail}" alt="${product.title}" />
                </div>
                <div class="item-fl-sale-text">
                    <p><sup>đ</sup>62.000</p>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: 70%">Đã bán 3k</div>
                </div>
            </div>
        `
      )
      .join("");

    // SHOPEE MAIL
    const spMail = arrayProduct
      .slice(20, 28)
      .map(
        (product) => `
            <div class="shopee-maill-poduct">
                <a href="">
                    <div class="shopee-maill-poduct-img">
                        <img src="${product.thumbnail}" alt="${product.title}" />
                    </div>
                    <div class="shopee-maill-poduct-logo">
                        <img src="${product.thumbnail}" alt="${product.title}" />
                    </div>
                </a>
                <div class="shopee-maill-poduct-text">
                    <p>Mua là có quà</p>
                </div>
            </div>
        `
      )
      .join("");

    // GOI Ý
    const suggest = arrayProduct
      .slice(0, 18)
      .map(
        (product) => `
            <div class="suggest-product bg-white">
                <div class="suggest-product-img">
                    <img src="img/goiy-2.jpg" alt="" />
                </div>
                <div class="suggest-product-text">
                    <p>Áo cadigan phối sọc ngang dáng rộng trùm mông...</p>
                </div>
                <div class="suggest-product-sale">
                    <p>Giảm đ <span>10</span>k</p>
                </div>
                <div class="suggest-product-price-sold d-flex">
                    <div class="suggest-product-price">
                        <p>đ <span>100.00</span></p>
                    </div>
                    <div class="suggest-product-sold">
                        <p>Đã bán <span>148</span></p>
                    </div>
                </div>
                <div class="search-product text-align">
                    <p>Tìm sản phẩm tương tự</p>
                </div>
            </div>
        `
      )
      .join("");

    const category_products = document.querySelector(".category-products");
    const fl_sale_element = document.querySelector(".items-flast-sale");
    const shopee_maill_poducts = document.querySelector(
      ".shopee-maill-poducts"
    );
    const suggest_products = document.querySelector(".suggest-products");

    category_products.innerHTML = category;
    fl_sale_element.innerHTML = fl_sale;
    shopee_maill_poducts.innerHTML = spMail;
    suggest_products.innerHTML = suggest;
  })

  .catch(function (error) {
    console.error("Error fetching API:", error);
  });

// So luong spham trong gio hang
let quantityCart = localStorage.getItem("quantityCart");
if (quantityCart > 0) {
  document.querySelector(".quantityCart").innerText = quantityCart;
}

///search
// Lấy tham chiếu đến các phần tử DOM
let value_search = document.querySelector("#search-input");
let btnSearch = document.querySelector(".fa-search");

// Hàm xử lý tìm kiếm
function performSearch() {
  localStorage.setItem("text-search", JSON.stringify(value_search.value));
  window.location = "Search.html";
}

btnSearch.addEventListener("click", performSearch);

value_search.addEventListener("keypress", function (event) {
  // Kiểm tra nếu phím được ấn là Enter (mã ASCII: 13)
  if (event.keyCode === 13) {
    performSearch();
  }
});
