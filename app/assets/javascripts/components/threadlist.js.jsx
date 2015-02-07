var ThreadList = React.createClass({
	propTypes: {
        subreddit: React.PropTypes.string,
        onSelectThread: React.PropTypes.func
    },

	getInitialState: function() {
	    return { threads: [] };
	},

	componentDidMount: function() {
	    this.getSubredditContent( this.props.subreddit );
	},

	componentWillReceiveProps: function( nextProps ) {
	    this.getSubredditContent( nextProps.subreddit );
	},

	subredditToUrl: function( subreddit ) {
	    if( subreddit === '' ) 
	        return 'https://www.reddit.com/.json';

	    return 'https://www.reddit.com/r/' + subreddit + '.json';
	},

	getSubredditContent: function( subreddit ) {
		var url = this.subredditToUrl( subreddit );

	    $.get( url, function( response ) {
	        var threads = response.data.children.map( function( thread ) {
	            return thread.data;
	        });

	        this.setState( { threads: threads } );
	    }.bind(this));
	},

    render: function() {
	    var threadListStyle = {
	        height: '100%',
	        overflow: 'scroll',
	        float: 'right',
	        width: '85%',
	        backgroundColor: '#ccc'
	    };

	    var threadNodes = this.state.threads.map( function( thread ) {
	    	return (
	    		<ThreadRow thread={thread} onSelectThread={this.props.onSelectThread} />
	    	);
	    }.bind(this));

	    return (
	    	<div style={threadListStyle}>
	    		{threadNodes}
	    	</div>
	    );
    }
});
