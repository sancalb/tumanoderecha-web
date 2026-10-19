import { NextRequest, NextResponse } from 'next/server';
import { business } from '@/lib/site';
export const runtime = 'nodejs';
const VALID = new Set(['finanzas','operacion','ventas','datos','estrategia','otros']);
const mailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function clean(v: unknown, max = 300) { return typeof v === 'string' ? v.trim().slice(0,max) : ''; }
function escapeHtml(str: string) {return str.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}
export async function POST(req: NextRequest) {
 try {
  const data = await req.json();
  if (clean(data.website)) return NextResponse.json({ok:true}); // honeypot
  const name=clean(data.name,90), company=clean(data.company,120), email=clean(data.email,180), country=clean(data.country,80), phone=clean(data.phone,40), size=clean(data.size,50), challenge=clean(data.challenge,60), detail=clean(data.detail,800);
  if (!name||!company||!mailRe.test(email)||!country||!VALID.has(challenge)||data.consent !== true || detail.length>800) return NextResponse.json({error:'Revisa los campos requeridos y acepta el aviso de privacidad.'},{status:400});
  if (JSON.stringify(data).length>7000) return NextResponse.json({error:'Solicitud demasiado grande.'},{status:413});
  const key=process.env.RESEND_API_KEY, to=process.env.LEAD_TO_EMAIL, from=process.env.LEAD_FROM_EMAIL;
  if(!key||!to||!from) return NextResponse.json({error:'El formulario está pendiente de activación. Escríbenos a '+business.email+'.'},{status:503});
  const fields={Nombre:name,Empresa:company,Correo:email,País:country,Teléfono:phone||'No proporcionado',Tamaño:size||'No indicado',Reto:challenge,Descripción:detail||'No indicada'};
  const html='<h2>Nuevo prospecto — Tu Mano Derecha</h2>'+Object.entries(fields).map(([k,v])=>`<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`).join('')+'<p>Consentimiento de contacto recibido desde el formulario.</p>';
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:email,subject:`Nuevo prospecto: ${company}`,html})});
  if(!response.ok){console.error('Email provider error',response.status);return NextResponse.json({error:'No fue posible recibir tu solicitud. Intenta de nuevo o envía un correo.'},{status:502});}
  return NextResponse.json({ok:true});
 } catch {return NextResponse.json({error:'No se pudo procesar la solicitud.'},{status:400});}
}
