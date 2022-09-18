const App = {
  init : function(){
    App.getProducts();
  },

// fonction getProducts sert à appeler l'API
  getProducts : function(){
    return(
      fetch("http://localhost:3000/api/products")
        .then(function(res) {
          // vérifie que la requête s’est bien passée
          if (res.ok) {
          //Récupère le résultat de la requête au format json 
            return res.json();
          }
        })
          .then(function(products) {
            //  nous le retournons et récupérons sa vraie valeur
            App.displayProducts(products);
          })
            .catch(function(err) {
              console.log(err);
          // Une erreur est survenue
            })
    );
  },
// Affichage de tous les produits
  displayProducts : function(products) {
    const itemProducts = document.getElementById('items');
    // on va chercher chaque produits avec leurs valeurs correspondantes
    products.forEach(product => {
      
        itemProducts.innerHTML +=`
           <a href="./product.html?id=${product._id}" id="product_link">  
             <article> 
               <img src=${product.imageUrl} alt=${product.altTxt}> 
                 <h3 class="productName">${product.name}</h3> 
                 <p class="productDescription">${product.description}</p> 
             </article> 
           </a> 
        `
    });
  },
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', App.init);