import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import React, { useContext } from 'react'
import style from './style'
import BrandContext from '../../contexts/brandContext';
import { useSession } from 'next-auth/client'

const Header = (props) => {
	const [ session, loading ] = useSession()
	console.log(session);
	const { classes } = props;
	const myBrand = useContext(BrandContext);
	return (
		<header className={classes.root}>
			<Container className={classes.container}>
				{/* <img className={classes.logo} src="/img/warzone-metas-logo.jpg" alt="Warzone Metas logo" />
				<span className={classes.separator}>|</span>
				<img className={classes.fullLogo} src="/img/warzone-metas-full-logo.png" alt="Warzone Metas full logo" /> */}
				<span>{myBrand.brandName}</span>
			</Container>
		</header>
	)
}
	
	export default withStyles(style)(Header)