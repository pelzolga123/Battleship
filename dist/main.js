!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=0,r=2;let o=0,l=0;const u=[5,4,3,3,2],c=[],s=[],f=[];let i=0;const a=10,d=["ship","miss","hit"];let m,g,p="comp";const y=(()=>{const e=new Set;for(let t=0;t<=500;t+=1){const t=T(),n=`${t[0]}${t[1]}`;e.add(n)}return e})(),b=e=>{const t=document.getElementById("player-board");for(let e=0;e<t.rows.length;e+=1)for(let n=0;n<t.rows[e].cells.length;n+=1){t.rows[e].cells[n].setAttribute("class",`${e}${n}`)}for(;void 0!==h(e);)return h(e);return document.getElementsByClassName(e)[0].id},h=e=>{let t;return void 0!==e&&(t=document.getElementsByClassName(e)[0].id),t},v=e=>{setTimeout(()=>{const t=document.getElementsByClassName(e);for(let e=0;e<=t.length;e+=1)t[e].style.background="red",console.log(t[e])},1500)},M=e=>{setTimeout(()=>{const t=document.getElementsByClassName(e);for(let e=0;e<=t.length;e+=1)t[e].style.background="green",console.log(t[e])},1500)},E=()=>{return(()=>{const e=y.values().next().value;return y.delete(e),e})()};function L(){for(let e=0;e<a;e+=1){c[e]=[];for(let t=0;t<a;t+=1)c[e][t]=null}!function(){let e,t,n;for(let r=0,o=u.length;r<o;r+=1)for(t=!1,n=j();!t;)e=T(),t=O(e,u[r],n)}(),function(){const e=[];for(let t=0;t<a;t+=1){s[t]=[];for(let n=0;n<a;n+=1)s[t][n]=0,c[n][t]===r&&e.push([n,t])}}(),function(){let e="";for(let t=0;t<a;t+=1){e+="<tr>";for(let n=0;n<a;n+=1){const r=c[n][t];e+='<td id="',null!==r&&(e+=d[r]),e+='">',e+="</td>"}e+="</tr>"}m.innerHTML=e}()}function B(){for(let e=0;e<a;e+=1){c[e]=[];for(let t=0;t<a;t+=1)c[e][t]=null}!function(){let e,t,n;for(let r=0,o=u.length;r<o;r+=1)for(t=!1,n=j();!t;)e=T(),t=O(e,u[r],n)}(),function(){const e=[];for(let t=0;t<a;t+=1){f[t]=[];for(let n=0;n<a;n+=1)f[t][n]=0,c[n][t]===r&&e.push([n,t])}}(),function(){let e="";for(let t=0;t<a;t+=1){e+="<tr>";for(let n=0;n<a;n+=1){const r=c[n][t];e+='<td id="',null!==r&&(e+=d[r]),e+='">',e+="</td>"}e+="</tr>"}g.innerHTML=e}()}function T(){return[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}function j(){return Math.random()>=.5}function O(e,t,r){const o=e[0],l=e[1],u=r?l:o,s=u+t-1;if(function(e,t,n,r){const o=t[0],l=t[1],u=r?l:o,s=u+n-1;if(s>a-1)return!1;for(let t=u;t<=s;t+=1){if((r?c[o][t]:c[t][l])===e)return!1}return!0}(n,e,t,r)){for(let e=u;e<=s;e+=1)r?c[o][e]=n:c[e][l]=n;return!0}return!1}const S=()=>{const e=document.getElementById("winner-h1"),t=("comp"===p?p="user":"user"===p&&(p="comp"),p);"comp"===t&&(g.classList.remove("freeze"),m.classList.add("freeze"),e.innerHTML="computer`s turn",function(){const e=E();"ship"===b(e)?(v(e),l+=1):M(e)}(),console.log("comp",l)),"user"===t&&(g.classList.add("freeze"),m.classList.remove("freeze"),e.innerHTML=" user`s turn",function(){let e;document.querySelectorAll("#board td").forEach(t=>t.addEventListener("click",t=>{t.target&&"ship"===t.target.id?(t.target.style.background="red",o+=1):t.target.style.background="blue",e=!0})),i+=1}(),console.log("user"))};!function(){m=document.getElementById("board"),g=document.getElementById("player-board"),L(),B();const e=setInterval(()=>{S(),16===l&&clearInterval(e)},2e3)}()}]);