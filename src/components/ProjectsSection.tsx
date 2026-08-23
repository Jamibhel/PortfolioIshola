import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { siteContent, flagshipProjects } from '../data/content';
import { ProjectItem } from '../types';
import { fetchProjects } from '../lib/supabase';
import {
  Smartphone,
  Globe,
  Database,
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp,
  Search,
  Code2,
  Download,
  Lock
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { language, isZBMode } = useApp();
  const [projects, setProjects] = useState<ProjectItem[]>(flagshipProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Attempt Supabase fetch with fallback
    fetchProjects(flagshipProjects).then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      project.category === selectedCategory ||
      (selectedCategory === 'cloud' && (project.category === 'fullstack' || project.technologies.some(t => ['Supabase', 'Firebase', 'PostgreSQL'].includes(t))));
    const matchesSearch =
      searchQuery === '' ||
      project.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.tagline[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: ProjectItem['category']) => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'web':
        return <Globe className="w-3.5 h-3.5" />;
      case 'cloud':
        return <Database className="w-3.5 h-3.5" />;
      case 'fullstack':
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="projects"
      className={`py-24 px-6 relative transition-colors duration-300 border-t ${
        isZBMode
          ? 'bg-stone-950 text-stone-100 border-stone-800'
          : 'bg-[#fafaf9] text-stone-900 border-stone-200/80'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-[10px] uppercase font-bold tracking-widest mb-3">
              <Code2 className="w-3.5 h-3.5" />
              {siteContent.projects.sectionTitle[language]}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              {language === 'fr' ? 'Architecture & Produits Livrés' : 'Production Systems & Apps'}
            </h2>
            <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 mt-2 max-w-xl">
              {siteContent.projects.subtitle[language]}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder={language === 'fr' ? 'Filtrer par techno (ex: Flutter, Supabase)...' : 'Filter by tech (e.g. Flutter, Supabase)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-mono rounded-xl border bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </div>
        </div>

        {/* NDA Disclaimer Notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200/90 text-xs font-mono leading-relaxed mb-8">
          <Lock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p>
            {siteContent.projects.ndaDisclaimer[language]}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-stone-200 dark:border-stone-800 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-600 dark:text-stone-400'
            }`}
          >
            {siteContent.projects.filterAll[language]}
          </button>
          <button
            onClick={() => setSelectedCategory('mobile')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === 'mobile'
                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-600 dark:text-stone-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {siteContent.projects.filterMobile[language]}
          </button>
          <button
            onClick={() => setSelectedCategory('web')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === 'web'
                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-600 dark:text-stone-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {siteContent.projects.filterWeb[language]}
          </button>
          <button
            onClick={() => setSelectedCategory('cloud')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === 'cloud'
                ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-stone-800/80 text-stone-600 dark:text-stone-400'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            {siteContent.projects.filterCloud[language]}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl ${
                isZBMode
                  ? 'bg-stone-900/80 border-stone-800 hover:border-orange-500/40'
                  : 'bg-white border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-2 rounded-lg ${
                        isZBMode ? 'bg-stone-800 text-orange-400' : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      {getCategoryIcon(project.category)}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-stone-500">
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 group-hover:text-orange-500 transition-colors">
                  {project.title[language]}
                </h3>

                <p className="text-xs font-mono text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
                  {project.tagline[language]}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                  {isZBMode && (project.description.zbFr || project.description.zbEn)
                    ? language === 'fr'
                      ? project.description.zbFr
                      : project.description.zbEn
                    : project.description[language]}
                </p>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-stone-100/60 dark:bg-stone-950/60 border border-stone-200/50 dark:border-stone-800/50 mb-6">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-[11px] font-mono font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          {m[language]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Architecture Highlights */}
                {project.architectureHighlights && (
                  <div className="mb-6">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold mb-2">
                      {language === 'fr' ? 'Points Clés d’Architecture :' : 'Architecture Highlights:'}
                    </span>
                    <ul className="space-y-1.5">
                      {project.architectureHighlights.map((hl, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] font-light text-stone-600 dark:text-stone-300 flex items-start gap-2"
                        >
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{hl[language]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-200 dark:border-stone-800 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions: Live Demo, Mobile App, and GitHub */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {language === 'fr' ? 'Visiter le site' : 'Live Platform'}
                      </a>
                    )}

                    {project.appUrl && (
                      <a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {language === 'fr' ? 'App Mobile (APK)' : 'Install App (APK)'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
