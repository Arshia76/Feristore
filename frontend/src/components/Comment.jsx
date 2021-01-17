import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactStars from 'react-stars';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row-reverse',
    marginBottom: '1rem',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  box: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    direction: 'rtl',
    width: '75%',

    wordBreak: 'break-all',
  },
});

const Comment = ({ username, comment, rating }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box className={classes.root}>
        <Box className={classes.box}>
          <Typography variant='h6' style={{ marginLeft: '1rem', color: 'red' }}>
            {username}
          </Typography>
          <Typography>{comment}</Typography>
        </Box>
        <ReactStars
          half={false}
          value={rating}
          color2={'#ffd700'}
          count={5}
          size={24}
          edit={false}
        />
      </Box>
      <hr style={{ width: '99%' }} />
    </Fragment>
  );
};

export default Comment;
