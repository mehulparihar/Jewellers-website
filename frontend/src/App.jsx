import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast";
import { userStore } from "./stores/userStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { cartStore } from "./stores/cartStore";

function App() {
  const {user, checkAuth} = userStore();
  const {getCartItems} = cartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if(!user) return;
    getCartItems();
  }, [getCartItems, user]);
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path = '/signup' element = {user ? <Navigate to = '/'/> : <SignUpPage/>}/>
        <Route path = '/login' element = {user ? <Navigate to = '/'/>: <LoginPage/>}/>
        <Route path = '/dashboard' element = {user?.role == "admin" ? <AdminPage/>  :  <Navigate to = '/login'/>}/>
        <Route path = '/category/:category' element = {<CategoryPage />}/>
        <Route path = '/cart' element = {user ? <CartPage /> : <Navigate to = '/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
