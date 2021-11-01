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
        const img=document.createElement("img")
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


}