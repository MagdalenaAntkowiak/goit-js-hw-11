import{i as c,S as m}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const y="45147118-3a4bc08e8d7fb4b6ec64761bc",h="https://pixabay.com/api/";async function g(o){return(await(await fetch(`${h}?key=${y}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`)).json()).hits}const b=document.querySelector("#search-form"),l=document.querySelector("#gallery"),n=document.querySelector("#loader");b.addEventListener("submit",o=>{o.preventDefault();const s=o.target.elements.query.value;l.innerHTML="",n.style.display="block",g(s).then(r=>{if(n.style.display="none",r.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}const i=r.map(({webformatURL:e,largeImageURL:t,tags:a,likes:d,views:u,comments:f,downloads:p})=>`
        <li>
          <a href="${t}">
            <img src="${e}" alt="${a}" />
          </a>
          <div class="image-info">
            <div class="info-item"><span class="label">Likes:</span> ${d}</div>
            <div class="info-item"><span class="label">Views:</span> ${u}</div>
            <div class="info-item"><span class="label">Comments:</span>${f}</div>
            <div class="info-item"><span class="label">Downloads:</span>${p}</div>
          </div>
        </li>
      `).join("");l.insertAdjacentHTML("beforeend",i),new m(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}).catch(r=>{n.style.display="none",c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error(r)})});
//# sourceMappingURL=commonHelpers2.js.map
