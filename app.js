const key = 'mini-expense-v1';
const listEl = document.getElementById('list');
const sumEl = document.getElementById('sum');
const amtEl = document.getElementById('amt');
const noteEl = document.getElementById('note');
const addBtn = document.getElementById('add');

let data = JSON.parse(localStorage.getItem(key) || '[]');

function save(){ localStorage.setItem(key, JSON.stringify(data)); render(); }
function render(){
  listEl.innerHTML = '';
  let sum = 0;
  data.forEach((item, i) => {
    sum += +item.amount;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.note}</span><span>${item.amount}</span>`;
    li.onclick = () => { if(confirm('Delete entry?')){ data.splice(i,1); save(); } };
    listEl.appendChild(li);
  });
  sumEl.textContent = sum.toFixed(2);
}
addBtn.onclick = () => {
  const amount = parseFloat(amtEl.value || '0');
  const note = noteEl.value.trim() || '—';
  if(!amount){ alert('Enter amount'); return; }
  data.push({ amount, note, t: Date.now() });
  amtEl.value=''; noteEl.value='';
  save();
};
render();