import React, { useState } from "react";
import { useStateValue } from './StateProvider';
import Helpers from "./Helpers";
import './SearchBar.css';


function SearchBar () {
    const [{tagList}, dispatch] = useStateValue();
    // const [inputValue, setInputValue] = useState('');
    
    // const handleNewTag = (tags) => {
    //   if (this.props.onNewTag) this.props.onNewTag(tags);
    //   if (this.props.onTagChange) this.props.onTagChange(tags);
    // }
  
    // const handleInputChange = ({target: { value: inputValue }}) => {
    //   inputValue = inputValue === ',' ? '' : inputValue;
    //   setInputValue({inputValue});
    // }
    
    // const handleKeyDown = (e) => {
    //   let { key, target: {value} } = e;
    //   let { tags } = tagList;
    //   switch (key) {
    //     case 'Tab':
    //       if (value) e.preventDefault();
    //     case 'Enter':
    //     case ',':
    //       value = value.trim();
    //       if (value && notDuplicate(tags, value)) {
    //         addTag(value);
    //       } else {
    //         setInputValue({inputValue: ''})
    //       }
    //       break;
        // case 'Backspace':
        //   if (!value) {
        //     handleTagDelete(tags.length - 1);
        //   }
        //   break;
    //   }
    // }
    
    const handleTagDelete = (index, filter, e) => {
    //   deleteTag(index, () => {
    //     this.props.onTagChange(this.state.tags);
    //   });
        console.log("handleTagDelete");
        dispatch({
            type: 'deleteTag',
            item: {
                filter: filter,
                index: index,
            }
        })
    }
    
    // const deleteTag = (index, callback) => {
    //   let tags = this.state.tags.slice();
      
    //   tags.splice(index, 1);
    //   this.setState({ tags }, () => {
    //     if (callback) callback();
    //   });
    // }
    
    // const notDuplicate = (tags, newTag) => {
    // //   return (!tags.includes(newTag) || this.props.allowDuplicates);
    //     return true;
    // }
    
    // const addTag = (tag) => {
    //   if (notDuplicate(tagList, tag)) {
    //     setInputValue({inputValue: ''});

    //   }
    // }
    
    // const updateControlledTags = (tags) => {
    //   if (tags && !Helpers.hasDuplicates(tags)) {
    //     this.setState({ tags }, () => {
    //       // this.props.onTagChange(tags);
    //     });
    //   }
    // }
    
    // const componentWillReceiveProps = (nextProps) => {
    //   updateControlledTags(nextProps.tags);
    // }
    
    return (
        <div className="searchbar">
            
            <div className="tagInputWrapper">     
                <TagsList 
                    tagList={tagList} 
                    onTagDelete={handleTagDelete} 
                    // hashtag={hashtag}
                />
            </div>
            <div>
            <ul className="filterType">
                <li style={{listStyle: 'none', padding: 3}}>
                    Book Name
                </li>
                <li style={{listStyle: 'none', padding: 3}}>
                    Year Published
                </li>
                <li style={{listStyle: 'none', padding: 3}}>
                    Category
                </li>
            </ul>
            </div>
    </div>
    );
}

const TagsList = ({ tagList, onTagDelete }) => {
    let list = [];
    for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].data.length > 0) {
            var current = tagList[i].data.map(( tag, index ) => (
                <DeletableTag 
                    name={tag} 
                    index={index}
                    onDelete={onTagDelete} 
                    filter={tagList[i].filter}
                />
            ));
            list.push(current);
        }  
    }
    
    return (
        <div>
            <ul name="tagsList" className="tagsList">
                {list}
            </ul>
        </div>
      
    )
  }
  
const DeletableTag = ({name, index, onDelete, filter}) => {
    return (
        <li>
        {name} 
        <a href="#" onClick={e => onDelete(index, filter, e)}>x</a>
        </li>
    );
}

export default SearchBar;