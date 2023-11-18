import "../App.css";

import "../css/main.css";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import TaskSearchAndBody from "../components/TaskSearchAndBody";

import React, { useState, useEffect } from "react";

function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = tokenPayload.exp * 1000;

  return Date.now() >= expirationTime;
}
function isRefreshTokenExpired(refreshToken) {
  if (!refreshToken) {
    return true;
  }

  const refreshTokenPayload = JSON.parse(atob(refreshToken.split(".")[1]));
  const expirationTime = refreshTokenPayload.exp * 1000;

  return Date.now() >= expirationTime;
}

async function refreshTokens() {
  try {
    let token = localStorage.getItem("token");
    let refresh_token = localStorage.getItem("refresh_token");

    const response = await fetch(
      "https://awd-2023.azurewebsites.net/Auth/refresh_token",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          refresh_token: `${refresh_token}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();

      let { token } = result;
      localStorage.setItem("token", token);

      return token;
    }
  } catch (error) {
    console.error("Token refresh fail: " + error);
    throw error;
  }
}

function AppHome() {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let token = localStorage.getItem("token");
        let refresh_token = localStorage.getItem("refresh_token");

        if (isTokenExpired(token)) {
          // if token is expired refresh it
          if (isRefreshTokenExpired(refresh_token)) {
            navigate("/login");
          }

          token = await refreshTokens();
        }
        console.log("token: " + token);

        const response = await fetch(
          "https://awd-2023.azurewebsites.net/Auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          response.text().then((textData) => {
            setUserData(textData);
          });
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user information:");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="App">
      <NavBar />

      <div className="userInfo">
        {userData && (
          <div>
            <h3>User Information:</h3>
            <p>{userData}</p>
          </div>
        )}
      </div>

      <TaskSearchAndBody />
    </div>
  );
}

export default AppHome;
