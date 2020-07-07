// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random dolphin-gifs to the page.
 */
function addRandomGreeting() {
  const gifs =
      ['<iframe class="embed-responsive-item" src="https://giphy.com/embed/jvucQj4J72dPO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
      '<iframe class="embed-responsive-item" src="https://giphy.com/embed/JwvHIPKRcK4lG" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
      '<iframe class="embed-responsive-item" src="https://giphy.com/embed/26BkLyDcbBJ8lTBS0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
      '<iframe class="embed-responsive-item" src="https://giphy.com/embed/dvWHVxunxwimQ" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'];

  // Pick a random gif.
  const gif = gifs[Math.floor(Math.random() * gifs.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerHTML = gif;
}

/**
 * Fetches comments from the servers and adds them to the DOM.
 */
function getMessages() {
  document.getElementById('messages-container').innerHTML = "";

  fetch('/data').then(response => response.json()).then((comments) => {
    const commentsListElement = document.getElementById('messages-container');
    comments.forEach((comment) => {
      commentsListElement.appendChild(createListElement(comment.name));
      commentsListElement.appendChild(createListElement(comment.date));
      commentsListElement.appendChild(createListElement(comment.message));
    })
  });
}

/** Creates individual <div> element containing messages text. */
function createListElement(text) {
  const divElement = document.createElement('div');
  divElement.innerText = text;
  return divElement;
}
