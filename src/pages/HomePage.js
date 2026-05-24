import React from "react";
import MainSection from "../components/MainSection";
import ProfileCard from "../components/ProfileCard";

const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <MainSection />
      <ProfileCard />
    </div>
  );
};

export default HomePage;
