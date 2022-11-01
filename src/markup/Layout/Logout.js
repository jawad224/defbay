import React  from 'react';
import {connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logout } from '../../store/actions/AuthActions';
import { isAuthenticated } from '../../store/selectors/AuthSelectors';

function LogoutPage(props){

    console.log("props in logoutpage==>",props)
    const dispatch = useDispatch();

    function onLogout() {
        console.log("props.history==>",props.history)
       dispatch(logout(props.history));
       // window.location.reload();
    }
    
    return(
        <>
            			
			<Link to ={'#'} title="READ MORE"   className="site-button" onClick={onLogout}>
				<i className="fa fa-lock"></i> Logout 
			</Link>
        </>
    )
} 
const mapStateToProps = (state) => {
    console.log("mapStateToProps===>",state)
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));