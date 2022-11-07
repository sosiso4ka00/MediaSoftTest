import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const IndexLayout = ({ children }) => {
	return (
		<Container>
			<NavBar />
			<Box sx={{mt: 2}}>
				<Outlet/>
			</Box>
		</Container>
	)
}

export default IndexLayout