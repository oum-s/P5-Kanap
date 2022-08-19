console.log('salut cart!');
const Appli = {
  init : function(){
    console.log('hey init');
    Appli.displayCart();
    Appli.updateProduct();
    Appli.deleteProduct();
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
  }


  
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);