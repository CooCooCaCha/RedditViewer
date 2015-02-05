var SubredditList = React.createClass({
  propTypes: {
    onSubredditChange: React.PropTypes.func
  },

  getInitialState: function() {
      return { subreddit: '', subreddits: [] };
  },

  componentDidMount: function() {
      var that = this;

      $.get( '/subreddits.json', function( response ) {
          var subreddits = response.map( function( subreddit ) {
              return subreddit.link;
          });

          subreddits.sort();

          that.setState( { subreddit: '', subreddits: subreddits } );
      });
  },

  render: function() {
    var listStyle = {
        float           : 'left',
        width           : '10%',
        height          : '100%',
        backgroundColor : '#444'
    };

    var favoritesHeaderStyle = {
        color: '#fff',
        fontSize: '14px',
        textDecoration: 'underline'
    };

    var findHeaderStyle = {
        color: '#fff',
        fontSize: '14px',
        textDecoration: 'underline',
        marginTop: '20px'
    };

    var frontpageLink = '';

    var subredditNodes = this.state.subreddits.map( function( subreddit ) {
        return (
            <Subreddit link={subreddit} onLinkClick={this.props.onSubredditChange}/>
        );
    }.bind( this ));

    return (
        <div style={listStyle}>
            <div style={favoritesHeaderStyle}>Favorites</div>
            <Subreddit link={frontpageLink} onLinkClick={this.props.onSubredditChange}/>
            {subredditNodes}
            <div style={findHeaderStyle}>Find</div>
        </div>
    );
  }
});
