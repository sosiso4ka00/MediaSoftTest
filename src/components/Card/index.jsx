import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setOrderCardData } from "../../reducers/order";
import Cards from 'react-credit-cards-2';
//import 'react-credit-cards-2/es/styles-compiled.css';
import './credit-card.css'
import './form-style.css'
import SelectInput from "@mui/material/Select/SelectInput";

const CardInput = () => {

	const dispatch = useDispatch();
	const state = useSelector(state => state.order.card)


	const removeSpecial = (e) => {
		var invalidChars = ["-", "+", "e", "E", " ", "."];
		if (invalidChars.includes(e.key)) {
			e.preventDefault();
		}
	};

	//function to add space after every 4 character in card number
	const addSpace = (e) => {
		const { value, id } = e.target;
		var ele = document.getElementById(id);
		if (value.length === 4 || value.length === 9 || value.length === 14)
			ele.value = ele.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
	};

	const validateInput = (e) => {
		const { name, value, maxLength, id } = e.target;
		let temp, ele;

		if (id === "cvv") {
			if (value.length > maxLength) {
				temp = value.slice(0, maxLength);
				const num = temp;
				ele = document.getElementById(id);
				ele.value = temp;
				dispatch(setOrderCardData({ field: name, value: num }))
			} else
				dispatch(setOrderCardData({ field: name, value }))

		}
		//works when function is invoked by cardNumber input
		else {
			ele = document.getElementById(id);
			//if user enters any invalid characters it gets replaced
			ele.value = ele.value.replace(
				/[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g,
				""
			);
			dispatch(setOrderCardData({ field: name, value: ele.value }))
		}
	};

	//function to handle focus on input
	const handleInputFocus = (e) => {
		dispatch(setOrderCardData({ field: "forcus", value: e.target.name }))
	};

	//function to handle  input and update the state of variable
	const handleInputChange = (e) => {
		const { name, value, id } = e.target;


		if (id === "cardHolder") {
			var ele = document.getElementById(id);
			//if user enters any invalid characters it gets replaced
			ele.value = ele.value.replace(
				/[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
				""
			);
			dispatch(setOrderCardData({ field: name, value: ele.value }))
		}
		else
			dispatch(setOrderCardData({ field: name, value: value }));
	};

	const expireDate = useMemo(() => {
		return state.expiry + "/" + state.expiryyear
	}, [state.expiry, state.expiryyear])

	return <Box sx={{ boxSizing: 'border-box', height: '100%' }}>
		<Box sx={{ top: '75px', position: 'relative' }}>
			<Cards
				cvc={state.cvc}
				expiry={expireDate}
				focused={state.focus}
				name={state.name}
				number={state.number}
			/>
		</Box>
		<Paper
			elevation={24}
			sx={{
				top: '-75px',
				position: 'relative',
				maxWidth: '570px',
				margin: 'auto',

				zIndex: 1,
				flexWrap: 'wrap',
				width: '100%',
				borderRadius: '10px !important',
				boxShadow: '0 30px 60px 0 rgba(90, 116, 148, 0.4)',
				/* display: -webkit-box, */
				/* display: -ms-flexbox, */
				display: 'flex',
				flexDirection: 'column',
				minWidth: 0,
				wordWrap: 'break-word',
				border: '1px solid rgba(0,0,0,.125)',
				borderRadius: '.25rem',
			}}
		>
			<Box sx={{ margin: '160px 35px 20px 35px', '& > div': { mb: 1 } }}>
				<TextField
					size="small"
					label="Номер карты"
					name="number"
					sx={{ width: '100%' }}
					onChange={validateInput}
					value={state.number}
					onKeyDown={removeSpecial}
					onPaste={(e) => e.preventDefault()}
					onKeyPress={addSpace}
					onFocus={handleInputFocus}
					inputProps={{
						maxLength: 19,
					}}
				/>
				<TextField
					size="small"
					label="Владелец карты"
					sx={{ width: '100%' }}
					name="name"
					spellCheck="false"
					value={state.name}
					onPaste={(e) => e.preventDefault()}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					inputProps={{
						maxLength: "20",
					}}
				/>
				<Box sx={{ display: 'flex', position: 'relative' }}>
					<FormControl
						size="small"
						sx={{ width: '15%' }}
						fullWidth>
						<InputLabel >Month</InputLabel>
						<Select
							id="cardMonth"
							value={state.expiry}
							name="expiry"
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						>
							<MenuItem value={"01"}>01</MenuItem>
							<MenuItem value={"02"}>02</MenuItem>
							<MenuItem value={"03"}>03</MenuItem>
							<MenuItem value={"04"}>04</MenuItem>
							<MenuItem value={"05"}>05</MenuItem>
							<MenuItem value={"06"}>06</MenuItem>
							<MenuItem value={"07"}>07</MenuItem>
							<MenuItem value={"08"}>08</MenuItem>
							<MenuItem value={"09"}>09</MenuItem>
							<MenuItem value={"10"}>10</MenuItem>
							<MenuItem value={"11"}>11</MenuItem>
							<MenuItem value={"12"}>12</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						size="small"
						sx={{ width: '15%' }}
						fullWidth>
						<InputLabel >Year</InputLabel>
						<Select
							id="cardYear"
							value={state.expiryyear}
							name="expiryyear"
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						>
							<MenuItem value={"20"}>20</MenuItem>
							<MenuItem value={"21"}>21</MenuItem>
							<MenuItem value={"22"}>22</MenuItem>
							<MenuItem value={"23"}>23</MenuItem>
							<MenuItem value={"24"}>24</MenuItem>
							<MenuItem value={"25"}>25</MenuItem>
							<MenuItem value={"26"}>26</MenuItem>
							<MenuItem value={"27"}>27</MenuItem>
							<MenuItem value={"28"}>28</MenuItem>
							<MenuItem value={"29"}>29</MenuItem>
							<MenuItem value={"30"}>30</MenuItem>
							<MenuItem value={"31"}>31</MenuItem>
						</Select>
					</FormControl>
					<TextField
						size="small"
						label="CVV"
						sx={{ width: '20%', right: 0, position: 'absolute' }}
						type="number"
						onChange={validateInput}
						onKeyDown={removeSpecial}
						onPaste={(e) => e.preventDefault()}
						onFocus={handleInputFocus}
						name="cvc"
						id="cvv"
						value={state.cvc}
						inputProps={{
							maxLength: "4",
						}}
					/>
				</Box>
			</Box>
			{/* <form className="payment-form" style={{}}>
				<Box className="">
					<label htmlFor="cardNumber" className="card-label">
						Card Number
					</label>
					<input
						type="text"
						onChange={validateInput}
						value={state.number}
						onKeyDown={removeSpecial}
						onPaste={(e) => e.preventDefault()}
						onKeyPress={addSpace}
						onFocus={handleInputFocus}
						name="number"
						maxLength="19"
						sx={{ color: '#000' }}
					/>
				</Box>
				<Box className="form-group">
					<label htmlFor="cardHolder" className="card-label">
						Card holder
					</label>
					<input
						type="text"
						name="name"
						spellCheck="false"
						value={state.name}
						maxLength="20"
						autoComplete="off"
						onPaste={(e) => e.preventDefault()}
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						id="cardHolder"
						className="form-control form-control-lg"
					/>
				</Box>
				<Box className="date-cvv-box">
					<Box className="expiry-class">
						<Box className="form-group card-month ">
							<label htmlFor="cardMonth" className="card-label">
								Expiration Date
							</label>

							<select
								id="cardMonth"
								data-ref="cardDate"
								value={state.expiry}
								name="expiry"
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								className="form-control form-control-lg"
							>
								<option value="" defaultChecked="true">
									Month
								</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
						</Box>
						<Box className="form-group card-year">
							<select
								id="cardYear"
								data-ref="cardDate"
								value={state.expiryyear}
								name="expiryyear"
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								className="form-control form-control-lg"
							>
								<option value="" defaultChecked="true">
									Year
								</option>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
								<option value="2022">2022</option>
								<option value="2023">2023</option>
								<option value="2024">2024</option>
								<option value="2025">2025</option>
								<option value="2026">2026</option>
								<option value="2027">2027</option>
								<option value="2028">2028</option>
								<option value="2029">2029</option>
								<option value="2030">2030</option>
								<option value="2031">2031</option>
							</select>
						</Box>
					</Box>

					<Box className="cvv-class form-group">
						<label htmlFor="cvv" className="card-label cvv-label">
							CVV
						</label>
						<input
							type="number"
							onChange={validateInput}
							onKeyDown={removeSpecial}
							onPaste={(e) => e.preventDefault()}
							onFocus={handleInputFocus}
							name="cvc"
							id="cvv"
							value={state.cvc}
							className="form-control form-control-lg "
							maxLength="4"
						/>
					</Box>
				</Box>

			</form> */}
		</Paper >

	</Box >

}

export default CardInput;
