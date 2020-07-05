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
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const gifs =
      ['<iframe class="embed-responsive-item" src="https://giphy.com/embed/jvucQj4J72dPO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
      '<iframe class="embed-responsive-item" src="https://giphy.com/embed/JwvHIPKRcK4lG" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
      '<iframe class="embed-responsive-item" src="https://giphy.com/embed/26BkLyDcbBJ8lTBS0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
      '<iframe class="embed-responsive-item" src="https://giphy.com/embed/dvWHVxunxwimQ" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'];

  // Pick a random greeting.
  const gif = gifs[Math.floor(Math.random() * gifs.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerHTML = gif;
}

/**
 * gets title from server
 */
function getTitle() {
  console.log('in getTitle() function');
  fetch('/data').then(response => response.text()).then((titleText) => {
    console.log('printing content');
    document.getElementById('title-text').innerHTML = titleText;
  });
}
