// Constructor function for the 'app' object
function app() {
    // DOM element references
    this.select = document.getElementsByTagName('select');
    this.listing = document.getElementById('listing');
    this.nameInput = document.getElementsByClassName('text-input');
    this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    this.checkboxLabel = document.querySelector('.price-filter label');

    // Sample mobile items data
    this.items = [
        // Mobile item 1
        {
            name: 'Apple iPhone 11',
            rom: '128gb',
            ram: '4gb',
            color: 'Green',
            price: 49000,
            brand: 'iphone',
            imageUrl: 'sample-mobile.webp'
        },
        // Mobile item 2
        {
            name: 'Samsung Galaxy S20 Ultra',
            rom: '128gb',
            ram: '12gb',
            color: 'Cosmic gray',
            price: 70000,
            brand: 'samsung',
            imageUrl: 'sample-mobile.webp'
        }
    ];

    // Object to store filter criteria
    this.filters = {
        name: '',
        brand: '',
        price: ''
    };

    // Initially, filteredItems is the same as the original items
    this.filteredItems = this.items;
}

// Function to render mobile items based on filtered criteria
app.prototype.render = function() {
    this.filteredItems.forEach((item) => {
        // Destructuring item properties for cleaner template string
        const { name, rom, ram, color, price } = item;

        // HTML template for each mobile item
        const template = `
            <div class="row">
                <div class="mobile-image">
                    <img src="images/sample-mobile.webp"/>
                </div>
                <div class="mobile-content">
                    <h3>
                        ${name} (${rom} ROM, ${ram} RAM, ${color})
                    </h3>
                    <h3>
                        INR ${price}
                    </h3>
                </div>
            </div>`;

        // Creating a new HTML element and adding the template content
        const element = document.createElement('div');
        element.innerHTML = template;

        // Appending the created element to the listing container
        this.listing.appendChild(element);
    });
}

// Function to bind events (input, change, click) to corresponding filters
app.prototype.bindEvents = function() {
    // Event listener for input changes in the name input field
    this.nameInput[0].addEventListener('input', (e) => {
        this.filters.name = e.target.value;
        this.filterResults();
    });

    // Event listener for changes in the brand select dropdown
    this.select[0].addEventListener('change', (e) => {
        this.filters.brand = e.target.value;
        this.filterResults();
    });

    // Event listeners for clicks on checkbox filters
    this.checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener('click', (e) => {
            // Handling price filter checkboxes
            if (!this.filters.price) {
                this.filters.price = [];
            }
            const index = this.filters.price.indexOf(e.target.value);
            if (index !== -1) {
                this.filters.price.splice(index, 1);
            } else {
                this.filters.price.push(e.target.value);
            }
            this.filterResults();
        });
    });
}

// Function to filter mobile items based on filter criteria
app.prototype.filterResults = function() {
    // Clearing the listing container before re-rendering
    this.listing.innerHTML = '';

    // Price range definitions
    const range = {
        '0': { min: 0, max: 10000 },
        '1': { min: 10000, max: 20000 },
        '2': { min: 20000, max: 30000 },
        '3': { min: 30000, max: 40000 },
        '4': { min: 40000, max: 50000 },
        '5': { min: 50000, max: Number.MAX_SAFE_INTEGER }
    };

    // Filtering items based on name, brand, and price criteria
    this.filteredItems = this.items.filter((item) => {
        let filter = true;

        // Check if the name filter is applied
        if (this.filters.name && !item.name.toLowerCase().includes(this.filters.name.toLowerCase())) {
            filter = false;
        }

        // Check if the brand filter is applied
        if (filter && this.filters.brand && !item.brand.toLowerCase().includes(this.filters.brand.toLowerCase())) {
            filter = false;
        }

        // Check if the price filter is applied
        if (filter && this.filters.price && this.filters.price.length > 0) {
            const result = this.filters.price.map((price) => range[price]);
            const filteredPrice = result.filter((eachItem) => {
                return item.price > eachItem.min && item.price <= eachItem.max;
            });

            // If no items match the price filter, set filter to false
            if (filteredPrice.length === 0) {
                filter = false;
            }
        }

        return filter;
    });

    // Render the filtered results
    this.render();
}

// Creating an instance of the 'app' object
const instance = new app();

// Initial rendering of mobile items
instance.render();

// Binding event listeners to filter changes
instance.bindEvents();
