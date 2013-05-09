# Tower Binding

High-level data-binding component. Doesn't depend on the DOM at all.

## Installation

node.js:

```bash
$ npm install tower-binding
```

browser:

```bash
$ component install tower/binding
```

## Examples

```js
var binding = require('tower-binding');

var x = { title: 'foo' };
var y = { title: 'bar' };
var calls = [];

binding('title')
  .bind(function(ctx, a, b){
    a.title = b.title;
    calls.push('bind');
  })
  .unbind(function(ctx, a, b){
    calls.push('unbind');
  });

binding('title').init(x, y)
  .bind()
  .unbind();

assert('bind,unbind' === calls.join(','));
```

## License

MIT