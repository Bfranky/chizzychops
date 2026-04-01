'use client'

import { useState } from 'react'

type Step = 1 | 2 | 3

const timeSlots = ['11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM']
const guestCounts = ['1','2','3','4','5','6','7–10','10+']
const occasions   = ['No special occasion','Birthday 🎂','Anniversary 💑','Business Lunch','Date Night','Family Gathering','Corporate Event','Celebration 🎉']

interface Form { name:string; phone:string; email:string; date:string; time:string; guests:string; occasion:string; requests:string }

const tomorrow = () => { const d = new Date(); d.setDate(d.getDate()+1); return d.toISOString().split('T')[0] }

export default function Reservation() {
  const [step, setStep]   = useState<Step>(1)
  const [form, setForm]   = useState<Form>({ name:'',phone:'',email:'',date:'',time:'',guests:'',occasion:'No special occasion',requests:'' })
  const [done, setDone]   = useState(false)

  const set = (k: keyof Form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const buildMsg = () => {
    const lines = [
      `🍽️ *Table Reservation – Chizzychops & Grillz*`, ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      form.email ? `📧 *Email:* ${form.email}` : null,
      ``, `📅 *Date:* ${form.date}`,
      `⏰ *Time:* ${form.time}`,
      `👥 *Guests:* ${form.guests}`,
      `🎉 *Occasion:* ${form.occasion}`,
      form.requests ? `\n✍️ *Requests:*\n${form.requests}` : null,
    ].filter(Boolean).join('\n')
    return `https://wa.me/2348094946923?text=${encodeURIComponent(lines as string)}`
  }

  const handleSubmit = () => { setDone(true); setTimeout(() => window.open(buildMsg(), '_blank'), 400) }
  const reset = () => { setDone(false); setStep(1); setForm({ name:'',phone:'',email:'',date:'',time:'',guests:'',occasion:'No special occasion',requests:'' }) }

  if (done) return (
    <section id="reservation" className="section" style={{ background:'var(--brand-surface)' }}>
      <div className="container">
        <div style={{ maxWidth:'28rem', margin:'0 auto', textAlign:'center', padding:'2rem 0' }}>
          <div style={{ width:'5rem', height:'5rem', borderRadius:'50%', background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.25rem', margin:'0 auto 1.5rem' }}>✅</div>
          <h3 style={{ fontFamily:'var(--font-playfair)', color:'#fff', fontSize:'1.75rem', fontWeight:700, marginBottom:'0.75rem' }}>Booking Request Sent!</h3>
          <p style={{ color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:'2rem' }}>WhatsApp has been opened with your details. We&apos;ll confirm your reservation shortly.</p>
          <div style={{ borderRadius:'1rem', padding:'1.5rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', textAlign:'left', marginBottom:'2rem' }}>
            {[['Name',form.name],['Date',form.date],['Time',form.time],['Guests',form.guests],['Occasion',form.occasion]].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.875rem' }}>{k}</span>
                <span style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem' }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={reset} style={{ color:'#F97316', fontWeight:700, fontSize:'0.9rem', background:'none', border:'none', cursor:'pointer' }}>← Make Another Booking</button>
        </div>
      </div>
    </section>
  )

  const stepLabels = ['Your Details','Date & Time','Confirm']

  return (
    <section id="reservation" className="section" style={{ background:'var(--brand-surface)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span className="section-label">Dine With Us</span>
          <h2 className="section-title">Book Your <span className="flame-text">Table</span></h2>
          <div className="divider divider-center" />
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'0.9375rem', maxWidth:'26rem', margin:'0 auto' }}>
            Reserve in minutes. We&apos;ll confirm via WhatsApp and ensure everything is perfect.
          </p>
        </div>

        {/* Desktop: 2-col | Mobile: single col */}
        <div style={{ display:'grid', gap:'2.5rem' }} className="res-grid">

          {/* Left info — hidden on mobile, shown on desktop */}
          <div className="res-info">
            {[
              { icon:'⏰', title:'Opening Hours', lines:['Mon–Sun: Open daily','Last seating at 7:30 PM'] },
              { icon:'📍', title:'Our Location',  lines:['5 Obadare Close, Santos Estate','Akowonjo, Alimosho, Lagos'] },
              { icon:'📞', title:'Quick Enquiry', lines:['WhatsApp: 0809 494 6923','We reply within minutes'] },
            ].map(c => (
              <div key={c.title} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1.125rem', borderRadius:'0.875rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', marginBottom:'0.875rem' }}>
                <span style={{ fontSize:'1.25rem', flexShrink:0 }}>{c.icon}</span>
                <div>
                  <p style={{ color:'#fff', fontWeight:700, fontSize:'0.9rem', marginBottom:'0.25rem' }}>{c.title}</p>
                  {c.lines.map(l => <p key={l} style={{ color:'rgba(255,255,255,0.42)', fontSize:'0.8125rem' }}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div>
            {/* Step indicator */}
            <div style={{ display:'flex', alignItems:'center', marginBottom:'1.25rem' }}>
              {([1,2,3] as Step[]).map((s, i) => (
                <div key={s} style={{ display:'flex', alignItems:'center', flex: i < 2 ? 1 : 'none' }}>
                  <div style={{ width:'2rem', height:'2rem', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'0.8125rem', flexShrink:0, transition:'all 0.3s',
                    background: step > s ? '#25D366' : step === s ? 'linear-gradient(135deg,#F97316,#DC2626)' : 'rgba(255,255,255,0.08)',
                    color: step >= s ? '#fff' : 'rgba(255,255,255,0.3)',
                    boxShadow: step === s ? '0 0 14px rgba(249,115,22,0.4)' : 'none' }}>
                    {step > s ? '✓' : s}
                  </div>
                  {i < 2 && <div style={{ height:'2px', flex:1, margin:'0 0.375rem', transition:'background 0.4s', background: step > s ? '#25D366' : 'rgba(255,255,255,0.08)' }} />}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.75rem' }}>
              {stepLabels.map((l, i) => (
                <span key={l} style={{ fontSize:'0.6875rem', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color: step === i+1 ? '#F97316' : step > i+1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }}>{l}</span>
              ))}
            </div>

            {/* Form card */}
            <div style={{ borderRadius:'1.25rem', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.025)', padding:'1.75rem' }}>

              {step === 1 && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  <Field label="Full Name *"><input className="form-input" type="text" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Amaka Johnson" /></Field>
                  <Field label="Phone / WhatsApp *"><input className="form-input" type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="0809 494 6923" /></Field>
                  <Field label="Email (optional)"><input className="form-input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="your@email.com" /></Field>
                  <NavBtns canNext={!!(form.name && form.phone)} onNext={()=>setStep(2)} showBack={false} onBack={()=>{}} />
                </div>
              )}

              {step === 2 && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                  <Field label="Date *"><input className="form-input" type="date" value={form.date} min={tomorrow()} onChange={e=>set('date',e.target.value)} /></Field>

                  <Field label="Preferred Time *">
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.4rem' }}>
                      {timeSlots.map(t => (
                        <button key={t} onClick={()=>set('time',t)} style={{ padding:'0.5rem 0.25rem', borderRadius:'0.5rem', fontSize:'0.75rem', fontWeight:600, border:'1px solid', cursor:'pointer', transition:'all 0.15s', textAlign:'center',
                          borderColor: form.time===t ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.08)',
                          background:  form.time===t ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.03)',
                          color:       form.time===t ? '#FB923C' : 'rgba(255,255,255,0.55)' }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Guests *">
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                      {guestCounts.map(g => (
                        <button key={g} onClick={()=>set('guests',g)} style={{ padding:'0.5rem 1rem', borderRadius:'9999px', fontSize:'0.875rem', fontWeight:700, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                          borderColor: form.guests===g ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.08)',
                          background:  form.guests===g ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.03)',
                          color:       form.guests===g ? '#FB923C' : 'rgba(255,255,255,0.55)' }}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <NavBtns canNext={!!(form.date && form.time && form.guests)} onNext={()=>setStep(3)} showBack onBack={()=>setStep(1)} />
                </div>
              )}

              {step === 3 && (
                <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  <Field label="Occasion">
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                      {occasions.map(o => (
                        <button key={o} onClick={()=>set('occasion',o)} style={{ padding:'0.4rem 0.875rem', borderRadius:'9999px', fontSize:'0.8125rem', fontWeight:600, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                          borderColor: form.occasion===o ? 'rgba(249,115,22,0.6)' : 'rgba(255,255,255,0.08)',
                          background:  form.occasion===o ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.03)',
                          color:       form.occasion===o ? '#FB923C' : 'rgba(255,255,255,0.5)' }}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Special Requests">
                    <textarea className="form-input" value={form.requests} onChange={e=>set('requests',e.target.value)} placeholder="Allergies, seating preferences, decorations..." rows={3} style={{ resize:'none' }} />
                  </Field>

                  {/* Summary card */}
                  <div style={{ borderRadius:'0.875rem', padding:'1rem', background:'rgba(249,115,22,0.06)', border:'1px solid rgba(249,115,22,0.14)' }}>
                    <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.6875rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>Booking Summary</p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.625rem' }}>
                      {[['Name',form.name],['Date',form.date],['Time',form.time],['Guests',form.guests]].map(([k,v]) => (
                        <div key={k}>
                          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.6875rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>{k}</p>
                          <p style={{ color:'#fff', fontWeight:600, fontSize:'0.875rem' }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <NavBtns canNext={true} onNext={handleSubmit} showBack onBack={()=>setStep(2)} submitLabel="Confirm via WhatsApp" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .res-grid { grid-template-columns: 1fr; }
        @media (min-width: 768px) {
          .res-grid { grid-template-columns: 1fr 1.4fr; }
        }
        .res-info { display: none; }
        @media (min-width: 768px) {
          .res-info { display: block; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display:'block', color:'rgba(255,255,255,0.5)', fontSize:'0.8125rem', fontWeight:700, marginBottom:'0.5rem', letterSpacing:'0.03em' }}>{label}</label>
      {children}
    </div>
  )
}

function NavBtns({ canNext, onNext, showBack, onBack, submitLabel }: { canNext:boolean; onNext:()=>void; showBack:boolean; onBack:()=>void; submitLabel?:string }) {
  return (
    <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.5rem' }}>
      {showBack && (
        <button onClick={onBack} style={{ flex:1, padding:'0.875rem', borderRadius:'9999px', border:'1px solid rgba(255,255,255,0.12)', background:'transparent', color:'rgba(255,255,255,0.6)', fontWeight:700, cursor:'pointer', fontSize:'0.9375rem', transition:'border-color 0.2s' }}
          onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.3)')}
          onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.12)')}>
          ← Back
        </button>
      )}
      <button onClick={onNext} disabled={!canNext} className="btn-primary"
        style={{ flex: showBack ? 2 : 1, opacity: canNext ? 1 : 0.35, cursor: canNext ? 'pointer' : 'not-allowed' }}>
        {submitLabel ? <><WAIcon /> {submitLabel}</> : 'Continue →'}
      </button>
    </div>
  )
}

function WAIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
}