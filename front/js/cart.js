console.log('salut!');
const Appli = {
  init : function(){
    Appli.displayCart();
    /* Appli.saveBasket();
    Appli.getBasket(); */
  },
  // saveBasket: function(product){
  //   localStorage.setItem('product', JSON.stringify(productA));
  // },
  // getBasket : function() {
  //   return JSON.parse(localStorage.getItem('product'));
  // },
  // addCart : function(product){
  // console.log('coucou');
  // let foundProduct = productA.find(p => p._id == productA._id);
  // if (foundProduct != undefined){
  //   foundProduct.quantity++;
  // }else{
  //   product.quantity = 1;
  //   productA.push(product);
  // }
  
  // Appli.saveBasket(productA);
  // console.log(product);
  // },
  displayCart : function(){
    let productArray = Appli.getBasket();
    localStorage.setItem('product', JSON.stringify(productArray));
    const templateCartElt = document.querySelector('.templateCart');
    const cloneTemplateCartElt = document.importNode(templateCartElt.content, true);

    const cartEltContent = cloneTemplateCartElt.querySelector('article');
    
    cartEltContent.querySelector('img').src = productArray.theImage;
    // cartEltContent.querySelector('img').alt = product.altTxt;
    cartEltContent.querySelector('.cart__item__content__description h2').textContent = productArray.theName;
    cartEltContent.querySelector('.cart__item__content__description p').textContent = productArray.theColor;
    cartEltContent.querySelector('.thePrice').textContent = productArray.thePrice+="€";
    cartEltContent.querySelector('.itemQuantity').value = productArray.theQuantity;
      // ajoute le tout à son parent
    document.querySelector('#cart__items').appendChild(cloneTemplateCartElt);
  },

  
}
//  l'info du produit en tant que parametre 
// recupérer le bouton 
// ajoute eventlistener au bouton : 
// variable select recupere toute la valeur
// Envvoyer tout dans localStoragevariable produittaleau  cherche *

// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);