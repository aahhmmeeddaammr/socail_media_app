"use client";

import React, { useState } from "react";
import { Avatar, Box, Button, Divider, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";

interface CreatePostValues {
  body: string;
  image: File | null;
}

const initialValues: CreatePostValues = {
  body: "",
  image: null,
};

const validationSchema = Yup.object({
  body: Yup.string().required("What's on your mind?"),
  image: Yup.mixed().nullable(),
});

const CreatePost: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useSelector((stor: { authReducer: AuthSlice }) => stor.authReducer);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("body", values.body);
      if (values.image) {
        formData.append("image", values.image);
      }

      axios
        .post(`${process.env.baseUrl}/posts`, formData, {
          headers: {
            token: getCookie("token"),
          },
        })
        .then(({ data }) => {
          toast.success("post created successfully");
          console.log(data);
        })
        .catch((err) => {
          toast.success("faild to create post");
          console.log({ err });
        });

      resetForm();
      setPreview(null);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mx: "auto", mt: 5, borderRadius: 4 }}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar src={user?.photo || ""} alt="User" />
          <Typography variant="subtitle1">Whats on your mind?</Typography>
        </Stack>

        <TextField
          fullWidth
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Write something here..."
          multiline
          minRows={3}
          variant="outlined"
          sx={{ mb: 2 }}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
        />

        {preview && (
          <Box
            sx={{
              width: "100%",
              maxHeight: 300,
              borderRadius: 2,
              overflow: "hidden",
              mb: 2,
              border: "1px solid #ccc",
            }}
          >
            <img src={preview} alt="Preview" style={{ width: "100%", objectFit: "cover" }} />
          </Box>
        )}

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <label htmlFor="image-upload">
            <input accept="image/*" id="image-upload" type="file" hidden onChange={handleFileChange} />
            <IconButton color="primary" component="span">
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>

          <Button type="submit" variant="contained" sx={{ textTransform: "capitalize", borderRadius: 20, px: 4 }}>
            Post
          </Button>
        </Stack>
      </form>

      <Divider sx={{ mt: 2 }} />
    </Paper>
  );
};

export default CreatePost;
