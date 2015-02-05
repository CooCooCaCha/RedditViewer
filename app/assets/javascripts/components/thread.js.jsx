var Thread = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    link: React.PropTypes.string,
    score: React.PropTypes.node,
    thumbnail: React.PropTypes.string,

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
        padding: '5px',
        overflow: 'hidden'
    };

    var thumbStyle = {
        float: 'left',
        width: '64px',
        height: '64px',
        marginRight: '10px'
    };

    var thumbnail = null;
    if( this.props.thumbnail !== 'self' && this.props.thumbnail !== 'default' )
        thumbnail = (
            <img src={this.props.thumbnail} style={thumbStyle} />
        );

    return (
      <div style={threadStyle}>
        {thumbnail}
        <div style={titleStyle} onClick={this.props.onClick.bind( null, this.props.link )}>
            <span dangerouslySetInnerHTML={{__html: this.props.title}} />
        </div>
        <div style={scoreStyle}>{this.props.score} - <i>{this.props.author}</i></div>
      </div>
    );
  }
});
