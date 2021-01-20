import { create } from 'react-test-renderer';
import App from './App';

import ItemFinder from './components/ItemFinder/ItemFinder';

test('render initial component', () => {
  const root = create(<App />).root;
  const elements = root.findAllByType(ItemFinder);
  expect(elements.length).toBe(1)
});