var DndApp = React.createClass({
	employeeStatusToggled: function(employeeId) {
		var updatedEmployees = this.state.employees.map(function(employee) {
			if (employee.id === employeeId) {
				if (employee.status === 'free') {
					employee.status = 'busy';
				} else {
					employee.status = 'free';
				}
			}
			return employee;
		});
		this.setState({employees: updatedEmployees});
	},
	getInitialState: function() {
		return {
			filteredEmployees: null,
			employees :[{
							id: 1,
							name: 'Jonathan Goldfarb',
							image: '',
							team: 'core',
							status: 'free',
							isCurrentUser: true
						},
						{
							id: 2,
							name: 'Eyal Ella',
							image: '',
							team: 'application',
							status: 'busy',
							isCurrentUser: false
						},
						{
							id: 3,
							name: 'Ronny Shapiro',
							image: '',
							team: 'core',
							status: 'busy',
							isCurrentUser: false
						},
						{
							id: 4,
							name: 'Liad Yosef',
							image: '',
							team: 'application',
							status: 'free',
							isCurrentUser: false
						}
					]}
	},

	render: function() {
		var that = this;
		var employeeComponents = this.state.employees.map(function(employee) {
			return <EmployeeStatusLine key={employee.id} name={employee.name} status={employee.status} imageSrc={employee.image} team={employee.team} id={employee.id} isCurrentUser={employee.isCurrentUser} employeeStatusToggled={that.employeeStatusToggled}/>
		});
		return (
			<div className="appWrapper">
				<div className="row topRow">
					<div className="col-md-offset-1 col-md-4">
						<SearchBox/>
					</div>
				</div>
				<div className="row content">
					<div className="col-md-offset-2 col-md-8">
						{employeeComponents}
					</div>
				</div>
			</div>
		);
	}
});

var SearchBox = React.createClass({
	getDefaultProps: function() {
		return {
			
		}
	},

	render: function() {
		return (
			<div className="row">
				<form>
					<div className="col-md-5">
					    <input type="text" className="form-control" placeholder="Name" ref="searchBox" />
					</div>
					<div className="col-md-3">
						<button className="btn btn-default">Search</button>
					</div>
				</form>
			</div>
		);
	}
});

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
			employeeImage = <img src={this.props.imageSrc} alt={this.props.name}/>
		} else {
			employeeImage = <i className="fa fa-user fa-6" ></i>
		}
		return (
			employeeImage
		);
	}
});

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