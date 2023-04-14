import React from "react";
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';

function Homepage() {
    return (
        <div className='searchlayer'>
          <SearchBar />
          <WebBlocks />
        </div>
      )
}

export default Homepage;