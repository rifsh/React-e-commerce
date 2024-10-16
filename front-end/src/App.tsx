import { Route, Routes } from 'react-router-dom';
import './App.css'
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import Layout from './components/user/layout';
import Landing from './pages/user/landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // To enable carousel functionality
import ProductList from './pages/user/productList';
import ViewProductPpage from './pages/user/view-product-page';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/all-products' element={<ProductList />} />
          <Route path='/view-product/:id' element={<ViewProductPpage />} />
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>
      </Routes>


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
  )
}

export default App
