import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Hotel = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState({ rooms: "" });
    const [room_count, setRoomCount] = useState("");
    const [check_in, setCheckIn] = useState("");
    const [check_out, setCheckOut] = useState("");

    useEffect(() => {
        const url = `/api/v1/hotels/show/${params.id}`;
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => {
            setHotel(response)})
          .catch(() => navigate("/hotels"));
    }, [params.id]);

    const addHtmlEntities = (str) => {
        return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    const roomList = () => {
        let roomList = "No rooms available";
    
        if (hotel.rooms.length > 0) {
          roomList = hotel.rooms
            .map((room, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                    <div className="card mb-4">
                        <p>{room.room_number}</p>
                        <p>{room.room_type}</p>
                    </div>
                </div>
            ));
        }
    
        return roomList;
    };

    const stripHtmlEntities = (str) => {
        return String(str)
          .replace(/\n/g, "<br> <br>")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      };
    
    const bookingData = {
        user_id: 1,
        room_id: null,
        check_in: '',
        check_out: '',
        room_count: 1
    }

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
      };
    

    const handleSubmit = e => {
        e.preventDefault();
        const url = `/api/v1/room_bookings/create/`;
        const token = document.getElementsByName("csrf-token")[0].content;
        const body = {
            room_count,
            check_in,
            check_out,
            hotel_id: params.id,
            user_id: 1,
          };

        axios.post(url, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            booking: body,
        })
          .then(response => {
            console.log('Booking successful:', response.data);
          })
          .catch(error => {
            console.error('Error booking room:', error);
          });
    };
      
      return (
        <div className="">
          <div className="hero position-relative d-flex align-items-center justify-content-center">
            <img
              src={hotel.image}
              alt={`${hotel.name} image`}
              className="img-fluid position-absolute"
            />
            <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
              {hotel.name}
            </h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-12 col-lg-3">
                <Link
                    to="/room_bookings"
                    className="btn btn-lg custom-button"
                    role="button"
                    >
                    View Booked Rooms
                </Link>
              </div>
              <div className="col-sm-12 col-lg-7">
                <h5 className="mb-2">Preparation Instructions</h5>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="number" required name='room_count' placeholder='Enter number of rooms' onChange={(event) => onChange(event, setRoomCount)} />
                    </div>
                    <div>
                        <input type="date" required name='check_in' placeholder='Enter check in date' onChange={(event) => onChange(event, setCheckIn)} />    
                    </div>
                    <div>
                        <input type="date" required name='check_out' placeholder='Enter check out date' onChange={(event) => onChange(event, setCheckOut)} />
                    </div>
                    <button>Submit</button>
                </form>
              </div>
            </div>
            <Link to="/hotels" className="btn btn-link">
              Back to Hotels
            </Link>
          </div>
        </div>
    );
};
  
export default Hotel;
