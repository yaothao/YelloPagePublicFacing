import React from "react";
import Helpers from "./Helpers";
import ListItem from "./ListItem";
import './WebBlocks.css';
import { useStateValue } from "./StateProvider";

// const projects = [
//     {
//       url: 'https://web.archive.org/web/19990508051230id_/http://www.tigtail.org/tvm/x1/baroque-spanish.html',
//       book: ['hello'],
//       year: ['2000','1999'],
//       category: ['spanish'],
//     },
//     {
//       url: 'https://web.archive.org/web/19970418065020id_/http://www.greenworld.com.tw/marry/index.htm',
//       book: ['nihao'],
//       year: ['1999'],
//       category: ['Traditional Chinese'],
//     },
//     {
//       url: 'https://web.archive.org/web/19980131103745id_/http://www.gznet.com/card/index1.htm',
//       book: ['hello'],
//       year: ['2000'],
//       category: ['Simplified Chinese'],
//     }
//   ]

function WebBlocks() {
    const [{tagList, element}] = useStateValue();

    let filtered = element.filter(item => Helpers.contains(item.book_name, item.year_published, item.category, tagList));

    let renderedItems = filtered.map(({ url, book_name, year_published, category }, index) => {
      return (
        <ListItem
          url={url}
          book_name={book_name}
          year_published={year_published}
          category={category}
        />
      );
    });
    
    return (
      <div>
        <ul className="webblocks">
          {renderedItems}
        </ul>
      </div>
    );
};

export default WebBlocks;