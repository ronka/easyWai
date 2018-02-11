# easyWai - v1.0.0 (beta) - [Demo](https://ronka.github.io/easyWai/).

#### Features
- Increase Font
- Decrease Font
- Readable Font
- Monochrome
- High Contrast
- Low Contrast
- Light Background
- Highlight Links
- Accessibility Statment
- Skip Content Button

#### Required Files
Add the css file and the js file, requires jquery installed
```
<link rel="stylesheet" href="easywai.css">
<script src="easywai.js"></script>
```

#### How to use
```javascript
$.easyWai({
    fade: true,
    position: {
        top: '60px',
        side: 'left',
    },
    features:{
        readableFont: 'פונט מאוד קריא'
        monochrome: false,
    },
    skipContent: '#main',
    accStatement: {
        url: '#'
    }
});
```

#### Settings
Name  | Description
------------- | -------------
position:side | Set the side of the accessibility menu, default right
position:top | Distance of the accessibility menu from top, drfault 20px
features | increaseFont,decreaseFont,readableFont,monochrome,highContrast,lowContrast,lightBG,highlightLinks, false to hide, string to change the text
accStatement:text | Accessibility statment button text, default "הצהרת נגישות"
accStatement:url | Accessibility statment url link, set false to hide
customIcon | pass html element to replace the icon, default font-awesome icon
skipContent | css selector to main content, default false
fade | if set to true, the menu will apper in a fade, default false