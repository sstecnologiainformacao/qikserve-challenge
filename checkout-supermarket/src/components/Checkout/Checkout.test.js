import * as React from 'react'
import { create, act } from 'react-test-renderer';

import { CheckoutUnplugged } from './Checkout';


test('render initial component without items to render', () => {
  const items = [];
  const root = create(<CheckoutUnplugged
    items={items}
    showTable={false}
    fullInfoItems={[]}
    setShowTable={jest.fn()}/>
  ).root;
  const elements = root.findAllByType('table');
  expect(elements.length).toBe(0);
});

test('render component with items to render', () => {
  const promotion = {
    required_qty: 2,
    type: 'FLAT_PERCENT',
    amount: 10,
  };

  const item = {
    amount: 2,
    price: 100,
    name: 'Burger',
  };

  const items = [item];
  const root = create(<CheckoutUnplugged
    items={items}
    showTable={true}
    fullInfoItems={[{
      ...item,
      promotions: [promotion]
    }]}
    setShowTable={jest.fn()}/>
  ).root;
  const elements = root.findAllByType('table');
  expect(elements.length).toBe(1);

  const button = root.find((el) => el.type == 'button');
  act(() => {
    button.props.onClick();
  });

  const trs = root.findAllByType('tr');
  expect(trs.length).toBe(2);

  const tds = root.findAllByType('td');
  expect(tds.length).toBe(3);
  expect(tds[0].props.children[1]).toBe('2.00');
  expect(tds[1].props.children[1]).toBe('0.20');
  expect(tds[2].props.children[1]).toBe('1.80');
});

test('render component with promotion reduce payable total', () => {
  const promotion = {
    required_qty: 2,
    type: 'BUY_X_GET_Y_FREE',
  };

  const item = {
    amount: 2,
    price: 1000,
    name: 'Burger',
  };

  const items = [item];
  const root = create(<CheckoutUnplugged
    items={items}
    showTable={true}
    fullInfoItems={[{
      ...item,
      promotions: [promotion]
    }]}
    setShowTable={jest.fn()}/>
  ).root;
  const elements = root.findAllByType('table');
  expect(elements.length).toBe(1);

  const button = root.find((el) => el.type == 'button');
  act(() => {
    button.props.onClick();
  });

  const trs = root.findAllByType('tr');
  expect(trs.length).toBe(2);

  const tds = root.findAllByType('td');
  expect(tds.length).toBe(3);
  expect(tds[0].props.children[1]).toBe('20.00');
  expect(tds[1].props.children[1]).toBe('0.00');
  expect(tds[2].props.children[1]).toBe('20.00');
});

test('render component with items to render without promotions', () => {

  const item = {
    amount: 2,
    price: 1000,
    name: 'Burger',
  };

  const items = [item];
  const root = create(<CheckoutUnplugged
    items={items}
    showTable={true}
    fullInfoItems={[{
      ...item,
      promotions: null
    }]}
    setShowTable={jest.fn()}/>
  ).root;
  const elements = root.findAllByType('table');
  expect(elements.length).toBe(1);

  const button = root.find((el) => el.type == 'button');
  act(() => {
    button.props.onClick();
  });

  const trs = root.findAllByType('tr');
  expect(trs.length).toBe(2);

  const tds = root.findAllByType('td');
  expect(tds.length).toBe(3);
  expect(tds[0].props.children[1]).toBe('20.00');
  expect(tds[1].props.children[1]).toBe('0.00');
  expect(tds[2].props.children[1]).toBe('20.00');
});

test('click button without items', () => {
  const items = [];
  const root = create(<CheckoutUnplugged
    items={items}
    showTable={false}
    fullInfoItems={[]}
    setShowTable={jest.fn()}/>
  ).root;
  const button = root.find((el) => el.type == 'button');
  button.props.onClick();

  const trs = root.findAllByType('tr');
  expect(trs.length).toBe(0);

  const tds = root.findAllByType('td');
  expect(tds.length).toBe(0);
});