import { Typography, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import moment from "moment";

const Post = ({ post }) => {
  // const [voteCount, setVoteCount] = useState(post.upvotes);

  const handleUpvote = () => {
    setVoteCount(voteCount + 1);
  };

  const handleDownvote = () => {
    setVoteCount(voteCount - 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "16px",
        }}
      >
        <IconButton onClick={handleUpvote} style={{ cursor: "pointer" }}>
          <ArrowUpwardIcon />
        </IconButton>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {/* {voteCount} */}1
        </Typography>
        <IconButton onClick={handleDownvote} style={{ cursor: "pointer" }}>
          <ArrowDownwardIcon />
        </IconButton>
      </div>
      <div>
        <Link
          to={`/discuss/${post.slug}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
        </Link>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          <Typography variant="caption" color="textSecondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {post.publishedDate}
          </Typography>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          <IconButton disabled style={{ cursor: "default", fontSize: "1.3em" }}>
            <CommentIcon />
          </IconButton>
          <Typography variant="caption" color="textSecondary">
            {/* {post.commentCount} comments */}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Post;
