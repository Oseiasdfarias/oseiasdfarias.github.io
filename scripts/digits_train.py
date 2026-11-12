"""Treina a rede pequena do hero e gera components/digitsNet.ts.

Rede: 64 pixels (dígito 8x8 do scikit-learn) -> 16 -> 12 neurônios (sigmoide) -> 10 saídas (0-9).
Uso: uv run --with scikit-learn python scripts/digits_train.py
"""
from pathlib import Path
import json
import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "components" / "digitsNet.ts"

X, y = load_digits(return_X_y=True)
X = X / 16.0
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
clf = MLPClassifier(hidden_layer_sizes=(16, 12), activation="logistic", alpha=1e-3,
                    max_iter=2000, random_state=1).fit(Xtr, ytr)
acc = clf.score(Xte, yte)

# um exemplo de teste por dígito, entre os acertos com mais confiança
proba = clf.predict_proba(Xte)
samples = []
for d in range(10):
    ok = np.where((yte == d) & (proba.argmax(1) == d))[0]
    best = ok[np.argsort(-proba[ok, d])[len(ok) // 2]]   # confiança mediana: a barra mostra alguma dúvida real
    samples.append({"label": d, "px": [int(round(v * 16)) for v in Xte[best]]})

r2 = lambda a: np.round(a, 2).tolist()
data = {"acc": round(float(acc), 4), "sizes": [64, *clf.hidden_layer_sizes, 10],
        "W": [r2(w) for w in clf.coefs_], "b": [r2(b) for b in clf.intercepts_], "samples": samples}
OUT.write_text(
    "// Gerado por scripts/digits_train.py: não edite à mão.\n"
    f"// Rede 64 → 16 → 12 (sigmoide) → 10 treinada nos dígitos 8×8 do scikit-learn; acurácia no teste: {acc:.1%}.\n"
    f"export const DIGITS_NET = {json.dumps(data, separators=(',', ':'))} as const;\n",
    encoding="utf-8")
print(f"acurácia no teste: {acc:.1%} · {OUT.relative_to(ROOT)} · {OUT.stat().st_size/1024:.1f} KB")
