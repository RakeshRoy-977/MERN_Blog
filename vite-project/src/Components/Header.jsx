import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between items-center w-[70vw] m-auto h-10">
      <div className="logo">
        {/* <img src="" alt="logo" /> */}
        <p className="font-bold">
          <Link to={"/"}>Blog App</Link>{" "}
        </p>
      </div>
      <div className="menu flex gap-3">
        <p className="font-bold">
          <Link to={"/login"}>Login</Link>
        </p>
        <p className="font-bold">
          <Link to={"/Singup"}>Sing Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Header;
