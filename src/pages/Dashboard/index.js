import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../containers/Breeds/breedsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    data: breedsData
    // hasCompleted: breedsLoaded,
    // isLoading: breedsLoading,
    // error: loadingError,
  } = useSelector((state) => state.breeds);

  // const [selectedBreeds, setSelectedBreeds] = React.useState([]);
  // const [zipCodes, setZipCodes] = React.useState([]);
  // const [minAge, setMinAge] = React.useState('');
  // const [maxAge, setMaxAge] = React.useState('');

  // const handleBreedSelection = (event, newValue) => {
  //   setSelectedBreeds(newValue);
  // };

  // const handleSearch = () => {
  //   const params = {
  //     selectedBreeds,
  //     zipCodes,
  //     minAge,
  //     maxAge,
  //   };
  //   console.log('search criteria', params);
  // };
  React.useEffect(() => {
    dispatch(getBreeds());
  }, []);

  return (
    <>
      <Typography component='h2' fontWeight='bold'>
        Welcome to Doggo-E-Doggo!
      </Typography>
      <Typography component='p'>
        We are here to help you find your next doggo. And once you find one,
        you&apos;ll find another and another and another. Come find your new
        best friends!
      </Typography>
      <Typography my={4} component='p'>
        Search for a doggo below
      </Typography>
      <Paper sx={{ py: 2, px: 5, mb: 3, backgroundColor: '#efefef' }}>
        <Typography variant='h6' component='h3'>
          Search Criteria
        </Typography>
        <Stack gap={3} mt={2}>
          <Autocomplete
            fullWidth
            multiple
            limitTags={0}
            id='dog-breeds'
            options={breedsData}
            getOptionLabel={(option) => option}
            // onChange={handleBreedSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                label='Dog Breeds'
                placeholder='Select Breed(s)'
              />
            )}
          />
          <Stack direction='row' gap={3}>
            <TextField label='Zip Codes' name='zipCode' fullWidth />
            <TextField label='Minimum Age' name='ageMin' fullWidth />
            <TextField label='Maximum Age' name='ageMax' fullWidth />
            <Button fullWidth variant='contained'>
              Search
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Box>Results</Box>
    </>
  );
};

export default Dashboard;
