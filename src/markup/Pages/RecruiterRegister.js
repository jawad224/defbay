import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import Baseurl from '../BaseURL/Baseurl';
import { useState } from 'react';
import swal from 'sweetalert';
import moment from 'moment';

var bnr = require('./../../images/banner/bnr2.jpg');

function RecruiterRegister() {

	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [address, setAddress] = useState('')
	const [contact, setContact] = useState('')
	const [birthday, setBirthday] = useState('')
	const [gender, setGender] = useState('')

	const RecruiterSignup = () => {
		var formdata = new FormData();
		formdata.append("fname", fname);
		formdata.append("lname", lname);
		formdata.append("email", email);
		formdata.append("password", password);
		formdata.append("address", address);
		formdata.append("contact", contact);
		formdata.append("birthday", birthday);
		formdata.append("gender", gender);

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow'
		};

		fetch(`${Baseurl.baseurl}/recruiter/registration`, requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.status === true) {
					swal('', result.message, "success");
					console.log(result)
				}
				else {

					swal('', result.message, "error");

				}
			}
			)
			.catch(error => console.log('error', error));

	}
	const onChangeDate = ({ target }) => {
		const newDate = moment(target.value).format('YYYY-MM-DD');
		setBirthday(newDate);
		console.log(newDate); //always log "1970-01-01"
	};

	return (
		<>
			<Header />
			<div className="page-content">
				<div className="dez-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: `url(${bnr})` }}>
					<PageTitle motherName="Home" activeName="Recruiter Register" />
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
											<input name="fname" required="" className="form-control" onChange={(e) => setFname(e.target.value)} placeholder="First Name" type="text" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Last Name *</label>
											<input name="lname" required="" className="form-control" onChange={(e) => setLname(e.target.value)} placeholder="Last Name" type="text" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">E-MAIL *</label>
											<input name="email" required="" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email Address" type="email" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Password *</label>
											<input name="password" required="" className="form-control " onChange={(e) => setPassword(e.target.value)} placeholder="Type Password" type="password" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Address *</label>
											<input name="address" required="" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Address" type="text" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Phone # *</label>
											<input name="contact" required="" className="form-control" onChange={(e) => setContact(e.target.value)} placeholder="Phone #" type="tel" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Date oF Birth *</label>
											<input name="birthday" required="" className="form-control" onChange={(e) => onChangeDate(e)} placeholder="Date oF Birth" type="date" />
										</div>
										<div className="form-group">
											<label className="font-weight-700">Genger *</label>
											<select id="gender" name="gender" required="" className="form-control" onChange={(e) => setGender(e.target.value)}>
												<option value="">Select Gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
										</div>
										<div className="text-left">
											<button className="site-button button-lg outline outline-2" onClick={RecruiterSignup}>CREATE</button>
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
export default RecruiterRegister;