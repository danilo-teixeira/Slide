# Slide

Slide is a simple slide of my personal library.

### markup
```html

<div id="content-slide">
	<img src="http://dummyimage.com/300x250/000/686a82.gif&text=image+1" alt="1">
	<img src="http://dummyimage.com/300x250/000/686a82.gif&text=image+2" alt="2">
	<img src="http://dummyimage.com/300x250/000/686a82.gif&text=image+3" alt="3">
</div>

<script type="text/javascript" src="src/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="dist/slide.jquery.min.js"></script>
```

### call

```html
<script type="text/javascript">
	
	$( "#content-slide" ).slide( {
		"effect" : "easeInQuad", // set effect
		/* set nav selector style*/
		"nav-selector" : {
			"width" : "15px",
			"height" : "15px",
			"float" : "left",
			"margin-left" : "3px",
			"border" : "1px solid #ccc",
			"border-radius" : "50%",
			"cursor" : "pointer"
		},
		"class-nav-selector-selected" : "nav-selector-selected" /* class nav selector selected */
	} );

</script>
```
by Danilo Teixeira

## Licensa

MIT License

Copyright (C) 2013 Danilo Teixeira.