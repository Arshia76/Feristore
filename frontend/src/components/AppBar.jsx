import React, { useContext, Fragment } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link, useHistory } from 'react-router-dom';
import CartContext from '../context/cart/CartContext';
import AuthContext from '../context/auth/AuthContext';
import SearchContext from '../context/search/SearchContext';
import { Box } from '@material-ui/core';

const MenuItem = withStyles({
  root: {
    justifyContent: 'flex-end',
  },
})(MuiMenuItem);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    direction: 'rtl',
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    marginRight: '2.5rem',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const NavBar = ({ handleOpen }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const searchContext = useContext(SearchContext);

  const history = useHistory();

  const click = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      searchContext.searchProducts(e.target.value);
      history.push('/search');
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/profile'>
          پروفایل
        </Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{ textDecoration: 'none', color: 'black' }}
          to={`/${authContext.id}/orders`}
        >
          محصولات من
        </Link>
      </MenuItem>

      <MenuItem
        onClick={() => {
          authContext.logout();
          handleMenuClose();
        }}
      >
        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
          خروج
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!authContext.isAuthenticated && (
        <Box>
          <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}>
            <MenuItem style={{ direction: 'rtl' }}>
              <IconButton
                aria-label='show 11 new notifications'
                color='inherit'
              >
                <InputIcon />
              </IconButton>
              <p>ورود</p>
            </MenuItem>
          </Link>
          <Link
            to='/register'
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <MenuItem style={{ direction: 'rtl' }}>
              <IconButton
                aria-label='show 11 new notifications'
                color='inherit'
              >
                <PersonAddIcon />
              </IconButton>
              <p>ثبت نام</p>
            </MenuItem>
          </Link>
        </Box>
      )}
      <Link to='/cart' style={{ color: 'black', textDecoration: 'none' }}>
        <MenuItem style={{ direction: 'rtl' }}>
          <IconButton aria-label='show 11 new notifications' color='inherit'>
            <Badge
              badgeContent={cartContext.cart.reduce((tot, arr) => {
                return tot + arr.count;
              }, 0)}
              color='secondary'
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>سبد خرید</p>
        </MenuItem>
      </Link>
      {authContext.isAuthenticated && (
        <MenuItem style={{ direction: 'rtl' }} onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <p>حساب کاربری</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div
      style={{ position: 'sticky', top: 0, zIndex: '1' }}
      className={classes.grow}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
            <Typography className={classes.title} variant='h6' noWrap>
              FeriShop
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='جستجو'
              onKeyPress={click}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!authContext.isAuthenticated && (
              <Fragment>
                <Link to='/login' style={{ color: 'white' }}>
                  <IconButton
                    aria-label='show 17 new notifications'
                    color='inherit'
                    style={{ marginRight: '.5rem' }}
                  >
                    <InputIcon />
                  </IconButton>
                </Link>
                <Link to='/register' style={{ color: 'white' }}>
                  <IconButton
                    aria-label='show 17 new notifications'
                    color='inherit'
                    style={{ marginRight: '.5rem' }}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Link>
              </Fragment>
            )}
            <Link to='/cart' style={{ color: 'white' }}>
              <IconButton
                aria-label='show 17 new notifications'
                color='inherit'
                style={{ marginRight: '.5rem' }}
              >
                <Badge
                  badgeContent={cartContext.cart.reduce((tot, arr) => {
                    return tot + arr.count;
                  }, 0)}
                  color='secondary'
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            {authContext.isAuthenticated && (
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
                style={{ marginRight: '.5rem' }}
              >
                <AccountCircle />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default NavBar;
