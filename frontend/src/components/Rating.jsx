import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

//this component taking the value of rating and if i want a text besides it
const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {/* A span for each star */}
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="rating-text">{text && text}</span>
      {/* this is a cool trick ==> {text && text} is a conditional rendering 
      expression. It checks if the text variable has a truthy value. If text is 
      truthy, then it will render the value of text inside the <span> element. If 
      text is falsy (e.g., null, undefined, false, 0, ''), then nothing will be 
      rendered inside the <span> element. */}
    </div>
  );
};

export default Rating;
