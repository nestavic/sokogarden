import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Getproducts from './components/Getproducts';
import Uploadproducts from './components/Uploadproducts';
import Makepayment from './components/Makepayment';
import HomePage from './components/Home';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Aboutus from "./components/Aboutus"
import Chatbot from './components/Chatbot';
import Singleproduct from './components/Singleproduct' 
import Navbar from './components/Navbar';
import ForgotPassword from './components/Forgot';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
      <AuthProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              {/* Gaming-Themed Navbar */}
              <Navbar/>            

              <Routes>
                <Route path='/Signin' Component={Signin}></Route>
                <Route path='/Signup' Component={Signup}></Route>
                <Route path='/Uploadproducts' Component={Uploadproducts}></Route>
                <Route path='/Getproducts' Component={Getproducts}></Route>
                <Route path='/payment' Component={Makepayment}></Route>
                <Route path='/' Component={HomePage}></Route>
                <Route path='/Footer' Component={Footer}></Route>
                <Route path='/Carousel' Component={Carousel}></Route>
                <Route path='/Aboutus' Component={Aboutus}></Route>
                <Route path='/Chatbot' Component={Chatbot}></Route>
                <Route path='/products' Component={Singleproduct}></Route>
                <Route path='/Forgot' Component={ForgotPassword}></Route>
                <Route path='/profile' Component={Profile}></Route>
                
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </AuthProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;