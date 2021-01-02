import createElement from './core/createElement';
import render from './core/render';

const app = createElement('div', {
  attrs: {
    id: 'app'
  },
  children: [
    createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/tkApIfibjeWt1ufWwj/giphy.gif',
      }
    })
  ]
})

const $app = render(app)

console.log($app, app, 'app')