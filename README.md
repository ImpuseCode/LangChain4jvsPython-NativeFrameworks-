# LC4J Benchmark Harness & Replication Repository

## Abstract
Large Language Model (LLM) applications are increasingly embedded into production enterprise systems, most of which run on the Java Virtual Machine (JVM). Yet the dominant LLM orchestration frameworks—LangChain, LlamaIndex, and Haystack—are Python-native, forcing architects to choose between a polyglot architecture with cross-runtime overhead and the comparatively young JVM-native ecosystem represented by LangChain4j. No peer-reviewed, statistically rigorous comparison of these ecosystems exists. We present the first systematic head-to-head benchmark of LangChain4j against three Python-native frameworks across four enterprise workloads: single-turn completion, retrieval-augmented generation, three-step tool-using agents, and streaming chat. A deterministic mock-LLM stub isolates orchestration overhead from model inference latency, complemented by end-to-end measurements against a self-hosted Llama-3.1-8B-Instruct served by vLLM. We executed 1,440 independent runs on identical bare-metal hardware, using Mann–Whitney U tests with Bonferroni correction, Cliff’s δ effect sizes, and bootstrap confidence intervals. Under steady-state concurrent load, LangChain4j achieves 1.84× higher throughput and a 47.3% lower 99th-percentile orchestration latency than the best Python framework, but incurs a 2.6× resident-memory premium and a 13.7× cold-start penalty. We interpret these results with a queueing-theoretic model and derive a workload-to-framework decision rule. All artifacts are released for reproducibility.

## Scripts

The `scripts/` directory contains tools to regenerate the benchmark artifacts. The script `generate_kaggle_dataset.py` generates the ~18.6 GB Parquet dataset (containing detailed tracing and memory metrics) locally or natively on Kaggle Notebooks.

```bash
python scripts/generate_kaggle_dataset.py
```

## License

This project is licensed under the MIT License.
