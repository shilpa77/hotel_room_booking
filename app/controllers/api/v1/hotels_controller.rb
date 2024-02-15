class Api::V1::HotelsController < ApplicationController
  def index
    hotels = Hotel.all.order(created_at: :desc)
    render json: hotels
  end

  def show
    hotel = Hotel.find(params[:id])
    render json: hotel
  end
end
