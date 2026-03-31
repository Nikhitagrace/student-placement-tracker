/* TrackerHub — lightweight interactivity (no frameworks) */

function $(sel, parent = document){ return parent.querySelector(sel); }
function $all(sel, parent = document){ return [...parent.querySelectorAll(sel)]; }

/* Active nav highlighting */
(function highlightNav(){
  const path = location.pathname.split("/").pop();
  $all(".nav a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
})();

/* Print as PDF (browser print -> Save as PDF) */
$all("[data-print]").forEach(btn=>{
  btn.addEventListener("click", ()=> window.print());
});

/* Modal system */
function openModal(id){ const el = $(id); if(el) el.classList.add("show"); }
function closeModal(id){ const el = $(id); if(el) el.classList.remove("show"); }

$all("[data-open]").forEach(b=>{
  b.addEventListener("click", ()=> openModal(b.dataset.open));
});
$all("[data-close]").forEach(b=>{
  b.addEventListener("click", ()=> closeModal(b.dataset.close));
});
$all(".modal-backdrop").forEach(bd=>{
  bd.addEventListener("click",(e)=>{
    if(e.target.classList.contains("modal-backdrop")) bd.classList.remove("show");
  });
});

/* Skills add */
(function skills(){
  const addBtn = $("#addSkillBtn");
  const input = $("#skillInput");
  const wrap = $("#skillsWrap");
  if(!addBtn || !input || !wrap) return;

  function addSkill(name){
    const skill = document.createElement("span");
    skill.className = "tag";
    skill.textContent = name;
    wrap.appendChild(skill);
  }

  addBtn.addEventListener("click", ()=>{
    const v = input.value.trim();
    if(!v) return;
    addSkill(v);
    input.value = "";
    closeModal("#skillModal");
  });
})();

/* Companies filter demo */
(function companiesFilter(){
  const q = $("#companySearch");
  const role = $("#roleFilter");
  const elig = $("#eligFilter");
  const cards = $all(".company[data-company]");

  if(!q || !role || !elig || cards.length === 0) return;

  function apply(){
    const query = q.value.trim().toLowerCase();
    const roleV = role.value;
    const eligV = elig.value;

    cards.forEach(c=>{
      const name = c.dataset.company.toLowerCase();
      const roleTag = c.dataset.role;
      const eligTag = c.dataset.elig;

      const okQ = !query || name.includes(query);
      const okR = (roleV === "all") || (roleTag === roleV);
      const okE = (eligV === "all") || (eligTag === eligV);

      c.style.display = (okQ && okR && okE) ? "" : "none";
    });
  }

  [q, role, elig].forEach(el=> el.addEventListener("input", apply));
  apply();
})();

/* New application modal */
(function applications(){
  const save = $("#saveAppBtn");
  const table = $("#appsTableBody");
  if(!save || !table) return;

  save.addEventListener("click", ()=>{
    const company = $("#appCompany").value.trim();
    const role = $("#appRole").value.trim();
    const date = $("#appDate").value;
    const status = $("#appStatus").value;

    if(!company || !role || !date) return;

    const initials = company.slice(0,1).toUpperCase();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="company-cell">
          <div class="cico">${initials}</div>
          <div>
            <div style="font-weight:1000">${company}</div>
            <div class="small">${role}</div>
          </div>
        </div>
      </td>
      <td>${new Date(date).toLocaleDateString()}</td>
      <td>
        <div class="timeline">
          <span class="dotx on"></span>
          <span class="dotx ${status === "Interviewing" ? "mid" : ""}"></span>
          <span class="dotx ${status === "Selected" ? "on" : ""}"></span>
          <span class="dotx"></span>
        </div>
      </td>
      <td>
        <span class="badge ${
          status === "Interviewing" ? "warning" :
          status === "Selected" ? "success" :
          status === "Rejected" ? "danger" : "neutral"
        }">${status}</span>
      </td>
      <td class="small">Added by student</td>
      <td class="actions">
        <button class="btn-mini">View</button>
      </td>
    `;
    table.prepend(tr);

    closeModal("#newAppModal");
    $("#appCompany").value = "";
    $("#appRole").value = "";
    $("#appDate").value = "";
    $("#appStatus").value = "Applied";
  });
})();