import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Details from "./Details";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
const navigate = useNavigate()

  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["add-task"],
    mutationFn: async (values) => {
      return await $axios.post("/add", values);
    },
    onSuccess: (response) => {
      console.log(response);
      location.reload()
    },
  });
  if(isLoading){
    return <Loading/>
  }
  const email = localStorage.getItem("email");

  return (
    <>
    <Box sx={{background:"", height:"",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",padding:"1rem"}}>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
        TODO LIST
      </Typography>
      

      {email ==="deepesh@gmail.com" &&
      <Formik
        initialValues={{
          task: "",
          description: "",
        }}
        validationSchema={Yup.object({
          task: Yup.string().required("Task is required"),
          description: Yup.string().required("Description is required"),
        })}
        onSubmit={(values) => {
          mutate(values)
      
        }}
      >
        {(formik) => (
          <form
            style={{
              width: "450px",
              background: "black",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              padding: "1rem",
              margin: "10px 0rem 5px 0rem",
              borderRadius: "5px",
            }}
            onSubmit={formik.handleSubmit}
          >
            <Box sx={{ [`& fieldset`]: { borderColor: "white" } }}>
              <FormControl>
                <TextField
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "grey" } }}
                  required
                  size="small"
                  label="Task"
                  {...formik.getFieldProps("task")}
                />
                {formik.touched.task && formik.errors.task ? (
                  <FormHelperText error>{formik.errors.task}</FormHelperText>
                ) : null}
              </FormControl>{" "}
            </Box>

            <Box sx={{ [`& fieldset`]: { borderColor: "white" } }}>
              <FormControl>
                <TextField
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "grey" } }}
                  required
                  size="small"
                  label="Description"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Box>


            <Box>
      
              <Button type="submit"  variant="contained" >
                Add
              </Button>
            </Box> 
          </form>
        )}
      </Formik>

      || <Box sx={{marginTop:"100px"}}><Typography variant="h3">You are not admin of this page</Typography>
      <Button onClick={()=>{
        localStorage.clear()
        navigate("/")
      }}>Go Back</Button></Box>}
      
      {email === "deepesh@gmail.com" && <Details />  }
       
      </Box>
      
    </>
  );
};

export default Home;
