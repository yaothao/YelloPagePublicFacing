import './App.css';
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import SearchBar from './SearchBar';
import WebBlocks from './WebBlocks';
import axios from 'axios';
import WebFrame from './WebFrame';

function App () {
  
  const [{tagList, element, frame}, dispatch] = useStateValue(); 

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

  // const handleRenderLayer = () => {
  //   switch(this.state.filter) {
  //     case 'book':
  //       return (
  //           <div className="category-menu">
  //                 <div onClick={() => this.setState({filter: null})}>Go Back</div>
  //                 <div onClick={() => this.setState({filter: 'url_list', detail: 'bookid'})}>全球中文网址速查手册（2000）</div>
  //                 <div>2002因特网黄页网址簿</div>
  //                 <div>全球中文网址速查手册（1999）</div>
  //                 <div>2001因特网黄页网址簿</div>
  //                 <div>Internet 全中文网址簿</div>
  //                 <div>Harley Hahn's Internet and Web Yellow Pages, Millennium Edition</div>
  //                 <div>Que's Official Internet Yellow Pages 2001 Edition</div>
  //           </div>
  //       ); 
  //     case 'url_list':
  //       return (
  //         <div className= "category-menu">
  //           <ul>
  //             <li onClick={() => this.setState({filter: 'selected', openurl: true, url: 'https://web.archive.org/web/19990508051230id_/http://www.tigtail.org/tvm/x1/baroque-spanish.html'})}>Tigertail Virtual Museum</li>
  //           </ul>
  //         </div>
  //       )
  //     case 'selected':
  //       return (
  //         <div className="category-menu">
  //           <p>
  //             Title: <br></br>
  //             Language: <br></br>
  //             Book Included: <br></br>
  //           </p>

  //           <div onClick={() => this.setState({filter: null, openurl: false})}>
  //             Go Back
  //           </div>
  //         </div>
  //       ) 

  //     default:
  //       return (
  //           <div className="category-menu">
  //                 {/* <h3>Please select a filter group</h3>
  //                 <div onClick={() => this.setState({filter: "book"})}>Book</div>
  //                 <div onClick={() => this.setState({filter: "category"})}>Category</div>
  //                 <div onClick={() => this.setState({filter: "date"})}>Date</div> */}
                  
  //           </div>

  //       );
  //   }
  // }

  // const handlePresentLayer = (url) => {
  //   console.log(url)
  //   this.setState({url:url, openurl:true})
      
  // }

  // const handleTagChange = () => {

  //   console.log("delete")
  // }
  
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
          <WebBlocks filter={tagList}/>
        </div> 
      )
    }
  }

  return (
    <div className="app">
      {presentLayer()}
    </div>
  )
  
  
};

export default App;


