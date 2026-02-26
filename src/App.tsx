import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronDown, Heart, Calendar, MapPin, Clock, ArrowRight, User, Users } from 'lucide-react';
import './App.css';

// Types
interface WeddingData {
  side: 'groom' | 'bride';
  eventName: string;
  time: string;
  venue: string;
  address: string;
  note: string;
}

const weddingData: Record<string, WeddingData> = {
  groom: {
    side: 'groom',
    eventName: 'Wedding Ceremony',
    time: '9:00 AM - 12:00 PM',
    venue: 'Sri Venkateswara Temple',
    address: 'T Nagar, Chennai',
    note: 'Traditional ceremony followed by lunch'
  },
  bride: {
    side: 'bride',
    eventName: 'Reception Celebration',
    time: '6:00 PM - 10:00 PM',
    venue: 'The Grand Ballroom',
    address: 'JW Marriott, Mumbai',
    note: 'Evening reception with dinner and dancing'
  }
};

// Audio Player Component
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-[#C9A87C] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 ${isPlaying ? 'audio-playing' : ''}`}
    >
      <div className={`${isPlaying ? 'vinyl-spin' : 'vinyl-spin paused'} absolute inset-2 rounded-full border-2 border-white/30`} />
      {isPlaying ? (
        <Pause className="w-5 h-5 relative z-10" />
      ) : (
        <Play className="w-5 h-5 relative z-10 ml-0.5" />
      )}
    </button>
  );
}

