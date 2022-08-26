console.log('hey, product');
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
    const urlId = window.location.search;
    // utilisation de URLSearchParams pour avoir plus de fonctionnalité sur l'url
    const urlSearchParams = new URLSearchParams(urlId);
    // on va chercher chaque produits avec leurs valeurs correspondantes
    products.forEach(product => {
      // on récupère un seul id avec ses valeurs correspondantes
      // si l'id de l'url correspond à l'id de l'API, faire l'affichage
      if( urlSearchParams.get('id') === product._id){
        console.log('foreach ok');
        // selectionne la template
        const templateOneProductElt = document.querySelector('#templateOneProduct');
        // clone la template
        const cloneTemplateOneProductElt = document.importNode(templateOneProductElt.content, true) ;
        // Met le contenue de la template ds balise article
        const oneProducteltContent = cloneTemplateOneProductElt.querySelector('article');
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
    const urlId = window.location.search;
    const urlSearchParams = new URLSearchParams(urlId);
    let button = document.querySelector('#addToCart');
    const selectColor = document.getElementById('colors');
    const quantityInput = document.querySelector('#quantity');
    const theSelect = selectColor.value;
    let productSelectedArray = JSON.parse(localStorage.getItem('allProduct'));
    // tableau des produits qui seront dans le local storage
    if (productSelectedArray == null) productSelectedArray = [];

    // foreach pour récupérer l'id de l'url et selectionner les éléments de l'api pour le tableau
    products.forEach(product => {

      if( urlSearchParams.get('id') === product._id){
        console.log('ok panier');

        // au clic on envoie les produits selectionnés dans le localstorage
        button.addEventListener("click", (e) => {
          e.preventDefault();
          // liste des elements qui s'afficheront dans le panier
          productSelectedObject = {
            theId : product._id, 
            theImage : product.imageUrl,
            theName : product.name,
            /* thePrice : parseInt(product.price), */
            theColor : selectColor.value,
            theQuantity : parseInt(quantityInput.value)          
          };          
          // if else pour empêcher le client d'envoyer un produit vide
            if (selectColor.value  == false && quantityInput.value == 0 ) {
              confirm("Veuillez sélectionner une couleur et le nombre d'articles souhaités");
            }else if (selectColor.value == false) {
              confirm("Veuillez sélectionner une couleur");
            } else if (quantityInput.value == 0) {
              confirm("Veuillez sélectionner le nombre d'articles souhaités");
            } else {
              /* alert("Votre article a bien été ajouté au panier"); */
              console.log("Votre article a bien été ajouté au panier"); 
              //si le tableau est vide on met l'objet dans le tableau et on l'envoie dans le localstorage
                if(productSelectedArray.length === 0){

                  localStorage.setItem('product', JSON.stringify(productSelectedObject));
                  productSelectedArray.push(productSelectedObject);
                  localStorage.setItem('allProduct', JSON.stringify(productSelectedArray));
                  console.log("1");  

                }else{
                  // Selectionner l'objet dont l’id correspond à un autre id et la même couleur présent dans le panier 
                  /* let productLocalStorage = JSON.parse(localStorage.getItem('product')); */
                  foundSameProduct = productSelectedArray.find(p => p.theId === productSelectedObject.theId && p.theColor === productSelectedObject.theColor);
                  console.log('array', productSelectedArray);
                  console.log("2");
                  if (foundSameProduct == undefined) {
                    localStorage.setItem('product', JSON.stringify(productSelectedObject));
                    productSelectedArray.push(productSelectedObject);
                    localStorage.setItem('allProduct', JSON.stringify(productSelectedArray));
                    console.log("2.1");
                    
                   }else{
                    localStorage.setItem('product', JSON.stringify(productSelectedObject));
                    indexOfQuantity = productSelectedArray.findIndex((x => x.theQuantity == foundSameProduct.theQuantity));
                    // je met à jour la quantité du localstorage en incrementant le nombre de produit que je viens d'ajouter avec le nombre de produit qui était déjà présent
                    productSelectedArray[indexOfQuantity].theQuantity = productSelectedObject.theQuantity += parseInt(foundSameProduct.theQuantity);
                    /* const productSelectedArray = new productSelectedArray; */
                    localStorage.setItem('allProduct', JSON.stringify(productSelectedArray)); 
                    console.log("2.2");
                    console.log('yesss', productSelectedArray);  
                  } 
                }   
            }   
            
        });
              
      }else{
        console.log('no panier')
      };
    });
  }
// fin fonction Appl
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appl.init);