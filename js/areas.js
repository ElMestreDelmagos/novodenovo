/* ARQUIVO: js/areas.js — comportamentos compartilhados das áreas de cadastro/gestão. */

(() => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const esc=v=>String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const msg=(el,text,err=false)=>{if(!el)return;el.textContent=text;el.classList.add("show");el.style.color=err?"#a33":"";setTimeout(()=>el.classList.remove("show"),2600)};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const request=async(url,opt={})=>{const r=await fetch(url,{credentials:'same-origin',headers:{'Content-Type':'application/json',...(opt.headers||{})},...opt});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.mensagem||'Não foi possível concluir a operação.');return j};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const brecho=document.querySelector('#brechoAreaForm');
 if(brecho){let current=null;const fb=document.querySelector('#brechoFeedback'),preview=document.querySelector('#brechoPreview');
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const render=()=>{const d=Object.fromEntries(new FormData(brecho));preview.innerHTML=`<article class="brecho-card"><div class="brecho-image"><img src="${esc(d.imagem||'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80')}" alt="${esc(d.nome_brecho)}"><span class="tag">${esc(d.categoria||'Brechó')}</span><span class="price">R$ ${esc(d.preco_min||0)}–${esc(d.preco_max||0)}</span></div><div class="brecho-content"><h3>${esc(d.nome_brecho)}</h3><p>${esc(d.endereco||'')}</p><p>${esc(d.estilo||'')}</p></div></article>`};
  request('/api/me/brecho').then(({data})=>{current=data;if(!data)return;for(const [k,v] of Object.entries(data))if(brecho.elements[k])brecho.elements[k].value=v??'';render()}).catch(e=>msg(fb,e.message,true)); brecho.addEventListener('input',render);
  brecho.addEventListener('submit',async e=>{e.preventDefault();try{const d=Object.fromEntries(new FormData(brecho));await request('/api/me/brecho',{method:'PUT',body:JSON.stringify(d)});msg(fb,'Alterações salvas no Supabase ✓');render()}catch(x){msg(fb,x.message,true)}});
  document.querySelector('#brechoDelete')?.addEventListener('click',async()=>{if(!confirm('Excluir este brechó? Esta ação não pode ser desfeita.'))return;try{await request('/api/me/brecho',{method:'DELETE'});alert('Brechó excluído.');location.href='/app/index.html#brechos'}catch(x){msg(fb,x.message,true)}});
 }
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const bazar=document.querySelector('#bazarAreaForm');
 if(bazar){const fb=document.querySelector('#bazarFeedback'),preview=document.querySelector('#bazarPreview');
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const render=()=>{const d=Object.fromEntries(new FormData(bazar));preview.innerHTML=`<article class="event-card"><div class="event-image"><img src="${esc(d.imagem||'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=700&q=80')}" alt="${esc(d.nome_bazar)}"><span class="date-badge">${esc(d.data_inicio||'Data')}</span></div><div class="event-content"><h3>${esc(d.nome_bazar)}</h3><p>${esc(d.descricao||'')}</p></div></article>`};
  request('/api/me/bazar').then(({data})=>{if(!data)return;for(const [k,v] of Object.entries(data))if(bazar.elements[k])bazar.elements[k].value=v??'';render()}).catch(e=>msg(fb,e.message,true));bazar.addEventListener('input',render);
  bazar.addEventListener('submit',async e=>{e.preventDefault();try{const d=Object.fromEntries(new FormData(bazar));await request('/api/me/bazar',{method:'PUT',body:JSON.stringify(d)});msg(fb,'Alterações salvas no Supabase ✓');render()}catch(x){msg(fb,x.message,true)}});
  document.querySelector('#bazarDelete')?.addEventListener('click',async()=>{if(!confirm('Excluir este bazar? Esta ação não pode ser desfeita.'))return;try{await request('/api/me/bazar',{method:'DELETE'});alert('Bazar excluído.');location.href='/app/index.html#eventos'}catch(x){msg(fb,x.message,true)}});
 }
})();

document.querySelector('.area-logout')?.addEventListener('click',async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='/app/index.html'});
