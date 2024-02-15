class UserRoom < ApplicationRecord
  belongs_to :user
  belongs_to :room

  def book_rooms(booking_params)
    room_ids = UserRoom.where('check_in > (?) AND check_out < (?) AND hotel_id = ?', booking_params[:check_in], booking_params[:check_out], booking_params[:hotel_id]).select(:room_id)
    available_rooms = Room.where.not(id: room_ids).limit(booking_params[:room_count])

    user_rooms = available_rooms.each do |room|
      {
        check_in: booking_params[:check_in],
        check_out: booking_params[:check_out],
        user_id: booking_params[:user_id],
        hotel_id: room.hotel_id,
        room_id: room.id
      }  
    end
    UserRoom.insert_all!(user_rooms)

  end
end
