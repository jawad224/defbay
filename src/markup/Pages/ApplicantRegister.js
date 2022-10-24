import React, { useEffect } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import Baseurl from '../BaseURL/Baseurl';
import { useState } from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { Loader } from 'react-overlay-loader';



// import { useNavigate } from  "react-router-dom";
import { useHistory } from "react-router-dom";

var bnr = require('./../../images/banner/bnr2.jpg');

function ApplicantRegister() {

	// const navigate = useNavigate();
	const history = useHistory();

	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [address, setAddress] = useState('')
	const [contact, setContact] = useState('')
	const [birthday, setBirthday] = useState('')
	const [gender, setGender] = useState('')
	const [category, setCategory] = useState('')
	const [categoryarray, setCategoryArray] = useState([])
	console.log("categoryarray", categoryarray)

 
	const [loader,setLoader]=useState(false)


	const ApplicantSignup = () => {
		var formdata = new FormData();
		formdata.append("fname", fname);
		formdata.append("lname", lname);
		formdata.append("email", email);
		formdata.append("password", password);
		formdata.append("address", address);
		formdata.append("contact", contact);
		formdata.append("birthday", birthday);
		formdata.append("gender", gender);
		formdata.append("category", category);

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow'
		};

		setLoader(true)

		fetch(`${Baseurl.baseurl}/applicant/registration`, requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log("all data==>", result)
				if (result.status === true) {
					setLoader(false)
					swal('', result.message, "success");
					console.log(result)
					history.push('/login')
				}
				else {
					setLoader(false)

					swal('', result.message, "error");

				}
			}
			)
			.catch(error => 
				{
					setLoader(false)

					console.log('error', error)
				}
				);
	}
	const onChangeDate = ({ target }) => {
		const newDate = moment(target.value).format('YYYY-MM-DD');
		setBirthday(newDate);
		console.log(newDate); //always log "1970-01-01"
	};

	useEffect(() => {
		GetCatagory()
	}, [])
	const GetCatagory = () => {
		var myHeaders = new Headers();
		// myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQ5N2QzYjI3LTAxNTQtNGVmZi1hNTE4LTkyMzc0NmU3NjBmMyIsImVtYWlsIjoiaG5odGVjaEBnbWFpbC5jb20iLCJleHAiOjE2NjY0NTE2MjYsImlhdCI6MTY2NjM2NTIyNn0.aOE6uLHNPDq-wUKFSWHgZq4qfHdUdNMz6UnEkrhot40");
		setLoader(true)
		var requestOptions = {
			method: 'GET',
			// headers: myHeaders,
			redirect: 'follow'
		};

		fetch(`${Baseurl.baseurl}/Admin/categoryData`, requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.status == true) {
                        setLoader(false)
					setCategoryArray(result.data)

					

				}
				// else{

				// }

			}


			)

			.catch(error =>
				{
					setLoader(false)
				console.log('error', error)
				}
				);

	}
	return (
		<>
		{loader ? <Loader fullPage loading /> : null}
              

			{/* <Header /> */}
			<div className="page-content">
				<div className="dez-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: `url(${bnr})` }}>
					<PageTitle motherName="Home" activeName="Applicant Register" />
				</div>
				<div className="section-full content-inner browse-job shop-account">
					<div className="container">
						<div className="row">
							<div className="col-md-12 m-b30">
								<div className="p-a30 job-bx max-w500 radius-sm bg-white m-auto">
									<div className="tab-content">
										<h4 className="font-weight-700 m-b5">PERSONAL INFORMATION</h4>
										<p className="font-weight-600">If you have an account with us, please log in.</p>
										<div className="form-group">
											<label className="font-weight-700">First Name *</label>
											<input name="fname" required="" className="form-control" placeholder="First Name" onChange={(e) => setFname(e.target.value)} type="text" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Last Name *</label>
											<input name="lname" required="" className="form-control" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} type="text" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">E-MAIL *</label>
											<input name="email" required="" className="form-control" placeholder="Your Email Address" onChange={(e) => setEmail(e.target.value)} type="email" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Password *</label>
											<input name="password" required="" className="form-control " placeholder="Type Password" onChange={(e) => setPassword(e.target.value)} type="password" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Address *</label>
											<input name="address" required="" className="form-control" placeholder="Address" onChange={(e) => setAddress(e.target.value)} type="text" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Phone # *</label>
											<input name="contact" required="" className="form-control" placeholder="Phone #" onChange={(e) => setContact(e.target.value)} type="tel" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Date oF Birth *</label>
											<input name="birthday" required="" className="form-control" onChange={(e) => onChangeDate(e)} placeholder="Date oF Birth" type="date" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Genger *</label>
											<select id="gender" name="gender" required="" className="form-control" onChange={(e) => setGender(e.target.value)} >
												<option value="">Select Gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
										</div>
										<div className="form-group">
											<label className="font-weight-700">Category *</label>
											<select id="category" name="category" required="" className="form-control" onChange={(e) => setCategory(e.target.value)} >
												<option value="">Select Category</option>
												{
													categoryarray.map((option, index) => {
														return (
															<>
																<option key={index} value={option.id}>
																	{option.name}
																</option>

															</>
														)
													})
												}
											</select>
										</div>
										<div className="text-left">
											<button className="site-button button-lg outline outline-2" onClick={ApplicantSignup}>CREATE</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
export default ApplicantRegister;