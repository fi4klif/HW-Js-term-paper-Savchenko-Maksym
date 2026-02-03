import{i as X}from"./vendor-BvZOPg7i.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const fe="https://your-energy.b.goit.study/api";async function ve(e,t=1,s=12){const i=new URLSearchParams({filter:e,page:t,limit:s});try{const n=await fetch(`${fe}/filters?${i}`);if(!n.ok)throw new Error("Failed to fetch");return await n.json()}catch(n){return console.error(n),null}}const R="https://your-energy.b.goit.study/api";async function pe(e,t,s="",i=1,n=10){let a="";e==="Body parts"?a="bodypart":e==="Muscles"?a="muscles":e==="Equipment"&&(a="equipment");const r=new URLSearchParams({[a]:t,keyword:s,page:i,limit:n});try{const c=await fetch(`${R}/exercises?${r}`);if(!c.ok)throw new Error("Failed to fetch exercises");return await c.json()}catch(c){return console.error(c),null}}async function ye(e){try{const t=await fetch(`${R}/exercises/${e}`);if(!t.ok)throw new Error("Failed to fetch exercise details");return await t.json()}catch(t){return console.error(t),null}}async function he(e,t){try{const s=await fetch(`${R}/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!s.ok){const i=await s.json().catch(()=>({}));throw new Error(i.message||`Error ${s.status}`)}return await s.json()}catch(s){throw console.error(s),s}}const be=document.getElementById("categoriesList");function Ee(e){if(!e||e.length===0)return;const t=e.map(s=>{const{filter:i,name:n,imgUrl:a,imgURL:r}=s;return`
      <li class="category-card" style="${`background: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url('${a||r}') center/cover no-repeat;`}" data-name="${n}" data-filter="${i}">
        <div class="category-content">
            <h3 class="category-name">${n}</h3>
            <p class="category-type">${i}</p>
        </div>
      </li>
    `}).join("");be.innerHTML=t}const S=document.getElementById("exercisesList");function F(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function Le(e){if(!S)return;if(e.length===0){S.innerHTML='<p class="no-results">No exercises found.</p>';return}const t=e.map(({_id:s,rating:i,name:n,burnedCalories:a,bodyPart:r,target:c})=>`
      <div class="exercise-card">
        <div class="exercise-header">
          <div class="exercise-badge">WORKOUT</div>
          <div class="exercise-rating">
            <span>${i.toFixed(1)}</span>
            <svg class="icon-star" width="18" height="18">
              <use href="./img/icons/star.svg"></use> 
            </svg>
          </div>
          <button class="exercise-start-btn" data-id="${s}">
            Start
            <svg class="icon-arrow" width="16" height="16">
               <use href="./img/menu/arrow.svg"></use>
            </svg>
          </button>
        </div>

        <div class="exercise-title-row">
          <div class="icon-wrapper">
             <svg width="24" height="24">
               <use href="./img/icons/men-run-black.svg"></use>
             </svg>
          </div>
          <h3 class="exercise-title">${F(n)}</h3>
        </div>

        <ul class="exercise-info">
          <li><span>Burned calories:</span> ${a} / 3 min</li>
          <li><span>Body part:</span> ${F(r)}</li>
          <li><span>Target:</span> ${F(c)}</li>
        </ul>
      </div>
    `).join("");S.innerHTML=t}const J=document.getElementById("pagination");function _(e,t=1){let s="";if(e<=1){J.innerHTML="";return}s+=`
    <button class="pagination-btn nav-btn" data-page="1" ${t===1?"disabled":""}>«</button>
    <button class="pagination-btn nav-btn" data-page="${t-1}" ${t===1?"disabled":""}>‹</button>
  `;const i=1;for(let n=1;n<=e;n++)n===1||n===e||n>=t-i&&n<=t+i?s+=`<button class="pagination-btn ${n===t?"active":""}" data-page="${n}">${n}</button>`:(n===t-i-1||n===t+i+1)&&(s+='<span class="pagination-dots">...</span>');s+=`
    <button class="pagination-btn nav-btn" data-page="${t+1}" ${t===e?"disabled":""}>›</button>
    <button class="pagination-btn nav-btn" data-page="${e}" ${t===e?"disabled":""}>»</button>
  `,J.innerHTML=s}const o={currentFilter:"Muscles",currentPage:1,totalPages:1,limit:12,searchQuery:"",activeCategory:"",activeCategoryFilter:""},f=document.getElementById("searchForm"),v=document.getElementById("searchInput");function we(e){!f||!v||(f.addEventListener("submit",t=>{t.preventDefault();const s=v.value.trim();o.searchQuery=s,o.currentPage=1,typeof e=="function"&&e()}),v.addEventListener("input",t=>{t.target.value===""&&(o.searchQuery="")}))}function xe(){v&&(v.value="",o.searchQuery="")}function H(e){f&&(e?f.classList.add("active"):f.classList.remove("active"))}const Q=document.getElementById("filterButtons"),L=document.getElementById("exercisesCategory"),w=document.getElementById("categoriesList"),x=document.getElementById("exercisesList"),V=document.querySelector(".exercises-header-wrapper");async function D(){const e=await ve(o.currentFilter,o.currentPage,o.limit);L&&(L.textContent=""),w&&(w.style.display="grid"),x&&(x.style.display="none"),H(!1),e&&(o.totalPages=e.totalPages,Ee(e.results),_(o.totalPages,o.currentPage),$e())}function $e(){document.querySelectorAll(".category-card").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.name,i=t.dataset.filter;o.activeCategory=s,o.activeCategoryFilter=i,o.currentPage=1,w&&(w.style.display="none"),x&&(x.style.display="grid"),L&&(L.textContent=` / ${s}`),H(!0),N()})})}async function N(){const e=await pe(o.activeCategoryFilter,o.activeCategory,o.searchQuery,o.currentPage,o.limit);e&&(o.totalPages=e.totalPages,Le(e.results),_(o.totalPages,o.currentPage),V&&V.scrollIntoView({behavior:"smooth"}))}function Ie(){Q&&Q.addEventListener("click",async e=>{if(e.target.classList.contains("filter-btn")){document.querySelectorAll(".filter-btn").forEach(s=>s.classList.remove("active")),e.target.classList.add("active");const t=e.target.dataset.filter;o.currentFilter=t,o.currentPage=1,xe(),o.activeCategory="",await D()}})}const K=document.getElementById("pagination"),C=document.getElementById("exercisesList"),Be=document.getElementById("categoriesList");function Se(){K&&K.addEventListener("click",e=>{if(!C&&!Be)return;const t=e.target.closest(".pagination-btn");if(!t||t.disabled||t.classList.contains("active"))return;const s=Number(t.dataset.page);if(s){o.currentPage=s,C&&C.style.display!=="none"?N():D();const i=document.querySelector(".exercises-section");i&&i.scrollIntoView({behavior:"smooth"})}})}const Fe="https://your-energy.b.goit.study/api";async function Ce(){try{const e=await fetch(`${Fe}/quote`);if(!e.ok)throw new Error(`Error fetching quote: ${e.status}`);return await e.json()}catch(e){return console.error("Fetch quote error:",e),null}}const Z=document.getElementById("quoteText"),ee=document.getElementById("quoteAuthor"),W="quoteData",z="quoteDate";async function ke(){if(!Z||!ee)return;const e=new Date().toDateString(),t=localStorage.getItem(z),s=localStorage.getItem(W);if(t===e&&s)try{Y(JSON.parse(s));return}catch(n){console.error(n)}const i=await Ce();i&&(localStorage.setItem(W,JSON.stringify(i)),localStorage.setItem(z,e),Y(i))}function Y({author:e,quote:t}){Z.textContent=t,ee.textContent=e}const te={position:"topRight",timeout:3e3,transitionIn:"fadeInDown",transitionOut:"fadeOutUp"},se=e=>{X.success({...te,message:e,backgroundColor:"#242424",messageColor:"#F4F4F4",iconColor:"#EEA10C",progressBarColor:"#EEA10C"})},p=e=>{X.error({...te,message:e,backgroundColor:"#E9003F",messageColor:"#F4F4F4",iconColor:"#F4F4F4",progressBarColor:"#F4F4F4"})},u=document.getElementById("ratingModal"),$=document.getElementById("ratingForm"),Me=document.getElementById("ratingModalClose"),ne=document.getElementById("ratingStars"),ie=document.getElementById("ratingValueDisplay");let ae=null;function Te(){!u||!$||(Me.addEventListener("click",T),u.addEventListener("click",e=>{e.target===u&&T()}),ne.addEventListener("change",e=>{const t=parseInt(e.target.value);ie.textContent=t.toFixed(1),oe(t)}),$.addEventListener("submit",qe))}function Ae(e){u&&(ae=e,u.classList.add("is-open"),Pe())}function T(){u.classList.remove("is-open")}function oe(e){ne.querySelectorAll(".rating-star-label").forEach((s,i)=>{const n=s.querySelector("use");i<e?n.setAttribute("href","./img/icons/star.svg"):n.setAttribute("href","./img/icons/zero-star.svg")})}function Pe(){$.reset(),ie.textContent="0.0",oe(0)}async function qe(e){e.preventDefault();const t=new FormData($),s=t.get("rate"),i=t.get("email"),n=t.get("review");if(!s){p("Please select a rating");return}const a={rate:parseInt(s),email:i,review:n};try{await he(ae,a),se("Thank you for your feedback!"),T()}catch(r){r.message.includes("409")?p("You have already rated this exercise."):p("Something went wrong. Please try again.")}}const g=document.getElementById("exerciseModal"),Oe=document.getElementById("modalClose"),A=document.getElementById("modalBody"),P="favorites";function re(e){e.key==="Escape"&&I()}async function ce(e){if(!g)return;A.innerHTML='<div class="loader" style="text-align:center; color:white; padding: 20px;">Loading...</div>',g.classList.add("is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",re);const t=await ye(e);if(!t){A.innerHTML='<p style="color:white; text-align:center;">Error loading details</p>';return}Re(t),_e(t)}function I(){g.classList.remove("is-open"),document.body.style.overflow="",window.removeEventListener("keydown",re)}function Re(e){const{_id:t,gifUrl:s,name:i,rating:n,target:a,bodyPart:r,equipment:c,popularity:h,burnedCalories:le,time:de,description:ue}=e,U=(JSON.parse(localStorage.getItem(P))||[]).some(m=>m._id===t);let j="";const ge=Math.round(n);for(let m=1;m<=5;m++){const me=m<=ge?"./img/icons/star.svg":"./img/icons/zero-star.svg";j+=`
      <svg width="18" height="18">
         <use href="${me}"></use>
      </svg>
    `}A.innerHTML=`
    <div class="modal-inner-flex"> 
      <div class="modal-gif-wrapper">
        <img src="${s}" alt="${i}" class="modal-gif" />
      </div>

      <div class="modal-right-side">
        <h3 class="modal-title">${i}</h3>
        
        <div class="modal-rating-wrapper">
          <span class="modal-rating-value">${n.toFixed(1)}</span>
          ${j}
        </div>

        <div class="modal-divider"></div>

        <div class="modal-details-list">
          <div class="modal-details-item">
            <span class="modal-details-label">Target</span>
            <span class="modal-details-value">${a}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Body Part</span>
            <span class="modal-details-value">${r}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Equipment</span>
            <span class="modal-details-value">${c}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Popular</span>
            <span class="modal-details-value">${h}</span>
          </div>
          <div class="modal-details-item">
            <span class="modal-details-label">Burned Calories</span>
            <span class="modal-details-value">${le}/${de} min</span>
          </div>
        </div>

        <div class="modal-divider"></div>

        <p class="modal-description">${ue}</p>
      </div>
    </div>

    <div class="modal-buttons">
      <button class="btn-favorites ${U?"is-favorite":""}" id="btnAddToFavorites">
        <span>${U?"Remove from favorites":"Add to favorites"}</span>
        <svg width="18" height="18">
            <use href="./img/menu/heart.svg"></use> 
        </svg>
      </button>
      
      <button class="btn-rating" id="btnGiveRating">
        Give a rating
      </button>
    </div>
  `}function _e(e){const t=document.getElementById("btnAddToFavorites");t&&t.addEventListener("click",()=>{const i=JSON.parse(localStorage.getItem(P))||[],n=i.findIndex(a=>a._id===e._id);n===-1?(i.push(e),t.querySelector("span").textContent="Remove from favorites",t.classList.add("is-favorite")):(i.splice(n,1),t.querySelector("span").textContent="Add to favorites",t.classList.remove("is-favorite")),localStorage.setItem(P,JSON.stringify(i))});const s=document.getElementById("btnGiveRating");s&&s.addEventListener("click",()=>{I(),Ae(e._id)})}function He(){g&&(Oe.addEventListener("click",I),g.addEventListener("click",e=>{e.target===g&&I()}))}const De="https://your-energy.b.goit.study/api";async function Ne(e){try{const t=await fetch(`${De}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("This email is already subscribed.");if(!t.ok)throw new Error("Failed to subscribe. Please try again.");return await t.json()}catch(t){throw console.error(t),t}}const q=document.getElementById("subscribeForm"),Ue=document.getElementById("subscribeEmail");function je(){q&&q.addEventListener("submit",Je)}async function Je(e){e.preventDefault();const t=Ue.value.trim();if(!t){p("Please enter a valid email address.");return}try{const s=await Ne(t);se(s.message||"We’re excited to have you on board!"),q.reset()}catch(s){p(s.message||"Something went wrong.")}}const k=document.getElementById("favoritesList");function M(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function Qe(e){if(!k)return;if(!e||e.length===0){k.innerHTML=`
      <div class="favorites-empty">
        <p class="favorites-empty-text">It appears that you haven't added any exercises to your favorites yet...</p>
        <a href="./index.html" class="favorites-link">To the exercises</a>
      </div>
    `;return}const t=e.map(({_id:s,name:i,burnedCalories:n,bodyPart:a,target:r})=>`
      <div class="exercise-card">
        <div class="exercise-header">
          <div class="exercise-badge">WORKOUT</div>
          
          <button class="exercise-remove-btn" data-id="${s}">
            <svg aria-label="Remove">
              <use href="./img/icons/trash.svg"></use>
              </svg>
          </button>

          <button class="exercise-start-btn" data-id="${s}">
            Start
            <svg class="icon-arrow" width="16" height="16">
               <use href="./img/menu/arrow.svg"></use>
            </svg>
          </button>
        </div>

        <div class="exercise-title-row">
          <div class="icon-wrapper">
             <svg width="24" height="24">
               <use href="./img/icons/men-run-black.svg"></use>
             </svg>
          </div>
          <h3 class="exercise-title">${M(i)}</h3>
        </div>

        <ul class="exercise-info">
          <li><span>Burned calories:</span> ${n} / 3 min</li>
          <li><span>Body part:</span> ${M(a)}</li>
          <li><span>Target:</span> ${M(r)}</li>
        </ul>
      </div>
    `).join("");k.innerHTML=t}const y=document.getElementById("favoritesList"),b=document.getElementById("favoritesEmpty"),l=document.getElementById("pagination"),O="favorites",E=8;let d=1;function Ve(){y&&(B(),y.addEventListener("click",Ke),l&&l.addEventListener("click",ze),window.addEventListener("resize",()=>{B()}))}function B(){const e=JSON.parse(localStorage.getItem(O))||[];if(e.length===0){y.innerHTML="",y.style.display="none",b&&(b.style.display="block"),l&&(l.innerHTML="");return}b&&(b.style.display="none"),y.style.display="grid";const t=window.innerWidth>=1440;let s=e;if(t)l&&(l.innerHTML="");else{const i=Math.ceil(e.length/E);d>i&&(d=i||1);const n=(d-1)*E,a=n+E;s=e.slice(n,a),i>1?_(i,d):l&&(l.innerHTML="")}Qe(s)}function Ke(e){const t=e.target.closest(".exercise-remove-btn"),s=e.target.closest(".exercise-start-btn");if(t){e.preventDefault();const i=t.dataset.id;We(i);return}if(s){e.preventDefault();const i=s.dataset.id;ce(i)}}function We(e){const s=(JSON.parse(localStorage.getItem(O))||[]).filter(n=>n._id!==e);localStorage.setItem(O,JSON.stringify(s));const i=Math.ceil(s.length/E);d>i&&d>1&&(d=i),B()}function ze(e){const t=e.target.closest(".pagination-btn");if(!t||t.disabled||t.classList.contains("active"))return;const s=Number(t.dataset.page);s&&(d=s,B(),window.scrollTo({top:0,behavior:"smooth"}))}function Ye(){const e=document.querySelectorAll(".nav-link"),t=document.querySelectorAll(".mobile-nav-link"),s=window.location.pathname,i=n=>{n.forEach(a=>{const r=a.getAttribute("href").replace("./",""),c=(s==="/"||s.endsWith("index.html"))&&r==="index.html",h=s.endsWith(r);c||r!=="index.html"&&h?a.classList.add("nav-link-active"):a.classList.remove("nav-link-active")})};i(e),i(t)}function Ge(){const e=document.getElementById("burgerBtn"),t=document.getElementById("mobileMenu"),s=document.getElementById("mobileMenuCloseBtn"),i=document.querySelectorAll(".mobile-nav-link");if(!e||!t||!s)return;e.addEventListener("click",()=>{t.classList.add("is-open"),document.body.style.overflow="hidden"});const n=()=>{t.classList.remove("is-open"),document.body.style.overflow=""};s.addEventListener("click",n),i.forEach(a=>{a.addEventListener("click",n)})}function Xe(){const e=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(s=>{s.classList.remove("nav-link-active"),s.style.color="";const i=s.getAttribute("href");(e.endsWith("/")&&i.includes("index.html")||e.includes("index.html")&&i.includes("index.html")||e.includes("page-2.html")&&i.includes("page-2.html"))&&(s.classList.contains("nav-link")?s.classList.add("nav-link-active"):s.style.color="#F4F4F4")})}Xe();Ge();Ye();ke();we(N);Ie();Se();He();Te();je();Ve();H(!1);const Ze=document.getElementById("categoriesList");Ze&&D();const G=document.getElementById("exercisesList");G&&G.addEventListener("click",e=>{const t=e.target.closest(".exercise-start-btn");if(t){const s=t.dataset.id;ce(s)}});
//# sourceMappingURL=main-CJ1IJrKE.js.map
