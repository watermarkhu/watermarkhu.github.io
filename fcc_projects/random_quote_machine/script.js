let quotesData = {quotes: [{author: "author", quote: "quote"}]};

function getQuotes() {
    return $.ajax({
      headers: {
        Accept: 'application/json'
      },
      url:
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function (quotesString) {
        if (typeof quotesString === 'string') {
          quotesData = JSON.parse(quotesString);
          console.log(quotesData);
        }
      }
    });
};

function getQuote() {
    let randomQuote = quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ]
    let currentQuote = randomQuote.quote;
    let currentAuthor = randomQuote.author;

    $('#text').text(currentQuote);
    $('#author').text(currentAuthor);
    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + currentQuote + '" - ' + currentAuthor)
    );
}

$(document).ready(function (){
    getQuotes().then(() => {
        getQuote()
    });
    $('#new-quote').on('click', getQuote)
});