import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import AuthContextProvider from './context/AuthContex';
import DataContextProvider from './context/DataContext';
import { PrivateRoute } from './components/protected/PrivateRoute';
import Dashboard from './components/protected/Dashboard';
import Branches from './components/protected/branches/Branches';
import Events from  './components/protected/events/Events'
import Members from './components/protected/members/Members'
import Users from './components/protected/users/Users';
import Donations from './components/protected/donations/Donations'
import NewDonation from './components/protected/donations/NewDonation'
import Results from './components/protected/results/Results';
import ExportMembers from './components/protected/members/ExportMembers';

const App = () => {
    return (
      <div className='bg-white text-gray-800 dark:bg-[#141e31] dark:text-gray-400'>
        <AuthContextProvider>
          <DataContextProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<AboutUs />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route exact path='/branches' element={<PrivateRoute><Branches /></PrivateRoute>} />
                <Route exact path='/events' element={<PrivateRoute><Events /></PrivateRoute>} />
                <Route exact path='/members' element={<PrivateRoute><Members /></PrivateRoute>} />
                <Route exact path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
                <Route exact path='/donations' element={<PrivateRoute><Donations /></PrivateRoute>} />
                <Route exact path='/new-donation' element={<PrivateRoute><NewDonation /></PrivateRoute>} />
                <Route exact path='/results' element={<PrivateRoute><Results /></PrivateRoute>} />
                <Route exact path='/import-donations' element={<PrivateRoute><ExportMembers /></PrivateRoute>} />
              </Routes>
            </Router>
          </DataContextProvider>
        </AuthContextProvider> 
      </div>
    )
}

export default App
