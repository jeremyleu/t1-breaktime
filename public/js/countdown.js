function Countdown()
{
    this.start_time = "1:00:10";
    this.end_time = "0:00:00";
    this.target_id = "countdown_timer";
    this.paused = true;
    this.name = 'timer';
    this.eventHandlers = {};
    this.complete = true;
}

function Countdown(starttime)
{
    this.start_time = starttime;
    this.end_time = "0:00:00";
    this.target_id = "countdown_timer";
    this.paused = true;
    this.name = 'timer';
    this.eventHandlers = {};
    this.complete = true;
}

Countdown.prototype.target = function()
{
    return $("#" + this.target_id);
}

Countdown.prototype.update_target = function()
{
    minutes = this.minutes;
    seconds = this.seconds;
    hours = this.hours;
    if(minutes < 10 && hours > 0) minutes = "0" + minutes;
    if(seconds < 10) seconds = "0" + seconds;

    if(hours > 0)
    	$("#" + this.target_id + " span").text(hours + ":" + minutes + ":" + seconds);
    else
    	$("#" + this.target_id + " span").text(minutes + ":" + seconds);
}

Countdown.prototype.getTimeRemaining = function()
{
    return (hours + ":" + minutes + ":" + seconds);
}

Countdown.prototype.pause = function()
{
    if(!this.paused){
        this.paused = true;
        this.fire('pause');
    }
}

Countdown.prototype.resume = function()
{
    this.paused = false;
    this.fire('play');
}

Countdown.prototype.init = function()
{
    this.reset();
    setInterval(this.name + '.tick()', 1000);
}

Countdown.prototype.tick = function()
{
    if(!this.paused && !(this.seconds <= 0 && this.minutes <=0 && this.hours <= 0)){
        this.complete = false;
        this.seconds = this.seconds - 1;
        if(this.seconds < 0 && (this.minutes > 0 || this.hours > 0)){
            this.minutes--;
            this.seconds = 59;
            if(this.minutes < 0 && this.hours > 0){
            	this.hours--;
            	this.minutes = 59;
            }
        }
    }else{
        if(this.seconds <= 0 && this.minutes <=0 && this.hours <= 0 && !this.complete) {
            this.fire('complete');
            this.complete = true;
        }
    }
    this.update_target();
}

Countdown.prototype.start = function()
{
    this.reset();
    this.paused = false;
}

Countdown.prototype.reset = function(time)
{
    if(time == undefined) time = this.start_time;
    time_ary = time.split(":");
    this.hours = parseInt(time_ary[0]);
    this.minutes = parseInt(time_ary[1]);
    this.seconds = parseInt(time_ary[2]);
    this.update_target();
    if(!this.paused)
    {
        this.paused = true;
        this.fire('stop');
    }
    this.complete = false;
}



Countdown.prototype.registerHandler = function(event, data, handler)
{
    this.target().bind(event, data, handler);
}

Countdown.prototype.fire = function(event)
{
    this.target().trigger(event)
}