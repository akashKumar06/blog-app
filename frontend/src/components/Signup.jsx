import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    console.log(data);
    setError("");
    try {
      // signup service
      // if userData received the update the userSlice
      // dispatch(login)
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">Logo</span>
      </div>
      <h2>Sign up to create account</h2>
      <p>
        Already have an account?
        <Link to="/login">Sign In</Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(signup)}>
        <div className="space-y-5">
            <Input label="Full Name: " placeholder="Enter your full name" {...register("name"), {required: true}}/>
            <Input label="Email: " placeholder="Enter your email" {...register("email"), {required: true}}/>
            <Input label="Password: " placeholder="Enter your password" {...register("password"), {required: true}}/>
            <Button type="submit" className="w-full">Create account</Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
