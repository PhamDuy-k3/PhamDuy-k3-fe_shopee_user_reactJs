//// ẩn hiện sidebar
const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

let clickCount = 0;

function hiddenSidebar() {
  const screenWidth = window.innerWidth;
  const sideBar = $(".side-bar");
  const flyBox = $(".fly-box");
  const box = $(".box");
  let arrayHiddenText = $$(".hidenText");

  clickCount++;

  if (screenWidth < 768) {
    sideBar.style.animation = "identifier1 1s";
    sideBar.style.display = "block";
    flyBox.style.display = "block";

    flyBox.addEventListener("click", function () {
      flyBox.style.display = "none";
      sideBar.style.animation = "identifier2 1s forwards";
    });
  } else {
    if (clickCount % 2 != 0) {
      box.style.transition = "0.5s";
      sideBar.style.transition = "0.5s";
      sideBar.style.width = "80px";
      box.style.marginLeft = "-170px";
      arrayHiddenText.forEach((e) => {
        e.classList.toggle("hidenTextActive");
      });
    } else {
      box.style.transition = "0s";
      sideBar.style.transition = "0s";
      sideBar.style.width = "16rem";
      box.style.marginLeft = "0px";
      arrayHiddenText.forEach((e) => {
        e.classList.toggle("hidenTextActive");
      });
    }
  }
}

//// ẩn hiện search
const openSearchNav = $(".open-search-nav");
openSearchNav.addEventListener("click", function () {
  $(".searchNav").style.display = "block";
});
const closeSearchNav = $(".close-search-nav");
closeSearchNav.addEventListener("click", function () {
  $(".searchNav").style.display = "none";
});

//hien dau x clear text trong input
const clearSearch = $(".clear-search");
clearSearch.addEventListener("click", function () {
  $("#search_nav").value = "";
  $(".clear-search").style.visibility = "hidden";
});

// khi xóa hết text trong input thì none dấu x
function keyBroad() {
  $(".clear-search").style.visibility = "visible";
  if ($("#search_nav").value == "") {
    $(".clear-search").style.visibility = "hidden";
  }
}
const cmt = $(".fa-comments");
cmt.addEventListener("click", function () {
  if ($(".infro-chat").style.display === "none") {
    $(".infro-chat").style.display = "block";
  } else {
    $(".infro-chat").style.display = "none";
  }
});

//sidebar(if else)

const listChat = $$(".item-chat");
$(".sizeChat").innerText = listChat.length;

const optionSideBars = $$(".option");
$("#sub0").style.display = "none";
$("#sub1").style.display = "none";
$("#sub2").style.display = "none";
$("#sub3").style.display = "none";

optionSideBars.forEach((optionSideBar, index) => {
  optionSideBar.onclick = function () {
    if ($("#sub" + index).style.display === "none") {
      $("#sub" + index).style.display = "block";
      $(`.fa-angle-left${index}`).style.transform = "rotate(-90deg)";
      console.log("#sub" + index);
    } else {
      $(`.fa-angle-left${index}`).style.transform = "rotate(0deg)";
      $("#sub" + index).style.display = "none";
    }
  };
});
// chuyển tab
const listOption = $$(".optionClick");
const ContentWrapers = $$(".content-wraper");
console.log(listOption);
listOption.forEach((op, index) => {
  const ContentWraper = ContentWrapers[index];
  op.onclick = function () {
    document
      .querySelector(".optionClick.bgOpClick")
      .classList.remove("bgOpClick");
    op.classList.add("bgOpClick");
    document
      .querySelector(".content-wraper.hiddenContentWraper")
      .classList.remove("hiddenContentWraper");
    ContentWraper.classList.add("hiddenContentWraper");
  };
});
//sale
const saleImgs = $$(".sale-img");
const saleOps = $$(".sale-op");
saleOps.forEach((saleOp, index) => {
  saleOp.onclick = function () {
    document
      .querySelector(".sale-img.sale-img-active")
      .classList.remove("sale-img-active");
    document
      .querySelector(".sale-op.sale-op-active")
      .classList.remove("sale-op-active");
    saleImgs[index].classList.add("sale-img-active");
    saleOp.classList.add("sale-op-active");
  };
});

//Table tree (toggle)
const tbTrTrees = $$(".tree");
const tbtrees = $$(".trees");
tbTrTrees.forEach((tbTrTree, index) => {
  const tbtree = tbtrees[index];
  tbTrTree.onclick = function () {
    tbtree.classList.toggle("trees");
    this.classList.toggle("itree");
  };
});
//TODO-LIST
const textElements = $$(".text");
const inputChecks = $$(".icheck-primary input");
const times = $$(".time button");
const del_text = $$(".del-text");
console.log(times);
inputChecks.forEach((inputCheck, index) => {
  inputCheck.onclick = function () {
    if (inputCheck.checked) {
      textElements[index].style.color = "gray";
      times[index].style.backgroundColor = "#ADB5BD";
      times[index].style.border = "1px solid #ADB5BD";
      del_text[index].style.display = "block";
    } else {
      textElements[index].style.color = "";
      times[index].style.backgroundColor = "";
      times[index].style.border = "";
      del_text[index].style.display = "none";
    }
  };
});

