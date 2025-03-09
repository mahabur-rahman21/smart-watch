const ringButton = document.querySelectorAll(".ring-button");

let productImageBase = "../images/";

for (let i = 0; i < ringButton.length; i++) {
  const element = ringButton[i];
  element.addEventListener("click", function (e) {
    const color = e.target.id.replace("-color", "");

    for (let j = 0; j < ringButton.length; j++) {
      ringButton[j].classList.remove("border-purple-600");
      ringButton[j].classList.add("border-white");
    }

    e.target.classList.add("border-purple-600");
    e.target.classList.remove("border-white");

    const productImage = document.getElementById("product-image");

    productImage.src = productImageBase + color + ".png";
  });
}

function selectWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];

  for (let i = 0; i < sizes.length; i++) {
    const button = document.getElementById("size-" + sizes[i]);

    const element = sizes[i];

    if (size === element) {
      button.classList.add("border-purple-600");
    } else {
      button.classList.remove("border-purple-600");
    }
  }
}

const quantityButton = document.querySelectorAll(".quantity-button");

for (const btn of quantityButton) {
  btn.addEventListener("click", function (e) {
    const amount = e.target.innerText === "+" ? 1 : -1;
    const quantityElemant = document.getElementById("quantity");
    const currentQuantity = parseInt(quantityElemant.innerText);
    const newQuanttity = Math.max(0, currentQuantity + amount);
    quantityElemant.innerText = newQuanttity;
  });
}



let cartCount = 0;
let cartItems = [];

document.getElementById("add-to-cart").addEventListener("click", function () {
  const quantity = parseInt(document.getElementById("quantity").innerText);
  const selectedColorButton =  document.querySelector(".border-purple-600.w-6")
  const selectedSizeButton =  document.querySelector(".border-purple-600:not(.w-6)")
  
  if (selectedColorButton != null  && quantity >0 && selectedSizeButton != null) {
    document.getElementById("checkout-container").classList.remove("hidden")
    cartCount=cartCount+quantity
    document.getElementById("cart-count").innerText=cartCount

    const selectedColor=selectedColorButton.id.split("-")[0]
    const selectedSize= selectedSizeButton.innerText.split(" ")[0]
    const selectedPrice= selectedSizeButton.innerText.split(" ")[1].split("$")[1]

    cartItems.push({
      image:selectedColor+".png",
      title:"Classy Modern Smart Watch",
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity*parseInt(selectedPrice)
    }) 
 
  }else{
    alert("please Select item")
  }
  
});



document.getElementById("checkout-btn").addEventListener("click", function(){
  const cartModal=document.getElementById("cart-modal")
  const cartItem=document.getElementById("cart-items")

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];

   const row=document.createElement("tr")


   row.classList.add("border-b")


   row.innerHTML=`
   <td class="py-2 px-4">
      <div class="flex items-center space-x-2">
        <img class="h-12 w-12 object-cover rounded-md" src="${productImageBase}${item.image}" alt="">
        <span class="font-semibold">${item.title}</span>
      </div>
    </td>
    <td class="py-2 px-4">${item.color}</td>
    <td class="py-2 px-4">${item.size}</td>
    <td class="py-2 px-4">${item.quantity}</td>
    <td class="py-2 px-4">$${item.price}</td>
   `

   cartItem.appendChild(row)


    
  }

  cartModal.classList.remove("hidden")

  
})



document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    document.getElementById("cart-modal").classList.add("hidden");
  });
document
  .getElementById("checkout")
  .addEventListener("click", function () {
    window.location.href="https://t.me/soikot2"
  });