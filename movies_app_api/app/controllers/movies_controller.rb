class MoviesController < ApplicationController

    def index 
        movies = Movie.all
        render json: MovieSerializer.new(movies)
    end 

    def show 
        movie = Movie.find_by_id(params[:id])
        render json: MovieSerializer.new(movie)
    end 

    def create
        movie = Movie.new(movie_params)

        if movie.save 
            render json: MovieSerializer.new(movie)
        else 
            render json: {error: "Movie not successfully saved"}
        end 
    end 

    def destroy 
        movie = Movie.find_by_id(params[:id])
        movie.destroy 
        render json: {message: "#{movie.name} was successfully deleted"}
    end 

    private

    def movie_params 
        params.require(:movie).permit(:name, :release_year, :run_time, :img)
    end 
end
