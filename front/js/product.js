console.log("Hello home!");
const App = {
  init : function(){
    console.log("App.init");
    App.getOneProduct();
  },

  getOneProduct : function(){
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
          App.displayOneProduct(products);
        })
        .catch(function(err) {
          console.log(err);
      // Une erreur est survenue
        })
    );
  },

  /* displayOneProduct : function(products) {
    products.forEach(product => {
      const templateOneProductElt = document.querySelector('#templateOneProduct');
      const cloneOneProductElt = document.importNode(templateOneProductElt.content, true) ;
      const oneProducteltContent = cloneOneProductElt.querySelector('article');
      oneProducteltContent.querySelector('img').src = product.imageUrl;
      oneProducteltContent.querySelector('img').alt = product.altTxt;
      oneProducteltContent.querySelector('h1').textContent = product.name;
      oneProducteltContent.querySelector('#description').textContent = product.description;
      oneProducteltContent.querySelector('#price').textContent = product.price;
      // couleur ????

      document.querySelector('.item').appendChild(cloneOneProductElt);
    });
  }, */
}

document.addEventListener('DOMContentLoaded', App.init);