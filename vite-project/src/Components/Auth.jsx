import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/Index";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [Signup, setSignup] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Signup) {
      const res = await axios.post(
        "http://localhost:3003/api/signup",
        formData
      );
      await dispatch(authActions.login());
      await nav("/auth");

      console.log(res.data);
    } else {
      const res = await axios.post("http://localhost:3003/api/login", {
        email: formData.email,
        password: formData.password,
      });
      await dispatch(authActions.login());
      await nav("/blogs");
      console.log(res.data);
    }
    setformData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {Signup && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {Signup ? `SignUp` : `Login`}
            </button>
          </div>
        </form>
        <button onClick={() => setSignup(!Signup)} className="font-mono ">
          {Signup ? `LogIn` : `Create Account`}
        </button>
      </div>
    </>
  );
};

export default Auth;
