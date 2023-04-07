import React, { useState } from "react";
import './SearchBar.css';


function SearchBar () {
    const [searchTerm, setSearchTerm] = useState('');

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
    // const handleTagDelete = (index, filter, e) => {
    // //   deleteTag(index, () => {
    // //     this.props.onTagChange(this.state.tags);
    // //   });
    //     console.log("handleTagDelete");
    //     dispatch({
    //         type: 'deleteTag',
    //         item: {
    //             filter: filter,
    //             index: index,
    //         }
    //     })
    // }
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
    // const renderBookTags = (book_name) => {
    //     const book_tag_list = book_name?.map((tag, index) => {
    //         return(
    //             <Tag 
    //                 key={index}
    //                 tag={tag}
    //                 filter='book'
    //             /> 
    //             )
            
    //     })
    //     return book_tag_list
    // }
    // const renderYearTags = (year_name) => {
    //     const year_tag_list = year_name?.map((tag, index) => {
    //         return(
    //             <Tag 
    //                 key={index}
    //                 tag={tag}
    //                 filter='year'
    //             /> 
    //             )
            
    //     })
    //     return year_tag_list
    // }
    // const renderCategoryTags = (category_name) => {
    //     const category_tag_list = category_name?.map((tag, index) => {
    //         return(
    //             <Tag 
    //                 key={index}
    //                 tag={tag}
    //                 filter='category'
    //             /> 
    //             )
            
    //     })
    //     return category_tag_list
    // }

    const handleSearch = () => {
        try {
        //   const response = await axios.get(`/api/search?query=${searchTerm}`);
        //   setResults(response.data);
           console.log({searchTerm}); 
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className="searchbar">
            
            <div className="tagInputWrapper"> 
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>    
                {/* <TagsList 
                    tagList={tagList} 
                    onTagDelete={handleTagDelete} 
                    // hashtag={hashtag}
                /> */}
            </div>
            {/* <div>
                <ul className="filterType">
                    <li style={{listStyle: 'none', padding: 3}}>
                        <div className="type-title">
                            Book Name:
                        </div>
                        <div className="tags-list">
                            {renderBookTags(total_tag[0])}
                        </div>
                        
                    </li>
                    <li style={{listStyle: 'none', padding: 3}}>
                        <div className="type-title">
                            Year Published:
                        </div>
                        <div className="tags-list">
                            {renderYearTags(total_tag[1])}
                        </div>
                    </li>
                    <li style={{listStyle: 'none', padding: 3}}>
                        <div className="type-title">
                            Category:
                        </div>
                        <div className="tags-list">
                            {renderCategoryTags(total_tag[2])}
                        </div>
                    </li>
                </ul>
            </div> */}
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