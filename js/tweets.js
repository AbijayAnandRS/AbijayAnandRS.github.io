$(function() {
    "use strict";
    $.ajax({
        url: 'get_tweets.php',
        type: 'GET',
        success: function(response) {

            if (typeof response.errors === 'undefined' || response.errors.length < 1) {

                // tweet container for the append
                var $tweets = $('<div class="twitter-feed-inner"></div>');
                $.each(response, function(i, obj) {

                    var urllink = urlify(obj.text);
                    var content = '<span class="user">@' + obj.user.name + '</span><p>' + urllink + '</p><p class="date"><small>' + date(obj.created_at) + '</small></p>';

                    $tweets.append(content);
                });

                $('.tweets-container').html($tweets);
            } else {
                $('.tweets-container').text('Response error');
            }

            function urlify(text) {
                var urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, function(url) {
                    return '<a href="' + url + '" target="_blank">' + url + '</a>';
                });
            }


            function date(dateString) {
                var rightNow = new Date();
                var then = new Date(dateString);
                if ($.browser.msie) {
                    then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
                }

                var diff = rightNow - then;

                var second = 1000,
                    minute = second * 60,
                    hour = minute * 60,
                    day = hour * 24;

                if (isNaN(diff) || diff < 0) {
                    return ""; // return blank string if unknown
                }

                if (diff < second * 2) {
                    // within 2 seconds
                    return "right now";
                }

                if (diff < minute) {
                    return Math.floor(diff / second) + " seconds ago";
                }

                if (diff < minute * 2) {
                    return "about 1 minute ago";
                }

                if (diff < hour) {
                    return Math.floor(diff / minute) + " minutes ago";
                }

                if (diff < hour * 2) {
                    return "about 1 hour ago";
                }

                if (diff < day) {
                    return Math.floor(diff / hour) + " hours ago";
                }

                if (diff > day && diff < day * 2) {
                    return "yesterday";
                }

                if (diff < day * 365) {
                    return Math.floor(diff / day) + " days ago";
                } else {
                    return "over a year ago";
                }
            }
        },
        error: function() {
            $('.tweets-container').text('Request error');
        }
    });
});