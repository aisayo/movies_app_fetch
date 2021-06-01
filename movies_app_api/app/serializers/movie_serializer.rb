class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :release_year, :run_time, :img, :id
end
