import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import React from 'react'
import style from './style'


const Footer = ({ classes }) => {
	return (
		<footer className={`${classes.root}`}>
			<Container>
				#nomeComercio
			</Container>
		</footer>
	)
}
	
	export default withStyles(style)(Footer)