import React from "react";
import companyPeopleImage from "../Image/company-people-working-and-transferring-money.png";

export const Home = () => {
  return (
    <div className="home-container">
      <h1>
        welcome to our budget app <br />
        place which helps you to control your money!{" "}
      </h1>

      <img
        className="home-image"
        src={companyPeopleImage}
        alt="People working and transferring money"
      />
    </div>
  );
};
