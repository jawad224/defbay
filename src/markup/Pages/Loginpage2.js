import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
	loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

// import { Loader } from 'react-overlay-loader';

// image
//import logo from "../../images/logo-full-white.png";
import loginbg from "./../../images/bg6.jpg";
import logo2 from './../../images/logo-white2.png';

function Login(props) {
	// const [email, setEmail] = useState('demo@example.com');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	// const [password, setPassword] = useState('123456');

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [loader, setLoader] = useState(false)

	const dispatch = useDispatch();

	function onLogin(e) {
		console.log("value of e ==>",e)
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = 'Email is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		dispatch(loadingToggleAction(true));
		dispatch(loginAction(email, password, props.history));
	}

	// const onLogin = () =>




	// {

	// 	var formdata = new FormData();
	// 	formdata.append("email", email);
	// 	formdata.append("password", password);

	// 	var requestOptions = {
	// 	  method: 'POST',
	// 	  body: formdata,
	// 	  redirect: 'follow'
	// 	};

	// 	fetch("https://linkdinn.pythonanywhere.com/Admin/login", requestOptions)
	// 	  .then(response => response.json())
	// 	  .then(result => 

	// 		console.log(result)

	// 		)
	// 	  .catch(error => console.log('error', error));		


	// }

	return (
		


		<div className="page-wraper">
			<div className="page-content bg-white login-style2" style={{ backgroundImage: "url(" + loginbg + ")", backgroundSize: "cover" }}>
				<div className="section-full">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="text-white max-w400 align-self-center">
									<div className="logo">
										<Link to={"/"}><img src={logo2} alt="" /></Link>
									</div>
									<h2 className="m-b10">Login To You Now</h2>
									<p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.</p>
									<ul className="list-inline m-a0">
										<li><Link to={'#'} className="m-r10 text-white "><i className="fa fa-facebook"></i></Link></li>
										<li><Link to={'#'} className="m-r10 text-white "><i className="fa fa-google-plus"></i></Link></li>
										<li><Link to={'#'} className="m-r10 text-white "><i className="fa fa-linkedin"></i></Link></li>
										<li><Link to={'#'} className="m-r10 text-white "><i className="fa fa-instagram"></i></Link></li>
										<li><Link to={'#'} className="m-r10 text-white"><i className="fa fa-twitter"></i></Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="login-2 submit-resume p-a30 seth">
									<div className="nav">
										<form onSubmit={onLogin} className="col-12 p-a0 ">
											<p className="font-weight-600 text-white">If you have an account with us, please log in.</p>
											{props.errorMessage && (
												<div className='bg-red-300 text-red border border-red-900 p-1 my-2'>
													{props.errorMessage}
												</div>
											)}
											{props.successMessage && (
												<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
													{props.successMessage}
												</div>
											)}
											<div className="form-group ">
												<label>E-Mail Address*</label>
												<div className="input-group">
													<input type="email" className="form-control"
														placeholder="Type Your Email Address"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
												<br />
												{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
											</div>
											<div className="form-group">
												<label>Password *</label>
												<div className="input-group">
													<input
														type="password"
														className="form-control"
														value={password}
														placeholder="Type Your Password"
														onChange={(e) =>
															setPassword(e.target.value)
														}
													/>
												</div>
												<br />
												{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
											</div>
											<div className='row text-center'>
												<div className="text-center col-md-12">
													<button className="site-button" style={{ width: '100%' }}><i className="fa fa-unlock-alt"></i> login</button>
												</div>
												<div className="text-center col-md-12 mt-1">
													<Link to="/recruiter-register" className="site-button" style={{ width: '100%' }}><i className="fa fa-unlock-alt"></i> Sign up as Recruiter</Link>
												</div>
												<div className="text-center col-md-12 mt-1">
													<Link to="/applicant-register" className="site-button" style={{ width: '100%' }}><i className="fa fa-unlock-alt"></i> Sign up as Applicant</Link>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<footer className="login-footer">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-center">
								<span className="float-left">© Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
									<a href="//hnhtechsolutions.com/" target='blank'>HnH Tech Solutions </a> </span>
								<span className="float-right">
									All rights reserved.
								</span>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		showLoading: state.auth.showLoading,
	};
};
export default connect(mapStateToProps)(Login);
