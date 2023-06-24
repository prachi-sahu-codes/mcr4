import React from "react";
import { BsBookmark, BsFillBookmarkFill, BsShare } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";

export const Card = ({ item, noDetail }) => {
  const { getTime, dispatch } = useData();
  const navigate = useNavigate();

  const calcVotes = (upvotes, downvotes) => {
    return upvotes - downvotes;
  };

  return (
    <div>
      <div className="postcard">
        <div className="vote-box">
          <div
            onClick={() => dispatch({ type: "UPVOTE", payload: item.postId })}
          >
            up
          </div>
          <div>{calcVotes(item.upvotes, item.downvotes)}</div>
          <div
            onClick={() => dispatch({ type: "DOWNVOTE", payload: item.postId })}
          >
            down
          </div>
        </div>
        <div>
          <div className="flex">
            <img src={item.picUrl} alt="avatar" className="post-avatar" />
            <div className="flex">
              Posted by <span>@{item.username}</span>
              <span>{getTime(item.createdAt)}</span>
            </div>
          </div>
          <h3 className="post-head">{item.post}</h3>
          <p>
            {item.tags.map((tag, index) => (
              <span key={index} className="tags">
                {tag}
              </span>
            ))}
          </p>
          <p className="post-content">{item.postDescription}</p>
          <hr />
          <div className="card-action">
            <div>
              <BiCommentDetail />
            </div>
            <div onClick={() => navigate(`/posts/${item.postId}`)}>
              <BsShare />
            </div>
            <div
              onClick={() =>
                dispatch({ type: "BOOKMARK", payload: item.postId })
              }
            >
              {item.isBookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
            </div>
          </div>
        </div>
      </div>
      {noDetail &&
        item?.comments?.map((comm, index) => (
          <li className="comment-card" key={index}>
            <div className="flex">
              <img src={comm.picUrl} alt="avatar" className="post-avatar" />
              <div>
                <div className="flex">
                  Posted by <span>@{comm.username}</span>
                  <span>{getTime(comm.createdAt)}</span>
                </div>
                <div>Replying to @{item.username}</div>
              </div>
            </div>
            <div className="post-comment">
              <p className="post-content">{comm.comment}</p>
              <hr />
              <div className="card-action">
                <div>
                  <AiOutlineHeart />
                </div>
                <div>
                  <BiCommentDetail />
                </div>
                <div>
                  {" "}
                  <BsShare />
                </div>
              </div>
            </div>
          </li>
        ))}
    </div>
  );
};
