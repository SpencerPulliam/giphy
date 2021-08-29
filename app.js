const gifs = $("#gifs");
const search = $("#search");
const giphyBaseURL = "http://api.giphy.com/v1/gifs/search"
const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"

// returns first GIF from response to a search and appends it to the DOM
function addGif(res) {
  let searchResult = res.data[0]

  if (searchResult) {
    let gifSpace = $("<div>")
    let gif = $("<img>", {src: searchResult.images.original.url});
    
    gifSpace.append(gif);
    gifs.append(gifSpace);
  }
}

// appends search criteria to URL in GET call. Calls addGif()
$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchCriteria = search.val();
  search.val("");

  const res = await axios.get(giphyBaseURL, {params: {q: searchCriteria, api_key: apiKey}
  });

  addGif(res.data);
});

// clear all GIFs from the screen
$("#clear").on("click", function() {
  gifs.empty();
});