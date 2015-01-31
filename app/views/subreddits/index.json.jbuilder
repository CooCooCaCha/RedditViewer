json.array!(@subreddits) do |subreddit|
  json.extract! subreddit, :id, :link
  json.url subreddit_url(subreddit, format: :json)
end
