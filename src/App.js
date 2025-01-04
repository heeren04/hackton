import './App.css';
import Home from './components/screens/screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/screens/screens/Login';
import Tracking from './components/screens/screens/Tracking';
import Utilization from './components/screens/screens/Utilization';
import Automation from './components/screens/screens/Automation';

import HassleFree from './components/screens/screens/Hasslefree';
import Billing from './components/screens/screens/billing';
import Retention from './components/screens/screens/Retension';
import Admin from './components/screens/screens/Admin';
import Manager from './components/screens/screens/Manager';
import Staff from './components/screens/screens/Staff';
import ProductManagement from './components/screens/screens/ProductManagement';
import SupplierManagement from './components/screens/screens/SupplierManagement';


function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/product" element={<ProductManagement/>}/>
          <Route exact path="/hasslefree-management" element={<HassleFree/>}/>
          <Route exact path="/billing" element={<Billing/>}/>
          <Route exact path="/retension-strategies" element={<Retention/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/manager" element={<Manager/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/suppliermanagement" element={<SupplierManagement/>}/>
          
         
          
          </Routes>
      </div>
      <div ></div>
    </Router>
    
  );
}

export default App;
