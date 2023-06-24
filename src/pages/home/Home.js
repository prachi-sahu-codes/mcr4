import React from "react";
import { useData } from "../../context/DataContext";

export const Home = () => {
  const { getTime, state } = useData();

  const calcVotes = (upvotes, downvotes) => {
    if (upvotes - downvotes >= 0) {
      return upvotes - downvotes;
    } else {
      return downvotes - upvotes;
    }
  };

  return (
    <div className="wholePost">
      <ul className="main-content">
        {state.data?.posts?.map((item) => (
          <li key={item.postId} className="postcard">
            <div className="vote-box">
              <div>up</div>
              <div>{calcVotes(item.upvotes, item.downvotes)}</div>
              <div>down</div>
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
                <div>Comment</div>
                <div>Share</div>
                <div>Bookmark</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
