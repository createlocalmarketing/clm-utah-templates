const state={projectsData:null,tasksData:null,query:'',peopleFilter:'all'};

const STAGES=[
  {key:'pending',title:'Pending',hint:'Not started / queued'},
  {key:'in_process',title:'In Process',hint:'Actively being worked'},
  {key:'awaiting_approval',title:'Completed · Awaiting Approval',hint:'Work is done by ChatGPT, but not final until you approve it'},
  {key:'approved',title:'Approved · Closed',hint:'Explicitly approved and closed'}
];

async function loadJson(path){
  const r=await fetch(path+'?v=20261008-2',{cache:'no-store'});
  if(!r.ok)throw new Error(path+' returned '+r.status);
  return r.json();
}

async function boot(){
  try{
    const[p,t]=await Promise.all([loadJson('./data/projects.json'),loadJson('./data/tasks.json')]);
    state.projectsData=p;
    state.tasksData=t;
    bindStaticEvents();
    route();
    window.addEventListener('hashchange',route);
  }catch(err){
    document.querySelector('#main').innerHTML='<div class="fatal"><strong>Dashboard data failed to load.</strong><br>'+escapeHtml(err.message)+'</div>';
  }
}

function bindStaticEvents(){
  document.querySelector('#search').addEventListener('input',e=>{
    state.query=e.target.value.trim().toLowerCase();
    renderProject(activeProject());
  });
}

