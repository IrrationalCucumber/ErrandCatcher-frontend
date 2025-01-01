import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import axios from "axios";
import "./Cards.css";

function Cards() {
  const [commissions, setCommissions] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/available`);
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, [apiBaseUrl]);

  return (
    <div className="cards">
      {/* <h1>Check out this epic Destination!</h1> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {commissions.map((commission) => (
              <CardItem
                key={commission.commissionID}
                src="/images/hr.png"
                text={commission.commissionTitle}
                label={commission.commissionType}
                location={commission.commissionLocation}
                path={`/errand/view/${commission.commissionID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
