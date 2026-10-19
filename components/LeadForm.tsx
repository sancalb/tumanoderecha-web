'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
const initial = {name:'',company:'',email:'',country:'',phone:'',size:'',challenge:'',detail:'',website:'',consent:false};
export default function LeadForm(){
 const [values,setValues]=useState(initial); const [state,setState]=useState<'idle'|'loading'|'success'|'error'>('idle');const [msg,setMsg]=useState('');
 function update(key:keyof typeof initial,val:string|boolean){setValues(x=>({...x,[key]:val}));}
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setState('loading');setMsg('');try{
 const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});const d=await r.json();if(!r.ok)throw new Error(d.error||'Error al enviar');setState('success');setValues(initial);
 }catch(err){setState('error');setMsg(err instanceof Error?err.message:'No se pudo enviar.');}}
 if(state==='success')return <div className="form-success" role="status"><CheckCircle2 size={38}/><h3>Recibimos tu solicitud</h3><p>Gracias por escribirnos. Revisaremos tu información para continuar la conversación.</p><button className="btn btn-outline" type="button" onClick={()=>setState('idle')}>Enviar otra solicitud</button></div>;
 return <form className="lead-form" onSubmit={submit}>
  <div className="form-two"><label>Tu nombre *<input value={values.name} onChange={e=>update('name',e.target.value)} required maxLength={90} autoComplete="name" placeholder="Nombre y apellido"/></label><label>Empresa *<input value={values.company} onChange={e=>update('company',e.target.value)} required maxLength={120} placeholder="Nombre de la empresa"/></label></div>
  <div className="form-two"><label>Correo empresarial *<input type="email" value={values.email} onChange={e=>update('email',e.target.value)} required maxLength={180} autoComplete="email" placeholder="tu@empresa.com"/><span className="form-hint">Aquí podemos responder a tu solicitud.</span></label><label>País *<input value={values.country} onChange={e=>update('country',e.target.value)} required maxLength={80} autoComplete="country-name" placeholder="México"/></label></div>
  <div className="form-two"><label>Teléfono (opcional)<input value={values.phone} onChange={e=>update('phone',e.target.value)} maxLength={40} type="tel" autoComplete="tel" placeholder="Con clave de país"/></label><label>Tamaño del equipo<select value={values.size} onChange={e=>update('size',e.target.value)}><option value="">Seleccionar</option><option>1–4 personas</option><option>5–15 personas</option><option>16–30 personas</option><option>31–100 personas</option><option>Más de 100</option></select></label></div>
  <label>¿Qué necesitas mejorar primero? *<select value={values.challenge} onChange={e=>update('challenge',e.target.value)} required><option value="">Seleccionar prioridad</option><option value="finanzas">Rentabilidad, cobranza o finanzas</option><option value="operacion">Control operativo y responsables</option><option value="ventas">Ventas y seguimiento comercial</option><option value="datos">Indicadores e información confiable</option><option value="estrategia">Estrategia y toma de decisiones</option><option value="otros">Necesito ayuda para identificarlo</option></select></label>
  <label>Cuéntanos brevemente (opcional)<textarea rows={3} value={values.detail} onChange={e=>update('detail',e.target.value)} maxLength={800} placeholder="¿Qué está pasando y qué te gustaría mejorar?"/></label>
  <div className="honey" aria-hidden="true"><label>No llenar este campo<input tabIndex={-1} autoComplete="off" value={values.website} onChange={e=>update('website',e.target.value)}/></label></div>
  <label className="consent"><input type="checkbox" checked={values.consent} onChange={e=>update('consent',e.target.checked)} required/><span>Autorizo el uso de mis datos para responder a esta solicitud y confirmo haber leído el <Link href="/aviso-de-privacidad" target="_blank">aviso de privacidad</Link>. *</span></label>
  {state==='error'&&<p className="form-error" role="alert">{msg}</p>}
  <button className="btn btn-gold submit" disabled={state==='loading'} type="submit">{state==='loading'?<><LoaderCircle size={18} className="spin"/> Enviando...</>:<>Solicitar contacto <ArrowRight size={18}/></>}</button>
  <p className="form-hint">La solicitud no reserva automáticamente una cita. Nos pondremos en contacto para confirmar el siguiente paso.</p>
 </form>;
}
