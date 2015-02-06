var ThreadList = React.createClass({
  propTypes: {
      subreddit: React.PropTypes.string,
      onThread: React.PropTypes.func
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

  getSubredditContent: function( subreddit ) {
      if( subreddit !== '' ) 
          subreddit = 'https://www.reddit.com/r/' + subreddit + '.json';
      else
          subreddit = 'https://www.reddit.com/.json'

      $.get( subreddit, function( response ) {
          var threads = response.data.children.map( function( thread ) {
              return thread.data;
          });

          this.setState( { threads: threads } );
      }.bind(this));
  },

  render: function() {
    var threadNodes = this.state.threads.map( function( thread ) {
        return (
            <Thread title={thread.title} author={thread.author} score={thread.score} link={thread.id} thumbnail={thread.thumbnail} onClick={this.props.onThread} url={thread.url} domain={thread.domain} />
        );
    }.bind(this));

    var contentStyle = {
        height: '100%',
        overflow: 'scroll',
        float: 'right',
        width: '85%',
        backgroundColor: '#ccc'
    };

    return (
        <div style={contentStyle}>
            {threadNodes}
        </div>
    );
  }
});
