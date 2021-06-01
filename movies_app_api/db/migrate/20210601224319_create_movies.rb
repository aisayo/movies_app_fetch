class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :release_year
      t.string :run_time
      t.string :img
      t.timestamps
    end
  end
end
