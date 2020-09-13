function updateTime () {
    $("#currentDay").text(moment().format('MMMM Do YYYY, HH:mm:ss A'));
};

function renderEvents(){
    $("textarea").each(function(){
        var eventTime = $(this).siblings("div.hour").text();
        $(this).text(window.localStorage.getItem(eventTime));
    })
}

$(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
    renderEvents()

    $(".saveBtn").on("click", function(){
        var testing = $(this).siblings("div.hour").text()
        window.localStorage.setItem(testing,$(this).siblings("textarea").val());
    })
    
})