"use client";
import * as React from "react";
import { db } from "./lib/firebase";
import { ref, push, update } from "firebase/database";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

interface CreateJobDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateJobDialog({ open, onClose }: CreateJobDialogProps) {
  const [jobType, setJobType] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [description, setDescription] = React.useState("");


  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, ""); // Remove non-numeric characters
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!jobType || !assignedTo || !address || !phoneNumber) return;

    const newJobRef = push(ref(db, "jobs"));
    const newJob = {
      jobType,
      assignedTo,
      address,
      phoneNumber,
      description,
      status: "Assigned",
    };

    try {
      await update(newJobRef, newJob);
      onClose();
    } catch (error) {
      console.warn("Could not add job. Please try again.");

    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: "form", onSubmit: handleSubmit }}>
      <DialogTitle>Create a Job</DialogTitle>
      <DialogContent>
        <InputLabel>Job Type</InputLabel>
        <Select fullWidth value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <MenuItem value="Plumbing">Plumbing</MenuItem>
          <MenuItem value="Electrical">Electrical</MenuItem>
        </Select>
        <TextField required margin="normal" label="Assigned To" fullWidth value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        <TextField required margin="normal" label="Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField required margin="normal" label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))} />
        <TextField required
          margin="normal"
          label="Job Description"
          fullWidth multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Job</Button>
      </DialogActions>
    </Dialog>
  );
}
