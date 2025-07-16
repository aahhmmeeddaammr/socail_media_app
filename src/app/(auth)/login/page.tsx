import LoginForm from "@/app/_components/LoginForm/LoginForm";
import { Container } from "@mui/material";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "login | Social",
  description: "this page using to login",
};
const Page = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default Page;
