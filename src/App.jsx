import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CoreFeatures from "./components/CoreFeatures";
import Comparison from "./components/Comparison";
import FAQs from "./components/FAQs";
import Footer from "./components/Footer";
import StoriesPage from "./pages/StoriesPage";
import FeaturesPage from "./pages/FeaturesPage";
import ToolsPage from "./pages/ToolsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import HealthLibraryPage from "./pages/HealthLibraryPage";
import CategoryPage from "./pages/CategoryPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import PrescriptionReaderPage from "./pages/PrescriptionReaderPage";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-black" style={{
        backgroundColor: '#000000',
        background: '#000000',
        minHeight: '100vh'
      }}>
        <Header />
        
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <div className="bg-black min-h-screen" style={{
              backgroundColor: '#000000',
              background: '#000000',
              minHeight: '100vh',
              margin: '0',
              padding: '0'
            }}>
              <Hero />
              <CoreFeatures />
              <FAQs />
              <HealthLibraryPage />
            </div>
          } />
          
          {/* Static Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          
          {/* Health Library */}
          <Route path="/library" element={<HealthLibraryPage />} />
          <Route path="/library/:categoryId" element={<CategoryPage />} />
          <Route path="/library/:categoryId/:topicId" element={<TopicDetailPage />} />
          
          {/* Tool Pages */}
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/prescription-reader" element={<PrescriptionReaderPage />} />
        </Routes>
        
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;