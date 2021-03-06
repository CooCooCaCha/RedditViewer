var SideMenu = React.createClass({
    propTypes: {
        onSelectFavorite: React.PropTypes.func
    },

    onNewFavorite: function( favorite ) {
        var newFav = {
            subreddit: { 
                link: favorite 
            }
        };

        $.post( '/subreddits', newFav, function() {
            this.refs.subList.getFavoritesList();
        }.bind(this));
    },

    render: function() {
        var listStyle = {
            float           : 'left',
            width           : '15%',
            height          : '100%',
            backgroundColor : '#444'
        };

        var listInnerStyle = {
            margin: '10px'
        };

        return (
            <div style={listStyle}>
                <div style={listInnerStyle}>
                    <AddFavoriteBar onNewFavorite={this.onNewFavorite} />
                    <SubredditList ref="subList" onSelectFavorite={this.props.onSelectFavorite} />
                </div>
            </div>
        );
    }
});