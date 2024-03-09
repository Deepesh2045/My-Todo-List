import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoDetails = (props) => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const handleDelete = (id) => {
    // Axios DELETE request to fetch data
    axios
      .delete(`http://localhost:8080/delete/${id}`)
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ textAlign: "start", color: "#2196f3" }}
            >
              {props.task}
            </Typography>
          </Box>

          <Box>
            <IconButton>
              <ModeEditIcon
                sx={{ color: "white", fontSize: "14px" }}
                onClick={() => {
                  navigate(`/edit/${props._id}`);
                }}
              />
            </IconButton>
            <IconButton>
              <DeleteIcon
                sx={{ color: "white", fontSize: "14px" }}
                onClick={() => handleDelete(props._id)}
              />
            </IconButton>
          </Box>
        </Box>

        <Typography
          sx={{ width: "100%", textAlign: "justify", fontSize: "12px" }}
        >
          {props.description}
        </Typography>
     
    </>
  );
};

export default TodoDetails;
