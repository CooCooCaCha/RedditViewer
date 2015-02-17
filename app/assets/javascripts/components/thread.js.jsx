var Thread = React.createClass({
  propTypes: {
      thread: React.PropTypes.string
  },

  getInitialState: function() {
      return null;
  },

  componentDidMount: function() {
      this.getThread();
  },

  getThread: function() {
      var commentUrl = 'https://www.reddit.com/comments/' + this.props.thread + '.json';

      $.get( commentUrl, function( response ) {
          var comments = response[1].data.children.map( function( comment ) {
              return comment.data;
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
          width: '85%',
          backgroundColor: '#ccc'
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

      var commentNodes = this.state.comments.map( function( comment ) {
          var replies = [];

          if( typeof comment.replies.data !== 'undefined' )
              replies = comment.replies.data.children;

          return (
              <Comment author={comment.author} body={comment.body} replies={replies} level={0} gilding={comment.gilded}/>
          );
      });

      var selftextHtml = marked( this.state.header.selftext )
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
