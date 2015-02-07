== Reddit Viewer
A reddit viewer written in react and ruby on rails.

React is used for the user interface and querying data from reddit.

Rails is used for managing accounts and subreddits.

TODO
- Refactor comment section.
- Thumbnail view in thread.
- Collapse sub-comments.
- Thread list advanced (pagination, and sorting)
- Comment list advanced (sorting)
- Router

FUTURE
- Move forward and backward through top-level comments.
- Integrate metareddit-based search
- Multiple accounts.
- Sync subreddit favorites.
- User flair
- Gilded comments
- Color coded usernames.
- Expand scope to include all sorts of feeds through a plugin interface.

Reddit
	SideMenu
		AddSubredditBar
		SubredditList
	ThreadList
		ThreadRow
	Thread
		ThreadHeader
		CommentList
			Comment