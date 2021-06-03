const moviesContainer = document.getElementById('movies-container')
const form = document.querySelector("#movies-form")
const formContainer = document.getElementById('form-container')
moviesContainer.addEventListener('click', handleMovieClick)
formContainer.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    const movieObj = {
        name: document.getElementById('movie-name').value,
        release_year: document.getElementById('movie-date').value,
        run_time: document.getElementById('movie-run-time').value,
        img: document.getElementById('movie-img').value,
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
             Accept: "application/json"
        },
        body: JSON.stringify(movieObj)
    }

    fetch('http://localhost:3000/movies', options)
    .then(resp => resp.json())
    .then(data => {
        const movie = data.data
        renderMovie(movie)
        clearForm()
    })
}

function getMovies(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movies => {
        renderMovies(movies.data)
    })
}

function renderMovies(movies){
    movies.forEach((movie) => {
        renderMovie(movie)
    })
}

function renderMovie(movie){
    moviesContainer.innerHTML += `
        <div class="movie-item" id=${movie.attributes.id}>
            <img 
                id=${movie.attributes.id} 
                src=${movie.attributes.img}
            >
            <button>Edit</button>
            <button>Delete</button>
        </div>
    `
    // moviesContainer.addEventListener('click', handleBttnClick)
}

function handleBttnClick(event){
    if (event.target.innerHTML === "Delete"){
        handleDelete(event.target)
    } else if (event.target.innerHTML === 'Edit'){
        handleEdit(event.target)
    }
}

function handleDelete(element){
    element.parentElement.remove()
    const id = element.parentElement.id
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
        alert(data["message"])
    })
}

function handleMovieClick(event){
    if (event.target.nodeName === 'IMG'){
       getMovie(event.target.id)
    } else if (event.target.innerHTML === "Delete"){
        handleDelete(event.target)
    } else if (event.target.innerHTML === 'Edit'){
        handleEdit(event.target)
}

}

function getMovie(movieId){
    fetch(`http://localhost:3000/movies/${movieId}`)
    .then(resp => resp.json())
    .then(movie => {
        form.remove()
        let movieDetails = movie.data.attributes
        renderMovieDetails(movieDetails)
    })
}

function renderMovieDetails(movieDetails){
    moviesContainer.innerHTML = `
    <img src=${movieDetails.img}><br>
    Movie Name: ${movieDetails.name}<br>
    Release Date: ${movieDetails.release_year}<br>
    Run Time: ${movieDetails.run_time}<br>
    <br>
    <a id="back" href=#>Back</a>
`
const backButton = document.getElementById('back')
backButton.addEventListener('click', goBack)

}

function goBack(){
    moviesContainer.innerHTML = ''
    formContainer.append(form)
    getMovies()
}

function clearForm(){
    let inputArr = Array.from(formContainer.firstElementChild.children)
    inputArr.forEach(input => { 
        if (input.value !== "Create Movie"){
            input.value = "" 
        }
    })
}


getMovies()

