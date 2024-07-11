import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as a,S as m}from"./assets/vendor-8c59ed88.js";document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("searchBar"),c=document.getElementById("searchButton"),n=document.getElementById("gallery"),t=document.querySelector(".loader");c.addEventListener("click",async s=>{s.preventDefault(),t.style.opacity=1;const e=r.value.trim();if(e===""){a.show({title:"Input Required",message:"Please enter a search term.",color:"yellow"}),t.style.opacity=0;return}const o="horizontal",y="true",p=`https://pixabay.com/api/?key=44886630-c76369955f218994c10c946a0&q=${encodeURIComponent(e)}&image_type=photo&orientation=${o}&safesearch=${y}`;try{t.style.display="block";const i=await(await fetch(p)).json();i.hits.length===0?a.show({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",color:"white"}):d(i.hits),r.value=""}catch(l){console.error("Error fetching data:",l),a.show({title:"Error",message:"Failed to fetch images. Please try again later.",color:"red"})}finally{t.style.display="none",t.style.opacity=0}});function d(s){n.innerHTML="",s.forEach(e=>{const o=document.createElement("div");o.classList.add("image-card"),o.innerHTML=`
                <a href="${e.largeImageURL}" class="gallery-link">
                    <img src="${e.webformatURL}" alt="${e.tags}">
                </a>
                <div class="image-info">
                    <p><strong>Likes:</strong> ${e.likes}</p>
                    <p><strong>Views:</strong> ${e.views}</p>
                    <p><strong>Comments:</strong> ${e.comments}</p>
                    <p><strong>Downloads:</strong> ${e.downloads}</p>
                </div>
            `,n.appendChild(o)}),new m(".gallery-link")}});
//# sourceMappingURL=commonHelpers2.js.map
