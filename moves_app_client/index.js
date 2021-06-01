// Fetch all movies 
const moviesContainer = document.getElementById('movies-container')
moviesContainer.addEventListener('click', handleMovieClick)

function getMovies(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movies => {
        let moviesArr = movies.data
        moviesArr.forEach((movie) => {
            moviesContainer.innerHTML += `
                    <img id=${movie.attributes.id} src=${movie.attributes.img}>
                `
        })
    })
}

function handleMovieClick(event){
   if (event.target.nodeName === 'IMG'){
       getMovie(event.target.id)
   }
}

function getMovie(movieId){
    fetch(`http://localhost:3000/movies/${movieId}`)
    .then(resp => resp.json())
    .then(movie => {
        let movieDetails = movie.data.attributes
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
    })
}

function goBack(){
    moviesContainer.innerHTML = ''
    getMovies()
}


getMovies()