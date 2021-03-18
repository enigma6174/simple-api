import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';

import { BASE_URL, headerConfiguration } from '../api/Index';

const NewStore = ({ visible, onHide }) => {

    // State management for the new store name
    const [store, setStore] = useState(null);

    // State management for the response message
    const [responseMessage, setResponseMessage] = useState(null);

    // State management to toggle the response message display
    const [isResponseSet, toggleIsResponseSet] = useState(false);

    // Create a new store by making a POST request to the server
    const createStore = async () => {
        try {
            await axios.post(`${BASE_URL}/store`, {"name": store}, headerConfiguration);
            setResponseMessage("New Store Created Successfully!");
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
                <Button label="Submit" icon="pi pi-check" onClick={createStore} />
                <Button label="Cancel" icon="pi pi-times" onClick={onHide} />
            </div>
        );
    }

    return (
        <Dialog header="Create New Store" style={{ width: '25vw' }} visible={visible} modal onHide={onHide} footer={renderFooter()}>
            <div className="p-field">
                <label htmlFor="store-name" className="p-d-block">Item Name</label>
                <InputText value={store} style={{ width: '22vw' }} onChange={(e) => setStore(e.target.value)} />
            </div>
            {isResponseSet &&
                <div>
                    <p>{ responseMessage }</p>
                </div>
            }
        </Dialog>
    );
}

export default NewStore;