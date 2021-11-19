// Vérifier le format des données 
// Afficher un message d'erreur si mauvais format
// Constituer un objet contact (à partir des données du formulaire) et un tableau de produits
// Envoyer à l'API
// Message avec l'API ?

console.log("le form.js est lancée mec !")

// Vérifier le format des données : 4 RegEx, 1 HTML (mail)
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


const textFR = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{5,60}$/

document
  .getElementById("firstName")
  .addEventListener("input", function(e) {
  if ((/[A-Z]{1,}[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]/.test(e.target.value)) && (textFR.test(e.target.value))) {
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

