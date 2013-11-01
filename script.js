var currentlyOpened = 'about-main';
var currentBackgroundImage = 3;
var px_open = '54%';
var px_close = '1px';

var isAnimating;
function setAnimating(state) {
    if (state === true) {
        isAnimating = true;
    } else {
        isAnimating = false;
    }
}

function setDivsWidth() {

    // I'm well aware that tms is really wrong, but well, i'm still a total HTML/CSS/JS newbie
    var techDivSelector = ".tech-main";
    var artsDivSelector = ".arts-main";

    var techTitleSelector = techDivSelector + " > h2";
    var artsTitleSelector = artsDivSelector + " > h2";

    px_title_tech = $(techTitleSelector).css('width');
    px_title_arts = $(artsTitleSelector).css('width');

    // console.log("width px_title_tech: " + px_title_tech);
    // console.log("width px_title_arts: " + px_title_arts);

    $(techDivSelector).css('width', px_title_tech);
    $(artsDivSelector).css('width', px_title_arts);

}

function changeBackground() {
    // console.log("in changeBackground");
    var backgroundSelector = '.dynamic-background-' + currentBackgroundImage;

    $(backgroundSelector).stop();
    // console.log("backgroundSelector = " + backgroundSelector);
    // set current backgorund opacity to 0
    $(backgroundSelector).animate(
        { opacity: 0},
        1500
    );

    if (currentlyOpened == 'about-main') {
        currentBackgroundImage = 3;
    } else if (currentlyOpened == 'tech-main') {
        currentBackgroundImage = 1;
    } else if (currentlyOpened == 'arts-main' ) {
        currentBackgroundImage = 2;
    }

    // set current backgorund opacity to 1
    var backgroundSelector = '.dynamic-background-' + currentBackgroundImage;
    // console.log("backgroundSelector = " + backgroundSelector);
    $(backgroundSelector).animate(
        { opacity: 1, zindex: 0},
        1500
    );

}

function loadSectionDetails(section) {

    // ==========================================================
    // selectors:
    // ==========================================================

    // text text
    var contentDetailsDivSelector   = '.' + section + ' > .text-block';

    // ==========================================================
    // callbacks:
    // ==========================================================
    var finishedAnimationBlock = function() {
        setAnimating(false);
        changeBackground();
    };

    $(contentDetailsDivSelector).animate(
        { opacity: 1},
        200,
        finishedAnimationBlock
    );

}

function aboutIconAnimationEnded(sender) {
    // console.log("in aboutIconAnimationEnded");
    // console.log(sender);
}

function toggleOpenSection(sender) {
    if (sender == currentlyOpened) {
        // console.log("Already opened...");
        return;
    }
    if (isAnimating === true) {
        // console.log("Still animating...");
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
    var textSection   = '.' + currentlyOpened + ' > .text-block';

    // ==========================================================
    // callbacks:
    // ==========================================================
    var finishedAnimatingBlock = function() {
        currentlyOpened = sender;
        loadSectionDetails(sender);
    };

    var toggelSectionAnimationBlock = function() {
        // console.log("set width of " + divCurrentlyOpenSelector + " to " + px_close);
        $(divCurrentlyOpenSelector).animate(
            { width: px_close },
            300
        );

        // console.log("set width of " + divSenderSelector + " to " + px_open);
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

    setDivsWidth();

    $('.about-main').mouseover(function() {
        toggleOpenSection('about-main');
    });

    $('.tech-main').mouseover(function() {
        toggleOpenSection('tech-main');
    });

    $('.arts-main').mouseover(function() {
        toggleOpenSection('arts-main');
    });

});