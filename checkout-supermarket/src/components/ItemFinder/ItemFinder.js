import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ItemFinder.css'

export const ItemFinderUnplugged = ({ onAddItem, items, selectedItems }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSetSelectedItem = value => {
        if (value) {
            if (value === 'empty-option') {
                setSelectedItem(null);
            } else {
                setSelectedItem(value);
            }
        }
    }

    const handleAddItem = (item) => {
        const found = selectedItems.find(selectedItem => selectedItem.id === item.id);
        if (!found) {
            onAddItem([...selectedItems, {...item, amount: 1}]);
        } else {
          const items = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
          found.amount = found.amount + 1;
          onAddItem([...items, found]);
        }
      }

    return (
        <div className="ItemFinder">
            <div className="select is-rounded space-between">
                <select onChange={(value) => handleSetSelectedItem(value.target.value)}>
                    <option key="empty-option" value="empty-option">
                       Choose here your item...
                    </option>
                    {
                        items.map(item => (
                            <option 
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button
                disabled={selectedItem === null}
                className="button is-primary is-rounded space-between"
                onClick={() => handleAddItem(items.find(({ id }) => id === selectedItem))}
            >
                {selectedItem !== null ? 'Add this to the basket' : '... and then click here to add'}
            </button>
        </div>
    );
};

const ItemFinder = ({ onAddItem, selectedItems }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3001/products'
            );
            setItems(result.data);
        } 
        fetchData();
    }, []);

    return <ItemFinderUnplugged onAddItem={onAddItem} items={items} selectedItems={selectedItems} />
}

export default ItemFinder;