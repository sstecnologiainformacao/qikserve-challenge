import { create } from 'react-test-renderer';
import Basket from './Basket';


test('render initial component', () => {
  const root = create(<Basket />).root;
  const elements = root.findAllByType('table');
  expect(elements.length).toBe(1)
});

test('render table with items', () => {
  const items = [{
    id: 'id',
    amount: 1,
    name: 'Burger',
    price: 100,
  }];
  const root = create(<Basket items={items} />).root;
  const elements = root.findAllByType('table');
  expect(elements.length).toBe(1)
});