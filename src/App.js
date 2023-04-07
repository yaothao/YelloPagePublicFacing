import './App.css';
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';
import axios from 'axios';
import WebFrame from './WebFrame';
import Homebar from './Homebar';

function App () {
  
  const [{tagList, frame}, dispatch] = useStateValue(); 

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

  const presentLayer = () => {
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
          {/* {!button && <button className='image_load' onClick={(e) => loadImage()}>Check out this ads page</button>} */}
          {/* {button && <LazyImageFolder dir={"../src/ads_img"} onCloseLazyImage={onCloseLazyImage}/>} */}
        </div>
      )
    }
  }

  return (
    <div className="app">
      <Homebar />
      {presentLayer()}
      {/* <Stream /> */}
    </div>
  )
  
  
};

export default App;


