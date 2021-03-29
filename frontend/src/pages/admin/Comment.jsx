import React, { useContext, useEffect, useState } from 'react';
import MyTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ReviewContext from '../../context/review/ReviewContext';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { Pagination } from '@material-ui/lab';
import { Box } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    margin: '5rem auto ',
    width: '75%',
    direction: 'rtl',
  },
});

const Comment = ({ match }) => {
  const classes = useStyles();
  const reviewContext = useContext(ReviewContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    reviewContext.getProductReviews(match.params.id, 10, page);
    if (reviewContext.error) {
      toast.error(reviewContext.error.msg || reviewContext.error.errors[0].msg);
    }
    //eslint-disable-next-line
  }, [reviewContext.error, match]);
  return (
    <TableContainer>
      <MyTable className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='right'> نام مشتری</StyledTableCell>
            <StyledTableCell align='right'> نظر مشتری</StyledTableCell>
            <StyledTableCell align='right'>رتبه بندی مشتری</StyledTableCell>
            <StyledTableCell align='right'>عملیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewContext.loading ? (
            <Loader />
          ) : (
            reviewContext.reviews.results &&
            reviewContext.reviews.results.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align='right'>{row.reviewer}</StyledTableCell>
                <StyledTableCell
                  align='right'
                  style={{ wordBreak: 'break-word' }}
                >
                  {row.review}
                </StyledTableCell>

                <StyledTableCell align='right'>{row.rating}</StyledTableCell>
                <StyledTableCell align='right'>
                  <DeleteIcon
                    style={{
                      marginRight: '.5rem',
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      reviewContext.deleteComment(match.params.id, row._id)
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </MyTable>
      {reviewContext.reviews.pages > 1 && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            margin: '2rem 0',
          }}
        >
          <Pagination
            color='primary'
            size='large'
            variant='outlined'
            count={reviewContext.reviews.pages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
              reviewContext.getProductReviews(match.params.id, 10, value);
            }}
          />
        </Box>
      )}
    </TableContainer>
  );
};

export default Comment;
