# Regenr
React Generator

## Summary
Regenr is a command-line interface that helps Generating ReactJs Components.

## Installation
`npm install -g regenr`

## Usage
```bash
$ regenr <path>/<componentName> [options]
``` 

Example:
```bash
$ regenr src/Components/Header
```
will provides:

*Header.js*
```javascript
import React from 'react'
import styles from './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Header'
  }
  render() {
    return (
      <div className={styles.Header}>
        {/* Your code here */}
      </div>
    )
  }
}

export default Header
```

*Header.scss*
```sass
.Header{
  /* Your stylesheet here */
}
```

*index.js*
```js
export default './Header.js'
```

# Options
`-c [css preprocessor]` or `--css [css preprocessor]`

Example:
```bash
$ regenr src/Components/Header -c less
```

Will provide .less integration

### Screenshot

![Screenshot](/ss1.png?raw=true "Screenshot")

### License
MIT
