// 1 faire afficher le LocalSto dans le Panier
// 2 change qqty : écouter les changement / trouver l'ID impacté / mettre à jours
// 3 Supprimer : écouter les changement / trouver l'ID impacté / mettre à jours




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
    // 1 Calcul des qtty et prix
    .then(function() {      
      const totalPourLeHTML = document.querySelector("#totalQuantity")
      totalPourLeHTML.innerHTML = totalqtty
      const prixTotalHTML = document.querySelector("#totalPrice")
      prixTotalHTML.innerHTML = totalPrice
    })
    .then(function(){      //on lance ici la suppression (attention il y en a de partout)
        let btn_supprimer = document.getElementsByClassName("deleteItem")  // document.getElementsByClassName document.querySelectorAll
        console.log(" en écoute : " + btn_supprimer + " lengt : " + btn_supprimer.length)
    
        for (let j = 0; j < btn_supprimer.length; j++){
            btn_supprimer[j].addEventListener("click" , (event) => {
                let parent = event.target.closest("article")  //event.target signifie btn_supprimer[j]
                deleteProduct(parent.dataset.id,parent.dataset.color)
            })
        }
    })   
  }
  else{
    const panierVide = document.querySelector("#cart__items")
    panierVide.innerHTML = "Le Panier est vide"
  }
  
  // 2 écouter les changement / trouver l'ID impacté / mettre à jours         TOUT CA MARCHE PAS, voir le 3 Antoine
  // le 1 risque de devenir une fonction que l'on relancera si changement détecté
function updateProduct() {
    var updateQtty = document.getElementsByClassName("itemQuantity")
    console.log(" en écoute : " + updateQtty + " updateQtty.length : " + updateQtty[1])

    for (let k = 0; k < 3 ; k++){  //updateQtty.length
    console.log(" en écoute  détaillée : " + updateQtty[k])
    updateQtty[1].addEventListener("change" , (event) => {
        event.preventDefault()
        const qttyUpdated = updateQtty.value
        console.log("Quantité a été changée pour : " + qttyUpdated)
        })
    }
}
// lancer la fonction

// 3 Suppression écouter les changement / trouver l'ID impacté / mettre à jours    //fonctionne (refait avec Antoine tout vérifier, changé pleins de trucs)

function deleteProduct(id, color) {
    console.log("fonction deleteProduct lancée...")
    let listDeCartJson = JSON.parse(localStorage.getItem("cartJson"))
    const resultFind = listDeCartJson.findIndex(
        (el) => el.id === id && el.color === color
    )
    listDeCartJson.splice(resultFind,1)
    localStorage.setItem("cartJson",JSON.stringify(listDeCartJson))  //rappeler les fonctions de calculs qtty et  soit /rappeler l'affichage /soit window.reload
    location.reload()
}


    


    

