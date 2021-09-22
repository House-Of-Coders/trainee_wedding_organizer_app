import React from "react";
import "./css/Package.css";
import { Chip } from "@material-ui/core";
import Imageslider from "../Extra Components/Imageslider";

function Package({ data }) {
  return (
    <div className="package">
      <img src={data?.images[0]} style={{ width: "100%", height: "200px" }} />
      <div className="package_details">
        <h1 className="package_title">{data?.title} Package</h1>
        <h3 className="package_description">{data?.description}</h3>
        <Chip label={` Rs.${data?.price}/=`} />
      </div>
    </div>
  );
}

export default Package;
