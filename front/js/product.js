const params = new URLSearchParams(document.location.search)
const id = params.get("id")


let productData = []

const  fetchProduct = async () => {
    await fetch("http://localhost:3000/api/products")
          .then((res) => res.json())
          .then((data) => productData = data)
                                                      
  }



  const productDisplay = async () => {
    await fetchProduct() 

let productImg = document.querySelector(".item__img")
let productTitle = document.querySelector("#title")
let productPrice = document.querySelector("#price")
let productDescription = document.querySelector("#description")
let productColors = document.querySelector("#colors")


productData.forEach(element => {
    if (id === element._id) {
        productImg.innerHTML = `<img src="${element.imageUrl}" alt="${element.altTxt}"></img>`
        productTitle.innerHTML = `${element.name}`
        productPrice.innerHTML = `${element.price}`
        productDescription.innerHTML = `${element.description}`

        element.colors.forEach(color => {
            productColors.innerHTML += `<option value="${color}">${color}</option>`
        })
    }
})

}

productDisplay()
