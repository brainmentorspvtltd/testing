import { useEffect } from "react";
import { useParams } from "react-router-dom";

import React from "react";

import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../redux/comment-slice";

const CommentList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(getAllComments(params.slug));
  }, [params.slug]);

  return (
    <Box>
      <Typography variant="h5">Comments </Typography>

      {comment.loading ? (
        <div>Loading ...</div>
      ) : (
        comment.comments?.map((comment) => (
          <Box key={comment._id} border={1} p={2} my={2}>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>
                {comment["comment-content"]}
              </span>{" "}
              | {moment(comment.createdAt).fromNow()}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CommentList;
