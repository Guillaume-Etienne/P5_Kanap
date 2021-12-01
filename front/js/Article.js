/* Tout ce qui concerne les articles + fonctions pour les créer et manipuler
Constructor : pour créer un objet
generateCard : pour remplir le index.HTML
generateProduct : pour remplir le Product.HTML
generateCart : pour remplrir cart.html   + infos supplémentaires pour les traitements
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
  //Remplir le Index.HTML
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
  //Remplir le Product.HTML
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
    for (let colorspossible of this.colors) {
      const color = document.createElement("option");
      color.setAttribute("value", colorspossible);
      color.innerHTML = colorspossible;
      document.getElementById("colors").appendChild(color);
    }
    //generateCart : remplir le  cart.html
  }
    generateCart(qtty,color) {      // a besoin de la qtty pour rendre le prix total de la ligne, et de la couleur pour l'ajouter   
      const article = document.createElement("article")
      document.querySelector("#cart__items").appendChild(article)
      article.setAttribute("class", "cart__item")
      article.setAttribute("data-id", this.id)
      article.setAttribute("data-color", color) // 2 datas ajoutés pour la suite de gestion du panier ( pour identifer quoi deleter)
      article.innerHTML = `<div class="cart__item__img">
                          <img src="${this.imageUrl}" alt="${this.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__titlePrice">
                            <h2>${this.name}<p>${color}</h2>
                            <p>${this.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qtty}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                          `
      return(qtty*parseInt(this.price))
    }
  }

