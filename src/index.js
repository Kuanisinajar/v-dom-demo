import createElement from './core/createElement';
import render from './core/render';
import mount from './core/mount';
import diff from './core/diff';

let count = 0;

function createVApp(count) {
  return createElement('div', {
    attrs: {
      id: 'app',
      dataCount: count,
    },
    children: [
      String(count),
      createElement('input', {
        attrs: {}
      }),
      createElement('img', {
        attrs: {
          src: 'https://media.giphy.com/media/tkApIfibjeWt1ufWwj/giphy.gif',
        }
      })
    ]
  })
}

let app = createVApp(count);
const $app = render(app)

const $root = mount($app, document.getElementById('root'))

setInterval(() => {
  count++;
  const newApp = createVApp(count);
  const patch = diff(app, newApp);
  patch($root);

  app = newApp;
}, 1000)

console.log($app, app, 'app')