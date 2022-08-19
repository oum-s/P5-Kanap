console.log('salut cart!');
const Appli = {
  init : function(){
    console.log('hey init');
    Appli.displayCart();
    Appli.deleteProduct();
    Appli.updateProduct();
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

  updateProduct : function(){
    const updateItems = document.querySelectorAll('.itemQuantity')
    let productArray = JSON.parse(localStorage.getItem('allProduct'));

    updateItems.forEach(item => {
      item.addEventListener('change', event => {
        const article = event.target.closest('article');
        const thisId = article.getAttribute('data-id');
        const thisColor = article.getAttribute('data-color');

        productToUpdate = productArray.find(x => x.theId == thisId && x.theColor == thisColor );
        productToUpdate.theQuantity = item.value;
        localStorage.setItem('allProduct', JSON.stringify(productArray)); 
        console.log(productArray);
      })
    })
  }
  
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);