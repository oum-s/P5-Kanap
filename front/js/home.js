console.log("Hello home!");
const App = {
  init : function(){
    console.log("App.init");
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
    // on va chercher chaque produits avec leurs valeurs correspondantes
    products.forEach(product => {
      const templateElt = document.querySelector('#templateProducts');
      // clone la template
      const cloneElt = document.importNode(templateElt.content, true) ;
      // Met le contenue de la template ds balise link
      const eltContent = cloneElt.querySelector('a');
        // seectionne l'img de l'article et lui rajoute la valeur de l'api
        eltContent.querySelector('img').src = product.imageUrl;
        eltContent.querySelector('img').alt = product.altTxt;
        eltContent.querySelector('h3').textContent = product.name;
        eltContent.querySelector('p').textContent = product.description;
        eltContent.href = "./product.html?id=" + product._id;
        // ajoute le tout à son parent
          document.querySelector('.items').appendChild(cloneElt);
    });
  },
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', App.init);