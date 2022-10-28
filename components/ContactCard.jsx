import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
export default function ContactCard(props) {
  const {_id, name, email, phoneNumber} = props;
  console.log(props.name);
  return (
    <Card sx={{width: "inherit"}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography sx={{fontSize: 10}} color="text.secondary" gutterBottom>
          {props._id}
        </Typography>
        <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom>
          {props.email}
        </Typography>
        <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom>
          {props.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
