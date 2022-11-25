import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import Edit from '../../components/Edit';

const Home = () => {
  const [click, setClick] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [users, setUsers] = useState([]);
  const handleCreate = () => {
    setClick(!click);
  };
  const handleDelete = (index) => {
    // console.log('handleDeletehandleDelete');
    // console.log(index);
    setUsers(users.filter((user, i) => index !== i));
  };
  const handleEdit = (index, newUser) => {
    setUsers(users.map((user, i) => (i === index ? newUser : user)));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage();
    // console.log('1111');
    if (!fname || !email) {
      return setMessage('Email and first name mandatory');
    }
    setUsers([
      ...users,
      {
        firstName: fname,
        lastName: lname,
        email: email,
      },
    ]);
    setFname();
    setLname();
    setEmail();
    setClick(!click);
  };
  return (
    <div style={{ margin: '10px', justifyContent: 'center' }}>
      <div
        style={{
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Button variant='contained' onClick={handleCreate}>
          create members
        </Button>
      </div>
      <div style={{ display: 'flex', color: 'red', justifyContent: 'center' }}>
        {message}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {click ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor='fname'>
              <h5>First name</h5>
              <TextField
                type='text'
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label htmlFor='lname'>
              <h5>Last name</h5>
              <TextField
                type='text'
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <label htmlFor='email'>
              <h5>Email</h5>
              <TextField
                type='text'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <Grid style={{ marginTop: '10px' }}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>

            {/* <button>Submit</button> */}
          </form>
        ) : (
          <></>
        )}
      </div>
      <Grid>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {/* <Button onClick={() => handleEdit(index)}>Edit</Button> */}
                    <Edit user={user} index={index} handleEdit={handleEdit} />
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Home;
