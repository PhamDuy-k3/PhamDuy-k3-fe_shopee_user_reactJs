//sum : Số tiền
//sum-price: Tổng tiền các sp
const listPorduct = JSON.parse(localStorage.getItem("sp"));
let sum_price = 0;
let html = "";
let quantityCart = listPorduct.length;

document.querySelector(".quantityCart-one").innerText = quantityCart;
document.querySelector(".quantityCart-two").innerText = quantityCart;

// lưu tổng spham vào localStorage
localStorage.setItem("quantityCart", quantityCart);

// Create an array to store checked items
let arraySpChecked = [];

for (const Porduct of listPorduct) {
  html += `<div class = "item-product">
    <div class="store-name">
      <input class="slaveCheckbox"  type="checkbox" name="check-store" id="check-store" />
      Name-store
    </div>
  
  <div class="d-flex product-infor">
    <div class="col-5 d-flex product">
      <input  class="slaveCheckbox" onchange="handleCheckboxChange(${Porduct.id})" type="checkbox" name="check-sp" id="check-sp-${Porduct.id}"  />
      <img class="col-2" src="${Porduct.image}" alt="" />
      <p class="col-5 porduct-name">${Porduct.name}</p>
      <select
        class="mt-5"
        style="height: 1.3rem"
        name="product-category"
        id="product-category"
      >
        <option value="" disabled selected>Phân Loại Hàng</option>
        <option style="color: red;" value="${Porduct.color}">${Porduct.color}</option>
        <option value="white">Màu Trắng</option>
      </select>
    </div>
    <div class="d-flex price-info col-2 pt-5 text-center">
      <p style="color:gray;"><sup>đ</sup><del>100000</del></p>
      <p > <sup>đ</sup> <span class="price">${Porduct.price}</span></p>
    </div>
    <div class="quantity col-2 pt-5">
      <input class="cart-down-quantity" type="button" value="-" />
      <input class="quantity_value" type="number" min="1" value="${Porduct.quantity}" />
      <input class="cart-up-quantity" type="button" value="+" />
    </div>
    <div class="total-price col-2 pt-5">
      <p><sup>đ</sup><span class="sum">${Porduct.sum}</span></p>
    </div>
    <div class="remove-item col-1 pt-5">
      <p onclick="removeSp(${Porduct.id})">Xóa</p>
    </div>
    </div>
  </div>`;
}

document.querySelector(".list-products").innerHTML = html;

// fomat giá tiền
const VND = new Intl.NumberFormat("vi-VN", {
  currency: "VND",
});

// xoa item-sp
function removeSp(id) {
  let listPorduct = JSON.parse(localStorage.getItem("sp"));
  listPorduct = listPorduct.filter((item) => item.id != id);
  localStorage.setItem("sp", JSON.stringify(listPorduct));
  window.location = "cart.html";
}

// xoa items-sp
function removeSpALL() {
  localStorage.removeItem("sp");
  window.location = "cart.html";
}
// ...

//Tăng số lượng sản phẩm thay đổi sum
const cart_up_quantity = document.querySelectorAll(".cart-up-quantity");
const cart_down_quantity = document.querySelectorAll(".cart-down-quantity");
const quantity_values = document.querySelectorAll(".quantity_value");
cart_up_quantity.forEach((button, index) => {
  button.addEventListener("click", function () {
    quantity_values[index].value++;
    sum(index);
  });
});

cart_down_quantity.forEach((button, index) => {
  button.addEventListener("click", function () {
    quantity_values[index].value--;
    if (quantity_values[index].value < 1) {
      quantity_values[index].value = 1;
    }
    sum(index);
  });
});

function sum(index) {
  let price = document.querySelectorAll(".price")[index].innerText;
  let quantity_value = quantity_values[index].value;
  let sum = quantity_value * +price;
  document.querySelectorAll(".sum")[index].innerText = VND.format(sum * 1000);
}

// checkbox
function handleCheckboxChange(id) {
  // kiểm tra xem trong arraySpChecked có item có id = id đó chưa
  const isChecked = arraySpChecked.some((item) => item.id === id);
  if (isChecked) {
    //true : có rồi thì lọc lấy san pham có id = id đó
    arraySpChecked = arraySpChecked.filter((item) => item.id != id);
  } else {
    // false : chưa có thì tìm trong mảng listPorduct(Mảng ban đầu) nếu tìm thấy thì
    // add vào mảng mới
    const checkedItem = listPorduct.find((item) => item.id === id);
    if (checkedItem) {
      arraySpChecked.push(checkedItem);
    }
  }
  localStorage.setItem("WWW", JSON.stringify(arraySpChecked));

  sum_price = arraySpChecked.reduce((total, item) => total + +item.sum, 0);

  document.querySelector(".sum-price").innerText = VND.format(sum_price * 1000);
  //
  let quantityCart = arraySpChecked.length;
  document.querySelector(".quantityCart-one").innerText = quantityCart;
  document.querySelector(".quantityCart-two").innerText = quantityCart;
}

sum_price_listPorduct = listPorduct.reduce(
  (total, item) => total + +item.sum,
  0
);

///Chon Tất Cả
const masterCheckbox = document.getElementById("masterCheckbox");
const slaveCheckboxes = document.querySelectorAll(".slaveCheckbox");

masterCheckbox.addEventListener("change", function () {
  if (masterCheckbox.checked) {
    slaveCheckboxes.forEach(function (checkbox) {
      checkbox.checked = true;
      document.querySelector(".sum-price").innerText = VND.format(
        sum_price_listPorduct * 1000
      );
    });
  } else {
    slaveCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
      document.querySelector(".sum-price").innerText = VND.format(0);
    });
  }
});
///
