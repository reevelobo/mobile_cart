function app() {
    this.select = document.getElementsByTagName('select');
    this.listing = document.getElementById('listing');
    this.nameInput = document.getElementsByClassName('text-input');
    this.checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    this.checkboxLabel = document.querySelector('.price-filter label');
    this.items = JSON.parse(localStorage.getItem('items'));
    this.filters = {
        name: '',
        brand: '',
        price: ''
    };
    this.filteredItems = this.items;
}

app.prototype.render = function() {
    this.filteredItems.forEach((item) => {
        const { name, rom, ram, color, price } = item;
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
        const element = document.createElement('div');
        element.innerHTML = template;
        this.listing.appendChild(element);
    });
}

app.prototype.bindEvents = function() {
    this.nameInput[0].addEventListener('input', (e) => {
        this.filters.name = e.target.value;
        this.filterResults();
    });

    this.select[0].addEventListener('change', (e) => {
        this.filters.brand = e.target.value;
        this.filterResults();
    });

    this.checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener('click', (e) => {
            if(!this.filters.price) {
                this.filters.price = [];
            }
            const index = this.filters.price.indexOf(e.target.value);
            if(index !== -1) {
                this.filters.price.splice(index, 1);
            }
            else {
                this.filters.price.push(e.target.value);
            }
            this.filterResults();
        });
    });
}

app.prototype.filterResults = function() {
    this.listing.innerHTML = '';
    const range = {
        '0': {
            min: 0,
            max: 10000
        },
        '1': {
            min: 10000,
            max: 20000
        },
        '2': {
            min: 20000,
            max: 30000
        },
        '3': {
            min: 30000,
            max: 40000
        },
        '4': {
            min: 40000,
            max: 50000
        },
        '5': {
            min: 50000,
            max: Number.MAX_SAFE_INTEGER
        }
    };
    this.filteredItems = this.items.filter((item) => {
        let filter = true;
        if(this.filters.name && !item.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())) {
            filter = false;
        };

        if(filter && this.filters.brand && !item.brand.toLocaleLowerCase().includes(this.filters.brand.toLocaleLowerCase())) {
            filter = false;
        };

        if(filter && this.filters.price && this.filters.price.length > 0) {
            const result = this.filters.price.map((price) => {
                return range[price];
            });
            const filteredPrice = result.filter((eachItem) => {
                return item.price > eachItem.min && item.price <= eachItem.max;
            });

            if(filteredPrice.length === 0) {
                filter = false;
            }
        }

        return filter;
    });
    this.render();
}

const instance = new app();
instance.render();
instance.bindEvents();