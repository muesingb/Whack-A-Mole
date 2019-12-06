class UsersController < ApplicationController

    def index
        users = User.top_five
        render json: users
    end


    def show
        user = User.find(params[:id])
        render json: user
    end
 
    def create
        @user = User.find_or_create_by(filter_params)
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



