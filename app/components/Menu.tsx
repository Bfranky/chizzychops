'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'
import type { MenuItem } from '@/app/lib/supabase'

// ── Types ─────────────────────────────────────────────────
type Item = {
  id: string; name: string; price: number; priceLabel: string
  cat: string; subcat?: string; desc: string; img: string; img2?: string
  badge?: string; badgeColor?: string; note?: string
}

// Convert DB row → component Item
function toItem(r: MenuItem): Item {
  return {
    id:         r.id,
    name:       r.name,
    price:      r.price,
    priceLabel: '₦' + r.price.toLocaleString('en-NG'),
    cat:        r.category,
    subcat:     r.subcat ?? undefined,
    desc:       r.description,
    img:        r.img_url,
    img2:       r.img2_url ?? undefined,
    badge:      r.badge ?? undefined,
    badgeColor: r.badge_color ?? undefined,
    note:       r.note ?? undefined,
  }
}

const CATS = ['All', 'Soups', 'Stews', 'Rice & Pottage', 'Pasta & Rice', 'Food Boxes']

type CartItem = Item & { qty: number }

function formatPrice(n: number) {
  return '₦' + n.toLocaleString('en-NG')
}

// ══════════════════════════════════════════════════════════
// MAIN MENU COMPONENT
// ══════════════════════════════════════════════════════════
export default function Menu() {
  const [MENU, setMENU]         = useState<Item[]>([])
  const [loading, setLoading]   = useState(true)
  const [cat, setCat]           = useState('All')
  const [cart, setCart]         = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [showAll, setShowAll]   = useState(false)

  // Fetch from Supabase on mount
  useEffect(() => {
    supabase
      .from('menu_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setMENU(data.map(toItem))
        setLoading(false)
      })
  }, [])

  const filtered  = cat === 'All' ? MENU : MENU.filter(i => i.cat === cat)
  const displayed = showAll ? filtered : filtered.slice(0, 9)

  const addToCart = (item: Item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id)
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.id !== id))
  const changeQty = (id: string, d: number) => setCart(prev =>
    prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + d) } : c)
  )

  const total      = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const totalItems = cart.reduce((s, c) => s + c.qty, 0)

  const sendWhatsApp = () => {
    const lines = cart.map(c => `• ${c.name} x${c.qty} — ${formatPrice(c.price * c.qty)}`)
    const msg   = `🍽️ *Order from Chizzychops & Grillz*\n\n${lines.join('\n')}\n\n💰 *Total: ${formatPrice(total)}*\n\n📦 I understand delivery takes up to 6 hours as every meal is freshly home-cooked to order.\n\nPlease confirm my order and provide delivery details. Thank you!`
    window.open(`https://wa.me/2348094946923?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="menu" className="section" style={{ background: 'var(--brand-surface)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span className="section-label">What We Serve</span>
            <h2 className="section-title">Our <span className="flame-text">Menu</span></h2>
            <div className="divider" />
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.9375rem', maxWidth: '30rem', lineHeight: 1.7 }}>
              Every dish is cooked fresh from scratch, made with love right in our home kitchen —
              the way your grandmother would have made it.
            </p>
          </div>
          {totalItems > 0 && (
            <button onClick={() => setCartOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.75rem 1.25rem', borderRadius: '9999px', background: 'linear-gradient(135deg,#F97316,#DC2626)', border: 'none', color: '#fff', fontWeight: 800, fontSize: '0.9375rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(249,115,22,0.4)', transition: 'transform 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              🛒 View Order · <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '9999px', padding: '0.1rem 0.5rem' }}>{totalItems}</span>
            </button>
          )}
        </div>

        {/* Delivery Notice Banner */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(220,38,38,0.06))', border: '1px solid rgba(249,115,22,0.25)', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2rem', flexShrink: 0, marginTop: '2px' }}>🏡</div>
          <div style={{ flex: 1, minWidth: '16rem' }}>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '0.375rem', fontFamily: 'var(--font-playfair)' }}>
              Freshly Home-Cooked, Worth Every Minute
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75 }}>
              Every single order is cooked from scratch in our home kitchen — no pre-made shortcuts, no reheated meals.
              Just real, soulful Nigerian food made with care. Because of this, please allow
              <strong style={{ color: '#FBBF24' }}> up to 6 hours</strong> for your delivery.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0, alignSelf: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: '9999px', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)' }}>
              <span>⏱️</span>
              <span style={{ color: '#FBBF24', fontWeight: 800, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>Up to 6hrs delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: '9999px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
              <span>✅</span>
              <span style={{ color: '#4ADE80', fontWeight: 800, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>Always fresh, never frozen</span>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => { setCat(c); setShowAll(false) }}
              style={{ padding: '0.5rem 1.125rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 700, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                background: cat === c ? 'linear-gradient(135deg,#F97316,#DC2626)' : 'rgba(255,255,255,0.04)',
                color: cat === c ? '#fff' : 'rgba(255,255,255,0.55)',
                borderColor: cat === c ? 'transparent' : 'rgba(255,255,255,0.09)',
                boxShadow: cat === c ? '0 4px 16px rgba(249,115,22,0.3)' : 'none',
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px),1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRadius: '1rem', overflow: 'hidden', background: 'var(--brand-card)', border: '1px solid rgba(255,255,255,0.07)', height: '300px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
            <style>{`@keyframes pulse { 0%,100% { opacity:0.6 } 50% { opacity:0.3 } }`}</style>
          </div>
        ) : (
          <>
            {/* Menu grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px),1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {displayed.map(item => (
                <MenuCard key={item.id} item={item} inCart={cart.find(c => c.id === item.id)?.qty || 0} onAdd={() => addToCart(item)} />
              ))}
            </div>

            {filtered.length > 9 && (
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <button onClick={() => setShowAll(!showAll)} className="btn-secondary">
                  {showAll ? 'Show Less ↑' : `View All ${filtered.length} Items ↓`}
                </button>
              </div>
            )}

            {filtered.length === 0 && !loading && (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '3rem' }}>No items in this category yet.</p>
            )}
          </>
        )}

        <p style={{ textAlign: 'center', color: 'rgba(249,115,22,0.6)', fontSize: '0.8125rem', fontStyle: 'italic' }}>
          💬 All items can be customised. WhatsApp us to discuss your preferences!
        </p>
      </div>

      {cartOpen && (
        <CartDrawer cart={cart} total={total} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQty={changeQty} onOrder={sendWhatsApp} />
      )}
    </section>
  )
}

// ══════════════════════════════════════════════════════════
// MENU CARD
// ══════════════════════════════════════════════════════════
function MenuCard({ item, inCart, onAdd }: { item: Item; inCart: number; onAdd: () => void }) {
  const badgeColor   = item.badgeColor || '#F97316'
  const hasTwo       = !!item.img2
  const [showSecond, setShowSecond] = useState(false)
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!hasTwo) return
    timerRef.current = setInterval(() => setShowSecond(p => !p), 3000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [hasTwo])

  const handleMouseEnter = () => {
    if (!hasTwo) return
    if (timerRef.current) clearInterval(timerRef.current)
    setShowSecond(true)
  }
  const handleMouseLeave = () => {
    if (!hasTwo) return
    setShowSecond(false)
    timerRef.current = setInterval(() => setShowSecond(p => !p), 3000)
  }

  return (
    <div style={{ borderRadius: '1rem', overflow: 'hidden', background: 'var(--brand-card)', border: `1px solid ${inCart > 0 ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.07)'}`, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', boxShadow: inCart > 0 ? '0 0 0 1px rgba(249,115,22,0.2)' : 'none' }}>

      {/* Image */}
      <div style={{ position: 'relative', height: '170px', overflow: 'hidden', flexShrink: 0 }}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.6s ease, transform 0.5s ease', opacity: showSecond ? 0 : 1, transform: showSecond ? 'scale(1.04)' : 'scale(1)' }}
          onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/280x170/1A0800/F97316?text=No+Image' }}
        />
        {hasTwo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.img2} alt={`${item.name} 2`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.6s ease, transform 0.5s ease', opacity: showSecond ? 1 : 0, transform: showSecond ? 'scale(1)' : 'scale(1.04)' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}

        {hasTwo && (
          <div style={{ position: 'absolute', bottom: '36px', right: '10px', display: 'flex', gap: '4px', zIndex: 2 }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: showSecond ? 'rgba(255,255,255,0.4)' : '#fff', transition: 'background 0.3s' }} />
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: showSecond ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }} />
          </div>
        )}

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,3,0,0.8) 0%, transparent 55%)', zIndex: 1 }} />

        {item.badge && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: badgeColor, color: '#fff', fontSize: '0.625rem', fontWeight: 800, padding: '0.25rem 0.625rem', borderRadius: '9999px', letterSpacing: '0.06em', textTransform: 'uppercase', zIndex: 2 }}>
            {item.badge}
          </span>
        )}
        {inCart > 0 && (
          <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#F97316', color: '#fff', fontSize: '0.75rem', fontWeight: 800, width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            {inCart}
          </span>
        )}
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 2 }}>
          <span style={{ color: '#FBBF24', fontWeight: 900, fontSize: '1.0625rem', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{item.priceLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1 }}>
        <h3 style={{ color: '#fff', fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.3 }}>{item.name}</h3>
        {item.note && <p style={{ color: '#F97316', fontSize: '0.6875rem', fontWeight: 700 }}>ℹ️ {item.note}</p>}
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>

        <button onClick={onAdd}
          style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem', borderRadius: '0.625rem', border: '1px solid', cursor: 'pointer', fontWeight: 800, fontSize: '0.875rem', transition: 'all 0.2s',
            background:   inCart > 0 ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)',
            color:        inCart > 0 ? '#F97316' : 'rgba(255,255,255,0.7)',
            borderColor:  inCart > 0 ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.1)',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(249,115,22,0.2)'; el.style.color = '#F97316'; el.style.borderColor = 'rgba(249,115,22,0.5)' }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = inCart > 0 ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)'; el.style.color = inCart > 0 ? '#F97316' : 'rgba(255,255,255,0.7)'; el.style.borderColor = inCart > 0 ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.1)' }}>
          {inCart > 0 ? `✓ Added (${inCart}) · Add More` : '+ Add to Order'}
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// CART DRAWER
// ══════════════════════════════════════════════════════════
function CartDrawer({ cart, total, onClose, onRemove, onQty, onOrder }: {
  cart: CartItem[]; total: number; onClose: () => void
  onRemove: (id: string) => void; onQty: (id: string, d: number) => void; onOrder: () => void
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px,100vw)', background: '#1A0800', zIndex: 301, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.6)', animation: 'slideInRight 0.3s ease' }}>

        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.25rem' }}>Your Order</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>{cart.reduce((s,c) => s+c.qty, 0)} item(s) selected</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.7)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>

        <div style={{ margin: '0.875rem 1.5rem 0', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1rem', flexShrink: 0 }}>🏡</span>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', lineHeight: 1.65 }}>
            <strong style={{ color: '#FBBF24' }}>Freshly cooked to order.</strong> Please allow up to <strong style={{ color: '#FBBF24' }}>6 hours</strong> for delivery.
          </p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '0.875rem', padding: '0.875rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '0.625rem', overflow: 'hidden', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/52x52/1A0800/F97316?text=?' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                <p style={{ color: '#FBBF24', fontWeight: 700, fontSize: '0.8125rem' }}>{formatPrice(item.price * item.qty)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => item.qty === 1 ? onRemove(item.id) : onQty(item.id, -1)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.qty === 1 ? '🗑' : '−'}
                </button>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.875rem', minWidth: '1.25rem', textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => onQty(item.id, 1)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.12)', color: '#F97316', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Total</span>
            <span style={{ color: '#FBBF24', fontWeight: 900, fontSize: '1.375rem', fontFamily: 'var(--font-playfair)' }}>{formatPrice(total)}</span>
          </div>
          <button onClick={onOrder}
            style={{ width: '100%', padding: '1rem', borderRadius: '0.875rem', background: '#25D366', border: 'none', color: '#fff', fontWeight: 800, fontSize: '1.0625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', boxShadow: '0 4px 20px rgba(37,211,102,0.35)', transition: 'all 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1fba58')}
            onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}>
            <WAIcon /> Send Order on WhatsApp
          </button>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
            We&apos;ll confirm your order and arrange delivery via WhatsApp.
          </p>
        </div>
      </div>
      <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </>
  )
}

function WAIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
}