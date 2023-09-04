import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { BoardsContext } from "../../context";
import { StyledList } from "./styles";
import { TaskDialog } from "../TaskDialog";
import { FcPlus } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";
import { MdAddTask } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const Board = (props) => {
  const {
    boards,
    setBoards,
    activeBoardIndex,
    setActiveBoardIndex,
    age,
    setAge,
  } = useContext(BoardsContext);

  const [open, setOpen] = React.useState(false);
  const [listIndex, setListIndex] = React.useState(null);
  const [taskIndex, setTaskIndex] = React.useState(null);
  const [addListValue, setAddListValue] = React.useState("");
  const [addTaskValue, setAddTaskValue] = React.useState({});

  const handleClickOpen = (selectedListIndex, selectedTaskIndex) => {
    setOpen(true);
    setListIndex(selectedListIndex);
    setTaskIndex(selectedTaskIndex);
  };

  const handleClose = (value) => {
    setOpen(false);
    setListIndex(null);
    setTaskIndex(null);
  };

  const validation = (title) => title.trim().length > 0;

  const AddList = () => {
    if (!validation(addListValue)) return;

    const updatedBoards = [...boards];
    const targetList = updatedBoards[activeBoardIndex];

    const newTask = {
      title: addListValue,
      tasks: [],
    };
    targetList.lists.push(newTask);
    setBoards(updatedBoards);

    setAddListValue("");
  };

  const AddTask = (index) => {
    const taskValue = addTaskValue[index];

    if (typeof taskValue === "string" && taskValue.trim().length > 0) {
      const updatedBoards = [...boards];
      const targetList = updatedBoards[activeBoardIndex].lists[index];

      const newTask = {
        title: taskValue.trim(),
      };
      targetList.tasks.push(newTask);
      setBoards(updatedBoards);

      setAddTaskValue((s) => ({ ...s, [index]: "" }));
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const startListIndex = +source.droppableId;
    const endListIndex = +destination.droppableId;

    const startTaskIndex = +source.index;
    const endTaskIndex = +destination.index;

    const boardsClone = JSON.parse(JSON.stringify(boards));

    const [task] = boardsClone[activeBoardIndex].lists[
      startListIndex
    ].tasks.splice(startTaskIndex, 1);

    boardsClone[activeBoardIndex].lists[endListIndex].tasks.splice(
      endTaskIndex,
      0,
      task,
    );

    setBoards(boardsClone);
  };

  const DeleteList = (listIdx) => {
    if (listIdx >= 0 && listIdx < boards[activeBoardIndex]?.lists.length) {
      const updatedBoards = [...boards];
      updatedBoards[activeBoardIndex]?.lists.splice(listIdx, 1);
      setBoards(updatedBoards);
    }
  };

  return (
    <Stack direction={"row"} spacing={1}>
      <TaskDialog
        values={{ listIndex, taskIndex }}
        open={open}
        onClose={handleClose}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        {boards[activeBoardIndex]?.lists.map((list, listIdx) => (
          <StyledList key={listIdx} sx={{ height: "100%" }}>
            <Box
              sx={{
                overflowY: "scroll",
                maxHeight: "80vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#333",
                    zIndex: 1,
                  }}
                >
                  {list.title}
                </Typography>
                <TiDeleteOutline
                  style={{ fontSize: 25, cursor: "pointer" }}
                  onClick={() => DeleteList(listIdx)}
                />
              </Box>
              <Droppable
                droppableId={listIdx.toString()}
                key={listIdx.toString()}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ minHeight: 1 }}
                    >
                      {list.tasks.map((task, taskIdx) => {
                        return (
                          <Draggable
                            key={taskIdx.toString()}
                            draggableId={listIdx + "-" + taskIdx.toString()}
                            index={taskIdx}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={"list"}
                                  onClick={() =>
                                    handleClickOpen(listIdx, taskIdx)
                                  }
                                  style={{
                                    userSelect: "none",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {task.description ? (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography>{task.title}</Typography>
                                      <TbFileDescription
                                        style={{
                                          color: "green",
                                          fontSize: 15,
                                        }}
                                      />
                                    </Box>
                                  ) : (
                                    <Typography>{task.title}</Typography>
                                  )}
                                  {task.color ? (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 40,
                                          height: 3,
                                          borderRadius: 5,
                                          backgroundColor: task.color,
                                        }}
                                      ></Box>
                                    </Box>
                                  ) : null}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "end",
                  gap: 2,
                }}
              >
                <TextField
                  label="Task"
                  variant="standard"
                  color="error"
                  inputProps={{ style: { color: "red" } }}
                  value={addTaskValue[listIdx] || " "}
                  onChange={(e) =>
                    setAddTaskValue((s) => ({
                      ...s,
                      [listIdx]: e.target.value,
                    }))
                  }
                />
                <MdAddTask
                  style={{ fontSize: 25, cursor: "pointer" }}
                  onClick={() => AddTask(listIdx)}
                />
              </Box>
            </Box>
          </StyledList>
        ))}
      </DragDropContext>

      {boards.length > 0 ? (
        <StyledList
          sx={{
            display: "flex",
            height: "100%",
            gap: 1,
          }}
        >
          <TextField
            label="Add List"
            variant="outlined"
            color="success"
            size="small"
            inputProps={{
              style: {
                color: "green",
              },
            }}
            value={addListValue}
            onChange={(e) => setAddListValue(e.target.value)}
          />
          <FcPlus
            style={{ fontSize: 40, cursor: "pointer" }}
            onClick={AddList}
          />
        </StyledList>
      ) : (
        <Box
          sx={{
            color: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            filter: "drop-shadow(7px 7px 1px brown)",
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: "bold" }}>
            Add a Board
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
