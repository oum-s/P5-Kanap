console.log('salut cart!');
// récupérer le localstorage au début pour y avoir accès partout
// revoir ladressregex
const Appli = {
  init : function(){
    console.log('hey init');
    Appli.fetchProducts();
    Appli.displayCart();
    Appli.updateProduct();
    Appli.deleteProduct();
    Appli.formVerif();
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
    let finalPrice = 0;
    let sum = 0;
    let totalProducts = 0;
      // foreach chaque produit du ls
      productArrayInLocalStorage.forEach(theProduct => {
      // foreach des produits de l'api
        products.forEach(product => {
        
          if ( product._id == theProduct.theId ){
          console.log('good');
          // renvoyer un entier pour les prix et les quantités
            let productPrice = parseInt(product.price);
            let quantityOfOneProduct = parseInt(theProduct.theQuantity);
              // calcul : prixDuProduit * quantitéDuProduit
                sum = productPrice * quantityOfOneProduct;
                console.log('sum is:', sum);
                // à chaque foreach, j'ajoute la somme du prix du produit trouvé à la somme total
                finalPrice += sum;
                // a chaque foreach on ajoute à totalProduct la quantité d'un produit
                totalProducts += quantityOfOneProduct ;
          };
        });
      });
        // affichage de la quantité d'article dans le panier
        const totalQuantity = document.querySelector('#totalQuantity');
        totalQuantity.textContent = totalProducts;
        console.log('totalProducts', totalProducts);
        console.log('total', finalPrice);
          // affichage du prix final/total
          let totalPrice = document.getElementById('totalPrice');
          totalPrice.textContent = finalPrice;
          console.log('finalPrice', finalPrice);
  },

  formVerif : function(){
    console.log('form existe')
    // selectionne le formulaire
    let form = document.querySelector('#loginForm');
    let order = document.querySelector('#order');

      // Select les input
      let firstName = document.getElementById("firstName");
      let lastName = document.getElementById("lastName");
      let address = document.getElementById("address");
      let city = document.getElementById("city");
      let email = document.getElementById("email");

        // Msg d'erreurs
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        let emailErrorMsg = document.getElementById("emailErrorMsg");

          // regex test
          let regexNames = new RegExp("^[a-zA-Z-'.\u00C0-\u00FF]*$");;//ok
          let regexAdress = new RegExp("\b\d{1,8}(-)?[a-z]?\W[a-z|\W|\.]{1,}\W(allée|allee|avenue|boulevard|rue|place|lane|way|rd\.|st\.|dr\.|ave\.|blvd\.|cir\.|ln\.|rd|dr|ave|blvd|cir|ln)?|\d");
          let regexCity = new RegExp("^[a-zA-Z\x80-ɏ]+(?:([ -']|(. ))[a-zA-Z\x80-ɏ]+)*$");
          let regexEmail = new RegExp("^([a-zA-Z0-9.]{2,})+@([a-zA-Z0-9.]{2,})+[.]+([a-zA-Z0-9-]{2,20})$");//ok

          // tableaux à envoyer
              // récupérer le panier et récup les id pour les mettre dans le tableau products
              const productsCart = JSON.parse(localStorage.getItem('allProduct'));
              const products = productsCart.map(({theId})=> theId);

              // déclarer l'objet contact
              let contact = {};

                // déclarer le tableau sendDataProducts
                const sendDataProducts = [
                  contact, 
                  products
                ];

                function checkFirstName() {
                  const isFirstNameValid = regexNames.test(firstName.value);
                  if (isFirstNameValid == true) {
                    console.log("Prénom valide")
                    firstNameErrorMsg.innerHTML = " ";
                      console.log('firstName ok');
                  } else {
                      console.log('firstName bad');
                      firstNameErrorMsg.innerHTML = "Prénom invalide ";
                  }
                  return isFirstNameValid;
                }

                function checkLastName() {
                  const islastNameValid = regexNames.test(lastName.value);
                  if (islastNameValid == true) {
                    console.log("Prénom valide")
                    lastNameErrorMsg.innerHTML = " ";
                      console.log('lastName ok');
                  } else {
                      console.log('lastName bad');
                      lastNameErrorMsg.innerHTML = "Prénom invalide ";
                  }
                  return islastNameValid;
                }

                function checkAddress() {
                  const isAddressValid = regexAdress.test(address.value);
                  if (isAddressValid == true) {
                    console.log("Prénom valide")
                    addressErrorMsg.innerHTML = " ";
                      console.log('address ok');
                  } else {
                      console.log('address bad');
                      addressErrorMsg.innerHTML = "Prénom invalide ";
                  }
                  return isAddressValid;
                }

                function checkCity() {
                  const isCityValid = regexCity.test(city.value);
                  if (isCityValid == true) {
                    console.log("Prénom valide")
                    cityErrorMsg.innerHTML = " ";
                      console.log('City ok');
                  } else {
                      console.log('City bad');
                      cityErrorMsg.innerHTML = "Prénom invalide ";
                  }
                  return isCityValid;
                }

                function checkEmail() {
                  const isEmailValid = regexEmail.test(email.value);
                  if (isEmailValid == true) {
                    console.log("Prénom valide")
                    emailErrorMsg.innerHTML = " ";
                      console.log('Email ok');
                  } else {
                      console.log('Email bad');
                      emailErrorMsg.innerHTML = "Prénom invalide ";
                  }
                  return isEmailValid;
                }

                  order.addEventListener('submit', function (e) {
                    e.preventDefault();
                    // constante qui retourne les function si elles sont valides
                    const isFormValid = checkFirstName() && checkLastName() && checkEmail() && checkCity() && checkAddress();
                
                    checkFirstName();
                    checkLastName();
                    checkEmail();
                    checkAddress();
                    checkCity();
                
                    if (isFormValid) {
                        console.log('form OK');
                    } else {
                        console.log('No valid form !');
                        alert("Veuillez remplir correctement le formulaire.")
                    }

                    
                  });
        
  }
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);