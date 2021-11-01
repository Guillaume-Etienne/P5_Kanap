console.log("Le JS est connecté mec !");

// On veut récupérer l'ensemble des produits et les afficher dans la page d'accueil

    fetch("http://localhost:3000/api/products")
    .then (dataFromApi => dataFromApi.json())
    .then ( jsonListArticle => {
        console.log(jsonListArticle);
        for(let jsonArticle of jsonListArticle){
            let article = new Article(jsonArticle);
            document.querySelector("#items").appendChild(article.generateCard())  
        }
    });