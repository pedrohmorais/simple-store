import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import React, { useContext } from 'react';
import style from './style';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import { useState } from 'react';

const Header = (props) => {
	const { classes, session } = props;
	console.log(session);
	const [logged, setLogged] = useState(!!session);
	const [showLogin, setShowLogin] = useState(false);

	const handleLogin = () => {
		const newUser = {};

		newUser.name = document.getElementById('loginNameField')?.value || null;
		newUser.email = document.getElementById('loginEmailField')?.value || null;
		newUser.password = document.getElementById('loginPasswordField')?.value || null;
		newUser.permissionLevel = 2;

		if (!newUser.name || !newUser.email || !newUser.password) {
			alert('Por favor preencha todos os campos.');
			return;
		}

		jsCookie.set('auth', JSON.stringify(newUser));
		setLogged(true);
		window.location.reload();
	}

	const logout = () => {
		jsCookie.set('auth', JSON.stringify(null));
		setLogged(false);
		window.location.reload();
	}

	const renderLoginForm = () => {
		if (!showLogin) {
			return;
		}
		return (
			<div className={classes.loginForm}>
				<Container  component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Entrar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="loginNameField"
							label="Seu nome"
							name="name"
							autoComplete="name"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="loginEmailField"
							label="Email"
							name="email"
							autoComplete="email"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="loginPasswordField"
							name="password"
							label="Senha"
							type="password"
							autoComplete="current-password"
						/>
						<Button
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => handleLogin()}
						>
							Login
						</Button>
						<Button
							type="button"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
							style={{ margin: '8px 0'}}
							onClick={() => setShowLogin(false)}
						>
							Voltar
						</Button>
					</div>
				</Container>
			</div>
		)
	}

	const renderAdminMenu = () => {
		if (!logged || !session || session.permissionLevel !== 1) {
			return null;
		}
		return (
			<>
				<Link href="/cadastro/produtos">
					<Button>
						Produtos
					</Button>
				</Link>
				<Link href="/cadastro/estoque">
					<Button>
						Estoque
					</Button>
				</Link>
			</>
		)
	}

	return (
		<header className={classes.root}>
			<Container className={classes.container}>
				<Link href="/">
					<Grid item xs={6} className={classes.logoContainer}>
						<img className={classes.logo} src="/img/groceries.png" alt="Loja de frutas logo" />
						<span className={classes.separator}>|</span>
						<span>LOJA DE FRUTAS</span>
					</Grid>
				</Link>
				<Grid item xs={6} style={{ justifyContent: 'flex-end', display: 'flex' }}>
					{renderAdminMenu()}
					{logged && <Button onClick={() => logout()}>
						Logout
					</Button>}
					{!logged && <Button id="loginHeaderButton" onClick={() => setShowLogin(true)}>
						Login
					</Button>}
					{renderLoginForm()}
				</Grid>
			</Container>
		</header>
	)
}
	
	export default withStyles(style)(Header)