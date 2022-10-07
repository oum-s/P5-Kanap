const Appl = {
  init : function(){
    // récup l'url de la page actuel
    const urlId = window.location.search;
    // utilisation de URLSearchParams pour avoir plus de fonctionnalité sur l'url
    const urlSearchParams = new URLSearchParams(urlId);
    const productId = urlSearchParams.get("id");
    Appl.getOneProduct(productId);    
  },
  // Afficher l'API
  getOneProduct : function(productId){
    console.log(productId)
    return(
      fetch(`http://localhost:3000/api/products/${productId}`)
      .then(function(res) {
        // vérifie que la requête s’est bien passée
        if(res.ok) {
        //Récupère le résultat de la requête au format json 
          return res.json();
        }
      })
        .then(function(product) {
          //  nous le retournons et récupérons sa vraie valeur
          console.log('ca marche');
          Appl.displayOneProduct(product, productId);
          Appl.addProductCart(product, productId);
        })
          .catch(function(err) {
            console.log(err);
          })
    );
  },
  // Affichage de tous les produits
  displayOneProduct : function(product, productId){
    /* // récup l'url de la page actuel
    const urlId = window.location.search;
    // utilisation de URLSearchParams pour avoir plus de fonctionnalité sur l'url
    const urlSearchParams = new URLSearchParams(urlId); */
      // on va chercher chaque produits avec leurs valeurs correspondantes
      /* products.forEach(product => { */
        // on récupère un seul id avec ses valeurs correspondantes
        // si l'id de l'url correspond à l'id de l'API, faire l'affichage
        if (productId === product._id){
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
          console.log('erreur');
        }
      /* }
      ); */
  },
  // ajout d'un produit au panier
  addProductCart : function(product, productId){
    // selectionner les éléments nécessaires
      let button = document.querySelector('#addToCart');
      const selectColor = document.getElementById('colors');
      const quantityInput = document.querySelector('#quantity');
      const theSelect = selectColor.value;
        let productSelectedArray = JSON.parse(localStorage.getItem('allProduct'));
          // tableau des produits qui seront dans le local storage
          if (productSelectedArray == null){
            productSelectedArray = [];
          } 
          

              if(productId === product._id){

                // au clic on envoie les produits selectionnés dans le localstorage
                button.addEventListener("click", (e) => {
                  e.preventDefault();
                  // liste des elements qui s'afficheront dans le panier
                  productSelectedObject = {
                    theId : product._id, 
                    theImage : product.imageUrl,
                    theName : product.name,
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
                      console.log("Votre article a bien été ajouté au panier"); 
                      //si le tableau est vide on met l'objet dans le tableau et on l'envoie dans le localstorage
                        if(productSelectedArray.length === 0){
                          // met à jour le ls 'product'
                          localStorage.setItem('product', JSON.stringify(productSelectedObject));
                          // envoi l'objet dans le ls product
                          productSelectedArray.push(productSelectedObject);
                          // met à jour le ls allproduct avec les info de l'array
                          localStorage.setItem('allProduct', JSON.stringify(productSelectedArray));

                        }else{
                          // Selectionner le produit dont l’id correspond à un autre id et la même couleur présent dans le panier<
                          foundSameProduct = productSelectedArray.find(p => p.theId === productSelectedObject.theId && p.theColor === productSelectedObject.theColor);
                          if (foundSameProduct == undefined) {
                            localStorage.setItem('product', JSON.stringify(productSelectedObject));
                            productSelectedArray.push(productSelectedObject);
                            localStorage.setItem('allProduct', JSON.stringify(productSelectedArray));
                            
                          }else{
                            localStorage.setItem('product', JSON.stringify(productSelectedObject));
                            // selectionner l'index qui a un doublon afin de modifier la quantité
                            indexOfQuantity = productSelectedArray.findIndex((x => x.theQuantity == foundSameProduct.theQuantity));
                            // je met à jour la quantité du localstorage en incrementant le nombre de produit que je viens d'ajouter avec le nombre de produit qui était déjà présent
                            productSelectedArray[indexOfQuantity].theQuantity = productSelectedObject.theQuantity += parseInt(foundSameProduct.theQuantity);
                            localStorage.setItem('allProduct', JSON.stringify(productSelectedArray)); 
                          } 
                        }   
                    }   
                    
                });
                      
              }else{
                console.log('no panier')
              };
  }
// fin fonction Appl
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appl.init);