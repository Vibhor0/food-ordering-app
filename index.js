import { menuArray } from "./data.js";

const billEl = document.querySelector(".order-wrapper");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-item")) {
    addItemToBil(e.target.id);
  }
  if(e.target.id === "complete-order-btn") {
    payModal();
  }
  if(e.target.id === "pay-submit-btn") {
    showThankMsg(e);
  }
});

function showThankMsg(e) {
  console.log(document.getElementById("username").value);
  e.preventDefault(); 
  document.querySelector(".thanks-message-wrapper").classList.remove("hide-element");
  document.querySelector(".thanks-message-wrapper").textContent=`Thanks ${document.getElementById("username").value},    Your order is on its way!`;
  document.querySelector(".payment-modal-wrapper").classList.add("hide-element");
  document.querySelector(".order-wrapper").classList.add("hide-element");
}

function payModal() {
  document.querySelector(".payment-modal-wrapper").classList.remove("hide-element");
}

let billArray = [];
function addItemToBil(itemId) {
  let itemObject;
  for (let i of menuArray) {
    if (i.id == itemId) {
      itemObject = i;
    }
  }
  if (!billArray.includes(itemObject)) {
    billArray.push(itemObject);
  }
  console.log(billArray);
  renderBill(billArray);
}
function renderBill(array) {
  let billStr='';
  if(array.length) {
    let totalAmount=0;
    for(let i of array) {
      billStr += `
      <div class="ordered-item">
        <span>${i.name}</span>
        <span>$${i.price}</span>
      </div>`;
      totalAmount += i.price;
    }
    const totalBillStr = `
    <p class="order-header">Your order</p>
        <div class="bill-items-wrapper">
          ${billStr}
          <hr />
          <div class="ordered-item" id="total-bill">
            <span>Total price:</span>
            <span>$${totalAmount}</span>
          </div>
        </div>
        <button id="complete-order-btn">Complete order</button>
    `;
    
    document.querySelector(".order-wrapper").classList.remove("hide-element");
    document.querySelector(".order-wrapper").innerHTML = totalBillStr;
  }
}

function generateMenuString() {
  let menuStr = "";
  menuArray.forEach(function (item) {
    menuStr += `
        <div class="menu-item">
            <p>${item.emoji}</p>
            <p>
                <span>${item.name}</span>
                <span>${item.ingredients}</span>
                <span>$${item.price}</span>
            </p>
            <div>
                <button id ="${item.id}" class="add-item">+</button>
            </div>
        </div>
                    `;
  });
  return menuStr;
}

function render() {
  document.querySelector(".menu-list-wrapper").innerHTML = generateMenuString();
}
render();

/*
 * order html code
<section class="order-wrapper hide-element">
        <p class="order-header">Your order</p>
        <div class="bill-items-wrapper">
          <div class="ordered-item">
            <span>Pizza</span>
            <span>$14</span>
          </div>
          <div class="ordered-item">
            <span>Beer</span>
            <span>$12</span>
          </div>
          <hr />
          <div class="ordered-item">
            <span>Total price:</span>
            <span>$26</span>
          </div>
        </div>
        <button>Complete order</button>
      </section>
 */
