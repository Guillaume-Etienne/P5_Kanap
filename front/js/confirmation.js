//récupère l'id du code de validation de commande pour l'afficher dans la page confirmation
var currentUrl = window.location.href;
var url = new URL(currentUrl);
var confirmNumber = url.searchParams.get("id")

const confirmNumberToAdd = document.querySelector("#orderId") 
confirmNumberToAdd.innerHTML = confirmNumber