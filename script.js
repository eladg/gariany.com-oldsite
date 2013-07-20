var currentlyOpened = 'content-about-div';
var px_open = '690px';
var px_close = '167px';

var isAnimating;
function setAnimating(state) {
    if (state === true) {
        isAnimating = true;
    } else {
        isAnimating = false;
    }
}

function loadSectionDetails(section) {

    // ==========================================================
    // selectors:
    // ==========================================================

    // text text
    var contentDetailsDivSelector   = '.' + section + ' > .content-details';

    // ==========================================================
    // callbacks:
    // ==========================================================
    var finishedAnimationBlock = function() {
        setAnimating(false);
    };

    $(contentDetailsDivSelector).animate(
        { opacity: 1},
        200,
        finishedAnimationBlock
    );

}

function toggleOpenSection(sender) {
    if (sender == currentlyOpened) {
        console.log("Already opened...");
        return;
    }
    if (isAnimating === true) {
        console.log("Still animating...");
        return;
    }

    // Prevent 2 animation at the same time
    setAnimating(true);

    // ==========================================================
    // selectors:
    // ==========================================================
    // opened/close divs
    var divCurrentlyOpenSelector      = '.' + currentlyOpened;
    var divSenderSelector             = '.' + sender;

    // h2 title
    var titleCurrentlyOpenedSelector  = '.' + currentlyOpened + ' > h2';
    // 
    var textSection   = '.' + currentlyOpened + ' > .content-details';

    // ==========================================================
    // callbacks:
    // ==========================================================
    var finishedAnimatingBlock = function() {
        currentlyOpened = sender;
        loadSectionDetails(sender);
    };

    var toggelSectionAnimationBlock = function() {
        console.log("set width of " + divCurrentlyOpenSelector + " to " + px_close);
        $(divCurrentlyOpenSelector).animate(
            { width: px_close },
            300
        );

        console.log("set width of " + divSenderSelector + " to " + px_open);
        $(divSenderSelector).animate(
            { width: px_open },
            300,
            finishedAnimatingBlock
        );
    };

    // ==========================================================
    // animations:
    // ==========================================================
    px_close = $(titleCurrentlyOpenedSelector).css('width');

    // make current text disapear
    $(textSection).animate(
        { opacity: 0},
        200,
        toggelSectionAnimationBlock
    );
}

$(document).ready(function() {

    $('.content-about-div').mouseover(function() {
        toggleOpenSection('content-about-div');
    });

    $('.content-tech-div').mouseover(function() {
        toggleOpenSection('content-tech-div');
    });

    $('.content-arts-div').mouseover(function() {
        toggleOpenSection('content-arts-div');
    });

});