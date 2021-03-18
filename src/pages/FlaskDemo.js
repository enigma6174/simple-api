import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from 'axios';

import NewStore from '../components/NewStore';
import ItemTable from '../components/ItemTable';
import NewStoreItem from '../components/NewStoreItem';

import { BASE_URL, headerConfiguration } from '../api/Index';

const FlaskDemo = () => {

    // Set the visibility of the different UI elements
    const [itemVisible, isItemVisible] = useState(false);
    const [storeVisible, isStoreVisible] = useState(false);
    const [storeFetched, isStoreFetched] = useState(false);

    // Save the list of stores objects returned by API
    const [stores, setStores] = useState([]);

    // Save the list of items returned by the selected store
    const [items, setItems] = useState([]);

    // Store the selected item from the dropdown
    const [selectedStore, setSelectedStore] = useState(null);

    // Fetch the list of stores and set the state
    const fetchStores = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/store`, headerConfiguration);
            setStores(response.data['stores']);  
        }
        catch (error) {
            console.log(error);
        }
    };

    // Function to toggle the display of the create store modal
    const onStoreHide = () => {
        isStoreVisible(false);
    };
    const onStoreShow = () => {
        isStoreVisible(true);
    };

    // Function to toggle the display of the create store items modal
    const onItemHide = () => {
        isItemVisible(false);
    };

    const onItemShow = () => {
        isItemVisible(true);
    }

    // Fetch the list of items for a given store and set the state
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/store/${selectedStore['name']}`, headerConfiguration);
            setItems(response.data['items']);
            isStoreFetched(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    // Handle store selection from dropdown
    const onStoreSelect = (e) => {
        setSelectedStore(e.value);
    };

    // Functions to call when the component is initialized
    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <div>
            <div className="card">
                <h3>Stores</h3>
                <Dropdown 
                    value={selectedStore} 
                    options={stores} 
                    onChange={onStoreSelect} 
                    optionLabel="name" 
                    placeholder="Select Store" 
                    className="p-mb-2"
                />
                <Button label="Fetch Store Items" className="p-button-raised p-m-2" onClick={fetchItems} />
                <Button label="Create Store" className="p-button-text p-mb-2" onClick={onStoreShow} />
                <Button label="Create Store Item" className="p-button-text p-button-secondary p-mb-2" onClick={onItemShow} />
            </div>
            {storeFetched && <ItemTable data={items} />}
            {storeVisible && <NewStore visible={storeVisible} onHide={onStoreHide} />}
            {itemVisible && <NewStoreItem store={selectedStore['name']} visible={itemVisible} onHide={onItemHide} />}
        </div>
    );
}

export default FlaskDemo;