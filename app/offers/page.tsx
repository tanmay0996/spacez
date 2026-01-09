'use client';

import { useState, useEffect } from 'react';
import { Copy, Menu, Search, Tag, Calendar, Heart, User } from 'lucide-react';

export default function OffersPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'coupons' | 'giftcards' | 'payment'>('coupons');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] relative">
        <Header isScrolled={isScrolled} />

        <div className="pt-14 pb-20">
          <div className="px-4 pt-4">
            <h1 className="text-2xl font-semibold text-[#4B4E4B] mb-1">Offers</h1>
            {!isSignedIn ? (
              <p className="text-sm font-light text-[#7D817D]">Sign in to unlock exclusive additional rewards</p>
            ) : (
              <p className="text-sm font-light text-[#7D817D]">Book directly with us to get exclusive benefits</p>
            )}
          </div>

          {!isSignedIn && (
            <SignInBanner onSignIn={() => setIsSignedIn(true)} />
          )}

          {isSignedIn && (
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} isSticky={isScrolled} />
          )}

          <div className="px-4 mt-6">
            {(!isSignedIn || activeTab === 'coupons') && (
              <>
                <SectionHeader title="Sitewide coupons:" />
                <CouponCard
                  code="LONGSTAY"
                  title="LONGSTAY"
                  description="This gift when you book for 3+ days direct-out 35% and 20% off when you book for 30 days or more."
                  value="₹1500"
                  color="orange"
                />
                <CouponCard
                  code="EARLYBIRD"
                  title="EARLYBIRD"
                  description="15% off when you book for 5 days in advance and 20% off when you book 30 days or more."
                  value="₹3000"
                  color="orange"
                />
                <CouponCard
                  code="RUSHDEAL"
                  title="RUSHDEAL"
                  description="Get 25% off when you book for 2 hours and 20% off when you book for 30 days or more."
                  value="FLAT 10%"
                  color="orange"
                />
              </>
            )}

            {isSignedIn && activeTab === 'giftcards' && (
              <>
                <SectionHeader title="Bonus gift cards:" />
                <p className="text-xs text-[#7D817D] mb-4 font-light">Collect multiple of these</p>
                <div className="space-y-4">
                  <GiftCardRow
                    brand="MYNTRA"
                    value="₹1500"
                    description="Get this gift voucher on booking worth ₹1500"
                    color="pink"
                  />
                  <GiftCardRow
                    brand="HARNNER"
                    value="₹1000"
                    description="Get this gift voucher on booking worth ₹1500"
                    color="black"
                  />
                </div>
              </>
            )}

            {!isSignedIn && (
              <>
                <SectionHeader title="Bonus gift cards:" />
                <BonusGiftCardsPreview />
                <button className="w-full bg-[#C16B3E] text-white py-3.5 rounded-lg text-sm font-medium mt-3">
                  Claim gift cards →
                </button>
              </>
            )}

            {isSignedIn && activeTab === 'payment' && (
              <>
                <SectionHeader title="Payment offers:" />
                <p className="text-xs text-[#7D817D] mb-4 font-light">Save more on your bookings:</p>
                <PaymentOfferCard
                  bank="HDFC BANK"
                  offer="Get 10% off on booking above ₹1500"
                  value="UPTO 10% OFF"
                />
              </>
            )}

            {!isSignedIn && (
              <>
                <SectionHeader title="Payment offers:" />
                <PaymentOffersPreview />
                <button className="w-full bg-[#C16B3E] text-white py-3.5 rounded-lg text-sm font-medium mt-3">
                  Unlock offers →
                </button>
              </>
            )}
          </div>
        </div>

        <BottomNav activeTab="offers" />
      </div>
    </div>
  );
}

function Header({ isScrolled }: { isScrolled: boolean }) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-[393px] mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center">
          <span className="font-display text-lg text-[#4B4E4B] font-medium">SPACEZ</span>
        </div>
        <button className="p-2">
          <Menu className="w-5 h-5 text-[#4B4E4B]" />
        </button>
      </div>
    </header>
  );
}

