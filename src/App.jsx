import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [weatherObj, setWeatherObj] = useState({
    temp: "--",
    location: "--",
    date: "--",
    time: "--",
    condition: "--",
    src: null,
  });

  async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=6fc74cf82bc44773a8a171855241407&q=${location}&aqi=no`;

    try {
      const response = await fetch(url);
      if (response.status === 400) {
        alert("Location is invalid");
        return null;
      } else if (response.status === 200) {
        const json = await response.json();
        return json;
      }
    } catch (error) {
      alert("An error occurred while fetching the weather data.");
      console.error("Fetch error:", error);
      return null;
    }
  }

  const handleClick = async () => {
    if (value !== "") {
      const data = await fetchWeather(value);
      if (data == null) {
        alert("No data found for this location");
        return;
      }

      const temp = data.current.temp_c;
      const location = data.location.name;
      const timeData = data.location.localtime;
      const [date, time] = timeData.split(" ");
      const iconLink = data.current.condition.icon;
      const condition = data.current.condition.text;

      const newWeatherObj = {
        temp,
        location,
        date,
        time,
        condition,
        src: iconLink,
      };
      setWeatherObj(newWeatherObj);
    } else {
      alert("Location can't be empty");
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <header className="h-[150px] bg-[#2c3e50] flex justify-center items-center">
        <div id="input-container" className="w-[60%] flex justify-between">
        <input
  type="text"
  placeholder="Enter Location"
  className="text-white text-lg bg-transparent outline-none py-4 px-0 border-b-2 border-white w-[84%] 
             border-b-solid transition duration-300 ease-in-out 
             focus:border-red-800"
  onChange={handleInput}
/>

  <button
  id="search"
  className="bg-[#619830] text-lg border-none py-4 px-8 text-white cursor-pointer rounded-lg 
             hover:bg-red-500 hover:text-black hover:font-bold 
             transition duration-500 ease-in-out"
  onClick={handleClick}
>
  Search
</button>

        </div>
      </header>
      <main className="flex items-center justify-center text-white bg-[#01161E] h-[calc(100vh-150px)]">
        <div id="weather-container" className="flex gap-4 items-center h-20">
          <div id="temperature">{weatherObj.temp}°C</div>
          <div id="location-date">
            <div id="location" className="text-[2rem] mb-[1.6rem]">{weatherObj.location}</div>
            <span id="time">TIME: {weatherObj.time}</span>
            <br />
            <span id="date">DATE: {weatherObj.date}</span>
          </div>
          <div id="weather-state">
            <img src={weatherObj.src} alt={weatherObj.condition} id="emoji" />
            <div id="condition" className="text-center">{weatherObj.condition}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
