class User < ApplicationRecord
    has_many :games
    validates :username, uniqueness: true


    def all_games
        self.games.sort_by {|game| game.score}[-1]
    end 


    def self.top_five
        Game.all.sort_by {|game| game.score}.reverse[0..4]
        # self.all.map do |ele|
        #     ele.all_games
        # end.reverse[0..4]
    end

end
