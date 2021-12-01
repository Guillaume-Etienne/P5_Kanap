 /* 1 Vérifier le format des données - Afficher un message d'erreur si mauvais format
    2 Constituer un objet contact (à partir des données du formulaire) et un tableau de produits
    3 Envoyer le tout à l'API
    4 récupérer l'Order ID et transmettre à la page de validation
*/


// 1 Vérifier le format des données : 4 via RegEx, 1 directement dans le HTML (mail)

//MAJ : fonction pour désactiver l'envoi    + validation mail HTML obligatoire
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
  if (/[A-Z]{1,}[a-zA-Z0-9\s,.'-áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{3,}$/.test(e.target.value)) {
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
    e.preventDefault()    
    postForm()
    }
)


