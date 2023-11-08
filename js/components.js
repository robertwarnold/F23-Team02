class catalogItem extends HTMLElement{
    static observedAttributes = ["img","name","desc"];

    constructor(){
        super();
    }

    connectedCallback() {
        let imgUrl;
        if (this.hasAttribute("img")) {
            imgUrl = this.getAttribute("img");
        } else {
            imgUrl = "../imgs/img-404.png";
        }

        let itemName;
        if (this.hasAttribute("name")) {
            itemName = this.getAttribute("name");
        } else {
            itemName = "N/A";
        }

        let itemDesc;
        if (this.hasAttribute("desc")) {
            itemDesc = this.getAttribute("desc");
        } else {
            itemDesc = "Product description goes here...";
        }

        this.innerHTML = `
        <div style="display:flex; flex-direction: row; justify-content: left; align-items: center">
            <img class="catalog-img" src="${imgUrl}" width="256" height="256">
            <div>
                <h3>${itemName}</h3>
                <p>${itemDesc}</p>
            </div>
        </div>
        `;

      }
    
      disconnectedCallback() {
        console.log("Custom element removed from page.");
      }
    
      adoptedCallback() {
        console.log("Custom element moved to new page.");
      }
    
      attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
      }
}

customElements.define("catalog-item", catalogItem);

(function musicDB() {
    this.init = function () {
        this.search();
    }

    this.search = function () {
        var form = document.querySelector("#form");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var value = document.querySelector("#input_search").value;
            form.reset();

            getData(value.split(" ").join("+"));
        })

    }

    this.getData = function (artist) {
        var http = new XMLHttpRequest();
        var url = "https://itunes.apple.com/search?term=" + artist + "&entity=album&limit=10";
        var method = "GET";

        var container = document.querySelector("#album_list_container");
        container.innerHTML = "";

        http.open(method, url);
        http.onreadystatechange = function () {
            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                showArtist(JSON.parse(http.response));

            } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {

            }
        }

        http.send();
    };

    this.showArtist = function (obj) {
        var container = document.querySelector("#album_list_container");
        var template = "";

        if (obj.results.length > 0) {
            document.querySelector('#not_match').style.display = 'none';

            for (var i = 0; i < obj.results.length; i++) {
                var albumArt = obj.results[i].artworkUrl100;
                var album = obj.results[i].collectionName;
                var artist = obj.results[i].artistName;
                var price = Math.round(obj.results[i].collectionPrice * 100)

                template += '<div class="col-sm-3 album_item" id="album_item">';
                template += '<div class="item_thmb" id="album_art" style="background:url(' + albumArt + ')"></div>';
                template += '<div id="song_info">';
                template += '<div class="item_title"> <p style="font-weight: bold; display: inline-block;">Album: </p>' + album + '</div>';
                template += '<div class="artist_name"> <p style="font-weight: bold; display: inline-block;">Artist: </p>' + artist + '</p></div>';
                template += '<div class="item_price"> <p style="font-weight: bold; display: inline-block;">Price: </p>' + price + ' points </div>';
                template += '</div>';
                template += '<button id="buy" onclick="addToCart(this, \'' + obj.results[i].artworkUrl100 + '\', \'' + obj.results[i].collectionName + '\', \'' + obj.results[i].artistName + '\', \'' + Math.round(obj.results[i].collectionPrice * 100) + '\')" target="_blank">Add To Cart</button>';
                template += '</div>';
            }

            container.innerHTML = '';
            container.insertAdjacentHTML('afterbegin', template);

        } else {
            document.querySelector("#not_match").style.display = "block";
            setTimeout(function () {
                document.querySelector("#not_match").style.display = "none";
            }, 2000);

        }


    };


    this.init();

})();

// start of modal js

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

/* Add To Cart */

function addToCart(btn, albumArt, album, artist, price) {
    btn.innerHTML = "Added!"

    var template = "";
    
    template += '<div class="col-sm-3 album_item" id="mini_album_item">';
    template += '<div class="item_thmb" id="album_art" style="background:url(' + albumArt + ')"></div>';
    template += '<div id="song_info">';
    template += '<div class="item_title"> <p style="font-weight: bold; display: inline-block;">Album: </p>' + album + '</div>';
    template += '<div class="artist_name"> <p style="font-weight: bold; display: inline-block;">Artist: </p>' + artist + '</p></div>';
    template += '<div class="item_price"> <p style="font-weight: bold; display: inline-block;">Price: </p>' + price + ' points </div>';
    template += '</div>';
    template += '</div>';
    template += "<hr>";
    
    document.getElementById("cart").innerHTML += template;
}
