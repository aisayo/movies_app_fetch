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