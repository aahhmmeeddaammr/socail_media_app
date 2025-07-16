"use client";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/redux/slices/AuthSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
const LoginForm = () => {
  const router = useRouter();
  const dispatcher = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(20).required(),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values: typeof initialValues) => {
    axios
      .post(`${process.env.baseUrl}/users/signin`, values)
      .then(({ data }) => {
        dispatcher(setToken(data.token));
        setCookie("token", data.token);
        router.push("/");
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Paper onSubmit={formik.handleSubmit} component={"form"} sx={{ padding: 2, maxWidth: { md: "50%" }, margin: "auto", marginTop: 2 }}>
      <Typography sx={{ textAlign: "center", fontSize: 30, fontWeight: "500" }}>Login Page </Typography>
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

      <Button type="submit" sx={{ width: "100%", bgcolor: "#1976d2", color: "white", marginTop: 3 }}>
        Login
      </Button>
    </Paper>
  );
};

export default LoginForm;
