import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

const AppWrap = styled.div`
  * {
    box-sizing: border-box;
  }
`;
const AppContentWrap = styled.div`
  background: linear-gradient(180deg, #130754 0%, #3b2f80 100%);
  box-shadow: 7px 7px 5px #898aa6;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 5vh 5vw;
  border-radius: 25px;

  @media (min-width: 200px) and (max-width: 1200px) {
    width: 80vw;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  @media (min-width: 200px) and (max-width: 1200px) {
    gap: 10px;
  }
`;
const SearchInput = styled.input`
  display: flex;
  font-size: 20px;
  font-weight: 400;
  height: 50px;
  color: #626262;
  outline: none;
  border: none;
  border-radius: 40px;
  padding-left: 40px;

  @media (min-width: 200px) and (max-width: 767px) {
    font-size: 14px;
    height: 40px;
    padding-left: 20px;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    font-size: 24px;
    padding-left: 50px;
  }
`;
const SearchBtn = styled.button`
    border: 0;
    background: #eee;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    &:hover {
      cursor: pointer;
      background: #c9c9c9;
    }

    @media (min-width: 200px) and (max-width: 767px){
      width: 40px;
      height: 40px;
    }

  }`;

const ResultWrap = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  color: #eee;
`;
const CityData = styled.div`
  text-align: center;
  font-size: 2rem;

  @media (min-width: 200px) and (max-width: 767px) {
    font-size: 30px;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    font-size: 40px;
  }
`;

const CityDataTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 5px;

  img {
    height: 20px;
    width: 20px;
  }
  @media (min-width: 200px) and (max-width: 767px) {
    gap: 3px;

    img {
      height: 22px;
      width: 22px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    img {
      height: 28px;
      width: 28px;
    }
  }
`;

const CountryTimezone = styled.div`
  font-size: 18px;

  @media (min-width: 200px) and (max-width: 767px) {
    font-size: 14px;
  }
`;

const TemperatureData = styled.div`
  text-align: center;
  font-size: 4rem;

  @media (min-width: 200px) and (max-width: 767px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    font-size: 3.5rem;
  }
`;

const WeatherImage = styled.img`
  width: 200px;
  height: 200px;

  @media (min-width: 200px) and (max-width: 767px) {
    width: 150px;
    height: 150px;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 220px;
    height: 220px;
  }
`;

const SkyData = styled.div`
  text-align: center;
`;

const TempMaxMin = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;
  font-weight: 400;

  @media (min-width: 200px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    margin-top: 20px;
    font-size: 20px;
  }
`;

const WindAndHumidity = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const WindSpeedDeg = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  font-weight: 400;
  align-items: center;

  img {
    margin: 0 0 10px 0;
    height: 40px;
    width: 40px;
  }
  @media (min-width: 200px) and (max-width: 767px) {
    margin-top: 20px;
    font-size: 14px;

    img {
      height: 25px;
      width: 25px;
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    margin-top: 20px;
    font-size: 20px;

    img {
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
  // const [maxTemp, setMaxTemp] = useState(0);
  // const [minTemp, setMinTemp] = useState(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
  const [num, setNum] = useState(0);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const convertToF = (celsius) => {
    let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
    setTemp(fahrenheit);
  };
  // const convertToF_Max = (celsius) => {
  //   let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
  //   setMaxTemp(fahrenheit);
  // };
  // const convertToF_Min = (celsius) => {
  //   let fahrenheit = Math.round((celsius - 273.15) * 10) / 10;
  //   setMinTemp(fahrenheit);
  // };
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
          // convertToF_Max(response.data.main.temp_max);
          // convertToF_Min(response.data.main.temp_min);
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
        // convertToF_Max(response.data.main.temp_max);
        // convertToF_Min(response.data.main.temp_min);
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
      <AppContentWrap>
        <InputBox>
          <SearchInput
            placeholder="Search"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            type="text"
            onKeyDown={searchWeather}
            autoFocus
          />
          <SearchBtn id="searchBtn" type="button" onClick={searchWeatherMouse}>
            <img
              src={process.env.PUBLIC_URL + `/image/Search.png`}
              alt="검색 버튼 이미지"
            />
          </SearchBtn>
        </InputBox>
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div>
              <SkyData>
                <div>
                  <CityData>
                    <CityDataTitleBox>
                      <img
                        src={process.env.PUBLIC_URL + "/image/Location.png"}
                        alt="location"
                        title="location"
                      />
                      <div>{`${result.data.name}, ${result.data.sys.country}`}</div>
                    </CityDataTitleBox>
                    <CountryTimezone>
                      {getTimeInTargetTime(result.data.timezone)}
                    </CountryTimezone>
                  </CityData>
                </div>
                <WeatherImage
                  src={
                    process.env.PUBLIC_URL + `/image/${weatherIcon[num]}.png`
                  }
                  alt={`${result.data.weather[0].main}`}
                  title={`${result.data.weather[0].main}`}
                />
                <div>
                  <TemperatureData>
                    {`${temp}˚`}
                    <TempMaxMin>
                      {/* <div>{`최고:${maxTemp}˚`}</div>
                      <div>{`최저:${minTemp}˚`}</div> */}
                      <div>{`체감:${feelsLikeTemp}˚`}</div>
                    </TempMaxMin>
                    <WindAndHumidity>
                      <WindSpeedDeg>
                        <img
                          src={process.env.PUBLIC_URL + `/image/Wind.png`}
                          title="wind"
                          alt="wind"
                        />
                        <div>{`풍속: ${result.data.wind.speed}m/s`}</div>
                      </WindSpeedDeg>
                      <WindSpeedDeg>
                        <img
                          src={process.env.PUBLIC_URL + `/image/Humidity.png`}
                          title="humidity"
                          alt="humidity"
                        />
                        <div>{`습도: ${result.data.main.humidity}%`}</div>
                      </WindSpeedDeg>
                    </WindAndHumidity>
                  </TemperatureData>
                </div>
              </SkyData>
            </div>
          </ResultWrap>
        )}
      </AppContentWrap>
    </AppWrap>
  );
}

export default App;
