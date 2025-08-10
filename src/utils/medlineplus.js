export async function searchMedlinePlusTopics(keyword) {
  const url = `https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=${encodeURIComponent(keyword)}&retmax=10`;
  const response = await fetch(url);
  const xml = await response.text();

  // Parse XML to extract titles, summaries, and links
  const parser = new window.DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const records = Array.from(xmlDoc.getElementsByTagName("record"));

  return records.map(record => {
    const title = record.getElementsByTagName("title")[0]?.textContent || "";
    const url = record.getElementsByTagName("url")[0]?.textContent || "";
    const snippet = record.getElementsByTagName("snippet")[0]?.textContent || "";
    return { title, url, snippet };
  });
} 