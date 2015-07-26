var React = require('react');

var LoginPopup = React.createClass({
	loginButtonClicked: function(event) {
		event.preventDefault();
		var employeeName = this.refs.employeeNameLoginInput.getDOMNode().value;
		var employees = this.props.employees;
		var employeesWithName = employees.filter(function(emp) {
			return emp.name.toLowerCase() === employeeName.toLowerCase();
		});
		if (employeesWithName && employeesWithName.length > 0) {
			var loggedInId = employeesWithName[0].id;
			this.props.onLogin(loggedInId);
		}
	},
	render: function() {
		return (
			<div className="loginPopupContainer">		
				<form className="form-inline">
				  <div className="form-group">
				    <input ref="employeeNameLoginInput" type="text" className="form-control" id="employeeNameLoginInput" placeholder="Name"/>
				  </div>
				  <button type="submit" className="btn btn-default" onClick={this.loginButtonClicked}>Login</button>
				</form>
			</div>
		);
	}
});

module.exports = LoginPopup;