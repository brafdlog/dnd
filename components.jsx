var DndApp = React.createClass({
	getDefaultProps: function() {
		return {
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
		
		var employeeComponents = this.props.employees.map(function(employee) {
			return <EmployeeStatusLine key={employee.id} name={employee.name} status={employee.status} imageSrc={employee.image} team={employee.team} id={employee.id} isCurrentUser={employee.isCurrentUser}/>
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
		var settingsCog = this.props.isCurrentUser ? <i className="fa fa-cog"></i> : '';
		return (
			<div className="row employeeStatusLine">
				<div className="col-md-1">
					{settingsCog}
				</div>
				<div className="col-md-1">
					<EmployeeImage imageSrc={this.props.imageSrc} name={this.props.name} />
				</div>
				<div className="col-md-3">
					{this.props.name} 
				</div>
				<div className="col-md-1">
					<EmployeeStatus status={this.props.status}/>
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
		}
	},

	render: function() {
		var iconClass = this.props.status === 'free' ? 'fa fa-comments-o' : 'fa fa-headphones';
		iconClass += ' fa-6';
		return (
			<i className={iconClass}></i>
		);
	}
});