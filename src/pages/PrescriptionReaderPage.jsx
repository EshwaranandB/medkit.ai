import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";

export default function PrescriptionReaderPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];
    setFile(selected);
    setResult(null);
    setError(null);
    setProgress(0);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);
    const formData = new FormData();
    formData.append("image", file);
    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5001/analyze_prescription");
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setResult(xhr.responseText);
            resolve();
          } else {
            reject(new Error("Failed to analyze prescription"));
      }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 50)); // Upload progress (0-50%)
          }
        };
        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(50 + Math.round((event.loaded / event.total) * 50)); // Download progress (50-100%)
          }
        };
        xhr.send(formData);
      });
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  // PDF download handler
  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    // Split text into lines to fit the page
    const lines = doc.splitTextToSize(result, 180);
    doc.text(lines, 15, 20);
    doc.save("prescription-analysis.pdf");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black/90 text-white flex flex-col items-center px-4 py-24 rounded-3xl shadow-2xl animate-fadein">
      <div className="w-full max-w-3xl mx-auto bg-black/60 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Prescription Reader</h1>
        <div className="w-full flex flex-col items-center mb-8">
          <div
            {...getRootProps()}
            className={`w-full flex flex-col items-center justify-center border-2 border-dashed border-violet-500 rounded-2xl p-8 cursor-pointer bg-black/40 hover:bg-violet-950 transition mb-4 ${isDragActive ? "bg-violet-900/60" : ""}`}
          >
            <input {...getInputProps()} />
            <span className="text-violet-300 text-lg font-semibold mb-2">Upload Your Prescription</span>
            <span className="text-gray-400 text-sm">Drag & drop or click to select an image</span>
            {file && <span className="mt-4 text-green-400">Selected: {file.name}</span>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 max-h-48 rounded-xl border border-violet-700 shadow-lg"
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
          <button
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-violet-700 to-violet-900 text-white font-semibold shadow-md hover:scale-105 transition-transform"
            onClick={handleAnalyze}
            disabled={!file || loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Analyzing...
              </span>
            ) : (
              "Analyze Prescription"
            )}
          </button>
          {loading && (
            <div className="w-full mt-4">
              <div className="h-3 w-full bg-violet-900 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-violet-400 to-violet-700 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-violet-300 text-sm mt-1 text-center">{progress}%</div>
            </div>
          )}
        </div>
        {error && (
          <div className="w-full bg-red-900/80 rounded-xl p-4 mt-4 shadow-lg border border-red-700 text-red-200 text-center">
            {error}
          </div>
        )}
        {result && (
          <div className="analysis-result-container">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Analysis Result</h2>
              <button
                onClick={handleDownloadPDF}
                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-violet-700 to-violet-900 text-white font-semibold shadow hover:scale-105 transition-transform text-sm"
              >
                Download as PDF
              </button>
            </div>
            <div className="bg-black/40 rounded-lg p-4 mb-4 whitespace-pre-line text-base text-white shadow-md">
              {result}
            </div>
          </div>
        )}

        {/* Blinking red disclaimer below analysis, above footer */}
        <div style={{
          background: '#fff0f0',
          border: '2px solid #ff0000',
          color: '#ff0000',
          fontWeight: 'bold',
          padding: '16px',
          margin: '32px 0 0 0',
          borderRadius: '8px',
          textAlign: 'center',
          animation: 'blink 1s linear infinite',
          fontSize: '1.1rem',
          boxShadow: '0 0 10px #ff0000',
        }}>
          ⚠️ <span style={{textDecoration: 'underline'}}>Disclaimer:</span> This prescription analysis is <b>AI-generated</b> and may contain errors or false information. <b>Do NOT rely on it for medical decisions.</b> Always consult a licensed medical professional. This tool is for <b>educational purposes only</b>. We do not take responsibility for any misuse or harm.
        </div>
        <style>{`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
} 