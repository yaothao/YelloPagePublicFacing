import { Navigate, useNavigate } from 'react-router-dom';
import './ListItem.css';
import { useStateValue } from "./StateProvider";
import Tag from './Tag';

// Forms each individial block of webpages
function ListItem({ url_name, url, book_name, year_published, category}) {
    const [state, dispatch] = useStateValue();
    const navigate = useNavigate();
    
    // const tags = book_name.concat(year_published, category);
    const handleElementClick = (url) => {
        dispatch({
            type:'openurl',
            item:url,
        })
        navigate('/webpage');
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
        <li className='tile' style={{padding: 10, margin: 10, listStyle: 'none', background: '#ffffff', border: '1px black dotted'}}>
            <h2 onClick={(e) => handleElementClick(url, e)} >{url_name}</h2>
            <p>{url}</p>
            <ul className='tagsList' style={{padding: 0}}>
                {renderedBookTags}
            </ul>
        </li>
    );
}

export default ListItem;