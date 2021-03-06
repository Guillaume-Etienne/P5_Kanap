/* 1 faire afficher le LocalSto dans le Panier
   2 Supprimer : écouter les changement / lance une fonction dédiée
   3 change qqty : écouter les changement / lance une fonction aussi
 */

// 1 faire afficher le LocalSto dans le Panier
var totalPrice= 0
var totalqtty= 0     // attention : pourrait être récupéré par un return, pour éviter les var globales


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
    // 1 Affichage des totaux qtty et prix dans le HTML
    .then(function() {      
      const qttyTotalPourLeHTML = document.querySelector("#totalQuantity")
      qttyTotalPourLeHTML.innerHTML = totalqtty
      const prixTotalHTML = document.querySelector("#totalPrice")
      prixTotalHTML.innerHTML = totalPrice
    })
    .then(function(){      // 2 on suppression d'un article
        let btn_supprimer = document.getElementsByClassName("deleteItem")
        for (let j = 0; j < btn_supprimer.length; j++){
            btn_supprimer[j].addEventListener("click" , (event) => {
                let parent = event.target.closest("article")  //event.target signifie btn_supprimer[j] closest:le parent le plus proche ciblé (ici "article")
                deleteProduct(parent.dataset.id,parent.dataset.color)
            })
        }
        // 3 mofif de qtty : écouter, maj, recharger
        var updateQtty = document.getElementsByClassName("itemQuantity")
        for (let k = 0; k < updateQtty.length; k++){
            updateQtty[k].addEventListener("change" , (e) => {
                //récupérer le nouvrau qtty / updater le LocalSto / recharger                
                let newQtty = updateQtty[k].valueAsNumber
                let parent = e.target.closest("article")
                updateProduct(parent.dataset.id,parent.dataset.color,newQtty)
            })
        }
                //let parent = e.target.closest("article")  //event.target signifie btn_supprimer[j]
                //deleteProduct(parent.dataset.id,parent.dataset.color)

    })   
  }
  else{
    const panierVide = document.querySelector("#cart__items")
    panierVide.innerHTML = "Le Panier est vide"
  }
  
  
  // le 1 : une fonction que l'on relancera si changement détecté (maj : non, fonction d'effacement et qtt séparée puis reload)
function updateProduct() {
    

    for (let k = 0; k < 3 ; k++){  //updateQtty.length
        updateQtty[1].addEventListener("change" , (event) => {
            event.preventDefault()
            const qttyUpdated = updateQtty.value        
        })
    }
}


// 2 Fonction de Suppression   //fonctionne (refait avec Antoine tout vérifier, changé pleins de trucs)
function deleteProduct(id, color) {
    let listDeCartJson = JSON.parse(localStorage.getItem("cartJson"))
    const resultFind = listDeCartJson.findIndex(
        (el) => el.id === id && el.color === color
    )
    listDeCartJson.splice(resultFind,1)
    localStorage.setItem("cartJson",JSON.stringify(listDeCartJson))
    location.reload()
}

// 3 Fonction d'update
function updateProduct(id, color, newqtty) {
    let listDeCartJson = JSON.parse(localStorage.getItem("cartJson"))
    const resultFind = listDeCartJson.find(
        (el) => el.id === id && el.color === color
    )
    resultFind.qtty=newqtty
    localStorage.setItem("cartJson",JSON.stringify(listDeCartJson))
    location.reload()
}
    


    

