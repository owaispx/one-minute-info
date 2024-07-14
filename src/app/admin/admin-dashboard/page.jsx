"use client";
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [source, setSource] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null); // Change 1: Initialize image state to null
  const [imagePreview, setImagePreview] = React.useState(""); // Change 2: New state for image preview

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Change 3: Store the file object
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result); // Change 4: Store the base64 string for preview
        }
      };
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) { // Change 5: Check if an image is selected
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("source", source);
      formData.append("description", description);
      formData.append("image", image); // Change 6: Append the file object

      const res = await fetch("/api/admin/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.message === "Information added successfully") {
        toast.success("Information added successfully");
        setTitle("");
        setSource("");
        setDescription("");
        setImage(null); // Change 7: Reset the image state
        setImagePreview(""); // Change 8: Reset the image preview state
        handleClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occurred, try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <Typography variant="h3" component="h2">
        Admin Dashboard
      </Typography>
      <Button variant="outlined" onClick={handleOpen}>Add Information</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" textAlign={"center"}>
            Add Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              id="filled-basic"
              label="Title"
              variant="filled"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              id="filled-basic"
              label="Description"
              variant="filled"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              margin="normal"
              id="filled-basic"
              label="Source"
              variant="filled"
              fullWidth
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <TextField
              margin="normal"
              id="filled-basic"
              variant="filled"
              fullWidth
              type="file"
              name="image"
              onChange={handleImage}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" width={100} />} {/* Change 9: Display image preview */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Information"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Page;
