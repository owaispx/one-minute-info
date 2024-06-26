"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';

export default function ButtonAppBar() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <AppBar position="static" sx={{ bgcolor: 'white', p: 2 }}>
        <Toolbar>
          <Box sx={{ minWidth: 120, mr: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: 'black' }}>
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
                sx={{ color: 'black', borderColor: 'black', '.MuiOutlinedInput-notchedOutline': { borderColor: 'black' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' } }}
              >
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Nature">Nature</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'green' }}>
            One Minute Info
          </Typography>
          <Link href="/user/register" passHref>
          <Button color="inherit" sx={{ color: 'black' }}>Signup</Button>
    </Link>
    <Link href="/user/login" passHref>
    <Button color="inherit" sx={{ color: 'black' }}>Login</Button>
    </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
