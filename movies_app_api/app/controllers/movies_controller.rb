class MoviesController < ApplicationController

    def index 
        movies = Movie.all
        render json: MovieSerializer.new(movies)
    end 

    def show
        movie = Movie.find_by_id(params[:id])
        render json: MovieSerializer.new(movie)
    end 

end
