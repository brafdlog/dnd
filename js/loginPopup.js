var React = require('react');

var LoginPopup = React.createClass({
	getInitialState: function() {
		return {
			autoCompleteChoices: [],
			loginInputText: '',
			selectedIndex: -1
		};
	},
	loginButtonClicked: function(event) {
		event.preventDefault();
		var employeeName = this.refs.employeeNameLoginInput.getDOMNode().value;
		this._login(employeeName);
	},
	autocompleteChoiceClicked: function(event) {
		var selectedName = event.target.innerHTML;
		this._login(selectedName);
	},
	inputKeyUp: function(event) {
		var selectedIndex;
		if (event.key === 'ArrowDown') {
			var currentSelectedIndex = this.state.selectedIndex;
			currentSelectedIndex++;
			if (currentSelectedIndex >= this.state.autoCompleteChoices.length) {
				currentSelectedIndex = -1;
			}
			this.setState({selectedIndex: currentSelectedIndex});
			return;
		} else if (event.key === 'ArrowUp') {
			var currentSelectedIndex = this.state.selectedIndex;
			currentSelectedIndex--;
			if (currentSelectedIndex >= this.state.autoCompleteChoices.length || currentSelectedIndex < -1) {
				currentSelectedIndex = -1;
			}
			this.setState({selectedIndex: currentSelectedIndex});
			return;
		} else if(event.key === 'Enter') {
			if (this.state.autoCompleteChoices.length == 1) {
				this._login(this.state.autoCompleteChoices[0].name);
				return;
			}
			if (this.state.selectedIndex > -1 && this.state.autoCompleteChoices.length > this.state.selectedIndex) {
				var selectedName = this.state.autoCompleteChoices[this.state.selectedIndex].name;
				this._login(selectedName);
			}
			return;
		} else {
			selectedIndex = -1;
		}
		var inputText = this.refs.employeeNameLoginInput.getDOMNode().value;
		var employeesWithMatchingName;
		if (inputText && inputText.length > 1) {
			employeesWithMatchingName = this.props.employees.filter(function(emp) {
				return emp.name.toLowerCase().indexOf(inputText.toLowerCase()) != -1;
			});
		} else {
			employeesWithMatchingName = [];
		}
		this.setState({autoCompleteChoices: employeesWithMatchingName, selectedIndex: selectedIndex});
	},
	_login: function(employeeName) {
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
		var that = this;
		var isAnyUserSelected = this.state.selectedIndex !== undefined && this.state.selectedIndex != -1 && this.state.autoCompleteChoices.length > this.state.selectedIndex;
		var selectedName = isAnyUserSelected ? this.state.autoCompleteChoices[this.state.selectedIndex].name : '';
		var autoCompleteChoices = this.state.autoCompleteChoices.map(function(employee) {
			var isSelected = isAnyUserSelected && employee.name === selectedName;
			var className = isSelected ? 'selected' : '';
			return <li className={className} onClick={that.autocompleteChoiceClicked}>{employee.name}</li>;
		});

		return (
			<div className="loginPopupContainer">		
				<form className="form-inline">
				  <div className="form-group">
				    <input ref="employeeNameLoginInput" onKeyUp={this.inputKeyUp} type="text" className="form-control" id="employeeNameLoginInput" placeholder="Full Name"/>
				    <ul className="autocompleteList">
				    	{autoCompleteChoices}
				    </ul>
				  </div>
				  <button type="submit" className="btn btn-default" onClick={this.loginButtonClicked}>Login</button>
				</form>
			</div>
		);
	}
});

module.exports = LoginPopup;