import React from "react";
import "./css/Vendorrow.css";
import Vendorcard from "./Vendorcard";

function Vendorrow({ vendors, category }) {
  return (
    <div className="vendorrow">
      <h1 className="vendorrow_title"> Top Rated {category}</h1>
      <div className="vendorrow_container">
        {vendors.map((vendor) => {
          return <Vendorcard {...vendor} />;
        })}
      </div>
    </div>
  );
}

export default Vendorrow;
