import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  image: {
    width: '100%',
    height: '100%',
    filter: 'brightness(60%)',
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: 'white',
    transform: 'translate(-50%,-50%)',
    elevation: '3',
    textShadow: '1rem 1rem 1rem black',
  },
  paper: {
    height: '65vh',
    position: 'relative',
  },
});

const SliderItem = ({ image, name }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <img className={classes.image} src={image} alt='carousel-aks' />
      <Typography className={classes.text} variant='h3'>
        {name}
      </Typography>
    </Paper>
  );
};

export default SliderItem;
