import { Button, Container, Modal, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Card from '../components/Card'
import MapProvider from '../components/map/MapProvider'
import Location from '../components/map/Location'
import AddressField from '../components/map/AddressField'

import { setOrderData } from '../reducers/order'
import OrderAccepted from '../components/OrderAccepted'

const OrderPage = () => {
	const [step, setStep] = useState(0)
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch()

	const handleOrderChanges = (fieldName, e) => {
		dispatch(setOrderData({ field: fieldName, value: e.target.value }))
	}

	const handleClose = () => {
		setOpen(false)
	};

	return (
		<Container sx={{ textAlign: 'center' }}>
			<Stepper activeStep={step}>
				<Step>
					<StepLabel>Информация о покупателе</StepLabel>
				</Step>
				<Step>
					<StepLabel>Банковская карта</StepLabel>
				</Step>
				<Step>
					<StepLabel>Адрес</StepLabel>
				</Step>
			</Stepper>

			{step === 0 && <Box>
				<Paper sx={{ mt: 2 }}>
					<Box component="h3" >ФИО</Box>
					<TextField onChange={e => handleOrderChanges("name", e)} sx={{ m: 1 }} label="Имя" size="small" />
					<TextField onChange={e => handleOrderChanges("lastName", e)} sx={{ m: 1 }} label="Фамилия" size="small" />
					<Box component="h3" >Контакты</Box>
					<TextField onChange={e => handleOrderChanges("phone", e)} sx={{ m: 1 }} label="Номер телефона" size="small" />
					<TextField onChange={e => handleOrderChanges("email", e)} sx={{ m: 1 }} label="email" size="small" />
				</Paper>
			</Box>}

			{step === 1 && <Box sx={{ mt: 2 }}>
				<Paper>
					<Card />
				</Paper>
			</Box>}

			{step === 2 && <Box sx={{ mt: 2 }}>
				<MapProvider>
					<Location state={{
						center: [54.314194, 48.403131],
						zoom: 14,
					}} />
					<AddressField />
				</MapProvider>
			</Box>}


			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button
					color="inherit"
					disabled={step === 0}
					onClick={() => {
						setStep((prevActiveStep) => prevActiveStep - 1);
					}}
					sx={{ mr: 1 }}
				>
					Назад
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				{step < 2 ? <Button onClick={() => {
					setStep((prevActiveStep) => prevActiveStep + 1);
				}}>
					Дальше
				</Button> :
					<Box>
						<Button onClick={() => {
							setOpen(true)
						}}>
							Отправить
						</Button>
					</Box>
				}
			</Box>
			<Modal
				disableEnforceFocus
				disableAutoFocus
				open={open}
				onClose={handleClose}
			>
				<Box sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '25%',
					bgcolor: 'background.paper',
					border: '2px solid #000',
					p: 4,
					textAlign: 'center'
				}}>
					<OrderAccepted />
				</Box>
			</Modal>
		</Container>
	)
}

export default OrderPage