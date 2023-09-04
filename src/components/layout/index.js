import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {
  ListItemText,
  TextField,
  ListItemIcon,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";
import { BoardsContext } from "../../context";
import { FcRemoveImage } from "react-icons/fc";
import { ImageBoard } from "../Board/boarImagesData";
import { MdDelete } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {
    boards,
    setBoards,
    activeBoardIndex,
    setActiveBoardIndex,
    age,
    setAge,
  } = useContext(BoardsContext);
  const [saveBoardState, setSaveBoardState] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const saveBoard = () => {
    setBoards((prev) => [
      ...prev,
      {
        title: saveBoardState,
        img: age,
        lists: [],
      },
    ]);

    setSaveBoardState("");
  };

  const DeleteBoard = (indexToDelete) => {
    const updatedItems = boards.filter(
      (item, index) => index !== indexToDelete,
    );

    setBoards(updatedItems);
  };

  return (
    <Box
      sx={{
        display: "flex",
        ".MuiPaper-elevation": {
          backgroundColor: "black",
          borderRight: "1px solid red",
        },
        ".MuiListItemButton-gutters": { borderRadius: 10, mb: 1 },
        ".MuiListItemButton-gutters:hover": {
          backgroundColor: "#fff",
        },
      }}
    >
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "black",
            borderBottom: "1px solid red",
            minHeight: "30px !important",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "red",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Trello
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ minHeight: "40px !important" }}>
          <IconButton onClick={handleDrawerClose} sx={{ color: "red" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {boards.map((board, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setActiveBoardIndex(index)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: activeButton === index ? "#fff" : "#333",
                }}
                onClick={() => setActiveButton(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {board.img ? (
                    <img
                      src={board.img}
                      alt="rasm"
                      className={open ? "boardImgSave" : "bg-ImgClose"}
                    />
                  ) : (
                    <FcRemoveImage className="imgSize" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={board.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                <MdDelete
                  onClick={() => DeleteBoard(index)}
                  style={{ color: "red" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            opacity: open ? 1 : 0,
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Add Board"
            variant="outlined"
            size="small"
            sx={{
              mt: 2,
              display: "block",
              backgroundColor: "#333",
              borderRadius: 2,
            }}
            style={{ borderColor: "red" }}
            inputProps={{ style: { color: "aqua" } }}
            value={saveBoardState}
            onChange={(e) => setSaveBoardState(e.target.value)}
          />
          <Button
            variant="outlined"
            color="success"
            size="small"
            sx={{
              mt: 2,
              width: "100%",
              display: "block",
              backgroundColor: "green",
              color: "#fff",
            }}
            onClick={saveBoard}
            disabled={saveBoardState.length !== 0 ? false : true}
          >
            Save Board
          </Button>
          <FormControl
            fullWidth
            sx={{
              mt: 2,
            }}
          >
            <InputLabel id="demo-simple-select-label">Image</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={age}
              label="Age"
              onChange={handleChange}
              sx={{ backgroundColor: "#333", mb: 5 }}
            >
              <MenuItem sx={{ height: 80 }}>NONE</MenuItem>
              {ImageBoard.map((item, index) => {
                return (
                  <MenuItem value={item.img} key={index}>
                    <img src={item.img} alt="rasm" className="bg-Img" />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundImage: boards[activeBoardIndex]?.img
            ? `url('${boards[activeBoardIndex].img}')`
            : "none",
          backgroundColor: boards[activeBoardIndex]?.img
            ? "transparent"
            : "black",
          height: "100vh",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          transition: boards[activeBoardIndex]?.img ? "2s" : null,
        }}
      >
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
