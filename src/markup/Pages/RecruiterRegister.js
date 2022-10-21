import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';


var bnr = require('./../../images/banner/bnr2.jpg');

function RecruiterRegister() {
	return (
		<>
			<Header />
			<div className="page-content">
				<div className="dez-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: `url(${bnr})` }}>
					<PageTitle motherName="Home" activeName="Register" />
				</div>
				<div className="section-full content-inner browse-job shop-account">
					<div className="container">
						<div className="row">
							<div className="col-md-12 m-b30">
								<div className="p-a30 job-bx max-w500 radius-sm bg-white m-auto">
									<div className="tab-content">
										<form id="login" className="tab-pane active">
											<h4 className="font-weight-700 m-b5">PERSONAL INFORMATION</h4>
											<p className="font-weight-600">If you have an account with us, please log in.</p>
											<div className="form-group">
												<label className="font-weight-700">First Name *</label>
												<input name="dzName" required="" className="form-control" placeholder="First Name" type="text" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Last Name *</label>
												<input name="dzName" required="" className="form-control" placeholder="Last Name" type="text" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">E-MAIL *</label>
												<input name="dzName" required="" className="form-control" placeholder="Your Email Address" type="email" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Password *</label>
												<input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Address *</label>
												<input name="dzAddress" required="" className="form-control" placeholder="Address" type="text" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Phone # *</label>
												<input name="dzContact" required="" className="form-control" placeholder="Phone #" type="tel" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Date oF Birth *</label>
												<input name="dzDOB" required="" className="form-control" placeholder="Date oF Birth" type="date" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Genger *</label>
												<select id="gender" name="dzGender" required="" className="form-control">
													<option value="">Select Gender</option>
													<option value="male">Male</option>
													<option value="female">Female</option>
												</select>
											</div>
											<div className="text-left">
												<button className="site-button button-lg outline outline-2">CREATE</button>
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
export default RecruiterRegister;