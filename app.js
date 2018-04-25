var UIController = (function(){

    return {
        changeQuote: function(data) {
            console.log('inside changeQuote: ' + data.quote);
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
    var prevData = {
        quote: 'fd',
        author: 'df'
    }
    var script = '';
    parseQuote= function(json) {
        document.querySelector('#btn-quote').disabled='true';
        if(json) {
            data.quote = json.quoteText;
            data.author = json.quoteAuthor;
            console.log('inside parseQuote: \n' + data.quote);
            UICtrl.changeQuote(data);
            UICtrl.setShareData(data);
        }
        setTimeout(function() {document.querySelector('#btn-quote').disabled='';}, 1000)
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
        }
    };
})(UIController);




var appController = (function(dataCtrl) {
    var setupEventListener = function() {
        document.querySelector('#btn-quote').addEventListener('click', getRandomQuote);
    };

    function getRandomQuote() {
        // 1. get quote
        dataCtrl.getQuote();
    }

    return {
        init: function() {
            setupEventListener();
            getRandomQuote();
        }
    }

})(dataController); 


appController.init();