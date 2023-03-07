import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "@fontsource/roboto/400.css";

const Todo = () => {
  // Set the initial state of the activity input and list of activities
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);

  // Function to add an activity to the list and local storage
  const addActivity = () => {
    if (activity !== "") {
      // Create a new list with the current activity added
      const newListData = [...listData, activity];
      // Convert the list to a JSON string and store it in local storage
      const newListDataJson = JSON.stringify(newListData);
      localStorage.setItem("items", newListDataJson);
      // Update the state with the new list and reset the activity input
      setListData(newListData);
    }
    setActivity("");
  };

  // Effect to load the list from local storage when the component mounts
  useEffect(() => {
    // Get the list from local storage
    const storedListData = localStorage.getItem("items");
    if (storedListData) {
      // Parse the JSON string and set it as the initial list state
      setListData(JSON.parse(storedListData));
    }
  }, []);

  // Function to remove an activity from the list and local storage
  const removeActivity = (index) => {
    // Create a new list with the activity at the specified index removed
    const newList = [...listData];
    newList.splice(index, 1);
    // Update the state with the new list and reset the activity input
    setListData(newList);
    // Convert the new list to a JSON string and store it in local storage
    const newListJson = JSON.stringify(newList);
    localStorage.setItem("items", newListJson);
  };

  const deleteAll = () => {
    setListData([]);
    localStorage.removeItem("items");
  };

  // Render the component
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ paddingY: 2 }}>
        <Box
          textAlign="center"
          sx={{
            bgcolor: "#cfe8fc",
            height: "80vh",
            borderRadius: "10%",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "0.5em",
              height: "0.5em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "0.2em",
            },
            "&:hover::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
            boxShadow: "8px 8px 10px 5px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* The app header */}
          <Typography variant="h3" style={{ textAlign: "center" }} gutterBottom>
            TaskMate
          </Typography>
          {/* The activity input */}
          <TextField
            id="standard-basic"
            label="Add Task"
            variant="standard"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            sx={{ paddingY: 1 }}
          />
          {/* The add button */}
          <Button
            variant="contained"
            onClick={addActivity}
            sx={{ marginY: 2, marginX: 1 }}
          >
            Add
          </Button>
          {/* The list of activities */}
          {listData.map((item, index) => (
            <Typography
              style={{
                textAlign: "left",
                marginLeft: "10px",
                marginRight: "10px",
                paddingLeft: "5px",
                marginBottom: "10px",
                backgroundColor: "rgba(50, 78, 200, 0.1)",
                borderRadius: "8%",
              }}
              key={index}
            >
              {/* The activity text */}
              {index + 1}. {item}
              {/* The remove button */}
              <IconButton
                aria-label="delete"
                onClick={() => removeActivity(index)}
                sx={{ marginY: 2, marginX: 1 }}
                size="small"
                color="warning"
              >
                <DeleteIcon />
              </IconButton>
            </Typography>
          ))}
          {listData.length > 0 ? (
            <Button
              onClick={deleteAll}
              color="error"
              variant="outlined"
              sx={{ marginBottom: 1 }}
            >
              Delete All
            </Button>
          ) : null}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Todo;
