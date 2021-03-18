import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';

import { BASE_URL, headerConfiguration } from '../api/Index';

const NewStoreItem = ({ store, visible, onHide }) => {

    // State management for the new store items
    const [item, setItem] = useState(null);
    const [price, setPrice] = useState(null);

    // State management for the response message
    const [responseMessage, setResponseMessage] = useState(null);

    // State management to toggle the response message display
    const [isResponseSet, toggleIsResponseSet] = useState(false);

    // Create a new store item by making a POST request to the server
    const createStoreItem = async () => {
        try {
            await axios.post(`${BASE_URL}/store/${store}/item`, {"name": item, "price": price}, headerConfiguration);
            setResponseMessage("New Item Added To Store!");
            toggleIsResponseSet(true);
        }
        catch (error) {
            setResponseMessage("There Was An Error!");
            toggleIsResponseSet(true);
        }
    }

    // Footer section of the dialog
    const renderFooter = () => {
        return (
            <div>
                <Button label="Submit" icon="pi pi-check" onClick={createStoreItem} />
                <Button label="Cancel" icon="pi pi-times" onClick={onHide} />
            </div>
        );
    }

    return (
        <Dialog header="Create New Store" style={{ width: '25vw' }} visible={visible} modal onHide={onHide} footer={renderFooter()}>
            <div className="p-field">
                <label htmlFor="item-name" className="p-d-block">Item Name</label>
                <InputText value={item} style={{ width: '22vw' }} onChange={(e) => setItem(e.target.value)} />
            </div>
            <div className="p-field">
                <label htmlFor="item-price" className="p-d-block">Item Price</label>
                <InputText value={price} style={{ width: '22vw' }} onChange={(e) => setPrice(e.target.value)} />
            </div>
            {isResponseSet &&
                <div>
                    <p>{ responseMessage }</p>
                </div>
            }
        </Dialog>
    );
}

export default NewStoreItem;