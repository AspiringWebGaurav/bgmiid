export const FONT_MAPS = {
  normal: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  fancy1: "αвс∂єƒgнιјκℓмиσρφяѕτυνωχуzΑΒСDΕFGΗΙJΚLΜΝΟΡQRSΤUVWXΥΖ0123456789",
  fancy2: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  fancy3: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789",
  fancy4: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏Ｑ𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  fancy5: "ΛBCDΞFGHIJKLMNΘPQRSTUVWXYZΛBCDΞFGHIJKLMNΘPQRSTUVWXYZ0123456789",
  fancy6: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789",
};

export const BGMI_SYMBOLS = [
  "々",
  "〆",
  "๛",
  "×",
  "『",
  "』",
  " _",
  " . ",
  " | ",
  " + ",
  "·",
  "卍",
  "帝",
  "神",
  "父",
  "么",
  "个",
  "乡",
  "★",
  "⚡",
  "ツ",
  "✿",
  "亗",
  "Ø",
  "父",
  "ズ",
  "ʚ",
  "ɞ",
  "文",
];

export const CATEGORIES = [
  { id: "all", label: "All Styles" },
  { id: "pro", label: "Pro Player" },
  { id: "clan", label: "Clan Lead" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "warrior", label: "Warrior" },
];

export const generateName = (input, style, symbol) => {
  if (!input) return "";

  let result = "";
  const map = FONT_MAPS[style] || FONT_MAPS.normal;
  const normalChars = FONT_MAPS.normal;

  for (let char of input) {
    const index = normalChars.indexOf(char);
    if (index !== -1) {
      // Handle the case where we might be mapping more chars than the fancy font has (though they should match)
      const fancyChar = Array.from(map)[index];
      result += fancyChar || char;
    } else {
      result += char;
    }
  }

  // Apply symbol rules based on context or user choice
  // For now, we'll return the base formatted name
  return result;
};

export const BGMI_RULES = [
  "Maximum length is 14 characters.",
  "Symbols like 々, 〆, ๛ are widely supported.",
  "Spaces count as characters.",
  "Special characters must be from the allowed UTF-8 range.",
  "Avoid too many emojis as they might appear as [?] to other players.",
];
