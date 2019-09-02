import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './App.css';
import paper from 'paper';

const Paper = props => {
  const canvas = React.useRef();

  React.useEffect(() => {
    paper.setup(canvas.current);
  }, []);

  const line = (x1, y1, x2, y2) => {
    new paper.Path({strokeColor: 'black', segments: [[x1, y1], [x2, y2]]});
  };

  const times = n => Array(n).fill();
  const lerp = (start, stop, amt) => start + (stop - start) * amt;

  const burst = (x, y, r, count = 10) => {
    times(count)
      .map(_ => lerp(0, 6.28, Math.random()))
      .map(theta =>
        line(x, y, x + r * Math.cos(theta), y + r * Math.sin(theta))
      );
  };

  const handleKey = key => {
    switch (key) {
      case 'l':
        return line(
          lerp(10, 90, Math.random()),
          lerp(10, 90, Math.random()),
          lerp(10, 90, Math.random()),
          lerp(10, 90, Math.random())
        );

      case 'b':
        return burst(
          lerp(10, 90, Math.random()),
          lerp(10, 90, Math.random()),
          lerp(10, 20, Math.random())
        );

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
    </div>
  );
};

function App() {
  return <Paper />;
}

export default App;
