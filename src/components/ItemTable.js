import React from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const ItemTable = ({ data }) => {

    return (
        <Card title="Item Data">
            <DataTable value={data}>
                <Column field="name" header="Name"></Column>
                <Column field="prince" header="Price"></Column>
            </DataTable>
        </Card>
    );
}

export default ItemTable;