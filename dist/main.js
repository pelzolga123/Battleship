!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=(t,e)=>{const n=document.getElementById("content"),r=document.createElement("div"),o=document.createElement("table");r.setAttribute("id","drag-container"),o.setAttribute("draggable","true"),o.setAttribute("class","ships"),o.setAttribute("id",`${e}`);for(let e=0;e<t;e+=1){const t=document.createElement("td");o.appendChild(t)}r.appendChild(o),n.appendChild(r)};var o=()=>{const t=document.querySelectorAll(".ships"),e=document.querySelectorAll(".cell");function n(t){t.dataTransfer.setData("text",t.target.id)}function r(t){t.target.classList.contains("dropped")||t.preventDefault()}function o(e){e.preventDefault();e.dataTransfer.getData("text");this.innerHtml=e.target.id,document.getElementById(e.target.id).setAttribute("colSpan","2"),this.append(t[0])}t.forEach(t=>{t.addEventListener("dragstart",n)}),e.forEach(t=>{t.addEventListener("dragover",r),t.addEventListener("drop",o)})};(()=>{const t=document.getElementById("content"),e=document.createElement("table");e.setAttribute("border",1),e.setAttribute("id","board");for(let t=0;t<10;t+=1){const n=document.createElement("tr");e.appendChild(n);for(let e=0;e<10;e+=1){const r=document.createElement("td");r.setAttribute("class","cell");const o=t.toString()+e.toString();r.setAttribute("id",o),n.appendChild(r)}}t.appendChild(e)})(),r(2,"1"),o()}]);