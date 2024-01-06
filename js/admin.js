function admin() {
    this.form = document.getElementById('form');
}

admin.prototype.bindEvents = function() {
    this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formMap = {};
        for(const [key, value] of formData.entries()) {
            formMap[key] = value;
        }

        // Information Should be retained 
        if(localStorage.getItem('items')){
            const items = JSON.parse(localStorage.getItem('items')).concat([formMap]);
            localStorage.setItem('items',JSON.stringify(items));
        }else{
            // The key of what will be stored followed by the string that needs to be stored. 
            localStorage.setItem('items',JSON.stringify([formMap]));
        }
        
        window.location.reload();
    })
}

const adminInstance = new admin();
adminInstance.bindEvents();