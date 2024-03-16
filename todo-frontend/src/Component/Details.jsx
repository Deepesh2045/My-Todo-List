import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import $axios from "../lib/axios.instance";
import DeleteTodo from "./DeleteTodo";
import Loading from "./Loading";

const Details = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["todo-list"],
    queryFn: async (values) => {
      return await $axios.get("/details", values);
    },
  });

  const taskDetails = data?.data?.TaskDetails;
  console.log(taskDetails);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
     <Typography variant="h6" sx={{ color: "white",marginBottom:"1rem",textAlign:"start",marginLeft:"3rem" }}>
        Your Task List
        </Typography>
      {taskDetails.length === 0 ? (
        <Box>
        
        <img src="./public/notfound.png" alt="" width="300px" />
        <Typography variant="h6" sx={{ color: "white" }}>
          No Records Found
        </Typography>
        </Box>
      ) : (
        taskDetails?.map((item) => {
          return (
            <Box
              key={item._id}
              sx={{
                width: "80%",
                background: "black",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                margin: "5px 0rem 5px 0rem",
                borderRadius: "5px",
                marginBottom:"1rem",
                margin:"auto"
              }}
            >
              <DeleteTodo {...item} />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Details;
