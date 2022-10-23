const api_URL =
  "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
// query date
// we will support date for the timebeing only

export default async function handler(req, res) {
  const {date} = req.query;
  const result = await fetch(`${api_URL}`);
  const data = await result.json();
  const forecast = data.items[0];
  const listOfAreas = forecast.forecasts;
  const validTime = forecast.valid_period;
  const areas = listOfAreas.map((area) => {
    return area.area;
  });

  return res.status(200).json({
    areaForecast: listOfAreas,
    period: validTime,
  });
}
