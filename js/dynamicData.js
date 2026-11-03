/* ARQUIVO: js/dynamicData.js — carregamento e preparação de dados dinâmicos para a interface. */

// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const fallbackImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const fmtDate=v=>{if(!v)return "Data";const d=new Date(v+"T12:00:00");return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}).replace(".","");};
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
async function carregarDadosPublicos(){
 try{
  const [rb,rz]=await Promise.all([fetch('/api/brechos'),fetch('/api/bazares')]); if(!rb.ok||!rz.ok)throw new Error('Falha ao carregar catálogo');
  const [jb,jz]=await Promise.all([rb.json(),rz.json()]);
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const bs=(jb.data||[]).map(x=>({id:x.id_brecho,name:x.nome_brecho,city:x.endereco_usuario?`${x.endereco_usuario.cidade}, ${x.endereco_usuario.estado}`:(x.endereco||"Local não informado"),rating:"—",products:"—",priceMin:x.preco_min??0,priceMax:x.preco_max??x.preco_min??0,tag:x.categoria||"Brechó",style:x.estilo||"Outros",image:x.imagem||fallbackImage,description:x.descricao||""}));
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
  const zs=(jz.data||[]).map(x=>({id:x.id_bazar,date:fmtDate(x.data_inicio),name:x.nome_bazar,city:x.endereco_usuario?`${x.endereco_usuario.cidade}, ${x.endereco_usuario.estado}`:"Local não informado",exhibitors:"—",image:x.imagem||fallbackImage,description:x.descricao||"",data_inicio:x.data_inicio,data_termino:x.data_termino,horario_inicio:x.horario_inicio,horario_termino:x.horario_termino}));
  BRECHOS.splice(0,BRECHOS.length,...bs); EVENTOS.splice(0,EVENTOS.length,...zs); document.dispatchEvent(new CustomEvent('novodenovo:data-loaded'));
 }catch(e){console.error('Catálogo: usando dados locais porque a API não respondeu.',e)}
}
document.addEventListener('DOMContentLoaded',carregarDadosPublicos);
