// used for customized state value

export const initialState = {
    tagList: [
      {'filter': 'book', 'data':[]},
      {'filter': 'year', 'data':[]},
      {'filter': 'category', 'data':[]},
    ],

    element: [],

    total_tag: [],

    frame: '',

    searchTerm: '',

    filteredId: [],
  };
  
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
        
        // var book_data = new Set()
        // var year_data = new Set()
        // var category_data = new Set()

        // action.item.forEach(element => {
        //   book_data.add(...element.book_name)
        //   year_data.add(...element.year_published)
        //   category_data.add(...element.category)
        // });

        // var new_total_tag = []
        // new_total_tag[0] = [...book_data]
        // new_total_tag[1] = [...year_data]
        // new_total_tag[2] = [...category_data]
        
        return{
          ...state,
          element: action.item,
        }
      
      case 'openurl':
        return{
          ...state,
          frame:'https://web.archive.org/web/2000id_/' + action.item,
        }
      
      case 'closeurl':
        return {
          ...state,
          frame: [false, '']
        }
      
      case 'searchTerm':
        return {
          ...state,
          searchTerm: action.item
        }

      case 'addSearchTerm':
          return {
            ...state,
            searchTerm: state.searchTerm + "\"" + action.item + "\"",
          }
      
      case 'filteredId':
        console.log(action.item);
        return {
          ...state,
          filteredId: action.item
        }

      default:
        return state;
    }
        
  };
  
  export default reducer;