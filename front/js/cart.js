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
          /* let regexAdress = new RegExp("/\d{1,}(\s{1}\w{1,})(\s{1}?\w{1,})+)/g"); */
          let regexCity = new RegExp("^[a-zA-Z\x80-ɏ]+(?:([ -']|(. ))[a-zA-Z\x80-ɏ]+)*$");
          let regexEmail = new RegExp("^[0-9a-zA-Z-_\$#]+@[0-9a-zA-Z-_\$#]+\.[a-zA-Z]{2,5}","gm");//ok

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

                  const checkInput = function(regexTest, thisInput, errorMsg, message){
                    // variable qui test s'il y a une correspondance entre regexName et la valeur de l'input firstName
                    // si le regextest est false un msg d'erreur apparaît
                    if(regexTest.test(thisInput.value)){
                      console.log(` ${message} valide `)
                      errorMsg.innerHTML = " ";
                      } else {
                        errorMsg.innerHTML = ` ${message} invalide `;
                        // s'il y a une erreur, ne pas envoyer dans le ls
                      }
                  };

                    // verif Prenom
                    firstName.addEventListener('change', () =>{
                      console.log('firstName ok')
                        // fonction pour stocker les test et changements
                          checkInput(regexNames, firstName , firstNameErrorMsg, "Prenom")
                    });

                    // verif Nom
                    lastName.addEventListener('change', () =>{
                      console.log('lastName ok')
                        // fonction pour stocker les test et changements
                          checkInput(regexNames, lastName, lastNameErrorMsg, "Nom")
                    });

                    // verif address
                    /* address.addEventListener('change', () =>{
                      console.log('address ok')
                        // fonction pour stocker les test et changements
                          checkInput(regexAdress, address, addressErrorMsg, "Adresse")
                    }); */

                    // verif ville
                    city.addEventListener('change', () =>{
                      console.log('city ok')
                        // fonction pour stocker les test et changements
                          checkInput(regexCity, city, cityErrorMsg, "Ville")
                    });

                    // verif email
                    email.addEventListener('change', () =>{
                      console.log('email ok')
                        // fonction pour stocker les test et changements
                          checkInput(regexEmail, email, emailErrorMsg, "Email")
                    });
                   
                      // au submit, envoyer les informations dans le tableau
                      order.addEventListener('submit', (e) => {
                        e.preventDefault();
                        // si tous les inputs ne sont pas rempli -> msg d'alert
                        if((firstName.value == " ") || (lastName.value == " ") || (address.value == " ") || (city.value == " ") || (email.value == " ")){
                          alert("Veuillez remplir tous les champs !")

                          }else{
                            // si le regex est false -> alertmsg
                            if ((regexNames.test(firstName.value) == false) || (regexNames.test(lastName.value) == false) || (regexCity.test(city.value) == false) || (regexEmail.test(email.value) == false)){
                              alert('Veuillez remplir correctement tous les champs')

                              }else{
                              // sinon envoyer le tableau contact
                              contact = {
                                firstName : firstName.value,
                                lastName : lastName.value, 
                                address : address.value,
                                city : city.value, 
                                email : email.value
                              };
                              /* console.log(contact);
                              const options = {
                                method: 'POST',
                                body: JSON.stringify(sendFormData),
                                headers: { 
                                  'Content-Type': 'application/json',
                                }
                              };
                              fetch("http://localhost:3000/api/products/order",options)
                                .then(function(res) {
                                  // vérifie que la requête s’est bien passée
                                  if(res.ok) {
                                  //Récupère le résultat de la requête au format json 
                                    return res.json();
                                  }
                                })
                                .then(data => {
                                  localStorage.setItem('orderId', data.orderId);
                                    if (validControl()) {
                                      document.location.href = 'confirmation.html?id='+ data.orderId;
                                    }
                                }); */
                              }
                                
                               
                        
                        
                          //API

                          }
                      })
        
  }
}
// appeler toutes les functions
document.addEventListener('DOMContentLoaded', Appli.init);