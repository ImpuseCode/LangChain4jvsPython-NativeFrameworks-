/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

export default function App() {
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
                example.org/lc4j-bench
              </span>
              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">MIT License</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-medium flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
            <Download size={14} />
            Download All
          </button>
          <button className="bg-indigo-600 text-white px-3 py-1.5 rounded font-medium flex items-center gap-2 hover:bg-indigo-700 shadow-sm shadow-indigo-100 cursor-pointer">
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
                <div className="flex justify-between items-center"><span className="text-slate-500">Files Indexed</span><span className="font-semibold text-slate-900">1,482</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Last Analyzed</span><span className="font-semibold text-slate-900">Oct 24, 2023</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Contributors</span><span className="font-semibold text-slate-900">12</span></div>
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
               <p className="text-slate-500 text-xs mb-1">Benchmark Coverage</p>
               <p className="text-2xl font-bold text-slate-900">98.4%</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-emerald-500 h-1 rounded-full w-[98%]"></div></div>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
               <p className="text-slate-500 text-xs mb-1">Samples Recorded</p>
               <p className="text-2xl font-bold text-slate-900">12.4M</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-blue-500 h-1 rounded-full w-[82%]"></div></div>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
               <p className="text-slate-500 text-xs mb-1">Mean Latency Variance</p>
               <p className="text-2xl font-bold text-slate-900">±0.04ms</p>
               <div className="w-full bg-slate-100 h-1 rounded-full mt-3"><div className="bg-amber-500 h-1 rounded-full w-[15%]"></div></div>
            </div>
          </div>

          <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex gap-6">
                <button className="font-bold text-indigo-600 border-b-2 border-indigo-600 pb-3 -mb-3.5 cursor-pointer">File Browser</button>
                <button className="font-medium text-slate-500 hover:text-slate-700 cursor-pointer">Notebooks</button>
                <button className="font-medium text-slate-500 hover:text-slate-700 cursor-pointer">Metrics</button>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Filter files..." className="bg-white border border-slate-300 rounded px-2 py-1 text-xs w-48 outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div className="overflow-y-auto">
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
                  <tr className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <Folder size={14} className="text-slate-400" fill="currentColor"/> harness/
                    </td>
                    <td className="px-4 py-3 text-slate-500">Directory</td>
                    <td className="px-4 py-3 text-slate-500">2.4 MB</td>
                    <td className="px-4 py-3 text-slate-500">2 days ago</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-indigo-50/20 cursor-pointer border-l-2 border-l-indigo-500">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <Database size={14} className="text-indigo-500" fill="currentColor"/> raw_measurements_full.parquet
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">PARQUET</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">13.8 GB</td>
                    <td className="px-4 py-3 text-slate-500">1 week ago</td>
                  </tr>
                  <tr className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <FileCode2 size={14} className="text-orange-500" fill="currentColor"/> analysis_v1.ipynb
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">IPYNB</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">412 KB</td>
                    <td className="px-4 py-3 text-slate-500">12 hours ago</td>
                  </tr>
                  <tr className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <Folder size={14} className="text-slate-400" fill="currentColor"/> scripts/
                    </td>
                    <td className="px-4 py-3 text-slate-500">Directory</td>
                    <td className="px-4 py-3 text-slate-500">84 KB</td>
                    <td className="px-4 py-3 text-slate-500">3 days ago</td>
                  </tr>
                  <tr className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" fill="currentColor"/> LICENSE.md
                    </td>
                    <td className="px-4 py-3 text-slate-500">Markdown</td>
                    <td className="px-4 py-3 text-slate-500">4 KB</td>
                    <td className="px-4 py-3 text-slate-500">1 month ago</td>
                  </tr>
                  <tr className="hover:bg-slate-50 cursor-pointer">
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
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="flex-1 bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-slate-300 relative">
              <div className="absolute top-3 right-4 text-slate-500">Quick Connect</div>
              <span className="text-indigo-400">$</span> wget -O data.parquet https://example.org/lc4j-bench/raw_measurements_full.parquet<br/>
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
