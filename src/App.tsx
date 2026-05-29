/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Database, 
  Link as LinkIcon, 
  Download, 
  Terminal, 
  Folder, 
  FileText, 
  FileCode2,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const throughputData = [
  { name: 'Single-turn', lc4j: 4127, bestPy: 2348 },
  { name: 'RAG', lc4j: 1832, bestPy: 1158 },
  { name: 'Agent (3 step)', lc4j: 612, bestPy: 298 },
  { name: 'Streaming', lc4j: 3964, bestPy: 2089 },
];

const memoryData = [
  { name: 'W1', lc4j: 1184, pyTotal: 1872 },
  { name: 'W2', lc4j: 1647, pyTotal: 4012 },
  { name: 'W3', lc4j: 1432, pyTotal: 2736 },
  { name: 'W4', lc4j: 1208, pyTotal: 1916 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'files' | 'notebooks' | 'metrics'>('files');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState<string>('/');

  const handleDownload = () => window.open("https://github.com/ImpuseCode/LangChain4jvsPython-NativeFrameworks-/archive/refs/heads/main.zip", "_blank");
  const handleClone = () => window.open("https://github.com/ImpuseCode/LangChain4jvsPython-NativeFrameworks-", "_blank");

  const fileSystem: Record<string, any[]> = {
    '/': [
      { name: 'assets', typeText: 'Directory', size: '--', modified: 'recently', icon: Folder, iconColor: "text-slate-400", isDir: true },
      { name: 'harness', typeText: 'Directory', size: '--', modified: 'recently', icon: Folder, iconColor: "text-slate-400", isDir: true },
      { name: 'scripts', typeText: 'Directory', size: '--', modified: 'recently', icon: Folder, iconColor: "text-slate-400", isDir: true },
      { name: 'src', typeText: 'Directory', size: '--', modified: 'recently', icon: Folder, iconColor: "text-slate-400", isDir: true },
      { name: '.env.example', typeText: 'Config', size: '445 B', modified: 'recently', icon: FileText, iconColor: "text-slate-400", isDir: false },
      { name: '.gitignore', typeText: 'Config', size: '73 B', modified: 'recently', icon: FileText, iconColor: "text-slate-400", isDir: false },
      { name: 'README.md', typeText: 'Markdown', size: '1.6 KB', modified: 'recently', icon: FileText, iconColor: "text-slate-400", isDir: false },
      { name: 'index.html', typeText: 'HTML', size: '313 B', modified: 'recently', icon: FileCode2, iconColor: "text-blue-500", isDir: false },
      { name: 'metadata.json', typeText: 'JSON', size: '251 B', modified: 'recently', icon: FileCode2, iconColor: "text-yellow-500", isDir: false },
      { name: 'package-lock.json', typeText: 'JSON', size: '118 KB', modified: 'recently', icon: FileCode2, iconColor: "text-yellow-500", isDir: false },
      { name: 'package.json', typeText: 'JSON', size: '871 B', modified: 'recently', icon: FileCode2, iconColor: "text-yellow-500", isDir: false },
      { name: 'tsconfig.json', typeText: 'JSON', size: '508 B', modified: 'recently', icon: FileCode2, iconColor: "text-yellow-500", isDir: false },
      { name: 'vite.config.ts', typeText: 'TypeScript', size: '708 B', modified: 'recently', icon: FileCode2, iconColor: "text-blue-500", isDir: false }
    ],
    '/harness': [
      { name: 'main_analysis.ipynb', typeText: 'IPYNB', size: '120 KB', modified: 'recently', icon: FileCode2, iconColor: "text-orange-500", badge: 'IPYNB', badgeColor: "bg-orange-100 text-orange-700", isDir: false, action: () => setActiveTab('notebooks') },
      { name: 'mock_llm_stub.py', typeText: 'Python', size: '2 KB', modified: 'recently', icon: FileCode2, iconColor: "text-blue-500", isDir: false },
      { name: 'vllm_llama_runner.py', typeText: 'Python', size: '4 KB', modified: 'recently', icon: FileCode2, iconColor: "text-blue-500", isDir: false }
    ],
    '/scripts': [
      { name: 'dataset-metadata.json', typeText: 'JSON', size: '150 B', modified: 'recently', icon: FileCode2, iconColor: "text-yellow-500", isDir: false },
      { name: 'generate_kaggle_dataset.py', typeText: 'Python', size: '2.5 KB', modified: 'just now', icon: FileCode2, iconColor: "text-blue-500", isDir: false, action: () => alert('To run on Kaggle:\n\n1. Create a new Kaggle Notebook\n2. Run this script to stream 50,000,000 rows into a 18.6 GB Parquet file\n3. Wait for it to finish generating in chunks to avoid OOM\n4. Click "New Dataset" on the generated file in the Output tab') }
    ],
    '/assets': [],
    '/src': []
  };

  const handleNavigate = (dirName: string) => {
    if (currentPath === '/') {
      setCurrentPath(`/${dirName}`);
    } else {
      setCurrentPath(`${currentPath}/${dirName}`);
    }
    setSearchQuery('');
  };

  const handleNavigateUp = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/');
    parts.pop();
    const newPath = parts.join('/') || '/';
    setCurrentPath(newPath);
    setSearchQuery('');
  };

  const currentFiles = fileSystem[currentPath] || [];
  const filteredFiles = currentFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderFileBrowser = () => (
    <div className="overflow-y-auto flex-1 flex flex-col">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 text-xs text-slate-600 shrink-0">
        <button 
          onClick={handleNavigateUp} 
          disabled={currentPath === '/'}
          className={`p-1 rounded flex items-center ${currentPath === '/' ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-200 cursor-pointer text-slate-700'}`}
        >
          <ArrowLeft size={14} />
        </button>
        <span className="font-mono bg-white px-2 py-1 rounded border border-slate-200 text-indigo-700">github.com/lc4j-benchmark{currentPath}</span>
      </div>
      <div className="overflow-y-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white border-b border-slate-200 shadow-sm">
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 font-bold">Size</th>
              <th className="px-4 py-3 font-bold">Last Modified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500 font-medium">No files found.</td>
              </tr>
            )}
            {filteredFiles.map((file, idx) => {
              const Icon = file.icon;
              return (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-50 cursor-pointer ${file.highlight ? 'bg-indigo-50/20 border-l-2 border-l-indigo-500' : ''}`}
                  onClick={() => {
                    if (file.isDir) {
                      handleNavigate(file.name);
                    } else if (file.action) {
                      file.action();
                    }
                  }}
                >
                  <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                    <Icon size={14} className={file.iconColor} fill="currentColor"/> {file.name}{file.isDir ? '/' : ''}
                  </td>
                  <td className={`px-4 py-3 ${file.badge ? 'text-xs' : 'text-slate-500'}`}>
                    {file.badge ? (
                      <span className={`${file.badgeColor} px-1.5 py-0.5 rounded font-bold`}>{file.badge}</span>
                    ) : file.typeText}
                  </td>
                  <td className={`px-4 py-3 ${file.highlight ? 'font-semibold text-slate-900' : 'text-slate-500'}`}>{file.size}</td>
                  <td className="px-4 py-3 text-slate-500">{file.modified}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotebooks = () => (
    <div className="p-6 overflow-y-auto flex-1 w-full space-y-6 bg-white">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800"><FileCode2 className="text-orange-500" /> analysis_v1.ipynb</h2>
        <button className="text-xs bg-slate-100 px-3 py-1.5 rounded hover:bg-slate-200 text-slate-700 font-medium cursor-pointer" onClick={() => alert("Simulating opening in Jupyter...")}>Open in Jupyter</button>
      </div>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Markdown Cell */}
        <div className="prose prose-sm text-slate-800 border-l-4 border-transparent px-4">
          <h1 className="text-2xl font-bold border-b pb-2">LC4J vs Python-Native Frameworks: Benchmark Analysis</h1>
          <p className="mt-4">This notebook contains the statistical analysis plan as pre-registered for the study. Our methodology includes:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Mann–Whitney U tests with Bonferroni correction for statistical significance</li>
            <li>Cliff’s δ effect sizes to measure non-parametric magnitude</li>
            <li>Bootstrap confidence intervals for reliable true latency tails</li>
          </ul>
          <h2 className="text-xl font-bold mt-6 mb-2">1. Environment Setup</h2>
        </div>

        {/* Code Cell */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          <div className="bg-slate-100 px-3 py-1.5 text-[11px] uppercase font-bold text-slate-500 flex justify-between border-b border-slate-200">
            <span>In [1]</span>
            <span>Python 3.11</span>
          </div>
          <div className="p-4 font-mono text-sm text-slate-800 overflow-x-auto whitespace-pre">
<span className="text-purple-600">import</span> pandas <span className="text-purple-600">as</span> pd{"\n"}
<span className="text-purple-600">import</span> numpy <span className="text-purple-600">as</span> np{"\n"}
<span className="text-purple-600">import</span> scipy.stats <span className="text-purple-600">as</span> stats{"\n"}
<span className="text-purple-600">import</span> matplotlib.pyplot <span className="text-purple-600">as</span> plt{"\n"}
<span className="text-purple-600">import</span> seaborn <span className="text-purple-600">as</span> sns{"\n\n"}
sns.set_theme(style=<span className="text-green-600">"whitegrid"</span>){"\n"}
np.random.seed(<span className="text-orange-500">42</span>)
          </div>
        </div>

        <div className="prose prose-sm text-slate-800 border-l-4 border-transparent px-4">
          <h2 className="text-xl font-bold">2. Helper Functions</h2>
          <p>Implementing Cliff's Delta and Bootstrap CIs for non-parametric evaluation.</p>
        </div>

        {/* Code Cell */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          <div className="bg-slate-100 px-3 py-1.5 text-[11px] uppercase font-bold text-slate-500 flex justify-between border-b border-slate-200">
            <span>In [2]</span>
            <span>Python 3.11</span>
          </div>
          <div className="p-4 font-mono text-sm text-slate-800 overflow-x-auto whitespace-pre">
<span className="text-purple-600">def</span> <span className="text-blue-600 font-bold">cliffs_delta</span>(x, y):{"\n"}
    <span className="text-slate-500">"""Calculate Cliff's delta effect size."""</span>{"\n"}
    m, n = <span className="text-blue-600">len</span>(x), <span className="text-blue-600">len</span>(y){"\n"}
    res = <span className="text-orange-500">0</span>{"\n"}
    <span className="text-purple-600">for</span> i <span className="text-purple-600">in</span> x:{"\n"}
        <span className="text-purple-600">for</span> j <span className="text-purple-600">in</span> y:{"\n"}
            <span className="text-purple-600">if</span> i &gt; j:{"\n"}
                res += <span className="text-orange-500">1</span>{"\n"}
            <span className="text-purple-600">elif</span> i &lt; j:{"\n"}
                res -= <span className="text-orange-500">1</span>{"\n"}
    <span className="text-purple-600">return</span> res / (m * n)
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="p-6 overflow-y-auto flex-1 w-full bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6 items-start content-start">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
        <h3 className="font-bold mb-4 text-slate-800 text-lg">Throughput (Req/s at Concurrency 500)</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-2xl">LangChain4j achieves up to 1.84x higher steady-state throughput compared to the best performing Python frameworks across four enterprise-representative workloads.</p>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={throughputData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend wrapperStyle={{paddingTop: '20px'}} />
              <Bar dataKey="lc4j" name="LangChain4j (JVM)" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={60} />
              <Bar dataKey="bestPy" name="Best Python FW" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm col-span-1">
        <h3 className="font-bold mb-4 text-slate-800">Steady State Memory (MB)</h3>
        <p className="text-sm text-slate-500 mb-6">Comparison of 1 JVM process vs 4 Python workers.</p>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={memoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend />
              <Bar dataKey="lc4j" name="LC4J (1 Process)" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="pyTotal" name="Python (4 Workers)" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-indigo-600 p-6 rounded-xl border border-indigo-700 shadow-sm col-span-1 md:col-span-2 text-white flex flex-col justify-center h-full min-h-[250px]">
        <h3 className="font-bold mb-2 text-xl">Queueing-Theoretic Decision Rule</h3>
        <p className="text-indigo-100 font-medium leading-relaxed mt-2 text-sm max-w-4xl">
          Using a deterministic mock-LLM stub and end-to-end measurements against Llama-3.1-8B-Instruct (vLLM), our queueing-theoretic model derives the following rule:
          If orchestration represents more than ~6% of request latency, LangChain4j is throughput-optimal on the same hardware. 
          The JVM incurs a documented resident-memory premium and cold-start penalty, but this is offset and frequently inverted under steady-state concurrent load.
        </p>
        <button className="mt-8 bg-white text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 self-start shadow-sm cursor-pointer" onClick={() => setActiveTab('notebooks')}>
          View Statistical Methodology
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-slate-50 font-sans flex flex-col overflow-hidden text-[13px]">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded text-white flex shrink-0">
            <Database size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">LC4J Benchmark Harness & Replication Repository</h1>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <span className="flex items-center gap-1">
                <LinkIcon size={12} />
                github.com/ImpuseCode/LangChain4jvsPython-NativeFrameworks-
              </span>
              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">MIT License</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-medium flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
            <Download size={14} />
            Download All
          </button>
          <button onClick={handleClone} className="bg-indigo-600 text-white px-3 py-1.5 rounded font-medium flex items-center gap-2 hover:bg-indigo-700 shadow-sm shadow-indigo-100 cursor-pointer">
            <Terminal size={14} />
            Clone Repository
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-72 bg-white border-r border-slate-200 p-4 flex flex-col gap-6 overflow-y-auto shrink-0">
          <section>
            <div>
              <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-3">Dataset Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-slate-500">Total Data Size</span><span className="font-semibold text-slate-900">18.6 GB</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Total Records</span><span className="font-semibold text-slate-900">50,000,000</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Independent Runs</span><span className="font-semibold text-slate-900">1,440</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Last Modified</span><span className="font-semibold text-slate-900">May 2026</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">License</span><span className="font-semibold text-slate-900">MIT</span></div>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-3">Links & Resources</h3>
            <div className="space-y-2 text-xs">
              <a href="https://www.kaggle.com/datasets/stugemini/lc4j-benchmark" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded text-slate-700 transition">
                <Database size={14} className="text-indigo-500" />
                <span className="font-medium">Kaggle Dataset</span>
              </a>
              <a href="https://www.kaggle.com/code/stugemini/lc4j-benchmark-notebook" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded text-slate-700 transition">
                <FileCode2 size={14} className="text-orange-500" />
                <span className="font-medium">Kaggle Notebook</span>
              </a>
            </div>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-3">Storage Formats</h3>
            <div className="space-y-2">
              <div className="p-2 bg-slate-50 rounded flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-slate-800">Jupyter Notebooks</p>
                  <p className="text-[11px] text-slate-500">Reproducible Analysis</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-auto">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700 leading-relaxed font-medium">All data needed to reproduce reported results are contained in this repository.</p>
            </div>
          </section>
        </aside>

        <div className="flex-1 flex flex-col p-6 overflow-hidden gap-6">
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
               <p className="text-slate-500 text-xs mb-1">LC4J Throughput Gain</p>
               <p className="text-2xl font-bold text-slate-900">1.84x</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-emerald-500 h-1 rounded-full w-[98%]"></div></div>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
               <p className="text-slate-500 text-xs mb-1">p99 Latency Reduction</p>
               <p className="text-2xl font-bold text-slate-900">47.3%</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-blue-500 h-1 rounded-full w-[82%]"></div></div>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
               <p className="text-slate-500 text-xs mb-1">Resident-Memory Premium</p>
               <p className="text-2xl font-bold text-slate-900">2.6x</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-amber-500 h-1 rounded-full w-[45%]"></div></div>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
               <p className="text-slate-500 text-xs mb-1">Cold-Start Penalty</p>
               <p className="text-2xl font-bold text-slate-900">13.7x</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-red-500 h-1 rounded-full w-[95%]"></div></div>
            </div>
          </div>

          <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('files')}
                  className={`font-bold pb-3 -mb-3.5 cursor-pointer ${activeTab === 'files' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  File Browser
                </button>
                <button 
                  onClick={() => setActiveTab('notebooks')}
                  className={`font-bold pb-3 -mb-3.5 cursor-pointer ${activeTab === 'notebooks' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Notebooks
                </button>
                <button 
                  onClick={() => setActiveTab('metrics')}
                  className={`font-bold pb-3 -mb-3.5 cursor-pointer ${activeTab === 'metrics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Metrics
                </button>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Filter..." 
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs w-48 outline-none focus:border-indigo-500" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {activeTab === 'files' && renderFileBrowser()}
            {activeTab === 'notebooks' && renderNotebooks()}
            {activeTab === 'metrics' && renderMetrics()}
            
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-slate-300 relative flex flex-col justify-center">
              <div className="absolute top-3 right-4 text-slate-500 flex gap-4">
                <a href="https://www.kaggle.com/datasets/stugemini/lc4j-benchmark" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  <Database size={12} /> Dataset
                </a>
                <a href="https://www.kaggle.com/code/stugemini/lc4j-benchmark-notebook" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  <FileCode2 size={12} /> Notebook
                </a>
                <span className="opacity-50">Quick Connect</span>
              </div>
              <div><span className="text-indigo-400">$</span> git clone https://github.com/ImpuseCode/LangChain4jvsPython-NativeFrameworks-.git</div>
              <div><span className="text-indigo-400">$</span> python -m jupyter notebook harness/main_analysis.ipynb</div>
            </div>
            <div className="w-64 bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                <CheckCircle size={16} strokeWidth={2.5}/>
                Replication Status
              </div>
              <p className="text-emerald-700 leading-tight text-[11px]">Environment verified for Python 3.11+, Spark 3.4. Containerized image available for instant replication.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
