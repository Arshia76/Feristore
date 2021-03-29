import { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserOrders from './pages/UserOrders';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderInformation from './pages/OrderInformation';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import Comment from './pages/admin/Comment';
import Order from './pages/admin/Order';
import Product from './pages/admin/Product';
import Customer from './pages/admin/Customer';
import NavBar from './components/AppBar';
import Drawer from './components/Drawer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import ProductState from './context/products/ProductState';
import CartState from './context/cart/CartState';
import CategoryState from './context/category/CategoryState';
import SearchState from './context/search/SearchState';
import UserState from './context/users/UserState';
import ReviewState from './context/review/ReviewState';
import OrderState from './context/orders/OrderState';
import AuthContext from './context/auth/AuthContext';
import ManageProduct from './pages/admin/ManageProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';
import ManageCategory from './pages/admin/ManageCategory';
import AdminCategory from './pages/admin/AdminCategory';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import OrderDetail from './pages/OrderDetail';
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Amiri, Arial',
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((open) => !open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      authContext.loadUser();
    }
    //eslint-disable-next-line
  }, [authContext.isAuthenticated]);

  return (
    <ProductState>
      <CartState>
        <SearchState>
          <UserState>
            <OrderState>
              <CategoryState>
                <ReviewState>
                  <ThemeProvider theme={theme}>
                    <main className='App'>
                      <CssBaseline />
                      <Router>
                        <NavBar handleOpen={handleOpen} />
                        <Drawer open={open} handleClose={handleClose} />
                        <Switch>
                          <Route exact path='/' component={Home} />
                          <Route exact path='/login' component={Login} />
                          <Route exact path='/register' component={Register} />
                          <Route exact path='/cart' component={Cart} />
                          <Route exact path='/detail/:id' component={Detail} />
                          <Route exact path='/search' component={Search} />
                          <PrivateRoute
                            exact
                            path='/payment'
                            component={Payment}
                          />
                          <PrivateRoute
                            exact
                            path='/orderInfo'
                            component={OrderInformation}
                          />
                          <PrivateRoute
                            exact
                            path='/orderDetail/:id'
                            component={OrderDetail}
                          />
                          <Route
                            exact
                            path='/categories/:category'
                            component={Category}
                          />
                          <PrivateRoute
                            exact
                            path='/profile'
                            component={Profile}
                          />
                          <PrivateRoute
                            exact
                            path='/:id/orders'
                            component={UserOrders}
                          />
                          <AdminRoute
                            exact
                            path='/admin/userorders'
                            component={Order}
                          />
                          <AdminRoute
                            exact
                            path='/admin/products'
                            component={Product}
                          />
                          <AdminRoute
                            exact
                            path='/admin/customers'
                            component={Customer}
                          />
                          <AdminRoute
                            exact
                            path='/product/:id/comments'
                            component={Comment}
                          />
                          <AdminRoute
                            exact
                            path='/admin/product/manage'
                            component={ManageProduct}
                          />
                          <AdminRoute
                            exact
                            path='/admin/category/manage'
                            component={ManageCategory}
                          />
                          <AdminRoute
                            exact
                            path='/admin/categories'
                            component={AdminCategory}
                          />
                        </Switch>
                      </Router>
                      <ToastContainer
                        rtl
                        position='bottom-left'
                        style={{ textAlign: 'right' }}
                      />
                    </main>
                  </ThemeProvider>
                </ReviewState>
              </CategoryState>
            </OrderState>
          </UserState>
        </SearchState>
      </CartState>
    </ProductState>
  );
}

export default App;
