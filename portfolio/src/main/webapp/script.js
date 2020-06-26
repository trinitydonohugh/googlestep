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
      ['<iframe src="https://giphy.com/embed/jvucQj4J72dPO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dolphin-dog-jvucQj4J72dPO">via GIPHY</a></p>', 
      '<iframe src="https://giphy.com/embed/JwvHIPKRcK4lG" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/artists-on-tumblr-foxadhd-JwvHIPKRcK4lG">via GIPHY</a></p>', 
      '<iframe src="https://giphy.com/embed/26BkLyDcbBJ8lTBS0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/swimming-dolphin-26BkLyDcbBJ8lTBS0">via GIPHY</a></p>', 
      '<iframe src="https://giphy.com/embed/dvWHVxunxwimQ" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dolphin-dvWHVxunxwimQ">via GIPHY</a></p>'];

  // Pick a random greeting.
  const gif = gifs[Math.floor(Math.random() * gifs.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerHTML = gif;
}