function SignInBanner({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="px-4 mt-4">
      <div className="bg-[#C16B3E] text-white rounded-lg p-4 text-center">
        <p className="text-sm font-light mb-2">Sign in for 10% back on SPACEZ...</p>
        <button
          onClick={onSignIn}
          className="bg-white text-[#C16B3E] px-6 py-2 rounded-md text-sm font-semibold"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

function TabBar({ activeTab, onTabChange, isSticky }: {
  activeTab: 'coupons' | 'giftcards' | 'payment';
  onTabChange: (tab: 'coupons' | 'giftcards' | 'payment') => void;
  isSticky: boolean;
}) {
  return (
    <div className={`${isSticky ? 'sticky top-14 z-40' : ''} bg-white border-b border-[#E5E6E5]`}>
      <div className="px-4 flex gap-6">
        <button
          onClick={() => onTabChange('coupons')}
          className={`py-3 text-sm font-medium relative ${
            activeTab === 'coupons' ? 'text-[#4B4E4B]' : 'text-[#7D817D]'
          }`}
        >
          Coupons
          {activeTab === 'coupons' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4B4E4B]" />
          )}
        </button>
        <button
          onClick={() => onTabChange('giftcards')}
          className={`py-3 text-sm font-medium relative ${
            activeTab === 'giftcards' ? 'text-[#4B4E4B]' : 'text-[#7D817D]'
          }`}
        >
          Giftcards
          {activeTab === 'giftcards' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4B4E4B]" />
          )}
        </button>
        <button
          onClick={() => onTabChange('payment')}
          className={`py-3 text-sm font-medium relative ${
            activeTab === 'payment' ? 'text-[#4B4E4B]' : 'text-[#7D817D]'
          }`}
        >
          Payment Offers
          {activeTab === 'payment' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4B4E4B]" />
          )}
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-base font-semibold text-[#4B4E4B] mb-3">{title}</h2>
  );
}

