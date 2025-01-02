//navdropdown for the profile and signout
//css/style combined here
//03-05-24 fetch&pulled, added the /:userID

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  Chip,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import Person2Icon from "@mui/icons-material/Person2";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ApplicationCount } from "../Display/DsiplayFunctions";

function NavDropdown(props) {
  const [numCount] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    navigate("/sign-in");
    logout();
  };
  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="primary"
        size="lg"
        startDecorator={<Person2Icon />}
      >
        {props.name}
      </MenuButton>
      <Menu
        color="primary"
        size="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: "8px",
          gap: "22px",
        }}
      >
        <MenuItem onClick={() => handleClick(`/profile/me`)}>
          <Link
            to={`/profile/me`}
            style={{
              // display: "block",
              // padding: "12px 16px",
              textDecoration: "none",
              color: "#565360",
            }}
          >
            <AccountCircleOutlinedIcon /> My Profile
          </Link>
        </MenuItem>
        {user.userType === "Catcher" ? (
          <MenuItem
            onClick={() => {
              handleClick("/dashboard/my-application");
            }}
          >
            <Link
              to={"/dashboard/my-application"}
              style={{
                // display: "block",
                // padding: "12px 16px",
                textDecoration: "none",
                color: "#565360",
              }}
            >
              <Typography>
                <AssignmentOutlinedIcon /> Applications
                {numCount !== null && numCount > 0 ? (
                  <Chip color="danger" size="md" variant="solid">
                    <ApplicationCount id={user.userID} />
                  </Chip>
                ) : (
                  <Chip
                    // color="success"
                    color="danger"
                    variant="soft"
                  >
                    <ApplicationCount id={user.userID} />
                  </Chip>
                )}
              </Typography>
            </Link>
          </MenuItem>
        ) : null}
        {/* admin history: generate report */}
        {user.userType === "admin" ? (
          <MenuItem
            onClick={() => handleClick("/dashboard/admin/generate-report")}
          >
            <Link
              to={"/dashboard/admin/generate-report"}
              style={{
                textDecoration: "none",
                color: "#565360",
              }}
            >
              <HistoryIcon /> Generate Report
            </Link>
          </MenuItem>
        ) : (
          // employer & catcher history
          <MenuItem onClick={() => handleClick("/history")}>
            <Link
              to={"/history"}
              style={{
                // display: "block",
                // padding: "12px 16px",
                textDecoration: "none",
                color: "#565360",
              }}
            >
              <HistoryIcon /> History
            </Link>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          <Link
            onClick={handleLogout}
            to={"/sign-in"}
            style={{
              // display: "block",
              // padding: "12px 16px",
              textDecoration: "none",
              color: "#565360",
            }}
          >
            <LogoutIcon /> Sign Out
          </Link>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default NavDropdown;
