import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

const RoomBookings = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [userRooms, setUserRooms] = useState([]);

    useEffect(() => {
        const url = `/api/v1/room_bookings/index`;
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => {
            setUserRooms(response)})
          .catch(() => navigate("/hotels"));
    }, [params.id]);

    const addHtmlEntities = (str) => {
        return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    const editBooking = (id) => {
      const url = `/api/v1/room_bookings/update/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
  
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => navigate("/room_bookings"))
        .catch((error) => console.log(error.message));
    };
    
    const deleteBooking = (id) => {
      const url = `/api/v1/room_bookings/destroy/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
  
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => navigate("/room_bookings"))
        .catch((error) => console.log(error.message));
    };

    const roomList = () => {
        let roomList = "No rooms available";
    
        if (userRooms.length > 0) {
            // debugger
          roomList = userRooms
            .map((room, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                    <div className="card mb-4">
                        <p>Check-In: {moment(room.check_in).format('DD-MMM-YYYY, h:mm:ss a')}</p>
                        <p>Check-Out: {moment(room.check_out).format('DD-MMM-YYYY, h:mm:ss a')}</p>
                        <div className="col-sm-6 col-lg-6">
                          <div className="row">
                            <div className="col-sm-8 col-lg-6">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {editBooking(room.id)}}
                              >
                                Edit Booking
                              </button>
                            </div>
                            <div className="col-sm-8 col-lg-6">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {deleteBooking(room.id)}}
                              >
                                Delete Booking
                              </button>
                            </div>
                          </div>
                        </div>
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
      
      return (
        <div className="py-5">
          <Link to="/hotels" className="btn btn-link">
              Back to Hotels
          </Link>
          <div className="container">
            <div className="row">
                  <h5 className="mb-2">Rooms</h5>
                  {roomList()}
            </div>
          </div>
        </div>
    );
};

export default RoomBookings;
