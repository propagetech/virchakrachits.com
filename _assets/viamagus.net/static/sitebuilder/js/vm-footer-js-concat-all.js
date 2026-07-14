/**
 * Galleria v 1.3.5 2014-01-25
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */
!function($,window,Galleria,undef){function m(){}function n(){return!1}function p(){return{html:b.documentElement,body:b.body,head:b.getElementsByTagName("head")[0],title:b.title}}function
// legacy options
// allows the old my_setting syntax and converts it to camel case
t(i){var n;return"object"!=typeof i||$.each(i,function(t,e){/^[a-z]+_/.test(t)&&(n="",$.each(t.split("_"),function(t,e){n+=0<t?e.substr(0,1).toUpperCase()+e.substr(1):e}),i[n]=e,delete i[t])}),i}function u(t){
// allow 'image' instead of Galleria.IMAGE
return-1<$.inArray(t,z)?Galleria[t.toUpperCase()]:t}function w(t,e){for(var i=0;i<H._inst.length;i++)if(H._inst[i].id===e&&H._inst[i].type==t)return H._inst[i];this.type=t,this.id=e,this.readys=[],H._inst.push(this);var n=this;$.extend(this,H[t]),$.getJSON(this.getUrl(),function(t){n.data=t,$.each(n.readys,function(t,e){e(n.data)}),n.readys=[]}),this.getMedia=function(e,i,n){n=n||m;function la(t){i(a["get_"+e](t))}var a=this;try{a.data?la(a.data):a.readys.push(la)}catch(t){n()}}}function
// utility for testing the video URL and getting the video ID
x(t){var e;for(var i in H)if((e=t&&H[i].reg&&t.match(H[i].reg))&&e.length)return{id:e[2],provider:i};return!1}function
// themeLoad trigger
E(t){Galleria.theme=t,
// run the instances we have in the pool
$.each(U,function(t,e){e._initialized||e._init.call(e)}),U=[]}function
// play icon
G(t){return W.insertStyleTag(".galleria-videoicon{width:60px;height:60px;position:absolute;top:50%;left:50%;z-index:1;margin:-30px 0 0 -30px;cursor:pointer;background:#000;background:rgba(0,0,0,.8);border-radius:3px;-webkit-transition:all 150ms}.galleria-videoicon i{width:0px;height:0px;border-style:solid;border-width:10px 0 10px 16px;display:block;border-color:transparent transparent transparent #ffffff;margin:20px 0 0 22px}.galleria-image:hover .galleria-videoicon{background:#000}","galleria-videoicon"),$(W.create("galleria-videoicon")).html("<i></i>").appendTo(t).click(function(){$(this).siblings("img").mouseup()})}
/*global jQuery, navigator, Image, module, define */
// some references
var s,l,c,h,d,f,g,v,y,_,e,i,b=window.document,T=$(b),k=$(window),
// native prototypes
C=Array.prototype,a=!0,I=!1,S=navigator.userAgent.toLowerCase(),r=window.location.hash.replace(/#\//,""),o=window.location.protocol,A=Math,D=function(){for(var t=3,e=b.createElement("div"),i=e.getElementsByTagName("i");e.innerHTML="\x3c!--[if gt IE "+ ++t+"]><i></i><![endif]--\x3e",i[0];);return 4<t?t:b.documentMode||undef}(),L=window.parent!==window.self,
// list of Galleria events
P="data ready thumbnail loadstart loadfinish image play pause progress fullscreen_enter fullscreen_exit idle_enter idle_exit rescale lightbox_open lightbox_close lightbox_image",z=(i=[],$.each(P.split(" "),function(t,e){i.push(e),
// legacy events
/_/.test(e)&&i.push(e.replace(/_/g,""))}),i),
// video providers
H={youtube:{reg:/https?:\/\/(?:[a-zA_Z]{2,3}.)?(?:youtube\.com\/watch\?)((?:[\w\d\-\_\=]+&amp;(?:amp;)?)*v(?:&lt;[A-Z]+&gt;)?=([0-9a-zA-Z\-\_]+))/i,embed:function(){return"http://www.youtube.com/embed/"+this.id},getUrl:function(){return o+"//gdata.youtube.com/feeds/api/videos/"+this.id+"?v=2&alt=json-in-script&callback=?"},get_thumb:function(t){return t.entry.media$group.media$thumbnail[2].url},get_image:function(t){return t.entry.yt$hd?o+"//img.youtube.com/vi/"+this.id+"/maxresdefault.jpg":t.entry.media$group.media$thumbnail[3].url}},vimeo:{reg:/https?:\/\/(?:www\.)?(vimeo\.com)\/(?:hd#)?([0-9]+)/i,embed:function(){return"http://player.vimeo.com/video/"+this.id},getUrl:function(){return o+"//vimeo.com/api/v2/video/"+this.id+".json?callback=?"},get_thumb:function(t){return t[0].thumbnail_medium},get_image:function(t){return t[0].thumbnail_large}},dailymotion:{reg:/https?:\/\/(?:www\.)?(dailymotion\.com)\/video\/([^_]+)/,embed:function(){return o+"//www.dailymotion.com/embed/video/"+this.id},getUrl:function(){return"https://api.dailymotion.com/video/"+this.id+"?fields=thumbnail_240_url,thumbnail_720_url&callback=?"},get_thumb:function(t){return t.thumbnail_240_url},get_image:function(t){return t.thumbnail_720_url}},_inst:[]},
// native fullscreen handler
O={support:(e=p().html,!L&&(e.requestFullscreen||e.mozRequestFullScreen||e.webkitRequestFullScreen)),callback:m,enter:function(t,e,i){this.instance=t,this.callback=e||m,(i=i||p().html).requestFullscreen?i.requestFullscreen():i.mozRequestFullScreen?i.mozRequestFullScreen():i.webkitRequestFullScreen&&i.webkitRequestFullScreen()},exit:function(t){this.callback=t||m,b.exitFullscreen?b.exitFullscreen():b.mozCancelFullScreen?b.mozCancelFullScreen():b.webkitCancelFullScreen&&b.webkitCancelFullScreen()},instance:null,listen:function(){if(this.support){function wa(){if(O.instance){var t=O.instance._fullscreen;b.fullscreen||b.mozFullScreen||b.webkitIsFullScreen?t._enter(O.callback):t._exit(O.callback)}}b.addEventListener("fullscreenchange",wa,!1),b.addEventListener("mozfullscreenchange",wa,!1),b.addEventListener("webkitfullscreenchange",wa,!1)}}},
// the internal gallery holder
F=[],
// the internal instance holder
N=[],
// flag for errors
M=!1,
// canvas holder
R=!1,
// instance pool, holds the galleries until themeLoad is triggered
U=[],
// the Utils singleton
W={
// legacy support for clearTimer
clearTimer:function(t){$.each(Galleria.get(),function(){this.clearTimer(t)})},
// legacy support for addTimer
addTimer:function(t){$.each(Galleria.get(),function(){this.addTimer(t)})},array:function(t){return C.slice.call(t,0)},create:function(t,e){e=e||"div";var i=b.createElement(e);return i.className=t,i},removeFromArray:function(i,n){return $.each(i,function(t,e){if(e==n)return i.splice(t,1),!1}),i},getScriptPath:function(t){var e=(
// the currently executing script is always the last
t=t||$("script:last").attr("src")).split("/");return 1==e.length?"":(e.pop(),e.join("/")+"/")},
// CSS3 transitions, added in 1.2.4
animate:(v=function(t){var e,i="transition WebkitTransition MozTransition OTransition".split(" ");
// disable css3 animations in opera until stable
if(window.opera)return!1;for(e=0;i[e];e++)if(void 0!==t[i[e]])return i[e];return!1}((b.body||b.documentElement).style),y={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[v],_={_default:[.25,.1,.25,1],galleria:[.645,.045,.355,1],galleriaIn:[.55,.085,.68,.53],galleriaOut:[.25,.46,.45,.94],ease:[.25,0,.25,1],linear:[.25,.25,.75,.75],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]},function(i,t,e){if(
// extend defaults
e=$.extend({duration:400,complete:m,stop:!1},e),
// cache jQuery instance
i=$(i),!e.duration)return i.css(t),void e.complete.call(i[0]);
// fallback to jQuery's animate if transition is not supported
var n,a,o,r;v?(
// stop
e.stop&&(
// clear the animation
i.off(y),Ra(i)),
// see if there is a change
s=!1,$.each(t,function(t,e){g=i.css(t),W.parseValue(g)!=W.parseValue(e)&&(s=!0),
// also add computed styles for FF
i.css(t,g)}),s?(
// the css strings to be applied
l=[],
// the easing bezier
c=e.easing in _?_[e.easing]:_._default,
// the syntax
h=" "+e.duration+"ms cubic-bezier("+c.join(",")+")",
// add a tiny timeout so that the browsers catches any css changes before animating
window.setTimeout((n=i,a=y,o=t,r=h,function(){var t;
// attach the end event
n.one(a,(t=n,function(){
// clear the animation
Ra(t),
// run the complete method
e.complete.call(t[0])})),
// do the webkit translate3d for better performance on iOS
Galleria.WEBKIT&&Galleria.TOUCH&&(d={},f=[0,0,0],$.each(["left","top"],function(t,e){e in o&&(f[t]=W.parseValue(o[e])-W.parseValue(n.css(e))+"px",d[e]=o[e],delete o[e])}),(f[0]||f[1])&&(n.data("revert",d),l.push("-webkit-transform"+r),
// 3d animate
Qa(n,"translate3d("+f.join(",")+")","transform"))),
// push the animation props
$.each(o,function(t,e){l.push(t+r)}),
// set the animation styles
Qa(n,l.join(",")),
// animate
n.css(o)}),2)):window.setTimeout(function(){e.complete.call(i[0])},e.duration)):i.animate(t,e)}),removeAlpha:function(t){if(t instanceof jQuery&&(t=t[0]),D<9&&t){var e=t.style,i=t.currentStyle,n=i&&i.filter||e.filter||"";/alpha/.test(n)&&(e.filter=n.replace(/alpha\([^)]*\)/i,""))}},forceStyles:function(t,e){(t=$(t)).attr("style")&&t.data("styles",t.attr("style")).removeAttr("style"),t.css(e)},revertStyles:function(){$.each(W.array(arguments),function(t,e){(e=$(e)).removeAttr("style"),e.attr("style",""),// "fixes" webkit bug
e.data("styles")&&e.attr("style",e.data("styles")).data("styles",null)})},moveOut:function(t){W.forceStyles(t,{position:"absolute",left:-1e4})},moveIn:function(){W.revertStyles.apply(W,W.array(arguments))},hide:function(t,e,i){i=i||m;var n=$(t);t=n[0],
// save the value if not exist
n.data("opacity")||n.data("opacity",n.css("opacity"));
// always hide
var a={opacity:0};if(e){var o=D<9&&t?function(){W.removeAlpha(t),t.style.visibility="hidden",i.call(t)}:i;W.animate(t,a,{duration:e,complete:o,stop:!0})}else D<9&&t?(W.removeAlpha(t),t.style.visibility="hidden"):n.css(a)},show:function(t,e,i){i=i||m;var n=$(t);t=n[0];
// bring back saved opacity
var a={opacity:parseFloat(n.data("opacity"))||1};
// animate or toggle
if(e){D<9&&(n.css("opacity",0),t.style.visibility="visible");var o=D<9&&t?function(){1==a.opacity&&W.removeAlpha(t),i.call(t)}:i;W.animate(t,a,{duration:e,complete:o,stop:!0})}else D<9&&1==a.opacity&&t?(W.removeAlpha(t),t.style.visibility="visible"):n.css(a)},wait:function(t){Galleria._waiters=Galleria._waiters||[],t=$.extend({until:n,success:m,error:function(){Galleria.raise("Could not complete wait function.")},timeout:3e3},t);var e,i,a,o=W.timestamp(),r=function(){return i=W.timestamp(),e=i-o,W.removeFromArray(Galleria._waiters,a),t.until(e)?(t.success(),!1):"number"==typeof t.timeout&&i>=o+t.timeout?(t.error(),!1):void Galleria._waiters.push(a=window.setTimeout(r,10))};Galleria._waiters.push(a=window.setTimeout(r,10))},toggleQuality:function(t,e){7!==D&&8!==D||!t||"IMG"!=t.nodeName.toUpperCase()||(void 0===e&&(e="nearest-neighbor"===t.style.msInterpolationMode),t.style.msInterpolationMode=e?"bicubic":"nearest-neighbor")},insertStyleTag:function(t,e){if(!e||!$("#"+e).length){var i=b.createElement("style");if(e&&(i.id=e),p().head.appendChild(i),i.styleSheet)// IE
i.styleSheet.cssText=t;else{var n=b.createTextNode(t);i.appendChild(n)}}},
// a loadscript method that works for local scripts
loadScript:function(t,e){var i=!1,n=$("<script>").attr({src:t,async:!0}).get(0);
// Attach handlers for all browsers
n.onload=n.onreadystatechange=function(){i||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(i=!0,
// Handle memory leak in IE
n.onload=n.onreadystatechange=null,"function"==typeof e&&e.call(this,this))},p().head.appendChild(n)},
// parse anything into a number
parseValue:function(t){if("number"==typeof t)return t;if("string"!=typeof t)return 0;var e=t.match(/\-?\d|\./g);return e&&e.constructor===Array?1*e.join(""):0},
// timestamp abstraction
timestamp:function(){return(new Date).getTime()},loadCSS:function(t,e,i){var n,a;
// look for manual css
// dirty
// if already present, return
if($("link[rel=stylesheet]").each(function(){if(new RegExp(t).test(this.href))return n=this,!1}),"function"==typeof e&&(i=e,e=undef),i=i||m,n)return i.call(n,n),n;
// save the length of stylesheets to check against
// check for existing id
if(a=b.styleSheets.length,$("#"+e).length)$("#"+e).attr("href",t),a--;else{n=$("<link>").attr({rel:"stylesheet",href:t,id:e}).get(0);var o=$('link[rel="stylesheet"], style');if(o.length?o.get(0).parentNode.insertBefore(n,o[0]):p().head.appendChild(n),D&&31<=a)return void Galleria.raise("You have reached the browser stylesheet limit (31)",!0)}if("function"==typeof i){
// First check for dummy element (new in 1.2.8)
var r=$("<s>").attr("id","galleria-loader").hide().appendTo(p().body);W.wait({until:function(){return 1==r.height()},success:function(){r.remove(),i.call(n,n)},error:function(){r.remove();
// If failed, tell the dev to download the latest theme
/*Galleria.raise( 'Theme CSS could not load after 20 sec. ' + ( Galleria.QUIRK ?
                                'Your browser is in Quirks Mode, please add a correct doctype.' :
                                'Please download the latest theme at http://galleria.io/customer/.' ), true );*/},timeout:5e3})}return n}},
// the transitions holder
j={active:!1,init:function(t,e,i){j.effects.hasOwnProperty(t)&&j.effects[t].call(this,e,i)},effects:{fade:function(t,e){$(t.next).css({opacity:0,left:0}),W.animate(t.next,{opacity:1},{duration:t.speed,complete:e}),t.prev&&($(t.prev).css("opacity",1).show(),W.animate(t.prev,{opacity:0},{duration:t.speed}))},flash:function(t,e){$(t.next).css({opacity:0,left:0}),t.prev?W.animate(t.prev,{opacity:0},{duration:t.speed/2,complete:function(){W.animate(t.next,{opacity:1},{duration:t.speed,complete:e})}}):W.animate(t.next,{opacity:1},{duration:t.speed,complete:e})},pulse:function(t,e){t.prev&&$(t.prev).hide(),$(t.next).css({opacity:0,left:0}).show(),W.animate(t.next,{opacity:1},{duration:t.speed,complete:e})},slide:function(t,e){oc.apply(this,W.array(arguments))},fadeslide:function(t,e){oc.apply(this,W.array(arguments).concat([!0]))},doorslide:function(t,e){oc.apply(this,W.array(arguments).concat([!1,!0]))}}};
// listen to fullscreen
function oc(t,e,i,n){var a,o=this.getOptions("easing"),r=this.getStageWidth(),s={left:r*(t.rewind?-1:1)},l={left:0};i?(s.opacity=0,l.opacity=1):s.opacity=1,$(t.next).css(s),W.animate(t.next,l,{duration:t.speed,complete:(a=$(t.next).add(t.prev),function(){e(),a.css({left:0})}),queue:!1,easing:o}),n&&(t.rewind=!t.rewind),t.prev&&(s={left:0},l={left:r*(t.rewind?1:-1)},i&&(s.opacity=1,l.opacity=0),$(t.prev).css(s),W.animate(t.prev,l,{duration:t.speed,queue:!1,easing:o,complete:function(){$(this).css("opacity",0)}}))}function Qa(t,e,i){var n={};i=i||"transition",$.each("webkit moz ms o".split(" "),function(){n["-"+this+"-"+i]=e}),t.css(n)}function Ra(t){Qa(t,"none","transition"),Galleria.WEBKIT&&Galleria.TOUCH&&(Qa(t,"translate3d(0,0,0)","transform"),t.data("revert")&&(t.css(t.data("revert")),t.data("revert",null)))}O.listen(),
// create special click:fast event for fast touch interaction
$.event.special["click:fast"]={propagate:!0,add:function(o){this.propagate;Galleria.TOUCH?$(this).on("touchstart.fast",function(t){var i,n,e=t.originalEvent,a=0;1==e.touches.length&&(i=e.touches[0].pageX,n=e.touches[0].pageY,$(this).on("touchmove.fast",function(t){var e=t.originalEvent.touches;1==e.length&&(a=A.max(A.abs(i-e[0].pageX),A.abs(n-e[0].pageY)))}),$(this).on("touchend.fast",function(){if(4<a)return $(this).off("touchend.fast touchmove.fast");o.handler.call(this,t),$(this).off("touchend.fast touchmove.fast")}))}):$(this).on("click.fast",o.handler)},remove:function(t){Galleria.TOUCH?$(this).off("touchstart.fast touchmove.fast touchend.fast"):$(this).off("click.fast",t.handler)}},
// trigger resize on orientationchange (IOS7)
k.on("orientationchange",function(){$(this).resize()}),
// end Galleria constructor
(
/**
    The main Galleria class

    @class
    @constructor

    @example var gallery = new Galleria();

    @author http://aino.se

    @requires jQuery

*/
Galleria=function(){var v=this;
// internal options
this._options={},
// flag for controlling play/pause
this._playing=!1,
// internal interval for slideshow
this._playtime=5e3,
// internal variable for the currently active image
this._active=null,
// the internal queue, arrayified
this._queue={length:0},
// the internal data array
this._data=[],
// the internal dom collection
this._dom={},
// the internal thumbnails array
this._thumbnails=[],
// the internal layers array
this._layers=[],
// internal init flag
this._initialized=!1,
// internal firstrun flag
this._firstrun=!1,
// global stagewidth/height
this._stageWidth=0,this._stageHeight=0,
// target holder
this._target=undef,
// bind hashes
this._binds=[],
// instance id
this._id=parseInt(1e4*A.random(),10);$.each("container stage images image-nav image-nav-left image-nav-right info info-text info-title info-description thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right loader counter tooltip".split(" "),function(t,e){v._dom[e]=W.create("galleria-"+e)}),$.each("current total".split(" "),function(t,e){v._dom[e]=W.create("galleria-"+e,"span")});
// the internal keyboard object
// keeps reference of the keybinds and provides helper methods for binding keys
var n=this._keyboard={keys:{UP:38,DOWN:40,LEFT:37,RIGHT:39,RETURN:13,ESCAPE:27,BACKSPACE:8,SPACE:32},map:{},bound:!1,press:function(t){var e=t.keyCode||t.which;e in n.map&&"function"==typeof n.map[e]&&n.map[e].call(v,t)},attach:function(t){var e,i;for(e in t)t.hasOwnProperty(e)&&((i=e.toUpperCase())in n.keys?n.map[n.keys[i]]=t[e]:n.map[i]=t[e]);n.bound||(n.bound=!0,T.on("keydown",n.press))},detach:function(){n.bound=!1,n.map={},T.off("keydown",n.press)}},t=this._controls={0:undef,1:undef,active:0,swap:function(){t.active=t.active?0:1},getActive:function(){return v._options.swipe?t.slides[v._active]:t[t.active]},getNext:function(){return v._options.swipe?t.slides[v.getNext(v._active)]:t[1-t.active]},slides:[],frames:[],layers:[]},i=this._carousel={
// shortcuts
next:v.$("thumb-nav-right"),prev:v.$("thumb-nav-left"),
// cache the width
width:0,
// track the current position
current:0,
// cache max value
max:0,
// save all hooks for each width in an array
hooks:[],
// update the carousel
// you can run this method anytime, f.ex on window.resize
update:function(){var n=0,a=0,o=[0];$.each(v._thumbnails,function(t,e){if(e.ready){n+=e.outerWidth||$(e.container).outerWidth(!0);
// Due to a bug in jquery, outerwidth() returns the floor of the actual outerwidth,
// if the browser is zoom to a value other than 100%. height() returns the floating point value.
var i=$(e.container).width();n+=i-A.floor(i),o[t+1]=n,a=A.max(a,e.outerHeight||$(e.container).outerHeight(!0))}}),v.$("thumbnails").css({width:n,height:a}),i.max=n,i.hooks=o,i.width=v.$("thumbnails-list").width(),i.setClasses(),v.$("thumbnails-container").toggleClass("galleria-carousel",n>i.width),
// one extra calculation
i.width=v.$("thumbnails-list").width()},bindControls:function(){var e;i.next.on("click:fast",function(t){if(t.preventDefault(),"auto"===v._options.carouselSteps){for(e=i.current;e<i.hooks.length;e++)if(i.hooks[e]-i.hooks[i.current]>i.width){i.set(e-2);break}}else i.set(i.current+v._options.carouselSteps)}),i.prev.on("click:fast",function(t){if(t.preventDefault(),"auto"===v._options.carouselSteps)for(e=i.current;0<=e;e--){if(i.hooks[i.current]-i.hooks[e]>i.width){i.set(e+2);break}if(0===e){i.set(0);break}}else i.set(i.current-v._options.carouselSteps)})},
// calculate and set positions
set:function(t){for(t=A.max(t,0);i.hooks[t-1]+i.width>=i.max&&0<=t;)t--;i.current=t,i.animate()},
// get the last position
getLast:function(t){return(t||i.current)-1},
// follow the active image
follow:function(t){
//don't follow if position fits
if(0!==t&&t!==i.hooks.length-2){for(
// calculate last position
var e=i.current;i.hooks[e]-i.hooks[i.current]<i.width&&e<=i.hooks.length;)e++;
// set position
t-1<i.current?i.set(t-1):e<t+2&&i.set(t-e+i.current+2)}else i.set(t)},
// helper for setting disabled classes
setClasses:function(){i.prev.toggleClass("disabled",!i.current),i.next.toggleClass("disabled",i.hooks[i.current]+i.width>=i.max)},
// the animation method
animate:function(t){i.setClasses();var e=-1*i.hooks[i.current];isNaN(e)||(
// FF 24 bug
v.$("thumbnails").css("left",function(){return $(this).css("left")}),W.animate(v.get("thumbnails"),{left:e},{duration:v._options.carouselSpeed,easing:v._options.easing,queue:!1}))}},a=this._tooltip={initialized:!1,open:!1,timer:"tooltip"+v._id,swapTimer:"swap"+v._id,init:function(){a.initialized=!0;W.insertStyleTag(".galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3;opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}","galleria-tooltip"),v.$("tooltip").css({opacity:.8,visibility:"visible",display:"none"})},
// move handler
move:function(t){var e=v.getMousePosition(t).x,i=v.getMousePosition(t).y,n=v.$("tooltip"),a=e,o=i,r=n.outerHeight(!0)+1,s=n.outerWidth(!0),l=r+15,c=v.$("container").width()-s-2,h=v.$("container").height()-r-2;isNaN(a)||isNaN(o)||(a+=10,o-=r+8,a=A.max(0,A.min(c,a)),o=A.max(0,A.min(h,o)),i<l&&(o=l),n.css({left:a,top:o}))},
// bind elements to the tooltip
// you can bind multiple elementIDs using { elemID : function } or { elemID : string }
// you can also bind single DOM elements using bind(elem, string)
bind:function(t,e){
// todo: revise if alternative tooltip is needed for mobile devices
if(!Galleria.TOUCH){a.initialized||a.init();function Sd(){v.$("container").off("mousemove",a.move),v.clearTimer(a.timer),v.$("tooltip").stop().animate({opacity:0},200,function(){v.$("tooltip").hide(),v.addTimer(a.swapTimer,function(){a.open=!1},1e3)})}function Td(t,e){a.define(t,e),$(t).hover(function(){v.clearTimer(a.swapTimer),v.$("container").off("mousemove",a.move).on("mousemove",a.move).trigger("mousemove"),a.show(t),v.addTimer(a.timer,function(){v.$("tooltip").stop().show().animate({opacity:1}),a.open=!0},a.open?0:500)},Sd).click(Sd)}"string"==typeof e?Td(t in v._dom?v.get(t):t,e):
// asume elemID here
$.each(t,function(t,e){Td(v.get(t),e)})}},show:function(i){var t=(i=$(i in v._dom?v.get(i):i)).data("tt"),n=function(t){var e;
// attach a tiny settimeout to make sure the new tooltip is filled
window.setTimeout((e=t,function(){a.move(e)}),10),i.off("mouseup",n)};(t="function"==typeof t?t():t)&&(v.$("tooltip").html(t.replace(/\s/,"&#160;")),
// trigger mousemove on mouseup in case of click
i.on("mouseup",n))},define:function(t,e){
// we store functions, not strings
if("function"!=typeof e){var i=e;e=function(){return i}}t=$(t in v._dom?v.get(t):t).data("tt",e),a.show(t)}},y=this._fullscreen={scrolled:0,crop:undef,active:!1,prev:$(),beforeEnter:function(t){t()},beforeExit:function(t){t()},keymap:v._keyboard.map,parseCallback:function(i,n){return j.active?function(){"function"==typeof i&&i.call(v);var t=v._controls.getActive(),e=v._controls.getNext();v._scaleImage(e),v._scaleImage(t),n&&v._options.trueFullscreen&&
// Firefox bug, revise later
$(t.container).add(e.container).trigger("transitionend")}:i},enter:function(t){y.beforeEnter(function(){t=y.parseCallback(t,!0),v._options.trueFullscreen&&O.support?(
// do some stuff prior animation for wmoother transitions
y.active=!0,W.forceStyles(v.get("container"),{width:"100%",height:"100%"}),v.rescale(),Galleria.MAC?Galleria.SAFARI&&/version\/[1-5]/.test(S)?(v.$("stage").css("opacity",0),window.setTimeout(function(){y.scale(),v.$("stage").css("opacity",1)},4)):(v.$("container").css("opacity",0).addClass("fullscreen"),window.setTimeout(function(){y.scale(),v.$("container").css("opacity",1)},50)):v.$("container").addClass("fullscreen"),k.resize(y.scale),O.enter(v,t,v.get("container"))):(y.scrolled=k.scrollTop(),Galleria.TOUCH||window.scrollTo(0,0),y._enter(t))})},_enter:function(t){var e,i,n,a;y.active=!0,L&&(y.iframe=(i=b.referrer,n=b.createElement("a"),a=window.location,n.href=i,n.protocol!=a.protocol||n.hostname!=a.hostname||n.port!=a.port?(Galleria.raise("Parent fullscreen not available. Iframe protocol, domains and ports must match."),!1):(y.pd=window.parent.document,$(y.pd).find("iframe").each(function(){if((this.contentDocument||this.contentWindow.document)===b)return e=this,!1}),e))),
// hide the image until rescale is complete
W.hide(v.getActiveImage()),L&&y.iframe&&(y.iframe.scrolled=$(window.parent).scrollTop(),window.parent.scrollTo(0,0));var o=v.getData(),r=v._options,s=!v._options.trueFullscreen||!O.support,l={height:"100%",overflow:"hidden",margin:0,padding:0};
// swap to big image if it's different from the display image
if(s&&(v.$("container").addClass("fullscreen"),y.prev=v.$("container").prev(),y.prev.length||(y.parent=v.$("container").parent()),
// move
v.$("container").appendTo("body"),
// begin styleforce
W.forceStyles(v.get("container"),{position:Galleria.TOUCH?"absolute":"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:1e4}),W.forceStyles(p().html,l),W.forceStyles(p().body,l)),L&&y.iframe&&(W.forceStyles(y.pd.documentElement,l),W.forceStyles(y.pd.body,l),W.forceStyles(y.iframe,$.extend(l,{width:"100%",height:"100%",top:0,left:0,position:"fixed",zIndex:1e4,border:"none"}))),
// temporarily attach some keys
// save the old ones first in a cloned object
y.keymap=$.extend({},v._keyboard.map),v.attachKeyboard({escape:v.exitFullscreen,right:v.next,left:v.prev}),
// temporarily save the crop
y.crop=r.imageCrop,
// set fullscreen options
r.fullscreenCrop!=undef&&(r.imageCrop=r.fullscreenCrop),o&&o.big&&o.image!==o.big){var c=new Galleria.Picture,h=c.isCached(o.big),u=v.getIndex(),d=v._thumbnails[u];v.trigger({type:Galleria.LOADSTART,cached:h,rewind:!1,index:u,imageTarget:v.getActiveImage(),thumbTarget:d,galleriaData:o}),c.load(o.big,function(t){v._scaleImage(t,{complete:function(t){v.trigger({type:Galleria.LOADFINISH,cached:h,index:u,rewind:!1,imageTarget:t.image,thumbTarget:d});var e=v._controls.getActive().image;e&&$(e).width(t.image.width).height(t.image.height).attr("style",$(t.image).attr("style")).attr("src",t.image.src)}})});var f=v.getNext(u),g=new Galleria.Picture,m=v.getData(f);g.preload(v.isFullscreen()&&m.big?m.big:m.image)}
// init the first rescale and attach callbacks
v.rescale(function(){v.addTimer(!1,function(){
// show the image after 50 ms
s&&W.show(v.getActiveImage()),"function"==typeof t&&t.call(v),v.rescale()},100),v.trigger(Galleria.FULLSCREEN_ENTER)}),s?k.resize(y.scale):W.show(v.getActiveImage())},scale:function(){v.rescale()},exit:function(t){y.beforeExit(function(){t=y.parseCallback(t),v._options.trueFullscreen&&O.support?O.exit(t):y._exit(t)})},_exit:function(t){y.active=!1;var e=!v._options.trueFullscreen||!O.support,i=v.$("container").removeClass("fullscreen");
// move back
if(y.parent?y.parent.prepend(i):i.insertAfter(y.prev),e){W.hide(v.getActiveImage()),
// revert all styles
W.revertStyles(v.get("container"),p().html,p().body),
// scroll back
Galleria.TOUCH||window.scrollTo(0,y.scrolled);
// reload iframe src manually
var n=v._controls.frames[v._controls.active];n&&n.image&&(n.image.src=n.image.src)}L&&y.iframe&&(W.revertStyles(y.pd.documentElement,y.pd.body,y.iframe),y.iframe.scrolled&&window.parent.scrollTo(0,y.iframe.scrolled)),
// detach all keyboard events and apply the old keymap
v.detachKeyboard(),v.attachKeyboard(y.keymap),
// bring back cached options
v._options.imageCrop=y.crop;
// return to original image
var a,o=v.getData().big,r=v._controls.getActive().image;!v.getData().iframe&&r&&o&&o==r.src&&window.setTimeout((a=v.getData().image,function(){r.src=a}),1),v.rescale(function(){v.addTimer(!1,function(){
// show the image after 50 ms
e&&W.show(v.getActiveImage()),"function"==typeof t&&t.call(v),k.trigger("resize")},50),v.trigger(Galleria.FULLSCREEN_EXIT)}),k.off("resize",y.scale)}},r=this._idle={trunk:[],bound:!1,active:!1,add:function(t,e,i,n){if(t&&!Galleria.TOUCH){r.bound||r.addEvent(),t=$(t),"boolean"==typeof i&&(n=i,i={}),i=i||{};var a,o={};for(a in e)e.hasOwnProperty(a)&&(o[a]=t.css(a));t.data("idle",{from:$.extend(o,i),to:e,complete:!0,busy:!1}),n?t.css(e):r.addTimer(),r.trunk.push(t)}},remove:function(i){i=$(i),$.each(r.trunk,function(t,e){e&&e.length&&!e.not(i).length&&(i.css(i.data("idle").from),r.trunk.splice(t,1))}),r.trunk.length||(r.removeEvent(),v.clearTimer(r.timer))},addEvent:function(){r.bound=!0,v.$("container").on("mousemove click",r.showAll),"hover"==v._options.idleMode&&v.$("container").on("mouseleave",r.hide)},removeEvent:function(){r.bound=!1,v.$("container").on("mousemove click",r.showAll),"hover"==v._options.idleMode&&v.$("container").off("mouseleave",r.hide)},addTimer:function(){"hover"!=v._options.idleMode&&v.addTimer("idle",function(){r.hide()},v._options.idleTime)},hide:function(){if(v._options.idleMode&&!1!==v.getIndex()){v.trigger(Galleria.IDLE_ENTER);var n=r.trunk.length;$.each(r.trunk,function(t,e){var i=e.data("idle");i&&(e.data("idle").complete=!1,W.animate(e,i.to,{duration:v._options.idleSpeed,complete:function(){t==n-1&&(r.active=!1)}}))})}},showAll:function(){v.clearTimer("idle"),$.each(r.trunk,function(t,e){r.show(e)})},show:function(t){var e=t.data("idle");r.active&&(e.busy||e.complete)||(e.busy=!0,v.trigger(Galleria.IDLE_EXIT),v.clearTimer("idle"),W.animate(t,e.from,{duration:v._options.idleSpeed/2,complete:function(){r.active=!0,$(t).data("idle").busy=!1,$(t).data("idle").complete=!0}})),r.addTimer()}},h=this._lightbox={width:0,height:0,initialized:!1,active:null,image:null,elems:{},keymap:!1,init:function(){if(!h.initialized){h.initialized=!0;
// create some elements to work with
var a={},t=v._options,i="",e="position:absolute;",n="lightbox-",o={overlay:"position:fixed;display:none;opacity:"+t.overlayOpacity+";filter:alpha(opacity="+100*t.overlayOpacity+");top:0;left:0;width:100%;height:100%;background:"+t.overlayBackground+";z-index:99990",box:"position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991",shadow:e+"background:#000;width:100%;height:100%;",content:e+"background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden",info:e+"bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px",close:e+"top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999",image:e+"top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;",prevholder:e+"width:50%;top:0;bottom:40px;cursor:pointer;",nextholder:e+"width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;",prev:e+"top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;text-align:center;color:#000;font:bold 16px/36px arial,sans-serif",next:e+"top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;font:bold 16px/36px arial,sans-serif;text-align:center;color:#000",title:"float:left",counter:"float:right;margin-left:8px;"},r={},s="";
// fix for navigation hovers transparent background event "feature"
s=7<D?D<9?"background:#000;filter:alpha(opacity=0);":"background:rgba(0,0,0,0);":"z-index:99999",o.nextholder+=s,o.prevholder+=s,
// create and insert CSS
$.each(o,function(t,e){i+=".galleria-"+n+t+"{"+e+"}"}),i+=".galleria-"+n+"box.iframe .galleria-"+n+"prevholder,.galleria-"+n+"box.iframe .galleria-"+n+"nextholder{width:100px;height:100px;top:50%;margin-top:-70px}",W.insertStyleTag(i,"galleria-lightbox"),
// create the elements
$.each("overlay box content shadow title info close prevholder prev nextholder next counter image".split(" "),function(t,e){v.addElement("lightbox-"+e),a[e]=h.elems[e]=v.get("lightbox-"+e)}),
// initiate the image
h.image=new Galleria.Picture,
// append the elements
$.each({box:"shadow content close prevholder nextholder",info:"title counter",content:"info image",prevholder:"prev",nextholder:"next"},function(t,e){var i=[];$.each(e.split(" "),function(t,e){i.push(n+e)}),r[n+t]=i}),v.append(r),$(a.image).append(h.image.container),$(p().body).append(a.overlay,a.box),$(a.close).on("click:fast",h.hide).html("&#215;").hover(function(){$(this).css("color","#bbb")},function(){$(this).css("color","#444")}),$.each(["Prev","Next"],function(t,e){var i=$(a[e.toLowerCase()]).html(/v/.test(e)?"&#8249;&#160;":"&#160;&#8250;"),n=$(a[e.toLowerCase()+"holder"]);n.on("click:fast",function(){h["show"+e]()}),
// IE7 and touch devices will simply show the nav
D<8||Galleria.TOUCH?i.show():n.hover(function(){i.show()},function(t){i.stop().fadeOut(200)})}),$(a.overlay).on("click:fast",h.hide),
// the lightbox animation is slow on ipad
Galleria.IPAD&&(v._options.lightboxTransitionSpeed=0)}},rescale:function(t){
// calculate
var e=A.min(k.width()-40,h.width),i=A.min(k.height()-60,h.height),n=A.min(e/h.width,i/h.height),a=A.round(h.width*n)+40,o=A.round(h.height*n)+60,r={width:a,height:o,"margin-top":-1*A.ceil(o/2),"margin-left":-1*A.ceil(a/2)};
// if rescale event, don't animate
t?$(h.elems.box).css(r):$(h.elems.box).animate(r,{duration:v._options.lightboxTransitionSpeed,easing:v._options.easing,complete:function(){var t=h.image,e=v._options.lightboxFadeSpeed;v.trigger({type:Galleria.LIGHTBOX_IMAGE,imageTarget:t.image}),$(t.container).show(),$(t.image).animate({opacity:1},e),W.show(h.elems.info,e)}})},hide:function(){
// remove the image
h.image.image=null,k.off("resize",h.rescale),$(h.elems.box).hide().find("iframe").remove(),W.hide(h.elems.info),v.detachKeyboard(),v.attachKeyboard(h.keymap),h.keymap=!1,W.hide(h.elems.overlay,200,function(){$(this).hide().css("opacity",v._options.overlayOpacity),v.trigger(Galleria.LIGHTBOX_CLOSE)})},showNext:function(){h.show(v.getNext(h.active))},showPrev:function(){h.show(v.getPrev(h.active))},show:function(s){h.active=s="number"==typeof s?s:v.getIndex()||0,h.initialized||h.init(),
// trigger the event
v.trigger(Galleria.LIGHTBOX_OPEN),
// temporarily attach some keys
// save the old ones first in a cloned object
h.keymap||(h.keymap=$.extend({},v._keyboard.map),v.attachKeyboard({escape:h.hide,right:h.showNext,left:h.showPrev})),k.off("resize",h.rescale);var t,e,i,l=v.getData(s),c=v.getDataLength(),n=v.getNext(s);W.hide(h.elems.info);try{for(i=v._options.preload;0<i;i--)e=new Galleria.Picture,t=v.getData(n),e.preload(t.big?t.big:t.image),n=v.getNext(n)}catch(t){}h.image.isIframe=l.iframe&&!l.image,$(h.elems.box).toggleClass("iframe",h.image.isIframe),$(h.image.container).find(".galleria-videoicon").remove(),h.image.load(l.big||l.image||l.iframe,function(t){if(t.isIframe){var e=$(window).width(),i=$(window).height();if(t.video&&v._options.maxVideoSize){var n=A.min(v._options.maxVideoSize/e,v._options.maxVideoSize/i);n<1&&(e*=n,i*=n)}h.width=e,h.height=i}else h.width=t.original.width,h.height=t.original.height;if($(t.image).css({width:t.isIframe?"100%":"100.1%",height:t.isIframe?"100%":"100.1%",top:0,bottom:0,zIndex:99998,opacity:0,visibility:"visible"}).parent().height("100%"),h.elems.title.innerHTML=l.title||"",h.elems.counter.innerHTML=s+1+" / "+c,k.resize(h.rescale),h.rescale(),l.image&&l.iframe){if($(h.elems.box).addClass("iframe"),l.video){var a=G(t.container).hide();window.setTimeout(function(){a.fadeIn(200)},200)}$(t.image).css("cursor","pointer").mouseup((o=l,r=t,function(t){$(h.image.container).find(".galleria-videoicon").remove(),t.preventDefault(),r.isIframe=!0,r.load(o.iframe+(o.video?"&autoplay=1":""),{width:"100%",height:D<8?$(h.image.container).height():"100%"})}))}var o,r}),$(h.elems.overlay).show().css("visibility","visible"),$(h.elems.box).show()}},o=this._timer={trunk:{},add:function(t,e,i,n){if(t=t||(new Date).getTime(),n=n||!1,this.clear(t),n){var a=e;e=function(){a(),o.add(t,e,i)}}this.trunk[t]=window.setTimeout(e,i)},clear:function(t){function fg(t){window.clearTimeout(this.trunk[t]),delete this.trunk[t]}var e;if(t&&t in this.trunk)fg.call(this,t);else if(void 0===t)for(e in this.trunk)this.trunk.hasOwnProperty(e)&&fg.call(this,e)}};
// internal controls for keeping track of active / inactive images
return this}).prototype={
// bring back the constructor reference
constructor:Galleria,
/**
        Use this function to initialize the gallery and start loading.
        Should only be called once per instance.

        @param {HTMLElement} target The target element
        @param {Object} options The gallery options

        @returns Instance
    */
init:function(e,i){
// raise error if no target is detected
if(i=t(i),
// save the original ingredients
this._original={target:e,options:i,data:null},
// save the target here
this._target=this._dom.target=e.nodeName?e:$(e).get(0),
// save the original content for destruction
this._original.html=this._target.innerHTML,
// push the instance
N.push(this),this._target)
// apply options
return this._options={autoplay:!1,carousel:!0,carouselFollow:!0,// legacy, deprecate at 1.3
carouselSpeed:400,carouselSteps:"auto",clicknext:!1,dailymotion:{foreground:"%23EEEEEE",highlight:"%235BCEC5",background:"%23222222",logo:0,hideInfos:1},dataConfig:function(t){return{}},dataSelector:"img",dataSort:!1,dataSource:this._target,debug:undef,dummy:undef,// 1.2.5
easing:"galleria",extend:function(t){},fullscreenCrop:undef,// 1.2.5
fullscreenDoubleTap:!0,// 1.2.4 toggles fullscreen on double-tap for touch devices
fullscreenTransition:undef,// 1.2.6
height:0,idleMode:!0,// 1.2.4 toggles idleMode
idleTime:3e3,idleSpeed:200,imageCrop:!1,imageMargin:0,imagePan:!1,imagePanSmoothness:12,imagePosition:"50%",imageTimeout:undef,// 1.2.5
initialTransition:undef,// 1.2.4, replaces transitionInitial
keepSource:!1,layerFollow:!0,// 1.2.5
lightbox:!1,// 1.2.3
lightboxFadeSpeed:200,lightboxTransitionSpeed:200,linkSourceImages:!0,maxScaleRatio:undef,maxVideoSize:undef,// 1.2.9
minScaleRatio:undef,// deprecated in 1.2.9
overlayOpacity:.85,overlayBackground:"#0b0b0b",pauseOnInteraction:!0,popupLinks:!1,preload:2,queue:!0,responsive:!0,show:0,showInfo:!0,showCounter:!0,showImagenav:!0,swipe:"auto",// 1.2.4 -> revised in 1.3 -> changed type in 1.3.5
thumbCrop:!0,thumbEventType:"click:fast",thumbMargin:0,thumbQuality:"auto",thumbDisplayOrder:!0,// 1.2.8
thumbPosition:"50%",// 1.3
thumbnails:!0,touchTransition:undef,// 1.2.6
transition:"fade",transitionInitial:undef,// legacy, deprecate in 1.3. Use initialTransition instead.
transitionSpeed:400,trueFullscreen:!0,// 1.2.7
useCanvas:!1,// 1.2.4
variation:"",// 1.3.2
videoPoster:!0,// 1.3
vimeo:{title:0,byline:0,portrait:0,color:"aaaaaa"},wait:5e3,// 1.2.7
width:"auto",youtube:{modestbranding:1,autohide:1,color:"white",hd:1,rel:0,showinfo:0}},
// legacy support for transitionInitial
this._options.initialTransition=this._options.initialTransition||this._options.transitionInitial,
// turn off debug
i&&!1===i.debug&&(a=!1),
// set timeout
i&&"number"==typeof i.imageTimeout&&i.imageTimeout,
// set dummy
i&&"string"==typeof i.dummy&&(I=i.dummy),
// hide all content
$(this._target).children().hide(),
// Warn for quirks mode
Galleria.QUIRK&&Galleria.raise("Your page is in Quirks mode, Galleria may not render correctly. Please validate your HTML and add a correct doctype."),
// now we just have to wait for the theme...
"object"==typeof Galleria.theme?this._init():
// push the instance into the pool and run it when the theme is ready
U.push(this),this;Galleria.raise("Target not found",!0)},
// this method should only be called once per instance
// for manipulation of data, use the .load method
_init:function(){var t,e,i,n,a,o,r,s,l=this,c=this._options;if(this._initialized)return Galleria.raise("Init failed: Gallery instance already initialized."),this;if(this._initialized=!0,!Galleria.theme)return Galleria.raise("Init failed: No theme found.",!0),this;
// merge the theme & caller options
// parse the carousel on each thumb load
if($.extend(!0,c,Galleria.theme.defaults,this._original.options,Galleria.configure.options),
// internally we use boolean for swipe
c.swipe="enforced"==(t=c.swipe)||
// legacy patch
!1!==t&&"disabled"!=t&&!!Galleria.TOUCH,
// disable options that arent compatible with swipe
c.swipe&&(c.clicknext=!1,c.imagePan=!1),"getContext"in(
// check for canvas support
e=b.createElement("canvas"))?R=R||{elem:e,context:e.getContext("2d"),cache:{},length:0}:e=null,
// bind the gallery to run when data is ready
this.bind(Galleria.DATA,function(){
// remove big if total pixels are less than 1024 (most phones)
window.screen&&window.screen.width&&Array.prototype.forEach&&this._data.forEach(function(t){var e="devicePixelRatio"in window?window.devicePixelRatio:1;A.max(window.screen.width,window.screen.height)*e<1024&&(t.big=t.image)}),
// save the new data
this._original.data=this._data,
// lets show the counter here
this.get("total").innerHTML=this.getDataLength();
// cache the container
var t=this.$("container");
// set ratio if height is < 2
l._options.height<2&&(l._userRatio=l._ratio=l._options.height);
// the gallery is ready, let's just wait for the css
function ug(){return l.$("stage").height()}var e={width:0,height:0};
// check container and thumbnail height
W.wait({until:function(){
// keep trying to get the value
return e=l._getWH(),t.width(e.width).height(e.height),ug()&&e.width&&50<e.height},success:function(){l._width=e.width,l._height=e.height,l._ratio=l._ratio||e.height/e.width,
// for some strange reason, webkit needs a single setTimeout to play ball
Galleria.WEBKIT?window.setTimeout(function(){l._run()},1):l._run()},error:function(){
// Height was probably not set, raise hard errors
ug()?Galleria.raise("Could not extract sufficient width/height of the gallery container. Traced measures: width:"+e.width+"px, height: "+e.height+"px.",!0):Galleria.raise("Could not extract a stage height from the CSS. Traced height: "+ug()+"px.",!0)},timeout:"number"==typeof this._options.wait&&this._options.wait})}),
// build the gallery frame
this.append({"info-text":["info-title","info-description"],info:["info-text"],"image-nav":["image-nav-right","image-nav-left"],stage:["images","loader","counter","image-nav"],"thumbnails-list":["thumbnails"],"thumbnails-container":["thumb-nav-left","thumbnails-list","thumb-nav-right"],container:["stage","thumbnails-container","info","tooltip"]}),W.hide(this.$("counter").append(this.get("current"),b.createTextNode(" / "),this.get("total"))),this.setCounter("&#8211;"),W.hide(l.get("tooltip")),
// add a notouch class on the container to prevent unwanted :hovers on touch devices
this.$("container").addClass((Galleria.TOUCH?"touch":"notouch")+" "+this._options.variation),
// add images to the controls
this._options.swipe||$.each(new Array(2),function(t){
// create a new Picture instance
var e=new Galleria.Picture;
// apply some styles, create & prepend overlay
$(e.container).css({position:"absolute",top:0,left:0}).prepend(l._layers[t]=$(W.create("galleria-layer")).css({position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:2})[0]),
// append the image
l.$("images").append(e.container),
// reload the controls
l._controls[t]=e;
// build a frame
var i=new Galleria.Picture;i.isIframe=!0,$(i.container).attr("class","galleria-frame").css({position:"absolute",top:0,left:0,zIndex:4,background:"#000",display:"none"}).appendTo(e.container),l._controls.frames[t]=i}),
// some forced generic styling
this.$("images").css({position:"relative",top:0,left:0,width:"100%",height:"100%"}),c.swipe&&(this.$("images").css({position:"absolute",top:0,left:0,width:0,height:"100%"}),this.finger=new Galleria.Finger(this.get("stage"),{onchange:function(t){l.pause().show(t)},oncomplete:function(t){var e=A.max(0,A.min(parseInt(t,10),l.getDataLength()-1)),i=l.getData(e);$(l._thumbnails[e].container).addClass("active").siblings(".active").removeClass("active"),i&&(l.$("images").find("iframe").remove(),l.$("images").find(".galleria-frame").css("opacity",0).hide(),l._options.carousel&&l._options.carouselFollow&&l._carousel.follow(e))}}),this.bind(Galleria.RESCALE,function(){this.finger.setup()}),this.$("stage").on("click",function(t){var e=l.getData();if(e){if(e.iframe){l.isPlaying()&&l.pause();var i=l._controls.frames[l._active],n=l._stageWidth,a=l._stageHeight;if($(i.container).find("iframe").length)return;return $(i.container).css({width:n,height:a,opacity:0}).show().animate({opacity:1},200),void window.setTimeout(function(){i.load(e.iframe+(e.video?"&autoplay=1":""),{width:n,height:a},function(t){l.$("container").addClass("videoplay"),t.scale({width:l._stageWidth,height:l._stageHeight,iframelimit:e.video?l._options.maxVideoSize:undef})})},100)}if(e.link)if(l._options.popupLinks)window.open(e.link,"_blank");else window.location.href=e.link;else;}}),this.bind(Galleria.IMAGE,function(t){l.setCounter(t.index),l.setInfo(t.index);var e=this.getNext(),i=this.getPrev(),n=[i,e];n.push(this.getNext(e),this.getPrev(i),l._controls.slides.length-1);var a=[];$.each(n,function(t,e){-1==$.inArray(e,a)&&a.push(e)}),$.each(a,function(t,e){var i=l.getData(e),n=l._controls.slides[e],a=l.isFullscreen()&&i.big?i.big:i.image||i.iframe;i.iframe&&!i.image&&(n.isIframe=!0),n.ready||l._controls.slides[e].load(a,function(t){t.isIframe||$(t.image).css("visibility","hidden"),l._scaleImage(t,{complete:function(t){t.isIframe||$(t.image).css({opacity:0,visibility:"visible"}).animate({opacity:1},200)}})})})})),this.$("thumbnails, thumbnails-list").css({overflow:"hidden",position:"relative"}),
// bind image navigation arrows
this.$("image-nav-right, image-nav-left").on("click:fast",function(t){
// pause if options is set
c.pauseOnInteraction&&l.pause();
// navigate
var e=/right/.test(this.className)?"next":"prev";l[e]()}).on("click",function(t){t.preventDefault(),
// tune the clicknext option
(c.clicknext||c.swipe)&&t.stopPropagation()}),
// hide controls if chosen to
$.each(["info","counter","image-nav"],function(t,e){!1===c["show"+e.substr(0,1).toUpperCase()+e.substr(1).replace(/-/,"")]&&W.moveOut(l.get(e.toLowerCase()))}),
// load up target content
this.load(),
// now it's usually safe to remove the content
// IE will never stop loading if we remove it, so let's keep it hidden for IE (it's usually fast enough anyway)
c.keepSource||D||(this._target.innerHTML=""),
// re-append the errors, if they happened before clearing
this.get("errors")&&this.appendChild("target","errors"),
// append the gallery frame
this.appendChild("target","container"),c.carousel){var h=0,u=c.show;this.bind(Galleria.THUMBNAIL,function(){this.updateCarousel(),++h==this.getDataLength()&&"number"==typeof u&&0<u&&this._carousel.follow(u)})}
// bind window resize for responsiveness
function jh(t){return t.originalEvent.touches?t.originalEvent.touches[0]:t}return c.responsive&&k.on("resize",function(){l.isFullscreen()||l.resize()}),
// double-tap/click fullscreen toggle
c.fullscreenDoubleTap&&this.$("stage").on("touchstart",(l.$("stage").on("touchmove",function(){i=0}),function(t){if(!/(-left|-right)/.test(t.target.className)){if(s=W.timestamp(),n=jh(t).pageX,a=jh(t).pageY,t.originalEvent.touches.length<2&&s-i<300&&n-o<20&&a-r<20)return l.toggleFullscreen(),void t.preventDefault();i=s,o=n,r=a}})),
// bind the ons
$.each(Galleria.on.binds,function(t,e){
// check if already bound
-1==$.inArray(e.hash,l._binds)&&l.bind(e.type,e.callback)}),this},addTimer:function(){return this._timer.add.apply(this._timer,W.array(arguments)),this},clearTimer:function(){return this._timer.clear.apply(this._timer,W.array(arguments)),this},
// parse width & height from CSS or options
_getWH:function(){var i,n=this.$("container"),a=this.$("target"),o=this,r={};return $.each(["width","height"],function(t,e){
// first check if options is set
o._options[e]&&"number"==typeof o._options[e]?r[e]=o._options[e]:(i=[W.parseValue(n.css(e)),// the container css height
W.parseValue(a.css(e)),// the target css height
n[e](),// the container jQuery method
a[e]()],
// if first time, include the min-width & min-height
o["_"+e]||i.splice(i.length,W.parseValue(n.css("min-"+e)),W.parseValue(a.css("min-"+e))),
// else extract the measures from different sources and grab the highest value
r[e]=A.max.apply(A,i))}),
// allow setting a height ratio instead of exact value
// useful when doing responsive galleries
o._userRatio&&(r.height=r.width*o._userRatio),r},
// Creates the thumbnails and carousel
// can be used at any time, f.ex when the data object is manipulated
// push is an optional argument with pushed images
_createThumbnails:function(t){this.get("total").innerHTML=this.getDataLength();function
// move some data into the instance
// for some reason, jQuery cant handle css(property) when zooming in FF, breaking the gallery
// so we resort to getComputedStyle for browsers who support it
Jh(t){return b.defaultView&&b.defaultView.getComputedStyle?b.defaultView.getComputedStyle(i.container,null)[t]:a.css(t)}function Kh(t,e,i){return function(){$(i).append(t),s.trigger({type:Galleria.THUMBNAIL,thumbTarget:t,index:e,galleriaData:s.getData(e)})}}function Lh(t){
// pause if option is set
l.pauseOnInteraction&&s.pause();
// extract the index from the data
var e=$(t.currentTarget).data("index");s.getIndex()!==e&&s.show(e),t.preventDefault()}function Mh(t,e){$(t.container).css("visibility","visible"),s.trigger({type:Galleria.THUMBNAIL,thumbTarget:t.image,index:t.data.order,galleriaData:s.getData(t.data.order)}),"function"==typeof e&&e.call(s,t)}function Nh(t,r){
// scale when ready
t.scale({width:t.data.width,height:t.data.height,crop:l.thumbCrop,margin:l.thumbMargin,canvas:l.useCanvas,position:l.thumbPosition,complete:function(i){
// shrink thumbnails to fit
var n,a,o=["left","top"];
// calculate shrinked positions
s.getData(i.index);$.each(["Width","Height"],function(t,e){n=e.toLowerCase(),!0===l.thumbCrop&&l.thumbCrop!==n||((a={})[n]=i[n],$(i.container).css(a),(a={})[o[t]]=0,$(i.image).css(a)),
// cache outer measures
i["outer"+e]=$(i.container)["outer"+e](!0)}),
// set high quality if downscale is moderate
W.toggleQuality(i.image,!0===l.thumbQuality||"auto"===l.thumbQuality&&i.original.width<3*i.width),l.thumbDisplayOrder&&!i.lazy?$.each(h,function(t,e){if(t===u&&e.ready&&!e.displayed)return u++,e.displayed=!0,void Mh(e,r)}):Mh(i,r)}})}var e,i,n,a,o,s=this,l=this._options,r=t?this._data.length-t.length:0,c=r,h=[],u=0,d=D<8?"http://upload.wikimedia.org/wikipedia/commons/c/c0/Blank.gif":"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D",
// get previously active thumbnail, if exists
p=!!(o=s.$("thumbnails").find(".active")).length&&o.find("img").attr("src"),
// cache the thumbnail option
f="string"==typeof l.thumbnails?l.thumbnails.toLowerCase():null;
// loop through data and create thumbnails
for(t||(this._thumbnails=[],this.$("thumbnails").empty());this._data[r];r++)
// get source from thumb or image
e=(n=this._data[r]).thumb||n.image,!0!==l.thumbnails&&"lazy"!=f||!n.thumb&&!n.image?n.iframe||"empty"===f||"numbers"===f?(i={container:W.create("galleria-image"),image:W.create("img","span"),ready:!0,data:{order:r}},
// create numbered thumbnails
"numbers"===f&&$(i.image).text(r+1),n.iframe&&$(i.image).addClass("iframe"),this.$("thumbnails").append(i.container),
// we need to "fake" a loading delay before we append and trigger
// 50+ should be enough
window.setTimeout(Kh(i.image,r,i.container),50+20*r)):i={container:null,image:null}:(
// add a new Picture instance
// save the index
(i=new Galleria.Picture(r)).index=r,
// flag displayed
i.displayed=!1,
// flag lazy
i.lazy=!1,
// flag video
i.video=!1,
// append the thumbnail
this.$("thumbnails").append(i.container),
// hide it
(
// cache the container
a=$(i.container)).css("visibility","hidden"),i.data={width:W.parseValue(Jh("width")),height:W.parseValue(Jh("height")),order:r,src:e},
// grab & reset size for smoother thumbnail loads
!0!==l.thumbCrop?a.css({width:"auto",height:"auto"}):a.css({width:i.data.width,height:i.data.height}),
// load the thumbnail
"lazy"==f?(a.addClass("lazy"),i.lazy=!0,i.load(d,{height:i.data.height,width:i.data.width})):i.load(e,Nh),
// preload all images here
"all"===l.preload&&i.preload(n.image)),
// add events for thumbnails
// you can control the event type using thumb_event_type
// we'll add the same event to the source if it's kept
$(i.container).add(l.keepSource&&l.linkSourceImages?n.original:null).data("index",r).on(l.thumbEventType,Lh).data("thumbload",Nh),p===e&&$(i.container).addClass("active"),this._thumbnails.push(i);return h=this._thumbnails.slice(c),this},
/**
        Lazy-loads thumbnails.
        You can call this method to load lazy thumbnails at run time

        @param {Array|Number} index Index or array of indexes of thumbnails to be loaded
        @param {Function} complete Callback that is called when all lazy thumbnails have been loaded

        @returns Instance
    */
lazyLoad:function(t,o){var r=t.constructor==Array?t:[t],s=this,l=0;return $.each(r,function(t,e){if(!(e>s._thumbnails.length-1)){function qi(){++l==r.length&&"function"==typeof o&&o.call(s)}var i=s._thumbnails[e],n=i.data,a=$(i.container).data("thumbload");i.video?a.call(s,i,qi):i.load(n.src,function(t){a.call(s,t,qi)})}}),this},
/**
        Lazy-loads thumbnails in chunks.
        This method automatcally chops up the loading process of many thumbnails into chunks

        @param {Number} size Size of each chunk to be loaded
        @param {Number} [delay] Delay between each loads

        @returns Instance
    */
lazyLoadChunks:function(t,i){var e=this.getDataLength(),n=0,a=0,o=[],r=[],s=this;for(i=i||0;n<e;n++)r.push(n),++a!=t&&n!=e-1||(o.push(r),a=0,r=[]);var l=function(t){var e=o.shift();e&&window.setTimeout(function(){s.lazyLoad(e,function(){l(!0)})},i&&t?i:0)};return l(!1),this},
// the internal _run method should be called after loading data into galleria
// makes sure the gallery has proper measurements before postrun & ready
_run:function(){var o=this;o._createThumbnails(),
// make sure we have a stageHeight && stageWidth
W.wait({timeout:1e4,until:function(){
// Opera crap
return Galleria.OPERA&&o.$("stage").css("display","inline-block"),o._stageWidth=o.$("stage").width(),o._stageHeight=o.$("stage").height(),o._stageWidth&&50<o._stageHeight;// what is an acceptable height?
},success:function(){
// postrun some stuff after the gallery is ready
// create the touch slider
if(
// save the instance
F.push(o),o._options.swipe){var a=o.$("images").width(o.getDataLength()*o._stageWidth);$.each(new Array(o.getDataLength()),function(t){var e=new Galleria.Picture,i=o.getData(t);$(e.container).css({position:"absolute",top:0,left:o._stageWidth*t}).prepend(o._layers[t]=$(W.create("galleria-layer")).css({position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:2})[0]).appendTo(a),i.video&&G(e.container),o._controls.slides.push(e);var n=new Galleria.Picture;n.isIframe=!0,$(n.container).attr("class","galleria-frame").css({position:"absolute",top:0,left:0,zIndex:4,background:"#000",display:"none"}).appendTo(e.container),o._controls.frames.push(n)}),o.finger.setup()}
// show counter
// if second load, just do the show and return
if(W.show(o.get("counter")),
// bind carousel nav
o._options.carousel&&o._carousel.bindControls(),
// start autoplay
o._options.autoplay&&(o.pause(),"number"==typeof o._options.autoplay&&(o._playtime=o._options.autoplay),o._playing=!0),o._firstrun)return o._options.autoplay&&o.trigger(Galleria.PLAY),void("number"==typeof o._options.show&&o.show(o._options.show));o._firstrun=!0,
// initialize the History plugin
Galleria.History&&
// bind the show method
Galleria.History.change(function(t){
// if ID is NaN, the user pressed back from the first image
// return to previous address
isNaN(t)?window.history.go(-1):o.show(t,undef,!0)}),o.trigger(Galleria.READY),
// call the theme init method
Galleria.theme.init.call(o,o._options),
// Trigger Galleria.ready
$.each(Galleria.ready.callbacks,function(t,e){"function"==typeof e&&e.call(o,o._options)}),
// call the extend option
o._options.extend.call(o,o._options),
// show the initial image
// first test for permalinks in history
/^[0-9]{1,4}$/.test(r)&&Galleria.History?o.show(r,undef,!0):o._data[o._options.show]&&o.show(o._options.show),
// play trigger
o._options.autoplay&&o.trigger(Galleria.PLAY)},error:function(){Galleria.raise("Stage width or height is too small to show the gallery. Traced measures: width:"+o._stageWidth+"px, height: "+o._stageHeight+"px.",!0)}})},
/**
        Loads data into the gallery.
        You can call this method on an existing gallery to reload the gallery with new data.

        @param {Array|string} [source] Optional JSON array of data or selector of where to find data in the document.
        Defaults to the Galleria target or dataSource option.

        @param {string} [selector] Optional element selector of what elements to parse.
        Defaults to 'img'.

        @param {Function} [config] Optional function to modify the data extraction proceedure from the selector.
        See the dataConfig option for more information.

        @returns Instance
    */
load:function(t,e,r){var s=this,i=this._options;
// empty the data array
return this._data=[],
// empty the thumbnails
this._thumbnails=[],this.$("thumbnails").empty(),
// shorten the arguments
"function"==typeof e&&(r=e,e=null),
// use the source set by target
t=t||i.dataSource,
// use selector set by option
e=e||i.dataSelector,
// use the dataConfig set by option
r=r||i.dataConfig,
// if source is a true object, make it into an array
$.isPlainObject(t)&&(t=[t]),
// check if the data is an array already
$.isArray(t)?this.validate(t)?this._data=t:Galleria.raise("Load failed: JSON Array not valid."):(
// add .video and .iframe to the selector (1.2.7)
e+=",.video,.iframe",
// loop through images and set data
$(t).find(e).each(function(t,i){i=$(i);var n={},e=i.parent(),a=e.attr("href"),o=e.attr("rel");a&&("IMG"==i[0].nodeName||i.hasClass("video"))&&x(a)?n.video=a:a&&i.hasClass("iframe")?n.iframe=a:n.image=n.big=a,o&&(n.big=o),
// alternative extraction from HTML5 data attribute, added in 1.2.7
$.each("big title description link layer image".split(" "),function(t,e){i.data(e)&&(n[e]=i.data(e).toString())}),n.big||(n.big=n.image),
// mix default extractions with the hrefs and config
// and push it into the data array
s._data.push($.extend({title:i.attr("title")||"",thumb:i.attr("src"),image:i.attr("src"),big:i.attr("src"),description:i.attr("alt")||"",link:i.attr("longdesc"),original:i.get(0)},n,r(i)))})),"function"==typeof i.dataSort?C.sort.call(this._data,i.dataSort):"random"==i.dataSort&&this._data.sort(function(){return A.round(A.random())-.5}),
// trigger the DATA event and return
this.getDataLength()&&this._parseData(function(){this.trigger(Galleria.DATA)}),this},
// make sure the data works properly
_parseData:function(t){function cj(){var i=!0;$.each(s._data,function(t,e){if(e.loading)return i=!1}),i&&!e&&(e=!0,t.call(s))}var r,s=this,e=!1;return $.each(this._data,function(t,e){
// parse video
if(r=s._data[t],
// copy image as thumb if no thumb exists
"thumb"in e==!1&&(r.thumb=e.image),
// copy image as big image if no biggie exists
e.big||(r.big=e.image),"video"in e){var o=x(e.video);o&&(r.iframe=new w(o.provider,o.id).embed()+function(){
// add options
if("object"!=typeof s._options[o.provider])return"";var i=[];return $.each(s._options[o.provider],function(t,e){i.push(t+"="+e)}),
// small youtube specifics, perhaps move to _video later
"youtube"==o.provider&&(i=["wmode=opaque"].concat(i)),"?"+i.join("&")}(),
// pre-fetch video providers media
r.thumb&&r.image||$.each(["thumb","image"],function(t,e){if("image"!=e||s._options.videoPoster){var i,n,a=new w(o.provider,o.id);r[e]||(r.loading=!0,a.getMedia(e,(i=r,n=e,function(t){i[n]=t,"image"!=n||i.big||(i.big=i.image),delete i.loading,cj()})))}else r.image=undef}))}}),cj(),this},
/**
        Destroy the Galleria instance and recover the original content

        @example this.destroy();

        @returns Instance
    */
destroy:function(){return this.$("target").data("galleria",null),this.$("container").off("galleria"),this.get("target").innerHTML=this._original.html,this.clearTimer(),W.removeFromArray(N,this),W.removeFromArray(F,this),Galleria._waiters.length&&$.each(Galleria._waiters,function(t,e){e&&window.clearTimeout(e)}),this},
/**
        Adds and/or removes images from the gallery
        Works just like Array.splice
        https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice

        @example this.splice( 2, 4 ); // removes 4 images after the second image

        @returns Instance
    */
splice:function(){var t=this,e=W.array(arguments);return window.setTimeout(function(){C.splice.apply(t._data,e),t._parseData(function(){t._createThumbnails()})},2),t},
/**
        Append images to the gallery
        Works just like Array.push
        https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push

        @example this.push({ image: 'image1.jpg' }); // appends the image to the gallery

        @returns Instance
    */
push:function(){var t=this,e=W.array(arguments);return 1==e.length&&e[0].constructor==Array&&(e=e[0]),window.setTimeout(function(){C.push.apply(t._data,e),t._parseData(function(){t._createThumbnails(e)})},2),t},_getActive:function(){return this._controls.getActive()},validate:function(t){
// todo: validate a custom data array
return!0},
/**
        Bind any event to Galleria

        @param {string} type The Event type to listen for
        @param {Function} fn The function to execute when the event is triggered

        @example this.bind( 'image', function() { Galleria.log('image shown') });

        @returns Instance
    */
bind:function(t,e){
// allow 'image' instead of Galleria.IMAGE
return t=u(t),this.$("container").on(t,this.proxy(e)),this},
/**
        Unbind any event to Galleria

        @param {string} type The Event type to forget

        @returns Instance
    */
unbind:function(t){return t=u(t),this.$("container").off(t),this},
/**
        Manually trigger a Galleria event

        @param {string} type The Event to trigger

        @returns Instance
    */
trigger:function(t){return t="object"==typeof t?$.extend(t,{scope:this}):{type:u(t),scope:this},this.$("container").trigger(t),this},
/**
        Assign an "idle state" to any element.
        The idle state will be applied after a certain amount of idle time
        Useful to hide f.ex navigation when the gallery is inactive

        @param {HTMLElement|string} elem The Dom node or selector to apply the idle state to
        @param {Object} styles the CSS styles to apply when in idle mode
        @param {Object} [from] the CSS styles to apply when in normal
        @param {Boolean} [hide] set to true if you want to hide it first

        @example addIdleState( this.get('image-nav'), { opacity: 0 });
        @example addIdleState( '.galleria-image-nav', { top: -200 }, true);

        @returns Instance
    */
addIdleState:function(t,e,i,n){return this._idle.add.apply(this._idle,W.array(arguments)),this},
/**
        Removes any idle state previously set using addIdleState()

        @param {HTMLElement|string} elem The Dom node or selector to remove the idle state from.

        @returns Instance
    */
removeIdleState:function(t){return this._idle.remove.apply(this._idle,W.array(arguments)),this},
/**
        Force Galleria to enter idle mode.

        @returns Instance
    */
enterIdleMode:function(){return this._idle.hide(),this},
/**
        Force Galleria to exit idle mode.

        @returns Instance
    */
exitIdleMode:function(){return this._idle.showAll(),this},
/**
        Enter FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns Instance
    */
enterFullscreen:function(t){return this._fullscreen.enter.apply(this,W.array(arguments)),this},
/**
        Exits FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns Instance
    */
exitFullscreen:function(t){return this._fullscreen.exit.apply(this,W.array(arguments)),this},
/**
        Toggle FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied or removed.

        @returns Instance
    */
toggleFullscreen:function(t){return this._fullscreen[this.isFullscreen()?"exit":"enter"].apply(this,W.array(arguments)),this},
/**
        Adds a tooltip to any element.
        You can also call this method with an object as argument with elemID:value pairs to apply tooltips to (see examples)

        @param {HTMLElement} elem The DOM Node to attach the event to
        @param {string|Function} value The tooltip message. Can also be a function that returns a string.

        @example this.bindTooltip( this.get('thumbnails'), 'My thumbnails');
        @example this.bindTooltip( this.get('thumbnails'), function() { return 'My thumbs' });
        @example this.bindTooltip( { image_nav: 'Navigation' });

        @returns Instance
    */
bindTooltip:function(t,e){return this._tooltip.bind.apply(this._tooltip,W.array(arguments)),this},
/**
        Note: this method is deprecated. Use refreshTooltip() instead.

        Redefine a tooltip.
        Use this if you want to re-apply a tooltip value to an already bound tooltip element.

        @param {HTMLElement} elem The DOM Node to attach the event to
        @param {string|Function} value The tooltip message. Can also be a function that returns a string.

        @returns Instance
    */
defineTooltip:function(t,e){return this._tooltip.define.apply(this._tooltip,W.array(arguments)),this},
/**
        Refresh a tooltip value.
        Use this if you want to change the tooltip value at runtime, f.ex if you have a play/pause toggle.

        @param {HTMLElement} elem The DOM Node that has a tooltip that should be refreshed

        @returns Instance
    */
refreshTooltip:function(t){return this._tooltip.show.apply(this._tooltip,W.array(arguments)),this},
/**
        Open a pre-designed lightbox with the currently active image.
        You can control some visuals using gallery options.

        @returns Instance
    */
openLightbox:function(){return this._lightbox.show.apply(this._lightbox,W.array(arguments)),this},
/**
        Close the lightbox.

        @returns Instance
    */
closeLightbox:function(){return this._lightbox.hide.apply(this._lightbox,W.array(arguments)),this},
/**
        Check if a variation exists

        @returns {Boolean} If the variation has been applied
    */
hasVariation:function(t){return-1<$.inArray(t,this._options.variation.split(/\s+/))},
/**
        Get the currently active image element.

        @returns {HTMLElement} The image element
    */
getActiveImage:function(){var t=this._getActive();return t?t.image:undef},
/**
        Get the currently active thumbnail element.

        @returns {HTMLElement} The thumbnail element
    */
getActiveThumb:function(){return this._thumbnails[this._active].image||undef},
/**
        Get the mouse position relative to the gallery container

        @param e The mouse event

        @example

var gallery = this;
$(document).mousemove(function(e) {
    console.log( gallery.getMousePosition(e).x );
});

        @returns {Object} Object with x & y of the relative mouse postion
    */
getMousePosition:function(t){return{x:t.pageX-this.$("container").offset().left,y:t.pageY-this.$("container").offset().top}},
/**
        Adds a panning effect to the image

        @param [img] The optional image element. If not specified it takes the currently active image

        @returns Instance
    */
addPan:function(a){if(!1!==this._options.imageCrop){a=$(a||this.getActiveImage());function
// positions the image
gk(t,e,i){if(0<t&&(f=A.round(A.max(-1*t,A.min(0,e))),p!==f))if(p=f,8===D)// scroll is faster for IE
a.parent()["scroll"+i](-1*f);else{var n={};n[i.toLowerCase()]=f,a.css(n)}}function
// calculates mouse position after 50ms
hk(t){W.timestamp()-d<50||(u=!0,i=e.getMousePosition(t).x,n=e.getMousePosition(t).y)}
// define some variables and methods
var e=this,i=a.width()/2,n=a.height()/2,o=parseInt(a.css("left"),10),r=parseInt(a.css("top"),10),s=o||0,l=r||0,c=0,h=0,u=!1,d=W.timestamp(),p=0,f=0;
// we need to use scroll in IE8 to speed things up
return 8===D&&(a.parent().scrollTop(-1*l).scrollLeft(-1*s),a.css({top:0,left:0})),
// unbind and bind event
this.$("stage").off("mousemove",hk).on("mousemove",hk),
// loop the loop
this.addTimer("pan"+e._id,function(t){u&&(c=a.width()-e._stageWidth,h=a.height()-e._stageHeight,o=i/e._stageWidth*c*-1,r=n/e._stageHeight*h*-1,s+=(o-s)/e._options.imagePanSmoothness,l+=(r-l)/e._options.imagePanSmoothness,gk(h,l,"Top"),gk(c,s,"Left"))},50,!0),this}},
/**
        Brings the scope into any callback

        @param fn The callback to bring the scope into
        @param [scope] Optional scope to bring

        @example $('#fullscreen').click( this.proxy(function() { this.enterFullscreen(); }) )

        @returns {Function} Return the callback with the gallery scope
    */
proxy:function(t,e){return"function"!=typeof t?m:(e=e||this,function(){return t.apply(e,W.array(arguments))})},
/**
        Removes the panning effect set by addPan()

        @returns Instance
    */
removePan:function(){
// todo: doublecheck IE8
return this.$("stage").off("mousemove"),this.clearTimer("pan"+this._id),this},
/**
        Adds an element to the Galleria DOM array.
        When you add an element here, you can access it using element ID in many API calls

        @param {string} id The element ID you wish to use. You can add many elements by adding more arguments.

        @example addElement('mybutton');
        @example addElement('mybutton','mylink');

        @returns Instance
    */
addElement:function(t){var i=this._dom;return $.each(W.array(arguments),function(t,e){i[e]=W.create("galleria-"+e)}),this},
/**
        Attach keyboard events to Galleria

        @param {Object} map The map object of events.
        Possible keys are 'UP', 'DOWN', 'LEFT', 'RIGHT', 'RETURN', 'ESCAPE', 'BACKSPACE', and 'SPACE'.

        @example

this.attachKeyboard({
    right: this.next,
    left: this.prev,
    up: function() {
        console.log( 'up key pressed' )
    }
});

        @returns Instance
    */
attachKeyboard:function(t){return this._keyboard.attach.apply(this._keyboard,W.array(arguments)),this},
/**
        Detach all keyboard events to Galleria

        @returns Instance
    */
detachKeyboard:function(){return this._keyboard.detach.apply(this._keyboard,W.array(arguments)),this},
/**
        Fast helper for appending galleria elements that you added using addElement()

        @param {string} parentID The parent element ID where the element will be appended
        @param {string} childID the element ID that should be appended

        @example this.addElement('myElement');
        this.appendChild( 'info', 'myElement' );

        @returns Instance
    */
appendChild:function(t,e){return this.$(t).append(this.get(e)||e),this},
/**
        Fast helper for prepending galleria elements that you added using addElement()

        @param {string} parentID The parent element ID where the element will be prepended
        @param {string} childID the element ID that should be prepended

        @example

this.addElement('myElement');
this.prependChild( 'info', 'myElement' );

        @returns Instance
    */
prependChild:function(t,e){return this.$(t).prepend(this.get(e)||e),this},
/**
        Remove an element by blueprint

        @param {string} elemID The element to be removed.
        You can remove multiple elements by adding arguments.

        @returns Instance
    */
remove:function(t){return this.$(W.array(arguments).join(",")).remove(),this},
// a fast helper for building dom structures
// leave this out of the API for now
append:function(t){var e,i;for(e in t)if(t.hasOwnProperty(e))if(t[e].constructor===Array)for(i=0;t[e][i];i++)this.appendChild(e,t[e][i]);else this.appendChild(e,t[e]);return this},
// an internal helper for scaling according to options
_scaleImage:function(t,e){
// janpub (JH) fix:
// image might be unselected yet
// e.g. when external logics rescales the gallery on window resize events
if(t=t||this._controls.getActive()){function Hk(t){$(t.container).children(":first").css({top:A.max(0,W.parseValue(t.image.style.top)),left:A.max(0,W.parseValue(t.image.style.left)),width:W.parseValue(t.image.width),height:W.parseValue(t.image.height)})}var i;return e=$.extend({width:this._stageWidth,height:this._stageHeight,crop:this._options.imageCrop,max:this._options.maxScaleRatio,min:this._options.minScaleRatio,margin:this._options.imageMargin,position:this._options.imagePosition,iframelimit:this._options.maxVideoSize},e),this._options.layerFollow&&!0!==this._options.imageCrop?"function"==typeof e.complete?(i=e.complete,e.complete=function(){i.call(t,t),Hk(t)}):e.complete=Hk:$(t.container).children(":first").css({top:0,left:0}),t.scale(e),this}},
/**
        Updates the carousel,
        useful if you resize the gallery and want to re-check if the carousel nav is needed.

        @returns Instance
    */
updateCarousel:function(){return this._carousel.update(),this},
/**
        Resize the entire gallery container

        @param {Object} [measures] Optional object with width/height specified
        @param {Function} [complete] The callback to be called when the scaling is complete

        @returns Instance
    */
resize:function(i,t){"function"==typeof i&&(t=i,i=undef),i=$.extend({width:0,height:0},i);var n=this,a=this.$("container");return $.each(i,function(t,e){e||(a[t]("auto"),i[t]=n._getWH()[t])}),$.each(i,function(t,e){a[t](e)}),this.rescale(t)},
/**
        Rescales the gallery

        @param {number} width The target width
        @param {number} height The target height
        @param {Function} complete The callback to be called when the scaling is complete

        @returns Instance
    */
rescale:function(t,e,i){var n=this;
// allow rescale(fn)
"function"==typeof t&&(i=t,t=undef);return function(){
// set stagewidth
n._stageWidth=t||n.$("stage").width(),n._stageHeight=e||n.$("stage").height(),n._options.swipe?($.each(n._controls.slides,function(t,e){n._scaleImage(e),$(e.container).css("left",n._stageWidth*t)}),n.$("images").css("width",n._stageWidth*n.getDataLength())):
// scale the active image
n._scaleImage(),n._options.carousel&&n.updateCarousel(),n._controls.frames[n._controls.active]&&n._controls.frames[n._controls.active].scale({width:n._stageWidth,height:n._stageHeight,iframelimit:n._options.maxVideoSize}),n.trigger(Galleria.RESCALE),"function"==typeof i&&i.call(n)}.call(n),this},
/**
        Refreshes the gallery.
        Useful if you change image options at runtime and want to apply the changes to the active image.

        @returns Instance
    */
refreshImage:function(){return this._scaleImage(),this._options.imagePan&&this.addPan(),this},_preload:function(){if(this._options.preload){var t,e,i,n=this.getNext();try{for(e=this._options.preload;0<e;e--)t=new Galleria.Picture,i=this.getData(n),t.preload(this.isFullscreen()&&i.big?i.big:i.image),n=this.getNext(n)}catch(t){}}},
/**
        Shows an image by index

        @param {number|boolean} index The index to show
        @param {Boolean} rewind A boolean that should be true if you want the transition to go back

        @returns Instance
    */
show:function(t,e,i){var n=this._options.swipe;
// do nothing queue is long || index is false || queue is false and transition is in progress
if(n||!(3<this._queue.length||!1===t||!this._options.queue&&this._queue.stalled)){
// do the history thing and return
if(t=A.max(0,A.min(parseInt(t,10),this.getDataLength()-1)),e=void 0!==e?!!e:t<this.getIndex(),(i=i||!1)||!Galleria.History){
// we do things a bit simpler in swipe:
if(this.finger&&t!==this._active&&(this.finger.to=-t*this.finger.width,this.finger.index=t),this._active=t,n){var a=this.getData(t),o=this;if(!a)return;var r=this.isFullscreen()&&a.big?a.big:a.image||a.iframe,s=this._controls.slides[t],l=s.isCached(r),c=this._thumbnails[t],h={cached:l,index:t,rewind:e,imageTarget:s.image,thumbTarget:c.image,galleriaData:a};this.trigger($.extend(h,{type:Galleria.LOADSTART})),o.$("container").removeClass("videoplay");function nl(){o._layers[t].innerHTML=o.getData().layer||"",o.trigger($.extend(h,{type:Galleria.LOADFINISH})),o._playCheck()}o._preload(),window.setTimeout(function(){
// load if not ready
s.ready&&$(s.image).attr("src")==r?(o.trigger($.extend(h,{type:Galleria.IMAGE})),nl()):(a.iframe&&!a.image&&(s.isIframe=!0),s.load(r,function(t){o._scaleImage(t,nl).trigger($.extend(h,{type:Galleria.IMAGE})),nl()}))},100)}else C.push.call(this._queue,{index:t,rewind:e}),this._queue.stalled||this._show();return this}Galleria.History.set(t.toString())}},
// the internal _show method does the actual showing
_show:function(){
// shortcuts
var a=this,o=this._queue[0],r=this.getData(o.index);if(r){function xl(){$(e.image).trigger("mouseup")}var t=this.isFullscreen()&&r.big?r.big:r.image||r.iframe,s=this._controls.getActive(),e=this._controls.getNext(),l=e.isCached(t),i=this._thumbnails[o.index];a.$("container").toggleClass("iframe",!!r.isIframe).removeClass("videoplay");
// to be fired when loading & transition is complete:
var c,n,h,u,d,p=(c=r,n=e,h=s,u=o,d=i,function(){j.active=!1,
// optimize quality
W.toggleQuality(n.image,a._options.imageQuality),
// remove old layer
a._layers[a._controls.active].innerHTML="",
// swap
$(h.container).css({zIndex:0,opacity:0}).show(),$(h.container).find("iframe, .galleria-videoicon").remove(),$(a._controls.frames[a._controls.active].container).hide(),$(n.container).css({zIndex:1,left:0,top:0}).show(),a._controls.swap(),
// add pan according to option
a._options.imagePan&&a.addPan(n.image),
// make the image clickable
// order of precedence: iframe, link, lightbox, clicknext
(c.iframe&&c.image||c.link||a._options.lightbox||a._options.clicknext)&&$(n.image).css({cursor:"pointer"}).on("mouseup",function(t){
// non-left click
if(!("number"==typeof t.which&&1<t.which)){
// iframe / video
if(c.iframe){a.isPlaying()&&a.pause();var e=a._controls.frames[a._controls.active],i=a._stageWidth,n=a._stageHeight;return $(e.container).css({width:i,height:n,opacity:0}).show().animate({opacity:1},200),void window.setTimeout(function(){e.load(c.iframe+(c.video?"&autoplay=1":""),{width:i,height:n},function(t){a.$("container").addClass("videoplay"),t.scale({width:a._stageWidth,height:a._stageHeight,iframelimit:c.video?a._options.maxVideoSize:undef})})},100)}
// clicknext
if(a._options.clicknext&&!Galleria.TOUCH)return a._options.pauseOnInteraction&&a.pause(),void a.next();
// popup link
c.link?a._options.popupLinks?window.open(c.link,"_blank"):window.location.href=c.link:a._options.lightbox&&a.openLightbox()}}),
// check if we are playing
a._playCheck(),
// trigger IMAGE event
a.trigger({type:Galleria.IMAGE,index:u.index,imageTarget:n.image,thumbTarget:d.image,galleriaData:c}),
// remove the queued image
C.shift.call(a._queue),
// remove stalled
a._queue.stalled=!1,
// if we still have images in the queue, show it
a._queue.length&&a._show()});
// let the carousel follow
this._options.carousel&&this._options.carouselFollow&&this._carousel.follow(o.index),
// preload images
a._preload(),
// show the next image, just in case
W.show(e.container),e.isIframe=r.iframe&&!r.image,
// add active classes
$(a._thumbnails[o.index].container).addClass("active").siblings(".active").removeClass("active"),
// trigger the LOADSTART event
a.trigger({type:Galleria.LOADSTART,cached:l,index:o.index,rewind:o.rewind,imageTarget:e.image,thumbTarget:i.image,galleriaData:r}),
// stall the queue
a._queue.stalled=!0,
// begin loading the next image
e.load(t,function(t){
// add layer HTML
var n=$(a._layers[1-a._controls.active]).html(r.layer||"").hide();a._scaleImage(t,{complete:function(t){
// toggle low quality for IE
"image"in s&&W.toggleQuality(s.image,!1),W.toggleQuality(t.image,!1),
// remove the image panning, if applied
// TODO: rethink if this is necessary
a.removePan(),
// set the captions and counter
a.setInfo(o.index),a.setCounter(o.index),
// show the layer now
r.layer&&(n.show(),
// inherit click events set on image
(r.iframe&&r.image||r.link||a._options.lightbox||a._options.clicknext)&&n.css("cursor","pointer").off("mouseup").mouseup(xl)),
// add play icon
r.video&&r.image&&G(t.container);var i=a._options.transition;
// can JavaScript loop through objects in order? yes.
// validate the transition
if($.each({initial:null===s.image,touch:Galleria.TOUCH,fullscreen:a.isFullscreen()},function(t,e){if(e&&a._options[t+"Transition"]!==undef)return i=a._options[t+"Transition"],!1}),i in j.effects==!1)p();else{var e={prev:s.container,next:t.container,rewind:o.rewind,speed:a._options.transitionSpeed||400};j.active=!0,
// call the transition function and send some stuff
j.init.call(a,i,e,p)}
// trigger the LOADFINISH event
a.trigger({type:Galleria.LOADFINISH,cached:l,index:o.index,rewind:o.rewind,imageTarget:t.image,thumbTarget:a._thumbnails[o.index].image,galleriaData:a.getData(o.index)})}})})}},
/**
        Gets the next index

        @param {number} [base] Optional starting point

        @returns {number} the next index, or the first if you are at the first (looping)
    */
getNext:function(t){return(t="number"==typeof t?t:this.getIndex())===this.getDataLength()-1?0:t+1},
/**
        Gets the previous index

        @param {number} [base] Optional starting point

        @returns {number} the previous index, or the last if you are at the first (looping)
    */
getPrev:function(t){return 0===(t="number"==typeof t?t:this.getIndex())?this.getDataLength()-1:t-1},
/**
        Shows the next image in line

        @returns Instance
    */
next:function(){return 1<this.getDataLength()&&this.show(this.getNext(),!1),this},
/**
        Shows the previous image in line

        @returns Instance
    */
prev:function(){return 1<this.getDataLength()&&this.show(this.getPrev(),!0),this},
/**
        Retrieve a DOM element by element ID

        @param {string} elemId The delement ID to fetch

        @returns {HTMLElement} The elements DOM node or null if not found.
    */
get:function(t){return t in this._dom?this._dom[t]:null},
/**
        Retrieve a data object

        @param {number} index The data index to retrieve.
        If no index specified it will take the currently active image

        @returns {Object} The data object
    */
getData:function(t){return t in this._data?this._data[t]:this._data[this._active]},
/**
        Retrieve the number of data items

        @returns {number} The data length
    */
getDataLength:function(){return this._data.length},
/**
        Retrieve the currently active index

        @returns {number|boolean} The active index or false if none found
    */
getIndex:function(){return"number"==typeof this._active&&this._active},
/**
        Retrieve the stage height

        @returns {number} The stage height
    */
getStageHeight:function(){return this._stageHeight},
/**
        Retrieve the stage width

        @returns {number} The stage width
    */
getStageWidth:function(){return this._stageWidth},
/**
        Retrieve the option

        @param {string} key The option key to retrieve. If no key specified it will return all options in an object.

        @returns option or options
    */
getOptions:function(t){return void 0===t?this._options:this._options[t]},
/**
        Set options to the instance.
        You can set options using a key & value argument or a single object argument (see examples)

        @param {string} key The option key
        @param {string} value the the options value

        @example setOptions( 'autoplay', true )
        @example setOptions({ autoplay: true });

        @returns Instance
    */
setOptions:function(t,e){return"object"==typeof t?$.extend(this._options,t):this._options[t]=e,this},
/**
        Starts playing the slideshow

        @param {number} delay Sets the slideshow interval in milliseconds.
        If you set it once, you can just call play() and get the same interval the next time.

        @returns Instance
    */
play:function(t){return this._playing=!0,this._playtime=t||this._playtime,this._playCheck(),this.trigger(Galleria.PLAY),this},
/**
        Stops the slideshow if currently playing

        @returns Instance
    */
pause:function(){return this._playing=!1,this.trigger(Galleria.PAUSE),this},
/**
        Toggle between play and pause events.

        @param {number} delay Sets the slideshow interval in milliseconds.

        @returns Instance
    */
playToggle:function(t){return this._playing?this.pause():this.play(t)},
/**
        Checks if the gallery is currently playing

        @returns {Boolean}
    */
isPlaying:function(){return this._playing},
/**
        Checks if the gallery is currently in fullscreen mode

        @returns {Boolean}
    */
isFullscreen:function(){return this._fullscreen.active},_playCheck:function(){var t=this,e=0,i=W.timestamp(),n="play"+this._id;if(this._playing){this.clearTimer(n);var a=function(){if((e=W.timestamp()-i)>=t._playtime&&t._playing)return t.clearTimer(n),void t.next();t._playing&&(
// trigger the PROGRESS event
t.trigger({type:Galleria.PROGRESS,percent:A.ceil(e/t._playtime*100),seconds:A.floor(e/1e3),milliseconds:e}),t.addTimer(n,a,20))};t.addTimer(n,a,20)}},
/**
        Modify the slideshow delay

        @param {number} delay the number of milliseconds between slides,

        @returns Instance
    */
setPlaytime:function(t){return this._playtime=t,this},setIndex:function(t){return this._active=t,this},
/**
        Manually modify the counter

        @param {number} [index] Optional data index to fectch,
        if no index found it assumes the currently active index

        @returns Instance
    */
setCounter:function(t){if("number"==typeof t?t++:void 0===t&&(t=this.getIndex()+1),this.get("current").innerHTML=t,D){// weird IE bug
var e=this.$("counter"),i=e.css("opacity");1===parseInt(i,10)?W.removeAlpha(e[0]):this.$("counter").css("opacity",i)}return this},
/**
        Manually set captions

        @param {number} [index] Optional data index to fectch and apply as caption,
        if no index found it assumes the currently active index

        @returns Instance
    */
setInfo:function(t){var n=this,a=this.getData(t);return $.each(["title","description"],function(t,e){var i=n.$("info-"+e);a[e]?i[a[e].length?"show":"hide"]().html(a[e]):i.empty().hide()}),this},
/**
        Checks if the data contains any captions

        @param {number} [index] Optional data index to fectch,
        if no index found it assumes the currently active index.

        @returns {boolean}
    */
hasInfo:function(t){var e,i="title description".split(" ");for(e=0;i[e];e++)if(this.getData(t)[i[e]])return!0;return!1},jQuery:function(t){var i=this,n=[];$.each(t.split(","),function(t,e){e=$.trim(e),i.get(e)&&n.push(e)});var a=$(i.get(n.shift()));return $.each(n,function(t,e){a=a.add(i.get(e))}),a},
/**
        Converts element IDs into a jQuery collection
        You can call for multiple IDs separated with commas.

        @param {string} str One or more element IDs (comma-separated)

        @returns jQuery

        @example this.$('info,container').hide();
    */
$:function(t){return this.jQuery.apply(this,W.array(arguments))}},
// End of Galleria prototype
// Add events as static variables
$.each(z,function(t,e){
// legacy events
var i=/_/.test(e)?e.replace(/_/g,""):e;Galleria[e.toUpperCase()]="galleria."+i}),$.extend(Galleria,{
// Browser helpers
IE9:9===D,IE8:8===D,IE7:7===D,IE6:6===D,IE:D,WEBKIT:/webkit/.test(S),CHROME:/chrome/.test(S),SAFARI:/safari/.test(S)&&!/chrome/.test(S),QUIRK:D&&b.compatMode&&"BackCompat"===b.compatMode,MAC:/mac/.test(navigator.platform.toLowerCase()),OPERA:!!window.opera,IPHONE:/iphone/.test(S),IPAD:/ipad/.test(S),ANDROID:/android/.test(S),TOUCH:"ontouchstart"in b}),
// Galleria static methods
/**
    Adds a theme that you can use for your Gallery

    @param {Object} theme Object that should contain all your theme settings.
    <ul>
        <li>name - name of the theme</li>
        <li>author - name of the author</li>
        <li>css - css file name (not path)</li>
        <li>defaults - default options to apply, including theme-specific options</li>
        <li>init - the init function</li>
    </ul>

    @returns {Object} theme
*/
Galleria.addTheme=function(i){
// make sure we have a name
i.name||Galleria.raise("No theme name specified"),"object"!=typeof i.defaults?i.defaults={}:i.defaults=t(i.defaults);var n=!1;return"string"==typeof i.css?(
// look for manually added CSS
$("link").each(function(t,e){if(new RegExp(i.css).test(e.href))
// we found the css
return n=!0,
// the themeload trigger
E(i),!1}),
// else look for the absolute path and load the CSS dynamic
n||$(function(){
// Try to determine the css-path from the theme script.
// In IE8/9, the script-dom-element seems to be not present
// at once, if galleria itself is inserted into the dom
// dynamically. We therefore try multiple times before raising
// an error.
var t=0,e=function(){$("script").each(function(t,e){
// look for the theme script
new RegExp("galleria\\."+i.name.toLowerCase()+"\\.").test(e.src)&&(
// we have a match
n=e.src.replace(/[^\/]*$/,"")+i.css,window.setTimeout(function(){W.loadCSS(n,"galleria-theme",function(){
// the themeload trigger
E(i)})},1))}),n||5<t++||window.setTimeout(e,500)};e()})):
// pass
E(i),i},
/**
    loadTheme loads a theme js file and attaches a load event to Galleria

    @param {string} src The relative path to the theme source file

    @param {Object} [options] Optional options you want to apply

    @returns Galleria
*/
Galleria.loadTheme=function(t,e){
// Don't load if theme is already loaded
if(!$("script").filter(function(){return $(this).attr("src")==t}).length){var i,n=!1;
// start listening for the timeout onload
return $(window).load(function(){n||(
// give it another 20 seconds
i=window.setTimeout(function(){n||Galleria.theme||Galleria.raise("Galleria had problems loading theme at "+t+". Please check theme path or load manually.",!0)},2e4))}),
// first clear the current theme, if exists
Galleria.unloadTheme(),
// load the theme
W.loadScript(t,function(){n=!0,window.clearTimeout(i)}),Galleria}},
/**
    unloadTheme unloads the Galleria theme and prepares for a new theme

    @returns Galleria
*/
Galleria.unloadTheme=function(){return"object"==typeof Galleria.theme&&($("script").each(function(t,e){new RegExp("galleria\\."+Galleria.theme.name+"\\.").test(e.src)&&$(e).remove()}),Galleria.theme=undef),Galleria},
/**
    Retrieves a Galleria instance.

    @param {number} [index] Optional index to retrieve.
    If no index is supplied, the method will return all instances in an array.

    @returns Instance or Array of instances
*/
Galleria.get=function(t){return N[t]?N[t]:"number"!=typeof t?N:void Galleria.raise("Gallery index "+t+" not found")},
/**

    Configure Galleria options via a static function.
    The options will be applied to all instances

    @param {string|object} key The options to apply or a key

    @param [value] If key is a string, this is the value

    @returns Galleria

*/
Galleria.configure=function(t,e){var i={};return"string"==typeof t&&e?(i[t]=e,t=i):$.extend(i,t),Galleria.configure.options=i,$.each(Galleria.get(),function(t,e){e.setOptions(i)}),Galleria},Galleria.configure.options={},
/**

    Bind a Galleria event to the gallery

    @param {string} type A string representing the galleria event

    @param {function} callback The function that should run when the event is triggered

    @returns Galleria

*/
Galleria.on=function(i,n){if(i){
// hash the bind
var a=i+(n=n||m).toString().replace(/\s/g,"")+W.timestamp();
// for existing instances
return $.each(Galleria.get(),function(t,e){e._binds.push(a),e.bind(i,n)}),
// for future instances
Galleria.on.binds.push({type:i,callback:n,hash:a}),Galleria}},Galleria.on.binds=[],
/**

    Run Galleria
    Alias for $(selector).galleria(options)

    @param {string} selector A selector of element(s) to intialize galleria to

    @param {object} options The options to apply

    @returns Galleria

*/
Galleria.run=function(t,e){return $.isFunction(e)&&(e={extend:e}),$(t||"#galleria").galleria(e),Galleria},
/**
    Creates a transition to be used in your gallery

    @param {string} name The name of the transition that you will use as an option

    @param {Function} fn The function to be executed in the transition.
    The function contains two arguments, params and complete.
    Use the params Object to integrate the transition, and then call complete when you are done.

    @returns Galleria

*/
Galleria.addTransition=function(t,e){return j.effects[t]=e,Galleria},
/**
    The Galleria utilites
*/
Galleria.utils=W,
/**
    A helper metod for cross-browser logging.
    It uses the console log if available otherwise it falls back to alert

    @example Galleria.log("hello", document.body, [1,2,3]);
*/
Galleria.log=function(){var e=W.array(arguments);if(!("console"in window&&"log"in window.console))return window.alert(e.join("<br>"));try{return window.console.log.apply(window.console,e)}catch(t){$.each(e,function(){window.console.log(this)})}},
/**
    A ready method for adding callbacks when a gallery is ready
    Each method is call before the extend option for every instance

    @param {function} callback The function to call

    @returns Galleria
*/
Galleria.ready=function(i){return"function"!=typeof i||($.each(F,function(t,e){i.call(e,e._options)}),Galleria.ready.callbacks.push(i)),Galleria},Galleria.ready.callbacks=[],
/**
    Method for raising errors

    @param {string} msg The message to throw

    @param {boolean} [fatal] Set this to true to override debug settings and display a fatal error
*/
Galleria.raise=function(t,e){var i,n={color:"#fff",position:"absolute",top:0,left:0,zIndex:1e5};
// if debug is on, display errors and throw exception if fatal
if(a)i='<div style="padding:4px;margin:0 0 2px;background:#'+(e?"811":"222")+';">'+(e?"<strong>"+(e?"Fatal error":"Error")+": </strong>":"")+t+"</div>",$.each(N,function(){var t=this.$("errors"),e=this.$("target");t.length||(e.css("position","relative"),t=this.addElement("errors").appendChild("target","errors").$("errors").css(n)),t.append(i)}),N.length||$("<div>").css($.extend(n,{position:"fixed"})).append(i).appendTo(p().body);else if(e){if(M)return;e=!(M=!0)}},
// Add the version
Galleria.version=1.35,
/**
    A method for checking what version of Galleria the user has installed and throws a readable error if the user needs to upgrade.
    Useful when building plugins that requires a certain version to function.

    @param {number} version The minimum version required

    @param {string} [msg] Optional message to display. If not specified, Galleria will throw a generic error.

    @returns Galleria
*/
Galleria.requires=function(t,e){return e=e||"You need to upgrade Galleria to version "+t+" to use one or more components.",Galleria.version<t&&Galleria.raise(e,!0),Galleria},
/**
    Adds preload, cache, scale and crop functionality

    @constructor

    @requires jQuery

    @param {number} [id] Optional id to keep track of instances
*/
Galleria.Picture=function(t){
// save the id
this.id=t||null,
// the image should be null until loaded
this.image=null,
// Create a new container
this.container=W.create("galleria-image"),
// add container styles
$(this.container).css({overflow:"hidden",position:"relative"}),
// saves the original measurements
this.original={width:0,height:0},
// flag when the image is ready
this.ready=!1,
// flag for iframe Picture
this.isIframe=!1},Galleria.Picture.prototype={
// the inherited cache object
cache:{},
// show the image on stage
show:function(){W.show(this.image)},
// hide the image
hide:function(){W.moveOut(this.image)},clear:function(){this.image=null},
/**
        Checks if an image is in cache

        @param {string} src The image source path, ex '/path/to/img.jpg'

        @returns {boolean}
    */
isCached:function(t){return!!this.cache[t]},
/**
        Preloads an image into the cache

        @param {string} src The image source path, ex '/path/to/img.jpg'

        @returns Galleria.Picture
    */
preload:function(t){var e,i;$(new Image).load((e=t,i=this.cache,function(){i[e]=e})).attr("src",t)},
/**
        Loads an image and call the callback when ready.
        Will also add the image to cache.

        @param {string} src The image source path, ex '/path/to/img.jpg'
        @param {Object} [size] The forced size of the image, defined as an object { width: xx, height:xx }
        @param {Function} callback The function to be executed when the image is loaded & scaled

        @returns The image container (jQuery object)
    */
load:function(i,e,t){if("function"==typeof e&&(t=e,e=null),this.isIframe){var n="if"+(new Date).getTime(),a=this.image=$("<iframe>",{src:i,frameborder:0,id:n,allowfullscreen:!0,css:{visibility:"hidden"}})[0];return e&&$(a).css(e),$(this.container).find("iframe,img").remove(),this.container.appendChild(this.image),$("#"+n).load((o=this,r=t,function(){window.setTimeout(function(){$(o.image).css("visibility","visible"),"function"==typeof r&&r.call(o,o)},10)})),this.container}var o,r;this.image=new Image,
// IE8 opacity inherit bug
Galleria.IE8&&$(this.image).css("filter","inherit");var s,l,c,h=!1,u=!1,
// some jquery cache
d=$(this.container),p=$(this.image),
// the onload method
f=(s=this,l=t,c=i,function(){function Un(){$(this).off("load"),
// save the original size
s.original=e||{height:this.height,width:this.width},
// translate3d if needed
Galleria.HAS3D&&(this.style.MozTransform=this.style.webkitTransform="translate3d(0,0,0)"),d.append(this),s.cache[c]=c,// will override old cache
"function"==typeof l&&window.setTimeout(function(){l.call(s,s)},1)}var t;
// Delay the callback to "fix" the Adblock Bug
// http://code.google.com/p/adblockforchrome/issues/detail?id=3701
this.width&&this.height?Un.call(this):(t=this,W.wait({until:function(){return t.width&&t.height},success:function(){Un.call(t)},error:function(){u?Galleria.raise("Could not extract width/height from image: "+t.src+". Traced measures: width:"+t.width+"px, height: "+t.height+"px."):($(new Image).load(f).attr("src",t.src),u=!0)},timeout:100}))});
// remove any previous images
// return the container
return d.find("iframe,img").remove(),
// append the image
p.css("display","block"),
// hide it for now
W.hide(this.image),
// remove any max/min scaling
$.each("minWidth minHeight maxWidth maxHeight".split(" "),function(t,e){p.css(e,/min/.test(e)?"0":"none")}),
// begin load and insert in cache when done
p.load(f).on("error",function(){var t,e;h?
// apply the dummy image if it exists
I?$(this).attr("src",I):Galleria.raise("Image not found: "+i):(h=!0,
// reload the image with a timestamp
window.setTimeout((t=$(this),e=i,function(){t.attr("src",e+(-1<e.indexOf("?")?"&":"?")+W.timestamp())}),50))}).attr("src",i),this.container},
/**
        Scales and crops the image

        @param {Object} options The method takes an object with a number of options:

        <ul>
            <li>width - width of the container</li>
            <li>height - height of the container</li>
            <li>min - minimum scale ratio</li>
            <li>max - maximum scale ratio</li>
            <li>margin - distance in pixels from the image border to the container</li>
            <li>complete - a callback that fires when scaling is complete</li>
            <li>position - positions the image, works like the css background-image property.</li>
            <li>crop - defines how to crop. Can be true, false, 'width' or 'height'</li>
            <li>canvas - set to true to try a canvas-based rescale</li>
        </ul>

        @returns The image container object (jQuery)
    */
scale:function(c){var h=this;
// extend some defaults
if(c=$.extend({width:0,height:0,min:undef,max:undef,margin:0,complete:m,position:"center",crop:!1,canvas:!1,iframelimit:undef},c),this.isIframe){var t,e,i=c.width,n=c.height;if(c.iframelimit){var a=A.min(c.iframelimit/i,c.iframelimit/n);a<1?(t=i*a,e=n*a,$(this.image).css({top:n/2-e/2,left:i/2-t/2,position:"absolute"})):$(this.image).css({top:0,left:0})}$(this.image).width(t||i).height(e||n).removeAttr("width").removeAttr("height"),$(this.container).width(i).height(n),c.complete.call(h,h);try{this.image.contentWindow&&$(this.image.contentWindow).trigger("resize")}catch(t){}return this.container}
// return the element if no image found
if(!this.image)return this.container;
// store locale variables
var u,d,p,o=$(h.container);
// wait for the width/height
return W.wait({until:function(){return u=c.width||o.width()||W.parseValue(o.css("width")),d=c.height||o.height()||W.parseValue(o.css("height")),u&&d},success:function(){
// calculate some cropping
var t=(u-2*c.margin)/h.original.width,e=(d-2*c.margin)/h.original.height,i=A.min(t,e),n=A.max(t,e),a={true:n,width:t,height:e,false:i,landscape:h.original.width>h.original.height?n:i,portrait:h.original.width<h.original.height?n:i}[c.crop.toString()],o="";
// allow maxScaleRatio
c.max&&(a=A.min(c.max,a)),
// allow minScaleRatio
c.min&&(a=A.max(c.min,a)),$.each(["width","height"],function(t,e){$(h.image)[e](h[e]=h.image[e]=A.round(h.original[e]*a))}),$(h.container).width(u).height(d),c.canvas&&R&&(R.elem.width=h.width,R.elem.height=h.height,o=h.image.src+":"+h.width+"x"+h.height,h.image.src=R.cache[o]||function(t){R.context.drawImage(h.image,0,0,h.original.width*a,h.original.height*a);try{return p=R.elem.toDataURL(),R.length+=p.length,R.cache[t]=p}catch(t){return h.image.src}}(o));function so(t,e,i){var n=0;if(/\%/.test(t)){var a=parseInt(t,10)/100,o=h.image[e]||$(h.image)[e]();n=A.ceil(-1*o*a+i*a)}else n=W.parseValue(t);return n}
// calculate image_position
var r={},s={},l={top:{top:0},left:{left:0},right:{left:"100%"},bottom:{top:"100%"}};$.each(c.position.toLowerCase().split(" "),function(t,e){"center"===e&&(e="50%"),r[t?"top":"left"]=e}),$.each(r,function(t,e){l.hasOwnProperty(e)&&$.extend(s,l[e])}),r=r.top?$.extend(r,s):s,r=$.extend({top:"50%",left:"50%"},r),
// apply position
$(h.image).css({position:"absolute",top:so(r.top,"height",d),left:so(r.left,"width",u)}),
// show the image
h.show(),
// flag ready and call the callback
h.ready=!0,c.complete.call(h,h)},error:function(){Galleria.raise("Could not scale image: "+h.image.src)},timeout:1e3}),this}},
// our own easings
$.extend($.easing,{galleria:function(t,e,i,n,a){return(e/=a/2)<1?n/2*e*e*e+i:n/2*((e-=2)*e*e+2)+i},galleriaIn:function(t,e,i,n,a){return n*(e/=a)*e+i},galleriaOut:function(t,e,i,n,a){return-n*(e/=a)*(e-2)+i}}),
// Forked version of Ainos Finger.js for native-style touch
Galleria.Finger=function(){A.abs;
// test for translate3d support
function $o(t,e){if(
// default options
this.config={start:0,duration:500,onchange:function(){},oncomplete:function(){},easing:function(t,e,i,n,a){return-n*((e=e/a-1)*e*e*e-1)+i;// easeOutQuart
}},this.easeout=function(t,e,i,n,a){return n*((e=e/a-1)*e*e*e*e+1)+i},t.children.length){var n=this;
// extend options
$.extend(this.config,e),this.elem=t,this.child=t.children[0],this.to=this.pos=0,this.touching=!1,this.start={},this.index=this.config.start,this.anim=0,this.easing=this.config.easing,i||(this.child.style.position="absolute",this.elem.style.position="relative"),
// Bind event handlers to context
$.each(["ontouchstart","ontouchmove","ontouchend","setup"],function(t,e){var i;n[e]=(i=n[e],function(){i.apply(n,arguments)})}),
// the physical animator
this.setX=function(){var t=n.child.style;i?t.MozTransform=t.webkitTransform="translate3d("+n.pos+"px,0,0)":
// this is actually faster than CSS3 translate
t.left=n.pos+"px"},
// bind events
$(t).on("touchstart",this.ontouchstart),$(window).on("resize",this.setup),$(window).on("orientationchange",this.setup),
// set up width
this.setup(),
// start the animations
function animloop(){a(animloop),n.loop.call(n)}()}}var t,i=Galleria.HAS3D=function(){var t,e,i=b.createElement("p"),n=["webkit","O","ms","Moz",""],a=0,o="transform";for(p().html.insertBefore(i,null);n[a];a++)e=n[a]?n[a]+"Transform":o,void 0!==i.style[e]&&(i.style[e]="translate3d(1px,1px,1px)",t=$(i).css(n[a]?"-"+n[a].toLowerCase()+"-"+o:o));return p().html.removeChild(i),void 0!==t&&0<t.length&&"none"!==t}(),a=(t="RequestAnimationFrame",window.requestAnimationFrame||window["webkit"+t]||window["moz"+t]||window["o"+t]||window["ms"+t]||function(t){window.setTimeout(t,1e3/60)});return $o.prototype={constructor:$o,setup:function(){this.width=$(this.elem).width(),this.length=A.ceil($(this.child).width()/this.width),0!==this.index&&(this.index=A.max(0,A.min(this.index,this.length-1)),this.pos=this.to=-this.width*this.index)},setPosition:function(t){this.pos=t,this.to=t},ontouchstart:function(t){var e=t.originalEvent.touches;this.start={pageX:e[0].pageX,pageY:e[0].pageY,time:+new Date},this.isScrolling=null,this.touching=!0,this.deltaX=0,T.on("touchmove",this.ontouchmove),T.on("touchend",this.ontouchend)},ontouchmove:function(t){var e=t.originalEvent.touches;
// ensure swiping with one touch and not pinching
e&&1<e.length||t.scale&&1!==t.scale||(this.deltaX=e[0].pageX-this.start.pageX,
// determine if scrolling test has run - one time test
null===this.isScrolling&&(this.isScrolling=!!(this.isScrolling||A.abs(this.deltaX)<A.abs(e[0].pageY-this.start.pageY))),
// if user is not trying to scroll vertically
this.isScrolling||(
// prevent native scrolling
t.preventDefault(),
// increase resistance if first or last slide
this.deltaX/=!this.index&&0<this.deltaX||this.index==this.length-1&&this.deltaX<0?A.abs(this.deltaX)/this.width+1.8:1,this.to=this.deltaX-this.index*this.width),t.stopPropagation())},ontouchend:function(t){this.touching=!1;
// determine if slide attempt triggers next/prev slide
var e=new Date-this.start.time<250&&40<A.abs(this.deltaX)||A.abs(this.deltaX)>this.width/2,i=!this.index&&0<this.deltaX||this.index==this.length-1&&this.deltaX<0;
// if not scrolling vertically
this.isScrolling||this.show(this.index+(e&&!i?this.deltaX<0?1:-1:0)),T.off("touchmove",this.ontouchmove),T.off("touchend",this.ontouchend)},show:function(t){t!=this.index?this.config.onchange.call(this,t):this.to=-t*this.width},moveTo:function(t){t!=this.index&&(this.pos=this.to=-t*this.width,this.index=t)},loop:function(){var t=this.to-this.pos,e=1;
// if distance is short or the user is touching, do a 1-1 animation
if(this.width&&t&&(e=A.max(.5,A.min(1.5,A.abs(t/this.width)))),this.touching||A.abs(t)<=1)this.pos=this.to,t=0,this.anim&&!this.touching&&this.config.oncomplete(this.index),this.anim=0,this.easing=this.config.easing;else{this.anim||(
// save animation parameters
this.anim={start:this.pos,time:+new Date,distance:t,factor:e,destination:this.to});
// check if to has changed or time has run out
var i=new Date-this.anim.time,n=this.config.duration*this.anim.factor;if(n<i||this.anim.destination!=this.to)return this.anim=0,void(this.easing=this.easeout);
// apply easing
this.pos=this.easing(null,i,this.anim.start,this.anim.distance,n)}this.setX()}},$o}(),
// the plugin initializer
$.fn.galleria=function(t){var e=this.selector;
// try domReady if element not found
return $(this).length?this.each(function(){
// destroy previous instance and prepare for new load
$.data(this,"galleria")&&($.data(this,"galleria").destroy(),$(this).find("*").hide()),
// load the new gallery
$.data(this,"galleria",(new Galleria).init(this,t))}):($(function(){$(e).length?
// if found on domReady, go ahead
$(e).galleria(t):
// if not, try fetching the element for 5 secs, then raise a warning.
Galleria.utils.wait({until:function(){return $(e).length},success:function(){$(e).galleria(t)},error:function(){Galleria.raise('Init failed: Galleria could not find the element "'+e+'".')},timeout:5e3})}),this)},
// export as AMD or CommonJS
"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=Galleria:(window.Galleria=Galleria,"function"==typeof define&&define.amd&&define("galleria",["jquery"],function(){return Galleria}))}(jQuery,this);
/**
 * Galleria Classicmod Theme
 * Copyright (c) 2013 Jan-Philip Gehrcke, http://gehrcke.de
 *
 * Bases on Galleria Classic Theme, Copyright (c) 2012 Aino, http://aino.se
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */
!function($){
/*global jQuery, Galleria */
Galleria.addTheme({name:"classicmod",author:"Jan-Philip Gehrcke, Galleria",css:"../css/galleria.classicmod.css",defaults:{transition:"fade",thumbCrop:"height",imageCrop:!1,
// set this to false if you want to show the caption all the time:
_toggleInfo:!0,slideshowInterval:1e3},init:function(e){Galleria.requires(1.28,"This version of Classic theme requires Galleria 1.2.8 or later");var t=this;// JPG edit
t.addElement("info-link","info-close"),t.append({info:["info-link","info-close"]}),
// Main modifications for classicmod theme by Jan-Philip Gehrcke.
t.addElement("navbar","navbarhelper","playbutton","fullscreenbutton"),t.append({container:"navbar",navbar:"navbarhelper",navbarhelper:["playbutton","thumbnails-container","fullscreenbutton"]}),t.prependChild("stage","info").appendChild("container","tooltip"),t.classicplay=function(){
// I've observed this to be required in certain situations (recheck)
t.setPlaytime(e.slideshowInterval),t.playToggle()},t.classicfullscreen=function(){t.toggleFullscreen(function(){
// Trigger carousel animation according to currently active
// image index. In case of fullscreen activation, this way the
// carousel makes use of the increased space.
t._carousel.set(t.getIndex())})},t.$("fullscreenbutton").click(function(e){e.preventDefault(),t.classicfullscreen()}),t.$("playbutton").click(function(e){e.preventDefault(),t.classicplay()}),t.bind("play",function(){this.$("playbutton").addClass("pause")}),t.bind("pause",function(){this.$("playbutton").removeClass("pause")}),t.bindTooltip({fullscreenbutton:function(){return t.isFullscreen()?"Exit fullscreen":"Enter fullscreen"},playbutton:function(){return t.isPlaying()?"Pause slideshow":"Start slideshow"}});
// The rest is mainly unchanged and taken from the classic theme.
// cache some stuff
var i=this.$("info-link,info-close,info-text"),n=Galleria.TOUCH,a=n?"touchstart":"click";
// show loader & counter with opacity
this.$("loader,counter").show().css("opacity",.4),
// some stuff for non-touch browsers
n||(this.addIdleState(this.get("image-nav-left"),{left:-50}),this.addIdleState(this.get("image-nav-right"),{right:-50}),this.addIdleState(this.get("counter"),{opacity:0})),
// toggle info
!0===e._toggleInfo?i.bind(a,function(){i.toggle()}):(i.show(),this.$("info-link, info-close").hide()),$(".galleria").mouseenter(function(){i.show()}),$(".galleria").mouseleave(function(){i.hide()}),
// bind some stuff
this.bind("thumbnail",function(e){n?$(e.thumbTarget).css("opacity",this.getIndex()?1:.6):(
// fade thumbnails
$(e.thumbTarget).css("opacity",.6).parent().hover(function(){$(this).not(".active").children().stop().fadeTo(100,1)},function(){$(this).not(".active").children().stop().fadeTo(400,.6)}),e.index===this.getIndex()&&$(e.thumbTarget).css("opacity",1))}),this.bind("loadstart",function(e){e.cached||this.$("loader").show().fadeTo(200,.4),this.$("info").toggle(this.hasInfo()),$(e.thumbTarget).css("opacity",1).parent().siblings().children().css("opacity",.6)}),this.bind("loadfinish",function(e){this.$("loader").fadeOut(200)})}})}(jQuery);
(function(){function d(t,e){return function(){return t.apply(e,arguments)}}var n,t,e,r=[].indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1};function Util(){}function WeakMap(){this.keys=[],this.values=[]}function MutationObserver(){console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}function WOW(t){null==t&&(t={}),this.scrollCallback=d(this.scrollCallback,this),this.scrollHandler=d(this.scrollHandler,this),this.start=d(this.start,this),this.scrolled=!0,this.config=this.util().extend(t,this.defaults),this.animationNameCache=new e}Util.prototype.extend=function(t,e){var i,n;for(i in t)null!=(n=t[i])&&(e[i]=n);return e},Util.prototype.isMobile=function(t){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)},t=Util,e=this.WeakMap||this.MozWeakMap||(WeakMap.prototype.get=function(t){var e,i,n,o;for(e=i=0,n=(o=this.keys).length;i<n;e=++i)if(o[e]===t)return this.values[e]},WeakMap.prototype.set=function(t,e){var i,n,o,s;for(i=n=0,o=(s=this.keys).length;n<o;i=++n)if(s[i]===t)return void(this.values[i]=e);return this.keys.push(t),this.values.push(e)},e=WeakMap),n=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(MutationObserver.notSupported=!0,MutationObserver.prototype.observe=function(){},n=MutationObserver),this.WOW=(WOW.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0},WOW.prototype.init=function(){var t;return this.element=window.document.documentElement,"interactive"===(t=document.readyState)||"complete"===t?this.start():document.addEventListener("DOMContentLoaded",this.start),this.finished=[]},WOW.prototype.start=function(){var o,t,e,i,r;if(this.stopped=!1,this.boxes=this.element.getElementsByClassName(this.config.boxClass),this.all=function(){var t,e,i,n;for(n=[],t=0,e=(i=this.boxes).length;t<e;t++)o=i[t],n.push(o);return n}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else{for(t=0,e=(i=this.boxes).length;t<e;t++)o=i[t],this.applyStyle(o,!0);window.addEventListener("scroll",this.scrollHandler,!1),window.addEventListener("resize",this.scrollHandler,!1),this.interval=setInterval(this.scrollCallback,50)}if(this.config.live)return new n((r=this,function(t){var o,s,e,i,n;for(n=[],e=0,i=t.length;e<i;e++)s=t[e],n.push(function(){var t,e,i,n;for(n=[],t=0,e=(i=s.addedNodes||[]).length;t<e;t++)o=i[t],n.push(this.doSync(o));return n}.call(r));return n})).observe(document.body,{childList:!0,subtree:!0})},WOW.prototype.stop=function(){if(this.stopped=!0,window.removeEventListener("scroll",this.scrollHandler,!1),window.removeEventListener("resize",this.scrollHandler,!1),null!=this.interval)return clearInterval(this.interval)},WOW.prototype.sync=function(t){if(n.notSupported)return this.doSync(this.element)},WOW.prototype.doSync=function(t){var e,i,n,o,s;try{if(!this.stopped){
//this.boxes=[];
for(o=(t=(t=t||this.element).parentNode||t).getElementsByClassName(this.config.boxClass),s=[],i=0,n=o.length;i<n;i++)(e=o[i])&&(r.call(this.all,e)<0?(this.applyStyle(e,!0),
// this.boxes.push(box);
this.all.push(e),s.push(this.scrolled=!0)):s.push(void 0));return s}}catch(t){}},WOW.prototype.show=function(t){return this.applyStyle(t),t.className=t.className+" "+this.config.animateClass},WOW.prototype.applyStyle=function(t,e){var i,n,o,s;return n=t.getAttribute("data-wow-duration"),i=t.getAttribute("data-wow-delay"),o=t.getAttribute("data-wow-iteration"),this.animate((s=this,function(){return s.customStyle(t,e,n,i,o)}))},WOW.prototype.animate="requestAnimationFrame"in window?function(t){return window.requestAnimationFrame(t)}:function(t){return t()},WOW.prototype.resetStyle=function(){var t,e,i,n,o;for(o=[],e=0,i=(n=this.boxes).length;e<i;e++)t=n[e],o.push(t.setAttribute("style","visibility: visible;"));return o},WOW.prototype.customStyle=function(t,e,i,n,o){return e&&this.cacheAnimationName(t),t.style.visibility=e?"hidden":"visible",i&&this.vendorSet(t.style,{animationDuration:i}),n&&this.vendorSet(t.style,{animationDelay:n}),o&&this.vendorSet(t.style,{animationIterationCount:o}),this.vendorSet(t.style,{animationName:e?"none":this.cachedAnimationName(t)}),t},WOW.prototype.vendors=["moz","webkit"],WOW.prototype.vendorSet=function(o,t){var s,r,a,e;for(s in e=[],t)r=t[s],o[""+s]=r,e.push(function(){var t,e,i,n;for(n=[],t=0,e=(i=this.vendors).length;t<e;t++)a=i[t],n.push(o[""+a+s.charAt(0).toUpperCase()+s.substr(1)]=r);return n}.call(this));return e},WOW.prototype.vendorCSS=function(t,e){var i,n,o,s,r,a;for(i=(n=window.getComputedStyle(t)).getPropertyCSSValue(e),s=0,r=(a=this.vendors).length;s<r;s++)o=a[s],i=i||n.getPropertyCSSValue("-"+o+"-"+e);return i},WOW.prototype.animationName=function(e){var i;try{i=this.vendorCSS(e,"animation-name").cssText}catch(t){i=window.getComputedStyle(e).getPropertyValue("animation-name")}return"none"===i?"":i},WOW.prototype.cacheAnimationName=function(t){return this.animationNameCache.set(t,this.animationName(t))},WOW.prototype.cachedAnimationName=function(t){return this.animationNameCache.get(t)},WOW.prototype.scrollHandler=function(){return this.scrolled=!0},WOW.prototype.scrollCallback=function(){var o;if(this.scrolled&&(this.scrolled=!1,this.boxes=function(){var t,e,i,n;for(n=[],t=0,e=(i=this.boxes).length;t<e;t++)(o=i[t])&&(this.config.showAllElements?this.show(o):this.isVisible(o)?this.show(o):n.push(o));return n}.call(this),!this.boxes.length&&!this.config.live))return this.stop()},WOW.prototype.offsetTop=function(t){for(var e;void 0===t.offsetTop;)t=t.parentNode;for(e=t.offsetTop;t=t.offsetParent;)e+=t.offsetTop;return e},WOW.prototype.isVisible=function(t){var e,i,n,o,s;return i=t.getAttribute("data-wow-offset")||this.config.offset,o=(s=window.pageYOffset)+this.element.clientHeight-i,e=(n=this.offsetTop(t))+t.clientHeight,n<=o&&s<=e},WOW.prototype.util=function(){return this._util||(this._util=new t)},WOW.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},WOW)}).call(this);
/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!function($,window,document){function OnePageNav(t,n){this.elem=t,this.$elem=$(t),this.options=n,this.metadata=this.$elem.data("plugin-options"),this.$win=$(window),this.sections={},this.didScroll=!1,this.$doc=$(document),this.docHeight=this.$doc.height()}OnePageNav.defaults=(
// the plugin prototype
OnePageNav.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){
// Introduce defaults that can be extended either
// globally or using an object literal.
this.config=$.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),
//Filter any links out of the nav
""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),
//Handle clicks on the nav
this.$nav.on("click.onePageNav",$.proxy(this.handleClick,this)),
//Get the section positions
this.getPositions(),
//Handle scroll changes
this.bindInterval(),
//Update the positions on resize too
this.$win.on("resize.onePageNav",$.proxy(this.getPositions,this));var t=window.location.hash;return""!=t&&(window.location.hash="#",console.log("url hash"+t),this.scrollTo(t,null)),this},adjustNav:function(t,n){t.$elem.find("."+t.config.currentClass).removeClass(t.config.currentClass),n.addClass(t.config.currentClass)},bindInterval:function(){var t,n=this;n.$win.on("scroll.onePageNav",function(){n.didScroll=!0}),n.t=setInterval(function(){t=n.$doc.height(),
//If it was scrolled
n.didScroll&&(n.didScroll=!1,n.scrollChange()),
//If the document height changes
t!==n.docHeight&&(n.docHeight=t,n.getPositions())},1e3)},getHash:function(t){return t.attr("href").split("#")[1]},getPositions:function(){var t,n,i,s=this;s.$nav.each(function(){t=s.getHash($(this)),(i=$("#"+t)).length&&(n=i.offset().top,console.log("position target id:"+i.attr("id")+" top="+n),s.sections[t]=Math.round(n))})},getSection:function(t){var n=null,i=Math.round(this.$win.height()*this.config.scrollThreshold);for(var s in this.sections)this.sections[s]-i<t&&(n=s);return n},handleClick:function(t){var n=this,i=$(t.currentTarget),s=i.parent(),e="#"+n.getHash(i);
//	if(!$parent.hasClass(self.config.currentClass)) {
//Start callback
n.config.begin&&n.config.begin(),
//Change the highlighted nav item
n.adjustNav(n,s),
//Removing the auto-adjust on scroll
n.unbindInterval(),
//Scroll to the correct position
n.scrollTo(e,function(){
//Do we need to change the hash?
n.config.changeHash&&(window.location.hash=e),
//Add the auto-adjust on scroll back in
n.bindInterval(),
//End callback
n.config.end&&n.config.end()}),
//	}
t.preventDefault()},scrollChange:function(){var t,n=this.$win.scrollTop(),i=this.getSection(n);
//If the position is set
null!==i&&(
//If it's not already the current section
(t=this.$elem.find('a[href$="#'+i+'"]').parent()).hasClass(this.config.currentClass)||(
//Change the highlighted nav item
this.adjustNav(this,t),
//If there is a scrollChange callback
this.config.scrollChange&&this.config.scrollChange(t)))},scrollTo:function(t,n){var i=this,s=$(t).offset().top;
//window.setTimeout(function(){
i.options.navBarHeight&&("fixed"==$(i.elem).css("position")?s-=i.options.navBarHeight:s-=2*i.options.navBarHeight),$("html, body").animate({scrollTop:s},i.config.scrollSpeed,i.config.easing,n)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}}).defaults,$.fn.onePageNav=function(t){return this.each(function(){new OnePageNav(this,t).init()})}}(jQuery,window,document);
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
window.Modernizr=function(t,d,o){function z(t){r.cssText=t}function B(t,e){return typeof t===e}function D(t,e){for(var i in t){var n=t[i];if(!~(""+n).indexOf("-")&&r[n]!==o)return"pfx"!=e||n}return!1}function F(t,e,i){var n=t.charAt(0).toUpperCase()+t.slice(1),s=(t+" "+h.join(n+" ")+n).split(" ");return B(e,"string")||B(e,"undefined")?D(s,e):function(t,e,i){for(var n in t){var s=e[t[n]];if(s!==o)return!1===i?t[n]:B(s,"function")?s.bind(i||e):s}return!1}(s=(t+" "+c.join(n+" ")+n).split(" "),e,i)}function T(t,e,i,n){var s,o,r,a,l=d.createElement("div"),h=d.body,c=h||d.createElement("body");if(parseInt(i,10))for(;i--;)(r=d.createElement("div")).id=n?n[i]:p+(i+1),l.appendChild(r);return s=["&#173;",'<style id="s',p,'">',t,"</style>"].join(""),l.id=p,(h?l:c).innerHTML+=s,c.appendChild(l),h||(c.style.background="",c.style.overflow="hidden",a=u.style.overflow,u.style.overflow="hidden",u.appendChild(c)),o=e(l,t),h?l.parentNode.removeChild(l):(c.parentNode.removeChild(c),u.style.overflow=a),!!o}var e,n,s={},u=d.documentElement,p="modernizr",i=d.createElement(p),r=i.style,a=" -webkit- -moz- -o- -ms- ".split(" "),l="Webkit Moz O ms",h=l.split(" "),c=l.toLowerCase().split(" "),f={},m=[],g=m.slice,v={}.hasOwnProperty;for(var y in n=B(v,"undefined")||B(v.call,"undefined")?function(t,e){return e in t&&B(t.constructor.prototype[e],"undefined")}:function(t,e){return v.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(i){var n=this;if("function"!=typeof n)throw new TypeError;var s=g.call(arguments,1),o=function(){if(this instanceof o){function Ka(){}Ka.prototype=n.prototype;var t=new Ka,e=n.apply(t,s.concat(g.call(arguments)));return Object(e)===e?e:t}return n.apply(i,s.concat(g.call(arguments)))};return o}),f.touch=function(){var e;return"ontouchstart"in t||t.DocumentTouch&&d instanceof DocumentTouch?e=!0:T(["@media (",a.join("touch-enabled),("),p,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(t){e=9===t.offsetTop}),e},f.csstransforms=function(){return!!F("transform")},f.csstransitions=function(){return F("transition")},f)n(f,y)&&(e=y.toLowerCase(),s[e]=f[y](),m.push((s[e]?"":"no-")+e));return s.addTest=function(t,e){if("object"==typeof t)for(var i in t)n(t,i)&&s.addTest(i,t[i]);else{if(t=t.toLowerCase(),s[t]!==o)return s;e="function"==typeof e?e():e,u.className+=" "+(e?"":"no-")+t,s[t]=e}return s},z(""),i=null,function(t,r){function l(){var t=u.elements;return"string"==typeof t?t.split(" "):t}function m(t){var e=d[t[h]];return e||(e={},c++,t[h]=c,d[c]=e),e}function n(t,e,i){return e=e||r,a?e.createElement(t):(n=(i=i||m(e)).cache[t]?i.cache[t].cloneNode():o.test(t)?(i.cache[t]=i.createElem(t)).cloneNode():i.createElem(t)).canHaveChildren&&!s.test(t)?i.frag.appendChild(n):n;var n}function q(t){var e=m(t=t||r);return!u.shivCSS||i||e.hasCSS||(e.hasCSS=!!function(t,e){var i=t.createElement("p"),n=t.getElementsByTagName("head")[0]||t.documentElement;return i.innerHTML="x<style>"+e+"</style>",n.insertBefore(i.lastChild,n.firstChild)}(t,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),a||function(e,i){i.cache||(i.cache={},i.createElem=e.createElement,i.createFrag=e.createDocumentFragment,i.frag=i.createFrag()),e.createElement=function(t){return u.shivMethods?n(t,e,i):i.createElem(t)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(t){return i.createElem(t),i.frag.createElement(t),'c("'+t+'")'})+");return n}")(u,i.frag)}(t,e),t}var i,a,e=t.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,o=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",c=0,d={};!function(){try{var t=r.createElement("a");t.innerHTML="<xyz></xyz>",i="hidden"in t,a=1==t.childNodes.length||function(){r.createElement("a");var t=r.createDocumentFragment();return void 0===t.cloneNode||void 0===t.createDocumentFragment||void 0===t.createElement}()}catch(t){a=i=!0}}();var u={elements:e.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==e.shivCSS,supportsUnknownElements:a,shivMethods:!1!==e.shivMethods,type:"default",shivDocument:q,createElement:n,createDocumentFragment:function(t,e){if(t=t||r,a)return t.createDocumentFragment();for(var i=(e=e||m(t)).frag.cloneNode(),n=0,s=l(),o=s.length;n<o;n++)i.createElement(s[n]);return i}};t.html5=u,q(r)}(this,d),s._version="2.6.2",s._prefixes=a,s._domPrefixes=c,s._cssomPrefixes=h,s.testProp=function(t){return D([t])},s.testAllProps=F,s.testStyles=T,s.prefixed=function(t,e,i){return e?F(t,e,i):F(t,"pfx")},u.className=u.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+" js "+m.join(" "),s}(this,this.document),function(t,u){function d(t){return"[object Function]"==s.call(t)}function e(t){return"string"==typeof t}function f(){}function g(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function h(){var t=y.shift();_=1,t?t.t?m(function(){("c"==t.t?p.injectCss:p.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),h()):_=0}function j(t,i,n,s,o){return _=0,i=i||"j",e(t)?function(i,n,t,e,s,o,r){function k(t){if(!l&&g(a.readyState)&&(d.r=l=1,_||h(),a.onload=a.onreadystatechange=null,t))for(var e in"img"!=i&&m(function(){T.removeChild(a)},50),x[n])x[n].hasOwnProperty(e)&&x[n][e].onload()}r=r||p.errorTimeout;var a=u.createElement(i),l=0,c=0,d={t:t,s:n,e:s,a:o,x:r};1===x[n]&&(c=1,x[n]=[]),"object"==i?a.data=n:(a.src=n,a.type=i),a.width=a.height="0",a.onerror=a.onload=a.onreadystatechange=function(){k.call(this,c)},y.splice(e,0,d),"img"!=i&&(c||2===x[n]?(T.insertBefore(a,w?null:v),m(k,r)):x[n].push(a))}("c"==i?a:r,t,i,this.i++,n,s,o):(y.splice(this.i++,0,t),1==y.length&&h()),this}function k(){var t=p;return t.loader={load:j,i:0},t}var i,p,n=u.documentElement,m=t.setTimeout,v=u.getElementsByTagName("script")[0],s={}.toString,y=[],_=0,o="MozAppearance"in n.style,w=o&&!!u.createRange().compareNode,T=w?n:v.parentNode,r=(n=t.opera&&"[object Opera]"==s.call(t.opera),n=!!u.attachEvent&&!n,o?"object":n?"script":"img"),a=n?"script":r,l=Array.isArray||function(t){return"[object Array]"==s.call(t)},b=[],x={},E={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}};(p=function(t){function g(t,e,i,n,s){var o=function(t){t=t.split("!");var e,i,n,s=b.length,o=t.pop(),r=t.length;for(o={url:o,origUrl:o,prefixes:t},i=0;i<r;i++)n=t[i].split("="),(e=E[n.shift()])&&(o=e(o,n));for(i=0;i<s;i++)o=b[i](o);return o}(t),r=o.autoCallback;o.url.split(".").pop().split("?").shift(),o.bypass||(e=e&&(d(e)?e:e[t]||e[n]||e[t.split("/").pop().split("?")[0]]),o.instead?o.instead(t,e,i,n,s):(x[o.url]?o.noexec=!0:x[o.url]=1,i.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":void 0,o.noexec,o.attrs,o.timeout),(d(e)||d(r))&&i.load(function(){k(),e&&e(o.origUrl,s,n),r&&r(o.origUrl,s,n),x[o.url]=2})))}function h(t,n){function c(i,t){if(i){if(e(i))t||(a=function(){var t=[].slice.call(arguments);l.apply(this,t),h()}),g(i,a,n,0,r);else if(Object(i)===i)for(o in s=function(){var t,e=0;for(t in i)i.hasOwnProperty(t)&&e++;return e}(),i)i.hasOwnProperty(o)&&(t||--s||(d(a)?a=function(){var t=[].slice.call(arguments);l.apply(this,t),h()}:a[o]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),h()}}(l[o])),g(i[o],a,n,o,r))}else t||h()}var s,o,r=!!t.test,i=t.load||t.both,a=t.callback||f,l=a,h=t.complete||f;c(r?t.yep:t.nope,!!i),i&&c(i)}var i,n,s=this.yepnope.loader;if(e(t))g(t,0,s,0);else if(l(t))for(i=0;i<t.length;i++)e(n=t[i])?g(n,0,s,0):l(n)?p(n):Object(n)===n&&h(n,s);else Object(t)===t&&h(t,s)}).addPrefix=function(t,e){E[t]=e},p.addFilter=function(t){b.push(t)},p.errorTimeout=1e4,null==u.readyState&&u.addEventListener&&(u.readyState="loading",u.addEventListener("DOMContentLoaded",i=function(){u.removeEventListener("DOMContentLoaded",i,0),u.readyState="complete"},0)),t.yepnope=k(),t.yepnope.executeStack=h,t.yepnope.injectJs=function(t,e,i,n,s,o){var r,a,l=u.createElement("script");n=n||p.errorTimeout;for(a in l.src=t,i)l.setAttribute(a,i[a]);e=o?h:e||f,l.onreadystatechange=l.onload=function(){!r&&g(l.readyState)&&(r=1,e(),l.onload=l.onreadystatechange=null)},m(function(){r||e(r=1)},n),s?l.onload():v.parentNode.insertBefore(l,v)},t.yepnope.injectCss=function(t,e,i,n,s,o){var r;n=u.createElement("link"),e=o?h:e||f;for(r in n.href=t,n.rel="stylesheet",n.type="text/css",i)n.setAttribute(r,i[r]);s||(v.parentNode.insertBefore(n,v),m(e,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function($,window){"use strict";
/*
	* debouncedresize: special jQuery event that happens once after a window resize
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/var s,o,r=$.event;s=r.special.debouncedresize={setup:function(){$(this).on("resize",s.handler)},teardown:function(){$(this).off("resize",s.handler)},handler:function(t,e){function Id(){
// set correct event type
t.type="debouncedresize",r.dispatch.apply(i,n)}
// Save the context
var i=this,n=arguments;o&&clearTimeout(o),e?Id():o=setTimeout(Id,s.threshold)},threshold:150};
// ======================= imagesLoaded Plugin ===============================
// https://github.com/desandro/imagesloaded
// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images
// callback function gets image collection as argument
//  this is the container
// original: mit license. paul irish. 2010.
// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou
// blank image data-uri bypasses webkit log warning (thx doug jones)
var c="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";$.fn.imagesLoaded=function(i){var n=this,s=$.isFunction($.Deferred)?$.Deferred():0,o=$.isFunction(s.notify),r=n.find("img").add(n.filter("img")),a=[],l=[],h=[];
// Register deferred callbacks
function doneLoading(){var t=$(l),e=$(h);s&&(h.length?s.reject(r,t,e):s.resolve(r)),$.isFunction(i)&&i.call(n,r,t,e)}function imgLoaded(t,e){
// don't proceed if BLANK image, or image is already loaded
t.src!==c&&-1===$.inArray(t,a)&&(
// store element in loaded images array
a.push(t),
// keep track of broken and properly loaded images
e?h.push(t):l.push(t),
// cache image and its state for future calls
$.data(t,"imagesLoaded",{isBroken:e,src:t.src}),
// trigger deferred progress method if present
o&&s.notifyWith($(t),[e,r,$(l),$(h)]),
// call doneLoading and clean listeners if all images are loaded
r.length===a.length&&(setTimeout(doneLoading),r.unbind(".imagesLoaded")))}
// if no images, trigger immediately
return $.isPlainObject(i)&&$.each(i,function(t,e){"callback"===t?i=e:s&&s[t](e)}),r.length?r.bind("load.imagesLoaded error.imagesLoaded",function(t){
// trigger imgLoaded
imgLoaded(t.target,"error"===t.type)}).each(function(t,e){var i=e.src,n=$.data(e,"imagesLoaded");
// find out if this image has been already checked for status
// if it was, and src has not changed, call imgLoaded on it
n&&n.src===i?imgLoaded(e,n.isBroken):
// if complete is true and browser supports natural sizes, try
// to check for image status manually
e.complete&&void 0!==e.naturalWidth?imgLoaded(e,0===e.naturalWidth||0===e.naturalHeight):
// cached images don't fire load sometimes, so we reset src, but only when
// dealing with IE, or image is complete (loaded) and failed manual check
// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
(e.readyState||e.complete)&&(e.src=c,e.src=i)}):doneLoading(),s?s.promise(n):n};
// global
var a=$(window),i=window.Modernizr;$.Elastislide=function(t,e){this.$el=$(e),this._init(t)},$.Elastislide.defaults={
// orientation 'horizontal' || 'vertical'
orientation:"horizontal",
// sliding speed
speed:500,autoplay:!0,
// sliding easing
easing:"ease-in-out",
// the minimum number of items to show. 
// when we resize the window, this will make sure minItems are always shown 
// (unless of course minItems is higher than the total number of elements)
minItems:3,
// index of the current item (left most item of the carousel)
start:0,
// click item callback
onClick:function(t,e,i){return!1},onReady:function(){return!1},onBeforeSlide:function(){return!1},onAfterSlide:function(){return!1}},$.Elastislide.prototype={_init:function(t){
// options
this.options=$.extend(!0,{},$.Elastislide.defaults,t);
// https://github.com/twitter/bootstrap/issues/2870
var e=this;if(this.transEndEventName={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"}[i.prefixed("transition")],
// suport for css transforms and css transitions
this.support=i.csstransitions&&i.csstransforms,
// current item's index
this.current=this.options.start,
// control if it's sliding
this.isSliding=!1,this.itemNo=0,this.$items=this.$el.children("li"),
// total number of items
this.itemsCount=this.$items.length,0===this.itemsCount)return!1;this._validate(),
// remove white space
this.$items.detach(),this.$el.empty(),this.$el.append(this.$items),
// main wrapper
this.$el.wrap('<div class="elastislide-wrapper elastislide-loading elastislide-'+this.options.orientation+'"></div>'),
// check if we applied a transition to the <ul>
this.hasTransition=!1,
// add transition for the <ul>
this.hasTransitionTimeout=setTimeout(function(){e._addTransition()},100),
// preload the images
this.$el.imagesLoaded(function(){e.$el.show(),e._layout(),e._configure(),e.hasTransition?(
// slide to current's position
e._removeTransition(),e._slideToItem(e.current),e.$el.on(e.transEndEventName,function(){e.$el.off(e.transEndEventName),e._setWrapperSize(),
// add transition for the <ul>
e._addTransition(),e._initEvents()})):(clearTimeout(e.hasTransitionTimeout),e._setWrapperSize(),e._initEvents(),
// slide to current's position
e._slideToItem(e.current),setTimeout(function(){e._addTransition()},25)),e.options.onReady()})},_validate:function(){this.options.speed<0&&(this.options.speed=500),(this.options.minItems<1||this.options.minItems>this.itemsCount)&&(this.options.minItems=1),(this.options.start<0||this.options.start>this.itemsCount-1)&&(this.options.start=0),"horizontal"!=this.options.orientation&&"vertical"!=this.options.orientation&&(this.options.orientation="horizontal")},_layout:function(){this.$el.wrap('<div class="elastislide-carousel"></div>'),this.$carousel=this.$el.parent(),this.$wrapper=this.$carousel.parent().removeClass("elastislide-loading");
// save original image sizes
var t=this.$items.find("img:first");this.imgSize={width:t.outerWidth(!0),height:t.outerHeight(!0)},this._setItemsSize(),"horizontal"===this.options.orientation?this.$el.css("max-height",this.imgSize.height):this.$el.css("height",this.options.minItems*this.imgSize.height),
// add the controls
this._addControls()},_addTransition:function(){this.support&&this.$el.css("transition","all "+this.options.speed+"ms "+this.options.easing),this.hasTransition=!0},_removeTransition:function(){this.support&&this.$el.css("transition","all 0s"),this.hasTransition=!1},_addControls:function(){var e=this;
// add navigation elements
this.$navigation=$('<nav><span class="elastislide-prev">Previous</span><span class="elastislide-next">Next</span></nav>').appendTo(this.$wrapper),this.$navPrev=this.$navigation.find("span.elastislide-prev").on("mousedown.elastislide",function(t){return e._slide("prev"),!1}),this.$navNext=this.$navigation.find("span.elastislide-next").on("mousedown.elastislide",function(t){return e._slide("next"),!1})},_setItemsSize:function(){
// width for the items (%)
var t="horizontal"===this.options.orientation?100*Math.floor(this.$carousel.width()/this.options.minItems)/this.$carousel.width():100;this.$items.css({width:t+"%","max-width":this.imgSize.width,"max-height":this.imgSize.height}),"vertical"===this.options.orientation&&this.$wrapper.css("max-width",this.imgSize.width+parseInt(this.$wrapper.css("padding-left"))+parseInt(this.$wrapper.css("padding-right")))},_setWrapperSize:function(){"vertical"===this.options.orientation&&this.$wrapper.css({height:this.options.minItems*this.imgSize.height+parseInt(this.$wrapper.css("padding-top"))+parseInt(this.$wrapper.css("padding-bottom"))})},_configure:function(){
// check how many items fit in the carousel (visible area -> this.$carousel.width() )
this.fitCount="horizontal"===this.options.orientation?this.$carousel.width()<this.options.minItems*this.imgSize.width?this.options.minItems:Math.floor(this.$carousel.width()/this.imgSize.width):this.$carousel.height()<this.options.minItems*this.imgSize.height?this.options.minItems:Math.floor(this.$carousel.height()/this.imgSize.height)},_initEvents:function(){var i=this;if(1==this.options.autoplay){var e=0,n=0,s=("horizontal"===this.options.orientation?this.$items.outerWidth(!0):this.$items.outerHeight(!0),this._calculateItemsTotalSpace()),o="horizontal"===this.options.orientation?this.$carousel.width():this.$carousel.height();
//slide auto
window.setInterval(function(){
//test if we should go to next slide or return to first slide
if(e+o<s){
//go to next slide
i._slide("next");
//update translation cusotmized move by 1/4
for(var t=0;t<i.$items.length;t++)if(t==n){e+=$(i.$items[t]).outerWidth(),n+=1,i.itemNo=n;break}
//						translation += visibleSpace/4;
}else
//return to first slide
i._slideTo(0),n=0,i.itemNo=0,
//set translation to 0
e=0},3e3)}a.on("debouncedresize.elastislide",function(){i._setItemsSize(),i._configure(),i._slideToItem(i.current)}),this.$el.on(this.transEndEventName,function(){i._onEndTransition()}),"horizontal"===this.options.orientation?this.$el.on({swipeleft:function(){i._slide("next")},swiperight:function(){i._slide("prev")}}):this.$el.on({swipeup:function(){i._slide("next")},swipedown:function(){i._slide("prev")}}),
// item click event
this.$el.on("click.elastislide","li",function(t){var e=$(this);i.options.onClick(e,e.index(),t)})},_destroy:function(t){this.$el.off(this.transEndEventName).off("swipeleft swiperight swipeup swipedown .elastislide"),a.off(".elastislide"),this.$el.css({"max-height":"none",transition:"none"}).unwrap(this.$carousel).unwrap(this.$wrapper),this.$items.css({width:"auto","max-width":"none","max-height":"none"}),this.$navigation.remove(),this.$wrapper.remove(),t&&t.call()},_toggleControls:function(t,e){e?"next"===t?this.$navNext.show():this.$navPrev.show():"next"===t?this.$navNext.hide():this.$navPrev.hide()},_calculateItemsTotalSpace:function(){var i=0;return $.each(this.$items,function(t,e){i+=$(e).outerWidth()}),i},_slide:function(t,e){if(this.isSliding)return!1;this.options.onBeforeSlide(),this.isSliding=!0;var i=this,n=this.translation||0,
// width/height of an item ( <li> )
s="horizontal"===this.options.orientation?this.$items.outerWidth(!0):this.$items.outerHeight(!0),
// total width/height of the <ul>
//totalSpace = this.itemsCount * itemSpace,
o=this._calculateItemsTotalSpace(),
// visible width/height
r="horizontal"===this.options.orientation?this.$carousel.width():this.$carousel.height();if(void 0===e){for(var a=this.fitCount*s/4,l=0;l<i.$items.length;l++)if(l==i.itemNo){a=$(i.$items[l]).outerWidth();break}if(a<0)return!1;if("next"===t&&o-Math.abs(n)<r)
//amount = totalSpace - ( Math.abs( translation ) + visibleSpace );
//customized by viamagus move only 1/4 of visiblespace 
a=o-(Math.abs(n)+r/4),
// show / hide navigation buttons
this._toggleControls("next",!1),this._toggleControls("prev",!0);else if("prev"===t&&Math.abs(n)-a<0)a=Math.abs(n),
// show / hide navigation buttons
this._toggleControls("next",!0),this._toggleControls("prev",!1);else{
// future translation value
var h="next"===t?Math.abs(n)+Math.abs(a):Math.abs(n)-Math.abs(a);
// show / hide navigation buttons
0<h?this._toggleControls("prev",!0):this._toggleControls("prev",!1),h<o-r?this._toggleControls("next",!0):this._toggleControls("next",!1)}e="next"===t?n-a:n+a}else{a=Math.abs(e);Math.max(o,r)-a<r&&(e=-(Math.max(o,r)-r)),
// show / hide navigation buttons
0<a?this._toggleControls("prev",!0):this._toggleControls("prev",!1),Math.max(o,r)-r>a?this._toggleControls("next",!0):this._toggleControls("next",!1)}if(n===(this.translation=e))return i.itemNo=0,this._onEndTransition(),!1;if(this.support)"horizontal"===this.options.orientation?this.$el.css("transform","translateX("+e+"px)"):this.$el.css("transform","translateY("+e+"px)");else{$.fn.applyStyle=this.hasTransition?$.fn.animate:$.fn.css;var c="horizontal"===this.options.orientation?{left:e}:{top:e};this.$el.stop().applyStyle(c,$.extend(!0,[],{duration:this.options.speed,complete:function(){i._onEndTransition()}}))}this.hasTransition||this._onEndTransition()},_onEndTransition:function(){this.isSliding=!1,this.options.onAfterSlide()},_slideTo:function(t){t=t||this.current;for(var e=Math.abs(this.translation)||0,i="horizontal"===this.options.orientation?this.$items.outerWidth(!0):this.$items.outerHeight(!0),n=e+this.$carousel.width(),s=Math.abs(t*i),o=0;o<this.$items.length;o++)if(o==this.itemNo){s=$(this.$items[o]).outerWidth();break}(n<s+i||s<e)&&this._slideToItem(t)},_slideToItem:function(t){
// how much to slide?
var e="horizontal"===this.options.orientation?t*this.$items.outerWidth(!0):t*this.$items.outerHeight(!0);this._slide("",-e)},
// public method: adds new items to the carousel
/*
		
		how to use:
		var carouselEl = $( '#carousel' ),
			carousel = carouselEl.elastislide();
		...
		
		// append or prepend new items:
		carouselEl.prepend('<li><a href="#"><img src="images/large/2.jpg" alt="image02" /></a></li>');

		// call the add method:
		es.add();
		
		*/
add:function(t){var e=this,i=this.current,n=this.$items.eq(this.current);
// adds new items to the carousel
this.$items=this.$el.children("li"),this.itemsCount=this.$items.length,this.current=n.index(),this._setItemsSize(),this._configure(),this._removeTransition(),i<this.current?this._slideToItem(this.current):this._slide("next",this.translation),setTimeout(function(){e._addTransition()},25),t&&t.call()},
// public method: sets a new element as the current. slides to that position
setCurrent:function(t,e){this.current=t,this._slideTo(),e&&e.call()},
// public method: slides to the next set of items
next:function(){self._slide("next")},
// public method: slides to the previous set of items
previous:function(){self._slide("prev")},
// public method: slides to the first item
slideStart:function(){this._slideTo(0)},
// public method: slides to the last item
slideEnd:function(){this._slideTo(this.itemsCount-1)},
// public method: destroys the elastislide instance
destroy:function(t){this._destroy(t)}};function Dd(t){window.console&&window.console.error(t)}$.fn.elastislide=function(t){var e=$.data(this,"elastislide");if("string"==typeof t){var i=Array.prototype.slice.call(arguments,1);this.each(function(){e?$.isFunction(e[t])&&"_"!==t.charAt(0)?e[t].apply(e,i):Dd("no such method '"+t+"' for elastislide self"):Dd("cannot call methods on elastislide prior to initialization; attempted to call method '"+t+"'")})}else this.each(function(){e?e._init():e=$.data(this,"elastislide",new $.Elastislide(t,this))});return e}}(jQuery,window);
/*—————————————————————————————————————————————————————————————————————————————————————————————————
 — jquery.mb.components                                                                           —
 —                                                                                                —
 —  file: jquery.mb.YTPlayer.js                                                                   —
 —  last modified: 23/06/14 22.49                                                                 —
 —                                                                                                —
 —  Open lab srl, Firenze - Italy                                                                 —
 —                                                                                                —
 —  email:                                                                                        —
 —     matteo@open-lab.com                                                                        —
 —  site:                                                                                         —
 —     http://pupunzi.com                                                                         —
 —     http://open-lab.com                                                                        —
 —  blog:                                                                                         —
 —     http://pupunzi.open-lab.com                                                                —
 —  Q&A:                                                                                          —
 —     http://jquery.pupunzi.com                                                                  —
 —                                                                                                —
 —  Licences: MIT, GPL                                                                            —
 —     http://www.opensource.org/licenses/mit-license.php                                         —
 —     http://www.gnu.org/licenses/gpl.html                                                       —
 —                                                                                                —
 —  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);                                           —
 —————————————————————————————————————————————————————————————————————————————————————————————————*/
var ytp=ytp||{};function onYouTubePlayerAPIReady(){ytp.YTAPIReady||(ytp.YTAPIReady=!0,jQuery(document).trigger("YTAPIReady"))}!function(jQuery,ytp){
/*Browser detection patch*/
var nAgt=navigator.userAgent;if(!jQuery.browser){var nameOffset,verOffset,ix;if(jQuery.browser={},jQuery.browser.mozilla=!1,jQuery.browser.webkit=!1,jQuery.browser.opera=!1,jQuery.browser.safari=!1,jQuery.browser.chrome=!1,jQuery.browser.msie=!1,jQuery.browser.ua=nAgt,jQuery.browser.name=navigator.appName,jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10),-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10),isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10)),jQuery.browser.version=jQuery.browser.majorVersion}jQuery.browser.android=/Android/i.test(nAgt),jQuery.browser.blackberry=/BlackBerry/i.test(nAgt),jQuery.browser.ios=/iPhone|iPad|iPod/i.test(nAgt),jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt),jQuery.browser.windowsMobile=/IEMobile/i.test(nAgt),jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile,ytp.isDevice=jQuery.browser.mobile,
/*******************************************************************************
	 * jQuery.mb.components: jquery.mb.CSSAnimate
	 ******************************************************************************/
jQuery.fn.CSSAnimate=function(y,u,p,d,c){function f(e,r){return"string"!=typeof e||e.match(/^[\-0-9\.]+$/)?""+e+r:e}var e;return jQuery.support.CSStransition=void 0!==(e=(document.body||document.documentElement).style).transition||void 0!==e.WebkitTransition||void 0!==e.MozTransition||void 0!==e.MsTransition||void 0!==e.OTransition,this.each(function(){var e=this,r=jQuery(this);e.id=e.id||"CSSA_"+(new Date).getTime();var a=a||{type:"noEvent"};if(e.CSSAIsRunning&&e.eventType==a.type)e.CSSqueue=function(){r.CSSAnimate(y,u,p,d,c)};else if(e.CSSqueue=null,e.eventType=a.type,0!==r.length&&y){if(e.CSSAIsRunning=!0,"function"==typeof u&&(c=u,u=jQuery.fx.speeds._default),"function"==typeof p&&(c=p,p=0),"function"==typeof d&&(c=d,d="cubic-bezier(0.65,0.03,0.36,0.72)"),"string"==typeof u)for(var o in jQuery.fx.speeds){if(u==o){u=jQuery.fx.speeds[o];break}u=jQuery.fx.speeds._default}if(u=u||jQuery.fx.speeds._default,jQuery.support.CSStransition){(a={default:"ease",in:"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"})[d]&&(d=a[d]);var i="",n="transitionEnd";for(l in jQuery.browser.webkit?(i="-webkit-",n="webkitTransitionEnd"):jQuery.browser.mozilla?(i="-moz-",n="transitionend"):jQuery.browser.opera?(i="-o-",n="otransitionend"):jQuery.browser.msie&&(i="-ms-",n="msTransitionEnd"),a=[],y)"transform"===(o=l)&&(y[o=i+"transform"]=y[l],delete y[l]),"filter"===o&&(y[o=i+"filter"]=y[l],delete y[l]),"transform-origin"!==o&&"origin"!==o||(y[o=i+"transform-origin"]=y[l],delete y[l]),"x"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" translateX("+f(y[l],"px")+")",delete y[l]),"y"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" translateY("+f(y[l],"px")+")",delete y[l]),"z"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" translateZ("+f(y[l],"px")+")",delete y[l]),"rotate"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" rotate("+f(y[l],"deg")+")",delete y[l]),"rotateX"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" rotateX("+f(y[l],"deg")+")",delete y[l]),"rotateY"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" rotateY("+f(y[l],"deg")+")",delete y[l]),"rotateZ"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" rotateZ("+f(y[l],"deg")+")",delete y[l]),"scale"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" scale("+f(y[l],"")+")",delete y[l]),"scaleX"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" scaleX("+f(y[l],"")+")",delete y[l]),"scaleY"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" scaleY("+f(y[l],"")+")",delete y[l]),"scaleZ"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" scaleZ("+f(y[l],"")+")",delete y[l]),"skew"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" skew("+f(y[l],"deg")+")",delete y[l]),"skewX"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" skewX("+f(y[l],"deg")+")",delete y[l]),"skewY"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" skewY("+f(y[l],"deg")+")",delete y[l]),"perspective"===o&&(y[o=i+"transform"]=y[o]||"",y[o]+=" perspective("+f(y[l],"px")+")",delete y[l]),a.indexOf(o)<0&&a.push(o.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()}));function t(){r.off(n+"."+e.id),clearTimeout(e.timeout),r.css(i+"transition",""),"function"==typeof c&&c(r),e.called=!0,e.CSSAIsRunning=!1,"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null)}var l=a.join(","),s={};$.extend(s,y),s[i+"transition-property"]=l,s[i+"transition-duration"]=u+"ms",s[i+"transition-delay"]=p+"ms",s[i+"transition-style"]="preserve-3d",s[i+"transition-timing-function"]=d,setTimeout(function(){r.one(n+"."+e.id,t),r.css(s)},1),e.timeout=setTimeout(function(){r.called||!c?(r.called=!1,e.CSSAIsRunning=!1):(r.css(i+"transition",""),c(r),e.CSSAIsRunning=!1,"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null))},u+p+100)}else{for(var l in y)"transform"===l&&delete y[l],"filter"===l&&delete y[l],"transform-origin"===l&&delete y[l],"auto"===y[l]&&delete y[l];c&&"string"!=typeof c||(c="linear"),r.animate(y,u,c)}}})};
/******************************************************************************/
var getYTPVideoID=function(e){return"http://youtu.be/"==e.substr(0,16)?e.replace("http://youtu.be/",""):-1<e.indexOf("http")?e.match(/[\\?&]v=([^&#]*)/)[1]:e};jQuery.mbYTPlayer={name:"jquery.mb.YTPlayer",version:"2.7.0",author:"Matteo Bicocchi",defaults:{containment:"body",ratio:"16/9",videoURL:null,startAt:0,stopAt:0,autoPlay:!0,vol:100,// 1 to 100
addRaster:!1,opacity:1,quality:"default",//or “small”, “medium”, “large”, “hd720”, “hd1080”, “highres”
mute:!1,loop:!0,showControls:!0,showAnnotations:!1,showYTLogo:!0,stopMovieOnClick:!1,realfullscreen:!0,gaTrack:!0,onReady:function(e){},onStateChange:function(e){},onPlaybackQualityChange:function(e){},onError:function(e){}},
/*@fontface icons*/
controls:{play:"P",pause:"p",mute:"M",unmute:"A",onlyYT:"O",showSite:"R",ytLogo:"Y"},rasterImg:"images/raster.png",rasterImgRetina:"images/raster@2x.png",locationProtocol:"https:",buildPlayer:function(options){return this.each(function(){var YTPlayer=this,$YTPlayer=jQuery(YTPlayer);YTPlayer.loop=0,YTPlayer.opt={},$YTPlayer.addClass("mb_YTVPlayer");var property=$YTPlayer.data("property")&&"string"==typeof $YTPlayer.data("property")?eval("("+$YTPlayer.data("property")+")"):$YTPlayer.data("property");void 0!==property.vol&&(property.vol=0==property.vol?property.vol=1:property.vol),jQuery.extend(YTPlayer.opt,jQuery.mbYTPlayer.defaults,options,property);var canGoFullscreen=!(jQuery.browser.msie||jQuery.browser.opera||self.location.href!=top.location.href);canGoFullscreen||(YTPlayer.opt.realfullscreen=!1),$YTPlayer.attr("id")||$YTPlayer.attr("id","YTP_"+(new Date).getTime()),YTPlayer.opt.id=YTPlayer.id,YTPlayer.isAlone=!1;var playerID="mbYTP_"+YTPlayer.id,videoID=this.opt.videoURL?getYTPVideoID(this.opt.videoURL):!!$YTPlayer.attr("href")&&getYTPVideoID($YTPlayer.attr("href"));YTPlayer.videoID=videoID,YTPlayer.opt.showAnnotations=YTPlayer.opt.showAnnotations?"0":"3";var playerVars={autoplay:0,modestbranding:1,controls:0,showinfo:0,rel:0,enablejsapi:1,version:3,playerapiid:playerID,origin:"*",allowfullscreen:!0,wmode:"transparent",iv_load_policy:YTPlayer.opt.showAnnotations},canPlayHTML5=!1,v=document.createElement("video");v.canPlayType&&(canPlayHTML5=!0),canPlayHTML5&&jQuery.extend(playerVars,{html5:1}),jQuery.browser.msie&&jQuery.browser.version<9&&(this.opt.opacity=1);var playerBox=jQuery("<div/>").attr("id",playerID).addClass("playerBox"),overlay=jQuery("<div/>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%"}).addClass("YTPOverlay");if(//YTPlayer.isBackground ? "fixed" :
YTPlayer.isSelf="self"==YTPlayer.opt.containment,YTPlayer.opt.containment="self"==YTPlayer.opt.containment?jQuery(this):jQuery(YTPlayer.opt.containment),YTPlayer.isBackground="body"==YTPlayer.opt.containment.get(0).tagName.toLowerCase(),!YTPlayer.isBackground||!ytp.backgroundIsInited)
//commented to enable video to play in mobiles 
if(YTPlayer.opt.containment.is(jQuery(this))?YTPlayer.isPlayer=!0:$YTPlayer.hide(),ytp.isDevice&&YTPlayer.isBackground)$YTPlayer.remove();else if(ytp.isDevice)$YTPlayer.remove();else{if(YTPlayer.opt.addRaster){var retina=window.retina||1<window.devicePixelRatio;overlay.addClass(retina?"raster retina":"raster")}else overlay.removeClass("raster retina");var wrapper=jQuery("<div/>").addClass("mbYTP_wrapper").attr("id","wrapper_"+playerID);if(wrapper.css({position:"absolute",zIndex:0,minWidth:"100%",minHeight:"100%",left:0,top:0,overflow:"hidden",opacity:0}),playerBox.css({position:"absolute",zIndex:0,width:"100%",height:"100%",top:0,left:0,overflow:"hidden",opacity:this.opt.opacity}),wrapper.append(playerBox),YTPlayer.opt.containment.children().not("script, style").each(function(){"static"==jQuery(this).css("position")&&jQuery(this).css("position","relative")}),YTPlayer.isBackground?(jQuery("body").css({position:"relative",minWidth:"100%",minHeight:"100%",zIndex:1,boxSizing:"border-box"}),wrapper.css({position:"fixed",top:0,left:0,zIndex:0,webkitTransform:"translateZ(0)"}),$YTPlayer.hide()):"static"==YTPlayer.opt.containment.css("position")&&YTPlayer.opt.containment.css({position:"relative"}),YTPlayer.opt.containment.prepend(wrapper),YTPlayer.wrapper=wrapper,playerBox.css({opacity:1}),
//commented to enable video play in  phones
//if (!ytp.isDevice) {
playerBox.after(overlay),YTPlayer.overlay=overlay,
//}
YTPlayer.isBackground||overlay.on("mouseenter",function(){$YTPlayer.find(".mb_YTVPBar").addClass("visible")}).on("mouseleave",function(){$YTPlayer.find(".mb_YTVPBar").removeClass("visible")}),ytp.YTAPIReady)setTimeout(function(){jQuery(document).trigger("YTAPIReady")},100);else{jQuery("#YTAPI").remove();var tag=jQuery("<script><\/script>").attr({src:jQuery.mbYTPlayer.locationProtocol+"//www.youtube.com/player_api?v="+jQuery.mbYTPlayer.version,id:"YTAPI"});jQuery("head").append(tag)}jQuery(document).on("YTAPIReady",function(){YTPlayer.isBackground&&ytp.backgroundIsInited||YTPlayer.isInit||(YTPlayer.isBackground&&YTPlayer.opt.stopMovieOnClick&&jQuery(document).off("mousedown.ytplayer").on("mousedown,.ytplayer",function(e){var r=jQuery(e.target);(r.is("a")||r.parents().is("a"))&&$YTPlayer.pauseYTP()}),YTPlayer.isBackground&&(ytp.backgroundIsInited=!0),YTPlayer.opt.autoPlay=void 0===YTPlayer.opt.autoPlay?!!YTPlayer.isBackground:YTPlayer.opt.autoPlay,YTPlayer.opt.vol=YTPlayer.opt.vol?YTPlayer.opt.vol:100,jQuery.mbYTPlayer.getDataFromFeed(YTPlayer.videoID,YTPlayer),jQuery(YTPlayer).on("YTPChanged",function(){YTPlayer.isInit||(YTPlayer.isInit=!0,
//commented to enable auto play video in mobiles
/*if (ytp.isDevice && !YTPlayer.isBackground) {
							new YT.Player(playerID, {
								videoId: YTPlayer.videoID.toString(),
								height : '100%',
								width  : '100%',
								videoId: YTPlayer.videoID,
								events : {
									'onReady'      : function (event) {
										YTPlayer.player = event.target;
										playerBox.css({opacity: 1});
										YTPlayer.wrapper.css({opacity: 1});
										$YTPlayer.optimizeDisplay();
									},
									'onStateChange': function () {}
								}
							});
							return;
						}*/
new YT.Player(playerID,{videoId:YTPlayer.videoID.toString(),playerVars:playerVars,events:{onReady:function(e){if(YTPlayer.player=e.target,!YTPlayer.isReady){YTPlayer.isReady=!0,YTPlayer.playerEl=YTPlayer.player.getIframe(),$YTPlayer.optimizeDisplay(),YTPlayer.videoID=videoID,jQuery(window).on("resize.YTP",function(){$YTPlayer.optimizeDisplay()}),YTPlayer.opt.showControls&&jQuery(YTPlayer).buildYTPControls();var r=YTPlayer.opt.startAt?YTPlayer.opt.startAt:1;YTPlayer.player.setVolume(0),jQuery(YTPlayer).muteYTPVolume(),jQuery.mbYTPlayer.checkForState(YTPlayer),YTPlayer.checkForStartAt=setInterval(function(){var e=YTPlayer.player.getVideoLoadedFraction()>r/YTPlayer.player.getDuration();YTPlayer.player.getCurrentTime()>=r&&0<YTPlayer.player.getDuration()&&e?(clearInterval(YTPlayer.checkForStartAt),YTPlayer.player.setVolume(0),jQuery(YTPlayer).muteYTPVolume(),"function"==typeof YTPlayer.opt.onReady&&YTPlayer.opt.onReady($YTPlayer),YTPlayer.opt.autoPlay?$YTPlayer.playYTP():YTPlayer.player.pauseVideo(),YTPlayer.opt.autoPlay?$YTPlayer.playYTP():YTPlayer.player.pauseVideo(),YTPlayer.opt.mute||jQuery(YTPlayer).unmuteYTPVolume(),$YTPlayer.css("background-image","none"),YTPlayer.wrapper.CSSAnimate({opacity:YTPlayer.isAlone?1:YTPlayer.opt.opacity},2e3),jQuery.mbYTPlayer.checkForState(YTPlayer)):(YTPlayer.player.playVideo(),YTPlayer.player.seekTo(r,!0))},100)}},onStateChange:function(event){
/*
									 -1 (unstarted)
									 0 (ended)
									 1 (playing)
									 2 (paused)
									 3 (buffering)
									 5 (video cued).
									 */
if("function"==typeof event.target.getPlayerState){var state=event.target.getPlayerState();"function"==typeof YTPlayer.opt.onStateChange&&YTPlayer.opt.onStateChange($YTPlayer,state);var controls=jQuery("#controlBar_"+YTPlayer.id),data=YTPlayer.opt;
//------------------------------------------------------------------ ended
if(0==state){if(YTPlayer.state==state)return;YTPlayer.state=state,YTPlayer.player.pauseVideo();var startAt=YTPlayer.opt.startAt?YTPlayer.opt.startAt:1;data.loop?(YTPlayer.wrapper.css({opacity:0}),$YTPlayer.playYTP(),YTPlayer.player.seekTo(startAt,!0)):YTPlayer.isBackground||(YTPlayer.player.seekTo(startAt,!0),$YTPlayer.playYTP(),setTimeout(function(){$YTPlayer.pauseYTP()},10)),!data.loop&&YTPlayer.isBackground?YTPlayer.wrapper.CSSAnimate({opacity:0},2e3):data.loop&&(YTPlayer.wrapper.css({opacity:0}),YTPlayer.loop++),controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play),jQuery(YTPlayer).trigger("YTPEnd")}
//------------------------------------------------------------------ buffering
if(3==state){if(YTPlayer.state==state)return;YTPlayer.state=state,YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality),controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play),jQuery(YTPlayer).trigger("YTPBuffering"),console.log("video buffering")}
//------------------------------------------------------------------ unstarted
if(-1==state){if(YTPlayer.state==state)return;YTPlayer.state=state,YTPlayer.wrapper.css({opacity:0}),jQuery(YTPlayer).trigger("YTPUnstarted")}
//------------------------------------------------------------------ playing
if(1==state){if(YTPlayer.state==state)return;YTPlayer.state=state,
/*

										 if (YTPlayer.opt.mute) {
										 $YTPlayer.muteYTPVolume();
										 YTPlayer.opt.mute = false;
										 }
										 */
/*console.log("video playing");*/
$("body").css("overflow","auto"),$(".loadMask-bg-div").removeClass("loadMask-bg-div"),$(".lds-ellipsis").removeClass("lds-ellipsis"),YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality),controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.pause),jQuery(YTPlayer).trigger("YTPStart"),"undefined"!=typeof _gaq&&eval(YTPlayer.opt.gaTrack)&&_gaq.push(["_trackEvent","YTPlayer","Play",YTPlayer.title||YTPlayer.videoID.toString()]),"undefined"!=typeof ga&&eval(YTPlayer.opt.gaTrack)&&ga("send","event","YTPlayer","play",YTPlayer.title||YTPlayer.videoID.toString())}
//------------------------------------------------------------------ paused
if(2==state){if(YTPlayer.state==state)return;YTPlayer.state=state,
/*console.log("video paused");*/
controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play),jQuery(YTPlayer).trigger("YTPPause")}}},onPlaybackQualityChange:function(e){"function"==typeof YTPlayer.opt.onPlaybackQualityChange&&YTPlayer.opt.onPlaybackQualityChange($YTPlayer)},onError:function(e){150==e.data&&(console.log("Embedding this video is restricted by Youtube."),YTPlayer.isPlayList&&jQuery(YTPlayer).playNext()),2==e.data&&YTPlayer.isPlayList&&jQuery(YTPlayer).playNext(),"function"==typeof YTPlayer.opt.onError&&YTPlayer.opt.onError($YTPlayer,e)}}}))}))})}})},getDataFromFeed:function(e,i){
//Get video info from FEEDS API
i.videoID=e,jQuery.browser.msie?("auto"==i.opt.ratio?i.opt.ratio="16/9":i.opt.ratio,i.hasData||(i.hasData=!0,setTimeout(function(){jQuery(i).trigger("YTPChanged")},100))):(//!(jQuery.browser.msie && jQuery.browser.version<9)
jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol+"//gdata.youtube.com/feeds/api/videos/"+e+"?v=2&alt=jsonc",function(e,r,t){i.dataReceived=!0;var a=e.data;if(i.title=a.title,i.videoData=a,"auto"==i.opt.ratio&&(a.aspectRatio&&"widescreen"===a.aspectRatio?i.opt.ratio="16/9":i.opt.ratio="4/3"),!i.hasData&&(i.hasData=!0,i.isPlayer)){var o=i.videoData.thumbnail.hqDefault;i.opt.containment.css({background:"rgba(0,0,0,0.5) url("+o+") center center",backgroundSize:"cover"})}jQuery(i).trigger("YTPChanged")}),setTimeout(function(){i.dataReceived||i.hasData||(i.hasData=!0,jQuery(i).trigger("YTPChanged"))},1500))},getVideoID:function(){return this.get(0).videoID||!1},setVideoQuality:function(e){this.get(0).player.setPlaybackQuality(e)},YTPlaylist:function(e,r,t){var a=this.get(0);a.isPlayList=!0,r&&(e=jQuery.shuffle(e)),a.videoID||(a.videos=e,a.videoCounter=0,a.videoLength=e.length,jQuery(a).data("property",e[0]),jQuery(a).mb_YTPlayer()),"function"==typeof t&&jQuery(a).on("YTPChanged",function(){t(a)}),jQuery(a).on("YTPEnd",function(){jQuery(a).playNext()})},playNext:function(){var e=this.get(0);e.videoCounter++,e.videoCounter>=e.videoLength&&(e.videoCounter=0),jQuery(e.playerEl).css({opacity:0}),jQuery(e).changeMovie(e.videos[e.videoCounter])},playPrev:function(){var e=this.get(0);e.videoCounter--,e.videoCounter<0&&(e.videoCounter=e.videoLength-1),jQuery(e.playerEl).css({opacity:0}),jQuery(e).changeMovie(e.videos[e.videoCounter])},changeMovie:function(e){var r=this.get(0);r.opt.startAt=0,r.opt.stopAt=0,r.opt.mute=!0,e&&jQuery.extend(r.opt,e),r.videoID=getYTPVideoID(r.opt.videoURL),jQuery(r).pauseYTP();var t=jQuery.browser.msie?1e3:0;if(jQuery(r.playerEl).CSSAnimate({opacity:0},t),setTimeout(function(){jQuery(r).getPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol+"//www.youtube.com/v/"+r.videoID),1,r.opt.quality),jQuery(r).playYTP(),jQuery(r).one("YTPStart",function(){r.wrapper.CSSAnimate({opacity:r.isAlone?1:r.opt.opacity},1e3),jQuery(r.playerEl).CSSAnimate({opacity:1},t),r.opt.startAt&&r.player.seekTo(r.opt.startAt),jQuery.mbYTPlayer.checkForState(r),r.opt.autoPlay||jQuery(r).pauseYTP()}),r.opt.mute?jQuery(r).muteYTPVolume():jQuery(r).unmuteYTPVolume()},t),r.opt.addRaster){var a=window.retina||1<window.devicePixelRatio;r.overlay.addClass(a?"raster retina":"raster")}else r.overlay.removeClass("raster"),r.overlay.removeClass("retina");jQuery("#controlBar_"+r.id).remove(),r.opt.showControls&&jQuery(r).buildYTPControls(),jQuery.mbYTPlayer.getDataFromFeed(r.videoID,r),jQuery(r).optimizeDisplay()},getPlayer:function(){return jQuery(this).get(0).player},playerDestroy:function(){var e=this.get(0);ytp.YTAPIReady=!1,ytp.backgroundIsInited=!1,e.isInit=!1,e.videoID=null,e.wrapper.remove(),jQuery("#controlBar_"+e.id).remove()},fullscreen:function(real){var YTPlayer=this.get(0);void 0===real&&(real=YTPlayer.opt.realfullscreen),real=eval(real);var controls=jQuery("#controlBar_"+YTPlayer.id),fullScreenBtn=controls.find(".mb_OnlyYT"),videoWrapper=YTPlayer.isSelf?YTPlayer.opt.containment:YTPlayer.wrapper;
//var videoWrapper = YTPlayer.wrapper;
if(real){var fullscreenchange=jQuery.browser.mozilla?"mozfullscreenchange":jQuery.browser.webkit?"webkitfullscreenchange":"fullscreenchange";jQuery(document).off(fullscreenchange).on(fullscreenchange,function(){RunPrefixMethod(document,"IsFullScreen")||RunPrefixMethod(document,"FullScreen")?(jQuery(YTPlayer).setVideoQuality("default"),jQuery(YTPlayer).trigger("YTPFullScreenStart")):(YTPlayer.isAlone=!1,fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT),jQuery(YTPlayer).setVideoQuality(YTPlayer.opt.quality),videoWrapper.removeClass("fullscreen"),videoWrapper.CSSAnimate({opacity:YTPlayer.opt.opacity},500),videoWrapper.css({zIndex:0}),YTPlayer.isBackground?jQuery("body").after(controls):YTPlayer.wrapper.before(controls),jQuery(window).resize(),jQuery(YTPlayer).trigger("YTPFullScreenEnd"))})}if(YTPlayer.isAlone)real?cancelFullscreen():(videoWrapper.CSSAnimate({opacity:YTPlayer.opt.opacity},500),videoWrapper.css({zIndex:0})),fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT),YTPlayer.isAlone=!1;else{if(real){var playerState=YTPlayer.player.getPlayerState();videoWrapper.css({opacity:0}),videoWrapper.addClass("fullscreen"),launchFullscreen(videoWrapper.get(0)),setTimeout(function(){videoWrapper.CSSAnimate({opacity:1},1e3),YTPlayer.wrapper.append(controls),jQuery(YTPlayer).optimizeDisplay(),YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime()+.1,!0)},500)}else videoWrapper.css({zIndex:1e4}).CSSAnimate({opacity:1},1e3);fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite),YTPlayer.isAlone=!0}function RunPrefixMethod(e,r){for(var t,a,o=["webkit","moz","ms","o",""],i=0;i<o.length&&!e[t];){if(t=r,""==o[i]&&(t=t.substr(0,1).toLowerCase()+t.substr(1)),"undefined"!=(a=typeof e[t=o[i]+t]))return o=[o[i]],"function"==a?e[t]():e[t];i++}}function launchFullscreen(e){RunPrefixMethod(e,"RequestFullScreen")}function cancelFullscreen(){(RunPrefixMethod(document,"FullScreen")||RunPrefixMethod(document,"IsFullScreen"))&&RunPrefixMethod(document,"CancelFullScreen")}},playYTP:function(){var e=this.get(0);void 0!==e.player&&(jQuery("#controlBar_"+e.id).find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.pause),e.player.playVideo(),e.wrapper.CSSAnimate({opacity:e.isAlone?1:e.opt.opacity},2e3),jQuery(e).on("YTPStart",function(){jQuery(e).css("background-image","none")}))},toggleLoops:function(){var e=this.get(0),r=e.opt;1==r.loop?r.loop=0:(r.startAt?e.player.seekTo(r.startAt):e.player.playVideo(),r.loop=1)},stopYTP:function(){var e=this.get(0);jQuery("#controlBar_"+e.id).find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play),e.player.stopVideo()},pauseYTP:function(){var e=this.get(0);e.opt;jQuery("#controlBar_"+e.id).find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play),e.player.pauseVideo()},seekToYTP:function(e){this.get(0).player.seekTo(e,!0)},setYTPVolume:function(e){var r=this.get(0);e||r.opt.vol||0!=r.player.getVolume()?!e&&0<r.player.getVolume()||e&&r.player.getVolume()==e?jQuery(r).muteYTPVolume():r.opt.vol=e:jQuery(r).unmuteYTPVolume(),r.player.setVolume(r.opt.vol)},muteYTPVolume:function(){var e=this.get(0);e.player.mute(),e.player.setVolume(0),jQuery("#controlBar_"+e.id).find(".mb_YTVPMuteUnmute").html(jQuery.mbYTPlayer.controls.unmute),jQuery(e).addClass("isMuted"),jQuery(e).trigger("YTPMuted")},unmuteYTPVolume:function(){var e=this.get(0);e.player.unMute(),e.player.setVolume(e.opt.vol),jQuery("#controlBar_"+e.id).find(".mb_YTVPMuteUnmute").html(jQuery.mbYTPlayer.controls.mute),jQuery(e).removeClass("isMuted"),jQuery(e).trigger("YTPUnmuted")},manageYTPProgress:function(){var e=this.get(0),r=jQuery("#controlBar_"+e.id),t=r.find(".mb_YTVPProgress"),a=r.find(".mb_YTVPLoaded"),o=r.find(".mb_YTVTime"),i=t.outerWidth(),n=Math.floor(e.player.getCurrentTime()),l=Math.floor(e.player.getDuration()),s=n*i/l,y=100*e.player.getVideoLoadedFraction();return a.css({left:0,width:y+"%"}),o.css({left:0,width:s}),{totalTime:l,currentTime:n}},buildYTPControls:function(){var YTPlayer=this.get(0),data=YTPlayer.opt;if(
/** @data.printUrl is deprecated; use data.showYTLogo */
data.showYTLogo=data.showYTLogo||data.printUrl,!jQuery("#controlBar_"+YTPlayer.id).length){var controlBar=jQuery("<span/>").attr("id","controlBar_"+YTPlayer.id).addClass("mb_YTVPBar").css({whiteSpace:"noWrap",position:YTPlayer.isBackground?"fixed":"absolute",zIndex:YTPlayer.isBackground?1e4:1e3}).hide(),buttonBar=jQuery("<div/>").addClass("buttonBar"),playpause=jQuery("<span>"+jQuery.mbYTPlayer.controls.play+"</span>").addClass("mb_YTVPPlaypause ytpicon").click(function(){1==YTPlayer.player.getPlayerState()?jQuery(YTPlayer).pauseYTP():jQuery(YTPlayer).playYTP()}),MuteUnmute=jQuery("<span>"+jQuery.mbYTPlayer.controls.mute+"</span>").addClass("mb_YTVPMuteUnmute ytpicon").click(function(){0==YTPlayer.player.getVolume()?jQuery(YTPlayer).unmuteYTPVolume():jQuery(YTPlayer).muteYTPVolume()}),idx=jQuery("<span/>").addClass("mb_YTVPTime"),vURL=data.videoURL;vURL.indexOf("http")<0&&(vURL=jQuery.mbYTPlayer.locationProtocol+"//www.youtube.com/watch?v="+data.videoURL);var movieUrl=jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTVPUrl ytpicon").attr("title","view on YouTube").on("click",function(){window.open(vURL,"viewOnYT")}),onlyVideo=jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click",function(){jQuery(YTPlayer).fullscreen(data.realfullscreen)}),progressBar=jQuery("<div/>").addClass("mb_YTVPProgress").css("position","absolute").click(function(e){timeBar.css({width:e.clientX-timeBar.offset().left}),YTPlayer.timeW=e.clientX-timeBar.offset().left,controlBar.find(".mb_YTVPLoaded").css({width:0});var r=Math.floor(YTPlayer.player.getDuration());YTPlayer.goto=timeBar.outerWidth()*r/progressBar.outerWidth(),YTPlayer.player.seekTo(parseFloat(YTPlayer.goto),!0),controlBar.find(".mb_YTVPLoaded").css({width:0})}),loadedBar=jQuery("<div/>").addClass("mb_YTVPLoaded").css("position","absolute"),timeBar=jQuery("<div/>").addClass("mb_YTVTime").css("position","absolute");progressBar.append(loadedBar).append(timeBar),buttonBar.append(playpause).append(MuteUnmute).append(idx),data.showYTLogo&&buttonBar.append(movieUrl),(YTPlayer.isBackground||eval(YTPlayer.opt.realfullscreen)&&!YTPlayer.isBackground)&&buttonBar.append(onlyVideo),controlBar.append(buttonBar).append(progressBar),YTPlayer.isBackground?jQuery("body").after(controlBar):(controlBar.addClass("inlinePlayer"),YTPlayer.wrapper.before(controlBar)),controlBar.fadeIn()}},checkForState:function(n){clearInterval(n.getState),n.getState=setInterval(function(){var e=jQuery(n).manageYTPProgress(),r=jQuery(n),t=jQuery("#controlBar_"+n.id),a=n.opt,o=n.opt.startAt?n.opt.startAt:1,i=n.opt.stopAt>n.opt.startAt?n.opt.stopAt:0;if(i=i<n.player.getDuration()?i:0,0==n.player.getVolume()?r.addClass("isMuted"):r.removeClass("isMuted"),e.totalTime?t.find(".mb_YTVPTime").html(jQuery.mbYTPlayer.formatTime(e.currentTime)+" / "+jQuery.mbYTPlayer.formatTime(e.totalTime)):
//					clearInterval(YTPlayer.getState);
t.find(".mb_YTVPTime").html("-- : -- / -- : --"),1==n.player.getPlayerState()&&(parseFloat(n.player.getDuration()-3)<n.player.getCurrentTime()||0<i&&parseFloat(n.player.getCurrentTime())>i)){if(n.isEnded)return;if(n.isEnded=!0,setTimeout(function(){n.isEnded=!1},2e3),n.isPlayList)return clearInterval(n.getState),void jQuery(n).trigger("YTPEnd");a.loop?n.player.seekTo(o,!0):(n.player.pauseVideo(),n.wrapper.CSSAnimate({opacity:0},1e3,function(){if(jQuery(n).trigger("YTPEnd"),n.player.seekTo(o,!0),!n.isBackground){var e=n.videoData.thumbnail.hqDefault;jQuery(n).css({background:"rgba(0,0,0,0.5) url("+e+") center center",backgroundSize:"cover"})}}))}},1)},formatTime:function(e){var r=Math.floor(e/60),t=Math.floor(e-60*r);return(r<=9?"0"+r:r)+" : "+(t<=9?"0"+t:t)}},jQuery.fn.toggleVolume=function(){var e=this.get(0);if(e)return e.player.isMuted()?(jQuery(e).unmuteYTPVolume(),!0):(jQuery(e).muteYTPVolume(),!1)},jQuery.fn.optimizeDisplay=function(){var e=this.get(0),r=e.opt,t=jQuery(e.playerEl),a={},o=e.wrapper;a.width=o.outerWidth(),a.height=o.outerHeight();var i={};i.width=a.width+24*a.width/100,i.height="16/9"==r.ratio?Math.ceil(9*a.width/16):Math.ceil(3*a.width/4),i.marginTop=-(i.height-a.height)/2,i.marginLeft=-12*a.width/100,i.height<a.height&&(i.height=a.height+24*a.height/100,i.width="16/9"==r.ratio?Math.floor(16*a.height/9):Math.floor(4*a.height/3),i.marginTop=-12*a.height/100,i.marginLeft=-(i.width-a.width)/2),i.width+=100,i.height+=100,i.marginTop-=50,i.marginLeft-=50,t.css({width:i.width,height:i.height,marginTop:i.marginTop,marginLeft:i.marginLeft})},jQuery.shuffle=function(e){for(var r=e.slice(),t=r.length,a=t;a--;){var o=parseInt(Math.random()*t),i=r[a];r[a]=r[o],r[o]=i}return r},
/*Exposed method for external use*/
jQuery.fn.mb_YTPlayer=jQuery.mbYTPlayer.buildPlayer,jQuery.fn.YTPlaylist=jQuery.mbYTPlayer.YTPlaylist,jQuery.fn.playNext=jQuery.mbYTPlayer.playNext,jQuery.fn.playPrev=jQuery.mbYTPlayer.playPrev,jQuery.fn.changeMovie=jQuery.mbYTPlayer.changeMovie,jQuery.fn.getVideoID=jQuery.mbYTPlayer.getVideoID,jQuery.fn.getPlayer=jQuery.mbYTPlayer.getPlayer,jQuery.fn.playerDestroy=jQuery.mbYTPlayer.playerDestroy,jQuery.fn.fullscreen=jQuery.mbYTPlayer.fullscreen,jQuery.fn.buildYTPControls=jQuery.mbYTPlayer.buildYTPControls,jQuery.fn.playYTP=jQuery.mbYTPlayer.playYTP,jQuery.fn.toggleLoops=jQuery.mbYTPlayer.toggleLoops,jQuery.fn.stopYTP=jQuery.mbYTPlayer.stopYTP,jQuery.fn.pauseYTP=jQuery.mbYTPlayer.pauseYTP,jQuery.fn.seekToYTP=jQuery.mbYTPlayer.seekToYTP,jQuery.fn.muteYTPVolume=jQuery.mbYTPlayer.muteYTPVolume,jQuery.fn.unmuteYTPVolume=jQuery.mbYTPlayer.unmuteYTPVolume,jQuery.fn.setYTPVolume=jQuery.mbYTPlayer.setYTPVolume,jQuery.fn.setVideoQuality=jQuery.mbYTPlayer.setVideoQuality,jQuery.fn.manageYTPProgress=jQuery.mbYTPlayer.manageYTPProgress}(jQuery,ytp);
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */
!function($,window,document){var i=$(window);$.fn.lazyload=function(e){var t,r=this,f={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};function update(){var t=0;r.each(function(){var e=$(this);if((!f.skip_invisible||e.is(":visible"))&&!$.abovethetop(this,f)&&!$.leftofbegin(this,f))if($.belowthefold(this,f)||$.rightoffold(this,f)){if(++t>f.failure_limit)return!1}else e.trigger("appear"),
/* if we found an image we'll load, reset the counter */
t=0})}return e&&(
/* Maintain BC for a couple of versions. */
void 0!==e.failurelimit&&(e.failure_limit=e.failurelimit,delete e.failurelimit),void 0!==e.effectspeed&&(e.effect_speed=e.effectspeed,delete e.effectspeed),$.extend(f,e))
/* Cache container as jQuery as object. */,t=void 0===f.container||f.container===window?i:$(f.container),
/* Fire one scroll event per scroll. Not one scroll event per image. */
0===f.event.indexOf("scroll")&&t.bind(f.event,function(){return update()}),this.each(function(){var o=this,n=$(o);o.loaded=!1,
/* If no src attribute given use data:uri. */
void 0!==n.attr("src")&&!1!==n.attr("src")||n.is("img")&&n.attr("src",f.placeholder)
/* When appear is triggered load original image. */,n.one("appear",function(){if(!this.loaded){if(f.appear){var e=r.length;f.appear.call(o,e,f)}$("<img />").bind("load",function(){var e=n.attr("data-"+f.data_attribute);n.hide(),n.is("img")?n.attr("src",e):n.css("background-image","url('"+e+"')"),n[f.effect](f.effect_speed),o.loaded=!0;
/* Remove image from array so it is not looped next time. */
var t=$.grep(r,function(e){return!e.loaded});if(r=$(t),f.load){var i=r.length;f.load.call(o,i,f)}}).attr("src",n.attr("data-"+f.data_attribute))}}),
/* When wanted event is triggered load original image */
/* by triggering appear.                              */
0!==f.event.indexOf("scroll")&&n.bind(f.event,function(){o.loaded||n.trigger("appear")})}),
/* Check if something appears when window is resized. */
i.bind("resize",function(){update()}),
/* With IOS5 force loading images when navigating with back button. */
/* Non optimal workaround. */
/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&i.bind("pageshow",function(e){e.originalEvent&&e.originalEvent.persisted&&r.each(function(){$(this).trigger("appear")})})
/* Force initial check if images should appear. */,$(document).ready(function(){update()}),this},
/* Convenience methods in jQuery namespace.           */
/* Use as  $.belowthefold(element, {threshold : 100, container : window}) */
$.belowthefold=function(e,t){return(void 0===t.container||t.container===window?(window.innerHeight?window.innerHeight:i.height())+i.scrollTop():$(t.container).offset().top+$(t.container).height())<=$(e).offset().top-t.threshold},$.rightoffold=function(e,t){return(void 0===t.container||t.container===window?i.width()+i.scrollLeft():$(t.container).offset().left+$(t.container).width())<=$(e).offset().left-t.threshold},$.abovethetop=function(e,t){return(void 0===t.container||t.container===window?i.scrollTop():$(t.container).offset().top)>=$(e).offset().top+t.threshold+$(e).height()},$.leftofbegin=function(e,t){return(void 0===t.container||t.container===window?i.scrollLeft():$(t.container).offset().left)>=$(e).offset().left+t.threshold+$(e).width()},$.inviewport=function(e,t){return!($.rightoffold(e,t)||$.leftofbegin(e,t)||$.belowthefold(e,t)||$.abovethetop(e,t))},
/* Custom selectors for your convenience.   */
/* Use as $("img:below-the-fold").something() or */
/* $("img").filter(":below-the-fold").something() which is faster */
$.extend($.expr[":"],{"below-the-fold":function(e){return $.belowthefold(e,{threshold:0})},"above-the-top":function(e){return!$.belowthefold(e,{threshold:0})},"right-of-screen":function(e){return $.rightoffold(e,{threshold:0})},"left-of-screen":function(e){return!$.rightoffold(e,{threshold:0})},"in-viewport":function(e){return $.inviewport(e,{threshold:0})},
/* Maintain BC for couple of versions. */
"above-the-fold":function(e){return!$.belowthefold(e,{threshold:0})},"right-of-fold":function(e){return $.rightoffold(e,{threshold:0})},"left-of-fold":function(e){return!$.rightoffold(e,{threshold:0})}})}(jQuery,window,document);

function viamagusLoader (el, options) {
	// Becomes this.options
	var defaults = {
		bgColor 		: '#fff',
		duration		: 800,
		opacity			: 0.7,
		classOveride 	: false
	}
	this.options 	= jQuery.extend(defaults, options);
	this.container 	= $(el);
	
	this.init = function() {
		var container = this.container;
		// Delete any other loaders
		this.remove(); 
		// Create the overlay 
		var overlay = $('<div></div>').css({
				'background-color': this.options.bgColor,
				'opacity':this.options.opacity,
				'width':container.width(),
				'height':container.height(),
				'position':'fixed',
				'top':'0px',
				'left':'0px',
				'z-index':99999
		}).addClass('viamagus_overlay');
		// add an overiding class name to set new loader style 
		if (this.options.classOveride) {
			overlay.addClass(this.options.classOveride);
		}
		// insert overlay and loader into DOM 
		container.append(
			overlay.append(
				$('<div></div>').addClass('viamagus_loader')
			).fadeIn(this.options.duration)
		);
    };
	
	this.remove = function(){
		var overlay = this.container.children(".viamagus_overlay");
		if (overlay.length) {
			overlay.fadeOut(this.options.classOveride, function() {
				overlay.remove();
			});
		}	
	}

    this.init();
}	
	
function viamagusTransactionManager(options) {
	// Becomes this.options
	var defaults = {
		url : '',
		type : 'POST',
		data : null,
		viamagusLoader : null,
		callback : null,
		response : null,
		successMsg : null,
		errorCallBack:null,
		primaryKey:null,
        showSuccessMsg:true
	};

	this.options = jQuery.extend(defaults, options);

	this.startTransaction = function() {
		var that = this;
		// alert(this.options.url);
		if (!options.async) {
			this.options.viamagusloader = new viamagusLoader('body');
		}
		$.ajax({
			url : this.options.url,
			type : this.options.type,
			data : this.options.data,
			dataType : 'jsonp',
			jsonp : 'jsonCallback'
		}).done(
				function(data) {
					that.response = data;
					that.checkTransactionStatus(data.result.transactionRefNo,
							false, that)
		}).fail(function(data) {
               that.response = data;
               that.options.transactionStatus = false;
               that.endTransaction();
        });
	};
	this.checkTransactionStatus = function(transactionRefNo,
			isTransactionComplete, self) {
		// var that = this;
		// alert(transactionRefNo);
		if (!isTransactionComplete) {
			$
					.ajax({
						url : '/REST/general/checkTransactionStatus',
						type : 'POST',
						data : {
							format : 'json',
							transactionRefNo : transactionRefNo

						},
						dataType : 'jsonp',
						jsonp : 'jsonCallback'
					})
					.done(
							function(data) {
						          if ($('#alert-message').length) {
										$('#alert-message').remove();
									}
								// alert(data.result.transactionStatus);
								if (data.result.transactionStatus == "Failed") {
									self.options.transactionStatus = false;
									
									var failedHtml = '<div id ="alert-message" class="alert alert-danger"';
									failedHtml = failedHtml
											+ 'style="position:fixed;top:5%;text-align:center;padding:5px;';
									failedHtml = failedHtml
											+ 'margin-left:25%;width:50%;z-index: 9999">';
									failedHtml = failedHtml
											+ 'Transaction was not successufull. Please Contact Support.!';
									failedHtml = failedHtml + '</div>';
									$('body').append(failedHtml);
									var error = data.result.errors.toString().replace('s:','');
									var errorMessage = "";
									$('#alert-message').html(error);
									failedHtml = '<a href="#" class="close" data-dismiss="alert">';
									failedHtml = failedHtml + ' &times; </a>';
									$('#alert-message').append(failedHtml)

									isTransactionComplete = true;
									setTimeout(self.checkTransactionStatus,
											1000, transactionRefNo,
											isTransactionComplete, self);
									//setTimeout(function(){$('#alert-message').remove();},5000);

								}
								if (data.result.transactionStatus == "Success") {
									isTransactionComplete = true;

									if (self.options.successMsg != null) {
										var successHtml = '<div id ="alert-message" class="alert alert-success"';
										successHtml = successHtml
												+ 'style="position:fixed;top:5%;text-align:center;padding:5px;';
										successHtml = successHtml
												+ 'margin-left:25%;width:50%;z-index: 9999">';
										successHtml = successHtml
												+ self.options.successMsg;
										successHtml = successHtml + '</div>';
										
										successHtml = '<a href="#" class="close" data-dismiss="alert">';
										successHtml = successHtml
												+ ' &times; </a>';
										if(self.options.showSuccessMsg){
										  $('body').append(successHtml);
										  $('#alert-message').append(successHtml);
										}
										setTimeout(function(){$('#alert-message').remove();},5000);

									}

									self.options.transactionStatus = true;
									self.options.primaryKey=data.result.operationIdentifier;
									setTimeout(self.checkTransactionStatus,
											1000, transactionRefNo,
											isTransactionComplete, self);

								} else {
									setTimeout(self.checkTransactionStatus,
											1000, transactionRefNo,
											isTransactionComplete, self);

								}

							}).fail(function() {
				               self.options.transactionStatus = false;
				               self.endTransaction();
				            });
		} else {
			self.endTransaction();
		}
	};

	this.endTransaction = function() {
		if (this.options.viamagusloader) {
			this.options.viamagusloader.remove();
		}
		if (this.options.callback) {
            if (this.options.transactionStatus) {
                this.options.callback(this.response,this.options.primaryKey);
            }
        }
        if (this.options.errorCallBack && this.options.viamagusloader) {
            if (!this.options.transactionStatus) {
                this.options.errorCallBack(this.response);
            }
        }
	};

	this.startTransaction();
}

/**
 * @package		PickMeUp - jQuery datepicker plugin
 * @author		Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @author		Stefan Petre <www.eyecon.ro>
 * @copyright	Copyright (c) 2013-2014, Nazar Mokrynskyi
 * @copyright	Copyright (c) 2008-2009, Stefan Petre
 * @license		MIT License, see license.txt
 */
!function(d){function getMaxDays(){for(var e=new Date(this.toString()),d=28,a=e.getMonth();e.getMonth()==a;)++d,e.setDate(d);return d-1}d.addDays=function(e){this.setDate(this.getDate()+e)},d.addMonths=function(e){var a=this.getDate();this.setDate(1),this.setMonth(this.getMonth()+e),this.setDate(Math.min(a,getMaxDays.apply(this)))},d.addYears=function(e){var a=this.getDate();this.setDate(1),this.setFullYear(this.getFullYear()+e),this.setDate(Math.min(a,getMaxDays.apply(this)))},d.getDayOfYear=function(){var e=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0)-new Date(this.getFullYear(),0,0,0,0,0);return Math.floor(e/24*60*60*1e3)}}(Date.prototype),function($){$.pickmeup=$.extend($.pickmeup||{},{date:new Date,flat:!1,first_day:1,prev:"&#9664;",next:"&#9654;",mode:"single",view:"days",calendars:1,format:"d-m-Y",position:"bottom",trigger_event:"click",class_name:"",separator:" - ",hide_on_select:!1,min:null,max:null,render:function(){},change:function(){return!0},before_show:function(){return!0},show:function(){return!0},hide:function(){return!0},locale:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}});var o={years:"pmu-view-years",months:"pmu-view-months",days:"pmu-view-days"},u='<div class="pickmeup" />',l=function(d){for(var e="",a=0;a<7;++a)e+="<div>"+d.day[a]+"</div>";return'<div class="pmu-instance"><nav><div class="pmu-prev pmu-button">'+d.prev+'</div><div class="pmu-month pmu-button" /><div class="pmu-next pmu-button">'+d.next+'</div></nav><nav class="pmu-day-of-week">'+e+"</nav></div>"},y=function(e){for(var a="",t=0;t<42;++t)a+='<div class="'+e[t].class_name+' pmu-button">'+e[t].text+"</div>";return'<div class="pmu-days">'+a+"</div>"},b=function(d){for(var e="",a=0;a<12;++a)e+='<div class="pmu-button">'+d.data[a]+"</div>";return'<div class="'+d.class_name+'">'+e+"</div>"};function parseDate(e,s,n){if(e.constructor==Date)return e;if(!e)return new Date;if(e.split("-").length<=1)return new Date;var a=e.split(n);if(1<a.length)return a.forEach(function(e,a,t){t[a]=parseDate(e,s,n)}),a;for(var d,t,r,i,o,u=e.split(/\W+/),l=s.split(/\W+/),c=new Date,p=0;p<u.length;p++)switch(l[p]){case"d":case"e":d=parseInt(u[p],10);break;case"m":t=parseInt(u[p],10)-1;break;case"Y":case"y":r=parseInt(u[p],10),r+=100<r?0:r<29?2e3:1900;break;case"H":case"I":case"k":case"l":i=parseInt(u[p],10);break;case"P":case"p":/pm/i.test(u[p])&&i<12?i+=12:/am/i.test(u[p])&&12<=i&&(i-=12);break;case"M":o=parseInt(u[p],10)}return new Date(void 0===r?c.getFullYear():r,void 0===t?c.getMonth():t,void 0===d?c.getDate():d,void 0===i?c.getHours():i,void 0===o?c.getMinutes():o,0)}function formatDate(e,a,t){var s=e.getMonth(),d=e.getDate(),n=e.getFullYear(),r=e.getDay(),i=e.getHours(),o=12<=i,u=o?i-12:i,l=e.getDayOfYear();0==u&&(u=12);for(var c,p=e.getMinutes(),m=e.getSeconds(),h=a.split(""),f=0;f<h.length;f++){switch(c=h[f]){case"a":c=t.daysShort[r];break;case"A":c=t.days[r];break;case"b":c=t.monthsShort[s];break;case"B":c=t.months[s];break;case"C":c=1+Math.floor(n/100);break;case"d":c=d<10?"0"+d:d;break;case"e":c=d;break;case"H":c=i<10?"0"+i:i;break;case"I":c=u<10?"0"+u:u;break;case"j":c=l<100?l<10?"00"+l:"0"+l:l;break;case"k":c=i;break;case"l":c=u;break;case"m":c=s<9?"0"+(1+s):1+s;break;case"M":c=p<10?"0"+p:p;break;case"p":case"P":c=o?"PM":"AM";break;case"s":c=Math.floor(e.getTime()/1e3);break;case"S":c=m<10?"0"+m:m;break;case"u":c=r+1;break;case"w":c=r;break;case"y":c=(""+n).substr(2,2);break;case"Y":c=n}h[f]=c}return h.join("")}function prepareDate(options){var s;return"single"==options.mode?[formatDate(s=new Date(options.date),options.format,options.locale),s]:(s=[[],[]],$.each(options.date,function(e,a){var t=new Date(a);s[0].push(formatDate(t,options.format,options.locale)),s[1].push(t)}),s)}function show(e){var a=this.pickmeup;if(e||!a.is(":visible")){var t=$(this),options=t.data("pickmeup-options"),s=t.offset(),n=document.documentElement.scrollLeft,r=document.documentElement.scrollTop,i=document.documentElement.clientWidth,o=document.documentElement.clientHeight,u=s.top,l=s.left;switch(options.binded.fill(),t.is("input")&&t.pickmeup("set_date",parseDate(t.val(),options.format,options.separator)).keydown(function(e){9==e.which&&t.pickmeup("hide")}),options.before_show(),options.position){case"top":u-=a.outerHeight();break;case"left":l-=a.outerWidth();break;case"right":l+=this.offsetWidth;break;case"bottom":u+=this.offsetHeight}if(u+a.offsetHeight>r+o&&(u=s.top-a.offsetHeight),u<r&&(u=s.top+this.offsetHeight+a.offsetHeight),l+a.offsetWidth>n+i&&(l=s.left-a.offsetWidth),l<n&&(l=s.left+this.offsetWidth),0==options.show())return;a.css({display:"inline-block",top:u+"px",left:l+"px"}),$(document).on("mousedown",options.binded.hide).on("resize",[!0],options.binded.forced_show)}}$.fn.pickmeup=function(i){if("string"!=typeof i)return this.each(function(){var e=$(this);if(!e.data("pickmeup-options")){var a,t,options=$.extend({},$.pickmeup,i||{});for(a in options)void 0!==(t=e.data("pmu-"+a))&&(options[a]=t);if(options.calendars=Math.max(1,parseInt(options.calendars,10)||1),options.mode=/single|multiple|range/.test(options.mode)?options.mode:"single","string"==typeof options.min?options.min=parseDate(options.min,options.format,options.separator).setHours(0,0,0,0):options.min&&options.min.constructor==Date&&options.min.setHours(0,0,0,0),"string"==typeof options.max?options.max=parseDate(options.max,options.format,options.separator).setHours(23,59,59,0):options.max&&options.max.constructor==Date&&options.max.setHours(23,59,59,0),"string"==typeof options.date?options.date=parseDate(options.date,options.format,options.separator).setHours(0,0,0,0):options.date.constructor==Date&&options.date.setHours(0,0,0,0),options.date||(options.date=new Date,options.date.setHours(0,0,0,0)),"single"!=options.mode){if(options.date.constructor!=Array)options.date=[options.date.valueOf()],"range"==options.mode&&options.date.push(new Date(options.date[0]).setHours(23,59,59,0).valueOf());else{for(a=0;a<options.date.length;a++)options.date[a]=parseDate(options.date[a],options.format,options.separator).setHours(0,0,0,0).valueOf();"range"==options.mode&&(options.date[1]=new Date(options.date[1]).setHours(23,59,59,0).valueOf())}options.current=new Date(options.date[0])}else options.date=options.date.valueOf(),options.current=new Date(options.date);options.current.setDate(1),options.current.setHours(0,0,0,0);var s,n=$(u);this.pickmeup=n,options.class_name&&n.addClass(options.class_name);var r="";for(a=0;a<options.calendars;a++)s=options.first_day,r+=l({prev:options.prev,next:options.next,day:[options.locale.daysMin[s++%7],options.locale.daysMin[s++%7],options.locale.daysMin[s++%7],options.locale.daysMin[s++%7],options.locale.daysMin[s++%7],options.locale.daysMin[s++%7],options.locale.daysMin[s++%7]]});for(a in e.data("pickmeup-options",options),options)-1!=$.inArray(a,["render","change","before_show","show","hide"])&&(options[a]=options[a].bind(this));options.binded={fill:function(){var e,a,t,s,n,r,i,o,options=$(this).data("pickmeup-options"),u=this.pickmeup,l=Math.floor(options.calendars/2),c=0,p=(new Date).setHours(0,0,0,0).valueOf();
/**
		 * Remove old content except header navigation
		 */u.find(".pmu-instance > :not(nav)").remove();
/**
		 * If several calendars should be shown
		 */
for(var m=0;m<options.calendars;m++){e=new Date(options.current),o=u.find(".pmu-instance").eq(m),u.hasClass("pmu-view-years")?(e.addYears(12*(m-l)),t=e.getFullYear()-6+" - "+(e.getFullYear()+5)):u.hasClass("pmu-view-months")?(e.addYears(m-l),t=e.getFullYear()):u.hasClass("pmu-view-days")&&(e.addMonths(m-l),t=formatDate(e,"B, Y",options.locale)),o.find(".pmu-month").text(t),s=e.getFullYear()-6,a={data:[],class_name:"pmu-years"};for(var h=0;h<12;h++)a.data.push(s+h);for(i=b(a),e.setDate(1),a=[],r=e.getMonth(),n=(e.getDay()-options.first_day)%7,e.addDays(-(n+(n<0?7:0))),c=0;c<42;){n={text:e.getDate(),class_name:[]},r!=e.getMonth()&&n.class_name.push("pmu-not-in-month"),0==e.getDay()?n.class_name.push("pmu-sunday"):6==e.getDay()&&n.class_name.push("pmu-saturday");var f=options.render(e)||{},v=e.valueOf(),g=options.min&&options.min>e||options.max&&options.max<e;!g&&(f.selected||options.date==v||-1<$.inArray(v,options.date)||"range"==options.mode&&v>=options.date[0]&&v<=options.date[1])&&n.class_name.push("pmu-selected"),v==p&&n.class_name.push("pmu-today"),(f.disabled||g)&&n.class_name.push("pmu-disabled"),f.class_name&&n.class_name.push(f.class_name),n.class_name=n.class_name.join(" "),a.push(n),e.addDays(1),c++}i=y(a)+i,a={data:options.locale.monthsShort,class_name:"pmu-months"},i=b(a)+i,o.append(i)}}.bind(this),click:function(e){var el=$(e.target);if(el.hasClass("pmu-button")){if(el.hasClass("pmu-disabled"))return!1;var t,a=$(this),options=a.data("pickmeup-options"),s=el.parents(".pmu-instance").eq(0),n=s.parent(),r=$(".pmu-instance",n).index(s),i=new Date(options.current);if(el.parent().is("nav"))if(el.hasClass("pmu-month"))i.addMonths(r-Math.floor(options.calendars/2)),n.hasClass("pmu-view-years")?(n.removeClass("pmu-view-years").addClass("pmu-view-days"),el.text(formatDate(i,"B, Y",options.locale))):n.hasClass("pmu-view-months")?(n.removeClass("pmu-view-months").addClass("pmu-view-years"),el.text(i.getFullYear()-6+" - "+(i.getFullYear()+5))):n.hasClass("pmu-view-days")&&(n.removeClass("pmu-view-days").addClass("pmu-view-months"),el.text(i.getFullYear()));else{var o=el.hasClass("pmu-prev");n.hasClass("pmu-view-years")?options.current.addYears(o?-12:12):n.hasClass("pmu-view-months")?options.current.addYears(o?-1:1):n.hasClass("pmu-view-days")&&options.current.addMonths(o?-1:1)}else if(!el.hasClass("pmu-disabled"))if(n.hasClass("pmu-view-years"))options.current.setFullYear(parseInt(el.text(),10)),n.removeClass("pmu-view-years").addClass("pmu-view-months");else if(n.hasClass("pmu-view-months"))options.current.setMonth(s.find(".pmu-months .pmu-button").index(el)),options.current.setFullYear(parseInt(s.find(".pmu-month").text(),10)),options.current.addMonths(Math.floor(options.calendars/2)-r),n.removeClass("pmu-view-months").addClass("pmu-view-days");else{switch(t=parseInt(el.text(),10),i.addMonths(r-Math.floor(options.calendars/2)),el.hasClass("pmu-not-in-month")&&i.addMonths(15<t?-1:1),i.setDate(t),options.mode){case"multiple":t=i.setHours(0,0,0,0).valueOf(),-1<$.inArray(t,options.date)?$.each(options.date,function(e,a){return a!=t||(options.date.splice(e,1),!1)}):options.date.push(t);break;case"range":options.lastSel||(options.date[0]=i.setHours(0,0,0,0).valueOf()),(t=i.setHours(23,59,59,0).valueOf())<options.date[0]?(options.date[1]=options.date[0]+86399e3,options.date[0]=t-86399e3):options.date[1]=t,options.lastSel=!options.lastSel;break;default:options.date=i.valueOf()}if(!function(e){a.is("input")&&a.val("single"==options.mode?e[0]:e[0].join(options.separator)),options.change.apply(this,e)}(prepareDate(options)),options.hide_on_select&&("range"!=options.mode||!options.lastSel))return options.binded.hide(),!1}options.binded.fill()}return!1}.bind(this),show:show.bind(this),forced_show:function(){show.call(this,!0)}.bind(this),hide:function(e){if(!e||!e.target||//Called directly
e.target!=this&&//Clicked not on element itself
!(16&this.pickmeup.get(0).compareDocumentPosition(e.target))){var a=this.pickmeup,options=$(this).data("pickmeup-options");0!=options.hide()&&(a.hide(),$(document).off("mousedown",options.binded.hide).off("resize",options.binded.forced_show),options.date[1]=options.date[0],options.lastSel=!1)}}.bind(this),update:function(){var options=$(this).data("pickmeup-options");$(document).off("mousedown",options.binded.hide).off("resize",options.binded.forced_show),options.binded.forced_show()}.bind(this),clear:function(){var options=$(this).data("pickmeup-options");"single"!=options.mode&&(options.date=[],options.binded.fill())}.bind(this),get_date:function(e){return prepareDate($(this).data("pickmeup-options"))[e?0:1]}.bind(this),set_date:function(e){var options=$(this).data("pickmeup-options");if(options.date=e,"string"==typeof options.date?options.date=parseDate(options.date,options.format,options.separator).setHours(0,0,0,0):options.date.constructor==Date&&options.date.setHours(0,0,0,0),options.date||(options.date=new Date,options.date.setHours(0,0,0,0)),"single"!=options.mode)if(options.date.constructor!=Array)options.date=[options.date.valueOf()],"range"==options.mode&&options.date.push(new Date(options.date[0]).setHours(23,59,59,0).valueOf());else{for(var a=0;a<options.date.length;a++)options.date[a]=parseDate(options.date[a],options.format,options.separator).setHours(0,0,0,0).valueOf();"range"==options.mode&&(options.date[1]=new Date(options.date[1]).setHours(23,59,59,0).valueOf())}else options.date=options.date.valueOf();options.current=new Date("single"!=options.mode?options.date[0]:options.date),options.binded.fill()}.bind(this)},n.on("click",options.binded.click).addClass(o[options.view]).append(r).on($.support.selectstart?"selectstart":"mousedown",function(e){e.preventDefault()}),options.binded.fill(),options.flat?n.appendTo(this).css({position:"relative",display:"inline-block"}):(n.appendTo(document.body),e.on(options.trigger_event,options.binded.show))}});var e,a=Array.prototype.slice.call(arguments,1);switch(i){case"hide":case"show":case"clear":case"update":this.each(function(){(e=$(this).data("pickmeup-options"))&&e.binded[i]()});break;case"get_date":return(e=this.data("pickmeup-options"))?e.binded.get_date(a[0]):null;case"set_date":this.each(function(){(e=$(this).data("pickmeup-options"))&&e.binded[i].apply(this,a)})}return this}}(jQuery);
/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * The MIT License
 *
 * @author  : Washington Botelho
 * @doc     : http://wbotelhos.com/raty
 * @version : 2.7.0
 *
 */
!function($){"use strict";var methods={init:function(options){return this.each(function(){this.self=$(this),methods.destroy.call(this.self),this.opt=$.extend(!0,{},$.fn.raty.defaults,options),methods._adjustCallback.call(this),methods._adjustNumber.call(this),methods._adjustHints.call(this),this.opt.score=methods._adjustedScore.call(this,this.opt.score),"img"!==this.opt.starType&&methods._adjustStarType.call(this),methods._adjustPath.call(this),methods._createStars.call(this),this.opt.cancel&&methods._createCancel.call(this),this.opt.precision&&methods._adjustPrecision.call(this),methods._createScore.call(this),methods._apply.call(this,this.opt.score),methods._setTitle.call(this,this.opt.score),methods._target.call(this,this.opt.score),this.opt.readOnly?methods._lock.call(this):(this.style.cursor="pointer",methods._binds.call(this))})},_adjustCallback:function(){for(var options=["number","readOnly","score","scoreName","target"],t=0;t<options.length;t++)"function"==typeof this.opt[options[t]]&&(this.opt[options[t]]=this.opt[options[t]].call(this))},_adjustedScore:function(t){return t?methods._between(t,0,this.opt.number):t},_adjustHints:function(){if(this.opt.hints||(this.opt.hints=[]),this.opt.halfShow||this.opt.half)for(var t=this.opt.precision?10:2,e=0;e<this.opt.number;e++){var a=this.opt.hints[e];"[object Array]"!==Object.prototype.toString.call(a)&&(a=[a]),this.opt.hints[e]=[];for(var s=0;s<t;s++){var i=a[s],o=a[a.length-1];void 0===o&&(o=null),this.opt.hints[e][s]=void 0===i?o:i}}},_adjustNumber:function(){this.opt.number=methods._between(this.opt.number,1,this.opt.numberMax)},_adjustPath:function(){this.opt.path="/static/sitebuilder/",
// if ((this.opt.path && this.opt.path.charAt(this.opt.path.length - 1)) !== '/') {
this.opt.path+="img/"},_adjustPrecision:function(){this.opt.half=!0},_adjustStarType:function(){var t=["cancelOff","cancelOn","starHalf","starOff","starOn"];this.opt.path="";for(var e=0;e<t.length;e++)this.opt[t[e]]=this.opt[t[e]].replace(".","-")},_apply:function(t){methods._fill.call(this,t),t&&(0<t&&this.score.val(t),methods._roundStars.call(this,t))},_between:function(t,e,a){return Math.min(Math.max(parseFloat(t),e),a)},_binds:function(){this.cancel&&(methods._bindOverCancel.call(this),methods._bindClickCancel.call(this),methods._bindOutCancel.call(this)),methods._bindOver.call(this),methods._bindClick.call(this),methods._bindOut.call(this)},_bindClick:function(){var s=this;s.stars.on("click.raty",function(t){var e=!0,a=s.opt.half||s.opt.precision?s.self.data("score"):this.alt||$(this).data("alt");s.opt.click&&(e=s.opt.click.call(s,+a,t)),!e&&void 0!==e||(s.opt.half&&!s.opt.precision&&(a=methods._roundHalfScore.call(s,a)),methods._apply.call(s,a))})},_bindClickCancel:function(){var e=this;e.cancel.on("click.raty",function(t){e.score.removeAttr("value"),e.opt.click&&e.opt.click.call(e,null,t)})},_bindOut:function(){var a=this;a.self.on("mouseleave.raty",function(t){var e=+a.score.val()||void 0;methods._apply.call(a,e),methods._target.call(a,e,t),methods._resetTitle.call(a),a.opt.mouseout&&a.opt.mouseout.call(a,e,t)})},_bindOutCancel:function(){var s=this;s.cancel.on("mouseleave.raty",function(t){var e=s.opt.cancelOff;if("img"!==s.opt.starType&&(e=s.opt.cancelClass+" "+e),methods._setIcon.call(s,this,e),s.opt.mouseout){var a=+s.score.val()||void 0;s.opt.mouseout.call(s,a,t)}})},_bindOver:function(){var a=this,t=a.opt.half?"mousemove.raty":"mouseover.raty";a.stars.on(t,function(t){var e=methods._getScoreByPosition.call(a,t,this);methods._fill.call(a,e),a.opt.half&&(methods._roundStars.call(a,e,t),methods._setTitle.call(a,e,t),a.self.data("score",e)),methods._target.call(a,e,t),a.opt.mouseover&&a.opt.mouseover.call(a,e,t)})},_bindOverCancel:function(){var s=this;s.cancel.on("mouseover.raty",function(t){var e=s.opt.path+s.opt.starOff,a=s.opt.cancelOn;"img"===s.opt.starType?s.stars.attr("src",e):(a=s.opt.cancelClass+" "+a,s.stars.attr("class",e)),methods._setIcon.call(s,this,a),methods._target.call(s,null,t),s.opt.mouseover&&s.opt.mouseover.call(s,null)})},_buildScoreField:function(){return $("<input />",{name:this.opt.scoreName,type:"hidden"}).appendTo(this)},_createCancel:function(){var t=this.opt.path+this.opt.cancelOff,e=$("<"+this.opt.starType+" />",{title:this.opt.cancelHint,class:this.opt.cancelClass});"img"===this.opt.starType?e.attr({src:t,alt:"x"}):
// TODO: use $.data
e.attr("data-alt","x").addClass(t),"left"===this.opt.cancelPlace?this.self.prepend("&#160;").prepend(e):this.self.append("&#160;").append(e),this.cancel=e},_createScore:function(){var t=$(this.opt.targetScore);this.score=t.length?t:methods._buildScoreField.call(this)},_createStars:function(){for(var t=1;t<=this.opt.number;t++){var e=methods._nameForIndex.call(this,t),a={alt:t,src:this.opt.path+this.opt[e]};"img"!==this.opt.starType&&(a={"data-alt":t,class:a.src}),a.title=methods._getHint.call(this,t),$("<"+this.opt.starType+" />",a).appendTo(this),this.opt.space&&this.self.append(t<this.opt.number?"&#160;":"")}this.stars=this.self.children(this.opt.starType)},_error:function(t){$(this).text(t),$.error(t)},_fill:function(t){for(var e=0,a=1;a<=this.stars.length;a++){var s,i=this.stars[a-1],o=methods._turnOn.call(this,a,t);if(this.opt.iconRange&&this.opt.iconRange.length>e){var r=this.opt.iconRange[e];s=methods._getRangeIcon.call(this,r,o),a<=r.range&&methods._setIcon.call(this,i,s),a===r.range&&e++}else s=this.opt[o?"starOn":"starOff"],methods._setIcon.call(this,i,s)}},_getFirstDecimal:function(t){var e=t.toString().split(".")[1],a=0;return e&&(a=parseInt(e.charAt(0),10),"9999"===e.slice(1,5)&&a++),a},_getRangeIcon:function(t,e){return e?t.on||this.opt.starOn:t.off||this.opt.starOff},_getScoreByPosition:function(t,e){var a=parseInt(e.alt||e.getAttribute("data-alt"),10);if(this.opt.half){var s=methods._getWidth.call(this);a=a-1+parseFloat((t.pageX-$(e).offset().left)/s)}return a},_getHint:function(t,e){if(0!==t&&!t)return this.opt.noRatedMsg;var a=methods._getFirstDecimal.call(this,t),s=Math.ceil(t),i=this.opt.hints[(s||1)-1],o=i,r=!e||this.move;return this.opt.precision?(r&&(a=0===a?9:a-1),o=i[a]):(this.opt.halfShow||this.opt.half)&&(o=i[a=r&&0===a?1:5<a?1:0]),""===o?"":o||t},_getWidth:function(){var t=this.stars[0].width||parseFloat(this.stars.eq(0).css("font-size"));return t||methods._error.call(this,"Could not get the icon width!"),t},_lock:function(){var t=methods._getHint.call(this,this.score.val());this.style.cursor="",this.title=t,this.score.prop("readonly",!0),this.stars.prop("title",t),this.cancel&&this.cancel.hide(),this.self.data("readonly",!0)},_nameForIndex:function(t){return this.opt.score&&this.opt.score>=t?"starOn":"starOff"},_resetTitle:function(t){for(var e=0;e<this.opt.number;e++)this.stars[e].title=methods._getHint.call(this,e+1)},_roundHalfScore:function(t){var e=parseInt(t,10),a=methods._getFirstDecimal.call(this,t);return 0!==a&&(a=5<a?1:.5),e+a},_roundStars:function(t,e){var a,s=(t%1).toFixed(2);if(e||this.move?a=.5<s?"starOn":"starHalf":s>this.opt.round.down&&(// Up:   [x.76 .. x.99]
a="starOn",this.opt.halfShow&&s<this.opt.round.up?// Half: [x.26 .. x.75]
a="starHalf":s<this.opt.round.full&&(// Down: [x.00 .. x.5]
a="starOff")),a){var i=this.opt[a],o=this.stars[Math.ceil(t)-1];methods._setIcon.call(this,o,i)}// Full down: [x.00 .. x.25]
},_setIcon:function(t,e){t["img"===this.opt.starType?"src":"className"]=this.opt.path+e},_setTarget:function(t,e){e=e&&this.opt.targetFormat.toString().replace("{score}",e),t.is(":input")?t.val(e):t.html(e)},_setTitle:function(t,e){if(t){var a=parseInt(Math.ceil(t),10);this.stars[a-1].title=methods._getHint.call(this,t,e)}},_target:function(t,e){if(this.opt.target){var a=$(this.opt.target);a.length||methods._error.call(this,"Target selector invalid or missing!");var s=e&&"mouseover"===e.type;if(void 0===t)t=this.opt.targetText;else if(null===t)t=s?this.opt.cancelHint:this.opt.targetText;else{"hint"===this.opt.targetType?t=methods._getHint.call(this,t,e):this.opt.precision&&(t=parseFloat(t).toFixed(1));var i=e&&"mousemove"===e.type;s||i||this.opt.targetKeep||(t=this.opt.targetText)}methods._setTarget.call(this,a,t)}},_turnOn:function(t,e){return this.opt.single?t===e:t<=e},_unlock:function(){this.style.cursor="pointer",this.removeAttribute("title"),this.score.removeAttr("readonly"),this.self.data("readonly",!1);for(var t=0;t<this.opt.number;t++)this.stars[t].title=methods._getHint.call(this,t+1);this.cancel&&this.cancel.css("display","")},cancel:function(e){return this.each(function(){var t=$(this);!0!==t.data("readonly")&&(methods[e?"click":"score"].call(t,null),this.score.removeAttr("value"))})},click:function(t){return this.each(function(){!0!==$(this).data("readonly")&&(t=methods._adjustedScore.call(this,t),methods._apply.call(this,t),this.opt.click&&this.opt.click.call(this,t,$.Event("click")),methods._target.call(this,t))})},destroy:function(){return this.each(function(){var t=$(this),e=t.data("raw");e?t.off(".raty").empty().css({cursor:e.style.cursor}).removeData("readonly"):t.data("raw",t.clone()[0])})},getScore:function(){var t,e=[];return this.each(function(){t=this.score.val(),e.push(t?+t:void 0)}),1<e.length?e:e[0]},move:function(r){return this.each(function(){var t=parseInt(r,10),e=methods._getFirstDecimal.call(this,r);t>=this.opt.number&&(t=this.opt.number-1,e=10);var a=methods._getWidth.call(this)/10,s=$(this.stars[t]),i=s.offset().left+a*e,o=$.Event("mousemove",{pageX:i});this.move=!0,s.trigger(o),this.move=!1})},readOnly:function(e){return this.each(function(){var t=$(this);t.data("readonly")!==e&&(e?(t.off(".raty").children("img").off(".raty"),methods._lock.call(this)):(methods._binds.call(this),methods._unlock.call(this)),t.data("readonly",e))})},reload:function(){return methods.set.call(this,{})},score:function(){var t=$(this);return arguments.length?methods.setScore.apply(t,arguments):methods.getScore.call(t)},set:function(options){return this.each(function(){$(this).raty($.extend({},this.opt,options))})},setScore:function(t){return this.each(function(){!0!==$(this).data("readonly")&&(t=methods._adjustedScore.call(this,t),methods._apply.call(this,t),methods._target.call(this,t))})}};$.fn.raty=function(t){return methods[t]?methods[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void $.error("Method "+t+" does not exist!"):methods.init.apply(this,arguments)},$.fn.raty.defaults={cancel:!1,cancelClass:"raty-cancel",cancelHint:"Cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:void 0,half:!1,halfShow:!0,hints:[],iconRange:void 0,mouseout:void 0,mouseover:void 0,noRatedMsg:"Not rated yet!",number:5,numberMax:20,path:void 0,precision:!1,readOnly:!1,round:{down:.25,full:.6,up:.76},score:void 0,scoreName:"score",single:!1,space:!0,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",starType:"img",target:void 0,targetFormat:"{score}",targetKeep:!1,targetScore:void 0,targetText:"",targetType:"hint"}}(jQuery);
/*!
 * jQuery Validation Plugin v1.13.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){$.extend($.fn,{
// http://jqueryvalidation.org/validate/
validate:function(options){
// if nothing is selected, return nothing; can't chain anyway
if(this.length){
// check if a validator for this form was already created
var i=$.data(this[0],"validator");return i||(
// Add novalidate tag if HTML5.
this.attr("novalidate","novalidate"),i=new $.validator(options,this[0]),$.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(t){i.settings.submitHandler&&(i.submitButton=t.target),
// allow suppressing validation by adding a cancel class to the submit button
$(t.target).hasClass("cancel")&&(i.cancelSubmit=!0),
// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
void 0!==$(t.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),
// validate the form on submit
this.submit(function(e){function handle(){var t;return!i.settings.submitHandler||(i.submitButton&&(
// insert a hidden input as a replacement for the missing submit button
t=$("<input type='hidden'/>").attr("name",i.submitButton.name).val($(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&
// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
t.remove(),!1)}
// prevent submit for invalid forms or custom submit handlers
return i.settings.debug&&
// prevent form submit to be able to see console output
e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,handle()):i.form()?i.pendingRequest?!(i.formSubmitted=!0):handle():(i.focusInvalid(),!1)})),i)}options&&options.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.")},
// http://jqueryvalidation.org/valid/
valid:function(){var t,e;return $(this[0]).is("form")?t=this.validate().form():(t=!0,e=$(this[0].form).validate(),this.each(function(){t=e.element(this)&&t})),t},
// attributes: space separated list of attributes to retrieve and remove
removeAttrs:function(t){var i={},s=this;return $.each(t.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},
// http://jqueryvalidation.org/rules/
rules:function(t,e){var i,s,r,n,a,o,u=this[0];if(t)switch(s=(i=$.data(u.form,"validator").settings).rules,r=$.validator.staticRules(u),t){case"add":$.extend(r,$.validator.normalizeRule(e)),
// remove messages from rules, but allow them to be set separately
delete r.messages,s[u.name]=r,e.messages&&(i.messages[u.name]=$.extend(i.messages[u.name],e.messages));break;case"remove":return e?(o={},$.each(e.split(/\s/),function(t,e){o[e]=r[e],delete r[e],"required"===e&&$(u).removeAttr("aria-required")}),o):(delete s[u.name],r)}
// make sure required is at front
return(n=$.validator.normalizeRules($.extend({},$.validator.classRules(u),$.validator.attributeRules(u),$.validator.dataRules(u),$.validator.staticRules(u)),u)).required&&(a=n.required,delete n.required,n=$.extend({required:a},n),$(u).attr("aria-required","true")),
// make sure remote is at back
n.remote&&(a=n.remote,delete n.remote,n=$.extend(n,{remote:a})),n}}),
// Custom selectors
$.extend($.expr[":"],{
// http://jqueryvalidation.org/blank-selector/
blank:function(t){return!$.trim(""+$(t).val())},
// http://jqueryvalidation.org/filled-selector/
filled:function(t){return!!$.trim(""+$(t).val())},
// http://jqueryvalidation.org/unchecked-selector/
unchecked:function(t){return!$(t).prop("checked")}}),
// constructor for validator
$.validator=function(options,t){this.settings=$.extend(!0,{},$.validator.defaults,options),this.currentForm=t,this.init()},
// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format=function(i,t){return 1===arguments.length?function(){var t=$.makeArray(arguments);return t.unshift(i),$.validator.format.apply(this,t)}:(2<arguments.length&&t.constructor!==Array&&(t=$.makeArray(arguments).slice(1)),t.constructor!==Array&&(t=[t]),$.each(t,function(t,e){i=i.replace(new RegExp("\\{"+t+"\\}","g"),function(){return e})}),i)},$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,
// hide error label and remove error class on focus if enabled
this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(t)))},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){9===e.which&&""===this.elementValue(t)||(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t){
// click on selects, radiobuttons and checkboxes
t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).addClass(e).removeClass(i):$(t).addClass(e).removeClass(i)},unhighlight:function(t,e,i){"radio"===t.type?this.findByName(t.name).removeClass(e).addClass(i):$(t).removeClass(e).addClass(i)}},
// http://jqueryvalidation.org/jQuery.validator.setDefaults/
setDefaults:function(t){$.extend($.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm),this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i,s=this.groups={};function delegate(t){var e=$.data(this[0].form,"validator"),i="on"+t.type.replace(/^validate/,""),s=e.settings;s[i]&&!this.is(s.ignore)&&s[i].call(e,this[0],t)}$.each(this.settings.groups,function(i,t){"string"==typeof t&&(t=t.split(/\s/)),$.each(t,function(t,e){s[e]=i})}),i=this.settings.rules,$.each(i,function(t,e){i[t]=$.validator.normalizeRule(e)}),$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",delegate).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",delegate),this.settings.invalidHandler&&$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),
// Add aria-required to any Static/Data/Class required fields before first validation
// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
$(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},
// http://jqueryvalidation.org/Validator.form/
form:function(){return this.checkForm(),$.extend(this.submitted,this.errorMap),this.invalid=$.extend({},this.errorMap),this.valid()||$(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},
// http://jqueryvalidation.org/Validator.element/
element:function(t){var e=this.clean(t),i=this.validationTargetFor(e),s=!0;return void 0===(this.lastElement=i)?delete this.invalid[e.name]:(this.prepareElement(i),this.currentElements=$(i),(s=!1!==this.check(i))?delete this.invalid[i.name]:this.invalid[i.name]=!0),
// Add aria-invalid status for screen readers
$(t).attr("aria-invalid",!s),this.numberOfInvalids()||(
// Hide error containers on last error
this.toHide=this.toHide.add(this.containers)),this.showErrors(),s},
// http://jqueryvalidation.org/Validator.showErrors/
showErrors:function(e){if(e){for(var t in
// add items to error list and map
$.extend(this.errorMap,e),this.errorList=[],e)this.errorList.push({message:e[t],element:this.findByName(t)[0]});
// remove items from success list
this.successList=$.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},
// http://jqueryvalidation.org/Validator.resetForm/
resetForm:function(){$.fn.resetForm&&$(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){
/* jshint unused: false */
var e,i=0;for(e in t)i++;return i},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(t){t.not(this.containers).text(""),this.addWrapper(t).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){
// ignore IE throwing errors when focusing hidden elements
}},findLastActive:function(){var e=this.lastActive;return e&&1===$.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var t=this,e={};
// select all valid inputs inside the form (no submit or reset buttons)
return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
// select only the first element for each name, and only those with rules specified
return!this.name&&t.settings.debug&&window.console&&console.error("%o has no name assigned",this),!(this.name in e||!t.objectLength($(this).rules()))&&(e[this.name]=!0)})},clean:function(t){return $(t)[0]},errors:function(){var t=this.settings.errorClass.split(" ").join(".");return $(this.settings.errorElement+"."+t,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=$([]),this.toHide=$([]),this.currentElements=$([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(t){var e,i=$(t),s=t.type;return"radio"===s||"checkbox"===s?$("input[name='"+t.name+"']:checked").val():"number"===s&&void 0!==t.validity?!t.validity.badInput&&i.val():"string"==typeof(e=i.val())?e.replace(/\r/g,""):e},check:function(e){e=this.validationTargetFor(this.clean(e));var t,i,s,r=$(e).rules(),n=$.map(r,function(t,e){return e}).length,a=!1,o=this.elementValue(e);for(i in r){s={method:i,parameters:r[i]};try{
// if a method indicates that the field is optional and therefore valid,
// don't mark it as valid when there are no other rules
if("dependency-mismatch"===(t=$.validator.methods[i].call(this,o,e,s.parameters))&&1===n){a=!0;continue}if(a=!1,"pending"===t)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(!t)return this.formatAndAdd(e,s),!1}catch(t){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+s.method+"' method.",t),t}}if(!a)return this.objectLength(r)&&this.successList.push(e),!0},
// return the custom message for the given element and validation method
// specified in the element's HTML5 data attribute
// return the generic message if present and no method specific message is present
customDataMessage:function(t,e){return $(t).data("msg"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase())||$(t).data("msg")},
// return the custom message for the given element name and validation method
customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},
// return the first defined argument, allowing empty strings
findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(t,e){return this.findDefined(this.customMessage(t.name,e),this.customDataMessage(t,e),
// title is never undefined, so handle empty string as undefined
!this.settings.ignoreTitle&&t.title||void 0,$.validator.messages[e],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e.method),s=/\$?\{(\d+)\}/g;"function"==typeof i?i=i.call(this,e.parameters,t):s.test(i)&&(i=$.validator.format(i.replace(s,"{$1}"),e.parameters)),this.errorList.push({message:i,element:t,method:e.method}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e,i;for(t=0;this.errorList[t];t++)i=this.errorList[t],this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return $(this.errorList).map(function(){return this.element})},showLabel:function(t,e){var i,s,r,n=this.errorsFor(t),a=this.idOrName(t),o=$(t).attr("aria-describedby");n.length?(
// refresh error/success class
n.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
// replace message on existing label
n.html(e)):(
// create error element
// Maintain reference to the element to be placed into the DOM
i=n=$("<"+this.settings.errorElement+">").attr("id",a+"-error").addClass(this.settings.errorClass).css("color","red").html(e||""),this.settings.wrapper&&(
// make sure the element is visible, even in IE
// actually showing the wrapped element is handled elsewhere
i=n.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(i):this.settings.errorPlacement?this.settings.errorPlacement(i,$(t)):($(t).css("border","1px solid red"),$(t).hasClass("viamagus-date-picker")?i.insertAfter($(t).parent()):i.insertAfter(t)),
// Link error back to the element
n.is("label")?
// If the error is a label, then associate using 'for'
n.attr("for",a):0===n.parents("label[for='"+a+"']").length&&(
// If the element is not a child of an associated label, then it's necessary
// to explicitly apply aria-describedby
r=n.attr("id"),
// Respect existing non-error aria-describedby
o?o.match(new RegExp("\b"+r+"\b"))||(
// Add to end of list if not already present
o+=" "+r):o=r,$(t).attr("aria-describedby",o),(
// If this element is grouped, then assign to all elements in the same group
s=this.groups[t.name])&&$.each(this.groups,function(t,e){e===s&&$("[name='"+t+"']",this.currentForm).attr("aria-describedby",n.attr("id"))}))),!e&&this.settings.success&&(n.text(""),"string"==typeof this.settings.success?n.addClass(this.settings.success):this.settings.success(n,t)),this.toShow=this.toShow.add(n)},errorsFor:function(t){var e=this.idOrName(t),i=$(t).attr("aria-describedby"),s="label[for='"+e+"'], label[for='"+e+"'] *";
// aria-describedby should directly reference the error element
return i&&(s=s+", #"+i.replace(/\s+/g,", #")),this.errors().filter(s)},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){
// if radio/checkbox, validate first element in group instead
return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(t){return $(this.currentForm).find("[name='"+t+"']")},getLength:function(t,e){switch(e.nodeName.toLowerCase()){case"select":return $("option:selected",e).length;case"input":if(this.checkable(e))return this.findByName(e.name).filter(":checked").length}return t.length},depend:function(t,e){return!this.dependTypes[typeof t]||this.dependTypes[typeof t](t,e)},dependTypes:{boolean:function(t){return t},string:function(t,e){return!!$(t,e.form).length},function:function(t,e){return t(e)}},optional:function(t){var e=this.elementValue(t);return!$.validator.methods.required.call(this,e,t)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(t,e){this.pendingRequest--,
// sometimes synchronization fails, make sure pendingRequest is never < 0
this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[t.name],e&&0===this.pendingRequest&&this.formSubmitted&&this.form()?($(this.currentForm).submit(),this.formSubmitted=!1):!e&&0===this.pendingRequest&&this.formSubmitted&&($(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(t){return $.data(t,"previousValue")||$.data(t,"previousValue",{old:null,valid:!0,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(t,e){t.constructor===String?this.classRuleSettings[t]=e:$.extend(this.classRuleSettings,t)},classRules:function(t){var e={},i=$(t).attr("class");return i&&$.each(i.split(" "),function(){this in $.validator.classRuleSettings&&$.extend(e,$.validator.classRuleSettings[this])}),e},attributeRules:function(t){var e,i,s={},r=$(t),n=t.getAttribute("type");for(e in $.validator.methods)
// support for <input required> in both html5 and older browsers
// force non-HTML5 browsers to return bool
i="required"===e?(
// Some browsers return an empty string for the required attribute
// and non-HTML5 browsers might have required="" markup
""===(i=t.getAttribute(e))&&(i=!0),!!i):r.attr(e),
// convert the value to a number for number inputs, and for text for backwards compability
// allows type="date" and others to be compared as strings
/min|max/.test(e)&&(null===n||/number|range|text/.test(n))&&(i=Number(i)),i||0===i?s[e]=i:n===e&&"range"!==n&&(
// exception: the jquery validate 'range' method
// does not test for the html5 'range' type
s[e]=!0);
// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
return s.maxlength&&/-1|2147483647|524288/.test(s.maxlength)&&delete s.maxlength,s},dataRules:function(t){var e,i,s={},r=$(t);for(e in $.validator.methods)void 0!==(i=r.data("rule"+e.charAt(0).toUpperCase()+e.substring(1).toLowerCase()))&&(s[e]=i);return s},staticRules:function(t){var e={},i=$.data(t.form,"validator");return i.settings.rules&&(e=$.validator.normalizeRule(i.settings.rules[t.name])||{}),e},normalizeRules:function(s,r){
// handle dependency check
return $.each(s,function(t,e){
// ignore rule when param is explicitly false, eg. required:false
if(!1!==e){if(e.param||e.depends){var i=!0;switch(typeof e.depends){case"string":i=!!$(e.depends,r.form).length;break;case"function":i=e.depends.call(r,r)}i?s[t]=void 0===e.param||e.param:delete s[t]}}else delete s[t]}),
// evaluate parameters
$.each(s,function(t,e){s[t]=$.isFunction(e)?e(r):e}),
// clean number parameters
$.each(["minlength","maxlength"],function(){s[this]&&(s[this]=Number(s[this]))}),$.each(["rangelength","range"],function(){var t;s[this]&&($.isArray(s[this])?s[this]=[Number(s[this][0]),Number(s[this][1])]:"string"==typeof s[this]&&(t=s[this].replace(/[\[\]]/g,"").split(/[\s,]+/),s[this]=[Number(t[0]),Number(t[1])]))}),$.validator.autoCreateRanges&&(
// auto-create ranges
s.min&&s.max&&(s.range=[s.min,s.max],delete s.min,delete s.max),s.minlength&&s.maxlength&&(s.rangelength=[s.minlength,s.maxlength],delete s.minlength,delete s.maxlength)),s},
// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
normalizeRule:function(t){if("string"==typeof t){var e={};$.each(t.split(/\s/),function(){e[this]=!0}),t=e}return t},
// http://jqueryvalidation.org/jQuery.validator.addMethod/
addMethod:function(t,e,i){$.validator.methods[t]=e,$.validator.messages[t]=void 0!==i?i:$.validator.messages[t],e.length<3&&$.validator.addClassRules(t,$.validator.normalizeRule(t))},methods:{
// http://jqueryvalidation.org/required-method/
required:function(t,e,i){
// check if dependency is met
if(!this.depend(i,e))return"dependency-mismatch";if("select"!==e.nodeName.toLowerCase())return this.checkable(e)?0<this.getLength(t,e):0<$.trim(t).length;
// could be an array for select-multiple or a string, both are fine this way
var s=$(e).val();return s&&0<s.length},
// http://jqueryvalidation.org/email-method/
email:function(t,e){
// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
// Retrieved 2014-01-14
// If you have a problem with this implementation, report a bug against the above spec
// Or use custom methods to implement your own email validation
return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},
// http://jqueryvalidation.org/url-method/
url:function(t,e){
// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},
// http://jqueryvalidation.org/date-method/
date:function(t,e){var i={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},s=$("#"+e.id).val();s=s.replace(/^(\w+)-(\d+)/,"$2-$1").split("-");var r=new Date(s[2],i[s[1]],s[0]);return r.getDate()!=s[0]?r.getFullYear()===s[2]&&r.getMonth()===i[s[1]]&&r.getDate()===s[0]:this.optional(e)||!/Invalid|NaN/.test(r.toString())},
// http://jqueryvalidation.org/dateISO-method/
dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)},
// http://jqueryvalidation.org/number-method/
number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},
// http://jqueryvalidation.org/digits-method/
digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},
// http://jqueryvalidation.org/creditcard-method/
// based on http://en.wikipedia.org/wiki/Luhn/
creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";
// accept only spaces, digits and dashes
if(/[^0-9 \-]+/.test(t))return!1;var i,s,r=0,n=0,a=!1;
// Basing min and max length on
// http://developer.ean.com/general_info/Valid_Credit_Card_Types
if((t=t.replace(/\D/g,"")).length<13||19<t.length)return!1;for(i=t.length-1;0<=i;i--)s=t.charAt(i),n=parseInt(s,10),a&&9<(n*=2)&&(n-=9),r+=n,a=!a;return r%10==0},
// http://jqueryvalidation.org/minlength-method/
minlength:function(t,e,i){var s=$.isArray(t)?t.length:this.getLength($.trim(t),e);return this.optional(e)||i<=s},
// http://jqueryvalidation.org/maxlength-method/
maxlength:function(t,e,i){var s=$.isArray(t)?t.length:this.getLength($.trim(t),e);return this.optional(e)||s<=i},
// http://jqueryvalidation.org/rangelength-method/
rangelength:function(t,e,i){var s=$.isArray(t)?t.length:this.getLength($.trim(t),e);return this.optional(e)||s>=i[0]&&s<=i[1]},
// http://jqueryvalidation.org/min-method/
min:function(t,e,i){return this.optional(e)||i<=t},
// http://jqueryvalidation.org/max-method/
max:function(t,e,i){return this.optional(e)||t<=i},
// http://jqueryvalidation.org/range-method/
range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},
// http://jqueryvalidation.org/equalTo-method/
equalTo:function(t,e,i){
// bind to the blur event of the target in order to revalidate whenever the target field is updated
// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
var s=$(i);return this.settings.onfocusout&&s.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(e).valid()}),t===s.val()},
// http://jqueryvalidation.org/remote-method/
remote:function(n,a,t){if(this.optional(a))return"dependency-mismatch";var o,e,u=this.previousValue(a);return this.settings.messages[a.name]||(this.settings.messages[a.name]={}),u.originalMessage=this.settings.messages[a.name].remote,this.settings.messages[a.name].remote=u.message,t="string"==typeof t&&{url:t}||t,u.old===n?u.valid:(u.old=n,(o=this).startRequest(a),(e={})[a.name]=n,$.ajax($.extend(!0,{url:t,mode:"abort",port:"validate"+a.name,dataType:"json",data:e,context:o.currentForm,success:function(t){var e,i,s,r=!0===t||"true"===t;o.settings.messages[a.name].remote=u.originalMessage,r?(s=o.formSubmitted,o.prepareElement(a),o.formSubmitted=s,o.successList.push(a),delete o.invalid[a.name],o.showErrors()):(e={},i=t||o.defaultMessage(a,"remote"),e[a.name]=u.message=$.isFunction(i)?i(n):i,o.invalid[a.name]=!0,o.showErrors(e)),u.valid=r,o.stopRequest(a,r)}},t)),"pending")}}}),$.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};
// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
var s,r={};
// Use a prefilter if available (1.5+)
$.ajaxPrefilter?$.ajaxPrefilter(function(t,e,i){var s=t.port;"abort"===t.mode&&(r[s]&&r[s].abort(),r[s]=i)}):(
// Proxy ajax
s=$.ajax,$.ajax=function(t){var e=("mode"in t?t:$.ajaxSettings).mode,i=("port"in t?t:$.ajaxSettings).port;return"abort"===e?(r[i]&&r[i].abort(),r[i]=s.apply(this,arguments),r[i]):s.apply(this,arguments)}),
// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
$.extend($.fn,{validateDelegate:function(i,t,s){return this.bind(t,function(t){var e=$(t.target);if(e.is(i))return s.apply(e,arguments)})}})});
/*!
 * jQuery Form Plugin
 * version: 2.84 (12-AUG-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
!function($){
// helper fn for console logging
function log(){var e="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e)}
/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function(e) {
			e.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#output'
			});
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/
/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit=function(options){
// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
if(!this.length)return log("ajaxSubmit: skipping submit process - no element selected"),this;var l,e,t,u=this;"function"==typeof options&&(options={success:options}),l=this.attr("method"),
// clean url (don't include hash vaue)
t=(t=(t="string"==typeof(e=this.attr("action"))?$.trim(e):"")||window.location.href||"")&&(t.match(/^([^#]+)/)||[])[1],options=$.extend(!0,{url:t,success:$.ajaxSettings.success,type:l||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},options);
// hook for manipulating the form data before it is extracted;
// convenient for use with rich editors like tinyMCE or FCKEditor
var r={};if(this.trigger("form-pre-serialize",[this,options,r]),r.veto)return log("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;
// provide opportunity to alter form data before it is serialized
if(options.beforeSerialize&&!1===options.beforeSerialize(this,options))return log("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var a,n,i=this.formToArray(options.semantic);if(options.data)for(a in options.extraData=options.data,options.data)if($.isArray(options.data[a]))for(var o in options.data[a])i.push({name:a,value:options.data[a][o]});else n=options.data[a],n=$.isFunction(n)?n():n,// if value is fn, invoke it
i.push({name:a,value:n});
// give pre-submit callback an opportunity to abort the submit
if(options.beforeSubmit&&!1===options.beforeSubmit(i,this,options))return log("ajaxSubmit: submit aborted via beforeSubmit callback"),this;
// fire vetoable 'validate' event
if(this.trigger("form-submit-validate",[i,this,options,r]),r.veto)return log("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var s=$.param(i);"GET"==options.type.toUpperCase()?(options.url+=(0<=options.url.indexOf("?")?"&":"?")+s,options.data=null):options.data=s;var c=[];
// perform a load on the target only if dataType is not provided
if(options.resetForm&&c.push(function(){u.resetForm()}),options.clearForm&&c.push(function(){u.clearForm()}),!options.dataType&&options.target){var f=options.success||function(){};c.push(function(e){var fn=options.replaceTarget?"replaceWith":"html";$(options.target)[fn](e).each(f,arguments)})}else options.success&&c.push(options.success);options.success=function(e,t,r){// jQuery 1.4+ supports scope context 
for(// jQuery 1.4+ passes xhr as 3rd arg
var a=options.context||options,n=0,i=c.length;n<i;n++)c[n].apply(a,[e,t,r||u,u])};
// are there files to upload?
var m=0<$("input:file",this).length,p="multipart/form-data",h=u.attr("enctype")==p||u.attr("encoding")==p;
// options.iframe allows user to force iframe mode
// 06-NOV-09: now defaulting to iframe mode if file input is detected
if(!1!==options.iframe&&(m||options.iframe||h))
// hack to fix Safari hang (thanks to Tim Molendijk for this)
// see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
options.closeKeepAlive?$.get(options.closeKeepAlive,function(){fileUpload(i)}):fileUpload(i);else{
// IE7 massage (see issue 57)
if($.browser.msie&&"get"==l){var g=u[0].getAttribute("method");"string"==typeof g&&(options.type=g)}$.ajax(options)}
// fire 'notify' event
return this.trigger("form-submit-notify",[this,options]),this;
// private function for handling file uploads (hat tip to YAHOO!)
function fileUpload(e){var t,c,f,n,m,p,h,r,a,g,v,i=u[0],o=!!$.fn.prop;if(e)
// ensure that every serialized input is still enabled
for(t=0;t<e.length;t++)$(i[e[t].name])[o?"prop":"attr"]("disabled",!1);if($(":input[name=submit],:input[id=submit]",i).length)
// if there is an input with a name or id of 'submit' then we won't be
// able to invoke the submit fn on the form (at least not x-browser)
alert('Error: Form elements must not have name or id of "submit".');else if((c=$.extend(!0,{},$.ajaxSettings,options)).context=c.context||c,n="jqFormIO"+(new Date).getTime(),c.iframeTarget?null==(a=(m=$(c.iframeTarget)).attr("name"))?m.attr("name",n):n=a:(m=$('<iframe name="'+n+'" src="'+c.iframeSrc+'" />')).css({position:"absolute",top:"-1000px",left:"-1000px"}),p=m[0],h={// mock object
aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";log("aborting upload... "+t),this.aborted=1,m.attr("src",c.iframeSrc),// abort op in progress
h.error=t,c.error&&c.error.call(c.context,h,t,e),f&&$.event.trigger("ajaxError",[h,c,t]),c.complete&&c.complete.call(c.context,h,t)}},
// trigger ajax global events so that activity/block indicators work like normal
(f=c.global)&&!$.active++&&$.event.trigger("ajaxStart"),f&&$.event.trigger("ajaxSend",[h,c]),c.beforeSend&&!1===c.beforeSend.call(c.context,h,c))c.global&&$.active--;else if(!h.aborted){(
// add submitting element to data if we know it
r=i.clk)&&(a=r.name)&&!r.disabled&&(c.extraData=c.extraData||{},c.extraData[a]=r.value,"image"==r.type&&(c.extraData[a+".x"]=i.clk_x,c.extraData[a+".y"]=i.clk_y));var b=1,x=2;c.forceSync?doSubmit():setTimeout(doSubmit,10);var y,T,k,S=50,w=$.parseXML||function(e,t){// use parseXML if available (jQuery 1.5+)
return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},s=$.parseJSON||function(e){return window.eval("("+e+")")},j=function(e,t,r){// mostly lifted from jq1.4.4
var a=e.getResponseHeader("content-type")||"",n="xml"===t||!t&&0<=a.indexOf("xml"),i=n?e.responseXML:e.responseText;return n&&"parsererror"===i.documentElement.nodeName&&$.error&&$.error("parsererror"),r&&r.dataFilter&&(i=r.dataFilter(i,t)),"string"==typeof i&&("json"===t||!t&&0<=a.indexOf("json")?i=s(i):("script"===t||!t&&0<=a.indexOf("javascript"))&&$.globalEval(i)),i}}function getDoc(e){return e.contentWindow?e.contentWindow.document:e.contentDocument?e.contentDocument:e.document}
// take a breath so that pending repaints get some cpu time before the upload starts
function doSubmit(){
// make sure form attrs are set
var e=u.attr("target"),t=u.attr("action");
// update form attrs in IE friendly way
i.setAttribute("target",n),l||i.setAttribute("method","POST"),t!=c.url&&i.setAttribute("action",c.url),
// ie borks in some cases when setting encoding
c.skipEncodingOverride||l&&!/post/i.test(l)||u.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),
// support timout
c.timeout&&(v=setTimeout(function(){g=!0,cb(b)},c.timeout));
// add "extra" data to form if provided in options
var r=[];try{if(c.extraData)for(var a in c.extraData)r.push($('<input type="hidden" name="'+a+'" />').attr("value",c.extraData[a]).appendTo(i)[0]);c.iframeTarget||(
// add iframe to doc and submit the form
m.appendTo("body"),p.attachEvent?p.attachEvent("onload",cb):p.addEventListener("load",cb,!1)),setTimeout(
// look for server aborts
function checkState(){try{var e=getDoc(p).readyState;log("state = "+e),"uninitialized"==e.toLowerCase()&&setTimeout(checkState,50)}catch(e){log("Server abort: ",e," (",e.name,")"),cb(x),v&&clearTimeout(v),v=void 0}},15),i.submit()}finally{
// reset attrs and remove "extra" input elements
i.setAttribute("action",t),e?i.setAttribute("target",e):u.removeAttr("target"),$(r).remove()}}function cb(t){if(!h.aborted&&!k){try{T=getDoc(p)}catch(e){log("cannot access response document: ",e),t=x}if(t===b&&h)h.abort("timeout");else if(t==x&&h)h.abort("server abort");else if(T&&T.location.href!=c.iframeSrc||g){p.detachEvent?p.detachEvent("onload",cb):p.removeEventListener("load",cb,!1);var e,r="success";try{if(g)throw"timeout";var a="xml"==c.dataType||T.XMLDocument||$.isXMLDoc(T);if(log("isXml="+a),!a&&window.opera&&(null==T.body||""==T.body.innerHTML)&&--S)
// in some browsers (Opera) the iframe DOM is not always traversable when
// the onload callback fires, so we loop a bit to accommodate
return log("requeing onLoad callback, DOM not available"),void setTimeout(cb,250);
//log('response detected');
var n=T.body?T.body:T.documentElement;h.responseText=n?n.innerHTML:null,h.responseXML=T.XMLDocument?T.XMLDocument:T,a&&(c.dataType="xml"),h.getResponseHeader=function(e){return{"content-type":c.dataType}[e]},
// support for XHR 'status' & 'statusText' emulation :
n&&(h.status=Number(n.getAttribute("status"))||h.status,h.statusText=n.getAttribute("statusText")||h.statusText);var i=c.dataType||"",o=/(json|script|text)/.test(i.toLowerCase());if(o||c.textarea){
// see if user embedded response in textarea
var s=T.getElementsByTagName("textarea")[0];if(s)h.responseText=s.value,
// support for XHR 'status' & 'statusText' emulation :
h.status=Number(s.getAttribute("status"))||h.status,h.statusText=s.getAttribute("statusText")||h.statusText;else if(o){
// account for browsers injecting pre around json response
var l=T.getElementsByTagName("pre")[0],u=T.getElementsByTagName("body")[0];l?h.responseText=l.textContent?l.textContent:l.innerHTML:u&&(h.responseText=u.innerHTML)}}else"xml"!=c.dataType||h.responseXML||null==h.responseText||(h.responseXML=w(h.responseText));try{y=j(h,c.dataType,c)}catch(t){r="parsererror",h.error=e=t||r}}catch(t){log("error caught: ",t),r="error",h.error=e=t||r}h.aborted&&(log("upload aborted"),r=null),h.status&&(// we've set xhr.status
r=200<=h.status&&h.status<300||304===h.status?"success":"error"),
// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
"success"===r?(c.success&&c.success.call(c.context,y,"success",h),f&&$.event.trigger("ajaxSuccess",[h,c])):r&&(null==e&&(e=h.statusText),c.error&&c.error.call(c.context,h,r,e),f&&$.event.trigger("ajaxError",[h,c,e])),f&&$.event.trigger("ajaxComplete",[h,c]),f&&!--$.active&&$.event.trigger("ajaxStop"),c.complete&&c.complete.call(c.context,h,r),k=!0,c.timeout&&clearTimeout(v),
// clean up
setTimeout(function(){c.iframeTarget||m.remove(),h.responseXML=null},100)}}}}},
/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm=function(options){
// in jQuery 1.3+ we can fix mistakes with the ready state
if(0!==this.length)return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){e.isDefaultPrevented()||(// if event has been canceled, don't proceed
e.preventDefault(),$(this).ajaxSubmit(options))}).bind("click.form-plugin",function(e){var t=e.target,r=$(t);if(!r.is(":submit,input:image")){
// is this a child element of the submit el?  (ex: a span within a button)
var a=r.closest(":submit");if(0==a.length)return;t=a[0]}var n=this;if("image"==(n.clk=t).type)if(null!=e.offsetX)n.clk_x=e.offsetX,n.clk_y=e.offsetY;else if("function"==typeof $.fn.offset){// try to use dimensions plugin
var i=r.offset();n.clk_x=e.pageX-i.left,n.clk_y=e.pageY-i.top}else n.clk_x=e.pageX-t.offsetLeft,n.clk_y=e.pageY-t.offsetTop;
// clear form vars
setTimeout(function(){n.clk=n.clk_x=n.clk_y=null},100)});var e={s:this.selector,c:this.context};return!$.isReady&&e.s?(log("DOM not ready, queuing ajaxForm"),$(function(){$(e.s,e.c).ajaxForm(options)})):
// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)")),this},
// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},
/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray=function(e){var t=[];if(0===this.length)return t;var r,a,n,i,el,o,s,l=this[0],u=e?l.getElementsByTagName("*"):l.elements;if(!u)return t;for(r=0,o=u.length;r<o;r++)if(n=(el=u[r]).name)if(e&&l.clk&&"image"==el.type)
// handle image inputs on the fly when semantic == true
el.disabled||l.clk!=el||(t.push({name:n,value:$(el).val()}),t.push({name:n+".x",value:l.clk_x},{name:n+".y",value:l.clk_y}));else if((i=$.fieldValue(el,!0))&&i.constructor==Array)for(a=0,s=i.length;a<s;a++)t.push({name:n,value:i[a]});else null!=i&&t.push({name:n,value:i});if(!e&&l.clk){
// input type=='image' are not found in elements array! handle it here
var c=$(l.clk),f=c[0];(n=f.name)&&!f.disabled&&"image"==f.type&&(t.push({name:n,value:c.val()}),t.push({name:n+".x",value:l.clk_x},{name:n+".y",value:l.clk_y}))}return t},
/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize=function(e){
//hand off to jQuery.param for proper encoding
return $.param(this.formToArray(e))},
/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize=function(n){var i=[];
//hand off to jQuery.param for proper encoding
return this.each(function(){var e=this.name;if(e){var t=$.fieldValue(this,n);if(t&&t.constructor==Array)for(var r=0,a=t.length;r<a;r++)i.push({name:e,value:t[r]});else null!=t&&i.push({name:this.name,value:t})}}),$.param(i)},
/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var el=this[r],n=$.fieldValue(el,e);null==n||n.constructor==Array&&!n.length||(n.constructor==Array?$.merge(t,n):t.push(n))}return t},
/**
 * Returns the value of the field element.
 */
$.fieldValue=function(el,e){var t=el.name,r=el.type,a=el.tagName.toLowerCase();if(void 0===e&&(e=!0),e&&(!t||el.disabled||"reset"==r||"button"==r||("checkbox"==r||"radio"==r)&&!el.checked||("submit"==r||"image"==r)&&el.form&&el.form.clk!=el||"select"==a&&-1==el.selectedIndex))return null;if("select"!=a)return $(el).val();var n=el.selectedIndex;if(n<0)return null;for(var i=[],o=el.options,s="select-one"==r,l=s?n+1:o.length,u=s?n:0;u<l;u++){var c=o[u];if(c.selected){var f=c.value;if(// extra pain for IE...
f=f||(c.attributes&&c.attributes.value&&!c.attributes.value.specified?c.text:c.value),s)return f;i.push(f)}}return i},
/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm=function(){return this.each(function(){$("input,select,textarea",this).clearFields()})},
/**
 * Clears the selected form elements.
 */
$.fn.clearFields=$.fn.clearInputs=function(){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;// 'hidden' is not in this list
return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();r.test(e)||"textarea"==t?this.value="":"checkbox"==e||"radio"==e?this.checked=!1:"select"==t&&(this.selectedIndex=-1)})},
/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm=function(){return this.each(function(){
// guard against an input with the name of 'reset'
// note that IE reports the reset function as an 'object'
"function"!=typeof this.reset&&("object"!=typeof this.reset||this.reset.nodeType)||this.reset()})},
/**
 * Enables or disables any matching elements.
 */
$.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},
/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e=this.type;if("checkbox"==e||"radio"==e)this.checked=r;else if("option"==this.tagName.toLowerCase()){var t=$(this).parent("select");r&&t[0]&&"select-one"==t[0].type&&
// deselect all other options
t.find("option").selected(!1),this.selected=r}})}}(jQuery);
!function(){
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */
function require(path,parent,orig){var e=require.resolve(path);
// lookup failed
if(null==e){orig=orig||path,parent=parent||"root";var t=new Error('Failed to require "'+orig+'" from "'+parent+'"');throw t.path=orig,t.parent=parent,t.require=!0,t}var i=require.modules[e];
// perform real require()
// by invoking the module's
// registered function
if(!i._resolving&&!i.exports){var n={exports:{}};n.client=n.component=!0,i._resolving=!0,i.call(this,n.exports,require.relative(e),n),delete i._resolving,i.exports=n.exports}return i.exports}
/**
 * Registered modules.
 */require.modules={},
/**
 * Registered aliases.
 */
require.aliases={},
/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */
require.resolve=function(path){"/"===path.charAt(0)&&(path=path.slice(1));for(var e=[path,path+".js",path+".json",path+"/index.js",path+"/index.json"],t=0;t<e.length;t++){path=e[t];if(require.modules.hasOwnProperty(path))return path;if(require.aliases.hasOwnProperty(path))return require.aliases[path]}},
/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */
require.normalize=function(e,path){var t=[];if("."!=path.charAt(0))return path;e=e.split("/"),path=path.split("/");for(var i=0;i<path.length;++i)".."==path[i]?e.pop():"."!=path[i]&&""!=path[i]&&t.push(path[i]);return e.concat(t).join("/")},
/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */
require.register=function(path,e){require.modules[path]=e},
/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */
require.alias=function(e,t){if(!require.modules.hasOwnProperty(e))throw new Error('Failed to alias "'+e+'", it does not exist');require.aliases[t]=e},
/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */
require.relative=function(parent){var n=require.normalize(parent,"..");
/**
   * lastIndexOf helper.
   */
/**
   * The relative require() itself.
   */
function localRequire(path){return require(localRequire.resolve(path),parent,path)}
/**
   * Resolve relative to the parent.
   */return localRequire.resolve=function(path){var e=path.charAt(0);if("/"==e)return path.slice(1);if("."==e)return require.normalize(n,path);
// resolve deps by returning
// the dep in the nearest "deps"
// directory
var t=parent.split("/"),i=function(e,t){for(var i=e.length;i--;)if(e[i]===t)return i;return-1}(t,"deps")+1;return i=i||0,path=t.slice(0,i+1).join("/")+"/deps/"+path},
/**
   * Check if module is defined at `path`.
   */
localRequire.exists=function(path){return require.modules.hasOwnProperty(localRequire.resolve(path))},localRequire},require.register("component-emitter/index.js",function(e,t,i){
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
function Emitter(e){if(e)
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */return function(e){for(var t in Emitter.prototype)e[t]=Emitter.prototype[t];return e}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */(e)}(
/**
 * Expose `Emitter`.
 */
i.exports=Emitter).prototype.on=function(e,fn){return this._callbacks=this._callbacks||{},(this._callbacks[e]=this._callbacks[e]||[]).push(fn),this},
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.once=function(e,fn){var t=this;function on(){t.off(e,on),fn.apply(this,arguments)}return this._callbacks=this._callbacks||{},fn._off=on,this.on(e,on),this},
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=function(e,fn){this._callbacks=this._callbacks||{};var t=this._callbacks[e];if(!t)return this;
// remove all handlers
if(1==arguments.length)return delete this._callbacks[e],this;
// remove specific handler
var i=t.indexOf(fn._off||fn);return~i&&t.splice(i,1),this},
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */
Emitter.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),i=this._callbacks[e];if(i)for(var n=0,r=(i=i.slice(0)).length;n<r;++n)i[n].apply(this,t);return this},
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */
Emitter.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[e]||[]},
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */
Emitter.prototype.hasListeners=function(e){return!!this.listeners(e).length}}),require.register("dropzone/index.js",function(e,t,i){
/**
 * Exposing dropzone
 */
i.exports=t("./lib/dropzone.js")}),require.register("dropzone/lib/dropzone.js",function(e,a,p){
/*
#
# More info at [www.dropzonejs.com](http://www.dropzonejs.com)
# 
# Copyright (c) 2012, Matias Meno  
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
*/
(function(){var s,e,t,i,c,h,n,r,S,o={}.hasOwnProperty,l=[].slice;function Dropzone(e,options){var t,i,n;if(this.element=e,this.version=Dropzone.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(this.element.dropzone)throw new Error("Dropzone already attached.");if(Dropzone.instances.push(this),this.element.dropzone=this,t=null!=(n=Dropzone.optionsForElement(this.element))?n:{},this.options=S({},this.defaultOptions,t,null!=options?options:{}),this.options.forceFallback||!Dropzone.isBrowserSupported())return this.options.fallback.call(this);if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.");if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(i=this.getExistingFallback())&&i.parentNode&&i.parentNode.removeChild(i),this.options.previewsContainer?this.previewsContainer=Dropzone.getElement(this.options.previewsContainer,"previewsContainer"):this.previewsContainer=this.element,this.options.clickable&&(!0===this.options.clickable?this.clickableElements=[this.element]:this.clickableElements=Dropzone.getElements(this.options.clickable,"clickable")),this.init()}e="undefined"!=typeof Emitter&&null!==Emitter?Emitter:a("emitter"),n=function(){},function(e,parent){for(var t in parent)o.call(parent,t)&&(e[t]=parent[t]);function ctor(){this.constructor=e}ctor.prototype=parent.prototype,e.prototype=new ctor,e.__super__=parent.prototype}(Dropzone,e),
/*
    This is a list of all available events you can register on a dropzone object.
    
    You can register an event handler like this:
    
        dropzone.on("dragEnter", function() { });
    */
Dropzone.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached"],Dropzone.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:100,thumbnailHeight:100,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,addRemoveLinks:!1,previewsContainer:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",accept:function(e,t){return t()},init:function(){return n},forceFallback:!1,fallback:function(){var e,t,i,n,r,o;for(this.element.className=this.element.className+" dz-browser-not-supported",n=0,r=(o=this.element.getElementsByTagName("div")).length;n<r;n++)e=o[n],/(^| )dz-message($| )/.test(e.className)&&((t=e).className="dz-message");return t||(t=Dropzone.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(t)),(i=t.getElementsByTagName("span")[0])&&(i.textContent=this.options.dictFallbackMessage),this.element.appendChild(this.getFallbackForm())},resize:function(e){var t,i,n;return t={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},i=e.width/e.height,n=this.options.thumbnailWidth/this.options.thumbnailHeight,e.height<this.options.thumbnailHeight||e.width<this.options.thumbnailWidth?(t.trgHeight=t.srcHeight,t.trgWidth=t.srcWidth):n<i?(t.srcHeight=e.height,t.srcWidth=t.srcHeight*n):(t.srcWidth=e.width,t.srcHeight=t.srcWidth/n),t.srcX=(e.width-t.srcWidth)/2,t.srcY=(e.height-t.srcHeight)/2,t},
/*
      Those functions register themselves to the events on init and handle all
      the user interface specific stuff. Overwriting them won't break the upload
      but can break the way it's displayed.
      You can overwrite them if you don't like the default behavior. If you just
      want to add an additional event handler, register it on the dropzone object
      and don't overwrite those options.
      */
drop:function(e){return this.element.classList.remove("dz-drag-hover")},dragstart:n,dragend:function(e){return this.element.classList.remove("dz-drag-hover")},dragenter:function(e){return this.element.classList.add("dz-drag-hover")},dragover:function(e){return this.element.classList.add("dz-drag-hover")},dragleave:function(e){return this.element.classList.remove("dz-drag-hover")},paste:n,reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(t){var e,i,n,r,o,s,l,a,p,u,c,h,m=this;for(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),t.previewElement=Dropzone.createElement(this.options.previewTemplate.trim()),t.previewTemplate=t.previewElement,this.previewsContainer.appendChild(t.previewElement),n=0,s=(p=t.previewElement.querySelectorAll("[data-dz-name]")).length;n<s;n++)p[n].textContent=t.name;for(r=0,l=(u=t.previewElement.querySelectorAll("[data-dz-size]")).length;r<l;r++)u[r].innerHTML=this.filesize(t.size);for(this.options.addRemoveLinks&&(t._removeLink=Dropzone.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),t.previewElement.appendChild(t._removeLink)),e=function(e){return e.preventDefault(),e.stopPropagation(),t.status===Dropzone.UPLOADING?Dropzone.confirm(m.options.dictCancelUploadConfirmation,function(){return m.removeFile(t)}):m.options.dictRemoveFileConfirmation?Dropzone.confirm(m.options.dictRemoveFileConfirmation,function(){return m.removeFile(t)}):m.removeFile(t)},h=[],o=0,a=(c=t.previewElement.querySelectorAll("[data-dz-remove]")).length;o<a;o++)i=c[o],h.push(i.addEventListener("click",e));return h},removedfile:function(e){var t;return null!=(t=e.previewElement)&&t.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){var i,n,r,o,s;for(e.previewElement.classList.remove("dz-file-preview"),e.previewElement.classList.add("dz-image-preview"),s=[],n=0,r=(o=e.previewElement.querySelectorAll("[data-dz-thumbnail]")).length;n<r;n++)(i=o[n]).alt=e.name,s.push(i.src=t);return s},error:function(e,t){var i,n,r,o,s;for(e.previewElement.classList.add("dz-error"),"String"!=typeof t&&t.error&&(t=t.error),s=[],n=0,r=(o=e.previewElement.querySelectorAll("[data-dz-errormessage]")).length;n<r;n++)i=o[n],s.push(i.textContent=t);return s},errormultiple:n,processing:function(e){if(e.previewElement.classList.add("dz-processing"),e._removeLink)return e._removeLink.textContent=this.options.dictCancelUpload},processingmultiple:n,uploadprogress:function(e,t,i){var n,r,o,s,l;for(l=[],r=0,o=(s=e.previewElement.querySelectorAll("[data-dz-uploadprogress]")).length;r<o;r++)n=s[r],l.push(n.style.width=t+"%");return l},totaluploadprogress:n,sending:n,sendingmultiple:n,success:function(e){return e.previewElement.classList.add("dz-success")},successmultiple:n,canceled:function(e){return this.emit("error",e,"Upload canceled.")},canceledmultiple:n,complete:function(e){if(e._removeLink)return e._removeLink.textContent=this.options.dictRemoveFile},completemultiple:n,maxfilesexceeded:n,maxfilesreached:n,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'},S=function(){var e,t,i,n,r,o,s;for(n=arguments[0],o=0,s=(i=2<=arguments.length?l.call(arguments,1):[]).length;o<s;o++)for(e in t=i[o])r=t[e],n[e]=r;return n},Dropzone.prototype.getAcceptedFiles=function(){var e,t,i,n,r;for(r=[],t=0,i=(n=this.files).length;t<i;t++)(e=n[t]).accepted&&r.push(e);return r},Dropzone.prototype.getRejectedFiles=function(){var e,t,i,n,r;for(r=[],t=0,i=(n=this.files).length;t<i;t++)(e=n[t]).accepted||r.push(e);return r},Dropzone.prototype.getQueuedFiles=function(){var e,t,i,n,r;for(r=[],t=0,i=(n=this.files).length;t<i;t++)(e=n[t]).status===Dropzone.QUEUED&&r.push(e);return r},Dropzone.prototype.getUploadingFiles=function(){var e,t,i,n,r;for(r=[],t=0,i=(n=this.files).length;t<i;t++)(e=n[t]).status===Dropzone.UPLOADING&&r.push(e);return r},Dropzone.prototype.init=function(){var e,i,r,t,n,o,s,l=this;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(Dropzone.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length&&(r=function(){return l.hiddenFileInput&&document.body.removeChild(l.hiddenFileInput),l.hiddenFileInput=document.createElement("input"),l.hiddenFileInput.setAttribute("type","file"),(null==l.options.maxFiles||1<l.options.maxFiles)&&l.hiddenFileInput.setAttribute("multiple","multiple"),null!=l.options.acceptedFiles&&l.hiddenFileInput.setAttribute("accept",l.options.acceptedFiles),l.hiddenFileInput.style.visibility="hidden",l.hiddenFileInput.style.position="absolute",l.hiddenFileInput.style.top="0",l.hiddenFileInput.style.left="0",l.hiddenFileInput.style.height="0",l.hiddenFileInput.style.width="0",document.body.appendChild(l.hiddenFileInput),l.hiddenFileInput.addEventListener("change",function(){var e,t,i,n;if((t=l.hiddenFileInput.files).length)for(i=0,n=t.length;i<n;i++)e=t[i],l.addFile(e);return r()})})(),this.URL=null!=(o=window.URL)?o:window.webkitURL,t=0,n=(s=this.events).length;t<n;t++)e=s[t],this.on(e,this.options[e]);return this.on("uploadprogress",function(){return l.updateTotalUploadProgress()}),this.on("removedfile",function(){return l.updateTotalUploadProgress()}),this.on("canceled",function(e){return l.emit("complete",e)}),this.on("complete",function(e){if(0===l.getUploadingFiles().length&&0===l.getQueuedFiles().length)return setTimeout(function(){return l.emit("queuecomplete")},0)}),i=function(e){return e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(e){return l.emit("dragstart",e)},dragenter:function(e){return i(e),l.emit("dragenter",e)},dragover:function(e){var t;try{t=e.dataTransfer.effectAllowed}catch(e){}return e.dataTransfer.dropEffect="move"===t||"linkMove"===t?"move":"copy",i(e),l.emit("dragover",e)},dragleave:function(e){return l.emit("dragleave",e)},drop:function(e){return i(e),l.drop(e)},dragend:function(e){return l.emit("dragend",e)}}}],this.clickableElements.forEach(function(t){return l.listeners.push({element:t,events:{click:function(e){if(t!==l.element||e.target===l.element||Dropzone.elementInside(e.target,l.element.querySelector(".dz-message")))return l.hiddenFileInput.click()}}})}),this.enable(),this.options.init.call(this)},Dropzone.prototype.destroy=function(){var e;return this.disable(),this.removeAllFiles(!0),(null!=(e=this.hiddenFileInput)?e.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,Dropzone.instances.splice(Dropzone.instances.indexOf(this),1)},Dropzone.prototype.updateTotalUploadProgress=function(){var e,t,i,n,r,o,s;if(t=i=0,this.getAcceptedFiles().length){for(r=0,o=(s=this.getAcceptedFiles()).length;r<o;r++)i+=(e=s[r]).upload.bytesSent,t+=e.upload.total;n=100*i/t}else n=100;return this.emit("totaluploadprogress",n,t,i)},Dropzone.prototype.getFallbackForm=function(){var e,t,i,n;return(e=this.getExistingFallback())?e:(i='<div class="dz-fallback">',this.options.dictFallbackText&&(i+="<p>"+this.options.dictFallbackText+"</p>"),i+='<input type="file" name="'+this.options.paramName+(this.options.uploadMultiple?"[]":"")+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',t=Dropzone.createElement(i),"FORM"!==this.element.tagName?(n=Dropzone.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>')).appendChild(t):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=n?n:t)},Dropzone.prototype.getExistingFallback=function(){var e,t,i,n,r,o;for(t=function(e){var el,t,i;for(t=0,i=e.length;t<i;t++)if(el=e[t],/(^| )fallback($| )/.test(el.className))return el},n=0,r=(o=["div","form"]).length;n<r;n++)if(i=o[n],e=t(this.element.getElementsByTagName(i)))return e},Dropzone.prototype.setupEventListeners=function(){var i,n,r,e,t,o,s;for(s=[],e=0,t=(o=this.listeners).length;e<t;e++)i=o[e],s.push(function(){var e,t;for(n in t=[],e=i.events)r=e[n],t.push(i.element.addEventListener(n,r,!1));return t}());return s},Dropzone.prototype.removeEventListeners=function(){var i,n,r,e,t,o,s;for(s=[],e=0,t=(o=this.listeners).length;e<t;e++)i=o[e],s.push(function(){var e,t;for(n in t=[],e=i.events)r=e[n],t.push(i.element.removeEventListener(n,r,!1));return t}());return s},Dropzone.prototype.disable=function(){var e,t,i,n,r;for(this.clickableElements.forEach(function(e){return e.classList.remove("dz-clickable")}),this.removeEventListeners(),r=[],t=0,i=(n=this.files).length;t<i;t++)e=n[t],r.push(this.cancelUpload(e));return r},Dropzone.prototype.enable=function(){return this.clickableElements.forEach(function(e){return e.classList.add("dz-clickable")}),this.setupEventListeners()},Dropzone.prototype.filesize=function(e){var t;return t=109951162777.6<=e?(e/=109951162777.6,"TiB"):107374182.4<=e?(e/=107374182.4,"GiB"):104857.6<=e?(e/=104857.6,"MiB"):102.4<=e?(e/=102.4,"KiB"):(e*=10,"b"),"<strong>"+Math.round(e)/10+"</strong> "+t},Dropzone.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},Dropzone.prototype.drop=function(e){var t,i;e.dataTransfer&&(this.emit("drop",e),(t=e.dataTransfer.files).length&&((i=e.dataTransfer.items)&&i.length&&null!=i[0].webkitGetAsEntry?this._addFilesFromItems(i):this.handleFiles(t)))},Dropzone.prototype.paste=function(e){var t,i;if(null!=(null!=e&&null!=(i=e.clipboardData)?i.items:void 0))return this.emit("paste",e),(t=e.clipboardData.items).length?this._addFilesFromItems(t):void 0},Dropzone.prototype.handleFiles=function(e){var t,i,n,r;for(r=[],i=0,n=e.length;i<n;i++)t=e[i],r.push(this.addFile(t));return r},Dropzone.prototype._addFilesFromItems=function(e){var t,i,n,r,o;for(o=[],n=0,r=e.length;n<r;n++)null!=(i=e[n]).webkitGetAsEntry&&(t=i.webkitGetAsEntry())?t.isFile?o.push(this.addFile(i.getAsFile())):t.isDirectory?o.push(this._addFilesFromDirectory(t,t.name)):o.push(void 0):null==i.getAsFile||null!=i.kind&&"file"!==i.kind?o.push(void 0):o.push(this.addFile(i.getAsFile()));return o},Dropzone.prototype._addFilesFromDirectory=function(e,path){var t,r=this;return t=function(e){var t,i,n;for(i=0,n=e.length;i<n;i++)(t=e[i]).isFile?t.file(function(e){if(!r.options.ignoreHiddenFiles||"."!==e.name.substring(0,1))return e.fullPath=path+"/"+e.name,r.addFile(e)}):t.isDirectory&&r._addFilesFromDirectory(t,path+"/"+t.name)},e.createReader().readEntries(t,function(e){return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log(e):void 0})},Dropzone.prototype.accept=function(e,t){return e.size>1024*this.options.maxFilesize*1024?t(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(e.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):Dropzone.isValidFile(e,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",e)):this.options.accept.call(this,e,t):t(this.options.dictInvalidFileType)},Dropzone.prototype.addFile=function(t){var i=this;return t.upload={progress:0,total:t.size,bytesSent:0},this.files.push(t),t.status=Dropzone.ADDED,this.emit("addedfile",t),this._enqueueThumbnail(t),this.accept(t,function(e){return e?(t.accepted=!1,i._errorProcessing([t],e)):i.enqueueFile(t),i._updateMaxFilesReachedClass()})},Dropzone.prototype.enqueueFiles=function(e){var t,i,n;for(i=0,n=e.length;i<n;i++)t=e[i],this.enqueueFile(t);return null},Dropzone.prototype.enqueueFile=function(e){var t=this;if(e.accepted=!0,e.status!==Dropzone.ADDED)throw new Error("This file can't be queued because it has already been processed or was rejected.");if(e.status=Dropzone.QUEUED,this.options.autoProcessQueue)return setTimeout(function(){return t.processQueue()},0)},Dropzone.prototype._thumbnailQueue=[],Dropzone.prototype._processingThumbnail=!1,Dropzone.prototype._enqueueThumbnail=function(e){var t=this;if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout(function(){return t._processThumbnailQueue()},0)},Dropzone.prototype._processThumbnailQueue=function(){var e=this;if(!this._processingThumbnail&&0!==this._thumbnailQueue.length)return this._processingThumbnail=!0,this.createThumbnail(this._thumbnailQueue.shift(),function(){return e._processingThumbnail=!1,e._processThumbnailQueue()})},Dropzone.prototype.removeFile=function(e){if(e.status===Dropzone.UPLOADING&&this.cancelUpload(e),this.files=r(this.files,e),this.emit("removedfile",e),0===this.files.length)return this.emit("reset")},Dropzone.prototype.removeAllFiles=function(e){var t,i,n,r;for(null==e&&(e=!1),i=0,n=(r=this.files.slice()).length;i<n;i++)(t=r[i]).status===Dropzone.UPLOADING&&!e||this.removeFile(t);return null},Dropzone.prototype.createThumbnail=function(p,u){var e,c=this;return(e=new FileReader).onload=function(){var a;return(a=document.createElement("img")).onload=function(){var e,t,i,n,r,o,s,l;if(p.width=a.width,p.height=a.height,null==(i=c.options.resize.call(c,p)).trgWidth&&(i.trgWidth=c.options.thumbnailWidth),null==i.trgHeight&&(i.trgHeight=c.options.thumbnailHeight),t=(e=document.createElement("canvas")).getContext("2d"),e.width=i.trgWidth,e.height=i.trgHeight,h(t,a,null!=(r=i.srcX)?r:0,null!=(o=i.srcY)?o:0,i.srcWidth,i.srcHeight,null!=(s=i.trgX)?s:0,null!=(l=i.trgY)?l:0,i.trgWidth,i.trgHeight),n=e.toDataURL("image/png"),c.emit("thumbnail",p,n),null!=u)return u()},a.src=e.result},e.readAsDataURL(p)},Dropzone.prototype.processQueue=function(){var e,t,i,n;if(!((t=this.options.parallelUploads)<=(e=i=this.getUploadingFiles().length))&&0<(n=this.getQueuedFiles()).length){if(this.options.uploadMultiple)return this.processFiles(n.slice(0,t-i));for(;e<t;){if(!n.length)return;this.processFile(n.shift()),e++}}},Dropzone.prototype.processFile=function(e){return this.processFiles([e])},Dropzone.prototype.processFiles=function(e){var t,i,n;for(i=0,n=e.length;i<n;i++)(t=e[i]).processing=!0,t.status=Dropzone.UPLOADING,this.emit("processing",t);return this.options.uploadMultiple&&this.emit("processingmultiple",e),this.uploadFiles(e)},Dropzone.prototype._getFilesWithXhr=function(r){var o;return function(){var e,t,i,n;for(n=[],e=0,t=(i=this.files).length;e<t;e++)(o=i[e]).xhr===r&&n.push(o);return n}.call(this)},Dropzone.prototype.cancelUpload=function(e){var t,i,n,r,o,s,l;if(e.status===Dropzone.UPLOADING){for(n=0,o=(i=this._getFilesWithXhr(e.xhr)).length;n<o;n++)(t=i[n]).status=Dropzone.CANCELED;for(e.xhr.abort(),r=0,s=i.length;r<s;r++)t=i[r],this.emit("canceled",t);this.options.uploadMultiple&&this.emit("canceledmultiple",i)}else(l=e.status)!==Dropzone.ADDED&&l!==Dropzone.QUEUED||(e.status=Dropzone.CANCELED,this.emit("canceled",e),this.options.uploadMultiple&&this.emit("canceledmultiple",[e]));if(this.options.autoProcessQueue)return this.processQueue()},Dropzone.prototype.uploadFile=function(e){return this.uploadFiles([e])},Dropzone.prototype.uploadFiles=function(u){var c,e,i,t,n,r,o,s,l,a,p,h,m,f,g,v,z,y,F,D,E,b,w,x,L,k,C,q,A,T,_=this;for(g=new XMLHttpRequest,v=0,D=u.length;v<D;v++)(c=u[v]).xhr=g;for(t in g.open(this.options.method,this.options.url,!0),g.withCredentials=!!this.options.withCredentials,h=null,i=function(){var e,t,i;for(i=[],e=0,t=u.length;e<t;e++)c=u[e],i.push(_._errorProcessing(u,h||_.options.dictResponseError.replace("{{statusCode}}",g.status),g));return i},m=function(e){var t,i,n,r,o,s,l,a,p;if(null!=e)for(i=100*e.loaded/e.total,n=0,s=u.length;n<s;n++)(c=u[n]).upload={progress:i,total:e.total,bytesSent:e.loaded};else{for(t=!0,i=100,r=0,l=u.length;r<l;r++)100===(c=u[r]).upload.progress&&c.upload.bytesSent===c.upload.total||(t=!1),c.upload.progress=i,c.upload.bytesSent=c.upload.total;if(t)return}for(p=[],o=0,a=u.length;o<a;o++)c=u[o],p.push(_.emit("uploadprogress",c,i,c.upload.bytesSent));return p},g.onload=function(t){var e;if(u[0].status!==Dropzone.CANCELED&&4===g.readyState){if(h=g.responseText,g.getResponseHeader("content-type")&&~g.getResponseHeader("content-type").indexOf("application/json"))try{h=JSON.parse(h)}catch(e){t=e,h="Invalid JSON response from server."}return m(),200<=(e=g.status)&&e<300?_._finished(u,h,t):i()}},g.onerror=function(){if(u[0].status!==Dropzone.CANCELED)return i()},(null!=(k=g.upload)?k:g).onprogress=m,r={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&S(r,this.options.headers),r)n=r[t],g.setRequestHeader(t,n);if(e=new FormData,this.options.params)for(a in C=this.options.params)f=C[a],e.append(a,f);for(z=0,E=u.length;z<E;z++)c=u[z],this.emit("sending",c,g,e);if(this.options.uploadMultiple&&this.emit("sendingmultiple",u,g,e),"FORM"===this.element.tagName)for(y=0,b=(q=this.element.querySelectorAll("input, textarea, select, button")).length;y<b;y++)if(s=(o=q[y]).getAttribute("name"),l=o.getAttribute("type"),"SELECT"===o.tagName&&o.hasAttribute("multiple"))for(F=0,w=(A=o.options).length;F<w;F++)(p=A[F]).selected&&e.append(s,p.value);else(!l||"checkbox"!==(T=l.toLowerCase())&&"radio"!==T||o.checked)&&e.append(s,o.value);for(L=0,x=u.length;L<x;L++)c=u[L],e.append(this.options.paramName+(this.options.uploadMultiple?"[]":""),c,c.name);return g.send(e)},Dropzone.prototype._finished=function(e,t,i){var n,r,o;for(r=0,o=e.length;r<o;r++)(n=e[r]).status=Dropzone.SUCCESS,this.emit("success",n,t,i),this.emit("complete",n);if(this.options.uploadMultiple&&(this.emit("successmultiple",e,t,i),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()},Dropzone.prototype._errorProcessing=function(e,t,i){var n,r,o;for(r=0,o=e.length;r<o;r++)(n=e[r]).status=Dropzone.ERROR,this.emit("error",n,t,i),this.emit("complete",n);if(this.options.uploadMultiple&&(this.emit("errormultiple",e,t,i),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()},(s=Dropzone).version="4.0.0-dev",s.options={},s.optionsForElement=function(e){return e.getAttribute("id")?s.options[t(e.getAttribute("id"))]:void 0},s.instances=[],s.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return e.dropzone},s.autoDiscover=!0,s.discover=function(){var e,t,r,i,n,o;for(document.querySelectorAll?r=document.querySelectorAll(".dropzone"):(r=[],(e=function(e){var el,t,i,n;for(n=[],t=0,i=e.length;t<i;t++)el=e[t],/(^| )dropzone($| )/.test(el.className)?n.push(r.push(el)):n.push(void 0);return n})(document.getElementsByTagName("div")),e(document.getElementsByTagName("form"))),o=[],i=0,n=r.length;i<n;i++)t=r[i],!1!==s.optionsForElement(t)?o.push(new s(t)):o.push(void 0);return o},s.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],s.isBrowserSupported=function(){var e,t,i,n;if(e=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(t=0,i=(n=s.blacklistedBrowsers).length;t<i;t++)n[t].test(navigator.userAgent)&&(e=!1);else e=!1;else e=!1;return e},r=function(e,t){var i,n,r,o;for(o=[],n=0,r=e.length;n<r;n++)(i=e[n])!==t&&o.push(i);return o},t=function(e){return e.replace(/[\-_](\w)/g,function(e){return e[1].toUpperCase()})},s.createElement=function(e){var t;return(t=document.createElement("div")).innerHTML=e,t.childNodes[0]},s.elementInside=function(e,t){if(e===t)return!0;for(;e=e.parentNode;)if(e===t)return!0;return!1},s.getElement=function(el,e){var t;if("string"==typeof el?t=document.querySelector(el):null!=el.nodeType&&(t=el),null==t)throw new Error("Invalid `"+e+"` option provided. Please provide a CSS selector or a plain HTML element.");return t},s.getElements=function(e,t){var el,i,n,r,o,s,l;if(e instanceof Array){i=[];try{for(n=0,o=e.length;n<o;n++)el=e[n],i.push(this.getElement(el,t))}catch(e){e,i=null}}else if("string"==typeof e)for(i=[],r=0,s=(l=document.querySelectorAll(e)).length;r<s;r++)el=l[r],i.push(el);else null!=e.nodeType&&(i=[e]);if(null==i||!i.length)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return i},s.confirm=function(e,t,i){return window.confirm(e)?t():null!=i?i():void 0},s.isValidFile=function(e,t){var i,n,r,o,s;if(!t)return!0;for(t=t.split(","),i=(n=e.type).replace(/\/.*$/,""),o=0,s=t.length;o<s;o++)if("."===(r=(r=t[o]).trim()).charAt(0)){if(-1!==e.name.toLowerCase().indexOf(r.toLowerCase(),e.name.length-r.length))return!0}else if(/\/\*$/.test(r)){if(i===r.replace(/\/.*$/,""))return!0}else if(n===r)return!0;return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(options){return this.each(function(){return new s(this,options)})}),null!=p?p.exports=s:window.Dropzone=s,s.ADDED="added",s.QUEUED="queued",s.ACCEPTED=s.QUEUED,s.UPLOADING="uploading",s.PROCESSING=s.UPLOADING,s.CANCELED="canceled",s.ERROR="error",s.SUCCESS="success",
/*
  
  Bugfix for iOS 6 and 7
  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
  based on the work of https://github.com/stomita/ios-imagefile-megapixel
  */
c=function(e){var t,i,n,r,o,s,l,a;for(e.naturalWidth,o=e.naturalHeight,(t=document.createElement("canvas")).width=1,t.height=o,(i=t.getContext("2d")).drawImage(e,0,0),n=i.getImageData(0,0,1,o).data,a=0,s=r=o;a<s;)0===n[4*(s-1)+3]?r=s:a=s,s=r+a>>1;return 0==(l=s/o)?1:l},h=function(e,t,i,n,r,o,s,l,a,p){var u;return u=c(t),e.drawImage(t,i,n,r,o,s,l,a,p/u)},
/*
  # contentloaded.js
  #
  # Author: Diego Perini (diego.perini at gmail.com)
  # Summary: cross-browser wrapper for DOMContentLoaded
  # Updated: 20101020
  # License: MIT
  # Version: 1.2
  #
  # URL:
  # http://javascript.nwbox.com/ContentLoaded/
  # http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
  */
i=function(t,fn){var e,i,n,r,o,s,l,a,p;if(p=!(n=!1),i=t.document,a=i.documentElement,e=i.addEventListener?"addEventListener":"attachEvent",l=i.addEventListener?"removeEventListener":"detachEvent",s=i.addEventListener?"":"on",r=function(e){if("readystatechange"!==e.type||"complete"===i.readyState)return("load"===e.type?t:i)[l](s+e.type,r,!1),!n&&(n=!0)?fn.call(t,e.type||e):void 0},o=function(){try{a.doScroll("left")}catch(e){return e,void setTimeout(o,50)}return r("poll")},"complete"!==i.readyState){if(i.createEventObject&&a.doScroll){try{p=!t.frameElement}catch(e){}p&&o()}return i[e](s+"DOMContentLoaded",r,!1),i[e](s+"readystatechange",r,!1),t[e](s+"load",r,!1)}},s._autoDiscoverFunction=function(){if(s.autoDiscover)return s.discover()},i(window,s._autoDiscoverFunction)}).call(this)}),require.alias("component-emitter/index.js","dropzone/deps/emitter/index.js"),require.alias("component-emitter/index.js","emitter/index.js"),"object"==typeof exports?module.exports=require("dropzone"):"function"==typeof define&&define.amd?define(function(){return require("dropzone")}):this.Dropzone=require("dropzone")}();
/*
International Telephone Input v3.7.1
https://github.com/Bluefieldscom/intl-tel-input.git
*/
// wrap in UMD - see https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
!function(factory){"function"==typeof define&&define.amd?define(["jquery"],function($){factory($,window,document)}):factory(jQuery,window,document)}(function($,window,document,undefined){"use strict";var n="intlTelInput",i=1,// give each instance it's own id for namespaced event handling
e={
// automatically format the number according to the selected country
autoFormat:!0,
// if there is just a dial code in the input: remove it on blur, and re-add it on focus
autoHideDialCode:!0,
// default country
defaultCountry:"",
// token for ipinfo - required for https or over 1000 daily page views support
ipinfoToken:"",
// don't insert international dial codes
nationalMode:!1,
// number type to use for placeholders
numberType:"MOBILE",
// display only these countries
onlyCountries:[],
// the countries at the top of the list. defaults to united states and united kingdom
preferredCountries:["us","gb"],
// make the dropdown the same width as the input
responsiveDropdown:!1,
// specify the path to the libphonenumber script to enable validation/formatting
utilsScript:""},s=38,o=40,l=13,r=27,u=43,h=65,c=90,p=48,f=57,g=32,m=8,y=46,v=17,C=91,I=224,a=!1;
// keep track of if the window.load event has fired as impossible to check after the fact
function Plugin(t,options){this.element=t,this.options=$.extend({},e,options),this._defaults=e,
// event namespace
this.ns="."+n+i++,
// Chrome, FF, Safari, IE9+
this.isGoodBrowser=Boolean(t.setSelectionRange),this.hadInitialPlaceholder=Boolean($(t).attr("placeholder")),this._name=n,this.init()}$(window).load(function(){a=!0}),Plugin.prototype={init:function(){var i=this;
// if defaultCountry is set to "auto", we must do a lookup first
if("auto"==this.options.defaultCountry){
// reset this in case lookup fails
this.options.defaultCountry="";var t="//ipinfo.io";this.options.ipinfoToken&&(t+="?token="+this.options.ipinfoToken),$.get(t,function(t){t&&t.country&&(i.options.defaultCountry=t.country.toLowerCase())},"jsonp").always(function(){i._ready()})}else this._ready()},_ready:function(){
// if in nationalMode, disable options relating to dial codes
this.options.nationalMode&&(this.options.autoHideDialCode=!1),
// IE Mobile doesn't support the keypress event (see issue 68) which makes autoFormat impossible
navigator.userAgent.match(/IEMobile/i)&&(this.options.autoFormat=!1),
// auto enable responsiveDropdown mode on small screens (dropdown is currently set to 430px in CSS)
window.innerWidth<500&&(this.options.responsiveDropdown=!0),
// process all the data: onlyCountries, preferredCountries etc
this._processCountryData(),
// generate the markup
this._generateMarkup(),
// set the initial state of the input value and the selected flag
this._setInitialState(),
// start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
this._initListeners()},
/********************
   *  PRIVATE METHODS
   ********************/
// prepare all of the country data, including onlyCountries and preferredCountries options
_processCountryData:function(){
// set the instances country data objects
this._setInstanceCountryData(),
// set the preferredCountries property
this._setPreferredCountries()},
// add a country code to this.countryCodes
_addCountryCode:function(t,i,e){i in this.countryCodes||(this.countryCodes[i]=[]);var n=e||0;this.countryCodes[i][n]=t},
// process onlyCountries array if present, and generate the countryCodes map
_setInstanceCountryData:function(){var t;
// process onlyCountries option
if(this.options.onlyCountries.length)for(this.countries=[],t=0;t<b.length;t++)-1!=$.inArray(b[t].iso2,this.options.onlyCountries)&&this.countries.push(b[t]);else this.countries=b;
// generate countryCodes map
for(this.countryCodes={},t=0;t<this.countries.length;t++){var i=this.countries[t];
// area codes
if(this._addCountryCode(i.iso2,i.dialCode,i.priority),i.areaCodes)for(var e=0;e<i.areaCodes.length;e++)
// full dial code is country code + dial code
this._addCountryCode(i.iso2,i.dialCode+i.areaCodes[e])}},
// process preferred countries - iterate through the preferences,
// fetching the country data for each one
_setPreferredCountries:function(){this.preferredCountries=[];for(var t=0;t<this.options.preferredCountries.length;t++){var i=this.options.preferredCountries[t],e=this._getCountryData(i,!1,!0);e&&this.preferredCountries.push(e)}},
// generate all of the markup for the plugin: the selected flag overlay, and the dropdown
_generateMarkup:function(){
// telephone input
this.telInput=$(this.element),
// containers (mostly for positioning)
this.telInput.wrap($("<div>",{class:"intl-tel-input"}));var t=$("<div>",{class:"flag-dropdown"}).insertAfter(this.telInput),i=$("<div>",{class:"selected-flag"}).appendTo(t);
// currently selected flag (displayed to left of input)
this.selectedFlagInner=$("<div>",{class:"flag"}).appendTo(i),
// CSS triangle
$("<div>",{class:"arrow"}).appendTo(this.selectedFlagInner),
// country list contains: preferred countries, then divider, then all countries
this.countryList=$("<ul>",{class:"country-list v-hide"}).appendTo(t),this.preferredCountries.length&&(this._appendListItems(this.preferredCountries,"preferred"),$("<li>",{class:"divider"}).appendTo(this.countryList)),this._appendListItems(this.countries,""),
// now we can grab the dropdown height, and hide it properly
this.dropdownHeight=this.countryList.outerHeight(),this.countryList.removeClass("v-hide").addClass("hide"),
// and set the width
this.options.responsiveDropdown&&this.countryList.outerWidth(this.telInput.outerWidth()),
// this is useful in lots of places
this.countryListItems=this.countryList.children(".country")},
// add a country <li> to the countryList <ul> container
_appendListItems:function(t,i){
// for each country
for(
// we create so many DOM elements, I decided it was faster to build a temp string
// and then add everything to the DOM in one go at the end
var e="",n=0;n<t.length;n++){var a=t[n];
// open the list item
e+="<li class='country "+i+"' data-dial-code='"+a.dialCode+"' data-country-code='"+a.iso2+"'>",
// add the flag
e+="<div class='flag "+a.iso2+"'></div>",
// and the country name and dial code
e+="<span class='country-name'>"+a.name+"</span>",e+="<span class='dial-code'>+"+a.dialCode+"</span>",
// close the list item
e+="</li>"}this.countryList.append(e)},
// set the initial state of the input value and the selected flag
_setInitialState:function(){var t,i=this.telInput.val();
// if there is a number, and it's valid, we can go ahead and set the flag, else fall back to default
this._getDialCode(i)?this._updateFlagFromNumber(i):(
// check the defaultCountry option, else fall back to the first in the list
t=this.options.defaultCountry?this._getCountryData(this.options.defaultCountry,!1,!1):this.preferredCountries.length?this.preferredCountries[0]:this.countries[0],this._selectFlag(t.iso2),
// if empty, insert the default dial code (this function will check !nationalMode and !autoHideDialCode)
i||this._updateDialCode(t.dialCode,!1));
// format
i&&
// this wont be run after _updateDialCode as that's only called if no val
this._updateVal(i,!1)},
// initialise the main event listeners: input keyup, and click selected flag
_initListeners:function(){var i=this;this._initKeyListeners(),
// autoFormat prevents the change event from firing, so we need to check for changes between focus and blur in order to manually trigger it
(this.options.autoHideDialCode||this.options.autoFormat)&&this._initFocusListeners();
// hack for input nested inside label: clicking the selected-flag to open the dropdown would then automatically trigger a 2nd click on the input which would close it again
var t=this.telInput.closest("label");t.length&&t.on("click"+this.ns,function(t){
// if the dropdown is closed, then focus the input, else ignore the click
i.countryList.hasClass("hide")?i.telInput.focus():t.preventDefault()}),this.selectedFlagInner.parent().on("click"+this.ns,function(t){
// only intercept this event if we're opening the dropdown
// else let it bubble up to the top ("click-off-to-close" listener)
// we cannot just stopPropagation as it may be needed to close another instance
i.countryList.hasClass("hide")&&!i.telInput.prop("disabled")&&i._showDropdown()}),
// if the user has specified the path to the utils script, fetch it on window.load
this.options.utilsScript&&(
// if the plugin is being initialised after the window.load event has already been fired
a?this.loadUtils():
// wait until the load event so we don't block any other requests e.g. the flags image
$(window).load(function(){i.loadUtils()}));
// toggle country dropdown on click
},_initKeyListeners:function(){var r=this;this.options.autoFormat&&
// format number and update flag on keypress
// use keypress event as we want to ignore all input except for a select few keys,
// but we dont want to ignore the navigation keys like the arrows etc.
// NOTE: no point in refactoring this to only bind these listeners on focus/blur because then you would need to have those 2 listeners running the whole time anyway...
this.telInput.on("keypress"+this.ns,function(t){
// 32 is space, and after that it's all chars (not meta/nav keys)
// this fix is needed for Firefox, which triggers keypress event for some meta/nav keys
// Update: also ignore if this is a metaKey e.g. FF and Safari trigger keypress on the v of Ctrl+v
// Update: also check that we have utils before we do any autoFormat stuff
if(t.which>=g&&!t.metaKey&&window.intlTelInputUtils){t.preventDefault();
// allowed keys are just numeric keys and plus
// we must allow plus for the case where the user does select-all and then hits plus to start typing a new number. we could refine this logic to first check that the selection contains a plus, but that wont work in old browsers, and I think it's overkill anyway
var i=t.which>=p&&t.which<=f||t.which==u,e=r.telInput[0],n=r.isGoodBrowser&&e.selectionStart==e.selectionEnd,a=r.telInput.attr("maxlength");
// first: ensure we dont go over maxlength. we must do this here to prevent adding digits in the middle of the number
// still reformat even if not an allowed key as they could by typing a formatting char, but ignore if there's a selection as doesn't make sense to replace selection with illegal char and then immediately remove it
if((!a||r.telInput.val().length<a)&&(i||n)){var s=i?String.fromCharCode(t.which):null;r._handleInputKey(s,!0)}i||r.telInput.trigger("invalidkey")}}),
// handle keyup event
// for autoFormat: we use keyup to catch delete events after the fact
this.telInput.on("keyup"+this.ns,function(t){
// the "enter" key event from selecting a dropdown item is triggered here on the input, because the document.keydown handler that initially handles that event triggers a focus on the input, and so the keyup for that same key event gets triggered here. weird, but just make sure we dont bother doing any re-formatting in this case (we've already done preventDefault in the keydown handler, so it wont actually submit the form or anything).
if(t.which!=l)if(r.options.autoFormat&&window.intlTelInputUtils){var i=t.which==v||t.which==C||t.which==I,e=r.telInput[0],// noSelection defaults to false for bad browsers, else would be reformatting on all ctrl keys e.g. select-all/copy
n=r.isGoodBrowser&&e.selectionStart==e.selectionEnd,// cursorAtEnd defaults to false for bad browsers else they would never get a reformat on delete
a=r.isGoodBrowser&&e.selectionStart==r.telInput.val().length;
// if delete in the middle: reformat with no suffix (no need to reformat if delete at end)
// if backspace: reformat with no suffix (need to reformat if at end to remove any lingering suffix - this is a feature)
// if ctrl and no selection (i.e. could have just been a paste): reformat (if cursorAtEnd: add suffix)
// prevent deleting the plus (if not in nationalMode)
if((t.which==y&&!a||t.which==m||i&&n)&&
// important to remember never to add suffix on any delete key as can fuck up in ie8 so you can never delete a formatting char at the end
r._handleInputKey(null,i&&a),!r.options.nationalMode){var s=r.telInput.val();if("+"!=s.substr(0,1)){
// newCursorPos is current pos + 1 to account for the plus we are about to add
var o=r.isGoodBrowser?e.selectionStart+1:0;r.telInput.val("+"+s),r.isGoodBrowser&&e.setSelectionRange(o,o)}}}else
// if no autoFormat, just update flag
r._updateFlagFromNumber(r.telInput.val())})},
// when autoFormat is enabled: handle various key events on the input: the 2 main situations are 1) adding a new number character, which will replace any selection, reformat, and try to preserve the cursor position. and 2) reformatting on backspace, or paste event
_handleInputKey:function(t,i){var e=this.telInput.val(),n=null,a=!1,// raw DOM element
s=this.telInput[0];if(this.isGoodBrowser){var o=s.selectionEnd,r=e.length;a=o==r,
// if handling a new number character: insert it in the right place and calculate the new cursor position
t?(
// replace any selection they may have made with the new char
e=e.substr(0,s.selectionStart)+t+e.substring(o,r),
// if the cursor was not at the end then calculate it's new pos
a||(n=o+(e.length-r))):
// here we're not handling a new char, we're just doing a re-format, but we still need to maintain the cursor position
n=s.selectionStart}else t&&(e+=t);
// update the number and flag
this.setNumber(e,i),
// update the cursor position
this.isGoodBrowser&&(
// if it was at the end, keep it there
a&&(n=this.telInput.val().length),s.setSelectionRange(n,n))},
// listen for focus and blur
_initFocusListeners:function(){var e=this;this.options.autoHideDialCode&&
// mousedown decides where the cursor goes, so if we're focusing we must preventDefault as we'll be inserting the dial code, and we want the cursor to be at the end no matter where they click
this.telInput.on("mousedown"+this.ns,function(t){e.telInput.is(":focus")||e.telInput.val()||(t.preventDefault(),
// but this also cancels the focus, so we must trigger that manually
e.telInput.focus())}),this.telInput.on("focus"+this.ns,function(){var t=e.telInput.val();
// save this to compare on blur
e.telInput.data("focusVal",t),e.options.autoHideDialCode&&(
// on focus: if empty, insert the dial code for the currently selected flag
t||(e._updateVal("+"+e.selectedCountryData.dialCode,!0),
// after auto-inserting a dial code, if the first key they hit is '+' then assume they are entering a new number, so remove the dial code. use keypress instead of keydown because keydown gets triggered for the shift key (required to hit the + key), and instead of keyup because that shows the new '+' before removing the old one
e.telInput.one("keypress.plus"+e.ns,function(t){if(t.which==u){
// if autoFormat is enabled, this key event will have already have been handled by another keypress listener (hence we need to add the "+"). if disabled, it will be handled after this by a keyup listener (hence no need to add the "+").
var i=e.options.autoFormat&&window.intlTelInputUtils?"+":"";e.telInput.val(i)}}),
// after tabbing in, make sure the cursor is at the end we must use setTimeout to get outside of the focus handler as it seems the selection happens after that
setTimeout(function(){var t=e.telInput[0];if(e.isGoodBrowser){var i=e.telInput.val().length;t.setSelectionRange(i,i)}})))}),this.telInput.on("blur"+this.ns,function(){if(e.options.autoHideDialCode){
// on blur: if just a dial code then remove it
var t=e.telInput.val();if("+"==t.substr(0,1)){var i=e._getNumeric(t);
// if just a plus, or if just a dial code
i&&e.selectedCountryData.dialCode!=i||e.telInput.val("")}
// remove the keypress listener we added on focus
e.telInput.off("keypress.plus"+e.ns)}
// if autoFormat, we must manually trigger change event if value has changed
e.options.autoFormat&&window.intlTelInputUtils&&e.telInput.val()!=e.telInput.data("focusVal")&&e.telInput.trigger("change")})},
// extract the numeric digits from the given string
_getNumeric:function(t){return t.replace(/\D/g,"")},
// show the dropdown
_showDropdown:function(){this._setDropdownPosition();
// update highlighting and scroll to active list item
var t=this.countryList.children(".active");this._highlightListItem(t),
// show it
this.countryList.removeClass("hide"),this._scrollTo(t),
// bind all the dropdown-related listeners: mouseover, click, click-off, keydown
this._bindDropdownListeners(),
// update the arrow
this.selectedFlagInner.children(".arrow").addClass("up")},
// decide where to position dropdown (depends on position within viewport, and scroll)
_setDropdownPosition:function(){var t=this.telInput.offset().top,i=$(window).scrollTop(),// dropdownFitsBelow = (dropdownBottom < windowBottom)
e=t+this.telInput.outerHeight()+this.dropdownHeight<i+$(window).height(),n=t-this.dropdownHeight>i,a=!e&&n?"-"+(this.dropdownHeight-1)+"px":"";
// dropdownHeight - 1 for border
this.countryList.css("top",a)},
// we only bind dropdown listeners when the dropdown is open
_bindDropdownListeners:function(){var i=this;
// when mouse over a list item, just highlight that one
// we add the class "highlight", so if they hit "enter" we know which one to select
this.countryList.on("mouseover"+this.ns,".country",function(t){i._highlightListItem($(this))}),
// listen for country selection
this.countryList.on("click"+this.ns,".country",function(t){i._selectListItem($(this))});
// click off to close
// (except when this initial opening click is bubbling up)
// we cannot just stopPropagation as it may be needed to close another instance
var e=!0;$("html").on("click"+this.ns,function(t){e||i._closeDropdown(),e=!1});
// listen for up/down scrolling, enter to select, or letters to jump to country name.
// use keydown as keypress doesn't fire for non-char keys and we want to catch if they
// just hit down and hold it to scroll down (no keyup event).
// listen on the document because that's where key events are triggered if no input has focus
var n="",a=null;$(document).on("keydown"+this.ns,function(t){
// prevent down key from scrolling the whole page,
// and enter key from submitting a form etc
t.preventDefault(),t.which==s||t.which==o?
// up and down to navigate
i._handleUpDownKey(t.which):t.which==l?
// enter to select
i._handleEnterKey():t.which==r?
// esc to close
i._closeDropdown():(t.which>=h&&t.which<=c||t.which==g)&&(
// upper case letters (note: keyup/keydown only return upper case letters)
// jump to countries that start with the query string
a&&clearTimeout(a),n+=String.fromCharCode(t.which),i._searchForCountry(n),
// if the timer hits 1 second, reset the query
a=setTimeout(function(){n=""},1e3))})},
// highlight the next/prev item in the list (and ensure it is visible)
_handleUpDownKey:function(t){var i=this.countryList.children(".highlight").first(),e=t==s?i.prev():i.next();e.length&&(
// skip the divider
e.hasClass("divider")&&(e=t==s?e.prev():e.next()),this._highlightListItem(e),this._scrollTo(e))},
// select the currently highlighted item
_handleEnterKey:function(){var t=this.countryList.children(".highlight").first();t.length&&this._selectListItem(t)},
// find the first list item whose name starts with the query string
_searchForCountry:function(t){for(var i=0;i<this.countries.length;i++)if(this._startsWith(this.countries[i].name,t)){var e=this.countryList.children("[data-country-code="+this.countries[i].iso2+"]").not(".preferred");
// update highlighting and scroll
this._highlightListItem(e),this._scrollTo(e,!0);break}},
// check if (uppercase) string a starts with string b
_startsWith:function(t,i){return t.substr(0,i.length).toUpperCase()==i},
// update the input's value to the given val
// if autoFormat=true, format it first according to the country-specific formatting rules
_updateVal:function(t,i){var e;if(this.options.autoFormat&&window.intlTelInputUtils){e=intlTelInputUtils.formatNumber(t,this.selectedCountryData.iso2,i);
// ensure we dont go over maxlength. we must do this here to truncate any formatting suffix, and also handle paste events
var n=this.telInput.attr("maxlength");n&&e.length>n&&(e=e.substr(0,n))}else
// no autoFormat, so just insert the original value
e=t;this.telInput.val(e)},
// check if need to select a new flag based on the given number
_updateFlagFromNumber:function(t){
// if we're in nationalMode and we're on US/Canada, make sure the number starts with a +1 so _getDialCode will be able to extract the area code
// update: if we dont yet have selectedCountryData, but we're here (trying to update the flag from the number), that means we're initialising the plugin with a number that already has a dial code, so fine to ignore this bit
this.options.nationalMode&&this.selectedCountryData&&"1"==this.selectedCountryData.dialCode&&"+"!=t.substr(0,1)&&(t="+1"+t);
// try and extract valid dial code from input
var i=this._getDialCode(t);if(i){
// check if one of the matching countries is already selected
var e=this.countryCodes[this._getNumeric(i)],n=!1;if(this.selectedCountryData)for(var a=0;a<e.length;a++)e[a]==this.selectedCountryData.iso2&&(n=!0);
// if a matching country is not already selected (or this is an unknown NANP area code): choose the first in the list
if(!n||this._isUnknownNanp(t,i))
// if using onlyCountries option, countryCodes[0] may be empty, so we must find the first non-empty index
for(var s=0;s<e.length;s++)if(e[s]){this._selectFlag(e[s]);break}}},
// check if the given number contains an unknown area code from the North American Numbering Plan i.e. the only dialCode that could be extracted was +1 but the actual number's length is >=4
_isUnknownNanp:function(t,i){return"+1"==i&&4<=this._getNumeric(t).length},
// remove highlighting from other list items and highlight the given item
_highlightListItem:function(t){this.countryListItems.removeClass("highlight"),t.addClass("highlight")},
// find the country data for the given country code
// the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
_getCountryData:function(t,i,e){for(var n=i?b:this.countries,a=0;a<n.length;a++)if(n[a].iso2==t)return n[a];if(e)return null;throw new Error("No country data for '"+t+"'")},
// select the given flag, update the placeholder and the active list item
_selectFlag:function(t){
// do this first as it will throw an error and stop if countryCode is invalid
this.selectedCountryData=this._getCountryData(t,!1,!1),this.selectedFlagInner.attr("class","flag "+t);
// update the selected country's title attribute
var i=this.selectedCountryData.name+": +"+this.selectedCountryData.dialCode;this.selectedFlagInner.parent().attr("title",i),
// and the input's placeholder
this._updatePlaceholder();
// update the active list item
var e=this.countryListItems.children(".flag."+t).first().parent();this.countryListItems.removeClass("active"),e.addClass("active")},
// update the input placeholder to an example number from the currently selected country
_updatePlaceholder:function(){if(window.intlTelInputUtils&&!this.hadInitialPlaceholder){var t=this.selectedCountryData.iso2,i=intlTelInputUtils.numberType[this.options.numberType||"FIXED_LINE"],e=intlTelInputUtils.getExampleNumber(t,this.options.nationalMode,i);this.telInput.attr("placeholder",e)}},
// called when the user selects a list item from the dropdown
_selectListItem:function(t){
// update selected flag and active list item
var i=t.attr("data-country-code");this._selectFlag(i),this._closeDropdown(),this._updateDialCode(t.attr("data-dial-code"),!0),
// always fire the change event as even if nationalMode=true (and we haven't updated the input val), the system as a whole has still changed - see country-sync example. think of it as making a selection from a select element.
this.telInput.trigger("change"),
// focus the input
this.telInput.focus()},
// close the dropdown and unbind any listeners
_closeDropdown:function(){this.countryList.addClass("hide"),
// update the arrow
this.selectedFlagInner.children(".arrow").removeClass("up"),
// unbind key events
$(document).off(this.ns),
// unbind click-off-to-close
$("html").off(this.ns),
// unbind hover and click listeners
this.countryList.off(this.ns)},
// check if an element is visible within it's container, else scroll until it is
_scrollTo:function(t,i){var e=this.countryList,n=e.height(),a=e.offset().top,s=a+n,o=t.outerHeight(),r=t.offset().top,l=r+o,u=r-a+e.scrollTop(),h=n/2-o/2;if(r<a)
// scroll up
i&&(u-=h),e.scrollTop(u);else if(s<l){
// scroll down
i&&(u+=h);var c=n-o;e.scrollTop(u-c)}},
// replace any existing dial code with the new one (if not in nationalMode)
// also we need to know if we're focusing for a couple of reasons e.g. if so, we want to add any formatting suffix, also if the input is empty and we're not in nationalMode, then we want to insert the dial code
_updateDialCode:function(t,i){var e,n=this.telInput.val();
// save having to pass this every time
if(t="+"+t,this.options.nationalMode&&"+"!=n.substr(0,1))
// if nationalMode, we just want to re-format
e=n;else if(n){
// if the previous number contained a valid dial code, replace it
// (if more than just a plus character)
var a=this._getDialCode(n);if(1<a.length)e=n.replace(a,t);else e=t+("+"!=n.substr(0,1)?$.trim(n):"")}else e=!this.options.autoHideDialCode||i?t:"";this._updateVal(e,i)},
// try and extract a valid international dial code from a full telephone number
// Note: returns the raw string inc plus character and any whitespace/dots etc
_getDialCode:function(t){var i="";
// only interested in international numbers (starting with a plus)
if("+"==t.charAt(0))
// iterate over chars
for(var e="",n=0;n<t.length;n++){var a=t.charAt(n);
// if char is number
if($.isNumeric(a)&&(e+=a,
// if current numericChars make a valid dial code
this.countryCodes[e]&&(
// store the actual raw string (useful for matching later)
i=t.substr(0,n+1)),4==e.length))break}return i},
/********************
   *  PUBLIC METHODS
   ********************/
// remove plugin
destroy:function(){
// make sure the dropdown is closed (and unbind listeners)
this._closeDropdown(),
// key events, and focus/blur events if autoHideDialCode=true
this.telInput.off(this.ns),
// click event to open dropdown
this.selectedFlagInner.parent().off(this.ns),
// label click hack
this.telInput.closest("label").off(this.ns),this.telInput.parent().before(this.telInput).remove()},
// format the number to E164
getCleanNumber:function(){return window.intlTelInputUtils?intlTelInputUtils.formatNumberE164(this.telInput.val(),this.selectedCountryData.iso2):""},
// get the type of the entered number e.g. landline/mobile
getNumberType:function(){return window.intlTelInputUtils?intlTelInputUtils.getNumberType(this.telInput.val(),this.selectedCountryData.iso2):-99},
// get the country data for the currently selected flag
getSelectedCountryData:function(){
// if this is undefined, the plugin will return it's instance instead, so in that case an empty object makes more sense
return this.selectedCountryData||{}},
// get the validation error
getValidationError:function(){return window.intlTelInputUtils?intlTelInputUtils.getValidationError(this.telInput.val(),this.selectedCountryData.iso2):-99},
// validate the input val - assumes the global function isValidNumber (from utilsScript)
isValidNumber:function(){var t=$.trim(this.telInput.val()),i=this.options.nationalMode?this.selectedCountryData.iso2:"";return!(/[a-zA-Z]/.test(t)||!window.intlTelInputUtils)&&intlTelInputUtils.isValidNumber(t,i)},
// load the utils script
loadUtils:function(path){var t=path||this.options.utilsScript;!$.fn[n].loadedUtilsScript&&t&&(
// don't do this twice! (dont just check if the global intlTelInputUtils exists as if init plugin multiple times in quick succession, it may not have finished loading yet)
$.fn[n].loadedUtilsScript=!0,
// dont use $.getScript as it prevents caching
$.ajax({url:t,success:function(){
// tell all instances the utils are ready
$(".intl-tel-input input").intlTelInput("utilsLoaded")},dataType:"script",cache:!0}))},
// update the selected flag, and update the input val accordingly
selectCountry:function(t){
// check if already selected
this.selectedFlagInner.hasClass(t)||(this._selectFlag(t),this._updateDialCode(this.selectedCountryData.dialCode,!1))},
// set the input value and update the flag
setNumber:function(t,i){
// ensure starts with plus
this.options.nationalMode||"+"==t.substr(0,1)||(t="+"+t),
// we must update the flag first, which updates this.selectedCountryData, which is used later for formatting the number before displaying it
this._updateFlagFromNumber(t),this._updateVal(t,i)},
// this is called when the utils are ready
utilsLoaded:function(){
// if autoFormat is enabled and there's an initial value in the input, then format it
this.options.autoFormat&&this.telInput.val()&&this._updateVal(this.telInput.val()),this._updatePlaceholder()}},
// adapted to allow public functions
// using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
$.fn[n]=function(options){var i,e=arguments;
// Is the first parameter an object (options), or was omitted,
// instantiate a new instance of the plugin.
return options===undefined||"object"==typeof options?this.each(function(){$.data(this,"plugin_"+n)||$.data(this,"plugin_"+n,new Plugin(this,options))}):"string"==typeof options&&"_"!==options[0]&&"init"!==options?(this.each(function(){var t=$.data(this,"plugin_"+n);
// Tests that there's already a plugin-instance
// and checks that the requested public method exists
t instanceof Plugin&&"function"==typeof t[options]&&(
// Call the method of our plugin instance,
// and pass it the supplied arguments.
i=t[options].apply(t,Array.prototype.slice.call(e,1))),
// Allow instances to be destroyed via the 'destroy' method
"destroy"===options&&$.data(this,"plugin_"+n,null)}),i!==undefined?i:this):void 0},
/********************
 *  STATIC METHODS
 ********************/
// get the country data object
$.fn[n].getCountryData=function(){return b},
// set the country data object
$.fn[n].setCountryData=function(t){b=t};
// loop over all of the countries above
for(
// Tell JSHint to ignore this warning: "character may get silently deleted by one or more browsers"
// jshint -W100
// Array of country objects for the flag dropdown.
// Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.
// Originally from https://github.com/mledoze/countries
// then modified using the following JavaScript (NOW OUT OF DATE):
/*
var result = [];
_.each(countries, function(c) {
  // ignore countries without a dial code
  if (c.callingCode[0].length) {
    result.push({
      // var locals contains country names with localised versions in brackets
      n: _.findWhere(locals, {
        countryCode: c.cca2
      }).name,
      i: c.cca2.toLowerCase(),
      d: c.callingCode[0]
    });
  }
});
JSON.stringify(result);
*/
// then with a couple of manual re-arrangements to be alphabetical
// then changed Kazakhstan from +76 to +7
// and Vatican City from +379 to +39 (see issue 50)
// and Caribean Netherlands from +5997 to +599
// and Curacao from +5999 to +599
// Removed: Åland Islands, Christmas Island, Cocos Islands, Guernsey, Isle of Man, Jersey, Kosovo, Mayotte, Pitcairn Islands, South Georgia, Svalbard, Western Sahara
// Update: converted objects to arrays to save bytes!
// Update: added "priority" for countries with the same dialCode as others
// Update: added array of area codes for countries with the same dialCode as others
// So each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes (if >1 country with same dial code)
// ]
var b=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61"],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1246"],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32"],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86"],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (República Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358"],["France","fr","33"],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (香港)","hk","852"],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354"],["India (भारत)","in","91"],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353"],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1876"],["Japan (日本)","jp","81"],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (‫المغرب‬‎)","ma","212"],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47"],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92"],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262"],["Romania (România)","ro","40"],["Russia (Россия)","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy (Saint-Barthélemy)","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie française))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34"],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44"],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"]],t=0;t<b.length;t++){var _=b[t];b[t]={name:_[0],iso2:_[1],dialCode:_[2],priority:_[3]||0,areaCodes:_[4]||null}}});
/* =============================================================
 * bootstrap-combobox.js v1.1.6
 * =============================================================
 * Copyright 2012 Daniel Farrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($){"use strict";
/* COMBOBOX PUBLIC CLASS DEFINITION
  * ================================ */function Combobox(element,options){this.options=$.extend({},$.fn.combobox.defaults,options),this.$source=$(element),this.$container=this.setup(),this.$element=this.$container.find("input[type=text]"),this.$target=this.$container.find("input[type=hidden]"),this.$button=this.$container.find(".dropdown-toggle"),this.$menu=$(this.options.menu).appendTo("body"),this.template=this.options.template||this.template,this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.shown=!1,this.selected=!1,this.refresh(),this.transferAttributes(),this.listen()}Combobox.prototype={constructor:Combobox,setup:function(){var t=$(this.template());return this.$source.before(t),this.$source.hide(),t},disable:function(){this.$element.prop("disabled",!0),this.$button.attr("disabled",!0),this.disabled=!0,this.$container.addClass("combobox-disabled")},enable:function(){this.$element.prop("disabled",!1),this.$button.attr("disabled",!1),this.disabled=!1,this.$container.removeClass("combobox-disabled")},parse:function(){var e=this,s={},i=[],o=!1,n="";return this.$source.find("option").each(function(){var t=$(this);""!==t.val()?(s[t.text()]=t.val(),i.push(t.text()),t.prop("selected")&&(o=t.text(),n=t.val())):e.options.placeholder=t.text()}),this.map=s,o&&(this.$element.val(o),this.$target.val(n),this.$container.addClass("combobox-selected"),this.selected=!0),i},transferAttributes:function(){this.options.placeholder=this.$source.attr("data-placeholder")||this.options.placeholder,this.$element.attr("placeholder",this.options.placeholder),this.$element.prop("name",this.$source.prop("name")+"-1"),this.$element.prop("id",this.$source.prop("name")+"-1"),this.$target.prop("name",this.$source.prop("name")),this.$target.val(this.$source.val()),this.$source.removeAttr("name"),// Remove from source otherwise form will pass parameter twice.
this.$element.attr("required",this.$source.attr("required")),this.$element.attr("rel",this.$source.attr("rel")),this.$element.attr("title",this.$source.attr("title")),this.$element.attr("class",this.$source.attr("class")),this.$element.attr("tabindex",this.$source.attr("tabindex")),this.$source.removeAttr("tabindex"),void 0!==this.$source.attr("disabled")&&this.disable()},select:function(){var t=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(t)).trigger("change"),this.$target.val(this.map[t]).trigger("change"),this.$source.val(this.map[t]).trigger("change"),this.$container.addClass("combobox-selected"),this.selected=!0,this.hide()},updater:function(t){return t},show:function(){var t=$.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),$(".dropdown-menu").on("mousedown",$.proxy(this.scrollSafety,this)),this.shown=!0,this},hide:function(){return this.$menu.hide(),$(".dropdown-menu").off("mousedown",$.proxy(this.scrollSafety,this)),this.$element.on("blur",$.proxy(this.blur,this)),this.shown=!1,this},lookup:function(t){return this.query=this.$element.val(),this.process(this.source)},process:function(t){var e=this;return t=$.grep(t,function(t){return e.matcher(t)}),(t=this.sorter(t)).length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},template:function(){return"2"==this.options.bsVersion?'<div class="combobox-container"><input type="hidden" /> <div class="input-append"> <input type="text" autocomplete="off" /> <span class="add-on btn dropdown-toggle" data-dropdown="dropdown"> <span class="caret"/> <span class="combobox-clear"><i class="icon-remove"/></span> </span> </div> </div>':'<div class="combobox-container"> <input type="hidden" /> <div class="input-group"> <input type="text" autocomplete="off" /> <span class="input-group-addon dropdown-toggle" data-dropdown="dropdown"> <span class="caret" /> <span class="glyphicon glyphicon-remove" /> </span> </div> </div>'},matcher:function(t){return~t.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(t){for(var e,s=[],i=[],o=[];e=t.shift();)e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?i.push(e):o.push(e):s.push(e);return s.concat(i,o)},highlighter:function(t){var e=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return t.replace(new RegExp("("+e+")","ig"),function(t,e){return"<strong>"+e+"</strong>"})},render:function(t){var s=this;return(t=$(t).map(function(t,e){return(t=$(s.options.item).attr("data-value",e)).find("a").html(s.highlighter(e)),t[0]})).first().addClass("active"),this.$menu.html(t),this},next:function(t){var e=this.$menu.find(".active").removeClass("active").next();e.length||(e=$(this.$menu.find("li")[0])),e.addClass("active")},prev:function(t){var e=this.$menu.find(".active").removeClass("active").prev();e.length||(e=this.$menu.find("li").last()),e.addClass("active")},toggle:function(){this.disabled||(this.$container.hasClass("combobox-selected")?(this.clearTarget(),this.triggerChange(),this.clearElement()):this.shown?this.hide():(this.clearElement(),this.lookup()))},scrollSafety:function(t){"UL"==t.target.tagName&&this.$element.off("blur")},clearElement:function(){this.$element.val("").focus()},clearTarget:function(){this.$source.val(""),this.$target.val(""),this.$container.removeClass("combobox-selected"),this.selected=!1},triggerChange:function(){this.$source.trigger("change")},refresh:function(){this.source=this.parse(),this.options.items=this.source.length},listen:function(){this.$element.on("focus",$.proxy(this.focus,this)).on("blur",$.proxy(this.blur,this)).on("keypress",$.proxy(this.keypress,this)).on("keyup",$.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",$.proxy(this.keydown,this)),this.$menu.on("click",$.proxy(this.click,this)).on("mouseenter","li",$.proxy(this.mouseenter,this)).on("mouseleave","li",$.proxy(this.mouseleave,this)),this.$button.on("click",$.proxy(this.toggle,this))},eventSupported:function(t){var e=t in this.$element;return e||(this.$element.setAttribute(t,"return;"),e="function"==typeof this.$element[t]),e},move:function(t){if(this.shown){switch(t.keyCode){case 9:// tab
case 13:// enter
case 27:// escape
t.preventDefault();break;case 38:// up arrow
t.preventDefault(),this.prev();break;case 40:// down arrow
t.preventDefault(),this.next()}t.stopPropagation()}},keydown:function(t){this.suppressKeyPressRepeat=~$.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(t){this.suppressKeyPressRepeat||this.move(t)},keyup:function(t){switch(t.keyCode){case 40:// down arrow
case 39:// right arrow
case 38:// up arrow
case 37:// left arrow
case 36:// home
case 35:// end
case 16:// shift
case 17:// ctrl
case 18:// alt
break;case 9:// tab
case 13:// enter
if(!this.shown)return;this.select();break;case 27:// escape
if(!this.shown)return;this.hide();break;default:this.clearTarget(),this.lookup()}t.stopPropagation(),t.preventDefault()},focus:function(t){this.focused=!0},blur:function(t){var e=this;this.focused=!1;var s=this.$element.val();this.selected||""===s||(this.$element.val(""),this.$source.val("").trigger("change"),this.$target.val("").trigger("change")),!this.mousedover&&this.shown&&setTimeout(function(){e.hide()},200)},click:function(t){t.stopPropagation(),t.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),$(t.currentTarget).addClass("active")},mouseleave:function(t){this.mousedover=!1}},
/* COMBOBOX PLUGIN DEFINITION
   * =========================== */
$.fn.combobox=function(s){return this.each(function(){var t=$(this),e=t.data("combobox"),options="object"==typeof s&&s;e||t.data("combobox",e=new Combobox(this,options)),"string"==typeof s&&e[s]()})},$.fn.combobox.defaults={bsVersion:"2",menu:'<ul class="typeahead typeahead-long dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'},$.fn.combobox.Constructor=Combobox}(window.jQuery);
/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/
!function($){var l=$(window),c=l.height();l.resize(function(){c=l.height()}),$.fn.parallax=function(o,r,e,t){var i,a,s=$(this);
// function to be called whenever the window is scrolled or resized
function update(){var n=l.scrollTop();s.each(function(){var e=$(this),t=e.offset().top;
// Check if totally above or totally below viewport
t+i(e)<n||n+c<t||s.css("backgroundPosition",o+" "+Math.round((a-n)*r)+"px")})}
//get the starting position of each element to have parallax applied to it		
s.each(function(){a=s.offset().top}),i=e?function(e){return e.outerHeight(!0)}:function(e){return e.height()},
// setup defaults if arguments aren't specified
(arguments.length<1||null===o)&&(o="50%"),(arguments.length<2||null===r)&&(r=.1),(arguments.length<3||null===e)&&(e=!0),l.bind("scroll",update).resize(update),update()}}(jQuery),function($){var e=location.href.replace(/#.*/,""),o=$.localScroll=function(e){$("body").localScroll(e)};function i(e,t,n){var d=t.hash.slice(1),o=document.getElementById(d)||document.getElementsByName(d)[0];if(o){e&&e.preventDefault();var r=$(n.target);if(!(n.lock&&r.is(":animated")||n.onBefore&&!1===n.onBefore.call(n,e,o,r))){if(n.stop&&r.stop(!0),n.hash){var i=o.id==d?"id":"name",a=$("<a> </a>").attr(i,d).css({position:"absolute",top:$(window).scrollTop(),left:$(window).scrollLeft()});o[i]="",$("body").prepend(a),location=t.hash,a.remove(),o[i]=d}r.scrollTo(o,n).trigger("notify.serialScroll",[o])}}}o.defaults={duration:1e3,axis:"y",event:"click",stop:!0,target:window,reset:!0},o.hash=function(e){if(location.hash){if((e=$.extend({},o.defaults,e)).hash=!1,e.reset){var t=e.duration;delete e.duration,$(e.target).scrollTo(0,e),e.duration=t}i(0,location,e)}},$.fn.localScroll=function(n){return(n=$.extend({},o.defaults,n)).lazy?this.bind(n.event,function(e){var t=$([e.target,e.target.parentNode]).filter(d)[0];t&&i(e,t,n)}):this.find("a,area").filter(d).bind(n.event,function(e){i(e,this,n)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,"")==e&&(!n.filter||$(this).is(n.filter))}}}(jQuery),function(d){var w=d.scrollTo=function(e,t,n){d(window).scrollTo(e,t,n)};function p(e){return"object"==typeof e?e:{top:e,left:e}}w.defaults={axis:"xy",duration:1.3<=parseFloat(d.fn.jquery)?0:1},w.window=function(e){return d(window)._scrollable()},d.fn._scrollable=function(){return this.map(function(){var e=this;if(!(!e.nodeName||-1!=d.inArray(e.nodeName.toLowerCase(),["iframe","#document","html","body"])))return e;var t=(e.contentWindow||e).document||e.ownerDocument||e;return d.browser.safari||"BackCompat"==t.compatMode?t.body:t.documentElement})},d.fn.scrollTo=function(n,o,g){return"object"==typeof o&&(g=o,o=0),"function"==typeof g&&(g={onAfter:g}),"max"==n&&(n=9e9),g=d.extend({},w.defaults,g),o=o||g.speed||g.duration,g.queue=g.queue&&1<g.axis.length,g.queue&&(o/=2),g.offset=p(g.offset),g.over=p(g.over),this._scrollable().each(function(){var c,f=this,u=d(f),h=n,m={},v=u.is("html,body");switch(typeof h){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(h)){h=p(h);break}h=d(h,this);case"object":(h.is||h.style)&&(c=(h=d(h)).offset())}function t(e){u.animate(m,o,g.easing,e&&function(){e.call(this,n,g)})}d.each(g.axis.split(""),function(e,n){var o="x"==n?"Left":"Top",r=o.toLowerCase(),i="scroll"+o,a=f[i],s=w.max(f,n);if(c)m[i]=c[r]+(v?0:a-u.offset()[r]),g.margin&&(m[i]-=parseInt(h.css("margin"+o))||0,m[i]-=parseInt(h.css("border"+o+"Width"))||0),m[i]+=g.offset[r]||0,g.over[r]&&(m[i]+=h["x"==n?"width":"height"]()*g.over[r]);else{var l=h[r];m[i]=l.slice&&"%"==l.slice(-1)?parseFloat(l)/100*s:l}/^\d+$/.test(m[i])&&(m[i]=m[i]<=0?0:Math.min(m[i],s)),!e&&g.queue&&(a!=m[i]&&t(g.onAfterFirst),delete m[i])}),t(g.onAfter)}).end()},w.max=function(e,t){var n="x"==t?"Width":"Height",o="scroll"+n;if(!d(e).is("html,body"))return e[o]-d(e)[n.toLowerCase()]();var r="client"+n,i=e.ownerDocument.documentElement,a=e.ownerDocument.body;return Math.max(i[o],a[o])-Math.min(i[r],a[r])}}(jQuery);
(function(h, o, g) {
    var p = function() {
        for (var b = /plugins(.min)?.js.*/, a = document.getElementsByTagName("script"), c = 0, d = a.length; c < d; c++) {
            var e = a[c].getAttribute("src");
            if (b.test(e))
                return e.replace(b, "")
        }
    }();
    g[h] = {
        instanceCount: 0,
        instances: {},
        flashSource: '      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">         <param name="movie" value="$2?playerInstance=' + h + '.instances[\'$1\']&datetime=$3">         <param name="allowscriptaccess" value="always">         <embed name="$1" src="$2?playerInstance=' + h + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',
        settings: {
            autoplay: false,
            loop: false,
            preload: true,
            imageLocation: p + "../img/player-graphics.gif",
            swfLocation: p + "audiojs.swf",
            useFlash: function() {
                var b = document.createElement("audio");
                return !(b.canPlayType && b.canPlayType("audio/mpeg;").replace(/no/, ""))
            }(),
            hasFlash: function() {
                if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"])
                    return true;
                else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                    var b = navigator.mimeTypes["application/x-shockwave-flash"];
                    return b && b.enabledPlugin
                } else
                    try {
                        new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        return true
                    } catch (a) {}
                return false
            }(),
            createPlayer: {
                markup: '          <div class="play-pause">             <p class="play"></p>             <p class="pause"></p>             <p class="loading"></p>             <p class="error"></p>           </div>           <div class="scrubber">             <div class="progress"></div>             <div class="loaded"></div>           </div>           <div class="time">             <em class="played">00:00</em>/<strong class="duration">00:00</strong>           </div>           <div class="error-message"></div>',
                playPauseClass: "play-pause",
                scrubberClass: "scrubber",
                progressClass: "progress",
                loaderClass: "loaded",
                timeClass: "time",
                durationClass: "duration",
                playedClass: "played",
                errorMessageClass: "error-message",
                playingClass: "playing",
                loadingClass: "loading",
                errorClass: "error"
            },
            css: '        .audiojs audio { position: absolute; left: -1px; }         .audiojs { width: 460px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444));           background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%);           -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);           -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); }         .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; }         .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; }         .audiojs .play { display: block; }         .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; }         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc));           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); }         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222));           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); }         .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); }         .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; }         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; }         .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff;           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; }                 .audiojs .play { background: url("$1") -2px -1px no-repeat; }         .audiojs .loading { background: url("$1") -2px -31px no-repeat; }         .audiojs .error { background: url("$1") -2px -61px no-repeat; }         .audiojs .pause { background: url("$1") -2px -91px no-repeat; }                 .playing .play, .playing .loading, .playing .error { display: none; }         .playing .pause { display: block; }                 .loading .play, .loading .pause, .loading .error { display: none; }         .loading .loading { display: block; }                 .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; }         .error .error { display: block; }         .error .play-pause p { cursor: auto; }         .error .error-message { display: block; }',
            trackEnded: function() {},
            flashError: function() {
                var b = this.settings.createPlayer
                  , a = j(b.errorMessageClass, this.wrapper)
                  , c = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
                if (this.mp3)
                    c += ' <a href="' + this.mp3 + '">Download audio file</a>.';
                g[h].helpers.removeClass(this.wrapper, b.loadingClass);
                g[h].helpers.addClass(this.wrapper, b.errorClass);
                a.innerHTML = c
            },
            loadError: function() {
                var b = this.settings.createPlayer
                  , a = j(b.errorMessageClass, this.wrapper);
                g[h].helpers.removeClass(this.wrapper, b.loadingClass);
                g[h].helpers.addClass(this.wrapper, b.errorClass);
                a.innerHTML = 'Error loading: "' + this.mp3 + '"'
            },
            init: function() {
                g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.loadingClass)
            },
            loadStarted: function() {
                var b = this.settings.createPlayer
                  , a = j(b.durationClass, this.wrapper)
                  , c = Math.floor(this.duration / 60)
                  , d = Math.floor(this.duration % 60);
                g[h].helpers.removeClass(this.wrapper, b.loadingClass);
                a.innerHTML = (c < 10 ? "0" : "") + c + ":" + (d < 10 ? "0" : "") + d
            },
            loadProgress: function(b) {
                var a = this.settings.createPlayer
                  , c = j(a.scrubberClass, this.wrapper);
                j(a.loaderClass, this.wrapper).style.width = c.offsetWidth * b + "px"
            },
            playPause: function() {
                this.playing ? this.settings.play() : this.settings.pause()
            },
            play: function() {
                g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.playingClass)
            },
            pause: function() {
                g[h].helpers.removeClass(this.wrapper, this.settings.createPlayer.playingClass)
            },
            updatePlayhead: function(b) {
                var a = this.settings.createPlayer
                  , c = j(a.scrubberClass, this.wrapper);
                j(a.progressClass, this.wrapper).style.width = c.offsetWidth * b + "px";
                a = j(a.playedClass, this.wrapper);
                c = this.duration * b;
                b = Math.floor(c / 60);
                c = Math.floor(c % 60);
                a.innerHTML = (b < 10 ? "0" : "") + b + ":" + (c < 10 ? "0" : "") + c
            }
        },
        create: function(b, a) {
            a = a || {};
            return b.length ? this.createAll(a, b) : this.newInstance(b, a)
        },
        createAll: function(b, a) {
            var c = a || document.getElementsByTagName("audio")
              , d = [];
            b = b || {};
            for (var e = 0, i = c.length; e < i; e++)
                d.push(this.newInstance(c[e], b));
            return d
        },
        newInstance: function(b, a) {
            var c = this.helpers.clone(this.settings)
              , d = "audiojs" + this.instanceCount
              , e = "audiojs_wrapper" + this.instanceCount;
            this.instanceCount++;
            if (b.getAttribute("autoplay") != null)
                c.autoplay = true;
            if (b.getAttribute("loop") != null)
                c.loop = true;
            if (b.getAttribute("preload") == "none")
                c.preload = false;
            a && this.helpers.merge(c, a);
            if (c.createPlayer.markup)
                b = this.createPlayer(b, c.createPlayer, e);
            else
                b.parentNode.setAttribute("id", e);
            e = new g[o](b,c);
            c.css && this.helpers.injectCss(e, c.css);
            if (c.useFlash && c.hasFlash) {
                this.injectFlash(e, d);
                this.attachFlashEvents(e.wrapper, e)
            } else
                c.useFlash && !c.hasFlash && this.settings.flashError.apply(e);
            if (!c.useFlash || c.useFlash && c.hasFlash)
                this.attachEvents(e.wrapper, e);
            return this.instances[d] = e
        },
        createPlayer: function(b, a, c) {
            var d = document.createElement("div")
              , e = b.cloneNode(true);
            d.setAttribute("class", "audiojs");
            d.setAttribute("className", "audiojs");
            d.setAttribute("id", c);
            if (e.outerHTML && !document.createElement("audio").canPlayType) {
                e = this.helpers.cloneHtml5Node(b);
                d.innerHTML = a.markup;
                d.appendChild(e);
                b.outerHTML = d.outerHTML;
                d = document.getElementById(c)
            } else {
                d.appendChild(e);
                d.innerHTML += a.markup;
                b.parentNode.replaceChild(d, b)
            }
            return d.getElementsByTagName("audio")[0]
        },
        attachEvents: function(b, a) {
            if (a.settings.createPlayer) {
                var c = a.settings.createPlayer
                  , d = j(c.playPauseClass, b)
                  , e = j(c.scrubberClass, b);
                g[h].events.addListener(d, "click", function() {
                    a.playPause.apply(a)
                });
                g[h].events.addListener(e, "click", function(i) {
                    i = i.clientX;
                    var f = this
                      , k = 0;
                    if (f.offsetParent) {
                        do
                            k += f.offsetLeft;
                        while (f = f.offsetParent)
                    }
                    a.skipTo((i - k) / e.offsetWidth)
                });
                if (!a.settings.useFlash) {
                    g[h].events.trackLoadProgress(a);
                    g[h].events.addListener(a.element, "timeupdate", function() {
                        a.updatePlayhead.apply(a)
                    });
                    g[h].events.addListener(a.element, "ended", function() {
                        a.trackEnded.apply(a)
                    });
                    g[h].events.addListener(a.source, "error", function() {
                        clearInterval(a.readyTimer);
                        clearInterval(a.loadTimer);
                        a.settings.loadError.apply(a)
                    })
                }
            }
        },
        attachFlashEvents: function(b, a) {
            a.swfReady = false;
            a.load = function(c) {
                a.mp3 = c;
                a.swfReady && a.element.load(c)
            }
            ;
            a.loadProgress = function(c, d) {
                a.loadedPercent = c;
                a.duration = d;
                a.settings.loadStarted.apply(a);
                a.settings.loadProgress.apply(a, [c])
            }
            ;
            a.skipTo = function(c) {
                if (!(c > a.loadedPercent)) {
                    a.updatePlayhead.call(a, [c]);
                    a.element.skipTo(c)
                }
            }
            ;
            a.updatePlayhead = function(c) {
                a.settings.updatePlayhead.apply(a, [c])
            }
            ;
            a.play = function() {
                if (!a.settings.preload) {
                    a.settings.preload = true;
                    a.element.init(a.mp3)
                }
                a.playing = true;
                a.element.pplay();
                a.settings.play.apply(a)
            }
            ;
            a.pause = function() {
                a.playing = false;
                a.element.ppause();
                a.settings.pause.apply(a)
            }
            ;
            a.setVolume = function(c) {
                a.element.setVolume(c)
            }
            ;
            a.loadStarted = function() {
                a.swfReady = true;
                a.settings.preload && a.element.init(a.mp3);
                a.settings.autoplay && a.play.apply(a)
            }
        },
        injectFlash: function(b, a) {
            var c = this.flashSource.replace(/\$1/g, a);
            c = c.replace(/\$2/g, b.settings.swfLocation);
            c = c.replace(/\$3/g, +new Date + Math.random());
            var d = b.wrapper.innerHTML
              , e = document.createElement("div");
            e.innerHTML = c + d;
            b.wrapper.innerHTML = e.innerHTML;
            b.element = this.helpers.getSwf(a)
        },
        helpers: {
            merge: function(b, a) {
                for (attr in a)
                    if (b.hasOwnProperty(attr) || a.hasOwnProperty(attr))
                        b[attr] = a[attr]
            },
            clone: function(b) {
                if (b == null || typeof b !== "object")
                    return b;
                var a = new b.constructor, c;
                for (c in b)
                    a[c] = arguments.callee(b[c]);
                return a
            },
            addClass: function(b, a) {
                RegExp("(\\s|^)" + a + "(\\s|$)").test(b.className) || (b.className += " " + a)
            },
            removeClass: function(b, a) {
                b.className = b.className.replace(RegExp("(\\s|^)" + a + "(\\s|$)"), " ")
            },
            injectCss: function(b, a) {
                for (var c = "", d = document.getElementsByTagName("style"), e = a.replace(/\$1/g, b.settings.imageLocation), i = 0, f = d.length; i < f; i++) {
                    var k = d[i].getAttribute("title");
                    if (k && ~k.indexOf("audiojs")) {
                        f = d[i];
                        if (f.innerHTML === e)
                            return;
                        c = f.innerHTML;
                        break
                    }
                }
                d = document.getElementsByTagName("head")[0];
                i = d.firstChild;
                f = document.createElement("style");
                if (d) {
                    f.setAttribute("type", "text/css");
                    f.setAttribute("title", "audiojs");
                    if (f.styleSheet)
                        f.styleSheet.cssText = c + e;
                    else
                        f.appendChild(document.createTextNode(c + e));
                    i ? d.insertBefore(f, i) : d.appendChild(styleElement)
                }
            },
            cloneHtml5Node: function(b) {
                var a = document.createDocumentFragment()
                  , c = a.createElement ? a : document;
                c.createElement("audio");
                c = c.createElement("div");
                a.appendChild(c);
                c.innerHTML = b.outerHTML;
                return c.firstChild
            },
            getSwf: function(b) {
                b = document[b] || window[b];
                return b.length > 1 ? b[b.length - 1] : b
            }
        },
        events: {
            memoryLeaking: false,
            listeners: [],
            addListener: function(b, a, c) {
                if (b.addEventListener)
                    b.addEventListener(a, c, false);
                else if (b.attachEvent) {
                    this.listeners.push(b);
                    if (!this.memoryLeaking) {
                        window.attachEvent("onunload", function() {
                            if (this.listeners)
                                for (var d = 0, e = this.listeners.length; d < e; d++)
                                    g[h].events.purge(this.listeners[d])
                        });
                        this.memoryLeaking = true
                    }
                    b.attachEvent("on" + a, function() {
                        c.call(b, window.event)
                    })
                }
            },
            trackLoadProgress: function(b) {
                if (b.settings.preload) {
                    var a, c;
                    b = b;
                    var d = /(ipod|iphone|ipad)/i.test(navigator.userAgent);
                    a = setInterval(function() {
                        if (b.element.readyState > -1)
                            d || b.init.apply(b);
                        if (b.element.readyState > 1) {
                            b.settings.autoplay && b.play.apply(b);
                            clearInterval(a);
                            c = setInterval(function() {
                                b.loadProgress.apply(b);
                                b.loadedPercent >= 1 && clearInterval(c)
                            })
                        }
                    }, 10);
                    b.readyTimer = a;
                    b.loadTimer = c
                }
            },
            purge: function(b) {
                var a = b.attributes, c;
                if (a)
                    for (c = 0; c < a.length; c += 1)
                        if (typeof b[a[c].name] === "function")
                            b[a[c].name] = null;
                if (a = b.childNodes)
                    for (c = 0; c < a.length; c += 1)
                        purge(b.childNodes[c])
            },
            ready: function() {
                return function(b) {
                    var a = window
                      , c = false
                      , d = true
                      , e = a.document
                      , i = e.documentElement
                      , f = e.addEventListener ? "addEventListener" : "attachEvent"
                      , k = e.addEventListener ? "removeEventListener" : "detachEvent"
                      , n = e.addEventListener ? "" : "on"
                      , m = function(l) {
                        if (!(l.type == "readystatechange" && e.readyState != "complete")) {
                            (l.type == "load" ? a : e)[k](n + l.type, m, false);
                            if (!c && (c = true))
                                b.call(a, l.type || l)
                        }
                    }
                      , q = function() {
                        try {
                            i.doScroll("left")
                        } catch (l) {
                            setTimeout(q, 50);
                            return
                        }
                        m("poll")
                    };
                    if (e.readyState == "complete")
                        b.call(a, "lazy");
                    else {
                        if (e.createEventObject && i.doScroll) {
                            try {
                                d = !a.frameElement
                            } catch (r) {}
                            d && q()
                        }
                        e[f](n + "DOMContentLoaded", m, false);
                        e[f](n + "readystatechange", m, false);
                        a[f](n + "load", m, false)
                    }
                }
            }()
        }
    };
    g[o] = function(b, a) {
        this.element = b;
        this.wrapper = b.parentNode;
        this.source = b.getElementsByTagName("source")[0] || b;
        this.mp3 = function(c) {
            var d = c.getElementsByTagName("source")[0];
            return c.getAttribute("src") || (d ? d.getAttribute("src") : null)
        }(b);
        this.settings = a;
        this.loadStartedCalled = false;
        this.loadedPercent = 0;
        this.duration = 1;
        this.playing = false
    }
    ;
    g[o].prototype = {
        updatePlayhead: function() {
            this.settings.updatePlayhead.apply(this, [this.element.currentTime / this.duration])
        },
        skipTo: function(b) {
            if (!(b > this.loadedPercent)) {
                this.element.currentTime = this.duration * b;
                this.updatePlayhead()
            }
        },
        load: function(b) {
            this.loadStartedCalled = false;
            this.source.setAttribute("src", b);
            this.element.load();
            this.mp3 = b;
            g[h].events.trackLoadProgress(this)
        },
        loadError: function() {
            this.settings.loadError.apply(this)
        },
        init: function() {
            this.settings.init.apply(this)
        },
        loadStarted: function() {
            if (!this.element.duration)
                return false;
            this.duration = this.element.duration;
            this.updatePlayhead();
            this.settings.loadStarted.apply(this)
        },
        loadProgress: function() {
            if (this.element.buffered != null && this.element.buffered.length) {
                if (!this.loadStartedCalled)
                    this.loadStartedCalled = this.loadStarted();
                this.loadedPercent = this.element.buffered.end(this.element.buffered.length - 1) / this.duration;
                this.settings.loadProgress.apply(this, [this.loadedPercent])
            }
        },
        playPause: function() {
            this.playing ? this.pause() : this.play()
        },
        play: function() {
            /(ipod|iphone|ipad)/i.test(navigator.userAgent) && this.element.readyState == 0 && this.init.apply(this);
            if (!this.settings.preload) {
                this.settings.preload = true;
                this.element.setAttribute("preload", "auto");
                g[h].events.trackLoadProgress(this)
            }
            this.playing = true;
            this.element.play();
            this.settings.play.apply(this)
        },
        pause: function() {
            this.playing = false;
            this.element.pause();
            this.settings.pause.apply(this)
        },
        setVolume: function(b) {
            this.element.volume = b
        },
        trackEnded: function() {
            this.skipTo.apply(this, [0]);
            this.settings.loop || this.pause.apply(this);
            this.settings.trackEnded.apply(this)
        }
    };
    var j = function(b, a) {
        var c = [];
        a = a || document;
        if (a.getElementsByClassName)
            c = a.getElementsByClassName(b);
        else {
            var d, e, i = a.getElementsByTagName("*"), f = RegExp("(^|\\s)" + b + "(\\s|$)");
            d = 0;
            for (e = i.length; d < e; d++)
                f.test(i[d].className) && c.push(i[d])
        }
        return c.length > 1 ? c : c[0]
    }
}
)("audiojs", "audiojsInstance", this);
!function(a, b, c) {
    function d(a, c) {
        var d = b(a);
        d.data(f, this),
        this._$element = d,
        this.shares = [],
        this._init(c),
        this._render()
    }
    var e = "JSSocials"
      , f = e
      , g = function(a, c) {
        return b.isFunction(a) ? a.apply(c, b.makeArray(arguments).slice(2)) : a
    }
      , h = /(\.(jpeg|png|gif|bmp)$|^data:image\/(jpeg|png|gif|bmp);base64)/i
      , i = /(&?[a-zA-Z0-9]+=)?\{([a-zA-Z0-9]+)\}/g
      , j = {
        G: 1e9,
        M: 1e6,
        K: 1e3
    }
      , k = {};
    d.prototype = {
        url: "",
        text: "",
        shareIn: "blank",
        showLabel: function(a) {
            return this.showCount === !1 ? a > this.smallScreenWidth : a >= this.largeScreenWidth
        },
        showCount: function(a) {
            return a <= this.smallScreenWidth ? "inside" : !0
        },
        smallScreenWidth: 640,
        largeScreenWidth: 1024,
        resizeTimeout: 200,
        elementClass: "jssocials",
        sharesClass: "jssocials-shares",
        shareClass: "jssocials-share",
        shareButtonClass: "jssocials-share-button",
        shareLinkClass: "jssocials-share-link",
        shareLogoClass: "jssocials-share-logo",
        shareLabelClass: "jssocials-share-label",
        shareLinkCountClass: "jssocials-share-link-count",
        shareCountBoxClass: "jssocials-share-count-box",
        shareCountClass: "jssocials-share-count",
        shareZeroCountClass: "jssocials-share-no-count",
        _init: function(a) {
            this._initDefaults(),
            b.extend(this, a),
            this._initShares(),
            this._attachWindowResizeCallback()
        },
        _initDefaults: function() {
            this.url = a.location.href,
            this.text = b.trim(b("meta[name=description]").attr("content") || b("title").text())
        },
        _initShares: function() {
            this.shares = b.map(this.shares, b.proxy(function(a) {
                "string" == typeof a && (a = {
                    share: a
                });
                var c = a.share && k[a.share];
                if (!c && !a.renderer)
                    throw Error("Share '" + a.share + "' is not found");
                return b.extend({
                    url: this.url,
                    text: this.text
                }, c, a)
            }, this))
        },
        _attachWindowResizeCallback: function() {
            b(a).on("resize", b.proxy(this._windowResizeHandler, this))
        },
        _detachWindowResizeCallback: function() {
            b(a).off("resize", this._windowResizeHandler)
        },
        _windowResizeHandler: function() {
            (b.isFunction(this.showLabel) || b.isFunction(this.showCount)) && (a.clearTimeout(this._resizeTimer),
            this._resizeTimer = setTimeout(b.proxy(this.refresh, this), this.resizeTimeout))
        },
        _render: function() {
            this._clear(),
            this._defineOptionsByScreen(),
            this._$element.addClass(this.elementClass),
            this._$shares = b("<div>").addClass(this.sharesClass).appendTo(this._$element),
            this._renderShares()
        },
        _defineOptionsByScreen: function() {
            this._screenWidth = b(a).width(),
            this._showLabel = g(this.showLabel, this, this._screenWidth),
            this._showCount = g(this.showCount, this, this._screenWidth)
        },
        _renderShares: function() {
            b.each(this.shares, b.proxy(function(a, b) {
                this._renderShare(b)
            }, this))
        },
        _renderShare: function(a) {
            var c;
            c = b.isFunction(a.renderer) ? b(a.renderer()) : this._createShare(a),
            c.addClass(this.shareClass).addClass(a.share ? "jssocials-share-" + a.share : "").addClass(a.css).appendTo(this._$shares)
        },
        _createShare: function(a) {
            var c = b("<div>")
              , d = this._createShareLink(a).appendTo(c);
            if (this._showCount) {
                var e = "inside" === this._showCount
                  , f = e ? d : b("<div>").addClass(this.shareCountBoxClass).appendTo(c);
                f.addClass(e ? this.shareLinkCountClass : this.shareCountBoxClass),
                this._renderShareCount(a, f)
            }
            return c
        },
        _createShareLink: function(a) {
            var c = this._getShareStrategy(a)
              , d = c.call(a, {
                shareUrl: this._getShareUrl(a)
            });
            return d.addClass(this.shareLinkClass).append(this._createShareLogo(a)),
            this._showLabel && d.append(this._createShareLabel(a)),
            b.each(this.on || {}, function(c, e) {
                b.isFunction(e) && d.on(c, b.proxy(e, a))
            }),
            d
        },
        _getShareStrategy: function(a) {
            var b = m[a.shareIn || this.shareIn];
            if (!b)
                throw Error("Share strategy '" + this.shareIn + "' not found");
            return b
        },
        _getShareUrl: function(a) {
            var b = g(a.shareUrl, a);
            return this._formatShareUrl(b, a)
        },
        _createShareLogo: function(a) {
            var c = a.logo
              , d = h.test(c) ? b("<img>").attr("src", a.logo) : b("<i>").addClass(c);
            return d.addClass(this.shareLogoClass),
            d
        },
        _createShareLabel: function(a) {
            return b("<span>").addClass(this.shareLabelClass).text(a.label)
        },
        _renderShareCount: function(a, c) {
            var d = b("<span>").addClass(this.shareCountClass);
            c.addClass(this.shareZeroCountClass).append(d),
            this._loadCount(a).done(b.proxy(function(a) {
                a && (c.removeClass(this.shareZeroCountClass),
                d.text(a))
            }, this))
        },
        _loadCount: function(a) {
            var c = b.Deferred()
              , d = this._getCountUrl(a);
            if (!d)
                return c.resolve(0).promise();
            var e = b.proxy(function(b) {
                c.resolve(this._getCountValue(b, a))
            }, this);
            return b.getJSON(d).done(e).fail(function() {
                b.get(d).done(e).fail(function() {
                    c.resolve(0)
                })
            }),
            c.promise()
        },
        _getCountUrl: function(a) {
            var b = g(a.countUrl, a);
            return this._formatShareUrl(b, a)
        },
        _getCountValue: function(a, c) {
            var d = (b.isFunction(c.getCount) ? c.getCount(a) : a) || 0;
            return "string" == typeof d ? d : this._formatNumber(d)
        },
        _formatNumber: function(a) {
            return b.each(j, function(b, c) {
                return a >= c ? (a = parseFloat((a / c).toFixed(2)) + b,
                !1) : void 0
            }),
            a
        },
        _formatShareUrl: function(b, c) {
            return b.replace(i, function(b, d, e) {
                var f = c[e] || "";
                return f ? (d || "") + a.encodeURIComponent(f) : ""
            })
        },
        _clear: function() {
            a.clearTimeout(this._resizeTimer),
            this._$element.empty()
        },
        _passOptionToShares: function(a, c) {
            var d = this.shares;
            b.each(["url", "text"], function(e, f) {
                f === a && b.each(d, function(b, d) {
                    d[a] = c
                })
            })
        },
        _normalizeShare: function(a) {
            return b.isNumeric(a) ? this.shares[a] : "string" == typeof a ? b.grep(this.shares, function(b) {
                return b.share === a
            })[0] : a
        },
        refresh: function() {
            this._render()
        },
        destroy: function() {
            this._clear(),
            this._detachWindowResizeCallback(),
            this._$element.removeClass(this.elementClass).removeData(f)
        },
        option: function(a, b) {
            return 1 === arguments.length ? this[a] : (this[a] = b,
            this._passOptionToShares(a, b),
            void this.refresh())
        },
        shareOption: function(a, b, c) {
            return a = this._normalizeShare(a),
            2 === arguments.length ? a[b] : (a[b] = c,
            void this.refresh())
        }
    },
    b.fn.jsSocials = function(a) {
        var e = b.makeArray(arguments)
          , g = e.slice(1)
          , h = this;
        return this.each(function() {
            var e, i = b(this), j = i.data(f);
            if (j)
                if ("string" == typeof a) {
                    if (e = j[a].apply(j, g),
                    e !== c && e !== j)
                        return h = e,
                        !1
                } else
                    j._detachWindowResizeCallback(),
                    j._init(a),
                    j._render();
            else
                new d(i,a)
        }),
        h
    }
    ;
    var l = function(a) {
        var c;
        b.isPlainObject(a) ? c = d.prototype : (c = k[a],
        a = arguments[1] || {}),
        b.extend(c, a)
    }
      , m = {
        popup: function(c) {
            return b("<a>").attr("href", "#").on("click", function() {
                return a.open(c.shareUrl, null, "width=600, height=400, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0"),
                !1
            })
        },
        blank: function(a) {
            return b("<a>").attr({
                target: "_blank",
                href: a.shareUrl
            })
        },
        self: function(a) {
            return b("<a>").attr({
                target: "_self",
                href: a.shareUrl
            })
        }
    };
    a.jsSocials = {
        Socials: d,
        shares: k,
        shareStrategies: m,
        setDefaults: l
    }
}(window, jQuery),
function(a, b, c) {
    b.extend(c.shares, {
        email: {
            label: "E-mail",
            logo: "fa fa-at",
            shareUrl: "mailto:{to}?subject={text}&body={url}",
            countUrl: "",
            shareIn: "self"
        },
        twitter: {
            label: "Tweet",
            logo: "fa fa-twitter",
            shareUrl: "https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
            countUrl: ""
        },
        facebook: {
            label: "Like",
            logo: "fa fa-facebook",
            shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
            countUrl: function() {
                return "https://graph.facebook.com/fql?q=SELECT total_count FROM link_stat WHERE url='" + a.encodeURIComponent(this.url) + "'"
            },
            getCount: function(a) {
                return a.data.length && a.data[0].total_count || 0
            }
        },
        googleplus: {
            label: "+1",
            logo: "fa fa-google-plus",
            shareUrl: "https://plus.google.com/share?url={url}",
            countUrl: function() {
                return "https://cors-anywhere.herokuapp.com/https://plusone.google.com/_/+1/fastbutton?url=" + a.encodeURIComponent(this.url)
            },
            getCount: function(a) {
                return parseFloat((a.match(/\{c: ([.0-9E]+)/) || [])[1])
            }
        },
        linkedin: {
            label: "Share",
            logo: "fa fa-linkedin",
            shareUrl: "https://www.linkedin.com/shareArticle?mini=true&url={url}",
            countUrl: "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
            getCount: function(a) {
                return a.count
            }
        },
        pinterest: {
            label: "Pin it",
            logo: "fa fa-pinterest",
            shareUrl: "https://pinterest.com/pin/create/bookmarklet/?media={media}&url={url}&description={text}",
            countUrl: "https://api.pinterest.com/v1/urls/count.json?&url={url}&callback=?",
            getCount: function(a) {
                return a.count
            }
        },
        stumbleupon: {
            label: "Share",
            logo: "fa fa-stumbleupon",
            shareUrl: "http://www.stumbleupon.com/submit?url={url}&title={title}",
            countUrl: "https://cors-anywhere.herokuapp.com/https://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}",
            getCount: function(a) {
                return a.result.views
            }
        },
        whatsapp: {
            label: "WhatsApp",
            logo: "fa fa-whatsapp",
            shareUrl: "whatsapp://send?text={url} {text}",
            countUrl: "",
            shareIn: "self"
        },
        line: {
            label: "LINE",
            logo: "fa fa-comment",
            shareUrl: "http://line.me/R/msg/text/?{text} {url}",
            countUrl: ""
        }
    })
}(window, jQuery, window.jsSocials);
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        ;F.prototype = obj;
        return new F();
    }
    ;
}
(function($, window, document, undefined) {
    var ElevateZoom = {
        init: function(options, elem) {
            var self = this;
            self.elem = elem;
            self.$elem = $(elem);
            self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");
            self.options = $.extend({}, $.fn.elevateZoom.options, options);
            if (self.options.tint) {
                self.options.lensColour = "none",
                self.options.lensOpacity = "1"
            }
            if (self.options.zoomType == "inner") {
                self.options.showLens = false;
            }
            self.$elem.parent().removeAttr('title').removeAttr('alt');
            self.zoomImage = self.imageSrc;
            self.refresh(1);
            $('#' + self.options.gallery + ' a').click(function(e) {
                if (self.options.galleryActiveClass) {
                    $('#' + self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
                    $(this).addClass(self.options.galleryActiveClass);
                }
                e.preventDefault();
                if ($(this).data("zoom-image")) {
                    self.zoomImagePre = $(this).data("zoom-image")
                } else {
                    self.zoomImagePre = $(this).data("image");
                }
                self.swaptheimage($(this).data("image"), self.zoomImagePre);
                return false;
            });
        },
        refresh: function(length) {
            var self = this;
            setTimeout(function() {
                self.fetch(self.imageSrc);
            }, length || self.options.refresh);
        },
        fetch: function(imgsrc) {
            var self = this;
            var newImg = new Image();
            newImg.onload = function() {
                self.largeWidth = newImg.width;
                self.largeHeight = newImg.height;
                self.startZoom();
                self.currentImage = self.imageSrc;
                self.options.onZoomedImageLoaded(self.$elem);
            }
            newImg.src = imgsrc;
            return;
        },
        startZoom: function() {
            var self = this;
            self.nzWidth = self.$elem.width();
            self.nzHeight = self.$elem.height();
            self.isWindowActive = false;
            self.isLensActive = false;
            self.isTintActive = false;
            self.overWindow = false;
            if (self.options.imageCrossfade) {
                self.zoomWrap = self.$elem.wrap('<div style="height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;" class="zoomWrapper" />');
                self.$elem.css('position', 'absolute');
            }
            self.zoomLock = 1;
            self.scrollingLock = false;
            self.changeBgSize = false;
            self.currentZoomLevel = self.options.zoomLevel;
            self.nzOffset = self.$elem.offset();
            self.widthRatio = (self.largeWidth / self.currentZoomLevel) / self.nzWidth;
            self.heightRatio = (self.largeHeight / self.currentZoomLevel) / self.nzHeight;
            if (self.options.zoomType == "window") {
                self.zoomWindowStyle = "overflow: hidden;" + "background-position: 0px 0px;text-align:center;" + "background-color: " + String(self.options.zoomWindowBgColour) + ";width: " + String(self.options.zoomWindowWidth) + "px;" + "height: " + String(self.options.zoomWindowHeight) + "px;float: left;" + "background-size: " + self.largeWidth / self.currentZoomLevel + "px " + self.largeHeight / self.currentZoomLevel + "px;" + "display: none;z-index:100;" + "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour + ";background-repeat: no-repeat;" + "position: absolute;";
            }
            if (self.options.zoomType == "inner") {
                var borderWidth = self.$elem.css("border-left-width");
                self.zoomWindowStyle = "overflow: hidden;" + "margin-left: " + String(borderWidth) + ";" + "margin-top: " + String(borderWidth) + ";" + "background-position: 0px 0px;" + "width: " + String(self.nzWidth) + "px;" + "height: " + String(self.nzHeight) + "px;" + "px;float: left;" + "display: none;" + "cursor:" + (self.options.cursor) + ";" + "px solid " + self.options.borderColour + ";background-repeat: no-repeat;" + "position: absolute;";
            }
            if (self.options.zoomType == "window") {
                if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                    lensHeight = self.nzHeight;
                } else {
                    lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                }
                if (self.largeWidth < self.options.zoomWindowWidth) {
                    lensWidth = self.nzWidth;
                } else {
                    lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                }
                self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth) / self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight) / self.heightRatio) + "px;float: right;display: none;" + "overflow: hidden;" + "z-index: 999;" + "-webkit-transform: translateZ(0);" + "opacity:" + (self.options.lensOpacity) + ";filter: alpha(opacity = " + (self.options.lensOpacity * 100) + "); zoom:1;" + "width:" + lensWidth + "px;" + "height:" + lensHeight + "px;" + "background-color:" + (self.options.lensColour) + ";" + "cursor:" + (self.options.cursor) + ";" + "border: " + (self.options.lensBorderSize) + "px" + " solid " + (self.options.lensBorderColour) + ";background-repeat: no-repeat;position: absolute;";
            }
            self.tintStyle = "display: block;" + "position: absolute;" + "background-color: " + self.options.tintColour + ";" + "filter:alpha(opacity=0);" + "opacity: 0;" + "width: " + self.nzWidth + "px;" + "height: " + self.nzHeight + "px;";
            self.lensRound = '';
            if (self.options.zoomType == "lens") {
                self.lensStyle = "background-position: 0px 0px;" + "float: left;display: none;" + "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour + ";" + "width:" + String(self.options.lensSize) + "px;" + "height:" + String(self.options.lensSize) + "px;" + "background-repeat: no-repeat;position: absolute;";
            }
            if (self.options.lensShape == "round") {
                self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;" + "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;" + "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;" + "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";
            }
            self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + self.nzOffset.left + 'px;top:' + self.nzOffset.top + 'px;height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;"></div>');
            $('body').append(self.zoomContainer);
            if (self.options.containLensZoom && self.options.zoomType == "lens") {
                self.zoomContainer.css("overflow", "hidden");
            }
            if (self.options.zoomType != "inner") {
                self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound + "'>&nbsp;</div>").appendTo(self.zoomContainer).click(function() {
                    self.$elem.trigger('click');
                });
                if (self.options.tint) {
                    self.tintContainer = $('<div/>').addClass('tintContainer');
                    self.zoomTint = $("<div class='zoomTint' style='" + self.tintStyle + "'></div>");
                    self.zoomLens.wrap(self.tintContainer);
                    self.zoomTintcss = self.zoomLens.after(self.zoomTint);
                    self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + self.nzWidth + 'px; height: ' + self.nzHeight + 'px;" src="' + self.imageSrc + '">').appendTo(self.zoomLens).click(function() {
                        self.$elem.trigger('click');
                    });
                }
            }
            if (isNaN(self.options.zoomWindowPosition)) {
                self.zoomWindow = $("<div style='z-index:999;left:" + (self.windowOffsetLeft) + "px;top:" + (self.windowOffsetTop) + "px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo('body').click(function() {
                    self.$elem.trigger('click');
                });
            } else {
                self.zoomWindow = $("<div style='z-index:999;left:" + (self.windowOffsetLeft) + "px;top:" + (self.windowOffsetTop) + "px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(self.zoomContainer).click(function() {
                    self.$elem.trigger('click');
                });
            }
            self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width", self.options.zoomWindowWidth);
            self.zoomWindow.wrap(self.zoomWindowContainer);
            if (self.options.zoomType == "lens") {
                self.zoomLens.css({
                    backgroundImage: "url('" + self.imageSrc + "')"
                });
            }
            if (self.options.zoomType == "window") {
                self.zoomWindow.css({
                    backgroundImage: "url('" + self.imageSrc + "')"
                });
            }
            if (self.options.zoomType == "inner") {
                self.zoomWindow.css({
                    backgroundImage: "url('" + self.imageSrc + "')"
                });
            }
            self.$elem.bind('touchmove', function(e) {
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                self.setPosition(touch);
            });
            self.zoomContainer.bind('touchmove', function(e) {
                if (self.options.zoomType == "inner") {
                    self.showHideWindow("show");
                }
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                self.setPosition(touch);
            });
            self.zoomContainer.bind('touchend', function(e) {
                self.showHideWindow("hide");
                if (self.options.showLens) {
                    self.showHideLens("hide");
                }
                if (self.options.tint && self.options.zoomType != "inner") {
                    self.showHideTint("hide");
                }
            });
            self.$elem.bind('touchend', function(e) {
                self.showHideWindow("hide");
                if (self.options.showLens) {
                    self.showHideLens("hide");
                }
                if (self.options.tint && self.options.zoomType != "inner") {
                    self.showHideTint("hide");
                }
            });
            if (self.options.showLens) {
                self.zoomLens.bind('touchmove', function(e) {
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);
                });
                self.zoomLens.bind('touchend', function(e) {
                    self.showHideWindow("hide");
                    if (self.options.showLens) {
                        self.showHideLens("hide");
                    }
                    if (self.options.tint && self.options.zoomType != "inner") {
                        self.showHideTint("hide");
                    }
                });
            }
            self.$elem.bind('mousemove', function(e) {
                if (self.overWindow == false) {
                    self.setElements("show");
                }
                if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                    self.setPosition(e);
                    self.currentLoc = e;
                }
                self.lastX = e.clientX;
                self.lastY = e.clientY;
            });
            self.zoomContainer.bind('mousemove', function(e) {
                if (self.overWindow == false) {
                    self.setElements("show");
                }
                if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                    self.setPosition(e);
                    self.currentLoc = e;
                }
                self.lastX = e.clientX;
                self.lastY = e.clientY;
            });
            if (self.options.zoomType != "inner") {
                self.zoomLens.bind('mousemove', function(e) {
                    if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                });
            }
            if (self.options.tint && self.options.zoomType != "inner") {
                self.zoomTint.bind('mousemove', function(e) {
                    if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                });
            }
            if (self.options.zoomType == "inner") {
                self.zoomWindow.bind('mousemove', function(e) {
                    if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                });
            }
            self.zoomContainer.add(self.$elem).mouseenter(function() {
                if (self.overWindow == false) {
                    self.setElements("show");
                }
            }).mouseleave(function() {
                if (!self.scrollLock) {
                    self.setElements("hide");
                    self.options.onDestroy(self.$elem);
                }
            });
            if (self.options.zoomType != "inner") {
                self.zoomWindow.mouseenter(function() {
                    self.overWindow = true;
                    self.setElements("hide");
                }).mouseleave(function() {
                    self.overWindow = false;
                });
            }
            if (self.options.zoomLevel != 1) {}
            if (self.options.minZoomLevel) {
                self.minZoomLevel = self.options.minZoomLevel;
            } else {
                self.minZoomLevel = self.options.scrollZoomIncrement * 2;
            }
            if (self.options.scrollZoom) {
                self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
                    self.scrollLock = true;
                    clearTimeout($.data(this, 'timer'));
                    $.data(this, 'timer', setTimeout(function() {
                        self.scrollLock = false;
                    }, 250));
                    var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail * -1
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    if (theEvent / 120 > 0) {
                        if (self.currentZoomLevel >= self.minZoomLevel) {
                            self.changeZoomLevel(self.currentZoomLevel - self.options.scrollZoomIncrement);
                        }
                    } else {
                        if (self.options.maxZoomLevel) {
                            if (self.currentZoomLevel <= self.options.maxZoomLevel) {
                                self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement);
                            }
                        } else {
                            self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement);
                        }
                    }
                    return false;
                });
            }
        },
        setElements: function(type) {
            var self = this;
            if (!self.options.zoomEnabled) {
                return false;
            }
            if (type == "show") {
                if (self.isWindowSet) {
                    if (self.options.zoomType == "inner") {
                        self.showHideWindow("show");
                    }
                    if (self.options.zoomType == "window") {
                        self.showHideWindow("show");
                    }
                    if (self.options.showLens) {
                        self.showHideLens("show");
                    }
                    if (self.options.tint && self.options.zoomType != "inner") {
                        self.showHideTint("show");
                    }
                }
            }
            if (type == "hide") {
                if (self.options.zoomType == "window") {
                    self.showHideWindow("hide");
                }
                if (!self.options.tint) {
                    self.showHideWindow("hide");
                }
                if (self.options.showLens) {
                    self.showHideLens("hide");
                }
                if (self.options.tint) {
                    self.showHideTint("hide");
                }
            }
        },
        setPosition: function(e) {
            var self = this;
            if (!self.options.zoomEnabled) {
                return false;
            }
            self.nzHeight = self.$elem.height();
            self.nzWidth = self.$elem.width();
            self.nzOffset = self.$elem.offset();
            if (self.options.tint && self.options.zoomType != "inner") {
                self.zoomTint.css({
                    top: 0
                });
                self.zoomTint.css({
                    left: 0
                });
            }
            if (self.options.responsive && !self.options.scrollZoom) {
                if (self.options.showLens) {
                    if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                        lensHeight = self.nzHeight;
                    } else {
                        lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                    }
                    if (self.largeWidth < self.options.zoomWindowWidth) {
                        lensWidth = self.nzWidth;
                    } else {
                        lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                    }
                    self.widthRatio = self.largeWidth / self.nzWidth;
                    self.heightRatio = self.largeHeight / self.nzHeight;
                    if (self.options.zoomType != "lens") {
                        if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                            lensHeight = self.nzHeight;
                        } else {
                            lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                        }
                        if (self.nzWidth < self.options.zoomWindowHeight / self.heightRatio) {
                            lensWidth = self.nzWidth;
                        } else {
                            lensWidth = String((self.options.zoomWindowWidth / self.widthRatio));
                        }
                        self.zoomLens.css('width', lensWidth);
                        self.zoomLens.css('height', lensHeight);
                        if (self.options.tint) {
                            self.zoomTintImage.css('width', self.nzWidth);
                            self.zoomTintImage.css('height', self.nzHeight);
                        }
                    }
                    if (self.options.zoomType == "lens") {
                        self.zoomLens.css({
                            width: String(self.options.lensSize) + 'px',
                            height: String(self.options.lensSize) + 'px'
                        })
                    }
                }
            }
            self.zoomContainer.css({
                top: self.nzOffset.top
            });
            self.zoomContainer.css({
                left: self.nzOffset.left
            });
            self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
            self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
            if (self.options.zoomType == "window") {
                self.Etoppos = (self.mouseTop < (self.zoomLens.height() / 2));
                self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height() / 2) - (self.options.lensBorderSize * 2));
                self.Eloppos = (self.mouseLeft < 0 + ((self.zoomLens.width() / 2)));
                self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width() / 2) - (self.options.lensBorderSize * 2)));
            }
            if (self.options.zoomType == "inner") {
                self.Etoppos = (self.mouseTop < ((self.nzHeight / 2) / self.heightRatio));
                self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight / 2) / self.heightRatio)));
                self.Eloppos = (self.mouseLeft < 0 + (((self.nzWidth / 2) / self.widthRatio)));
                self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth / 2) / self.widthRatio - (self.options.lensBorderSize * 2)));
            }
            if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight) {
                self.setElements("hide");
                return;
            } else {
                if (self.options.showLens) {
                    self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
                    self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));
                }
                if (self.Etoppos) {
                    self.lensTopPos = 0;
                }
                if (self.Eloppos) {
                    self.windowLeftPos = 0;
                    self.lensLeftPos = 0;
                    self.tintpos = 0;
                }
                if (self.options.zoomType == "window") {
                    if (self.Eboppos) {
                        self.lensTopPos = Math.max((self.nzHeight) - self.zoomLens.height() - (self.options.lensBorderSize * 2), 0);
                    }
                    if (self.Eroppos) {
                        self.lensLeftPos = (self.nzWidth - (self.zoomLens.width()) - (self.options.lensBorderSize * 2));
                    }
                }
                if (self.options.zoomType == "inner") {
                    if (self.Eboppos) {
                        self.lensTopPos = Math.max(((self.nzHeight) - (self.options.lensBorderSize * 2)), 0);
                    }
                    if (self.Eroppos) {
                        self.lensLeftPos = (self.nzWidth - (self.nzWidth) - (self.options.lensBorderSize * 2));
                    }
                }
                if (self.options.zoomType == "lens") {
                    self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));
                    self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));
                    self.zoomLens.css({
                        backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                    });
                    if (self.changeBgSize) {
                        if (self.nzHeight > self.nzWidth) {
                            if (self.options.zoomType == "lens") {
                                self.zoomLens.css({
                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                });
                            }
                            self.zoomWindow.css({
                                "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                            });
                        } else {
                            if (self.options.zoomType == "lens") {
                                self.zoomLens.css({
                                    "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                });
                            }
                            self.zoomWindow.css({
                                "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                            });
                        }
                        self.changeBgSize = false;
                    }
                    self.setWindowPostition(e);
                }
                if (self.options.tint && self.options.zoomType != "inner") {
                    self.setTintPosition(e);
                }
                if (self.options.zoomType == "window") {
                    self.setWindowPostition(e);
                }
                if (self.options.zoomType == "inner") {
                    self.setWindowPostition(e);
                }
                if (self.options.showLens) {
                    if (self.fullwidth && self.options.zoomType != "lens") {
                        self.lensLeftPos = 0;
                    }
                    self.zoomLens.css({
                        left: self.lensLeftPos + 'px',
                        top: self.lensTopPos + 'px'
                    })
                }
            }
        },
        showHideWindow: function(change) {
            var self = this;
            if (change == "show") {
                if (!self.isWindowActive) {
                    if (self.options.zoomWindowFadeIn) {
                        self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
                    } else {
                        self.zoomWindow.show();
                    }
                    self.isWindowActive = true;
                }
            }
            if (change == "hide") {
                if (self.isWindowActive) {
                    if (self.options.zoomWindowFadeOut) {
                        self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function() {
                            if (self.loop) {
                                clearInterval(self.loop);
                                self.loop = false;
                            }
                        });
                    } else {
                        self.zoomWindow.hide();
                    }
                    self.isWindowActive = false;
                }
            }
        },
        showHideLens: function(change) {
            var self = this;
            if (change == "show") {
                if (!self.isLensActive) {
                    if (self.options.lensFadeIn) {
                        self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
                    } else {
                        self.zoomLens.show();
                    }
                    self.isLensActive = true;
                }
            }
            if (change == "hide") {
                if (self.isLensActive) {
                    if (self.options.lensFadeOut) {
                        self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
                    } else {
                        self.zoomLens.hide();
                    }
                    self.isLensActive = false;
                }
            }
        },
        showHideTint: function(change) {
            var self = this;
            if (change == "show") {
                if (!self.isTintActive) {
                    if (self.options.zoomTintFadeIn) {
                        self.zoomTint.css({
                            opacity: self.options.tintOpacity
                        }).animate().stop(true, true).fadeIn("slow");
                    } else {
                        self.zoomTint.css({
                            opacity: self.options.tintOpacity
                        }).animate();
                        self.zoomTint.show();
                    }
                    self.isTintActive = true;
                }
            }
            if (change == "hide") {
                if (self.isTintActive) {
                    if (self.options.zoomTintFadeOut) {
                        self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
                    } else {
                        self.zoomTint.hide();
                    }
                    self.isTintActive = false;
                }
            }
        },
        setLensPostition: function(e) {},
        setWindowPostition: function(e) {
            var self = this;
            if (!isNaN(self.options.zoomWindowPosition)) {
                switch (self.options.zoomWindowPosition) {
                case 1:
                    self.windowOffsetTop = (self.options.zoomWindowOffety);
                    self.windowOffsetLeft = (+self.nzWidth);
                    break;
                case 2:
                    if (self.options.zoomWindowHeight > self.nzHeight) {
                        self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                        self.windowOffsetLeft = (self.nzWidth);
                    } else {}
                    break;
                case 3:
                    self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2));
                    self.windowOffsetLeft = (self.nzWidth);
                    break;
                case 4:
                    self.windowOffsetTop = (self.nzHeight);
                    self.windowOffsetLeft = (self.nzWidth);
                    break;
                case 5:
                    self.windowOffsetTop = (self.nzHeight);
                    self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2));
                    break;
                case 6:
                    if (self.options.zoomWindowHeight > self.nzHeight) {
                        self.windowOffsetTop = (self.nzHeight);
                        self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                    } else {}
                    break;
                case 7:
                    self.windowOffsetTop = (self.nzHeight);
                    self.windowOffsetLeft = 0;
                    break;
                case 8:
                    self.windowOffsetTop = (self.nzHeight);
                    self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);
                    break;
                case 9:
                    self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2));
                    self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);
                    break;
                case 10:
                    if (self.options.zoomWindowHeight > self.nzHeight) {
                        self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                        self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);
                    } else {}
                    break;
                case 11:
                    self.windowOffsetTop = (self.options.zoomWindowOffety);
                    self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);
                    break;
                case 12:
                    self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1);
                    self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1);
                    break;
                case 13:
                    self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1);
                    self.windowOffsetLeft = (0);
                    break;
                case 14:
                    if (self.options.zoomWindowHeight > self.nzHeight) {
                        self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1);
                        self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                    } else {}
                    break;
                case 15:
                    self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1);
                    self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2));
                    break;
                case 16:
                    self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1);
                    self.windowOffsetLeft = (self.nzWidth);
                    break;
                default:
                    self.windowOffsetTop = (self.options.zoomWindowOffety);
                    self.windowOffsetLeft = (self.nzWidth);
                }
            } else {
                self.externalContainer = $('#' + self.options.zoomWindowPosition);
                self.externalContainerWidth = self.externalContainer.width();
                self.externalContainerHeight = self.externalContainer.height();
                self.externalContainerOffset = self.externalContainer.offset();
                self.windowOffsetTop = self.externalContainerOffset.top;
                self.windowOffsetLeft = self.externalContainerOffset.left;
            }
            self.isWindowSet = true;
            self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
            self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;
            self.zoomWindow.css({
                top: self.windowOffsetTop
            });
            self.zoomWindow.css({
                left: self.windowOffsetLeft
            });
            if (self.options.zoomType == "inner") {
                self.zoomWindow.css({
                    top: 0
                });
                self.zoomWindow.css({
                    left: 0
                });
            }
            self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));
            self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
            if (self.Etoppos) {
                self.windowTopPos = 0;
            }
            if (self.Eloppos) {
                self.windowLeftPos = 0;
            }
            if (self.Eboppos) {
                self.windowTopPos = (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height()) * (-1);
            }
            if (self.Eroppos) {
                self.windowLeftPos = ((self.largeWidth / self.currentZoomLevel - self.zoomWindow.width()) * (-1));
            }
            if (self.fullheight) {
                self.windowTopPos = 0;
            }
            if (self.fullwidth) {
                self.windowLeftPos = 0;
            }
            if (self.options.zoomType == "window" || self.options.zoomType == "inner") {
                if (self.zoomLock == 1) {
                    if (self.widthRatio <= 1) {
                        self.windowLeftPos = 0;
                    }
                    if (self.heightRatio <= 1) {
                        self.windowTopPos = 0;
                    }
                }
                if (self.options.zoomType == "window") {
                    if (self.largeHeight < self.options.zoomWindowHeight) {
                        self.windowTopPos = 0;
                    }
                    if (self.largeWidth < self.options.zoomWindowWidth) {
                        self.windowLeftPos = 0;
                    }
                }
                if (self.options.easing) {
                    if (!self.xp) {
                        self.xp = 0;
                    }
                    if (!self.yp) {
                        self.yp = 0;
                    }
                    if (!self.loop) {
                        self.loop = setInterval(function() {
                            self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount;
                            self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount;
                            if (self.scrollingLock) {
                                clearInterval(self.loop);
                                self.xp = self.windowLeftPos;
                                self.yp = self.windowTopPos
                                self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
                                self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
                                if (self.changeBgSize) {
                                    if (self.nzHeight > self.nzWidth) {
                                        if (self.options.zoomType == "lens") {
                                            self.zoomLens.css({
                                                "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                            });
                                        }
                                        self.zoomWindow.css({
                                            "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                        });
                                    } else {
                                        if (self.options.zoomType != "lens") {
                                            self.zoomLens.css({
                                                "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                            });
                                        }
                                        self.zoomWindow.css({
                                            "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                        });
                                    }
                                    self.changeBgSize = false;
                                }
                                self.zoomWindow.css({
                                    backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                                });
                                self.scrollingLock = false;
                                self.loop = false;
                            } else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
                                clearInterval(self.loop);
                                self.zoomWindow.css({
                                    backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                                });
                                self.loop = false;
                            } else {
                                if (self.changeBgSize) {
                                    if (self.nzHeight > self.nzWidth) {
                                        if (self.options.zoomType == "lens") {
                                            self.zoomLens.css({
                                                "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                            });
                                        }
                                        self.zoomWindow.css({
                                            "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                        });
                                    } else {
                                        if (self.options.zoomType != "lens") {
                                            self.zoomLens.css({
                                                "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                            });
                                        }
                                        self.zoomWindow.css({
                                            "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                        });
                                    }
                                    self.changeBgSize = false;
                                }
                                self.zoomWindow.css({
                                    backgroundPosition: self.xp + 'px ' + self.yp + 'px'
                                });
                            }
                        }, 16);
                    }
                } else {
                    if (self.changeBgSize) {
                        if (self.nzHeight > self.nzWidth) {
                            if (self.options.zoomType == "lens") {
                                self.zoomLens.css({
                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                });
                            }
                            self.zoomWindow.css({
                                "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                            });
                        } else {
                            if (self.options.zoomType == "lens") {
                                self.zoomLens.css({
                                    "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                });
                            }
                            if ((self.largeHeight / self.newvaluewidth) < self.options.zoomWindowHeight) {
                                self.zoomWindow.css({
                                    "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                });
                            } else {
                                self.zoomWindow.css({
                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                });
                            }
                        }
                        self.changeBgSize = false;
                    }
                    self.zoomWindow.css({
                        backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                    });
                }
            }
        },
        setTintPosition: function(e) {
            var self = this;
            self.nzOffset = self.$elem.offset();
            self.tintpos = String(((e.pageX - self.nzOffset.left) - (self.zoomLens.width() / 2)) * (-1));
            self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));
            if (self.Etoppos) {
                self.tintposy = 0;
            }
            if (self.Eloppos) {
                self.tintpos = 0;
            }
            if (self.Eboppos) {
                self.tintposy = (self.nzHeight - self.zoomLens.height() - (self.options.lensBorderSize * 2)) * (-1);
            }
            if (self.Eroppos) {
                self.tintpos = ((self.nzWidth - self.zoomLens.width() - (self.options.lensBorderSize * 2)) * (-1));
            }
            if (self.options.tint) {
                if (self.fullheight) {
                    self.tintposy = 0;
                }
                if (self.fullwidth) {
                    self.tintpos = 0;
                }
                self.zoomTintImage.css({
                    'left': self.tintpos + 'px'
                });
                self.zoomTintImage.css({
                    'top': self.tintposy + 'px'
                });
            }
        },
        swaptheimage: function(smallimage, largeimage) {
            var self = this;
            var newImg = new Image();
            if (self.options.loadingIcon) {
                self.spinner = $('<div style="background: url(\'' + self.options.loadingIcon + '\') no-repeat center;height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
                self.$elem.after(self.spinner);
            }
            self.options.onImageSwap(self.$elem);
            newImg.onload = function() {
                self.largeWidth = newImg.width;
                self.largeHeight = newImg.height;
                self.zoomImage = largeimage;
                self.zoomWindow.css({
                    "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px'
                });
                self.swapAction(smallimage, largeimage);
                return;
            }
            newImg.src = largeimage;
        },
        swapAction: function(smallimage, largeimage) {
            var self = this;
            var newImg2 = new Image();
            newImg2.onload = function() {
                self.nzHeight = newImg2.height;
                self.nzWidth = newImg2.width;
                self.options.onImageSwapComplete(self.$elem);
                self.doneCallback();
                return;
            }
            newImg2.src = smallimage;
            self.currentZoomLevel = self.options.zoomLevel;
            self.options.maxZoomLevel = false;
            if (self.options.zoomType == "lens") {
                self.zoomLens.css({
                    backgroundImage: "url('" + largeimage + "')"
                });
            }
            if (self.options.zoomType == "window") {
                self.zoomWindow.css({
                    backgroundImage: "url('" + largeimage + "')"
                });
            }
            if (self.options.zoomType == "inner") {
                self.zoomWindow.css({
                    backgroundImage: "url('" + largeimage + "')"
                });
            }
            self.currentImage = largeimage;
            if (self.options.imageCrossfade) {
                var oldImg = self.$elem;
                var newImg = oldImg.clone();
                self.$elem.attr("src", smallimage)
                self.$elem.after(newImg);
                newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
                    $(this).remove();
                });
                self.$elem.width("auto").removeAttr("width");
                self.$elem.height("auto").removeAttr("height");
                oldImg.fadeIn(self.options.imageCrossfade);
                if (self.options.tint && self.options.zoomType != "inner") {
                    var oldImgTint = self.zoomTintImage;
                    var newImgTint = oldImgTint.clone();
                    self.zoomTintImage.attr("src", largeimage)
                    self.zoomTintImage.after(newImgTint);
                    newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
                        $(this).remove();
                    });
                    oldImgTint.fadeIn(self.options.imageCrossfade);
                    self.zoomTint.css({
                        height: self.$elem.height()
                    });
                    self.zoomTint.css({
                        width: self.$elem.width()
                    });
                }
                self.zoomContainer.css("height", self.$elem.height());
                self.zoomContainer.css("width", self.$elem.width());
                if (self.options.zoomType == "inner") {
                    if (!self.options.constrainType) {
                        self.zoomWrap.parent().css("height", self.$elem.height());
                        self.zoomWrap.parent().css("width", self.$elem.width());
                        self.zoomWindow.css("height", self.$elem.height());
                        self.zoomWindow.css("width", self.$elem.width());
                    }
                }
                if (self.options.imageCrossfade) {
                    self.zoomWrap.css("height", self.$elem.height());
                    self.zoomWrap.css("width", self.$elem.width());
                }
            } else {
                self.$elem.attr("src", smallimage);
                if (self.options.tint) {
                    self.zoomTintImage.attr("src", largeimage);
                    self.zoomTintImage.attr("height", self.$elem.height());
                    self.zoomTintImage.css({
                        height: self.$elem.height()
                    });
                    self.zoomTint.css({
                        height: self.$elem.height()
                    });
                }
                self.zoomContainer.css("height", self.$elem.height());
                self.zoomContainer.css("width", self.$elem.width());
                if (self.options.imageCrossfade) {
                    self.zoomWrap.css("height", self.$elem.height());
                    self.zoomWrap.css("width", self.$elem.width());
                }
            }
            if (self.options.constrainType) {
                if (self.options.constrainType == "height") {
                    self.zoomContainer.css("height", self.options.constrainSize);
                    self.zoomContainer.css("width", "auto");
                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css("height", self.options.constrainSize);
                        self.zoomWrap.css("width", "auto");
                        self.constwidth = self.zoomWrap.width();
                    } else {
                        self.$elem.css("height", self.options.constrainSize);
                        self.$elem.css("width", "auto");
                        self.constwidth = self.$elem.width();
                    }
                    if (self.options.zoomType == "inner") {
                        self.zoomWrap.parent().css("height", self.options.constrainSize);
                        self.zoomWrap.parent().css("width", self.constwidth);
                        self.zoomWindow.css("height", self.options.constrainSize);
                        self.zoomWindow.css("width", self.constwidth);
                    }
                    if (self.options.tint) {
                        self.tintContainer.css("height", self.options.constrainSize);
                        self.tintContainer.css("width", self.constwidth);
                        self.zoomTint.css("height", self.options.constrainSize);
                        self.zoomTint.css("width", self.constwidth);
                        self.zoomTintImage.css("height", self.options.constrainSize);
                        self.zoomTintImage.css("width", self.constwidth);
                    }
                }
                if (self.options.constrainType == "width") {
                    self.zoomContainer.css("height", "auto");
                    self.zoomContainer.css("width", self.options.constrainSize);
                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css("height", "auto");
                        self.zoomWrap.css("width", self.options.constrainSize);
                        self.constheight = self.zoomWrap.height();
                    } else {
                        self.$elem.css("height", "auto");
                        self.$elem.css("width", self.options.constrainSize);
                        self.constheight = self.$elem.height();
                    }
                    if (self.options.zoomType == "inner") {
                        self.zoomWrap.parent().css("height", self.constheight);
                        self.zoomWrap.parent().css("width", self.options.constrainSize);
                        self.zoomWindow.css("height", self.constheight);
                        self.zoomWindow.css("width", self.options.constrainSize);
                    }
                    if (self.options.tint) {
                        self.tintContainer.css("height", self.constheight);
                        self.tintContainer.css("width", self.options.constrainSize);
                        self.zoomTint.css("height", self.constheight);
                        self.zoomTint.css("width", self.options.constrainSize);
                        self.zoomTintImage.css("height", self.constheight);
                        self.zoomTintImage.css("width", self.options.constrainSize);
                    }
                }
            }
        },
        doneCallback: function() {
            var self = this;
            if (self.options.loadingIcon) {
                self.spinner.hide();
            }
            self.nzOffset = self.$elem.offset();
            self.nzWidth = self.$elem.width();
            self.nzHeight = self.$elem.height();
            self.currentZoomLevel = self.options.zoomLevel;
            self.widthRatio = self.largeWidth / self.nzWidth;
            self.heightRatio = self.largeHeight / self.nzHeight;
            if (self.options.zoomType == "window") {
                if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                    lensHeight = self.nzHeight;
                } else {
                    lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                }
                if (self.options.zoomWindowWidth < self.options.zoomWindowWidth) {
                    lensWidth = self.nzWidth;
                } else {
                    lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                }
                if (self.zoomLens) {
                    self.zoomLens.css('width', lensWidth);
                    self.zoomLens.css('height', lensHeight);
                }
            }
        },
        getCurrentImage: function() {
            var self = this;
            return self.zoomImage;
        },
        getGalleryList: function() {
            var self = this;
            self.gallerylist = [];
            if (self.options.gallery) {
                $('#' + self.options.gallery + ' a').each(function() {
                    var img_src = '';
                    if ($(this).data("zoom-image")) {
                        img_src = $(this).data("zoom-image");
                    } else if ($(this).data("image")) {
                        img_src = $(this).data("image");
                    }
                    if (img_src == self.zoomImage) {
                        self.gallerylist.unshift({
                            href: '' + img_src + '',
                            title: $(this).find('img').attr("title")
                        });
                    } else {
                        self.gallerylist.push({
                            href: '' + img_src + '',
                            title: $(this).find('img').attr("title")
                        });
                    }
                });
            } else {
                self.gallerylist.push({
                    href: '' + self.zoomImage + '',
                    title: $(this).find('img').attr("title")
                });
            }
            return self.gallerylist;
        },
        changeZoomLevel: function(value) {
            var self = this;
            self.scrollingLock = true;
            self.newvalue = parseFloat(value).toFixed(2);
            newvalue = parseFloat(value).toFixed(2);
            maxheightnewvalue = self.largeHeight / ((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);
            maxwidthtnewvalue = self.largeWidth / ((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);
            if (self.options.zoomType != "inner") {
                if (maxheightnewvalue <= newvalue) {
                    self.heightRatio = (self.largeHeight / maxheightnewvalue) / self.nzHeight;
                    self.newvalueheight = maxheightnewvalue;
                    self.fullheight = true;
                } else {
                    self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                    self.newvalueheight = newvalue;
                    self.fullheight = false;
                }
                if (maxwidthtnewvalue <= newvalue) {
                    self.widthRatio = (self.largeWidth / maxwidthtnewvalue) / self.nzWidth;
                    self.newvaluewidth = maxwidthtnewvalue;
                    self.fullwidth = true;
                } else {
                    self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                    self.newvaluewidth = newvalue;
                    self.fullwidth = false;
                }
                if (self.options.zoomType == "lens") {
                    if (maxheightnewvalue <= newvalue) {
                        self.fullwidth = true;
                        self.newvaluewidth = maxheightnewvalue;
                    } else {
                        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                        self.newvaluewidth = newvalue;
                        self.fullwidth = false;
                    }
                }
            }
            if (self.options.zoomType == "inner") {
                maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight).toFixed(2);
                maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth).toFixed(2);
                if (newvalue > maxheightnewvalue) {
                    newvalue = maxheightnewvalue;
                }
                if (newvalue > maxwidthtnewvalue) {
                    newvalue = maxwidthtnewvalue;
                }
                if (maxheightnewvalue <= newvalue) {
                    self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                    if (newvalue > maxheightnewvalue) {
                        self.newvalueheight = maxheightnewvalue;
                    } else {
                        self.newvalueheight = newvalue;
                    }
                    self.fullheight = true;
                } else {
                    self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                    if (newvalue > maxheightnewvalue) {
                        self.newvalueheight = maxheightnewvalue;
                    } else {
                        self.newvalueheight = newvalue;
                    }
                    self.fullheight = false;
                }
                if (maxwidthtnewvalue <= newvalue) {
                    self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                    if (newvalue > maxwidthtnewvalue) {
                        self.newvaluewidth = maxwidthtnewvalue;
                    } else {
                        self.newvaluewidth = newvalue;
                    }
                    self.fullwidth = true;
                } else {
                    self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                    self.newvaluewidth = newvalue;
                    self.fullwidth = false;
                }
            }
            scrcontinue = false;
            if (self.options.zoomType == "inner") {
                if (self.nzWidth >= self.nzHeight) {
                    if (self.newvaluewidth <= maxwidthtnewvalue) {
                        scrcontinue = true;
                    } else {
                        scrcontinue = false;
                        self.fullheight = true;
                        self.fullwidth = true;
                    }
                }
                if (self.nzHeight > self.nzWidth) {
                    if (self.newvaluewidth <= maxwidthtnewvalue) {
                        scrcontinue = true;
                    } else {
                        scrcontinue = false;
                        self.fullheight = true;
                        self.fullwidth = true;
                    }
                }
            }
            if (self.options.zoomType != "inner") {
                scrcontinue = true;
            }
            if (scrcontinue) {
                self.zoomLock = 0;
                self.changeZoom = true;
                if (((self.options.zoomWindowHeight) / self.heightRatio) <= self.nzHeight) {
                    self.currentZoomLevel = self.newvalueheight;
                    if (self.options.zoomType != "lens" && self.options.zoomType != "inner") {
                        self.changeBgSize = true;
                        self.zoomLens.css({
                            height: String((self.options.zoomWindowHeight) / self.heightRatio) + 'px'
                        })
                    }
                    if (self.options.zoomType == "lens" || self.options.zoomType == "inner") {
                        self.changeBgSize = true;
                    }
                }
                if ((self.options.zoomWindowWidth / self.widthRatio) <= self.nzWidth) {
                    if (self.options.zoomType != "inner") {
                        if (self.newvaluewidth > self.newvalueheight) {
                            self.currentZoomLevel = self.newvaluewidth;
                        }
                    }
                    if (self.options.zoomType != "lens" && self.options.zoomType != "inner") {
                        self.changeBgSize = true;
                        self.zoomLens.css({
                            width: String((self.options.zoomWindowWidth) / self.widthRatio) + 'px'
                        })
                    }
                    if (self.options.zoomType == "lens" || self.options.zoomType == "inner") {
                        self.changeBgSize = true;
                    }
                }
                if (self.options.zoomType == "inner") {
                    self.changeBgSize = true;
                    if (self.nzWidth > self.nzHeight) {
                        self.currentZoomLevel = self.newvaluewidth;
                    }
                    if (self.nzHeight > self.nzWidth) {
                        self.currentZoomLevel = self.newvaluewidth;
                    }
                }
            }
            self.setPosition(self.currentLoc);
        },
        closeAll: function() {
            if (self.zoomWindow) {
                self.zoomWindow.hide();
            }
            if (self.zoomLens) {
                self.zoomLens.hide();
            }
            if (self.zoomTint) {
                self.zoomTint.hide();
            }
        },
        changeState: function(value) {
            var self = this;
            if (value == 'enable') {
                self.options.zoomEnabled = true;
            }
            if (value == 'disable') {
                self.options.zoomEnabled = false;
            }
        }
    };
    $.fn.elevateZoom = function(options) {
        return this.each(function() {
            var elevate = Object.create(ElevateZoom);
            elevate.init(options, this);
            $.data(this, 'elevateZoom', elevate);
        });
    }
    ;
    $.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: true,
        preloading: 0,
        zoomLevel: 1,
        scrollZoom: false,
        scrollZoomIncrement: 0.1,
        minZoomLevel: false,
        maxZoomLevel: false,
        easing: false,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: false,
        lensFadeOut: false,
        debug: false,
        zoomWindowFadeIn: false,
        zoomWindowFadeOut: false,
        zoomWindowAlwaysShow: false,
        zoomTintFadeIn: false,
        zoomTintFadeOut: false,
        borderSize: 4,
        showLens: true,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: false,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: false,
        tint: false,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: false,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: false,
        constrainType: false,
        constrainSize: false,
        loadingIcon: false,
        cursor: "default",
        responsive: true,
        onComplete: $.noop,
        onDestroy: function() {},
        onZoomedImageLoaded: function() {},
        onImageSwap: $.noop,
        onImageSwapComplete: $.noop
    };
}
)(jQuery, window, document);
!function(e) {
    if ("object" == typeof exports)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define(e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self),
        t.ShareButton = e()
    }
}(function() {
    return function e(t, n, o) {
        function i(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c)
                        return c(s, !0);
                    if (r)
                        return r(s, !0);
                    throw new Error("Cannot find module '" + s + "'")
                }
                var u = n[s] = {
                    exports: {}
                };
                t[s][0].call(u.exports, function(e) {
                    var n = t[s][1][e];
                    return i(n ? n : e)
                }, u, u.exports, e, t, n, o)
            }
            return n[s].exports
        }
        for (var r = "function" == typeof require && require, s = 0; s < o.length; s++)
            i(o[s]);
        return i
    }({
        1: [function(e, t, n) {
            e("../../modules/es6.array.iterator"),
            t.exports = e("../../modules/$.core").Array.values
        }
        , {
            "../../modules/$.core": 6,
            "../../modules/es6.array.iterator": 34
        }],
        2: [function(e, t, n) {
            e("../../modules/es6.math.trunc"),
            t.exports = e("../../modules/$.core").Math.trunc
        }
        , {
            "../../modules/$.core": 6,
            "../../modules/es6.math.trunc": 35
        }],
        3: [function(e, t, n) {
            e("../../modules/es6.symbol"),
            t.exports = e("../../modules/$.core").Symbol
        }
        , {
            "../../modules/$.core": 6,
            "../../modules/es6.symbol": 36
        }],
        4: [function(e, t, n) {
            var o = e("./$.is-object");
            t.exports = function(e) {
                if (!o(e))
                    throw TypeError(e + " is not an object!");
                return e
            }
        }
        , {
            "./$.is-object": 17
        }],
        5: [function(e, t, n) {
            var o = {}.toString;
            t.exports = function(e) {
                return o.call(e).slice(8, -1)
            }
        }
        , {}],
        6: [function(e, t, n) {
            var o = t.exports = {
                version: "1.2.1"
            };
            "number" == typeof __e && (__e = o)
        }
        , {}],
        7: [function(e, t, n) {
            var o = e("./$.global")
              , i = e("./$.core")
              , r = e("./$.hide")
              , s = e("./$.redef")
              , a = "prototype"
              , c = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            }
              , u = function(e, t, n) {
                var l, f, d, h, p = e & u.G, g = e & u.P, y = p ? o : e & u.S ? o[t] || (o[t] = {}) : (o[t] || {})[a], m = p ? i : i[t] || (i[t] = {});
                p && (n = t);
                for (l in n)
                    f = !(e & u.F) && y && l in y,
                    d = (f ? y : n)[l],
                    h = e & u.B && f ? c(d, o) : g && "function" == typeof d ? c(Function.call, d) : d,
                    y && !f && s(y, l, d),
                    m[l] != d && r(m, l, h),
                    g && ((m[a] || (m[a] = {}))[l] = d)
            };
            o.core = i,
            u.F = 1,
            u.G = 2,
            u.S = 4,
            u.P = 8,
            u.B = 16,
            u.W = 32,
            t.exports = u
        }
        , {
            "./$.core": 6,
            "./$.global": 12,
            "./$.hide": 14,
            "./$.redef": 26
        }],
        8: [function(e, t, n) {
            t.exports = function(e) {
                if (void 0 == e)
                    throw TypeError("Can't call method on  " + e);
                return e
            }
        }
        , {}],
        9: [function(e, t, n) {
            var o = e("./$");
            t.exports = function(e) {
                var t = o.getKeys(e)
                  , n = o.getSymbols;
                if (n)
                    for (var i, r = n(e), s = o.isEnum, a = 0; r.length > a; )
                        s.call(e, i = r[a++]) && t.push(i);
                return t
            }
        }
        , {
            "./$": 22
        }],
        10: [function(e, t, n) {
            t.exports = function(e) {
                try {
                    return !!e()
                } catch (t) {
                    return !0
                }
            }
        }
        , {}],
        11: [function(e, t, n) {
            var o = {}.toString
              , i = e("./$.to-iobject")
              , r = e("./$").getNames
              , s = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : []
              , a = function(e) {
                try {
                    return r(e)
                } catch (t) {
                    return s.slice()
                }
            };
            t.exports.get = function(e) {
                return s && "[object Window]" == o.call(e) ? a(e) : r(i(e))
            }
        }
        , {
            "./$": 22,
            "./$.to-iobject": 30
        }],
        12: [function(e, t, n) {
            var o = "undefined"
              , i = t.exports = typeof window != o && window.Math == Math ? window : typeof self != o && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = i)
        }
        , {}],
        13: [function(e, t, n) {
            var o = {}.hasOwnProperty;
            t.exports = function(e, t) {
                return o.call(e, t)
            }
        }
        , {}],
        14: [function(e, t, n) {
            var o = e("./$")
              , i = e("./$.property-desc");
            t.exports = e("./$.support-desc") ? function(e, t, n) {
                return o.setDesc(e, t, i(1, n))
            }
            : function(e, t, n) {
                return e[t] = n,
                e
            }
        }
        , {
            "./$": 22,
            "./$.property-desc": 25,
            "./$.support-desc": 28
        }],
        15: [function(e, t, n) {
            var o = e("./$.cof");
            t.exports = 0 in Object("z") ? Object : function(e) {
                return "String" == o(e) ? e.split("") : Object(e)
            }
        }
        , {
            "./$.cof": 5
        }],
        16: [function(e, t, n) {
            var o = e("./$.cof");
            t.exports = Array.isArray || function(e) {
                return "Array" == o(e)
            }
        }
        , {
            "./$.cof": 5
        }],
        17: [function(e, t, n) {
            t.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        }
        , {}],
        18: [function(e, t, n) {
            "use strict";
            var o = e("./$")
              , i = {};
            e("./$.hide")(i, e("./$.wks")("iterator"), function() {
                return this
            }),
            t.exports = function(t, n, r) {
                t.prototype = o.create(i, {
                    next: e("./$.property-desc")(1, r)
                }),
                e("./$.tag")(t, n + " Iterator")
            }
        }
        , {
            "./$": 22,
            "./$.hide": 14,
            "./$.property-desc": 25,
            "./$.tag": 29,
            "./$.wks": 33
        }],
        19: [function(e, t, n) {
            "use strict";
            var o = e("./$.library")
              , i = e("./$.def")
              , r = e("./$.redef")
              , s = e("./$.hide")
              , a = e("./$.has")
              , c = e("./$.wks")("iterator")
              , u = e("./$.iterators")
              , l = !([].keys && "next"in [].keys())
              , f = "@@iterator"
              , d = "keys"
              , h = "values"
              , p = function() {
                return this
            };
            t.exports = function(t, n, g, y, m, v, b) {
                e("./$.iter-create")(g, n, y);
                var k, w, $ = function(e) {
                    switch (e) {
                    case d:
                        return function() {
                            return new g(this,e)
                        }
                        ;
                    case h:
                        return function() {
                            return new g(this,e)
                        }
                    }
                    return function() {
                        return new g(this,e)
                    }
                }, _ = n + " Iterator", S = t.prototype, j = S[c] || S[f] || m && S[m], x = j || $(m);
                if (j) {
                    var O = e("./$").getProto(x.call(new t));
                    e("./$.tag")(O, _, !0),
                    !o && a(S, f) && s(O, c, p)
                }
                if ((!o || b) && s(S, c, x),
                u[n] = x,
                u[_] = p,
                m)
                    if (k = {
                        keys: v ? x : $(d),
                        values: m == h ? x : $(h),
                        entries: m != h ? x : $("entries")
                    },
                    b)
                        for (w in k)
                            w in S || r(S, w, k[w]);
                    else
                        i(i.P + i.F * l, n, k)
            }
        }
        , {
            "./$": 22,
            "./$.def": 7,
            "./$.has": 13,
            "./$.hide": 14,
            "./$.iter-create": 18,
            "./$.iterators": 21,
            "./$.library": 24,
            "./$.redef": 26,
            "./$.tag": 29,
            "./$.wks": 33
        }],
        20: [function(e, t, n) {
            t.exports = function(e, t) {
                return {
                    value: t,
                    done: !!e
                }
            }
        }
        , {}],
        21: [function(e, t, n) {
            t.exports = {}
        }
        , {}],
        22: [function(e, t, n) {
            var o = Object;
            t.exports = {
                create: o.create,
                getProto: o.getPrototypeOf,
                isEnum: {}.propertyIsEnumerable,
                getDesc: o.getOwnPropertyDescriptor,
                setDesc: o.defineProperty,
                setDescs: o.defineProperties,
                getKeys: o.keys,
                getNames: o.getOwnPropertyNames,
                getSymbols: o.getOwnPropertySymbols,
                each: [].forEach
            }
        }
        , {}],
        23: [function(e, t, n) {
            var o = e("./$")
              , i = e("./$.to-iobject");
            t.exports = function(e, t) {
                for (var n, r = i(e), s = o.getKeys(r), a = s.length, c = 0; a > c; )
                    if (r[n = s[c++]] === t)
                        return n
            }
        }
        , {
            "./$": 22,
            "./$.to-iobject": 30
        }],
        24: [function(e, t, n) {
            t.exports = !1
        }
        , {}],
        25: [function(e, t, n) {
            t.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        }
        , {}],
        26: [function(e, t, n) {
            var o = e("./$.global")
              , i = e("./$.hide")
              , r = e("./$.uid")("src")
              , s = "toString"
              , a = Function[s]
              , c = ("" + a).split(s);
            e("./$.core").inspectSource = function(e) {
                return a.call(e)
            }
            ,
            (t.exports = function(e, t, n, s) {
                "function" == typeof n && (i(n, r, e[t] ? "" + e[t] : c.join(String(t))),
                "name"in n || (n.name = t)),
                e === o ? e[t] = n : (s || delete e[t],
                i(e, t, n))
            }
            )(Function.prototype, s, function() {
                return "function" == typeof this && this[r] || a.call(this)
            })
        }
        , {
            "./$.core": 6,
            "./$.global": 12,
            "./$.hide": 14,
            "./$.uid": 31
        }],
        27: [function(e, t, n) {
            var o = e("./$.global")
              , i = "__core-js_shared__"
              , r = o[i] || (o[i] = {});
            t.exports = function(e) {
                return r[e] || (r[e] = {})
            }
        }
        , {
            "./$.global": 12
        }],
        28: [function(e, t, n) {
            t.exports = !e("./$.fails")(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }
        , {
            "./$.fails": 10
        }],
        29: [function(e, t, n) {
            var o = e("./$.has")
              , i = e("./$.hide")
              , r = e("./$.wks")("toStringTag");
            t.exports = function(e, t, n) {
                e && !o(e = n ? e : e.prototype, r) && i(e, r, t)
            }
        }
        , {
            "./$.has": 13,
            "./$.hide": 14,
            "./$.wks": 33
        }],
        30: [function(e, t, n) {
            var o = e("./$.iobject")
              , i = e("./$.defined");
            t.exports = function(e) {
                return o(i(e))
            }
        }
        , {
            "./$.defined": 8,
            "./$.iobject": 15
        }],
        31: [function(e, t, n) {
            var o = 0
              , i = Math.random();
            t.exports = function(e) {
                return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + i).toString(36))
            }
        }
        , {}],
        32: [function(e, t, n) {
            var o = e("./$.wks")("unscopables");
            void 0 == [][o] && e("./$.hide")(Array.prototype, o, {}),
            t.exports = function(e) {
                [][o][e] = !0
            }
        }
        , {
            "./$.hide": 14,
            "./$.wks": 33
        }],
        33: [function(e, t, n) {
            var o = e("./$.shared")("wks")
              , i = e("./$.global").Symbol;
            t.exports = function(t) {
                return o[t] || (o[t] = i && i[t] || (i || e("./$.uid"))("Symbol." + t))
            }
        }
        , {
            "./$.global": 12,
            "./$.shared": 27,
            "./$.uid": 31
        }],
        34: [function(e, t, n) {
            "use strict";
            var o = e("./$.unscope")
              , i = e("./$.iter-step")
              , r = e("./$.iterators")
              , s = e("./$.to-iobject");
            e("./$.iter-define")(Array, "Array", function(e, t) {
                this._t = s(e),
                this._i = 0,
                this._k = t
            }, function() {
                var e = this._t
                  , t = this._k
                  , n = this._i++;
                return !e || n >= e.length ? (this._t = void 0,
                i(1)) : "keys" == t ? i(0, n) : "values" == t ? i(0, e[n]) : i(0, [n, e[n]])
            }, "values"),
            r.Arguments = r.Array,
            o("keys"),
            o("values"),
            o("entries")
        }
        , {
            "./$.iter-define": 19,
            "./$.iter-step": 20,
            "./$.iterators": 21,
            "./$.to-iobject": 30,
            "./$.unscope": 32
        }],
        35: [function(e, t, n) {
            var o = e("./$.def");
            o(o.S, "Math", {
                trunc: function(e) {
                    return (e > 0 ? Math.floor : Math.ceil)(e)
                }
            })
        }
        , {
            "./$.def": 7
        }],
        36: [function(e, t, n) {
            "use strict";
            var o = e("./$")
              , i = e("./$.global")
              , r = e("./$.has")
              , s = e("./$.support-desc")
              , a = e("./$.def")
              , c = e("./$.redef")
              , u = e("./$.fails")
              , l = e("./$.shared")
              , f = e("./$.tag")
              , d = e("./$.uid")
              , h = e("./$.wks")
              , p = e("./$.keyof")
              , g = e("./$.get-names")
              , y = e("./$.enum-keys")
              , m = e("./$.is-array")
              , v = (e("./$.is-object"),
            e("./$.an-object"))
              , b = e("./$.to-iobject")
              , k = e("./$.property-desc")
              , w = o.getDesc
              , $ = o.setDesc
              , _ = o.create
              , S = g.get
              , j = i.Symbol
              , x = i.JSON
              , O = x && x.stringify
              , C = !1
              , P = h("_hidden")
              , L = o.isEnum
              , E = l("symbol-registry")
              , F = l("symbols")
              , A = "function" == typeof j
              , N = Object.prototype
              , T = s && u(function() {
                return 7 != _($({}, "a", {
                    get: function() {
                        return $(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }) ? function(e, t, n) {
                var o = w(N, t);
                o && delete N[t],
                $(e, t, n),
                o && e !== N && $(N, t, o)
            }
            : $
              , I = function(e) {
                var t = F[e] = _(j.prototype);
                return t._k = e,
                s && C && T(N, e, {
                    configurable: !0,
                    set: function(t) {
                        r(this, P) && r(this[P], e) && (this[P][e] = !1),
                        T(this, e, k(1, t))
                    }
                }),
                t
            }
              , B = function(e) {
                return "symbol" == typeof e
            }
              , D = function(e, t, n) {
                return n && r(F, t) ? (n.enumerable ? (r(e, P) && e[P][t] && (e[P][t] = !1),
                n = _(n, {
                    enumerable: k(0, !1)
                })) : (r(e, P) || $(e, P, k(1, {})),
                e[P][t] = !0),
                T(e, t, n)) : $(e, t, n)
            }
              , M = function(e, t) {
                v(e);
                for (var n, o = y(t = b(t)), i = 0, r = o.length; r > i; )
                    D(e, n = o[i++], t[n]);
                return e
            }
              , H = function(e, t) {
                return void 0 === t ? _(e) : M(_(e), t)
            }
              , q = function(e) {
                var t = L.call(this, e);
                return t || !r(this, e) || !r(F, e) || r(this, P) && this[P][e] ? t : !0
            }
              , W = function(e, t) {
                var n = w(e = b(e), t);
                return !n || !r(F, t) || r(e, P) && e[P][t] || (n.enumerable = !0),
                n
            }
              , z = function(e) {
                for (var t, n = S(b(e)), o = [], i = 0; n.length > i; )
                    r(F, t = n[i++]) || t == P || o.push(t);
                return o
            }
              , U = function(e) {
                for (var t, n = S(b(e)), o = [], i = 0; n.length > i; )
                    r(F, t = n[i++]) && o.push(F[t]);
                return o
            }
              , R = function(e) {
                for (var t, n, o = [e], i = 1; arguments.length > i; )
                    o.push(arguments[i++]);
                return t = o[1],
                "function" == typeof t && (n = t),
                (n || !m(t)) && (t = function(e, t) {
                    return n && (t = n.call(this, e, t)),
                    B(t) ? void 0 : t
                }
                ),
                o[1] = t,
                O.apply(x, o)
            }
              , J = u(function() {
                var e = j();
                return "[null]" != O([e]) || "{}" != O({
                    a: e
                }) || "{}" != O(Object(e))
            });
            A || (j = function() {
                if (B(this))
                    throw TypeError("Symbol is not a constructor");
                return I(d(arguments[0]))
            }
            ,
            c(j.prototype, "toString", function() {
                return this._k
            }),
            B = function(e) {
                return e instanceof j
            }
            ,
            o.create = H,
            o.isEnum = q,
            o.getDesc = W,
            o.setDesc = D,
            o.setDescs = M,
            o.getNames = g.get = z,
            o.getSymbols = U,
            s && !e("./$.library") && c(N, "propertyIsEnumerable", q, !0));
            var G = {
                "for": function(e) {
                    return r(E, e += "") ? E[e] : E[e] = j(e)
                },
                keyFor: function(e) {
                    return p(E, e)
                },
                useSetter: function() {
                    C = !0
                },
                useSimple: function() {
                    C = !1
                }
            };
            o.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(e) {
                var t = h(e);
                G[e] = A ? t : I(t)
            }),
            C = !0,
            a(a.G + a.W, {
                Symbol: j
            }),
            a(a.S, "Symbol", G),
            a(a.S + a.F * !A, "Object", {
                create: H,
                defineProperty: D,
                defineProperties: M,
                getOwnPropertyDescriptor: W,
                getOwnPropertyNames: z,
                getOwnPropertySymbols: U
            }),
            x && a(a.S + a.F * (!A || J), "JSON", {
                stringify: R
            }),
            f(j, "Symbol"),
            f(Math, "Math", !0),
            f(i.JSON, "JSON", !0)
        }
        , {
            "./$": 22,
            "./$.an-object": 4,
            "./$.def": 7,
            "./$.enum-keys": 9,
            "./$.fails": 10,
            "./$.get-names": 11,
            "./$.global": 12,
            "./$.has": 13,
            "./$.is-array": 16,
            "./$.is-object": 17,
            "./$.keyof": 23,
            "./$.library": 24,
            "./$.property-desc": 25,
            "./$.redef": 26,
            "./$.shared": 27,
            "./$.support-desc": 28,
            "./$.tag": 29,
            "./$.to-iobject": 30,
            "./$.uid": 31,
            "./$.wks": 33
        }],
        37: [function(e, t, n) {
            "use strict";
            function o(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function r(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1,
                        o.configurable = !0,
                        "value"in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n),
                    o && e(t, o),
                    t
                }
            }()
              , a = function(e, t, n) {
                for (var o = !0; o; ) {
                    var i = e
                      , r = t
                      , s = n;
                    a = u = c = void 0,
                    o = !1,
                    null === i && (i = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(i, r);
                    if (void 0 !== a) {
                        if ("value"in a)
                            return a.value;
                        var c = a.get;
                        return void 0 === c ? void 0 : c.call(s)
                    }
                    var u = Object.getPrototypeOf(i);
                    if (null === u)
                        return void 0;
                    e = u,
                    t = r,
                    n = s,
                    o = !0
                }
            }
              , c = e("./share-utils")
              , u = o(c);
            e("core-js/fn/symbol"),
            e("core-js/fn/array/iterator"),
            e("core-js/fn/math/trunc");
            var l = function(e) {
                function t(e, n) {
                    i(this, t),
                    a(Object.getPrototypeOf(t.prototype), "constructor", this).call(this),
                    "object" == typeof e ? (this.element = void 0,
                    n = e) : this.element = e,
                    this.el = {
                        head: document.getElementsByTagName("head")[0],
                        body: document.getElementsByTagName("body")[0]
                    },
                    this.config = {
                        enabledNetworks: 0,
                        protocol: "//",
                        url: window.location.href,
                        caption: null,
                        title: this._defaultTitle(),
                        image: this._defaultImage(),
                        description: this._defaultDescription(),
                        ui: {
                            flyout: "sb-top sb-center",
                            buttonText: "Share",
                            namespace: "sb-",
                            networkOrder: [],
                            collision: !1,
                            updateShareButtonSize: !0
                        },
                        networks: {
                            googlePlus: {
                                enabled: !0,
                                url: null
                            },
                            twitter: {
                                enabled: !0,
                                url: null,
                                description: null
                            },
                            facebook: {
                                enabled: !0,
                                loadSdk: !0,
                                url: null,
                                appId: null,
                                title: null,
                                caption: null,
                                description: null,
                                image: null
                            },
                            pinterest: {
                                enabled: !0,
                                url: null,
                                image: null,
                                description: null
                            },
                            reddit: {
                                enabled: !0,
                                url: null,
                                title: null
                            },
                            linkedin: {
                                enabled: !0,
                                url: null,
                                title: null,
                                description: null
                            },
                            whatsapp: {
                                enabled: !0,
                                description: null,
                                url: null
                            },
                            email: {
                                enabled: !0,
                                title: null,
                                description: null
                            }
                        }
                    },
                    this.listener = null,
                    this._setup(this.element, n)
                }
                return r(t, e),
                s(t, [{
                    key: "open",
                    value: function() {
                        this._public("Open")
                    }
                }, {
                    key: "close",
                    value: function() {
                        this._public("Close")
                    }
                }, {
                    key: "toggle",
                    value: function() {
                        this._public("Toggle")
                    }
                }, {
                    key: "toggleListen",
                    value: function() {
                        this._public("Listen")
                    }
                }, {
                    key: "_public",
                    value: function(e) {
                        var n = void 0;
                        n = "undefined" == typeof element ? a(Object.getPrototypeOf(t.prototype), "_objToArray", this).call(this, document.getElementsByTagName("share-button")) : document.querySelectorAll(element);
                        var o = !0
                          , i = !1
                          , r = void 0;
                        try {
                            for (var s, c = n[Symbol.iterator](); !(o = (s = c.next()).done); o = !0) {
                                var u = s.value
                                  , l = u.getElementsByClassName(this.config.ui.namespace + "social")[0];
                                this["_event" + e](u, l)
                            }
                        } catch (f) {
                            i = !0,
                            r = f
                        } finally {
                            try {
                                !o && c["return"] && c["return"]()
                            } finally {
                                if (i)
                                    throw r
                            }
                        }
                    }
                }, {
                    key: "_setup",
                    value: function(e, n) {
                        var o = void 0;
                        "undefined" == typeof e ? o = a(Object.getPrototypeOf(t.prototype), "_objToArray", this).call(this, document.getElementsByTagName("share-button")) : (o = document.querySelectorAll("share-button" + e),
                        "object" == typeof o && (o = a(Object.getPrototypeOf(t.prototype), "_objToArray", this).call(this, o))),
                        this._merge(this.config, n),
                        this.config.networks.whatsapp.enabled && !this._isMobile() && (this.config.networks.whatsapp.enabled = !1),
                        0 === this.config.ui.networkOrder.length && (this.config.ui.networkOrder = ["pinterest", "twitter", "facebook", "whatsapp", "googlePlus", "reddit", "linkedin", "email"]);
                        var i = !0
                          , r = !1
                          , s = void 0;
                        try {
                            for (var c, u = Object.keys(this.config.networks)[Symbol.iterator](); !(i = (c = u.next()).done); i = !0) {
                                var l = c.value;
                                this.config.ui.networkOrder.indexOf(l.toString()) < 0 && (this.config.networks[l].enabled = !1,
                                this.config.ui.networkOrder.push(l))
                            }
                        } catch (f) {
                            r = !0,
                            s = f
                        } finally {
                            try {
                                !i && u["return"] && u["return"]()
                            } finally {
                                if (r)
                                    throw s
                            }
                        }
                        this._fixFlyout(),
                        this._detectNetworks(),
                        this._normalizeNetworkConfiguration(),
                        this.config.networks.facebook.enabled && this.config.networks.facebook.loadSdk && this._injectFacebookSdk();
                        var d = 0
                          , h = !0
                          , p = !1
                          , g = void 0;
                        try {
                            for (var y, m = o[Symbol.iterator](); !(h = (y = m.next()).done); h = !0) {
                                var v = y.value;
                                this._setupInstance(v, d++)
                            }
                        } catch (f) {
                            p = !0,
                            g = f
                        } finally {
                            try {
                                !h && m["return"] && m["return"]()
                            } finally {
                                if (p)
                                    throw g
                            }
                        }
                    }
                }, {
                    key: "_setupInstance",
                    value: function(e, t) {
                        var n = this;
                        this._hide(e),
                        this._addClass(e, "sharer-" + t),
                        this._injectHtml(e),
                        this._show(e);
                        var o = e.getElementsByClassName(this.config.ui.namespace + "social")[0]
                          , i = e.getElementsByTagName("li");
                        this._addClass(o, "networks-" + this.config.enabledNetworks),
                        e.addEventListener("click", function() {
                            return n._eventToggle(e, o)
                        });
                        var r = function(t) {
                            var o = i[t];
                            "undefined" != typeof o && !function() {
                                var t = o.getAttribute("data-network")
                                  , i = o.getElementsByTagName("a")[0];
                                n._addClass(o, n.config.networks[t]["class"]),
                                "email" !== o.className && i.setAttribute("onclick", "return false"),
                                i.addEventListener("mousedown", function() {
                                    n._hook("before", t, e)
                                }),
                                i.addEventListener("mouseup", function() {
                                    n["_network" + t.capFLetter()](o)
                                }),
                                i.addEventListener("click", function() {
                                    n._hook("after", t, e)
                                })
                            }()
                        };
                        for (var s in Object.keys(i))
                            r(s)
                    }
                }, {
                    key: "_eventToggle",
                    value: function(e, t) {
                        this._hasClass(t, "active") ? this._eventClose(t) : this._eventOpen(e, t)
                    }
                }, {
                    key: "_eventOpen",
                    value: function(e, t) {
                        this._hasClass(t, "load") && this._removeClass(t, "load"),
                        this.collision && this._collisionDetection(e, t),
                        this._addClass(t, "active")
                    }
                }, {
                    key: "_eventClose",
                    value: function(e) {
                        this._removeClass(e, "active")
                    }
                }, {
                    key: "_eventListen",
                    value: function(e, t) {
                        var n = this
                          , o = this._getDimensions(e, t);
                        null === this.listener ? this.listener = window.setInterval(function() {
                            return n._adjustClasses(e, t, o)
                        }, 100) : (window.clearInterval(this.listener),
                        this.listener = null)
                    }
                }, {
                    key: "_fixFlyout",
                    value: function() {
                        var e = this.config.ui.flyout.split(" ");
                        e[0].substring(0, this.config.ui.namespace.length) !== this.config.ui.namespace && (e[0] = "" + this.config.ui.namespace + e[0]),
                        e[1].substring(0, this.config.ui.namespace.length) !== this.config.ui.namespace && (e[1] = "" + this.config.ui.namespace + e[1]),
                        this.config.ui.flyout = e.join(" ")
                    }
                }, {
                    key: "_collisionDetection",
                    value: function(e, t) {
                        var n = this
                          , o = this._getDimensions(e, t);
                        this._adjustClasses(e, t, o),
                        e.classList.contains("clicked") || (window.addEventListener("scroll", function() {
                            return n._adjustClasses(e, o)
                        }),
                        window.addEventListener("resize", function() {
                            return n._adjustClasses(e, o)
                        }),
                        e.classList.add("clicked"))
                    }
                }, {
                    key: "_getDimensions",
                    value: function(e, t) {
                        return {
                            networksWidth: t.offsetWidth,
                            buttonHeight: e.offsetHeight,
                            buttonWidth: e.offsetWidth
                        }
                    }
                }, {
                    key: "_adjustClasses",
                    value: function(e, t, n) {
                        var o = window.innerWidth
                          , i = window.innerHeight
                          , r = e.getBoundingClientRect().left + n.buttonWidth / 2
                          , s = o - r
                          , a = e.getBoundingClientRect().top + n.buttonHeight / 2
                          , c = this._findLocation(r, a, o, i);
                        if ("middle" === c[1] && "center" !== c[0] && ("left" === c[0] && o <= r + 220 + n.buttonWidth / 2 || "right" === c[0] && o <= s + 220 + n.buttonWidth / 2))
                            t.classList.add(this.config.ui.namespace + "top"),
                            t.classList.remove(this.config.ui.namespace + "middle"),
                            t.classList.remove(this.config.ui.namespace + "bottom");
                        else {
                            switch (c[0]) {
                            case "left":
                                t.classList.add(this.config.ui.namespace + "right"),
                                t.classList.remove(this.config.ui.namespace + "center"),
                                t.classList.remove(this.config.ui.namespace + "left");
                                break;
                            case "center":
                                "top" !== c[1] && t.classList.add(this.config.ui.namespace + "top"),
                                t.classList.add(this.config.ui.namespace + "center"),
                                t.classList.remove(this.config.ui.namespace + "left"),
                                t.classList.remove(this.config.ui.namespace + "right"),
                                t.classList.remove(this.config.ui.namespace + "middle");
                                break;
                            case "right":
                                t.classList.add(this.config.ui.namespace + "left"),
                                t.classList.remove(this.config.ui.namespace + "center"),
                                t.classList.remove(this.config.ui.namespace + "right")
                            }
                            switch (c[1]) {
                            case "top":
                                t.classList.add(this.config.ui.namespace + "bottom"),
                                t.classList.remove(this.config.ui.namespace + "middle"),
                                "center" !== c[0] && t.classList.remove(this.config.ui.namespace + "top");
                                break;
                            case "middle":
                                "center" !== c[0] && (t.classList.add(this.config.ui.namespace + "middle"),
                                t.classList.remove(this.config.ui.namespace + "top")),
                                t.classList.remove(this.config.ui.namespace + "bottom");
                                break;
                            case "bottom":
                                t.classList.add(this.config.ui.namespace + "top"),
                                t.classList.remove(this.config.ui.namespace + "middle"),
                                t.classList.remove(this.config.ui.namespace + "bottom")
                            }
                        }
                    }
                }, {
                    key: "_findLocation",
                    value: function(e, t, n, o) {
                        var i = ["left", "center", "right"]
                          , r = ["top", "middle", "bottom"]
                          , s = Math.trunc(3 * (1 - (n - e) / n))
                          , a = Math.trunc(3 * (1 - (o - t) / o));
                        return s >= 3 ? s = 2 : -1 >= s && (s = 0),
                        a >= 3 ? a = 2 : -1 >= a && (a = 0),
                        [i[s], r[a]]
                    }
                }, {
                    key: "_networkFacebook",
                    value: function(e) {
                        return this.config.networks.facebook.loadSdk ? window.FB ? (this._updateHref(e, "https://www.facebook.com/sharer/sharer.php", {
                            u: this.config.networks.facebook.url
                        }),
                        FB.ui({
                            method: "feed",
                            name: this.config.networks.facebook.title,
                            link: this.config.networks.facebook.url,
                            picture: this.config.networks.facebook.image,
                            caption: this.config.networks.facebook.caption,
                            description: this.config.networks.facebook.description
                        })) : console.error("The Facebook JS SDK hasn't loaded yet.") : this._updateHref(e, "https://www.facebook.com/sharer/sharer.php", {
                            u: this.config.networks.facebook.url
                        })
                    }
                }, {
                    key: "_networkTwitter",
                    value: function(e) {
                        this._updateHref(e, "https://twitter.com/intent/tweet", {
                            text: this.config.networks.twitter.description,
                            url: this.config.networks.twitter.url
                        })
                    }
                }, {
                    key: "_networkGooglePlus",
                    value: function(e) {
                        this._updateHref(e, "https://plus.google.com/share", {
                            url: this.config.networks.googlePlus.url
                        })
                    }
                }, {
                    key: "_networkPinterest",
                    value: function(e) {
                        this._updateHref(e, "https://www.pinterest.com/pin/create/button", {
                            url: this.config.networks.pinterest.url,
                            media: this.config.networks.pinterest.image,
                            description: this.config.networks.pinterest.description
                        })
                    }
                }, {
                    key: "_networkLinkedin",
                    value: function(e) {
                        this._updateHref(e, "https://www.linkedin.com/shareArticle", {
                            mini: "true",
                            url: this.config.networks.linkedin.url,
                            title: this.config.networks.linkedin.title,
                            summary: this.config.networks.linkedin.description
                        })
                    }
                }, {
                    key: "_networkEmail",
                    value: function(e) {
                        this._updateHref(e, "mailto:", {
                            subject: this.config.networks.email.title,
                            body: this.config.networks.email.description
                        })
                    }
                }, {
                    key: "_networkReddit",
                    value: function(e) {
                        this._updateHref(e, "http://www.reddit.com/submit", {
                            url: this.config.networks.reddit.url,
                            title: this.config.networks.reddit.title
                        })
                    }
                }, {
                    key: "_networkWhatsapp",
                    value: function(e) {
                        this._updateHref(e, "whatsapp://send", {
                            text: this.config.networks.whatsapp.description + " " + this.config.networks.whatsapp.url
                        })
                    }
                }, {
                    key: "_injectStylesheet",
                    value: function(e) {
                        if (!this.el.head.querySelector("link[href='" + e + "']")) {
                            var t = document.createElement("link");
                            t.setAttribute("rel", "stylesheet"),
                            t.setAttribute("href", e),
                            this.el.head.appendChild(t)
                        }
                    }
                }, {
                    key: "_injectHtml",
                    value: function(e) {
                        var t = this.config.ui.networkOrder
                          , n = ""
                          , o = !0
                          , i = !1
                          , r = void 0;
                        try {
                            for (var s, a = t[Symbol.iterator](); !(o = (s = a.next()).done); o = !0) {
                                var c = s.value;
                                n += "<li class='" + c + "' data-network='" + c + "'><a></a></li>"
                            }
                        } catch (u) {
                            i = !0,
                            r = u
                        } finally {
                            try {
                                !o && a["return"] && a["return"]()
                            } finally {
                                if (i)
                                    throw r
                            }
                        }
                        e.innerHTML = this.config.ui.buttonText + "<div class='" + this.config.ui.namespace + "social load " + this.config.ui.flyout + "'><ul>" + n + "</ul></div>"
                    }
                }, {
                    key: "_injectFacebookSdk",
                    value: function() {
                        if (!window.FB && this.config.networks.facebook.appId && !this.el.body.querySelector("#fb-root")) {
                            var e = document.createElement("script");
                            e.text = "window.fbAsyncInit=function(){FB.init({appId:'" + this.config.networks.facebook.appId + "',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if (e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='//connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk');";
                            var t = document.createElement("div");
                            t.id = "fb-root",
                            this.el.body.appendChild(t),
                            this.el.body.appendChild(e)
                        }
                    }
                }, {
                    key: "_hook",
                    value: function(e, t, n) {
                        var o = this.config.networks[t][e];
                        if ("function" == typeof o) {
                            var i = o.call(this.config.networks[t], n);
                            void 0 !== i && (i = this._normalizeFilterConfigUpdates(i),
                            this.extend(this.config.networks[t], i, !0),
                            this._normalizeNetworkConfiguration())
                        }
                    }
                }, {
                    key: "_defaultTitle",
                    value: function() {
                        var e = void 0;
                        return (e = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]')) ? e.getAttribute("content") : (e = document.querySelector("title")) ? e.textContent || e.innerText : void 0
                    }
                }, {
                    key: "_defaultImage",
                    value: function() {
                        var e = void 0;
                        return (e = document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="twitter:image"]')) ? e.getAttribute("content") : void 0
                    }
                }, {
                    key: "_defaultDescription",
                    value: function() {
                        var e = void 0;
                        return (e = document.querySelector('meta[property="og:description"]') || document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[name="description"]')) ? e.getAttribute("content") : ""
                    }
                }, {
                    key: "_detectNetworks",
                    value: function() {
                        var e = !0
                          , t = !1
                          , n = void 0;
                        try {
                            for (var o, i = Object.keys(this.config.networks)[Symbol.iterator](); !(e = (o = i.next()).done); e = !0) {
                                var r = o.value
                                  , s = !0
                                  , a = !1
                                  , c = void 0;
                                try {
                                    for (var u, l = Object.keys(this.config.networks[r])[Symbol.iterator](); !(s = (u = l.next()).done); s = !0) {
                                        var f = u.value;
                                        null === this.config.networks[r][f] && (this.config.networks[r][f] = this.config[f])
                                    }
                                } catch (d) {
                                    a = !0,
                                    c = d
                                } finally {
                                    try {
                                        !s && l["return"] && l["return"]()
                                    } finally {
                                        if (a)
                                            throw c
                                    }
                                }
                                this.config.networks[r].enabled ? (this["class"] = "enabled",
                                this.config.enabledNetworks += 1) : this["class"] = "disabled",
                                this.config.networks[r]["class"] = this["class"]
                            }
                        } catch (d) {
                            t = !0,
                            n = d
                        } finally {
                            try {
                                !e && i["return"] && i["return"]()
                            } finally {
                                if (t)
                                    throw n
                            }
                        }
                    }
                }, {
                    key: "_normalizeNetworkConfiguration",
                    value: function() {
                        this.config.networks.facebook.appId || (this.config.networks.facebook.loadSdk = !1),
                        this.config.networks.twitter.description && (this._isEncoded(this.config.networks.twitter.description) || (this.config.networks.twitter.description = encodeURIComponent(this.config.networks.twitter.description))),
                        "number" == typeof this.config.networks.facebook.appId && (this.config.networks.facebook.appId = this.config.networks.facebook.appId.toString())
                    }
                }, {
                    key: "_normalizeFilterConfigUpdates",
                    value: function(e) {
                        return this.config.networks.facebook.appId !== e.appId && (console.warn("You are unable to change the Facebook appId after the button has been initialized. Please update your Facebook filters accordingly."),
                        delete e.appId),
                        this.config.networks.facebook.loadSdk !== e.loadSdk && (console.warn("You are unable to change the Facebook loadSdk option after the button has been initialized. Please update your Facebook filters accordingly."),
                        delete e.appId),
                        e
                    }
                }]),
                t
            }(u["default"]);
            t.exports = l
        }
        , {
            "./share-utils": 38,
            "core-js/fn/array/iterator": 1,
            "core-js/fn/math/trunc": 2,
            "core-js/fn/symbol": 3
        }],
        38: [function(e, t, n) {
            "use strict";
            function o(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1,
                        o.configurable = !0,
                        "value"in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n),
                    o && e(t, o),
                    t
                }
            }()
              , r = function() {
                function e() {
                    o(this, e)
                }
                return i(e, [{
                    key: "_getStyle",
                    value: function(e, t) {
                        var n = "";
                        return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "").getPropertyValue(t) : e.currentStyle && (t = t.replace(/\-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        }),
                        n = e.currentStyle[t]),
                        n
                    }
                }, {
                    key: "_hide",
                    value: function(e) {
                        e.style.display = "none"
                    }
                }, {
                    key: "_show",
                    value: function(e) {
                        e.style.display = "initial"
                    }
                }, {
                    key: "_hasClass",
                    value: function(e, t) {
                        return e.classList.contains(t)
                    }
                }, {
                    key: "_addClass",
                    value: function(e, t) {
                        e.classList.add(t)
                    }
                }, {
                    key: "_removeClass",
                    value: function(e, t) {
                        e.classList.remove(t)
                    }
                }, {
                    key: "_isEncoded",
                    value: function(e) {
                        return e = e.toRFC3986(),
                        decodeURIComponent(e) !== e
                    }
                }, {
                    key: "_encode",
                    value: function(e) {
                        return "undefined" == typeof e || null === e || this._isEncoded(e) ? encodeURIComponent(e) : e.toRFC3986()
                    }
                }, {
                    key: "_getUrl",
                    value: function(e) {
                        var t = this
                          , n = (arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
                        arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2])
                          , o = function() {
                            var e = []
                              , o = !0
                              , i = !1
                              , r = void 0;
                            try {
                                for (var s, a = Object.keys(n)[Symbol.iterator](); !(o = (s = a.next()).done); o = !0) {
                                    var c = s.value
                                      , u = n[c];
                                    e.push(c + "=" + t._encode(u))
                                }
                            } catch (l) {
                                i = !0,
                                r = l
                            } finally {
                                try {
                                    !o && a["return"] && a["return"]()
                                } finally {
                                    if (i)
                                        throw r
                                }
                            }
                            return e.join("&")
                        }();
                        return o && (o = "?" + o),
                        e + o
                    }
                }, {
                    key: "_updateHref",
                    value: function(e, t, n) {
                        var o = t.indexOf("mailto:") >= 0
                          , i = e.getElementsByTagName("a")[0];
                        if (i.setAttribute("href", this._getUrl(t, !o, n)),
                        !(o || this.config.networks.facebook.loadSdk && "facebook" === e.getAttribute("class"))) {
                            var r = {
                                width: 500,
                                height: 350
                            };
                            r.top = screen.height / 2 - r.height / 2,
                            r.left = screen.width / 2 - r.width / 2,
                            window.open(i.href, "targetWindow", "\n          toolbar=no,\n          location=no,\n          status=no,\n          menubar=no,\n          scrollbars=yes,\n          resizable=yes,\n          left=" + r.left + ",\n          top=" + r.top + ",\n          width=" + r.width + ",\n          height=" + r.height + "\n        ")
                        }
                    }
                }, {
                    key: "popup",
                    value: function t(e) {
                        var n = this
                          , o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                          , t = {
                            width: 500,
                            height: 350
                        };
                        t.top = screen.height / 2 - t.height / 2,
                        t.left = screen.width / 2 - t.width / 2;
                        var i = function() {
                            var e = []
                              , t = !0
                              , i = !1
                              , r = void 0;
                            try {
                                for (var s, a = Object.keys(o)[Symbol.iterator](); !(t = (s = a.next()).done); t = !0) {
                                    var c = s.value
                                      , u = o[c];
                                    e.push(c + "=" + n._encode(u))
                                }
                            } catch (l) {
                                i = !0,
                                r = l
                            } finally {
                                try {
                                    !t && a["return"] && a["return"]()
                                } finally {
                                    if (i)
                                        throw r
                                }
                            }
                            return e.join("&")
                        }();
                        i && (i = "?" + i),
                        window.open(e + i, "targetWindow", "\n        toolbar=no,\n        location=no,\n        status=no,\n        menubar=no,\n        scrollbars=yes,\n        resizable=yes,\n        left=" + t.left + ",\n        top=" + t.top + ",\n        width=" + t.width + ",\n        height=" + t.height + "\n      ")
                    }
                }, {
                    key: "_merge",
                    value: function(e) {
                        function t(t, n) {
                            return e.apply(this, arguments)
                        }
                        return t.toString = function() {
                            return e.toString()
                        }
                        ,
                        t
                    }(function(e, t) {
                        "object" != typeof e && (e = {});
                        for (var n in t)
                            if (t.hasOwnProperty(n)) {
                                var o = t[n];
                                if ("object" == typeof o) {
                                    e[n] = this._merge(e[n], o);
                                    continue
                                }
                                e[n] = o
                            }
                        for (var i = 2, r = arguments.length; r > i; i++)
                            _merge(e, arguments[i]);
                        return e
                    })
                }, {
                    key: "_objToArray",
                    value: function(e) {
                        var t = [];
                        for (var n in e)
                            "object" == typeof e[n] && t.push(e[n]);
                        return t
                    }
                }, {
                    key: "_isMobile",
                    value: function() {
                        return navigator.userAgent.match(/Android|iPhone|PhantomJS/i) && !navigator.userAgent.match(/iPod|iPad/i) ? !0 : !1
                    }
                }]),
                e
            }();
            String.prototype.toRFC3986 = function() {
                var e = encodeURIComponent(this);
                e.replace(/[!'()*]/g, function(e) {
                    return "%" + e.charCodeAt(0).toString(16)
                })
            }
            ,
            String.prototype.capFLetter = function() {
                return this.charAt(0).toUpperCase() + this.slice(1)
            }
            ,
            n["default"] = r,
            t.exports = n["default"]
        }
        , {}]
    }, {}, [37])(37)
});
$.fn.mailgun_validator = function(options) {
    return this.each(function() {
        $(this).focusout(function() {
            run_validator($(this), $(this).val(), options);
        });
    });
}
;
function run_validator(selector, address_text, options) {
    if (!address_text) {
        return;
    }
    if (address_text.length > 512) {
        error_message = 'Stream exceeds maxiumum allowable length of 512.';
        if (options && options.error) {
            options.error(error_message);
        } else {
            console.log(error_message);
        }
        return;
    }
    if (options && options.in_progress) {
        options.in_progress();
    }
    if (options && options.api_key == undefined) {
        console.log('Please pass in api_key to mailgun_validator.')
    }
    var success = false;
    $.ajax({
        type: "GET",
        url: 'https://api.mailgun.net/v2/address/validate?callback=?',
        data: {
            address: address_text,
            api_key: options.api_key
        },
        dataType: "jsonp",
        crossDomain: true,
        success: function(data, status_text) {
            success = true;
            if (options && options.success) {
                options.success(selector, data);
            }
        },
        error: function(request, status_text, error) {
            success = true;
            error_message = 'Error occurred, unable to validate address.';
            if (options && options.error) {
                options.error(selector, error_message);
            } else {
                console.log(error_message);
            }
        }
    });
    setTimeout(function() {
        error_message = 'Error occurred, unable to validate address.';
        if (!success) {
            if (options && options.error) {
                options.error(selector, error_message);
            } else {
                console.log(error_message);
            }
        }
    }, 30000);
}
!function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(b, c) {
                    return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            a.extend(e, e.initials),
            e.activeBreakpoint = null,
            e.animType = null,
            e.animProp = null,
            e.breakpoints = [],
            e.breakpointSettings = [],
            e.cssTransitions = !1,
            e.focussed = !1,
            e.interrupted = !1,
            e.hidden = "hidden",
            e.paused = !0,
            e.positionProp = null,
            e.respondTo = null,
            e.rowCount = 1,
            e.shouldClick = !0,
            e.$slider = a(c),
            e.$slidesCache = null,
            e.transformType = null,
            e.transitionType = null,
            e.visibilityChange = "visibilitychange",
            e.windowWidth = 0,
            e.windowTimer = null,
            f = a(c).data("slick") || {},
            e.options = a.extend({}, e.defaults, d, f),
            e.currentSlide = e.options.initialSlide,
            e.originalSettings = e.options,
            "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden",
            e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden",
            e.visibilityChange = "webkitvisibilitychange"),
            e.autoPlay = a.proxy(e.autoPlay, e),
            e.autoPlayClear = a.proxy(e.autoPlayClear, e),
            e.autoPlayIterator = a.proxy(e.autoPlayIterator, e),
            e.changeSlide = a.proxy(e.changeSlide, e),
            e.clickHandler = a.proxy(e.clickHandler, e),
            e.selectHandler = a.proxy(e.selectHandler, e),
            e.setPosition = a.proxy(e.setPosition, e),
            e.swipeHandler = a.proxy(e.swipeHandler, e),
            e.dragHandler = a.proxy(e.dragHandler, e),
            e.keyHandler = a.proxy(e.keyHandler, e),
            e.instanceUid = b++,
            e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            e.registerBreakpoints(),
            e.init(!0)
        }
        var b = 0;
        return c
    }(),
    b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c)
            d = c,
            c = null;
        else if (0 > c || c >= e.slideCount)
            return !1;
        e.unload(),
        "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack),
        e.$slides = e.$slideTrack.children(this.options.slide),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slideTrack.append(e.$slides),
        e.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b)
        }),
        e.$slidesCache = e.$slides,
        e.reinit()
    }
    ,
    b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }
    ,
    b.prototype.animateSlide = function(b, c) {
        var d = {}
          , e = this;
        e.animateHeight(),
        e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
        e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
        a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                a = Math.ceil(a),
                e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)",
                e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)",
                e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        })) : (e.applyTransition(),
        b = Math.ceil(b),
        e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)",
        e.$slideTrack.css(d),
        c && setTimeout(function() {
            e.disableTransition(),
            c.call()
        }, e.options.speed))
    }
    ,
    b.prototype.getNavTarget = function() {
        var b = this
          , c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)),
        c
    }
    ,
    b.prototype.asNavFor = function(b) {
        var c = this
          , d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }
    ,
    b.prototype.applyTransition = function(a) {
        var b = this
          , c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase,
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }
    ,
    b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(),
        a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }
    ,
    b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }
    ,
    b.prototype.autoPlayIterator = function() {
        var a = this
          , b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll,
        a.currentSlide - 1 === 0 && (a.direction = 1))),
        a.slideHandler(b))
    }
    ,
    b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"),
        b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"),
        b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.appendTo(b.options.appendArrows),
        b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
        b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"),
            d = a("<ul />").addClass(b.options.dotsClass),
            c = 0; c <= b.getDotCount(); c += 1)
                d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots),
            b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        b.slideCount = b.$slides.length,
        b.$slides.each(function(b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }),
        b.$slider.addClass("slick-slider"),
        b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(),
        b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        b.$slideTrack.css("opacity", 0),
        (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1),
        a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
        b.setupInfinite(),
        b.buildArrows(),
        b.buildDots(),
        b.updateDots(),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.options.draggable === !0 && b.$list.addClass("draggable")
    }
    ,
    b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(),
        g = a.$slider.children(),
        a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows,
            f = Math.ceil(g.length / h),
            b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e),
            a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)),
        d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints)
                d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f,
            "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b)),
            h = f) : (d.activeBreakpoint = f,
            "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b)),
            h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null,
            d.options = d.originalSettings,
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b),
            h = f),
            b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }
    ,
    b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this, e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(),
        e.is("li") || (e = e.closest("li")),
        h = d.slideCount % d.options.slidesToScroll !== 0,
        f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll,
        b.data.message) {
        case "previous":
            g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f,
            d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
            break;
        case "next":
            g = 0 === f ? d.options.slidesToScroll : f,
            d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
            break;
        case "index":
            var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
            d.slideHandler(d.checkNavigable(i), !1, c),
            e.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(),
        d = 0,
        a > c[c.length - 1])
            a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) {
                    a = d;
                    break
                }
                d = c[e]
            }
        return a
    }
    ,
    b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
        b.$slider.off("focus.slick blur.slick"),
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
        b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
        b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
        b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
        b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
        b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
        b.$list.off("click.slick", b.clickHandler),
        a(document).off(b.visibilityChange, b.visibility),
        b.cleanUpSlideEvents(),
        b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler),
        a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange),
        a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
        a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault),
        a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }
    ,
    b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }
    ,
    b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(),
        b.removeAttr("style"),
        a.$slider.empty().append(b))
    }
    ,
    b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(),
        a.stopPropagation(),
        a.preventDefault())
    }
    ,
    b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(),
        c.touchObject = {},
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }),
        c.$slideTrack.children(this.options.slide).detach(),
        c.$slideTrack.detach(),
        c.$list.detach(),
        c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.$slider.removeClass("slick-dotted"),
        c.unslicked = !0,
        b || c.$slider.trigger("destroy", [c])
    }
    ,
    b.prototype.disableTransition = function(a) {
        var b = this
          , c = {};
        c[b.transitionType] = "",
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }
    ,
    b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }),
        c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a),
        c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }),
        b && setTimeout(function() {
            c.disableTransition(a),
            b.call()
        }, c.options.speed))
    }
    ,
    b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a),
        b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }
    ,
    b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides,
        b.unload(),
        b.$slideTrack.children(this.options.slide).detach(),
        b.$slidesCache.filter(a).appendTo(b.$slideTrack),
        b.reinit())
    }
    ,
    b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"),
                b.autoPlay())
            }, 0)
        })
    }
    ,
    b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
        var a = this;
        return a.currentSlide
    }
    ,
    b.prototype.getDotCount = function() {
        var a = this
          , b = 0
          , c = 0
          , d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount; )
                ++d,
                b = c + a.options.slidesToScroll,
                c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0)
            d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount; )
                ++d,
                b = c + a.options.slidesToScroll,
                c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else
            d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }
    ,
    b.prototype.getLeft = function(a) {
        var c, d, f, b = this, e = 0;
        return b.slideOffset = 0,
        d = b.$slides.first().outerHeight(!0),
        b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1,
        e = d * b.options.slidesToShow * -1),
        b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1,
        e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1,
        e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth,
        e = (a + b.options.slidesToShow - b.slideCount) * d),
        b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0,
        e = 0),
        b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0,
        b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)),
        c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e,
        b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow),
        c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0,
        b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1),
        c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0,
        c += (b.$list.width() - f.outerWidth()) / 2)),
        c
    }
    ,
    b.prototype.getOption = b.prototype.slickGetOption = function(a) {
        var b = this;
        return b.options[a]
    }
    ,
    b.prototype.getNavigableIndexes = function() {
        var e, a = this, b = 0, c = 0, d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll,
        c = -1 * a.options.slidesToScroll,
        e = 2 * a.slideCount); e > b; )
            d.push(b),
            b = c + a.options.slidesToScroll,
            c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }
    ,
    b.prototype.getSlick = function() {
        return this
    }
    ,
    b.prototype.getSlideCount = function() {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0,
        b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f,
            !1) : void 0
        }),
        c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }
    ,
    b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }
    ,
    b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots(),
        c.checkResponsive(!0),
        c.focusHandler()),
        b && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA(),
        c.options.autoplay && (c.paused = !1,
        c.autoPlay())
    }
    ,
    b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        b.$slideTrack.attr("role", "listbox"),
        b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
            a(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + b.instanceUid + c
            })
        }),
        null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        b.activateADA()
    }
    ,
    b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide),
        a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }
    ,
    b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide),
        b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }
    ,
    b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }
    ,
    b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(),
        b.initDotEvents(),
        b.initSlideEvents(),
        b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler),
        b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler),
        b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler),
        b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler),
        b.$list.on("click.slick", b.clickHandler),
        a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
        b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)),
        a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)),
        a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
        a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }
    ,
    b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(),
        a.$nextArrow.show()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }
    ,
    b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
            data: {
                message: b.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }
    ,
    b.prototype.lazyLoad = function() {
        function g(c) {
            a("img[data-lazy]", c).each(function() {
                var c = a(this)
                  , d = a(this).attr("data-lazy")
                  , e = document.createElement("img");
                e.onload = function() {
                    c.animate({
                        opacity: 0
                    }, 100, function() {
                        c.attr("src", d).animate({
                            opacity: 1
                        }, 200, function() {
                            c.removeAttr("data-lazy").removeClass("slick-loading")
                        }),
                        b.$slider.trigger("lazyLoaded", [b, c, d])
                    })
                }
                ,
                e.onerror = function() {
                    c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    b.$slider.trigger("lazyLoadError", [b, c, d])
                }
                ,
                e.src = d
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1),
        f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)),
        f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide,
        f = Math.ceil(e + b.options.slidesToShow),
        b.options.fade === !0 && (e > 0 && e--,
        f <= b.slideCount && f++)),
        c = b.$slider.find(".slick-slide").slice(e, f),
        g(c),
        b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"),
        g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow),
        g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow),
        g(d))
    }
    ,
    b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(),
        a.$slideTrack.css({
            opacity: 1
        }),
        a.$slider.removeClass("slick-loading"),
        a.initUI(),
        "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }
    ,
    b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(),
        a.setPosition()
    }
    ,
    b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(),
        a.paused = !0
    }
    ,
    b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(),
        a.options.autoplay = !0,
        a.paused = !1,
        a.focussed = !1,
        a.interrupted = !1
    }
    ,
    b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]),
        b.animating = !1,
        b.setPosition(),
        b.swipeLeft = null,
        b.options.autoplay && b.autoPlay(),
        b.options.accessibility === !0 && b.initADA())
    }
    ,
    b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    b.prototype.preventDefault = function(a) {
        a.preventDefault()
    }
    ,
    b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var e, f, g, c = this, d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(),
        f = e.attr("data-lazy"),
        g = document.createElement("img"),
        g.onload = function() {
            e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"),
            c.options.adaptiveHeight === !0 && c.setPosition(),
            c.$slider.trigger("lazyLoaded", [c, e, f]),
            c.progressiveLazyLoad()
        }
        ,
        g.onerror = function() {
            3 > b ? setTimeout(function() {
                c.progressiveLazyLoad(b + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            c.$slider.trigger("lazyLoadError", [c, e, f]),
            c.progressiveLazyLoad())
        }
        ,
        g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }
    ,
    b.prototype.refresh = function(b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow,
        !c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
        c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
        d = c.currentSlide,
        c.destroy(!0),
        a.extend(c, c.initials, {
            currentSlide: d
        }),
        c.init(),
        b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }
    ,
    b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this, f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1,
                d = f[c].breakpoint,
                f.hasOwnProperty(c)) {
                    for (; e >= 0; )
                        b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1),
                        e--;
                    b.breakpoints.push(d),
                    b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }
    ,
    b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"),
        b.slideCount = b.$slides.length,
        b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
        b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
        b.registerBreakpoints(),
        b.setProps(),
        b.setupInfinite(),
        b.buildArrows(),
        b.updateArrows(),
        b.initArrowEvents(),
        b.buildDots(),
        b.updateDots(),
        b.initDotEvents(),
        b.cleanUpSlideEvents(),
        b.initSlideEvents(),
        b.checkResponsive(!1, !0),
        b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.setPosition(),
        b.focusHandler(),
        b.paused = !b.options.autoplay,
        b.autoPlay(),
        b.$slider.trigger("reInit", [b])
    }
    ,
    b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay),
        b.windowDelay = window.setTimeout(function() {
            b.windowWidth = a(window).width(),
            b.checkResponsive(),
            b.unslicked || b.setPosition()
        }, 50))
    }
    ,
    b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a,
        a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a,
        d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(),
        c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(),
        d.$slides = d.$slideTrack.children(this.options.slide),
        d.$slideTrack.children(this.options.slide).detach(),
        d.$slideTrack.append(d.$slides),
        d.$slidesCache = d.$slides,
        void d.reinit())
    }
    ,
    b.prototype.setCSS = function(a) {
        var d, e, b = this, c = {};
        b.options.rtl === !0 && (a = -a),
        d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px",
        e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px",
        c[b.positionProp] = a,
        b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {},
        b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")",
        b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)",
        b.$slideTrack.css(c)))
    }
    ,
    b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow),
        a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })),
        a.listWidth = a.$list.width(),
        a.listHeight = a.$list.height(),
        a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow),
        a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth),
        a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }
    ,
    b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) {
            c = b.slideWidth * d * -1,
            b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            })
        }),
        b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }
    ,
    b.prototype.setOption = b.prototype.slickSetOption = function() {
        var c, d, e, f, h, b = this, g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0],
        g = arguments[1],
        h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0],
        f = arguments[1],
        g = arguments[2],
        "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")),
        "single" === h)
            b.options[e] = f;
        else if ("multiple" === h)
            a.each(e, function(a, c) {
                b.options[a] = c
            });
        else if ("responsive" === h)
            for (d in f)
                if ("array" !== a.type(b.options.responsive))
                    b.options.responsive = [f[d]];
                else {
                    for (c = b.options.responsive.length - 1; c >= 0; )
                        b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1),
                        c--;
                    b.options.responsive.push(f[d])
                }
        g && (b.unload(),
        b.reinit())
    }
    ,
    b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(),
        a.setHeight(),
        a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(),
        a.$slider.trigger("setPosition", [a])
    }
    ,
    b.prototype.setProps = function() {
        var a = this
          , b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left",
        "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"),
        (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0),
        a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex),
        void 0 !== b.OTransform && (a.animType = "OTransform",
        a.transformType = "-o-transform",
        a.transitionType = "OTransition",
        void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.MozTransform && (a.animType = "MozTransform",
        a.transformType = "-moz-transform",
        a.transitionType = "MozTransition",
        void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
        void 0 !== b.webkitTransform && (a.animType = "webkitTransform",
        a.transformType = "-webkit-transform",
        a.transitionType = "webkitTransition",
        void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.msTransform && (a.animType = "msTransform",
        a.transformType = "-ms-transform",
        a.transitionType = "msTransition",
        void 0 === b.msTransform && (a.animType = !1)),
        void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform",
        a.transformType = "transform",
        a.transitionType = "transition"),
        a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }
    ,
    b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        b.$slides.eq(a).addClass("slick-current"),
        b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2),
        b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
        d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")),
        b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow,
        e = b.options.infinite === !0 ? b.options.slidesToShow + a : a,
        b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }
    ,
    b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1),
        b.options.infinite === !0 && b.options.fade === !1 && (d = null,
        b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow,
            c = b.slideCount; c > b.slideCount - e; c -= 1)
                d = c - 1,
                a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1)
                d = c,
                a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }
    ,
    b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(),
        b.interrupted = a
    }
    ,
    b.prototype.selectHandler = function(b) {
        var c = this
          , d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide")
          , e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0),
        c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e),
        void c.asNavFor(e)) : void c.slideHandler(e)
    }
    ,
    b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, j, h = null, i = this;
        return b = b || !1,
        i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a),
        d = a,
        h = i.getLeft(d),
        g = i.getLeft(i.currentSlide),
        i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft,
        i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide,
        c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide,
        c !== !0 ? i.animateSlide(g, function() {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer),
        e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d,
        i.animating = !0,
        i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
        f = i.currentSlide,
        i.currentSlide = e,
        i.setSlideClasses(i.currentSlide),
        i.options.asNavFor && (j = i.getNavTarget(),
        j = j.slick("getSlick"),
        j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)),
        i.updateDots(),
        i.updateArrows(),
        i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f),
        i.fadeSlide(e, function() {
            i.postSlide(e)
        })) : i.postSlide(e),
        void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function() {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }
    ,
    b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(),
        a.$nextArrow.hide()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
        a.$slider.addClass("slick-loading")
    }
    ,
    b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX,
        b = e.touchObject.startY - e.touchObject.curY,
        c = Math.atan2(b, a),
        d = Math.round(180 * c / Math.PI),
        0 > d && (d = 360 - Math.abs(d)),
        45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }
    ,
    b.prototype.swipeEnd = function(a) {
        var c, d, b = this;
        if (b.dragging = !1,
        b.interrupted = !1,
        b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0,
        void 0 === b.touchObject.curX)
            return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]),
        b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
            case "left":
            case "down":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(),
                b.currentDirection = 0;
                break;
            case "right":
            case "up":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(),
                b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c),
            b.touchObject = {},
            b.$slider.trigger("swipe", [b, d]))
        } else
            b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide),
            b.touchObject = {})
    }
    ,
    b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend"in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse")))
            switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1,
            b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold,
            b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
            a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
            }
    }
    ,
    b.prototype.swipeMove = function(a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null,
        !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide),
        b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX,
        b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY,
        b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))),
        b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))),
        e = b.swipeDirection(),
        "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(),
        g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1),
        b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
        f = b.touchObject.swipeLength,
        b.touchObject.edgeHit = !1,
        b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction,
        b.touchObject.edgeHit = !0),
        b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g,
        b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
        b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null,
        !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }
    ,
    b.prototype.swipeStart = function(a) {
        var c, b = this;
        return b.interrupted = !0,
        1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {},
        !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]),
        b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX,
        b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY,
        void (b.dragging = !0))
    }
    ,
    b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(),
        a.$slideTrack.children(this.options.slide).detach(),
        a.$slidesCache.appendTo(a.$slideTrack),
        a.reinit())
    }
    ,
    b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(),
        b.$dots && b.$dots.remove(),
        b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
        b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
        b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]),
        b.destroy()
    }
    ,
    b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2),
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }
    ,
    b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }
    ,
    a.fn.slick = function() {
        var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length;
        for (f = 0; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f],c) : g = a[f].slick[c].apply(a[f].slick, d),
            "undefined" != typeof g)
                return g;
        return a
    }
});
(function($) {
    function overlay($img, opts) {
        var floating = opts.float || 'none';
        var rgba = opts.rgba || '236,240,241,0.8';
        var color = opts.color || '#ffffff';
        $img.wrap('<div class="wrap"></div>');
        $wrap = $img.parent();
        $wrap.css('float', floating);
        $overlay = $('<div>');
        $overlay.addClass('overlay');
        $overlay.css('background', 'rgba(' + rgba + ')');
        $links = $('<ul>');
        $overlay.append($links);
        $facebook = $('<li>')
        $facebook.html('<span class="socialclick facebook-share"><i class="fa fa-lg fa-facebook"></i></span>');
        $twitter = $('<li>')
        $twitter.html('<span class="socialclick twitter-share"><i class="fa fa-lg fa-twitter"></span>');
        $google = $('<li>')
        $google.html('<span class="socialclick google-share"><i class="fa fa-lg fa-google-plus"></i></span>');
        $pinterest = $('<li>')
        $pinterest.html('<span class="socialclick pinterest-share"><i class="fa fa-lg fa-pinterest"></i></span>');
        $('span.socialclick').css('color', color);
        $links.append($facebook);
        $links.append($twitter);
        $links.append($google);
        $links.append($pinterest);
        $overlay.css('height', $img.css('height'));
        $overlay.css('width', $img.css('width'));
        $links.css('margin-top', (parseFloat($img.css('height')) / 2.1) + 'px');
        $overlay.css('margin-top', $img.css('marginTop'));
        $overlay.css('margin-bottom', $img.css('marginBottom'));
        $overlay.css('margin-left', $img.css('marginLeft'));
        $overlay.css('margin-right', $img.css('marginRight'));
        $overlay.css('padding-top', $img.css('paddingTop'));
        $overlay.css('padding-bottom', $img.css('paddingBottom'));
        $overlay.css('padding-left', $img.css('paddingLeft'));
        $overlay.css('padding-right', $img.css('paddingRight'));
        $img.before($overlay);
    }
    $.fn.socialpic = function(opts) {
        var opts = opts || [];
        $(this).each(function() {
            overlay($(this), opts);
        });
        return this;
    }
}(jQuery));
$(function() {
    $('body').on('click', 'span.socialclick', function() {
        var url = $(this).closest('div.wrap').find('img').attr('src');
        if ($(this).hasClass('facebook-share')) {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'Share Facebook', config = 'height=300, width=500');
        }
        if ($(this).hasClass('twitter-share')) {
            window.open('http://twitter.com/home?status=Currently inspired by ' + url, 'Share Twitter', config = 'height=300, width=500');
        }
        if ($(this).hasClass('google-share')) {
            window.open('https://plus.google.com/share?url=' + url, 'Share Google +', config = 'height=300, width=500');
        }
        if ($(this).hasClass('pinterest-share')) {
            window.open('http://www.pinterest.com/pin/create/button/?url=' + url + '&media=' + url + '&description=Currently%20Inspired%20By', 'Share Pinterest', config = 'height=300, width=500');
        }
    });
});
(function($) {
    "use strict";
    function setSelectionRange(rangeStart, rangeEnd) {
        if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveStart('character', rangeStart);
            range.moveEnd('character', rangeEnd - rangeStart);
            range.select();
        } else if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(rangeStart, rangeEnd);
        }
    }
    function getSelection(part) {
        var pos = this.value.length;
        part = (part.toLowerCase() == 'start' ? 'Start' : 'End');
        if (document.selection) {
            var range = document.selection.createRange(), stored_range, selectionStart, selectionEnd;
            stored_range = range.duplicate();
            stored_range.expand('textedit');
            stored_range.setEndPoint('EndToEnd', range);
            selectionStart = stored_range.text.length - range.text.length;
            selectionEnd = selectionStart + range.text.length;
            return part == 'Start' ? selectionStart : selectionEnd;
        } else if (typeof (this['selection' + part]) != "undefined") {
            pos = this['selection' + part];
        }
        return pos;
    }
    var _keydown = {
        codes: {
            46: 127,
            188: 44,
            109: 45,
            190: 46,
            191: 47,
            192: 96,
            220: 92,
            222: 39,
            221: 93,
            219: 91,
            173: 45,
            187: 61,
            186: 59,
            189: 45,
            110: 46
        },
        shifts: {
            96: "~",
            49: "!",
            50: "@",
            51: "#",
            52: "$",
            53: "%",
            54: "^",
            55: "&",
            56: "*",
            57: "(",
            48: ")",
            45: "_",
            61: "+",
            91: "{",
            93: "}",
            92: "|",
            59: ":",
            39: "\"",
            44: "<",
            46: ">",
            47: "?"
        }
    };
    $.fn.number = function(number, decimals, dec_point, thousands_sep) {
        thousands_sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
        dec_point = (typeof dec_point === 'undefined') ? '.' : dec_point;
        decimals = (typeof decimals === 'undefined') ? 0 : decimals;
        var u_dec = ('\\u' + ('0000' + (dec_point.charCodeAt(0).toString(16))).slice(-4))
          , regex_dec_num = new RegExp('[^' + u_dec + '0-9]','g')
          , regex_dec = new RegExp(u_dec,'g');
        if (number === true) {
            if (this.is('input:text')) {
                return this.on({
                    'keydown.format': function(e) {
                        var $this = $(this)
                          , data = $this.data('numFormat')
                          , code = (e.keyCode ? e.keyCode : e.which)
                          , chara = ''
                          , start = getSelection.apply(this, ['start'])
                          , end = getSelection.apply(this, ['end'])
                          , val = ''
                          , setPos = false;
                        if (_keydown.codes.hasOwnProperty(code)) {
                            code = _keydown.codes[code];
                        }
                        if (!e.shiftKey && (code >= 65 && code <= 90)) {
                            code += 32;
                        } else if (!e.shiftKey && (code >= 69 && code <= 105)) {
                            code -= 48;
                        } else if (e.shiftKey && _keydown.shifts.hasOwnProperty(code)) {
                            chara = _keydown.shifts[code];
                        }
                        if (chara == '')
                            chara = String.fromCharCode(code);
                        if (code != 8 && code != 45 && code != 127 && chara != dec_point && !chara.match(/[0-9]/)) {
                            var key = (e.keyCode ? e.keyCode : e.which);
                            if (key == 46 || key == 8 || key == 127 || key == 9 || key == 27 || key == 13 || ((key == 65 || key == 82 || key == 80 || key == 83 || key == 70 || key == 72 || key == 66 || key == 74 || key == 84 || key == 90 || key == 61 || key == 173 || key == 48) && (e.ctrlKey || e.metaKey) === true) || ((key == 86 || key == 67 || key == 88) && (e.ctrlKey || e.metaKey) === true) || ((key >= 35 && key <= 39)) || ((key >= 112 && key <= 123))) {
                                return;
                            }
                            e.preventDefault();
                            return false;
                        }
                        if (start == 0 && end == this.value.length) {
                            if (code == 8) {
                                start = end = 1;
                                this.value = '';
                                data.init = (decimals > 0 ? -1 : 0);
                                data.c = (decimals > 0 ? -(decimals + 1) : 0);
                                setSelectionRange.apply(this, [0, 0]);
                            } else if (chara == dec_point) {
                                start = end = 1;
                                this.value = '0' + dec_point + (new Array(decimals + 1).join('0'));
                                data.init = (decimals > 0 ? 1 : 0);
                                data.c = (decimals > 0 ? -(decimals + 1) : 0);
                            } else if (code == 45) {
                                start = end = 2;
                                this.value = '-0' + dec_point + (new Array(decimals + 1).join('0'));
                                data.init = (decimals > 0 ? 1 : 0);
                                data.c = (decimals > 0 ? -(decimals + 1) : 0);
                                setSelectionRange.apply(this, [2, 2]);
                            } else {
                                data.init = (decimals > 0 ? -1 : 0);
                                data.c = (decimals > 0 ? -(decimals) : 0);
                            }
                        } else {
                            data.c = end - this.value.length;
                        }
                        data.isPartialSelection = start == end ? false : true;
                        if (decimals > 0 && chara == dec_point && start == this.value.length - decimals - 1) {
                            data.c++;
                            data.init = Math.max(0, data.init);
                            e.preventDefault();
                            setPos = this.value.length + data.c;
                        } else if (code == 45 && (start != 0 || this.value.indexOf('-') == 0)) {
                            e.preventDefault();
                        } else if (chara == dec_point) {
                            data.init = Math.max(0, data.init);
                            e.preventDefault();
                        } else if (decimals > 0 && code == 127 && start == this.value.length - decimals - 1) {
                            e.preventDefault();
                        } else if (decimals > 0 && code == 8 && start == this.value.length - decimals) {
                            e.preventDefault();
                            data.c--;
                            setPos = this.value.length + data.c;
                        } else if (decimals > 0 && code == 127 && start > this.value.length - decimals - 1) {
                            if (this.value === '')
                                return;
                            if (this.value.slice(start, start + 1) != '0') {
                                val = this.value.slice(0, start) + '0' + this.value.slice(start + 1);
                                $this.val(val);
                            }
                            e.preventDefault();
                            setPos = this.value.length + data.c;
                        } else if (decimals > 0 && code == 8 && start > this.value.length - decimals) {
                            if (this.value === '')
                                return;
                            if (this.value.slice(start - 1, start) != '0') {
                                val = this.value.slice(0, start - 1) + '0' + this.value.slice(start);
                                $this.val(val);
                            }
                            e.preventDefault();
                            data.c--;
                            setPos = this.value.length + data.c;
                        } else if (code == 127 && this.value.slice(start, start + 1) == thousands_sep) {
                            e.preventDefault();
                        } else if (code == 8 && this.value.slice(start - 1, start) == thousands_sep) {
                            e.preventDefault();
                            data.c--;
                            setPos = this.value.length + data.c;
                        } else if (decimals > 0 && start == end && this.value.length > decimals + 1 && start > this.value.length - decimals - 1 && isFinite(+chara) && !e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1) {
                            if (end === this.value.length) {
                                val = this.value.slice(0, start - 1);
                            } else {
                                val = this.value.slice(0, start) + this.value.slice(start + 1);
                            }
                            this.value = val;
                            setPos = start;
                        }
                        if (setPos !== false) {
                            setSelectionRange.apply(this, [setPos, setPos]);
                        }
                        $this.data('numFormat', data);
                    },
                    'keyup.format': function(e) {
                        var $this = $(this), data = $this.data('numFormat'), code = (e.keyCode ? e.keyCode : e.which), start = getSelection.apply(this, ['start']), end = getSelection.apply(this, ['end']), setPos;
                        if (start === 0 && end === 0 && (code === 189 || code === 109)) {
                            $this.val('-' + $this.val());
                            start = 1;
                            data.c = 1 - this.value.length;
                            data.init = 1;
                            $this.data('numFormat', data);
                            setPos = this.value.length + data.c;
                            setSelectionRange.apply(this, [setPos, setPos]);
                        }
                        if (this.value === '' || (code < 48 || code > 57) && (code < 96 || code > 105) && code !== 8 && code !== 46 && code !== 110)
                            return;
                        $this.val($this.val());
                        if (decimals > 0) {
                            if (data.init < 1) {
                                start = this.value.length - decimals - (data.init < 0 ? 1 : 0);
                                data.c = start - this.value.length;
                                data.init = 1;
                                $this.data('numFormat', data);
                            } else if (start > this.value.length - decimals && code != 8) {
                                data.c++;
                                $this.data('numFormat', data);
                            }
                        }
                        if (code == 46 && !data.isPartialSelection) {
                            data.c++;
                            $this.data('numFormat', data);
                        }
                        setPos = this.value.length + data.c;
                        setSelectionRange.apply(this, [setPos, setPos]);
                    },
                    'paste.format': function(e) {
                        var $this = $(this)
                          , original = e.originalEvent
                          , val = null;
                        if (window.clipboardData && window.clipboardData.getData) {
                            val = window.clipboardData.getData('Text');
                        } else if (original.clipboardData && original.clipboardData.getData) {
                            val = original.clipboardData.getData('text/plain');
                        }
                        $this.val(val);
                        e.preventDefault();
                        return false;
                    }
                }).each(function() {
                    var $this = $(this).data('numFormat', {
                        c: -(decimals + 1),
                        decimals: decimals,
                        thousands_sep: thousands_sep,
                        dec_point: dec_point,
                        regex_dec_num: regex_dec_num,
                        regex_dec: regex_dec,
                        init: this.value.indexOf('.') ? true : false
                    });
                    if (this.value === '')
                        return;
                    $this.val($this.val());
                });
            } else {
                return this.each(function() {
                    var $this = $(this)
                      , num = +$this.text().replace(regex_dec_num, '').replace(regex_dec, '.');
                    $this.number(!isFinite(num) ? 0 : +num, decimals, dec_point, thousands_sep);
                });
            }
        }
        return this.text($.number.apply(window, arguments));
    }
    ;
    var origHookGet = null
      , origHookSet = null;
    if ($.isPlainObject($.valHooks.text)) {
        if ($.isFunction($.valHooks.text.get))
            origHookGet = $.valHooks.text.get;
        if ($.isFunction($.valHooks.text.set))
            origHookSet = $.valHooks.text.set;
    } else {
        $.valHooks.text = {};
    }
    $.valHooks.text.get = function(el) {
        var $this = $(el), num, negative, data = $this.data('numFormat');
        if (!data) {
            if ($.isFunction(origHookGet)) {
                return origHookGet(el);
            } else {
                return undefined;
            }
        } else {
            if (el.value === '')
                return '';
            num = +(el.value.replace(data.regex_dec_num, '').replace(data.regex_dec, '.'));
            return (el.value.indexOf('-') === 0 ? '-' : '') + (isFinite(num) ? num : 0);
        }
    }
    ;
    $.valHooks.text.set = function(el, val) {
        var $this = $(el)
          , data = $this.data('numFormat');
        if (!data) {
            if ($.isFunction(origHookSet)) {
                return origHookSet(el, val);
            } else {
                return undefined;
            }
        } else {
            var num = $.number(val, data.decimals, data.dec_point, data.thousands_sep);
            return $.isFunction(origHookSet) ? origHookSet(el, num) : el.value = num;
        }
    }
    ;
    $.number = function(number, decimals, dec_point, thousands_sep) {
        thousands_sep = (typeof thousands_sep === 'undefined') ? (new Number(1000).toLocaleString() !== '1000' ? new Number(1000).toLocaleString().charAt(1) : '') : thousands_sep;
        dec_point = (typeof dec_point === 'undefined') ? new Number(0.1).toLocaleString().charAt(1) : dec_point;
        decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        var u_dec = ('\\u' + ('0000' + (dec_point.charCodeAt(0).toString(16))).slice(-4));
        var u_sep = ('\\u' + ('0000' + (thousands_sep.charCodeAt(0).toString(16))).slice(-4));
        number = (number + '').replace('\.', dec_point).replace(new RegExp(u_sep,'g'), '').replace(new RegExp(u_dec,'g'), '.').replace(new RegExp('[^0-9+\-Ee.]','g'), '');
        var n = !isFinite(+number) ? 0 : +number
          , s = ''
          , toFixedFix = function(n, decimals) {
            return '' + (+(Math.round(('' + n).indexOf('e') > 0 ? n : n + 'e+' + decimals) + 'e-' + decimals));
        };
        s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
        }
        if ((s[1] || '').length < decimals) {
            s[1] = s[1] || '';
            s[1] += new Array(decimals - s[1].length + 1).join('0');
        }
        return s.join(dec_point);
    }
}
)(jQuery);
function viamagusEcomListing(isProductPage, container) {
    this.container = '.vm-ecommerce-listing',
    this.noOfColumn = '',
    this.buttonLabel = '',
    this.buttonType = '',
    this.categoryId = '',
    this.contextPath = '',
    this.cartCountPlaceHolder = '.viamagus-cart-count',
    this.productHtmlTemplate = '<div class="{{noOfColumn}} vm-ecom-product">' + '<a href="{{productPageName}}">' + '<img className="img-responsive" src="{{productImageUrl}}" alt=""></a>' + '<div class="info">' + '    <div class="product-info ">' + '      <div class="title">{{productName}}</div> <span class="vm-product-price-section" style="display:{{showPrices}};">' + '      {{currencySymbol}}<span class="price vm-format-number">{{productPrice}}</span><span> {{currencyCode}}{{weightUnit}}</span>' + '      <span class="strikePrice hide">(<strike> {{currencySymbol}}<span class="vm-format-number">{{strikePrice}}</span><span> {{currencyCode}}{{weightUnit}}</span></strike> ) </span>' + '    </span></div>' + '    <div class="plus-minus viamagus-cart-qty-container" style="display:{{showPrices}};">' + '      <a class="btn viamagus-cart-minus" target="" href="#"> <i class="fa fa-minus"></i> </a>' + '      <input data-min-qty="{{minQty}}" data-max-qty="{{maxQty}}" data-inv-qty="{{invQty}}" data-track-inventory="{{trackInventory}}" name="quantity" id="viamagus-cart-qty-{{productId}}" class="viamagus-cart-qty"  type="number" min="1" max="50" value="{{minQty}}" size="3">' + '      <a class="btn viamagus-cart-plus" target="" href="#"> <i class="fa fa-plus"></i> </a>' + '     <div style="float:right;">' + '    <div class="button-align" > <a data-product-id="{{productId}}" class="viamagus-cart-button btn viamagus-button-{{buttonType}}" target="" href="#">{{buttonLabel}}</a>  </div>' + '   </div><div id="cart-success-{{productId}}" style="text-align:center;color:green;display:none;"><span style="float:left;">&#x2714; Added to Cart.</span> <a style="float:right;" class="btn viamagus-button-default" href="cart.html">Checkout</a> </div><div class="error-message-{{productId}}" style="color:red"></div></div></div ></div>',
    this.cartButtonHtml = '<a href="cart.html" class="viamagus-cart-icon icon-cart cart-button"><div class="viamagus-cart-count">0</div> <span>Cart</span></a>';
    this.init = function(isProductPage, container) {
        var that = this;
        if (container) {
            that.container = container;
        }
        if (isProductPage) {
            that.registerEvent();
            that.enableShareButton();
            that.checkInventoryQty();
        } else {
            var callback = function() {
                that.registerEvent();
            }
            this.noOfColumn = $(this.container).attr("data-no-of-columns");
            this.buttonLabel = $(this.container).attr("data-button-label");
            this.buttonType = $(this.container).attr("data-button-type");
            this.categoryId = $(this.container).attr("data-category-id");
            this.loadProducts(callback, this.categoryId);
        }
    }
    ;
    this.registerEvent = function() {
        var that = this;
        $('.viamagus-cart-minus').unbind();
        $('.viamagus-cart-minus').click(function(e) {
            e.preventDefault();
            var qty = $(this).parent().find('.viamagus-cart-qty');
            if (parseInt(qty.val()) > 1) {
                qty.val(Math.abs(parseInt(qty.val()) - 1));
            }
        });
        $('.viamagus-cart-plus').unbind();
        $('.viamagus-cart-plus').click(function(e) {
            e.preventDefault();
            var qty = $(this).parent().find('.viamagus-cart-qty');
            qty.val(Math.abs(parseInt(qty.val()) + 1));
        });
        $('.viamagus-cart-button').unbind();
        $('.viamagus-cart-button').click(function(e) {
            e.preventDefault();
            var productId = $(this).attr("data-product-id");
            var productQty = $('#viamagus-cart-qty-' + productId).val();
            var minQty = $('#viamagus-cart-qty-' + productId).attr("data-min-Qty");
            var maxQty = $('#viamagus-cart-qty-' + productId).attr("data-max-Qty");
            var invQty = $('#viamagus-cart-qty-' + productId).attr("data-inv-Qty");
            var trackInventory = $('#viamagus-cart-qty-' + productId).attr("data-track-inventory");
            if (minQty != "" && maxQty != "") {
                $('.error-message-' + productId).html("");
                if (productQty < parseInt(minQty)) {
                    $('.error-message-' + productId).html("Order quantity cannot be less than " + minQty);
                    return;
                }
                if (maxQty != "" && productQty > parseInt(maxQty)) {
                    $('.error-message-' + productId).html("Order quantity cannot be more than " + maxQty);
                    return;
                }
            }
            if (trackInventory == "Y") {
                if (invQty != "" && parseInt(invQty) >= productQty) {
                    that.addToCart(productId, productQty);
                    $('.error-message-' + productId).html("");
                } else {
                    $('#cart-success-' + productId).html("");
                    $('.error-message-' + productId).html("Available quantity for purchase " + invQty);
                    $('#viamagus-cart-qty-' + productId).val(invQty);
                    return;
                }
            } else {
                that.addToCart(productId, productQty);
            }
        });
    }
    ;
    this.checkInventoryQty = function() {
        var productId = $('.viamagus-cart-button').attr("data-product-id");
        var invQty = $('#viamagus-cart-qty-' + productId).attr("data-inv-Qty");
        var trackInventory = $('#viamagus-cart-qty-' + productId).attr("data-track-inventory");
        if (invQty != null && invQty == 0 && trackInventory == 'Y') {
            $('.viamagus-cart-button').html('SOLD OUT');
        }
    }
    ;
    this.enableShareButton = function() {
        var pageURL = $(location).attr("href");
        if ($("#shareIcons").length) {
            var productName = $('#productName').html();
            var productDesc = $('#productDesc').text();
            var productImage = $('#productImage').attr("src");
            $("meta[property='og:title']").attr("content", productName);
            $("meta[property='og:description']").attr("content", productDesc);
            $("meta[property='og:image']").attr("content", productImage);
            $("meta[property='twitter:image']").attr("content", productImage);
            $("meta[property='og:url']").attr("content", pageURL);
            $("#shareIcons").jsSocials({
                url: pageURL,
                text: productName,
                showLabel: false,
                showCount: false,
                shares: ["twitter", "facebook", "googleplus", "linkedin"],
            });
        }
    }
    ;
    this.addToCart = function(productId, productQty) {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/addToCart/',
            type: 'POST',
            data: {
                format: 'json',
                productId: productId,
                productQty: productQty
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result) {
                $(that.cartCountPlaceHolder).html(data.result);
                $('#cart-success-' + productId).show();
                $('#cart-checkout-' + productId).show();
                $('.cart-success').show();
            }
        });
    }
    this.loadProducts = function(callback, categoryId) {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/productlist/',
            type: 'POST',
            data: {
                format: 'json',
                categoryId: categoryId
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result.length) {
                $(that.container).find('.vm-prod-list-container').empty();
                var count = 0;
                var productRowHtml = '';
                for (var i = 0; i < data.result.length; i++) {
                    if (count == 0) {
                        productRowHtml = productRowHtml + '<div class="row-fluid">';
                    }
                    that.buttonLabel = $(that.container).attr("data-button-label");
                    productRowHtml = productRowHtml + that.appendProductHtml(data.result[i]);
                    count = count + 1;
                    if (count == that.noOfColumn) {
                        productRowHtml = productRowHtml + '</div>';
                        $(that.container).find('.vm-prod-list-container').append(productRowHtml);
                        productRowHtml = '';
                        count = 0;
                    }
                }
                if (count != 0) {
                    $(that.container).find('.vm-prod-list-container').append(productRowHtml);
                }
                that.updateProductCartStatus();
                $('.vm-format-number').number(true, 2);
            } else {
                $(that.container).find('.vm-prod-list-container').append('<h3 style="text-align:center;"> No Products Found.... </h3>');
            }
            if (callback) {
                callback();
            }
        });
    }
    ;
    this.updateProductCartStatus = function() {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/cartMap/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != "" && data.result != null) {
                $.each(data.result, function(k, v) {
                    $('#viamagus-cart-qty-' + k).val(v);
                    $('#cart-success-' + k).show();
                });
            }
        });
    }
    this.appendProductHtml = function(product) {
        var that = this;
        var spanClass = "span6";
        if (that.noOfColumn == "3") {
            spanClass = "span4"
        }
        if (that.noOfColumn == "4") {
            spanClass = "span3"
        }
        var showPricesStyle = "block";
        var productHtml = this.productHtmlTemplate;
        productHtml = productHtml.replace(/{{productName}}/i, product.productName);
        productHtml = productHtml.replace(/{{productId}}/g, product.productId);
        productHtml = productHtml.replace(/{{productPageName}}/i, product.pageName);
        if (product.hasOwnProperty('transactionCurrency') && product.transactionCurrency != "" && product.transactionCurrency != null) {
            productHtml = productHtml.replace(/{{productPrice}}/i, product.priceInTransactCurrency);
            productHtml = productHtml.replace(/{{currencySymbol}}/g, "");
            productHtml = productHtml.replace(/{{currencyCode}}/g, product.transactionCurrency);
        } else {
            productHtml = productHtml.replace(/{{productPrice}}/i, product.price);
            if (product.hasOwnProperty('storeCurrencySymbol')) {
                productHtml = productHtml.replace(/{{currencySymbol}}/g, "");
                productHtml = productHtml.replace(/{{currencyCode}}/g, product.storeCurrency);
            } else {
                productHtml = productHtml.replace(/{{currencySymbol}}/g, "Rs. ");
                productHtml = productHtml.replace(/{{currencyCode}}/g, "");
            }
        }
        if (product.hasOwnProperty('showPrice') && product.showPrice == 'N') {
            showPricesStyle = "none";
        }
        productHtml = productHtml.replace(/{{showPrices}}/g, showPricesStyle);
        productHtml = productHtml.replace(/{{buttonType}}/i, that.buttonType);
        if (product.strikePrice != "") {
            if (product.transactionCurrency != "" && product.transactionCurrency != null) {
                productHtml = productHtml.replace(/{{strikePrice}}/i, product.strikePriceInTransactCurrency);
            } else {
                productHtml = productHtml.replace(/{{strikePrice}}/i, product.strikePrice);
            }
            productHtml = productHtml.replace(/strikePrice hide/i, "strikePrice show");
        }
        if (product.weightUnit != "" && product.weightUnit != null) {
            productHtml = productHtml.replace(/{{weightUnit}}/g, '/' + product.weightUnit);
        } else {
            productHtml = productHtml.replace(/{{weightUnit}}/g, '');
        }
        if (parseFloat(product.minimumOrderQty) > 0) {
            productHtml = productHtml.replace(/{{minQty}}/g, product.minimumOrderQty);
        } else {
            productHtml = productHtml.replace(/{{minQty}}/g, "1");
        }
        if (parseFloat(product.maximumOrderQty) > 0) {
            productHtml = productHtml.replace(/{{maxQty}}/g, product.maximumOrderQty);
        } else {
            productHtml = productHtml.replace(/{{maxQty}}/g, "");
        }
        if (product.mediaJson != '') {
            var images = JSON.parse(product.mediaJson).images;
            for (var i = 0; i < images.length; i++) {
                if (images[i].hasOwnProperty('primary')) {
                    productHtml = productHtml.replace(/{{productImageUrl}}/i, images[i].primary);
                }
            }
        }
        if (product.inventoryQty != null && product.inventoryQty != "") {
            productHtml = productHtml.replace(/{{invQty}}/g, product.inventoryQty);
            if (parseInt(product.inventoryQty) == 0 && product.trackInventory == "Y") {
                that.buttonLabel = "SOLD OUT";
            }
        }
        productHtml = productHtml.replace(/{{buttonLabel}}/i, that.buttonLabel);
        if (product.trackInventory != null && product.trackInventory != "") {
            productHtml = productHtml.replace(/{{trackInventory}}/g, product.trackInventory);
        }
        productHtml = productHtml.replace(/{{noOfColumn}}/i, spanClass);
        return productHtml;
    }
    ;
    this.init(isProductPage, container);
}
Viamagus_Cart_Manager = {
    contextPath: '',
    container: '#viamagus-shopping-cart-table-content',
    cartCountPlaceHolder: '.viamagus-cart-count',
    isValidDiscount: false,
    cartCurrency: 'INR',
    signUpHtml: '<div tabindex="-1" class="modal show" id="signUpModal" aria-hidden="true"  style="width:400px;left:60%;top:10%;border-radius:0">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '      <h2 class="text-center"  style="font-weight:300"  id="signUpHeading">Sign In</h2></div>' + '    <form id="loginForm" style="display: block;margin:0">' + '     <div class="modal-body">' + '        <div class="control-group">' + '              <label class="control-label" for="email">Email</label>' + '              <div class="controls">' + '                <input class="input-block-level form-control" id="userName" name="userName" required type="email" placeholder="abc@abc.com">' + '            </div>' + '        </div>' + '        <div class="control-group">' + '              <label class="control-label" for="password">Password</label>' + '            <div class="controls">' + '                    <input class="input-block-level form-control" id="password" required type="password" placeholder="Password">' + '            </div><br>' + '            <a id="forgot-password" href="" class="forgot-password">' + '            Forgot Password ?' + '        </a>' + '</div>' + '  </div> <div class="modal-footer">' + '    <button type="button" class="btn btn-medium btn-warning vm-ecom-guest-checkout pull-left hide">Guest Checkout</button>' + '    <button type="button" class="btn btn-medium btn-info vm-ecom-goto-register">New user?</button>' + '    <button type="submit" class="btn btn-medium btn-primary vm-ecom-signin">Sign In</button>' + '   </div> </form>' + '    <form id="registerForm" class="hide" style="margin:0">' + '     <div class="modal-body">' + '        <div class="control-group">' + '              <label class="control-label" for="email">Email</label>' + '              <div class="controls">' + '                <input class="input-block-level form-control" id="registerUserName" name="registerUserName" required type="email" placeholder="abc@abc.com">' + '            </div>' + '        </div>' + '        <div class="control-group">' + '              <label class="control-label" for="password">Password</label>' + '            <div class="controls">' + '                    <input class="input-block-level form-control" id="registerUserPassword" required type="password" placeholder="Password">' + '            </div> </div>' + '        <div class="control-group">' + '              <label class="control-label" for="confirmPassword">Confirm Password</label>' + '            <div class="controls">' + '                    <input class="input-block-level form-control" id="registerUserConfirmPassword" required type="password" placeholder="Confirm Password">' + '            </div> </div>' + '  </div> <div class="modal-footer">' + '    <button type="button" class="btn btn-medium btn-warning vm-ecom-guest-checkout pull-left hide">Guest Checkout</button>' + '    <button type="button" class="btn btn-medium btn-primary vm-ecom-goto-signin ">Existing User?</button>' + '    <button type="submit" class="btn btn-medium btn-info vm-ecom-register">Sign Up</button></div>' + '    </form>' + '    <form id="sendOTPForm" class="hide" style="margin:0">' + '     <div class="modal-body">' + '        <div class="control-group">' + '              <label class="control-label" for="email">Email</label>' + '              <div class="controls">' + '                <input class="input-block-level form-control" id="sendOTPUserName" name="sendOTPUserName" required type="email" placeholder="abc@abc.com" >' + '            </div>' + '            <p id="emailIdErrorMessage"style="color:red;display:none;" >This Email Id is not Registered with us. Please Signup.</p>' + '        </div>' + '    <button type="button" class="btn btn-medium btn-primary vm-ecom-send-otp pull-left" >Send OTP</button>' + '  </div> <div class="modal-footer">' + '    <button type="button" class="btn btn-medium btn-warning vm-ecom-guest-checkout pull-left hide">Guest Checkout</button>' + '    <button type="button" class="btn btn-medium btn-primary vm-ecom-goto-signin ">Existing User?</button>' + '    <button type="button" class="btn btn-medium btn-info vm-ecom-goto-register">New user?</button>' + '     </form></div>' + '<form id="compareOTPForm" class="hide" style="margin:0">' + '     <div class="modal-body">' + '        <div class="control-group">' + '              <label class="control-label" for="email">OTP Received</label>' + '              <div class="controls">' + '                <input class="input-block-level form-control" id="receivedOTP" name="receivedOTP" required type="text" placeholder="Enter the OTP you received">' + '            </div>' + '            <p id="warningMessage" >Please enter the OTP you have received through mail. This OTP valid for next 10 minutes.</p>' + '            <p id="otpErrorMessage" style="color:red;display:none;">OTP is not Matching or Expired.</p>' + '        </div>' + '    <button type="button" class="btn btn-medium btn-primary vm-ecom-submit-otp pull-left" disabled>Submit OTP</button><br><br>' + '            <a id="forgot-password" href="" class="forgot-password">' + '            Resend OTP ?' + '        </a>' + '  </div> <div class="modal-footer">' + '    <button type="button" class="btn btn-medium btn-warning vm-ecom-guest-checkout pull-left hide">Guest Checkout</button>' + '    <button type="button" class="btn btn-medium btn-primary vm-ecom-goto-signin ">Existing User?</button>' + '    <button type="button" class="btn btn-medium btn-info vm-ecom-goto-register">New user?</button>' + '     </form></div>' + '<form id="passwordResetForm" class="hide" style="margin:0">' + '     <div class="modal-body">' + '        <div class="control-group">' + '              <label class="control-label" for="email">Enter new Password</label>' + '              <div class="controls">' + '                <input class="input-block-level form-control" id="newPassword" name="newPassword" required type="password" placeholder="Enter the password">' + '        </div>' + '        </div>' + '        <div class="control-group">' + '              <label class="control-label" for="email">Confirm Password</label>' + '              <div class="controls">' + '                <input class="input-block-level form-control" id="confirmPassword" name="confirmPassword" required type="password" placeholder="Re-Enter the password">' + '        </div>' + '              <p id="passwordErrorMessage" style="color:red;display:none;">Please enter valid OTP</p>' + '        </div>' + '    <button type="submit" class="btn btn-medium btn-primary vm-ecom-submit-password pull-left">Submit</button>' + '  </div> <div class="modal-footer">' + '    <button type="button" class="btn btn-medium btn-warning vm-ecom-guest-checkout pull-left hide">Guest Checkout</button>' + '    <button type="button" class="btn btn-medium btn-primary vm-ecom-goto-signin ">Existing User?</button>' + '    <button type="button" class="btn btn-medium btn-info vm-ecom-goto-register">New user?</button>' + '     </form></div>' + '</div>',
    init: function() {
        this.loadCartItems();
        this.registerDiscountEvent();
    },
    registerDiscountEvent: function() {
        var that = this;
        if ($('#discountCode').length) {
            $('.viamagus-apply-ecommerce-discount').unbind();
            $('.viamagus-apply-ecommerce-discount').click(function(e) {
                e.preventDefault();
                that.calculateCartDiscountAmount();
            });
            $('.viamagus-remove-ecommerce-discount').unbind();
            $('.viamagus-remove-ecommerce-discount').click(function(e) {
                e.preventDefault();
                $('#discountCode').val('');
                $('.viamagus-remove-ecommerce-discount').hide();
                $('.viamagus-apply-ecommerce-discount').show();
                that.calculateCartDiscountAmount();
            });
        }
    },
    loadCartItems: function() {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/loadCartItems/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
        
            $(that.container).empty();
            $('#shoppingCartTotal').attr("data-total-amount", "0");
            $('#shoppingCartTotal').html("0.00");
            if (data.result && data.result.length) {
                var currencySymbol = "Rs. ";
                var currencyCode = "";
                var totalAmount = "0";
                $('#shoppingCartTotal').attr("data-total-amount", totalAmount);
                for (var i = 0; i < data.result.length; i++) {
                    var productPrice = data.result[i].productPrice;
                    var productSubTotal = "0";
                    if (data.result[i].hasOwnProperty('storeCurrency')) {
                        currencyCode = data.result[i].storeCurrency;
                        that.cartCurrency = data.result[i].storeCurrency;
                        currencySymbol = "";
                    }
                    if (data.result[i].productAmount != "" && data.result[i].productAmount != null) {
                        productSubTotal = data.result[i].productAmount;
                    }
                    if (data.result[i].totalAmount != "" && data.result[i].totalAmount != null) {
                        totalAmount = data.result[i].totalAmount;
                        $('#shoppingCartTotal').attr("data-total-amount", totalAmount);
                    }
                    if (data.result[i].transactionCurrency != "" && data.result[i].transactionCurrency != null) {
                        productPrice = data.result[i].priceInTransactCurrency;
                        currencyCode = data.result[i].transactionCurrency;
                        that.cartCurrency = data.result[i].transactionCurrency;
                        currencySymbol = "";
                        productSubTotal = data.result[i].productAmountInTransactionCurrency;
                        totalAmount = data.result[i].totalAmountInTransactionCurrency;
                        $('#shoppingCartTotal').attr("data-total-amount-in-txn-cur", data.result[i].totalAmountInTransactionCurrency);
                    }
                    var cartItemHtml = '<tr class="viamagus-cart-item-row" data-product-name="' + data.result[i].productName + '" data-product-id="' + data.result[i].productId + '" data-product-price="' + productPrice + '"';
                    cartItemHtml = cartItemHtml + 'data-discount-price="" data-product-row-total-amount="">';
                    cartItemHtml = cartItemHtml + '<td data-title="Product Name">' + data.result[i].productName + '</td>';
                    if (data.result[i].productImageUrl != '') {
                        var images = JSON.parse(data.result[i].productImageUrl).images;
                        for (var j = 0; j < images.length; j++) {
                            if (images[j].hasOwnProperty('primary')) {
                                cartItemHtml = cartItemHtml + '<td data-tile="Image"><a class="viamagus-image-lightbox" href="' + images[j].primary + '"><img class="viamagus-product-image-url" style="width:50px;height:auto;" src="' + images[j].primary + '"></a></td>';
                            }
                        }
                    } else {
                        cartItemHtml = cartItemHtml + '<td data-tile="Image"><a class="viamagus-image-lightbox" href=""><img style="width:50px;height:auto;" src=""></a></td>';
                    }
                    cartItemHtml = cartItemHtml + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="viamagus-product-price viamagus-format-number">';
                    cartItemHtml = cartItemHtml + productPrice + '</span> ' + currencyCode + '' + ((data.result[i].weightUnit != null && data.result[i].weightUnit != "") ? "/" + data.result[i].weightUnit : "") + '</td>';
                    cartItemHtml = cartItemHtml + '<td class="numeric" data-title="Quantity">';
                    var minQty = data.result[i].hasOwnProperty('minimumOrderQty') ? data.result[i].minimumOrderQty : 1;
                    var maxQty = data.result[i].hasOwnProperty('maximumOrderQty') ? data.result[i].maximumOrderQty : 100;
                    cartItemHtml = cartItemHtml + '<input data-min-qty="' + minQty + '" data-max-qty="' + maxQty + '" style="width:35px;" data-product-id="' + data.result[i].productId + '" class="viamagus-product-qty" type="number" ';
                    cartItemHtml = cartItemHtml + 'name="productQty" data-product-name-' + data.result[i].productId + '=' + data.result[i].productName + ' data-track-inv-' + data.result[i].productId + '=' + data.result[i].trackInventory + ' data-inv-qty-' + data.result[i].productId + '=' + data.result[i].inventoryQty + ' id=productQty value="' + data.result[i].productQty + '"></td>';
                    cartItemHtml = cartItemHtml + '<td class="numeric sub-total" data-title="Sub Total" ><b>' + currencySymbol + '<span class="viamagus-product-subtotal row-subtotal viamagus-format-number">' + productSubTotal + '</span> ' + currencyCode + '</b></td>';
                    cartItemHtml = cartItemHtml + '<td data-title="Remove"><button class="btn btn-warning viamagus-cart-item-remove">X</button></td></tr>';
                    $(that.container).append(cartItemHtml);
                }
                cartItemHtml = ' <span style="color:red" id="errorMsg"></span>';
                $(that.container).append(cartItemHtml);
                $('#shoppingCartTotal').html(totalAmount);
                if ($('.vm-cart-currency-code').length) {
                    $('.vm-cart-currency-code').html(currencyCode);
                    $('.vm-cart-currency-symbol').html(currencySymbol);
                }
                $('.viamagus-image-lightbox').magnificPopup({
                    type: 'image'
                });
                that.calculateCartAmount();
                that.registerCartQtyEvent();
                that.registerCartItemRemoveEvent();
                that.registerPlaceOrder();
                that.calculateCartDiscountAmount();
            } else {
                $(that.container).append('<tr><td colspan="6" style="text-align:center;"> Cart is empty. </td></tr>');
                $('.viamagus-place-order').attr("disabled", "disabled");
            }
        });
    },
    setCartSize: function() {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/getCartCount/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result) {
                $(that.cartCountPlaceHolder).html(data.result);
            }
        });
    },
    calculateCartAmount: function() {
        var totalAmount = 0;
        $('.viamagus-cart-item-row').each(function(index, item) {
            var price = parseFloat($(item).attr("data-product-price"));
            var qty = $(item).find("#productQty").val();
            var productSubtotal = parseFloat(qty * price);
            $(item).find('.viamagus-product-subtotal').html(productSubtotal);
            totalAmount = totalAmount + productSubtotal;
        });
        $('#shoppingCartTotal').html(totalAmount);
        $('.viamagus-format-number').number(true, 2);
    },
    calculateCartDiscountAmount: function() {
        var that = this;
        var discountCode = $('#discountCode').val();
        if (discountCode != "") {
            $.ajax({
                url: that.contextPath + '/REST/discount/calculateCartDiscount/',
                type: 'POST',
                data: {
                    format: 'json',
                    discountCode: discountCode
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result) {
                    if (data.result.isValidDiscount == 'Y') {
                        that.isValidDiscount = true;
                        var discountAmount = data.result.discountAmount;
                        var totalAmountAfterDiscount = data.result.totalAmountAfterDiscount;
                        $('.discountAmount').attr("data-discount-amount", discountAmount);
                        $('.totalAfterDiscountAmount').attr("data-total-amount", totalAmountAfterDiscount);
                        $('.viamagus-discount-error-message').css({
                            color: 'green'
                        });
                        if (data.result.discountErrorMessage != null && data.result.discountErrorMessage != "") {} else {
                            $('.viamagus-discount-error-message').html('Valid Code.');
                        }
                        $('.viamagus-discount-amount').show();
                        $('.viamagus-total-after-discount-section').show();
                        if (data.result.transactionCurrency != null && data.result.transactionCurrency != "") {
                            $('.discountAmount').attr("data-discount-amount-in-txn-cur", data.result.discountAmountInTransactionCurrency);
                            $('.totalAfterDiscountAmount').attr("data-total-amount-in-txn-cur", data.result.totalAmountAfterDiscountInTransactionCurrency);
                            discountAmount = data.result.discountAmountInTransactionCurrency;
                            totalAmountAfterDiscount = data.result.totalAmountAfterDiscountInTransactionCurrency
                        }
                        $('.discountAmount').html(discountAmount);
                        $('.totalAfterDiscountAmount').html(totalAmountAfterDiscount);
                        $('.viamagus-format-number').number(true, 2);
                        $('.viamagus-remove-ecommerce-discount').show();
                        $('.viamagus-apply-ecommerce-discount').hide();
                        $('#discountCode').attr("readonly", "readonly");
                    } else {
                        that.isValidDiscount = false;
                        $('.viamagus-discount-error-message').css({
                            color: 'red'
                        });
                        if (data.result.discountErrorMessage != null && data.result.discountErrorMessage != "") {
                            $('.viamagus-discount-error-message').html(data.result.discountErrorMessage);
                        }
                        $('.viamagus-discount-error-message').html(discountCode + " is an invalid code.");
                        $('#discountCode').val('');
                        $('.viamagus-discount-amount').hide();
                        $('.viamagus-total-after-discount-section').hide();
                        $('.viamagus-remove-ecommerce-discount').hide();
                        $('.viamagus-apply-ecommerce-discount').show();
                        $('.discountAmount').html('');
                        $('.totalAfterDiscountAmount').html('');
                    }
                }
            });
        } else {
            $('.viamagus-discount-error-message').html('');
            $('.viamagus-discount-amount').hide();
            $('.viamagus-total-after-discount-section').hide();
            $('.viamagus-remove-ecommerce-discount').hide();
            $('.viamagus-apply-ecommerce-discount').show();
            $('.discountAmount').html('');
            $('.totalAfterDiscountAmount').html('');
            $('#discountCode').removeAttr("readonly");
            that.isValidDiscount = false;
        }
    },
    registerCartQtyEvent: function() {
        var that = this;
        $('.viamagus-product-qty').unbind();
        $('.viamagus-product-qty').change(function(e) {
            $(this).val(Math.abs($(this).val()));
            var productId = $(this).attr("data-product-id");
            var productName = $(this).attr("data-product-name-" + productId);
            var inventoryQty = $(this).attr("data-inv-qty-" + productId);
            var trackInventory = $(this).attr("data-track-inv-" + productId);
            var minQty = $(this).attr("data-min-Qty");
            var maxQty = $(this).attr("data-max-Qty");
            var productQty = $(this).val();
            productQty = parseInt(productQty);
            inventoryQty = parseInt(inventoryQty);
            if (minQty != "" && maxQty != "") {
                if (!$(".error-msg-" + productId).length) {
                    $(this).parent().append("<div class='error-msg-" + productId + "' style='color:red;'></div>");
                } else {
                    $(".error-msg-" + productId).html("");
                }
                if (productQty < parseInt(minQty)) {
                    $(".error-msg-" + productId).html("Order quantity cannot be less than " + minQty);
                    $(this).val(minQty);
                    return;
                }
                if (maxQty != "" && productQty > parseInt(maxQty)) {
                    $(".error-msg-" + productId).append("Order quantity cannot be more than " + maxQty);
                    $(this).val(maxQty);
                    return;
                }
            }
            if (trackInventory == "Y") {
                if (inventoryQty < productQty) {
                    $("#errorMsg").html(productName + ": Available quantity for purchase " + inventoryQty);
                    $(this).val(Math.abs(inventoryQty));
                } else {
                    that.updateCart(productId, $(this).val(), function() {
                        that.loadCartItems();
                    });
                }
            } else {
                that.updateCart(productId, $(this).val(), function() {
                    that.loadCartItems();
                });
            }
        });
    },
    updateCart: function(productId, productQty, callback) {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/addToCart/',
            type: 'POST',
            data: {
                format: 'json',
                productId: productId,
                productQty: productQty
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result) {
                if (callback) {
                    callback();
                }
            }
        });
    },
    registerCartItemRemoveEvent: function() {
        var that = this;
        $('.viamagus-cart-item-remove').unbind();
        $('.viamagus-cart-item-remove').click(function(event) {
            var productId = $(this).closest('tr').attr("data-product-id");
            $.ajax({
                url: that.contextPath + '/REST/ecommerce/deleteCartItem/',
                type: 'POST',
                data: {
                    format: 'json',
                    productId: productId
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result) {
                    $(that.cartCountPlaceHolder).html(data.result);
                    that.loadCartItems();
                }
            });
        });
    },
    registerPlaceOrder: function() {
        var that = this;
        $('.viamagus-place-order').unbind();
        $('.viamagus-place-order').click(function(event) {
            that.checkLoginStatus(true, true, function() {
                that.placeOrder()
            });
        });
    },
    placeOrder: function() {
        var that = this;
        var orderItemJson = [];
        $('.viamagus-cart-item-row').each(function(index, item) {
            var price = parseFloat($(item).attr("data-product-price"));
            var productName = $(item).attr("data-product-name");
            var qty = $(item).find("#productQty").val();
            var productSubtotal = parseFloat(qty * price);
            var productId = $(item).attr("data-product-id");
            var productImageUrl = $(item).find(".viamagus-product-image-url").attr('src');
            orderItemJson.push({
                "orderItemNo": index + 1,
                "orderImageUrl": productImageUrl,
                "productName": productName,
                "productDescription": "",
                "productPrice": price + "",
                "productAmount": productSubtotal + "",
                "itemQuantity": parseInt(qty),
                "productId": parseInt(productId)
            })
        });
        var paymentCurrency = 'INR';
        var totalAmount = $('#shoppingCartTotal').attr("data-total-amount");
        var totalAmountInTransactionCur = $('#shoppingCartTotal').attr("data-total-amount-in-txn-cur");
        var discountAmount = '';
        var discountAmountInTransactionCur = '';
        var discountCode = '';
        if (that.isValidDiscount) {
            totalAmount = $('.totalAfterDiscountAmount').attr("data-total-amount");
            totalAmountInTransactionCur = $('.totalAfterDiscountAmount').attr("data-total-amount-in-txn-cur");
            discountCode = $('#discountCode').val();
            discountAmount = $('.discountAmount').attr("data-discount-amount");
            discountAmountInTransactionCur = $('.discountAmount').attr("data-discount-amount-in-txn-cur");
        }
        $('.viamagus-place-order').attr("disabled", "disabled");
        var reqOptions = {
            url: that.contextPath + '/REST/ecommerce/placeOrder',
            data: {
                format: 'json',
                totalAmount: totalAmount,
                totalAmountInTxnCurrency: totalAmountInTransactionCur,
                specialInstructions: $('#specialInstructions').val(),
                orderItemsJson: JSON.stringify(orderItemJson),
                channel: 'web',
                discountCode: discountCode,
                discountAmount: discountAmount,
                discountAmountInTxnCurrency: discountAmountInTransactionCur
            },
            callback: function(data, orderId) {
                $('.viamagus-place-order').removeAttr("disabled");
                var url = that.contextPath + "/paymentCapture.html";
                if (totalAmountInTransactionCur != "" && totalAmountInTransactionCur != null) {
                    totalAmount = totalAmountInTransactionCur;
                }
                if (discountAmountInTransactionCur != "" && discountAmountInTransactionCur != null) {
                    discountAmount = discountAmountInTransactionCur;
                }
                that.submitToUrl(url, {
                    isPaymentReqd: "Y",
                    productName: 'order-' + orderId,
                    productAmount: totalAmount,
                    paymentCurrency: that.cartCurrency,
                    isProductEditable: false,
                    isPriceEditable: false,
                    entityType: 'Order',
                    entityId: orderId,
                    discountCode: discountCode,
                    discountAmount: discountAmount
                });
            },
            errorCallBack: function(data) {
                $('.viamagus-place-order').removeAttr("disabled");
            },
            successMsg: '',
            async: false,
            showSuccessMsg: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    submitToUrl: function(path, params, method) {
        method = method || "post";
        var form = document.createElement("form");
        form._submit_function_ = form.submit;
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form._submit_function_();
    },
    resetCart: function() {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/resetCart/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result) {
                $(that.cartCountPlaceHolder).html(data.result);
            }
        });
    },
    checkLoginStatus: function(showGuestCheckOut, triggerSigInPopup, onLoginSuccess) {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/checkEcomUserLoginStatus/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result == 'loggedIn') {
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else {
                that.manageEcomSignUp(showGuestCheckOut, triggerSigInPopup, onLoginSuccess);
            }
        });
    },
    manageEcomSignUp: function(showGuestCheckOut, triggerSigInPopup, onLoginSuccess) {
        var that = this;
        if (triggerSigInPopup) {
            if ($('#signUpModal').length) {
                $('#signUpModal').modal('show');
            } else {
                $('body').append(that.signUpHtml);
                $('#signUpModal').modal('show');
            }
            that.registerSignUpEvents(showGuestCheckOut, onLoginSuccess);
        }
    },
    registerSignUpEvents: function(showGuestCheckOut, onLoginSuccess) {
        var that = this;
        $('#registerUserName').val('');
        $('#registerUserPassword').val('');
        $('#registerUserConfirmPassword').val('');
        $('#userName').val('');
        $('#password').val('');
        $('.vm-ecom-goto-register').unbind();
        $('.vm-ecom-goto-register').click(function(e) {
            e.preventDefault();
            $('#signUpHeading').html('Sign Up');
            $('#loginForm').hide();
            $('#sendOTPForm').hide();
            $('#compareOTPForm').hide();
            $('#passwordResetForm').hide();
            $('#registerForm').show();
        });
        $('.vm-ecom-goto-signin').unbind();
        $('.vm-ecom-goto-signin').click(function(e) {
            e.preventDefault();
            $('#signUpHeading').html('Sign In');
            $('#loginForm').show();
            $('#registerForm').hide();
            $('#sendOTPForm').hide();
            $('#compareOTPForm').hide();
            $('#passwordResetForm').hide();
        });
        $('.forgot-password').unbind();
        $('.forgot-password').click(function(e) {
            e.preventDefault();
            $('#signUpHeading').html('Forgot Password');
            $('#loginForm').hide();
            $('#sendOTPForm').show();
            $('#compareOTPForm').hide();
        });
        $('#sendOTPUserName').unbind();
        $("#sendOTPUserName").focus(function(e) {
            e.preventDefault();
            $("#emailIdErrorMessage").hide();
            $(".vm-ecom-send-otp").attr("disabled", false);
        });
        $('.vm-ecom-send-otp').unbind();
        $('.vm-ecom-send-otp').click(function(e) {
            e.preventDefault();
            that.checkUserExist();
        });
        $('.vm-ecom-submit-otp').unbind();
        $('.vm-ecom-submit-otp').click(function(e) {
            e.preventDefault();
            that.compareUserOTP();
        });
        that.registerEcomUser(onLoginSuccess);
        that.registerSignInEvent(onLoginSuccess);
        if (showGuestCheckOut) {
            $('.vm-ecom-guest-checkout').show();
            $('.vm-ecom-guest-checkout').unbind();
            $('.vm-ecom-guest-checkout').click(function(e) {
                e.preventDefault();
                that.placeOrder();
            });
        }
    },
    registerEcomUser: function(onLoginSuccess) {
        var that = this;
        $("#registerForm").validate({
            rules: {
                registerUserName: {
                    required: true,
                    email: true
                },
                registerUserPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 15
                },
                registerUserConfirmPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 15
                }
            },
            messages: {
                registerUserName: "Please enter a valid email address",
                registerUserPassword: {
                    required: "Please enter the password",
                    minlength: "Enter at least {0} characters",
                    maxlength: "Password cannot exceed {0} characters"
                },
                registerUserConfirmPassword: {
                    required: "Please enter the password",
                    minlength: "Enter at least {0} characters",
                    maxlength: "Password cannot exceed {0} characters"
                }
            },
            highlight: function(element, errorClass) {
                $(element).css("border", "1px solid red");
                $(element).parent().find('label').css('color', 'red');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).css("border", "1px solid #ccc");
            }
        });
        $('#registerForm').unbind('submit');
        $('#registerForm').submit(function(event) {
            event.preventDefault();
            var validator = $('#registerForm').validate();
            if ($('#registerForm').valid()) {
                if ($('#registerUserPassword').val() == $('#registerUserConfirmPassword').val()) {
                    that.submitRegisterForm(onLoginSuccess);
                } else {
                    alert("Passwords do not match.");
                    return;
                }
            }
        });
    },
    submitRegisterForm: function(onLoginSuccess) {
        var that = this;
        $('.vm-ecom-register').attr("disabled", "disabled");
        $('.vm-ecom-register').html("Signing Up..");
        var reqOptions = {
            url: that.contextPath + '/REST/ecommerce/registerEcomCustomer',
            data: {
                format: 'json',
                userName: $('#registerUserName').val(),
                password: $('#registerUserPassword').val()
            },
            callback: function(data, orderId) {
                $('.vm-ecom-register').removeAttr("disabled");
                $('.vm-ecom-register').text("Sign Up");
                that.signInToWebsite($('#registerUserName').val(), $('#registerUserPassword').val(), onLoginSuccess);
                $('#signUpModal').modal('hide');
            },
            errorCallBack: function(data) {
                $('.vm-ecom-register').removeAttr("disabled");
                $('.vm-ecom-register').text("Sign Up");
            },
            successMsg: 'Sign Up successfull.',
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    registerSignInEvent: function(onLoginSuccess) {
        var that = this;
        $("#loginForm").validate({
            rules: {
                userName: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 15
                }
            },
            messages: {
                userName: "Please enter a valid email address",
                password: {
                    required: "Please enter the password",
                    minlength: "Enter at least {0} characters",
                    maxlength: "Password cannot exceed {0} characters"
                }
            }
        });
        $('#loginForm').unbind('submit');
        $('#loginForm').submit(function(event) {
            event.preventDefault();
            var validator = $('#loginForm').validate();
            if ($('#loginForm').valid()) {
                $('.vm-ecom-signin').html("Signing In....");
                that.signInToWebsite($('#userName').val(), $('#password').val(), onLoginSuccess);
            }
        });
    },
    signInToWebsite: function(userName, password, onLoginSuccess) {
        var that = this;
        var viamagusloader = new viamagusLoader('body')
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/signInCustomer/',
            type: 'POST',
            data: {
                format: 'json',
                userName: userName,
                password: password
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            $('.vm-ecom-signin').html("Sign In");
            if (viamagusloader) {
                viamagusloader.remove();
            }
            if (data.result.validUser == 'Y') {
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else {
                alert("Invalid User Credentials");
                return;
            }
        }).fail(function(error) {
            if (viamagusloader) {
                viamagusloader.remove();
            }
        });
    },
    signOutOfWebsite: function() {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/signOutCustomer/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            $('.viamagus-ecom-sign-in-link-section').show();
            $('.viamagus-ecom-sign-in-success').hide();
            window.location.href = "home.html";
        });
    },
    loadMyOrders: function() {
        var that = this;
        if ($('.viamagus-ecom-my-orders').length) {
            $.ajax({
                url: that.contextPath + '/REST/ecommerce/loadMyOrders/',
                type: 'POST',
                data: {
                    format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result && data.result.length) {
                    
                    var myorders = [];
                    var currencySymbol = 'Rs. ';
                    var currencyCode = '';
                    var totalAmount = '';
                    var discountAmount = '';
                    for (var i = 0; i < data.result.length; i++) {
                        myorders[data.result[i].orderId] = data.result[i];
                        if (data.result[i].hasOwnProperty('storeCurrency') && data.result[i].storeCurrency != "" && data.result[i].storeCurrency != null) {
                            currencySymbol = '';
                            currencyCode = data.result[i].storeCurrency;
                            totalAmount = data.result[i].totalAmount;
                            discountAmount = data.result[i].discountAmount;
                        }
                        if (data.result[i].hasOwnProperty('transactionCurrency') && data.result[i].transactionCurrency != "" && data.result[i].transactionCurrency != null) {
                            currencySymbol = '';
                            currencyCode = data.result[i].transactionCurrency;
                            totalAmount = data.result[i].totalAmountInTransactionCurrency;
                            discountAmount = data.result[i].discountAmountInTransactCurrency;
                        }
                    }
                    for (var order in myorders) {
                        var order = myorders[order];
                        var orderHtml = '<div class="row-fluid">';
                        orderHtml = orderHtml + '<h4 style="text-align:center;">Order Ref No:<span id="orderRefNo">' + order.orderRefNo + '</span></h4></div><hr>';
                        orderHtml = orderHtml + '<div class="row-fluid">';
                        orderHtml = orderHtml + '<div class="span12"><b>Order Date:</b><span id="orderDate"> ' + order.orderDate + '</span></div></div>';
                        orderHtml = orderHtml + '<div class="row-fluid"><div class="span12"><b>Order Status:</b><span id="orderStatus"> ' + order.orderStatus + '</span></div></div>';
                        orderHtml = orderHtml + '<div class="row-fluid"><div class="span12"><b>Delivery Address:</b><span id="orderStatus"> ' + order.deliveryAddress + '</span></div></div>';
                        orderHtml = orderHtml + '<br><h4 style="text-align:center;">Order Items</h4><hr><table class="table table-striped table-condensed cf"> '
                        orderHtml = orderHtml + '<thead class="cf"> <tr style="border-bottom: 2px solid black;">  ';
                        orderHtml = orderHtml + '<th>Item Name</th><th>Image</th><th class="numeric">Price</th>';
                        orderHtml = orderHtml + '<th class="numeric">Quantity</th><th class="numeric">Sub Total</th></tr> </thead> <tbody id="viamagus-recent-order-table-content">';
                        for (var j = 0; j < data.result.length; j++) {
                            if (order.orderId == data.result[j].orderId) {
                                var productPrice = data.result[j].productPrice;
                                var productAmount = data.result[j].productAmount;
                                if (data.result[j].hasOwnProperty('transactionCurrency') && data.result[j].transactionCurrency != "" && data.result[j].transactionCurrency != null) {
                                    productPrice = data.result[j].priceInTransactCurrency;
                                    productAmount = data.result[j].productAmountInTransactionCurrency;
                                }
                                orderHtml = orderHtml + '<tr class="viamagus-cart-item-row" >';
                                orderHtml = orderHtml + '<td data-title="Product Name">' + data.result[j].productName + '</td>';
                                orderHtml = orderHtml + '<td data-title="Image"><a class="viamagus-image-lightbox" href="#"><img class="viamagus-product-image-url" style="width:50px;height:auto;" src="' + data.result[j].productImageUrl + '"></a></td>';
                                orderHtml = orderHtml + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="viamagus-product-price viamagus-format-number">';
                                orderHtml = orderHtml + ' ' + productPrice + '</span> ' + currencyCode + '</td>';
                                orderHtml = orderHtml + '<td class="numeric" data-title="Quantity">' + data.result[j].productQty + '</td>';
                                orderHtml = orderHtml + '<td class="numeric sub-total" data-title="Sub Total"><b>' + currencySymbol + '<span class="viamagus-product-subtotal row-subtotal viamagus-format-number">' + productAmount + '</span> ' + currencyCode + '</b></td>';
                                orderHtml = orderHtml + '</tr>';
                            }
                        }
                        orderHtml = orderHtml + '</tbody></table><table style="width:100%;text-align:right;"> <tbody><tr> ';
                        if (discountAmount != null && discountAmount != "") {
                            orderHtml = orderHtml + '<td colspan="5" class="numeric sub-total"><b>Discount Amount :' + currencySymbol + ' <span class="viamagus-format-number" id="discountTotal">' + discountAmount + '</span>' + currencyCode + '</b></td> ';
                        }
                        orderHtml = orderHtml + '<td colspan="5" class="numeric sub-total"><b>Total Amount :' + currencySymbol + ' <span class="viamagus-format-number" id="recentOrderTotal">' + totalAmount + '</span> ' + currencyCode + '</b></td> ';
                        orderHtml = orderHtml + '</tr></tbody></table><br><br><br><hr>';
                        $('.vm-my-order-container').append(orderHtml);
                    }
                    $('.viamagus-format-number').number(true, 2);
                }
            });
        }
    },
    checkUserExist: function() {
        var that = this;
        var userName = $("#sendOTPUserName").val();
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/checkEcomCustomer',
            type: 'POST',
            data: {
                format: 'json',
                userName: userName
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result.userExists != "Y") {
                $(".vm-ecom-send-otp").attr("disabled", "disabled");
                $("#emailIdErrorMessage").show();
            } else {
                ecomCustomerId = data.result.customerId;
                that.sendForgotPasswordEcomCustomerOTP();
            }
        });
    },
    sendForgotPasswordEcomCustomerOTP: function() {
        var that = this;
        var userName = $("#sendOTPUserName").val();
        var reqOptions = {
            url: that.contextPath + '/REST/ecommerce/sendForgotPasswordOTP',
            data: {
                format: 'json',
                userName: userName,
            },
            callback: function(data) {
                $("#sendOTPForm").hide();
                $(".vm-ecom-submit-otp").attr("disabled", "disabled");
                $("#otpErrorMessage").hide();
                $("#compareOTPForm").show();
                that.registerReceivedOTPFieldBlurEvent();
            },
            errorCallBack: function(data) {
                $(".vm-ecom-send-otp").attr("disabled", "disabled");
                $("#emailIdErrorMessage").show();
            },
            successMsg: 'Sign Up successfull.',
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    registerReceivedOTPFieldBlurEvent: function() {
        var that = this;
        $("#receivedOTP").unbind();
        $("#receivedOTP").focus(function(e) {
            e.preventDefault();
            $(".vm-ecom-submit-otp").attr("disabled", false);
            $("#otpErrorMessage").hide();
        });
    },
    compareUserOTP: function() {
        var that = this;
        var userEnteredOTP = $("#receivedOTP").val();
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/comapreEcomCustomerOTP',
            type: 'POST',
            data: {
                format: 'json',
                customerId: ecomCustomerId,
                userEnteredOTP: userEnteredOTP,
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result.userExists == "Y") {
                that.checkForgotPasswordEcomCustomerOTP();
            } else {
                $(".vm-ecom-submit-otp").attr("disabled", "disabled");
                $("#otpErrorMessage").show();
            }
        });
    },
    checkForgotPasswordEcomCustomerOTP: function() {
        var that = this;
        var userEnteredOTP = $("#receivedOTP").val();
        var reqOptions = {
            url: that.contextPath + '/REST/ecommerce/checkForgotPasswordOTP',
            data: {
                format: 'json',
                customerId: ecomCustomerId,
                userEnteredOTP: userEnteredOTP
            },
            callback: function(data) {
                $("#compareOTPForm").hide();
                $('.vm-ecom-submit-password').attr("disabled", false);
                $('.vm-ecom-submit-password').html("Submit Password");
                $("#passwordResetForm").show();
                that.resetEcomUsePassword();
            },
            errorCallBack: function(data) {
                $(".vm-ecom-submit-otp").attr("disabled", "disabled");
                $("#otpErrorMessage").show();
            },
            successMsg: 'Successfull.',
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    resetEcomUsePassword: function() {
        var that = this;
        $("#passwordResetForm").validate({
            rules: {
                newPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 15
                },
                confirmPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 15
                }
            },
            messages: {
                newPassword: {
                    required: "Please enter the password",
                    minlength: "Enter at least {0} characters",
                    maxlength: "Password cannot exceed {0} characters"
                },
                confirmPassword: {
                    required: "Please enter the password",
                    minlength: "Enter at least {0} characters",
                    maxlength: "Password cannot exceed {0} characters"
                }
            },
            highlight: function(element, errorClass) {
                $(element).css("border", "1px solid red");
                $(element).parent().find('label').css('color', 'red');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).css("border", "1px solid #ccc");
            }
        });
        $('#passwordResetForm').unbind('submit');
        $('#passwordResetForm').submit(function(event) {
            event.preventDefault();
            var validator = $('#passwordResetForm').validate();
            if ($('#passwordResetForm').valid()) {
                if ($('#newPassword').val() == $('#confirmPassword').val()) {
                    that.submitPasswordResetForm();
                } else {
                    alert("Passwords do not match.");
                    return;
                }
            }
        });
    },
    submitPasswordResetForm: function() {
        var that = this;
        $('.vm-ecom-submit-password').attr("disabled", "disabled");
        $('.vm-ecom-submit-password').html("Resetting Password..");
        var reqOptions = {
            url: that.contextPath + '/REST/ecommerce/resetEcomCustomerPassword',
            data: {
                format: 'json',
                customerId: ecomCustomerId,
                password: $('#newPassword').val()
            },
            callback: function(data) {
                alert("Password changed successfully. Please login using this password.");
                $("#loginForm").show();
                $("#passwordResetForm").hide();
            },
            errorCallBack: function(data) {
                alert("failure");
                return;
            },
            successMsg: 'Password Changed successfull.',
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    }
}
Viamagus_Currency_Manager = {
    contextPath: '',
    container: '.vm-currency-dropdown',
    baseCurrency: '',
    txnCurrency: '',
    conversionRate: '',
    init: function() {
        this.loadCurrencyList();
        this.registerCurrencyChangeEvent();
        this.changeProductPageCurrency();
        this.disableCurrencyDropDownOnPaymentPage();
    },
    loadCurrencyList: function() {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/currencylist/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != null && data.result.length) {
                $(that.container).empty();
                for (var i = 0; i < data.result.length; i++) {
                    var option = new Option(data.result[i].currencyCode,data.result[i].currencyCode)
                    if ("Y" == data.result[i].isSelected) {
                        $(option).attr("selected", "selected");
                        that.txnCurrency = data.result[i].currencyCode;
                    }
                    $(option).attr("data-currency-symbol", data.result[i].currencySymbol);
                    if ("Y" == data.result[i].isStoreCurrency) {
                        that.baseCurrency = data.result[i].currencyCode;
                    }
                    $(that.container).append(option);
                }
                that.getConversionRate(that.txnCurrency);
            }
        });
    },
    registerCurrencyChangeEvent: function() {
        var that = this;
        $(that.container).unbind();
        $(that.container).change(function() {
            that.setCurrency($(this).val(), $(this).find("option:selected").attr("data-currency-symbol"));
        });
    },
    setCurrency: function(selectedCurrency, currencySymbol) {
        var that = this;
        that.txnCurrency = selectedCurrency;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/changeCurrency/',
            type: 'POST',
            data: {
                format: 'json',
                selectedCurrency: selectedCurrency,
                currencySymbol: currencySymbol
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            that.refreshProducts();
            that.reloadCartItems();
            that.changeProductPageCurrency();
            that.getConversionRate(selectedCurrency)
        });
    },
    refreshProducts: function() {
        if ($('.vm-ecommerce-listing').length > 0) {
            for (var i = 0; i < Viamagus_Website_Loader._ecomProductList.length; i++) {
                var ecomProdList = Viamagus_Website_Loader._ecomProductList[i];
                var callback = function() {
                    ecomProdList.registerEvent();
                };
                var categoryId = ecomProdList.categoryId;
                ecomProdList.loadProducts(callback, categoryId);
            }
        }
    },
    reloadCartItems: function() {
        if ($(".viamagus-shopping-cart").length > 0) {
            debugger ;var callback = function() {
                Viamagus_Cart_Manager.registerEvent();
            }
            Viamagus_Cart_Manager.loadCartItems(callback);
        }
    },
    getConversionRate: function(txnCurrency) {
        var that = this;
        $.ajax({
            url: that.contextPath + '/REST/ecommerce/getConversionRate/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != "") {
                that.conversionRate = data.result;
                that.refreshFormProducts(txnCurrency, data.result);
            }
        });
    },
    refreshFormProducts: function(txnCurrency, conversionRate) {
        var that = this;
        if ($('.viamagus-custom-form').length) {
            $('.viamagus-custom-form').each(function(index, e) {
                var customformId = $(e).attr('id');
                Viamagus_Form_Loader._calculateProductAmount(customformId, that.baseCurrency, txnCurrency, conversionRate);
            });
        }
    },
    changeProductPageCurrency: function() {
        var that = this;
        if ($('.vm-product-page').length) {
            var productPrice = $('.vm-product-page').find('#productPrice').attr('data-product-price');
            var strikePrice = $('.vm-product-page').find('#productPrice').attr('data-product-strike-price');
            $.ajax({
                url: that.contextPath + '/REST/ecommerce/updateProductCurrency/',
                type: 'POST',
                data: {
                    format: 'json',
                    productPrice: productPrice,
                    strikePrice: strikePrice
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result != "") {
                    $('.vm-product-page').find('#productPrice').html(data.result);
                }
            });
        }
    },
    disableCurrencyDropDownOnPaymentPage: function() {
        if ($('.viamagus-payment-form').length || $('.viamagus-payment-success').length || $('.viamagus-payment-failure').length) {
            $('.vm-currency-container').hide();
        }
    }
}
Viamagus_Blog_Share = {
    _contextPath: '',
    init: function() {
        var config = {
            ui: {
                flyout: 'middle right'
            },
            networks: {
                twitter: {
                    description: document.title
                }
            }
        };
        if ($(".vm-blog").length) {
            var showSubscriberPopupOnLoad = $(".vm-blog").attr("data-show-subscription-popup");
            var popupAppearTime = $(".vm-blog").attr("data-popup-appear-time");
            if ($('.vm-blog-share').length) {
                var share = new ShareButton('.vm-blog-share',config);
                this._registerBlogSubscribeEvent(showSubscriberPopupOnLoad, popupAppearTime);
            }
        }
    },
    _registerBlogSubscribeEvent: function(showSubscriberPopupOnLoad, popupAppearTime) {
        var that = this;
        var subscribeBlogHtml = '<div class="vm-blog-subscribe" style="display:none;">';
        subscribeBlogHtml = subscribeBlogHtml + '<div class="row-fluid"><i class="dialog-close fa fa-times vm-blog-subscribe-close"></i><div class="vm-blog-subscribe-content">';
        subscribeBlogHtml = subscribeBlogHtml + '<div class="vm-blog-subscribe-title"><h2>Subscribe to our blog</h2><p>Get the latest posts in your email.</p>';
        subscribeBlogHtml = subscribeBlogHtml + '  <div class="vm-blog-subscription-success" style="display:none;"><h2>Thank you. Subscribed successfully.</h2></div>';
        subscribeBlogHtml = subscribeBlogHtml + '  <div class="vm-blog-subscription">';
        subscribeBlogHtml = subscribeBlogHtml + ' <input type="email" id="blogSubscriberEmail" name="blogSubscriberEmail" placeholder="Enter email address" required=""><p class="vm-blog-subscribe-error" style="display:none;">Please enter your email id.</p>';
        subscribeBlogHtml = subscribeBlogHtml + ' <button type="button" class="vm-blog-subscribe-submit" name="subscribeToBlog" id="subscribeToBlog" value="Subscribe">Subscribe</button></div></div></div></div></div>';
        $('body').append(subscribeBlogHtml);
        $('.vm-blog-subscribe-link').unbind();
        $('.vm-blog-subscribe-link').click(function(e) {
            e.preventDefault();
            $('.vm-blog-subscribe').toggle('slow');
        });
        $('.vm-blog-subscribe-close').unbind();
        $('.vm-blog-subscribe-close').click(function(e) {
            e.preventDefault();
            $('.vm-blog-subscribe').hide();
        });
        $('.vm-blog-subscribe-submit').unbind();
        $('.vm-blog-subscribe-submit').click(function(e) {
            e.preventDefault();
            var subscriberEmailId = $('#blogSubscriberEmail').val();
            if (subscriberEmailId == '') {
                $('.vm-blog-subscribe-error').show();
            } else {
                $('.vm-blog-subscribe-error').hide();
                that.saveBlogSubscriber(subscriberEmailId);
            }
        });
        if (showSubscriberPopupOnLoad && showSubscriberPopupOnLoad == "true") {
            if (this.readCookie('blogSubscribe' + location.hostname) == null) {
                this.createCookie('blogSubscribe' + location.hostname, 'yes', 7);
                window.setTimeout(function() {
                    $('.vm-blog-subscribe').toggle('slow');
                }, parseInt(popupAppearTime) * 1000);
            }
        }
    },
    saveBlogSubscriber: function(emailId) {
        var that = this;
        var reqOptions = {
            url: that._contextPath + '/REST/general/saveSubscriber',
            data: {
                format: 'json',
                type: 'POST',
                emailId: emailId,
                tagList: 'blog',
                channel: 'website'
            },
            callback: function(data) {
                $('.vm-blog-subscription-success').show();
                $('.vm-blog-subscription').hide();
                window.setTimeout(function() {
                    $('.vm-blog-subscribe').hide();
                }, 3000);
                that.createCookie('blogSubscribe' + location.hostname, 'yes', 365);
            },
            errorCallBack: function() {},
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    createCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else
            var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: function(name) {
        this.createCookie(name, "", -1);
    },
    initOnPaymentModeChangeEvent: function() {
        var that = this;
        $('input[type=radio][name=paymentMode]').unbind();
        $('input[type=radio][name=paymentMode]').on('change', function() {
            that.loadAdditionalChargeDetails($(this).val());
        });
        window.setTimeout(function() {
            that.loadAdditionalChargeDetails($('input[name="paymentMode"]:checked').val());
        }, 1500);
    },
    loadAdditionalChargeDetails: function(paymentMode) {
        var that = this;
        var originalPaymentAmount = $('#paymentAmount').attr("data-payment-amount");
        $.ajax({
            url: that._contextPath + '/REST/payment/getAdditionalChargeDetails/',
            type: 'POST',
            data: {
                format: 'json',
                paymentMode: paymentMode,
                paymentAmount: originalPaymentAmount,
                paymentCurrency: $('#paymentCurrency').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != null) {
                if ($('#additionalChargeAmount').length) {
                    if (data.result.chargeAmount != "" && parseFloat(data.result.chargeAmount) > 0) {
                        if (originalPaymentAmount != 'undefined' && originalPaymentAmount != "") {
                            $('.vm-additional-charge-amt').show();
                            $('#additionalChargeAmount').val(data.result.chargeAmount);
                            $('.vm-additional-charge-amt-value').html(data.result.chargeAmount);
                            $('#additionalChargeMessage').val(data.result.emailMessage);
                            $('#additionalChargeName').val(data.result.chargeName);
                            $('#checkOutSummaryTotalNumber').html(data.result.totalPayableAmount);
                            $('#paymentAmount').val(data.result.totalPayableAmount);
                            $('.vm-additional-charge-name').html(data.result.chargeName);
                            if (data.result.message != "") {
                                $('.vm-additional-charge-section').html(data.result.message + " Total Amount:" + data.result.totalPayableAmount + " " + $('#paymentCurrency').val());
                            }
                            $('.vm-format-number').number(true, 2);
                        }
                    }
                }
            } else {
                $('.vm-additional-charge-amt').hide();
                $('#checkOutSummaryTotalNumber').html(originalPaymentAmount);
                $('#paymentAmount').val(originalPaymentAmount);
                $('#additionalChargeMessage').val('');
                $('#additionalChargeName').val('');
                $('#additionalChargeAmount').val('');
                $('.vm-additional-charge-section').html('');
            }
        });
    },
};

var Viamagus_Website_Loader = {
    outerWidth: $(window).outerWidth(),
    outerHeight: $(window).outerHeight(),
    _twitterFeeds: [],
    _twitterTimeOut: '',
    _twitterLastPublishId: '',
    _ecomProductList: [],
    _init: function(options) {
        this._sendSupportEmail();
        this._enableLazyloadImages({
            siteBuilder: false
        });
        this._loadBlogPosts({
            siteBuilder: false
        });
        this._loadGallery();
        this._loadGoogleMap();
        this._loadMultipleGoogleMapLocations();
        //this._loadTimeline();
        this._loadCarousel();
        this._loadCustomerMessages();
        this._loadViaBkgImage();
        this._setHeroImageAspectRatio();
        this._loagGridGallery(true);
        this._loadViamagusBackgroundImages();
        this._loadViamagusAnimation({
            duration: '4s'
        });
        this._enableLightBoxForImages();
        this._enableLightBoxForVideos();
        this._setHeroSectionAsCover({
            siteBuilder: false
        });
        this._setCarouselSectionAsCover({
            siteBuilder: false
        });
        this._loadClientsList();
        this.updateMenuLinksForBlogOrProductPagePage();
        this._loadBackgroundVideo();
        this._applyFormLayout({
            siteBuilder: false
        });
        this._loadSocialFeeds({
            siteBuilder: false
        });
        this._applyEqualHeightSplitLayout();
        this._mobilePaddingHandler();
        this._applyEqualHeightCustomForm();
        this._applyParallaxForHeroSection();
        this._coverPagePullDownArrowHandler();
        this.initUpdatesTicker();
        this._loadSlickGallery();
        this._setSlickGallerySectionAsCover({
            siteBuilder: false
        });
        var that = this;
        /*	$(window).on('resize', function(event) {
        		event.preventDefault();
        		that._setHeroImageAspectRatio();
        	});*/
        this._loadEcommProductList();
        this._customizeViamagusButtonClickEvent();
        this._enableCollapsableSections();
        this._setFooterAsSticky();
        this._initSocialSharePlugin();
        this._initAudioPlugin();
        this._checkCloudflareSecurity();
    },
    _loadViamagusAnimation: function(options) {
        if ($(window).outerWidth() > 1024) {
            new WOW(options).init();
        }
    },
    _loadViamagusBackgroundImages: function() {
        $(".viamagus-background").each(function(index, e) {
            $(e).css({
                "background": ""
            });
            $(e).backstretch($(e).attr("data-bkg-image"));
        });
    },
    _loagGridGallery: function(initLightBox) {
        var that = this;
        if ($(".viamagus-grid-gallery").length) {
            // init
            $(".viamagus-grid-gallery").each(function(index, e) {
                var layoutMode = $(e).attr('data-layoutMode');
                var noOfColumns = Number($(e).attr('data-noOfColumns'));
                var noOfColumnsMobile = 1;
                var imageMargin = Number($(e).attr('data-imageMargin'));
                var squareThumb = $(e).attr('data-square-thumb');
                var id = $(e).attr("data-component-id");
                if (id != null && id != "" && id != 'undefined') {
                    $('#' + id).show();
                }
                if (initLightBox) {
                    if ($(window).outerWidth() < 1024) {
                        if (noOfColumns > 2) {
                            noOfColumns = 2;
                        }
                    }
                    if ($(window).outerWidth() < 800) {
                        if (noOfColumns > 1) {
                            noOfColumns = 1;
                        }
                        if ($(e).attr('data-noOfColumns-mobile') != null && $(e).attr('data-noOfColumns-mobile') != "" && $(e).attr('data-noOfColumns-mobile') != 'undefined') {
                            noOfColumnsMobile = Number($(e).attr('data-noOfColumns-mobile'));
                            if (noOfColumnsMobile != "") {
                                noOfColumns = noOfColumnsMobile;
                            }
                        }
                    }
                }
                var itemWidth = ($(e).outerWidth() - (2 * imageMargin * noOfColumns)) / noOfColumns;
                var enableLightBox = $(e).attr('data-enable-lightbox');
                /*on click of image popup*/
                var enablePopupOnImgClick = $(e).attr('data-item-info-popup');
                var columnWidth = itemWidth + 2 * imageMargin;
                $.each($(e).children('.viamagus-grid-item'), function(index, item) {
                    $(item).css({
                        width: itemWidth + "px"
                    });
                    if (squareThumb == "true") {
                        $(item).css({
                            width: itemWidth + "px",
                            height: itemWidth + "px"
                        });
                        if ($(item).find('#mask').length) {
                            $(item).find('#mask').css({
                                height: itemWidth + "px"
                            })
                        }
                    }
                    that.readjustVideoPlayIcon($(item));
                });
                var cellH = 10;
                if (layoutMode == 'masonry') {
                    cellH = 'auto';
                }
                var wall = ''
                if ($(e).attr('id') != null) {
                    var newId = "viamagus-grid-gallery_" + index;
                    $(e).attr('id', newId);
                    wall = new freewall('#' + $(e).attr('id'));
                } else {
                    wall = new freewall('.viamagus-grid-gallery');
                }
                var fixSize = null;
                if ($('.temp-component .viamagus-grid-gallery').length) {
                    return;
                }
                wall.reset({
                    selector: '.viamagus-grid-item',
                    animate: true,
                    gutterX: imageMargin,
                    gutterY: imageMargin,
                    cellW: itemWidth,
                    cellH: cellH,
                    delay: 25,
                    fixSize: 1,
                    onResize: function() {
                        wall.fitWidth($(e).outerWidth());
                    }
                });
                // caculator width and height for IE7;
                wall.fitWidth($(e).outerWidth());
                if (layoutMode == 'masonry') {
                    wall.container.find('.viamagus-grid-item img').load(function() {
                        wall.fitWidth($(e).outerWidth());
                    });
                }
                if (enableLightBox == "true" && initLightBox) {
                    that._enableImageGalleryLightbox($(e));
                } else {
                    /*on click of image popup*/
                    if (enablePopupOnImgClick == "true") {
                        that._enablePopupInfo($(e));
                    }
                }
                //enable lightbox for video items
                that._enableLightBoxForVideos($(e));
            });
        }
    },
    readjustVideoPlayIcon: function(gridItem) {
        if (gridItem.attr('data-layout') != null && gridItem.attr('data-layout') != "") {
            var layout = gridItem.attr('data-layout');
            var defaultVideoBtnSize = 50;
            var videoButton = '';
            var itemHeight = gridItem.outerHeight();
            var itemWidth = gridItem.outerWidth();
            var dataType = '';
            if (layout == 'cart' || layout == 'masonry') {
                window.setTimeout(function() {
                    dataType = gridItem.find('.viamagus-cart-img').attr('data-type');
                    itemHeight = gridItem.find('.viamagus-cart-img').outerHeight();
                    if (layout == 'cart') {
                        itemHeight = itemHeight + 20;
                    }
                    if (dataType == 'video') {
                        videoButton = gridItem.find('.viamagus-cart-img').find('.viamagus-play-video-icon');
                        videoButton.css({
                            left: (itemWidth - defaultVideoBtnSize) / 2
                        });
                        videoButton.css({
                            top: (itemHeight - defaultVideoBtnSize) / 2
                        });
                    }
                }, 500);
            } else {
                dataType = gridItem.attr('data-type');
                if (dataType == 'video') {
                    videoButton = gridItem.find('.viamagus-play-video-icon');
                    videoButton.css({
                        left: (itemWidth - defaultVideoBtnSize) / 2
                    });
                    videoButton.css({
                        top: (itemHeight - defaultVideoBtnSize) / 2
                    });
                }
            }
        }
    },
    _enableImageGalleryLightbox: function(container) {
        container.magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            }
        });
    },
    _enablePopupInfo: function(container) {
        container.find('.viamagus-grid-item').each(function(index, gridItem) {
            var imgDescBgColor = $(gridItem).find('.imgDescBgColor').attr('data-image-desc-background-color');
            var imageTitle = $(gridItem).find('h4').html();
            var fontfamily = $(gridItem).attr("data-font-style");
            if (imageTitle != null && imageTitle != '') {
                imageTitle = '<div class="modal-header" style="padding: 0px; border-bottom: 0;"><h3><span style="padding: 0.3em;">' + imageTitle + '</span></h3></div><div class="modal-body" style="padding: 1.3em;">';
            } else {
                imageTitle = '<div class="modal-header" style="padding: 0px;border-bottom: 0;"></div><div class="modal-body" style="padding: 1.4em;">';
            }
            var imageDesc = $(gridItem).find('.viamagus-paragraph').html();
            var imageSrc = $(gridItem).find('img').attr('src');
            $(gridItem).find('a').unbind();
            $(gridItem).find('a').click(function(e) {
                e.preventDefault();
                //TODO build proper modal html
                var popupHtml = '<div id="gridInfoPopup" style="' + fontfamily + '" class="md-modal md-effect-1"><div class="md-content" style="background:' + imgDescBgColor + '">' + imageTitle + '<img src=' + imageSrc + ' alt="Image" style="float: left;margin-right: 10px;margin-top: 7px; width:40%; max-width:40%"><p>' + imageDesc + '</p></div><div class="modal-footer" style="border-top:0px;box-shadow:0 0 0;text-align: center;border-radius:0px;background:rgba(0,0,0,0)"><button  class="btn-close" data-dismiss="modal" aria-hidden="true">Close</button></div></div></div>';
                if ($('#gridInfoPopup').length > 0) {
                    $('#gridInfoPopup').remove();
                }
                $('body').append(popupHtml);
                $('#gridInfoPopup').modal('show');
            });
            if ($(gridItem).find('a').length == 0) {
                $(gridItem).find('img').unbind();
                $(gridItem).find('img').click(function(e) {
                    e.preventDefault();
                    //TODO build proper modal html
                    var popupHtml = '<div id="gridInfoPopup" class="md-modal md-effect-1"><div class="md-content" style="background:' + imgDescBgColor + '">' + imageTitle + '<img src=' + imageSrc + ' alt="Image" style="float: left;margin-right: 10px;margin-top: 7px; width:40%; max-width:40%"><p>' + imageDesc + '</p></div><div class="modal-footer" style="border-top:0px;box-shadow:0 0 0;text-align: center;border-radius:0px;background:rgba(0,0,0,0)"><button  class="btn-close" data-dismiss="modal" aria-hidden="true">Close</button></div></div></div>';
                    if ($('#gridInfoPopup').length > 0) {
                        $('#gridInfoPopup').remove();
                    }
                    $('body').append(popupHtml);
                    $('#gridInfoPopup').modal('show');
                });
            }
        });
    },
    _enableLightBoxForVideos: function(container) {
        $('.viamagus-grid-video-lightbox').magnificPopup({
            type: 'iframe'
        });
    },
    _enableLightBoxForImages: function(container) {
        $('.viamagus-image-lightbox').magnificPopup({
            type: 'image'
        });
    },
    _setHeroImageAspectRatio: function() {
        if ($(".viamagus_landimg").length) {
            $(".viamagus_landimg").each(function(index, e) {
                if ($(e).attr("data-img-uri") != "") {
                    if ($(window).outerWidth() < 800) {
                        $(e).backstretch($(e).attr("data-img-uri"));
                    }
                }
                if ($(e).attr("data-portrait-img-uri") != "") {
                    if ($(window).outerWidth() < $(window).outerHeight() && $(window).outerWidth() < 800) {
                        $(e).backstretch($(e).attr("data-portrait-img-uri"));
                    }
                }
            });
        }
        if ($(".viamagus_txt-slide").length) {
            if ($(".viamagus_txt-slide").attr("data-bkg-img") != "") {
                if ($(window).outerWidth() < 800) {
                    $(".viamagus_txt-slide").children("#magus-carousel").backstretch($(".viamagus_txt-slide").attr("data-bkg-img"));
                }
            }
        }
    },
    _setHeroSectionAsCover: function(options) {
        var that = this;
        $(".viamagus_landimg").each(function(index, e) {
            if ($(e).attr("data-bkg-as-cover") != "" && $(e).attr("data-bkg-as-cover") == "true") {
                $(e).css({
                    height: $(window).outerHeight()
                });
                if ($(e).find('.displayTableCell').length) {
                    $(e).find('.displayTableCell').css({
                        height: $(window).outerHeight()
                    });
                } else {
                    $(e).find('.box-video').css({
                        height: $(window).outerHeight()
                    });
                }
                if ($('#viamagusParallaxCss').length) {
                    $('#viamagusParallaxCss').remove();
                }
                $('head').append("<style id='viamagusParallaxCss'>.viamagus_landimg:before{height:" + $(window).outerHeight() + "px; }</style>");
                if (!options.siteBuilder) {
                    if ($(e).prev().length && $(e).prev().prop('class').indexOf('viamagus_header') != -1) {
                        var style = $(e).attr("style");
                        var menuOffSetTop = $('.viamagus_header').offset().top;
                        if (menuOffSetTop == 0) {
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
                        } else {
                            style = style;
                        }
                        $(e).attr("style", style);
                        $('.viamagus_header .brand').find('img').load(function() {
                            $(e).css({
                                position: 'relative'
                            });
                            $(e).css({
                                "z-index": '0'
                            });
                            var style = $(e).attr("style");
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important";
                            $(e).attr("style", style);
                        });
                    }
                    if ($(e).next().length && $(e).next().prop('class').indexOf('viamagus_header') != -1) {
                        var style = "";
                        if ($(e).next().attr("style")) {
                            style = $(e).next().attr("style");
                        }
                        style = style /* + "margin-top:-" + $('.viamagus_header').height() + "px !important"*/ ;
                        $(e).next().attr("style", style);
                        $('.viamagus_header .brand').find('img').load(function() {
                            $(e).css({
                                position: 'relative'
                            });
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important";
                            $(e).css({
                                "z-index": '0'
                            });
                            $(e).next().attr("style", style);
                        });
                    }
                    that.registerWindowScrollEventForCoverWebsites();
                } else {
                    if ($(e).parent().prev().find(".viamagus_header").length && $(e).parent().prev().find(".viamagus_header").prop('class').indexOf('viamagus_header') != -1) {
                        $(e).css({
                            position: 'relative'
                        });
                        $(e).css({
                            "z-index": '0'
                        });
                        var style = $(e).attr("style");
                        style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important";
                        $(e).attr("style", style);
                    }
                }
            }
        });
        // setting hero section as cover first
        that._setActiveMenuLink();
    },
    registerWindowScrollEventForCoverWebsites: function() {
        var enableTransparentmenuoncovermode = $('.viamagus_header .navbar-inner').attr("data-transparent-menu-cover-mode");
        var menuOffSetTop = $('.viamagus_header').offset().top;
        var navStyle = $('.viamagus_header').attr('style');
        if (navStyle == undefined) {
            navStyle = '';
        }
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            var bkgcolor = $('.viamagus_header .navbar-inner').attr("data-bkg-color");
            if ($('.viamagus_header').attr("data-sticky-header") && $('.viamagus_header').attr("data-sticky-header") == "true" && menuOffSetTop > 0) {
                if ((scrollTop + $('.viamagus_header').height()) >= menuOffSetTop) {
                    $('.viamagus_header').attr('style', 'position:fixed;top:0;width:100%;z-index:1010');
                } else {
                    /*navStyle = navStyle+"top:"+menuOffSetTop+'px;';*/
                    $('.viamagus_header').attr('style', navStyle);
                }
            }
            if (scrollTop < $('.viamagus_header').height()) {
                if (enableTransparentmenuoncovermode != "" && enableTransparentmenuoncovermode == "true") {
                    if ($('.viamagus_header .viamagus-component-bg-colour').length) {
                        $('.viamagus_header .viamagus-component-bg-colour').css({
                            background: 'rgba(0,0,0,0)'
                        });
                    } else {
                        $('.viamagus_header .navbar-inner').css({
                            background: 'rgba(0,0,0,0)'
                        });
                    }
                }
            } else {
                if ($('.viamagus_header .viamagus-component-bg-colour').length) {
                    $('.viamagus_header .viamagus-component-bg-colour').css({
                        background: bkgcolor
                    });
                } else {
                    $('.viamagus_header .navbar-inner').css({
                        background: bkgcolor
                    });
                }
            }
        });
        if (enableTransparentmenuoncovermode != "" && enableTransparentmenuoncovermode == "true") {
            if ($('.viamagus_header .viamagus-component-bg-colour').length) {
                $('.viamagus_header .viamagus-component-bg-colour').css({
                    background: 'rgba(0,0,0,0)'
                });
            } else {
                $('.viamagus_header .navbar-inner').css({
                    background: 'rgba(0,0,0,0)'
                });
            }
            if ($(window).outerHeight() < 800) {
                $('.viamagus_header .nav-collapse').css({
                    background: $('.viamagus_header .navbar-inner').attr("data-bkg-color")
                });
            }
        }
    },
    _setActiveMenuLink: function() {
        var documentUrl = document.URL;
        var urlContent = document.URL.split('/');
        var pageName = 'home.html';
        var enableOnePageNav = false;
        var sectionName = '';
        if ($('.viamagus_header').attr("data-sticky-header") && $('.viamagus_header').attr("data-sticky-header") == "true") {
            var menuOffSetTop = $('.viamagus_header').offset().top;
            if (menuOffSetTop == 0) {
                $('.viamagus_header').addClass("viamagus-sticky-header");
                if ($('.viamagus_header').is(':visible')) {
                    $('.viamagus_header .brand').find('img').load(function() {
                        $('body').css({
                            "padding-top": $('.viamagus_header').height()
                        });
                    });
                    $('body').css({
                        "padding-top": $('.viamagus_header').height()
                    });
                }
            }
        }
        window.setTimeout(function() {
            for (var i in urlContent) {
                if (urlContent[i].search('.html') != -1 && urlContent[i].indexOf('#') == -1) {
                    pageName = urlContent[i];
                }
                if (urlContent[i].indexOf('#') != -1) {
                    pageName = "home.html";
                    if (urlContent[i].search('.html') != -1) {
                        pageName = urlContent[i].split('#')[0];
                        if (urlContent[i].split('#')[1] != null && urlContent[i].split('#')[1] != "" && $('#' + urlContent[i].split('#')[1]).length) {
                            var offset = $('#' + urlContent[i].split('#')[1]).offset().top - $('.viamagus_header').height();
                            sectionName = urlContent[i].split('#')[1];
                            $('html, body').animate({
                                scrollTop: offset
                            }, 1500, 'swing', null);
                        }
                    } else {
                        if (urlContent[i] != null && urlContent[i] != "" && $(urlContent[i]).length) {
                            var offset = $(urlContent[i]).offset().top - $('.viamagus_header').height();
                            $('html, body').animate({
                                scrollTop: offset
                            }, 1500, 'swing', null);
                        }
                    }
                }
            }
            if ($('.viamagus_header').length && pageName != '') {
                $('.viamagus_header').find('ul').find('li.active').removeClass('active');
                $.each($('.viamagus_header').find('ul').find('li'), function(index, link) {
                    var linkTarget = $(link).find('a').attr('href');
                    if (linkTarget.indexOf('#') != -1) {
                        var linkName = linkTarget.split('#');
                        var linkPageName = linkName[0];
                        var linkSectionName = linkName[1];
                        if (linkPageName == pageName) {
                            $(link).find('a').attr('href', "#" + linkSectionName);
                            enableOnePageNav = true;
                        } else {
                            $(link).children('a').addClass('external');
                        }
                    } else {
                        $(link).children('a').addClass('external');
                    }
                    if ($(link).hasClass('dropdown')) {
                        $.each($(link).find('ul').find('li'), function(index, sublink) {
                            var sublinkTarget = $(sublink).find('a').attr('href');
                            if (sublinkTarget == pageName) {
                                $(link).addClass('active');
                            }
                        });
                    }
                    if (linkTarget == pageName || (pageName == 'home.html' && linkTarget == '/')) {
                        $(link).addClass('active');
                    }
                });
            }
            if (enableOnePageNav) {
                var navBarHeight = $('.viamagus_header').height();
                $('.viamagus_header').onePageNav({
                    currentClass: 'active',
                    changeHash: false,
                    scrollSpeed: 1000,
                    scrollThreshold: 0.5,
                    filter: ':not(.external)',
                    navBarHeight: navBarHeight
                });
            }
        }, 100);
        /*window.setTimeout(function(){
          if(sectionName!='')
           if(window.scrollY!=$('#'+sectionName).offset().top){
           $('html, body').animate({
        						scrollTop: $('#'+sectionName).offset().top
        					}, 100, 'swing', null);
           }
        
        },100);*/
        $('.viamagus_header ul li.dropdown .menulink').unbind();
        $('.viamagus_header ul li.dropdown .menulink').click(function(e) {
            var openDropDown = $('.viamagus_header ul li.dropdown.open');
            window.setTimeout(function() {
                openDropDown.addClass('active');
            }, 750);
            if ($(e).attr("href") != -1) {
                var urlLinkVal = $(this).attr("href");
                var offset = $('#' + urlLinkVal.split('#')[1]).offset().top - $('.viamagus_header').height();
                $('html, body').animate({
                    scrollTop: offset
                }, 1000, 'swing', null);
            }
        });
    },
    _loadViaBkgImage: function() {
        if (typeof(loadViaBkgImage) === "function") {
            if (loadViaBkgImage) {
                loadViaBkgImage();
            }
        }
    },
    _loadCarousel: function(options) {
        $(".carousel").each(function(index, e) {
            if ($(e).attr("data-interval") != "") {
                var dataInterval = $(e).attr("data-interval");
                $(e).carousel({
                    interval: dataInterval
                });
            }
        });
    },
    _setCarouselSectionAsCover: function(options) {
        var that = this;
        $(".carousel").each(function(index, e) {
            if ($(e).attr("data-bkg-as-cover") != "" && $(e).attr("data-bkg-as-cover") == "true") {
                $(e).css({
                    height: $(window).outerHeight()
                });
                $(e).find('.carousel-img').each(function(index2, img) {
                    $(img).css({
                        height: $(window).outerHeight()
                    });
                });
                $(e).find('.slider-text-center-text').css({
                    height: $(window).outerHeight()
                });
                if (!options.siteBuilder) {
                    var carouselComponent;
                    if ($(e).parent().hasClass('viamagus-component-content')) {
                        carouselComponent = $(e).parent().parent().parent();
                    } else {
                        carouselComponent = $(e).parent();
                    }
                    if (carouselComponent.prev().length && carouselComponent.prev().prop('class').indexOf('viamagus_header') != -1) {
                        var style = '';
                        var initialStyle = '';
                        if (carouselComponent.attr("style") == undefined) {
                            style = '';
                        } else {
                            style = carouselComponent.attr("style");
                            initialStyle = carouselComponent.attr("style");
                        }
                        var menuOffSetTop = $('.viamagus_header').offset().top;
                        if (menuOffSetTop <= 50) {
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
                        } else {
                            style = style;
                        }
                        $(window).scroll(function() {
                            var scrollTop = $(window).scrollTop();
                            var style = '';
                            if (scrollTop < $('.viamagus_header').height()) {
                                style = initialStyle + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
                                carouselComponent.attr("style", style);
                            }
                        });
                        carouselComponent.attr("style", style);
                        $('.viamagus_header .brand').find('img').load(function() {
                            carouselComponent.css({
                                position: 'relative'
                            });
                            carouselComponent.css({
                                /*"z-index": '-1'*/
                            });
                            var style = carouselComponent.attr("style");
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important";
                            carouselComponent.attr("style", style);
                        });
                    }
                    if (carouselComponent.next().length && carouselComponent.next().prop('class').indexOf('viamagus_header') != -1) {
                        var style = "";
                        if (carouselComponent.next().attr("style")) {
                            style = carouselComponent.next().attr("style");
                        }
                        style = style /* + "margin-top:-" + $('.viamagus_header').height() + "px !important;margin-bottom:"+ $('.viamagus_header').height() + "px"*/ ;
                        carouselComponent.next().attr("style", style);
                        $('.viamagus_header .brand').find('img').load(function() {
                            carouselComponent.css({
                                position: 'relative'
                            });
                            carouselComponent.css({
                                /*"z-index": '-1'*/
                            });
                            carouselComponent.next().attr("style", style);
                        });
                    }
                    that.registerWindowScrollEventForCoverWebsites();
                } else {
                    var sitebuildercarouselcomponent;
                    if ($(e).parent().hasClass('viamagus-component-content')) {
                        sitebuildercarouselcomponent = $(e).parent().parent().parent();
                    } else {
                        sitebuildercarouselcomponent = $(e).parent();
                    }
                    if (sitebuildercarouselcomponent.parent().prev().find(".viamagus_header").length && sitebuildercarouselcomponent.parent().prev().find(".viamagus_header").prop('class').indexOf('viamagus_header') != -1) {
                        sitebuildercarouselcomponent.css({
                            position: 'relative'
                        });
                        sitebuildercarouselcomponent.css({
                            /*"z-index": '-1'*/
                        });
                        var style = sitebuildercarouselcomponent.attr("style");
                        style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
                        sitebuildercarouselcomponent.attr("style", style);
                    }
                }
            }
        });
    },
    _loadGallery: function(options) {
        if ($('.galleria').length) {
            var thumbnails = ($('.galleria').attr("data-thumbnails") == 'true' ? true : false);
            var autoplay = ($('.galleria').attr("data-autoplay") == 'true' ? 5000 : false);
            var imageCrop = $('.galleria').attr("data-imageCrop");
            var height = $('.galleria').attr("data-gallerySize");
            //Galleria.loadTheme('/static/sitebuilder/js/themes/classic/galleria.classic.min.js');
            Galleria.configure({
                transition: 'fade',
                imageCrop: imageCrop
            });
            Galleria.run('.galleria', {
                height: height,
                autoplay: autoplay,
                thumbnails: thumbnails,
                responsive: true,
                showCounter: true,
                trueFullscreen: true,
                debug: false,
                showInfo: false
            });
        }
    },
    _loadGoogleMap: function() {
        var googleMapStyles = {
            "default": "",
            "lightgrayscale": [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 65
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 30
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -97
                }]
            }],
            "lightmonochrome": [{
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "hue": "#e9ebed"
                }, {
                    "saturation": -78
                }, {
                    "lightness": 67
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#bbc0c4"
                }, {
                    "saturation": -93
                }, {
                    "lightness": 31
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#e9ebed"
                }, {
                    "saturation": -90
                }, {
                    "lightness": -8
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "hue": "#e9ebed"
                }, {
                    "saturation": 10
                }, {
                    "lightness": 69
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [{
                    "hue": "#2c2e33"
                }, {
                    "saturation": 7
                }, {
                    "lightness": 19
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#bbc0c4"
                }, {
                    "saturation": -93
                }, {
                    "lightness": 31
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#bbc0c4"
                }, {
                    "saturation": -93
                }, {
                    "lightness": -2
                }, {
                    "visibility": "simplified"
                }]
            }],
            "darkgrayscale": [{
                "featureType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "gamma": 0.5
                }]
            }],
            "applemapsque": [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a2daf2"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f7f1df"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d0e3b4"
                }]
            }, {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#bde6ab"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fbd3da"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffe15f"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#efd151"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "black"
                }]
            }, {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#cfb2db"
                }]
            }],
            "lunarlandscape": [{
                "stylers": [{
                    "hue": "#ff1a00"
                }, {
                    "invert_lightness": true
                }, {
                    "saturation": -100
                }, {
                    "lightness": 33
                }, {
                    "gamma": 0.5
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2D333C"
                }]
            }],
            "icyblue": [{
                "stylers": [{
                    "hue": "#2c3e50"
                }, {
                    "saturation": 250
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 50
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }],
            "redhues": [{
                "stylers": [{
                    "hue": "#dd0d0d"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }],
            "turquoisewater": [{
                "stylers": [{
                    "hue": "#16a085"
                }, {
                    "saturation": 0
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }],
            "blueessence": [{
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#e0efef"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "hue": "#1900ff"
                }, {
                    "color": "#c0e8e8"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill"
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "color": "#7dcdcd"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": 700
                }]
            }],
            "illustrao": [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#71ABC3"
                }, {
                    "saturation": -10
                }, {
                    "lightness": -21
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#7DC45C"
                }, {
                    "saturation": 37
                }, {
                    "lightness": -41
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#C3E0B0"
                }, {
                    "saturation": 23
                }, {
                    "lightness": -12
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#A19FA0"
                }, {
                    "saturation": -98
                }, {
                    "lightness": -20
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#FFFFFF"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }],
        };
        if (document.getElementById('map_canvas')) {
            var latLng = new google.maps.LatLng(12.969431, 77.600845);
            var latLngJson = $('#latLng').html();
            if (latLngJson != "") {
                latLng = JSON.parse(latLngJson);
                var newArray = [];
                for (var key in latLng) {
                    newArray.push(key);
                }
                latLng = new google.maps.LatLng(latLng[newArray[0]], latLng[newArray[1]]);
            }
            var defaultZoom = 9;
            if ($('#addressPickerZoom') != null && eval($('#addressPickerZoom').val()) > 0) {
                defaultZoom = Math.floor($('#addressPickerZoom').val());
            }
            var contentString = '<div id="infoWindowContent"> ' + $('#customerAddress').text() + '  </div>'
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200
            });
            var mapstyle = '';
            if ($('#map_canvas').attr("data-google-map-style") != "") {
                mapstyle = googleMapStyles[$('#map_canvas').attr("data-google-map-style")];
            }
            var map = new google.maps.Map(document.getElementById('map_canvas'), {
                zoom: defaultZoom,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: mapstyle,
                scrollwheel: false
            });
            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);
        }
    },
    _loadMultipleGoogleMapLocations: function() {
        var that = this;
        var googleMapStyles = {
            "default": "",
            "lightgrayscale": [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 65
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 30
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -97
                }]
            }],
            "lightmonochrome": [{
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "hue": "#e9ebed"
                }, {
                    "saturation": -78
                }, {
                    "lightness": 67
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#bbc0c4"
                }, {
                    "saturation": -93
                }, {
                    "lightness": 31
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#e9ebed"
                }, {
                    "saturation": -90
                }, {
                    "lightness": -8
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "hue": "#e9ebed"
                }, {
                    "saturation": 10
                }, {
                    "lightness": 69
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [{
                    "hue": "#2c2e33"
                }, {
                    "saturation": 7
                }, {
                    "lightness": 19
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#bbc0c4"
                }, {
                    "saturation": -93
                }, {
                    "lightness": 31
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [{
                    "hue": "#bbc0c4"
                }, {
                    "saturation": -93
                }, {
                    "lightness": -2
                }, {
                    "visibility": "simplified"
                }]
            }],
            "darkgrayscale": [{
                "featureType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "gamma": 0.5
                }]
            }],
            "applemapsque": [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a2daf2"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f7f1df"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d0e3b4"
                }]
            }, {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#bde6ab"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fbd3da"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffe15f"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#efd151"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "black"
                }]
            }, {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#cfb2db"
                }]
            }],
            "lunarlandscape": [{
                "stylers": [{
                    "hue": "#ff1a00"
                }, {
                    "invert_lightness": true
                }, {
                    "saturation": -100
                }, {
                    "lightness": 33
                }, {
                    "gamma": 0.5
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2D333C"
                }]
            }],
            "icyblue": [{
                "stylers": [{
                    "hue": "#2c3e50"
                }, {
                    "saturation": 250
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 50
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }],
            "redhues": [{
                "stylers": [{
                    "hue": "#dd0d0d"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }],
            "turquoisewater": [{
                "stylers": [{
                    "hue": "#16a085"
                }, {
                    "saturation": 0
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }],
            "blueessence": [{
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#e0efef"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "hue": "#1900ff"
                }, {
                    "color": "#c0e8e8"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill"
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "color": "#7dcdcd"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": 700
                }]
            }],
            "illustrao": [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#71ABC3"
                }, {
                    "saturation": -10
                }, {
                    "lightness": -21
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#7DC45C"
                }, {
                    "saturation": 37
                }, {
                    "lightness": -41
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#C3E0B0"
                }, {
                    "saturation": 23
                }, {
                    "lightness": -12
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "hue": "#A19FA0"
                }, {
                    "saturation": -98
                }, {
                    "lightness": -20
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#FFFFFF"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }, {
                    "visibility": "simplified"
                }]
            }],
        }
        if ($(".viamagus-google-map").length > 0) {
            $(".viamagus-google-map").each(function(index, e) {
                var latLng = new google.maps.LatLng(12.969431, 77.600845);
                var latLngJson = $(e).find('.viamagus-google-latlng').html();
                var defaultZoom = 9;
                if ($(e).find('.viamagus-google-mapzoom') != null && eval($(e).find('.viamagus-google-mapzoom').val()) > 0) {
                    defaultZoom = Math.floor($(e).find('.viamagus-google-mapzoom').val());
                }
                var contentString = '<div id="infoWindowContent"> ' + $(e).find('.viamagus-google-address').text() + '  </div>'
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300
                });
                if (latLngJson != "") {
                    latLng = JSON.parse(latLngJson);
                    var newArray = [];
                    for (var key in latLng) {
                        newArray.push(key);
                    }
                    latLng = new google.maps.LatLng(parseFloat(latLng[newArray[0]]), parseFloat(latLng[newArray[1]]));
                }
                var mapstyle = '';
                if ($(e).attr("data-google-map-style") != "") {
                    mapstyle = googleMapStyles[$(e).attr("data-google-map-style")];
                }
                var map = new google.maps.Map($(e).find('.viamagus-google-map-canvas')[0], {
                    zoom: defaultZoom,
                    center: latLng,
                    styles: mapstyle,
                    scrollwheel: false
                });
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
                infowindow.open(map, marker);
                that.registerShowDirections();
            });
        }
    },
    _loadTimeline: function() {
        if ($('#default-timeline').length) {
            var str = $('#default-timeline').html();
            str = str.replace(/\r\n?|\n/g, '');
            var timelineJSON = JSON.parse(str);
            createStoryJS({
                type: 'timeline',
                width: '100%',
                height: '600',
                source: timelineJSON,
                embed_id: 'valentine-timeline'
            });
        }
    },
    _sendSupportEmail: function() {
        $('.form-horizontal').each(function(index, e) {
            var className = $(e).attr('class');
            if (className.indexOf('viamagus-custom-form') == -1) {
                $(e).submit(function(event) {
                    event.preventDefault();
                    var customerName = document.getElementById('customerName').value;
                    var customerEmail = document.getElementById('customerEmail').value;
                    var customerMessage = '';
                    if (document.getElementById('customerMessage')) {
                        customerMessage = document.getElementById('customerMessage').value;
                    }
                    var customerPhone = '';
                    if (document.getElementById('customerPhone')) {
                        customerPhone = document.getElementById('customerPhone').value;
                    }
                    var isValidEntry = false;
                    if (document.getElementById('customerEmail').value != '' || document.getElementById('customerPhone').value != '') {
                        isValidEntry = true;
                    }
                    if ($('.contact-email .viamagus-phone').length && !$('.contact-email .viamagus-phone').intlTelInput("isValidNumber")) {
                        alert("Please enter valid phone no.");
                        return;
                    }
                    if (!isValidEntry) {
                        alert("Please enter your email or phone no.");
                        return;
                    }
                    $.ajax({
                        url: '/REST/general/customerEmail/',
                        type: 'POST',
                        data: {
                            format: 'json',
                            customerName: customerName,
                            customerEmail: customerEmail,
                            customerMessage: customerMessage,
                            customerPhone: customerPhone,
                            websiteUrl: window.location.hostname
                        },
                        dataType: 'jsonp',
                        jsonp: 'jsonCallback'
                    }).done(function(data) {
                        //alert("Thank you for contacting us. We shall get back to you at the earliest!");
                        document.getElementById('customerName').value = '';
                        document.getElementById('customerEmail').value = '';
                        if ($('.contact-email .viamagus-phone').length) {
                            $('.contact-email .viamagus-phone').val('');
                        }
                        if (document.getElementById('customerMessage')) {
                            document.getElementById('customerMessage').value = '';
                        }
                        if (document.getElementById('customerPhone')) {
                            document.getElementById('customerPhone').value = '';
                        }
                        var modalHtml = '<div class="modal hide fade" id ="confirmModal">';
                        modalHtml = modalHtml + '<div class="modal-header" style="min-height:100px;padding:15px 20px; border:0px;">';
                        modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
                        modalHtml = modalHtml + '<h3 style="padding:25px 20px;font-size:18px;">Thank you for contacting us. We shall get back to you at the earliest!</h3>';
                        modalHtml = modalHtml + '</div>';
                        modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="background-color: #2167FF;color:white;opacity:1;padding: 5px 10px;font-size: 14px;margin:20px;">OK</button>';
                        modalHtml = modalHtml + '</div>';
                        $('body').append(modalHtml);
                        $('#confirmModal').modal('show');
                    });
                });
            }
        });
    },
    _loadCustomerMessages: function() {
        if ($('#vmSmsUpdatesBoard').length) {
            $.ajax({
                url: '/REST/general/loadCustomerMsg',
                data: {
                    format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result.length == 0) {
                    $('#vmSmsUpdatesBoard').toggle();
                    return;
                }
                var defaultMessage = '';
                for (var i = data.result.length; i > data.result.length - 1; i--) {
                    defaultMessage = defaultMessage + ' <li id="latestMessage">';
                    defaultMessage = defaultMessage + ' <div class="vm-text-update-badge danger"><i class="glyphicon icon-comment"></i></div>';
                    defaultMessage = defaultMessage + ' <div class="vm-text-update-panel">';
                    defaultMessage = defaultMessage + ' <div class="vm-text-update-heading">';
                    defaultMessage = defaultMessage + ' <p><small class="text-muted"><i class="glyphicon icon-time"></i> ' + data.result[i - 1].msgAge + ' via SMS</small></p>';
                    defaultMessage = defaultMessage + ' </div>';
                    defaultMessage = defaultMessage + ' <div class="vm-text-update-body">';
                    defaultMessage = defaultMessage + ' <p> ' + data.result[i - 1].msg + ' </p>';
                    defaultMessage = defaultMessage + ' <hr>';
                    defaultMessage = defaultMessage + ' <div id="loadMoreMessages" class="oldupdates">';
                    defaultMessage = defaultMessage + ' <a  href="javascript:Viamagus_Website_Loader.showOlderMessages();"> Click To Load Older Updates</a>';
                    defaultMessage = defaultMessage + ' </div></div></div></li>';
                }
                $('#vmSmsUpdatesBoard').find('ul').empty();
                $('#vmSmsUpdatesBoard').find('ul').append(defaultMessage);
                $('#vmSmsUpdatesBoard').append('<ul class="vm-text-update" id="previousMessageCollection" style="display:none" ></ul>');
                var otherMessage = '';
                for (var i = data.result.length - 1; i > 0; i--) {
                    otherMessage = otherMessage + ' <li>';
                    otherMessage = otherMessage + ' <div class="vm-text-update-badge danger"><i class="glyphicon icon-comment"></i></div>';
                    otherMessage = otherMessage + ' <div class="vm-text-update-panel">';
                    otherMessage = otherMessage + ' <div class="vm-text-update-heading">';
                    otherMessage = otherMessage + ' <p><small class="text-muted"><i class="glyphicon icon-time"></i> ' + data.result[i - 1].msgAge + ' via SMS</small></p>';
                    otherMessage = otherMessage + ' </div>';
                    otherMessage = otherMessage + ' <div class="vm-text-update-body">';
                    otherMessage = otherMessage + ' <p> ' + data.result[i - 1].msg + ' </p>';
                    otherMessage = otherMessage + ' <hr></div></div></li>';
                }
                $('#previousMessageCollection').append(otherMessage);
            });
        }
    },
    showOlderMessages: function() {
        $('#previousMessageCollection').toggle();
    },
    _loadBlogPosts: function(options) {
        if ($(".vm-blog").length) {
            var url = '';
            // this.updateMenuLinksForBlogPage();
            if (options.siteBuilder) {
                url = '/console/REST/blog/loadPost';
                var that = this;
                var blogId = $(".vm-blog").attr("data-blog-id");
                if (blogId != "") {
                    $.ajax({
                        url: url,
                        data: {
                            blogId: blogId
                        },
                        dataType: 'jsonp',
                        jsonp: 'jsonCallback'
                    }).done(function(data) {
                        if (data.result && data.result.length > 0) {
                            $('.vm-blog-container').empty();
                            for (var i = data.result.length; i > 0; i--) {
                                that.populateBlogPostRow($('.vm-blog-container'), data.result[i - 1]);
                            }
                        }
                    });
                }
            }
        }
    },
    populateBlogPostRow: function(blogContainer, blogPost) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var postDate = new Date(blogPost.postDate);
        var blogPostHtml = '<div class="row-fluid"><div class="vm-blog-post"><div class="row-fluid">';
        /*if(blogPost.postImageUrl && blogPost.postImageUrl!=""){
			blogPostHtml = blogPostHtml +'<div class="span12 columns"><div class="image">';
			blogPostHtml = blogPostHtml +'<a href="'+blogPost.postUrl+'" title="'+blogPost.title+'" target="_self">';
			blogPostHtml = blogPostHtml +'<img src="'+blogPost.postImageUrl+'" alt="'+blogPost.title+'"> <span class="hover"> <em>Read more </em> <i></i></span></a></div></div>';
		  }*/
        blogPostHtml = blogPostHtml + '<div class="span12 columns"><div class="featurette"><div class="date-35pad pull-left"><div class="date">'
        blogPostHtml = blogPostHtml + '<span class="month">' + monthNames[postDate.getMonth()] + '</span> <span class="day">' + postDate.getDate() + '</span></div><div class="post-info"><div class="category">';
        blogPostHtml = blogPostHtml + '<a href="' + blogPost.postUrl + '" title="View all posts" rel="category tag">' + blogPost.categoryName + '</a></div></div></div>';
        blogPostHtml = blogPostHtml + '<div class="post-content"><h1>';
        blogPostHtml = blogPostHtml + '<a href="' + blogPost.postUrl + '" target="_self" title="blog post title">' + blogPost.title + '</a></h1>';
        var posttext = $("<div></div>").append(decodeURIComponent(blogPost.article));
        if (blogPost.article.length > 500) {
            blogPostHtml = blogPostHtml + '<div class="post-content-full formatted-content">' + posttext.text().substring(0, 500) + '</div>';
            blogPostHtml = blogPostHtml + '<a href="' + blogPost.postUrl + '"> Read More...</a>';
        } else {
            blogPostHtml = blogPostHtml + '<div class="post-content-full formatted-content">' + decodeURIComponent(blogPost.article) + '</div>';
        }
        blogPostHtml = blogPostHtml + '</div></div></div></div></div></div>';
        blogContainer.append(blogPostHtml);
    },
    updateMenuLinksForBlogOrProductPagePage: function() {
        if ($(".vm-blog").length || $(".vm-product-group").length || $('.vm-product-page').length) {
            if ($('.viamagus_header').length) {
                $.each($('.viamagus_header').find('ul').find('li'), function(index, link) {
                    var linkTarget = $(link).find('a').attr('href');
                    if (!$(link).find('a').attr('href').startsWith("/") && $(link).find('a').attr('href') != '/' && ($(link).find('a').attr('href').indexOf('#') == -1 || $(link).find('a').attr('href').indexOf('http') == -1)) {
                        $(link).children('a').attr('href', "/" + linkTarget);
                    }
                    if ($(link).find('a').attr('href').startsWith("//")) {
                        $(link).children('a').attr('href', linkTarget.replace("/", ""));
                    }
                });
            }
        }
    },
    _loadClientsList: function() {
        if ($(".viamagus-clients-list").length) {
            $(".viamagus-clients-list").each(function(index, e) {
                $(e).find('.elastislide-list').elastislide({});
            });
        }
    },
    _loadBackgroundVideo: function() {
        if ($(".viamagus-background-video-player").length) {
            $(".viamagus-background-video-player").mb_YTPlayer();
        }
    },
    _enableLazyloadImages: function(options) {
        if ($("img.lazy").length) {
            if (options.siteBuilder) {
                $("img.lazy").show().lazyload({
                    skip_invisible: false,
                    threshold: 600,
                    effect: "fadeIn",
                    container: '.viamagusPageSettings'
                });
            } else {
                $("img.lazy").show().lazyload({
                    threshold: 900,
                    effect: "fadeIn",
                    container: 'body'
                });
            }
        }
        if ($("div.lazy").length) {
            if (options.siteBuilder) {
                $("div.lazy").show().lazyload({
                    threshold: 600,
                    effect: "fadeIn",
                    container: '.viamagusPageSettings'
                });
            } else {
                $("div.lazy").show().lazyload({
                    threshold: 900,
                    effect: "fadeIn",
                    container: 'body'
                });
            }
        }
    },
    _applyFormLayout: function(options) {
        if ($('.vm-customform').length) {
            $(".vm-customform").each(function(index, e) {
                var formLayout = $(e).attr("data-form-layout");
                if (formLayout != "") {
                    $(e).find('.viamagus-custom-form').removeClass('form-horizontal');
                    $(e).find('.viamagus-custom-form').removeClass('form-vertical');
                    $(e).find('.viamagus-custom-form').addClass(formLayout);
                }
                if (options.siteBuilder) {
                    if ($('.vmpopover').length) {
                        /*$(e).find('.viamagus-custom-form').removeClass('form-horizontal');
                        $(e).find('.viamagus-custom-form').addClass('form-vertical');*/
                    }
                }
            });
        }
    },
    _loadSocialFeeds: function(options) {
        var refreshTweets = '';
        var that = this;
        that._twitterFeeds = [];
        var that = this;
        /*if($(".vm-social-wall").length){
           $(".vm-social-wall").each(function(index, e) { 
        		var obj = $(e);
        		//console.log("init social feed");
        		that.getSocialFeed(options,obj,false,'');
        	    if(!options.siteBuilder && Viamagus_Website_Loader.outerWidth>1024){
        		    obj.css({height:$(window).outerHeight()});
        		}
        	});
        }*/
        if ($(".vm-social-wall").length) {
            $(".vm-social-wall").each(function(index, e) {
                var obj = $(e);
                //console.log("init social feed");
                //show the twitter wall actual feeds 
                obj.find('.viamagus-social-feeds').empty();
                obj.find('.viamagus-social-feeds').show();
                that.getSocialFeed(options, obj, false, '');
                if (!options.siteBuilder && Viamagus_Website_Loader.outerWidth > 1024) {
                    obj.css({
                        height: $(window).outerHeight()
                    });
                }
            });
        }
    },
    getSocialFeed: function(options, obj, isRefresh, lastPulledId) {
        var that = this;
        var url = '';
        if (options.siteBuilder) {
            url = '/console/REST/social/loadMagusPublishSocialFeed';
        } else {
            url = '/REST/social/loadMagusPublishSocialFeed';
        }
        var socialSearchId = obj.attr("data-social-search-id");
        var refreshTime = eval(obj.attr("data-refresh-interval")) * 60000;
        // var refreshTime = 0.1*60000; 
        // alert(refreshTime);
        if (socialSearchId != "") {
            $.ajax({
                url: url,
                data: {
                    feedId: socialSearchId,
                    lastPulledId: lastPulledId
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result && data.result.length > 0) {
                    if (!isRefresh) {
                        obj.find('.viamagus-social-feeds').empty();
                        that.buidFirstTweet(obj.find('.viamagus-social-feeds'), data);
                    } else {
                        //obj.find('.viamagus-social-feeds').empty();
                        that.buidLatestTweet(obj.find('.viamagus-social-feeds'), data);
                    }
                }
                // load the recent tweets using lastpulledId
                clearTimeout(that._twitterTimeOut);
                that._twitterTimeOut = setTimeout(function() {
                    that.getSocialFeed(options, obj, true, that._twitterLastPublishId);
                }, refreshTime, options, obj, true, that._twitterLastPublishId);
                //that.refreshSocialFeed(isRefresh);
            });
        }
    },
    buidFirstTweet: function(feedObj, data) {
        var that = this;
        for (var i = 0; i < data.result.length; i++) {
            var tweetObj = data.result[i];
            that._twitterLastPublishId = tweetObj.publishId;
            that._twitterFeeds.push(tweetObj);
            feedObj.append(that.constructTweetHtml(tweetObj, 'columngridcenter activecenter'));
            feedObj.find(".columngridcenter").velocity("fadeIn", {
                duration: 3000,
                complete: function() {
                    if (feedObj.find(".activecenter .vm-twitter-video").length) {
                        feedObj.find(".activecenter .vm-twitter-video")[0].load();
                        feedObj.find(".activecenter .vm-twitter-video")[0].play();
                    }
                }
            });
        }
    },
    buidLatestTweet: function(feedObj, data) {
        var that = this;
        for (var i = 0; i < data.result.length; i++) {
            var tweetObj = data.result[i];
            that._twitterLastPublishId = tweetObj.publishId;
            that._twitterFeeds.push(tweetObj);
            that.startTwitterSlidingAnimation(feedObj, tweetObj);
        }
    },
    startTwitterSlidingAnimation: function(feedObj, tweetObj) {
        var that = this;
        var tweetHtml = that.constructTweetHtml(tweetObj, 'columngridright activeright');
        if (that._twitterFeeds.length == 2) {
            //move right tweet to center
            feedObj.append(tweetHtml);
            feedObj.find(".activeright").show();
            feedObj.find(".activeright").velocity({
                scale: [0.7]
            }, {
                duration: 0
            });
            feedObj.find(".activeright").velocity({
                scale: [1],
                left: "31.55%"
            }, {
                duration: 2000,
                complete: function() {
                    that.onTweetAnimationComplete(feedObj, callback);
                }
            });
            feedObj.find(".activecenter").velocity({
                left: "0%",
                scale: [0.7],
                margin: "0%"
            }, {
                duration: 2000,
                complete: function() {}
            });
            // $(".columngridthree").velocity({left:"35%",scale:[1.2]},{ duration: 2000});
        } else if (that._twitterFeeds.length == 3) {
            feedObj.append(tweetHtml);
            feedObj.find(".activeright").velocity("fadeIn", {
                duration: 3000
            });
        } else {
            tweetHtml = that.constructTweetHtml(tweetObj, 'columngridright freshTweet');
            feedObj.append(tweetHtml);
            var callback = function() {
                feedObj.find(".freshTweet").removeClass('freshTweet').addClass('activeright');
            };
            feedObj.find(".activeleft").velocity("fadeOut", {
                duration: 2000
            });
            feedObj.find(".activeright").velocity({
                scale: [0.7]
            }, {
                duration: 0
            });
            feedObj.find(".activeright").velocity({
                scale: [1],
                left: "31.55%"
            }, {
                duration: 2000,
                complete: function() {
                    that.onTweetAnimationComplete(feedObj, callback);
                }
            });
            feedObj.find(".activecenter").velocity({
                left: "0%",
                scale: [0.7],
                margin: "0%"
            }, {
                duration: 2000
            });
            window.setTimeout(function() {
                feedObj.find(".freshTweet").velocity("fadeIn", {
                    duration: 1000
                });
            }, 1000);
        }
    },
    onTweetAnimationComplete: function(feedObj, callback) {
        if (feedObj.find(".activeleft").length) {
            feedObj.find(".activeleft").remove();
        }
        feedObj.find(".activecenter").removeClass('activecenter').addClass('activeleft');
        feedObj.find(".activeright").removeClass('activeright').addClass('activecenter');
        if (feedObj.find(".activecenter .vm-twitter-video").length) {
            feedObj.find(".activecenter .vm-twitter-video")[0].load();
            feedObj.find(".activecenter .vm-twitter-video")[0].play();
        }
        if (callback) {
            callback();
        }
    },
    constructTweetHtml: function(tweetObj, tweetClass) {
        var feedHtml = '';
        if (!(tweetObj.mediaImageUri != "" && tweetObj.mediaImageUri != null)) {
            tweetClass = tweetClass + " only-text";
        }
        feedHtml = feedHtml + '<div class="' + tweetClass + ' span4 vm-tweet"  style="display:none;height:100%;">';
        feedHtml = feedHtml + '<div class="twitterContainer" >';
        feedHtml = feedHtml + '<div class="row-fluid">';
        feedHtml = feedHtml + '<div class="span2">';
        feedHtml = feedHtml + '<img class="vm-twitter-profile-img" src="' + tweetObj.profileImageUri + '">';
        feedHtml = feedHtml + '</div>';
        feedHtml = feedHtml + '<div class="span8">';
        feedHtml = feedHtml + '<h2 class="vm-twitter-profile-name">' + tweetObj.userName + '</h2>';
        feedHtml = feedHtml + '<h4 class="vm-twitter-hashtag">' + tweetObj.postedBy + '</h4>';
        feedHtml = feedHtml + '</div>';
        feedHtml = feedHtml + '<div class="span2">';
        feedHtml = feedHtml + '<img class="vm-twitter-bird" src="https://b92520ec2a9525957424-f27d5d7cfb65b8b0cbdd1fc15972b093.ssl.cf1.rackcdn.com/1454927007306twittericon.png">';
        feedHtml = feedHtml + '</div>';
        feedHtml = feedHtml + '</div>';
        if (tweetObj.mediaImageUri != "" && tweetObj.mediaImageUri != null) {
            feedHtml = feedHtml + '<div class="vm-twitter-message">' + tweetObj.message + '</div></div>';
            feedHtml = feedHtml + '<div class="vm-twitter-media-container">';
            if (tweetObj.isVideo == "Y") {
                feedHtml = feedHtml + '<video class="vm-twitter-video" style="width:100%;height:auto;max-height:290px;">';
                feedHtml = feedHtml + '<source src="' + tweetObj.mediaImageUri + '" type="video/mp4">';
                feedHtml = feedHtml + 'Your browser does not support the video tag.</video>';
            } else {
                //To User it as background image
                // feedHtml = feedHtml +'<div class="vm-twitter-media-image" style="background-image:url('+tweetObj.mediaImageUri+');" \></div>';
                feedHtml = feedHtml + '<img class="vm-twitter-media-image-contain" style="width:100%;height:300px; object-fit:contain;" src="' + tweetObj.mediaImageUri + '">';
            }
            feedHtml = feedHtml + '</div>';
        } else {
            // feedHtml = feedHtml +'<div class="vm-twitter-empty-section" style="height:330px;background-color:rgba(0,0,0,0);" \></div>';
            feedHtml = feedHtml + '<div class="vm-twitter-message" style="display:table;font-size:24px;line-height:1.3;padding-top:60px;padding-bottom:100px;"><div class="vm-tweet-text-container" style="display:table-cell;vertical-align:middle;">' + tweetObj.message + '</div></div></div>';
        }
        feedHtml = feedHtml + '</div>';
        return feedHtml;
    },
    refreshSocialFeed: function(isRefresh) {
        var that = this;
        if ($(".vm-social-wall").length) {
            $(".vm-social-wall").each(function(index, e) {
                var obj = $(e);
                var socialFeedContainer = obj.find('.viamagus-social-feeds');
                var animationClass = obj.attr("data-section-animation");
                if (that._twitterFeeds.length > 0) {
                    obj.find('.viamagus-social-feeds').empty();
                    var count = 0;
                    //console.log(" tweetfeeds length:"+that._twitterFeeds.length);
                    for (var index = that._twitterFeeds.length; index > 0; index--) {
                        count = count + 1;
                        if (count <= 3) {
                            that.populateSocialFeedRow(socialFeedContainer, that._twitterFeeds[index - 1], animationClass, count, isRefresh);
                        }
                    }
                    //remove oldest tweets
                    //if(that._twitterFeeds.length>5){
                    count = 0;
                    for (var index = that._twitterFeeds.length; index > 0; index--) {
                        count = count + 1;
                        if (count > 3) {
                            delete that._twitterFeeds[index - 1];
                        }
                    }
                    //}
                    that._loadViamagusAnimation({
                        duration: '2s'
                    });
                    that._enableLightBoxForImages();
                    if (!isRefresh) {
                        that._loadViamagusBackgroundImages();
                    }
                }
            });
        }
    },
    populateSocialFeedRow: function(socialFeedContainer, socialFeed, animationClass, index, isRefresh) {
        var socialFeedRowHtml = "";
        //console.log(" tweet id:"+socialFeed.publishId);
        if ((index + 1) % 2 != 0) {
            socialFeedRowHtml = socialFeedRowHtml + '<div class="row-fluid ' + animationClass + '">';
            socialFeedRowHtml = socialFeedRowHtml + '<div class="section-center1">';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="span12 vm-wall-bckgnd vm-wall-bckgnd1">';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="span12">';
            if (socialFeed.mediaImageUri != null && socialFeed.mediaImageUri != "") {
                socialFeedRowHtml = socialFeedRowHtml + '		<div class="section-style1">';
                socialFeedRowHtml = socialFeedRowHtml + '	<a href="' + socialFeed.mediaImageUri + '" class="viamagus-image-lightbox">	<img src="' + socialFeed.mediaImageUri + '" class="img-pull-left"></a>';
                socialFeedRowHtml = socialFeedRowHtml + '		</div>';
            }
            socialFeedRowHtml = socialFeedRowHtml + '		<img src="/static/sitebuilder/img/Twitter-Bird-48.png" class="pull-right social-img">';
            socialFeedRowHtml = socialFeedRowHtml + '		<p class="para-padding">' + socialFeed.message.replace(/\n/g, "<br />"); + '</p>';
            socialFeedRowHtml = socialFeedRowHtml + '		</div></div></div>';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="section-center2">';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="span12">';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="span11"><h3 class="social-header">' + socialFeed.postedBy + '</h3></div>';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="span1">';
            if (socialFeed.profileImageUri != null && socialFeed.profileImageUri != "") {
                socialFeedRowHtml = socialFeedRowHtml + '		<div class="section-style2">';
                socialFeedRowHtml = socialFeedRowHtml + '		<img src="' + socialFeed.profileImageUri + '" class="social-img1"></div>';
            } else {
                socialFeedRowHtml = socialFeedRowHtml + '		<div class="section-style2">';
                socialFeedRowHtml = socialFeedRowHtml + '		<img src="/static/sitebuilder/img/Employee-128.png" class="social-img1"></div>';
            }
            socialFeedRowHtml = socialFeedRowHtml + '		</div></div></div></div>';
        } else {
            socialFeedRowHtml = socialFeedRowHtml + '<div class="row-fluid ' + animationClass + '">';
            socialFeedRowHtml = socialFeedRowHtml + '		<div class="section-center3">';
            socialFeedRowHtml = socialFeedRowHtml + '<div class="span12 vm-wall-bckgnd vm-wall-bckgnd2">';
            socialFeedRowHtml = socialFeedRowHtml + '<div class="span12">';
            socialFeedRowHtml = socialFeedRowHtml + '<img src="/static/sitebuilder/img/Twitter-Bird-48.png" class="pull-left social-img">';
            if (socialFeed.mediaImageUri != null && socialFeed.mediaImageUri != "") {
                socialFeedRowHtml = socialFeedRowHtml + '<div class="section-style3">';
                socialFeedRowHtml = socialFeedRowHtml + '	<a href="' + socialFeed.mediaImageUri + '" class="viamagus-image-lightbox">	<img src="' + socialFeed.mediaImageUri + '" class="img-pull-right"></a></div>';
            }
            socialFeedRowHtml = socialFeedRowHtml + '<p class="para-padding">' + socialFeed.message.replace(/\n/g, "<br />"); + '</p>';
            socialFeedRowHtml = socialFeedRowHtml + ' </div></div></div>';
            socialFeedRowHtml = socialFeedRowHtml + '<div class="section-center4"><div class="span12"><div class="span1"><div class="section-style4">';
            if (socialFeed.profileImageUri != null && socialFeed.profileImageUri != "") {
                socialFeedRowHtml = socialFeedRowHtml + '		<img src="' + socialFeed.profileImageUri + '" class="social-img2">';
            } else {
                socialFeedRowHtml = socialFeedRowHtml + '		<img src="/static/sitebuilder/img/Employee-128.png" class="social-img2">';
            }
            socialFeedRowHtml = socialFeedRowHtml + '</div></div>';
            socialFeedRowHtml = socialFeedRowHtml + '<div class="span11"><h3 class="social-header2">' + socialFeed.postedBy + '</h3></div>';
            socialFeedRowHtml = socialFeedRowHtml + '</div></div></div>';
        }
        socialFeedContainer.append(socialFeedRowHtml);
    },
    _initFormPlugins: function(options) {
        if (options.sitebuilder) {
            $('.viamagus-star-rating').each(function() {
                var stars = $(this).attr("data-number");
                $(this).raty({
                    number: stars,
                    click: function(score, evt) {
                        $(this).attr('data-score', score);
                    },
                    hints: []
                });
            });
        }
    },
    _applyEqualHeightSplitLayout: function() {
        $(".viamagus-img-txt-split").each(function(index, item) {
            if ($(window).outerWidth() > 767) {
                var splitImgHeight = $(item).find('.img-container').height();
                var splitTextHeight = $(item).find('.txt-container').height();
                var splitMaxHeight = (splitImgHeight > splitTextHeight) ? splitImgHeight : splitTextHeight;
                if (splitImgHeight > splitTextHeight) {
                    $(item).find('.txt-container').css({
                        height: splitMaxHeight
                    });
                    /*$(item).find('.img-container').css({textAlign:''});
                    $(item).find('.img-container').css({verticalAlign:''});*/
                } else {
                    /*$(item).find('.txt-container').css({textAlign:''});*/
                    $(item).find('.txt-container-vertical-alignment').attr('style', '');
                    $(item).find('.img-container').css({
                        height: splitMaxHeight
                    });
                }
            } else {
                $(item).find('.txt-container').removeProp('height');
                $(item).find('.img-container').removeProp('height');
                $(item).find('.txt-container-vertical-alignment').attr('style', '');
                $(item).find('.img-container').css({
                    textAlign: ''
                });
                $(item).find('.img-container').css({
                    verticalAlign: ''
                });
                $(item).find('.txt-container').css({
                    textAlign: ''
                });
            }
        });
    },
    _mobilePaddingHandler: function() {},
    _applyEqualHeightCustomForm: function() {
        $(".VideoImageFormContainer").each(function(index, item) {
            if ($(window).outerWidth() > 767) {
                var formContainer = $(item).find('.viamagus-form-container').height();
                var videoImgContainer = $(item).find('.viamagus-video-img-container').height();
                var MaxHeight = (formContainer > videoImgContainer) ? formContainer : videoImgContainer;
                if (formContainer > videoImgContainer) {
                    $(item).find('.viamagus-video-img-container').css({
                        height: MaxHeight
                    });
                } else {
                    $(item).find('.viamagus-form-container').css({
                        height: MaxHeight
                    });
                }
            } else {
                $(item).find('.viamagus-form-vertical-alignment-style').attr('style', '');
                $(item).find('.viamagus-form-container').attr('style', '');
                $(item).find('.viamagus-video-img-container').attr('style', '');
                $(item).find('.text-center').css({
                    paddingTop: ''
                });
            }
        });
    },
    _coverPagePullDownArrowHandler: function() {
        var isCoverWebiste = false;
        var menuHeight = 0;
        if ($(".viamagus_landimg").first().attr('data-bkg-as-cover') == 'true') {
            isCoverWebiste = true;
            menuHeight = $('.viamagus_header').height();
        }
        /*$('.viamagus-cover-page-pull-down-arrow').click(function(e){
				e.preventDefault();
				$('html, body').animate({
        			scrollTop: $(".viamagus_landimg").first().height()-menuHeight
    			}, 500);
    			return false;
			});*/
        var that = this;
        var isScrollDownArrowRequired = false;
        var scrollTopHeight = 0;
        if ($(".viamagus_landimg").length > 0) {
            if ($(".viamagus_landimg").first().attr('data-bkg-as-cover') == 'true' && $(".viamagus_landimg").first().offset().top < 300) {
                isScrollDownArrowRequired = true;
                scrollTopHeight = $(".viamagus_landimg").first().height() - menuHeight;
            }
        }
        if ($(".carousel").length > 0) {
            if ($(".carousel").first().attr('data-bkg-as-cover') == 'true' && $(".carousel").first().offset().top < 300) {
                isScrollDownArrowRequired = true;
                scrollTopHeight = $(".carousel").first().height() - menuHeight;
            }
        }
        if (isScrollDownArrowRequired) {
            //var scrollDownArrowHTML = '<div class="vm-arrow-div"><a href="#" class="vm-arrow vm-animated vm-bounce viamagus-cover-page-pull-down-arrow"></a></div>';
            //$('body').append(scrollDownArrowHTML);
            $('.viamagus-cover-page-pull-down-arrow').click(function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: scrollTopHeight
                }, 500);
                return false;
            });
        }
        /*
        $(window).scroll(function() {
        	if(isScrollDownArrowRequired){
        		if($(window).scrollTop()>$(window).outerHeight()){
        			$('.vm-arrow-div').hide();
        		}else{
        			$('.vm-arrow-div').show();
        		}
        	}
        });*/
    },
    _applyParallaxForHeroSection: function() {
        try {
            $(".viamagus_landimg").each(function(index, e) {
                var backgroundPosition = $(e).attr("data-image-position");
                if ($(window).outerWidth() > 1024) {
                    $(e).parallax('50%', 0.3);
                }
            });
        } catch (e) {}
    },
    initUpdatesTicker: function() {
        var viamagus_update_ticker = {
            tickInterval: '',
            newsbar: '',
            newsbarItems: '',
            init: function() {
                var that = this;
                $.ajax({
                    url: '/REST/general/loadWebsiteUpdate/',
                    type: 'POST',
                    data: {
                        format: 'json'
                    },
                    dataType: 'jsonp',
                    jsonp: 'jsonCallback'
                }).done(function(data) {
                    if (data.result.length) {
                        var updateTickerHtml = [];
                        updateTickerHtml.push('<div class="viamagus-news-bar"  style="bottom: 0px; opacity: 1;z-index:1; height: 34px; line-height: 24px;">');
                        updateTickerHtml.push('<div class="viamagus-news-bar-title"><a href="updates.html"><h2 style="height: 24px; line-height: 24px;">Updates</h2></a></div>');
                        updateTickerHtml.push('<div><ul class="viamagus-news-bar-items" style="max-width: 100%; margin-top: 0px;">');
                        for (var i = 0; i < data.result.length; i++) {
                            var updateContent = document.createElement("DIV");
                            try {
                                updateContent.innerHTML = decodeURIComponent(data.result[i].updateContent);
                            } catch (e) {
                                updateContent.innerHTML = data.result[i].updateContent;
                            }
                            updateTickerHtml.push('	<li style="height: 24px; line-height: 24px; overflow: hidden;" class="">');
                            updateTickerHtml.push('		<a href="' + data.result[i].pageUrl + '" target="_blank" title="recent Update" data-toggle="tooltip">' + updateContent.textContent.substring(0, 100) + '</a> | ' + data.result[i].updateDate + '');
                            updateTickerHtml.push('</li>');
                        }
                        updateTickerHtml.push('	</ul></div>');
                        updateTickerHtml.push('<div class="viamagus-news-bar-navigate" style="height: 29px;line-height:29px;"><a id="viamagus-update-prev" href="#" class="prev" alt="Previous"><i class="fa fa-chevron-left"></i></a> <a href="#" id="viamagus-update-next" class="next" alt="Next"><i class="fa fa-chevron-right"></i></a></div></div>');
                        $('body').append(updateTickerHtml.join(""));
                        that.newsbar = $('.viamagus-news-bar');
                        that.newsbarItems = $('.viamagus-news-bar').find('.viamagus-news-bar-items');
                        that.initEvents();
                    }
                });
            },
            initEvents: function() {
                var that = this;
                $('#viamagus-update-prev').unbind();
                $('#viamagus-update-prev').click(function(e) {
                    e.preventDefault();
                    that.nextUpdate();
                });
                $('#viamagus-update-next').unbind();
                $('#viamagus-update-next').click(function(e) {
                    e.preventDefault();
                    that.prevUpdate();
                });
                that.tick();
                that.pauseOnHover();
            },
            nextUpdate: function() {
                this.newsbarItems.css("margin-top", "-30px");
                this.newsbar.find(".viamagus-news-bar-items li:last").prependTo(this.newsbar.find(".viamagus-news-bar-items"));
                this.newsbar.find(".viamagus-news-bar-items").animate({
                    marginTop: "0px"
                }, 500, "linear", function() {});
            },
            prevUpdate: function() {
                var that = this;
                that.newsbar.find(".viamagus-news-bar-items").animate({
                    marginTop: "-30px"
                }, 500, "linear", function() {
                    that.newsbarItems.find("li:first").appendTo(this).hide().fadeIn(300), that.newsbarItems.css("margin-top", 0)
                });
            },
            tick: function() {
                var that = this;
                this.tickInterval = setInterval(function() {
                    that.nextUpdate();
                }, 4000);
            },
            pauseOnHover: function() {
                var that = this;
                that.newsbarItems.find("li").on("hover mouseover mouseup", function() {
                    clearInterval(that.tickInterval);
                }).on("mouseout mousedown", function() {
                    that.tick();
                })
            }
        };
        viamagus_update_ticker.init();
    },
    _loadEcommProductList: function() {
        var that = this;
        if ($(".vm-currency-container").length > 0) {
            Viamagus_Currency_Manager.init();
        }
        if ($(".vm-ecommerce-listing").length > 0) {
            $(".vm-ecommerce-listing").each(function(index, container) {
                that._ecomProductList.push(new viamagusEcomListing(false, $(container)));
            });
            //Viamagus_Product_Mangager.init(false);		   
        }
        if ($(".vm-product-page").length > 0) {
            that._ecomProductList.push(new viamagusEcomListing(true, ''));
            //$('.vm-format-number').number(true,2);
            //  Viamagus_Product_Mangager.init(true);
            //init zoom
            that.initElevateZoomImageZoomerPlugin();
        }
        if ($(".viamagus-shopping-cart").length > 0) {
            Viamagus_Cart_Manager.init();
        }
        if ($(".viamagus-ecommerce-site").length > 0) {
            Viamagus_Cart_Manager.setCartSize();
        }
        if ($('.viamagus-ecom-sign-in-link-section').length) {
            Viamagus_Cart_Manager.checkLoginStatus(false, false, function() {
                $('.viamagus-ecom-sign-in-link-section').hide();
                $('.viamagus-ecom-sign-in-success').show();
            });
            //register sign in event
            $('.viamagus-ecom-sign-in-link').unbind();
            $('.viamagus-ecom-sign-in-link').click(function(event) {
                event.preventDefault();
                Viamagus_Cart_Manager.manageEcomSignUp(false, true, function() {
                    $('.viamagus-ecom-sign-in-link-section').hide();
                    $('.viamagus-ecom-sign-in-success').show();
                    $('#signUpModal').modal('hide');
                });
            });
            $('.viamagus-ecom-sign-out').unbind();
            $('.viamagus-ecom-sign-out').click(function(event) {
                event.preventDefault();
                Viamagus_Cart_Manager.signOutOfWebsite();
            });
        }
        if ($('.viamagus-ecom-my-orders').length) {
            Viamagus_Cart_Manager.loadMyOrders();
        }
    },
    _loadSlickGallery: function() {
        /*if($(".viamagus-coverflow").length>0){
        	$(".viamagus-coverflow .ContentFlow").each(function(index,item){
        		new ContentFlow($(item).attr('id'), {reflectionColor: "#000000",scrollWheelSpeed :0});
        	});		   
        }*/
        if ($(".viamagus-slick-gallery").length > 0) {
            $(".viamagus-slick-gallery").each(function(index, item) {
                var slidesToShow = 1;
                var slideDuration = 2000;
                var fade = false;
                if ($(item).attr("data-no-of-images") != "") {
                    slidesToShow = $(item).attr("data-no-of-images");
                }
                if ($(item).attr("data-slide-duration") != "") {
                    slideDuration = $(item).attr("data-slide-duration");
                }
                var autoplay = true;
                if ($(item).attr("data-auto-play") != "") {
                    autoplay = $(item).attr("data-auto-play");
                }
                if (slidesToShow == 1) {
                    fade = true;
                }
                $(item).on('init', function(event, slick) {
                    $(slick.$slides[slick.currentSlide]).find('.slick-item-desc-container').fadeIn(1000);
                }).slick({
                    dots: true,
                    infinite: true,
                    autoplaySpeed: slideDuration,
                    fade: fade,
                    speed: 2000,
                    autoplay: autoplay,
                    slidesToShow: slidesToShow,
                    slidesToScroll: 1,
                    responsive: [{
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            fade: fade,
                            dots: true
                        }
                    }]
                });
                $(item).on('afterChange', function(event, slick, currentSlide, nextSlide) {
                    $(slick.$slides[currentSlide]).find('.slick-item-desc-container').fadeIn(1000);
                });
                $(item).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    $(slick.$slides[nextSlide]).find('.slick-item-desc-container').hide();
                });
            });
        }
        // $('.viamagus_image img').socialpic();
    },
    _setSlickGallerySectionAsCover: function(options) {
        var that = this;
        $(".viamagus-slick-gallery").each(function(index, e) {
            if ($(e).attr("data-bkg-as-cover") != "" && $(e).attr("data-bkg-as-cover") == "true") {
                $(e).css({
                    height: $(window).outerHeight()
                });
                $(e).find('.slick-item').css({
                    height: $(window).outerHeight()
                });
                if (!options.siteBuilder) {
                    var carouselComponent;
                    if ($(e).parent().hasClass('viamagus-component-content')) {
                        carouselComponent = $(e).parent().parent().parent();
                    } else {
                        carouselComponent = $(e).parent();
                    }
                    if (carouselComponent.prev().length && carouselComponent.prev().prop('class').indexOf('viamagus_header') != -1) {
                        var style = '';
                        var initialStyle = '';
                        if (carouselComponent.attr("style") == undefined) {
                            style = '';
                        } else {
                            style = carouselComponent.attr("style");
                            initialStyle = carouselComponent.attr("style");
                        }
                        var menuOffSetTop = $('.viamagus_header').offset().top;
                        if (menuOffSetTop == 0) {
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
                        } else {
                            style = style;
                        }
                        $(window).scroll(function() {
                            /*var scrollTop = $( window ).scrollTop();
		    			var style = '';
		    			if(scrollTop < $('.viamagus_header').height()){
		    				style = initialStyle + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
	    					carouselComponent.attr("style", style);
		    			}*/
                        });
                        carouselComponent.attr("style", style);
                        $('.viamagus_header .brand').find('img').load(function() {
                            carouselComponent.css({
                                position: 'relative'
                            });
                            carouselComponent.css({
                                /*"z-index": '-1'*/
                            });
                            var style = carouselComponent.attr("style");
                            style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important";
                            carouselComponent.attr("style", style);
                        });
                    }
                    if (carouselComponent.next().length && carouselComponent.next().prop('class').indexOf('viamagus_header') != -1) {
                        var style = "";
                        if (carouselComponent.next().attr("style")) {
                            style = carouselComponent.next().attr("style");
                        }
                        style = style /* + "margin-top:-" + $('.viamagus_header').height() + "px !important;margin-bottom:"+ $('.viamagus_header').height() + "px"*/ ;
                        carouselComponent.next().attr("style", style);
                        $('.viamagus_header .brand').find('img').load(function() {
                            carouselComponent.css({
                                position: 'relative'
                            });
                            carouselComponent.next().attr("style", style);
                        });
                    }
                    //that.registerWindowScrollEventForCoverWebsites();
                } else {
                    var sitebuildercarouselcomponent;
                    if ($(e).parent().hasClass('viamagus-component-content')) {
                        sitebuildercarouselcomponent = $(e).parent().parent().parent();
                    } else {
                        sitebuildercarouselcomponent = $(e).parent();
                    }
                    if (sitebuildercarouselcomponent.parent().prev().find(".viamagus_header").length && sitebuildercarouselcomponent.parent().prev().find(".viamagus_header").prop('class').indexOf('viamagus_header') != -1) {
                        sitebuildercarouselcomponent.css({
                            position: 'relative'
                        });
                        var style = sitebuildercarouselcomponent.attr("style");
                        style = style + "margin-top:-" + $('.viamagus_header').height() + "px !important;";
                        sitebuildercarouselcomponent.attr("style", style);
                    }
                }
            }
        });
    },
    _customizeViamagusButtonClickEvent: function() {
        $('.viamagus-cart-button a.btn').click(function(e) {
            var pageName = "home.html";
            var urlContent = document.URL.split('/');
            for (var i in urlContent) {
                if (urlContent[i].search('.html') != -1 && urlContent[i].indexOf('#') == -1) {
                    pageName = urlContent[i];
                }
                if (urlContent[i].search('.html') != -1 && urlContent[i].indexOf('#') != -1) {
                    pageName = urlContent[i].split('#')[0];
                }
            }
            var href = $(this).attr("href");
            if (href.indexOf('#') != -1) {
                var urlComponentId = href.split('#');
                if (pageName == urlComponentId[0] || urlComponentId[0] == "") {
                    e.preventDefault();
                    var offset = $('#' + urlComponentId[1]).offset().top;
                    if ($('.viamagus_header').css('position') == 'fixed') {
                        offset = offset - $('.viamagus_header').height();
                    } else if ($(".viamagus_landimg").first().attr('data-bkg-as-cover') == 'true') {
                        offset = offset - $('.viamagus_header').height();
                    }
                    $('html, body').animate({
                        scrollTop: offset
                    }, 1000, 'swing', null);
                }
            }
        });
        $('.viamagus-image-text a.btn').click(function(e) {
            var pageName = "home.html";
            var urlContent = document.URL.split('/');
            for (var i in urlContent) {
                if (urlContent[i].search('.html') != -1 && urlContent[i].indexOf('#') == -1) {
                    pageName = urlContent[i];
                }
                if (urlContent[i].search('.html') != -1 && urlContent[i].indexOf('#') != -1) {
                    pageName = urlContent[i].split('#')[0];
                }
            }
            var href = $(this).attr("href");
            if (href.indexOf('#') != -1) {
                var urlComponentId = href.split('#');
                if (pageName == urlComponentId[0] || urlComponentId[0] == "") {
                    e.preventDefault();
                    var offset = $('#' + urlComponentId[1]).offset().top;
                    if ($('.viamagus_header').css('position') == 'fixed') {
                        offset = offset - $('.viamagus_header').height();
                    }
                    $('html, body').animate({
                        scrollTop: offset
                    }, 1000, 'swing', null);
                }
            }
        });
    },
    _enableCollapsableSections: function() {
        if ($(".viamagus-collapse-icon").length > 0) {
            $('.viamagus-collapse-icon').unbind();
            $('.viamagus-collapse-icon').click(function(e) {
                e.preventDefault();
                var collapseSectionId = $(this).attr("data-collapse-section");
                if ($('#' + collapseSectionId).is(':visible')) {
                    $(this).html('<i class="fa fa-plus"></i>');
                } else {
                    $(this).html('<i class="fa fa-minus"></i>');
                }
                $('#' + collapseSectionId).toggle('slow');
            });
        }
    },
    getInternetExplorerVersion: function() {
        var ver = -1; // Return value assumes failure.
        var msg = "You're not using Internet Explorer.";
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                ver = parseFloat(RegExp.$1);
                if (ver > -1) {
                    if (ver <= 8.0) {
                        msg = "Please upgrade your copy of Internet Explorer.";
                        alert(msg);
                    }
                }
            }
        }
        return rv;
    },
    _setFooterAsSticky: function() {
        if ($('.viamagus_footer').length && $('.viamagus_footer').is(':visible')) {
            var footerOffsetTop = $('.viamagus_footer').offset().top;
            var footerHeight = $('.viamagus_footer').height()
            var windowHeight = $(window).outerHeight();
            if (footerOffsetTop < (windowHeight - footerHeight)) {
                //$('.viamagus_footer').attr('style','position:fixed;bottom:0;z-index:1010;width:100%;');	  
            }
        }
    },
    _initSocialSharePlugin: function() {
        if ($(".vm-blog").length) {
            Viamagus_Blog_Share.init();
        }
    },
    initElevateZoomImageZoomerPlugin: function() {
        if ($('#vm-product-image-gallery').length) {
            var zoomType = 'window';
            if ($(window).outerWidth() < 800) {
                zoomType = 'lens';
            }
            $("#vm-product-primary-image").elevateZoom({
                gallery: 'vm-product-image-gallery',
                galleryActiveClass: 'active',
                cursor: 'pointer',
                zoomType: zoomType
            });
            $("#vm-product-primary-image").bind("click", function(e) {
                var ez = $('#vm-product-primary-image').data('elevateZoom');
                $.fancybox(ez.getGalleryList());
                return false;
            });
            $('#vm-product-slider').Thumbelina({
                $bwdBut: $('#vm-product-slider .left'), // Selector to left button.
                $fwdBut: $('#vm-product-slider .right') // Selector to right button.
            });
        }
    },
    _initAudioPlugin: function() {
        if ($('.viamagus-audio-gallery').length) {
            var audioLength = $('.viamagus-audio-gallery .span4').width();
            audiojs.events.ready(function() {
                audiojs.createAll();
            });
            $('head').append('<style>.audiojs .scrubber { width:' + (audioLength - 165) + 'px !important;} .audiojs {width:' + audioLength + 'px !important;}</style>');
        }
    },
    _setHeroImageAspectRatioOnOrientationChange: function() {
        if ($(".viamagus_landimg").length) {
            $(".viamagus_landimg").each(function(index, e) {
                if ($(e).attr("data-img-uri") != "") {
                    if ($(window).outerWidth() > 800) {
                        $(e).backstretch($(e).attr("data-img-uri"));
                    }
                }
                if ($(e).attr("data-portrait-img-uri") != "") {
                    if ($(window).outerWidth() < $(window).outerHeight() && $(window).outerWidth() < 800) {
                        $(e).backstretch($(e).attr("data-portrait-img-uri"));
                    }
                }
            });
        }
        if ($(".viamagus_txt-slide").length) {
            if ($(".viamagus_txt-slide").attr("data-bkg-img") != "") {
                if ($(window).outerWidth() < 800) {
                    $(".viamagus_txt-slide").children("#magus-carousel").backstretch($(".viamagus_txt-slide").attr("data-bkg-img"));
                }
            }
        }
    },
    registerShowDirections: function() {
        var that = this;
        if ($('#showDirections').length) {
            $('#showDirections').click(function(e) {
                e.preventDefault();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var userLocationLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        that.showDirections(userLocationLatLng);
                    }, function(error) {
                        //debugger;
                        //alert(error);
                    }, {
                        timeout: 5000
                    });
                }
            });
        }
    },
    showDirections: function(userLocationLatLng) {
        var mp_marker_url = "https://525d77366d43949fbb11-4ff276156f69726ae3b8de874c89dd19.ssl.cf1.rackcdn.com/1427213263075pointer.png";
        var mp_marker_w = 75;
        var mp_marker_h = 103;
        var mp_marker_title = "M";
        var marker = new google.maps.MarkerImage(mp_marker_url, new google.maps.Size(mp_marker_w, mp_marker_h), new google.maps.Point(0, 0));
        var latLng = new google.maps.LatLng(12.969431, 77.600845);
        var latLngJson = $('#latLng').html();
        if (latLngJson != "") {
            latLng = JSON.parse(latLngJson);
            var newArray = [];
            for (var key in latLng) {
                newArray.push(key);
            }
            latLng = new google.maps.LatLng(latLng[newArray[0]], latLng[newArray[1]]);
        }
        var location1 = latLng;
        var location2 = userLocationLatLng;
        // center of the map (compute the mean value between the two locations)
        latlng = new google.maps.LatLng(
            (location1.lat() + location2.lat()) / 2,
            (location1.lng() + location2.lng()) / 2);
        // set map options
        // set zoom level
        // set center
        // map type
        var mapOptions = {
            zoom: 12,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapMaker: true
        };
        // create a new map object
        // set the div id where it will be shown
        // set the map options
        map = new google.maps.Map(document.getElementById("map-container"), mapOptions);
        var h = $(window).height(),
            abc = 160; // Calculate the top offset
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            suppressInfoWindows: true
        });
        directionsDisplay.setMap(map);
        var request = {
            origin: location1,
            destination: location2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                distance = "The aproximative distance to the store from your current location is: " + response.routes[0].legs[0].distance.text;
                /* distance += "<br/>The approximate distance to the  driving time is: "
                		+ response.routes[0].legs[0].duration.text; */
                document.getElementById("distance_road").innerHTML = distance;
            }
        });
        // create the markers for the two locations		
        var marker1 = new google.maps.Marker({
            map: map,
            position: location1,
            title: "Store location",
            icon: marker
        });
        var marker2 = new google.maps.Marker({
            map: map,
            position: location2,
            title: "My location"
        });
        // create the text to be shown in the infowindows
        var text1 = '<div id="content">' + '<h1 id="firstHeading">Store location</h1>' + '</div>';
        var text2 = '<div id="content">' + '<h1 id="firstHeading">My location</h1>' + '</div>';
        // create info boxes for the two markers
        var infowindow1 = new google.maps.InfoWindow({
            content: text1
        });
        var infowindow2 = new google.maps.InfoWindow({
            content: text2
        });
        // add action events so the info windows will be shown when the marker is clicked
        google.maps.event.addListener(marker1, 'click', function() {
            infowindow1.open(map, marker1);
        });
        google.maps.event.addListener(marker2, 'click', function() {
            infowindow2.open(map, marker1);
        });
    },
    _checkCloudflareSecurity: function() {
        $.ajax({
            url: 'https://viamagus.net/REST/general/loadWebsiteUpdate/',
            type: 'POST',
            data: {
                format: 'json'
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data, textStatus, xhr) {
            //console.log("STATUS: "+xhr);
            console.log("STATUS: " + xhr.status);
        }).fail(function(data, textStatus, xhr) {
            //This shows status code eg. 403
            console.log("error", data.status);
            //This shows status message eg. Forbidden
            console.log("STATUS: " + xhr.status);
        });
    }
}
//register orientation change event outside
$(window).on("orientationchange", function() {
    Viamagus_Website_Loader._init();
    Viamagus_Website_Loader._setHeroImageAspectRatioOnOrientationChange();
});
var Viamagus_Form_Loader = {
    isAllEmailAddressAreValid: true,
    _contextPath: '',
    _productQtyInfo: [],
    _init: function() {
        var that = this;
        if ($('.viamagus-custom-form').length) {
            that._loadCustomForms();
            that._initDatePicker();
            that._additionalValidations();
            that._initRatings();
            that._initGoogleMap();
            that._initGoogleDistanceCalculator();
            that._initAddressCountryStateCityLoad();
        }
        that._initPhonePlugin();
        that._initEmailOTPGenerateEvents();
        that._initCombobox();
        this._initPaymentForm();
    },
    _ipInfoResult: null,
    _loadCustomForms: function() {
        var that = this;
        if ($('.viamagus-custom-form').length) {
            $('.viamagus-custom-form').each(function(index, e) {
                var customformId = $(e).attr('id');
                var index = customformId.lastIndexOf('-');
                var formId = customformId.substring(index + 1, customformId.length);
                var url = that._contextPath + '/REST/formbuilder/loadCustomFormMetadata';
                $.ajax({
                    url: url,
                    data: {
                        formId: formId
                    },
                    dataType: 'jsonp',
                    jsonp: 'jsonCallback'
                }).done(function(data) {
                    that._initCustomFormFileUpload(data.result.tenantId);
                    if (data.result) {
                        var formMetaData = data.result;
                        $('#' + customformId).unbind();
                        Viamagus_Form_Loader._validate(customformId, formMetaData);
                        $('#' + customformId).submit(function(event) {
                            event.preventDefault();
                            var validator = $('#' + customformId).validate();
                            if ($('#' + customformId).valid()) {
                                if (data.result.isPaymentRequired == 'Y' && data.result.allowCustomPayment == 'N' && !that._validateProductDetails()) {
                                    return false;
                                }
                                Viamagus_Form_Loader._submitFormAfterValidation(formId, formMetaData);
                            }
                        });
                        if (data.result.isPaymentRequired == 'Y' && data.result.allowCustomPayment == 'N') {
                            that._registerProductCalculataionEvent(formId, data.result.baseCurrency);
                        } else {
                            that._loadCustomPaymentCurrencyList();
                        }
                    }
                }).fail(function() {});
            });
        }
    },
    _saveCustomFormValues: function(formId, customFormJSON, formType, formData, crmName, crmEmailId, crmPhoneNo, allowCustomPayment, paymentAmount, customPaymentProductInfo, formPaymentCurrency, crmAddress) {
        var that = this;
        var isPaymentRequired = formData.isPaymentRequired;
        var productJSON = "";
        if (isPaymentRequired == 'Y') {
            productJSON = that._buildProductJSON();
        }
        var html = '<img id="loaderImageForSubmit" width="60px" height="60px"';
        html = html + ' src="/static/sitebuilder/img/loading.gif">'
        $('#viamagus-form-' + formId).find('#Submit').parent().append(html);
        $('#viamagus-form-' + formId).find('#Submit').text('Submitting....');
        $('#viamagus-form-' + formId).find('#loaderImageForSubmit').show();
        var forwardToCustomUrl = formData.forwardToCusotmUrl;
        var that = this;
        var successMsg = formData.ackMsg;
        if (successMsg == null || successMsg == '') {
            successMsg = 'Thank you!';
        }
        var reqOptions = {
            url: that._contextPath + '/REST/formbuilder/saveCustomFormValues',
            data: {
                format: 'json',
                type: 'POST',
                formId: formId,
                formJson: encodeURIComponent(customFormJSON),
                formType: formType,
                productJSON: productJSON,
                websiteUrl: window.location.href,
                isPaymentRequired: isPaymentRequired,
                isCustomPayment: allowCustomPayment,
                paymentAmount: paymentAmount,
                paymentCurrency: formPaymentCurrency
            },
            callback: function(data, formSubmitLogId) {
                if (forwardToCustomUrl != "" && forwardToCustomUrl != null) {
                    window.location.href = forwardToCustomUrl;
                } else if (isPaymentRequired == 'Y') {
                    $('#loaderImageForSubmit').remove();
                    $('#viamagus-form-' + formId).find('#Submit').text('Submit');
                    var url = that._contextPath + "/paymentCapture.html";
                    var discountCode = '';
                    var discountAmount = '';
                    var productName = 'Custom Payment';
                    var paymentCurrency = 'INR';
                    if (allowCustomPayment == 'N') {
                        discountCode = JSON.parse(productJSON).discountCode;
                        discountAmount = JSON.parse(productJSON).discountAmount;
                        productName = JSON.parse(productJSON).prodcutName;
                    } else {
                        productName = customPaymentProductInfo;
                    }
                    if (formPaymentCurrency != '') {
                        paymentCurrency = formPaymentCurrency;
                    }
                    that.submitToUrl(url, {
                        isPaymentReqd: "Y",
                        productName: productName,
                        productAmount: paymentAmount,
                        isProductEditable: false,
                        isPriceEditable: false,
                        customerName: crmName,
                        customerEmail: crmEmailId,
                        customerPhoneNo: crmPhoneNo,
                        entityType: 'Form',
                        entityId: formSubmitLogId,
                        discountCode: discountCode,
                        discountAmount: discountAmount,
                        paymentCurrency: paymentCurrency,
                        addressLineOne: crmAddress.addressLineOne,
                        addressLineTwo: crmAddress.addressLineTwo,
                        city: crmAddress.city,
                        state: crmAddress.state,
                        country: crmAddress.country,
                        pincode: crmAddress.pincode
                    });
                } else {
                    $('#loaderImageForSubmit').remove();
                    $('#viamagus-form-' + formId).find('#Submit').text('Submit');
                    if ($('#showAckModal').length != 0) {
                        $('body').remove('#showAckModal');
                    }
                    var modalHtml = '<div class="modal hide fade" id ="showAckModal">';
                    modalHtml = modalHtml + '<div class="modal-header" style="min-height:100px;padding:15px 20px; border:0px;">';
                    modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
                    modalHtml = modalHtml + '<h3 style="padding:25px 20px;font-size:20px;">' + successMsg + '</h3>';
                    modalHtml = modalHtml + '</div>';
                    modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="background-color: #2167FF;color:white;opacity:1;padding: 5px 10px;font-size: 14px;margin:20px;">OK</button>';
                    modalHtml = modalHtml + '</div>';
                    $('body').append(modalHtml);
                    $('#showAckModal').modal('show');
                    Viamagus_Form_Loader._resetFormValues(formData);
                }
            },
            errorCallBack: function() {
                $('#loaderImageForSubmit').remove();
                $('#viamagus-form-' + formId).find('#Submit').text('Submit');
                if ($('#showAckModal').length != 0) {
                    $('body').remove('#showAckModal');
                }
                var modalHtml = '<div class="modal hide fade" id ="showAckModal">';
                modalHtml = modalHtml + '<div class="modal-header" style="min-height:100px;padding:15px 20px; border:0px;">';
                modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
                modalHtml = modalHtml + '<h3 style="padding:25px 20px;font-size:20px;"> Transaction Failed: Please contact support.</h3>';
                modalHtml = modalHtml + '</div>';
                modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="background-color: #2167FF;color:white;opacity:1;padding: 5px 10px;font-size: 14px;margin:20px;">OK</button>';
                modalHtml = modalHtml + '</div>';
                if (!$('#alert-message').length) {
                    $('body').append(modalHtml);
                    $('#showAckModal').modal('show');
                }
            },
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    _initDatePicker: function() {
        var that = this;
        $('.viamagus-date-picker').each(function() {
            var dateobj = $(this).pickmeup({
                position: 'bottom',
                hide_on_select: true,
                view: 'years',
                calendars: 1,
                format: 'd-b-Y',
                minDate: 0,
                change: function(e) {
                    console.log("date changed");
                    $(this).trigger('blur');
                }
            });
        });
        $('.viamagus-date-picker-icon').click(function(e) {
            e.preventDefault();
            var id = $(this).attr("data-date-picker");
            $('#' + id).trigger('click');
        });
    },
    _validate: function(id, formData) {
        var that = this;
        var json = '{';
        var newJson = {};
        var formMetaData = formData.metadataDetailsList;
        for (var i = 0; i < formMetaData.length; i++) {
            var fieldType = formMetaData[i].fieldType;
            var fieldLabel = formMetaData[i].fieldLabel;
            var fieldId = formMetaData[i].fieldId;
            var formType = formMetaData[i].formType;
            var isRequired = formMetaData[i].isRequired;
            var dataValidate = '';
            if ($('#' + fieldId).attr('data-validate')) {
                dataValidate = $('#' + fieldId).attr('data-validate');
            }
            switch (dataValidate) {
            case "number":
                var addJson = {};
                addJson[dataValidate] = true;
                if (isRequired == 'Y') {
                    addJson['required'] = true;
                }
                newJson["" + fieldId] = addJson;
                break;
            case "email":
                var addJson = {};
                addJson[dataValidate] = true;
                if (isRequired == 'Y') {
                    addJson['required'] = true;
                }
                newJson["" + fieldId] = addJson;
                break;
            case "alpha":
                var addJson = {};
                addJson[dataValidate] = true;
                if (isRequired == 'Y') {
                    addJson['required'] = true;
                }
                newJson["" + fieldId] = addJson;
                break;
            case "alphanumeric":
                var addJson = {};
                addJson[dataValidate] = true;
                if (isRequired == 'Y') {
                    addJson['required'] = true;
                }
                newJson["" + fieldId] = addJson;
                break;
            case "date":
                var addJson = {};
                addJson[dataValidate] = true;
                if (isRequired == 'Y') {
                    addJson['required'] = true;
                }
                newJson["" + fieldId] = addJson;
                break;
            case "text":
                var addJson = {};
                if (isRequired == 'Y') {
                    addJson['required'] = true;
                    newJson["" + fieldId] = addJson;
                }
                break;
            default:
                if (isRequired == 'Y') {
                    var addJson = {};
                    addJson['required'] = true;
                    newJson["" + fieldId] = addJson;
                }
                break;
            }
        }
        $('#' + id).validate({
            rules: newJson,
            highlight: function(element, errorClass) {
                if ($(element).attr("type") == 'checkbox') {
                    $(element).parent().find('label').css('color', 'red');
                    var id = $(element).parent().find('label').attr('id');
                    var html = $(element).parent().find('label');
                    newhtml = (html).wrap('<div></div>').parent().html();
                    $('#' + id).remove();
                    $(element).parent().parent().append(newhtml);
                } else if ($(element).hasClass("viamagus-combobox")) {
                    var labelId = $(element).parent().find('label').attr('id');
                    var html = $(element).parent().find('label').css('color', 'red');
                    newhtml = (html).wrap('<div></div>').parent().html();
                    $('#' + labelId).remove();
                    $(element).css("border", "1px solid red");
                    $(newhtml).insertAfter($(element).parent());
                } else if ($(element).hasClass("viamagus-date-picker")) {
                    $(element).css("border", "1px solid red");
                    $(element).parent().find('label').css('color', 'red');
                    var id = $(element).parent().find('label').attr('id');
                    var html = $(element).parent().find('label');
                    newhtml = (html).wrap('<div></div>').parent().html();
                    $('#' + id).remove();
                    $(element).parent().parent().append(newhtml);
                } else {
                    $(element).css("border", "1px solid red");
                    $(element).parent().find('label').css('color', 'red');
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).css("border", "1px solid #ccc");
            }
        });
    },
    _additionalValidations: function() {
        jQuery.validator.addMethod("alphanumeric", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9 ]*$/.test(value);
        }, "Please enter alpha numeric characters");
        jQuery.validator.addMethod("alpha", function(value, element) {
            return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
        }, "Please enter only alphabets characters");
        jQuery.validator.addMethod("decimal", function(value, element) {
            return this.optional(element) || /^[0-9]+(\.[0-9])?$/.test(value);
        }, "Please enter only decimal numbers");
    },
    _submitFormAfterValidation: function(formId, formData) {
        var that = this;
        var jsonString = '{ "formJson":  { "customValues": [';
        var isRequired = 'N';
        var isFileUploadRequired = false;
        var isValidPhoneNo = true;
        var isValidEmail = true;
        var isValidSrcDstSelected = true;
        var isValidCheckBox = true;
        var formType = '';
        var formMetaData = formData.metadataDetailsList;
        var crmEmailId = '';
        var crmName = '';
        var crmPhoneNo = '';
        var crmAddress = {
            addressLineOne: '',
            addressLineTwo: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        };
        var allowCustomPayment = "N";
        var paymentAmount = 0;
        var customPaymentProductInfo = "";
        var paymentCurrency = "INR";
        for (var i = 0; i < formMetaData.length; i++) {
            var fieldType = formMetaData[i].fieldType;
            var fieldLabel = formMetaData[i].fieldLabel;
            var fieldId = formMetaData[i].fieldId;
            var metaDataId = formMetaData[i].metaDataId;
            var isCrmField = formMetaData[i].isCrmField;
            var crmFieldType = formMetaData[i].crmFieldType;
            formType = formMetaData[i].formType;
            var fieldValue = '';
            var ratings = '';
            var isRequired = 'N';
            jsonString = jsonString + '{"fieldType": "' + fieldType + '","fieldLabel": "' + fieldLabel + '",';
            switch (fieldType) {
            case "textinput":
                fieldValue = $('#' + fieldId).val();
                break;
            case "googleMap":
                 fieldValue = $('#' + fieldId+"_Map_Location").val();
                break;
            case "address":
                fieldValue = $('#' + fieldId).val();
                if (isCrmField == 'Y' && crmFieldType == 'addresslineone') {
                    crmAddress.addressLineOne = fieldValue;
                }
                if (isCrmField == 'Y' && crmFieldType == 'addresslinetwo') {
                    crmAddress.addressLineTwo = fieldValue;
                }
                if (isCrmField == 'Y' && crmFieldType == 'city') {
                    crmAddress.city = $('#' + fieldId).val();
                }
                if (isCrmField == 'Y' && crmFieldType == 'state') {
                    var option = $('#' + fieldId).find("option:selected");
                    crmAddress.state = option.text();
                }
                if (isCrmField == 'Y' && crmFieldType == 'country') {
                    var option = $('#' + fieldId).find("option:selected");
                    crmAddress.country = option.text();
                }
                if (isCrmField == 'Y' && crmFieldType == 'pincode') {
                    crmAddress.pincode = fieldValue;
                }
                break;
            case "email":
                fieldValue = $('#' + fieldId).val();
                if (isCrmField == 'Y' && crmFieldType == 'email') {
                    crmEmailId = fieldValue;
                }
                if ($('#' + fieldId).attr("data-capture-otp") == "true") {
                    $('#valid-msg-' + fieldId).addClass("hide");
                    var otpField = $('#' + fieldId + '-email-otp');
                    if (otpField.val() == "" || otpField.attr("data-otp-validation-status") == "failed") {
                        $('#' + fieldId + '-email-otp-generate-required').show();
                        isValidEmail = false;
                    } else {
                        $('#' + fieldId + '-email-otp-generate-required').hide();
                        isValidEmail = true;
                    }
                }
                break;
            case "name":
                fieldValue = $('#' + fieldId).val();
                if (isCrmField == 'Y' && crmFieldType == 'name') {
                    crmName = fieldValue;
                }
                break;
            case "phone":
                fieldValue = $('#' + fieldId).val();
                if (formMetaData[i].isRequired == 'Y' && (fieldValue != "")) {
                    var phoneNo = $('#' + fieldId).val();
                    var phoneNoObj = $('#' + fieldId);
                    if (phoneNoObj.intlTelInput("isValidNumber")) {
                        $('#valid-msg-' + fieldId).removeClass("hide");
                        $('#error-msg-' + fieldId).addClass("hide");
                        isValidPhoneNo = true;
                    } else {
                        isValidPhoneNo = false;
                        $('#error-msg-' + fieldId).removeClass("hide");
                        $('#valid-msg-' + fieldId).addClass("hide");
                        phoneNoObj.focus();
                    }
                }
                if (formMetaData[i].isRequired == 'Y' && (fieldValue == "")) {
                    isValidPhoneNo = false;
                    $('#' + fieldId).focus();
                    $('#error-msg-' + fieldId).removeClass("hide");
                    $('#valid-msg-' + fieldId).addClass("hide");
                }
                if (isCrmField == 'Y' && crmFieldType == 'phone') {
                    crmPhoneNo = fieldValue;
                }
                if ($('#' + fieldId).attr("data-capture-otp") == "true") {
                    $('#valid-msg-' + fieldId).addClass("hide");
                    var otpField = $('#' + fieldId + '-otp');
                    if (otpField.val() == "" || otpField.attr("data-otp-validation-status") == "failed") {
                        $('#' + fieldId + '-otp-generate-required').show();
                        isValidPhoneNo = false;
                    } else {
                        $('#' + fieldId + '-otp-generate-required').hide();
                        isValidPhoneNo = true;
                    }
                }
                break;
            case "passwordinput":
                fieldValue = $('#' + fieldId).val();
                break;
            case "prependedtext":
                fieldValue = $('#' + fieldId).val();
                break;
            case "appendedtext":
                fieldValue = $('#' + fieldId).val();
                break;
            case "textarea":
                fieldValue = $('#' + fieldId).val();
                break;
            case "date":
                fieldValue = $('#' + fieldId).val();
                break;
            case "ratings":
                fieldValue = $('#' + fieldId).attr('data-score');
                isRequired = formMetaData[i].isRequired;
                if (fieldValue) {
                    ratings = fieldValue;
                } else {
                    ratings = 0;
                    fieldValue = 0;
                }
                break;
            case "filebutton":
                fieldValue = $('#' + fieldId).attr('data-file-name');
                if (formMetaData[i].isRequired == 'Y' && (fieldValue == "" || fieldValue == null)) {
                    isFileUploadRequired = true;
                }
                ;break;
            case "selectbasic":
                fieldValue = $('#' + fieldId).val();
                break;
            case "selectcombo":
                fieldValue = $('#' + fieldId).val();
                break;
            case "googlemap":
                fieldValue = "https://maps.google.com/?q=" + $('#' + fieldId).attr("data-geo-lat") + "," + $('#' + fieldId).attr("data-geo-lng") + " ";
                break;
            case "googledistancecalculator":
                if ($('#' + fieldId + '_Source').attr("data-geo-lat") != "" && $('#' + fieldId + '_Destination').attr("data-geo-lat") != "") {
                    var src = $('#' + fieldId + '_Source').attr("data-geo-lat") + "," + $('#' + fieldId + '_Source').attr("data-geo-lng");
                    var dst = $('#' + fieldId + '_Destination').attr("data-geo-lat") + "," + $('#' + fieldId + '_Destination').attr("data-geo-lng");
                    fieldValue = "https://maps.google.com/maps?saddr=" + src + "&daddr=" + dst;
                } else {
                    fieldValue = "";
                }
                if (typeof ($('#' + fieldId + '_Source').attr("required")) != 'undefined') {
                    if (fieldValue == "") {
                        $('#' + fieldId + '_Error_Msg').show();
                        isValidSrcDstSelected = false;
                    } else {
                        $('#' + fieldId + '_Error_Msg').hide();
                        isValidSrcDstSelected = true;
                    }
                }
                break;
            case "selectmultiple":
                var val = '';
                $('#' + fieldId + ' option:selected').each(function() {
                    val = val + $(this).val();
                    val = val + ",";
                });
                if (val.length > 0)
                    fieldValue = val.substr(0, val.length - 1);
                break;
            case "multipleradios":
                var val = '';
                $('input[name=' + fieldId + ']').each(function() {
                    if ($(this).is(":checked")) {
                        val = val + $(this).val();
                        val = val + ",";
                    }
                });
                if (val.length > 0)
                    fieldValue = val.substr(0, val.length - 1);
                break;
            case "multipleradiosinline":
                var val = '';
                $('input[name=' + fieldId + ']').each(function() {
                    if ($(this).is(":checked")) {
                        val = val + $(this).val();
                        val = val + ",";
                    }
                });
                if (val.length > 0)
                    fieldValue = val.substr(0, val.length - 1);
                break;
            case "multiplecheckbox":
                var val = '';
                var minChkReqd = 0;
                var maxChkReqd = 0;
                var totalChk = 0;
                $('input[name=' + fieldId + ']').each(function() {
                    minChkReqd = $(this).attr("data-min-chk-reqd");
                    maxChkReqd = $(this).attr("data-max-chk-reqd");
                    if ($(this).is(":checked")) {
                        totalChk = totalChk + 1;
                        val = val + $(this).val();
                        val = val + ",";
                    }
                });
                if (minChkReqd > 0) {
                    if (totalChk < minChkReqd) {
                        $('#min-chk-error-msg-' + fieldId).show();
                        isValidCheckBox = false;
                        $('input[name=' + fieldId + ']')[0].focus();
                    } else {
                        $('#min-chk-error-msg-' + fieldId).hide();
                    }
                }
                if (maxChkReqd > 0) {
                    if (totalChk > maxChkReqd) {
                        $('#max-chk-error-msg-' + fieldId).show();
                        isValidCheckBox = false;
                        $('input[name=' + fieldId + ']')[0].focus();
                    } else {
                        $('#max-chk-error-msg-' + fieldId).hide();
                    }
                }
                if (val.length > 0)
                    fieldValue = val.substr(0, val.length - 1);
                break;
            case "multiplecheckboxinline":
                var val = '';
                var minChkReqd = 0;
                var maxChkReqd = 0;
                var totalChk = 0;
                $('input[name=' + fieldId + ']').each(function() {
                    minChkReqd = $(this).attr("data-min-chk-reqd");
                    maxChkReqd = $(this).attr("data-max-chk-reqd");
                    if ($(this).is(":checked")) {
                        totalChk = totalChk + 1;
                        val = val + $(this).val();
                        val = val + ","
                    }
                });
                if (minChkReqd > 0) {
                    if (totalChk < minChkReqd) {
                        $('#min-chk-error-msg-' + fieldId).show();
                        isValidCheckBox = false;
                        $('input[name=' + fieldId + ']')[0].focus();
                    } else {
                        $('#min-chk-error-msg-' + fieldId).hide();
                    }
                }
                if (maxChkReqd > 0) {
                    if (totalChk > maxChkReqd) {
                        $('#max-chk-error-msg-' + fieldId).show();
                        isValidCheckBox = false;
                        $('input[name=' + fieldId + ']')[0].focus();
                    } else {
                        $('#max-chk-error-msg-' + fieldId).hide();
                    }
                }
                if (val.length > 0)
                    fieldValue = val.substr(0, val.length - 1);
                break;
            case "productList":
                if (fieldLabel == 'Product Payment Amount') {
                    fieldValue = $('#totalAmountToPay').html() + " INR";
                    if (formData.allowCustomPayment == 'N') {
                        paymentAmount = $('#totalAmountToPay').attr("data-total-amount");
                    }
                } else {
                    fieldValue = "";
                }
                if (Viamagus_Currency_Manager.txnCurrency != '') {
                    if (formData.allowCustomPayment == 'N') {
                        paymentCurrency = Viamagus_Currency_Manager.txnCurrency;
                        paymentAmount = $('#totalAmountToPay').attr("data-total-amount-in-txn-cur");
                    }
                    fieldValue = $('#totalAmountToPay').html() + " " + paymentCurrency;
                }
                break;
            case "custompayment":
                fieldValue = $('#' + fieldId).val() + ' ' + $('#' + fieldId + '-currency option:selected').val();
                allowCustomPayment = "Y";
                paymentCurrency = $('#' + fieldId + '-currency option:selected').val();
                customPaymentProductInfo = $('#' + fieldId).attr("data-product-info");
                paymentAmount = $('#' + fieldId).val();
                break;
            }
            jsonString = jsonString + '"fieldValue": "' + fieldValue + '",';
            jsonString = jsonString + '"isCrmField": "' + isCrmField + '",';
            jsonString = jsonString + '"crmFieldType": "' + crmFieldType + '",';
            jsonString = jsonString + '"metaDataId": "' + metaDataId + '"';
            jsonString = jsonString + '},';
        }
        jsonString = jsonString + ']}}';
        if (ratings == 0 && isRequired == 'Y') {
            alert("Rating is required.");
            return;
        }
        if (!isValidPhoneNo || !isValidCheckBox || !isValidSrcDstSelected || !isValidEmail) {
            return;
        }
        if (!that.isAllEmailAddressAreValid) {
            alert("Please enter a valid email Id.");
            return;
        }
        if (isFileUploadRequired) {
            alert("Please choose a file to upload.");
            return;
        }
        if (!that.invokeCustomFormValidation()) {
            return;
        }
        if (formData.isAutoReplyMsgReqd != "" && formData.isAutoReplyMsgReqd != null && formData.isAutoReplyMsgReqd != 'undefined' && formData.isAutoReplyMsgReqd == 'Y') {
            if ($('#showConfirmModal').length > 0) {
                $('#showConfirmModal').remove();
            }
            var modalHtml = '<div class="modal hide fade" id ="showConfirmModal">';
            modalHtml = modalHtml + '<div class="modal-header" style="min-height:100px;padding:15px 20px; border:0px;">';
            modalHtml = modalHtml + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            modalHtml = modalHtml + '<h3 style="padding:25px 20px;font-size:20px;">' + formData.autoReplyConfirmatonMessage.replace('{{vm.subscriber_email}}', crmEmailId) + '</h3>';
            modalHtml = modalHtml + '</div>';
            modalHtml = modalHtml + '<div class="pull-right"><button type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true" style="background-color: #2167FF;color:white;opacity:1;padding: 5px 10px;font-size: 14px;margin:10px;">Cancel</button>';
            modalHtml = modalHtml + '<button type="button" class="btn btn-success" id="confirm" data-dismiss="modal" aria-hidden="true" style="color:white;opacity:1;padding: 5px 10px;font-size: 14px;margin:10px;">Confirm</button>';
            modalHtml = modalHtml + '</div></div>';
            $('body').append(modalHtml);
            $('#showConfirmModal').modal('show');
            $('#showConfirmModal #confirm').unbind();
            $('#showConfirmModal #confirm').click(function(e) {
                e.preventDefault();
                Viamagus_Form_Loader._saveCustomFormValues(formId, jsonString, formType, formData, crmName, crmEmailId, crmPhoneNo, allowCustomPayment, paymentAmount, customPaymentProductInfo, paymentCurrency, crmAddress);
            });
        } else {
            Viamagus_Form_Loader._saveCustomFormValues(formId, jsonString, formType, formData, crmName, crmEmailId, crmPhoneNo, allowCustomPayment, paymentAmount, customPaymentProductInfo, paymentCurrency, crmAddress);
        }
    },
    _initRatings: function() {
        $('.viamagus-star-rating').each(function() {
            var stars = $(this).attr("data-number");
            $(this).raty({
                number: stars,
                click: function(score, evt) {
                    $(this).attr('data-score', score);
                },
                hints: []
            });
        });
    },
    _initCustomFormFileUpload: function(tenantId) {
        var that = this;
        if ($('.viamagus-file-upload').length) {
            $.ajax({
                type: 'POST',
                url: '/cdnupload/json/initContainerForCustomFormFileUpload.action',
                data: {
                    tenantId: tenantId
                },
                success: function(data) {
                    that.initDropzoneForAjaxFileUpload(data.transactionRefNo);
                }
            });
        }
    },
    initDropzoneForAjaxFileUpload: function(transactionId) {
        $('.viamagus-file-upload').each(function(index, e) {
            var fileuploadId = "#" + $(e).attr("id");
            var myDropzone = new Dropzone(fileuploadId,{
                autoProcessQueue: true,
                paramName: 'upload',
                uploadMultiple: false,
                maxFilesize: 5,
                maxFiles: 1,
                accept: function(file, done) {
                    debugger ;$(fileuploadId).attr("data-file-name", transactionId + "-" + file.name.replace(/[^a-zA-Z0-9.]/g, ''));
                    $('#Submit').attr("disabled", "disabled");
                    done();
                },
                complete: function() {
                    $('#Submit').removeAttr("disabled");
                },
                url: '/cdnupload/uploadCustomFormUserFile.action?transactionId=' + transactionId,
                thumbnailWidth: "50",
                thumbnailHeight: "50",
                previewsContainer: ".file-preview",
                init: function() {
                    var myDropzone = this;
                    this.on("addedfile", function() {
                        if (this.files[1] != null) {
                            this.removeFile(this.files[0]);
                        }
                    });
                }
            });
        });
    },
    _resetFormValues: function(formData) {
        var formMetaData = formData.metadataDetailsList;
        for (var i = 0; i < formMetaData.length; i++) {
            var fieldType = formMetaData[i].fieldType;
            var fieldLabel = formMetaData[i].fieldLabel;
            var fieldId = formMetaData[i].fieldId;
            var formType = formMetaData[i].formType;
            var ratings = '';
            var isRequired = 'N';
            switch (fieldType) {
            case "name":
                $('#' + fieldId).val('');
                break;
            case "email":
                $('#' + fieldId).val('');
                if ($('#' + fieldId).attr("data-capture-otp") == "true") {
                    $('#' + fieldId + '-email-otp').val();
                    $('#' + fieldId + '-email-otp-validate-section').hide();
                    $('#' + fieldId + '-email-otp-generate-btn').text("Validate Email Id.");
                    $('#' + fieldId + '-email-otp-generate-btn').show();
                    $('#' + fieldId + '-email-otp-success-msg').hide();
                    $('#' + fieldId + '-email-otp').show();
                    $('#' + fieldId + '-email-otp').val("");
                    $('#' + fieldId).removeAttr("readonly");
                }
                break;
            case "phone":
                $('#' + fieldId).val('');
                $('#error-msg-' + fieldId).addClass("hide");
                $('#valid-msg-' + fieldId).addClass("hide");
                if ($('#' + fieldId).attr("data-capture-otp") == "true") {
                    $('#' + fieldId + '-otp').val();
                    $('#' + fieldId + '-otp-validate-section').hide();
                    $('#' + fieldId + '-otp-generate-btn').text("Validate Phone No.");
                    $('#' + fieldId + '-otp-generate-btn').show();
                    $('#' + fieldId + '-otp-success-msg').hide();
                    $('#' + fieldId + '-otp').show();
                    $('#' + fieldId + '-otp').val("");
                    $('#' + fieldId).removeAttr("readonly");
                }
                break;
            case "textinput":
                $('#' + fieldId).val('');
                break;
            case "passwordinput":
                $('#' + fieldId).val('');
                break;
            case "prependedtext":
                $('#' + fieldId).val('');
                break;
            case "appendedtext":
                $('#' + fieldId).val('');
                break;
            case "textarea":
                $('#' + fieldId).val('');
                break;
            case "googlemap":
                $('#' + fieldId).attr("data-geo-lat", "");
                $('#' + fieldId).attr("data-geo-lng", "");
                break;
            case "date":
                $('#' + fieldId).val('');
                break;
            case "ratings":
                $('#' + fieldId).attr('data-score', 0);
                break;
            case "selectcombo":
                $('#' + fieldId).val('');
                $('.viamagus-combobox').val('');
                break;
            case "selectbasic":
                $('#' + fieldId + ' option:first-child').prop('selected', true);
                break;
            case "selectmultiple":
                var val = '';
                $('#' + fieldId + ' option:first-child').prop('selected', true);
                break;
            case "multipleradios":
                var val = '';
                $('input[name=' + fieldId + ']').each(function() {
                    $(this).attr("checked", "");
                    $(this).prop('checked', false);
                });
                $('input[name=' + fieldId + ']:first').attr('checked', 'checked');
                $('input[name=' + fieldId + ']:first').prop('checked', true);
                break;
            case "multipleradiosinline":
                var val = '';
                $('input[name=' + fieldId + ']').each(function() {
                    $(this).attr("checked", "");
                    $(this).prop('checked', false);
                });
                $('input[name=' + fieldId + ']:first').attr('checked', 'checked');
                $('input[name=' + fieldId + ']:first').prop('checked', true);
                break;
            case "multiplecheckbox":
                var val = '';
                $('input[name=' + fieldId + ']').each(function() {
                    $(this).attr("checked", "");
                    $(this).prop('checked', false);
                });
                break;
            case "multiplecheckboxinline":
                var val = '';
                $('input[name=' + fieldId + ']').each(function() {
                    $(this).attr("checked", "");
                    $(this).prop('checked', false);
                });
                break;
            case "filebutton":
                $('#' + fieldId).attr('data-file-name', '');
                $('.file-preview').empty();
                break;
            case "googlemap":
                $('#' + fieldId).attr("data-geo-lat", "");
                $('#' + fieldId).attr("data-geo-lng", "");
                break;
            case "googledistancecalculator":
                $('#' + fieldId + '_Source').val('');
                $('#' + fieldId + '_Source').attr("data-geo-lat", "");
                $('#' + fieldId + '_Source').attr("data-geo-lng", "");
                $('#' + fieldId + '_Destination').val('');
                $('#' + fieldId + '_Destination').attr("data-geo-lat", "");
                $('#' + fieldId + '_Destination').attr("data-geo-lng", "");
                break;
            case "custompayment":
                fieldValue = $('#' + fieldId).val('');
                break;
            }
        }
    },
    _initCombobox: function() {
        if ($('select.viamagus-combobox').length) {
            $('select.viamagus-combobox').combobox();
        }
    },
    _initPhonePlugin: function() {
        var that = this;
        if ($('.viamagus-phone').length) {
            $.getJSON("http://freegeoip.net/json/", function(result) {
                $('.viamagus-phone').intlTelInput({
                    defaultCountry: result.country_code.toLowerCase(),
                    autoPlaceholder: false,
                    utilsScript: "/static/sitebuilder/js/utils.js"
                });
            }).error(function() {
                $('.viamagus-phone').intlTelInput({
                    defaultCountry: 'auto',
                    autoPlaceholder: false,
                    utilsScript: "/static/sitebuilder/js/utils.js"
                });
            });
            that.initPhonePluginValidation();
            that._initOTPGenerateEvents();
        }
    },
    initPhonePluginValidation: function() {
        if ($('.viamagus-phone').length) {
            $('.viamagus-phone').each(function(index, e) {
                var fieldId = $(e).attr("id");
                var phoneNo = $('#' + fieldId).val();
                var phoneNoObj = $('#' + fieldId);
                phoneNoObj.blur(function() {
                    if (phoneNoObj.val() != "") {
                        if (phoneNoObj.intlTelInput("isValidNumber")) {
                            $('#error-msg-' + fieldId).addClass("hide");
                        } else {
                            $('#error-msg-' + fieldId).removeClass("hide");
                        }
                    }
                });
            });
        }
    },
    validEmailUsingMailgun: function(emailIdObj) {
        var that = this;
        if (typeof emailIdObj.mailgun_validator == 'function') {
            emailIdObj.mailgun_validator({
                api_key: 'pubkey-1th5kvhp76ee2mgt3u03nsvfx7k64rp3',
                in_progress: null,
                success: that.showValidEmailMessage,
                error: that.showInValidEmailMessage,
            });
        }
    },
    showValidEmailMessage: function(emailIdObj, data) {
        emailIdObj.css("border", "");
        $('#' + emailIdObj.attr('id') + "-error-api").remove();
        Viamagus_Form_Loader.isAllEmailAddressAreValid = true;
        if (!data['is_valid']) {
            var place = $("<label>").attr("id", emailIdObj.attr('id') + "-error-api").css('color', 'red').html("Email address does not exist.");
            if ($('#' + emailIdObj.attr('id') + "-error-api").length == 0) {
                place.insertAfter(emailIdObj);
            }
            emailIdObj.css("border", "1px solid red");
            Viamagus_Form_Loader.isAllEmailAddressAreValid = false;
        }
    },
    showInValidEmailMessage: function(emailIdObj, data) {
        emailIdObj.css("border", "");
        $('#' + emailIdObj.attr('id') + "-error").remove();
        Viamagus_Form_Loader.isAllEmailAddressAreValid = true;
        if (!data['is_valid']) {
            var place = $("<label>").attr("id", emailIdObj.attr('id') + "-error").css('color', 'red').html("Please enter a valid email address.");
            if ($('#' + emailIdObj.attr('id') + "-error").length == 0) {
                place.insertAfter(emailIdObj);
            }
            emailIdObj.css("border", "1px solid red");
            Viamagus_Form_Loader.isAllEmailAddressAreValid = false;
        }
    },
    _initPaymentForm: function() {
        var that = this;
        this.setPaymentRequestParams();
        this.loadMasterCountryStateCityList();
        if ($('.viamagus-payment-form').length > 0) {
            this._initPhonePlugin();
            $("#paymentForm").validate({
                rules: {
                    productName: "required",
                    customerName: "required",
                    customerPhoneNo: "required",
                    customerEmail: {
                        required: true,
                        email: true
                    },
                    addressLineOne: "required",
                    city: "required",
                    pincode: "required",
                    paymentAmount: "required"
                },
                messages: {
                    productName: "Please enter the product name",
                    customerName: "Please enter your Name",
                    customerPhoneNo: "Please enter your Phone No",
                    customerEmail: "Please enter a valid email address",
                    addressLineOne: "Please enter address Line one",
                    city: "Please enter city",
                    pincode: "Please enter postal code",
                    paymentAmount: "Please enter payment amount."
                }
            });
            that._loadPaymentMode();
            this._loadOrderSummary();
            var callback = function() {
                that._loadPaymentMode();
                that._loadOrderSummary();
            };
            this._loadDirectPaymentCurrencyList(callback);
            $('#paymentForm').unbind('submit');
            $('#paymentForm').submit(function(event) {
                event.preventDefault();
                var validator = $('#paymentForm').validate();
                if ($('#paymentForm').valid()) {
                    that.submitPaymentForm();
                }
            });
            window.onbeforeunload = function() {
                return "Are you sure you want to refresh the page. All the payment related data will be lost.!";
            }
        }
    },
    _loadPaymentMode: function() {
        var that = this;
        var paymentCurrency = 'INR';
        var that = this;
        var url = that._contextPath + '/REST/payment/getPaymentModes';
        $.ajax({
            url: url,
            data: {
                entityType: 'Form',
                entityId: $('#entityId').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result != "") {
                var paymentOption = JSON.parse(data.result);
                if ($('#paymentCurrency').length && $('#paymentCurrency').val() != '') {
                    paymentCurrency = $('#paymentCurrency').find("option:selected").val();
                }
                $('.viamagus-payment-mode-payu').hide();
                for (var i = 0; i < paymentOption.length; i++) {
                    var option = paymentOption[i].paymentMode;
                    var paymentLabel = paymentOption[i].paymentModeLabel;
                    if ($('.viamagus-payment-mode-' + option).length) {
                        $('.viamagus-payment-mode-' + option).show();
                        $("input[name=paymentMode][value=" + option + "]").prop('disabled', false);
                        $("input[name=paymentMode][value=" + option + "]").prop('checked', true);
                        $('.viamagus-payment-mode-' + option + ' .custom-label').html(paymentLabel);
                        if (option == 'paypal' && paymentCurrency == 'INR') {
                            $("input[name=paymentMode][value=" + option + "]").prop('checked', false);
                            $("input[name=paymentMode][value=" + option + "]").prop('disabled', true);
                        }
                        if ((option == 'payu' || option == 'payumoney' || option == 'razorpay') && paymentCurrency != 'INR') {
                            $("input[name=paymentMode][value=" + option + "]").prop('checked', false);
                            $("input[name=paymentMode][value=" + option + "]").prop('disabled', true);
                        }
                    }
                }
            }
        });
        if ($('.viamagus-payment-mode-section').length && $('#entityType').val() == 'Order') {
            that._defaultCustomerInfo();
        }
    },
    setPaymentRequestParams: function() {
        if ($('.viamagus-payment-form').length > 0) {
            if (this.getParameter('entityType') != null) {
                $('#entityType').val(this.getParameter('entityType'));
            }
            if (this.getParameter('paymentAmount') != null) {
                $('#paymentAmount').val(this.getParameter('paymentAmount'));
            }
            if (this.getParameter('productName') != null) {
                $('#productName').val(this.getParameter('productName'));
            }
            if (this.getParameter('isProductEditable') == "false") {
                $('#productName').attr("disabled", "disabled");
            }
            if (this.getParameter('isPriceEditable') == "false") {
                $('#paymentAmount').attr("disabled", "disabled");
            }
        }
        if ($('.viamagus-payment-success').length) {
            $('#txnId').html(this.getParameter('txnId'));
            $('#paymentAmount').html(this.getParameter('paymentAmount'));
            $('#supportEmailId').html(this.getParameter('supportEmailId'));
            $('#productName').html(this.getParameter('productName'));
            if ($('.vm-payment-success-currency-code').length && this.getParameter('paymentCurrency') != '') {
                $('.vm-payment-success-currency-symbol').html('');
                $('.vm-payment-success-currency-code').html(this.getParameter('paymentCurrency'));
            }
            this.initAndroidBridgeOnPayuTransactionOver('success');
            this.loadPaymentSuccessSummary();
        }
        if ($('.viamagus-payment-failure').length) {
            $('#txnId').html(this.getParameter('txnId'));
            $('#supportEmailId').html(this.getParameter('supportEmailId'));
            $('#error').html(this.getParameter('error'));
            this.initAndroidBridgeOnPayuTransactionOver('failed');
        }
        if ($('.viamagus-payment-cancel').length) {
            $('#txnId').html(this.getParameter('txnId'));
            $('#supportEmailId').html(this.getParameter('supportEmailId'));
            $('#error').html(this.getParameter('error'));
            this.initAndroidBridgeOnPayuTransactionOver('failed');
        }
    },
    submitPaymentForm: function() {
        var that = this;
        $('#successUrl').val(location.protocol + "//" + location.host + "/paymentSuccess.html?txnId=");
        $('#cancelUrl').val(location.protocol + "//" + location.host + "/paymentCancel.html?txnId=");
        $('#failureUrl').val(location.protocol + "//" + location.host + "/paymentFailure.html?txnId=");
        $('#paymentSubmit').attr("disabled", "disabled");
        var paymentMode = "payu";
        if ($('.viamagus-payment-mode-section').length) {
            paymentMode = $('input[name="paymentMode"]:checked').val();
        }
        var txnCurrency = '';
        if ($('#paymentCurrency').length) {
            txnCurrency = $('#paymentCurrency').val();
        }
        var productInfoJson = '';
        if (paymentMode == 'payumoney') {
            productInfoJson = productInfoJson + '{"paymentParts":[{';
            productInfoJson = productInfoJson + '"name":"' + $('#productName').val() + '",';
            productInfoJson = productInfoJson + '"description ":"",';
            productInfoJson = productInfoJson + '"value":"' + $('#paymentAmount').val() + '",';
            productInfoJson = productInfoJson + '"isRequired" : "true",';
            productInfoJson = productInfoJson + '"settlementEvent":"EmailConfirmation"';
            productInfoJson = productInfoJson + '}]}';
        }
        ;var countryCode = "";
        if ($('#country').prop("type") == "select-one") {
            countryCode = $('#country option:selected').attr("data-country-code");
            country = $('#country option:selected').text();
        } else {
            country = $('#country').val();
        }
        var state = "";
        if ($('#state').prop("type") == "select-one") {
            state = $('#state option:selected').attr("data-state-code");
            if (state == "" || state == null || state == "undefined") {
                state = $('#state option:selected').text();
            }
        } else {
            state = $('#state').val();
        }
        var city = $('#city').val();
        var reqOptions = {
            url: that._contextPath + '/REST/payment/savePaymentDetails',
            data: {
                format: 'json',
                type: 'POST',
                paymentAmount: $('#paymentAmount').val(),
                productName: $('#productName').val(),
                customerName: $('#customerName').val(),
                customerEmail: $('#customerEmail').val(),
                customerPhoneNo: $('#customerPhoneNo').val(),
                addressLineOne: $('#addressLineOne').val(),
                addressLineTwo: $('#addressLineTwo').val(),
                state: state,
                city: city,
                country: country,
                countryCode: countryCode,
                pincode: $('#pincode').val(),
                successUrl: $('#successUrl').val(),
                cancelUrl: $('#cancelUrl').val(),
                failureUrl: $('#failureUrl').val(),
                entityId: $('#entityId').val(),
                entityType: $('#entityType').val(),
                callBackProcess: $('#callBackProcess').val(),
                originUrl: document.referrer,
                discountCode: $('#discountCode').val(),
                discountAmount: $('#discountAmount').val(),
                paymentMode: paymentMode,
                productInfoJson: productInfoJson,
                txnCurrency: txnCurrency,
                additionalChargeAmount: $('#additionalChargeAmount').val(),
                additionalChargeName: $('#additionalChargeName').val(),
                additionalChargeMessage: $('#additionalChargeMessage').val(),
                additionalChargeInBaseCur: $("#cartAdditionalChargeAmount").attr("data-additional-Charge-Amount-In-BaseCur")
            },
            callback: function(data, uniqueId) {
                window.onbeforeunload = function() {
                    return;
                }
                if (paymentMode == 'paypal' && data.result.paymentGateway == 'paypal') {
                    that.generatePayPalToken(data, uniqueId, data.result.paymentGateway);
                }
                if (paymentMode == 'payu' && data.result.paymentGateway == 'payu') {
                    that.generateHashCode(data, uniqueId, data.result.paymentGateway);
                }
                if (paymentMode == 'payumoney' && data.result.paymentGateway == 'payumoney') {
                    that.generateHashCode(data, uniqueId, data.result.paymentGateway);
                }
                if (paymentMode == 'razorpay' && data.result.paymentGateway == 'razorpay') {
                    that.loadRazorPay(data, uniqueId, data.result.paymentGateway);
                }
                if (paymentMode == 'COD' || paymentMode == 'Cheque') {
                    that.submitToCODUrl(data, uniqueId, paymentMode);
                }
                window.setTimeout(function() {
                    $('#paymentSubmit').removeAttr("disabled");
                }, 3000);
            },
            errorCallBack: function() {
                $('#paymentSubmit').removeAttr("disabled");
                window.onbeforeunload = function() {
                    return;
                }
            },
            async: false
        };
        new viamagusTransactionManager(reqOptions);
    },
    submitToCODUrl: function(data, uniqueId, paymentMode) {
        this.submitToUrl(data.result.codUrl, {
            txnid: uniqueId,
            amount: $('#paymentAmount').val(),
            productinfo: $('#productName').val(),
            firstname: $('#customerName').val(),
            email: $('#customerEmail').val(),
            phone: $('#customerPhoneNo').val(),
            lastname: "",
            address1: $('#addressLineOne').val(),
            address2: $('#addressLineTwo').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            country: $('#country').val(),
            zipcode: $('#pincode').val(),
            paymentMode: paymentMode
        });
    },
    generatePayPalToken: function(data, uniqueId, paymentGateway) {
        var that = this;
        $.ajax({
            url: that._contextPath + '/REST/payment/getGeneratedHash',
            data: {
                txnId: uniqueId,
                paymentGateway: paymentGateway
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(hashResult) {
            var params = {};
            if (hashResult != null && hashResult.result != "") {
                that.submitToUrl(data.result.paymentGatewayUrl + hashResult.result, params);
            } else {
                alert("Paypal Error.");
            }
        });
    },
    loadRazorPay: function(data, uniqueId, paymentGateway) {
        var that = this;
        var razorPayUrl = "https://checkout.razorpay.com/v1/checkout.js";
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    that.invokeRazorPay(data, uniqueId, paymentGateway);
                }
            }
            ;
        } else {
            script.onload = function() {
                that.invokeRazorPay(data, uniqueId);
            }
            ;
        }
        script.src = razorPayUrl;
        document.body.appendChild(script);
    },
    invokeRazorPay: function(data, uniqueId, paymentGateway) {
        var that = this;
        var razorPayOptions = {
            "key": data.result.apiKey,
            "amount": parseFloat($('#paymentAmount').val() * 100),
            "name": data.result.merchantName,
            "description": uniqueId,
            "image": "",
            "handler": function(response) {
                new viamagusLoader('body');
                that.submitToRazorPayHandler(data, uniqueId, paymentGateway, response.razorpay_payment_id);
            },
            "prefill": {
                "name": data.result.customerName,
                "email": data.result.customerEmail,
                "contact": data.result.customerPhoneNo.replace(/ /g, "").replace("+", "")
            },
            "notes": {
                "addressLineOne": data.result.addressLineOne,
                "addressLineTwo": data.result.addressLineTwo,
                "state": data.result.state,
                "city": data.result.city,
                "country": data.result.country,
                "pincode": data.result.pincode,
                "txnId": uniqueId
            },
            "theme": {
                "color": "#F37254"
            }
        };
        new Razorpay(razorPayOptions).open();
    },
    submitToRazorPayHandler: function(data, uniqueId, paymentMode, razorPayId) {
        var that = this;
        this.submitToUrl(data.result.paymentVerficationUrl, {
            txnid: uniqueId,
            amount: $('#paymentAmount').val(),
            razorpayId: razorPayId,
            productinfo: $('#productName').val(),
            firstname: $('#customerName').val(),
            email: $('#customerEmail').val(),
            phone: $('#customerPhoneNo').val(),
            lastname: "",
            address1: $('#addressLineOne').val(),
            address2: $('#addressLineTwo').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            country: $('#country').val(),
            pincode: $('#pincode').val(),
            paymentMode: paymentMode
        });
    },
    generateHashCode: function(data, uniqueId, paymentGateway) {
        var that = this;
        var productInfoJson = '';
        if (paymentGateway == 'payu') {
            productInfoJson = $('#productName').val();
        }
        ;if (paymentGateway == 'payumoney') {
            productInfoJson = productInfoJson + '{"paymentParts":[{';
            productInfoJson = productInfoJson + '"name":"' + $('#productName').val() + '",';
            productInfoJson = productInfoJson + '"description ":"",';
            productInfoJson = productInfoJson + '"value":"' + $('#paymentAmount').val() + '",';
            productInfoJson = productInfoJson + '"isRequired" : "true",';
            productInfoJson = productInfoJson + '"settlementEvent":"EmailConfirmation"';
            productInfoJson = productInfoJson + '}]}';
        }
        ;$.ajax({
            url: that._contextPath + '/REST/payment/generateHashForPayuPayment',
            data: {
                txnId: uniqueId,
                paymentAmount: $('#paymentAmount').val(),
                productName: productInfoJson,
                customerName: $('#customerName').val(),
                customerEmail: $('#customerEmail').val(),
                paymentGateway: paymentGateway
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(hashResult) {
            var params = {
                key: data.result.merchantId,
                txnid: uniqueId,
                amount: $('#paymentAmount').val(),
                productinfo: productInfoJson,
                firstname: $('#customerName').val(),
                email: $('#customerEmail').val(),
                phone: $('#customerPhoneNo').val(),
                lastname: "",
                address1: $('#addressLineOne').val(),
                address2: $('#addressLineTwo').val(),
                city: $('#city').val(),
                state: $('#state').val(),
                country: $('#country').val(),
                zipcode: $('#pincode').val(),
                surl: data.result.paymentVerficationUrl,
                curl: data.result.paymentVerficationUrl,
                furl: data.result.paymentVerficationUrl,
                hash: hashResult.result
            };
            if (paymentGateway == 'payumoney') {
                params.service_provider = 'payu_paisa';
            }
            that.submitToUrl(data.result.paymentGatewayUrl, params);
        });
    },
    submitToUrl: function(path, params, method) {
        method = method || "post";
        var form = document.createElement("form");
        form._submit_function_ = form.submit;
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form._submit_function_();
    },
    getParameter: function(paramName) {
        var searchString = window.location.search.substring(1), i, val, params = searchString.split("&");
        for (i = 0; i < params.length; i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
                return unescape(val[1]);
            }
        }
        return null;
    },
    _calculateProductAmount: function(formId, baseCurrency) {
        var that = this;
        var txnCurrency = Viamagus_Currency_Manager.txnCurrency
          , conversionRate = Viamagus_Currency_Manager.conversionRate;
        if ($('.viamagus-form-products').length) {
            var allowMultiple = $('.viamagus-form-products').attr("data-allow-multiple-products");
            var totalAmountToPay = 0;
            var totalAmountToPayInTxnCur = 0;
            var currencyCode = baseCurrency;
            if (txnCurrency && txnCurrency != null) {
                currencyCode = txnCurrency;
            }
            if (baseCurrency != null && baseCurrency != "" && $('.vm-form-product-currency-symbol').length) {
                $('.vm-form-product-currency-symbol').html('');
                $('.vm-form-product-currency-code').html(currencyCode);
            }
            if (allowMultiple == "true") {
                $('.viamagus-allow-multiple-products-purchase').each(function(index, e) {
                    var checkBox = $(e).find("#productCheckBox");
                    var price = $(e).attr("data-product-price");
                    var priceInTxnCur = $(e).attr("data-product-price-in-txn-cur");
                    var qty = $(e).find("#productQty").val();
                    var productSubtotal = 0;
                    var productSubtotalInTxnCur = 0;
                    if (txnCurrency && txnCurrency != null && parseFloat(conversionRate) > 0) {
                        priceInTxnCur = parseFloat(price * conversionRate).toFixed(2);
                        $(e).attr("data-product-price-in-txn-cur", priceInTxnCur);
                        $(e).find(".viamagus-product-price").html($.number(priceInTxnCur, 2));
                    } else {
                        $(e).attr("data-product-price-in-txn-cur", price);
                        $(e).find(".viamagus-product-price").html($.number(price, 2));
                    }
                    that.checkProductAvailability($(e));
                    if (qty > 0) {
                        checkBox.attr("checked", "checked");
                    }
                    if (checkBox.is(":checked") && qty == 0) {
                        $(e).find("#productQty").val(1);
                        qty = 1;
                    }
                    if (checkBox.is(":checked") && qty > 0) {
                        if ($('#discountCode').val() != '') {
                            productSubtotal = that.applyDiscountCode(parseFloat(qty * price), $(e).attr("data-product-name"), formId, $(e), totalAmountToPay, price, qty);
                        } else {
                            productSubtotal = parseFloat(qty * price).toFixed(2);
                            totalAmountToPay = totalAmountToPay + productSubtotal;
                            $(e).attr("data-product-total-amount", productSubtotal);
                            if (txnCurrency && txnCurrency != null && parseFloat(conversionRate) > 0) {
                                productSubtotalInTxnCur = parseFloat(qty * priceInTxnCur).toFixed(2);
                                totalAmountToPayInTxnCur = totalAmountToPayInTxnCur + productSubtotalInTxnCur;
                                $(e).attr("data-product-total-amount-in-txn-cur", productSubtotalInTxnCur);
                                $(e).find(".viamagus-product-subtotal").html($.number(productSubtotalInTxnCur, 2));
                            } else {
                                $(e).attr("data-product-total-amount-in-txn-cur", productSubtotal);
                                $(e).find(".viamagus-product-subtotal").html($.number(productSubtotal, 2));
                            }
                        }
                    } else {
                        $(e).find("#productQty").val(0);
                        $(e).find(".viamagus-product-subtotal").html("0.00");
                        $(e).attr("data-product-total-amount", "0");
                    }
                });
            } else {
                $('.viamagus-allow-single-product-purchase').each(function(index, e) {
                    var radioBtn = $(e).find("#productRadioButton");
                    var price = $(e).attr("data-product-price");
                    var qty = $(e).find("#productQty").val();
                    var priceInTxnCur = $(e).attr("data-product-price-in-txn-cur");
                    var productSubtotal = 0;
                    var productSubtotalInTxnCur = 0;
                    if (txnCurrency && txnCurrency != null && parseFloat(conversionRate) > 0) {
                        priceInTxnCur = parseFloat(price * conversionRate).toFixed(2);
                        $(e).attr("data-product-price-in-txn-cur", priceInTxnCur);
                        $(e).find(".viamagus-product-price").html($.number(priceInTxnCur, 2));
                    } else {
                        $(e).attr("data-product-price-in-txn-cur", price);
                        $(e).find(".viamagus-product-price").html($.number(price, 2));
                    }
                    that.checkProductAvailability($(e));
                    if (radioBtn.is(":checked") && qty == 0) {
                        $(e).find("#productQty").val(1);
                        qty = 1;
                    }
                    if (qty > 0) {
                        radioBtn.attr("checked", "checked");
                    }
                    if (radioBtn.is(":checked") && qty > 0) {
                        if ($('#discountCode').val() != '') {
                            productSubtotal = that.applyDiscountCode(parseFloat(qty * price), $(e).attr("data-product-name"), formId, $(e), totalAmountToPay, price, qty);
                        } else {
                            productSubtotal = parseFloat(qty * price).toFixed(2);
                            totalAmountToPay = totalAmountToPay + productSubtotal;
                            $(e).attr("data-product-total-amount", productSubtotal);
                            if (txnCurrency && txnCurrency != null && parseFloat(conversionRate) > 0) {
                                productSubtotalInTxnCur = parseFloat(qty * priceInTxnCur).toFixed(2);
                                totalAmountToPayInTxnCur = totalAmountToPayInTxnCur + productSubtotalInTxnCur;
                                $(e).attr("data-product-total-amount-in-txn-cur", productSubtotalInTxnCur);
                                $(e).find(".viamagus-product-subtotal").html($.number(productSubtotalInTxnCur, 2));
                            } else {
                                $(e).attr("data-product-total-amount-in-txn-cur", productSubtotal);
                                $(e).find(".viamagus-product-subtotal").html($.number(productSubtotal, 2));
                            }
                        }
                    } else {
                        $(e).find(".viamagus-product-subtotal").html("0.00");
                        $(e).attr("data-product-total-amount", "0");
                    }
                });
            }
            if ($('#discountCode').val() == '') {
                that.calculateTotalAmountToPay();
            }
        }
    },
    applyDiscountCode: function(amountToPay, productName, formId, rowObj, totalAmountToPay, productPrice, qty) {
        var that = this;
        var discountCode = $('#discountCode').val();
        if (discountCode != '') {
            var url = that._contextPath + '/REST/discount/getDiscountValue';
            $.ajax({
                url: url,
                data: {
                    discountCode: discountCode,
                    productName: productName,
                    formId: formId
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result && data.result.isValidDiscount == 'Y') {
                    var discountedPrice = productPrice;
                    if (data.result.discountType == 'percentage') {
                        discountedPrice = discountedPrice - (discountedPrice * data.result.discountValue / 100);
                        amountToPay = discountedPrice * qty;
                        $('.discount-input-section').attr("data-discount-amount", parseFloat($('.discount-input-section').attr("data-discount-amount") != "" ? $('.discount-input-section').attr("data-discount-amount") : 0) + (productPrice - discountedPrice) * qty);
                    }
                    if (data.result.discountType == 'absolute') {
                        discountedPrice = discountedPrice - data.result.discountValue;
                        amountToPay = discountedPrice * qty;
                        $('.discount-input-section').attr("data-discount-amount", parseFloat($('.discount-input-section').attr("data-discount-amount") != "" ? $('.discount-input-section').attr("data-discount-amount") : 0) + (productPrice - discountedPrice) * qty);
                    }
                    $('.vm-discount-success').show();
                    $('.vm-discount-failure').hide();
                    $('#discountCode').attr("readonly", "readonly");
                    $('#removeDiscountCode').show();
                    $('#applyDiscountCode').hide();
                    rowObj.find(".viamagus-product-subtotal").html($.number(amountToPay, 2));
                    rowObj.attr("data-product-total-amount", amountToPay);
                    rowObj.attr("data-discount-price", discountedPrice);
                    rowObj.attr("data-discount-code", $('#discountCode').val());
                    if (amountToPay != parseFloat(productPrice)) {
                        rowObj.find(".viamagus-product-price").html($.number(discountedPrice, 2) + " <strike style='color:red'>(" + $.number(productPrice, 2) + ")</strike>");
                    }
                } else {
                    rowObj.attr("data-product-total-amount", amountToPay);
                    rowObj.find(".viamagus-product-subtotal").html($.number(amountToPay, 2));
                    rowObj.attr("data-discount-price", "");
                    rowObj.attr("data-discount-code", "");
                }
                $('#applyDiscountCode').text('Apply');
                $('#applyDiscountCode').removeAttr('disabled');
                if (amountToPay < 0) {
                    amountToPay = 0;
                }
                that.calculateTotalAmountToPay();
            });
        }
    },
    calculateTotalAmountToPay: function() {
        var allowMultiple = $('.viamagus-form-products').attr("data-allow-multiple-products");
        var totalAmountToPay = 0;
        var totalAmountToPayInTxnCur = 0;
        var isDiscountApplied = false;
        if (allowMultiple == "true") {
            $('.viamagus-allow-multiple-products-purchase').each(function(index, e) {
                var checkBox = $(e).find("#productCheckBox");
                var qty = $(e).find("#productQty").val();
                if (checkBox.is(":checked") && qty > 0) {
                    if ($(e).attr("data-product-total-amount") != "") {
                        totalAmountToPay = totalAmountToPay + parseFloat($(e).attr("data-product-total-amount"));
                    }
                    if ($(e).attr("data-product-total-amount-in-txn-cur") != "") {
                        totalAmountToPayInTxnCur = totalAmountToPayInTxnCur + parseFloat($(e).attr("data-product-total-amount-in-txn-cur"));
                    }
                    if ($(e).attr("data-discount-code") != "") {
                        isDiscountApplied = true;
                    }
                }
            });
        } else {
            $('.viamagus-allow-single-product-purchase').each(function(index, e) {
                var radioBtn = $(e).find("#productRadioButton");
                var qty = $(e).find("#productQty").val();
                if (radioBtn.is(":checked") && qty > 0) {
                    if ($(e).attr("data-product-total-amount") != "") {
                        totalAmountToPay = totalAmountToPay + parseFloat($(e).attr("data-product-total-amount"));
                    }
                    if ($(e).attr("data-product-total-amount-in-txn-cur") != "") {
                        totalAmountToPayInTxnCur = totalAmountToPayInTxnCur + parseFloat($(e).attr("data-product-total-amount-in-txn-cur"));
                    }
                    if ($(e).attr("data-discount-code") != "") {
                        isDiscountApplied = true;
                    }
                }
            });
        }
        $('#totalAmountToPay').attr("data-total-amount", totalAmountToPay.toFixed(2));
        $('#totalAmountToPay').attr("data-total-amount-in-txn-cur", totalAmountToPayInTxnCur.toFixed(2));
        if (totalAmountToPayInTxnCur > 0) {
            $('#totalAmountToPay').html($.number(totalAmountToPayInTxnCur, 2));
        } else {
            $('#totalAmountToPay').html($.number(totalAmountToPay, 2));
        }
        if ($('#discountCode').val() != '') {
            if (!isDiscountApplied) {
                $('#removeDiscountCode').hide();
                $('#applyDiscountCode').show();
                $('.vm-discount-success').hide();
                $('.vm-discount-failure').show();
            }
        }
    },
    _validateProductDetails: function() {
        var isProductSelected = false;
        if ($('.viamagus-form-products').length) {
            var allowMultiple = $('.viamagus-form-products').attr("data-allow-multiple-products");
            var totalAmountToPay = 0;
            if (allowMultiple == "true") {
                $('.viamagus-allow-multiple-products-purchase').each(function(index, e) {
                    var checkBox = $(e).find("#productCheckBox");
                    var qty = $(e).find("#productQty").val();
                    if (checkBox.is(":checked") && qty > 0) {
                        isProductSelected = true;
                    }
                });
            } else {
                $('.viamagus-allow-single-product-purchase').each(function(index, e) {
                    var radioBtn = $(e).find("#productRadioButton");
                    var qty = $(e).find("#productQty").val();
                    if (radioBtn.is(":checked") && qty > 0) {
                        isProductSelected = true;
                    }
                });
            }
            if (!isProductSelected) {
                $('.product-error-selection-required').show();
            } else {
                $('.product-error-selection-required').hide();
            }
            if ($('#totalAmountToPay').html() != "" && !parseFloat($('#totalAmountToPay').html()) > 0) {
                $('.product-error-amount-zero').show();
            } else {
                $('.product-error-amount-zero').hide();
            }
            return isProductSelected;
        }
        return true;
    },
    _registerProductCalculataionEvent: function(formId, baseCurrency) {
        $('.viamagus-product-qty').unbind();
        var that = this;
        that._calculateProductAmount(formId, baseCurrency);
        that._loadFormProductQtyInfo(formId, baseCurrency)
        $('.viamagus-product-qty').change(function(e) {
            $(this).val(Math.abs($(this).val()));
            var minQty = $(this).attr("data-min-order-qty");
            var maxQty = $(this).attr("data-max-order-qty");
            if (minQty != null && minQty != "" && parseInt(minQty) > 0) {
                if ($(this).val() < parseInt(minQty)) {
                    $(this).val(parseInt(minQty));
                }
            }
            if (maxQty != null && maxQty != "" && parseInt(maxQty) > 0) {
                if ($(this).val() > parseInt(maxQty)) {
                    $(this).val(parseInt(maxQty));
                }
            }
            that._calculateProductAmount(formId, baseCurrency);
        });
        $('.viamagus-product-select').change(function(e) {
            $('#discountCode').val('');
            $('#discountCode').removeAttr("readonly");
            $('#removeDiscountCode').hide();
            $('#applyDiscountCode').show();
            $('.vm-discount-success').hide();
            $('.vm-discount-failure').hide();
            that._calculateProductAmount(formId, baseCurrency);
        });
        $('.viamagus-discount-checkbox').change(function(e) {
            $('#removeDiscountCode').hide();
            $('#applyDiscountCode').show();
            if ($(this).is(':checked')) {
                $('.discount-input-section').show();
            } else {
                $('.discount-input-section').hide();
                $('#discountCode').val('');
                $('#discountCode').removeAttr("readonly");
            }
            that._calculateProductAmount(formId, baseCurrency);
        });
        $('#applyDiscountCode').click(function(e) {
            if ($('#discountCode').val() != '') {
                $(this).text('Applying...');
                $(this).attr('disabled', 'disabled');
                that._calculateProductAmount(formId, baseCurrency);
            }
        });
        $('#removeDiscountCode').click(function(e) {
            $('#discountCode').val('');
            $('#discountCode').removeAttr('readonly');
            $('#applyDiscountCode').show();
            $(this).hide();
            that._calculateProductAmount(formId, baseCurrency);
            $('.vm-discount-success').hide();
        });
    },
    _buildProductJSON: function() {
        var productJSON = "";
        var prodcutName = "";
        if ($('.viamagus-form-products').length) {
            productJSON = '{"products":[';
            var allowMultiple = $('.viamagus-form-products').attr("data-allow-multiple-products");
            var totalAmountToPay = 0;
            if (allowMultiple == "true") {
                $('.viamagus-allow-multiple-products-purchase').each(function(index, e) {
                    var checkBox = $(e).find("#productCheckBox");
                    var qty = $(e).find("#productQty").val();
                    if (checkBox.is(":checked") && qty > 0) {
                        prodcutName = prodcutName + $(e).attr("data-product-name") + ", ";
                        productJSON = productJSON + '{"productName":"' + $(e).attr("data-product-name") + '","productPrice":"' + $(e).attr("data-product-price") + '","productPriceInTxnCur":"' + $(e).attr("data-product-price-in-txn-cur") + '","productQty":' + qty + ',"discountPrice":"' + $(e).attr("data-discount-price") + '","productAmount":"' + $(e).attr("data-product-total-amount") + '","productAmountInTxnCur":"' + $(e).attr("data-product-total-amount-in-txn-cur") + '","discountCode":"' + $(e).attr("data-discount-code") + '"},';
                    }
                });
                prodcutName = prodcutName.substring(0, prodcutName.length - 2);
                productJSON = productJSON.substring(0, productJSON.length - 1);
            } else {
                $('.viamagus-allow-single-product-purchase').each(function(index, e) {
                    var radioBtn = $(e).find("#productRadioButton");
                    var qty = $(e).find("#productQty").val();
                    if (radioBtn.is(":checked") && qty > 0) {
                        prodcutName = prodcutName + $(e).attr("data-product-name");
                        productJSON = productJSON + '{"productName":"' + $(e).attr("data-product-name") + '","productPrice":"' + $(e).attr("data-product-price") + '","productPriceInTxnCur":"' + $(e).attr("data-product-price-in-txn-cur") + '","productQty":' + qty + ',"discountPrice":"' + $(e).attr("data-discount-price") + '","productAmount":"' + $(e).attr("data-product-total-amount") + '","productAmountInTxnCur":"' + $(e).attr("data-product-total-amount-in-txn-cur") + '","discountCode":"' + $(e).attr("data-discount-code") + '"}';
                    }
                });
            }
            productJSON = productJSON + '],"totalAmountToPay":"' + $('#totalAmountToPay').attr("data-total-amount") + '","totalAmountToPayInTxnCur":"' + $('#totalAmountToPay').attr("data-total-amount-in-txn-cur") + '","discountCode":"' + $('#discountCode').val() + '","prodcutName":"' + prodcutName + '",';
            productJSON = productJSON + '"discountAmount":"' + $('.discount-input-section').attr('data-discount-amount') + '"}';
        }
        return productJSON;
    },
    _loadOrderSummary: function() {
        var that = this;
        if ($('#entityType').val() == 'Form') {
            that.loadFormOrderSummary();
        }
        if ($('#entityType').val() == 'Order') {
            that.loadCartSummary();
        }
    },
    loadFormOrderSummary: function() {
        var that = this;
        var url = that._contextPath + '/REST/payment/loadFormOrderSummary';
        $.ajax({
            url: url,
            data: {
                entityType: 'Form',
                entityId: $('#entityId').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result.length) {
                $('.viamagus-checkout-summary').show();
                $('.viamagus-product-info').hide();
                $('#viamagus-order-summary-body').empty();
                for (var i = 0; i < data.result.length; i++) {
                    var product = data.result[i];
                    var currencySymbol = ' ';
                    var currencyCode = product.baseCurrency;
                    if (product.isCustomPayment == 'N') {
                        that.initOnPaymentModeChangeEvent();
                        var productPrice = product.productPrice;
                        var productAmount = product.paymentAmount;
                        if (product.hasOwnProperty('txnCurrency') && product.txnCurrency != '' && product.txnCurrency != product.baseCurrency) {
                            currencySymbol = '';
                            currencyCode = product.txnCurrency;
                            productPrice = product.productPriceInTxnCur;
                            productAmount = product.productAmtInTxnCur;
                        }
                        if ($('.vm-form-payment-currency-code').length) {
                            $('.vm-form-payment-currency-symbol').html('');
                            $('.vm-form-payment-currency-code').html(currencyCode);
                        }
                        $('.viamagus-form-product-summary').show();
                        var productRow = '<tr class="viamagus-product-summary-row" > ';
                        productRow = productRow + '<td data-title="Product Name">' + product.productName + '</td>';
                        if (product.discountAmount != null && product.discountAmount != "") {
                            productRow = productRow + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="vm-format-number">' + product.discountAmount + '</span> <strike style="color:red;">(<span class="vm-format-number">' + productPrice + '</span>) ' + currencyCode + '</strike></td>';
                        } else {
                            productRow = productRow + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="vm-format-number">' + productPrice + '</span> ' + currencyCode + '</td>';
                        }
                        productRow = productRow + '<td class="numeric" data-title="Quantity">' + product.productQty + '</td>';
                        productRow = productRow + '<td class="numeric sub-total"><b>' + currencySymbol + '<span class="vm-format-number row-subtotal">' + productAmount + '</span> ' + currencyCode + '</b></td> <tr>';
                        $('#viamagus-order-summary-body').append(productRow);
                        $('#checkOutSummaryTotalNumber').html(data.result[0].totalAmount);
                        if (data.result[0].discountCode != "") {
                            $('#checkOutSummaryDiscountRow').show();
                            $('#checkOutDiscountCode').html(data.result[0].discountCode);
                        }
                    } else {
                        $('.viamagus-custom-payment-summary').show();
                        $('.vm-form-submit-ref-id').html(product.txnId);
                        if ($('.vm-form-custom-payment-currency-code').length) {
                            if ($('#paymentCurrency').val() != '') {
                                $('.vm-form-custom-payment-currency-symbol').html('');
                                $('.vm-form-custom-payment-currency-code').html($('#paymentCurrency').val());
                            }
                        }
                        $('.vm-form-custom-payment-amount').html(product.totalAmount);
                    }
                }
                $('.vm-format-number').number(true, 2);
            }
        });
    },
    loadCartSummary: function() {
        var that = this;
        var url = that._contextPath + '/REST/ecommerce/loadShoppingCartSummary';
        $.ajax({
            url: url,
            data: {
                entityType: 'Order',
                entityId: $('#entityId').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result.length) {
                that.initOnPaymentModeEcommChangeEvent();
                $('#viamagus-shopping-cart-table-content').empty();
                $('.viamagus-product-info').hide();
                var currencySymbol = 'Rs. ';
                var currencyCode = '';
                for (var i = 0; i < data.result.length; i++) {
                    var productPrice = data.result[i].productPrice;
                    var productAmount = data.result[i].productAmount;
                    var totalAmount = data.result[i].totalAmount;
                    var discountAmount = data.result[i].discountAmount;
                    if (data.result[i].hasOwnProperty('storeCurrency') && data.result[i].storeCurrency != "" && data.result[i].storeCurrency != null) {
                        currencySymbol = '';
                        currencyCode = data.result[i].storeCurrency;
                    }
                    if (data.result[i].hasOwnProperty('transactionCurrency') && data.result[i].transactionCurrency != "" && data.result[i].transactionCurrency != null) {
                        currencySymbol = '';
                        currencyCode = data.result[i].transactionCurrency;
                        productPrice = data.result[i].priceInTransactCurrency;
                        productAmount = data.result[i].productAmountInTransactionCurrency;
                        totalAmount = data.result[i].totalAmountInTransactionCurrency;
                        discountAmount = data.result[i].discountAmountInTransactCurrency;
                    }
                    var cartItemHtml = '<tr class="viamagus-cart-item-row data-product-id="' + data.result[i].productId + '">';
                    cartItemHtml = cartItemHtml + '<td data-title="Product Name">' + data.result[i].productName + '</td>';
                    cartItemHtml = cartItemHtml + '<td><a class="viamagus-image-lightbox" href="#"><img class="viamagus-product-image-url" style="width:50px;height:auto;" src="' + data.result[i].productImageUrl + '"></a></td>';
                    cartItemHtml = cartItemHtml + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="viamagus-product-price viamagus-format-number">';
                    cartItemHtml = cartItemHtml + ' ' + productPrice + '</span> ' + currencyCode;
                    if (data.result[i].hasOwnProperty('weightUnit') && data.result[i].weightUnit != null) {
                        cartItemHtml = cartItemHtml + '/' + data.result[i].weightUnit + '</td>';
                    }
                    cartItemHtml = cartItemHtml + '<td class="numeric" data-title="Quantity">' + data.result[i].productQty + '</td>';
                    cartItemHtml = cartItemHtml + '<td class="numeric sub-total" ><b>' + currencySymbol + '<span class="viamagus-product-subtotal row-subtotal viamagus-format-number">' + productAmount + '</span> ' + currencyCode + ' </b></td>';
                    cartItemHtml = cartItemHtml + '</tr>';
                    $('#viamagus-shopping-cart-table-content').append(cartItemHtml);
                    $('#shoppingCartTotal').html(totalAmount);
                    $('#paymentAmount').attr("data-payment-amount", totalAmount);
                    $('.vm-currency-symbol').html(currencySymbol);
                    $('.vm-currency-code').html(currencyCode);
                    if ($('#discountCode').val() != "" && $('#discountCode').val() != null && $('#orderSummaryDiscountRow').length) {
                        $('#orderSummaryDiscountRow').show();
                        $('#cartDiscountCode').html($('#discountCode').val());
                        $('#cartDiscountAmount').html(discountAmount);
                    }
                }
            }
            $('.viamagus-format-number').number(true, 2);
        });
    },
    loadFormPaymentModes: function() {
        var that = this;
        var url = that._contextPath + '/REST/payment/getPaymentModes';
        $.ajax({
            url: url,
            data: {
                entityType: 'Form',
                entityId: $('#entityId').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result) {
                var paymentOption = data.result.split(",");
                $('.viamagus-payment-mode-payu').hide();
                for (var i = 0; i < paymentOption.length; i++) {
                    var paymentMode = paymentOption[i];
                    if ($('.viamagus-payment-mode-' + option.toLowerCase()).length) {
                        $('.viamagus-payment-mode-' + option.toLowerCase()).show();
                    }
                }
                if (data.result.indexOf(",") == -1) {
                    $("input[name=paymentMode][value=" + paymentOption + "]").prop('checked', true);
                }
            }
        });
    },
    loadCartPaymentModes: function() {
        var that = this;
        var url = that._contextPath + '/REST/ecommerce/getPaymentModes';
        $.ajax({
            url: url,
            data: {
                entityType: 'Order',
                entityId: $('#entityId').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result != "") {
                var paymentOption = JSON.parse(data.result);
                $('.viamagus-payment-mode-payu').hide();
                for (var i = 0; i < paymentOption.length; i++) {
                    var option = paymentOption[i].paymentMode;
                    if ($('.viamagus-payment-mode-' + option).length) {
                        $('.viamagus-payment-mode-' + option).show();
                    }
                }
            }
        });
    },
    loadPaymentSuccessSummary: function() {
        var that = this;
        var entitytype = that.getParameter('entityType');
        var entityId = that.getParameter('entityId');
        if (entitytype == 'Order' && entityId != '') {
            that.loadOrderPaymentSuccessSummary(entitytype, entityId);
        }
        if (entitytype == 'Form' && entityId != '') {
            that.loadFormProductPaymentSuccessSummary(entitytype, entityId);
        }
    },
    loadOrderPaymentSuccessSummary: function(entitytype, entityId) {
        var that = this;
        var url = that._contextPath + '/REST/ecommerce/loadShoppingCartSummary';
        $.ajax({
            url: url,
            data: {
                entityType: entitytype,
                entityId: entityId
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result.length) {
                $('#order-summary-header').empty();
                $('#order-summary-body').empty();
                $('#order-summary-header').append('<tr><th>ProductName </th><th> Image </th> <th> Price </th><th> Qty </th><th> SubTotal </th></tr>');
                var currencySymbol = 'Rs. ';
                var currencyCode = '';
                for (var i = 0; i < data.result.length; i++) {
                    var productPrice = data.result[i].productPrice;
                    var productAmount = data.result[i].productAmount;
                    var totalAmount = data.result[i].totalAmount;
                    var discountAmount = data.result[i].discountAmount;
                    var additionalCharge = data.result[i].additionalCharge;
                    if (data.result[i].hasOwnProperty('storeCurrency') && data.result[i].storeCurrency != "" && data.result[i].storeCurrency != null) {
                        currencySymbol = '';
                        currencyCode = data.result[i].storeCurrency;
                    }
                    if (data.result[i].hasOwnProperty('transactionCurrency') && data.result[i].transactionCurrency != "" && data.result[i].transactionCurrency != null) {
                        currencySymbol = '';
                        currencyCode = data.result[i].transactionCurrency;
                        productPrice = data.result[i].priceInTransactCurrency;
                        productAmount = data.result[i].productAmountInTransactionCurrency;
                        totalAmount = data.result[i].totalAmountInTransactionCurrency;
                        discountAmount = data.result[i].discountAmountInTransactCurrency;
                        additionalCharge = data.result[i].additionalChargeInTransactCurrency;
                    }
                    var cartItemHtml = '<tr class="viamagus-cart-item-row" >';
                    cartItemHtml = cartItemHtml + '<td data-title="Product Name">' + data.result[i].productName + '</td>';
                    cartItemHtml = cartItemHtml + '<td><a class="viamagus-image-lightbox" href="#"><img class="viamagus-product-image-url" style="width:50px;height:auto;" src="' + data.result[i].productImageUrl + '"></a></td>';
                    cartItemHtml = cartItemHtml + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="viamagus-product-price viamagus-format-number">';
                    cartItemHtml = cartItemHtml + ' ' + productPrice + '</span>  ' + currencyCode;
                    if (data.result[i].hasOwnProperty('weightUnit') && data.result[i].weightUnit != null) {
                        cartItemHtml = cartItemHtml + '/' + data.result[i].weightUnit + '</td>';
                    }
                    cartItemHtml = cartItemHtml + '<td class="numeric" data-title="Quantity">' + data.result[i].productQty + '</td>';
                    cartItemHtml = cartItemHtml + '<td class="numeric sub-total" ><b>' + currencySymbol + '<span class="viamagus-product-subtotal row-subtotal viamagus-format-number">' + productAmount + '</span> ' + currencyCode + '</b></td>';
                    cartItemHtml = cartItemHtml + '</tr>';
                    $('#order-summary-body').append(cartItemHtml);
                }
                if (data.result[0].discountCode != null && data.result[0].discountCode != "") {
                    $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>Discount Code : ' + data.result[0].discountCode + '</td></tr>');
                    $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>Discount Amount : ' + currencySymbol + '<span class="viamagus-format-number"> ' + discountAmount + '</span> ' + currencyCode + '</b></td></tr>');
                }
                if (additionalCharge != null && additionalCharge != "") {
                    $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>Additional Charge : ' + currencySymbol + '<span class="viamagus-format-number"> ' + additionalCharge + '</span> ' + currencyCode + '</b></td></tr>');
                }
                $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>Total Amount : ' + currencySymbol + '<span class="viamagus-format-number"> ' + totalAmount + '</span> ' + currencyCode + '</b></td></tr>');
            }
            $('.viamagus-format-number').number(true, 2);
            Viamagus_Cart_Manager.resetCart();
        });
    },
    loadFormProductPaymentSuccessSummary: function(entitytype, entityId) {
        var that = this;
        var url = that._contextPath + '/REST/payment/loadFormOrderSummary';
        $.ajax({
            url: url,
            data: {
                entityType: entitytype,
                entityId: entityId
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result && data.result.length) {
                if (data.result[0].isCustomPayment == 'N') {
                    $('#order-summary-header').empty();
                    $('#order-summary-body').empty();
                    $('#order-summary-header').append('<tr><th>Product Name</th><th >Price</th> <th >Quantity</th> <th >Sub Total</th> </tr>        ');
                    var currencySymbol = 'Rs. ';
                    var currencyCode = '';
                    var totalAmount = 0;
                    var additionalChargeAmt = 0;
                    var additionalChargeName = '';
                    for (var i = 0; i < data.result.length; i++) {
                        var product = data.result[i];
                        totalAmount = product.totalAmount;
                        if (product.isCustomPayment == 'N') {
                            var productPrice = product.productPrice;
                            var productAmount = product.paymentAmount;
                            if (product.hasOwnProperty('additionalChargeAmount') && product.additionalChargeAmount != '') {
                                additionalChargeAmt = product.additionalChargeAmount;
                                additionalChargeName = product.additionalChargeName;
                            }
                            if (product.hasOwnProperty('txnCurrency') && product.txnCurrency != '') {
                                currencySymbol = '';
                                currencyCode = product.txnCurrency;
                                productPrice = product.productPriceInTxnCur;
                                productAmount = product.productAmtInTxnCur;
                                if ($('.vm-form-payment-currency-code').length) {
                                    $('.vm-form-payment-currency-symbol').html('');
                                    $('.vm-form-payment-currency-code').html(currencyCode);
                                }
                            }
                            $('.viamagus-form-product-summary').show();
                            var productRow = '<tr class="viamagus-product-summary-row" > ';
                            productRow = productRow + '<td data-title="Product Name">' + product.productName + '</td>';
                            if (product.discountAmount != null && product.discountAmount != "") {
                                productRow = productRow + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="vm-format-number">' + product.discountAmount + '</span> <strike style="color:red;">(<span class="vm-format-number">' + productPrice + '</span>) ' + currencyCode + '</strike></td>';
                            } else {
                                productRow = productRow + '<td class="numeric" data-title="Price">' + currencySymbol + '<span class="vm-format-number">' + productPrice + '</span> ' + currencyCode + '</td>';
                            }
                            productRow = productRow + '<td class="numeric" data-title="Quantity">' + product.productQty + '</td>';
                            productRow = productRow + '<td class="numeric sub-total"><b>' + currencySymbol + '<span class="vm-format-number row-subtotal">' + productAmount + '</span> ' + currencyCode + '</b></td> <tr>';
                            $('#order-summary-body').append(productRow);
                        }
                    }
                    if (additionalChargeName != '' && additionalChargeName != null) {
                        totalAmount = parseFloat(totalAmount) + parseFloat(additionalChargeAmt);
                        $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>' + additionalChargeName + ' : ' + currencySymbol + '<span class="vm-format-number"> ' + additionalChargeAmt + '</span> ' + currencyCode + '</b></td></tr>');
                        $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>Total Amount : ' + currencySymbol + '<span class="vm-format-number"> ' + totalAmount + '</span> ' + currencyCode + '</b></td></tr>');
                    } else {
                        $('#order-summary-body').append('<tr><td colspan="5"  style="text-align:right;"><b>Total Amount : ' + currencySymbol + '<span class="vm-format-number"> ' + totalAmount + '</span> ' + currencyCode + '</b></td></tr>');
                    }
                }
                $('.vm-format-number').number(true, 2);
            }
        });
    },
    _defaultCustomerInfo: function() {
        var that = this;
        var url = that._contextPath + '/REST/ecommerce/getCustomerInfo';
        $.ajax({
            url: url,
            data: {},
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result) {
                $('#customerName').val(data.result.customerName);
                $('#customerEmail').val(data.result.userName);
                $('#customerPhoneNo').val(data.result.phoneNo);
                $('#addressLineOne').val(data.result.addressLineOne);
                $('#addressLineTwo').val(data.result.addressLineTwo);
                $('#state').val(data.result.state);
                $('#city').val(data.result.city);
                if (data.result.country != null && data.result.country != "") {
                    $('#country').val(data.result.country);
                }
                $('#pincode').val(data.result.pincode);
            }
        });
    },
    initAndroidBridgeOnPayuTransactionOver: function(status) {
        var input = JSON.stringify({
            txnId: this.getParameter('txnId'),
            status: status
        });
        if (typeof PayU != "undefined") {
            $('.viamagus_header').hide();
            if (status == 'success') {
                PayU.onSuccess(input);
            }
            if (status == 'failed') {
                PayU.onFailure(input);
            }
        }
    },
    _initGoogleMap: function() {
        if ($('.viamagus-form-google-map').length) {
            $('.viamagus-form-google-map').each(function(index, e) {
                var searchInputField = $(e).find('.search-input');
                var googleMapPlaceHolder = '#' + searchInputField.attr("data-comp-id") + "_Map";
                var searchbutton = $(e).find('.search-button');
                searchInputField.geocomplete({
                    map: googleMapPlaceHolder,
                    location: 'Bangalore',
                    markerOptions: {
                        draggable: true
                    }
                }).bind("geocode:result", function(event, result) {
                    $(this).attr("data-geo-lat", result.geometry.location.lat());
                    $(this).attr("data-geo-lng", result.geometry.location.lng());
                    $(googleMapPlaceHolder).attr("data-geo-lat", result.geometry.location.lat());
                    $(googleMapPlaceHolder).attr("data-geo-lng", result.geometry.location.lng());
                }).bind("geocode:dragged", function(event, latLng) {
                    $(this).attr("data-geo-lat", latLng.lat());
                    $(this).attr("data-geo-lng", latLng.lng());
                    $(googleMapPlaceHolder).attr("data-geo-lat", result.geometry.location.lat());
                    $(googleMapPlaceHolder).attr("data-geo-lng", result.geometry.location.lng());
                });
                searchbutton.click(function() {
                    searchInputField.trigger("geocode");
                });
            });
            this._initAddressOnchangeEvent();
        }
    },
    _initAddressCountryStateCityLoad: function() {
        if ($('.viamagus-address').length) {
            this.loadMasterCountryStateCityList();
        }
        if ($('.viamagus-address-clear-values').length) {
            this.initClearAddressEvent();
        }
    },
    _initAddressOnchangeEvent: function() {
        $('.viamagus-address-input').unbind();
        $('.viamagus-address-input').change(function(e) {
            $('.viamagus-address').each(function(index, e) {
                var captureMap = $(e).attr("data-capture-map");
                var compId = '#' + $(e).attr("data-comp-id");
                if (captureMap == "true") {
                    var addressLineOne = $(compId + "_Line_One").val();
                    var addressLineTwo = $(compId + "_Line_Two").val();
                    var city = $(compId + "_city").val();
                    var state = $(compId + "_state").val();
                    var country = $(compId + "_country").val();
                    var pincode = $(compId + "_pincode").val();
                    var address = (addressLineOne != '' ? addressLineOne : "") + (addressLineTwo != '' ? "," + addressLineTwo : "") + (city != '' ? "," + city : "") + (state != '' ? "," + state + " " : "") + (pincode != '' ? pincode : "") + (country != '' ? "," + country : "");
                    $(compId + "_Map_Location").val(address);
                }
            });
        });
    },
    _initOTPGenerateEvents: function() {
        var that = this;
        if ($('.viamagus-otp-section').length) {
            $('.generate-otp-button').unbind();
            $('.generate-otp-button').click(function(e) {
                var customerPhoneFieldId = $(this).attr("data-phone-id");
                var phoneNo = $('#' + customerPhoneFieldId).val();
                if (phoneNo == "") {
                    alert("Please enter the phone no.");
                    return;
                }
                that.sendOtpToCustomer(phoneNo, customerPhoneFieldId, $(this));
                $(this).text("Resend OTP");
            });
            $('.viamagus-otp-input-validate').unbind();
            $('.viamagus-otp-input-validate').click(function(e) {
                var customerPhoneFieldId = $(this).attr("data-phone-id");
                var userEnteredOTP = $('#' + customerPhoneFieldId + '-otp').val();
                that.validateOTPEnteredByCustomer(userEnteredOTP, customerPhoneFieldId, $(this))
            });
        }
    },
    _initEmailOTPGenerateEvents: function() {
        var that = this;
        if ($('.viamagus-email-otp-section').length) {
            $('.generate-email-otp-button').unbind();
            $('.generate-email-otp-button').click(function(e) {
                var customerEmailFieldId = $(this).attr("data-email-id");
                var emailId = $('#' + customerEmailFieldId).val();
                if (emailId == "") {
                    alert("Please enter the email id.");
                    return;
                }
                that.sendEmailOtpToCustomer(emailId, customerEmailFieldId, $(this));
                $(this).text("Resend OTP");
            });
            $('.viamagus-email-otp-input-validate').unbind();
            $('.viamagus-email-otp-input-validate').click(function(e) {
                var customerEmailFieldId = $(this).attr("data-email-id");
                var userEnteredOTP = $('#' + customerEmailFieldId + '-email-otp').val();
                that.validateEmailOTPEnteredByCustomer(userEnteredOTP, customerEmailFieldId, $(this))
            });
        }
    },
    sendOtpToCustomer: function(phoneNo, phoneObjId, generateBtn) {
        var that = this;
        if (phoneNo != "") {
            phoneNo = phoneNo.replace("+", "");
            phoneNo = phoneNo.replace(/ /g, "");
            var url = that._contextPath + '/REST/communication/sendOTPToCustomer';
            $.ajax({
                url: url,
                data: {
                    customerPhone: phoneNo
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                $('#' + phoneObjId + "-otp-validate-section").show();
                $('#' + phoneObjId + '-otp-generate-required').hide();
                $('#' + phoneObjId + '-otp-generate-message').show();
                generateBtn.hide();
                that.startOTPTimer(2 * 60, $('#' + phoneObjId + '-otp-counter'), function() {
                    if ($('#' + phoneObjId + '-otp').attr("data-otp-validation-status") != "success") {
                        generateBtn.show();
                        $('#' + phoneObjId + '-otp-generate-message').hide();
                    }
                });
            });
        }
    },
    sendEmailOtpToCustomer: function(emailId, emailObjId, generateBtn) {
        var that = this;
        if (emailId != "") {
            var url = that._contextPath + '/REST/communication/sendEmailOTPToCustomer';
            $.ajax({
                url: url,
                data: {
                    customerEmail: emailId
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                $('#' + emailObjId + "-email-otp-validate-section").show();
                $('#' + emailObjId + '-email-otp-generate-required').hide();
                $('#' + emailObjId + '-email-otp-generate-message').show();
                generateBtn.hide();
                that.startOTPTimer(2 * 60, $('#' + emailObjId + '-email-otp-counter'), function() {
                    if ($('#' + emailObjId + '-email-otp').attr("data-otp-validation-status") != "success") {
                        generateBtn.show();
                        $('#' + emailObjId + '-email-otp-generate-message').hide();
                    }
                });
            });
        }
    },
    validateOTPEnteredByCustomer: function(userEnteredOtp, phoneObjId, validateBtn) {
        var that = this;
        if (userEnteredOtp != "") {
            var otpType = "phone";
            var url = that._contextPath + '/REST/communication/validateOTP';
            $.ajax({
                url: url,
                data: {
                    userEnteredOTP: userEnteredOtp,
                    otpType: otpType
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result && data.result == "Y") {
                    $('#' + phoneObjId + '-otp').attr("data-otp-validation-status", "success");
                    $('#' + phoneObjId + '-otp-success-msg').show();
                    $('#' + phoneObjId + '-otp-error-msg').hide();
                    $('#' + phoneObjId + '-otp-generate-btn').hide();
                    $('#' + phoneObjId + '-otp-generate-required').hide();
                    $('#' + phoneObjId).attr("readonly", "readonly");
                    $('#' + phoneObjId + '-otp-validate-section').hide();
                    $('#' + phoneObjId + '-otp-generate-btn').hide();
                } else {
                    $('#' + phoneObjId + '-otp-success-msg').hide();
                    $('#' + phoneObjId + '-otp-error-msg').show();
                    $('#' + phoneObjId + '-otp-generate-btn').show();
                    $('#' + phoneObjId).removeAttr("readonly");
                    $('#' + phoneObjId + '-otp').removeAttr("readonly");
                    validateBtn.removeAttr("disabled");
                }
                $('#' + phoneObjId + '-otp-generate-message').hide();
            }).fail(function() {
                $('#' + phoneObjId + '-otp-error-msg').show();
            });
            ;
        }
    },
    validateEmailOTPEnteredByCustomer: function(userEnteredOtp, emailObjId, validateBtn) {
        var that = this;
        var otpType = "email";
        if (userEnteredOtp != "") {
            var url = that._contextPath + '/REST/communication/validateOTP';
            $.ajax({
                url: url,
                data: {
                    userEnteredOTP: userEnteredOtp,
                    otpType: otpType,
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result && data.result == "Y") {
                    $('#' + emailObjId + '-email-otp').attr("data-otp-validation-status", "success");
                    $('#' + emailObjId + '-email-otp-success-msg').show();
                    $('#' + emailObjId + '-email-otp-error-msg').hide();
                    $('#' + emailObjId + '-email-otp-generate-btn').hide();
                    $('#' + emailObjId + '-email-otp-generate-required').hide();
                    $('#' + emailObjId).attr("readonly", "readonly");
                    $('#' + emailObjId + '-email-otp-validate-section').hide();
                    $('#' + emailObjId + '-email-otp-generate-btn').hide();
                } else {
                    $('#' + emailObjId + '-email-otp-success-msg').hide();
                    $('#' + emailObjId + '-email-otp-error-msg').show();
                    $('#' + emailObjId + '-email-otp-generate-btn').hide();
                    $('#' + emailObjId).removeAttr("readonly");
                    $('#' + emailObjId + '-email-otp').removeAttr("readonly");
                    validateBtn.removeAttr("disabled");
                }
                $('#' + emailObjId + '-email-otp-generate-message').hide();
            }).fail(function() {
                $('#' + emailObjId + '-email-otp-error-msg').show();
            });
            ;
        }
    },
    startOTPTimer: function(duration, display, callback) {
        var timer = duration, minutes, seconds;
        display.text("");
        var otpTimer = setInterval(function() {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.text(minutes + ":" + seconds);
            if (--timer == 0) {
                if (callback) {
                    callback();
                }
            } else if (timer < -1) {
                clearInterval(otpTimer);
            }
        }, 1000);
    },
    _initGoogleDistanceCalculator: function() {
        var that = this;
        if ($('.viamagus-form-google-distance-calculator').length) {
            $('.viamagus-form-google-distance-calculator').each(function(index, e) {
                var compId = $(e).attr("data-comp-id");
                var sourceLocationObj = $('#' + compId + "_Source");
                var destinationLocationObj = $('#' + compId + "_Destination");
                var showMap = $(e).attr("data-show-map");
                var showDistance = $(e).attr("data-show-distance");
                sourceLocationObj.geocomplete().bind("geocode:result", function(event, result) {
                    $(this).attr("data-geo-lat", result.geometry.location.lat());
                    $(this).attr("data-geo-lng", result.geometry.location.lng());
                    that._initGoogleDirection(sourceLocationObj, destinationLocationObj, compId, showMap, showDistance);
                });
                destinationLocationObj.geocomplete().bind("geocode:result", function(event, result) {
                    $(this).attr("data-geo-lat", result.geometry.location.lat());
                    $(this).attr("data-geo-lng", result.geometry.location.lng());
                    that._initGoogleDirection(sourceLocationObj, destinationLocationObj, compId, showMap, showDistance);
                });
                that._initGoogleDirection(sourceLocationObj, destinationLocationObj, compId, showMap, showDistance);
            });
        }
    },
    _initGoogleDirection: function(sourceObj, destinationObj, fieldId, showMap, showDistance) {
        var that = this;
        var origin, destination = null;
        if (showMap == "true") {
            var map = new google.maps.Map(document.getElementById(fieldId + '_Map'),{
                zoom: 4,
                center: {
                    lat: 19.1376666,
                    lng: 79.0811348
                }
            });
            $('body').append('<input type="hidden" name="totalDistanceInKm" id="totalDistanceInKm" >');
            document.getElementById(fieldId + '_Display_Panel').style.display = 'none';
            if (sourceObj.attr("data-geo-lat") != "" && sourceObj.attr("data-geo-lng") != "") {
                origin = new google.maps.LatLng(sourceObj.attr("data-geo-lat"),sourceObj.attr("data-geo-lng"));
            }
            if (destinationObj.attr("data-geo-lat") != "" && destinationObj.attr("data-geo-lng") != "") {
                destination = new google.maps.LatLng(destinationObj.attr("data-geo-lat"),destinationObj.attr("data-geo-lng"));
            }
            if (origin != null && destination != null) {
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer({
                    draggable: true,
                    map: map,
                    panel: document.getElementById(fieldId + '__Display_Panel')
                });
                directionsDisplay.addListener('directions_changed', function() {
                    that._computeTotalDistance(directionsDisplay.getDirections(), fieldId, showDistance, sourceObj, destinationObj);
                });
                that._displayRoute(origin, destination, directionsService, directionsDisplay);
            }
        }
    },
    _displayRoute: function(origin, destination, service, display, fieldId) {
        var that = this;
        service.route({
            origin: origin,
            destination: destination,
            waypoints: [],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                display.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
    },
    _computeTotalDistance: function(result, fieldId, showDistance, sourceObj, destinationObj) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        var dstlatlng = {
            lat: result.request.destination.lat(),
            lng: result.request.destination.lng()
        };
        var srclatlng = {
            lat: result.request.origin.lat(),
            lng: result.request.origin.lng()
        };
        var srcgeocoder = new google.maps.Geocoder;
        var dstgeocoder = new google.maps.Geocoder;
        srcgeocoder.geocode({
            'location': srclatlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    sourceObj.val(results[1].formatted_address);
                }
            }
        });
        dstgeocoder.geocode({
            'location': dstlatlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    destinationObj.val(results[1].formatted_address);
                }
            }
        });
        total = total / 1000;
        if (showDistance == "true") {
            if (total == 0) {
                document.getElementById(fieldId + '_Display_Panel').style.display = 'none';
            } else {
                document.getElementById(fieldId + '_Display_Panel').style.display = 'block';
                document.getElementById(fieldId + '_distance').innerHTML = total + ' km';
                if ($('#totalDistanceInKm').length) {
                    $('#totalDistanceInKm').val(total);
                    $('#totalDistanceInKm').trigger('change');
                }
            }
        }
    },
    _loadCustomPaymentCurrencyList: function() {
        var that = this;
        if ($('.vm-custom-payment-currency').length) {
            $.ajax({
                url: that._contextPath + '/REST/ecommerce/currencylist/',
                type: 'POST',
                data: {
                    format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result != null && data.result.length) {
                    $('.vm-custom-payment-currency').empty();
                    for (var i = 0; i < data.result.length; i++) {
                        var option = new Option(data.result[i].currencyCode,data.result[i].currencyCode)
                        if ("Y" == data.result[i].isSelected) {
                            $(option).attr("selected", "selected");
                        }
                        $(option).attr("data-currency-symbol", data.result[i].currencySymbol);
                        $('.vm-custom-payment-currency').append(option);
                    }
                }
            });
        }
    },
    _loadDirectPaymentCurrencyList: function(callback) {
        var that = this;
        if ($('.vm-direct-payment-currency').length) {
            $.ajax({
                url: that._contextPath + '/REST/ecommerce/currencylist/',
                type: 'POST',
                data: {
                    format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result != null && data.result.length) {
                    $('.vm-direct-payment-currency').empty();
                    var passedOnCurrency = $('.vm-direct-payment-currency').attr("data-payment-currency");
                    for (var i = 0; i < data.result.length; i++) {
                        var option = new Option(data.result[i].currencyCode,data.result[i].currencyCode)
                        if (passedOnCurrency == data.result[i].currencyCode) {
                            $(option).attr("selected", "selected");
                        }
                        $(option).attr("data-currency-symbol", data.result[i].currencySymbol);
                        $('.vm-direct-payment-currency').append(option);
                    }
                    that.registerOnPaymentCurrecyChangeEvent();
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    },
    registerOnPaymentCurrecyChangeEvent: function() {
        var that = this;
        $('.vm-direct-payment-currency').unbind();
        $('.vm-direct-payment-currency').change(function(e) {
            that._loadPaymentMode();
        });
    },
    loadMasterCountryStateCityList: function() {
        var that = this;
        if ($('.vm-country-list').length) {
            $('.vm-country-list').each(function(index, e) {
                $.ajax({
                    url: that._contextPath + '/REST/general/countrylist/',
                    type: 'POST',
                    data: {
                        format: 'json'
                    },
                    dataType: 'jsonp',
                    jsonp: 'jsonCallback'
                }).done(function(data) {
                    if (data.result != null && data.result.length) {
                        $(e).empty();
                        var selectedCountryName = $(e).attr("data-country-name");
                        var defaultCountry = $(e).attr("data-default-country");
                        $(e).append(new Option("Select Country",""));
                        for (var i = 0; i < data.result.length; i++) {
                            var option = new Option(data.result[i].countryName,data.result[i].countryName);
                            $(option).attr("data-country-id", data.result[i].countryId);
                            $(option).attr("data-country-code", data.result[i].countryCode);
                            if (selectedCountryName != "" && selectedCountryName == data.result[i].countryName) {
                                $(option).attr("selected", "selected");
                                that.loadStateList($(option).attr("data-country-id"), $(e).attr("id").replace("country", "state"));
                            }
                            $(e).append(option);
                        }
                        if (defaultCountry != "" && defaultCountry == "true") {
                            that.fetchUserCountryBasedOnIp($(e).attr("id"));
                        }
                        that.registerOnCountryChangeEvent();
                    }
                });
            });
        }
    },
    registerOnCountryChangeEvent: function() {
        var that = this;
        if ($('.vm-country-list').length) {
            $('.vm-country-list').unbind();
            $('.vm-country-list').change(function(e) {
                that.loadStateList($(this).find('option:selected').attr("data-country-id"), $(this).attr("id").replace("country", "state"));
            });
        }
    },
    loadStateList: function(countryId, stateObjId) {
        var that = this;
        if ($('#' + stateObjId).length) {
            $.ajax({
                url: that._contextPath + '/REST/general/statelist/',
                type: 'POST',
                data: {
                    format: 'json',
                    countryId: countryId
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result != null && data.result.length) {
                    $('#' + stateObjId).empty();
                    var selectedStateName = $('#' + stateObjId).attr("data-state-name");
                    $('#' + stateObjId).append(new Option("Select State",""));
                    for (var i = 0; i < data.result.length; i++) {
                        var option = new Option(data.result[i].stateName,data.result[i].stateName);
                        $(option).attr("data-state-id", data.result[i].stateId);
                        $(option).attr("data-state-code", data.result[i].stateCode);
                        if (selectedStateName != "" && selectedStateName == data.result[i].stateName) {
                            $(option).attr("selected", "selected");
                            that.loadCityList($(option).attr("data-state-id"));
                        }
                        $('#' + stateObjId).append(option);
                    }
                }
            });
        }
    },
    registerOnStateChangeEvent: function() {
        var that = this;
        if ($('.vm-state-list').length) {
            $('.vm-state-list').unbind();
            $('.vm-state-list').change(function(e) {
                that.loadCityList($(this).find('option:selected').attr("data-state-id"));
            });
        }
    },
    loadCityList: function(stateId) {
        var that = this;
        if ($('.vm-city-list').length) {
            $.ajax({
                url: that._contextPath + '/REST/general/citylist/',
                type: 'POST',
                data: {
                    format: 'json',
                    stateId: stateId
                },
                dataType: 'jsonp',
                jsonp: 'jsonCallback'
            }).done(function(data) {
                if (data.result != null && data.result.length) {
                    $('.vm-city-list').empty();
                    var selectedCityName = $('.vm-state-list').attr("data-city-name");
                    for (var i = 0; i < data.result.length; i++) {
                        var option = new Option(data.result[i].cityName,data.result[i].cityName)
                        if (selectedCityName != "" && selectedCityName == data.result[i].cityName) {
                            $(option).attr("selected", "selected");
                        }
                        $(option).attr("data-city-id", data.result[i].cityId);
                        $('.vm-city-list').append(option);
                    }
                }
            });
        }
    },
    initOnPaymentModeChangeEvent: function() {
        var that = this;
        $('input[type=radio][name=paymentMode]').unbind();
        $('input[type=radio][name=paymentMode]').on('change', function() {
            that.loadAdditionalChargeDetails($(this).val());
        });
        window.setTimeout(function() {
            that.loadAdditionalChargeDetails($('input[name="paymentMode"]:checked').val());
        }, 1500);
    },
    loadAdditionalChargeDetails: function(paymentMode) {
        var that = this;
        var originalPaymentAmount = $('#paymentAmount').attr("data-payment-amount");
        $.ajax({
            url: that._contextPath + '/REST/payment/getAdditionalChargeDetails/',
            type: 'POST',
            data: {
                format: 'json',
                paymentMode: paymentMode,
                paymentAmount: originalPaymentAmount,
                paymentCurrency: $('#paymentCurrency').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != null) {
                if ($('#additionalChargeAmount').length) {
                    if (data.result.chargeAmount != "" && parseFloat(data.result.chargeAmount) > 0) {
                        if (originalPaymentAmount != 'undefined' && originalPaymentAmount != "") {
                            $('.vm-additional-charge-amt').show();
                            $('#additionalChargeAmount').val(data.result.chargeAmount);
                            $('.vm-additional-charge-amt-value').html(data.result.chargeAmount);
                            $('#additionalChargeMessage').val(data.result.emailMessage);
                            $('#additionalChargeName').val(data.result.chargeName);
                            $('#checkOutSummaryTotalNumber').html(data.result.totalPayableAmount);
                            $('#paymentAmount').val(data.result.totalPayableAmount);
                            $('.vm-additional-charge-name').html(data.result.chargeName);
                            if (data.result.message != "") {
                                $('.vm-additional-charge-section').html(data.result.message + " Total Amount:" + data.result.totalPayableAmount + " " + $('#paymentCurrency').val());
                            }
                            $('.vm-format-number').number(true, 2);
                        }
                    }
                }
            } else {
                $('.vm-additional-charge-amt').hide();
                $('#checkOutSummaryTotalNumber').html(originalPaymentAmount);
                $('#paymentAmount').val(originalPaymentAmount);
                $('#additionalChargeMessage').val('');
                $('#additionalChargeName').val('');
                $('#additionalChargeAmount').val('');
                $('.vm-additional-charge-section').html('');
            }
        });
    },
    initOnPaymentModeEcommChangeEvent: function() {
        var that = this;
        $('input[type=radio][name=paymentMode]').unbind();
        $('input[type=radio][name=paymentMode]').on('change', function() {
            that.loadEcommerceAdditionalChargeDetails($(this).val());
        });
        window.setTimeout(function() {
            that.loadEcommerceAdditionalChargeDetails($('input[name="paymentMode"]:checked').val());
        }, 1500);
    },
    loadEcommerceAdditionalChargeDetails: function(paymentMode) {
        var that = this;
        var originalPaymentAmount = $('#paymentAmount').attr("data-payment-amount");
        $.ajax({
            url: that._contextPath + '/REST/payment/getAdditionalChargeDetails/',
            type: 'POST',
            data: {
                format: 'json',
                paymentMode: paymentMode,
                paymentAmount: originalPaymentAmount,
                paymentCurrency: $('#paymentCurrency').val()
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != null) {
                if ($('#additionalChargeAmount').length) {
                    if (data.result.chargeAmount != "" && parseFloat(data.result.chargeAmount) > 0) {
                        if (originalPaymentAmount != 'undefined' && originalPaymentAmount != "") {
                            $('#orderSummaryAdditionalChargeRow').show();
                            $('#cartAdditionalChargeName').html(data.result.chargeName);
                            $('#cartAdditionalChargeAmount').html(data.result.chargeAmount);
                            $('#shoppingCartTotal').html(data.result.totalPayableAmount);
                            $('vm-additional-charge-amt').show();
                            $('#additionalChargeAmount').val(data.result.chargeAmount);
                            $('.vm-additional-charge-amt-value').html(data.result.chargeAmount);
                            $('#additionalChargeMessage').val(data.result.emailMessage);
                            $('#additionalChargeName').val(data.result.chargeName);
                            $('#checkOutSummaryTotalNumber').html(data.result.totalPayableAmount);
                            $('#paymentAmount').val(data.result.totalPayableAmount);
                            $('.vm-additional-charge-name').html(data.result.chargeName);
                            if (data.result.message != "") {
                                $('.vm-additional-charge-section').html(data.result.message + " Total Amount:" + data.result.totalPayableAmount + " " + $('#paymentCurrency').val());
                            }
                            if (data.result.chargeAmountInBaseCur != null || data.result.chargeAmountInBaseCur) {
                                $("#cartAdditionalChargeAmount").attr("data-additional-Charge-Amount-In-BaseCur", data.result.chargeAmountInBaseCur);
                            }
                            $('.vm-format-number').number(true, 2);
                        }
                    }
                }
            } else {
                $('#orderSummaryAdditionalChargeRow').hide();
                $('#cartAdditionalChargeName').html("");
                $('#cartAdditionalChargeAmount').html("");
                $('#shoppingCartTotal').html(originalPaymentAmount);
                $('.vm-additional-charge-amt').hide();
                $('#checkOutSummaryTotalNumber').html(originalPaymentAmount);
                $('#paymentAmount').val(originalPaymentAmount);
                $('#additionalChargeMessage').val('');
                $('#additionalChargeName').val('');
                $('#additionalChargeAmount').val('');
                $('.vm-additional-charge-section').html('');
            }
        });
    },
    fetchUserCountryBasedOnIp: function(dropdownObjId) {
        var that = this;
        if (that._ipInfoResult == null) {
            $.getJSON("http://freegeoip.net/json/", function(result) {
                var countryName = result.country_name;
                that._ipInfoResult = result;
                $('#' + dropdownObjId.replace('country', 'state')).attr("data-state-name", result.region_name);
                $('#' + dropdownObjId.replace('country', 'city')).val(result.city);
                $('#' + dropdownObjId + ' option').each(function() {
                    if ($(this).text() == countryName) {
                        $(this).attr("selected", "selected");
                        $(this).prop("selected", true);
                        $('#' + dropdownObjId).val(countryName);
                        $('#' + dropdownObjId).trigger('change');
                    }
                });
            });
        } else {
            $('#' + dropdownObjId.replace('country', 'state')).attr("data-state-name", that._ipInfoResult.region_name);
            $('#' + dropdownObjId.replace('country', 'city')).val(that._ipInfoResult.city);
            $('#' + dropdownObjId + ' option').each(function() {
                if ($(this).text() == that._ipInfoResult.country_name) {
                    $(this).attr("selected", "selected");
                    $(this).prop("selected", true);
                    $('#' + dropdownObjId).val(that._ipInfoResult.country_name);
                    $('#' + dropdownObjId).trigger('change');
                }
            });
        }
    },
    initClearAddressEvent: function() {
        $('.viamagus-address-clear-values').unbind();
        $('.viamagus-address-clear-values').click(function(e) {
            e.preventDefault();
            var fieldId = $(this).attr("data-field-id");
            $('#' + fieldId + '_Line_One').val('');
            $('#' + fieldId + '_Line_Two').val('');
            $('#' + fieldId + '_country').val('');
            $('#' + fieldId + '_state').val('');
            $('#' + fieldId + '_city').val('');
            $('#' + fieldId + '_pincode').val('');
        });
    },
    _loadFormProductQtyInfo: function(formId, baseCurrency) {
        var that = this;
        $.ajax({
            url: that._contextPath + '/REST/formbuilder/loadFormQtyInfo',
            type: 'POST',
            data: {
                format: 'json',
                formId: formId
            },
            dataType: 'jsonp',
            jsonp: 'jsonCallback'
        }).done(function(data) {
            if (data.result != null && data.result.length > 0) {
                for (var i = 0; i < data.result.length; i++) {
                    var product = {};
                    product.name = data.result[i].productName;
                    product.availableQty = parseInt(data.result[i].maxQty) - parseInt(data.result[i].soldQty);
                    if (product.availableQty < 0) {
                        product.availableQty = 0;
                    }
                    that._productQtyInfo.push(product);
                }
                that._calculateProductAmount(formId, baseCurrency);
            }
        });
    },
    checkProductAvailability: function(productRowObj) {
        var that = this;
        var productName = productRowObj.attr("data-product-name");
        var qty = parseInt(productRowObj.find("#productQty").val());
        if (that._productQtyInfo.length > 0) {
            for (var i = 0; i < that._productQtyInfo.length; i++) {
                var product = that._productQtyInfo[i];
                if (productName == product.name) {
                    if (productRowObj.find('.vm-product-available-msg').length) {
                        productRowObj.find('.vm-product-available-msg').remove();
                    }
                    if (product.availableQty == 0) {
                        $('<p class="vm-product-available-msg" style="color:red;"> SOLD OUT </p>').insertAfter(productRowObj.find('.viamagus-product-qty'));
                        productRowObj.find("#productQty").val(0);
                        if (productRowObj.find("#productCheckBox").length) {
                            productRowObj.find("#productCheckBox").removeAttr("checked");
                            productRowObj.find("#productCheckBox").attr("disabled", "disabled");
                        }
                    } else if (qty > product.availableQty) {
                        $('<p class="vm-product-available-msg" style="color:red;"> AVAILABLE: ' + product.availableQty + ' </p>').insertAfter(productRowObj.find('.viamagus-product-qty'));
                        productRowObj.find("#productQty").val(product.availableQty);
                    }
                }
            }
        }
    },
    invokeCustomFormValidation: function() {
        if (typeof validateFormCustomValidations === "function") {
            return validateFormCustomValidations();
        }
        return true;
    }
}
