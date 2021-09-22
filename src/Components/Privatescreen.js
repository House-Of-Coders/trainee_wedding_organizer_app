import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Privatescreen() {
  const history = useHistory();
  const [loginstatus, setLoginstatus] = useState(null);

  useEffect(async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      await axios
        .get("http://localhost:5000/private", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data?.success === true && setLoginstatus(true);
          history.push(`/user`);
        })
        .catch((err) => {
          err.response.data?.success === false && history.push("/guest");
        });
    }
  }, []);

  return (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
}

export default Privatescreen;
