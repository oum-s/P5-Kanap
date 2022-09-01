// récupérer l'id du num de commande
const orderId = document.querySelector("#orderId");
// recupérer l'id du localstorage
let getId = localStorage.getItem('orderId');
orderId.innerHTML = `${getId}`;
localStorage.clear();
