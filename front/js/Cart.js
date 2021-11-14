// faire afficher le LocalSto dans le Panier

console.log("Cart.js chargé !")
var totalPrice= 0
var totalqtty= 0
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
                    var prixDeCetteLigne = article.generateCart(cartJsonDuStorage.qtty, cartJsonDuStorage.color)
                    //calcule le prix
                    totalPrice+=prixDeCetteLigne
                    //incrémente le nombre total d'article
                    totalqtty+=parseInt(cartJsonDuStorage.qtty)                                        
                }                
            }
        }        
    })
    .then(function() {
      console.log(console.log("prix total : " + totalPrice + " nombre total d'article : " + totalqtty))
      const totalPourLeHTML = document.querySelector("#totalQuantity")
      totalPourLeHTML.innerHTML = totalqtty
      const prixTotalHTML = document.querySelector("#totalPrice")
      prixTotalHTML.innerHTML = totalPrice
    })   
  }
  else{
  const panierVide = document.querySelector("#cart__items")
      panierVide.innerHTML = "Le Panier est vide"
  }
  