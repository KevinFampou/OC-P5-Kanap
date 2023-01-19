// Fonction de récupération de l'id de commande
const getOrderId = () => {
    const str = window.location.href;
    const url = new URL(str);
    return url.searchParams.get("orderId")
}

// Fonction d'affichage de l'id de commande
const displayOrderId = () => {
    const orderId = getOrderId()
    const orderIdLocation = document.querySelector('#orderId')
    orderIdLocation.innerHTML = orderId
    localStorage.clear()
}

displayOrderId()