import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import IndexLayout from './layouts';
import IndexPage from './pages';
import NotFoundPage from './pages/404';
import CartPage from './pages/cart';
import OrderPage from './pages/order';

console.log(process.env.REACT_APP_URL)

const routerObj = [
  {
    path: "/",
    element: <IndexLayout/>,
    children: [
      {
        path: '/',
        element: <IndexPage/>
      },
      {
        path: '/cart',
        element: <CartPage/>
      },
      {
        path: '/order',
        element: <OrderPage/>
      },
      {
        path: '*',
        element: <NotFoundPage/>,
      }
    ]
  }
]

const router = createBrowserRouter(routerObj)

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
