document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('priceForm');
    const priceList = document.getElementById('priceList');

    // Load data from server
    const loadData = async () => {
        try {
            const response = await fetch('http://localhost:3000/prices');
            const data = await response.json();
            data.forEach(item => addItemToList(item));
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    // Add item to list with delete functionality
    const addItemToList = ({ _id, name, price, region, jobType, materialType, supplier, unit, quantity }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${name} (${region}, ${jobType}, ${materialType}, ${supplier}): ${unit}, ${quantity}, ¥${price} <button class="delete-btn"><i class="fas fa-trash"></i></button>`;
        priceList.appendChild(listItem);

        // Add delete functionality
        listItem.querySelector('.delete-btn').addEventListener('click', async function() {
            try {
                await fetch(`http://localhost:3000/prices/${_id}`, { method: 'DELETE' });
                priceList.removeChild(listItem);
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        });
    };

    // Submit form data to server
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value.trim();
        const itemPrice = document.getElementById('itemPrice').value.trim();
        const region = document.getElementById('regionSelect').value;
        const jobType = document.getElementById('jobType').value;
        const materialType = document.getElementById('materialType').value.trim();
        const supplier = document.getElementById('supplier').value.trim();
        const unit = document.getElementById('unit').value.trim();
        const quantity = document.getElementById('quantity').value.trim();

        if (itemName && itemPrice && unit && quantity && materialType && supplier) {
            const newItem = { name: itemName, price: itemPrice, region, jobType, materialType, supplier, unit, quantity };
            try {
                const response = await fetch('http://localhost:3000/prices', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newItem)
                });
                const savedItem = await response.json();
                addItemToList(savedItem);
                form.reset();
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            alert('请输入所有必填信息。');
        }
    });

    // Load existing data on page load
    loadData();
});