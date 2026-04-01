'use client'

import { useState, useEffect } from 'react'

type OrderStatus = 'received' | 'preparing' | 'ready' | 'picked_up' | 'on_the_way' | 'delivered'

const statusFlow: { key: OrderStatus; label: string; emoji: string; desc: string; duration: number }[] = [
  { key: 'received',    label: 'Order Received',     emoji: '📋', desc: 'We got your order and are reviewing it.', duration: 4000 },
  { key: 'preparing',  label: 'Preparing Your Food', emoji: '👩‍🍳', desc: 'Our chef is cooking your meal fresh right now!', duration: 8000 },
  { key: 'ready',      label: 'Ready for Pickup',    emoji: '✅', desc: 'Your order is packaged and ready!', duration: 3000 },
  { key: 'picked_up',  label: 'Picked Up by Rider',  emoji: '🛵', desc: 'Your order is with our delivery partner.', duration: 4000 },
  { key: 'on_the_way', label: 'On the Way!',         emoji: '🚀', desc: 'Your meal is en route — won\'t be long!', duration: 6000 },
  { key: 'delivered',  label: 'Delivered! Enjoy 😋', emoji: '🎉', desc: 'Your order has arrived. Bon appétit!', duration: 0 },
]

const sampleOrders = [
  { id: 'CCG-2025-0142', items: ['Basmati Jollof Rice + Chicken', 'Pepsi (500ml)'], total: '₦10,500', time: '12:34 PM', eta: '1:15 PM' },
  { id: 'CCG-2025-0139', items: ['Deluxe Food Box', 'Malt Drink'], total: '₦31,000', time: '11:50 AM', eta: '12:45 PM' },
  { id: 'CCG-2025-0137', items: ['Creamy Chicken Pasta', 'Grilled Chicken x2'], total: '₦26,000', time: '11:15 AM', eta: '12:10 PM' },
]

