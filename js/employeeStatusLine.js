var React = require('react');
var EmployeeImage = require('./employeeImage');
var EmployeeStatus = require('./employeeStatus');

var EmployeeStatusLine = React.createClass({

	getDefaultProps: function() {
		return {
			id: null,
			imageSrc: '',
			name: '',
			team: '',
			status: '',
			isCurrentUser: false
		}
	},

	render: function() {
		var currentEmployeeIndicator = this.props.isCurrentUser ? <i className="fa fa-hand-o-right"></i> : '';
		return (
			<div className="row employeeStatusLine">
				<div className="col-md-1">
					{currentEmployeeIndicator}
				</div>
				<div className="col-md-1">
					<EmployeeImage imageSrc={this.props.imageSrc} name={this.props.name} />
				</div>
				<div className="col-md-3">
					{this.props.name} 
				</div>
				<div className="col-md-1">
					<EmployeeStatus id={this.props.id} status={this.props.status} isCurrentUser={this.props.isCurrentUser} employeeStatusToggled={this.props.employeeStatusToggled}/>
				</div>
				
			</div>
		);
	}
});

module.exports = EmployeeStatusLine;