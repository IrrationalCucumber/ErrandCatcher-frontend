import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "../Display/StarRating";
import "./topcat.css";

export default function TopCatcher() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [catchers, setCatchers] = useState([]);
  //fetch top rated catchers
  useEffect(() => {
    const fetchCatchers = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/top-rated`);
        setCatchers(res.data);
      } catch (error) {
        console.error("Error fetching top rated catchers:", error);
      }
    };
    fetchCatchers();
  }, [apiBaseUrl]);

  return (
    <>
      <div className="carousel-container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {catchers.map((catcher, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={catcher.feedbackID}
                data-bs-interval="5000"
              >
                <div className="carousel-content">
                  <img
                    src={
                      catcher.profileImage
                        ? `${apiBaseUrl}/images/profile/${catcher.profileImage}`
                        : "./images/catcher.png"
                    }
                    alt="Catcher Profile"
                    className="catcher-image"
                  />
                  <div className="carousel-caption">
                    <StarRating rating={catcher.averageRate} />
                    <h5 className="catcher-username">{catcher.username}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
