const style = (theme) => ({
  root: {
    '& section': {
      display: 'inline-flex',
      flexDirection: 'column',
      padding: '18px 0',
    },    
  },
  addItems: {
    marginBottom: theme.spacing(2),
  },
  modalContent: {

    '& button': {
      margin: theme.spacing(1)
    }
  },
  autocomplete: {
    '& .MuiAutocomplete-endAdornment': {
      top: 'calc(50% - 22px);',
    },
  }
});

export default style