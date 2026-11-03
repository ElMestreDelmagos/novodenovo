/* ARQUIVO: js/auth.js — login, sessão e estado de autenticação no navegador. */

document.addEventListener('DOMContentLoaded',()=>{
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const btn=document.querySelector('.login-button'); if(!btn)return;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const overlay=document.querySelector('#loginOverlay'), form=document.querySelector('#loginForm'), feedback=document.querySelector('#loginFeedback');
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 const open=()=>{overlay?.classList.add('show');overlay?.setAttribute('aria-hidden','false')}; const close=()=>{overlay?.classList.remove('show');overlay?.setAttribute('aria-hidden','true')};
 btn.addEventListener('click',()=>{if(btn.classList.contains('profile-button'))return;open()});document.querySelector('#loginClose')?.addEventListener('click',close);overlay?.addEventListener('click',e=>{if(e.target===overlay)close()});
 form?.addEventListener('submit',async e=>{e.preventDefault();feedback.textContent='Entrando...';try{const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const j=await r.json();if(!r.ok)throw new Error(j.mensagem);close();await renderAuth()}catch(x){feedback.textContent=x.message}});
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 async function renderAuth(){try{const r=await fetch('/api/auth/session');const j=await r.json();if(!j.autenticado){btn.innerHTML='♙ &nbsp; Entrar';btn.classList.remove('profile-button');btn.onclick=null;return}const u=j.data;btn.innerHTML='<span class="profile-icon">●</span><span class="profile-name">'+escapeHtml(u.nome||'Perfil')+'</span>';btn.classList.add('profile-button');btn.onclick=()=>{if(!btn.classList.contains('profile-button'))return;location.href=u.tipo==='brecho'?'/app/area-brecho.html':u.tipo==='bazar'?'/app/area-bazar.html':'/app/area-usuario.html'};}catch(e){console.error(e)}}
 renderAuth();
});
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
function escapeHtml(v){const d=document.createElement('div');d.textContent=v;return d.innerHTML}
