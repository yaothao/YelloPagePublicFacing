// used for customized state value

export const initialState = {
  tagList: [
    {'filter': 'book', 'data':[]},
    {'filter': 'year', 'data':[]},
    {'filter': 'category', 'data':[]},
  ],

  element: [],

  total_tag: [],

  url: '',

  showcase_timestamp: '',

  searchTerm: '',

  filteredId: [],
};

const reducer = (state, action) => {
  console.log(action.type)
  switch(action.type) {
    // case 'addTag':
    //   var newTagList = [...state.tagList];
    //   newTagList = newTagList.map((item) => {
    //     let container = {};
    //     if (item.filter === action.item.filter && !item.data.includes(action.item.tag)) {
    //       container['filter'] = item.filter;
    //       container['data'] = [...item.data, action.item.tag];
    //     } else {
    //       container = item;
    //     }
    //     return container;
    //   });

    //   console.log(newTagList);
    // return{
    //   ...state,
    //   tagList: newTagList,
    // }
    
    // case 'deleteTag':
    //   newTagList = [...state.tagList];
    //   newTagList = newTagList.map((item) => {
    //     let container = {};
    //     if (item.filter === action.item.filter) {
    //       container['filter'] = item.filter;
    //       container['data'] = item.data.splice(action.item.index, 1);
    //     } else {
    //       container = item;
    //     }
    //     return container;
    //   });
    //   return{
    //     ...state,
    //     tagList: newTagList,
    //   }
    
    case 'addElement': 
      return{
        ...state,
        element: action.item,
      }
    
    case 'openurl':
      return{
        ...state,
        url: action.item.url,
        showcase_timestamp: action.item.showcase_timestamp,
      }
    
    case 'searchTerm':
      return {
        ...state,
        searchTerm: action.item
      }
    
    case 'filteredId':
      return {
        ...state,
        filteredId: action.item
      }

    default:
      return state;
  }
      
};

export default reducer;