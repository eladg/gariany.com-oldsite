var currentlyOpened = 'content-about-div';
var currentBackgroundImage = 3;
var px_open = '54%';
var px_close = '1px';

var backgroundImagesUrls = {};
backgroundImagesUrls['about'] = 'img/background3.png';
backgroundImagesUrls['tech'] = 'img/background1.png';
backgroundImagesUrls['arts'] = 'img/background2.png';

var isAnimating;
function setAnimating(state) {
    if (state === true) {
        isAnimating = true;
    } else {
        isAnimating = false;
    }
}

function animateBackground() {
    // var currentBackgroundSelector = '.dynamic-background-' + currentBackgroundImage;
    // $(currentBackgroundSelector).animate(
    //     { marginTop: -500},
    //     60000,
    //     "linear"
    // );
}

function changeBackground(openedSegment) {
    
    if (openedSegment == currentlyOpened) {
        console.log("Already opened...");
        return;
    }

    console.log("in changeBackground");
    var backgroundSelector = '.background-continer';
    var backgroundImageUrl = backgroundImagesUrls[openedSegment];

    console.log("Now on: " + openedSegment);
    console.log("will switch to: " + backgroundImageUrl);

    var callbackBackgroundChange = function() {
        // set current backgorund opacity to 0
        $(backgroundSelector).css("background-image", "url("+backgroundImageUrl+")");
        
        $(backgroundSelector).animate(
            { opacity: 1},
            200
        );
    };

    $(backgroundSelector).animate({ opacity: 0 }, 1000, callbackBackgroundChange);

    // if (currentlyOpened == 'content-about-div') {
    //     currentBackgroundImage = 3;
    // } else if (currentlyOpened == 'content-tech-div') {
    //     currentBackgroundImage = 1;
    // } else if (currentlyOpened == 'content-arts-div' ) {
    //     currentBackgroundImage = 2;
    // }

    // // set current backgorund opacity to 1
    // var backgroundSelector = '.dynamic-background-' + currentBackgroundImage;
    // console.log("backgroundSelector = " + backgroundSelector);
    // $(backgroundSelector).animate(
    //     { opacity: 1, zindex: 0},
    //     1500,
    //     function() {
    //         animateBackground();
    //     }
    // );

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

function aboutIconAnimationEnded(sender) {
    console.log("in aboutIconAnimationEnded");
    console.log(sender);
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

    // animateBackground();

    $('.content-about-div').mouseover(function() {
        toggleOpenSection('content-about-div');
        changeBackground('about');
    });

    $('.content-tech-div').mouseover(function() {
        toggleOpenSection('content-tech-div');
        changeBackground('tech');
    });

    $('.content-arts-div').mouseover(function() {
        toggleOpenSection('content-arts-div');
        changeBackground('arts');
    });

    $('.about-icon').mouseover(function() {
        $(this).animate(
            { top: 0},
            100,
            "swing"
        );

    });

    $('.about-icon').mouseleave(function() {
        $(this).animate(
            { top: 4},
            400,
            "swing",
            aboutIconAnimationEnded(this)
        );
    });


});