import { createContext } from "react";

export const BoardsContext = createContext({
  boards: [],
  setBoards: (boards) => {},
  activeBoardIndex: 0,
  setActiveBoardIndex: (index) => {},
  age: "",
  setAge: (img) => {},
});
