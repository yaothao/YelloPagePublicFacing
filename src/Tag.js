import React from "react";
import { useStateValue } from "./StateProvider";

function Tag({ tag, filter }) {
    const [state, dispatch] = useStateValue();

    const onTagClick = (tag, filter) => {
        //console.log(tag, filter);
        dispatch({
            type: 'addTag',
            item: {
                filter: filter,
                tag: tag,
            }
        })
    }  

    return (
        <li onClick={(e) => onTagClick(tag, filter)} className="tag clickable">
            {tag}
        </li>   
    )
}

export default Tag;