// récupère tous les objets Article et les intègre au index.html

    fetch("http://localhost:3000/api/products")
    .then (dataFromApi => dataFromApi.json())
    .then (jsonListArticle => {
        for(let jsonArticle of jsonListArticle){
            let article = new Article(jsonArticle)
            document.querySelector("#items").appendChild(article.generateCard())  
        }
    })


