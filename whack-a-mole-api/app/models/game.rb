class Game < ApplicationRecord
    belongs_to :user


    def self.sorting_by_score
        self.all.sort_by {|e| e.score}.reverse
    end

    def self.top_five
        self.sorting_by_score.uniq[0..4]
    end
end
