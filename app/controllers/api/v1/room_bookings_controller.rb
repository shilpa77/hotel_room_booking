class Api::V1::RoomBookingsController < ApplicationController
  before_action :set_user_room, only: %i[update show destroy]

  def index
    rooms = UserRoom.all.order(created_at: :desc)
    render json: rooms
  end

  def create
    room = UserRoom.book_rooms(booking_params)
    if room
      render json: room
    else
      render json: room.errors
    end
  end

  def update
    user_room = UserRoom.update!(room_params)
    if user_room
      render json: user_room
    else
      render json: user_room.errors
    end
  end

  def show
    render json: @user_room
  end

  def destroy
    @user_room&.destroy
    render json: { message: 'Reservation cancled for room!' }
  end

  private

  def booking_params
    params.require(:booking).permit(:hotel_id, :check_in, :check_out, :user_id, :room_count)
  end

  def room_params
    params.permit(:check_in, :check_out)
  end

  def set_user_room
    @user_room = UserRoom.find(params[:id])
  end
end
