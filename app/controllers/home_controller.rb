class HomeController < ApplicationController
  def index
  	@subreddits = Subreddit.all.to_a
  end
end
