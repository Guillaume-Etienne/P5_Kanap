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
        const image=document.createElement("img")
        container.appendChild(image);
        // image, id, srv etc... faire tous les champs 
        
        return container;
    }


}