function activeProject(){
  const projects=state.projectsData?.projects||[];
  const match=location.hash.match(/^#\/project\/([^/?]+)/);
  return projects.find(p=>p.id===(match&&decodeURIComponent(match[1])))||projects[0]||null;
}

function route(){
  renderSidebar();
  renderProject(activeProject());
}

function renderSidebar(){
  const host=document.querySelector('#projects');
  const groups=state.projectsData?.groups||[];
  const projects=state.projectsData?.projects||[];
  const active=activeProject()?.id;
  host.innerHTML=groups.map(g=>{
    const children=projects.filter(p=>p.group===g.id);
    if(!children.length)return '';
    return '<section class="sidebar-group"><div class="group-title"><span class="folder-caret">⌄</span>'+escapeHtml(g.title)+'</div>'+
      children.map(p=>{
        const tasks=tasksFor(p.id);
        const work=tasks.filter(t=>t.status==='in_process').length;
        const approval=tasks.filter(t=>t.status==='awaiting_approval').length;
        return '<a class="project-link '+(active===p.id?'active':'')+'" href="#/project/'+encodeURIComponent(p.id)+'">'+
          '<span class="project-name">'+escapeHtml(p.title)+'</span>'+
          '<span class="project-meta">'+escapeHtml(p.current_phase||p.status||'')+'</span>'+
          '<span class="project-counts">'+(work?'<b>'+work+' active</b> ':'')+(approval?'<em>'+approval+' review</em>':'')+'</span>'+
        '</a>';
      }).join('')+
    '</section>';
  }).join('');
}

function tasksFor(projectId){
  return (state.tasksData?.tasks||[]).filter(t=>t.project_id===projectId);
}

function taskVisible(t){
  const hay=(t.title+' '+(t.section||'')+' '+(t.notes||'')+' '+(t.owner||'')+' '+(t.waiting_on||'')).toLowerCase();
  if(state.query&&!hay.includes(state.query))return false;
  if(state.peopleFilter==='all')return true;
  if(state.peopleFilter.startsWith('owner:'))return t.owner===state.peopleFilter.slice(6);
  if(state.peopleFilter.startsWith('wait:'))return t.waiting_on===state.peopleFilter.slice(5);
  return true;
}

function renderProject(project){
  if(!project)return;
  const all=tasksFor(project.id);
  const visible=all.filter(taskVisible);
  const counts=Object.fromEntries(STAGES.map(s=>[s.key,all.filter(t=>t.status===s.key).length]));
  const owners=[...new Set(all.map(t=>t.owner).filter(Boolean))];
  const waiters=[...new Set(all.map(t=>t.waiting_on).filter(Boolean))];

  document.querySelector('#projectTitle').textContent=project.chat_name||project.title;
  document.querySelector('#projectSubtitle').textContent=(groupTitle(project.group)||project.group)+' · '+(project.current_phase||'');
  document.title=(project.chat_name||project.title)+' — Project Control Center';

  document.querySelector('#summary').innerHTML=
    '<div class="summary-main"><div><div class="eyebrow">Current phase</div><h2>'+escapeHtml(project.current_phase||'—')+'</h2></div>'+
    '<div><div class="eyebrow">Last action</div><p>'+escapeHtml(project.last_action||'—')+'</p></div>'+
    '<div><div class="eyebrow">Next action</div><p>'+escapeHtml(project.next_action||'—')+'</p></div></div>'+
    '<div class="summary-links">'+
      (project.audit_path?'<a target="_blank" rel="noopener" href="https://github.com/'+escapeAttr(project.repository)+'/blob/main/'+escapeAttr(project.audit_path)+'">Audit ledger ↗</a>':'')+
      (project.website?' <a target="_blank" rel="noopener" href="'+escapeAttr(project.website)+'">Open project/site ↗</a>':'')+
    '</div>';

  document.querySelector('#metrics').innerHTML=STAGES.map(s=>
    '<div class="metric-card '+s.key+'"><span>'+escapeHtml(s.title)+'</span><strong>'+counts[s.key]+'</strong></div>'
  ).join('');

  const fixedFilters=[
    ['all','All people'],
    ['owner:Jay','Jay tasks'],
    ['owner:Adam','Adam tasks'],
    ['owner:ChatGPT','ChatGPT tasks'],
    ['wait:Jay','Waiting on Jay'],
    ['wait:Adam','Waiting on Adam']
  ];
  const extras=[
    ...owners.filter(x=>!['Jay','Adam','ChatGPT'].includes(x)).map(x=>['owner:'+x,x+' tasks']),
    ...waiters.filter(x=>!['Jay','Adam'].includes(x)).map(x=>['wait:'+x,'Waiting on '+x])
  ];
  const filters=[...fixedFilters,...extras];
  document.querySelector('#peopleFilters').innerHTML=filters.map(([v,l])=>
    '<button type="button" class="person-filter '+(state.peopleFilter===v?'active':'')+'" data-filter="'+escapeAttr(v)+'">'+escapeHtml(l)+'</button>'
  ).join('');
  document.querySelectorAll('.person-filter').forEach(btn=>btn.addEventListener('click',()=>{
    state.peopleFilter=btn.dataset.filter;
    renderProject(project);
  }));

  document.querySelector('#approvalRule').textContent='Approval rule: “Completed” means waiting for your approval. Rejected work returns to In Process.';

  document.querySelector('#board').innerHTML=STAGES.map(stage=>{
    const cards=visible.filter(t=>t.status===stage.key);
    return '<section class="kanban-column '+stage.key+'">'+
      '<div class="column-head"><div><h3>'+escapeHtml(stage.title)+'</h3><p>'+escapeHtml(stage.hint)+'</p></div><span>'+cards.length+'</span></div>'+
      '<div class="column-body">'+(cards.length?cards.map(taskCard).join(''):'<div class="empty-column">No tasks</div>')+'</div>'+
    '</section>';
  }).join('');
}

function taskCard(t){
  const risk=t.verification==='fail'?' fail':t.verification==='pending'?' pending-check':'';
  return '<article class="task-card'+risk+'">'+
    '<div class="task-top"><span class="section-pill">'+escapeHtml(t.section||'Task')+'</span>'+
      (t.verification?'<span class="verify '+escapeAttr(t.verification)+'">'+escapeHtml(t.verification)+'</span>':'')+
    '</div>'+
    '<h4>'+escapeHtml(t.title)+'</h4>'+
    (t.notes?'<p>'+escapeHtml(t.notes)+'</p>':'')+
    '<div class="task-meta"><span><b>Owner</b>'+escapeHtml(t.owner||'—')+'</span>'+
      '<span><b>Waiting on</b>'+escapeHtml(t.waiting_on||'—')+'</span></div>'+
    '<div class="task-date">Updated '+escapeHtml(formatDate(t.updated_at))+'</div>'+
  '</article>';
}

function groupTitle(id){
  return (state.projectsData?.groups||[]).find(g=>g.id===id)?.title||id;
}

function formatDate(v){
  if(!v)return '—';
  const d=new Date(v);
  if(Number.isNaN(d.getTime()))return v;
  return d.toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
}

function escapeHtml(v){
  return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function escapeAttr(v){return escapeHtml(v);}

boot();