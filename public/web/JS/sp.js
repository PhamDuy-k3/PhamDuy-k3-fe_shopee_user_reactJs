var productsEndpoint = "https://dummyjson.com/products";

fetch(productsEndpoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (listProduct) {
    // GOI Ý
    const suggest = listProduct.products
      .slice(0, 20)
      .map(
        (product) => `
            <div class="suggest-product bg-white">
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

    document.querySelector(".suggest-products").innerHTML = suggest;
  })

  .catch(function (error) {
    console.error("Error fetching API:", error);
  });

// So luong spham trong gio hang
let quantityCart = localStorage.getItem("quantityCart");
document.querySelector(".quantityCart").innerText = quantityCart;
