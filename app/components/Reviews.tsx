'use client'

import { useState } from 'react'

const GOOGLE_REVIEW = 'https://www.google.com/maps/place/Chizzychops+%26+grillz/@6.6012076,3.3115685,17z/data=!3m1!4b1!4m6!3m5!1s0x103b91874096c5a9:0x354c0d35e0957b4f!8m2!3d6.6012076!4d3.3115685!16s%2Fg%2F11pclvf9lj?entry=ttu#lrd=0x103b91874096c5a9:0x354c0d35e0957b4f,3'
const GOOGLE_MAP = 'https://www.google.com/maps/place/Chizzychops+%26+grillz/@6.6012076,3.3115685,17z/data=!3m1!4b1!4m6!3m5!1s0x103b91874096c5a9:0x354c0d35e0957b4f!8m2!3d6.6012076!4d3.3115685!16s%2Fg%2F11pclvf9lj'

const testimonials = [
  { name: 'Adaeze Okonkwo', location: 'Victoria Island, Lagos', initials: 'AO', rating: 5, dish: 'Basmati Jollof Rice', date: '2 weeks ago', text: 'Absolutely incredible! The jollof rice had the perfect smoky bottom and the chicken was so tender. I order every Friday and it never disappoints. Best food delivery in Lagos!' },
  { name: 'Emeka Tunde',    location: 'Ikeja, Lagos',           initials: 'ET', rating: 5, dish: 'Special Fried Rice',  date: '1 month ago', text: 'Their fried rice and chicken combo is amazing — always delivered hot and on time. My whole family looks forward to it every week. Worth every kobo!' },
  { name: 'Funmilayo Bello',location: 'Lekki, Lagos',           initials: 'FB', rating: 5, dish: 'Event Catering',      date: '3 weeks ago', text: 'Handled my birthday catering for 60 guests perfectly. Every single guest complimented the food. The grilled chicken especially — people were going back for thirds!' },
  { name: 'Chukwudi Madu',  location: 'Surulere, Lagos',        initials: 'CM', rating: 5, dish: 'Nkwobi',             date: '5 days ago',  text: 'The Nkwobi is genuinely authentic — tastes like it came straight from the east. Packaging was excellent, delivery was fast. I\'ve already recommended to 5 people!' },
  { name: 'Sola Adeyemi',   location: 'Akowonjo, Lagos',        initials: 'SA', rating: 5, dish: 'Daily Customer',     date: '1 week ago',  text: 'I order at least 3 times a week. The consistency is what gets me — every single order is fresh, hot and full of flavour. Customer service is also top-notch!' },
  { name: 'Ngozi Kalu',     location: 'Alimosho, Lagos',        initials: 'NK', rating: 5, dish: 'Breakfast Box',      date: '2 months ago',text: 'The breakfast box for my husband\'s birthday was beautifully presented and tasted even better than it looked. He was over the moon. Will definitely order again!' },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#FBBF24">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [active, setActive] = useState(0)

  return (
    <section id="reviews" style={{ background: 'var(--brand-surface)', padding: '6rem 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '1rem', marginBottom: '4rem' }}>
          <div>
            <span className="section-label">Customer Love</span>
            <h2 className="section-title">What People <span className="flame-text">Are Saying</span></h2>
            <div className="divider" />
          </div>
          {/* Google rating badge */}
          <a href={GOOGLE_MAP} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', transition: 'border-color 0.2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(251,191,36,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
              <GoogleIcon />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600 }}>Google</span>
            </div>
            <p style={{ color: '#FBBF24', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1 }}>4.9</p>
            <Stars count={5} />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6875rem', marginTop: '0.375rem' }}>500+ reviews</p>
          </a>
        </div>

        {/* Featured quote */}
        <div style={{ position: 'relative', borderRadius: '1.25rem', padding: '3rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(220,38,38,0.04))', border: '1px solid rgba(249,115,22,0.15)' }}>
          <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', fontFamily: 'Georgia,serif', fontSize: '5rem', color: 'rgba(249,115,22,0.12)', lineHeight: 1 }}>&ldquo;</div>
          <p style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(1rem,2vw,1.25rem)', fontStyle: 'italic', lineHeight: 1.75, maxWidth: '48rem', margin: '0 auto 2rem', textAlign: 'center' }}>
            {testimonials[active].text}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'linear-gradient(135deg,#F97316,#DC2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '0.875rem', flexShrink: 0 }}>
              {testimonials[active].initials}
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9375rem' }}>{testimonials[active].name}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>{testimonials[active].location} · Ordered: {testimonials[active].dish}</p>
            </div>
            <Stars count={5} />
          </div>
          {/* Nav dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ width: i === active ? '1.75rem' : '0.375rem', height: '0.375rem', borderRadius: '9999px', background: i === active ? '#F97316' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>

        {/* Review cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {testimonials.map((t, i) => (
            <button key={t.name} onClick={() => setActive(i)}
              style={{ textAlign: 'left', padding: '1.25rem', borderRadius: '1rem', border: '1px solid', borderColor: i === active ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.07)', background: i === active ? 'rgba(249,115,22,0.07)' : 'var(--brand-card)', cursor: 'pointer', transition: 'all 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'linear-gradient(135deg,#F97316,#DC2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{t.location}</p>
                </div>
                <Stars count={t.rating} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {t.text}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.875rem' }}>
                <span style={{ fontSize: '0.6875rem', color: 'rgba(249,115,22,0.7)', fontWeight: 600 }}>{t.dish}</span>
                <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>{t.date}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Google review CTA */}
        <div style={{ borderRadius: '1.25rem', padding: '2rem 2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.375rem' }}>Had a great experience? Let the world know!</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>Your Google review helps others discover us and keeps us motivated.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={GOOGLE_REVIEW} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '9999px', background: '#fff', color: '#000', fontWeight: 800, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s ease', boxShadow: '0 4px 16px rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <GoogleIcon /> Leave a Google Review
            </a>
            <a href="https://www.instagram.com/chizzychops1/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '9999px', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(225,48,108,0.5)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
              Tag us @chizzychops1
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}