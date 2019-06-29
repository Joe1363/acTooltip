# acToolip
Lightweight Javascript Tooltip

Requires jQuery. Built with jQuery 3.3.1.

## Basic Use
The main functions are open and close. Open with will accept the id of other target element along with the desired content and parameters. Any open tooltips of the given target id are closed before a new one is opened. acTooltip does not provide any styling by default so it will need to given within the content.
```
acTooltip.open( 'target_id', { content: '<div>Tooltip Content</div>' } );
```

Close the tooltip.
```
acTooltip.close();
```

Note that acTooltip is appended to the parent of the given target element.

If an error is encountered while processing the given content a tooltip with minimal styling will display an error message of 'Unable to load content at this time.' The error tooltip has the id "actError" if overriding it's default style is desired.


## Parameter Options

### content - String/JSON or Object/Hash
Loads and displays tooltip content.
The content parameter takes either a string or an object

###### As String
When content value is a string it will be interpreted as being HTML and display it.
```
acTooltip.open( 'target_id', content: '<div><h1>Tooltip Content</h1></div>' );
```

###### As Object
When content value is an object it will be directed to retrieve content as JSON via built in jQuery AJAX call. Call dataType is JSON and will expect HTML returned as JSON as the key content. Ex) {content: "HTML String"}.

###### Content Object Parameters
**url** - string (Required)
Url to retrieve JSON from.

**type** - string
Request type. Defaults to GET if not present.

**data** - object
Parameters to pass into AJAX call.
```
acTooltip.open( 'target_id', { content: {url: "/get_tooltip_content"} } );
acTooltip.open( 'target_id', { content: {url: "/get_tooltip_content", data: {id: 1}, type: "POST"} } );
```

### anchor - String
Specifies how to position the tooltip in relation to the div it's inserted into. Valid options are: 'top-right', 'top-left', 'bottom-right', 'bottom-left'. If no anchor is provided it will default to 'top-right'.
```
acTooltip.open( 'target_id', { content: '<div>Content</div>', anchor: 'top-left' } );
```

### width - String
Sets width of the tooltip if provided.
```
acTooltip.open( 'target_id', { content: '<div>Content</div>', width: '300px' } );
acTooltip.open( 'target_id', { content: '<div>Content</div>', width: '25vw' } );
```

### addClass - String
Adds given class or classes to the tooltip.
```
acTooltip.open( 'target_id', { content: '<div>Content</div>', addClass: 'tooltip_1' } );
acTooltip.open( 'target_id', { content: '<div>Content</div>', addClass: 'tooltip_2 blue_background' } );
```

### overlayClose - Boolean
Sets behavior for closing tooltip. Default behavior is to close when any area outside the tooltip div is clicked. Defaults to true if not given. If set to false, a method of closing the tooltip will need to be provided.
```
acTooltip.open( 'target_id', { content: '<div>Content</div>', overlayClose: false } );
```

### errorText - String
Override default error text.
```
acTooltip.open('target_id', { content: '<div>Content</div>', errorText: 'Custom error message.' } );
```
