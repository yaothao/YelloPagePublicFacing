import React, { useEffect, useRef, useState } from "react";
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';
import './Homepage.css';

function Homepage({ loadEntirePage }) {
  const [searchTag, setSearchTag] = useState('');

  const handleSearchTag = (tag) => {
    setSearchTag(tag);
  }
  
    return (
        <div className='searchlayer'>
          <SearchBar loadEntirePage={loadEntirePage} searchTag={searchTag} handleSearchTag={handleSearchTag} />
          <WebBlocks handleSearchTag={handleSearchTag}/>
        </div>
      )
}

export default Homepage;