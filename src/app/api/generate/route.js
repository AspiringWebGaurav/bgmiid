const FONT_MAPS = {
  normal: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  fancy1: "αвс∂єƒgнιјκℓмиσρφяѕτυνωχуzΑΒСDΕFGΗΙJΚLΜΝΟΡQRSΤUVWXΥΖ0123456789",
  fancy2: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  fancy3: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789",
  fancy4: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏Ｑ𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  fancy5: "ΛBCDΞFGHIJKLMNΘPQRSTUVWXYZΛBCDΞFGHIJKLMNΘPQRSTUVWXYZ0123456789",
  fancy6: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789",
};

const SYMBOLS = [
  "々",
  "〆",
  "๛",
  "×",
  "『",
  "』",
  "·",
  "卍",
  "帝",
  "神",
  "★",
  "⚡",
  "ツ",
  "✿",
  "亗",
  "Ø",
  "ズ",
  "ʚ",
  "ɞ",
  "文",
];

const COMBOS = [
  (n) => `亗 ${n} 亗`,
  (n) => `『${n}』`,
  (n) => `〆${n}〆`,
  (n) => `々${n}々`,
  (n) => `× ${n} ×`,
  (n) => `๛${n}๛`,
  (n) => `★${n}★`,
  (n) => `帝${n}帝`,
];

const STYLE_LABELS = {
  normal: "Original",
  fancy1: "Cyrillic",
  fancy2: "Outline",
  fancy3: "Cursive",
  fancy4: "Bold",
  fancy5: "Greek",
  fancy6: "Boxed",
};

function transformName(input, style) {
  if (!input) return "";
  const map = FONT_MAPS[style] || FONT_MAPS.normal;
  const normal = FONT_MAPS.normal;
  const mapChars = Array.from(map);
  let result = "";
  for (const char of input) {
    const idx = normal.indexOf(char);
    result += idx !== -1 ? mapChars[idx] || char : char;
  }
  return result;
}

function isValidInput(name) {
  if (!name || typeof name !== "string") return false;
  if (name.length < 1 || name.length > 20) return false;
  // Block potentially harmful input
  if (/<|>|script|javascript/i.test(name)) return false;
  return true;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawName = (searchParams.get("name") || "").trim();

  if (!isValidInput(rawName)) {
    return Response.json(
      { error: "Invalid input. Name must be 1–20 characters." },
      { status: 400 },
    );
  }

  const fonts = Object.entries(FONT_MAPS)
    .filter(([style]) => style !== "normal")
    .map(([style]) => ({
      id: `font-${style}`,
      type: "font",
      style,
      label: STYLE_LABELS[style] || style,
      name: transformName(rawName, style),
    }));

  const symbols = SYMBOLS.map((sym, i) => ({
    id: `sym-${i}`,
    type: "symbol",
    style: "fancy3",
    label: "Symbol",
    name: `${sym}${transformName(rawName, "fancy3")}${sym}`,
  }));

  const combos = COMBOS.map((fn, i) => ({
    id: `combo-${i}`,
    type: "combo",
    style: "normal",
    label: "Combo",
    name: fn(rawName),
  }));

  const results = [...fonts, ...symbols, ...combos];

  // Filter out names exceeding 14 chars and mark them
  const annotated = results.map((r) => ({
    ...r,
    tooLong: r.name.length > 14,
    charCount: r.name.length,
  }));

  return Response.json(
    {
      input: rawName,
      count: annotated.length,
      results: annotated,
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    },
  );
}
