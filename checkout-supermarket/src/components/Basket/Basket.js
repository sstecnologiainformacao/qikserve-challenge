import React from 'react';
import './Basket.css';

const Basket = ({ items }) => (
    <div className='Basket'>
        <table className="table is-bordered is-fullwidth">
            <thead>
                <tr>
                    <th>Added Items</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    items && items.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.amount}X {item.name}
                                </td>
                                <td>
                                    £{((item.price / 100) * item.amount).toFixed(2)}
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    </div>
);

export default Basket;