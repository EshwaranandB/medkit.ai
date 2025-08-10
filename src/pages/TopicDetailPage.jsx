import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const CATEGORY_META = {
  all: { name: "All Topics", icon: "📚", gradient: "from-violet-400 to-blue-400" },
  medications: { name: "Medications & Supplements", icon: "💊", gradient: "from-pink-500 to-yellow-400" },
  tests: { name: "Tests & Procedures", icon: "🔬", gradient: "from-blue-400 to-violet-500" },
  diseases: { name: "Diseases & Conditions", icon: "🏥", gradient: "from-purple-500 to-pink-500" },
  symptoms: { name: "Symptoms", icon: "🩺", gradient: "from-green-400 to-blue-400" },
  wellness: { name: "General Health", icon: "🌱", gradient: "from-green-400 to-lime-400" },
  recipes: { name: "Health Recipes", icon: "🥗", gradient: "from-yellow-400 to-green-400" }
};

function getCategoryForItem(item) {
  const groups = (item.groups || []).map(g => g.toLowerCase());
  if (groups.some(g => ["drugs and supplements", "medications", "supplements"].includes(g))) return "medications";
  if (groups.some(g => ["diagnostic tests", "medical tests", "procedures", "tests and procedures"].includes(g))) return "tests";
  if (groups.some(g => ["diseases", "conditions", "cancers", "infections", "disease", "condition", "syndromes"].includes(g))) return "diseases";
  if (groups.some(g => g.includes("symptom"))) return "symptoms";
  if (groups.some(g => ["wellness", "prevention", "general health", "personal health issues", "social/family issues", "older adults", "children and teenagers", "mental health and behavior"].includes(g))) return "wellness";
  if (groups.some(g => ["food and nutrition", "recipes", "nutrition"].includes(g))) return "recipes";
  return "all";
}

// --- Add a QuestionBlock component ---
function QuestionBlock({ children }) {
  return (
    <div className="question-block mb-6 mt-8 px-4 py-3 rounded-xl border-l-4 border-violet-400 bg-violet-900/30 shadow-md">
      <span className="question-text text-lg font-semibold text-violet-200">{children}</span>
    </div>
  );
}

