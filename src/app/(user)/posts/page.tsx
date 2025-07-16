import AllPostsPage from "@/app/_components/AllPostsPage/AllPostsPage";
import { Container } from "@mui/material";
import React from "react";

const Page = () => {
  return (
    <Container sx={{ marginTop: 2 }}>
      <AllPostsPage />
    </Container>
  );
};

export default Page;
