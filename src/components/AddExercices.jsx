import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/AddExercices.css";

const AddExercices = () => {
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    url: "https://musclejp.p.rapidapi.com/get-tous-partie-du-corps",
    headers: {
      "X-RapidAPI-Key": "d0a1938decmsh230ce047cb28ad7p183e78jsne8d76c76ab16",
      "X-RapidAPI-Host": "musclejp.p.rapidapi.com",
    },
  };
  const fetchData = () =>{
  axios
    .request(options)
    .then(function (res) {
      console.log(res.data);
      setData(res.data)
    })
    .catch(function (error) {
      console.error(error);
    });
  }
useEffect(()=>{
  fetchData()
})

  return (
    <div className="exercices-container">
      <h2 className="exercices-title">Selectionner des exercices</h2>
      <div className="exercices-muscle">
      </div>
    </div>
  );
};

export default AddExercices;
