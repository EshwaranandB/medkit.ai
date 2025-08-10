import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../utils/api.js";

const CATEGORY_META = {
  all: {
    name: "All Topics",
    desc: "Browse all health topics, articles, and resources.",
    icon: "📚"
  },
  medications: {
    name: "Medications & Supplements",
    desc: "Learn about frequently prescribed medications and popular dietary supplements.",
    icon: "💊"
  },
  tests: {
    name: "Tests & Procedures",
    desc: "Find detailed information about medical tests and procedures, including what to expect and how to prepare.",
    icon: "🔬"
  },
  diseases: {
    name: "Diseases & Conditions",
    desc: "Learn about frequently diagnosed medical conditions and their treatments.",
    icon: "🏥"
  },
  symptoms: {
    name: "Symptoms",
    desc: "Identify and understand various symptoms, their potential causes, and when to seek medical care.",
    icon: "🩺"
  },
  wellness: {
    name: "General Health",
    desc: "Explore wellness, prevention, and healthy living tips.",
    icon: "🌱"
  },
  recipes: {
    name: "Health Recipes",
    desc: "Discover nutritious recipes and healthy eating ideas.",
    icon: "🥗"
  }
};

const CATEGORY_ORDER = [
  "all", "medications", "tests", "diseases", "symptoms", "wellness", "recipes"
];

// Enhanced search operators and filters
const SEARCH_OPERATORS = {
  exact: /"([^"]+)"/g,           // Exact phrase matching
  category: /category:(\w+)/g,    // Category filtering
  group: /group:(\w+)/g,          // Group filtering
  has: /has:(\w+)/g,              // Has specific field
  type: /type:(\w+)/g             // Content type filtering
};

function getCategoryForItem(item) {
  const groups = (item.groups || []).map(g => String(g || '').toLowerCase());
  const title = String(item.title || '').toLowerCase();
  const url = String(item.url || '').toLowerCase();

  // Weighted scoring to avoid dumping into diseases by default
  const scores = { medications: 0, tests: 0, diseases: 0, symptoms: 0, wellness: 0, recipes: 0 };
  const add = (k, v = 1) => { scores[k] += v; };

  // Group-based mapping (from XML and our augmenter)
  if (groups.some(g => ["drugs and supplements", "medications", "supplements"].includes(g))) add('medications', 5);
  if (groups.some(g => ["diagnostic tests", "medical tests", "procedures", "tests and procedures"].includes(g))) add('tests', 5);
  if (groups.some(g => ["medical encyclopedia"].includes(g))) add('diseases', 3);
  if (groups.some(g => ["diseases", "conditions", "cancers", "infections", "disease", "condition", "syndromes"].includes(g))) add('diseases', 5);
  if (groups.some(g => g.includes("symptom"))) add('symptoms', 4);
  if (groups.some(g => [
    "wellness", "prevention", "general health", "personal health issues", "social/family issues", 
    "older adults", "children and teenagers", "mental health and behavior"
  ].includes(g))) add('wellness', 3);
  if (groups.some(g => ["food and nutrition", "recipes", "nutrition"].includes(g))) add('recipes', 4);

  // URL-based heuristics (for scraped pages)
  if (url.includes('/druginfo/') || url.includes('/herb/')) add('medications', 4);
  if (url.includes('/lab-tests/')) add('tests', 4);
  if (url.includes('/ency/')) add('diseases', 2);
  if (url.includes('/symptom')) add('symptoms', 2);
  if (url.includes('/nutrition') || url.includes('/recipes')) add('recipes', 3);
  if (url.includes('/health/')) add('wellness', 3);
  if (url.includes('/pregnancy') || url.includes('/babies') || url.includes('/women')) add('wellness', 2);

  // Title-based heuristics
  if (/(test|screening|biopsy|panel|imaging|scan|x-ray|mri|ct|ultrasound)\b/.test(title)) add('tests', 3);
  if (/(vitamin|mineral|supplement|drug|tablet|capsule|injection|medication)\b/.test(title)) add('medications', 3);
  if (/(symptom|signs)\b/.test(title)) add('symptoms', 2);
  if (/(disease|condition|syndrome|disorder)\b/.test(title)) add('diseases', 2);
  if (/(calorie|snack|diet|meal|recipe|food|nutrition|tips|guide|rule)\b/.test(title)) add('wellness', 2);
  if (/(recipe|cook|bake)\b/.test(title)) add('recipes', 2);
  if (/(pregnancy|prenatal|baby|fetal|week)\b/.test(title)) add('wellness', 2);

  // Choose the best scoring category, fallback to diseases
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return (best && best[1] > 0) ? best[0] : 'diseases';
}

function getLetter(item) {
  return String(item.title || '')[0]?.toUpperCase() || '';
}

