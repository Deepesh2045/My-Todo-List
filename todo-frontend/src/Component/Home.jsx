import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";
import Details from "./Details";
import Loading from "./Loading";

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // For Add Task
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["add-task"],
    mutationFn: async (values) => {
      return await $axios.post("/add", values);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries("todo-list");
      // location.reload();
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  const email = localStorage.getItem("email");

  return (
    <>
    
        <Grid container>
          <Grid item  lg={6} md={6} xs={12} sx={{padding:"2rem",background:""}}>
       

        {(email === "deepesh@gmail.com" && (
         <Formik
         enableReinitialize
         initialValues={{
           task:  "",
           description:  "",
         }}
         validationSchema={Yup.object({
           task: Yup.string().required("Task is required"),
           description: Yup.string().required("Description is required"),
         })}
         onSubmit={(values) => {
           mutate(values);
         }}
       >
         {(formik) => (
           <form
             style={{
               width: "325px",
               background: "black",
               display: "flex",
               flexDirection: "column",
               gap: "2rem",
               padding: "2rem",
               margin:"auto",
               borderRadius:"10px"
             }}
             onSubmit={formik.handleSubmit}
           >
             <Typography variant="h6" sx={{ color: "#1976D2", fontWeight: "bold",marginBottom:"", background:"" }}>
          Add Your Task
        </Typography>
             <FormControl>
               <TextField
                 sx={{ [`& fieldset`]: { borderColor: "white" } }}
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
             </FormControl>

             <FormControl>
               <TextField
                 sx={{ [`& fieldset`]: { borderColor: "white" } }}
                 id="outlined-multiline-static"
                 multiline
                 rows={8}
                 defaultValue="Type your description"
                 InputProps={{ style: { color: "white" } }}
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

             <Button type="submit" variant="contained" sx={{borderRadius:"20px"}}>
               Submit
             </Button>
           </form>
         )}
       </Formik>
        )) || (
          <Box sx={{ marginTop: "100px" }}>
            <Typography variant="h3">You are not admin of this page</Typography>
            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Go Back
            </Button>
          </Box>
        )}
        </Grid>



<Grid item lg={6} md={6} xs={12} sx={{padding:"2rem",background:""}}>{email === "deepesh@gmail.com" && <Details />}
        </Grid>
        
        </Grid>
    </>
  );
};

export default Home;
