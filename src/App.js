import './App.css';
import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';
import axios from 'axios';
import WebFrame from './WebFrame';
import Homebar from './Homebar';
import About from './About';

function App () {
  const [showContent, setShowContent] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [{tagList, frame, searchTerm}, dispatch] = useStateValue(); 

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

  useEffect(() => {
    const hasAccepted = localStorage.getItem('hasAccepted');

    if (hasAccepted) {
      handleShowContent()
    }
  }, []);
  

  const handleShowContent = () => {
    setShowContent(true);
  };

  const handleAccept = (callback) => {
    localStorage.setItem('hasAccepted','true');
    callback();
  }

  const handleAboutClicked = () => {
    setShowAbout(true);
  };

  const handleAboutBack = () => {
    setShowAbout(false);
  }

  const DisclaimerAlert = ({ handleShowContent }) => {
    return (
        <div className="disclaimer-alert">
          <h1>Disclaimer</h1>
          <p>This is a disclaimer message. Please read and accept to continue.</p>
          <button onClick={() => handleAccept(handleShowContent)}>Accept</button>
        </div>
      )
  };

  const PresentLayer = () => {
    if (frame[0]) {
      console.log('in frame')
      return(
        <WebFrame />
      )
      
    } else {
      return (
        <div className='searchlayer'>
          <SearchBar />
          <WebBlocks filter={tagList} />
        </div>
      )
    }
  }

  return (
    <div className="app">
      <Homebar handleAboutClicked={handleAboutClicked}/>
      {showAbout && <About backBotton={handleAboutBack}/>}
      {!showContent && !showAbout && <DisclaimerAlert handleShowContent={handleShowContent}/>}
      {showContent && !showAbout && <PresentLayer />}
      {/* <Stream /> */}
    </div>
  )
  
  
};

export default App;


