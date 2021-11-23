var currentUrl = window.location.href;
var url = new URL(currentUrl);
var confirmNumber = url.searchParams.get("id")

const confirmNumberToAdd = document.querySelector("#orderId") 
confirmNumberToAdd.innerHTML = confirmNumber