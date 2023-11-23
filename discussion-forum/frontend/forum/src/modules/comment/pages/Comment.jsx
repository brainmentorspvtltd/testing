import React, { useEffect, useState } from "react";
import { Typography, Button, Card, Divider } from "@mui/material";
import CommentList from "../components/CommentList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../shared/services/notify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  commentOnPost,
  getAllComments,
  resetCommentOnPostStatus,
} from "../redux/comment-slice";

const Comment = () => {
  const [comment, setComment] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.comment);
  const user_state = useSelector((state) => state.user);

  useEffect(() => {
    if (state.commentOnPostStatus === "failed") {
      notify.error("Comment on Post Failed");
    }
    if (state.commentOnPostStatus === "succeeded") {
      notify.success("Comment on Post Created SuccessFully!");
    }
    dispatch(resetCommentOnPostStatus());
  }, [state.commentOnPostStatus, dispatch]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = () => {
    if (user_state.user) {
      dispatch(
        commentOnPost({
          slug: params.slug,
          content: comment,
        })
      );
      dispatch(getAllComments(params.slug));
    } else {
      notify.error("Please Login !!!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Card
        style={{
          backgroundColor: "#fff",
          margin: "2em auto",
          color: "#000",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
          padding: "1em",
        }}
      >
        <Divider style={{ margin: "1em 0" }} />
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            fontSize: "1.5em",
            marginTop: "1em",
          }}
        >
          Leave a comment
        </Typography>

        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="What are your thoughts?"
          style={{
            width: "100%",
            height: "150px",
            padding: "0.5em",
            marginTop: "0.5em",
            resize: "vertical",
          }}
        />

        <Button
          disabled={state.loading}
          variant="outlined"
          color="secondary"
          onClick={handlePostComment}
        >
          Post Comment
        </Button>
      </Card>
      <CommentList />
    </>
  );
};

export default Comment;
