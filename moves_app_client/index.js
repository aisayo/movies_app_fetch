// Fetch all movies 

function getMovies(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movies => {
        // Traverse response object
        // Manipulate data into elements
        // Append to DOM
    })
}

getMovies()