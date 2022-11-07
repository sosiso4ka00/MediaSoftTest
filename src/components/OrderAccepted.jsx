import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'

const OrderAccepted = () => {
	const orderData = useSelector(state => state.order)
	const products = useSelector(state => state.basket.products)
	const address = useSelector(state => state.map.address)

	return (
		<Box>
			<Box component="h3" >Заказ отправлен на обработку</Box>
			<Box>Фамилия: {orderData.lastName}</Box>
			<Box>Имя: {orderData.name}</Box>
			<Box>Адресс: {address}</Box>
		</Box>
	)
}

export default OrderAccepted