import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../src/App.css";
import { useGetTimeMutation } from "../Features/Worldtimeapi";

export default function Main() {
  const [worldTime, setWorldTime] = useState({
    region: "",
    city: "",
  });
  const [showTime, setShowTime] = useState("");
  const [isValid,setIsValid] = useState(true)


  const [getTime, { data, isLoading, isError, isSuccess }] =
    useGetTimeMutation();

  const handleChange = (event) => {
    setWorldTime({ ...worldTime, [event.target.name]: event.target.value });
  };

  const hadleSubmit = (event) => {
    event.preventDefault();    
    if(worldTime.region =='' || worldTime.city ==''){
        setIsValid(false)
    }else{
        setIsValid(true)
        getTime(worldTime);
    }
    
  };
  useEffect(() => {
    if (typeof data !== "undefined" || isSuccess) {
      displayTime(data.unixtime);
    }
  }, [data, isSuccess]);

  const displayTime = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ":" + minutes.substr(-2);

    setShowTime(formattedTime);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>World Time </h1>
        </div>
      </div>
      <div className="container-fluid ribon">
        <div className="container">
          <h1>Rebon</h1>
        </div>
      </div>

      <div className="container">
        <form onSubmit={hadleSubmit}>
          <div className="searchArea">
            <div className="row mt-3 mb-3">
              <div className="col-md-5">
                <select
                  className="form-control"
                  name="region"
                  onChange={handleChange}
                  value={worldTime.region}
                >
                  <option value="">select Region</option>
                  <option value="europe">europe</option>
                  <option value="africa">africa</option>
                  <option value="asia">asia</option>
                  <option value="america">america</option>
                </select>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  className='form-control'
                  value={worldTime.city}
                  onChange={handleChange}
                  name="city"
                  placeholder="Enter city name"
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary">search</button>
              </div>
            </div>
          </div>
        </form>
  {!isValid &&(
   
         <p className="card-text alert alert-danger">          
            Please fill all fileds
         </p>


  )}
    

        {isError  && (
          <div className="card text-left">
            <div className="card-body">
              <p className="card-text">
             
                Could not find time for that city
              </p>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="card text-left">
            <div className="card-body">
              <h4 className="card-title">{worldTime.city}</h4>
              <p className="card-text">
                Time <b> {showTime}</b>{" "}
              </p>
              <p className="card-text">
                abbreviation <b> {data.abbreviation} </b>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
