import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField,Paper } from '@mui/material';

const FlightBookingForm: React.FC = () => {
  const date = {
    today: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
  };
  
  return (
    <>
    {/* <div style={{ backgroundColor: '#1565C0', padding: 2, color: 'white' }}> */}
    <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
      <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
        <InputLabel>Trip Type</InputLabel>
        <Select defaultValue={''}>
          <MenuItem value="one-way">One Way</MenuItem>
          <MenuItem value="round-trip">Round Trip</MenuItem>
          <MenuItem value="multi-city">Multicity</MenuItem>
        </Select>
      </FormControl>
     
      <TextField label="From" sx={{ m: 1, width:160}} />
      <TextField label="To" sx={{ m: 1, width:160 }} />
      <TextField label="Departure Date" type="date" sx={{ m: 1 }} defaultValue={date.today} />
      <TextField label="Return Date" type="date" sx={{ m: 1 }} defaultValue={date.today}/>
      <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
        <InputLabel> Class</InputLabel>
        <Select defaultValue={''}>
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="first-class">First Class</MenuItem>
        </Select>
        </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, color: 'white' }}>
      <Button variant="contained" sx={{ mt: 2, bgcolor: '#FF6F00' }}>Search</Button>
      </FormControl>
      </Paper>
     
    {/* </div> */}
    </>
  );
};

export default FlightBookingForm;
