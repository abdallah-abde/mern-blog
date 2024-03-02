import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleChange = (e) => {
    setCommentError(null);
    if (e.target.value.length > 200) return;
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      setCommentError("Cannot exceed 200 characters");
      return;
    }

    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
        return;
      }

      if (!res.ok) {
        setCommentError(data.message);
        return;
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((com) =>
            com._id === commentId
              ? {
                  ...com,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : com
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(comments);
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            @ {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-m p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={handleChange}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xm">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={comment.length === 0}
              title={
                comment.length === 0 ? "start typing a comment to enable" : ""
              }
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border  border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((com) => (
            <Comment key={com._id} comment={com} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
}
