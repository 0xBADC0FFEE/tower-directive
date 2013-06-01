# Tower Directive

API to the DOM.

## Installation

```bash
$ component install tower/directive
```

## Examples

```js
var directive = require('tower-directive');

directive('data-text', function(scope, element, attr){
  element.textContent = scope[attr.value];
});

var content = { foo: 'Hello World' };
var element = document.querySelector('#example');

directive('data-text').exec(content, element);
```

```html
<span id="example" data-text="foo"></span>
```

becomes:

```html
<span id="example" data-text="foo">Hello World</span>
```

The directives are used more robustly in [tower-template](https://github.com/tower/template).

## API

### exec(content, element)

This one must be exact to maximize performance.

### directive.exec(content, element)

Globally execute all directives.

### directive.exec(content)
### directive.exec(element)
### directive.exec()

## Running Tests

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

- http://en.wikipedia.org/wiki/Content_(media)
- http://en.wikipedia.org/wiki/Scope_(computer_science)
- http://en.wikipedia.org/wiki/Directive_(programming)

## License

MIT