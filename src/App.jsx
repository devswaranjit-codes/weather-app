import { useState } from "react";
import { Search, Cloud } from "lucide-react";

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2c3e50]">
      <header className="pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Cloud className="w-12 h-12 text-blue-400 float-animation mr-3" />
            <h1 className="text-3xl font-bold text-white">Weatherlon</h1>
          </div>
          <div className="relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full max-w-lg text-lg bg-white/10 text-white 
                       rounded-xl py-4 pl-6 pr-16 outline-none
                       border-2 border-transparent
                       transition-all duration-300
                       placeholder:text-gray-400
                       search-input-focus"
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              value={value}
            />
            <button
              onClick={handleClick}
              className="absolute right-2 top-1/2 -translate-y-1/2
                       bg-blue-500 p-2.5 rounded-lg
                       transition-all duration-300
                       search-button-hover
                       active:scale-95
                       group"
            >
              <Search className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 weather-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-5xl font-bold text-white mb-2">
                  {weatherObj.temp}°C
                </h2>
                <h3 className="text-3xl text-gray-200 mb-4">
                  {weatherObj.location}
                </h3>
                <div className="space-y-1 text-gray-300">
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="font-medium">Time:</span> {weatherObj.time}
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="font-medium">Date:</span> {weatherObj.date}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6
                            bg-white/5 rounded-xl
                            transform transition-transform duration-300
                            hover:scale-105">
                {weatherObj.src && (
                  <img
                    src={weatherObj.src}
                    alt={weatherObj.condition}
                    className="w-24 h-24 object-contain mb-4"
                  />
                )}
                <p className="text-xl text-white font-medium">
                  {weatherObj.condition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
