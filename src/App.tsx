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
  CheckCircle 
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

  const handleDownload = () => alert("Downloading all replication materials...");
  const handleClone = () => alert("Run: git clone https://github.com/ImpuseCode/LangChain4jvsPython-NativeFrameworks-.git");

  const renderFileBrowser = () => (
    <div className="overflow-y-auto flex-1">
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
          <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => alert('Folder: harness/')}>
            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
              <Folder size={14} className="text-slate-400" fill="currentColor"/> harness/
            </td>
            <td className="px-4 py-3 text-slate-500">Directory</td>
            <td className="px-4 py-3 text-slate-500">2.4 MB</td>
            <td className="px-4 py-3 text-slate-500">2 days ago</td>
          </tr>
          <tr className="hover:bg-slate-50 bg-indigo-50/20 cursor-pointer border-l-2 border-l-indigo-500" onClick={() => alert('Downloading raw_measurements_full.parquet (13.8 GB)')}>
            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
              <Database size={14} className="text-indigo-500" fill="currentColor"/> raw_measurements_full.parquet
            </td>
            <td className="px-4 py-3 text-slate-500 text-xs">
              <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">PARQUET</span>
            </td>
            <td className="px-4 py-3 font-semibold text-slate-900">13.8 GB</td>
            <td className="px-4 py-3 text-slate-500">1 week ago</td>
          </tr>
          <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => setActiveTab('notebooks')}>
            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
              <FileCode2 size={14} className="text-orange-500" fill="currentColor"/> analysis_v1.ipynb
            </td>
            <td className="px-4 py-3 text-slate-500 text-xs">
              <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">IPYNB</span>
            </td>
            <td className="px-4 py-3 text-slate-500">412 KB</td>
            <td className="px-4 py-3 text-slate-500">12 hours ago</td>
          </tr>
          <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => alert('Folder: scripts/')}>
            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
              <Folder size={14} className="text-slate-400" fill="currentColor"/> scripts/
            </td>
            <td className="px-4 py-3 text-slate-500">Directory</td>
            <td className="px-4 py-3 text-slate-500">84 KB</td>
            <td className="px-4 py-3 text-slate-500">3 days ago</td>
          </tr>
          <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => alert('Viewing LICENSE.md')}>
            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
              <FileText size={14} className="text-slate-400" fill="currentColor"/> LICENSE.md
            </td>
            <td className="px-4 py-3 text-slate-500">Markdown</td>
            <td className="px-4 py-3 text-slate-500">4 KB</td>
            <td className="px-4 py-3 text-slate-500">1 month ago</td>
          </tr>
          <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => alert('Viewing README.md')}>
            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
              <FileText size={14} className="text-slate-400" fill="currentColor"/> README.md
            </td>
            <td className="px-4 py-3 text-slate-500">Markdown</td>
            <td className="px-4 py-3 text-slate-500">12 KB</td>
            <td className="px-4 py-3 text-slate-500">2 hours ago</td>
          </tr>
        </tbody>
      </table>
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
          <p className="mt-4">This notebook contains the statistical analysis plan as pre-registered for the study.</p>
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

      <div className="bg-indigo-600 p-6 rounded-xl border border-indigo-700 shadow-sm col-span-1 text-white flex flex-col justify-center h-full min-h-[300px]">
        <h3 className="font-bold mb-2 text-xl">Key Takeaway</h3>
        <p className="text-indigo-100 font-medium leading-relaxed mt-2 text-sm">
          If orchestration represents more than ~6% of request latency, LangChain4j is throughput-optimal on the same hardware. 
          The JVM's memory premium is offset, and frequently inverted, once multi-worker Python deployment realities are accounted for.
        </p>
        <button className="mt-8 bg-white text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 self-start shadow-sm cursor-pointer" onClick={() => setActiveTab('notebooks')}>
          View Full Analysis Notebook
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
              <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-3">Repository Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-slate-500">Total Data Size</span><span className="font-semibold text-slate-900">14.21 GB</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Independent Runs</span><span className="font-semibold text-slate-900">1,440</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Last Analyzed</span><span className="font-semibold text-slate-900">May 2026</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Authors</span><span className="font-semibold text-slate-900">3</span></div>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-3">Storage Formats</h3>
            <div className="space-y-2">
              <div className="p-2 bg-slate-50 rounded flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-slate-800">Apache Parquet</p>
                  <p className="text-[11px] text-slate-500">Columnar Storage (Optimized)</p>
                </div>
              </div>
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
          <div className="grid grid-cols-3 gap-4 shrink-0">
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
               <p className="text-slate-500 text-xs mb-1">Total Independent Runs</p>
               <p className="text-2xl font-bold text-slate-900">1,440</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-amber-500 h-1 rounded-full w-[15%]"></div></div>
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
                <input type="text" placeholder="Filter..." className="bg-white border border-slate-300 rounded px-2 py-1 text-xs w-48 outline-none focus:border-indigo-500" />
              </div>
            </div>

            {activeTab === 'files' && renderFileBrowser()}
            {activeTab === 'notebooks' && renderNotebooks()}
            {activeTab === 'metrics' && renderMetrics()}
            
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-slate-300 relative">
              <div className="absolute top-3 right-4 text-slate-500">Quick Connect</div>
              <span className="text-indigo-400">$</span> wget -O data.parquet https://github.com/ImpuseCode/LangChain4jvsPython-NativeFrameworks-/raw/main/raw_measurements_full.parquet<br/>
              <span className="text-indigo-400">$</span> python -m jupyter notebook harness/main_analysis.ipynb
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
