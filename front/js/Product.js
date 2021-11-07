// 3 parts :
// Search for ID parameter in the URL
// Print the details
// listen colors and qqty to send to cart


//Search for ID parameter in the URL :

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var idCanap = url.searchParams.get("id");
console.log("récupéré dans l'URL : " + idCanap);


//To get one Sofa and print its details on the screen

fetch(`http://localhost:3000/api/products/${idCanap}`)
.then (dataFromApi => dataFromApi.json())
.then (jsonArticle => {
    console.log(jsonArticle)    
    let article = new Article(jsonArticle)
    console.log("article Guigui" + article.description)
    const img=document.createElement("img")
    document.getElementById("toto").appendChild(img)
    img.setAttribute("src", article.imageUrl)
    img.setAttribute("alt", article.altTxt)
    const description=document.getElementById("description")
    description.innerHTML=(article.description)
    const title=document.getElementById("title")
    title.innerHTML=(article.name)
    const price=document.getElementById("price")
    price.innerHTML=(article.price)
    //colors = tableau : boucle de for of ?
    for(let colorspossibile of article.colors){
        const color=document.createElement("option")
        color.setAttribute("value",colorspossibile)
        color.innerHTML=(colorspossibile)
        document.getElementById("colors").appendChild(color)
    }    
})

//Listen color and qqty selected and validate
var button = document.getElementById("addToCart")
button.addEventListener("click", function () {
    alert("t'as cliqué mec je t'ai vu !")
    //passer les data par l'URL ?  /par Storage ?
})