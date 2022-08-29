window.onload = () => {
    let executeFetch = async () => {
        try {
            let response = await fetch("http://localhost:3031/api/movies/1");
            let pelicula = await response.json();
            movieDetail(pelicula);
        } catch (error) {
            console.log(error)
        }
    };
    executeFetch();

    const movieDetail = async (pelicula) => {
        let data = pelicula.data;
        let fecha = new Date(data.release_date)
        let day = "";
        if (fecha.getDate() < 10) {
            day = "0" + fecha.getDate();
        } else {
            day = fecha.getDate();
        }
        let month = "";
        if (fecha.getMonth() < 10) {
            month = "0" + fecha.getMonth();
        } else {
            month = fecha.getMonth();
        }
        let cadenaFecha = fecha.getFullYear() + "-" + month + "-" + day;

        document.getElementById("title").value = data.title
        document.getElementById("rating").value = data.rating
        document.getElementById("awards").value = data.awards
        document.getElementById("release_date").value = cadenaFecha
        document.getElementById("length").value = data.length
    }

    let updateMovie = async () => {

        let req = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                rating: document.getElementById("rating").value,
                awards: document.getElementById("awards").value,
                "release_date": document.getElementById("release_date").value,
                length: document.getElementById("length").value
            })
        }
        try {
            let response = await fetch("http://localhost:3031/api/movies/update/1", req);
            let pelicula = await response.json();
            console.log(pelicula.meta.status)
            if (pelicula) {
                alert("La película se editó exitosamente.")
                window.reload();
            } else {
                alert("Ocurrió un error. Vuelva a intentar.")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deleteMovie = async ()=> {
        try {
            let response = await fetch("http://localhost:3031/api/movies/delete/1", {method: "DELETE"});
            let pelicula = await response.json();
            console.log(pelicula.meta.status)
            if (pelicula) {
                alert("La película se eliminó exitosamente.")
                //window.reload();
            } else {
                alert("Ocurrió un error. Vuelva a intentar.")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const createMovie = async ()=> {
        let req = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                rating: document.getElementById("rating").value,
                awards: document.getElementById("awards").value,
                "release_date": document.getElementById("release_date").value,
                length: document.getElementById("length").value,
                "genre_id": 1
            })
        }
        try {
            let response = await fetch("http://localhost:3031/api/movies/create", req);
            let pelicula = await response.json();
            console.log(pelicula)
            if (pelicula) {
                alert("La película se creó exitosamente.")
                window.location.reload();
            } else {
                alert("Ocurrió un error. Vuelva a intentar.")
            }

        } catch (error) {
            console.log(error)
        }
    }

    document.getElementById("edit").addEventListener("click", (e) => {
        e.preventDefault();
        updateMovie();
    });

    document.getElementById("del").addEventListener("click", (e) => {
        e.preventDefault();
        deleteMovie();
    });

    document.getElementById("create").addEventListener("click", (e) => {
        e.preventDefault();
        createMovie();
    });
}