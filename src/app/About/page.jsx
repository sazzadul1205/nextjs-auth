import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "About",
  description: "A Super Power full NextJS Website - About Page  ",
};

export const GetTime = async () => {
  const res = await fetch(`http://localhost:3000/api/Time`, {
    next: { revalidate: 5 },
  });

  const data = await res.json();
  return data.currentTime;
};

const page = async () => {
  const currentTime = await GetTime();
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <div>
      <p className="text-center text-3xl font-bold pt-5">About Page</p>
      <p className="text-center text-3xl font-bold pt-5">Time: {currentTime}</p>
    </div>
  );
};

export default page;