// Navigation Component
function Navigation({ onReset }: { onReset: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-[#F6F2EA]/95 backdrop-blur-sm shadow-sm' : 'bg-gradient-to-b from-black/20 to-transparent'}`}>
      <button onClick={onReset} className="font-serif text-lg text-[#3A2E22] tracking-wider hover:text-[#C9A87C] transition-colors">
        V <span className="text-[#C9A87C]">•</span> V
      </button>
      <div className="flex gap-4">
        {['story', 'letter', 'gallery', 'details'].map((item) => (
          <button 
            key={item}
            onClick={() => scrollToSection(item)}
            className="text-[10px] uppercase tracking-[0.15em] text-[#7A6B5A] hover:text-[#C9A87C] transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}

// Landing Selector Page
function LandingSelector({ onSelect }: { onSelect: (side: 'groom' | 'bride') => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(images/homeimg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 py-8 max-w-md w-full">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-3">
          After 6 beautiful years
        </p>
        
        <h1 className="font-serif text-4xl text-white mb-1">
          Vivek <span className="text-[#C9A87C]">&</span> Vamika
        </h1>
        
        <p className="font-serif text-lg text-white/90 mb-2">
          are getting married
        </p>
        
        <p className="text-[#C9A87C] text-lg mb-10">
          April 26, 2026
        </p>
        
        <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-6">
          Select your invitation
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelect('groom')}
            className="w-full group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A87C]/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#C9A87C]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-serif text-lg">Groom&apos;s Side</p>
                  <p className="text-white/60 text-xs">Wedding Ceremony</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C9A87C] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <button
            onClick={() => onSelect('bride')}
            className="w-full group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A5A5]/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#D4A5A5]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-serif text-lg">Bride&apos;s Side</p>
                  <p className="text-white/60 text-xs">Reception Celebration</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#D4A5A5] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-hint">
        <ChevronDown className="w-5 h-5 text-white/50" />
      </div>
    </div>
  );
}

// Hero Section
function HeroSection({ side }: { side: 'groom' | 'bride' }) {
  const data = weddingData[side];
  
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'url(/images/homeimg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/30 z-[2]" />
      
      <div className="relative z-[3] text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Heart className="w-4 h-4 text-[#C9A87C]" fill="#C9A87C" />
          <span className="text-white/90 text-xs uppercase tracking-[0.2em]">{data.eventName}</span>
        </div>
        
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-4">
          Vivek <span className="text-[#C9A87C]">&</span> Vamika
        </h1>
        
        <p className="font-serif text-xl text-white/90 mb-2">
          are getting married
        </p>
        
        <p className="text-[#C9A87C] text-2xl mb-8">
          April 26, 2026
        </p>
        
        <button 
          onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-gold"
        >
          Join Our Happiness
        </button>
      </div>
    </section>
  );
}

// Story Timeline Section
function StorySection() {
  const events = [
    {
      year: '2019',
      title: 'The First Encounter',
      description: 'It all began in the halls of our college. A chance meeting that turned into a beautiful friendship we never knew we needed.',
    },
    {
      year: '2020',
      title: 'When Friendship Turned to Love',
      description: 'Sharing notes turned into sharing dreams. As we realized we shared the same soul and vibe, our friendship effortlessly blossomed into love.',
    },
    {
      year: '2020 - 2025',
      title: 'Our 6-Year Journey',
      description: 'From college days to stepping into the real world, we grew side by side. Through every high and low, our bond only grew stronger and deeper.',
    },
    {
      year: '2026',
      title: 'Choosing Forever',
      description: 'With the blessings and beautiful support of our families, we decided to make it official. Two hearts with the same vibe, ready for a lifetime together.',
    },
  ];

  return (
    <section id="story" className="relative w-full py-16 md:py-24 bg-[#F6F2EA]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A87C] mb-2">Our Journey</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3A2E22]">Our Story</h2>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C9A87C]/30 md:-translate-x-1/2" />
          
          {events.map((event, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-start gap-4 mb-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#C9A87C] rounded-full border-2 border-[#F6F2EA] md:-translate-x-1/2 z-10 mt-1.5" />
              
              <div className={`pl-10 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A87C]">{event.year}</span>
                <h3 className="font-serif text-xl text-[#3A2E22] mt-1 mb-2">{event.title}</h3>
                <p className="text-[#7A6B5A] text-sm leading-relaxed">{event.description}</p>
              </div>
              
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Personal Letter Section
function LetterSection() {
  return (
    <section id="letter" className="relative w-full py-16 md:py-24 bg-[#E9E3DA]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Heart className="w-10 h-10 text-[#D4A5A5] mx-auto mb-6" fill="#D4A5A5" />
        
        <h2 className="font-serif text-3xl md:text-4xl text-[#3A2E22] mb-8">
          To Our Dearest Friends
        </h2>
        
        <div className="space-y-4 text-[#7A6B5A] text-base leading-relaxed text-left md:text-center">
          <p>
            You have been there through every bit of our story—from the college halls in 2019 to this dream moment in 2026. For the last 6 years, you have seen us grow, laughed with us through the highs, and held us up through the lows.
          </p>
          <p>
            Our journey would not be the same without your love and constant presence. As we take the biggest step of our lives and choose &apos;forever&apos;, we want the ones who have been part of our &apos;every day&apos; to be part of our &apos;always.&apos;
          </p>
          <p className="font-serif text-lg text-[#3A2E22] italic">
            We cannot wait to celebrate this new beginning with you by our side!
          </p>
        </div>
        
        <div className="mt-10 pt-8 border-t border-[#C9A87C]/20">
          <p className="font-serif text-lg text-[#3A2E22]">With love,</p>
          <p className="font-serif text-2xl text-[#C9A87C] mt-2">Vivek & Vamika</p>
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection() {
  const images = [
    { src: 'images/homeimg.png', caption: 'The beginning' },
    { src: 'images/img2.jpeg', caption: 'Moments of joy' },
    { src: 'images/img3.jpeg', caption: 'Walking together' },
    { src: 'images/img4.jpeg', caption: 'Beautiful mornings' },
    { src: 'images/img5.jpeg', caption: 'Cheering together' },
    { src: 'images/img6.png', caption: 'Our sunset' },
    { src: 'images/img7.jpeg', caption: 'Fun time' },
    { src: 'images/img8.jpeg', caption: 'Pure happiness' },
    { src: 'images/rings-closeup.jpg', caption: 'The promise' },
  ];

  return (
    <section id="gallery" className="relative w-full py-16 md:py-24 bg-[#F6F2EA]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A87C] mb-2">Memories</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3A2E22]">Photo Gallery</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-lg bg-white p-2 shadow-sm hover:shadow-md transition-shadow ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden rounded ${
                index === 0 || index === 5 ? 'aspect-[4/3]' : 'aspect-square'
              }`}>
                <img 
                  src={image.src} 
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="font-serif italic text-[#7A6B5A] text-xs mt-2 text-center">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Wedding Details Section
function DetailsSection({ side }: { side: 'groom' | 'bride' }) {
  const data = weddingData[side];
  
  return (
    <section id="details" className="relative w-full py-16 md:py-24 bg-[#E9E3DA]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A87C] mb-2">Save the Date</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3A2E22]">Wedding Details</h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className={`${side === 'groom' ? 'bg-[#C9A87C]' : 'bg-[#D4A5A5]'} px-6 py-4`}>
            <div className="flex items-center gap-3">
              {side === 'groom' ? <User className="w-5 h-5 text-white" /> : <Users className="w-5 h-5 text-white" />}
              <span className="text-white font-serif text-lg">{data.eventName}</span>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A87C]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A6B5A] mb-1">Date</p>
                  <p className="font-serif text-xl text-[#3A2E22]">April 26, 2026</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A87C]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A6B5A] mb-1">Time</p>
                  <p className="font-serif text-xl text-[#3A2E22]">{data.time}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A87C]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A6B5A] mb-1">Venue</p>
                  <p className="font-serif text-xl text-[#3A2E22]">{data.venue}</p>
                  <p className="text-[#7A6B5A] text-sm mt-0.5">{data.address}</p>
                </div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="mt-8 pt-6 border-t border-[#E9E3DA]">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 bg-[#F6F2EA] rounded-lg flex items-center justify-center border-2 border-dashed border-[#C9A87C]/30 flex-shrink-0">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-1 relative">
                      {/* Simple QR pattern */}
                      <svg viewBox="0 0 64 64" className="w-full h-full">
                        <rect x="4" y="4" width="20" height="20" fill="#C9A87C" rx="2"/>
                        <rect x="8" y="8" width="12" height="12" fill="white" rx="1"/>
                        <rect x="10" y="10" width="8" height="8" fill="#C9A87C" rx="1"/>
                        <rect x="40" y="4" width="20" height="20" fill="#C9A87C" rx="2"/>
                        <rect x="44" y="8" width="12" height="12" fill="white" rx="1"/>
                        <rect x="46" y="10" width="8" height="8" fill="#C9A87C" rx="1"/>
                        <rect x="4" y="40" width="20" height="20" fill="#C9A87C" rx="2"/>
                        <rect x="8" y="44" width="12" height="12" fill="white" rx="1"/>
                        <rect x="10" y="46" width="8" height="8" fill="#C9A87C" rx="1"/>
                        <rect x="32" y="32" width="6" height="6" fill="#C9A87C"/>
                        <rect x="42" y="32" width="6" height="6" fill="#C9A87C"/>
                        <rect x="52" y="32" width="6" height="6" fill="#C9A87C"/>
                        <rect x="32" y="42" width="6" height="6" fill="#C9A87C"/>
                        <rect x="44" y="44" width="4" height="4" fill="#C9A87C"/>
                        <rect x="52" y="52" width="8" height="8" fill="#C9A87C"/>
                      </svg>
                    </div>
                    <p className="text-[8px] text-[#7A6B5A]">Scan for location</p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm text-[#7A6B5A]">{data.note}</p>
                  <p className="text-xs text-[#C9A87C] mt-2">Scan the QR code for exact directions</p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="btn-gold flex-1 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" fill="white" />
                RSVP Now
              </button>
              <button className="btn-outline flex-1">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative w-full py-12 bg-[#3A2E22]">
      <div className="max-w-md mx-auto px-6 text-center">
        <Heart className="w-6 h-6 text-[#C9A87C] mx-auto mb-4" fill="#C9A87C" />
        <p className="font-serif text-xl text-[#F6F2EA] mb-1">Vamika & Vivek</p>
        <p className="text-[#C9A87C] text-sm mb-4">April 26, 2026</p>
        <p className="text-[#F6F2EA]/50 text-xs">Made with love for our closest friends</p>
      </div>
    </footer>
  );
}

// Main Wedding Content
function WeddingContent({ side, onReset }: { side: 'groom' | 'bride'; onReset: () => void }) {
  return (
    <div className="relative">
      <Navigation onReset={onReset} />
      <AudioPlayer />
      
      <main>
        <HeroSection side={side} />
        <StorySection />
        <LetterSection />
        <GallerySection />
        <DetailsSection side={side} />
        <Footer />
      </main>
    </div>
  );
}

// Main App
function App() {
  const [selectedSide, setSelectedSide] = useState<'groom' | 'bride' | null>(null);

  const handleSelect = (side: 'groom' | 'bride') => {
    setSelectedSide(side);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedSide(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="grain-overlay" />
      
      {selectedSide === null ? (
        <LandingSelector onSelect={handleSelect} />
      ) : (
        <WeddingContent side={selectedSide} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
