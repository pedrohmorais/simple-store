const style = (theme) => ({
  root: {
    '& section': {
      display: 'inline-flex',
      flexDirection: 'column',
      padding: '18px 0',
    },

    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  productCard: {
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '120px',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
  },
  searchForm: {
    margin: '12px 0 24px',
  }
  
});

export default style