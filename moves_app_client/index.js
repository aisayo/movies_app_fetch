const moviesContainer = document.querySelector("#movies-container")
const submitBttn = document.getElementById('submit-bttn')
submitBttn.addEventListener('click', createMovie)

let moviesArr = []

function getMovies(){
    fetch('http://127.0.0.1:3000/movies')
    .then(resp => resp.json())
    .then(renderMovies)
}

function renderMovies(movies){
    moviesArr = movies.data
    moviesArr.forEach(movie => {
        renderMovie(movie)
    })
}

function renderMovie(movie){
    let movieDetails = movie.attributes
    moviesContainer.innerHTML += `
        <div data-id=${movieDetails.id}>
            <img data-id=${movieDetails.id} class="movie-img" src=${movieDetails.img} />
            <br>
            <button>Edit</button>
            <button>Delete</button>
            <br>
            <br>
        </div>
    `
    const movieImgs = document.getElementsByClassName('movie-img')    
    for (const img of movieImgs){
        img.addEventListener('click', movieShow)
    }

    const bttns = document.querySelectorAll('button')
    for (const bttn of bttns){
        bttn.addEventListener('click', handleButton)
    }
}

function movieShow(){
    const id = event.target.dataset.id

    fetch(`http://127.0.0.1:3000/movies/${id}`)
    .then(resp => resp.json())
    .then(movie => {
        const movieDetails = movie.data.attributes
        moviesContainer.innerHTML = ''
        moviesContainer.innerHTML += `
            <img src=${movieDetails.img} />
            Title: ${movieDetails.name}
            Release Date: ${movieDetails.release_year}
            Run Time: ${movieDetails.run_time}
            <a id="back-bttn" href="#">Back</a>
        `

        const backBttn = document.getElementById('back-bttn')
        backBttn.addEventListener('click', goBack)
    })
}

function goBack(){
    moviesContainer.innerHTML = ''
    getMovies()
}

function handleButton(event){
   if (event.target.innerText === 'Delete'){
       deleteMovie(event.target)
   } else if (event.target.innerText === 'Edit'){
       editMovie(event.target) 
   }
}

function deleteMovie(element){
    const div = element.parentElement
    const id = div.dataset.id
    div.remove()
    
    fetch(`http://127.0.0.1:3000/movies/${id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => alert(data.message))
}

function createMovie(event){
    event.preventDefault()

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getFormData())
    }

    fetch('http://127.0.0.1:3000/movies', options)
    .then(resp => resp.json())
    .then(movie => {
        debugger;
        renderMovie(movie.data)
        clearForm()
    })
}

function clearForm(){
    document.querySelector("#movie-name").value = ''
    document.querySelector("#movie-date").value = ''
    document.querySelector("#movie-run-time").value = ''
    document.querySelector("#movie-img").value = ''
}

function getFormData(){
    const movie = {
        name: document.querySelector("#movie-name").value,
        release_year: document.querySelector("#movie-date").value,
        run_time: document.querySelector("#movie-run-time").value,
        img: document.querySelector("#movie-img").value
    }

    return movie
}

function editMovie(target){
    debugger;
}

getMovies()
