/* ARQUIVO: js/cardActions.js — ações disponíveis nos cartões, como favoritos e agenda. */

window.NovoDeNovoCards=(()=>{
 let favoritos={brechos:new Set()},lembretes=new Set(),autenticado=false;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 async function carregar(){try{const s=await fetch('/api/auth/session').then(r=>r.json());autenticado=!!s.autenticado;if(!autenticado)return;const [f,l]=await Promise.all([fetch('/api/me/favoritos').then(r=>r.json()),fetch('/api/me/lembretes').then(r=>r.json())]);if(f.sucesso)favoritos.brechos=new Set((f.data.brechos||[]).map(Number));if(l.sucesso)lembretes=new Set((l.data||[]).map(x=>Number(x.id_bazar)));document.dispatchEvent(new CustomEvent('novodenovo:favoritos-loaded'));document.dispatchEvent(new CustomEvent('novodenovo:lembretes-loaded'));}catch(e){console.warn('Não foi possível carregar dados pessoais.',e)}}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 function ativo(tipo,id){return tipo==='brechos'&&favoritos.brechos.has(Number(id))}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 function lembreteAtivo(id){return lembretes.has(Number(id))}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 async function alternar(tipo,id,botao){if(tipo!=='brecho')return;if(!autenticado){alert('Entre na sua conta para favoritar.');return;}const n=Number(id),was=favoritos.brechos.has(n),r=await fetch(`/api/me/favoritos/brechos/${n}`,{method:was?'DELETE':'POST'});if(!r.ok){const j=await r.json().catch(()=>({}));alert(j.mensagem||'Não foi possível atualizar o favorito.');return;}was?favoritos.brechos.delete(n):favoritos.brechos.add(n);if(botao){botao.classList.toggle('selected',!was);botao.textContent=!was?'♥':'♡';botao.setAttribute('aria-pressed',String(!was));}document.dispatchEvent(new CustomEvent('novodenovo:favorito-alterado'));return true;}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 async function alternarLembrete(id,botao){if(!autenticado){alert('Entre na sua conta para adicionar este bazar à sua agenda.');return;}const n=Number(id),was=lembretes.has(n),r=await fetch(`/api/me/lembretes/bazares/${n}`,{method:was?'DELETE':'POST'});if(!r.ok){const j=await r.json().catch(()=>({}));alert(j.mensagem||'Não foi possível atualizar o lembrete.');return;}was?lembretes.delete(n):lembretes.add(n);if(botao){botao.classList.toggle('selected',!was);botao.textContent=!was?'✓':'▣';botao.title=!was?'Na sua agenda':'Adicionar à agenda';}}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
 async function compartilhar(item,tipo){const url=new URL(location.href);url.hash=tipo==='brecho'?`brecho-${item.id}`:`bazar-${item.id}`;const data={title:item.name,text:`${item.name} — ${item.city}`,url:url.toString()};try{if(navigator.share){await navigator.share(data);return;}await navigator.clipboard.writeText(`${data.text}\n${data.url}`);alert('Link copiado para a área de transferência!');}catch(e){if(e?.name!=='AbortError')prompt('Copie o link:',data.url)}}
 return {carregar,ativo,lembreteAtivo,alternar,alternarLembrete,compartilhar};
})();
document.addEventListener('DOMContentLoaded',()=>window.NovoDeNovoCards.carregar());
