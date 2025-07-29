import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Search, Filter, Grid3X3, List, MoreHorizontal, ExternalLink,
  Star, Users, Crown, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { aiTools, categories, pricingFilters, sortOptions } from '@/data/tools';
import { Tool, ToolFilters } from '@/types/tool';
import { cn } from '@/lib/utils';

interface ToolsSectionProps {
  searchFilter?: string;
  onClearSearch?: () => void;
}

type ViewMode = 'card' | 'grid' | 'list';

export const ToolsSection = ({ searchFilter, onClearSearch }: ToolsSectionProps) => {
  const [filters, setFilters] = useState<ToolFilters>({
    search: searchFilter || '',
    category: 'All',
    pricing: 'All',
    sortBy: 'name'
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    if (searchFilter) {
      setFilters(prev => ({ ...prev, search: searchFilter }));
    }
  }, [searchFilter]);

  const filteredTools = useMemo(() => {
    let filtered = aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          tool.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesCategory = filters.category === 'All' || tool.category === filters.category;
      
      return matchesSearch && matchesCategory;
    });

    // Sort tools
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTools.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTools, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (key: keyof ToolFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative group",
        tool.isPremium && "tool-card-premium"
      )}
    >
      <Card className={cn(
        "tool-card h-full cursor-pointer flex flex-col",
        tool.isPremium && "border-primary/50"
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {tool.name}
                  {tool.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
                  {tool.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{tool.purpose}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col">
          <CardDescription className="text-sm leading-relaxed">
            {tool.description}
          </CardDescription>

          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex space-x-2 pt-2 mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleToolClick(tool.url)}
                  >
                    Try Now
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open {tool.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToolClick(tool.url)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit website</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const GridView = ({ tool, index }: { tool: Tool; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Card className="tool-card p-4 text-center h-full">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl mx-auto mb-3 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-semibold mb-1">{tool.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{tool.purpose}</p>
        <Button 
          size="sm" 
          className="w-full"
          onClick={() => handleToolClick(tool.url)}
        >
          Try Now
        </Button>
      </Card>
    </motion.div>
  );

  const ListView = ({ tool, index }: { tool: Tool; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Card className="tool-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{tool.name}</h3>
                {tool.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
              </div>
              <p className="text-sm text-muted-foreground">{tool.purpose}</p>
              <p className="text-xs text-muted-foreground mt-1">{tool.description.substring(0, 100)}...</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              size="sm"
              onClick={() => handleToolClick(tool.url)}
            >
              Try Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section id="tools" className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Explore <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect AI tool for your needs from our curated collection
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search AI tools..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
                {searchFilter && onClearSearch && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    Clear AI Search
                  </Button>
                )}
              </div>

              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            Showing {paginatedTools.length} of {filteredTools.length} tools
          </p>
        </motion.div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${currentPage}`}
            className={cn(
              "grid gap-6 mb-8",
              viewMode === 'card' && "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
              viewMode === 'grid' && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
              viewMode === 'list' && "grid-cols-1"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedTools.map((tool, index) => {
              if (viewMode === 'card') return <ToolCard key={tool.id} tool={tool} index={index} />;
              if (viewMode === 'grid') return <GridView key={tool.id} tool={tool} index={index} />;
              return <ListView key={tool.id} tool={tool} index={index} />;
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
