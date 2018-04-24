var UIController = (function(){

    return {
        changeQuote: function(data) {
            document.querySelector('q').innerHTML = data.quote;
            document.querySelector('cite').innerHTML = data.author;
        },
        setShareData: function(data) {
            document.querySelector('.twitter-share-button').href = 'https://twitter.com/intent/tweet?text=' + data.quote + ' - ' + data.author;
            document.querySelector('.tumblr-share-button').href = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quote&content='+data.quote + '&caption=' + data.author + '&canonicalUrl=www.tumblr.com'; 
        }
    }
})();




var dataController = (function(UICtrl) {
    var data = {
        quote: 'fd',
        author: 'df'
    }
    parseQuote= function(json) {
        data.quote = json.quoteText;
        data.author = json.quoteAuthor;
        UICtrl.changeQuote(data);
        UICtrl.setShareData(data);
    }
    function setRandomQuote() {
        var script = document.createElement('script'); 
        script.src = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=parseQuote'; 
        document.body.appendChild(script);
        script.parentNode.removeChild(script);
    }
    return {
        getQuote: function() {
            setRandomQuote();
            return data;
        }
    };
})(UIController);




var appController = (function(dataCtrl) {
    var setupEventListener = function() {
        document.querySelector('#btn-quote').addEventListener('click', getRandomQuote);
    };

    function getRandomQuote() {
        var data= {};
        // 1. get quote
        var data = dataCtrl.getQuote();


    }

    return {
        init: function() {
            setupEventListener();
            getRandomQuote();
        }
    }

})(dataController); 


appController.init();