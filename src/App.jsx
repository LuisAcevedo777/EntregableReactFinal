import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Purchases from './pages/Purchases';
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap'
import AppFooter from './components/AppFooter';
import Protected from './components/ProtectedRoutes'


const App = () => {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div>
      <HashRouter>
<nav className='nav'>
        <AppNavbar className='navbar' />
        {isLoading && <LoadingScreen />}
        </nav>
        <Container className='my-5'>

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            <Route element={<Protected/>}>
            <Route path="/purchases" element={<Purchases />} />

            </Route>
          </Routes>
        </Container>

    <AppFooter/>
      </HashRouter>
    </div>
  );
};

export default App;