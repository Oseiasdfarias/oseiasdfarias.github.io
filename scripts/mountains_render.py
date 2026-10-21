import numpy as np, sys
from PIL import Image, ImageFilter
rng = np.random.default_rng(7)
N = 1024

def value_noise(n, freq):
    g = rng.random((freq + 1, freq + 1))
    x = np.linspace(0, freq, n, endpoint=False)
    i = x.astype(int); f = x - i
    f = f * f * (3 - 2 * f)
    a = g[i][:, i]; b = g[i][:, i + 1]; c = g[i + 1][:, i]; d = g[i + 1][:, i + 1]
    fx = f[None, :]; fy = f[:, None]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy

# ridged multifractal
h = np.zeros((N, N)); amp = 1.0; w = 1.0
for o in range(9):
    n = 1 - np.abs(value_noise(N, 3 * 2 ** o) * 2 - 1)
    n = n * n * w
    w = np.clip(n * 2, 0, 1)
    h += n * amp; amp *= 0.5
h = (h - h.min()) / (h.max() - h.min())
# massif envelope: big peak slightly right of center, valley in front
yy, xx = np.mgrid[0:N, 0:N] / N
env = np.exp(-(((xx - 0.56) / 0.22) ** 2 + ((yy - 0.42) / 0.20) ** 2))
env2 = np.exp(-(((xx - 0.30) / 0.25) ** 2 + ((yy - 0.55) / 0.25) ** 2)) * 0.55
env3 = np.exp(-(((xx - 0.85) / 0.25) ** 2 + ((yy - 0.6) / 0.25) ** 2)) * 0.5
hm = h * (0.25 + 1.1 * np.maximum(env, np.maximum(env2, env3)))
hm = hm / hm.max()
def ss(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t)
hm = hm * (1 - ss(0.72, 0.98, yy)) * ss(0.0, 0.12, xx) * (1 - ss(0.88, 1.0, xx))

# lighting from normals (light from upper-left-back)
gy, gx = np.gradient(hm * 260)
nrm = np.dstack([-gx, -gy, np.ones_like(hm)])
nrm /= np.linalg.norm(nrm, axis=2, keepdims=True)
L = np.array([-0.75, 0.35, 0.55]); L /= np.linalg.norm(L)
shade = np.clip((nrm * L).sum(2), 0, 1)
slope = 1 - nrm[..., 2]
fine = sum(value_noise(N, 64 * 2 ** o) * 0.5 ** o for o in range(4)) / 1.875
shade = shade * (0.6 + 0.8 * fine)
snow = np.clip((hm - 0.55) * 4, 0, 1) * np.clip(1 - slope * 2.2, 0, 1)

W, H = 2400, 900
horizon = H * 0.62; K = H * 0.6; cam_h = 0.45
cam = np.array([N * 0.54, -N * 0.48])
img = np.zeros((H, W)); depthimg = np.full((H, W), np.nan)
ybuf = np.full(W, H, dtype=float)
rows = np.arange(H)[:, None]
fov = 0.58
z = N * 0.50
while cam[1] + z < N - 2:
    xs = cam[0] + np.linspace(-fov, fov, W) * z
    yi = cam[1] + z
    xi = np.clip(xs, 0, N - 1.001)
    x0 = xi.astype(int); fx = xi - x0; y0 = int(yi); fy = yi - y0
    def samp(a):
        return ((a[y0, x0] * (1 - fx) + a[y0, x0 + 1] * fx) * (1 - fy)
                + (a[y0 + 1, x0] * (1 - fx) + a[y0 + 1, x0 + 1] * fx) * fy)
    hh = samp(hm)
    sy = horizon + (cam_h - hh) * K / (z / N)
    m = (rows >= sy[None, :]) & (rows < ybuf[None, :])
    if m.any():
        s = samp(shade); sn = samp(snow)
        col = 0.015 + 0.62 * np.clip(s, 0, 1.3) ** 2.0 + 0.35 * sn * (0.2 + 0.8 * s)
        cb = np.broadcast_to(col[None, :], (H, W))
        img[m] = cb[m]
        depthimg[m] = (z - N * 0.5) / (N * 1.0)
    ybuf = np.minimum(ybuf, sy)
    z += 0.6
cover = ~np.isnan(depthimg)
d = np.where(cover, depthimg, 1)
fog = np.clip((d - 0.05) / 0.9, 0, 1) ** 0.8
np.save(sys.argv[1] + '/raw.npy', np.dstack([img, d, cover.astype(float)]))
