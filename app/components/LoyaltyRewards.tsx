'use client'

import { useState } from 'react'

const tiers = [
  { name: 'Pepper Seed', emoji: '🌶️', min: 0, max: 499, color: 'from-gray-600 to-gray-500', perks: ['5% off every order', 'Birthday surprise', 'Early menu access'] },
  { name: 'Smoky Bronze', emoji: '🥉', min: 500, max: 1499, color: 'from-amber-700 to-amber-500', perks: ['8% off every order', 'Free drink on orders ₦10k+', 'Priority WhatsApp queue'] },
  { name: 'Flame Silver', emoji: '🥈', min: 1500, max: 2999, color: 'from-slate-500 to-slate-400', perks: ['12% off every order', 'Free side on orders ₦15k+', 'Monthly exclusive dishes', 'Free delivery Lagos'] },
  { name: 'Grillz Gold', emoji: '👑', min: 3000, max: Infinity, color: 'from-yellow-600 to-amber-400', perks: ['18% off every order', 'VIP event invites', 'Dedicated chef requests', 'Free catering consultation', 'Monthly surprise gift box'] },
]

const rewardItems = [
  { name: 'Free Drink', points: 150, emoji: '🥤', desc: 'Redeemable on any order' },
  { name: 'Free Plantain Side', points: 200, emoji: '🍌', desc: 'Add to your next order' },
  { name: '₦500 Discount', points: 250, emoji: '💰', desc: 'Off your next order' },
  { name: 'Free Dessert', points: 300, emoji: '🍮', desc: 'Puff puff or chin chin' },
  { name: '₦1,500 Discount', points: 600, emoji: '🎫', desc: 'Big savings voucher' },
  { name: 'Free Full Meal', points: 1000, emoji: '🍽️', desc: 'Any item under ₦12k' },
]

export default function LoyaltyRewards() {
  const [phone, setPhone] = useState('')
  const [checked, setChecked] = useState(false)
  const [points] = useState(1240) // Demo value
  const [redeeming, setRedeeming] = useState<string | null>(null)

  const currentTier = tiers.find(t => points >= t.min && points <= t.max) || tiers[0]
  const nextTier = tiers[tiers.indexOf(currentTier) + 1]
  const progressPct = nextTier
    ? Math.min(100, ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
    : 100

  const handleRedeem = (item: typeof rewardItems[0]) => {
    const msg = `Hi! I'd like to redeem my loyalty points for: ${item.name} (${item.points} pts)\nMy phone: ${phone || 'registered number'}`
    window.open(`https://wa.me/2348094946923?text=${encodeURIComponent(msg)}`, '_blank')
    setRedeeming(item.name)
    setTimeout(() => setRedeeming(null), 3000)
  }

  return (
    <section id="loyalty" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f0500 0%, #1a0800 100%)' }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-4">Rewards Programme</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="flame-text">Loyalty</span> Rewards
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Every order earns you points. Redeem for free food, discounts, and exclusive perks.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { step: '1', icon: '🛒', title: 'Order Food', desc: 'Place any order via WhatsApp' },
            { step: '2', icon: '⭐', title: 'Earn Points', desc: '₦100 spent = 1 loyalty point' },
            { step: '3', icon: '🎁', title: 'Redeem Rewards', desc: 'Free food, discounts & more' },
          ].map(item => (
            <div key={item.step} className="text-center p-5 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-white font-bold text-sm mb-1">{item.title}</p>
              <p className="text-white/50 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Demo card — shown after "checking" */}
        {!checked ? (
          <div className="rounded-3xl border border-orange-500/20 p-8 text-center mb-12"
            style={{ background: 'rgba(234,88,12,0.06)' }}>
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-2xl mb-3">Check Your Points</h3>
            <p className="text-white/50 mb-6">Enter your WhatsApp number to see your rewards balance</p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="080XXXXXXXX"
                className="form-input flex-1 text-center"
              />
              <button
                onClick={() => setChecked(true)}
                className="btn-primary px-6 py-3 text-base whitespace-nowrap"
              >
                Check Balance
              </button>
            </div>
            <p className="text-white/30 text-xs mt-4">Demo mode: any number will show a sample account</p>
          </div>
        ) : (
          <>
            {/* Points dashboard */}
            <div className="rounded-3xl border border-orange-500/30 overflow-hidden mb-8"
              style={{ background: 'linear-gradient(135deg, rgba(234,88,12,0.12), rgba(185,28,28,0.08))' }}>
              <div className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <p className="text-white/50 text-sm">Your Balance</p>
                    <p className="font-display text-5xl font-bold gradient-text">{points.toLocaleString()}</p>
                    <p className="text-white/40 text-sm">loyalty points</p>
                  </div>
                  <div className={`px-5 py-3 rounded-2xl bg-gradient-to-r ${currentTier.color} text-white text-center`}>
                    <p className="text-2xl">{currentTier.emoji}</p>
                    <p className="font-bold text-sm">{currentTier.name}</p>
                    <p className="text-xs opacity-80">Current Tier</p>
                  </div>
                </div>

                {/* Progress to next tier */}
                {nextTier && (
                  <div>
                    <div className="flex justify-between text-xs text-white/50 mb-2">
                      <span>{currentTier.name}</span>
                      <span>{nextTier.min - points} pts to {nextTier.name} {nextTier.emoji}</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Current perks */}
              <div className="border-t border-white/10 px-8 py-5">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-3">Your Current Perks</p>
                <div className="flex flex-wrap gap-2">
                  {currentTier.perks.map(p => (
                    <span key={p} className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full border border-orange-500/20">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Redeem rewards */}
            <h3 className="text-white font-bold text-xl mb-5">Redeem Your Points</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {rewardItems.map(item => {
                const canAfford = points >= item.points
                return (
                  <div key={item.name}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      canAfford
                        ? 'border-orange-500/30 hover:border-orange-400/60 card-hover'
                        : 'border-white/10 opacity-50'
                    }`}
                    style={{ background: canAfford ? 'rgba(234,88,12,0.06)' : 'rgba(255,255,255,0.02)' }}>
                    <div className="text-3xl mb-3">{item.emoji}</div>
                    <h4 className="text-white font-bold mb-1">{item.name}</h4>
                    <p className="text-white/50 text-sm mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="gradient-text font-bold">{item.points} pts</span>
                      <button
                        onClick={() => canAfford && handleRedeem(item)}
                        disabled={!canAfford}
                        className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                          canAfford
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                      >
                        {redeeming === item.name ? '✓ Sent!' : canAfford ? 'Redeem' : 'Need more pts'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Tiers overview */}
        <h3 className="text-white font-bold text-xl mb-5">Membership Tiers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(tier => (
            <div key={tier.name}
              className={`p-5 rounded-2xl border transition-all ${
                currentTier.name === tier.name && checked
                  ? 'border-orange-400/60 ring-1 ring-orange-500/30'
                  : 'border-white/10'
              }`}
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${tier.color} text-white text-xs font-bold mb-3`}>
                <span>{tier.emoji}</span> {tier.name}
              </div>
              <p className="text-white/40 text-xs mb-3">
                {tier.max === Infinity ? `${tier.min.toLocaleString()}+ pts` : `${tier.min}–${tier.max} pts`}
              </p>
              <ul className="space-y-1.5">
                {tier.perks.map(p => (
                  <li key={p} className="text-white/60 text-xs flex gap-2">
                    <span className="text-green-400 flex-shrink-0">✓</span> {p}
                  </li>
                ))}
              </ul>
              {currentTier.name === tier.name && checked && (
                <div className="mt-3 text-xs font-bold text-orange-400">← Your current tier</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
