const form = document.getElementById('screenForm');
const result = document.getElementById('result');
const sampleBtn = document.getElementById('sampleBtn');
const againBtn = document.getElementById('againBtn');

function fillSample(){
  document.getElementById('age').value = 35;
  document.getElementById('tsh').value = 2.5;
  document.getElementById('t3').value = 120;
  document.getElementById('t4').value = 8;
  document.getElementById('med').value = 0;
  document.getElementById('history').value = 0;
}

sampleBtn?.addEventListener('click', fillSample);
againBtn?.addEventListener('click', () => {
  document.getElementById('screening').scrollIntoView({behavior:'smooth', block:'start'});
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const tsh = Number(document.getElementById('tsh').value);
  const t3 = Number(document.getElementById('t3').value);
  const t4 = Number(document.getElementById('t4').value);
  const med = Number(document.getElementById('med').value);
  const history = Number(document.getElementById('history').value);

  // Educational demo scoring only — replace with a validated trained ML model for research.
  let risk = 8;
  if(tsh < 0.4) risk += 28;
  else if(tsh > 4.5) risk += 32;
  else if(tsh > 3) risk += 12;
  if(t3 < 70 || t3 > 190) risk += 16;
  if(t4 < 4.5 || t4 > 12) risk += 16;
  if(med) risk += 5;
  if(history) risk += 8;
  risk = Math.max(3, Math.min(95, risk));

  result.classList.remove('hidden');
  document.getElementById('score').textContent = risk + '%';
  document.getElementById('meterFill').style.width = risk + '%';
  document.querySelector('.score-ring').style.background = `radial-gradient(circle at center,#0a1b2a 58%,transparent 59%),conic-gradient(#5de6d2 ${risk * 3.6}deg,#172d40 ${risk * 3.6}deg)`;

  const title = document.getElementById('resultTitle');
  const text = document.getElementById('resultText');
  const dot = document.getElementById('statusDot');
  if(risk < 25){
    title.textContent = 'Lower model-estimated risk';
    text.textContent = 'The entered values produce a lower score in this educational demonstration. A low score does not rule out thyroid conditions.';
  } else if(risk < 55){
    title.textContent = 'Intermediate model-estimated risk';
    text.textContent = 'The entered values produce an intermediate score. Real interpretation requires clinical context and appropriate laboratory reference ranges.';
  } else {
    title.textContent = 'Higher model-estimated risk';
    text.textContent = 'The entered values produce a higher score in this demonstration. This is not a diagnosis and actual results should be interpreted by a qualified healthcare professional.';
  }
  dot.style.background = '#5de6d2';
  setTimeout(() => result.scrollIntoView({behavior:'smooth', block:'start'}), 80);
});