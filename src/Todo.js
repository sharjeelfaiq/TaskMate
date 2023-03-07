import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "@fontsource/roboto/400.css";

const Todo = () => {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);

  const addActivity = () => {
    if (activity !== "") {
      setListData([...listData, activity]);
    }
    setActivity(""); // reset the input field after adding the activity
  };

  const removeActivity = (index) => {
    const newList = [...listData];
    newList.splice(index, 1);
    setListData(newList);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ paddingY: 2 }}>
        <Box textAlign="center" sx={{ bgcolor: "#cfe8fc", height: "auto" }}>
          <Typography variant="h3" style={{ textAlign: "center" }} gutterBottom>
            TextMate
          </Typography>
          <TextField
            id="standard-basic"
            label="Add Task"
            variant="standard"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            sx={{ paddingY: 1 }}
          />
          <Button
            variant="contained"
            onClick={addActivity}
            sx={{ marginY: 2, marginX: 1 }}
          >
            Add
          </Button>
          {listData.map((item, index) => (
            <Typography style={{ textAlign: "left", paddingLeft: "10px" }} key={index}>
              {item}
              <Button
                variant="outlined"
                onClick={() => removeActivity(index)}
                sx={{ marginY: 2, marginX: 1 }}
              >
                Done
              </Button>
            </Typography>
          ))}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Todo;
