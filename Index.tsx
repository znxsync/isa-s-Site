import { useState, useEffect } from "react";
import { Lock, Instagram, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSideMessage, setShowSideMessage] = useState(false);
  const [sideMessagePosition, setSideMessagePosition] = useState<"left" | "right">("left");
  const [loadingStatus, setLoadingStatus] = useState<"idle" | "checking" | "processing" | "done">("idle");
  const [countdown, setCountdown] = useState(7);
  const [instagramClicked, setInstagramClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Show box after 30% scroll
      if (progress > 20 && !isBoxVisible) {
        setIsBoxVisible(true);
      }

      // Show side messages randomly during scroll
      if (progress > 10 && progress < 70 && Math.random() > 0.985) {
        setShowSideMessage(true);
        setSideMessagePosition(Math.random() > 0.5 ? "left" : "right");
        setTimeout(() => setShowSideMessage(false), 3000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBoxVisible]);

  // Scroll blocking removed - free scrolling enabled

  const handleBoxClick = () => {
    setIsModalOpen(true);
  };

  const handleInstagramClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    setInstagramClicked(true);
    
    // Try multiple methods to break out of iframe and open Instagram
    try {
      // Method 1: Try window.top for iframe breakout
      if (window.top && window.top !== window.self) {
        window.top.open('https://www.instagram.com/znxsync/', '_blank', 'noopener,noreferrer');
      } else {
        // Method 2: Standard window.open
        window.open('https://www.instagram.com/znxsync/', '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      // Method 3: Fallback - direct navigation
      window.location.href = 'https://www.instagram.com/znxsync/';
    }
    
    setIsModalOpen(false);
    
    // Unlock immediately when they come back
    setTimeout(() => {
      setIsUnlocked(true);
    }, 1000);
  };

  const handleModalClose = (open: boolean) => {
    if (!open && !instagramClicked && isModalOpen) {
      // User closed without clicking Instagram link
      setLoadingStatus("checking");
      setCountdown(10);
      
      // 10 second countdown for users who didn't click
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setLoadingStatus("done");
            setTimeout(() => {
              setIsUnlocked(true);
              setLoadingStatus("idle");
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsModalOpen(open);
    if (!open) {
      setInstagramClicked(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated snake-like neon ropes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left snake rope */}
        <div className="absolute left-[15%] top-[20%] w-1 h-[60%] bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 rounded-full blur-sm animate-pulse-neon">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent rounded-full blur-md"></div>
        </div>
        
        {/* Right snake rope */}
        <div className="absolute right-[15%] top-[30%] w-1 h-[50%] bg-gradient-to-b from-secondary/0 via-secondary/60 to-secondary/0 rounded-full blur-sm animate-pulse-neon" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/40 to-transparent rounded-full blur-md"></div>
        </div>
        
        {/* Center connecting rope */}
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-1 h-[40%] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Fixed Top Bar with 3D Glass Morphism */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-primary/20">
        <div className="container mx-auto px-4 py-8 relative flex items-center justify-center min-h-[120px]">
          {/* Main glass container for text */}
          <div className="relative z-10 px-12 py-6 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-2xl border border-primary/30 shadow-[0_8px_32px_0_rgba(255,0,106,0.3),inset_0_0_20px_rgba(255,0,106,0.1)]">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground text-center whitespace-nowrap">
              Welcome to ISA.V8 Room
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 pt-20">
        <div className="glass p-12 rounded-3xl max-w-4xl w-full text-center animate-fade-in-up relative">
          {/* Flame neon effect - only on borders */}
          <div className="absolute inset-0 rounded-3xl border-2 border-primary/70 animate-pulse-neon"></div>
          <div className="absolute inset-0 rounded-3xl border-4 border-primary/30 blur-sm"></div>
          <div className="absolute inset-0 rounded-3xl border-8 border-primary/20 blur-md animate-pulse"></div>
          <div className="absolute inset-0 rounded-3xl border-[12px] border-primary/10 blur-xl opacity-60 animate-pulse-neon"></div>
          
          <div className="relative z-10">
            <p className="text-3xl md:text-4xl font-bold mb-12 leading-relaxed backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl py-4 px-6 shadow-[0_8px_32px_0_rgba(255,0,106,0.15)]">
              here you can get your video link. Follow these simple Step
            </p>
            <div className="flex flex-col items-center gap-4 animate-pulse-neon">
              <p className="text-lg text-muted-foreground">Scroll down to continue</p>
              <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Side messages */}
      {showSideMessage && (
        <div
          className={`fixed top-1/2 ${
            sideMessagePosition === "left" ? "left-8 animate-slide-in-left" : "right-8 animate-slide-in-right"
          } glass p-6 rounded-2xl z-20 max-w-xs`}
        >
          <p className="text-lg">
            You're almost there, wait a few moments to see all those 🫦
          </p>
        </div>
      )}

      {/* Extended spacer for long scroll - 3 screen heights */}
      <div className="h-[300vh]" />

      {/* Loading Status Messages */}
      {loadingStatus !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass neon-border p-12 rounded-3xl max-w-md w-full mx-4 text-center animate-fade-in">
            <div className="mb-6">
              {loadingStatus === "checking" && (
                <div className="text-8xl font-bold text-primary animate-pulse-neon">
                  {countdown}
                </div>
              )}
              {loadingStatus === "done" && (
                <div className="text-6xl animate-scale-in">✓</div>
              )}
            </div>
            <p className="text-sm text-foreground/80">
              {loadingStatus === "checking" && "(it's okay if you don't want to follow) wait 10 seconds it will unlock for you"}
              {loadingStatus === "done" && "Your box is unlocked now. Scroll down a little and get your link."}
            </p>
          </div>
        </div>
      )}

      {/* Lock Box Section */}
      {isBoxVisible && (
        <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <div className="max-w-2xl w-full">
            {!isUnlocked ? (
              <div
                onClick={handleBoxClick}
                className="glass neon-border p-16 rounded-3xl text-center cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in-up"
              >
                <Lock className="w-24 h-24 mx-auto mb-8 text-primary animate-pulse-neon" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Locked Box
                </h2>
                <p className="text-xl text-foreground/80 mb-4">
                  Just complete this final step and unlock the box to go to your destination
                </p>
                <p className="text-sm text-muted-foreground">Click to unlock</p>
              </div>
            ) : (
              <div className="glass neon-border p-16 rounded-3xl text-center animate-unlock">
                <div className="w-24 h-24 mx-auto mb-8 border-4 border-primary rounded-full flex items-center justify-center">
                  <div className="text-6xl">🎉</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Congrats!
                </h2>
                <p className="text-xl text-foreground/80">
                  Now get your link down below
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Final Section with Telegram Link */}
      {isUnlocked && (
        <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <div className="glass neon-border p-12 rounded-3xl max-w-2xl w-full text-center animate-fade-in-up">
            <MessageCircle className="w-20 h-20 mx-auto mb-8 text-secondary animate-pulse-neon" />
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Your Destination
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Click below to access your exclusive content
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300 text-lg px-8 py-6 rounded-full rgb-neon-border"
            >
              <a
                href="https://t.me/isaroomv8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Join Telegram Channel
              </a>
            </Button>
          </div>
        </section>
      )}

      {/* Instagram Follow Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="glass neon-border border-2 bg-black/90">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Follow to Unlock
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-8">
            <Instagram className="w-20 h-20 text-secondary animate-pulse-neon" />
            <p className="text-lg text-center text-foreground/80">
              Follow this account and get back to the site to unlock your main link
            </p>
            <a
              href="https://www.instagram.com/znxsync/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInstagramClick}
              className="text-base text-primary hover:text-secondary transition-colors underline cursor-pointer"
            >
              https://www.instagram.com/znxsync/
            </a>
            <p className="text-sm text-muted-foreground">
              The box will unlock automatically after following that account
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
