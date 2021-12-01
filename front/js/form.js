 /* 1 Vérifier le format des données - Afficher un message d'erreur si mauvais format
    2 Constituer un objet contact (à partir des données du formulaire) et un tableau de produits
    3 Envoyer le tout à l'API
    4 récupérer l'Order ID et transmettre à la page de validation
*/




//1 : fonction pour désactiver l'envoi    + validation mail HTML obligatoire

function disableCommander(disabled) {
  if (disabled) {
    document
      .getElementById("order")
      .setAttribute("disabled", true)
    console.log("Envoi désactivé MEC")
  } else {
    document
      .getElementById("order")
      .removeAttribute("disabled")
    console.log("Envoi ACTIVEEEEEEE")
  }
}

//disableCommander(true) // de base : pas le droit mec !
var toutEstRempli=false
var nombreDeRempli=0
console.log("nombre de remplis : " + nombreDeRempli)


/*
//1 : si panier vide : désactiver l'envoi
const panierVide = document.querySelector("#cart__items")
console.log("la var paniervide puis paniervide.value est :" + panierVide + panierVide.value)     //  Bordel !  il ne récupère pas le bordel
//if (panierVide.value = "Le Panier est vide"){disableCommander(true)}
*/

// 1 Vérifier le format des données : 4 via RegEx, 1 directement dans le HTML (mail)
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


document
  .getElementById("firstName")
  .addEventListener("input", function(e) {
  if (/[A-Z]{1,}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]/.test(e.target.value) ) {
    getFirstNameValidation().innerText = ""
    nombreDeRempli+=1
} else {
    getFirstNameValidation().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("lastName")
  .addEventListener("input", function(e) {
  if (/[A-Z]{1,}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]/.test(e.target.value)) {
    getLastNameValidation().innerText = ""
    nombreDeRempli+=1  
  } else {
    getLastNameValidation().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("address")
  .addEventListener("input", function(e) {
  if (/^[a-zA-Z0-9\s,.'-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{3,}$/.test(e.target.value)) {
    getAddressValidation().innerText = ""
    nombreDeRempli+=1  
  } else {
    getAddressValidation().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("city")
  .addEventListener("input", function(e) {
  if (/[A-Z]{1,}[a-zA-Z0-9\s,.'-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{3,}$/.test(e.target.value)) {
    getCityValidatio().innerText = ""
    nombreDeRempli+=1
  } else {
    getCityValidatio().innerText = "Erreur de saisie"    
  }
})

document
  .getElementById("email")
  .addEventListener("input", function(e) {
  if (/[a-zA-Z0-9\s,.'-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ@]{3,}$/.test(e.target.value)) {
    nombreDeRempli+=1
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
    let tableauFinal=[]

    for (let cartJsonDuStorage of listDeCartJsonDuStorage){
      tableauFinal.push(cartJsonDuStorage.id)
    }
    console.table(tableauFinal)
    // destinataire
    
    const order = {
        contact : {
            firstName : inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
        },
        products: tableauFinal,
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
    // 3 et 4 Envoi et récupération de l'orderId
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      let lienPageConfirmation="./confirmation.html?id=" + data.orderId
      localStorage.clear()
      document.location.href = lienPageConfirmation
    })
    .catch(function (error) {
        console.log ("Problème avec l'API : " + error.message)
    })
}

// 2 - au clic : envoyer à l'API
const send = document.getElementById("order")
send.addEventListener("click", function (e) {
  console.log("CLiqué !  Et là : nombre de remplis : " + nombreDeRempli)
  e.preventDefault()    
  if(!localStorage.getItem("cartJson")){
    alert("le panier est vide")
  }
  else{
    if (nombreDeRempli>=5){
      console.log("y'a 5 ou plus remplis !")
      postForm()
    }
    else{
      console.log("moins de 5 remplis")
      alert("il faut remplir le formulaire")
    }
  }  
})


