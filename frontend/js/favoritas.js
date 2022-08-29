window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  //Guardo en la variable id's el contenido del registro 'ids', en el caso de que exista en sessionStorage.
  let ids = JSON.parse(sessionStorage.getItem("ids"));

  // Aqui debemos agregar nuestro fetch

  let executeFetch = async ()=>{
    try {
      let response = await fetch("http://localhost:3031/api/movies");
      let peliculas = await response.json();
      pintarCards(peliculas);
    } catch (error) {
      console.log(error)
    }
  };
    executeFetch();

  // Codigo que debemos usar para mostrar los datos en el frontend
  let pintarCards = (peliculas)=> {

    let data = peliculas.data;
    /* Si la variable 'ids' está vacía, cargo una etiqueta h3 en el DOM 
    con un mensaje que especifique que no hay películas favoritas seleccionadas.
    Si 'ids' contiene información, recorremos la variable 'data', que almacena
    información de las películas que contiene la base de datos, y por cada registro,
    validamos si coincide el id de la película con algún registro presente en 'ids'.
    Si hay coincidencia, cargo una card en el DOM con la información de la película.*/
    if(!ids) {
      const msg = document.createElement("h3");
      msg.textContent = "No tienes películas favoritas actualmente.";
      container.appendChild(msg);

    }else{

      data.forEach((movie) => {
  
        if(ids && ids.find(element => element === movie.id)){
  
          const card = document.createElement("div");
          card.setAttribute("class", "card");
      
          const h1 = document.createElement("h1");
          h1.textContent = movie.title;
      
          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;
      
          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;
      
          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
        }
  
      });
    }
  
  }

};
