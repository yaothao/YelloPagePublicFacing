import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import axios from 'axios';
import './SearchBar.css';


function SearchBar ({ loadEntirePage }) {
    const [{searchTerm}, dispatch] = useStateValue('');
    const [inputValue, setInputValue] = useState(searchTerm);

    useEffect(() => {
        if (inputValue === '') {
            loadEntirePage();
        }
    }, [inputValue])

    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm])
    
    const handleSearch = () => {
        try {
            axios.get('/search', {
                params: {
                  term: inputValue
                }}
            )
            .then(res => {
                dispatch({
                    type: 'addElement',
                    item: res.data,
                })
            })
            .catch(err => console.log(err));
        } catch (error) {
          console.error(error);
        }
    };

    const handleUpdateSearchTerm = () => {
        dispatch ({
            type: 'searchTerm',
            item: inputValue,
        })
    }

    const handleInputChange = (value) => {
        if (value === '') {
            dispatch ({
                type: 'searchTerm',
                item: '',
            })
        }
        setInputValue(value);
    }

    const handleKeyDown = (e) => {
        let { key, target: {value} } = e;
        switch (key) {
          case 'Tab':
            if (value) e.preventDefault();
            break;
          case 'Enter':
            value = value.replace(',',' ').trim();
            if (value) {
                handleUpdateSearchTerm();
                handleSearch();
            } else {
                setInputValue('');
            }
            break;
        } 
    }

    return (
        <div className="searchbar">
            <div className="tagInputWrapper" onKeyDown={handleKeyDown}>
                {/* <p>{searchTerm != '' ? searchTerm : ''}</p> */}
                <input
                    type="text"
                    className="input"
                    placeholder='Search...'
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {/* <button onClick={handleSearch}>Search</button>     */}
                
            </div>
        </div>
    );
}

// const TagsList = ({ tagList, onTagDelete }) => {
//     let list = [];
//     for (let i = 0; i < tagList.length; i++) {
//         if (tagList[i].data.length > 0) {
//             var current = tagList[i].data.map(( tag, index ) => (
//                 <DeletableTag 
//                     name={tag} 
//                     key={index}
//                     onDelete={onTagDelete} 
//                     filter={tagList[i].filter}
//                 />
//             ));
//             list.push(current);
//         }  
// }
    
//     return (
//             <ul className="tagsList">
//                 {list}
//             </ul>
      
//     )
// }
  
// const DeletableTag = ({name, index, onDelete, filter}) => {
//     return (
//         <li>
//             {name} 
//             <a href="#" onClick={e => onDelete(index, filter, e)}>x</a>
//         </li>
//     );
// }

export default SearchBar;