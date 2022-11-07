import { YMaps } from '@pbe/react-yandex-maps'
import React, { useEffect, useRef } from 'react'

const MapProvider = ({ children }) => {
	
	return (

		<YMaps query={{ lang: 'ru_RU', apikey: process.env.REACT_APP_YKEY }} >
			{children}
		</YMaps>
	)
}

export default MapProvider