// Récuperation de l'id du produit selectionné en page d'accueil
const params = new URLSearchParams(document.location.search)
const id = params.get("id")

// Tableau ou seront stockées les données de l'API
let productData = []

// Fonction recuperation données API
const  fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
          .then((res) => res.json())
          .then((data) => productData = data)                                                     
  }

// Fonction d'affichage du produit selectionné
  const productDisplay = async () => {
    await fetchProduct() 

const productImg = document.querySelector(".item__img")
const productTitle = document.querySelector("#title")
const productPrice = document.querySelector("#price")
const productDescription = document.querySelector("#description")
const productColors = document.querySelector("#colors")


productImg.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}"></img>`
productTitle.innerHTML = `${productData.name}`
productPrice.innerHTML = `${productData.price}`
productDescription.innerHTML = `${productData.description}`

productData.colors.forEach(color => {
            productColors.innerHTML += `<option value="${color}">${color}</option>`
    })
}

// Fonction d'enregistrement du panier dans le localstorage sous forme de chaine de caractères
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Fonction de creation de panier et d'affichage des produits present à l'interieur
const getCart = () => {
    let cart = localStorage.getItem("cart")
// Si panier vide retourne un tableau vide sinon    
    if (cart === null) {
        return []
    } 
// Si le panier n'est pas vide retourne le panier sous forme de tableau d'objets     
    else {
        return JSON.parse(cart)
    }
}

// Fonction d'ajout des produits sélectionnés au panier 
const addCart = (product) => {
    let cart = getCart()
    let foundProduct = cart.find(p => p.id === product.id && p.color === product.color)
// Si le produit existe déjà dans le localstorage, ajout seulement de la quantité du produit sélectionné au produit déjà existant à condition que le total n'excede pas 100
    if (foundProduct) {
        const total = foundProduct.quantity + product.quantity
        if (total > 100) {
            alert("Vous ne pouvez pas ajouter à votre panier plus de 100 fois le même article")
        } else {
            foundProduct.quantity += product.quantity
        }
    } 
// Si le produit n'existe pas dans le local storage, ajout de celui ci au panier    
    else {
        cart.push(product)
        alert("Votre produit à été ajouté au panier") 
    }

    saveCart(cart)
}

// Fonction d'écoute du bouton d'ajout au panier afin de récupérer les choix fait par l'utilisateur pour ensuite les envoyer au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    e.preventDefault()
    let color = document.querySelector("#colors").value
    let quantity = Number(document.querySelector("#quantity").value)
    
// Si pas de couleur ou quantité inférieur à 1 ou supérieur 100 et que la quantité n'est pas un nombre entier, message d'alerte
    if (color === "" || quantity < 1 || quantity > 100 || quantity % 1 !== 0) {
        alert("Veuillez selectionner une couleur et/ou ajouter une quantité comprise entre 1 et 100")
        } 
// Sinon on ajoute bien le produit au panier        
    else {
        const product = {
            id: id,
            color: color,
            quantity: quantity
            }
        
        addCart(product)  
        }   
    })

productDisplay()

