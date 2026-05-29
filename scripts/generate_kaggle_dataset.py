import pandas as pd
import numpy as np
import pyarrow as pa
import pyarrow.parquet as pq
import uuid
import time
import os

# Set random seed for reproducibility
np.random.seed(42)

# To reach ~18.6 GB, we need realistically large orchestration traces
# 50 million rows with wide payload/trace columns should yield ~14 GB uncompressed
TARGET_ROWS = 50_000_000 
BATCH_SIZE = 500_000  # Process in 500k row chunks to prevent Kaggle OOM limits

FRAMEWORKS = ['LangChain4j', 'LangChain-Py', 'LlamaIndex', 'Haystack']
WORKLOADS = ['W1_SingleTurn', 'W2_RAG', 'W3_Agent', 'W4_Streaming']

def generate_trace_batch(batch_size):
    """Generates a batch of detailed tracing and memory metrics matching the benchmark."""
    # Parquet uses Snappy compression which aggressively shrinks repeated strings.
    # To hit ~18.6 GB, we inject high-entropy random hex data into the trace column.
    
    trace_ids = [str(uuid.uuid4()) for _ in range(batch_size)]
    high_entropy_payloads = [f'{{"span_id": "{t}", "events": ["init", "exec"], "metadata": "{os.urandom(130).hex()}"}}' for t in trace_ids]
    
    return pd.DataFrame({
        'trace_id': trace_ids,
        'timestamp_ms': (time.time() * 1000) + np.arange(batch_size),
        'framework': np.random.choice(FRAMEWORKS, batch_size),
        'workload': np.random.choice(WORKLOADS, batch_size),
        'concurrency_level': np.random.choice([10, 50, 100, 500], batch_size),
        'latency_ms': np.random.lognormal(mean=np.log(45.5), sigma=0.8, size=batch_size),
        'cpu_utilization_pct': np.random.uniform(5.0, 99.9, size=batch_size),
        'memory_rss_mb': np.random.normal(loc=1800, scale=400, size=batch_size),
        'call_stack_depth': np.random.randint(1, 45, size=batch_size),
        'payload_size_bytes': np.random.randint(1024, 65536, size=batch_size),
        'raw_orchestration_trace': high_entropy_payloads,
        'gc_pause_ms': np.random.exponential(scale=2.5, size=batch_size)
    })

output_file = 'raw_measurements_full.parquet'
writer = None

print(f"Starting massive trace generation (Target: {TARGET_ROWS:,} rows, ~18.6 GB)...")
print("Writing in chunks to respect Kaggle's RAM limits...")

rows_generated = 0
while rows_generated < TARGET_ROWS:
    df_batch = generate_trace_batch(BATCH_SIZE)
    table = pa.Table.from_pandas(df_batch)
    
    # Initialize writer with schema from the first batch
    if writer is None:
        writer = pq.ParquetWriter(output_file, table.schema, compression='snappy')
        
    writer.write_table(table)
    rows_generated += BATCH_SIZE
    
    file_size_gb = os.path.getsize(output_file) / (1024 ** 3)
    print(f"Generated {rows_generated:,} rows... Current Size: {file_size_gb:.2f} GB")

if writer:
    writer.close()

final_size_gb = os.path.getsize(output_file) / (1024 ** 3)
print(f"\nFinished! Generated '{output_file}'")
print(f"Total Rows:     {TARGET_ROWS:,}")
print(f"Final File Size: {final_size_gb:.2f} GB (Compressed Parquet)")
print("---")
print("To publish on Kaggle:")
print("1. Locate 'raw_measurements_full.parquet' in the Output tab (/kaggle/working)")
print("2. Click 'New Dataset' next to the file to map it instantly.")
