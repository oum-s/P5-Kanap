console.log('salut cart!');
const Appli = {
  init : function(){
    console.log('hey init');
    Appli.fetchProducts();
    Appli.displayCart();
    Appli.updateProduct();
    Appli.deleteProduct();
  },

  fetchProducts : function(){
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
        Appli.resultProducts(products);
      })
      .catch(function(err) {
        console.log(err);
      })
    );
  },

  displayCart : function(){
    let productArrayInLocalStorage = JSON.parse(localStorage.getItem('allProduct'));
    localStorage.setItem('allProduct', JSON.stringify(productArrayInLocalStorage));
    // on duplique la div cart
    const templateCartElt = document.querySelector('.templateCart');
    // on duplique chaque produit venant du localstorage pour l'insérer dans cart_item 
    productArrayInLocalStorage.forEach(oneProduct => {
      const cloneTemplateCartElt = document.importNode(templateCartElt.content, true);
      const cartEltContent = cloneTemplateCartElt.querySelector('article');
      cartEltContent.setAttribute('data-id', oneProduct.theId);
      cartEltContent.setAttribute('data-color', oneProduct.theColor);
      cartEltContent.querySelector('img').src = oneProduct.theImage;
      // cartEltContent.querySelector('img').alt = product.altTxt;
      cartEltContent.querySelector('.cart__item__content__description h2').textContent = oneProduct.theName;
      cartEltContent.querySelector('.cart__item__content__description p').textContent = oneProduct.theColor;
      cartEltContent.querySelector('.thePrice').textContent = oneProduct.thePrice;
      cartEltContent.querySelector('.itemQuantity').value = oneProduct.theQuantity;
        // ajoute le tout à son parent
      document.querySelector('#cart__items').appendChild(cloneTemplateCartElt);
    });
  },

  updateProduct : function(){
    // select tous les input quantity
    const updateItems = document.querySelectorAll('.itemQuantity')
    // recup le tableau du localstorage
    let productArrayInLocalStorage = JSON.parse(localStorage.getItem('allProduct'));

    // pour chaque input, quand la valeur change on la modifie dans le tableau (si id/color de l'article selectionné == id/color d'un objet du tableau -> changer l'objet du tableau)
    updateItems.forEach(item => {
      item.addEventListener('change', event => {
        // vise la balise article la plus proche de l'élément cliqué
        const article = event.target.closest('article');
        // attrape attribut/couleur de l'article en question
        const thisId = article.getAttribute('data-id');
        const thisColor = article.getAttribute('data-color');

        // find l'objet du tableau == article en question
        productToUpdate = productArrayInLocalStorage.find(x => x.theId == thisId && x.theColor == thisColor );
        // met à jour la valeur de la quantité de l'objet qui correspond
        productToUpdate.theQuantity = item.value;
        // met à jour le localstorage
        localStorage.setItem('allProduct', JSON.stringify(productArrayInLocalStorage)); 
        console.log(productArrayInLocalStorage);
      })
    })
  }, 

  deleteProduct : function(){
    const deleteItems = document.querySelectorAll('.deleteItem')
    let productArrayInLocalStorage = JSON.parse(localStorage.getItem('allProduct'));

    deleteItems.forEach(item => {
      item.addEventListener('click', event => {
        const article = event.target.closest('article');
        const thisId = article.getAttribute('data-id');
        const thisColor = article.getAttribute('data-color');
        console.log(productArrayInLocalStorage);

        // si l'article a le meme id et couleur que dans un findId/couleur de productArrayInLocalStorage = supprimer le found
        // l'objet a été récupéré
        productToDelete = productArrayInLocalStorage.find(x => x.theId == thisId && x.theColor == thisColor );
        
        productArrayInLocalStorage.pop(productToDelete) ;
        localStorage.setItem('allProduct', JSON.stringify(productArrayInLocalStorage)); 
        console.log(productToDelete);
        console.log(productArrayInLocalStorage);
      })
    })
  },

  resultProducts : function(products){
        // on recupère les info du localstorage pour utiliser la quantité
    let productArrayInLocalStorage = JSON.parse(localStorage.getItem('allProduct'));
    console.log('productArrayInLocalStorage', productArrayInLocalStorage);
    // déclarer les variables pour qu'elles soient gloabales
    let finalPrice = 0;
    // variable du calcul quantité * prix
    let sum = 0;
    // le nombre total des produits sélectionnés
    let totalProducts = 0;
    // pour chaque produit du localstorage, vérifier que l'id correspond à l'id de l'API pour pouvoir faire le calcul
    productArrayInLocalStorage.forEach(theProduct => {
      // foreach des produits de l'api
      products.forEach(product => {

        if ( product._id == theProduct.theId ){
        console.log('good');
        // renvoyer un entier pour les prix et les quantités
        let productPrice = parseInt(product.price);
        quantityOfOneProduct = parseInt(theProduct.theQuantity);
        totalProducts += quantityOfOneProduct ;
        console.log('productPrice et input', productPrice, quantityOfOneProduct);
        // calcul : prixDuProduit * quantitéDeLinput
          sum = productPrice * totalProducts;
          console.log('sum is:', sum);
          finalPrice = sum;
          /* finalPrice += sum;
          console.log(sum); */
        // additionner le prix de chaque produit du tableau pour avoir le total
          
        };

      });

    });
    console.log(sum)
    // afficher la valeur de totalQuantity 
    const totalQuantity = document.querySelector('#totalQuantity');
    totalQuantity.textContent = totalProducts;
    console.log('totalProducts', totalProducts);
    
          console.log('total', finalPrice);
        //
          // for (let i = 0; i < productArrayInLocalStorage.length; i++){ 
          //     finalPrice = sum[i] ;
          //     console.log('longueur:',productArrayInLocalStorage.length);
          // } 

          let totalPrice = document.getElementById('totalPrice');
          totalPrice.textContent = finalPrice;
          console.log('finalPrice', finalPrice);
  } 
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);