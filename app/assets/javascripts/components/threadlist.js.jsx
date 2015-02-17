var ThreadList = React.createClass({
    propTypes: {
        subreddit: React.PropTypes.string,
        onSelectThread: React.PropTypes.func
    },

    getInitialState: function() {
        return { threads: [], page: 0, sort: 'hot' };
    },

    componentDidMount: function() {
        this.getSubredditContent( this.props.subreddit );
    },

    componentWillReceiveProps: function( nextProps ) {
        this.getSubredditContent( nextProps.subreddit );
    },

    getLastThreadName: function() {
        return this.state.threads[this.state.threads.length-1].name;
    },

    setSorting: function( sort ) {
        this.setState( {sort: sort}, function() {
            this.getSubredditContent( this.props.subreddit );
        });
    },

    nextPage: function() {
        this.setState( {page: this.state.page + 1}, function() {
            this.getSubredditContent( this.props.subreddit );
        });
    },

    prevPage: function() {
        var newPage = this.state.page - 1;
        if( newPage < 0 )
            newPage = 0;

        this.setState( {page: newPage}, function() {
            this.getSubredditContent( this.props.subreddit );
        });
    },

    subredditToUrl: function( subreddit ) {
        var url = '';
        if( subreddit === '' ) 
            url = 'https://www.reddit.com/' + this.state.sort + '.json';
        else
            url = 'https://www.reddit.com/r/' + subreddit + '/' + this.state.sort + '.json';

        if( this.state.page > 0 )
            url += '?count=25&after=' + this.getLastThreadName();

        return url;
    },

    getSubredditContent: function( subreddit ) {
        var url = this.subredditToUrl( subreddit );

        $.get( url, function( response ) {
            var threads = response.data.children.map( function( thread ) {
                return thread.data;
            });

            this.setState( { threads: threads } );
        }.bind(this));
    },

    render: function() {
        var threadListStyle = {
            height: '100%',
            overflow: 'scroll',
            float: 'right',
            width: '85%',
            backgroundColor: '#ccc'
        };

        var topMenuSection = {
            overflow: 'hidden',
            backgroundColor: '#fff',
            padding: '2px 10px'
        };

        var prevNextStyle = {
            float: 'right'
        };

        var sortSectionStyle = {
            float: 'left'
        };

        var topMenuItemStyle = {
            marginRight: '10px'
        };

        var threadNodes = this.state.threads.map( function( thread ) {
            return (
                <ThreadRow thread={thread} onSelectThread={this.props.onSelectThread} />
            );
        }.bind(this));

        return (
            <div style={threadListStyle}>
                <div style={topMenuSection}>
                    <div style={sortSectionStyle}>
                        <a onClick={this.setSorting.bind( this, 'hot'           )}
                             style={topMenuItemStyle}>Hot</a>

                        <a onClick={this.setSorting.bind( this, 'new'           )} 
                             style={topMenuItemStyle}>New</a>

                        <a onClick={this.setSorting.bind( this, 'rising'        )}
                             style={topMenuItemStyle}>Rising</a>

                        <a onClick={this.setSorting.bind( this, 'controversial' )}
                             style={topMenuItemStyle}>Controversial</a>

                        <a onClick={this.setSorting.bind( this, 'top'           )}
                             style={topMenuItemStyle}>Top</a>
                    </div>
                    <div style={prevNextStyle}>
                        <a onClick={this.prevPage.bind( this, null )} 
                             style={topMenuItemStyle}>Prev</a>
                             
                        <a onClick={this.nextPage.bind( this, null )}>Next</a>
                    </div>
                </div>
                {threadNodes}
            </div>
        );
    }
});
