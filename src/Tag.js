import React from "react";
import { useStateValue } from "./StateProvider";

function Tag({ tag, filter, onSearchTagClicked }) {
    const [state, dispatch] = useStateValue();

    // const onSearchTagClicked = () => {
    //     dispatch ({
    //         type: 'addSearchTerm',
    //         item: tag,
    //     })
    // }

    return (     
        <li className="tag" onClick={()=>onSearchTagClicked(tag)}>
            {tag}
        </li>
    )
}

export default Tag;