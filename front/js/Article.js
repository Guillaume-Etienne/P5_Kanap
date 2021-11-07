/* Everything about articles + fonctions to create and manipulate :
Constructor : to make new objects
generateCard : to fill the HTML code of Index.HTML
generateProduct : to fill the HTML code of Product.HTML
*/


class Article {
    constructor(articleData){
        this.id=articleData["_id"]
        this.colors=articleData["colors"]
        this.name=articleData["name"]
        this.price=articleData["price"]
        this.imageUrl=articleData["imageUrl"]
        this.description=articleData["description"]
        this.altTxt=articleData["altTxt"]        
    }
    generateCard() {
        const container=document.createElement("a");
        container.setAttribute("href","./product.html?id=" + this.id);
        const article=document.createElement("article");
        container.appendChild(article);
        const img=document.createElement("img");
        article.appendChild(img);
        img.setAttribute("src", this.imageUrl);
        img.setAttribute("alt", this.altTxt);
        const titreH3=document.createElement("h3");
        article.appendChild(titreH3);
        titreH3.setAttribute("class", "productName");
        titreH3.innerHTML=this.name;
        const descript=document.createElement("p");
        article.appendChild(descript);
        descript.setAttribute("class", "productDescription");
        descript.innerHTML=this.description;
        // image, id, srv etc... faire tous les champs         
        return container;
    }
    generateProductImage() {
        document.getElementsByClassName("item__img")
        const imgproduct=document.createElement("img")
        document.appendChild(imgproduct)
        imgproduct.setAttribute("src", this.imageUrl)
        console.log(this.imageUrl)


        return container
    }
}