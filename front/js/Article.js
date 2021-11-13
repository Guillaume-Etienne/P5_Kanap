/* Everything about articles + fonctions to create and manipulate :
Constructor : to make new objects
generateCard : to fill the HTML code of Index.HTML
generateProduct : to fill the HTML code of Product.HTML
*/

class Article {
  constructor(articleData) {
    this.id = articleData["_id"];
    this.colors = articleData["colors"];
    this.name = articleData["name"];
    this.price = articleData["price"];
    this.imageUrl = articleData["imageUrl"];
    this.description = articleData["description"];
    this.altTxt = articleData["altTxt"];
  }
  generateCard() {
    const container = document.createElement("a");
    container.setAttribute("href", "./product.html?id=" + this.id);
    const article = document.createElement("article");
    container.appendChild(article);
    const img = document.createElement("img");
    article.appendChild(img);
    img.setAttribute("src", this.imageUrl);
    img.setAttribute("alt", this.altTxt);
    const titreH3 = document.createElement("h3");
    article.appendChild(titreH3);
    titreH3.setAttribute("class", "productName");
    titreH3.innerHTML = this.name;
    const descript = document.createElement("p");
    article.appendChild(descript);
    descript.setAttribute("class", "productDescription");
    descript.innerHTML = this.description;
    return container;
  }
  /*generateProductImage() {
    document.getElementsByClassName("item__img");
    const imgproduct = document.createElement("img");
    document.appendChild(imgproduct);
    imgproduct.setAttribute("src", this.imageUrl);
    console.log(this.imageUrl);
    return container;
  }*/
  generateProductDetails() {
    const img = document.createElement("img");
    document.getElementById("item__img").appendChild(img);
    img.setAttribute("src", this.imageUrl);
    img.setAttribute("alt", this.altTxt);
    const description = document.getElementById("description");
    description.innerHTML = this.description;
    const title = document.getElementById("title");
    title.innerHTML = this.name;
    const price = document.getElementById("price");
    price.innerHTML = this.price;
    //colors = tableau : boucle de for of ?
    for (let colorspossibile of this.colors) {
      const color = document.createElement("option");
      color.setAttribute("value", colorspossibile);
      color.innerHTML = colorspossibile;
      document.getElementById("colors").appendChild(color);
    }
  }
}
