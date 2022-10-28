import * as React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {Box, Tabs, Tab} from "@mui/material";

export default function NavBar() {
  const [value, setValue] = React.useState();

  const Router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 0) {
      Router.push("/");
    } else if (newValue == 1) {
      Router.push("/Dashboard");
    } else if (newValue == 2) {
      Router.push("/Contacts");
    }
  };
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
      >
        <Tab label="Home" />
        <Tab label="Dashboard" />
        <Tab label="Contacts" />
      </Tabs>
    </Box>
  );
}
