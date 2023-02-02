export const initialState = {
    tagList: [
      {'filter': 'book', 'data':[]},
      {'filter': 'year', 'data':[]},
      {'filter': 'category', 'data':[]},
    ],

    element: [],

    frame: [false,''],
  };
  
  // Selector
  export const generate = (category) => 
   category?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log(action.type)
    switch(action.type) {
      case 'addTag':
        var newTagList = [...state.tagList];
        newTagList = newTagList.map((item) => {
          let container = {};
          if (item.filter === action.item.filter && !item.data.includes(action.item.tag)) {
            container['filter'] = item.filter;
            container['data'] = [...item.data, action.item.tag];
          } else {
            container = item;
          }
          return container;
        });

        console.log(newTagList);
      return{
        ...state,
        tagList: newTagList,
      }
      
      case 'deleteTag':
        newTagList = [...state.tagList];
        newTagList = newTagList.map((item) => {
          let container = {};
          if (item.filter === action.item.filter) {
            container['filter'] = item.filter;
            container['data'] = item.data.splice(action.item.index, 1);
          } else {
            container = item;
          }
          return container;
        });
        return{
          ...state,
          tagList: newTagList,
        }
      
      case 'addElement': 
        return{
          ...state,
          element: action.item,
        }
      
      case 'openurl':
        return{
          ...state,
          frame:[true, 'https://web.archive.org/web/1999id_/' + action.item]
        }
      
      case 'closeurl':
        return {
          ...state,
          frame: [false, '']
        }

      default:
        return state;
    }
        
  };
  
  export default reducer;