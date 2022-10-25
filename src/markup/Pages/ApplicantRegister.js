import React, { useEffect } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import Baseurl from '../BaseURL/Baseurl';
import { useState } from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { Loader } from 'react-overlay-loader';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";



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
	const { register, handleSubmit, formState: { errors } } = useForm();


	const [loader, setLoader] = useState(false)


	const ApplicantSignup = (data) => {
		var formdata = new FormData();
		formdata.append("fname",data.fname);
		formdata.append("lname",data.lname);
		formdata.append("email",data.email);
		formdata.append("password",data.password);
		formdata.append("address",data.address);
		formdata.append("contact",data.contact);
		formdata.append("birthday",data.birthday);
		formdata.append("gender",data.gender);
		formdata.append("category",data.category);

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
					// swal('', result.message, "success");
					console.log(result)
					Swal.fire({
						title: "success",
						text: result.message,
						icon: "success",
						confirmButtonColor: "#f7931e",
					});
					history.push('/login')
				}
				else {
					setLoader(false)

					Swal.fire({
						title: "Oops",
						text: result.message,
						icon: "error",
						confirmButtonColor: "#f7931e",
					});

				}
			}
			)
			.catch(error => {
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
					// Swal.fire({
					// 	title: "success",
					// 	text: result.message,
					// 	icon: "success",
					// 	confirmButtonColor: "#f7931e",
					// });



				}
				else {
				
					setLoader(false)

				}

			}


			)

			.catch(error => {
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
										<form onSubmit={handleSubmit(ApplicantSignup)} >
											<div className="form-group">
												<label className="font-weight-700">First Name *</label>
												<input name="fname" required="" className="form-control"
													// onChange={(e) => setFname(e.target.value)}
													placeholder="First Name" type="text"
													{...register('fname', { required: 'Name is required' })}
												/>
												<p style={{ color: "red" }}>{errors.fname?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Last Name *</label>
												<input name="lname" required="" className="form-control"
													// onChange={(e) => setLname(e.target.value)}
													placeholder="Last Name" type="text"
													{...register('lname', { required: 'Last Name is required' })}
												/>
												<p style={{ color: "red" }}>{errors.lname?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">E-MAIL *</label>
												<input name="email" required="" className="form-control"
													// onChange={(e) => setEmail(e.target.value)}
													placeholder="Your Email Address" type="email"
													{...register('email', {
														required: "Email is required",
														pattern: {
															value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
															message: 'Please enter a valid Email like workingexample@email.com',
														},
													})}
												/>
												<p style={{ color: "red" }}>{errors.email?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Password *</label>
												<input name="password" required="" className="form-control "
													//    onChange={(e) => setPassword(e.target.value)}
													{...register('password', {
														required: "Password is required",
														minLength: {
															value: 4,
															message: "Password must be more than 4 Characters",
														},
														maxLength: {
															value: 10,
															message: "Password must be less than 10 Characters",
														}

													})}
													placeholder="Type Password" type="password" />
												<p style={{ color: "red" }}>{errors.email?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Address *</label>
												<input name="address" required="" className="form-control"
													// onChange={(e) => setAddress(e.target.value)}
													{...register('address', { required: 'Address is required' })}
													placeholder="Address" type="text" />
												<p style={{ color: "red" }}>{errors.address?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Phone # *</label>
												<input name="contact" required="" className="form-control"
													// onChange={(e) => setContact(e.target.value)}
													{...register('contact', { required: 'Phone # is required' })}
													placeholder="Phone #" type="tel" />
												<p style={{ color: "red" }}>{errors.contact?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Date oF Birth *</label>
												<input name="birthday" required="" className="form-control"
													// onChange={(e) => onChangeDate(e)}
													{...register('birthday', { required: 'Date oF Birth is required' })}
													placeholder="Date oF Birth" type="date" />
												<p style={{ color: "red" }}>{errors.birthday?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Gender *</label>
												<select id="gender" name="gender" required="" className="form-control"
													{...register('gender', { required: 'Gender is required' })}
												// onChange={(e) => setGender(e.target.value)}
												>
													<option value="">Select Gender</option>
													<option value="male">Male</option>
													<option value="female">Female</option>
												</select>
												<p style={{ color: "red" }}>{errors.gender?.message}</p>
											</div>
											<div className="form-group">
												<label className="font-weight-700">Category *</label>
												<select id="category" name="category" required="" className="form-control"
												{...register('category', { required: 'Category is required' })}
												// onChange={(e) => setCategory(e.target.value)}
												
												>
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
												<p style={{ color: "red" }}>{errors.category?.message}</p>
											</div>
											<div className="text-left">
												<button className="site-button button-lg outline outline-2"
													// onClick={ApplicantSignup}
													type='submit'

												>CREATE</button>
											</div>
										</form>
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