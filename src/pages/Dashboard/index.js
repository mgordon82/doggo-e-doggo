import {
  Autocomplete,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../containers/Breeds/breedsSlice';
import { getAvailableDogs, getDogsById } from '../../containers/Dogs/dogsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    data: breedsData
    // hasCompleted: breedsLoaded,
    // isLoading: breedsLoading,
    // error: loadingError,
  } = useSelector((state) => state.breeds);

  const { data: availableDogIds, hasCompleted: dogIdsLoaded } = useSelector(
    (state) => state.dogs.availableDogIds
  );

  const { data: availableDogs } = useSelector((state) => state.dogs.dogsById);

  const [selectedBreeds, setSelectedBreeds] = React.useState([]);
  const [zipCodes, setZipCodes] = React.useState([]);
  const [minAge, setMinAge] = React.useState();
  const [maxAge, setMaxAge] = React.useState();

  React.useEffect(() => {
    dispatch(getBreeds());
  }, []);

  React.useEffect(() => {
    if (dogIdsLoaded) {
      dispatch(getDogsById(availableDogIds.resultIds));
    }
  }, [dogIdsLoaded]);

  const handleBreedSelection = (event, newValue) => {
    setSelectedBreeds(newValue);
  };

  const handleZipCodes = (event) => {
    const value = event.target.value;
    const validation = value.replace(/[^0-9,]/g, '');
    const zipList = validation
      .split(',')
      .map((zip) => zip.trim())
      .filter((zip) => /^\d{5}$/.test(zip));
    setZipCodes(zipList);
  };

  const handleSearch = () => {
    const params = {
      selectedBreeds,
      zipCodes,
      minAge: minAge ? Number(minAge) : undefined,
      maxAge: maxAge ? Number(maxAge) : undefined
    };
    dispatch(getAvailableDogs(params));
  };

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
            limitTags={4}
            id='dog-breeds'
            filterSelectedOptions
            options={breedsData}
            getOptionLabel={(option) => option}
            onChange={handleBreedSelection}
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
            <TextField
              label='Zip Codes'
              name='zipCode'
              fullWidth
              onChange={handleZipCodes}
            />
            <TextField
              label='Minimum Age'
              name='ageMin'
              fullWidth
              onChange={(e) => setMinAge(e.target.value.number)}
            />
            <TextField
              label='Maximum Age'
              name='ageMax'
              fullWidth
              onChange={(e) => setMaxAge(e.target.value)}
            />
            <Button fullWidth variant='contained' onClick={handleSearch}>
              Search
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Box>Results</Box>
      <List>
        {availableDogs &&
          availableDogs.map((dog, key) => {
            return <ListItem key={key}>{dog.name}</ListItem>;
          })}
      </List>
    </>
  );
};

export default Dashboard;
