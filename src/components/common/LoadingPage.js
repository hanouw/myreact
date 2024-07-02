import React from "react";
import spinner from "../../assets/imgs/spinner.svg";

const LoadingPage = () => {
  return (
    <div>
      <h4>잠시 기다려주세요</h4>
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default LoadingPage;
