import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/system';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Popover, Rating, Select, Skeleton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeSort, fetchProducts, changeCategory, fetchCategories } from '../reducers/shop';
import { addProduct, removeProduct } from '../reducers/shoppingBasket';
import { Add, Remove } from '@mui/icons-material';


const sortVariables = [
	{ sort: 'price', desc: false },
	{ sort: 'price', desc: true },
	{ sort: 'rating.rate', desc: false },
	{ sort: 'rating.rate', desc: true },
]

const IndexPage = () => {

	const dispatch = useDispatch();
	const { products, status, allCategories } = useSelector(state => state.shop)
	const { products: basketProducts } = useSelector(state => state.basket)

	useEffect(() => {
		dispatch(fetchProducts())
		dispatch(fetchCategories())
	}, [])

	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState()

	const findCount = (id) => {
		for (let item of basketProducts)
			if (item.id === id)
				return item.count
		return 0
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget.parentNode);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false)
	};

	const openPopover = Boolean(anchorEl);

	const [sort, setSort] = useState(0);
	const [category, setCategory] = useState(0)

	if (status === 'idle') return null

	return (
		<Container>
			<Grid container>
				<Grid item xl={2} lg={2} md={2}>
					<FormControl
						sx={{ mb: 2 }}
						size="small"
						fullWidth>
						<InputLabel>Сортировать</InputLabel>
						<Select
							id="cardYear"
							value={sort}
							label="Сортировать"
							name="expiryyear"
							onChange={(e) => {
								setSort(e.target.value)
								dispatch(changeSort(sortVariables[e.target.value]))
								dispatch(fetchProducts())
							}}
						>
							<MenuItem value={0} >По возрастанию цены</MenuItem>
							<MenuItem value={1} >По убыванию цены</MenuItem>
							<MenuItem value={2} >По возрастанию рейтинга</MenuItem>
							<MenuItem value={3} >По убыванию рейтинга</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						size="small"
						fullWidth>
						<InputLabel >Категория</InputLabel>
						<Select
							label="Категория"
							id="cardYear"
							value={category}
							name="expiryyear"
							onChange={(e) => {
								setCategory(e.target.value)
								dispatch(changeCategory(e.target.value))
								dispatch(fetchProducts())
							}}
						>
							<MenuItem value={0} >Все</MenuItem>
							{allCategories && allCategories.map((el, inx) => <MenuItem value={el} key={inx} >{el}</MenuItem>)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xl={10} lg={10} md={10}>
					{status === "pending" && <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<Box sx={{ flex: '1 0 25%', p: '5px' }}><Skeleton sx={{ height: '300px' }} /></Box>
						<Box sx={{ flex: '1 0 25%', p: '5px' }}><Skeleton sx={{ height: '300px' }} /></Box>
						<Box sx={{ flex: '1 0 25%', p: '5px' }}><Skeleton sx={{ height: '300px' }} /></Box>
						<Box sx={{ flex: '1 0 25%', p: '5px' }}><Skeleton sx={{ height: '300px' }} /></Box>
					</Box>}
					{status === "load" && <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
						{products && products.map(product => (
							<Box
								key={product.id}
								sx={{
									flex: '1 0 25%',
									padding: '5px'
								}}
							>
								<Paper
									sx={{
										height: '350px',
										textAlign: 'center',
										position: 'relative',
										'&:hover': {
											cursor: 'pointer'
										}
									}}
									onClick={(e) => {

										if (e.target.localName !== "button" && e.target.parentNode.localName !== "button" && e.target.parentNode.parentNode.localName !== "button") {
											setSelectedProduct(product)
											setOpen(true)
										}
									}}
								>
									<img alt="" src={product.image} style={{ maxHeight: '50%', maxWidth: '100%', paddingTop: '5%' }} />
									<Box>{product.title}</Box>
									<Box sx={{ bottom: 0, position: 'absolute' }}>
										<Rating
											name="simple-controlled"
											value={product.rating.rate}
											readOnly
										/>
										<Box>{product.price}$</Box>
									</Box>
									<Box
										sx={{ bottom: 0, right: 0, position: 'absolute' }}
									>
										{findCount(product.id) === 0 ?
											<Button
												size="small"
												onClick={(e) => {
													dispatch(addProduct(product.id))
													handleClick(e)
												}}

											>
												в корзину
											</Button> :
											<Box>
												<IconButton
													onClick={() => {
														dispatch(addProduct(product.id))
													}}
												>
													<Add />
												</IconButton>
												{findCount(product.id)}
												<IconButton
													onClick={() => {
														dispatch(removeProduct(product.id))
													}}
												>
													<Remove />
												</IconButton>

											</Box>
										}
									</Box>

								</Paper>

							</Box>
						))}

					</Box>}
				</Grid>
			</Grid>
			<Popover
				open={openPopover}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography sx={{ p: 2 }}>Товар добавлен в корзину.</Typography>
			</Popover>
			<Modal
				disableEnforceFocus
				disableAutoFocus
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '40%',
					bgcolor: 'background.paper',
					border: '2px solid #000',
					p: 4,
					textAlign: 'center'
				}}>
					<img alt="" src={selectedProduct?.image} style={{ maxHeight: '40vh', maxWidth: 'auto' }} />
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{selectedProduct?.title}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{selectedProduct?.description}
					</Typography>
					<Typography sx={{ bottom: 0, position: 'absolute', left: 0 }}>
						Price {selectedProduct?.price}$
					</Typography>
				</Box>
			</Modal>


		</Container>
	)
}

export default IndexPage