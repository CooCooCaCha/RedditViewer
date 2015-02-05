var Subreddit = React.createClass({
  propTypes: {
    link: React.PropTypes.string,
    onLinkClick: React.PropTypes.func
  },

  render: function() {
    var threadStyle = {
        color: '#fff'
    };

    var name = this.props.link;

    if( name === '' )
        name = 'frontpage';

    return (
      <div>
          <a style={threadStyle} onClick={this.props.onLinkClick.bind( null, this.props.link )}>/r/{name}</a>
      </div>
    );
  }
});
