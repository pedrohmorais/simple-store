const style = (theme) => ({
  root: {
    background: 'var(--bgColor)',
    height: '50px',
    position: 'fixed',
    boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 20%)',
    top: '0',
    left: '0',
    width: '100vw',
    zIndex: '1000',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px'
  },
  fullLogo: {
    height: '10px',
  },
});

export default style