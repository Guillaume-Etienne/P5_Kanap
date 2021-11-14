// faire afficher le LocalSto dans le Panier

console.log("Cart.js chargé !")

if (localStorage.getItem("cartJson")) {
    let listDeCartJsonDuStorage = JSON.parse(localStorage.getItem("cartJson"))  
    console.table(listDeCartJsonDuStorage)

    fetch("http://localhost:3000/api/products")
    .then (dataFromApi => dataFromApi.json())
    .then (jsonListArticle => {
        for (let cartJsonDuStorage of listDeCartJsonDuStorage){            
            for(let jsonArticle of jsonListArticle){
                let article = new Article(jsonArticle)
                if (cartJsonDuStorage.id === article.id){
                    console.log ("Une référénce trouvée : " + article.id)
                    article.generateCart()
                }
                
            }
        }
        
    })
/*
    for(let jsonArticle of listDeCartJsonDuStorage){
        console.log("L'article étudié : " + jsonArticle + " Son ID : " + jsonArticle.id + " couleur " + jsonArticle.color)
        //let article = new Article(jsonArticle)
        document.querySelector("#cart__items").innerHTML = `<article class="cart__item" data-id="${jsonArticle.id}">
        <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>Nom du produit</h2>
          <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${jsonArticle.qtty}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article>
        `
            
        
        //let article = new Article(jsonArticle)
        */
    
  }