// Enhanced relevance scoring with fuzzy matching and advanced operators
function getRelevanceScore(item, query, searchFilters = {}) {
  if (!query || !item) return 0;
  
  const q = query.toLowerCase();
  const title = String(item.title || '').toLowerCase();
  const meta_desc = String(item.meta_desc || '').toLowerCase();
  const summary = String(item.summary || '').toLowerCase();
  const groups = (item.groups || []).map(g => String(g || '').toLowerCase());
  const also_called = (item.also_called || []).map(a => String(a || '').toLowerCase());
  const related_topics = (item.related_topics || []).map(rt => String(rt || '').toLowerCase());
  const url = String(item.url || '').toLowerCase();
  
  // Debug: Log Fever entry scoring
  if (title === 'fever' && q === 'fever') {
    console.log('Scoring Fever entry:');
    console.log('Title:', title);
    console.log('Query:', q);
    console.log('Groups:', groups);
    console.log('Also called:', also_called);
    console.log('Related topics:', related_topics);
  }

  // Apply search filters
  if (searchFilters.category && getCategoryForItem(item) !== searchFilters.category) return 0;
  if (searchFilters.group && !groups.includes(searchFilters.group.toLowerCase())) return 0;
  if (searchFilters.has && !item[searchFilters.has]) return 0;

  // Exact matches get highest scores
  let score = 0;
  if (title === q) score += 200; // Increased from 100 to ensure it always appears first
  else if (title.startsWith(q)) score += 90;
  else if (title.includes(q)) score += 80;
  
  // Enhanced fuzzy matching for typos and similar words
  const titleWords = title.split(/\s+/);
  const queryWords = q.split(/\s+/);
  let fuzzyScore = 0;
  
  for (const qWord of queryWords) {
    if (qWord.length < 2) continue;
    
    for (const tWord of titleWords) {
      if (tWord.length < 2) continue;
      
      // Exact word match
      if (tWord === qWord) {
        fuzzyScore += 25;
        continue;
      }
      
      // Word starts with query
      if (tWord.startsWith(qWord)) {
        fuzzyScore += 20;
        continue;
      }
      
      // Word contains query
      if (tWord.includes(qWord)) {
        fuzzyScore += 15;
        continue;
      }
      
      // Query contains word (partial match)
      if (qWord.includes(tWord)) {
        fuzzyScore += 10;
        continue;
      }
      
      // Enhanced fuzzy matching for longer words
      if (qWord.length > 3 && tWord.length > 3) {
        const similarity = getWordSimilarity(qWord, tWord);
        if (similarity > 0.8) fuzzyScore += similarity * 15;
        else if (similarity > 0.6) fuzzyScore += similarity * 10;
      }
    }
  }
  score += fuzzyScore;

  // Alternative names and synonyms with enhanced scoring
  if (item.also_called && item.also_called.length > 0) {
    for (const alt of item.also_called) {
      const altLower = String(alt || '').toLowerCase();
      if (altLower === q) score += 75;
      else if (altLower.startsWith(q)) score += 65;
      else if (altLower.includes(q)) score += 55;
      else if (q.includes(altLower)) score += 45;
    }
  }

  // Enhanced content scoring with semantic relevance
  if (meta_desc.includes(q)) score += 45;
  if (summary.includes(q)) score += 40;
  
  // Multi-word content matching with proximity bonus
  const queryWordsArray = q.split(/\s+/).filter(w => w.length > 2);
  if (queryWordsArray.length > 1) {
    let contentScore = 0;
    let proximityBonus = 0;
    
    for (let i = 0; i < queryWordsArray.length; i++) {
      const word = queryWordsArray[i];
      if (summary.includes(word)) {
        contentScore += 8;
        // Check if next word is also nearby (proximity bonus)
        if (i < queryWordsArray.length - 1) {
          const nextWord = queryWordsArray[i + 1];
          const wordIndex = summary.indexOf(word);
          const nextWordIndex = summary.indexOf(nextWord, wordIndex);
          if (nextWordIndex !== -1 && nextWordIndex - wordIndex < 100) {
            proximityBonus += 5;
          }
        }
      }
      if (meta_desc.includes(word)) contentScore += 6;
    }
    score += Math.min(contentScore + proximityBonus, 40); // Cap content score
  }

  // Groups and categories with enhanced scoring
  if (groups.includes(q)) score += 50;
  else {
    // Partial group matching
    for (const groupWord of groups) {
      if (groupWord.includes(q) || q.includes(groupWord)) {
        score += 25;
        break;
      }
    }
  }
  
  // Related topics with enhanced scoring
  if (related_topics.includes(q)) score += 35;
  else {
    // Partial related topic matching
    for (const rt of item.related_topics || []) {
      const rtTitle = String(rt.title || '').toLowerCase();
      if (rtTitle.includes(q) || q.includes(rtTitle)) {
        score += 20;
        break;
      }
    }
  }

  // URL relevance
  if (url.includes(q)) score += 25;

  // Content richness bonus
  if (item.summary && String(item.summary).length > 300) score += 8;
  else if (item.summary && String(item.summary).length > 200) score += 5;
  
  if (item.related_topics && item.related_topics.length > 5) score += 5;
  else if (item.related_topics && item.related_topics.length > 0) score += 3;
  
  if (item.sites && item.sites.length > 3) score += 4;
  else if (item.sites && item.sites.length > 0) score += 2;
  
  if (item.also_called && item.also_called.length > 2) score += 3;

  // Recency bonus (if available)
  if (item.last_updated) {
    const daysSinceUpdate = (Date.now() - new Date(item.last_updated).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) score += 3;
    else if (daysSinceUpdate < 90) score += 2;
    else if (daysSinceUpdate < 365) score += 1;
  }

  // Popularity bonus (if available)
  if (item.view_count && item.view_count > 1000) score += 2;
  else if (item.view_count && item.view_count > 100) score += 1;

  // Debug: Log final score for Fever
  if (title === 'fever' && q === 'fever') {
    console.log('Final Fever score:', Math.round(score));
  }

  return Math.round(score);
}

