const style = (theme) => ({
  root: {
    background: 'var(--bgColor)',
    height: '70px',
    position: 'fixed',
    boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 20%)',
    top: '0',
    left: '0',
    width: '100vw',
    zIndex: '1000',
    justifyContent: 'center',
    display: 'flex',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 'bold',
    fontSize: '40px',
  },
  logo: {
    height: '50px'
  },
  fullLogo: {
    height: '10px',
  },
  separator: {
    margin: '-4px 6px 0 6px',
  },
  loginForm: {
    background: 'var(--bgColor)',
    right: '0',
    top: '0',
    position: 'fixed',
    width: '100vw',
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
  },
});

export default style