# ChurnLab — Pacana & Javier

Group 6.1 · Foundations of Business Analytics

An interactive dashboard for the supplied IBM Telco Customer Churn sample. The dashboard follows Pacana and Javier's final project plan and saved EDA/model notebook results, with its own navy, coral, and blue design.

## Dashboard views

- **Account signals:** churn composition, contract comparison, tenure bands by contract, and payment-method comparison.
- **Service footprint:** contract–internet heatmap and nonlinear service-count profiles by internet type.
- **Model evidence:** saved four-model comparison, logistic-regression confusion counts, charge-redundancy check, and validation limitations.
- **Data & scope:** preparation, provenance, field definitions, and interpretation boundaries.

The five indicators and six descriptive charts share contract, internet service, payment method, and tenure filters. Downloads contain aggregate summaries for the selected population. Model results stay fixed when descriptive filters change.

## GitHub Pages

All website assets are in the repository root and use relative URLs. Publish from **Settings → Pages → Deploy from a branch → main → /(root)**. The `.nojekyll` file serves this static site without a Jekyll build. No notebook runtime, API key, or ChatGPT hosting is required.

For a local preview, run `python -m http.server 8766` from this directory.

## Verification

Run `node analytics.test.cjs`. The checks verify sample totals, group partitions, filtering, empty selections, tenure boundaries, Wilson intervals, the reported nonlinear service-count pattern, and saved confusion-matrix metrics.

The sample contains 7,043 accounts and 1,869 recorded churners. The hosted data omits account identifiers. Eleven blank TotalCharges records are documented as eleven affected accounts.

## Model scope

Model values reproduce the supplied notebook's displayed prototype results; no models were retrained for this website. The prototype uses pre-split correlation screening and selects its winner using inspected test-set F1. Training-only feature/model/threshold selection, average precision, permutation importance, and independent dated validation remain planned. Results are historical associations and exploratory classification evidence, not causal treatment effects, calibrated future risks, or financial savings.

## Sources and charting

The provided Pacana–Javier final project plan, EDA notebook, model notebook, EDA Colab PDF, and matching local `WA_Fn-UseC_-Telco-Customer-Churn.csv` are the project sources. The full CSV checksum is displayed in Data & scope. Plotly.js is bundled locally with its license notice retained in `plotly.min.js`.
