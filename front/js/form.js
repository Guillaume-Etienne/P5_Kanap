// 1 Vérifier le format des données - Afficher un message d'erreur si mauvais format
// 2 Constituer un objet contact (à partir des données du formulaire) et un tableau de produits
// 3 Envoyer à l'API
// Message avec l'API ?



// 1 Vérifier le format des données : 4 RegEx, 1 HTML (mail)
function getFirstNameValidation() {
    return document.getElementById("firstNameErrorMsg")
}

function getLastNameValidation() {
    return document.getElementById("lastNameErrorMsg")    
}

function getAddressValidation() {
    return document.getElementById("addressErrorMsg")        
}

function getCityValidatio() {
    return document.getElementById("cityErrorMsg")    
}

// Filtrer le formulaire
const textFR = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/

document
  .getElementById("firstName")
  .addEventListener("input", function(e) {
  if (/[A-Z]{1,}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]/.test(e.target.value) ) {
    getFirstNameValidation().innerText = ""
} else {
    getFirstNameValidation().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("lastName")
  .addEventListener("input", function(e) {
  if (/[A-Z]{1,}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]/.test(e.target.value)) {
    getLastNameValidation().innerText = ""   
  } else {
    getLastNameValidation().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("address")
  .addEventListener("input", function(e) {
  if (/^[a-zA-Z0-9\s,.'-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{3,}$/.test(e.target.value)) {
    getAddressValidation().innerText = ""   
  } else {
    getAddressValidation().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("city")
  .addEventListener("input", function(e) {
  if (/^[a-zA-Z0-9\s,.'-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{3,}$/.test(e.target.value)) {
    getCityValidatio().innerText = ""   
  } else {
    getCityValidatio().innerText = "Erreur de saisie"    
  }
})

// 2 Constituer un objet contact (à partir des données du formulaire) et un tableau de produits

function postForm() {
    console.log("fonction postForm lancée")
    let inputName = document.getElementById('firstName')
    let inputLastName = document.getElementById('lastName')
    let inputAdress = document.getElementById('address')
    let inputCity = document.getElementById('city')
    let inputMail = document.getElementById('email')
    
    // liste à commander
    let listDeCartJsonDuStorage = JSON.parse(localStorage.getItem("cartJson"))
    
    // destinataire
    
    const order = {
        contact : {
            firstName : inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
        },
        products: listDeCartJsonDuStorage,
    }
    
    // options d'envoi
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(order)
    }
    // Envoie
    fetch("http://localhost:3000/api/products/order", options)
    .then(function(resolve,reject){
      if (resolve.ok) {
        console.log("le resolve est ok :  " +resolve)
        return resolve.json()        
      }
      else{
        console.log("le RESOLVE est PAS BON : reject :" + reject)
        return reject.json()
      }
    })    
    .then(function (value) {
        console.log ("On est dans second .then donc le value est : " + value)
        console.table(value)
      }
    )
    .catch(function (error) {
        console.log ("Problème catché : " + error.message)
    });
    

    // fin envoi

}

// 2 - au clique d'envoyer : NE PASannuler le compo (à voir si check supplémentaire ?), récupérer le bordel, créer l'objet, créer le tableau
const send = document.getElementById("order")
send.addEventListener("click", function (e) { 
    e.preventDefault()
    console.log("commander !")
    postForm()
    }
)

// reste à : récupérer confirmation  / renvoyer sur la page de confirmation / Faire apparaître le num de commande (sans l'enregistrer)

