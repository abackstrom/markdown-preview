(function(document) {
	var is_markdown = document.contentType == 'text/markdown'
		|| (document.contentType == 'text/plain' && document.location.pathname.substr(-3) == '.md');

	if (!is_markdown) {
		return;
	}

  // Onload, take the DOM of the page, get the markdown formatted text out and
	// apply the converter.
	var html = marked(document.body.innerText);
	document.body.innerHTML = html;

	// Also inject a reference to the default stylesheet to make things look nicer.
	var ss = document.createElement('link');
	ss.rel = 'stylesheet';

 chrome.storage.sync.get({
    currentTheme: 'originalTheme',
  }, function(items) {
    var themeName = "themes/" + items.currentTheme + ".css";
     ss.href = chrome.extension.getURL(themeName);
  });

	document.head.appendChild(ss);

}(document));
