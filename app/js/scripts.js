// let test = require("./data.json");
// console.log(test);

var historyString = {
    "daily": "Yesterday",
    "weekly": "Last Week",
    "monthly": "Last Month"
};

function renderCard(timeframe, title, current, previous) {
    return $( `<div class="card card-time">
    <div class="card-time__icon ${title.toLowerCase()}">
      <img src="/images/icon-${title.toLowerCase()}.svg" alt="Work" srcset=""/>
    </div>
      <div class="card-time__container">
        <div id="name" class="card-time__name">
          ${title}
        </div>
        <div id="current" class="card-time__time">
          ${current}hrs
        </div>
        <div class="card-time__ellipsis">
          <img src="/images/icon-ellipsis.svg" alt="" srcset="">
        </div>
        <div id="previous" class="card-time__history">
          ${historyString[timeframe]} - ${previous}hrs
        </div>
    </div>
  </div>` )
}

const addEvent = (timeframe) => {
    $(`#${timeframe}`).click((e) => {
        e.preventDefault();
        $(".active").removeClass("active");
        $(`#${timeframe}`).addClass("active");
        $.getJSON("data.json", data => {
            if($("#container").is(":parent")) {
                // console.log($("#container").children());
                const [profile, ..._] = $("#container").children();
                $("#container").children().replaceWith([profile]);
            }
            $.each(data, (index, val) => {
                console.log(val);
                // var timeframe = timeframe;
                var title = val["title"].split(" ").join("-");
                var previous = val["timeframes"][timeframe]["previous"];
                var current = val["timeframes"][timeframe]["current"];
                // if($("#container").is(":parent")) {
                //     $("#container") = renderCard(timeframe, title, previous, current);
                // }
                $("#container").append(renderCard(timeframe, title,previous,current));
            })
        })
    })
}


$(document).ready(() => {
    $.getJSON("data.json", data => {
        $.each(data, (index, val) => {
            console.log();
            var title = val["title"].split(" ").join("-");
            var previous = val["timeframes"]["daily"]["previous"];
            var current = val["timeframes"]["daily"]["current"];
            $("#container").append(renderCard("daily", title,current, previous));
            
            // ('#previous').append(val["previous"]);
        })
    });
    $("#daily").addClass("active");
    addEvent("daily");
    addEvent("weekly");
    addEvent("monthly");
})


// $.getJSON("data.json", (json) => {
//     console.log(json);
// })