import React, {useState, useEffect} from "react";
import {Box, Button, ListItem, List} from "@mui/material";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import {styled} from "@mui/system";
import ContactCard from "../../components/ContactCard";
import ContactFormDialog from "../../components/ContactFormDialog";
import NavBar from "../../components/NavBar";

const contactsUrl = "https://cs3219-ototb1b2.as.r.appspot.com/api/contacts";

const DeleteButton = styled(Button)({
  backgroundColor: "#ff0000",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#ff0000",
    color: "#ffffff",
  },
});

export default function Contacts() {
  const [contactData, setData] = useState([]);

  const handleRefresh = async () => {
    setTimeout(() => {
      fetchData();
    }, 5000);
  };
  const fetchData = async () => {
    try {
      const result = await axios.get(contactsUrl);
      console.log(result.data);
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed to fetch data");
      }
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${contactsUrl}/${id}`);
      console.log(result.data);
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed to fetch data");
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{p: "1%"}}>
      <NavBar />
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
      <h1>Contacts</h1>
      <ContactFormDialog />
      <List sx={{width: "100%"}}>
        {contactData.map(
          (contact) => (
            console.log(contact.name),
            (
              <ListItem key={contact._id}>
                <Box display="flex" flexDirection="row" width="inherit">
                  <ContactCard
                    _id={contact._id}
                    name={contact.name}
                    email={contact.email}
                    phoneNumber={contact.phoneNumber}
                  />
                  <DeleteButton onClick={() => handleDelete(contact._id)}>
                    Delete
                  </DeleteButton>
                </Box>
              </ListItem>
            )
          )
        )}
      </List>
    </Box>
  );
}
