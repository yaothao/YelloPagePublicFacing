import React, { useEffect } from "react";
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';
import { useStateValue } from "./StateProvider";

function Homepage({ loadEntirePage }) {
    return (
        <div className='searchlayer'>
          <SearchBar loadEntirePage={loadEntirePage}/>
          <WebBlocks />
        </div>
      )
}

export default Homepage;