export default function OrderTracker() {
  const [orderId, setOrderId] = useState('')
  const [tracking, setTracking] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('received')
  const [isDemo, setIsDemo] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(sampleOrders[0])
  const [elapsed, setElapsed] = useState(0)

  const currentIndex = statusFlow.findIndex(s => s.key === currentStatus)
  const current = statusFlow[currentIndex]

  // Simulate order progress in demo mode
  useEffect(() => {
    if (!isDemo) return
    let idx = 0
    setCurrentStatus(statusFlow[0].key)

    const advance = () => {
      if (idx >= statusFlow.length - 1) return
      const delay = statusFlow[idx].duration
      setTimeout(() => {
        idx++
        setCurrentStatus(statusFlow[idx].key)
        advance()
      }, delay)
    }
    advance()

    const timer = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(timer)
  }, [isDemo])

  const handleTrack = () => {
    const found = sampleOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase())
    if (found) setSelectedOrder(found)
    setIsDemo(true)
    setTracking(true)
    setElapsed(0)
  }

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`
  }

  return (
    <section id="track" className="py-24 relative" style={{ background: '#0f0500' }}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-4">Track Your Order</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Live <span className="flame-text">Order Tracker</span>
          </h2>
          <p className="text-white/60">Know exactly where your food is at every step.</p>
        </div>

        {!tracking ? (
          <>
            {/* Search form */}
            <div className="rounded-3xl border border-white/10 p-8 mb-8 text-center"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-5xl mb-5">📦</div>
              <h3 className="text-white font-bold text-2xl mb-3">Track Your Order</h3>
              <p className="text-white/50 mb-6">Enter your order ID (sent to you via WhatsApp)</p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  placeholder="e.g. CCG-2025-0142"
                  className="form-input flex-1 text-center font-mono"
                />
                <button onClick={handleTrack} className="btn-primary px-6 py-3 text-base whitespace-nowrap">
                  Track →
                </button>
              </div>
              <button
                onClick={() => { setOrderId('CCG-2025-0142'); setTracking(true); setIsDemo(true); setElapsed(0) }}
                className="mt-4 text-orange-400/70 hover:text-orange-400 text-sm underline underline-offset-2 transition-colors"
              >
                Try demo tracking →
              </button>
            </div>

            {/* Recent orders (demo) */}
            <h3 className="text-white font-bold text-lg mb-4">📋 Sample Orders to Track</h3>
            <div className="space-y-3">
              {sampleOrders.map(order => (
                <button key={order.id} onClick={() => { setSelectedOrder(order); setTracking(true); setIsDemo(true); setElapsed(0) }}
                  className="w-full text-left p-5 rounded-2xl border border-white/10 hover:border-orange-500/40 transition-all group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold font-mono text-sm">{order.id}</p>
                      <p className="text-white/50 text-sm mt-1">{order.items.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="gradient-text font-bold">{order.total}</p>
                      <p className="text-white/40 text-xs">Ordered {order.time}</p>
                    </div>
                    <span className="text-white/30 group-hover:text-orange-400 transition-colors ml-3">→</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Order header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-white/50 text-sm">Order ID</p>
                <p className="text-white font-bold font-mono">{selectedOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-sm">Estimated Delivery</p>
                <p className="gradient-text font-bold">{selectedOrder.eta}</p>
              </div>
              <button onClick={() => { setTracking(false); setIsDemo(false); setCurrentStatus('received') }}
                className="text-white/40 hover:text-white transition-colors text-sm ml-4">
                ← Back
              </button>
            </div>

            {/* Order items */}
            <div className="p-4 rounded-2xl border border-white/10 mb-8"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-2">Your Order</p>
                  {selectedOrder.items.map(item => (
                    <p key={item} className="text-white text-sm font-medium">• {item}</p>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-xs">Total</p>
                  <p className="gradient-text font-bold">{selectedOrder.total}</p>
                </div>
              </div>
              {isDemo && (
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-white/40">
                  <span>⏱️ Tracking for {formatElapsed(elapsed)}</span>
                  <span className="text-orange-400/70">● Live Demo Mode</span>
                </div>
              )}
            </div>

            {/* Status tracker */}
            <div className="space-y-2 mb-8">
              {statusFlow.map((status, i) => {
                const done = i < currentIndex
                const active = i === currentIndex
                const upcoming = i > currentIndex
                return (
                  <div key={status.key}
                    className={`flex gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                      active
                        ? 'border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/5'
                        : done
                        ? 'border-green-500/20 bg-green-500/5'
                        : 'border-white/5 opacity-40'
                    }`}>
                    {/* Icon circle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 transition-all duration-500 ${
                      done ? 'bg-green-500/20 ring-1 ring-green-500/40' :
                      active ? 'bg-orange-500/20 ring-2 ring-orange-500/60 animate-pulse' :
                      'bg-white/5'
                    }`}>
                      {done ? '✅' : status.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-sm ${active ? 'text-orange-300' : done ? 'text-green-400' : 'text-white/40'}`}>
                          {status.label}
                        </p>
                        {active && (
                          <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">
                            Current
                          </span>
                        )}
                      </div>
                      {(active || done) && (
                        <p className="text-white/50 text-xs mt-0.5">{status.desc}</p>
                      )}
                    </div>

                    {/* Connector line */}
                    {i < statusFlow.length - 1 && !upcoming && (
                      <div className="absolute left-10 mt-14 w-0.5 h-4 bg-green-500/30" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Delivered state */}
            {currentStatus === 'delivered' && (
              <div className="text-center p-8 rounded-3xl border border-green-500/30 mb-8 animate-fade-up"
                style={{ background: 'rgba(34,197,94,0.08)' }}>
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-white font-bold text-2xl mb-2">Delivered!</h3>
                <p className="text-white/60 mb-6">We hope you enjoy your meal. Don't forget to leave a review!</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="https://wa.me/2348094946923?text=Hi!%20Just%20received%20my%20order%20and%20it%27s%20amazing!%20%F0%9F%8D%BD%EF%B8%8F"
                    target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-6 py-3">
                    Share Feedback
                  </a>
                  <button onClick={() => { setTracking(false); setIsDemo(false); setCurrentStatus('received') }}
                    className="btn-secondary text-sm px-6 py-3">
                    Track Another Order
                  </button>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="text-center">
              <p className="text-white/40 text-sm mb-3">Need help with your order?</p>
              <a href="https://wa.me/2348094946923?text=Hi!%20I%20need%20help%20with%20my%20order"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message us on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
