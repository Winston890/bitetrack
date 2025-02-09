import React from "react";
import "./Landing.css";
import Logo from "./Logo.js";
import mission_image from "./assets/mission_food.png";
import example_image from "./assets/example_food.png";
import UploadForm from "./UploadForm.js";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-top-container">
        <div className="landing-left-container">
          <Logo />
          <div className="company-mission-container">
            Count the number of calories from just a photo. Keep track of your
            calories, understand what you eat, and get recommendations for
            healthier, tastier, and cheaper options.
          </div>
          <div className="landing-image-container">
            <img
              className="mission-image"
              alt="Mission Chart"
              src={mission_image}
            />
          </div>
        </div>
        <div className="landing-right-container">
          <img className="example-image" alt="Example food" src={example_image} />
        </div>
      </div>
      <div className="upload-form-container">
        <UploadForm />
      </div>
    </div>
  );
};

export default Landing;