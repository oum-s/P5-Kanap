console.log('salut!');
const Appli = {
  init : function(){
    Appli.displayCart();
  },
  displayCart : function(){
    // on recupère les info du localstorage
    let productArray = JSON.parse(localStorage.getItem('product'));
    localStorage.setItem('product', JSON.stringify(productArray));
    console.log(productArray);
    // on duplique la div cart
    const templateCartElt = document.querySelector('.templateCart');
    // on duplique chaque produit venant du localstorage pour l'insérer dans cart_item 
    productArray.forEach(oneProduct => {
      const cloneTemplateCartElt = document.importNode(templateCartElt.content, true);
      const cartEltContent = cloneTemplateCartElt.querySelector('article');
      console.log(cartEltContent);
      cartEltContent.querySelector('img').src = oneProduct.theImage;
      console.log(cartEltContent.querySelector('img').src = oneProduct.theImage);
      // cartEltContent.querySelector('img').alt = product.altTxt;
      cartEltContent.querySelector('.cart__item__content__description h2').textContent = oneProduct.theName;
      cartEltContent.querySelector('.cart__item__content__description p').textContent = oneProduct.theColor;
      cartEltContent.querySelector('.thePrice').textContent = oneProduct.thePrice;
      cartEltContent.querySelector('.itemQuantity').value = oneProduct.theQuantity;
        // ajoute le tout à son parent
      document.querySelector('#cart__items').appendChild(cloneTemplateCartElt);

    });

  }
  
}
//  l'info du produit en tant que parametre 
// recupérer le bouton 
// ajoute eventlistener au bouton : 
// variable select recupere toute la valeur
// Envvoyer tout dans localStoragevariable produittaleau  cherche *

// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);