class CreateUserRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :user_rooms do |t|
      t.references :user
      t.references :room
      t.integer :hotel_id
      t.datetime :check_in
      t.datetime :check_out

      t.timestamps
    end
  end
end
