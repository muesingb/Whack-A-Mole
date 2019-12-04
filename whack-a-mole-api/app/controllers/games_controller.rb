class GamesController < ApplicationController

    def index 
        games = Game.all 
        render json: games
    end
    def create
        @game = Game.new(filter_params)

        if @game.save
            render json: @game
        end
    end

    private

    def filter_params
        params.require(:game).permit(:user_id, :score)
    end

end