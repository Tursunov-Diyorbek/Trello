import * as React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import MiniDrawer from "./components/layout";
import { useState } from "react";
import { BoardsContext } from "./context";
import { boardsData } from "./data";
import { Board } from "./components/Board";
import { useLocalStorageState } from "ahooks";

function App() {
  const [boards, setBoards] = useLocalStorageState("boards", {
    defaultValue: [...boardsData],
  });

  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [age, setAge] = React.useState("");

  return (
    <BoardsContext.Provider
      value={{
        boards,
        setBoards,
        activeBoardIndex,
        setActiveBoardIndex,
        age,
        setAge,
      }}
    >
      <CssBaseline />
      <MiniDrawer>
        <Board />
      </MiniDrawer>
    </BoardsContext.Provider>
  );
}

export default App;
