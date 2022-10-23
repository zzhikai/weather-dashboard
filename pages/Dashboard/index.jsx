import React, {useState, useEffect} from "react";
import moment from "moment";
import DataDisplay from "../../components/DataDisplay";
import {Box, Button} from "@mui/material";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import {styled} from "@mui/system";

const TimeDisplayDiv = styled("div")({
  marginTop: "-10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRefresh = async () => {
    setTimeout(() => {
      fetchData();
    }, 5000);
  };
  const fetchData = async () => {
    try {
      const result = await axios.get("/api/weather");
      if (result.status !== 200 || result.status !== 201) {
        throw new Error("Failed!");
      }
      const body = result.data;
      setData(body.areaForecast);
      const startDateString = moment(body.period.start).format(
        "(DD-MM-YY) HH:mm:ss"
      );
      const endDateString = moment(body.period.end).format(
        "(DD-MM-YY) HH:mm:ss"
      );
      setStartDate(startDateString);
      setEndDate(endDateString);
    } catch (error) {
      console.log(error);
    }
  };

  // const [areas, setAreas] = useState([]);
  // const fetchAreas = async () => {
  //   const result = await axios.get(`${FUNCTION_BASE_URL}/api/areas`, {
  //     headers: {"Content-Type": "application/json"},
  //   });
  //   const areasData = result.data;
  //   setAreas(areasData);
  // };

  useEffect(() => {
    fetchData();
    // fetchAreas();
  }, []);

  return (
    <Box sx={{p: "1%"}}>
      <Button
        startIcon={<RefreshIcon />}
        variant="contained"
        size="large"
        sx={{
          color: "grey",
          backgroundColor: "white",
          borderRadius: "'5px",
          ":hover": {
            color: "black",
            backgroundColor: "white",
          },
          ":active": {
            color: "blue",
          },
        }}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
      <TimeDisplayDiv>
        <h1>Dashboard</h1>

        <h3>
          Forecast for: {startDate} to {endDate}
        </h3>
      </TimeDisplayDiv>

      <DataDisplay data={data} />
    </Box>
  );
}
