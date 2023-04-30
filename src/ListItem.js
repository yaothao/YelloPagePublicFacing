import { Navigate, useNavigate } from 'react-router-dom';
import './ListItem.css';
import { useStateValue } from "./StateProvider";
import Tag from './Tag';

// Forms each individial block of webpages
function ListItem({ url_name, url, book_name, showcase_timestamp, timestamps, onTileClicked, onSearchTagClicked}) {
    const [state, dispatch] = useStateValue();
    // const tags = book_name.concat(year_published, category);

    const renderedBookTags = book_name.map((tag, index) => {
        return(
            <Tag 
            key={index}
            tag={tag}
            filter='book'
            onSearchTagClicked={onSearchTagClicked}
            />
        )
    });
      
    return (
        <li className='tile' style={{padding: 10, margin: 10, listStyle: 'none', background: '#ffffff', border: '1px black dotted'}}>
            <h2 style={{cursor: 'pointer'}} onClick={() => onTileClicked(url, showcase_timestamp, timestamps)} >{url_name}</h2>
            <p>{url}</p>
            <ul className='tagsList' style={{padding: 0}}>
                {renderedBookTags}
            </ul>
        </li>
    );
}

export default ListItem;