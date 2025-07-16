"use client";
import { Button, Grid, Input, Paper, TextField, Typography } from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const RegisterForm = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    gender: Yup.string().required(),
    dateOfBirth: Yup.date().required(),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    gender: "",
    dateOfBirth: "",
  };

  const onSubmit = (values: typeof initialValues) => {
    axios
      .post(`${process.env.baseUrl}/users/signup`, values)
      .then(() => {
        toast.success("user resgister successfully.");
        router.push("/login");
      })
      .catch((err) => {
        if (err.response.data.error == "user already exists.") {
          toast.error("user already exists.");
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Paper onSubmit={formik.handleSubmit} component={"form"} sx={{ padding: 2, maxWidth: { md: "50%" }, margin: "auto", marginTop: 2 }}>
      <Typography sx={{ textAlign: "center", fontSize: 30, fontWeight: "500" }}>Register Page </Typography>
      <TextField
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        sx={{ width: "100%", marginTop: 2 }}
        label="user name..."
        name="name"
        type="text"
      />
      <TextField
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        sx={{ width: "100%", marginTop: 2 }}
        label="user email..."
        name="email"
        type="email"
      />
      <TextField
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        sx={{ width: "100%", marginTop: 2 }}
        label="user password..."
        name="password"
        type="password"
      />
      <TextField
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        sx={{ width: "100%", marginTop: 2 }}
        label="confirm password..."
        name="rePassword"
        type="password"
      />
      <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%", marginTop: 2 }}>
        <Grid size={8}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} sx={{ width: "100%" }} type="date" name="dateOfBirth" />
        </Grid>
        <Grid size={4}>
          <Select onChange={formik.handleChange} onBlur={formik.handleBlur} sx={{ width: "100%" }} placeholder="Choose one…" name="gender">
            <Option value={null} defaultChecked disabled>
              -select gender{" "}
            </Option>
            <Option value={"male"}>Male</Option>
            <Option value={"female"}>Female</Option>
          </Select>
        </Grid>
      </Grid>

      {/* <Button>Button</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button> */}
      <Button type="submit" sx={{ width: "100%", bgcolor: "#1976d2", color: "white", marginTop: 3 }}>
        Register
      </Button>
    </Paper>
  );
};

export default RegisterForm;
