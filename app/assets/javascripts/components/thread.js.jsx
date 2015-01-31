var Thread = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    link: React.PropTypes.string,
    score: React.PropTypes.node,

    onClick: React.PropTypes.func
  },

  render: function() {
    var scoreStyle = {
        fontSize: '10px'
    };

    var titleStyle = {
        fontSize: '16px'
    };

    var threadStyle = {
        marginBottom: '10px',
        margin: '5px',
        backgroundColor: '#fff',
        padding: '5px'
    };

    return (
      <div style={threadStyle}>
        <div style={titleStyle} onClick={this.props.onClick.bind( null, this.props.link )}>
            <span dangerouslySetInnerHTML={{__html: this.props.title}} />
        </div>
        <div style={scoreStyle}>{this.props.score} - <i>{this.props.author}</i></div>
      </div>
    );
  }
});
