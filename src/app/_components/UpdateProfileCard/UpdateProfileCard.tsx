"use client";

import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { store } from "@/lib/redux/store";
import { getProfile } from "@/lib/redux/slices/AuthSlice";

interface UpdateProfileForm {
  photo: File | null;
}

const UpdateProfileCard: React.FC = () => {
  const { user } = useSelector((store: { authReducer: AuthSlice }) => store.authReducer);
  const dispatch = useDispatch<typeof store.dispatch>();
  const [preview, setPreview] = useState<string | null>(user?.photo as string);
  const formik = useFormik<UpdateProfileForm>({
    initialValues: {
      photo: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      if (values.photo) {
        formData.append("photo", values.photo);
        axios
          .put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/upload-photo`, formData, {
            headers: { token: getCookie("token") },
          })
          .then(({ data }) => {
            dispatch(getProfile());

            console.log({ data });
          })
          .catch((error) => {
            console.log({ error });
          });
      }
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card sx={{ mx: "auto", mt: 5, borderRadius: 4, p: 2 }}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <CardHeader
          avatar={<Avatar src={preview || ""} alt="Profile" sx={{ width: 56, height: 56 }} />}
          title="Edit Your Profile"
          subheader="Keep your details up to date"
          action={
            <>
              <label htmlFor="upload-photo">
                <input type="file" id="upload-photo" accept="image/*" hidden onChange={handlePhotoChange} />
                <Button component="span" variant="outlined" size="small">
                  Upload Photo
                </Button>
              </label>
            </>
          }
        />

        <Divider sx={{ mb: 2 }} />

        <CardContent>
          <Stack spacing={2}>
            <TextField label="Full Name" name="name" fullWidth value={user?.name || ""} disabled />

            <TextField label="Email" name="email" fullWidth type="email" value={user?.email || ""} disabled />

            <TextField label="gender" name="gender" rows={3} fullWidth value={user?.gender || ""} disabled />
            <TextField label="dateOfBirth" name="dateOfBirth" rows={3} fullWidth value={user?.dateOfBirth || ""} disabled />
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", px: 3 }}>
          <Button variant="contained" type="submit" sx={{ borderRadius: 5 }}>
            Save Changes
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default UpdateProfileCard;
