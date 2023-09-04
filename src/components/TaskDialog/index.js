import * as React from "react";
import {
  Typography,
  Box,
  Button,
  DialogTitle,
  TextField,
  Dialog,
} from "@mui/material";
import { useContext, useState } from "react";
import { BoardsContext } from "../../context";
import styled from "styled-components";
import Slide from "@mui/material/Slide";
import { TbFileDescription } from "react-icons/tb";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    padding: 16px;
    border-radius: 16px;
    width: 100%;
  }
  & .MuiOutlinedInput-root {
    height: auto;
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function TaskDialog(props) {
  const {
    onClose,
    values: { listIndex, taskIndex },
    open,
  } = props;

  const { boards, setBoards, activeBoardIndex, setActiveBoardIndex } =
    useContext(BoardsContext);
  const [sendMessage, setSendMessage] = useState("");

  const [color, setColor] = React.useState("");

  const handleClose = () => onClose();

  const activeBoard =
    activeBoardIndex !== null ? boards[activeBoardIndex] : null;

  const activeList =
    listIndex !== null ? boards[activeBoardIndex].lists[listIndex] : null;

  const activeTask =
    taskIndex !== null
      ? boards[activeBoardIndex].lists[listIndex].tasks[taskIndex]
      : null;

  const onChangeTask = (props) => {
    const boardsClone = JSON.parse(JSON.stringify(boards));
    const updatedTask = {
      ...boardsClone[activeBoardIndex].lists[listIndex].tasks[taskIndex],
      ...props,
    };
    boardsClone[activeBoardIndex].lists[listIndex].tasks[taskIndex] =
      updatedTask;

    setBoards(boardsClone);
  };

  const validation = (title) => title.trim().length > 0;
  const SendMessage = () => {
    if (!validation(sendMessage)) return;

    const messanger = [...boards];
    const targetmessage =
      messanger[activeBoardIndex].lists[taskIndex].tasks[listIndex].chats;

    const newTask = {
      title: sendMessage,
    };
    targetmessage.push(newTask);

    onChangeTask({ messanger });

    setSendMessage("");
  };

  const DeleteTask = (listIndex, taskIndex) => {
    const newBoards = [...boards];
    const targetList = newBoards[activeBoardIndex].lists[taskIndex];
    targetList.tasks.splice(listIndex, 1);

    setBoards(newBoards);

    handleClose();
  };

  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {listIndex !== null && taskIndex !== null && activeBoardIndex !== null ? (
        <>
          <DialogTitle sx={{ p: 0 }}>
            <TextField
              id="standard-basic"
              label="List Name"
              variant="standard"
              value={activeTask.title}
              onChange={(e) => onChangeTask({ title: e.target.value })}
              sx={{ mb: 2, width: "100%" }}
            />
          </DialogTitle>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mt: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TbFileDescription /> Description
          </Typography>

          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            color="success"
            multiline
            value={activeTask.description}
            onChange={(e) => onChangeTask({ description: e.target.value })}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-colors">Colors</InputLabel>
            <Select
              labelId="demo-colors"
              id="demo-simple-select"
              label="Colors"
            >
              <MenuItem
                name=""
                onClick={(e) =>
                  onChangeTask({ color: e.target.getAttribute("name") })
                }
                sx={{ fontWeight: "bold" }}
              >
                None
              </MenuItem>
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "32%",
                    height: 40,
                    backgroundColor: "green",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  name="green"
                  onClick={(e) =>
                    onChangeTask({ color: e.target.getAttribute("name") })
                  }
                ></Box>
                <Box
                  sx={{
                    width: "32%",
                    height: 40,
                    backgroundColor: "yellow",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  name="yellow"
                  onClick={(e) =>
                    onChangeTask({ color: e.target.getAttribute("name") })
                  }
                ></Box>
                <Box
                  sx={{
                    width: "32%",
                    height: 40,
                    backgroundColor: "red",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  name="red"
                  onClick={(e) =>
                    onChangeTask({ color: e.target.getAttribute("name") })
                  }
                ></Box>
              </Box>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => DeleteTask(taskIndex, listIndex)}
              >
                Delete Task
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleClose}
              >
                Save
              </Button>
            </Box>
          </Box>
        </>
      ) : null}
    </StyledDialog>
  );
}
