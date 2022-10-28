import React from "react";
import {List} from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {FixedSizeList} from "react-window";
import {Search} from "@mui/icons-material";

function renderRow(props) {
  const {index} = props;

  return (
    <ListItem key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function VirtualizedList(data) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {data === null ? <div /> : data.map((item) => renderRow(item))}
      </FixedSizeList>
    </Box>
  );
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function DataDisplay(props) {
  const {data} = props;
  const [search, setSearch] = React.useState("");
  const result = [];
  const [searchResult, setSearchResult] = [];

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredData = result.filter((item) => {
      return item[0].toLowerCase() == search.toLowerCase();
    });

    console.log(filteredData);
  };

  for (let obj in data) {
    console.log("obj is :", obj);
    result.push([data[obj].area, data[obj].forecast]);
  }
  console.log(result);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <TextField
          id="input-with-sx"
          label="Search"
          variant="standard"
          onChange={debounce(handleSearch, 300)}
          sx={{
            textColor: "action.active",
            backgroundColor: "white",
            width: "100%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        >
          {search}
        </TextField>
      </Box>
      <List>
        {result
          .filter((item) => {
            console.log(item[0] === search);
            return item[0].toLowerCase().includes(search.toLowerCase());
          })
          .map((newItem) => (
            <ListItem key={newItem.index}>
              <ListItemText sx={{width: "40%"}} primary={newItem[0]} />
              <ListItemText primary={newItem[1]} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
