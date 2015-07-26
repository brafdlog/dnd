var React = require('react');

var EmployeeImage = React.createClass({
	getDefaultProps: function() {
		return {
			imageSrc: '',
			name: '',
		}
	},

	render: function() {
		var employeeImage;
		if (this.props.imageSrc) {
			employeeImage = <img className="employeeImage" src={this.props.imageSrc} alt={this.props.name}/>
		} else {
			employeeImage = <i className="fa fa-user fa-6 employeeIcon" ></i>
		}
		return (
			employeeImage
		);
	}
});

module.exports = EmployeeImage;