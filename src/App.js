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

  useEffect(() => {
    console.log('fetching fist page...')
    axios.get('/firstpage')
        .then(res => {
          dispatch({
            type: 'addElement',
            item: res.data,
          })
        })
        .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log('searching term from json...')
    axios.get('/search', {
      params: {
        search: searchTerm
      }}
    )
      .then(res => {
          dispatch({
            type: 'filteredId',
            item: res.data,
          })
      })
        .catch(err => console.log(err));
  }, [searchTerm]);
  

  const handleShowContent = () => {
    setHasAccpected(true);
  };

  // const PresentLayer = () => {
  //   if (frame[0]) {
  //     console.log('in frame')
  //     return(
  //       <WebFrame />
  //     )
      
  //   } else {
  //     return (
  //       <div className='searchlayer'>
  //         <SearchBar />
  //         <WebBlocks filter={tagList} />
  //       </div>
  //     )
  //   }
  // }

  return ( 
    <div className="app">
      <Homebar />
      <Routes>
          <Route path='/disclaimer' element={hasAccepted ? <Navigate replace to='/'/> : <DisclaimerAlert callback={handleShowContent}/>}/>
          <Route element={<PrivateRoute hasAccepted={hasAccepted} />}>
            <Route exact path='/' element={<Homepage />} />
            <Route path='/about' element={<About />} />
            <Route path='/webpage:id' element={<WebFrame />} />
          </Route>
      </Routes>
    </div>
  )
  
  
};

export default App;


