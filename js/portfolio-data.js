const CATEGORIES = [
  { slug: "short-form",   name: "Short Form",      swatch: "#FF7A33", icon: "play" },
  { slug: "long-form",     name: "Long Form",       swatch: "#4DD8C8", icon: "film" },
  { slug: "gaming",        name: "Gaming",          swatch: "#9D7BFF", icon: "controller" },
  { slug: "football",      name: "Football Edits",  swatch: "#5FD16B", icon: "ball" },
  { slug: "ecommerce",     name: "eCommerce Ads",   swatch: "#FFC94D", icon: "bag" },
  { slug: "documentary",   name: "Documentary",     swatch: "#7AA7FF", icon: "clapper" },
  { slug: "color-grading", name: "Color Grading",   swatch: "#FF5C8A", icon: "swatch" },
  { slug: "anime",         name: "Anime",           swatch: "#C77DFF", icon: "star" },
  { slug: "ads",           name: "Ads",             swatch: "#FF7A33", icon: "megaphone" },
];

const PORTFOLIO_ITEMS = [
  { id:"sf01", cat:"short-form", title:"Reel Drop — Studio Launch",     duration:"0:32", tc:"00:00:08:14", blurb:"A fast-cut product reel built for the first three seconds of a scroll." },
  { id:"sf02", cat:"short-form", title:"Behind the Counter",            duration:"0:45", tc:"00:00:11:02", blurb:"Day-in-the-life cutdown for a café client's Instagram Reels feed." },
  { id:"sf03", cat:"short-form", title:"Five Second Hook Test",         duration:"0:28", tc:"00:00:06:19", blurb:"A/B hook variants edited for paid social testing." },

  { id:"lf01", cat:"long-form", title:"The Founder Interview",          duration:"18:40", tc:"00:04:12:00", blurb:"A sit-down interview cut with cinematic pacing for YouTube." },
  { id:"lf02", cat:"long-form", title:"Studio Tour, Full Walkthrough",  duration:"12:05", tc:"00:02:55:08", blurb:"Long-form walkthrough edit with chaptered narrative beats." },
  { id:"lf03", cat:"long-form", title:"Year One, A Retrospective",      duration:"22:15", tc:"00:05:40:21", blurb:"Archival footage assembled into a retrospective narrative." },

  { id:"gm01", cat:"gaming", title:"Clutch Round Highlights",           duration:"3:10", tc:"00:00:44:06", blurb:"Tournament highlight reel synced to beat-matched music." },
  { id:"gm02", cat:"gaming", title:"Stream Recap — Week 12",            duration:"4:50", tc:"00:01:02:17", blurb:"Weekly stream recap with overlay graphics and kill-cam inserts." },
  { id:"gm03", cat:"gaming", title:"Speedrun Breakdown",                duration:"6:20", tc:"00:01:30:03", blurb:"Split-screen breakdown comparing two runs frame by frame." },

  { id:"fb01", cat:"football", title:"Matchday Highlights — Derby",     duration:"2:48", tc:"00:00:39:11", blurb:"Goal-by-goal matchday recap with broadcast-style graphics." },
  { id:"fb02", cat:"football", title:"Academy Player Reel",             duration:"1:55", tc:"00:00:27:09", blurb:"Scouting reel built for an academy player's highlight package." },
  { id:"fb03", cat:"football", title:"Pre-Season Hype Edit",            duration:"1:20", tc:"00:00:19:23", blurb:"High-energy hype edit for season-opener social posts." },

  { id:"ec01", cat:"ecommerce", title:"Product Drop — Sneaker Launch",  duration:"0:38", tc:"00:00:09:05", blurb:"Vertical ad cut for a footwear launch, optimised for Reels." },
  { id:"ec02", cat:"ecommerce", title:"Unboxing to Conversion",         duration:"0:52", tc:"00:00:14:18", blurb:"Unboxing-style ad ending on a clear call-to-action card." },
  { id:"ec03", cat:"ecommerce", title:"Bundle Sale — 3 Variants",       duration:"0:30", tc:"00:00:07:02", blurb:"Three ad variants cut for a single sale, tested across platforms." },

  { id:"dc01", cat:"documentary", title:"Voices from the Workshop",     duration:"14:30", tc:"00:03:21:10", blurb:"Interview-led documentary short about a family-run workshop." },
  { id:"dc02", cat:"documentary", title:"After the Harvest",            duration:"9:45", tc:"00:02:10:04", blurb:"Observational documentary cut with minimal narration." },
  { id:"dc03", cat:"documentary", title:"The Long Commute",             duration:"11:02", tc:"00:02:38:15", blurb:"A character-driven short following a daily commute." },

  { id:"cg01", cat:"color-grading", title:"Before/After — Golden Hour", duration:"0:40", tc:"00:00:10:00", blurb:"Split-screen grade comparison built for a portfolio reel." },
  { id:"cg02", cat:"color-grading", title:"Moody Interior Pass",        duration:"1:05", tc:"00:00:16:08", blurb:"A teal-leaning interior grade for a restaurant brand film." },
  { id:"cg03", cat:"color-grading", title:"Night Drive LUT Build",      duration:"0:55", tc:"00:00:13:19", blurb:"Custom LUT build for low-light driving footage." },

  { id:"an01", cat:"anime", title:"Opening Sequence Re-cut",            duration:"1:30", tc:"00:00:21:06", blurb:"Fan-edit style opening sequence synced to a custom track." },
  { id:"an02", cat:"anime", title:"Fight Scene AMV",                   duration:"2:05", tc:"00:00:29:14", blurb:"Action-focused AMV with motion-matched beat cuts." },
  { id:"an03", cat:"anime", title:"Character Tribute Edit",            duration:"1:48", tc:"00:00:25:00", blurb:"Tribute-style edit blending stills and motion clips." },

  { id:"ad01", cat:"ads", title:"App Install Campaign",                duration:"0:22", tc:"00:00:05:11", blurb:"Short, punchy app-install ad built for paid placements." },
  { id:"ad02", cat:"ads", title:"Brand Awareness Spot",                duration:"0:35", tc:"00:00:08:20", blurb:"Brand spot built around a single emotional beat." },
  { id:"ad03", cat:"ads", title:"Festive Sale Teaser",                 duration:"0:25", tc:"00:00:06:07", blurb:"Teaser ad for a seasonal sale, cut in three aspect ratios." },
];