// --- NEW: A robust component to render the summary ---
function SummaryRenderer({ summary, allData }) {
  if (!summary) return null;

  function enrichHTML(htmlString) {
    if (!htmlString) return '';
    // In-app links
    return htmlString.replace(/<a href="https:\/\/medlineplus\.gov\/([a-z0-9]+)\.html"[^>]*>(.*?)<\/a>/gi, (match, slug, text) => {
      if (!allData) return match;
      const found = allData.find(t => t.url && t.url.endsWith(`/${slug}.html`)) || allData.find(t => t.title === text);
      if (found) {
        const cat = getCategoryForItem(found);
        return `<a href="/library/${cat}/${found.id}" class="text-violet-300 underline font-semibold" data-internal-link="true">${found.title}</a>`;
      }
      return match;
    });
  }

  const parser = new window.DOMParser();
  const doc = parser.parseFromString(`<div>${summary}</div>`, 'text/html');
  const nodes = Array.from(doc.body.firstChild.childNodes);

  const renderedElements = [];
  let i = 0;

  while (i < nodes.length) {
    const node = nodes[i];

    if (node.nodeType === 3 && node.textContent.trim() === '') {
      i++;
      continue;
    }

    // A) Real Tables
    if (node.nodeName === 'TABLE') {
      const tableHeader = node.querySelector('thead');
      const tableBody = node.querySelector('tbody');
      renderedElements.push(
        <div key={`table-${i}`} className="custom-table-outer">
          <table className="custom-table">
            {tableHeader && (
              <thead dangerouslySetInnerHTML={{ __html: enrichHTML(tableHeader.innerHTML).replace(/<th/g, '<th class="table-th-custom"') }} />
            )}
            {tableBody && (
              <tbody>
                {Array.from(tableBody.rows).map((row, rIdx) => (
                  <tr key={rIdx} className={`table-row-custom ${rIdx % 2 === 0 ? 'even' : 'odd'}`}>
                    {Array.from(row.cells).map((cell, cIdx) =>
                      cell.tagName === 'TH' ?
                      <th key={cIdx} className="table-th-custom" dangerouslySetInnerHTML={{ __html: enrichHTML(cell.innerHTML) }} /> :
                      <td key={cIdx} className="table-td-custom" dangerouslySetInnerHTML={{ __html: enrichHTML(cell.innerHTML) }} />
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      );
      i++;
      continue;
    }

    // B) Pseudo-Tables (like Birth Control methods)
    // Pattern: A paragraph with multiple <b> tags, often used for definition lists.
    if (node.nodeName === 'P' && node.querySelectorAll('b').length > 1) {
      const pairs = [];
      const content = node.innerHTML;
      const regex = /<b>([^<]+)<\/b>\s*:?\s*([\s\S]+?)(?=<b>|$)/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        pairs.push({ label: match[1].trim(), desc: match[2].trim() });
      }

      if (pairs.length > 1) {
        renderedElements.push(
          <div key={`pseudo-table-${i}`} className="custom-table-outer">
            <table className="custom-table">
              <thead><tr><th className="table-th-custom">Method</th><th className="table-th-custom">Description</th></tr></thead>
              <tbody>
                {pairs.map((pair, idx) => (
                  <tr key={idx} className={`table-row-custom ${idx % 2 === 0 ? 'even' : 'odd'}`}>
                    <th className="table-th-custom">{pair.label}</th>
                    <td className="table-td-custom" dangerouslySetInnerHTML={{ __html: enrichHTML(pair.desc) }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        i++;
        continue;
      }
    }
    
    // C) Question Blocks
    if (node.nodeName === 'P' && node.textContent.trim().endsWith('?')) {
      renderedElements.push(<QuestionBlock key={`q-${i}`}>{node.textContent.trim()}</QuestionBlock>);
      i++;
      continue;
    }

    // D) Fallback for all other elements (regular p, ul, ol, h2, etc.)
    renderedElements.push(
      <div key={`prose-${i}`} className="prose prose-invert max-w-none prose-p:mb-5 prose-ul:my-5 prose-li:my-2"
           dangerouslySetInnerHTML={{ __html: enrichHTML(node.outerHTML) }}
      />
    );
    i++;
  }

  return renderedElements;
}

export default function TopicDetailPage() {
  const { categoryId, topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/medlineplus_full.json")
      .then(res => res.json())
      .then(data => {
        setAllData(data);
        const found = data.find(item => String(item.id) === String(topicId));
        setTopic(found);
        setLoading(false);
      });
  }, [topicId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mb-4"></div>
        <span className="text-violet-400">Loading topic details...</span>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
        <p className="text-red-400 text-lg">Topic not found.</p>
        <button className="mt-4 text-violet-400 underline" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const meta = CATEGORY_META[categoryId] || CATEGORY_META.all;

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center px-1 sm:px-8 pb-20 pt-36 md:pt-32 font-sans" style={{fontFamily: 'Inter, Open Sans, Segoe UI, Arial, sans-serif'}}>
        <style>{`
          .question-block {
            border-left: 4px solid #a78bfa;
            background: linear-gradient(90deg, rgba(124,58,237,0.09) 0%, rgba(30,27,75,0.09) 100%);
            padding: 1.2em 1.2em 1.2em 1.5em;
            margin-top: 2em;
            margin-bottom: 0.7em;
            border-radius: 1em;
            box-shadow: 0 2px 12px 0 rgba(124, 58, 237, 0.07);
            display: flex;
            align-items: center;
          }
          .question-text {
            margin: 0;
            font-size: 1.5em;
            font-weight: 900;
            color: #a78bfa;
            letter-spacing: -0.01em;
            line-height: 1.2;
            font-family: inherit;
          }
        `}</style>
        <div className="w-full max-w-6xl mx-auto">
          <button
            onClick={() => navigate(`/library/${categoryId}`)}
            className="mb-8 text-violet-400 hover:text-violet-200 text-base font-semibold flex items-center gap-2 focus:outline-none"
          >
            <span className="text-xl">×</span> Back to {meta.name}
          </button>
          <div className="bg-[#18192b] rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 border border-violet-900/40">
            <div className="flex items-center gap-6 mb-8">
              <span className={`text-5xl md:text-6xl rounded-full p-3 bg-gradient-to-br ${meta.gradient} text-white shadow-lg`}>
                {meta.icon}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {topic.title}
              </h1>
            </div>
            {topic.meta_desc && <p className="mb-6 text-lg md:text-xl text-violet-200 font-medium leading-relaxed">{topic.meta_desc}</p>}
            {topic.also_called && topic.also_called.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold text-violet-400 text-base md:text-lg">Also called:</span>
                <span className="ml-2 text-white/90 text-base md:text-lg font-medium">{topic.also_called.join(", ")}</span>
              </div>
            )}
            {topic.groups && topic.groups.length > 0 && (
              <div className="mb-6">
                <span className="font-semibold text-violet-400 text-base md:text-lg">Groups:</span>
                <span className="ml-2 text-white/90 text-base md:text-lg font-medium">{topic.groups.join(", ")}</span>
              </div>
            )}
            <div className="my-8 border-t border-violet-900/30"></div>
            {/* Render summary with or without prose depending on table presence */}
            <div className="custom-summary mb-12" style={{wordBreak:'break-word'}}>
              <SummaryRenderer summary={topic.summary} allData={allData} />
            </div>
            {topic.related_topics && topic.related_topics.length > 0 && (
              <div className="mt-16 mb-8">
                <span className="font-semibold text-violet-400 text-2xl">Related topics:</span>
                <div>
                  {topic.related_topics.map((rt, i) => {
                    const related = allData.find(t => t.title === rt.title);
                    if (related) {
                      const relatedCat = getCategoryForItem(related);
                      return (
                        <Link
                          key={i}
                          to={`/library/${relatedCat}/${related.id}`}
                          className="text-violet-300 underline mx-6 font-semibold hover:text-violet-200 text-xl"
                        >
                          {rt.title}
                        </Link>
                      );
                    } else {
                      return (
                        <a
                          key={i}
                          href={rt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-300 underline mx-6 font-semibold hover:text-violet-200 text-xl"
                        >
                          {rt.title}
                        </a>
                      );
                    }
                  })}
                </div>
              </div>
            )}
            {topic.sites && topic.sites.length > 0 && (
              <div className="mt-16">
                <span className="font-semibold text-violet-400 text-2xl">External Resources:</span>
                <ul className="list-disc ml-10 mt-4">
                  {topic.sites.map((site, i) => (
                    <li key={i} className="mb-4 text-xl">
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-violet-300 underline font-medium">
                        {site.title}
                      </a>
                      {site.organization && <span className="ml-2 text-gray-400">({site.organization})</span>}
                      {site.info_category && <span className="ml-2 text-gray-400">[{site.info_category}]</span>}
                      {site.desc && <span className="ml-2 text-gray-400">- {site.desc}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 