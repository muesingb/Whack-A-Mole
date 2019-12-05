class Game < ApplicationRecord
    belongs_to :user


    def self.sorting_by_score
        self.all.sort.reverse
    end

    def self.top_five
        self.sorting_by_score[0..4]
    end
end
