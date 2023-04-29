import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';
import './Homepage.css';

function Homepage({ loadEntirePage }) {
  const [searchTag, setSearchTag] = useState('');
  const [openUrl, setOpenUrl] = useState(false);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleSearchTag = (tag) => {
    setSearchTag(tag);
  }

  const handleTileClicked = (url, showcase_timestamp) => {
    dispatch({
      type:'openurl',
      item:{url:url,showcase_timestamp:showcase_timestamp}
    })
    setOpenUrl(true);
  };

  useEffect(() => {
    console.log("in homepage checking url", openUrl)
    if (openUrl) {
      navigate('/webpage');
    }
  }, [openUrl])

  return (
    <div className='main-page'>
        <SearchBar loadEntirePage={loadEntirePage} searchTag={searchTag} handleSearchTag={handleSearchTag} />
        <WebBlocks handleSearchTag={handleSearchTag} onTileClicked={handleTileClicked}/>
    </div>
  )
}

export default Homepage;