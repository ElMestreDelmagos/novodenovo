/* ARQUIVO: js/cadastro.js — fluxo de cadastro e validação dos formulários. */

(() => {
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const overlay=document.querySelector('#cadastroOverlay'), form=document.querySelector('#cadastroForm'); if(!overlay||!form)return;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const title=document.querySelector('#cadastroTitle'), typeInput=document.querySelector('#cadastroTipo'), feedback=document.querySelector('#cadastroFeedback');
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const extras={usuario:document.querySelector('#cadastroUsuarioExtra'),brecho:document.querySelector('#cadastroBrechoExtra'),bazar:document.querySelector('#cadastroBazarExtra')};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function setTipo(tipo){typeInput.value=tipo; Object.entries(extras).forEach(([k,el])=>el?.classList.toggle('hidden',k!==tipo)); title.textContent={usuario:'Criar conta',brecho:'Cadastrar meu brechó',bazar:'Cadastrar meu bazar'}[tipo]; overlay.classList.add('show');overlay.setAttribute('aria-hidden','false');document.body.classList.add('modal-open'); feedback.textContent='';feedback.className='cadastro-feedback'; setTimeout(()=>form.querySelector('input')?.focus(),50);}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  function fechar(){overlay.classList.remove('show');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
  document.querySelectorAll('[data-cadastro-tipo]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();setTipo(el.dataset.cadastroTipo)}));
  document.querySelector('#cadastroClose')?.addEventListener('click',fechar); overlay.addEventListener('click',e=>{if(e.target===overlay)fechar()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('show'))fechar()});
  form.addEventListener('submit',async e=>{e.preventDefault(); const tipo=typeInput.value, fd=new FormData(form); const senha=fd.get('senha'), confirmar=fd.get('confirmar_senha'); if(senha!==confirmar){feedback.textContent='As senhas não coincidem.';feedback.className='cadastro-feedback error';return;}
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const conta={nome:fd.get('nome'),email:fd.get('email'),senha}; const endereco={cep:fd.get('cep'),rua:fd.get('rua'),numero:fd.get('numero'),bairro:fd.get('bairro'),cidade:fd.get('cidade'),estado:fd.get('estado')}; let payload={conta,endereco};
    if(tipo==='brecho')payload.brecho={nome_brecho:fd.get('nome_brecho'),descricao:fd.get('brecho_descricao'),imagem:fd.get('brecho_imagem'),endereco:fd.get('brecho_endereco'),preco_min:fd.get('preco_min'),preco_max:fd.get('preco_max'),estilo:fd.get('estilo'),categoria:fd.get('categoria')};
    if(tipo==='bazar')payload.bazar={nome_bazar:fd.get('nome_bazar'),descricao:fd.get('bazar_descricao'),imagem:fd.get('bazar_imagem'),data_inicio:fd.get('data_inicio'),data_termino:fd.get('data_termino'),horario_inicio:fd.get('horario_inicio'),horario_termino:fd.get('horario_termino')};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
    const btn=form.querySelector('[type=submit]');btn.disabled=true;btn.textContent='Cadastrando...';feedback.textContent='';
    try{const r=await fetch(`/api/cadastro/${tipo}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.mensagem||'Não foi possível concluir o cadastro.');feedback.textContent=data.mensagem;feedback.className='cadastro-feedback success';form.reset();typeInput.value=tipo;if(tipo==='brecho')setTimeout(()=>location.href='/app/area-brecho.html',900);else if(tipo==='bazar')setTimeout(()=>location.href='/app/area-bazar.html',900);else setTimeout(fechar,1500)}catch(err){feedback.textContent=err.message;feedback.className='cadastro-feedback error'}finally{btn.disabled=false;btn.textContent='Finalizar cadastro'}
  });
})();
