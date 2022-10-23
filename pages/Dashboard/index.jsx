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

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // await  () => debounce(fetchData, 500);
    setTimeout(() => {
      fetchData();
    }, 5000);
    // await fetchData();
    setLoading(false);
  };
  const fetchData = async () => {
    const result = await axios.get("http://localhost:3000/api/weather", {
      headers: {"Content-Type": "application/json"},
    });
    const body = result.data;
    setData(body.areaForecast);
    const startDateString = moment(body.period.start).format(
      "(DD-MM-YY) HH:mm:ss"
    );
    const endDateString = moment(body.period.end).format("(DD-MM-YY) HH:mm:ss");
    setStartDate(startDateString);
    setEndDate(endDateString);
  };

  const [areas, setAreas] = useState([]);
  const fetchAreas = async () => {
    const result = await axios.get("http://localhost:3000/api/areas", {
      headers: {"Content-Type": "application/json"},
    });
    const areasData = result.data;
    setAreas(areasData);
  };

  useEffect(() => {
    fetchData();
    fetchAreas();
    setLoading(false);
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
          borderRadius: "5px",
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
};
