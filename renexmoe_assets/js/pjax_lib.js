(function(P){if(typeof exports=="object"&&typeof module!="undefined")module.exports=P();else if(typeof define=="function"&&define.amd)define([],P);else{var E;typeof window!="undefined"?E=window:typeof global!="undefined"?E=global:typeof self!="undefined"?E=self:E=this,E.Pjax=P()}})(function(){var P,E,N;return function(){function a(c,w,o){function e(r,d){if(!w[r]){if(!c[r]){var n=typeof require=="function"&&require;if(!d&&n)return n(r,!0);if(t)return t(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var p=w[r]={exports:{}};c[r][0].call(p.exports,function(u){var f=c[r][1][u];return e(f||u)},p,p.exports,a,c,w,o)}return w[r].exports}for(var t=typeof require=="function"&&require,s=0;s<o.length;s++)e(o[s]);return e}return a}()({1:[function(a,c,w){var o=a("./lib/execute-scripts"),e=a("./lib/foreach-els"),t=a("./lib/parse-options"),s=a("./lib/switches"),r=a("./lib/uniqueid"),d=a("./lib/events/on"),n=a("./lib/events/trigger"),i=a("./lib/util/clone"),p=a("./lib/util/contains"),u=a("./lib/util/extend"),f=a("./lib/util/noop"),m=function(v){this.state={numPendingSwitches:0,href:null,options:null},this.options=t(v),this.log("Pjax options",this.options),this.options.scrollRestoration&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),this.maxUid=this.lastUid=r(),this.parseDOM(document),d(window,"popstate",function(l){if(l.state){var b=i(this.options);b.url=l.state.url,b.title=l.state.title,b.history=!1,b.scrollPos=l.state.scrollPos,l.state.uid<this.lastUid?b.backward=!0:b.forward=!0,this.lastUid=l.state.uid,this.loadUrl(l.state.url,b)}}.bind(this))};if(m.switches=s,m.prototype={log:a("./lib/proto/log"),getElements:function(v){return v.querySelectorAll(this.options.elements)},parseDOM:function(v){var l=a("./lib/proto/parse-element");e(this.getElements(v),l,this)},refresh:function(v){this.parseDOM(v||document)},reload:function(){window.location.reload()},attachLink:a("./lib/proto/attach-link"),attachForm:a("./lib/proto/attach-form"),forEachSelectors:function(v,l,b){return a("./lib/foreach-selectors").bind(this)(this.options.selectors,v,l,b)},switchSelectors:function(v,l,b,g){return a("./lib/switches-selectors").bind(this)(this.options.switches,this.options.switchesOptions,v,l,b,g)},latestChance:function(v){window.location=v},onSwitch:function(){n(window,"resize scroll"),this.state.numPendingSwitches--,this.state.numPendingSwitches===0&&this.afterAllSwitches()},loadContent:function(v,l){if(typeof v!="string"){n(document,"pjax:complete pjax:error",l);return}var b=document.implementation.createHTMLDocument("pjax"),g=/<html[^>]+>/gi,T=/\s?[a-z:]+(?:=['"][^'">]+['"])*/gi,y=v.match(g);if(y&&y.length&&(y=y[0].match(T),y.length&&(y.shift(),y.forEach(function(A){var S=A.trim().split("=");S.length===1?b.documentElement.setAttribute(S[0],!0):b.documentElement.setAttribute(S[0],S[1].slice(1,-1))}))),b.documentElement.innerHTML=v,this.log("load content",b.documentElement.attributes,b.documentElement.innerHTML.length),document.activeElement&&p(document,this.options.selectors,document.activeElement))try{document.activeElement.blur()}catch(A){}this.switchSelectors(this.options.selectors,b,document,l)},abortRequest:a("./lib/abort-request"),doRequest:a("./lib/send-request"),handleResponse:a("./lib/proto/handle-response"),loadUrl:function(v,l){l=typeof l=="object"?u({},this.options,l):i(this.options),this.log("load href",v,l),this.abortRequest(this.request),n(document,"pjax:send",l),this.request=this.doRequest(v,l,this.handleResponse.bind(this))},afterAllSwitches:function(){var v=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();v&&document.activeElement!==v&&v.focus(),this.options.selectors.forEach(function(A){e(document.querySelectorAll(A),function(S){o(S)})});var l=this.state;if(l.options.history&&(window.history.state||(this.lastUid=this.maxUid=r(),window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid,scrollPos:[0,0]},document.title)),this.lastUid=this.maxUid=r(),window.history.pushState({url:l.href,title:l.options.title,uid:this.maxUid,scrollPos:[0,0]},l.options.title,l.href)),this.forEachSelectors(function(A){this.parseDOM(A)},this),n(document,"pjax:complete pjax:success",l.options),typeof l.options.analytics=="function"&&l.options.analytics(),l.options.history){var b=document.createElement("a");if(b.href=this.state.href,b.hash){var g=b.hash.slice(1);g=decodeURIComponent(g);var T=0,y=document.getElementById(g)||document.getElementsByName(g)[0];if(y&&y.offsetParent)do T+=y.offsetTop,y=y.offsetParent;while(y);window.scrollTo(0,T)}else l.options.scrollTo!==!1&&(l.options.scrollTo.length>1?window.scrollTo(l.options.scrollTo[0],l.options.scrollTo[1]):window.scrollTo(0,l.options.scrollTo))}else l.options.scrollRestoration&&l.options.scrollPos&&window.scrollTo(l.options.scrollPos[0],l.options.scrollPos[1]);this.state={numPendingSwitches:0,href:null,options:null}}},m.isSupported=a("./lib/is-supported"),m.isSupported())c.exports=m;else{var h=f;for(var x in m.prototype)m.prototype.hasOwnProperty(x)&&typeof m.prototype[x]=="function"&&(h[x]=f);c.exports=h}},{"./lib/abort-request":2,"./lib/events/on":4,"./lib/events/trigger":5,"./lib/execute-scripts":6,"./lib/foreach-els":7,"./lib/foreach-selectors":8,"./lib/is-supported":9,"./lib/parse-options":10,"./lib/proto/attach-form":11,"./lib/proto/attach-link":12,"./lib/proto/handle-response":13,"./lib/proto/log":14,"./lib/proto/parse-element":15,"./lib/send-request":16,"./lib/switches":18,"./lib/switches-selectors":17,"./lib/uniqueid":19,"./lib/util/clone":20,"./lib/util/contains":21,"./lib/util/extend":22,"./lib/util/noop":23}],2:[function(a,c,w){var o=a("./util/noop");c.exports=function(e){e&&e.readyState<4&&(e.onreadystatechange=o,e.abort())}},{"./util/noop":23}],3:[function(a,c,w){c.exports=function(o){var e=o.text||o.textContent||o.innerHTML||"",t=o.src||"",s=o.parentNode||document.querySelector("head")||document.documentElement,r=document.createElement("script");if(e.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can\u2019t be executed correctly. Code skipped ",o),!1;if(r.type="text/javascript",r.id=o.id,t!==""&&(r.src=t,r.async=!1),e!=="")try{r.appendChild(document.createTextNode(e))}catch(d){r.text=e}return s.appendChild(r),(s instanceof HTMLHeadElement||s instanceof HTMLBodyElement)&&s.contains(r)&&s.removeChild(r),!0}},{}],4:[function(a,c,w){var o=a("../foreach-els");c.exports=function(e,t,s,r){t=typeof t=="string"?t.split(" "):t,t.forEach(function(d){o(e,function(n){n.addEventListener(d,s,r)})})}},{"../foreach-els":7}],5:[function(a,c,w){var o=a("../foreach-els");c.exports=function(e,t,s){t=typeof t=="string"?t.split(" "):t,t.forEach(function(r){var d;d=document.createEvent("HTMLEvents"),d.initEvent(r,!0,!0),d.eventName=r,s&&Object.keys(s).forEach(function(n){d[n]=s[n]}),o(e,function(n){var i=!1;!n.parentNode&&n!==document&&n!==window&&(i=!0,document.body.appendChild(n)),n.dispatchEvent(d),i&&n.parentNode.removeChild(n)})})}},{"../foreach-els":7}],6:[function(a,c,w){var o=a("./foreach-els"),e=a("./eval-script");c.exports=function(t){t.tagName.toLowerCase()==="script"&&e(t),o(t.querySelectorAll("script"),function(s){(!s.type||s.type.toLowerCase()==="text/javascript")&&(s.parentNode&&s.parentNode.removeChild(s),e(s))})}},{"./eval-script":3,"./foreach-els":7}],7:[function(a,c,w){c.exports=function(o,e,t){return o instanceof HTMLCollection||o instanceof NodeList||o instanceof Array?Array.prototype.forEach.call(o,e,t):e.call(t,o)}},{}],8:[function(a,c,w){var o=a("./foreach-els");c.exports=function(e,t,s,r){r=r||document,e.forEach(function(d){o(r.querySelectorAll(d),t,s)})}},{"./foreach-els":7}],9:[function(a,c,w){c.exports=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)}},{}],10:[function(a,c,w){var o=a("./switches");c.exports=function(t){return t=t||{},t.elements=t.elements||"a[href], form[action]",t.selectors=t.selectors||["title",".js-Pjax"],t.switches=t.switches||{},t.switchesOptions=t.switchesOptions||{},t.history=typeof t.history=="undefined"?!0:t.history,t.analytics=typeof t.analytics=="function"||t.analytics===!1?t.analytics:e,t.scrollTo=typeof t.scrollTo=="undefined"?0:t.scrollTo,t.scrollRestoration=typeof t.scrollRestoration!="undefined"?t.scrollRestoration:!0,t.cacheBust=typeof t.cacheBust=="undefined"?!0:t.cacheBust,t.debug=t.debug||!1,t.timeout=t.timeout||0,t.currentUrlFullReload=typeof t.currentUrlFullReload=="undefined"?!1:t.currentUrlFullReload,t.switches.head||(t.switches.head=o.switchElementsAlt),t.switches.body||(t.switches.body=o.switchElementsAlt),t};function e(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})}},{"./switches":18}],11:[function(a,c,w){var o=a("../events/on"),e=a("../util/clone"),t="data-pjax-state",s=function(i,p){if(n(p))return;var u=e(this.options);u.requestOptions={requestUrl:i.getAttribute("action")||window.location.href,requestMethod:i.getAttribute("method")||"GET"};var f=document.createElement("a");f.setAttribute("href",u.requestOptions.requestUrl);var m=d(f,u);if(m){i.setAttribute(t,m);return}p.preventDefault(),i.enctype==="multipart/form-data"?u.requestOptions.formData=new FormData(i):u.requestOptions.requestParams=r(i),i.setAttribute(t,"submit"),u.triggerElement=i,this.loadUrl(f.href,u)};function r(i){for(var p=[],u=i.elements,f=0;f<u.length;f++){var m=u[f],h=m.tagName.toLowerCase();if(!!m.name&&m.attributes!==void 0&&h!=="button"){var x=m.attributes.type;if(!x||x.value!=="checkbox"&&x.value!=="radio"||m.checked){var v=[];if(h==="select")for(var l,b=0;b<m.options.length;b++)l=m.options[b],l.selected&&!l.disabled&&v.push(l.hasAttribute("value")?l.value:l.text);else v.push(m.value);for(var g=0;g<v.length;g++)p.push({name:encodeURIComponent(m.name),value:encodeURIComponent(v[g])})}}}return p}function d(i,p){if(i.protocol!==window.location.protocol||i.host!==window.location.host)return"external";if(i.hash&&i.href.replace(i.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(i.href===window.location.href.split("#")[0]+"#")return"anchor-empty";if(p.currentUrlFullReload&&i.href===window.location.href.split("#")[0])return"reload"}var n=function(i){return i.defaultPrevented||i.returnValue===!1};c.exports=function(i){var p=this;i.setAttribute(t,""),o(i,"submit",function(u){s.call(p,i,u)})}},{"../events/on":4,"../util/clone":20}],12:[function(a,c,w){var o=a("../events/on"),e=a("../util/clone"),t="data-pjax-state",s=function(n,i){if(d(i))return;var p=e(this.options),u=r(n,i);if(u){n.setAttribute(t,u);return}if(i.preventDefault(),this.options.currentUrlFullReload&&n.href===window.location.href.split("#")[0]){n.setAttribute(t,"reload"),this.reload();return}n.setAttribute(t,"load"),p.triggerElement=n,this.loadUrl(n.href,p)};function r(n,i){if(i.which>1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)return"modifier";if(n.protocol!==window.location.protocol||n.host!==window.location.host)return"external";if(n.hash&&n.href.replace(n.hash,"")===window.location.href.replace(location.hash,""))return"anchor";if(n.href===window.location.href.split("#")[0]+"#")return"anchor-empty"}var d=function(n){return n.defaultPrevented||n.returnValue===!1};c.exports=function(n){var i=this;n.setAttribute(t,""),o(n,"click",function(p){s.call(i,n,p)}),o(n,"keyup",function(p){p.keyCode===13&&s.call(i,n,p)}.bind(this))}},{"../events/on":4,"../util/clone":20}],13:[function(a,c,w){var o=a("../util/clone"),e=a("../uniqueid"),t=a("../events/trigger");c.exports=function(s,r,d,n){if(n=o(n||this.options),n.request=r,s===!1){t(document,"pjax:complete pjax:error",n);return}var i=window.history.state||{};window.history.replaceState({url:i.url||window.location.href,title:i.title||document.title,uid:i.uid||e(),scrollPos:[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]},document.title,window.location.href);var p=d;r.responseURL?d!==r.responseURL&&(d=r.responseURL):r.getResponseHeader("X-PJAX-URL")?d=r.getResponseHeader("X-PJAX-URL"):r.getResponseHeader("X-XHR-Redirected-To")&&(d=r.getResponseHeader("X-XHR-Redirected-To"));var u=document.createElement("a");u.href=p;var f=u.hash;u.href=d,f&&!u.hash&&(u.hash=f,d=u.href),this.state.href=d,this.state.options=n;try{this.loadContent(s,n)}catch(m){if(t(document,"pjax:error",n),this.options.debug)throw m;return console&&console.error&&console.error("Pjax switch fail: ",m),this.latestChance(d)}}},{"../events/trigger":5,"../uniqueid":19,"../util/clone":20}],14:[function(a,c,w){c.exports=function(){this.options.debug&&console&&(typeof console.log=="function"?console.log.apply(console,arguments):console.log&&console.log(arguments))}},{}],15:[function(a,c,w){var o="data-pjax-state";c.exports=function(e){switch(e.tagName.toLowerCase()){case"a":e.hasAttribute(o)||this.attachLink(e);break;case"form":e.hasAttribute(o)||this.attachForm(e);break;default:throw"Pjax can only be applied on <a> or <form> submit"}}},{}],16:[function(a,c,w){var o=a("./util/update-query-string");c.exports=function(e,t,s){t=t||{};var r,d=t.requestOptions||{},n=(d.requestMethod||"GET").toUpperCase(),i=d.requestParams||null,p=d.formData||null,u=null,f=new XMLHttpRequest,m=t.timeout||0;if(f.onreadystatechange=function(){f.readyState===4&&(f.status===200?s(f.responseText,f,e,t):f.status!==0&&s(null,f,e,t))},f.onerror=function(h){console.log(h),s(null,f,e,t)},f.ontimeout=function(){s(null,f,e,t)},i&&i.length){r=i.map(function(h){return h.name+"="+h.value}).join("&");switch(n){case"GET":e=e.split("?")[0],e+="?"+r;break;case"POST":u=r;break}}else p&&(u=p);return t.cacheBust&&(e=o(e,"t",Date.now())),f.open(n,e,!0),f.timeout=m,f.setRequestHeader("X-Requested-With","PJAX_MODIFY"),f.setRequestHeader("X-PJAX","true"),f.setRequestHeader("X-PJAX-Selectors",JSON.stringify(t.selectors)),u&&n==="POST"&&!p&&f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),f.send(u),f}},{"./util/update-query-string":24}],17:[function(a,c,w){var o=a("./foreach-els"),e=a("./switches");c.exports=function(t,s,r,d,n,i){var p=[];r.forEach(function(u){var f=d.querySelectorAll(u),m=n.querySelectorAll(u);if(this.log&&this.log("Pjax switch",u,f,m),f.length!==m.length)throw"DOM doesn\u2019t look the same on new loaded page: \u2019"+u+"\u2019 - new "+f.length+", old "+m.length;o(f,function(h,x){var v=m[x];this.log&&this.log("newEl",h,"oldEl",v);var l=t[u]?t[u].bind(this,v,h,i,s[u]):e.outerHTML.bind(this,v,h,i);p.push(l)},this)},this),this.state.numPendingSwitches=p.length,p.forEach(function(u){u()})}},{"./foreach-els":7,"./switches":18}],18:[function(a,c,w){var o=a("./events/on");c.exports={outerHTML:function(e,t){e.outerHTML=t.outerHTML,this.onSwitch()},innerHTML:function(e,t){e.innerHTML=t.innerHTML,t.className===""?e.removeAttribute("class"):e.className=t.className,this.onSwitch()},switchElementsAlt:function(e,t){if(e.innerHTML=t.innerHTML,t.hasAttributes())for(var s=t.attributes,r=0;r<s.length;r++)e.attributes.setNamedItem(s[r].cloneNode());this.onSwitch()},replaceNode:function(e,t){e.parentNode.replaceChild(t,e),this.onSwitch()},sideBySide:function(e,t,s,r){var d=Array.prototype.forEach,n=[],i=[],p=document.createDocumentFragment(),u="animationend webkitAnimationEnd MSAnimationEnd oanimationend",f=0,m=function(h){if(h.target!==h.currentTarget)return;f--,f<=0&&n&&(n.forEach(function(x){x.parentNode&&x.parentNode.removeChild(x)}),i.forEach(function(x){x.className=x.className.replace(x.getAttribute("data-pjax-classes"),""),x.removeAttribute("data-pjax-classes")}),i=null,n=null,this.onSwitch())}.bind(this);r=r||{},d.call(e.childNodes,function(h){n.push(h),h.classList&&!h.classList.contains("js-Pjax-remove")&&(h.hasAttribute("data-pjax-classes")&&(h.className=h.className.replace(h.getAttribute("data-pjax-classes"),""),h.removeAttribute("data-pjax-classes")),h.classList.add("js-Pjax-remove"),r.callbacks&&r.callbacks.removeElement&&r.callbacks.removeElement(h),r.classNames&&(h.className+=" "+r.classNames.remove+" "+(s.backward?r.classNames.backward:r.classNames.forward)),f++,o(h,u,m,!0))}),d.call(t.childNodes,function(h){if(h.classList){var x="";r.classNames&&(x=" js-Pjax-add "+r.classNames.add+" "+(s.backward?r.classNames.forward:r.classNames.backward)),r.callbacks&&r.callbacks.addElement&&r.callbacks.addElement(h),h.className+=x,h.setAttribute("data-pjax-classes",x),i.push(h),p.appendChild(h),f++,o(h,u,m,!0)}}),e.className=t.className,e.appendChild(p)}}},{"./events/on":4}],19:[function(a,c,w){c.exports=function(){var o=0;return function(){var e="pjax"+new Date().getTime()+"_"+o;return o++,e}}()},{}],20:[function(a,c,w){c.exports=function(o){if(o===null||typeof o!="object")return o;var e=o.constructor();for(var t in o)o.hasOwnProperty(t)&&(e[t]=o[t]);return e}},{}],21:[function(a,c,w){c.exports=function(e,t,s){for(var r=0;r<t.length;r++)for(var d=e.querySelectorAll(t[r]),n=0;n<d.length;n++)if(d[n].contains(s))return!0;return!1}},{}],22:[function(a,c,w){c.exports=function(o){if(o==null)return null;for(var e=Object(o),t=1;t<arguments.length;t++){var s=arguments[t];if(s!=null)for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}},{}],23:[function(a,c,w){c.exports=function(){}},{}],24:[function(a,c,w){c.exports=function(o,e,t){var s=new RegExp("([?&])"+e+"=.*?(&|$)","i"),r=o.indexOf("?")!==-1?"&":"?";return o.match(s)?o.replace(s,"$1"+e+"="+t+"$2"):o+r+e+"="+t}},{}]},{},[1])(1)});export default Pjax;