import { useSelector } from "react-redux"

const AddressField = ()=>{
	const address = useSelector(state=>state.map.address)

	return 	<div>
		{address}
	</div>

}

export default AddressField