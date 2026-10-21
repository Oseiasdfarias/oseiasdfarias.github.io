import numpy as np
from PIL import Image
r = np.load('raw.npy'); img, d, cov = r[..., 0], r[..., 1], r[..., 2]
H, W = img.shape
c0, c1 = int(W * 0.06), int(W * 0.94)
img, d, cov = img[:, c0:c1], d[:, c0:c1], cov[:, c0:c1]
fog = np.clip(d / 0.95, 0, 1) ** 0.8
rows = np.linspace(0, 1, H)[:, None]
# dark: haze toward near-black, foreground darkened
v = img * (1 - fog * 0.6) + 0.05 * fog
v = v * (1 - 0.65 * np.clip((rows - 0.75) / 0.25, 0, 1))
v = np.clip(v, 0, 1)
dark = np.dstack([v * 250, v * 248, v * 245, cov * 255]).astype(np.uint8)
Image.fromarray(dark, 'RGBA').save('mountains-dark.webp', quality=82, method=6)
# light: misty pale mountains
lv = 0.60 + 0.42 * np.clip(img, 0, 1) ** 0.8
lv = lv * (1 - fog * 0.85) + 0.93 * fog * 0.85
lv = lv * (1 - 0.25 * np.clip((rows - 0.75) / 0.25, 0, 1))
lv = np.clip(lv, 0, 1)
light = np.dstack([lv * 252, lv * 250, lv * 248, cov * 255]).astype(np.uint8)
Image.fromarray(light, 'RGBA').save('mountains-light.webp', quality=82, method=6)
for name, bgc in (('dark', (10, 10, 11)), ('light', (244, 244, 245))):
    im = Image.open(f'mountains-{name}.webp'); bg = Image.new('RGBA', im.size, bgc + (255,)); bg.alpha_composite(im)
    bg.convert('RGB').resize((1100, 450)).save(f'prev-{name}.png')
