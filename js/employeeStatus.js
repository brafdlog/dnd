var React = require('react');

var EmployeeStatus = React.createClass({
	getDefaultProps: function() {
		return {
			status: 'free',
			isCurrentUser: false,
			id: null
		}
	},

	onStatusClicked: function(event) {
		if (this.props.isCurrentUser) {
			this.props.employeeStatusToggled(this.props.id);	
		}
		
	},

	render: function() {
		var iconClass = this.props.status === 'free' ? 'fa fa-comments-o' : 'fa fa-headphones';
		iconClass += ' fa-6 statusIcon';
		return (
			<i className={iconClass} onClick={this.onStatusClicked}></i>
		);
	}
});

module.exports = EmployeeStatus;