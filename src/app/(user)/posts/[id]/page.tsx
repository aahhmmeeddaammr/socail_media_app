import SinglePostPage from "@/app/_components/SinglePostPage/SinglePostPage";
import { Container } from "@mui/material";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <Container>
      <SinglePostPage id={id} />
    </Container>
  );
};

export default Page;
