class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.references :hotel
      t.string :room_number
      t.float :price
      t.integer :room_type

      t.timestamps
    end
  end
end
