console.log('hey, you');
let productList = {};
const Appl = {
  init : function(){
         console.log("Appl.init activé");
         Appl.getOneProduct();
  },
  // Afficher toutes les API
getOneProduct : function(){
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
      Appl.displayOneProduct(products);
      Appl.addProductCart(products);
    })
    .catch(function(err) {
      console.log(err);
    })
  );
},
// Affichage de tous les produits
displayOneProduct : function(products){
  // récup l'url de la page actuel
  const queryStringUlrId = window.location.search;
  // utilisation de URLSearchParams pour avoir plus de fonctionnalité sur l'url
  const urlSearchParams = new URLSearchParams(queryStringUlrId);
  // on va chercher chaque produits avec leurs valeurs correspondantes
  products.forEach(product => {
    // on récupère un seul id avec ses valeurs correspondantes
    // si l'id de l'url correspond à l'id de l'API, faire l'affichage
    if( urlSearchParams.get('id') === product._id){
      console.log('ok');
      // selectionne la template
      const templateOneProductElt = document.querySelector('#templateOneProduct');
      // clone la template
      const cloneTemplateOneProductElt = document.importNode(templateOneProductElt.content, true) ;
      // Met le contenue de la template ds balise article
      const oneProducteltContent = cloneTemplateOneProductElt.querySelector('article');
      console.log(oneProducteltContent);
      // seectionne l'img de l'article et lui rajoute la valeur de l'api
      oneProducteltContent.querySelector('img').src = product.imageUrl;
      oneProducteltContent.querySelector('img').alt = product.altTxt;
      oneProducteltContent.querySelector('h1').textContent = product.name;
      oneProducteltContent.querySelector('#description').textContent = product.description;
      oneProducteltContent.querySelector('#price').textContent = product.price;
      // ajoute le tout à son parent
      document.querySelector('.item').appendChild(cloneTemplateOneProductElt);
      

    }else{
      console.log('erreureuh');
    }
  }
  );
},

addProductCart : function(products){
  // selectionner les éléments nécessaires
  const queryStringUlrId = window.location.search;
  const urlSearchParams = new URLSearchParams(queryStringUlrId);
  let button = document.querySelector('#addToCart');
  let select = document.getElementById('colors');
  let quantityInput = document.querySelector('#quantity'); 
  // foreach pour récupérer l'id de l'url et selectionner les éléments de l'api pour le tableau
  products.forEach(product => {
    if( urlSearchParams.get('id') === product._id){
      console.log('ok panier');
      // essayer de le placer ailleurs
      productList = {
        theId : product._id, 
        theImage : product.imageUrl,
        theName : product.name,
        theColor : product.colors,
        thePrice : product.price,
          }
      
        }else{
        console.log('no panier')
      };
    });
  // onclick on envoie les infos nécessaire au localstorage
  button.addEventListener("click", () => {
   const newProductList = Object.assign({}, productList, {
    theColor : `${select.value}`,
    theQuantity : `${quantityInput.value}`
  });
  localStorage.setItem('product', JSON.stringify(newProductList));
  let productArray = JSON.parse(localStorage.getItem('product'));
    console.log(productArray);
    /* if(productArray == null){
      productArray = [];
      productArray.push(productList);
      console.log(productList);
      localStorage.setItem('product', JSON.stringify(productArray));
    } */ 
  })
}
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appl.init);