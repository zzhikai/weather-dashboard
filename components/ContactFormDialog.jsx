import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const contactsUrl = "https://cs3219-ototb1b2.as.r.appspot.com/api/contacts";
export default function ContactFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClearAllInput = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
  };
  const handleClose = () => {
    setOpen(false);
    handleClearAllInput();
  };

  const handleUpdateContact = async () => {
    if (name === "" || email === "" || phoneNumber === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const result = await axios.put(contactsUrl, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      });
      if (result.status !== 200 && result.status !== 201) {
        // throw new Error("Failed to fetch data");
        alert(result.data.message);
        return;
      }
      alert("Contact updated successfully, please refresh to see changes");
      setOpen(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        alert(error.response.data.message);
        return;
      }
      if (error.response.status === 404) {
        alert(error.response.data.message);
        return;
      }
      console.log(error);
      alert("Something went wrong, please try again later");
    }
  };

  const handleAddContact = async () => {
    if (name === "" || email === "" || phoneNumber === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const result = await axios.post(contactsUrl, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      });
      if (result.status !== 200 && result.status !== 201) {
        // throw new Error("Failed to fetch data");
        alert(result.data.message);
        return;
      }
      alert("Contact added successfully, please refresh to see changes");
      setOpen(false);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        alert(error.response.data.message);
        return;
      }
      if (error.response.status === 404) {
        alert(error.response.data.message);
        return;
      }
      console.log(error);
      alert("Something went wrong, please try again later");
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new contact
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new contact, please enter the contact's name, email, and
            phone number
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Name"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Phone Number"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{inputMode: "numeric", pattern: "[0-9]*"}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateContact}>Update</Button>
          <Button onClick={handleAddContact}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
