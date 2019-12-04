class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end
 
    def create
        @user = User.new(filter_params)
        if @user.save
            # session[user_id] = @user.id
            render json: @user
        end
    end


    private

    def filter_params
        params.require(:user).permit(:username)
    end

end



