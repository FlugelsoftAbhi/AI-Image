import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate image');
      }

      const data = await response.json();
      setResult({
        refinedPrompt: data.refinedPrompt,
        imageUrl: data.imageUrl,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!result?.imageUrl) return;
    try {
      const response = await fetch(result.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generation-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
      // Fallback
      window.open(result.imageUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden">
      {/* Background aesthetic blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col max-w-6xl relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            AI Image Studio
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Transform your ideas into stunning visuals. We use advanced prompt engineering to perfect your thought before generating.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col gap-6">
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-zinc-300 mb-2">
                  What do you want to see?
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city skyline at sunset with flying cars..."
                  className="input-glass min-h-[160px] resize-y"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 group"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Image
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Image Preview */}
            <div className="glass-panel rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px] relative overflow-hidden group">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4 text-zinc-500">
                  <div className="w-16 h-16 border-4 border-zinc-800 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="animate-pulse">Enhancing prompt & rendering image...</p>
                </div>
              ) : result ? (
                <>
                  <img 
                    src={result.imageUrl} 
                    alt="Generated" 
                    className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleDownload} className="btn-secondary flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-zinc-600 text-center px-4">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p>Your generated image will appear here.</p>
                </div>
              )}
            </div>

            {/* Refined Prompt Display */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Refined Prompt</h3>
              {isGenerating ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                  <div className="h-4 bg-zinc-800 rounded w-full"></div>
                  <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                </div>
              ) : result ? (
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {result.refinedPrompt}
                </p>
              ) : (
                <p className="text-zinc-600 text-sm italic">
                  The AI-enhanced prompt will be shown here.
                </p>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
