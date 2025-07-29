import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { AskAISection } from '@/components/sections/AskAISection';
import { ThemeProvider } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';
import { aiTools } from '@/data/tools';

const Index = () => {
  const toolsRef = useRef<HTMLDivElement>(null);
  const [aiSearchFilter, setAiSearchFilter] = useState<string>('');
  const { toast } = useToast();

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToolFound = (toolId: string) => {
    const tool = aiTools.find(t => t.id === toolId);
    if (tool) {
      setAiSearchFilter(tool.name);
      scrollToTools();
      toast({
        title: "Tool Found!",
        description: `Showing results for ${tool.name}`,
      });
    }
  };

  const handleClearAISearch = () => {
    setAiSearchFilter('');
    toast({
      title: "Search Cleared",
      description: "Showing all tools",
    });
  };

  useEffect(() => {
    // GSAP ScrollTrigger initialization would go here if needed
    // For now, using Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="aim-one-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Header onNavigateToTools={scrollToTools} />
        
        <main>
          <HeroSection onNavigateToTools={scrollToTools} />
          
          <motion.div
            ref={toolsRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ToolsSection 
              searchFilter={aiSearchFilter}
              onClearSearch={handleClearAISearch}
            />
          </motion.div>

          <AskAISection onToolFound={handleToolFound} />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
