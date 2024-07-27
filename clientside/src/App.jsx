import React, { Suspense,useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Website } from "./pages/Website";
import Properties from './pages/Properties/Properties';
import Property from './pages/Property/Property';
import {QueryClient,QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MantineProvider } from '@mantine/core';
import UserDetailContext from './context/UserDetailContext';



function App() {
  const queryClient=new QueryClient()
  const[userDetails,setUserDetails]=useState({
    favourites:[],
    bookings:[],
    token: null
  })

  return (
    
    
      <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
        <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Website />} />
            <Route path="/properties">
            <Route index element={<Properties/>}/> 
            <Route path=":propertyId" element={<Property/>}/>
            </Route>
            {/* Add other routes here that should be within the Layout */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    <ToastContainer/>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </MantineProvider>
    </UserDetailContext.Provider>
    
    
  );
}

export default App;
