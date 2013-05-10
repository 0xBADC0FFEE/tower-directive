# Tower Directive

High-level data-directive component. Doesn't depend on the DOM at all.

## Installation

node.js:

```bash
$ npm install tower-directive
```

browser:

```bash
$ component install tower/directive
```

## Examples

```js
var directive = require('tower-directive');

var x = { title: 'foo' };
var y = { title: 'bar' };
var calls = [];

directive('title')
  .bind(function(ctx, a, b){
    a.title = b.title;
    calls.push('bind');
  })
  .unbind(function(ctx, a, b){
    calls.push('unbind');
  });

directive('title').init(x, y)
  .bind()
  .unbind();

assert('bind,unbind' === calls.join(','));
```

## Testing

Install testem:

```bash
$ npm install -g testem
```

Install Node Packages:
```bash
$ npm link
```

Install Components:
```bash
$ component install -d
```

Run tests:

```bash
$ testem
```

Then, open all the browsers you want to test by going to the outputted url defaulted to [http://localhost:7357](http://localhost:7357)

Tests will run on any open browser linked to the stated url and your current Node environment.

## Contributing

Before you send a pull request, make sure your code meets the style guidelines at [https://github.com/tower/style-guide](https://github.com/tower/style-guide) and all tests pass.

## Notes

- http://en.wikipedia.org/wiki/Scope_(computer_science)
- http://docs.angularjs.org/guide/directive
- scope/directive?

## License

MIT