import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    calculateTotal,
    calculateTotalPayable,
    handlePromotion,
} from '../../utils/Calculator';

import './Checkout.css';

export const CheckoutUnplugged = ({
    items,
    showTable,
    fullInfoItems,
    setShowTable,
}) => {  
    const [totalItems, setTotalItems] = useState(0);
    const [totalPromos, setTotalPromos] = useState(0);
    const [freeItems, setFreeItems] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);

    const handleCheckout = () => {
        if (items) {
            setShowTable(true);
            const total = handleTotal();
            const promos = handleTotalPromos();
            handleTotalPayable(total, promos);
        }
    }

    const handleTotalPayable = (total, promos) => {
        let newTotal = calculateTotalPayable(total, promos);
        setTotalPayable(newTotal);
    }

    const handleTotal = () => {
        const reducedTotal = calculateTotal(items);
        setTotalItems(reducedTotal);
        return reducedTotal;
    }

    const handleTotalPromos = () => {
        let promos = [];
        items.forEach(item => {
            const found = fullInfoItems.find(({ id }) => item.id === id);
            if (found) {
                const { promotions } = found;
                if (promotions) {
                    promotions.forEach(promotion => {
                        const result = handlePromotion(promotion, item);
                        if (result) {
                            result.isReducible ? promos.push(result) : setFreeItems(result);
                        }
                    });
                }
            }
        });
        const reducedPromos = promos.reduce((newTotal, item) => {
            return newTotal + item.value;
        }, 0);
        setTotalPromos(reducedPromos);
        return promos;
    }

    return (
        <div className="Checkout">
            <div className="button-container">
                <button
                    className="button is-info is-rounded"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
            {showTable && <table className="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>Total</th>
                        <th>Total Promos</th>
                        <th>Total Payable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            £{totalItems.toFixed(2)}
                        </td>
                        <td>
                            £{totalPromos.toFixed(2)}
                            {freeItems !== 0 && <span className="aditional-promo-info">
                                + {freeItems.free}X {freeItems.item} saving £{freeItems.value.toFixed(2)}
                            </span>}
                        </td>
                        <td>
                            £{totalPayable.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>}
        </div>
    );
}

const Checkout = ({ items }) => {
    const [fullInfoItems, setFullInfoItems] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        const fetchData = async (id) => {
            const found = fullInfoItems.find(item => item.id === id);
            if (!found) {
                const result = await axios.get(
                    `http://localhost:3001/products/${id}`
                );

                setFullInfoItems([...fullInfoItems, result.data]);
            }
        };
        if (items) {
            items.forEach(item => {
                fetchData(item.id);
            });;
        } 
        setShowTable(false);
    }, [items]);

    return (
        <CheckoutUnplugged
            showTable={showTable}
            fullInfoItems={fullInfoItems}
            items={items}
            setShowTable={setShowTable}
        />
    );
};

export default Checkout;