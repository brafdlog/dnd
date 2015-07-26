var React = require('react');
var Firebase = require('firebase');

var EmployeeStatusLine = require('./employeeStatusLine');
var LoginPopup = require('./loginPopup');
var SearchBox = require('./searchBox');

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
		new Firebase('https://duda-dnd.firebaseio.com').child("employees").on("value", function(snapshot) {
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

module.exports = DndApp;