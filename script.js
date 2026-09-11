const form=document.getElementById('screenForm');
form.addEventListener('submit',e=>{e.preventDefault();
 const age=Number(document.getElementById('age').value), tsh=Number(document.getElementById('tsh').value), t3=Number(document.getElementById('t3').value), t4=Number(document.getElementById('t4').value), med=Number(document.getElementById('med').value), history=Number(document.getElementById('history').value);
 // Educational demo scoring only — replace this function with a validated trained ML model for real research.
 let risk=8;
 if(tsh<0.4) risk+=28; else if(tsh>4.5) risk+=32; else if(tsh>3.0) risk+=12;
 if(t3<70||t3>190) risk+=16;
 if(t4<4.5||t4>12) risk+=16;
 if(med) risk+=5; if(history) risk+=8;
 risk=Math.max(3,Math.min(95,risk));
 const result=document.getElementById('result'); result.classList.remove('hidden');
 document.getElementById('score').textContent=risk+'%';
 document.getElementById('meterFill').style.width=risk+'%';
 const title=document.getElementById('resultTitle'), text=document.getElementById('resultText');
 if(risk<25){title.textContent='Lower model-estimated risk';text.textContent='The entered values produce a lower risk score in this educational demonstration. It does not rule out thyroid disease.';}
 else if(risk<55){title.textContent='Intermediate model-estimated risk';text.textContent='The entered values produce an intermediate score. A real assessment requires clinical context and appropriate laboratory interpretation.';}
 else{title.textContent='Higher model-estimated risk';text.textContent='The entered values produce a higher score in this demonstration. This is not a diagnosis; a qualified healthcare professional should interpret actual results.';}
 result.scrollIntoView({behavior:'smooth',block:'start'});
});
