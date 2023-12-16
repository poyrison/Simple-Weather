import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  * {
    box-sizing: border-box;
  }

  .appContentWrap {
    background: linear-gradient(180deg, #130754 0%, #3b2f80 100%);

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 5vh 5vw;
    border-radius: 25px;
  }

  #inputBox {
    display: flex;
    justify-content: center;
    gap: 14px;
  }

  #inputBox input {
    display: flex;
    font-size: 20px;
    font-weight: 400;
    height: 50px;
    color: #626262;
    outline: none;
    border: none;
    border-radius: 40px;
    padding-left: 40px;
  }

  #searchBtn {
    border: 0;
    background: #eee;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
  }

  #searchBtn:hover {
    cursor: pointer;
  }

  #searchBtn:active {
    background: #fff;
  }

  // #inputBox {
  //   display: flex;
  //   justify-content: space-around;
  // }
`;

const ResultWrap = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  color: #eee;

  .cityData {
    text-align: center;
    font-size: 2rem;
  }

  #countryTimezone {
    font-size: 18px;
  }

  .temperatureData {
    text-align: center;
    font-size: 4rem;
  }

  .skyData {
    text-align: center;
  }

  #tempMaxMin {
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    font-size: 20px;
    font-weight: 400;
  }
`;

function App() {
  const API_KEY = "b438560594f96f5cc956a19915b9fbbe";
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const [temp, setTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [num, setNum] = useState(0);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const convertToF = (celsius) => {
    let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
    setTemp(fahrenheit);
  };
  const convertToF_Max = (celsius) => {
    let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
    setMaxTemp(fahrenheit);
  };
  const convertToF_Min = (celsius) => {
    let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
    setMinTemp(fahrenheit);
  };

  const weatherIcon = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Humidity",
    "Rain",
    "Snow",
    "Wind",
  ];
  const weatherIconHandle = (e) => {
    const weatherIconIndex = weatherIcon.indexOf(e);
    return weatherIconIndex;
  };

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        await axios.get(url).then((response) => {
          console.log(response.data);
          setResult(response);
          convertToF(response.data.main.temp);
          convertToF_Max(response.data.main.temp_max);
          convertToF_Min(response.data.main.temp_min);
          setNum(weatherIconHandle(response.data.weather[0].main));
        });
      } catch (err) {
        alert("도시명을 확인해 주세요");
      }
    }
  };
  const searchWeatherMouse = async (e) => {
    try {
      await axios.get(url).then((response) => {
        console.log(response.data);
        setResult(response);
        convertToF(response.data.main.temp);
        convertToF_Max(response.data.main.temp_max);
        convertToF_Min(response.data.main.temp_min);
        setNum(weatherIconHandle(response.data.weather[0].main));
      });
    } catch (err) {
      alert("도시명을 확인해 주세요");
    }
  };

  // 지역의 시간대 정보
  const getTimeInTargetTime = (timezone) => {
    const targetTimezone = timezone;
    moment.locale("ko");
    const utcTime = moment().utc();
    const targetTime = utcTime.add(targetTimezone, "seconds");

    return targetTime.format("M.D(ddd) HH:mm");
  };

  return (
    <AppWrap>
      <div className="appContentWrap">
        <div id="inputBox">
          <input
            id="searchWeather"
            placeholder="Search"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            type="text"
            onKeyDown={searchWeather}
            autoFocus
          />
          <button id="searchBtn" type="button" onClick={searchWeatherMouse}>
            <img
              src={process.env.PUBLIC_URL + `/image/Search.png`}
              alt="검색 버튼 이미지"
            />
          </button>
        </div>
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div>
              <div className="skyData">
                <div>
                  <div className="cityData">
                    <div id="countryName">{`${result.data.name}, ${result.data.sys.country}`}</div>
                    <div id="countryTimezone">
                      {getTimeInTargetTime(result.data.timezone)}
                    </div>
                  </div>
                </div>
                <img
                  id="myImage"
                  src={
                    process.env.PUBLIC_URL + `/image/${weatherIcon[num]}.png`
                  }
                  width={200}
                  height={200}
                  alt={`${result.data.weather[0].main}`}
                  title={`${result.data.weather[0].main}`}
                />
                <div>
                  <div className="temperatureData">
                    {`${temp}˚`}
                    <div id="tempMaxMin">
                      <div>{`최고:${maxTemp}º`}</div>
                      <div>{`최저:${minTemp}º`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;
