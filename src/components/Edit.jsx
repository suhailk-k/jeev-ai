import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 5,
};

export default function Edit({ user, index, handleEdit }) {
  const [open, setOpen] = React.useState(false);
  const [fname, setFname] = React.useState(user.firstName);
  const [lname, setLname] = React.useState(user.lastName);
  const [email, setEmail] = React.useState(user.email);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleEdit(index, { firstName: fname, lastName: lname, email });
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id='parent-modal-title'>Edit user</h2>

          <TextField
            placeholder='First name'
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            style={{ marginBottom: 10 }}
            fullWidth
          />
          <TextField
            placeholder='Last name'
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            style={{ marginBottom: 10 }}
            fullWidth
          />
          <TextField
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 10 }}
            fullWidth
          />
          <Grid>
            <Button onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
