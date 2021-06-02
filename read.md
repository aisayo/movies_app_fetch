For the read action, we can utilize two different end points

1. the index

- The API action:

```    
def index 
    movies = Movie.all
    render json: MovieSerializer.new(movies)
end
```

- The frontend fetch logic:
```
function getMovies(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movies => {
        // Traverse response object
        // Manipulate data into elements
        // Append to DOM
    })
}
```


For a show endpoint, we can attach id's to our elements with the objects database id, and use this in our fetch request:

- The API action:


```
def show
    movie = Movie.find_by_id(params[:id])
    render json: MovieSerializer.new(movie)
end 
```

- The frontend fetch logic:
```
function getMovie(movieId){
    fetch(`http://localhost:3000/movies/${movieId}`)
    .then(resp => resp.json())
    .then(movie => {
        // Do something with data
    })
}
```
