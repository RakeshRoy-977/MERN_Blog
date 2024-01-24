import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../Store/Index";
const Header = () => {
  const dispatch = useDispatch();
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
          <button
            onClick={() => dispatch(authActions.logout())}
            className="font-bold"
          >
            <Link to={"/auth"}>Log Out</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
