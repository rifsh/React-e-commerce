import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // To enable carousel functionality
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import React, { Suspense } from 'react';
import ProfilePage from './pages/user/profilePage';

// Lazy load components
const AuthLayout = React.lazy(() => import('./components/auth/layout'));
const AuthLogin = React.lazy(() => import('./pages/auth/login'));
const AuthRegister = React.lazy(() => import('./pages/auth/register'));
const UserProfile = React.lazy(() => import('./pages/user/profilePage'));
const Layout = React.lazy(() => import('./components/user/layout'));
const Landing = React.lazy(() => import('./pages/user/landing'));
const ProductList = React.lazy(() => import('./pages/user/productList'));
const ViewProductPage = React.lazy(() => import('./pages/user/view-product-page'));  // Fixed naming
const CartPage = React.lazy(() => import('./pages/user/cartPage'));
const OrderPage = React.lazy(() => import('./pages/user/orderPage'))

function App() {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Suspense fallback={<div className='w-full flex items-center justify-center h-screen font-bold text-gray-400'>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/user' element={<ProfilePage />} />
            <Route path='/all-products' element={<ProductList />} />
            <Route path='/view-product/:id' element={<ViewProductPage />} />  {/* Fixed naming */}
            <Route path='/cart' element={<CartPage />} />
            <Route path='/order' element={<OrderPage />} />
          </Route>

          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<AuthLogin />} />
            <Route path='register' element={<AuthRegister />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
