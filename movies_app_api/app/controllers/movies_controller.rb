class MoviesController < ApplicationController

    def index 
        movies = Movie.all
        render json: MovieSerializer.new(movies)
    end 

    def show 
        movie = Movie.find_by_id(params[:id])
        render json: MovieSerializer.new(movie)
    end 

    def destroy 
        movie = Movie.find_by_id(params[:id])
        movie.destroy 
        render json: {message: "#{movie.name} was successfully deleted"}
    end 
end
