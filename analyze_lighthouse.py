import json
import sys
import os

def analyze_report(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        url = data.get('finalUrl', 'Unknown URL')
        categories = data.get('categories', {})
        audits = data.get('audits', {})
        
        perf_score = categories.get('performance', {}).get('score', 0) * 100
        
        lcp = audits.get('largest-contentful-paint', {})
        cls = audits.get('cumulative-layout-shift', {})
        tbt = audits.get('total-blocking-time', {})
        si = audits.get('speed-index', {})
        
        print(f"--- Report for: {url} ---")
        print(f"Performance Score: {perf_score:.0f}")
        print(f"LCP: {lcp.get('displayValue')} ({lcp.get('numericValue', 0):.0f} ms)")
        print(f"CLS: {cls.get('displayValue')} ({cls.get('numericValue', 0):.3f})")
        print(f"TBT: {tbt.get('displayValue')} ({tbt.get('numericValue', 0):.0f} ms)")
        print(f"Speed Index: {si.get('displayValue')} ({si.get('numericValue', 0):.0f} ms)")
        print("-" * 30)
        
    except Exception as e:
        print(f"Error analyzing {filepath}: {e}")

files = ['lighthouse-reports/home.json', 'lighthouse-reports/about.json', 'lighthouse-reports/blog.json']
for file in files:
    if os.path.exists(file):
        analyze_report(file)
    else:
        print(f"File not found: {file}")
