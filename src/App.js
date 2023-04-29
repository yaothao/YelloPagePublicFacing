import './App.css';
import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import Homepage from './Homepage';
import axios from 'axios';
import WebFrame from './WebFrame';
import Homebar from './Homebar';
import About from './About';
import DisclaimerAlert from './DisclaimerAlert';
import {  Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App () {
  const [{tagList, frame, searchTerm}, dispatch] = useStateValue(); 
  const [hasAccepted, setHasAccpected] = useState(localStorage.getItem('hasAccepted'));

  const loadEntirePage = () => {
    axios.get('/firstpage')
        .then(res => {
          dispatch({
            type: 'addElement',
            item: res.data,
          })
        })
        .catch(err => console.log(err));
  }

  useEffect(() => {
    console.log('fetching fist page...')
    loadEntirePage();
  }, []);
  

  const handleShowContent = () => {
    setHasAccpected(true);
  };

  const handleUpdateSearchTerm = () => {
    dispatch ({
      type: 'searchTerm',
      item: '',
    })
  }
  
  return ( 
    <div className="app">
      <Homebar handleHomePageClick={handleUpdateSearchTerm}/>
      <Routes>
          <Route path='/disclaimer' element={hasAccepted ? <Navigate replace to='/'/> : <DisclaimerAlert callback={handleShowContent}/>}/>
          <Route element={<PrivateRoute hasAccepted={hasAccepted} />}>
            <Route exact path='/' element={<Homepage loadEntirePage={loadEntirePage}/>} />
            <Route path='/about' element={<About />} />
            <Route path='/webpage' element={<WebFrame />} />
          </Route>
      </Routes>
    </div>
  )
  
  
};

export default App;


