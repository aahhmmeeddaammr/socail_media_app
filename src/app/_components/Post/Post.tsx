"use client";
import Image from "next/image";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Collapse, Grid, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";
import Link from "next/link";
import Comment from "../Comment/Comment";
import { useRouter } from "next/navigation";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function Post({ post, sc }: { post: Post; sc?: boolean }) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const initialValues = {
    content: "",
  };
  const validationSchema = Yup.object({
    content: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: typeof initialValues, { resetForm }) => {
      axios
        .post(
          `${process.env.baseUrl}/comments`,
          { ...values, post: post._id },
          {
            headers: {
              token: getCookie("token"),
            },
          }
        )
        .then(({ data }) => {
          toast.success("comment added successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error("faild to add comment");

          console.log(err);
        })
        .finally(() => {
          resetForm();
        });
    },
  });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={post.user.photo} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader="September 14, 2016"
      />
      <CardContent sx={{ position: "relative", height: "500px" }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.body}
        </Typography>
        <Image
          fill
          src={post.image || "https://linked-posts.routemisr.com/uploads/a7a5247d-bb49-4173-8af9-669689a037dc-IMG_20230620_012338_739.jpg"}
          alt={post.body || "lol"}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {!sc && (
          <IconButton aria-label="add to favorites">
            <Link href={`/posts/${post._id}`}>
              <CommentIcon />
            </Link>
          </IconButton>
        )}
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ControlPointIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ padding: 2 }}>
        <Grid onSubmit={formik.handleSubmit} component={"form"} container spacing={1} alignItems="stretch">
          <Grid size={10}>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              fullWidth
              label="Add comment..."
              name="content"
              type="text"
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid size={2}>
            <Button type="submit" variant="contained" sx={{ width: "100%", height: "100%" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Collapse>
      {sc && (
        <Box sx={{ padding: 2 }}>
          <Stack>
            {post.comments.map((comment) => {
              return <Comment comment={comment} key={comment._id} />;
            })}
          </Stack>
        </Box>
      )}
    </Card>
  );
}
