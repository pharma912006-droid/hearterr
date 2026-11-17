window.HC={};
HC.age=d=>{if(!d)return null;const b=new Date(d),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return a};
HC.bmi=(kg,cm)=>kg&&cm?kg/((cm/100)**2):null;
HC.bmiCat=(b,age)=>age!=null&&age<18?'Children and teens need BMI-for-age charts, not adult categories.':b<18.5?'Underweight':b<25?'Normal range':b<30?'Overweight':'Obesity';
HC.needsClearance=(p,last)=>['cvd','mi','stroke','hf','arr'].some(k=>p[k]==='yes')||(last&&(last.sys>=180||last.dia>=120));
const D='2026-11-13',R={
 aha:{org:'American Heart Association',title:'High blood pressure',url:'https://www.heart.org/en/health-topics/high-blood-pressure'},
 sod:{org:'WHO',title:'Salt reduction fact sheet',url:'https://www.who.int/news-room/fact-sheets/detail/salt-reduction'},
 diet:{org:'WHO',title:'Healthy diet fact sheet',url:'https://www.who.int/news-room/fact-sheets/detail/healthy-diet'},
 pa:{org:'WHO',title:'Physical activity fact sheet',url:'https://www.who.int/news-room/fact-sheets/detail/physical-activity'},
 k:{org:'NIH Office of Dietary Supplements',title:'Potassium fact sheet',url:'https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/'},
 vk:{org:'NIH Office of Dietary Supplements',title:'Vitamin K fact sheet',url:'https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/'}};
HC.recommend=(p,meds,last)=>{
 const o=[],y=p||{},has=c=>meds.some(m=>m.cls===c),add=(level,title,why,factors,ref,warn)=>o.push({level,title,why,factors,ref:R[ref],warn,date:D});
 if(last&&last.sys>=180&&last.dia>=120||last&&(last.sys>=180||last.dia>=120))add('urgent','Very high blood pressure reading','A reading of 180/120 mmHg or above is in the range the AHA calls a hypertensive crisis. Recheck after resting a few minutes.',[`Latest reading ${last.sys}/${last.dia}`],'aha','If you have chest pain, breathlessness, weakness, vision or speech changes, call emergency services now (Egypt: 123). Otherwise contact your clinician today.');
 if(y.htn==='yes'){add('info','Home blood pressure monitoring','Regular, correctly taken readings help you and your clinician see trends.',['Hypertension: yes'],'aha');
  add('lifestyle','Lower-sodium eating','WHO advises under 5 g of salt (about 2 g sodium) per day for adults.',['Hypertension: yes'],'sod');
  add('review','Check supplement safety first','Some supplements and salt substitutes raise potassium or interact with blood-pressure medicines. Do not start potassium on your own.',['Hypertension: yes'],'k','Ask your pharmacist or doctor before adding any supplement.')}
 if(y.chol==='yes'){add('lifestyle','Heart-friendly fats','WHO advises keeping saturated fat under 10% of energy and trans fat under 1%. Favor unsaturated fats such as olive oil, nuts and fish.',['High cholesterol: yes'],'diet');
  add('info','Lipid monitoring','Cholesterol is tracked with blood tests at intervals your clinician sets. Enter results only when you have them.',['High cholesterol: yes'],'diet')}
 if(y.dm==='yes')add('review','Diabetes and activity','Physical activity can lower blood sugar. If you use insulin or sugar-lowering tablets, ask your clinician about low-sugar precautions around exercise.',['Diabetes: yes'],'pa');
 if(y.ckd==='yes')add('review','Kidney disease and supplements','Potassium, magnesium and some vitamins can build up when kidneys work less well.',['Kidney disease: yes'],'k','Do not take supplements without kidney-team advice.');
 if(['cvd','mi','stroke','hf','arr'].some(k=>y[k]==='yes'))add('review','Have a healthcare professional review your plan','With a heart or circulation diagnosis, safe activity and nutrition depend on your own treatment. Strenuous plans are not generated here.',['Cardiovascular diagnosis: yes'],'pa','Get medical clearance before starting or increasing exercise.');
 if(has('acei')||has('arb'))add('review','Potassium and your blood-pressure medicine','ACE inhibitors and ARBs can raise blood potassium. Potassium supplements and potassium-based salt substitutes need clinician approval.',[`Takes ${meds.filter(m=>m.cls==='acei'||m.cls==='arb').map(m=>m.name).join(', ')}`],'k','Do not stop or change prescribed medicine on your own.');
 if(has('warfarin'))add('review','Warfarin: keep vitamin K steady','Vitamin K opposes warfarin. Keep leafy-green intake consistent and attend INR checks. Report new supplements or antibiotics to your clinic.',['Takes warfarin'],'vk','Seek urgent care for black stools, vomiting blood, head injury or bleeding that will not stop.');
 if(!o.some(r=>r.level!=='urgent'))add('info','General heart-health basics','Regular activity, a plant-rich diet with less salt, no tobacco, enough sleep and periodic blood pressure checks lower cardiovascular risk.',[p?'No listed conditions':'Profile not completed'],'pa');
 return o};
