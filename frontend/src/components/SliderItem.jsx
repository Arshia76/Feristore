import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
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
    height: '25rem',
    position: 'relative',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: '15rem',
    },
  },
}));

const SliderItem = ({ image, name, id }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper
      className={classes.paper}
      onClick={() => history.push(`/detail/${id}`)}
    >
      <img className={classes.image} src={image} alt='carousel-aks' />
      <Typography className={classes.text} variant='h4'>
        {name}
      </Typography>
    </Paper>
  );
};

export default SliderItem;
