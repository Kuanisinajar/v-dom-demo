import createElement from './core/createElement';
import render from './core/render';
import mount from './core/mount';

const app = createElement('div', {
  attrs: {
    id: 'app'
  },
  children: [
    'cool',
    createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/tkApIfibjeWt1ufWwj/giphy.gif',
      }
    })
  ]
})

const $app = render(app)

mount($app, document.getElementById('root'))

console.log($app, app, 'app')