import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, resestCreatePostStatus } from "../redux/post-slice";
import { notify } from "../../../shared/services/notify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.post);
  const user_state = useSelector((state) => state.user);

  useEffect(() => {
    if (state.createPostStatus === "failed")
      notify.error("Create  Post failed");
    if (state.createPostStatus === "succeeded") {
      notify.success("Post Created");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    dispatch(resestCreatePostStatus());
  }, [state.createPostStatus, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user_state.user) {
      dispatch(
        createPost({
          text: postContent,
          title: title,
        })
      );
    } else {
      notify.error("Please Login !!!");
    }
  };

  return (
    <Box sx={{ width: 400, margin: "auto", marginTop: 4 }}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Post Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post..."
          sx={{ marginBottom: 2 }}
        />
        <Button
          disabled={state.loading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default CreatePost;
