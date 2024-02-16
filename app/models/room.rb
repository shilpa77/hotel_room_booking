class Room < ApplicationRecord
  belongs_to :hotel
  has_many :user_rooms
  has_many :users, through: :user_rooms
  enum :room_type, [ :delux, :premium ]

  # scope :available_rooms, ->(check_in: Time.now, check_out: Time.now + 1.day, count: 1) do
  #   joins(:user_rooms).where('user_rooms.check_in > (?) AND user_rooms.check_out < (?) AND user_rooms.hotel_id = ?', booking_params[:check_in], booking_params[:check_out], booking_params[:hotel_id]).select(:room_id)
  # end
end
