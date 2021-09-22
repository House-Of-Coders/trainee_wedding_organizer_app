import React, { useEffect } from "react";
import "./css/Homepage.css";
import Vendorrow from "./Vendorrow";
import vendors from "../../Assets/vendordata";

function Homepage() {
  useEffect(() => {}, []);

  return (
    <div className="homepage">
      <div className="homepage_container">
        <img
          src="https://www.stanburyphotography.co.uk/wp-content/uploads/2018/11/sri-lanka-destination-wedding-photographers-016-3.jpg"
          alt="backgroundimages"
          className="home_image"
        />
        <div className="homepage_row">
          {vendors.map((vendorcategory, index) => {
            return (
              <Vendorrow
                key={index}
                category={vendorcategory.category}
                vendors={vendorcategory.vendors}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
