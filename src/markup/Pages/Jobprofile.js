import React from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Profilesidebar from './../Element/Profilesidebar';
import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import BaseurlVariable from '../BaseURL/Baseurl';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Loader } from 'react-overlay-loader';
// import loader from 'react-overlay-loader'

function Jobprofile() {

	const [ContactInfoData, SetContactInfoData] = useState([])
	// const [BasicInfoData ,SetBasicInfoData]= useState([])

	const localStorageToken = localStorage.getItem('userDetails')

	console.log("jobprofile localStorageToken ", localStorageToken)

	// states for contact form
	const [fname, setfname] = useState('')
	const [lname, setlname] = useState('')
	const [email, setemail] = useState('')
	const [address, setaddress] = useState('')
	const [contact, setcontact] = useState('')

	const [loader, setLoader] = useState(false)


	// states for basic form
	const [Professional_title, setProfessional_title] = useState('')
	const [language, setlanguage] = useState('')
	const [age, setage] = useState('')
	const [currentSallary, setcurrentSallary] = useState('')
	const [expectedSallary, setexpectedSallary] = useState('')
	const [country, setcountry] = useState('')
	const [city, setcity] = useState('')
	const [postalcode, setpostalcode] = useState('')
	const [description, setdescription] = useState('')
	const [UserID, setUserID] = useState('')



	const { register, handleSubmit, formState: { errors } } = useForm();




	useEffect(() => {

		ContactInformation()
		BasicInformation()

	}, [])

	const BasicInformation = () => {
		// var myHeaders = new Headers();
		// myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjhiN2Q2MWI5LTQyMDUtNDI5MC1hNGIwLWQyYmRiZDA5M2UwYyIsImVtYWlsIjoiYXBwbGljYW50QGdtYWlsLmNvbSIsImV4cCI6MTY2NzM3ODM0MiwiaWF0IjoxNjY3MjkxOTQyfQ.qa-95MDY6TPQhjmfGToTgswg193WmM4zjN0g6LuMgwc");

		var requestOptions = {
			method: 'GET',
			headers: {
				Authorization: "Bearer " + localStorageToken
			},
			redirect: 'follow'
		};

		fetch(`${BaseurlVariable.baseurl}/applicant/profile`, requestOptions)
			.then(response => response.json())
			.then(result => {

				console.log("basic==>", result.data.user)
				setUserID(result.data.user)
				setProfessional_title(result.data.Professional_title)
				setage(result.data.age)
				setcity(result.data.city)
				setcountry(result.data.country)
				setcurrentSallary(result.data.currentSallary)
				setdescription(result.data.description)
				setexpectedSallary(result.data.expectedSallary)
				setlanguage(result.data.language)
				setpostalcode(result.data.postalcode)
				// SetBasicInfoData(result.data)
			}
			)
			.catch(error => console.log('error', error));
	}


	const UpdateBasicInformation = () => {


		var formdata = new FormData();
		formdata.append("Professional_title", Professional_title);
		formdata.append("language", language);
		formdata.append("age", age);
		formdata.append("currentSallary", currentSallary);
		formdata.append("expectedSallary", expectedSallary);
		formdata.append("country",country );
		formdata.append("city", city);
		formdata.append("postalcode", postalcode);
		formdata.append("description", description);
		formdata.append("user", UserID);

		var requestOptions = {
			method: 'PUT',
			headers: {
				Authorization: "Bearer " + localStorageToken
			},
			body: formdata,
			redirect: 'follow'
		};

		fetch("https://linkdinn.pythonanywhere.com/applicant/profile", requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.status == true) {
					setLoader(false)


					BasicInformation()

					// toast.success(response.data.message, {
					// 	position: "top-right",
					// 	autoClose: 5000,
					// 	hideProgressBar: false,
					// 	closeOnClick: true,
					// 	pauseOnHover: true,
					// 	draggable: true,
					// 	progress: undefined,
					// 	theme: "light",
					// });
					console.log(result)
				}

			}


			)
			.catch(error => console.log('error', error));


	}




	const ContactInformation = () => {
		// var myHeaders = new Headers();
		// myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjhiN2Q2MWI5LTQyMDUtNDI5MC1hNGIwLWQyYmRiZDA5M2UwYyIsImVtYWlsIjoiYXBwbGljYW50QGdtYWlsLmNvbSIsImV4cCI6MTY2NzM3ODM0MiwiaWF0IjoxNjY3MjkxOTQyfQ.qa-95MDY6TPQhjmfGToTgswg193WmM4zjN0g6LuMgwc");

		var requestOptions = {
			method: 'GET',
			headers: {
				Authorization: "Bearer " + localStorageToken
			},
			redirect: 'follow'
		};

		fetch(`${BaseurlVariable.baseurl}/Admin/profile?role=applicant`, requestOptions)
			.then(response => response.json())
			.then(result => {

				console.log("result of get api", result.data.fname)
				console.log("result of get api", result.data.email)
				setfname(result.data.fname)
				setlname(result.data.lname)
				setemail(result.data.email)
				setaddress(result.data.address)
				setcontact(result.data.contact)
				// SetContactInfoData(result.data)
				// setfname()
			}
			)
			.catch(error => console.log('error', error));
	}


	const ContactInformationForm = () => {

		// console.log("contact form post api ==>", data)

		var formdata = new FormData();
		formdata.append("fname ", fname);
		formdata.append("lname", lname);
		formdata.append("address", address);
		formdata.append("contact", contact);

		var requestOptions = {
			method: 'PUT',
			headers: {
				Authorization: "Bearer " + localStorageToken
			},
			body: formdata,
			redirect: 'follow'
		};
		setLoader(true)

		fetch(`${BaseurlVariable.baseurl}/Admin/profile?role=applicant`, requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.status == true) {
					setLoader(false)


					ContactInformation()

					// toast.success(response.data.message, {
					// 	position: "top-right",
					// 	autoClose: 5000,
					// 	hideProgressBar: false,
					// 	closeOnClick: true,
					// 	pauseOnHover: true,
					// 	draggable: true,
					// 	progress: undefined,
					// 	theme: "light",
					// });
					console.log(result)
				}

			}


			)
			.catch(error => console.log('error', error));

	}




	return (
		<>



			{loader == true ?
				<Loader fullPage loading /> : null
			}
			<Header />
			{/* <ToastContainer /> */}
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white browse-job p-t50 p-b20">
						<div className="container">
							<div className="row">
								<Profilesidebar />
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx job-profile">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
											<Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link>
										</div>
										{/*basic infor form  */}
										{/* <form> */}
										<div className="row m-b30">
											{/* <div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Your Name:</label>
													<input type="text"
													
													className="form-control" placeholder="Alexander Weir" />
												</div>
											</div> */}
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Professional title:</label>
													<input type="text"
													onChange={(e)=> setProfessional_title(e.target.value)}
													value={Professional_title}
													
													className="form-control" placeholder="Web Designer" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Languages:</label>
													<input type="text" 
													onChange={(e)=> setlanguage(e.target.value)}
													value={language}
													
													className="form-control" placeholder="English" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Age:</label>
													<input type="text" 
													onChange={(e)=> setage(e.target.value)}
													value={age}
													className="form-control" placeholder="32 Year" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Postcode:</label>
													<input type="text"
													onChange={(e)=> setpostalcode(e.target.value)}
													value={postalcode}
													className="form-control" placeholder="112233" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Country:</label>
													<input type="text"
													onChange={(e)=> setcountry(e.target.value)}
													value={country}
													className="form-control" placeholder="Country" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>City:</label>
													<input type="text"
													onChange={(e)=> setcity(e.target.value)}
													value={city}
													className="form-control" placeholder="London" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Current Salary($):</label>
													<input type="text"
													onChange={(e)=> setcurrentSallary(e.target.value)}
													value={currentSallary}
													className="form-control" placeholder="2000$" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Expected Salary:</label>
													<input type="text" 
													onChange={(e)=> setexpectedSallary(e.target.value)}
													value={expectedSallary}
													className="form-control" placeholder="2500$" />
												</div>
											</div>
											<div className="col-lg-12 col-md-12">
												<div className="form-group">
													<label>Description:</label>
													<textarea
													onChange={(e)=> setdescription(e.target.value)}
													value={description}
													className="form-control">
													</textarea>
												</div>
											</div>
										</div>
										<button type='button' onClick={UpdateBasicInformation} className="site-button m-b30" >Basic Save Setting</button>

										{/* </form> */}

										{/*contact infor form  */}
										{/* <form onSubmit={handleSubmit(ContactInformationForm)} > */}


										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Contact Information</h5>
										</div>
										<div className="row">
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>First Name:</label>
													<input type="text"

														// name="fname"
														onChange={(e) => setfname(e.target.value)}
														value={fname}
														// {...register('fname', { required: 'First Name is required' })}
														className="form-control" placeholder="First Name" />

													<p style={{ color: "red" }}>{errors.fname?.message}</p>
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Last Name:</label>
													<input type="text"
														// value={ContactInfoData.lname}
														onChange={(e) => setlname(e.target.value)}
														value={lname}
														// {...register('lname', { required: 'Last Name is required' })}

														className="form-control" placeholder="Last Name"
													/>
													{/* <p style={{ color: "red" }}>{errors.lname?.message}</p> */}
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Email Address:</label>
													<input type="text"
														onChange={(e) => setemail(e.target.value)}
														value={email}
														readOnly
														// {...register('email', { required: 'Email is required' })}
														className="form-control" placeholder="info@example.com" />
													{/* <p style={{ color: "red" }} >{errors.email?.message}</p> */}
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Address:</label>
													<input type="text"
														value={address}
														onChange={(e) => setaddress(e.target.value)}
														// {...register('address', { required: 'Address is required' })}
														className="form-control" placeholder="New york City" />
													{/* <p style={{ color: "red" }}>{errors.address?.message}</p> */}
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="form-group">
													<label>Contact #:</label>
													<input type="text"
														value={contact}
														onChange={(e) => setcontact(e.target.value)}
														// {...register('contact', { required: 'Contact is required' })}
														className="form-control" placeholder="Contact" />
													{/* <p style={{ color: "red" }}>{errors.contact?.message}</p> */}
												</div>
											</div>
											{/* <div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Postcode:</label>
														<input type="text" className="form-control" placeholder="112233" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>City:</label>
														<input type="text" className="form-control" placeholder="London" />
													</div>
												</div> */}

										</div>
										<button type='button' onClick={ContactInformationForm} className="site-button m-b30">Contact Save Setting</button>
										{/* </form> */}
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
export default Jobprofile;