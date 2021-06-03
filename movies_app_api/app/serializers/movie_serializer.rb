class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :release_year, :run_time, :img 
end
