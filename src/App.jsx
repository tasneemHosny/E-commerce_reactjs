import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/layout';
import Products from './components/products/products';
import Register from './components/register/register';
import Brands from './components/brands/brands';
import Category from './components/category/category';
import NotFound from './components/notFound/notFound';
import Cart from './components/cart/cart';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/authContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './components/productDetails/productDetails';
import AddToCartProvider from './context/addTocartContext';
import Payment from './components/payment/payment';
import AllOrders from './components/allorders/allorders';
import WishListProvider from './context/wishList_context';
import WishList from './components/wishList/wishList';
import Home from './components/home/home';
import ModalComponent from './components/ModalComponent/ModalComponent';
import Login from './components/login/login';
import ForgetPassword from './components/forgetPassword/forgetPassword';
import EnterResetCode from './components/EnterResetCode/EnterResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword'; 

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleOpenModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
                { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
                { path: '/products', element: <ProtectedRoute><Products /></ProtectedRoute> },
                { path: '/productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
                { path: '/register', element: <Register /> },
                { path: '/category', element: <ProtectedRoute><Category /></ProtectedRoute> },
                { path: '/brands', element: <ProtectedRoute><Brands onOpenModal={handleOpenModal} /></ProtectedRoute> },
                { path: '/payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
                { path: '/login', element: <Login/> },
                { path: '/forgetPassword', element: <ForgetPassword/> },
                { path: '/EnterResetCode', element: <EnterResetCode/> },
                { path: '/ResetPassword/', element: <ResetPassword/> },
                { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
                { path: '/wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
                { path: '/allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
                { path: '*', element: <NotFound /> },
            ],
        },
    ]);

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AddToCartProvider>
                    <WishListProvider>
                        <Toaster />
                        <RouterProvider router={router} />
                        <ModalComponent
                            isOpen={isModalOpen}
                            onRequestClose={handleCloseModal}
                            content={modalContent}
                        />
                    </WishListProvider>
                </AddToCartProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
