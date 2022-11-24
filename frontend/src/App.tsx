
import React, { useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Appointment from './pages/Appointment';
import AppointmentDetail from './pages/AppointmentDetail';
import AllAppointments from './pages/AllAppointments';
import Logout from '../src/pages/Logout';
import CreateService from './pages/CreateService';
import Ourservices from './pages/Ourservices';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from './contexts/AuthContext';



function App() {

  const queryClient = new QueryClient();
  //@ts-ignore
  const { auth } = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient} >

      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"login"} element={auth ? <Appointment /> : <LogIn />} />
          <Route path={"register"} element={auth ? <Appointment /> : <Register />} />
          <Route path={"contact"} element={<Contact />} />
          <Route path={"about"} element={<About />} />
          <Route path={"ourservices"} element={<Ourservices />} />
          <Route path={"appointment"} element={auth ? <Appointment /> : <LogIn />} />
          <Route path={"appointment-detail/:id"} element={auth ? <AppointmentDetail /> : <LogIn />} />
          <Route path={"all-appointments"} element={auth ? <AllAppointments /> : <LogIn />} />
          <Route path={"create-service"} element={auth ? <CreateService /> : <LogIn />} />
          <Route path={"logout"} element={auth ? <Logout /> : <Home />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={5000} />

    </QueryClientProvider>
  )
}

export default App
