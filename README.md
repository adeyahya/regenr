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
```javascript
export default './Header.js'
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