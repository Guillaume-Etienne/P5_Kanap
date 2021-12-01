// détails des produits : 
// 1 trouver l'ID dans l'URL
// 2 Afficher les détails du kanap
// 3 écouter qqté et couleurs
// 4 gérer le panier sous forme de liste dans le localStorage


// 1 trouver l'ID dans l'URL

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var idCanap = url.searchParams.get("id");


// 2 Afficher les détails du kanap

fetch(`http://localhost:3000/api/products/${idCanap}`)
  .then((dataFromApi) => dataFromApi.json())
  .then((jsonArticle) => {    
    let article = new Article(jsonArticle);
    article.generateProductDetails();    
  })

// 3 fonction de validation
function afficheConfirmation() {
  if(window.confirm(`Votre commande est ajoutée au panier !
    Pour consulter votre panier, cliquez sur OK`)){
      window.location.href ="cart.html";
    }
}
// 3 écouter qqté et couleurs
var button = document.getElementById("addToCart")
button.addEventListener("click", function () {
  const colorList = document.getElementById("colors")
  const colorSelected = colorList.querySelector("option:checked").value
  //Qtty Selected          UPDATE Mentor : A cheecker : ci dessus : document.getElementbyId("colors").value
  const qttySelected = document.getElementById("quantity").value

  if ((qttySelected < 1) || (qttySelected > 100)){
    alert("Le nombre sélectionné n'est pas valide (entre 1 et 100)")
  }
  else{
    let cartActif = {
      id: idCanap,
      color: colorSelected,
      qtty: qttySelected,
    };
    
      // 3 LocalSto Empty ? create first One
    if (!localStorage.getItem("cartJson")) {
      let cartJson = JSON.stringify([cartActif])
      localStorage.setItem("cartJson", cartJson)
      afficheConfirmation()
    }
  
  
    // 3 ID connu ? si produit existe (et la couleur) augmenter la qtté, sinon ajouter le produit.
    else {
      let listDeCartJson = JSON.parse(localStorage.getItem("cartJson"))
      //parcourir la liste - trouver si ID et couleur existent    
      const resultFind = listDeCartJson.find(
        (el) => el.id === cartActif.id && el.color === cartActif.color)
        
        //Si le produit commandé est déjà dans le panier : incrémente qqty
        if (resultFind) {        
          resultFind.qtty=parseInt(resultFind.qtty) + parseInt(cartActif.qtty)
          localStorage.setItem("cartJson", JSON.stringify(listDeCartJson))
          afficheConfirmation()
        }//Si le produit commandé n'est pas dans le panier                Update Antoine, la ligne répétée pourrait être en une fois à la suite des boucle IF Else
        else {
          listDeCartJson.push(cartActif);
          localStorage.setItem("cartJson", JSON.stringify(listDeCartJson));
          afficheConfirmation()      
        }    
      }
    }  
})

