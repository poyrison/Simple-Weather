import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

const AppWrap = styled.div`
  * {
    box-sizing: border-box;
  }

  .appContentWrap {
    background: linear-gradient(180deg, #130754 0%, #3b2f80 100%);
    box-shadow: 7px 7px 5px #898aa6;
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
  @media (min-width: 200px) and (max-width: 767px) {
    .appContentWrap {
      width: 80vw;
    }
    #inputBox {
      gap: 10px;
    }
    #inputBox input {
      font-size: 14px;
      font-weight: 400;
      height: 40px;
      padding-left: 20px;
    }
    #searchBtn {
      width: 40px;
      height: 40px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    .appContentWrap {
      width: 80vw;
    }
    #inputBox {
      gap: 10px;
    }
    #inputBox input {
      font-size: 24px;
      font-weight: 400;
      height: 50px;
      padding-left: 50px;
    }
    #searchBtn {
      width: 50px;
      height: 50px;
    }
  }
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

  .cityDataTitleBox {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 5px;
  }

  .cityDataTitleBox img {
    height: 20px;
    width: 20px;
  }

  #countryTimezone {
    font-size: 18px;
  }

  .temperatureData {
    text-align: center;
    font-size: 4rem;
  }

  #weatherImage {
    width: 200px;
    height: 200px;
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
  .windDegSpeed,
  .humidity {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
    font-weight: 400;
    align-items: center;
  }
  .windDegSpeed img,
  .humidity img {
    margin: 0 0 10px 0;
    height: 40px;
    width: 40px;
  }
  .windAndHumidity {
    display: flex;
    justify-content: space-around;
  }
  @media (min-width: 200px) and (max-width: 767px) {
    .cityData {
      font-size: 30px;
    }

    .cityDataTitleBox {
      gap: 3px;
    }

    .cityDataTitleBox img {
      height: 22px;
      width: 22px;
    }

    #countryTimezone {
      font-size: 14px;
    }

    #weatherImage {
      width: 150px;
      height: 150px;
    }

    .temperatureData {
      font-size: 2rem;
    }

    #tempMaxMin {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 400;
    }
    .windDegSpeed,
    .humidity {
      margin-top: 20px;
      font-size: 14px;
    }
    .windDegSpeed img,
    .humidity img {
      margin: 0 0 10px 0;
      height: 25px;
      width: 25px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    .cityData {
      font-size: 40px;
    }

    .cityDataTitleBox {
      gap: 5px;
    }

    .cityDataTitleBox img {
      height: 28px;
      width: 28px;
    }

    #countryTimezone {
      font-size: 18px;
    }

    #weatherImage {
      width: 220px;
      height: 220px;
    }

    .temperatureData {
      font-size: 3.5rem;
    }

    #tempMaxMin {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 400;
    }
    .windDegSpeed,
    .humidity {
      margin-top: 20px;
      font-size: 20px;
    }
    .windDegSpeed img,
    .humidity img {
      margin: 0 0 10px 0;
      height: 35px;
      width: 35px;
    }
  }
`;

function App() {
  const API_KEY = "b438560594f96f5cc956a19915b9fbbe";
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const [temp, setTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
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
  const convertToF_Feel = (celsius) => {
    let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
    setFeelsLikeTemp(fahrenheit);
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
          convertToF_Feel(response.data.main.feels_like);
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
        convertToF_Feel(response.data.main.feels_like);
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

    return targetTime.format("YY.M.D(ddd) HH:mm");
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
                    <div className="cityDataTitleBox">
                      <img
                        src={process.env.PUBLIC_URL + "/image/Location.png"}
                        alt="location"
                        title="location"
                      />
                      <div id="countryName">{`${result.data.name}, ${result.data.sys.country}`}</div>
                    </div>
                    <div id="countryTimezone">
                      {getTimeInTargetTime(result.data.timezone)}
                    </div>
                  </div>
                </div>
                <img
                  id="weatherImage"
                  src={
                    process.env.PUBLIC_URL + `/image/${weatherIcon[num]}.png`
                  }
                  alt={`${result.data.weather[0].main}`}
                  title={`${result.data.weather[0].main}`}
                />
                <div>
                  <div className="temperatureData">
                    {`${temp}˚`}
                    <div id="tempMaxMin">
                      <div>{`최고:${maxTemp}˚`}</div>
                      <div>{`최저:${minTemp}˚`}</div>
                      <div>{`체감:${feelsLikeTemp}˚`}</div>
                    </div>
                    <div className="windAndHumidity">
                      <div className="windDegSpeed">
                        <img
                          src={process.env.PUBLIC_URL + `/image/Wind.png`}
                          title="wind"
                          alt="wind"
                        />
                        <div>{`풍속: ${result.data.wind.speed}m/s`}</div>
                      </div>
                      <div className="humidity">
                        <img
                          src={process.env.PUBLIC_URL + `/image/Humidity.png`}
                          title="humidity"
                          alt="humidity"
                        />
                        <div>{`습도: ${result.data.main.humidity}%`}</div>
                      </div>
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
