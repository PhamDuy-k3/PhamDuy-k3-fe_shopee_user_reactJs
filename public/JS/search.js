var productsEndpoint = "https://dummyjson.com/products";
let text_search = JSON.parse(localStorage.getItem("text-search"));
// console.log(text_search);
document.querySelector(".text-search-one").innerText = text_search;
document.querySelector(".text-search-tow").innerText = text_search;
fetch(productsEndpoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (listProduct) {
    const arraySeach = [];
    for (const product of listProduct.products) {
      const trimmedProductTitle = product.title.trim();
      const trimmedSearchText = text_search.trim();
      if (
        trimmedProductTitle
          .toUpperCase()
          .includes(trimmedSearchText.toUpperCase())
      ) {
        arraySeach.push(product);
      }
    }
    const suggest_search = arraySeach
      .map(
        (product) => `<div class="suggest-product bg-white">
        <a href="ctsp.html">
          <div class="suggest-product-img">
            <img src="img/goiy-2.jpg" alt="" />
          </div>
          <div class="suggest-product-text">
            <p>${product.title}</p>
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
        </a>
      </div>
        `
      )
      .join("");
    document.querySelector(".suggest-products").innerHTML = suggest_search;
  })

  .catch(function (error) {
    console.error("Error fetching API:", error);
  });
