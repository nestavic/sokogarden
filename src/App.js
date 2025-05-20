import './App.css';
import { BrowserRouter as Router ,Routes ,Route,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Getproducts from './components/Getproducts';
import Uploadproducts from './components/Uploadproducts';
import Makepayment from './components/Makepayment';
function App() {
  return (
    <Router>

    <div className="App">
      <header className="App-header">
        <h1>
          <span className='imgspan'> 
            <img src="images/basket.png" alt="" className='headerimg' />
          </span>
             <b className='text-danger'>Neiyline</b> - Gaming chronicles
        </h1>
        
      </header>
      <br/>
      <nav>
        <Link to ='/Signin' className='btn btn-outline-dark mx-2 px-5'>Signin</Link>
        <Link to ='/Signup' className='btn btn-outline-dark mx-2 px-5'>Signup</Link>
        <Link to ='/' className='btn btn-outline-dark mx-2 px-5'>Getproducts</Link>
        <Link to ='/Uploadproducts' className='btn btn-outline-dark mx-2 px-5'>Uploadproducts</Link>
        
        
      </nav>
      <br />

      <Routes>
        <Route path='/Signin' Component={Signin}></Route>
        <Route path='/Signup' Component={Signup}></Route>
        <Route path='/Uploadproducts' Component={Uploadproducts}></Route>
        <Route path='/' Component={Getproducts}></Route>
        <Route path='/payment' Component={Makepayment}></Route>
      </Routes>
      <div className='col-md-6'>

      </div>
    </div>
    </Router>
    
  );
}

export default App;
