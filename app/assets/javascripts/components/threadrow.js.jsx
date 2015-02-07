var ThreadRow = React.createClass({
	propTypes: {
		onSelectThread: React.PropTypes.func
	},

    getInitialState: function() {
        return { expanded: false };
    },

    toggleExpand: function() {
        this.setState( {expanded: !this.state.expanded } );
    },

	render: function( thread ) {
	    var threadRowStyle = {
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

	    var titleStyle = {
	        fontSize: '16px'
	    };

	    var threadInfoStyle = {
	        fontSize: '10px'
	    };

	    var scoreStyle = {
	        color: '#fff',
	        backgroundColor: '#aaa',
	        padding: '2px 4px'
	    };

	    var expandButtonStyle = {
	        float: 'left',
	        width: '20px',
	        height: '20px',
	        textAlign: 'center',
	        border: '1px solid black',
	        marginTop: '3px'
	    };

	    var expandedImageContainerStyle = {
	        width: '100%',
	        textAlign: 'center',
	        marginTop: '40px'
	    };

	    var expandedImageStyle = {
	        width: '60%'
	    };

	    var hasThumb = this.props.thread.thumbnail !== 'self'   && 
	    			   this.props.thread.thumbnail !== 'default' && 
	    			   this.props.thread.thumbnail !== '';

	    var expandButtonText = this.state.expanded ? '-' : '+';

        var expandedImageUrl = this.props.thread.url;
        if( this.props.thread.domain === 'imgur.com' )
            expandedImageUrl += '.png';

	    var expandedImage = (
            <div style={expandedImageContainerStyle}>
                <img src={expandedImageUrl} style={expandedImageStyle} />
            </div>
	    );

		return ( 
			<div style={threadRowStyle}>
				{hasThumb && <a href={this.props.thread.url} target="__blank">
					<img src={this.props.thread.thumbnail} style={thumbStyle} />
				</a>}
		        <div style={titleStyle} onClick={this.props.onSelectThread.bind( null, this.props.thread.id )}>
		            <span dangerouslySetInnerHTML={{__html: this.props.thread.title}} />
		        </div>
		        <div style={threadInfoStyle}>
					<span style={scoreStyle}>{this.props.thread.score}</span>
					<span> - <i>{this.props.thread.author}</i> </span>
					({this.props.thread.domain})
		        </div>
                <div style={expandButtonStyle} onClick={this.toggleExpand}>{expandButtonText}</div>
                {this.state.expanded && expandedImage}
			</div>
		);
	}
});