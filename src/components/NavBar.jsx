import { Badge, Container, IconButton } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
	const basketCount = useSelector(state => state.basket.count)
	return (
		<Container style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Link to="/">
				<IconButton><HomeIcon /></IconButton>
			</Link>
			<Link to="/cart">
				<IconButton>
					<Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={basketCount} color="secondary">
						<ShoppingBasketIcon />
					</Badge>
				</IconButton>
			</Link>
		</Container>
	)
}

export default NavBar