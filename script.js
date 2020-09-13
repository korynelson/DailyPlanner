function updateTime () {
    window.localStorage.setItem("localTime",moment().format('MMMM Do YYYY, HH:mm:ss A'))
    $("#currentDay").text(window.localStorage.getItem("localTime"));
};

function renderEvents(){
    $("textarea").each(function(){
        var eventTime = $(this).siblings("div.hour").text();
        $(this).text(window.localStorage.getItem(eventTime));
    })

    $(".row").each(function(){
        var eventTime = $(this).children("div.hour").text()
        var m = moment()
        var roundTime = m.startOf('hour').format("HH:mm");

            if (roundTime<eventTime) {
                console.log($(this).attr("class"))
                $(this).children("textarea").addClass("future")
            }

            else if (roundTime>eventTime) {
                console.log($(this).attr("class"))
                $(this).children("textarea").addClass("past")
            }

            else if (roundTime===eventTime) {
                console.log($(this).attr("class"))
                $(this).children("textarea").addClass("present")
            }
            
    })
}

$(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
    renderEvents()

    $(".saveBtn").on("click", function(){
        var eventTime = $(this).siblings("div.hour").text()
        window.localStorage.setItem(eventTime,$(this).siblings("textarea").val());
        location.reload();
    })

    $("#clearBtn").on("click",function(){
        $("textarea").each(function(){
            var eventTime = $(this).siblings("div.hour").text()
            window.localStorage.clear(eventTime);
            location.reload();
        })
    })

    $("#saveAllBtn").on("click", function(){
        $("textarea").each(function(){
            var eventTime = $(this).siblings("div.hour").text()
            window.localStorage.setItem(eventTime,$(this).val());
            location.reload();
        })
    })
    
})