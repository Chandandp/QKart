import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack ,Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {

    // const history = useHistory();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let userName = localStorage.getItem("username");
  
    useEffect(() => {
      if (userName !== null) {
        setIsLoggedIn(true); // Use setIsLoggedIn to update the state
      }
    }, [userName]);
    const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
    };

    const history = useHistory();

    const handleBackToExplore = () => {
      history.push("/");
    };
  

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>

      {children && (
        <Box className="header-search">
          {children}
        </Box>
      )}

      {hasHiddenAuthButtons ? (
        <Stack direction="row" spacing={2}>
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={handleBackToExplore}
          >
            Back to explore
          </Button>
        </Stack>
      ) : isLoggedIn ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="avatar.png" alt={userName} />
          <Typography variant="body1" className="username">
            {userName}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            LOGOUT
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={()=>history.push("/login")}>
            LOGIN
          </Button>
          <Button color="inherit" onClick={()=>history.push("/register")}>
            REGISTER
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
