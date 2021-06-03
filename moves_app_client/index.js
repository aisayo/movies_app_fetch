const moviesContainer = document.querySelector("#movies-container")
const form = document.querySelector("#movies-form")

form.addEventListener('submit', handleSubmit)

function getMovies(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(renderMovies)
}

function renderMovies(movies){
    const moviesArr = movies.data
    moviesArr.forEach((movie) => {
        renderMovie(movie)
    })
}

function renderMovie(movie){
   const movieDetails = movie.attributes
   moviesContainer.innerHTML += `
    <div id=movie-${movieDetails.id} data-id=${movieDetails.id}>
        <img class="movies-img" data-id=${movieDetails.id} src=${movieDetails.img}
    </div>
    <br>
    <button>Edit</button>
    <button>Delete</button>
    <br>
    <br>
   `
   const moviesImgs = document.getElementsByClassName('movies-img')

    for (const img of moviesImgs){
        img.addEventListener('click', getMovie)
    }

    const bttns = document.querySelectorAll('button')
    for (const bttn of bttns){
        bttn.addEventListener('click', handleBttnClick)
    }
}

function getMovie(event){
    const id = event.target.dataset.id
    fetch(`http://localhost:3000/movies/${id}`)
    .then(resp => resp.json())
    .then(movie => {
        renderMovieDetails(movie)
        const backBttn = document.getElementById('back-bttn')
        backBttn.addEventListener('click', goBack)
    })
}

function renderMovieDetails(movie){
    const movieDetails = movie.data.attributes
    moviesContainer.innerHTML = ''
    moviesContainer.innerHTML += `
    <img data-id=${movieDetails.id} src=${movieDetails.img}><br>
    Title: ${movieDetails.name}<br>
    Release Year: ${movieDetails.release_year}<br>
    Runtime: ${movieDetails.run_time}<br>
    <a id="back-bttn" href="#">Back</a>
    `

}

function goBack(e){
    moviesContainer.innerHTML = ''
    getMovies()
}

function handleSubmit(e){
    e.preventDefault()

    // get form data 
    // package it up to be sent to backend 

    const movieObj = {
        name: document.querySelector("#movie-name").value,
        release_year: document.querySelector("#movie-date").value,
        run_time: document.querySelector("#movie-run-time").value,
        img: document.querySelector("#movie-img").value
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movieObj)
    }

    fetch('http://localhost:3000/movies', options)
    .then(resp => resp.json())
    .then(movie => {
        const m = movie.data
        renderMovie(m)
        clearForm()
    }
    )
}

function clearForm(){
    for (const input of form.children){
        if (input.type !== "submit"){
            input.value = ""
        }
    }
}

function handleBttnClick(event){
    if (event.target.innerText === 'Delete'){
        deleteMovie(event.target)
    } else if (event.target.innerText === 'Edit'){
        // handle edit
    }
}

function deleteMovie(element){
    const id = element.parentElement.dataset.id
    element.parentElement.remove()
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => alert(data.message))
}


getMovies()