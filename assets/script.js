//funtion that updates the time using moment
function updateTime () {
    window.localStorage.setItem("localTime",moment().format('MMMM Do YYYY, HH:mm:ss A'))
    $("#currentDay").text(window.localStorage.getItem("localTime"));
};

//render all of the calendar events
//use moment to determine if the time is past/present/future
function renderEvents(){
    $("textarea").each(function(){
        var eventTime = $(this).siblings("div.hour").text();
        $(this).text(window.localStorage.getItem(eventTime));
    })

    $(".row").each(function(){
        var eventTime = $(this).children("div.hour").text()
        var roundTime = moment().startOf('hour').format("HH:mm");

        if (roundTime<eventTime) {
            $(this).children("textarea").addClass("future")
        }

        else if (roundTime>eventTime) {
            $(this).children("textarea").addClass("past")
        }

        else if (roundTime===eventTime) {
            $(this).children("textarea").addClass("present")
        }     
    })
}

//run all of the funtions once the document is ready
$(document).ready(function(){
    updateTime();
    //update time ever 1sec
    setInterval(updateTime, 1000);
    renderEvents()

    //event listener for save buttons
    $(".saveBtn").on("click", function(){
        var eventTime = $(this).siblings("div.hour").text()
        window.localStorage.setItem(eventTime,$(this).siblings("textarea").val());
        location.reload();
    })

    //event listener for clear all schedule button
    $("#clearBtn").on("click",function(){
        $("textarea").each(function(){
            var eventTime = $(this).siblings("div.hour").text()
            window.localStorage.clear(eventTime);
            location.reload();
        })
    })

    //event listener for the save all button - allows saving
    //of multiple changes at once
    $("#saveAllBtn").on("click", function(){
        $("textarea").each(function(){
            var eventTime = $(this).siblings("div.hour").text()
            window.localStorage.setItem(eventTime,$(this).val());
            location.reload();
        })
    })
    
})