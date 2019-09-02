import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';
import paper from 'paper';
import {times, lerp} from './utils';

function reducer(items, action) {
  switch (action.type) {
    case 'add':
      return [...items, action.value];
    case 'remove':
      return items.filter(i => i !== action.value);
    default:
      console.log('unhandled action', action);
      return items;
  }
}

const Paper = props => {
  const canvas = React.useRef();

  const [items, dispatch] = React.useReducer(reducer, []);
  const addItem = item => dispatch({type: 'add', value: item});
  const removeItem = item => {
    dispatch({type: 'remove', value: item});
    item.remove();
  };
  window.items = items;

  React.useEffect(() => {
    paper.setup(canvas.current);
  }, []);

  const line = (x1, y1, x2, y2) =>
    new paper.Path({strokeColor: 'black', segments: [[x1, y1], [x2, y2]]});

  const burst = (x, y, r, count = 10) => {
    return new paper.Group({
      children: times(count)
        .map(_ => lerp(0, 6.28, Math.random()))
        .map(theta =>
          line(x, y, x + r * Math.cos(theta), y + r * Math.sin(theta))
        ),
      name: 'burst',
    });
  };

  const handleKey = key => {
    switch (key) {
      case 'l':
        addItem(
          line(
            lerp(10, 90, Math.random()),
            lerp(10, 90, Math.random()),
            lerp(10, 90, Math.random()),
            lerp(10, 90, Math.random())
          )
        );
        break;

      case 'b':
        addItem(
          burst(
            lerp(10, 90, Math.random()),
            lerp(10, 90, Math.random()),
            lerp(10, 20, Math.random())
          )
        );
        break;

      default:
        console.log('unhandled key', key);
    }
  };

  return (
    <div>
      <KeyboardEventHandler
        handleKeys={['alphanumeric']}
        onKeyEvent={handleKey}
      />
      <canvas ref={canvas} width={400} height={400} />
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={() => removeItem(item)}>
            {item.className}: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return <Paper />;
}

export default App;
