function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

var Comment = React.createClass({
    propTypes: {
        author  : React.PropTypes.string,
        body    : React.PropTypes.string,
        replies : React.PropTypes.array,
        level   : React.PropTypes.number
    },

    render: function() {
        var rgb = null;

        if( this.props.level % 2 === 0 )
            rgb = HSVtoRGB( ((36*this.props.level))/360, 0.3, 1 );
        else
            rgb = HSVtoRGB( (360-(36*this.props.level))/360, 0.3, 1 );

        var commentColor = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ' )';

        var commentStyle = {
            border: '1px solid #aaa',
            borderLeft: '5px solid ' + commentColor,
            backgroundColor: '#fff',
            padding: '5px',
            margin: '5px'
        };

        var authorStyle = {
            fontSize: '10px',
            color: '#aaa'
        };

        var body = this.props.body;
        if( typeof body === 'undefined' )
            body = '[deleted]';

        var commentHtml = marked( body )
            .replace( /&amp;gt;/g, '>' ).replace( /&amp;lt;/g, '<' );

        var replyLevel = this.props.level + 1;

        var replyComments = this.props.replies.map( function( reply ) {
            var replies = [];

            if( typeof reply.data.replies !== 'undefined' && typeof reply.data.replies.data !== 'undefined' )
                replies = reply.data.replies.data.children;

            return (
                <Comment author={reply.data.author} body={reply.data.body} replies={replies} level={replyLevel} />
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
