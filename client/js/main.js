$(document).ready(function(){

    var tweets = [];

    $('.tweet-button').click(function(){
        if(!validateTweet()) {
            alert('Missing data!');
            return;
        }
        
        var tweetText = $('.tweet-text').val();
        postData(tweetText, $('.tweet-user').val());
    });

    function postData(text, userName) {
        var tweet = {};
        tweet.text = text;
        tweet.userName = userName;
        $.ajax({
            url: '/messages',
            method: 'POST',
            data: JSON.stringify(tweet)
        }).done(function(result) {
            addTweet(tweet);
            clearTweet();
        }).fail(function(err) {
            alert(err);
        });
    }

    function getData() {
        $.ajax({
            url: '/messages'
        }).done(function(results){
            var t = results.split('\n');
            var totTweets = tweets.length == 0 ? 0 : tweets.length - 1;
            for (var i = totTweets; i < t.length; i++) {
                var tweet = JSON.parse(t[i]);
                tweets.push(tweet);
                addTweet(tweet);
            }
        });
    }
    
    function addTweet(tweet) {
        var divTweets = $('.tweets');
        divTweets.prepend(createTweetDiv(tweet));
    }

    function createTweetDiv(tweet){
        var tdiv = $('<div class="tweet col-md-12"></div>');
        tdiv.text(tweet.userName + ': ' + tweet.text);
        return tdiv;
    }

    function validateTweet() {
        if($('.tweet-text').val() === '' || 
            $('.tweet-user').val() === '') {
                return false;
            }
        return true;
    }

    function clearTweet() {
        $('.tweet-text').val('');
    }

    setInterval(
        getData, 
        1000
    );
});