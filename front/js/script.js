let kanapData = []
const items = document.getElementById("items")

  fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => kanapData = data)                                               
}

const kanapDisplay = async () => {
    await fetchKanap() 

    kanapData.forEach(element => {
        items.innerHTML += 
        `<div>
            <a href="./product.html?id=${element._id}">
                <article>
                    <img src="${element.imageUrl}" alt="${element.altTxt}">
                    <h3 class="productName">${element.name}</h3>
                    <p class="productDescription">${element.description}</p>
                </article>
            </a>
        </div>`
    });
}

kanapDisplay()