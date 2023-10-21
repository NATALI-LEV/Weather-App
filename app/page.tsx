"use client";
import React , { useState } from "react";

import Input from "./component/Input";
import Current from "./component/Current";
import WeekForecast from "./component/WeekForecast";
import WeatherDetails from "./component/WeatherDetails";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error , setError] = useState("");
                                                    /* PUT UR API KEY HERE !!!*/
  const url = `http://api.weatherapi.com/v1/forecast.json?key=YOUR-KEY&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter")
    {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if(!response.ok){
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error){
        setError("city not found");
        setData({});
      }
    }
  };

  let content;
  if(Object.keys(data).length === 0 && error ==='')
  {
    content= (
      <div className="text-white text-center h-screen mt-[5rm]">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the weather app</h2>
        <p className="text-xl">Pick a city and get the full weather forecast</p>
      </div>
    );
  } else if (error != ""){
    content = (
      <div className="text-white text-center h-screen mt-[5rm]">
        <p className="text-3xl font-semibold mb-4">city not found !</p>
        <p className="text-xl">enter a valid city please</p>
      </div>
    );
  } else {
    content = (
      <>
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
        <Current data={data}/>
        <WeekForecast data={data} />
      </div>
      <div>
        <WeatherDetails data={data} />
      </div>
      </>
    );
  }

  return (
    <div className="bg-color bg-gradient-to-r from-blue-900 to-green-900 h-fit">
      <div className="bg-white/25 w-full flex flex-col h-fit">

        {/*INPUT AND LOGO*/}

        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="text-2xl mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Lev's Weather</h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Home;