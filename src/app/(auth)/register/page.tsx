import RegisterForm from "@/app/_components/RegisterForm/RegisterForm";
import { Container } from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "register | Social",
  description: "this page using to register",
};

const Page = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default Page;
