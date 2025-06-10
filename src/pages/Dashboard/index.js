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
  Typography
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
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

  const { data: availableDogs, isLoading: areDogsLoading } = useSelector(
    (state) => state.dogs.dogsById
  );

  const {
    data: matchingDogId,
    hasCompleted: dogMatched,
    isLoading: matchingDog
  } = useSelector((state) => state.dogs.matchingDog);

  const [selectedBreeds, setSelectedBreeds] = React.useState([]);
  const [zipCodes, setZipCodes] = React.useState([]);
  const [minAge, setMinAge] = React.useState();
  const [maxAge, setMaxAge] = React.useState();
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [page, setPage] = React.useState(1);
  const [favorites, setFavorites] = React.useState([]);

  const lastSearchParams = React.useRef({});

  const pageSize = 25;

  React.useEffect(() => {
    dispatch(getBreeds());
  }, []);

  React.useEffect(() => {
    if (
      dogIdsLoaded &&
      Array.isArray(availableDogIds?.resultIds) &&
      availableDogIds.resultIds.length > 0
    ) {
      dispatch(getDogsById(availableDogIds.resultIds));
    }
  }, [dogIdsLoaded, availableDogIds?.resultIds?.join(',')]);

  React.useEffect(() => {
    if (dogMatched) {
      dispatch(getDogsById([matchingDog.match]));
    }
  });

  const handleBreedSelection = (event, newValue) => {
    setSelectedBreeds(newValue);
  };

  const sortedDogs = React.useMemo(() => {
    if (!availableDogs) return [];
    return [...availableDogs].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
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
    setFavorites((prev) => {
      return prev.includes(dog.id)
        ? prev.filter((id) => id !== dog.id)
        : [...prev, dog.id];
    });
  };

  console.log('match', matchingDogId);

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
    if (favorites.length >= 0) {
      dispatch(getMatchingDog(favorites));
    }
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
              onChange={(e) => setMinAge(e.target.value)}
            />
            <TextField
              label='Maximum Age'
              name='ageMax'
              fullWidth
              onChange={(e) => setMaxAge(e.target.value)}
            />
            <Button
              loading={areDogsLoading || areDogIdsLoading}
              fullWidth
              variant='contained'
              onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Box>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography>
            There are {availableDogs.length || 0} results out of {''}
            {availableDogIds.total}
          </Typography>
          <Pagination
            count={Math.ceil(availableDogIds.total / pageSize)}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
          <Typography>
            Sort:{' '}
            <Button
              variant='text'
              onClick={() => {
                setSortOrder('asc');
                handleSearch();
              }}
            >
              A-Z
            </Button>
            <Button
              variant='text'
              onClick={() => {
                setSortOrder('desc');
                handleSearch();
              }}
            >
              Z-A
            </Button>
          </Typography>
          <Stack direction='row' alignItems='center' gap={2}>
            <Typography>Matching {favorites.length} dog(s)</Typography>
            <Button
              variant='contained'
              size='small'
              loading={matchingDog}
              onClick={() => findAMatch()}
            >
              Find A Match
            </Button>
          </Stack>
        </Stack>
        <Stack
          gap={4}
          flexWrap='wrap'
          alignItems='top'
          justifyContent='space-between'
          direction='row'
        >
          {sortedDogs.map((dog, key) => (
            <Card key={key} sx={{ width: 300, borderRadius: 4, boxShadow: 3 }}>
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
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Typography variant='body1'>{dog.age} Year Old</Typography>
                  <Typography variant='body1'>{dog.breed}</Typography>
                </Stack>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body1'>From: {dog.zip_code}</Typography>
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
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Dashboard;
