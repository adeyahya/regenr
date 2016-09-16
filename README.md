# Regenr
React Generator

##Summary
Regenr is a command-line interface that helps Generating ReactJs Components.

##Installation
`npm install -g regenr`

##Usage
`regenr <path>/<componentName> [options]` 

Example:
`regenr src/Components/Header` will provides:

*Header.js*
```javascipt
import React from 'react'
import styles from './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';
  }
  render() {
    return (
            <div className={styles.Header}>
            </div>
    )
  }
}

export default Header
```

*Header.scss*
```sass
.Header{
    // your code here
}
```

*package.json*
```json
{
    "name": "Header",
    "version": "0.0.0",
    "private": true,
    "main": "./Header.js"
}
```

#Options
`-c [css preprocessor]` or `--css [css preprocessor]`

Example:
`regenr src/Components/Header -c less`

Will provide .less integration

###Screenshot
![Screenshot](/ss1.png?raw=true "Screenshot")

###License
MIT