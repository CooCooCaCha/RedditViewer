var SubredditList = React.createClass({
    propTypes: {
        onSelectFavorite: React.PropTypes.func
    },

    getInitialState: function() {
        return { subreddits: [] };
    },

    componentDidMount: function() {
    	this.getFavoritesList();
    },

    getFavoritesList: function() {
        $.get( '/subreddits.json', function( response ) {
            var subreddits = response.map( function( subreddit ) {
                return subreddit.link;
            });

            subreddits.sort();

            this.setState( { subreddits: subreddits } );
        }.bind(this));
    },

    render: function() {
        var listStyle = {
            marginTop: '10px'
        };

    	var favoriteStyle = {
    		color: '#fff',
    		display: 'block'
    	};

	    var subredditNodes = this.state.subreddits.map( function( subreddit ) {
	        return (
	            <a style={favoriteStyle} onClick={this.props.onSelectFavorite.bind( null, subreddit )}>/r/{subreddit}</a>
	        );
	    }.bind(this));

    	return (
    		<div style={listStyle}>
    			{subredditNodes}
    		</div>
    	);
    }
});