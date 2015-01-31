var CommentList = React.createClass({
  propTypes: {
    thread: React.PropTypes.string
  },

  getInitialState: function() {
      return { comments: [], header: {title:''} };
  },

  componentDidMount: function() {
      var commentUrl = 'https://www.reddit.com/comments/' + this.props.thread + '.json';

      $.get( commentUrl, function( response ) {
          var comments = response[1].data.children.map( function( comment ) {
              return { author: comment.data.author, body: comment.data.body };
          });

          this.setState( {comments: comments, header: response[0].data.children[0].data } );
      }.bind(this));
  },

  render: function() {
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
        backgroundColor: '#fff',
        fontSize: '16px'
    }

    var authorStyle = {
        textDecoration: 'underline'
    };

    var commentNodes = this.state.comments.map( function( comment ) {
        return (
            <div style={commentStyle}>
                <div style={authorStyle}>{comment.author}</div>
                <div>{comment.body}</div>
            </div>
        );
    }.bind( this ));

    return (
        <div style={listStyle}>
            <div style={headerStyle}>{this.state.header.title}</div>
            {commentNodes}
        </div>
    );
  }
});
