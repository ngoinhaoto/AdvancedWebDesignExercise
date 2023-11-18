import "../App.css";

import "../css/main.css";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import TaskSearchAndBody from "../components/TaskSearchAndBody";

import React, { useState, useEffect } from "react";

function AppHome() {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("token: " + token);

        if (!token) {
          //no token -> redirect
          navigate("/login");
          return;
        }

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
