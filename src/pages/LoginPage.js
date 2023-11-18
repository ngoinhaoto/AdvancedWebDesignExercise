import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://awd-2023.azurewebsites.net/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const { token, refresh_token } = result;

        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);

        navigate(`/app`);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <br />
        {errors.username && <span>This field is required</span>}
        <br />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <br />
        {errors.password && <span>This field is required</span>}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
