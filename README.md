# MQOrientationChange

MQOrientationChange is a library to normallize the behavior of orientationchange accross devices.  Frustrated mobile html developers will find that the response to the orientationchange event accross android browsers, iOS browsers, and webOS browsers is not consistent.  Some browsers don't even have the event.  

Since this plugin is writen using the special events API of jQuery, the developer can bind to the 'mqorientationchange' event just like any other event.

##Example Usage

First, load MQOrientationChange after jQuery.

Then simple bind to the event, binding to the document is recomended but not required.  Once the library is loaded, the developer will have access to the variable: window.mqorientation which will return 0 or 90 for portrait or landscape respectively.

```javascript
$(document).bind('mqorientationchange', function(){
  //handle the change here
  if(window.mqorientation === 90){
    //this is landscape
  } else {
    //this is portrait
  }
}):
```
