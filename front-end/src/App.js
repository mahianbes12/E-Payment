import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Admin/AdminLogin.js';
import AgentsList from './pages/Admin/AgentsList.js';
import ServiceProvidersList from './pages/Admin/ServiceList.js';
import UsersList from './pages/Admin/AdminsList.js';
import ServiceProviderRegistrationForm from './pages/Admin/ServiceProvidersRegistration.js';
import AdminRegistrationForm from './pages/Admin/AdminRegistration.js';
import AgentRegistrationForm from './pages/Admin/AgentRegistration.js';
import PaymentList from './pages/Admin/Transactions.js';
import HomePage from './pages/home.js';
import Home from './pages/Admin/index.js';
import AdminsList from './pages/Admin/AdminsList.js';
import UserLogin from './pages/userLogin.js';
import RegistrationForm from './pages/userRegistration.js';
import ServiceProvidersDetails from './pages/chooseServiceProvider.js';
import Payment from './pages/payment.js';
import ServiceNumber from './pages/serviceNumber.js';
import ResetPasswordForm from './pages/resetPassword.js';
import UpdatePassword from './pages/updatePassword.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        
      <Route path="/users" element={<HomePage />} />
      <Route path="/login" element={<UserLogin/>}/>
      <Route path="/signup" element={<RegistrationForm/>}/>
      <Route path='/serviceProviders' element={<ServiceProvidersDetails/>}/>
      <Route path='/serviceNumber' element={<ServiceNumber/>}/>
      <Route path='/payment' element={<Payment/>}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/:adminId"
          element={<Home />}
        />
        <Route
          path="/Users/resetpassword"
          element={<ResetPasswordForm />}
        />
        <Route path="/Users/UpdatePassword" component={UpdatePassword}  
          element={<UpdatePassword />}
        />
        <Route 
        path="/admin/agents/:adminId"
        element= {<AgentsList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/agents/registration/:adminId"
        element= {<AgentRegistrationForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/service-providers/:adminId"
        element= {<ServiceProvidersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route 
        path="/admin/usersList/:adminId"
        element= {<UsersList   />}
        />
        <Route 
        path="/admin/adminsList/:adminId"
        element= {<AdminsList   />}
        />
        <Route 
        path="/admin/service-providers/registration/:adminId"
        element= {<ServiceProviderRegistrationForm />}
        />
        <Route 
        path="/admin/user/registration/:adminId"
        element= {<AdminRegistrationForm />}
        />
        <Route 
        path="/admin/transactions/:adminId"
        element= {<PaymentList />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;