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
        Appli.totalArticles(products);
        Appli.priceAmount(products);
      })
      .catch(function(err) {
        console.log(err);
      })
    );
  },

  displayCart : function(){
    // on recupère les info du localstorage
    let productArray = JSON.parse(localStorage.getItem('allProduct'));
    localStorage.setItem('allProduct', JSON.stringify(productArray));
    // on duplique la div cart
    const templateCartElt = document.querySelector('.templateCart');
    // on duplique chaque produit venant du localstorage pour l'insérer dans cart_item 
    productArray.forEach(oneProduct => {
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
    let productArray = JSON.parse(localStorage.getItem('allProduct'));

    // pour chaque input, quand la valeur change on la modifie dans le tableau (si id/color de l'article selectionné == id/color d'un objet du tableau -> changer l'objet du tableau)
    updateItems.forEach(item => {
      item.addEventListener('change', event => {
        // vise la balise article la plus proche de l'élément cliqué
        const article = event.target.closest('article');
        // attrape attribut/couleur de l'article en question
        const thisId = article.getAttribute('data-id');
        const thisColor = article.getAttribute('data-color');

        // find l'objet du tableau == article en question
        productToUpdate = productArray.find(x => x.theId == thisId && x.theColor == thisColor );
        // met à jour la valeur de la quantité de l'objet qui correspond
        productToUpdate.theQuantity = item.value;
        // met à jour le localstorage
        localStorage.setItem('allProduct', JSON.stringify(productArray)); 
        console.log(productArray);
      })
    })
  }, 

  deleteProduct : function(){
    const deleteItems = document.querySelectorAll('.deleteItem')
    let productArray = JSON.parse(localStorage.getItem('allProduct'));

    deleteItems.forEach(item => {
      item.addEventListener('click', event => {
        const article = event.target.closest('article');
        const thisId = article.getAttribute('data-id');
        const thisColor = article.getAttribute('data-color');
        console.log(productArray);

        // si l'article a le meme id et couleur que dans un findId/couleur de productArray = supprimer le found
        // l'objet a été récupéré
        productToDelete = productArray.find(x => x.theId == thisId && x.theColor == thisColor );
        
        productArray.pop(productToDelete) ;
        localStorage.setItem('allProduct', JSON.stringify(productArray)); 
        console.log(productToDelete);
        console.log(productArray);
      })
    })
  },

 /*  resultProducts : function(products){
    let productArray = JSON.parse(localStorage.getItem('allProduct'));
    //trouve pas le tableau
    console.log('productArray',productArray);
    let finalPrice = 0;
    let sum = 0;
    productArray.forEach(theProduct => {
      
      products.forEach(product => {

        if ( product._id == theProduct.theId ){
        console.log('good');
        
        let calculPrice = parseInt(product.price);
        let calculInput = parseInt(theProduct.theQuantity);
        console.log('calculPrice et input', calculPrice, calculInput);
        // calcul : prixDuProduit * quantitéDeLinput
          sum = calculPrice * calculInput;
          console.log('sum is:', sum);

        // additionner le prix de chaque produit du tableau pour avoir le total
          
        };
      });

    });
    finalPrice = Number(sum) * Number(productArray.length);
          console.log('total', finalPrice);
        //
          // for (let i = 0; i < productArray.length; i++){ 
          //     finalPrice = sum[i] ;
          //     console.log('longueur:',productArray.length);
          // } 

          let totalPrice = document.getElementById('totalPrice');
          totalPrice.textContent = finalPrice;
          console.log('finalPrice', finalPrice);
  }  */
  totalArticles : function(products) {
    let totalItems = 0;
    let productArray = JSON.parse(localStorage.getItem('allProduct'));
    for (l in productArray) {
      // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
      // et renvoie un entier (parseInteger), sur la base décimale de 10
      const newQuantity = parseInt(productArray[l].theQuantity);
  
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
    let productArray = JSON.parse(localStorage.getItem('allProduct'));
    products.forEach( product => {
      for (m = 0; m < productArray.length; m++) {
        // prix de l'article quantité * prix
        const cartAmount = product.price * productArray[m].theQuantity;
        console.log('product.price',product.price);
        console.log('quantité',productArray[m].theQuantity);
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
  

// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);