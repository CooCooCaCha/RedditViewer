var Thread = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    link: React.PropTypes.string,
    score: React.PropTypes.node,
    thumbnail: React.PropTypes.string,
    url: React.PropTypes.string,
    domain: React.PropTypes.string,

    onClick: React.PropTypes.func
  },

  getInitialState: function() {
      return { expanded: false };
  },

  toggleExpand: function() {
      this.setState( {expanded: !this.state.expanded } );
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

    var fullImageStyle = {
        height: '500px',
        width: '100%'
    };

    var expandStyle = {
        float: 'left',
        width: '20px',
        height: '20px',
        textAlign: 'center',
        border: '1px solid black'
    };

    var fullImageContainerStyle = {
        width: '100%'
    };

    var scoreScoreStyle = {
        color: '#fff',
        backgroundColor: '#aaa',
        padding: '2px 4px'
    };

    var thumbnail    = null;
    var fullImage    = null;
    var expandButton = null;
    if( this.props.thumbnail !== 'self' && this.props.thumbnail !== 'default' && this.props.thumbnail !== '' )
    {
        thumbnail = (
            <img src={this.props.thumbnail} style={thumbStyle} />
        );

        if( this.state.expanded )
        {
            expandButton = (
                <div style={expandStyle} onClick={this.toggleExpand}>-</div>
            );

            fullImage = (
                <div style={fullImageContainerStyle}>
                    <iframe src={this.props.url} style={fullImageStyle} />
                </div>
            );
        }
        else
        {
            expandButton = (
                <div style={expandStyle} onClick={this.toggleExpand}>+</div>
            );
        }
    }

    return (
      <div style={threadStyle}>
        {thumbnail}
        <div style={titleStyle} onClick={this.props.onClick.bind( null, this.props.link )}>
            <span dangerouslySetInnerHTML={{__html: this.props.title}} />
        </div>
        <div style={scoreStyle}><span style={scoreScoreStyle}>{this.props.score}</span> - <i>{this.props.author}</i> ({this.props.domain})</div>
        <div>{expandButton}</div>
        <div>{fullImage}</div>
      </div>
    );
  }
});