// Simple word similarity function
function getWordSimilarity(word1, word2) {
  if (word1 === word2) return 1;
  if (word1.length < 2 || word2.length < 2) return 0;
  
  const longer = word1.length > word2.length ? word1 : word2;
  const shorter = word1.length > word2.length ? word2 : word1;
  
  if (longer.length === 0) return 1;
  
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Simple edit distance calculation
function getEditDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Parse search query for operators
function parseSearchQuery(query) {
  const filters = {};
  let cleanQuery = query;
  
  // Extract exact phrases
  const exactMatches = [...query.matchAll(SEARCH_OPERATORS.exact)];
  exactMatches.forEach(match => {
    filters.exact = match[1];
    cleanQuery = cleanQuery.replace(match[0], '');
  });
  
  // Extract category filter
  const categoryMatch = query.match(SEARCH_OPERATORS.category);
  if (categoryMatch) {
    filters.category = categoryMatch[1];
    cleanQuery = cleanQuery.replace(categoryMatch[0], '');
  }
  
  // Extract group filter
  const groupMatch = query.match(SEARCH_OPERATORS.group);
  if (groupMatch) {
    filters.group = groupMatch[1];
    cleanQuery = cleanQuery.replace(groupMatch[0], '');
  }
  
  // Extract has filter
  const hasMatch = query.match(SEARCH_OPERATORS.has);
  if (hasMatch) {
    filters.has = hasMatch[1];
    cleanQuery = cleanQuery.replace(hasMatch[0], '');
  }
  
  return {
    cleanQuery: cleanQuery.trim(),
    filters
  };
}

function highlightMatch(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark class="bg-violet-700/60 text-white rounded px-1 py-0.5">' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
}




// Enhanced autocomplete with better suggestions and categorization
function getAutocompleteSuggestions(query, allData, maxResults = 20) {
  if (!query || query.length < 2) return [];
  
  const q = query.toLowerCase();
  const suggestions = [];
  const seenIds = new Set();
  
  // Helper function to add suggestion if not already seen
  const addSuggestion = (item, priority, reason, category) => {
    if (!seenIds.has(item.id)) {
      suggestions.push({ 
        ...item, 
        _priority: priority, 
        _reason: reason,
        _category: category 
      });
      seenIds.add(item.id);
    }
  };
  
  // Priority 1: Exact title matches (highest priority)
  const exactMatches = allData.filter(item => 
    String(item.title || '').toLowerCase() === q
  ).slice(0, 3);
  exactMatches.forEach(item => addSuggestion(item, 100, 'Exact match', 'exact'));
  
  // Priority 2: Title starts with query
  const titleStartsWith = allData.filter(item => 
    String(item.title || '').toLowerCase().startsWith(q) && 
    !exactMatches.some(e => e.id === item.id)
  ).slice(0, 3);
  titleStartsWith.forEach(item => addSuggestion(item, 90, 'Starts with', 'starts'));
  
  // Priority 3: Alternative names that start with query
  const altNameMatches = allData.filter(item => 
    item.also_called && 
    item.also_called.some(a => String(a || '').toLowerCase().startsWith(q)) &&
    !suggestions.some(s => s.id === item.id)
  ).slice(0, 3);
  altNameMatches.forEach(item => addSuggestion(item, 85, 'Alternative name', 'alt'));
  
  // Priority 4: Title contains query (partial match)
  const titleContains = allData.filter(item => 
    String(item.title || '').toLowerCase().includes(q) &&
    !suggestions.some(s => s.id === item.id)
  ).slice(0, 3);
  titleContains.forEach(item => addSuggestion(item, 80, 'Contains', 'contains'));
  
  // Priority 5: Group matches
  const groupMatches = allData.filter(item => 
    item.groups && 
    item.groups.some(g => String(g || '').toLowerCase().includes(q)) &&
    !suggestions.some(s => s.id === item.id)
  ).slice(0, 2);
  groupMatches.forEach(item => addSuggestion(item, 75, 'Group match', 'group'));
  
  // Priority 6: Meta description contains query
  const descMatches = allData.filter(item => 
    item.meta_desc && 
    String(item.meta_desc || '').toLowerCase().includes(q) &&
    !suggestions.some(s => s.id === item.id)
  ).slice(0, 2);
  descMatches.forEach(item => addSuggestion(item, 70, 'Description match', 'desc'));
  
  // Priority 7: Related topics contain query
  const relatedMatches = allData.filter(item => 
    item.related_topics && 
    item.related_topics.some(rt => String(rt.title || '').toLowerCase().includes(q)) &&
    !suggestions.some(s => s.id === item.id)
  ).slice(0, 2);
  relatedMatches.forEach(item => addSuggestion(item, 65, 'Related topic', 'related'));
  
  // Priority 8: Fuzzy matches for longer queries
  if (q.length > 3) {
    const fuzzyMatches = allData.filter(item => {
      if (suggestions.some(s => s.id === item.id)) return false;
      
      const title = String(item.title || '').toLowerCase();
      const similarity = getWordSimilarity(q, title);
      return similarity > 0.7;
    }).slice(0, 2);
    
    fuzzyMatches.forEach(item => {
      const title = String(item.title || '').toLowerCase();
      const similarity = getWordSimilarity(q, title);
      addSuggestion(item, Math.round(similarity * 60), 'Similar', 'fuzzy');
    });
  }
  
  // Sort by priority and return top results
  return suggestions
    .sort((a, b) => b._priority - a._priority)
    .slice(0, maxResults)
    .map(item => ({
      ...item,
      _displayTitle: highlightMatch(String(item.title || 'Untitled'), query),
      _displayReason: item._reason,
      _displayCategory: item._category
    }));
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const meta = CATEGORY_META[categoryId] || CATEGORY_META.all;
  const [allData, setAllData] = useState([]);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [autocomplete, setAutocomplete] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef();
  const [categoryCounts, setCategoryCounts] = useState(null);

  const [searchHistory, setSearchHistory] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchStats, setSearchStats] = useState(null);
  

  const PAGE_SIZE = 48;
  const initialPage = Math.max(1, parseInt(new URLSearchParams(location.search).get('page') || '1', 10));
  const [page, setPage] = useState(initialPage);

  // Load dataset client-side
  useEffect(() => {
    setLoading(true);
    fetch("/medlineplus_full.json")
      .then(res => res.json())
      .then(data => {
        // Normalize structure: ensure required fields exist
        const normalizedRaw = (Array.isArray(data) ? data : []).map((d, idx) => ({
          id: d.id || String(idx),
          title: d.title || d.name || 'Untitled',
          url: d.url || '',
          meta_desc: d.meta_desc || d.description || '',
          summary: d.summary || '',
          also_called: Array.isArray(d.also_called) ? d.also_called : [],
          groups: Array.isArray(d.groups) ? d.groups : [],
          related_topics: Array.isArray(d.related_topics) ? d.related_topics : [],
          sites: Array.isArray(d.sites) ? d.sites : [],
        }));
        // Filter Spanish strictly by URL folders to avoid losing English content
        const englishOnly = normalizedRaw.filter(it => {
          const url = String(it.url || '').toLowerCase();
          return !(url.includes('/spanish/') || url.includes('/espanol/'));
        });
        // Dedupe by URL only (keep distinct titles even if similar)
        const byUrl = new Map();
        for (const it of englishOnly) {
          const key = String(it.url || '').toLowerCase();
          if (!key) continue;
          const prev = byUrl.get(key);
          if (!prev) byUrl.set(key, it);
          else {
            const prevLen = String(prev.summary || '').length + String(prev.meta_desc || '').length;
            const curLen = String(it.summary || '').length + String(it.meta_desc || '').length;
            if (curLen > prevLen) byUrl.set(key, it);
          }
        }
        const normalized = Array.from(byUrl.values());
        console.log("Loaded data:", normalized.length, "items");
        console.log("Sample item:", normalized[0]);
        setAllData(normalized);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  // Load live counts from backend; fallback to local computation
  useEffect(() => {
    let cancelled = false;
    async function loadStats() {
      try {
        const stats = await apiClient.getLibraryStats();
        if (!cancelled && stats && stats.success) {
          setCategoryCounts({ all: stats.total, ...stats.byCategory });
          return;
        }
      } catch {
        // ignore; we'll use local fallback
      }
      // Local fallback from allData
      if (!cancelled) {
        const counts = { all: allData.length, medications: 0, tests: 0, diseases: 0, symptoms: 0, wellness: 0, recipes: 0 };
        for (const it of allData) {
          const c = getCategoryForItem(it);
          counts[c] = (counts[c] || 0) + 1;
        }
        setCategoryCounts(counts);
      }
    }
    loadStats();
    return () => { cancelled = true; };
  }, [allData]);

  // Enhanced search with better result analysis and suggestions
  const performSearch = (searchQuery) => {
    const { cleanQuery, filters } = parseSearchQuery(searchQuery);

    // Update the query state so the useEffect can filter results
    setQuery(cleanQuery);
    
    // Update search history
    if (cleanQuery.trim()) {
      setSearchHistory(prev => {
        const newHistory = [cleanQuery, ...prev.filter(h => h !== cleanQuery)].slice(0, 10);
        return newHistory;
      });
    }
    
    // Calculate search statistics and analyze results
    if (cleanQuery.trim()) {
      const startTime = performance.now();
      const results = allData.filter(item => {
        if (categoryId !== "all" && getCategoryForItem(item) !== categoryId) return false;
        if (filters.category && getCategoryForItem(item) !== filters.category) return false;
        if (filters.group && !item.groups?.some(g => String(g || '').toLowerCase().includes(String(filters.group || '').toLowerCase()))) return false;
        if (filters.has && !item[filters.has]) return false;
        return getRelevanceScore(item, cleanQuery, filters) > 0;
      });
      
      // Enhanced result analysis
      const resultAnalysis = analyzeSearchResults(results, cleanQuery);
      const endTime = performance.now();
      
      // Generate "Did you mean" suggestions for low-result searches
      let suggestions = null;
      if (results.length < 5 && cleanQuery.length > 2) {
        suggestions = generateDidYouMeanSuggestions(cleanQuery, allData);
      }
      
      setSearchStats({
        query: cleanQuery,
        resultsCount: results.length,
        searchTime: Math.round(endTime - startTime),
        filters: Object.keys(filters).length > 0 ? filters : null,
        analysis: resultAnalysis
      });
      
      // Set did you mean suggestions
      setDidYouMean(suggestions);
    } else {
      setSearchStats(null);
      setDidYouMean(null);
    }
  };

  // New function to analyze search results
  function analyzeSearchResults(results, query) {
    if (results.length === 0) return null;
    
    const analysis = {
      topCategories: {},
      topGroups: {},
      commonTerms: {},
      averageRelevance: 0,
      resultTypes: {
        exact: 0,
        partial: 0,
        fuzzy: 0
      }
    };
    
    let totalRelevance = 0;
    
    results.forEach(item => {
      // Category analysis
      const category = getCategoryForItem(item);
      analysis.topCategories[category] = (analysis.topCategories[category] || 0) + 1;
      
      // Group analysis
      if (item.groups) {
        item.groups.forEach(group => {
          analysis.topGroups[group] = (analysis.topGroups[group] || 0) + 1;
        });
      }
      
      // Relevance analysis
      const relevance = getRelevanceScore(item, query);
      totalRelevance += relevance;
      
      // Type analysis
      if (String(item.title || '').toLowerCase() === query.toLowerCase()) {
        analysis.resultTypes.exact++;
      } else if (String(item.title || '').toLowerCase().includes(query.toLowerCase())) {
        analysis.resultTypes.partial++;
      } else {
        analysis.resultTypes.fuzzy++;
      }
    });
    
    analysis.averageRelevance = Math.round(totalRelevance / results.length);
    
    // Sort categories and groups by frequency
    analysis.topCategories = Object.entries(analysis.topCategories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        
    analysis.topGroups = Object.entries(analysis.topGroups)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    
    return analysis;
  }

  // Generate "Did you mean" suggestions for misspelled queries
  function generateDidYouMeanSuggestions(query, allData) {
    const suggestions = [];
    const addSuggestion = (title, similarity) => {
      suggestions.push({ title, similarity });
    };
    
    // Find items with similar titles
    allData.forEach(item => {
      const itemTitle = String(item.title || 'Untitled');
      if (itemTitle.toLowerCase() === query.toLowerCase()) {
        addSuggestion(itemTitle, 100);
      } else if (itemTitle.toLowerCase().includes(query.toLowerCase())) {
        addSuggestion(itemTitle, 85);
      }
    });
    
    // Add fuzzy matches
    allData.forEach(item => {
      const itemTitle = String(item.title || 'Untitled');
      const similarity = getWordSimilarity(query.toLowerCase(), itemTitle.toLowerCase());
      if (similarity > 0.8 && !suggestions.some(s => s.title === itemTitle)) {
        addSuggestion(itemTitle, Math.round(similarity * 100));
      }
    });
    
    return suggestions
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
  }

  // Compute filtered items client-side with pagination
  useEffect(() => {
    let filtered = allData;
    if (categoryId !== "all") {
      filtered = filtered.filter(item => getCategoryForItem(item) === categoryId);
    }
    if (selectedLetter) {
      filtered = filtered.filter(item => getLetter(item) === selectedLetter);
    }
    if (query.trim()) {
      const { cleanQuery, filters } = parseSearchQuery(query);
      
      // Debug: Log the search query and check Fever entry
      if (cleanQuery.toLowerCase() === 'fever') {
        console.log('Searching for "fever"');
        const feverEntry = allData.find(item => String(item.title || '').toLowerCase() === 'fever');
        if (feverEntry) {
          console.log('Found Fever entry:', feverEntry);
          const feverScore = getRelevanceScore(feverEntry, cleanQuery, filters);
          console.log('Fever relevance score:', feverScore);
        } else {
          console.log('No Fever entry found in allData');
        }
      }
      
      // Score and sort
      filtered = filtered.map(item => ({ ...item, _score: getRelevanceScore(item, cleanQuery, filters) }))
        .filter(item => item._score > 0)
        .sort((a, b) => b._score - a._score || String(a.title || '').localeCompare(String(b.title || '')));
      
      // Debug: Log top 5 results
      if (cleanQuery.toLowerCase() === 'fever') {
        console.log('Top 5 search results:', filtered.slice(0, 5).map(item => ({
          title: item.title,
          score: item._score
        })));
      }
    }
    
    // Only sort by category when NOT searching (to preserve relevance order)
    if (!query.trim()) {
      // Group and sort items by category, then by title, stable slice
      filtered = filtered
        .sort((a, b) => {
          const ca = getCategoryForItem(a);
          const cb = getCategoryForItem(b);
          if (ca !== cb) return ca.localeCompare(cb);
          return (String(a.title || '')).localeCompare(String(b.title || ''));
        });
    }
    
    const total = filtered.length;
    setTotalCount(total);
    const safePage = Math.max(1, Math.min(page, Math.ceil(Math.max(1, total) / PAGE_SIZE)));
    if (safePage !== page) setPage(safePage);
    const start = (safePage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setItems(filtered.slice(start, end));
    
    // Enhanced autocomplete
    if (query.trim()) {
      const suggestions = getAutocompleteSuggestions(query, allData);
      setAutocomplete(suggestions);
    } else {
      setAutocomplete([]);
    }
  }, [allData, categoryId, query, selectedLetter, page]);

  // Reset to page 1 when filters change and sync page in URL
  useEffect(() => {
    setPage(1);
  }, [categoryId, selectedLetter, query]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (page > 1) params.set('page', String(page));
    else params.delete('page');
    navigate(`/library/${categoryId}` + (params.toString() ? `?${params.toString()}` : ''), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Did you mean - now handled by performSearch function
  const [didYouMean, setDidYouMean] = useState(null);

  // Letters available for browse by letter
  const letters = Array.from(new Set(
    (categoryId === "all" ? allData : allData.filter(item => getCategoryForItem(item) === categoryId))
      .map(getLetter)
      .filter(l => l.match(/[A-Z]/))
  )).sort();

  // Get unique groups for filtering
  const availableGroups = Array.from(new Set(
    allData.flatMap(item => item.groups || [])
  )).sort();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 pb-12 pt-36 md:pt-32">
      {/* Back Button */}
      <div className="w-full max-w-4xl mx-auto flex items-center mb-6">
        <button
          onClick={() => navigate('/library')}
          className="mr-4 text-violet-400 hover:text-violet-200 text-2xl font-bold focus:outline-none"
          aria-label="Back to categories"
        >
          ×
        </button>
        <span className="text-lg text-gray-400">Back to Categories</span>
      </div>
      
      {/* Category Navigation */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {CATEGORY_ORDER.map(catId => (
            <Link
              key={catId}
              to={`/library/${catId}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 border-2 ${catId === categoryId ? 'bg-violet-900 border-violet-500 text-white scale-105' : 'bg-gray-900 border-gray-800 text-violet-300 hover:border-violet-500 hover:bg-violet-800'} focus:outline-none`}
              style={{ textDecoration: 'none' }}
            >
              <span className="text-xl">{CATEGORY_META[catId].icon}</span>
              <span>{CATEGORY_META[catId].name}</span>
              {categoryCounts && typeof categoryCounts[catId] === 'number' && (
                <span className="ml-2 text-xs bg-violet-700/70 text-white px-2 py-0.5 rounded-lg border border-violet-400/40">
                  {categoryCounts[catId]}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8 mb-8 flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3 break-words">
              <span className="text-3xl md:text-4xl">{meta.icon}</span> {meta.name}
            </h1>
            <p className="text-lg text-gray-300 mb-2 max-w-xl">{meta.desc}</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center w-full sm:w-auto mt-4 md:mt-0 min-w-[170px] max-w-full">
            <span className="text-sm text-gray-400 mb-2">Browse by Letter</span>
            <div className="grid grid-cols-7 gap-2">
              {letters.map(l => (
                <button
                  key={l}
                  className={`w-8 h-8 rounded-lg font-bold transition-colors ${selectedLetter === l ? 'bg-violet-600 text-white' : 'bg-gray-800 text-violet-300 hover:bg-violet-700'}`}
                  onClick={() => setSelectedLetter(selectedLetter === l ? "" : l)}
                >
                  {l}
                </button>
              ))}
            </div>
            {selectedLetter && (
              <button className="mt-2 text-xs text-violet-400 underline" onClick={() => setSelectedLetter("")}>Clear</button>
            )}
          </div>
        </div>
        
        {/* Enhanced Search Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 relative">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                className="w-full p-4 rounded-l-lg bg-gray-900 text-white border-none outline-none pr-12"
                type="text"
                placeholder={`Search ${meta.name.toLowerCase()}... (use "quotes" for exact phrases, category:medications, group:diabetes)`}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setShowAutocomplete(true);
                }}
                onFocus={() => setShowAutocomplete(true)}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 150)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    performSearch(query);
                    setShowAutocomplete(false);
                  } else if (e.key === 'Escape') {
                    setShowAutocomplete(false);
                    inputRef.current?.blur();
                  }
                }}
                autoComplete="off"
                disabled={loading}
              />
              
              {/* Search Icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
            
            <button
              className="px-6 py-4 bg-violet-600 hover:bg-violet-700 rounded-r-lg font-semibold transition-colors"
              onClick={() => performSearch(query)}
              disabled={loading}
            >
              Search
            </button>
            
            <button
              className="px-4 py-4 bg-gray-700 hover:bg-gray-600 rounded-r-lg font-semibold transition-colors"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              title="Advanced Filters"
            >
              ⚙️
            </button>
          </div>
          
          {/* Enhanced Autocomplete */}
          {showAutocomplete && autocomplete.length > 0 && (
            <div className="absolute z-50 w-full max-w-2xl bg-gray-900 border border-violet-500/30 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
              {autocomplete.map((item) => (
                <div
                  key={item.id}
                  className="p-3 hover:bg-violet-900/30 cursor-pointer border-b border-gray-800 last:border-b-0 transition-colors"
                  onClick={() => {
                    const searchTerm = String(item.title || 'Untitled');
                    setQuery(searchTerm);
                    setShowAutocomplete(false);
                    performSearch(searchTerm);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {String(item.title || '?')[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="font-medium text-white"
                          dangerouslySetInnerHTML={{ __html: item._displayTitle }}
                        />
                        <span className="text-violet-400 text-xs bg-violet-900/50 px-2 py-0.5 rounded">
                          {item._displayReason}
                        </span>
                      </div>
                      
                      {item.meta_desc && (
                        <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                          {item.meta_desc}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {item.groups?.length > 0 && (
                          <span className="flex items-center gap-1">
                            🏷️ {String(item.groups[0] || 'Unknown')}
                            {item.groups.length > 1 && ` +${item.groups.length - 1}`}
                          </span>
                        )}
                        
                        {item.also_called?.length > 0 && (
                          <span className="flex items-center gap-1">
                            🔄 {String(item.also_called[0] || 'Unknown')}
                            {item.also_called.length > 1 && ` +${item.also_called.length - 1}`}
                          </span>
                        )}
                        
                        {item.related_topics?.length > 0 && (
                          <span className="flex items-center gap-1">
                            🔗 {item.related_topics.length} related
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-3 bg-gray-800/50 text-center text-gray-400 text-sm border-t border-gray-700">
                Press Enter to search, Esc to close
              </div>
            </div>
          )}
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-violet-500/30">
              <h3 className="text-violet-300 font-semibold mb-3 flex items-center gap-2">
                🔍 Advanced Search Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-violet-200 mb-3 font-medium">Search Operators:</p>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <code className="bg-gray-800 px-2 py-1 rounded text-violet-300">"exact phrase"</code>
                      <span>Exact match</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <code className="bg-gray-800 px-2 py-1 rounded text-violet-300">category:medications</code>
                      <span>Filter by category</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <code className="bg-gray-800 px-2 py-1 rounded text-violet-300">group:diabetes</code>
                      <span>Filter by medical group</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <code className="bg-gray-800 px-2 py-1 rounded text-violet-300">has:related_topics</code>
                      <span>Has specific field</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-violet-200 mb-3 font-medium">Quick Group Filters:</p>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {availableGroups.slice(0, 25).map(group => (
                      <button
                        key={group}
                        className="px-3 py-1.5 bg-violet-800/30 text-violet-300 text-xs rounded-lg border border-violet-600/50 hover:bg-violet-700/50 transition-colors"
                        onClick={() => {
                          setQuery(prev => `${prev} group:${group}`.trim());
                          setShowAdvancedFilters(false);
                        }}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Enhanced Search Statistics */}
          {searchStats && (
            <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-violet-300">
                  Found <strong>{searchStats.resultsCount.toLocaleString()}</strong> results for "{searchStats.query}" 
                  in <strong>{searchStats.searchTime}ms</strong>
                </span>
                {searchStats.filters && (
                  <span className="text-violet-400 text-xs">
                    Filters: {Object.entries(searchStats.filters).map(([k, v]) => `${k}:${v}`).join(', ')}
                  </span>
                )}
              </div>
              
              {/* Search Analysis */}
              {searchStats.analysis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Result Types */}
                  <div className="bg-violet-800/20 rounded-lg p-3">
                    <h4 className="text-violet-300 font-medium mb-2">Result Types</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-green-300">Exact matches:</span>
                        <span className="text-white">{searchStats.analysis.resultTypes.exact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Partial matches:</span>
                        <span className="text-white">{searchStats.analysis.resultTypes.partial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-300">Fuzzy matches:</span>
                        <span className="text-white">{searchStats.analysis.resultTypes.fuzzy}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Top Categories */}
                  <div className="bg-violet-800/20 rounded-lg p-3">
                    <h4 className="text-violet-300 font-medium mb-2">Top Categories</h4>
                    <div className="space-y-1">
                      {Object.entries(searchStats.analysis.topCategories).slice(0, 3).map(([category, count]) => (
                        <div key={category} className="flex justify-between">
                          <span className="text-violet-200">{category}:</span>
                          <span className="text-white">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Top Groups */}
                  <div className="bg-violet-800/20 rounded-lg p-3">
                    <h4 className="text-violet-300 font-medium mb-2">Top Groups</h4>
                    <div className="space-y-1">
                      {Object.entries(searchStats.analysis.topGroups).slice(0, 3).map(([group, count]) => (
                        <div key={group} className="flex justify-between">
                          <span className="text-violet-200">{group}:</span>
                          <span className="text-white">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="bg-gray-800/30 rounded-xl p-3 mb-4">
              <p className="text-violet-300 text-sm mb-2">Recent Searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 8).map((term, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-violet-800/40 text-violet-200 text-xs rounded-lg border border-violet-600/50 hover:bg-violet-700/50 transition-colors"
                    onClick={() => {
                      setQuery(term);
                      performSearch(term);
                    }}
                  >
                    {term}
                  </button>
                ))}
                <button
                  className="px-2 py-1 text-violet-400 text-xs hover:text-violet-200"
                  onClick={() => setSearchHistory([])}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Did you mean with multiple suggestions */}
        {didYouMean && (
          <div className="mb-4 w-full max-w-2xl mx-auto text-left">
            <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-3">
              <span className="text-violet-300 text-sm font-medium">Did you mean: </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {didYouMean.map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 bg-violet-700/50 hover:bg-violet-600/50 text-violet-200 text-sm rounded-lg border border-violet-500/50 transition-colors"
                    onClick={() => {
                      setQuery(suggestion.title);
                      performSearch(suggestion.title);
                    }}
                  >
                    {suggestion.title}
                    <span className="ml-2 text-violet-400 text-xs">
                      ({suggestion.similarity}% match)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mb-4"></div>
          <span className="text-violet-400">Loading {meta.name.toLowerCase()}...</span>
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {query.trim() ? `Search Results for "${query}"` : `Common ${meta.name}`}
            </h2>
            <div className="text-sm text-violet-400 bg-violet-900/20 px-3 py-1 rounded-lg border border-violet-500/30">
              {query.trim() ? `${totalCount.toLocaleString()} search results` : `${totalCount.toLocaleString()} topics in this category`}
            </div>
          </div>
          {items.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-6">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
                <p className="text-gray-500">We couldn't find any topics matching your search criteria.</p>
              </div>
              
              {/* Search Suggestions */}
              {query.trim() && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-violet-300 font-medium mb-4">Search Suggestions:</h4>
                    
                    {/* Did you mean */}
                    {didYouMean && (
                      <div className="mb-4 p-3 bg-violet-900/20 rounded-lg border border-violet-500/30">
                        <p className="text-violet-200 text-sm mb-2">Did you mean:</p>
                        <button
                          className="text-violet-300 underline font-medium hover:text-violet-100"
                          onClick={() => {
                            setQuery(didYouMean.title);
                            performSearch(didYouMean.title);
                          }}
                        >
                          {didYouMean.title}
                        </button>
                      </div>
                    )}
                    
                    {/* Search Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-violet-200 mb-2 font-medium">Try these:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Check spelling</li>
                          <li>• Use fewer words</li>
                          <li>• Try synonyms</li>
                          <li>• Use quotes for exact phrases</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-violet-200 mb-2 font-medium">Examples:</p>
                        <ul className="text-gray-300 space-y-1">
                          <li>• <code className="bg-gray-800 px-1 rounded">"heart attack"</code></li>
                          <li>• <code className="bg-gray-800 px-1 rounded">diabetes type 2</code></li>
                          <li>• <code className="bg-gray-800 px-1 rounded">group:cardiovascular</code></li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Popular Searches */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-violet-200 text-sm mb-2">Popular searches in this category:</p>
                      <div className="flex flex-wrap gap-2">
                        {['diabetes', 'heart disease', 'cancer', 'hypertension', 'asthma'].map(term => (
                          <button
                            key={term}
                            className="px-3 py-1 bg-violet-800/30 text-violet-300 text-xs rounded-lg border border-violet-600/50 hover:bg-violet-700/50 transition-colors"
                            onClick={() => {
                              setQuery(term);
                              performSearch(term);
                            }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Browse by Letter */}
              {!query.trim() && letters.length > 0 && (
                <div className="mt-6">
                  <p className="text-gray-400 mb-3">Or browse alphabetically:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {letters.slice(0, 20).map(l => (
                      <button
                        key={l}
                        className="w-10 h-10 rounded-lg font-bold transition-colors bg-gray-800 text-violet-300 hover:bg-violet-700 hover:text-white"
                        onClick={() => setSelectedLetter(l)}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {totalCount > 0 && (
            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
              <span>
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, totalCount)}–{Math.min(page * PAGE_SIZE, totalCount)} of {totalCount}
              </span>
              <span>
                Page {page} of {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
              <Link
                key={item.id || idx}
                to={`/library/${categoryId}/${item.id}`}
                className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col hover:bg-violet-900 transition-all duration-200 cursor-pointer text-white focus:outline-none min-h-[200px] h-full border border-gray-800 hover:border-violet-500/50"
                style={{ textDecoration: 'none' }}
              >
                {/* Relevance Score Badge */}
                {query.trim() && item._score && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-violet-600 text-white text-xs rounded-full font-medium">
                      {Math.round(item._score)}
                    </span>
                  </div>
                )}
                
                <h3 className="text-lg font-semibold mb-2 text-white" style={{minHeight:'2.5em', display:'flex', alignItems:'center'}}>
                  <span dangerouslySetInnerHTML={{ __html: highlightMatch(String(item.title || 'Untitled'), query) }} />
                </h3>
                
                {/* Alternative Names */}
                {item.also_called?.length > 0 && (
                  <p className="text-violet-400 text-xs mb-2" style={{minHeight:'1.5em', display:'flex', alignItems:'center'}}>
                    Also known as: <span dangerouslySetInnerHTML={{ __html: item.also_called.slice(0, 2).map(a => highlightMatch(String(a || ''), query)).join(", ") }} />
                    {item.also_called.length > 2 && ` +${item.also_called.length - 2} more`}
                  </p>
                )}
                
                {/* Medical Groups */}
                {item.groups?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.groups.slice(0, 3).map((group, gIdx) => (
                      <span key={gIdx} className="px-2 py-1 bg-violet-800/30 text-violet-300 text-xs rounded-full border border-violet-600/50">
                        {String(group || 'Unknown')}
                      </span>
                    ))}
                    {item.groups.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                        +{item.groups.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Description */}
                <div className="flex-1 flex flex-col justify-start">
                  <p className="text-gray-300 text-sm mb-3" style={{minHeight:'3.5em', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                    {item.meta_desc ? <span dangerouslySetInnerHTML={{ __html: highlightMatch(String(item.meta_desc), query) }} /> : (String(item.summary || '').replace(/<[^>]+>/g, '').slice(0, 180) + '...')}
                  </p>
                </div>
                
                {/* Related Topics */}
                {item.related_topics?.length > 0 && (
                  <div className="mb-2">
                    <p className="text-gray-400 text-xs mb-1">Related topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.related_topics.slice(0, 2).map((rt, rtIdx) => (
                        <span key={rtIdx} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                          {String(rt.title || 'Unknown')}
                        </span>
                      ))}
                      {item.related_topics.length > 2 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                          +{item.related_topics.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Content Richness Indicators */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    {item.summary && (
                      <span className="flex items-center gap-1">
                        📝 {String(item.summary).length > 200 ? 'Rich' : 'Basic'}
                      </span>
                    )}
                    {item.sites && item.sites.length > 0 && (
                      <span className="flex items-center gap-1">
                        🔗 {item.sites.length} sources
                      </span>
                    )}
                  </div>
                  <span className="text-violet-400 hover:text-violet-200 font-medium">View details →</span>
                </div>
              </Link>
            ))}
          </div>
          {totalCount > PAGE_SIZE && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                className="px-3 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Prev
              </button>
              <span className="text-gray-300 text-sm">Page {page} of {Math.max(1, Math.ceil(totalCount / PAGE_SIZE))}</span>
              <button
                className="px-3 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50"
                onClick={() => setPage(p => Math.min(Math.ceil(totalCount / PAGE_SIZE), p + 1))}
                disabled={page >= Math.ceil(totalCount / PAGE_SIZE)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 