(()=>{"use strict";const e=["carrier","battleship","cruiser","submarine","destroyer"],t={carrier:5,battleship:4,cruiser:3,submarine:3,destroyer:2},r=(e=10)=>Math.floor(Math.random()*e),a=(e=10)=>[r(e),r(e)],l=e=>{const r={};return e.forEach((e=>r[e]=(e=>{const r=e,a=t[e];let l="horizontal";const n=Array(a).fill(null);return{id:r,length:a,hit:e=>n[e]="hit",getHits:()=>n,isSunk:()=>n.every((e=>"hit"===e)),getDirection:()=>l,changeDirection:()=>{l="horizontal"===l?"vertical":"horizontal"}}})(e))),r},n=()=>{let t=Array(10).fill(null).map((()=>Array(10).fill(null))),r=[];const l=(e,t,r,a)=>{let l=t+r,n=e;return"vertical"===a&&(l=t,n=e+r),[n,l]},n=(e,a,n)=>{const o=e.getDirection(),i=s(e.length,o,a,n);if(i){for(let r=0;r<e.length;r++){const[s,i]=l(a,n,r,o);t[s][i]={ship:e,index:r}}return r.push(e),i}return i},s=(e,r,a,n)=>{const s=[];for(let o=0;o<e;o++){const[e,i]=l(a,n,o,r);if(!(e<10&&i<10))return!1;s.push(t[e][i])}return s.every((e=>null===e))},o=e=>{const[t,r]=a();Math.random()>.5&&e.changeDirection(),n(e,t,r)||o(e)};return{getBoard:()=>t,placeShip:n,areAllShipsPlaced:()=>r.length===e.length,receiveAttack:(e,r)=>(null===t[e][r]?t[e][r]="miss":t[e][r].ship&&(t[e][r].ship.hit(t[e][r].index),t[e][r]="hit"),t[e][r]),areAllShipsSunk:()=>r.every((e=>e.isSunk())),autoPlaceFleet:e=>{for(const t in e)o(e[t])},reset:()=>{t=Array(10).fill(null).map((()=>Array(10).fill(null))),r=[]}}},s=(t="human")=>{let r=l(e);const n=e=>{let[t,r]=a();if(n.lastHit){const a=[[n.lastHit[0]-1,n.lastHit[1]],[n.lastHit[0]+1,n.lastHit[1]],[n.lastHit[0],n.lastHit[1]-1],[n.lastHit[0],n.lastHit[1]+1]].filter((t=>{const[r,a]=t;return r>=0&&r<=9&&a>=0&&a<=9&&"miss"!==e.getBoard()[r][a]&&"hit"!==e.getBoard()[r][a]}));a.length>0?[t,r]=a[Math.floor(Math.random()*a.length)]:(n.lastHit=null,n(e))}const l=e.getBoard()[t][r];"miss"===l||"hit"===l?n(e):(e.receiveAttack(t,r),n.lastHit="hit"===l?[t,r]:null)};return{getType:()=>t,getFleet:()=>r,attack:(e,t,r)=>r.receiveAttack(e,t),autoAttack:n,resetFleet:()=>r=l(e)}},o={playerGameboard:document.querySelector(".player-gameboard"),computerGameboard:document.querySelector(".computer-gameboard"),playerGrid:document.querySelector(".player-grid"),computerGrid:document.querySelector(".computer-grid"),infoContainer:document.querySelector(".info-container"),infoText:document.querySelector(".info-text"),autoPlaceBtn:document.querySelector(".fleet-autoplace"),playAgainBtn:document.querySelector(".play-again"),startBtn:document.querySelector(".start"),fleetContainer:document.querySelector(".fleet-container"),fleetDraggable:document.querySelector(".fleet-draggable"),fleetInfo:document.querySelector(".fleet-info")},i=(()=>{const e=(e,t,r)=>`<div class="grid-cell cell-${e}-${t} ${r}" data-y='${e}' data-x='${t}'></div>`;return{renderGrid:(t,r,a)=>{(e=>{e.textContent=""})(t);const l=r.getBoard(),n=l.length;let s="";for(let t=0;t<n;t++)for(let r=0;r<n;r++){let n=l[t][r];null===n?n="":n.ship&&(n="human"===a?n.ship.id:""),s+=e(t,r,n)}t.insertAdjacentHTML("afterbegin",s)},renderFleet:e=>{for(const t in e){const r=document.createElement("div");r.classList.add("ship",`${e[t].id}-container`),r.setAttribute("draggable",!0),r.dataset.ship=`${e[t].id}`;let a="";for(let r=0;r<e[t].length;r++)a+=`<div class=${e[t].id} data-index='${r}'></div>`;r.insertAdjacentHTML("afterbegin",a),o.fleetDraggable.prepend(r)}},autoPlace:()=>{o.startBtn.classList.add("show"),o.fleetInfo.classList.add("hide"),o.fleetInfo.classList.remove("show"),o.fleetDraggable.textContent=""},startGame:()=>{o.playerGameboard.classList.toggle("grid-disabled"),o.computerGameboard.classList.toggle("grid-disabled"),o.computerGameboard.classList.toggle("hide"),o.computerGameboard.classList.toggle("show"),o.startBtn.classList.remove("show"),o.autoPlaceBtn.classList.remove("show"),o.fleetContainer.classList.toggle("slide-out"),o.fleetContainer.classList.toggle("slide-in")},renderWinner:e=>{o.infoContainer.classList.toggle("show"),o.infoText.textContent=`${e.toUpperCase()}`},playAgain:()=>{o.infoContainer.classList.toggle("show"),o.playerGameboard.classList.toggle("grid-disabled"),o.computerGameboard.classList.toggle("grid-disabled"),o.computerGameboard.classList.toggle("hide"),o.computerGameboard.classList.toggle("show"),o.fleetInfo.classList.toggle("hide"),o.fleetInfo.classList.toggle("show"),o.autoPlaceBtn.classList.add("show"),o.fleetContainer.classList.toggle("slide-in"),o.fleetContainer.classList.toggle("slide-out")}}})();let d=(()=>{const e=s("human"),t=s("computer"),r=n(),a=n(),l=((e,t)=>{let r,a;const l=e=>a=Number(e.target.dataset.index),n=e=>{r=e.target,console.log(r)},s=l=>{const n=l.target,s=e.getFleet()[r.dataset.ship],d="horizontal"===s.getDirection(),c=Number(n.dataset.y)-(d?0:a),g=Number(n.dataset.x)-(d?a:0);t.placeShip(s,c,g)&&(i.renderGrid(o.playerGrid,t,e.getType()),p(),r.parentElement.removeChild(r),t.areAllShipsPlaced()&&(o.startBtn.classList.add("show"),o.fleetInfo.classList.add("hide"),o.fleetInfo.classList.remove("show")))},d=e=>e.preventDefault(),c=e=>e.preventDefault(),g=()=>{},u=()=>{},p=()=>{const e=document.querySelectorAll(".ship"),t=o.playerGrid.childNodes;for(const t of e)t.addEventListener("mousedown",l),t.addEventListener("dragstart",n),t.addEventListener("dragend",u);for(const e of t)e.addEventListener("dragover",d),e.addEventListener("dragenter",c),e.addEventListener("dragleave",g),e.addEventListener("drop",s)};return{addDragAndDropEvenListeners:p}})(e,r),d=()=>{i.renderFleet(e.getFleet()),l.addDragAndDropEvenListeners(),document.querySelectorAll(".ship").forEach((t=>{t.addEventListener("dblclick",(t=>{const r=t.target.parentElement;e.getFleet()[r.dataset.ship].changeDirection(),r.classList.toggle("vertical")}))}))},c=l=>{const n=l.target;if(n.classList.contains("grid-cell")){const l=n.dataset.y,s=n.dataset.x,d=a.getBoard()[l][s];if("miss"!==d&&"hit"!==d&&(e.attack(l,s,a),t.autoAttack(r),g(),r.areAllShipsSunk()||a.areAllShipsSunk())){let e="";r.areAllShipsSunk()?e="Computer wins!":a.areAllShipsSunk()&&(e="You win!"),o.computerGrid.removeEventListener("click",c),i.renderWinner(e)}}},g=()=>{i.renderGrid(o.playerGrid,r,e.getType()),i.renderGrid(o.computerGrid,a,t.getType())};return{renderGrids:g,renderFleet:d,autoPlace:()=>{r.reset(),r.autoPlaceFleet(e.getFleet()),g(),i.autoPlace()},startGame:()=>{o.computerGrid.addEventListener("click",c),"computer"===t.getType()&&a.autoPlaceFleet(t.getFleet()),i.startGame()},playAgain:()=>{e.resetFleet(),t.resetFleet(),r.reset(),a.reset(),g(),i.playAgain(),d()}}})();d.renderGrids(),d.renderFleet(),o.autoPlaceBtn.addEventListener("click",(e=>{console.log("autoplaced player fleet"),d.autoPlace()})),o.startBtn.addEventListener("click",(e=>{console.log("START GAME"),d.startGame()})),o.playAgainBtn.addEventListener("click",(e=>{console.log("PLAY AGAIN?"),d.playAgain()}))})();