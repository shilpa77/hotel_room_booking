import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hotels = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const url = "/api/v1/hotels/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setHotels(res))
      .catch(() => navigate("/"));
  }, []);

  const allHotels = hotels.map((hotel, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={hotel.image}
          className="card-img-top"
          alt={`${hotel.name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{hotel.name}</h5>
          <Link to={`/hotel/${hotel.id}`} className="btn custom-button">
            View Hotel
          </Link>
        </div>
      </div>
    </div>
  ));
  const noHotel = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No hotels yet.
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Hotels for every stay</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {hotels.length > 0 ? allHotels : noHotel}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
  
export default Hotels;

