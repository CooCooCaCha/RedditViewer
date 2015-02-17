var AddFavoriteBar = React.createClass({
    propTypes: {
        onNewFavorite: React.PropTypes.func
    },

    getInitialState: function() {
        return { userInput: '' };
    },

    handleChange: function(e) {
        this.setState({userInput: e.target.value});
    },

    onNewFavorite: function() {
        this.props.onNewFavorite( this.state.userInput );
        this.setState( { userInput: '' } );
    },

    render: function() {
        return (
            <div>
                <input value={this.state.userInput} onChange={this.handleChange} />
                <button onClick={this.onNewFavorite}>+</button>
            </div>
        );
    }
});