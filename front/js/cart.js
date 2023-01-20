// Récupération du panier et des ses données
let cart = JSON.parse(localStorage.getItem("cart"))

// Tableau ou seront stockées les données de l'API
let productData = []

// Fonction de récupération des données API
const  fetchProduct = async () => {
    await fetch("http://localhost:3000/api/products")
          .then((res) => res.json())
          .then((data) => productData = data)
}

// Fonction d'affichage du panier sur la page panier  
  const cartDisplay = async () => {
    await fetchProduct()

const cartProducts = document.getElementById("cart__items")
const ProductsTotalQUantity = document.querySelector("#totalQuantity")
const ProductsTotalPrice = document.querySelector("#totalPrice")
let totalQuantity = 0
let totalPrice = 0

if (cart && cart.length > 0) {
  for (let i = 0; i < cart.length; i++) {
    productData.filter((element) => element._id === cart[i].id)
               .forEach(e => {
         cartProducts.innerHTML += `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
         <div class="cart__item__img">
           <img src="${e.imageUrl}" alt="${e.altTxt}">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${e.name}</h2>
             <p>"${cart[i].color}"</p>
             <p>${e.price}€</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
             </div>
             <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>`

    ProductsTotalQUantity.innerHTML = `${totalQuantity += cart[i].quantity}`
    ProductsTotalPrice.innerHTML = `${totalPrice += e.price * cart[i].quantity}`

    cartProducts.addEventListener("click", deleteItem)
    cartProducts.addEventListener("change", changeQuantity)
      })    
    }
  }   
}

cartDisplay()

// Fonction de supression d'un produit dans le localstorage
const deleteItem = (e) => {
  if (e.target.classList.contains("deleteItem")) {
    targetId = e.target.closest('.cart__item').dataset.id
    targetColor = e.target.closest('.cart__item').dataset.color
    cart = cart.filter(item => item.id !== targetId  || item.color !== targetColor)
    localStorage.setItem("cart", JSON.stringify(cart))
    location.reload()
  }
}

// Fonction pour modifier la quantité d'un d'un produit dans le localstorage  
const changeQuantity = (e) => {
if (e.target.classList.contains("itemQuantity")) {
  targetId = e.target.closest('.cart__item').dataset.id
  targetColor = e.target.closest('.cart__item').dataset.color 
  selectedProduct = cart.find(item => item.id === targetId && item.color === targetColor)
  selectedProduct.quantity = Number(e.target.value)
// Si la quantité du produit sélectionné est changée par l'utilisateur à plus de 100 ou moins de 1, message d'alerte  
  if (selectedProduct.quantity < 1 || selectedProduct.quantity > 100) {
    alert("Veuillez ajouter une quantité comprise entre 1 et 100")
  } 
// Sinon le changement s'effectue correctement et est mis à jour dans le localstorage, puis la page est rechargée  
  else {
    localStorage.setItem("cart", JSON.stringify(cart))
    location.reload()
    }
  }
}

// Validation du formulaire
const form = document.querySelector(".cart__order__form")
const firstNameInput = document.querySelector('#firstName')
const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg')
const lastNameInput = document.querySelector('#lastName')
const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
const addressInput = document.querySelector('#address')
const addressErrorMsg = document.querySelector('#addressErrorMsg')
const cityInput = document.querySelector('#city')
const cityErrorMsg = document.querySelector('#cityErrorMsg')
const emailInput = document.querySelector('#email')
const emailErrorMsg = document.querySelector('#emailErrorMsg')
const btnOrder = document.querySelector('#order')

// RegExp
const nameRegExp = new RegExp("^(?=.{2,})([A-Z][a-z]+[- ]?)+(?: [A-Z][a-z]+)?$")
const addressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$")
const cityRegExp = new RegExp(/^[a-zA-Z\u0080-\u024F\s\/\-\']+$/)
const emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

// Fonction d'écoute du formulaire afin de vérifier la validité des champs
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let isValid = true
  if (!nameRegExp.test(firstNameInput.value)) {
    firstNameErrorMsg.textContent = 'Champ invalide, veuillez entrer votre prénom.'
    isValid = false
  } else {
    firstNameErrorMsg.textContent = ''
  }

  if (!nameRegExp.test(lastNameInput.value)) {
    lastNameErrorMsg.textContent = 'Champ invalide, veuillez entrer votre nom.'
    isValid = false
  } else {
    lastNameErrorMsg.textContent = ''
  }

  if (!addressRegExp.test(addressInput.value)) {
    addressErrorMsg.textContent = 'Champ invalide, veuillez entrer votre adresse postale.'
    isValid = false
  } else {
    addressErrorMsg.textContent = ''
  }

  if (!cityRegExp.test(cityInput.value)) {
    cityErrorMsg.textContent = 'Champ invalide, veuillez entrer votre ville.'
    isValid = false
  } else {
    cityErrorMsg.textContent = ''
  }

  if (!emailRegExp.test(emailInput.value)) {
    emailErrorMsg.textContent = 'Champ invalide, veuillez entrer votre email.'
    isValid = false
  } else {
    emailErrorMsg.textContent = ''
  }

  if (isValid) {
    orderItems()
  }
})

// Fonction de récupération des données du formulaire et de l'id des produits commandés
const orderItems = () => {
  if(cart && cart.length === 0) {
    alert("Pour passer votre commande, veuillez ajouter des produits à votre panier")
    return;
  } 
  const inputs = document.querySelectorAll('#firstName, #lastName, #address, #city, #email')

  productID = [];
  for (let i = 0; i < cart.length; i++) {
  productID.push(cart[i].id);
  }

  let order = {
    contact: {
      firstName: inputs[0].value,
      lastName: inputs[1].value,
      address: inputs[2].value,
      city: inputs[3].value,
      email: inputs[4].value,
    },
    products: productID
  }
  
fetch("http://localhost:3000/api/products/order", {
  method: 'POST',
  body: JSON.stringify(order),
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
  })
.then(res => res.json())
.then((data) => {
  const orderId = data.orderId
  window.location.href = `confirmation.html?orderId=${orderId}`
  })
}






