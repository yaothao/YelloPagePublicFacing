import React from "react";
import { useStateValue } from "./StateProvider";

function Tag({ tag, filter }) {
    const [state, dispatch] = useStateValue();

    const handleTagClick = () => {
        dispatch ({
            type: 'addSearchTerm',
            item: tag,
        })
    }
    return (     
        <li className="tag" onClick={handleTagClick}>
            {tag}
        </li>
    )
}

export default Tag;