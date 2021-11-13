//for (article of cartMaster){                 fonctionne pas (la boucle for, puisque article pas ittérable)
article = cartMaster
article.qtty=parseInt(cartMaster.qtty)
console.log("article du cartMaster " + article.id + " QTTy cartMaster " + article.qtty)
if (article.id===cartActif.id){
      if(article.color===cartActif.color){
          article.qtty+=parseInt(cartActif.qtty)
          console.log("AJOUTé : " + article.qtty)
          let cartJson = JSON.stringify(article) 
          localStorage.setItem("cartJson", cartJson)
      }
      else{ // créer
        article+=cartMaster
        let cartJson = JSON.stringify(article);   
          localStorage.setItem("cartJson", cartJson)
      }
  }
  else{ //créer 
  }       