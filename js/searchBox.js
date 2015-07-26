var React = require('react');

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

module.exports = SearchBox;