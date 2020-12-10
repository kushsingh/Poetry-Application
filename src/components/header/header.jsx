import React from 'react';

import logo from './../../images/poetry-logo.png'; 
import './header.scss';

function Header() {
	return (
		<header className="header">
			<img className="logo" src={logo} alt="Logo" />
			<span className="application-name">Morning Poets</span>
		</header>
	)
}

export default Header;