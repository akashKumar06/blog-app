import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import { useForm } from "react-hook-form";
import Input from "./Input";
function Login() {
  // manage business logic of logout here
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const login = async (data) => {
    setError("");
    try {
      // login service
      // if session received from login service then set UserData
      // if userData update on store
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl">
        <span>Logo</span>
      </div>
      <h2>Sign in to your account</h2>
      <p>
        Don&apos;t have any account?&nbsp;
        <Link to="/signup" className="hover:underline">
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Email:"
            placeholder="Enter Your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(
                    value
                  ) || "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full" />
        </div>
      </form>
    </div>
  );
}

export default Login;
