import { Button, TextField, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  // State for form data
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handler for input changes
  function inputHandler(event) {
    const key = event.target.name;
    const value = event.target.value;

    setForm((oldValue) => ({
      ...oldValue,
      [key]: value,
    }));
  }

  // Validation function
  const validateInput = (data) => {
    const { username, password, confirmPassword } = data;

    if (!username) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }
    if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (!password) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
      return false;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }
    return true;
  };

  // Function to handle user registration
  const register = async (formData) => {
    if (!validateInput(formData)) {
      return;
    }

    const url = `${config.endpoint}/auth/register`;

    try {
      const response = await axios.post(url, {
        username: formData.username,
        password: formData.password,
      });

      setForm({
        username: "",
        password: "",
        confirmPassword: "",
      });

      enqueueSnackbar("Registered successfully", { variant: "success" });
      history.push("/login");

    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={form.username}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be at least 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={form.password}
            onChange={inputHandler}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={inputHandler}
            fullWidth
          />
          <Button onClick={() => register(form)} className="button" variant="contained">
            Register Now
          </Button>
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
            
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
