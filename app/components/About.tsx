'use client'

const stats = [
  { value:'4.9★', label:'Google Rating' },
  { value:'500+', label:'Happy Customers' },
  { value:'20+',  label:'Menu Items' },
  { value:'3yrs', label:'Serving Lagos' },
]

const pillars = [
  { icon:'🌿', title:'Fresh Daily',        desc:'Every ingredient sourced fresh each morning — no shortcuts, ever.' },
  { icon:'🔥', title:'Authentic Flavour',  desc:'True Nigerian recipes crafted and perfected over years of cooking.' },
  { icon:'⚡', title:'Fast & Reliable',    desc:'Consistent quality and on-time delivery you can always count on.' },
  { icon:'🎉', title:'Every Occasion',     desc:'Daily meals, events, birthdays, corporate — we handle it all.' },
]

export default function About() {
  return (
    <section id="about" className="section" style={{ background:'var(--brand-dark)', overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', top:'-10rem', right:'-10rem', width:'35rem', height:'35rem', borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.05),transparent 70%)', pointerEvents:'none' }} />

      <div className="container">
        {/* Stats bar */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderRadius:'1rem', overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)', marginBottom:'4.5rem' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding:'1.5rem 1rem', textAlign:'center', background: i%2===0?'rgba(255,255,255,0.03)':'rgba(255,255,255,0.015)', borderRight: i<3?'1px solid rgba(255,255,255,0.07)':'none' }}>
              <p className="gradient-text" style={{ fontFamily:'var(--font-playfair)', fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:700 }}>{s.value}</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.8125rem', fontWeight:600, marginTop:'0.25rem' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Two column */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="about-grid">
          {/* Image mosaic */}
          <div style={{ position:'relative' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'auto auto', gap:'0.75rem' }}>
              <div style={{ gridRow:'span 2', borderRadius:'1rem', overflow:'hidden', height:'clamp(18rem,28vw,26rem)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700&q=80" alt="Grilled chicken" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }}
                  onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')} />
              </div>
              <div style={{ borderRadius:'1rem', overflow:'hidden', height:'clamp(8rem,13vw,12rem)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80" alt="African dish" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }}
                  onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')} />
              </div>
              <div style={{ borderRadius:'1rem', overflow:'hidden', height:'clamp(8rem,13vw,12rem)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80" alt="Nigerian soup" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }}
                  onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')} />
              </div>
            </div>
            {/* Floating chip */}
            <div style={{ position:'absolute', bottom:'-1.25rem', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.625rem 1.125rem', borderRadius:'9999px', background:'var(--brand-card)', border:'1px solid rgba(251,191,36,0.3)', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', whiteSpace:'nowrap', zIndex:2 }}>
              <span>⭐</span>
              <span style={{ color:'#fff', fontWeight:800, fontSize:'0.875rem' }}>4.9 on Google</span>
            </div>
          </div>

          {/* Text */}
          <div style={{ paddingTop:'1rem' }}>
            <span className="section-label">Our Story</span>
            <h2 className="section-title">Made with Love,<br /><span className="flame-text">Served with Pride</span></h2>
            <div className="divider" />
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.8, marginBottom:'1rem' }}>
              Chizzychops &amp; Grillz was born from a passion for authentic Nigerian cuisine and a commitment to making great food accessible to everyone in Lagos.
            </p>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.8, marginBottom:'2.5rem' }}>
              From our signature smoky grills to slow-cooked African soups, every dish is crafted with fresh ingredients and unwavering dedication to quality — whether it&apos;s one meal or catering for hundreds.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
              {pillars.map(p => (
                <div key={p.title} style={{ padding:'1.125rem', borderRadius:'0.875rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', transition:'border-color 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(249,115,22,0.3)')} onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.07)')}>
                  <span style={{ fontSize:'1.375rem', display:'block', marginBottom:'0.5rem' }}>{p.icon}</span>
                  <p style={{ color:'#fff', fontWeight:700, fontSize:'0.875rem', marginBottom:'0.25rem' }}>{p.title}</p>
                  <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.8125rem', lineHeight:1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-grid > div:first-child { order: 2; }
          .about-grid > div:last-child  { order: 1; }
        }
      `}</style>
    </section>
  )
}