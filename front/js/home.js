const app = {
  init : function(){
    for (product of products){
      const products = products[i];
      displayProducts(products)
     };
  },

  getProducts : function(){
    return fetch("http://localhost:3000/api/products")
  
      .then(function(res) {
    
        if (res.ok) {
    
          return res.json();
    
        }
    
      })
    
      .then(function(products) {
    
    console.log(value);
    
      })
    
      .catch(function(err) {
    
    //    Une erreur est survenue
    
      });
  },

  displayProducts : function(product){
    document.getElementById('templateProducts').innerHTML += 
    `<a href="./product.html?">
    <article>
      <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName"> ${product.name} </h3>
      <p class="productDescription"> ${product.description} </p>
    </article>
  </a> -->` 
  }
}



console.log(displayProducts);
document.addEventListener('DOMContentLoaded', app.init);