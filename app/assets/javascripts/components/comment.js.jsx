var converter = new Showdown.converter();

var Comment = React.createClass({
    propTypes: {
        author  : React.PropTypes.string,
        body    : React.PropTypes.string,
        replies : React.PropTypes.array
    },

    render: function() {
        var commentStyle = {
            border: '1px solid black',
            backgroundColor: '#fff',
            padding: '5px',
            margin: '5px'
        };

        var authorStyle = {
            textDecoration: 'underline'
        };

        var body = this.props.body;
        if( typeof body === 'undefined' )
            body = '[deleted]';

        var commentHtml = marked( body )
            .replace( /&amp;gt;/g, '>' ).replace( /&amp;lt;/g, '<' );

        var replyComments = this.props.replies.map( function( reply ) {
            var replies = [];

            if( typeof reply.data.replies !== 'undefined' && typeof reply.data.replies.data !== 'undefined' )
                replies = reply.data.replies.data.children;

            return (
                <Comment author={reply.data.author} body={reply.data.body} replies={replies} />
            );
        });

        return (
            <div style={commentStyle}>
                <div style={authorStyle}>{this.props.author}</div>
                <div dangerouslySetInnerHTML={{__html: commentHtml}} />
                <div>{replyComments}</div>
            </div>
        );
    }
});
