console.log("Hello home!");
const App = {
  init : function(){
    console.log("App.init");
    App.getProducts();
  },

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

  displayProducts : function(products) {
    products.forEach(product => {
      const templateElt = document.querySelector('#templateProducts');
      const cloneElt = document.importNode(templateElt.content, true) ;
      const eltContent = cloneElt.querySelector('a');
      eltContent.querySelector('img').src = product.imageUrl;
      eltContent.querySelector('img').alt = product.altTxt;
      eltContent.querySelector('h3').textContent = product.name;
      eltContent.querySelector('p').textContent = product.description;
      eltContent.href = "./product.html?id=" + product._id;
      
      document.querySelector('.items').appendChild(cloneElt);
    });
  },
}

document.addEventListener('DOMContentLoaded', App.init);