const api_URL =
  "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
// query date
// we will support date for the timebeing only

export default async function getAllAreaTwoHourWeatherForecast(req, res) {
  // 2 - 4, 4- 6, 6 - 8, 8 - 10, 10 - 12, 12 - 14, 14 - 16, 16 - 18, 18 - 20, 20 - 22, 22 - 24
  const {date} = req.query;
  if (!date) {
    const result = await fetch(`${api_URL}`);
    const data = await result.json();
    const forecast = data.items[0];
    const listOfAreas = forecast.forecasts;
    const validTime = forecast.valid_period;
    const areas = listOfAreas.map((area) => {
      return area.area;
      // return {
      //   name: area.area,
      //   forecast: area.forecast,
      // };
    });
    console.log(forecast);
    console.log(listOfAreas);
    console.log(areas);
    console.log(validTime);
    return res.status(200).json({
      areaForecast: listOfAreas,
      period: validTime,
    });
  }
  // const result = await fetch(`${api_URL}?date=${date}`);
  // const data = await result.json();
  return res.status(200).json(data);
}

// Forecast different areas provide these areas as a list for selection in the frontend
// for them to select what weather forecast they want to see
// and then we will query the api with the area name
