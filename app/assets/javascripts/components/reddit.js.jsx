var Reddit = React.createClass({
    getInitialState: function() {
        return { subreddit: '' };
    },

    loadSubreddit: function( subreddit ) {
        this.replaceState( { subreddit: subreddit } );
    },

    backButton: function() {
        this.replaceState( { subreddit: this.state.subreddit } );
    },

    loadThread: function( thread ) {
        this.setState( { thread: thread } );
    },

    render: function() {
        var containerStyle = {
            height: '100%'
        };

        var backStyle = {
            padding: '2px 5px',
        };

        var commentContainer = {
            height: '100%'
        };

        var content = (typeof this.state.thread === 'undefined') ? 
            (<ThreadList subreddit={this.state.subreddit} onSelectThread={this.loadThread} />) :
            (
                <div style={commentContainer}>
                    <div onClick={this.backButton} style={backStyle}>Back</div>
                    <Thread thread={this.state.thread} />
                </div>
            );

        return (
            <div style={containerStyle}>
                <SideMenu onSelectFavorite={this.loadSubreddit} />
                {content}
            </div>
        );
    }
});