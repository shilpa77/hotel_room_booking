class Hotel < ApplicationRecord
  has_many :rooms

  jsonb_accessor :address,
    city: :string,
    state: :string,
    country: :string
end
