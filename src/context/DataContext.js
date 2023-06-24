import { createContext, useContext, useReducer } from "react";
import { forumData } from "../backend/data";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const getTime = (time) => {
    const currentTime = new Date();
    const targetTime = new Date(time);
    const timeDiffInMillis = Math.abs(
      targetTime.getTime() - currentTime.getTime()
    );
    const minutes = Math.floor(timeDiffInMillis / (1000 * 60));

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours + "hours " + remainingMinutes + "minutes";
  };

  const getOnlyMin = (time) => {
    const currentTime = new Date();
    const targetTime = new Date(time);
    const timeDiffInMillis = Math.abs(
      targetTime.getTime() - currentTime.getTime()
    );
    const minutes = Math.floor(timeDiffInMillis / (1000 * 60));

    const remainingMinutes = minutes % 60;

    return remainingMinutes;
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SORT":
        if (action.payload === "latest") {
          const newSortedData = [...state.sortedData].sort(
            (a, b) => getOnlyMin(b.createdAt) - getOnlyMin(a.createdAt)
          );

          return {
            ...state,
            sortedData: newSortedData,
            sortBy: action.payload,
          };
        } else if (action.payload === "upvote") {
          const newSortedData = state.sortedData.sort(
            (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
          );

          return {
            ...state,
            sortedData: newSortedData,
            sortBy: action.payload,
          };
        } else {
          return state;
        }

      case "UPVOTE":
        const newUpvoteData = state.sortedData.map((post) =>
          post.postId === action.payload
            ? { ...post, upvotes: post.upvotes + 1 }
            : post
        );

        return {
          ...state,
          sortedData: newUpvoteData,
        };
      case "DOWNVOTE":
        const newDownvoteData = state.sortedData.map((post) =>
          post.postId === action.payload
            ? {
                ...post,
                downvotes: post.downvotes + 1,
              }
            : post
        );
        return {
          ...state,
          sortedData: newDownvoteData,
        };

      case "BOOKMARK":
        const bookmarkData = state.sortedData.map((post) =>
          post.postId === action.payload
            ? { ...post, isBookmarked: !post.isBookmarked }
            : post
        );
        return { ...state, sortedData: bookmarkData };

      default:
        console.log("Something is wrong");
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    data: forumData,
    sortedData: forumData.posts,
    sortBy: "",
  });
  return (
    <DataContext.Provider value={{ state, dispatch, getTime }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
