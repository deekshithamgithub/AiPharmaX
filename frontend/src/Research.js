import { useState } from "react";
import axios from "axios";

export default function Research() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);

  const searchPapers = async () => {
    const res = await axios.get(
      "https://aipharmax.onrender.com/api/research/pubmed/" + query
    );

    setPapers(res.data.esearchresult.idlist);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Research Papers</h1>

      <input
        placeholder="Search Disease"
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchPapers}>
        Search
      </button>

      <h3>PubMed IDs</h3>

      {papers.map((id, index) => (
        <p key={index}>{id}</p>
      ))}
    </div>
  );
}