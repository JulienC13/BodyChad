import React, { useEffect, useState } from "react";
import axios from "axios";

const MuscleList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://musclejp.p.rapidapi.com/get-nom/")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
};

export default MuscleList;
