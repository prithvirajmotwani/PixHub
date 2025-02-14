import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FiEye } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage } from "../../redux/photos/deleteImageSlice";
import toast from "react-hot-toast";
const options = [`Preview `, "Delete"];

const ITEM_HEIGHT = 48;

// ... (your imports)

export default function LongMenu({ previewImage, imgId }) {
  const dispatch = useDispatch();
  const { success, error, message, loading } = useSelector(
    (state) => state.imageDelete
  );
  const { user } = useSelector((state) => state.userLogin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (success) {
      toast.success(message);
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error]);

  React.useEffect(() => {
    if (loading) {
      toast.loading("Deleting..");
    } else {
      toast.dismiss(); // dismiss loading toast when loading is false
    }
  }, [loading]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteClick = () => {
    setAnchorEl(null);
    const data = { userId: user._id, imgId };
    // dispatch(deleteImage(data));
    toast.success("You have View only Credentials");
  };
  const handlerImagePreviewClick = () => {
    setAnchorEl(null);
    previewImage(true);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          key={options[0]}
          selected={options[0] === "Pyxis"}
          onClick={handlerImagePreviewClick}
        >
          <div className="option">
            <div>{options[0]} </div>
            <div>
              <FiEye />
            </div>
          </div>
        </MenuItem>
        <MenuItem
          key={options[1]}
          selected={options[1] === "Pyxis"}
          onClick={handleDeleteClick}
        >
          <div className="option">
            {options[1]} <MdDeleteOutline />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
