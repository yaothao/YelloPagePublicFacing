import './ListItem.css';
import { useStateValue } from "./StateProvider";
import Tag from './Tag';

// Forms each individial block of webpages
function ListItem({ url_name, url, book_name, year_published, category}) {
    const [state, dispatch] = useStateValue();
    // const tags = book_name.concat(year_published, category);
    const handleElementClick = (url) => {
        dispatch({
            type: 'openurl',
            item: url,
        })
    }
    const renderedBookTags = book_name.map((tag, index) => {
        return(
            <Tag 
            key={index}
            tag={tag}
            filter='book'
            />
        )
    });
    const renderedYearTags = year_published.map((tag, index) => {
        return(
            <Tag 
            key={index}
            tag={tag}
            filter='year'
            />
        )
    });

    const renderedCategoryTags = category.map((tag, index) => {
        return(
            <Tag 
            key={index}
            tag={tag}
            filter='category'
            />
        )
    });
      
    return (
        <li style={{padding: 10, margin: 10, listStyle: 'none', background: '#efefef', borderRadius: '10px', boxShadow: '1px 1px 5px #aaa'}}>
            <h2 onClick={(e) => handleElementClick(url, e)} style={{color: 'black'}} >{url_name}</h2>
            <ul className='tagsList' style={{padding: 0}}>{renderedBookTags}{renderedYearTags}{renderedCategoryTags}</ul>
        </li>
    );
}

export default ListItem;