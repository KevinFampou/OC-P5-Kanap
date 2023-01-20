// Tableau ou seront stockées les données de l'API
let kanapData = []

// Fonction de récupération des données API
  fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => kanapData = data)                                               
}

// Fonction d'affichage des produits de la page d'accueil
const kanapDisplay = async () => {
      await fetchKanap() 

      kanapData.forEach(element => {

        const items = document.getElementById("items")

        items.innerHTML += 
        `
            <a href="./product.html?id=${element._id}">
                <article>
                    <img src="${element.imageUrl}" alt="${element.altTxt}">
                    <h3 class="productName">${element.name}</h3>
                    <p class="productDescription">${element.description}</p>
                </article>
            </a>
        `
    });
}

kanapDisplay()