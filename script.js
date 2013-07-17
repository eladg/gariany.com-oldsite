var currentlyOpened = 'content_about_div';
var px_open = '700px';
var px_close = '190px';

function togelOpen(sender) {
    if (sender == currentlyOpened) {return;}

    var currentContentTextSelector = '.' + currentlyOpened + ' > ' + '.content_text';
    var senderContentTextSelector = '.' + sender + ' > ' + '.content_text';

    // close the currently open
    $(currentContentTextSelector).fadeOut(200);
    $('.' + currentlyOpened).animate({
        width: px_close
    });

    // open the selected one
    $('.' + sender).animate(
        {
            width: px_open
        },
        400,
        function() {
            $(senderContentTextSelector).fadeIn(200);
        }
    );

    currentlyOpened = sender;
}

$(document).ready(function() {

    $('.content_about_div').fadeIn(1000);

    $('.content_about_div').click(function() {
        console.log("mouseover content_about_div");
        togelOpen('content_about_div');
    });

    $('.content_tech_div').click(function() {
        console.log("mouseover content_tech_div");
        togelOpen('content_tech_div');
    });

    $('.content_arts_div').click(function() {
        console.log("mouseover content_arts_div");
        togelOpen('content_arts_div');
    });

});