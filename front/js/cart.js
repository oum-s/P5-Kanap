const App = {
  init : function(){
    App.displayCart();
  },
  /* getOneProduct : function(){
    return(
      fetch(`http://localhost:3000/api/products`)
      .then(function(res) {
        // vérifie que la requête s’est bien passée
        if(res.ok) {
        //Récupère le résultat de la requête au format json 
          return res.json();
        }
      })
      .then(function(products) {
        //  nous le retournons et récupérons sa vraie valeur
        console.log('ca marche');
        App.displayOneProduct(products);
      })
      .catch(function(err) {
        console.log(err);
      })
    );
  }, */
  displayCart : function(){
    console.log('hey cart!');
    let addProduct = JSON.parse(localStorage.getItem('product'));
    if (addProduct) {
      return addProduct;
      console.log(addProduct);
      
    }
  }
}
//  l'info du produit en tant que parametre 
// recupérer le bouton 
// ajoute eventlistener au bouton : 
// variable select recupere toute la valeur
// Envvoyer tout dans localStoragevariable produittaleau  cherche *

// appeler toutes les functions
document.addEventListener('DOMContentLoaded', App.init);