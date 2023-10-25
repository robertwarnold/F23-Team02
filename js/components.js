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