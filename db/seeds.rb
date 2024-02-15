# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# hotel1 = Hotel.create(
#   name: "Hotel Transylvania",
#   address: {city: 'Pune', state: 'Maharashtra', country: 'India'}
# )

# hotel2 = Hotel.create(
#   name: "Hotel Grand",
#   address: {city: 'Mumbai', state: 'Maharashtra', country: 'India'}
# )

10.times do |i|
  Room.create(
    room_number: "Room #{i + 1}",
    room_type: 'Delux',
    price: 5000, 
    hotel_id: [1,2].sample
  )
end

User.create(name: 'Shilpa', email: 'test@test.in', phone_number: '12345667')
