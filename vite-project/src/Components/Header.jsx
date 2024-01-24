import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className="flex justify-between items-center w-[70vw] m-auto h-12 ">
      <div className="logo">
        <p className="font-bold">
          <Link to={"/"}>Blog App</Link>{" "}
        </p>
      </div>

      {isLoggedIn && (
        <div className="menu flex gap-3 ">
          <p className="font-bold">
            <Link to={"/blogs"}>All Blogs</Link>
          </p>
          <p className="font-bold">
            <Link to={"/myBlogs"}>My Blogs</Link>
          </p>
        </div>
      )}

      <div className="menu flex gap-3 ">
        {!isLoggedIn && (
          <>
            <p className="font-bold">
              <Link to={"/auth"}>Login</Link>
            </p>
            <p className="font-bold">
              <Link to={"/auth"}>Sing Up</Link>
            </p>
          </>
        )}

        {isLoggedIn && (
          <p className="font-bold">
            <Link to={"/Singup"}>Log Out</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
