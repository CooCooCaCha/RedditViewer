var converter = new Showdown.converter();

var CommentList = React.createClass({
  propTypes: {
    thread: React.PropTypes.string
  },

  getInitialState: function() {
      return null;
  },

  componentDidMount: function() {
      var commentUrl = 'https://www.reddit.com/comments/' + this.props.thread + '.json';

      $.get( commentUrl, function( response ) {
          var comments = response[1].data.children.map( function( comment ) {
              return { author: comment.data.author, body: comment.data.body };
          });

          comments.pop();

          this.setState( {comments: comments, header: response[0].data.children[0].data } );
      }.bind(this));
  },

  render: function() {
    if( this.state === null )
        return false;

    var listStyle = {
        height: '100%',
        overflow: 'scroll',
        float: 'right',
        width: '90%',
        backgroundColor: '#ccc'
    };

    var commentStyle = {
        border: '1px solid black',
        backgroundColor: '#fff',
        padding: '5px',
        margin: '5px'
    };

    var headerStyle = {
        padding: '10px',
        margin: '5px',
        backgroundColor: '#fff'
    };

    var headerTitleStyle = {
        fontSize: '16px'
    };

    var headerBodyStyle = {
        fontSize: '12px'
    };

    var authorStyle = {
        textDecoration: 'underline'
    };

    var commentNodes = this.state.comments.map( function( comment ) {
        var commentHtml = marked( comment.body )
            .replace( /&amp;gt;/g, '>' ).replace( /&amp;lt;/g, '<' );

        return (
            <div style={commentStyle}>
                <div style={authorStyle}>{comment.author}</div>
                <div dangerouslySetInnerHTML={{__html: commentHtml}} />
            </div>
        );
    }.bind( this ));

    var selftextHtml = converter.makeHtml( this.state.header.selftext )
        .replace( /&amp;gt;/g, '>' ).replace( /&amp;lt;/g, '<' );

    return (
        <div style={listStyle}>
            <div style={headerStyle}>
                <div style={headerTitleStyle} 
                     dangerouslySetInnerHTML={{__html: this.state.header.title}} />
                <div style={headerBodyStyle} 
                     dangerouslySetInnerHTML={{__html: selftextHtml}} />
            </div>
            {commentNodes}
        </div>
    );
  }
});
