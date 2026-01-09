'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Copy, Menu, Search, Tag, Calendar, Heart, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OffersPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'coupons' | 'giftcards' | 'payment'>('coupons');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'coupons' | 'giftcards' | 'payment'>('coupons');
  const { toast } = useToast();

  const scrollToSection = (section: 'coupons' | 'giftcards' | 'payment') => {
    if (isSignedIn) {
      setActiveTab(section);
    } else {
      setSelectedSection(section);
    }
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 56; // Height of header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section/tab based on scroll position
      const coupons = document.getElementById('coupons');
      const giftcards = document.getElementById('giftcards');
      const payment = document.getElementById('payment');
      
      const scrollPosition = window.scrollY + 150; // Offset for header and tabs
      
      if (payment && scrollPosition >= payment.offsetTop) {
        if (isSignedIn) {
          setActiveTab('payment');
        } else {
          setSelectedSection('payment');
        }
      } else if (giftcards && scrollPosition >= giftcards.offsetTop) {
        if (isSignedIn) {
          setActiveTab('giftcards');
        } else {
          setSelectedSection('giftcards');
        }
      } else if (coupons && scrollPosition >= coupons.offsetTop) {
        if (isSignedIn) {
          setActiveTab('coupons');
        } else {
          setSelectedSection('coupons');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSignedIn]);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[393px] relative">
        <Header 
          isScrolled={isScrolled} 
          onMenuClick={() => {
            toast({
              title: "Menu",
              description: "Menu options will be available here.",
            });
          }}
        />

        <div className="pt-14 pb-20">
          {/* Sticky header section */}
          <div className="sticky top-14 z-40 bg-white">
            <div className="px-4 pt-4">
              <h1 className="text-2xl font-semibold text-[#4B4E4B] mb-1">Offers</h1>
              {!isSignedIn ? (
                <p className="text-sm font-light text-[#7D817D]">Sign in to unlock exclusive additional rewards</p>
              ) : (
                <p className="text-sm font-light text-[#7D817D]">Book directly with us to get exclusive benefits</p>
              )}
            </div>

            {/* Tabs - scroll to sections for both signed in and signed out */}
            <TabBar 
              activeTab={isSignedIn ? activeTab : selectedSection} 
              onTabChange={scrollToSection} 
              isSticky={isScrolled} 
            />
          </div>

          {!isSignedIn && (
            <SignInBanner onSignIn={() => setIsSignedIn(true)} />
          )}

          <div className="px-4 mt-6">
            {/* Coupons Section - Always visible */}
            <div id="coupons">
              <SectionHeader title="Sitewide coupons:" />
              <CouponCard
                code="LONGSTAY"
                title="LONGSTAY"
                description="This gift when you book for 3+ days direct-out 35% and 20% off when you book for 30 days or more."
                value="₹1500"
                color="orange"
                onCopy={() => {
                  navigator.clipboard.writeText('LONGSTAY');
                  toast({
                    title: "Copied!",
                    description: "Coupon code LONGSTAY has been copied to clipboard.",
                  });
                }}
                onReadMore={() => {
                  toast({
                    title: "Coupon Details",
                    description: "This coupon offers 35% off for 3+ days bookings and 20% off for 30+ days bookings.",
                  });
                }}
              />
              <CouponCard
                code="EARLYBIRD"
                title="EARLYBIRD"
                description="15% off when you book for 5 days in advance and 20% off when you book 30 days or more."
                value="₹3000"
                color="orange"
                onCopy={() => {
                  navigator.clipboard.writeText('EARLYBIRD');
                  toast({
                    title: "Copied!",
                    description: "Coupon code EARLYBIRD has been copied to clipboard.",
                  });
                }}
                onReadMore={() => {
                  toast({
                    title: "Coupon Details",
                    description: "This coupon offers 15% off for 5+ days advance bookings and 20% off for 30+ days bookings.",
                  });
                }}
              />
              <CouponCard
                code="RUSHDEAL"
                title="RUSHDEAL"
                description="Get 25% off when you book for 2 hours and 20% off when you book for 30 days or more."
                value="FLAT 10%"
                color="orange"
                onCopy={() => {
                  navigator.clipboard.writeText('RUSHDEAL');
                  toast({
                    title: "Copied!",
                    description: "Coupon code RUSHDEAL has been copied to clipboard.",
                  });
                }}
                onReadMore={() => {
                  toast({
                    title: "Coupon Details",
                    description: "This coupon offers 25% off for 2-hour bookings and 20% off for 30+ days bookings.",
                  });
                }}
              />
            </div>

            {/* Gift Cards Section - Always visible */}
            <div id="giftcards">
              <SectionHeader title="Bonus gift cards:" />
              {isSignedIn ? (
                <>
                  <p className="text-xs text-[#7D817D] mb-4 font-light">Collect multiple of these</p>
                  <div className="space-y-4">
                    <GiftCardRow
                      brand="MYNTRA"
                      value="₹1500"
                      description="Get this gift voucher on booking above ₹12000"
                      color="pink"
                      onCollect={() => {
                        toast({
                          title: "Collected!",
                          description: "Myntra gift card has been added to your collection.",
                        });
                      }}
                      onReadMore={() => {
                        toast({
                          title: "Gift Card Details",
                          description: "Get a ₹1500 Myntra gift voucher when you book above ₹12000.",
                        });
                      }}
                    />
                    <GiftCardRow
                      brand="HARNNER"
                      value="₹1000"
                      description="Get this gift voucher on booking above ₹11500"
                      color="black"
                      onCollect={() => {
                        toast({
                          title: "Collected!",
                          description: "Hammer gift card has been added to your collection.",
                        });
                      }}
                      onReadMore={() => {
                        toast({
                          title: "Gift Card Details",
                          description: "Get a ₹1000 Hammer gift voucher when you book above ₹11500.",
                        });
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <BonusGiftCardsPreview />
                  <button 
                    onClick={() => {
                      toast({
                        title: "Sign in Required",
                        description: "Please sign in to claim gift cards.",
                      });
                    }}
                    className="w-full bg-[#C16B3E] text-white py-3.5 rounded-lg text-sm font-medium mt-3"
                  >
                    Claim gift cards »
                  </button>
                </>
              )}
            </div>

            {/* Payment Offers Section - Always visible */}
            <div id="payment">
              <SectionHeader title="Payment offers:" />
              {isSignedIn ? (
                <>
                  <p className="text-xs text-[#7D817D] mb-4 font-light">Save more on your bookings:</p>
                  <PaymentOfferCard
                    bank="HDFC BANK"
                    offer="Get 10% off on booking above ₹11500"
                    value="UPTO 10% OFF"
                    onReadMore={() => {
                      toast({
                        title: "Payment Offer Details",
                        description: "Get 10% off on bookings above ₹11500 using HDFC Bank payment methods.",
                      });
                    }}
                  />
                </>
              ) : (
                <>
                  <PaymentOffersPreview />
                  <button 
                    onClick={() => {
                      toast({
                        title: "Sign in Required",
                        description: "Please sign in to unlock payment offers.",
                      });
                    }}
                    className="w-full bg-[#C16B3E] text-white py-3.5 rounded-lg text-sm font-medium mt-3"
                  >
                    Unlock offers »
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <BottomNav 
          activeTab="offers" 
          onNavClick={(itemId: string) => {
            const messages: Record<string, { title: string; description: string }> = {
              explore: { title: "Explore", description: "Browse available spaces and accommodations." },
              offers: { title: "Offers", description: "View all available offers and discounts." },
              bookings: { title: "Bookings", description: "View your booking history and manage reservations." },
              wishlist: { title: "Wishlist", description: "View your saved spaces and favorites." },
              profile: { title: "Profile", description: "Manage your account settings and preferences." },
            };
            const message = messages[itemId] || { title: "Navigation", description: "Navigating..." };
            toast({
              title: message.title,
              description: message.description,
            });
          }}
        />
      </div>
    </div>
  );
}

function Header({ isScrolled, onMenuClick }: { isScrolled: boolean; onMenuClick?: () => void }) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-[393px] mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2.5">
          {/* House Logo with double-line effect */}
          <svg width="26" height="20" viewBox="0 0 26 20" className="flex-shrink-0">
            {/* Left vertical segment - single solid line */}
            <rect x="1" y="8" width="2.5" height="10" fill="#874B2C" />
            {/* Top-left diagonal (roof left) - single solid line */}
            <path d="M 3.5 8 L 11 2" stroke="#874B2C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Top-right diagonal (roof right) - double-line effect */}
            <path d="M 11 2 L 18.5 8" stroke="#874B2C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 11.5 2.5 L 19 8.5" stroke="#874B2C" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Right vertical segment - double-line effect */}
            <rect x="18.5" y="8" width="1.5" height="10" fill="#874B2C" />
            <rect x="20.5" y="8" width="1.5" height="10" fill="#874B2C" />
            {/* Bottom horizontal segment - double-line effect */}
            <rect x="3.5" y="16" width="15" height="1.5" fill="#874B2C" />
            <rect x="3.5" y="18" width="15" height="1.5" fill="#874B2C" />
          </svg>
          <span className="font-display text-lg text-[#874B2C] font-medium">SPACEZ</span>
        </div>
        <button 
          onClick={onMenuClick}
          className="p-2"
        >
          <Menu className="w-5 h-5 text-[#874B2C]" />
        </button>
      </div>
    </header>
  );
}

