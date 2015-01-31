var Subreddit = React.createClass({
  propTypes: {
    link: React.PropTypes.string,
    onLinkClick: React.PropTypes.func
  },

  render: function() {
    var threadStyle = {
        color: '#fff'
    };

    return (
      <div>
          <a style={threadStyle} onClick={this.props.onLinkClick.bind( null, this.props.link )}>/r/{this.props.link}</a>
      </div>
    );
  }
});
