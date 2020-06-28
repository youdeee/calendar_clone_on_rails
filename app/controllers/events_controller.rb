class EventsController < ApplicationController
  before_action :set_event, only: [:update, :destroy]

  def index
    @events = current_user.events.all.group_by { |event|
      event.date
    }
    render json: @events, status: :ok
  end

  def create
    @event = current_user.events.build(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
    head :no_content
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = current_user.events.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def event_params
    params.require(:event).permit(:name, :date, :place, :description)
  end
end
