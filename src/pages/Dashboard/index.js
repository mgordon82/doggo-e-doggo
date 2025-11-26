import React from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../containers/Breeds/breedsSlice';
import {
  getAvailableDogs,
  getDogsById,
  getMatchingDog,
  resetAvailableDogs,
  resetDogsById
} from '../../containers/Dogs/dogsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    data: breedsData
    // hasCompleted: breedsLoaded,
    // isLoading: breedsLoading,
    // error: loadingError,
  } = useSelector((state) => state.breeds);

  const {
    data: availableDogIds,
    isLoading: areDogIdsLoading,
    hasCompleted: dogIdsLoaded
  } = useSelector((state) => state.dogs.availableDogIds);

  const { data: availableDogs = [], isLoading: areDogsLoading } = useSelector(
    (state) => state.dogs.dogsById
  );

  const {
    data: matchingDogId,
    hasCompleted: dogMatched,
    isLoading: isMatchingDogLoading
  } = useSelector((state) => state.dogs.matchingDog);

  const [selectedBreeds, setSelectedBreeds] = React.useState([]);
  const [zipCodes, setZipCodes] = React.useState([]);
  const [minAge, setMinAge] = React.useState('');
  const [maxAge, setMaxAge] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [page, setPage] = React.useState(1);
  const [favorites, setFavorites] = React.useState([]);

  const lastSearchParams = React.useRef({});

  const pageSize = 25;

  React.useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  React.useEffect(() => {
    if (
      dogIdsLoaded &&
      Array.isArray(availableDogIds?.resultIds) &&
      availableDogIds.resultIds.length > 0
    ) {
      dispatch(getDogsById(availableDogIds.resultIds));
    }
  }, [dispatch, dogIdsLoaded, availableDogIds]);

  React.useEffect(() => {
    if (dogMatched && matchingDogId?.match) {
      dispatch(getDogsById([matchingDogId.match]));
    }
  }, [dispatch, dogMatched, matchingDogId]);

  const handleBreedSelection = (event, newValue) => {
    setSelectedBreeds(newValue);
  };

  const sortedDogs = React.useMemo(() => {
    if (!availableDogs) return [];
    return [...availableDogs].sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [availableDogs, sortOrder]);

  const handleZipCodes = (event) => {
    const value = event.target.value;
    const validation = value.replace(/[^0-9,]/g, '');
    const zipList = validation
      .split(',')
      .map((zip) => zip.trim())
      .filter((zip) => /^\d{5}$/.test(zip));
    setZipCodes(zipList);
  };

  const toggleFavorite = (dog) => {
    setFavorites((prev) =>
      prev.includes(dog.id)
        ? prev.filter((id) => id !== dog.id)
        : [...prev, dog.id]
    );
  };

  const handleSearch = () => {
    dispatch(resetAvailableDogs());
    dispatch(resetDogsById());
    setPage(1);

    const params = {
      breeds: selectedBreeds,
      zipCodes,
      ageMin: minAge ? Number(minAge) : undefined,
      ageMax: maxAge ? Number(maxAge) : undefined,
      sort: `name:${sortOrder}`,
      size: pageSize,
      from: 0
    };

    lastSearchParams.current = params;
    dispatch(getAvailableDogs(params));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    const params = {
      ...lastSearchParams.current,
      size: pageSize,
      from: (value - 1) * pageSize
    };
    dispatch(getAvailableDogs(params));
  };

  const findAMatch = () => {
    if (favorites.length > 0) {
      dispatch(getMatchingDog(favorites));
    }
  };

  const totalResults = availableDogs?.length ?? 0;
  const totalAvailable = availableDogIds?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalAvailable / pageSize));

  return (
    <>
      <Typography component='h2' fontWeight='bold' mb={1}>
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

      <Paper
        sx={{
          py: 2,
          px: { xs: 2, sm: 3, md: 5 },
          mb: 3,
          backgroundColor: '#efefef'
        }}
      >
        <Typography variant='h6' component='h3'>
          Search Criteria
        </Typography>
        <Stack gap={3} mt={2}>
          <Autocomplete
            fullWidth
            multiple
            size='small'
            limitTags={4}
            id='dog-breeds'
            filterSelectedOptions
            options={breedsData || []}
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
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={2}
            alignItems='flex-start'
          >
            <TextField
              label='Zip Codes'
              size='small'
              name='zipCode'
              fullWidth
              onChange={handleZipCodes}
              helperText='Comma-separated, e.g. 12345, 67890'
            />
            <TextField
              label='Minimum Age'
              name='ageMin'
              size='small'
              fullWidth
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
            <TextField
              label='Maximum Age'
              name='ageMax'
              size='small'
              fullWidth
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
            <Button
              fullWidth
              variant='contained'
              onClick={handleSearch}
              disabled={areDogsLoading || areDogIdsLoading}
            >
              {areDogsLoading || areDogIdsLoading ? 'Searching…' : 'Search'}
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Box mb={3}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Typography>
            Showing {totalResults} results out of {totalAvailable}
          </Typography>

          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color='primary'
            size='small'
          />

          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            flexWrap='wrap'
          >
            <Typography>Sort:</Typography>
            <Button
              size='small'
              variant={sortOrder === 'asc' ? 'contained' : 'text'}
              onClick={() => {
                setSortOrder('asc');
                handleSearch();
              }}
            >
              A–Z
            </Button>
            <Button
              size='small'
              variant={sortOrder === 'desc' ? 'contained' : 'text'}
              onClick={() => {
                setSortOrder('desc');
                handleSearch();
              }}
            >
              Z–A
            </Button>
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            flexWrap='wrap'
          >
            <Typography>Matching {favorites.length} dog(s)</Typography>
            <Button
              variant='contained'
              size='small'
              onClick={findAMatch}
              disabled={favorites.length === 0 || isMatchingDogLoading}
            >
              {isMatchingDogLoading ? 'Finding…' : 'Find A Match'}
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Grid container spacing={3}>
          {sortedDogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
              <Card sx={{ borderRadius: 4, boxShadow: 3, height: '100%' }}>
                <CardMedia
                  component='img'
                  height='200'
                  image={dog.img}
                  alt={`${dog.name} the ${dog.breed}`}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant='h6' fontWeight='bold' gutterBottom>
                    {dog.name}
                  </Typography>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    mb={2}
                    spacing={1}
                  >
                    <Typography variant='body1'>
                      {dog.age} year{dog.age !== 1 ? 's' : ''} old
                    </Typography>
                    <Typography variant='body1' sx={{ textAlign: 'right' }}>
                      {dog.breed}
                    </Typography>
                  </Stack>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Typography variant='body1'>
                      From: {dog.zip_code}
                    </Typography>
                    <IconButton
                      onClick={() => toggleFavorite(dog)}
                      aria-label='favorite'
                    >
                      {favorites.includes(dog.id) ? (
                        <StarIcon color='error' />
                      ) : (
                        <StarOutlineIcon />
                      )}
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
