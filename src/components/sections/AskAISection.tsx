import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, Send, Sparkles, Loader2, MessageCircle, 
  Lightbulb, X, Search, Brain 
} from 'lucide-react';
import { searchWithAI } from '@/services/aiSearch';
import { aiTools } from '@/data/tools';
import { Tool } from '@/types/tool';

interface AskAISectionProps {
  onToolFound: (toolId: string) => void;
}

export const AskAISection = ({ onToolFound }: AskAISectionProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [foundTool, setFoundTool] = useState<Tool | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const suggestions = [
    "I need a tool for creating AI images",
    "What's the best AI for writing code?",
    "I want to automate my workflow",
    "Help me find a video editing AI",
    "I need an AI for content creation"
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const result = await searchWithAI(query);
      setResponse(result.message);

      if (result.id) {
        const tool = aiTools.find(t => t.id === result.id);
        setFoundTool(tool || null);
      } else {
        setFoundTool(null);
      }
    } catch (error) {
      setResponse("I'm having trouble processing your request right now. Please try again or browse our tools manually.");
      setFoundTool(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResponse('');
    setFoundTool(null);
    setHasSearched(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section id="ask-ai" className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ask <span className="gradient-text">AI Assistant</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe what you need and our AI will recommend the perfect tool for you
            </p>
          </div>

          {/* Main Search Interface */}
          <Card className="glass border border-border/50 shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Input Area */}
                <div className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <Textarea
                        placeholder="Describe the AI tool you're looking for... e.g., 'I need an AI that can help me write blog posts and social media content'"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[100px] resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground/70 focus-visible:ring-0"
                        disabled={isLoading}
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={handleSearch}
                            disabled={!query.trim() || isLoading}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-white"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4 mr-2" />
                            )}
                            {isLoading ? 'Searching...' : 'Ask AI'}
                          </Button>

                          {hasSearched && (
                            <Button
                              variant="outline"
                              onClick={handleClear}
                              className="border-muted-foreground/20"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Clear
                            </Button>
                          )}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Press Enter to search
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suggestions (show when no search has been made) */}
                {!hasSearched && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Lightbulb className="h-4 w-4" />
                      <span>Try these examples:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-left text-sm bg-muted/50 hover:bg-muted border border-border/50 rounded-lg px-3 py-2 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* AI Response */}
                {response && (
                  <motion.div
                    className="border-t border-border/20 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                          <MessageCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-foreground/90 leading-relaxed">{response}</p>
                        </div>

                        {/* Recommended Tool */}
                        {foundTool && (
                          <motion.div
                            className="mt-6"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
                              <div className="flex items-center space-x-2 mb-4">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-primary">Recommended Tool</h3>
                              </div>
                              
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                  <Bot className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h4 className="font-semibold text-lg">{foundTool.name}</h4>
                                    {foundTool.isPremium && (
                                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                        Premium
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-2">{foundTool.purpose}</p>
                                  <p className="text-sm mb-4">{foundTool.description}</p>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-primary">
                                      {foundTool.pricing}
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        onClick={() => onToolFound(foundTool.id)}
                                        className="bg-gradient-to-r from-primary to-accent text-white"
                                      >
                                        <Search className="h-4 w-4 mr-2" />
                                        View in Tools
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(foundTool.url, '_blank')}
                                      >
                                        Try Now
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              {
                icon: Brain,
                title: "Smart Recommendations",
                description: "Our AI understands your needs and suggests the most relevant tools"
              },
              {
                icon: Search,
                title: "Natural Language",
                description: "Describe what you need in plain English - no technical jargon required"
              },
              {
                icon: Sparkles,
                title: "Instant Results",
                description: "Get personalized tool recommendations in seconds"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 rounded-xl bg-card/50 border border-border/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};