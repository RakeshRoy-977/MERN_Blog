import React from "react";

const Post = () => {
  return (
    <div className=" bg-gray-100 flex flex-col text-center rounded-md justify-center items-center w-[25vw] m-3 p-3 cursor-pointer">
      <div className="w-[500px]">
        <img
          className="rounded-md"
          src="https://www.muscleandfitness.com/wp-content/uploads/2018/11/pullups-6563805880.jpg?w=1109&h=614&crop=1&quality=86&strip=all"
          alt=""
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-bold">
          SPREAD YOUR LAT WINGS WITH THIS COOL CHINUP VARIATION
        </h3>
        <div className="flex justify-center gap-3">
          <span>Author Name</span>
          <p>29/10/2000</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste porro
          eligendi, deserunt quis minima earum rerum repudiandae minus doloribus
          vel. Beatae, ipsam.
        </p>
      </div>
    </div>
  );
};

export default Post;
