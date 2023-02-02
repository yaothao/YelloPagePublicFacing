class Helpers {
    static contains(orgBook, orgYear, orgCategory, filter) {
      // console.log("I am here");
      let res = filter.map(item => {
        switch(item.filter) {
          case 'book':
            let bookFilter = item.data.map(d => {
              return orgBook.includes(d);
            })
            // console.log("bookFilter", bookFilter);
            return !bookFilter.includes(false);
          case 'year':
            let yearFilter = item.data.map(d => {
              return orgYear.includes(d);
            })
            // console.log("yearFilter", yearFilter);
            return !yearFilter.includes(false);
          case 'category':
            let categoryFilter = item.data.map(d => {
              return orgCategory.includes(d);
            })
            // console.log("categoryFilter", categoryFilter);
            return !categoryFilter.includes(false);
          default:
            return true;
        }
      });
      // console.log(orgBook, orgYear, orgCategory, !res.includes(false));
      return !res.includes(false);
    }
    
    static hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
    }
}

export default Helpers;