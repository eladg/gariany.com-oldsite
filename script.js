var currentlyOpened = 'content_about_div';
var px_open = '690px';
var px_close = '190px';

var isAnimating;
function setAnimating(state) {
    if (state === true) {
        isAnimating = true;
    } else {
        isAnimating = false;
    }
}

function togelOpen(sender) {
    if (sender == currentlyOpened) { return; }
    if (isAnimating === true) { return; }

    // text selectors
    setAnimating(true);
    console.log("setAnimating(true) = " + isAnimating);

    var currentContentTextSelector = '.' + currentlyOpened + ' > ' + '.content_text';
    var senderContentTextSelector = '.' + sender + ' > ' + '.content_text';

    // close the currently open
    $(currentContentTextSelector).css(
        { display: "none"}
    );

    // close animation
    $('.' + currentlyOpened).animate(
        {width: px_close},
        300
    );

    // open animation
    $('.' + sender).animate(
        { width: px_open },
        300,
        function() {
            $(senderContentTextSelector).fadeIn(200);
            setAnimating(false);
        }
    );

    currentlyOpened = sender;
    console.log("setAnimating(false) = " + isAnimating);
}

$(document).ready(function() {

    $('.content_about_div').mouseover(function() {
        console.log("mouseover content_about_div");
        togelOpen('content_about_div');
    });

    $('.content_tech_div').mouseover(function() {
        console.log("mouseover content_tech_div");
        togelOpen('content_tech_div');
    });

    $('.content_arts_div').mouseover(function() {
        console.log("mouseover content_arts_div");
        togelOpen('content_arts_div');
    });

});