import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import TodoDetails from "./TodoDetails";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Details = () => {
  const params = useParams();
  const taskId = params?.id;

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["edit-details"],
    queryFn: async (values) => {
      return await $axios.get("/details", values);
    },
  });
  // return response.data.TaskDetails;
  const taskDetails = data?.data?.TaskDetails;
  console.log(taskDetails);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      {taskDetails.length === 0 ? (
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          No Records
        </Typography>
      ) : (
        taskDetails.map((item) => {
          return (
            <Box
              key={item._id}
              sx={{
                width: "450px",
                background: "black",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
                margin: "5px 0rem 5px 0rem",
                borderRadius: "5px",
              }}
            >
              <TodoDetails {...item} />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Details;