const lis = $$(".mt-3 li");
const faEdit = $$(".fa-edit");
lis.forEach((li, index) => {
  li.addEventListener("mouseover", function () {
    faEdit[index].classList.toggle("fa-edit-none");
  });

  li.addEventListener("mouseout", function () {
    faEdit[index].classList.toggle("fa-edit-none");
  });
});

// Calendar
let date = new Date();
let day_now = date.getDate();
let month = date.getMonth() + 1;
const tables = $$(".calendar-table");
let getYear = date.getFullYear();
$(".calendar-year").innerText = getYear;
const next = $(".calendar-next");

let daysJanuary = $$(".calendar-table-January td");
let daysFebruary = $$(".calendar-table-February td");
let daysMarch = $$(".calendar-table-March td");
let daysApril = $$(".calendar-table-April td");
let daysMay = $$(".calendar-table-May td");
let daysJune = $$(".calendar-table-June td");
let daysJuly = $$(".calendar-table-July td");
let daysAugust = $$(".calendar-table-August td");
let daysSeptember = $$(".calendar-table-September td");
let daysOctober = $$(".calendar-table-October td");
let daysNovember = $$(".calendar-table-November td");
let daysDecember = $$(".calendar-table-December td");

// hiển thị ngày hiện tại
function getDayInMonth(Days) {
  Days.forEach((day, index) => {
    if (day.innerText == day_now ) {
      day.style.backgroundColor = "#34CE57";
    } else {
      day.style.backgroundColor = "";
    }
  });
}
// hiển thị ngày hiện tại trong tháng hiện tại
function getDaysInMonth(Month) {
  switch (Month) {
    case 1:
      getDayInMonth(daysJanuary);
      break;
    case 2:
      getDayInMonth(daysFebruary);
      break;
    case 3:
      getDayInMonth(daysMarch);
      break;
    case 4:
      getDayInMonth(daysApril);
      break;
    case 5:
      getDayInMonth(daysMay);
      break;
    case 6:
      getDayInMonth(daysJune);
      break;
    case 7:
      getDayInMonth(daysJuly);
      break;
    case 8:
      getDayInMonth(daysAugust);
      break;
    case 9:
      getDayInMonth(daysSeptember);
      break;
    case 10:
      getDayInMonth(daysOctober);
      break;
    case 11:
      getDayInMonth(daysNovember);
      break;
    case 12:
      getDayInMonth(daysDecember);
      break;
  }
}
getDaysInMonth(month);

// chuyen table
let count = 0;
next.addEventListener("click", function () {
  count++;
  if (count > tables.length - 1) {
    count = 0;
    getYear = getYear + 1;
  }
  $(".calendar-year").innerText = getYear;
  calendarMonth(count);
  document
    .querySelector(".calendar-table.table-active")
    .classList.remove("table-active");
  tables[count].classList.add("table-active");
});
console.log(getYear);
const prev = $(".calendar-prev");
prev.addEventListener("click", function () {
  count--;
  if (count < 0) {
    count = tables.length - 1;
    getYear = getYear - 1;
  }
  $(".calendar-year").innerText = getYear;
  calendarMonth(count);

  document
    .querySelector(".calendar-table.table-active")
    .classList.remove("table-active");
  tables[count].classList.add("table-active");
});
// hiện text tháng
function calendarMonth(count) {
  switch (count) {
    case 0:
      $(".calendar-month-text").innerText = "January";
      break;
    case 1:
      $(".calendar-month-text").innerText = "February";
      break;
    case 2:
      $(".calendar-month-text").innerText = "March";
      break;
    case 3:
      $(".calendar-month-text").innerText = "April";
      break;
    case 4:
      $(".calendar-month-text").innerText = "May";
      break;
    case 5:
      $(".calendar-month-text").innerText = "June";
      break;
    case 6:
      $(".calendar-month-text").innerText = "July";
      break;
    case 7:
      $(".calendar-month-text").innerText = "August";
      break;
    case 8:
      $(".calendar-month-text").innerText = "September";
      break;
    case 9:
      $(".calendar-month-text").innerText = "October";
      break;
    case 10:
      $(".calendar-month-text").innerText = "November";
      break;
    case 11:
      $(".calendar-month-text").innerText = "December";
      break;
  }
}
