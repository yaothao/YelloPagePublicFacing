import React from "react";

function Tag({ tag, filter }) {
    return (     
        <li className="tag clickable">
            {tag}
        </li>
    )
}

export default Tag;