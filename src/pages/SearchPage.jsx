import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/NavBarPage";
import Search from "@mui/icons-material/Search";
import CatCardsNew from "../components/Cards/CatCardsNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Slider, Box, Typography } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

function SearchPage() {
  const [commissions, setCommissions] = useState([]);
  // const navigate = useNavigate();
  //  const { user } = useAuth();
  const location = useLocation();
  const term = decodeURIComponent(location.pathname.split("/")[2]);
  const [message, setMessage] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  //filter varibales
  const [filter, setFilter] = useState({
    type: "",
    status: "",
    date: "",
    minPay: "",
    maxPay: "",
    location: "",
  });

  const handleSliderChange = (event, newValue) => {
    setFilter((prev) => ({
      ...prev,
      minPay: newValue[0],
      maxPay: newValue[1],
    }));
  };
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  //  rretrieve data
  useEffect(() => {
    //add condition if search term is empty
    // revert to all errnds
    //if (term == "") {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/search-available`, {
          params: { term: term },
        });
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
    setMessage("You have search for '" + term + "'");
    // }
    //add 'term' as dependencies
    // to trigger if its empty
  }, [term, apiBaseUrl]);

  // Search commmissions using JS filter method //
  const filteredCommissions = commissions.filter((commission) => {
    const type = commission.commissionType
      .toLowerCase()
      .includes(filter.type.toLowerCase());
    const titleMatches = commission.commissionTitle
      .toLowerCase()
      .includes(term.toLowerCase());
    const locationMatches = commission.commissionLocation
      .toLowerCase()
      .includes(filter.location.toLowerCase());
    //if price range has been entered
    let priceMatches = true;
    if (filter.minPay !== "" && filter.maxPay !== "") {
      priceMatches =
        commission.commissionPay >= filter.minPay &&
        commission.commissionPay <= filter.maxPay;
    }

    return titleMatches && locationMatches && priceMatches && type;
  });
  //handle filter values changes
  const handleChange = (e) => {
    if (e.target.name === "location") {
      setFilter((prev) => ({ ...prev, location: e.target.value }));
    } else if (e.target.name === "type") {
      setFilter((prev) => ({ ...prev, type: e.target.value }));
    } else {
      setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
      <Navbar />
      <div class="row bg-primary">
        <div class="col d-flex justify-content-center">
          <h1 style={{ position: "relative", color: "white" }}>
            <Search
              sx={{
                color: "skyblue",
                // position: "absolute",
                marginRight: "7px",
                left: "15px",
                fontSize: 28,
              }}
            />
            {message}
          </h1>
        </div>
      </div>

      {/* FILTERS */}
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={(e) => {
            navigate(`/search/${userID}/${searchQuery}`);
          }}
        >
          Search
        </button>
      </div> */}
      <div className="row">
        <div className="search-barborder">
          <div className="box">
            <div className="col">
              <select
                name="type"
                id="type"
                value={filter.type}
                onChange={handleChange}
              >
                <option value="">Choose Errand Type....</option>
                <option value="HomeService">Home Service</option>
                <option value="Delivery">Delivery</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>
            <div className="col">
              <LocationOnIcon
                sx={{
                  position: "absolute",
                  color: "grey",
                  margin: "8px",
                }}
              />
              <select
                style={{ paddingLeft: "32px" }}
                name="location"
                id="location"
                className="selected"
                value={filter.location}
                onChange={handleChange}
              >
                <option value="">Choose Location....</option>
                <option value="Cebu">Cebu</option>
                <option value="Cordova">Cordova</option>
                <option value="Mandaue">Mandaue</option>
                <option value="Lapu-Lapu">Lapu-Lapu</option>
                <option value="Talisay">Talisay</option>
              </select>
            </div>
            <div class="col">
              <div className="Paylabel">
                <div style={{ textAlign: "center" }}>
                  <Typography
                    color="#f5f5f5"
                    variant="h6"
                    sx={{
                      fontSize: 18,
                      fontWeight: 460,
                      letterSpacing: "1.2px",
                      // fontStyle: "italic"
                    }}
                  >
                    Payment Range:
                  </Typography>

                  <Slider
                    className="sliderpay"
                    value={[Number(filter.minPay), Number(filter.maxPay)]}
                    onChange={handleSliderChange}
                    // valueLabelDisplay="on"
                    min={500}
                    max={filter.maxPay}
                    // step={100}
                    sx={{
                      marginTop: 2,
                      color: "white",
                    }}
                  />
                </div>
                <label htmlFor="">
                  {/* <Typography variant="h7">Payment Range:</Typography> */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      style={{
                        padding: "4px 2px",
                      }}
                      className="inputNum"
                      type="number"
                      placeholder="Minimum"
                      name="minPay"
                      onChange={handleChange}
                      value={filter.minPay}
                    />
                    <SyncAltIcon sx={{ color: "#fff", fontSize: 24 }} />
                    <input
                      style={{
                        // border: "solid",
                        padding: "4px 2px",
                      }}
                      className="inputNum"
                      type="number"
                      placeholder="Maximum"
                      name="maxPay"
                      onChange={handleChange}
                      value={filter.maxPay}
                    />
                  </Box>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Cards commissions={filteredCommissions} /> */}
      {/* <CatCardsNew commissions={filteredCommissions} /> */}

      {filteredCommissions && filteredCommissions.length > 0 ? (
        <>
          <CatCardsNew commissions={filteredCommissions} />
        </>
      ) : (
        <>
          <div
            style={{
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <h1 style={{ fontWeight: "600" }}>Opps!</h1>
            <h2 style={{ textAlign: "center" }}>
              No errand found named
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: "600",
                  // color: "#378ce7",
                }}
              >
                {" "}
                "{term}"
              </span>{" "}
              as of now..
            </h2>
          </div>
        </>
      )}
    </>
  );
}

export default SearchPage;
