require 'net/http'

class HomeController < ApplicationController
  def index
  	#@subreddits = Subreddit.all.to_a
  	#url = URI.parse( 'http://metareddit.com/reddits/over18/list' )
  	#req = Net::HTTP::Get.new( url.to_s )
  	#res = Net::HTTP.start( url.host, url.port ) { |http| 
  	#	http.request( req )
  	#}

  	#@scrape = res.body
  end
end
