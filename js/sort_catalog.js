// Sample array of store items
const storeItems = [
    { name: 'Item D', price: 30 },
    { name: 'Item B', price: 50 },
    { name: 'Item A', price: 20 },
    { name: 'Item C', price: 40 },
  ];
  
  // Function to sort items by name A to Z
  function sortByNameAZ() {
    storeItems.sort((a, b) => a.name.localeCompare(b.name));
    displayItems();
  }
  
  // Function to sort items by name Z to A
  function sortByNameZA() {
    storeItems.sort((a, b) => b.name.localeCompare(a.name));
    displayItems();
  }
  
  // Function to sort items by price, highest to lowest
  function sortByPriceHighToLow() {
    storeItems.sort((a, b) => b.price - a.price);
    displayItems();
  }
  
  // Function to sort items by price, lowest to highest
  function sortByPriceLowToHigh() {
    storeItems.sort((a, b) => a.price - b.price);
    displayItems();
  }
  
  // Function to display sorted items
  function displayItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
  
    storeItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Name: ${item.name}, Price: $${item.price}`;
      itemList.appendChild(listItem);
    });
  }
  
  // Initial display of unsorted items
  displayItems();
  
  // Event listeners for sorting buttons
  document.getElementById('sort-name-az').addEventListener('click', sortByNameAZ);
  document.getElementById('sort-name-za').addEventListener('click', sortByNameZA);
  document.getElementById('sort-price-high-low').addEventListener('click', sortByPriceHighToLow);
  document.getElementById('sort-price-low-high').addEventListener('click', sortByPriceLowToHigh);
  