function SignInBanner({ onSignIn }: { onSignIn: () => void }) {
  const { toast } = useToast();
  
  return (
    <div className="px-4 mt-4">
      <div className="bg-[#C16B3E] text-white rounded-lg p-4 text-center">
        <p className="text-sm font-light mb-2">Sign in for 10% back on SPACEZ...</p>
        <button
          onClick={() => {
            onSignIn();
            toast({
              title: "Success!",
              description: "You have successfully signed in.",
            });
          }}
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
    <div className="bg-white shadow-lg">
      <div className="flex">
        <button
          onClick={() => onTabChange('coupons')}
          className={`flex-1 py-3 text-sm font-medium relative ${
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
          className={`flex-1 py-3 text-sm font-medium relative ${
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
          className={`flex-1 py-3 text-sm font-medium relative ${
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

function CouponCard({ code, title, description, value, color, onCopy, onReadMore }: {
  code: string;
  title: string;
  description: string;
  value: string;
  color: 'orange' | 'blue';
  onCopy?: () => void;
  onReadMore?: () => void;
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
          <button 
            onClick={onCopy}
            className="flex items-center gap-1 text-[#C16B3E] text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        <p className="text-sm font-light text-[#7D817D] leading-relaxed mb-3">
          {description}
        </p>
        <button 
          onClick={onReadMore}
          className="text-[#C16B3E] text-sm font-medium"
        >
          Read more
        </button>
      </div>
    </div>
  );
}

function GiftCardRow({ brand, value, description, color, onCollect, onReadMore }: {
  brand: string;
  value: string;
  description: string;
  color: 'pink' | 'black';
  onCollect?: () => void;
  onReadMore?: () => void;
}) {
  const bgColor = color === 'pink' ? '#D41C9B' : '#000000';

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
            className="text-white font-bold whitespace-nowrap"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '-0.02em',
              fontSize: '28px',
              lineHeight: '1.2'
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

      <div className="flex-1 bg-[#FDF9F7] p-5 relative flex flex-col justify-between rounded-r-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {/* Myntra Logo - Using image */}
            {brand === 'MYNTRA' && (
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <img 
                  src="/0eca9644dbe42378546cdfb94c27980c9b80724a%20(1).png" 
                  alt="Myntra Logo" 
                  className="h-8 w-auto flex-shrink-0"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-base font-bold text-[#4B4E4B] uppercase tracking-tight" style={{ fontFamily: 'sans-serif' }}>MYNTRA</span>
              </div>
            )}
            
            {/* Hammer Logo - Using image */}
            {brand === 'HARNNER' && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <img 
                  src="/59ecab7a9ab200374fe553314281d87ce012c061.png" 
                  alt="Hammer Logo" 
                  className="h-9 w-auto flex-shrink-0"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-base font-semibold text-[#4B4E4B]">{brand}</span>
              </div>
            )}
          </div>
          <button 
            onClick={onCollect}
            className="text-[#C16B3E] text-sm font-medium flex-shrink-0"
          >
            Collect
          </button>
        </div>
        
        <div className="mt-3">
          <p className="text-sm font-light text-[#7D817D] leading-relaxed mb-3">
            {description}
          </p>
          <div className="h-px bg-[#E5E6E5] mb-3"></div>
          <button 
            onClick={onReadMore}
            className="text-[#7D817D] text-sm font-medium underline"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

function BonusGiftCardsPreview() {
  return (
    <div className="bg-[#FDF9F7] rounded-lg p-4 mb-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-[#874B2C] mb-2 font-semibold">Assured vouchers up to</p>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-3xl font-bold text-[#874B2C]">₹1000</span>
            {/* Sparkle icons */}
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-yellow-400">
              <path d="M8 0 L9.5 6 L16 7.5 L9.5 9 L8 16 L6.5 9 L0 7.5 L6.5 6 Z" fill="currentColor" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-yellow-400">
              <path d="M8 0 L9.5 6 L16 7.5 L9.5 9 L8 16 L6.5 9 L0 7.5 L6.5 6 Z" fill="currentColor" />
            </svg>
          </div>
          <p className="text-xs text-[#2f2a28] font-light">of trending brands</p>
        </div>
        
        {/* Overlapping gift cards on the right */}
        <div className="relative flex-shrink-0" style={{ width: '120px', height: '100px' }}>
          {/* Top orange card */}
          <div className="absolute top-0 right-0 bg-[#C16B3E] text-white rounded-lg p-3 text-center shadow-md" style={{ width: '90px', height: '70px', zIndex: 2 }}>
            <div className="text-xl font-bold mb-0.5">₹400</div>
            <div className="text-[10px] opacity-90">Gift card</div>
          </div>
          {/* Bottom blue card with sparkles */}
          <div className="absolute bottom-0 right-4 bg-[#3168CF] text-white rounded-lg p-3 text-center shadow-md overflow-hidden" style={{ width: '90px', height: '70px', zIndex: 1 }}>
            <div className="text-xl font-bold mb-0.5">₹500</div>
            <div className="text-[10px] opacity-90">Gift card</div>
            {/* Sparkle icons scattered */}
            <svg width="8" height="8" viewBox="0 0 8 8" className="absolute top-2 right-3 text-white opacity-60">
              <path d="M4 0 L4.5 3 L8 3.5 L4.5 4 L4 8 L3.5 4 L0 3.5 L3.5 3 Z" fill="currentColor" />
            </svg>
            <svg width="6" height="6" viewBox="0 0 6 6" className="absolute bottom-3 left-2 text-white opacity-60">
              <path d="M3 0 L3.3 2.2 L6 2.5 L3.3 2.8 L3 6 L2.7 2.8 L0 2.5 L2.7 2.2 Z" fill="currentColor" />
            </svg>
            <svg width="7" height="7" viewBox="0 0 7 7" className="absolute top-4 left-4 text-white opacity-60">
              <path d="M3.5 0 L3.8 2.5 L7 3 L3.8 3.5 L3.5 7 L3.2 3.5 L0 3 L3.2 2.5 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentOffersPreview() {
  return (
    <div className="bg-[#FDF9F7] rounded-lg p-5 mb-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-[#7D817D] mb-1 font-light">Save more on your bookings</p>
          <p className="text-2xl font-bold text-[#874B2C] mb-1">upto 15% Off</p>
          <p className="text-xs text-[#874B2C] font-semibold">on select payment methods</p>
        </div>
        <div className="flex-shrink-0">
          <img 
            src="/a94a9cfeb5758ec62c1190ed22abefbd0180937b.png" 
            alt="Payment Methods" 
            className="w-[120px] h-[100px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function PaymentOfferCard({ bank, offer, value, onReadMore }: {
  bank: string;
  offer: string;
  value: string;
  onReadMore?: () => void;
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

      <div className="flex-1 bg-[#FDF9F7] p-5 relative flex flex-col justify-between rounded-r-lg">
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
          <button 
            onClick={onReadMore}
            className="text-[#7D817D] text-sm font-medium"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, onNavClick }: { activeTab: string; onNavClick?: (itemId: string) => void }) {
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
              onClick={() => onNavClick?.(item.id)}
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
