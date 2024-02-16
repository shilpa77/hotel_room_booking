class UserRoom < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :check_in, presence: true
  validates :check_out, presence: true

  validate :check_dates

  def self.book_rooms(booking_params)
    available_rooms = Room.where(hotel_id: booking_params[:hotel_id]).where("id NOT IN (SELECT room_id FROM user_rooms WHERE ((check_in BETWEEN ? AND ?) OR (check_out BETWEEN ? AND ?)) OR (check_in < ? AND check_out > ?))", booking_params[:check_in], booking_params[:check_out], booking_params[:check_in], booking_params[:check_out], booking_params[:check_in], booking_params[:check_out]).limit(booking_params[:room_count])

    user_rooms = available_rooms.map do |room|
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

  private

  def check_dates
    errors.add(:check_out, "must be after check-in date") if check_out <= check_in
  end
end
