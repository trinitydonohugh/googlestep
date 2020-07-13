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
  try {
  fetch('./data').then(response => response.json()).then((comments) => {
    const commentsListElement = document.getElementById('messages-container');
    comments.forEach((comment) => {
      commentsListElement.appendChild(createCommentElement(comment));
    })
  });} catch(err) {
    console.log('err', err);
  }
}

/** Creates individual <div> element containing messages text. */
function createCommentElement(comment) {
  const divRowElement = document.createElement('div');
  divRowElement.className = 'row';

  const divColElementL = document.createElement('div');
  divColElementL.className = 'col-11 mb-3';

  const nameDateElm = document.createElement('p');
  nameDateElm.innerHTML = (comment.name).bold();
  nameDateElm.innerHTML += " | ";
  nameDateElm.innerHTML += (comment.date).italics();

  const messageElm = document.createElement('p');
  messageElm.innerText = comment.message;

  const divColElementR = document.createElement('div');
  divColElementR.className = 'col-1 mb-3';

  divColElementL.appendChild(nameDateElm);
  divColElementL.appendChild(messageElm);

  const deleteElm = document.createElement('button');
  deleteElm.className = 'close';
  deleteElm.type = 'button';
  const spanElm = document.createElement('span');
  spanElm.innerHTML = '&times;';
  deleteElm.appendChild(spanElm);
  deleteElm.addEventListener('click', () => {
    deleteComment(comment);

    // Remove the comment from the DOM.
    divRowElement.remove();
  });

  divColElementR.appendChild(deleteElm);

  divRowElement.appendChild(divColElementL);
  divRowElement.appendChild(divColElementR);
  return divRowElement;
}

/** Tells the server to delete the task. */
function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-data', {method: 'POST', body: params});
}

var map;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 22.3193, lng: 114.1694}
  });

  setMarkers(map);
}

var trinLocations = [
  ['Hong Kong: this is where I went to Primary School!', 22.3193, 114.1694],
  ['Singapore: this is where I was born.', 1.3521, 103.8198],
  ['London: this is where I went to Secondary School.', 51.5074, 0.1278],
  ['Stanford: this is where I currently attend college', 37.4275, -122.1697],
];

function setMarkers(map) {
  // Adds markers to the map.
  for (var i = 0; i < trinLocations.length; i++) {
    var place = trinLocations[i];
    var marker = new google.maps.Marker({
      position: {lat: place[1], lng: place[2]},
      map: map,
      title: place[0],
    });
    attachMessage(marker, place);
  }
}

// marker is clicked, the info window will open with the message.
function attachMessage(marker, place) {
  var message = place[0];
  var infowindow = new google.maps.InfoWindow({
    content: message
  });

  marker.addListener("click", function() {
    infowindow.open(marker.get("map"), marker);
  });
}
