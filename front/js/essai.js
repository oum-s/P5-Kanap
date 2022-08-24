
totalArticles : function(products) {
  let totalItems = 0;
  let productArrayInLocalStorage = JSON.parse(localStorage.getItem('allProduct'));
  for (l in productArrayInLocalStorage) {
    // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
    // et renvoie un entier (parseInteger), sur la base décimale de 10
    const newQuantity = parseInt(productArrayInLocalStorage[l].theQuantity);

    // attribuer la valeur retournée par parseInt à la variable totalItems
    totalItems += newQuantity;
  }
    // attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalItems;
    console.log('totalItem', totalItems);
},

// je calcule le montant total du panier
priceAmount : function(products) {
  const calculPrice = [];
  let productArrayInLocalStorage = JSON.parse(localStorage.getItem('allProduct'));
  products.forEach( product => {
    for (m = 0; m < productArrayInLocalStorage.length; m++) {
      // prix de l'article quantité * prix
      const cartAmount = product.price * productArrayInLocalStorage[m].theQuantity;
      console.log('product.price',product.price);
      console.log('quantité',productArrayInLocalStorage[m].theQuantity);
      console.log('cartAmount',cartAmount);
      calculPrice.push(cartAmount);
  
      // la fonction reduce() permet de garder en mémoire les résultats de l'opération
      // elle fonctionne comme une boucle, avec un accumulateur et la valeur courante
      const reduce = (previousValue, currentValue) => previousValue + currentValue;
      total = calculPrice.reduce(reduce);
    }
  } );
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}

} // fin else : s'il y a des produits dans le panier