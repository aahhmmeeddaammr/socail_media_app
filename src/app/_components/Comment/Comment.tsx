"use client";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const Comment = ({ comment }: { comment: Comment }) => {
  console.log(comment.commentCreator.photo);

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "red" }} src={comment.commentCreator.photo} />}
        title={comment.commentCreator.name}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography>{comment.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