function CouponCard({ code, title, description, value, color }: {
  code: string;
  title: string;
  description: string;
  value: string;
  color: 'orange' | 'blue';
}) {
  const bgColor = color === 'orange' ? '#C16B3E' : '#3168CF';

  return (
    <div className="mb-4 h-[184px] flex gap-4 overflow-hidden shadow-sm">
      <div 
        className="relative flex-shrink-0 opacity-100" 
        style={{ 
          backgroundColor: bgColor,
          width: '68px',
          height: '184px',
          paddingTop: '1px',
          paddingRight: '1.67px',
          paddingBottom: '1px',
          paddingLeft: '1.67px'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '1px', paddingRight: '1.67px', paddingBottom: '1px', paddingLeft: '1.67px' }}>
          <span
            className="font-serif text-white text-[32px] font-bold whitespace-nowrap"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '-0.02em'
            }}
          >
            {value}
          </span>
        </div>
        
        {/* Perforated edge - repeating rectangular cutouts */}
        <div 
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: '4px',
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 6px,
              white 6px,
              white 8px
            )`,
            backgroundSize: '4px 8px'
          }}
        />
      </div>

      <div className="flex-1 bg-[#FDF9F7] p-5 relative">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-[#4B4E4B]">{title}</h3>
          <button className="flex items-center gap-1 text-[#C16B3E] text-sm font-medium">
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        <p className="text-sm font-light text-[#7D817D] leading-relaxed mb-3">
          {description}
        </p>
        <button className="text-[#C16B3E] text-sm font-medium">
          Read more
        </button>
      </div>
    </div>
  );
}

function GiftCardRow({ brand, value, description, color }: {
  brand: string;
  value: string;
  description: string;
  color: 'pink' | 'black';
}) {
  const bgColor = color === 'pink' ? '#D41C9B' : '#000000';

  return (
    <div className="flex gap-4 bg-[#FDF9F7] rounded-lg p-4">
      <div
        className="w-[81px] h-[74px] rounded-[14px] flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-white font-bold text-xl">{brand.charAt(0)}</span>
        <div
          className="absolute top-2 right-2 bg-[#11B263] text-white text-[10px] font-semibold px-2 py-0.5 rounded"
          style={{ transform: 'rotate(26deg)' }}
        >
          {value}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#4B4E4B] mb-1">{brand}</h3>
          <p className="text-xs font-light text-[#7D817D] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <button className="text-[#C16B3E] text-sm font-medium">
            Read more
          </button>
          <button className="bg-white border border-[#C16B3E] text-[#C16B3E] px-4 py-1.5 rounded-md text-sm font-medium">
            Collect
          </button>
        </div>
      </div>
    </div>
  );
}

function BonusGiftCardsPreview() {
  return (
    <div className="bg-[#FDF9F7] rounded-lg p-4 mb-3">
      <p className="text-xs text-[#7D817D] mb-3 font-light">Assured vouchers up to</p>
      <div className="flex gap-3 mb-3">
        <div className="flex-1 bg-[#C16B3E] text-white rounded-lg p-4 text-center relative overflow-hidden">
          <div className="text-2xl font-bold mb-1">₹1000</div>
          <div className="text-xs opacity-90">Voucher</div>
          <div className="absolute -right-2 -bottom-2 text-6xl opacity-10">M</div>
        </div>
        <div className="flex-1 bg-[#3168CF] text-white rounded-lg p-4 text-center relative overflow-hidden">
          <div className="text-2xl font-bold mb-1">₹500</div>
          <div className="text-xs opacity-90">Voucher</div>
          <div className="absolute -right-2 -bottom-2 text-6xl opacity-10">H</div>
        </div>
      </div>
      <p className="text-xs text-[#7D817D] font-light">of trending brands</p>
    </div>
  );
}

function PaymentOffersPreview() {
  return (
    <div className="bg-[#FDF9F7] rounded-lg p-6 text-center mb-3">
      <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center border-2 border-[#E5E6E5]">
        <div className="text-3xl font-bold text-[#3168CF]">15%</div>
      </div>
      <p className="text-base font-semibold text-[#4B4E4B] mb-1">15% Off</p>
      <p className="text-xs text-[#7D817D] font-light">on select payment methods</p>
    </div>
  );
}

function PaymentOfferCard({ bank, offer, value }: {
  bank: string;
  offer: string;
  value: string;
}) {
  // Extract percentage from value (e.g., "UPTO 10% OFF" -> "10% OFF")
  const displayValue = value.includes('%') ? value.split('%')[0] + '% OFF' : value;
  const percentagePart = displayValue.split(' ')[0]; // "10%"
  const offPart = displayValue.split(' ').slice(1).join(' '); // "OFF"

  return (
    <div className="mb-4 h-[184px] flex gap-4 overflow-hidden shadow-sm">
      <div 
        className="relative flex-shrink-0 opacity-100" 
        style={{ 
          backgroundColor: '#3168CF',
          width: '68px',
          height: '184px',
          paddingTop: '1px',
          paddingRight: '1.67px',
          paddingBottom: '1px',
          paddingLeft: '1.67px'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: '1px', paddingRight: '1.67px', paddingBottom: '1px', paddingLeft: '1.67px' }}>
          <span
            className="text-white font-bold whitespace-nowrap"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '-0.02em',
              fontSize: '28px',
              lineHeight: '1.2'
            }}
          >
            {percentagePart}
          </span>
          {offPart && (
            <span
              className="text-white font-medium whitespace-nowrap mt-2"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                letterSpacing: '-0.02em',
                fontSize: '14px',
                lineHeight: '1.2'
              }}
            >
              {offPart}
            </span>
          )}
        </div>
        
        {/* Perforated edge - repeating rectangular cutouts */}
        <div 
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: '4px',
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 6px,
              white 6px,
              white 8px
            )`,
            backgroundSize: '4px 8px'
          }}
        />
      </div>

      <div className="flex-1 bg-white p-5 relative flex flex-col justify-between rounded-r-lg">
        <div className="flex items-start gap-3">
          {/* HDFC Bank Logo - Blue square with red L-shapes */}
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#E5E6E5] flex-shrink-0 relative">
            <svg width="32" height="32" viewBox="0 0 32 32" className="absolute inset-0 m-auto">
              {/* Central blue square */}
              <rect x="12" y="12" width="8" height="8" fill="#0066B3" />
              {/* Top-left red L */}
              <rect x="0" y="0" width="12" height="4" fill="#E4002B" />
              <rect x="0" y="0" width="4" height="12" fill="#E4002B" />
              {/* Top-right red L */}
              <rect x="20" y="0" width="12" height="4" fill="#E4002B" />
              <rect x="28" y="0" width="4" height="12" fill="#E4002B" />
              {/* Bottom-left red L */}
              <rect x="0" y="28" width="12" height="4" fill="#E4002B" />
              <rect x="0" y="20" width="4" height="12" fill="#E4002B" />
              {/* Bottom-right red L */}
              <rect x="20" y="28" width="12" height="4" fill="#E4002B" />
              <rect x="28" y="20" width="4" height="12" fill="#E4002B" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#4B4E4B] mb-1">{bank}</h3>
            <p className="text-sm font-light text-[#7D817D] leading-relaxed">
              {offer}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-px bg-[#E5E6E5] mb-3"></div>
          <button className="text-[#7D817D] text-sm font-medium">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ activeTab }: { activeTab: string }) {
  const navItems = [
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Sign in', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E6E5] z-50">
      <div className="max-w-[393px] mx-auto flex justify-around items-center h-[76px] px-2">
        {navItems.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 flex-1 ${
                isActive ? 'text-[#874B2C]' : 'text-[#7D817D]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-light">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
