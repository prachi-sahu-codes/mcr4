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

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SORT":
        if (action.payload === "latest") {
          const sortedData = state.data.posts.sort(
            (a, b) => getTime(a.createdAt) - getTime(b.createdAt)
          );

          return { ...state, data: sortedData, sortBy: action.payload };
        } else if (action.payload === "upvote") {
          const sortedData = state.data.posts.sort(
            (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
          );

          return { ...state, data: sortedData, sortBy: action.payload };
        } else {
          return state;
        }

      default:
        console.log("Something is wrong");
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    data: forumData,
    sortBy: "latest",
  });
  return (
    <DataContext.Provider value={{ state, dispatch, getTime }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
