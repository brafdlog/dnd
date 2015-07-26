var DndApp = React.createClass({
	employeeStatusToggled: function(employeeId) {
		var updatedEmployees = this.state.employees.map(function(employee) {
			if (employee.id === employeeId) {
				if (employee.status === 'free') {
					employee.status = 'busy';
				} else {
					employee.status = 'free';
				}
				
				// update firebase
				new Firebase('https://duda-dnd.firebaseio.com/employees/' + employeeId).update({status: employee.status}, function(error) {
					if (error) {
						alert('Failed updating status');
						console.log('Failed updating status' + error);
					}
				});
			}

			return employee;
		});
		this.setState({employees: updatedEmployees});
	},
	searchEmployees: function(searchTerm) {
		var filteredEmployees;
		// If searching for empty string reset the filtered employees
		if (!searchTerm) {
			filteredEmployees = undefined;
		} else {
			filteredEmployees = this.state.employees.filter(function (employee) {
				return employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1;
			});
		}
		this.setState({filteredEmployees: filteredEmployees});
	},
	clearSearch: function() {
		this.setState({filteredEmployees: undefined});	
	},
	getInitialState: function() {
		return {
			filteredEmployees: null,
			employees :[],
			currentUserId: localStorage.getItem('currentEmployeeId')
		}
	},
	login: function(employeeId) {
		this.setState({currentUserId: employeeId});
		localStorage.setItem('currentEmployeeId', employeeId);
	},
	logout: function(event) {
		event.preventDefault();
		this.setState({currentUserId: undefined});
		localStorage.removeItem('currentEmployeeId');	
	},
	componentDidMount: function() {
		var that = this;
		firebaseRef.child("employees").on("value", function(snapshot) {
  			that.setState({employees: snapshot.val()});
		});
	},

	render: function() {
		var that = this;
		var searching = false;
		if (this.state.filteredEmployees) {
			searching = true;
		}
		var employees = searching ? this.state.filteredEmployees : this.state.employees;
		var employeeComponents = employees.map(function(employee) {
			var isCurrentUser = employee.id == that.state.currentUserId;
			return <EmployeeStatusLine key={employee.id} name={employee.name} status={employee.status} imageSrc={employee.image} team={employee.team} id={employee.id} isCurrentUser={isCurrentUser} employeeStatusToggled={that.employeeStatusToggled}/>
		});

		var loginPopup = this.state.currentUserId ? '' : 
			<div className="loginPopupContainer">
				<LoginPopup onLogin={this.login} employees={this.state.employees}/>
			</div>								  
		return (
			<div className="appWrapper">
				{loginPopup}
				<div className="row topRow">
					<div className="col-md-offset-1 col-md-4">
						<SearchBox onSearchClicked={this.searchEmployees} searching={searching} clearSearchClicked={this.clearSearch}/>
					</div>
					<div className="col-md-offset-5 col-md-1">
						<button className="logOutLink btn btn-default btn-sm" onClick={this.logout} type="button">Logout</button>
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
	searchClicked: function(event) {
		event.preventDefault();
		var searchInput = this.refs.searchBox.getDOMNode();
		this.props.onSearchClicked(searchInput.value);
	},
	clearSearchClicked: function(event) {
		this.refs.searchBox.getDOMNode().value = '';
		this.props.clearSearchClicked();
	},

	render: function() {
		var clearSearchIcon = this.props.searching ? <i className="fa fa-times fa-5 clearSearchIcon" onClick={this.clearSearchClicked}></i> : '';
		return (
			<div className="row">
				<form>
					<div className="col-md-5">
					    <input type="text" className="form-control" placeholder="Name" ref="searchBox" />
					</div>
					<div className="col-md-1 clearSearchIconColumn">
					    {clearSearchIcon}
					</div>
					<div className="col-md-3">
						<button className="btn btn-default" onClick={this.searchClicked}>Search</button>
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