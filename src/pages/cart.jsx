import { Add, Remove } from '@mui/icons-material'
import { Button, Container, Grid, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct, removeAllProduct, removeProduct, updateProducts } from '../reducers/shoppingBasket'

const CartPage = () => {

	const products = useSelector(state => state.basket.products)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateProducts())
	}, [])

	return (
		<Container>
			<Grid container>
				<Grid item xl={9} lg={9} md={9}>
					{products.map(product => {
						return <Paper key={product.id} sx={{ mb: 2, display: 'flex', position: 'relative' }}>
							<img alt="" src={product.image} style={{ width: '120px', margin: 'auto 0' }} />
							<Box sx={{ ml: 4, width: '60%' }}>
								<Box component="h4">{product.title}</Box>
								<Box sx={{ overflow: 'auto' }}>{product.description}</Box>
							</Box>
							<Box sx={{ right: 0, position: 'absolute' }}>
								<Box sx={{}}>
									<IconButton
										onClick={() => {
											dispatch(addProduct(product.id))
										}}
									>
										<Add />
									</IconButton>
									{product.count}
									<IconButton
										onClick={() => {
											dispatch(removeProduct(product.id))
										}}
									>
										<Remove />
									</IconButton>

								</Box>
								<Box>
									<Button size="small" onClick={() => {
										dispatch(removeAllProduct(product.id))
									}}>удалить</Button>
								</Box>
							</Box>
							<Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
								Price {product.price}$
							</Box>
						</Paper>
					})}
				</Grid>
				<Grid item xl={3} lg={3} md={3} sx={{ pl: 4 }}>
					<Paper sx={{ width: '100%', height: '20vh', position: 'relative' }}>
						<Box component="h4" sx={{ m: 0 }}>Условия заказа</Box>
						<Box sx={{ position: 'absolute', bottom: 0 }}>
							<Box>
								Итого:
							</Box>
							<Box>
								{products.reduce((acc, el) => acc + el.price, 0)}$
							</Box>
						</Box>
						<Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
							<Link to="/order">
								<Button size="small">
									оформить заказ
								</Button>
							</Link>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CartPage