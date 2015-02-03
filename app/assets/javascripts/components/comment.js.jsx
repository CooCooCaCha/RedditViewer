var converter = new Showdown.converter();

var Comment = React.createClass({
    propTypes: {
        author : React.PropTypes.string,
        body   : React.PropTypes.string
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

        var commentHtml = marked( this.props.body )
            .replace( /&amp;gt;/g, '>' ).replace( /&amp;lt;/g, '<' );

        return (
            <div style={commentStyle}>
                <div style={authorStyle}>{this.props.author}</div>
                <div dangerouslySetInnerHTML={{__html: commentHtml}} />
            </div>
        );
    }
});
