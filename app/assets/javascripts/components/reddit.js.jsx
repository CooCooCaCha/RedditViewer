var Reddit = React.createClass({
	getInitialState: function() {
    	return { subreddit: '' };
  	},

  	loadSubreddit: function( subreddit ) {
  		this.replaceState( { subreddit: subreddit } );
  	},

  	loadThread: function( thread ) {
  		this.replaceState( { thread: thread } );
  	},

	render: function() {
		var containerStyle = {
			height: '100%'
		};

		var content = (typeof this.state.subreddit !== 'undefined') ? 
			(<ThreadList subreddit={this.state.subreddit} onThread={this.loadThread} />) :
			(<CommentList thread={this.state.thread} />);

		return (
			<div style={containerStyle}>
				<SubredditList onSubredditChange={this.loadSubreddit} />
				{content}
			</div>
		);
	}
});