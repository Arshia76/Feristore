import { Grid, Typography } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import SearchContext from '../context/search/SearchContext';
import PopularProductItem from '../components/PopularProductItem';

const Search = () => {
  const searchContext = useContext(SearchContext);
  return (
    <Fragment>
      <Typography
        variant='h2'
        style={{ textAlign: 'center', margin: '4.5rem 0' }}
      >
        نتایج جستجو
      </Typography>
      <Grid
        direction='row-reverse'
        style={{ padding: '3rem', width: '100%' }}
        container
        spacing={2}
      >
        {searchContext.search.map((search) => {
          return <PopularProductItem key={search._id} product={search} />;
        })}
      </Grid>
    </Fragment>
  );
};

export default Search;
