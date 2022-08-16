console.log('salut cart!');
const Appli = {
  init : function(){
    console.log('hey init');
    Appli.displayCart();
    Appli.removeProduct();
  },
  displayCart : function(){
    // on recupère les info du localstorage
    let productArray = JSON.parse(localStorage.getItem('allProduct'));
    localStorage.setItem('allProduct', JSON.stringify(productArray));
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
      return cartEltContent;   
    });
  },

  removeProduct : function(){
    const recup = Appli.displayCart();
    console.log('recup',recup)
    // let productArray = JSON.parse(localStorage.getItem('allProduct'));
    const deleteButton = cartEltContent.querySelector('.deleteItem');
    console.log(deleteButton);
  },
  
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);
