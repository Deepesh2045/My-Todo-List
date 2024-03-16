import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import $axios from '../lib/axios.instance';
import { Box, Button, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import *as Yup from "yup"
import { EditTask } from './EditTask';

const GetDetails = () => {
    const navigate = useNavigate()

     // add
     const { mutate } = useMutation({
        mutationKey: ["add-task"],
        mutationFn: async (values) => {
          return await $axios.post("/add", values);
        },
        onSuccess: (response) => {
          console.log(response);
          location.reload()
        },
      });
      // For Delete
      const params = useParams();
    const taskId = params?.id;
      const { mutate:mutateDelete } = useMutation({
        mutationKey: ["add-task"],
        mutationFn: async (_id) => {
          return await $axios.delete(`http://localhost:8080/delete/${_id}`);
        },
        onSuccess: (response) => {
          console.log(response);
          location.reload()
        },
      });


// Get Details
    
    const {  data } = useQuery({
      queryKey: ["edit-details"],
      queryFn: async (values) => {
        return await $axios.get("/details", values);
      },
    });
  const taskDetails = data?.data?.TaskDetails;
  

 
  return (
    <>

<Box
        sx={{
          background: "",
          height: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Typography gutterBottom variant="h5" sx={{ color: "white", fontWeight: "bold",width:"325px", padding: "1rem 2rem",
                background: "black", }}>
          EDIT YOUR TODO LIST
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            task:  "",
            description: "",
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
              }}
              onSubmit={formik.handleSubmit}
            >
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
                  rows={6}
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

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>



    {taskDetails && taskDetails.map((item) => {
    return <Box><h1 key={item._id}>{item.task}</h1>
    <Button variant='contained' onClick={()=>{
        mutateDelete(item._id)
    }}>Delete</Button>
    <Button variant='contained'color='success'onClick={()=>{
        navigate(`/edit/${item._id}`)
    }} >Edit</Button>
    </Box>
})}
    </>
  )
}

export default GetDetails