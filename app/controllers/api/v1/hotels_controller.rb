class Api::V1::HotelsController < ApplicationController
  def index
    hotels = Hotel.all.order(created_at: :desc)
    render json: hotels
  end

  def show
    hotel = Hotel.find(params[:id])
    hotel_data = hotel.as_json
    hotel_data[:rooms] = hotel.rooms
    render json: hotel_data
  end
end
