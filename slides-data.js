/**
 * 第一週 課程導論：資訊爆炸時代的財經素養
 * 30 頁純教學卡片完整資料庫 (中英雙語對照 + 講授指引 + 課堂提問)
 */
const SLIDES_DATA = [
  // ===================== 第一小時 (Slide 01 - 10) =====================
  {
    id: 1,
    hour: 1,
    category: { zh: "課程導引", en: "Course Orientation" },
    tag: { zh: "核心理念", en: "Core Philosophy" },
    title: {
      zh: "第一週 課程導論：資訊爆炸時代的財經素養",
      en: "Week 1 Orientation: Financial Literacy in the Age of Information Explosion"
    },
    subtitle: {
      zh: "在生成式 AI 與演算法同溫層中，培養獨立提煉「真實訊號」的批判性財經大腦",
      en: "Cultivating a Critical Financial Mind to Extract Real Signals from Generative AI & Echo Chambers"
    },
    teachingCore: {
      zh: "本頁旨在喚起學生對當前資訊環境的警覺。在 2026 年生成式 AI 與社群演算法盛行的時代，我們每天被數以萬計的股市新聞、網紅推薦與 AI 自動生成的投資建議所淹沒。教師應向學生強調：資訊數量的暴增並不等於決策品質的提升，反而容易誘發焦慮與過度交易。本課程的使命是培養具備學術嚴謹度與實務過濾能力的「財經大腦」，學會從無窮的噪音 (Noise) 中提煉出具備經濟價值的真實訊號 (Signal)。",
      en: "This slide awakens students to today's toxic information ecology. In the 2026 era of generative AI and algorithmic feeds, investors are bombarded by tens of thousands of stock headlines, influencer tips, and automated financial bots. More data does not translate into better decisions; it fuels anxiety and overtrading. Our mission is to forge a rigorous academic and empirical filter to distill valuable Signals from infinite Noise."
    },
    guidingQuestions: {
      zh: "詢問學生：「今天早上打開手機，你第一眼看到的財經新聞是什麼？這條新聞讓你感到焦慮想買賣，還是提供了可驗證的數據？」引導學生思考媒體標題對個人心理衝擊的影響。",
      en: "Prompt: 'What was the first financial headline you saw on your phone this morning? Did it induce FOMO anxiety to trade, or did it provide verifiable empirical data?' Guide students to reflect on headline psychological impacts."
    },
    keyTakeaways: [
      { zh: "資訊數量 ≠ 決策品質 (More Information ≠ Better Decisions)", en: "Information Volume ≠ Decision Quality" },
      { zh: "噪音 (Noise) 誘發過度焦慮與短線衝動交易", en: "Noise triggers emotional anxiety and impulsive churn" },
      { zh: "核心目標：建構學術級 4D Filter 訊號過濾大腦", en: "Core Goal: Build an academic 4D Filter to isolate genuine Signal" }
    ],
    visualType: "hero-intro",
    visualData: {
      metric1: { num: "100x", label: { zh: "每日資訊產生速度", en: "Daily Data Surge" } },
      metric2: { num: "98%", label: { zh: "市場情緒噪音佔比", en: "Market Emotional Noise" } },
      metric3: { num: "-3.8%", label: { zh: "過度交易平均年化減損", en: "Annual Loss from Overtrading" } }
    }
  },
  {
    id: 2,
    hour: 1,
    category: { zh: "教學架構", en: "Learning Architecture" },
    tag: { zh: "學期藍圖", en: "Semester Blueprint" },
    title: {
      zh: "3 小時教學藍圖與核心學習架構",
      en: "3-Hour Syllabus Blueprint & Core Learning Architecture"
    },
    subtitle: {
      zh: "從歷史演進、行為心理認知偏誤，到實證計量工具與 4D 查核實務",
      en: "From Media History & Cognitive Biases to Econometric Models & 4D Verification"
    },
    teachingCore: {
      zh: "本頁為學生展示第一週 3 小時（共 180 分鐘）的完整學習藍圖與知識樹。第一小時聚焦於媒體演進歷史、訊息過載 (Information Overload) 倒 U 曲線與訊號雜訊比 (SNR) 數學模型；第二小時深入認知心理偏誤（框架效應）、資訊不對稱檸檬市場、Deepfake 詐騙與 4D Filter 實用工具；第三小時則進行機構與散戶時差、演算法同溫層、綠色洗白辨驗與終身批判性思維。同時說明網頁中 3 大小時獨立活動與課堂作業的配置。",
      en: "This slide outlines the 180-minute pedagogical roadmap. Hour 1 examines media evolution, the Inverted U-Curve of overload, and the mathematical Signal-to-Noise Ratio (SNR). Hour 2 investigates cognitive biases (framing effects), Lemons Market dynamics, Deepfake scams, and introduces the 4D Filter. Hour 3 addresses institutional time lag, echo chambers, greenwashing, and practical exercises with our interactive modals and assignment."
    },
    guidingQuestions: {
      zh: "說明評量方式：「本課程不要求死記硬背公式，而是看重大家能否在課堂活動中運用 4D Filter 成功識別真實新聞中的陷阱。」",
      en: "Assessment guidance: 'This course does not demand rote memorization of formulas, but rather your hands-on ability to apply the 4D Filter to detect subtle traps in real-world media.'"
    },
    keyTakeaways: [
      { zh: "第 1 小時：理論與歷史背景 + SNR 計算盤活動", en: "Hour 1: Theory & History + SNR Calculator Activity" },
      { zh: "第 2 小時：偏誤與防禦工具 + 新聞框架重組考驗", en: "Hour 2: Biases & Defense Tools + Headline Reframing" },
      { zh: "第 3 小時：實證與工具應用 + 偵探小遊戲 + 4D作業", en: "Hour 3: Empirical Apps + Detective Game + 4D Report" }
    ],
    visualType: "blueprint-map",
    visualData: {
      hours: [
        { hour: 1, time: "00:00 - 00:50", theme: { zh: "理論與歷史背景", en: "Theoretical & Historical Context" }, slides: "Slide 01 - 10", activity: { zh: "🎯 資訊飲食與 SNR 計算盤", en: "🎯 Information Diet & SNR Calculator" } },
        { hour: 2, time: "00:50 - 01:40", theme: { zh: "偏誤與防禦工具", en: "Cognitive Biases & Defense Tools" }, slides: "Slide 11 - 20", activity: { zh: "🎯 新聞標題框架重組考驗", en: "🎯 Headline Reframing Challenge" } },
        { hour: 3, time: "01:40 - 02:30", theme: { zh: "實證與工具應用", en: "Empirical Application & Synthesis" }, slides: "Slide 21 - 30", activity: { zh: "🎮 偵探小遊戲 + 📝 4D作業", en: "🎮 Detective Game + 📝 4D Report" } }
      ]
    }
  },
  {
    id: 3,
    hour: 1,
    category: { zh: "媒體演進", en: "Media Evolution" },
    tag: { zh: "歷史實證", en: "Historical Evidence" },
    title: {
      zh: "金融媒體演進史（一）：紙本與廣播時代",
      en: "Evolution of Financial Media I: The Print & Broadcast Era"
    },
    subtitle: {
      zh: "從 24 小時印刷時差的機構壟斷，到開盤即時直播引發的群體恐慌共振",
      en: "From 24-Hour Print Delays & Wall St Monopolies to Real-Time TV Panic Contagion"
    },
    teachingCore: {
      zh: "本頁介紹金融新聞傳遞速度與市場結構的歷史轉變。在傳統紙本報紙時代，財經新聞出版有高達 24 小時以上的時差，第一手上市公司財報與總體經濟數據被少數大型機構與投資銀行壟斷，散戶幾乎完全處於資訊盲區。進入電視與廣播開盤即時播報時代後，新聞傳播速度大幅提升，但同時也首度引發了大眾市場的情緒共振，例如 1987 年美股「黑色星期一」崩盤事件中，電視現場直播的恐慌畫面被公認為加劇 panic selling 的重要因素之一。",
      en: "Examines historical shifts in transmission latency and market structure. In the paper press era, 24+ hour publication lags meant prime earnings and macro indicators were monopolized by institutions, leaving retail investors blind. The broadcast radio/TV era dramatically accelerated news delivery, yet introduced mass emotional resonance. During the 1987 Black Monday crash, live televised panic coverage was recognized as a prime catalyst amplifying cascading panic selling."
    },
    guidingQuestions: {
      zh: "引導學生對比：「當資訊傳遞變快時，對一般投資人而言到底是利多還是利空？為什麼資訊越快，市場反而波動越大？」",
      en: "Contrast question: 'When transmission speeds up, is it an advantage or disadvantage for retail investors? Why does faster news often amplify market volatility?'"
    },
    keyTakeaways: [
      { zh: "紙本時代：24h+ 嚴重時差，第一手數據被機構徹底壟斷", en: "Print Era: 24h+ lag; primary corporate data locked by institutions" },
      { zh: "廣播電視：即時性首度建立，亦首度引爆群眾情緒共振", en: "Broadcast Era: Real-time coverage enabled mass panic contagion" },
      { zh: "經典案例：1987 黑色星期一電視現場恐慌加劇雪崩", en: "Milestone: 1987 Black Monday panic worsened by live TV feeds" }
    ],
    visualType: "timeline-compare",
    visualData: {
      era1: { name: { zh: "紙本報紙時代 (1900-1970s)", en: "Print Newspaper Era" }, latency: "24~48 小時", access: { zh: "投行/法人壟斷", en: "Institutional Monopoly" }, risk: { zh: "散戶完全資訊盲區", en: "Complete Retail Blindspot" } },
      era2: { name: { zh: "廣播與電視時代 (1980-1990s)", en: "Broadcast TV Era" }, latency: "數分鐘至小時", access: { zh: "大眾同步接收", en: "Mass Simultaneous Access" }, risk: { zh: "視覺情緒共振引發踩踏", en: "Emotional Contagion & Panic Selling" } }
    }
  },
  {
    id: 4,
    hour: 1,
    category: { zh: "媒體演進", en: "Media Evolution" },
    tag: { zh: "數位前沿", en: "Digital Frontier" },
    title: {
      zh: "金融媒體演進史（二）：社群與 AI 演播時代",
      en: "Evolution of Financial Media II: Social Media & AI Streaming Era"
    },
    subtitle: {
      zh: "從 Reddit 迷因股挾空暴動，到生成式 AI 指數型產生海量極化內容",
      en: "From Reddit Meme Stock Squeezes to Generative AI's Exponential Noise Explosion"
    },
    teachingCore: {
      zh: "本頁接續探討 Web 2.0 時代與 2026 生成式 AI 時代的資訊傳播。Web 2.0 讓 Reddit (r/wallstreetbets) 與台灣 PTT 股板等散戶論壇抬頭，資訊傳播縮短至毫秒級，引發 GameStop 迷因股集體挾空事件。到了 2026 年 GenAI 時代，AI 自動生成新聞稿與演算法精準推送極化標題，訊息產生速率呈現指數型爆發，這使得市場上無意義的噪音量達到歷史極致，投資人更難維持理性分析。",
      en: "Traces Web 2.0 to 2026 GenAI dissemination. Web 2.0 empowered retail forums like Reddit's r/wallstreetbets and Taiwan's PTT Stock Board, compressing transmission to milliseconds and spurring the GameStop short squeeze. Today in 2026, GenAI auto-generates infinite articles while algorithms push hyper-polarized clickbait. Unfiltered noise has reached an all-time peak, severely undermining rational decision-making."
    },
    guidingQuestions: {
      zh: "提問：「大家是否有追蹤投資網紅或加入 LINE 股票群組？當演算法每天推播相同看多的內容時，你會感到心安還是警覺？」",
      en: "Inquiry: 'Do you follow financial influencers or belong to stock chat groups? When algorithms flood your feed with bullish posts, do you feel reassured or alarmed?'"
    },
    keyTakeaways: [
      { zh: "Web 2.0 社群：毫秒級論壇傳播，催生迷因股集體挾空", en: "Web 2.0: Sub-second viral feeds sparking retail short squeezes" },
      { zh: "2026 GenAI 時代：AI 全自動產文，噪音量呈指數型爆發", en: "2026 GenAI: Automated bot content creating exponential noise" },
      { zh: "演算法驅動：精準餵養極化情緒，理性客觀分析被邊緣化", en: "Algorithmic loops feed polarization; sober analysis is sidelined" }
    ],
    visualType: "era-progression",
    visualData: {
      steps: [
        { year: "2000-2020", title: { zh: "Web 2.0 社群論壇", en: "Web 2.0 Social Boards" }, desc: { zh: "Reddit / PTT 散戶集結挾空 GameStop", en: "Meme stocks & collective retail trading" } },
        { year: "2023-2026", title: { zh: "生成式 AI 與演算法", en: "GenAI & Algorithmic Feeds" }, desc: { zh: "AI 自動產製 100 萬篇新聞/天，情緒噪音極大化", en: "Autonomous news bots emitting infinite noise" } }
      ]
    }
  },
  {
    id: 5,
    hour: 1,
    category: { zh: "訊息過載", en: "Information Overload" },
    tag: { zh: "頂刊實證", en: "Academic Evidence" },
    title: {
      zh: "數據現實：訊息過載 (Information Overload) 倒 U 曲線",
      en: "Empirical Reality: The Inverted U-Curve of Information Overload"
    },
    subtitle: {
      zh: "個人資訊處理能力存在生理臨界點：超越臨界點後，決策精準度急劇崩跌",
      en: "Human Cognition Has a Hard Tipping Point: Beyond It, Decision Accuracy Collapses"
    },
    teachingCore: {
      zh: "本頁引用頂尖財務學術期刊 (Journal of Finance / Review of Financial Studies) 的實證研究。學者發現，個人處理資訊的能力存在生理與心理的臨界點 (Tipping Point)。在臨界點之前，增加資訊有助於提高決策精準度；然而一旦超越臨界點，過多的短線新聞只會引發資訊焦慮與大腦認知過載，導致決策精準度呈現急劇下滑的「倒 U 曲線 (Inverted U-Curve)」。",
      en: "Draws from top empirical finance research (Journal of Finance, Review of Financial Studies). Cognitive science demonstrates humans possess a definitive physiological tipping point. Prior to this threshold, additional data improves decision accuracy. Once passed, incoming headlines generate cognitive paralysis and acute stress, causing accuracy to plummet in a classic Inverted U-Curve."
    },
    guidingQuestions: {
      zh: "引導學生自我評估：「你是否曾因為盯著盤中即時新聞看一整天，最後反而做出讓你後悔的衝動交易？這就是倒 U 曲線右側的典型症狀。」",
      en: "Self-audit prompt: 'Have you ever monitored live financial tickers all day, only to make an impulsive trade you instantly regretted? That is the exact pathology of the right slope of the Inverted U-Curve.'"
    },
    keyTakeaways: [
      { zh: "認知容量限制：大腦無法同時消化海量無序的即時碎屑", en: "Cognitive Limits: Working memory cannot process chaotic live streams" },
      { zh: "臨界點 (Tipping Point)：資訊增加從助攻轉為阻礙", en: "The Tipping Point: Information shifts from asset to toxic liability" },
      { zh: "倒 U 曲線右側：導致恐慌、過度交易與嚴重的資本減損", en: "Right-hand slope causes paralysis, overtrading, and portfolio decay" }
    ],
    visualType: "inverted-u-chart",
    visualData: {
      optimalPoint: { zh: "最佳認知決策點 (甜蜜點)", en: "Sweet Spot: Optimal Decision Accuracy" },
      overloadZone: { zh: "過載崩跌區 (焦慮/癱瘓/過度交易)", en: "Cognitive Overload Zone (Panic & Churn)" }
    }
  },
  {
    id: 6,
    hour: 1,
    category: { zh: "認知心理", en: "Cognitive Psychology" },
    tag: { zh: "行為財務", en: "Behavioral Finance" },
    title: {
      zh: "認知心理：資訊過載導致過度交易 (Overtrading)",
      en: "Cognitive Bias: Overload Induces Overconfidence & Overtrading"
    },
    subtitle: {
      zh: "即時新聞製造掌控一切的幻覺，頻繁交易散戶每年平均跑輸大盤 3.8%",
      en: "Live Headlines Foster an Illusion of Control, Costing Active Retail Traders 3.8% Annually"
    },
    teachingCore: {
      zh: "本頁說明資訊過載如何誘發行為財務學中的「過度自信偏誤 (Overconfidence Bias)」。當散戶每天接收數十條即時新聞時，大腦會產生一種「我已經掌控全盤市場資訊」的虛假掌控感 (Illusion of Control)，進而顯著提高交易頻率。財務計量數據顯示：頻繁根據每日新聞進行過度交易的散戶，其年化報酬率平均比採用簡單買進持有策略 (Buy-and-Hold) 的投資人低了 3.8%，損失主要來自交易手續費與追高殺低的價差。",
      en: "Explains how data glut breeds Overconfidence Bias. Digesting dozens of breaking news flashes creates an 'Illusion of Control'—the delusion of possessing total market visibility. Empirical econometrics confirms: active retail investors who trade on daily headlines underperform passive buy-and-hold benchmarks by 3.8% annually, bled dry by transaction friction and whipsaw whipsawing."
    },
    guidingQuestions: {
      zh: "提問：「為什麼知道越多新聞的人，投資績效反而可能越差？我們該如何克服手癢想頻繁交易的心理衝動？」",
      en: "Core query: 'Why do headline junkies often underperform disciplined long-term holders? What concrete behavioral mechanisms can arrest the urge to overtrade?'"
    },
    keyTakeaways: [
      { zh: "控制錯覺 (Illusion of Control)：誤將資訊量等同於預測力", en: "Illusion of Control: Mistaking news consumption for predictive edge" },
      { zh: "績效黑洞：過度交易散戶年化報酬平均落後大盤 3.8%", en: "Performance Drag: Overtraders lag baseline returns by -3.8% annually" },
      { zh: "解法：拉長決策週期，建立不看盤的時間隔離機制", en: "Solution: Lengthen timeframes and institute forced news quarantines" }
    ],
    visualType: "stat-loss",
    visualData: {
      stat: "-3.8%",
      statDesc: { zh: "過度交易群體相較於買進持有 (Buy & Hold) 的年化超額損失", en: "Annualized underperformance of active news traders vs. Buy-and-Hold" },
      causes: [
        { zh: "交易手續費與證交稅磨損", en: "Brokerage commissions and transaction taxes" },
        { zh: "追高殺低的情緒性滑價損失", en: "Emotional whipsaw buying tops and selling bottoms" },
        { zh: "錯過市場最關鍵的暴漲交易日", en: "Missing the market's single best trading recovery days" }
      ]
    }
  },
  {
    id: 7,
    hour: 1,
    category: { zh: "經典理論", en: "Classic Theory" },
    tag: { zh: "數學模型", en: "Mathematical Model" },
    title: {
      zh: "經典理論：訊號與雜訊比 (SNR) 數學模型",
      en: "Foundational Theory: The Signal-to-Noise Ratio (SNR) Mathematical Model"
    },
    subtitle: {
      zh: "SNR = 實質基本面訊號功率 / 市場情緒雜訊功率；總量爆增百倍使 SNR 急劇惡化",
      en: "SNR = Power of Fundamental Signals / Power of Market Noise; 100x Data Dilutes True Value"
    },
    teachingCore: {
      zh: "本頁引入統計學家 Nate Silver 與諾貝爾獎得主認可的 SNR (Signal-to-Noise Ratio) 數學模型。Signal (訊號) 代表反映企業長期內在價值、自由現金流與總體經濟結構變化的實質數據；Noise (雜訊) 則代表市場短期情緒波動、傳言與標題黨。數學公式為 SNR = Power(Fundamental Signals) / Power(Market Noise)。當市場總資訊量爆增 100 倍而真實 Signal 僅增加 2 倍時，SNR 正在急劇惡化，代表我們在海量資訊中吸收到廢物的機率高達 98%。",
      en: "Introduces Nate Silver's Signal-to-Noise Ratio (SNR) model. 'Signal' captures structural realities: long-term discounted cash flows, audited balance sheets, and macroeconomic pivots. 'Noise' captures transitory volatility, rumors, and panic bait. Mathematical formulation: SNR = Power(Signal) / Power(Noise). When total data explodes 100-fold while underlying economic signal grows merely 2-fold, the SNR deteriorates exponentially, meaning 98% of digested media is sheer waste."
    },
    guidingQuestions: {
      zh: "引導學生理解公式：「如果要提高你的 SNR 分數，分子（真實數據）與分母（市場雜訊）分別應該怎麼調整？」",
      en: "Math inquiry: 'To maximize your personal SNR score, what operational levers must you apply to the numerator (primary data) and the denominator (media noise)?'"
    },
    keyTakeaways: [
      { zh: "分子 (Signal)：企業自由現金流、經審計財報、總經長期結構", en: "Numerator (Signal): Free cash flows, audited filings, macro trends" },
      { zh: "分母 (Noise)：短線猜測、名嘴業配、標題黨情緒煽動", en: "Denominator (Noise): Speculative buzz, pundit hype, clickbait hysteria" },
      { zh: "資訊爆炸本質：分子微幅成長，分母無限放大導致純度崩潰", en: "Core Paradox: Numerator grows linearly; denominator grows exponentially" }
    ],
    visualType: "formula-snr",
    visualData: {
      formula: "SNR = \\frac{P_{\\text{Signal}}}{P_{\\text{Noise}}} = \\frac{\\text{Power of Fundamental Data}}{\\text{Power of Emotional Noise}}",
      ratioChange: {
        before: { signal: 10, noise: 20, snr: "0.50" },
        after: { signal: 20, noise: 1000, snr: "0.02" }
      }
    }
  },
  {
    id: 8,
    hour: 1,
    category: { zh: "報章對照", en: "Media Comparison" },
    tag: { zh: "標題拆解", en: "Clickbait Anatomy" },
    title: {
      zh: "報章雜誌對照：標題黨 (Clickbait) 的情緒拉扯",
      en: "Press Analysis: Clickbait Headlines vs. Objective Signal"
    },
    subtitle: {
      zh: "聳動詞彙旨在刺激大腦杏仁核的恐懼與 FOMO，學會剝離情緒提取純客觀數據",
      en: "Sensationalism Hijacks Your Amygdala; Learn to Strip Emotional Adjectives to Extract Raw Facts"
    },
    teachingCore: {
      zh: "本頁透過真實報章新聞標題對照，展現媒體如何利用驚悚字眼拉扯讀者情緒。雜訊標題常使用「崩盤警告」、「重拳出擊」、「血洗慘劇」等詞彙，目的是刺激讀者的恐懼與 FOMO 心理以獲取點閱率；反觀客觀的 Signal 標題則使用「央行宣佈調整存款準備率 0.25%，旨在引導不動產貸款穩健發展」，精準傳達政策幅度的客觀事實。教師應引導學生學會剝離新聞中的情緒修詞，僅提取核心數據。",
      en: "Contrasts real press headlines to illustrate how sensational editors hijack reader emotions. Noise headlines weaponize words like 'Bloodbath', 'Cataclysmic crash', and 'Doomsday warning' to stimulate fear and FOMO for ad revenue. Conversely, Signal reporting states: 'Central bank raises reserve requirement by 25 bps to guide orderly mortgage expansion.' Instructors must train students to strip away emotional rhetoric and retain only verifiable empirical metrics."
    },
    guidingQuestions: {
      zh: "請學生現場試讀兩組標題：「讀完第一組標題你的身體反應是什麼？讀完第二組你獲得了哪些具體數據？」",
      en: "Reading lab: 'Read these two comparative headlines. What was your visceral gut reaction to the first? What exact quantifiable parameters did you extract from the second?'"
    },
    keyTakeaways: [
      { zh: "雜訊標題特徵：充滿恐懼、貪婪、極端形容詞與問號懸疑", en: "Noise hallmarks: Visceral verbs, catastrophe metaphors, suspense hooks" },
      { zh: "訊號標題特徵：數字精準、政策基點明確、無主觀價值判斷", en: "Signal hallmarks: Exact basis points, audited figures, neutral grammar" },
      { zh: "過濾心法：看到形容詞先刪除，只留下主詞、動詞與客觀數據", en: "Extraction rule: Delete adjectives; isolate subject, verb, and metric" }
    ],
    visualType: "side-by-side-comparison",
    visualData: {
      noiseCard: {
        badge: { zh: "情緒雜訊 (Noise)", en: "Emotional Noise" },
        headline: { zh: "「央行重拳血洗！房貸族哭暈在廁所，房市全面崩盤？！」", en: "'Central Bank Bloodbath! Homeowners In Tears As Housing Collapses?!'" },
        tactic: { zh: "利用「血洗」、「哭暈」、「崩盤」刺激杏仁核恐懼獲取流量", en: "Tactic: Weaponizes apocalyptic verbs to provoke panic clicks" }
      },
      signalCard: {
        badge: { zh: "客觀訊號 (Signal)", en: "Objective Signal" },
        headline: { zh: "「央行決議調升存準率 1 碼，引導房市融資健全發展」", en: "'Central Bank Raises Reserve Requirement 25 bps to Promote Mortgage Stability'" },
        tactic: { zh: "陳述 1 碼 (0.25%) 具體幅度與政策方向，不帶恐慌修飾", en: "Tactic: Delivers exact 25 bps metric without sensational adjectives" }
      }
    }
  },
  {
    id: 9,
    hour: 1,
    category: { zh: "行為財務", en: "Behavioral Finance" },
    tag: { zh: "諾獎理論", en: "Nobel Insight" },
    title: {
      zh: "行為財務學：雜訊交易者風險 (Noise Trader Risk)",
      en: "Behavioral Finance: Noise Trader Risk & Limits to Arbitrage"
    },
    subtitle: {
      zh: "當群體盲從使價格長期嚴重偏離價值，連理性套利者也可能面臨斷頭風險",
      en: "When Herd Irrationality Distorts Prices, Even Rational Arbitrageurs Face Liquidation"
    },
    teachingCore: {
      zh: "本頁解說諾貝爾獎得主 Fischer Black 與 De Long, Shleifer 等人提出的「雜訊交易者模型」。雜訊交易者 (Noise Trader) 指的是不根據企業基本面、而是根據新聞傳言或網紅推薦做出買賣的投資人。當大量雜訊交易者湧入市場時，會使股價長時間嚴重偏離真實價值（形成資產泡沫或恐慌暴跌）。這種偏離甚至連理性套利者 (Rational Arbitrageurs) 也無法及時矯正，因為套利者面臨資產回歸前可能被追加保證金的「雜訊交易者風險」。",
      en: "Details the seminal Noise Trader Model (Fischer Black; De Long, Shleifer, Summers, Waldmann). Noise traders trade on sentiment and unvetted tips rather than fundamental cash flows. When herds aggregate, their irrational momentum drives asset prices far away from intrinsic value. Rational arbitrageurs cannot easily correct this mispricing because they face margin call liquidation risks before fundamentals assert themselves ('Limits to Arbitrage')."
    },
    guidingQuestions: {
      zh: "提問：「為什麼即使你知道某檔熱門股價值嚴重被高估，貿然做空它依然極度危險？這背後的學術原理是什麼？」",
      en: "Key dilemma: 'Why is shorting a meme stock dangerously irrational even when you mathematically prove it is 500% overvalued? What is the academic mechanism?'"
    },
    keyTakeaways: [
      { zh: "雜訊交易者：無基本面支撐、依賴情緒與社群迷因的盲從群體", en: "Noise Traders: Herds trading on social memes rather than balance sheets" },
      { zh: "套利限制 (Limits to Arbitrage)：市場非理性時間可長於你的償債能力", en: "Limits to Arbitrage: Markets can stay irrational longer than you stay solvent" },
      { zh: "防禦策略：不與瘋狂群體對賭，拉長投資窗口等待價值回歸", en: "Defense: Never fight manic mobs; lengthen your horizon for mean reversion" }
    ],
    visualType: "arbitrage-risk",
    visualData: {
      intrinsicLine: { zh: "企業長期真實內在價值", en: "Intrinsic Value Baseline" },
      bubblePath: { zh: "雜訊交易者推升之狂熱泡沫", en: "Noise Trader Bubble Mania" },
      panicPath: { zh: "雜訊交易者恐慌引發之非理性踩踏", en: "Noise Trader Panic Plunge" },
      arbitrageTrap: { zh: "套利者面臨保證金追繳斷頭區間", en: "Arbitrageur Liquidation Trap" }
    }
  },
  {
    id: 10,
    hour: 1,
    category: { zh: "商業模式", en: "Business Model" },
    tag: { zh: "媒體經濟學", en: "Media Economics" },
    title: {
      zh: "財金媒體商業模式解密：點閱率 vs. 真實價值",
      en: "Financial Media Business Models: Ad Clicks vs. True Value"
    },
    subtitle: {
      zh: "免費流量媒體依靠廣告點擊，必然販賣焦慮；付費專業智庫依靠客戶長期信任",
      en: "Free Ad-Driven Outlets Monetize Anxiety; Institutional Terminals Rely on Veracity"
    },
    teachingCore: {
      zh: "本頁剖析財經媒體的商業誘因結構。免費流量媒體的收入完全依賴廣告點擊與贊助業配，其商業模式必然驅使記者產出極端、對立與標題黨內容來吸引眼球；相反地，專業付費機構智庫（如 Bloomberg Terminal、Financial Times 深度報告）的收入來自客戶的高額訂閱費，其商業模式驅使團隊專注於第一手數據查核與嚴謹計量分析。學生必須明白：免費的資訊往往是最昂貴的代價。",
      en: "Dissects media incentive economics. Free mass outlets survive on programmatic ad clicks and sponsored PR. Their bottom line demands high-frequency provocation, outrage, and suspense. In contrast, institutional terminals (Bloomberg, FT Intelligence) generate revenues through enterprise subscriptions ($25k+/yr), incentivizing strict data verification and analytical rigor. Crucial insight: 'Free' information carries the most expensive hidden cost."
    },
    guidingQuestions: {
      zh: "提示學生：「當你免費閱讀一篇財經文章時，你不是顧客，而是被賣給廣告商的產品。我們該如何打破這種免費陷阱？」",
      en: "Guiding maxim: 'When the financial news is free, you are not the customer—your attention is the product sold to sponsors. How do you escape this trap?'"
    },
    keyTakeaways: [
      { zh: "免費媒體模式：點閱率 (Pageviews) ➡️ 廣告分潤 ➡️ 必然販賣恐慌", en: "Free Model: Ad views drive revenues, structurally incentivizing outrage" },
      { zh: "付費智庫模式：高昂年費 ➡️ 數據準確度 ➡️ 長期實證聲譽", en: "Subscription Model: High fee per seat drives data rigor and reputation" },
      { zh: "資訊消費守則：情願為經審計的原始數據付費，拒絕免費二手垃圾", en: "Consumer rule: Invest in primary audited data; reject free secondary noise" }
    ],
    visualType: "business-model-grid",
    visualData: {
      freeModel: {
        name: { zh: "免費流量農場 / 網紅自媒體", en: "Free Clickbait / Influencer Outlets" },
        revenue: { zh: "廣告曝光 / 券商開戶抽佣 / 業配", en: "Banner Ads, Affiliate Churn, Sponsored Hype" },
        incentive: { zh: "標題越驚悚越好、情緒越極端越好", en: "Maximize outrage, hyperbole, and friction" },
        result: { zh: "產出大量低品質資訊垃圾 (Lemons)", en: "Floods the ecosystem with noise and lemons" }
      },
      paidModel: {
        name: { zh: "機構智庫 / 專業終端機 (Bloomberg/FT)", en: "Institutional Terminals & Intel Services" },
        revenue: { zh: "企業機構高額訂閱年費 ($25,000+)", en: "High-ticket institutional enterprise contracts" },
        incentive: { zh: "數據精準度、事實查核、經得起檢驗", en: "Data veracity, audited math, fiduciary trust" },
        result: { zh: "提供高純度學術與產業實質 Signal", en: "Delivers clean, actionable economic signals" }
      }
    }
  },

  // ===================== 第二小時 (Slide 11 - 20) =====================
  {
    id: 11,
    hour: 2,
    category: { zh: "認知心理", en: "Cognitive Psychology" },
    tag: { zh: "框架理論", en: "Framing Theory" },
    title: {
      zh: "認知心理學：框架效應 (Framing Effect) 概念",
      en: "Cognitive Psychology: Framing Effect & Decision Distortion"
    },
    subtitle: {
      zh: "同一個客觀經濟數據，包裹在不同語境框架下，將徹底扭轉受眾的風險偏好",
      en: "Identical Objective Data Yields Opposite Risk Choices Under Different Framing Narratives"
    },
    teachingCore: {
      zh: "進入第二小時，本頁介紹諾貝爾經濟學獎得主 Kahneman & Tversky 的行為經濟學核心理論——框架效應 (Framing Effect)。研究證明，同一個客觀經濟數據，當以「損失/恐慌框架」或「收益/理性框架」呈現時，會引發人們完全不同的風險偏好。在新聞實務中，媒體常透過特定文字框架引導讀者產生預期的情緒反應。",
      en: "Initiating Hour 2 with Kahneman & Tversky's behavioral economics classic: the Framing Effect. Research proves that identical quantitative realities evoke diametrically opposed risk behaviors depending on whether they are framed as 'Losses/Catastrophe' or 'Gains/Rational Calibrations'. Financial editors masterfully deploy contextual anchors to manipulate market sentiment."
    },
    guidingQuestions: {
      zh: "提問：「如果醫生告訴你這項手術有 90% 的成功率，與告訴你有 10% 的死亡率，你的感覺有何不同？這在財經新聞中是如何被運用的？」",
      en: "Classic medical puzzle: 'If a doctor states a surgery has a 90% survival rate vs. a 10% mortality rate, how does your anxiety shift? How does financial news exploit this exact psychological quirk?'"
    },
    keyTakeaways: [
      { zh: "損失趨避 (Loss Aversion)：人類對損失的痛苦感受遠大於同等收益", en: "Loss Aversion: The psychological pain of loss is 2-2.5x greater than gain" },
      { zh: "框架操控：媒體可輕易將中性數據包裝為末日警鐘或大牛市奇蹟", en: "Framing Manipulation: Neutral statistics wrapped into doomsday or euphoria" },
      { zh: "心智防禦：閱讀新聞時主動轉換正反框架，測試自我心理反應", en: "Cognitive Defense: Invert the headline frame to neutralize bias" }
    ],
    visualType: "framing-concept",
    visualData: {
      core: { zh: "客觀事實數據：某股票回檔 1.5%", en: "Objective Fact: Stock Dips 1.5%" },
      frameA: { label: { zh: "恐慌框架 (Loss Frame)", en: "Catastrophic Frame" }, text: { zh: "「狂瀉崩盤，投資人血本無歸！」", en: "'Crash! Investors Suffer Massive Losses!'" }, reaction: { zh: "刺激大腦恐慌拋售", en: "Triggers panic liquidation" } },
      frameB: { label: { zh: "理性框架 (Value Frame)", en: "Valuation Frame" }, text: { zh: "「健康回檔整理，本益比回歸常態」", en: "'Healthy Correction, Valuation Restores'" }, reaction: { zh: "引導冷靜理性估值", en: "Fosters disciplined rebalancing" } }
    }
  },
  {
    id: 12,
    hour: 2,
    category: { zh: "新聞對照", en: "Case Comparison" },
    tag: { zh: "實戰拆解", en: "Real Case Deconstruction" },
    title: {
      zh: "新聞對照案例：「美股暴跌」 vs. 「健康修正」",
      en: "Case Study: 'Market Crash Panic' vs. 'Healthy Valuation Correction'"
    },
    subtitle: {
      zh: "標普 500 指數下挫 1.5% 的完全相同數據，引爆散戶恐慌拋售 vs. 長線買點佈局",
      en: "Identical -1.5% S&P 500 Retracement: Retail Panic Dumping vs. Institutional Accumulation"
    },
    teachingCore: {
      zh: "本頁透過實證新聞案例深化框架效應的理解。當美股標普 500 指數下挫 1.5% 時，恐慌框架新聞標題會寫成「標普重挫，VIX 飆升，投資人血本無歸！」，激發讀者的損失趨避 (Loss Aversion) 心理，促使散戶在市場低點恐慌拋售；而理性估值框架標題則寫成「標普指數健康回檔 1.5%，基於歷史本益比均值，長線買點浮現」，引導讀者關注企業內在價值與合理資產配置。",
      en: "Deepens understanding via actual market coverage. Following a routine 1.5% dip in the S&P 500, a panic-framed outlet screams: 'S&P Plunges, VIX Surges, Wall Street Wiped Out!', triggering acute loss aversion and driving retail panic selling at the bottom. A fundamental analysis outlet writes: 'S&P 500 Consolidates 1.5%, Forward P/E Realignment Offers Long-Term Valuation Window'. Identical numbers; inverted investor outcomes."
    },
    guidingQuestions: {
      zh: "要求學生分析：「這兩份報導引用的股市跌幅數據完全相同，但為什麼讀完後的行為選擇會完全相反？」",
      en: "Analytical task: 'Both articles quote the exact same -1.5% figure. Why do their target audiences enact opposite market behaviors?'"
    },
    keyTakeaways: [
      { zh: "數據完全相同，但引發的行為模式徹底對立", en: "Identical empirical data produces diametrically opposed actions" },
      { zh: "恐慌框架誘導散戶在波段最低點割肉離場", en: "Panic frames lure retail into selling at cyclical troughs" },
      { zh: "學術訓練：閱讀時過濾修飾詞，只保留「跌幅 1.5%、本益比區間」", en: "Training: Redact all rhetorical flourishes; evaluate only P/E and metrics" }
    ],
    visualType: "case-framing-cards",
    visualData: {
      event: { zh: "事件：標普 500 指數單日下跌 1.52%", en: "Event: S&P 500 Drops 1.52% in Single Session" },
      sampleA: {
        title: { zh: "媒體 A（點閱流量導向）", en: "Outlet A (Ad Clickbait)" },
        headline: { zh: "「黑色恐怖重現！標普巨震暴跌，散戶哀鴻遍野，快逃！」", en: "'Black Friday Terror! S&P Crashes, Retail Screams, Run for Your Lives!'" },
        focus: { zh: "聚焦虧損數字、恐慌形容詞、煽動集體踩踏", en: "Focuses on total dollar loss, emotional despair, inciting panic" }
      },
      sampleB: {
        title: { zh: "媒體 B（實證研究導向）", en: "Outlet B (Institutional Research)" },
        headline: { zh: "「標普健康修正 1.5%，估值回測 50 日均線，支撐力道浮現」", en: "'S&P Healthy Pullback of 1.5% Tests 50-Day Moving Average Support'" },
        focus: { zh: "聚焦均線支撐、本益比常態區間、歷史回測數據", en: "Focuses on technical support levels, historical P/E bands, mean reversion" }
      }
    }
  },
  {
    id: 13,
    hour: 2,
    category: { zh: "經濟學經典", en: "Economics Classic" },
    tag: { zh: "檸檬市場", en: "Lemons Market" },
    title: {
      zh: "資訊不對稱 (Information Asymmetry) 檸檬市場",
      en: "Information Asymmetry: Akerlof's Lemons Market in Media"
    },
    subtitle: {
      zh: "高品質查核新聞成本高昂，在免費流量戰中劣幣驅逐良幣，充斥低劣檸檬",
      en: "High-Cost Investigative Journalism Is Crowded Out by Zero-Cost Clickbait Lemons"
    },
    teachingCore: {
      zh: "本頁探討諾貝爾獎得主 George Akerlof 的檸檬市場 (Lemons Market) 理論在財經媒體的延伸。在資訊高度不對稱的傳播市場中，高品質、高成本的事實查核新聞，在流量爭奪戰中往往敵不過低成本、聳動爆料的劣質新聞（檸檬）。長此以往，市場將出現「劣幣驅逐良幣」的惡性循環，優秀的財經記者被迫離開，留下充斥噪音的媒體環境。",
      en: "Applies Nobel laureate George Akerlof's Lemons Market theorem to financial media. In an asymmetrical marketplace, rigorous, expensive fact-checking struggles to compete against low-cost, sensationalized garbage ('lemons') optimized purely for algorithms. Over time, Bad Money drives out Good (Gresham's Law): serious investigative journalists depart, leaving a degraded media landscape saturated by toxic noise."
    },
    guidingQuestions: {
      zh: "提問：「作為資訊消費者，我們有什麼主動選擇可以支持優質媒體，避免讓財經新聞市場變成檸檬市場？」",
      en: "Consumer sovereignty: 'As information consumers, what deliberate behavioral choices can we make to support rigorous journalism and halt the lemons cascade?'"
    },
    keyTakeaways: [
      { zh: "優質新聞高成本：深度查核、訪談、多方審計需要巨大時間與資金", en: "Quality costs: Rigorous auditing and fieldwork require massive capital" },
      { zh: "檸檬新聞零成本：抄襲、洗稿、下聳動標題只需 30 秒", en: "Lemon costs zero: Copy-pasting AI summaries takes 30 seconds" },
      { zh: "市場失靈：讀者不願付費導致優質媒體萎縮，噪音充斥", en: "Market failure: Reluctance to pay drives good reporters out of business" }
    ],
    visualType: "lemon-market-diagram",
    visualData: {
      peach: { name: { zh: "水蜜桃 (優質新聞 Peach)", en: "The Peach (Verified Signal)" }, cost: { zh: "成本高昂 / 查核嚴謹", en: "High Cost / Strict Audit" }, fate: { zh: "因點閱率偏低而逐漸萎縮", en: "Suffocated by algorithmic low clicks" } },
      lemon: { name: { zh: "檸檬 (劣質雜訊 Lemon)", en: "The Lemon (Trash Clickbait)" }, cost: { zh: "零成本 / AI 粗製濫造", en: "Zero Cost / AI Hallucination" }, fate: { zh: "充斥市場，劣幣驅逐良幣", en: "Dominates feeds via sensational clickbait" } }
    }
  },
  {
    id: 14,
    hour: 2,
    category: { zh: "金融防詐", en: "Fraud Defense" },
    tag: { zh: "詐騙劇本", en: "Scam Playbook" },
    title: {
      zh: "社群媒體飆股簡訊與三部曲詐騙劇本",
      en: "Social Media Pump-and-Dump & 4-Stage Investment Fraud Scripts"
    },
    subtitle: {
      zh: "偽造權威 ➡️ 保證暴利 ➡️ 封閉洗腦 ➡️ 仙股收割斷聯；全方位解密暗樁套路",
      en: "Fake Authority ➡️ Guaranteed Profit ➡️ Closed Cult Indoctrination ➡️ Rug-Pull Liquidation"
    },
    teachingCore: {
      zh: "本頁詳細拆解 2026 年最新的金融詐騙手法。詐騙集團通常遵循四步驟劇本：1. 偽造權威（盜用知名財經學者或企業家照片成立假社團）；2. 零風險暴利噱頭（宣稱跟著老師買保證週報酬 20%）；3. 封閉群組洗腦（拉入 LINE 群組安排暗樁發布假獲利截圖）；4. 資金收割與斷聯（誘騙購買低流動性仙股或假加密貨幣後 Pump & Dump 封鎖）。",
      en: "Deconstructs the four-stage modern financial scam playbook: 1. Fabricate Authority (hijacking photos of renowned professors or founders); 2. Zero-Risk Super Profits ('Guaranteed 20% weekly return with our quant bot'); 3. Closed-Group Indoctrination (adding victims to private LINE/Telegram channels with shills posting forged profits); 4. Pump & Dump Rug-Pull (dumping illiquid penny stocks or phantom crypto before disappearing)."
    },
    guidingQuestions: {
      zh: "請學生分享：「你或你的家人是否曾收到過這類飆股簡訊或 LINE 邀請？我們該如何幫家人建立防詐免疫力？」",
      en: "Classroom sharing: 'Have you or your relatives received unsolicited stock-picking SMS or LINE group invites? How do we build structural fraud immunity for our families?'"
    },
    keyTakeaways: [
      { zh: "第一步：盜用名人肖像（張忠謀、巴菲特、知名財經名嘴）", en: "Stage 1: Identity Theft of prominent figures (Buffett, Morris Chang)" },
      { zh: "第二步：保證獲利必有詐，實體金融從不存在「穩賺不賠」", en: "Stage 2: 'Guaranteed high yield' is the universal mathematical marker of fraud" },
      { zh: "第三步：群組內暗樁製造 FOMO，誘騙至假交易平臺出金不能", en: "Stage 3: Shills fabricate peer FOMO, directing victims to unvetted apps" }
    ],
    visualType: "scam-playbook-steps",
    visualData: {
      steps: [
        { num: "01", name: { zh: "偽造權威", en: "Fabricate Authority" }, desc: { zh: "盜用知名學者/名嘴頭像成立免費教學社群", en: "Hijack executive or celebrity likeness" } },
        { num: "02", name: { zh: "暴利噱頭", en: "Guaranteed Profit" }, desc: { zh: "「內線標的、保證週報酬20%、名額有限」", en: "Touts 20% weekly risk-free yields" } },
        { num: "03", name: { zh: "封閉洗腦", en: "Cult Conditioning" }, desc: { zh: "加入私密 LINE 群，暗樁狂發假獲利感謝圖", en: "Private chat rooms with fake profit receipts" } },
        { num: "04", name: { zh: "殺豬收割", en: "Pump & Dump" }, desc: { zh: "誘騙下單低流動性港仙股或出金封鎖", en: "Liquidity rug-pull or blocked withdrawals" } }
      ]
    }
  },
  {
    id: 15,
    hour: 2,
    category: { zh: "前沿威脅", en: "Frontier Threats" },
    tag: { zh: "AI 偽造", en: "Deepfake Security" },
    title: {
      zh: "前沿威脅：Deepfake 語音複製與 AI 假新聞",
      en: "Frontier Threats: Deepfake Voice Clones & Generative AI Fake News"
    },
    subtitle: {
      zh: "五角大廈爆炸假圖引發演算法百億蒸發，眼見耳聽皆非真，多管道交叉查核",
      en: "Fake Pentagon Blast Wipes Out $50B in Minutes; Multi-Channel Verification Is Mandatory"
    },
    teachingCore: {
      zh: "本頁探討生成式 AI 技術帶來的最新金融安全威脅。案例一：網路上曾出現 AI 生成的「五角大廈遭襲擊假照片」，推特大量轉發後引發演算法高頻交易賣盤，導致美股標普 500 指數在 10 分鐘內瞬間蒸發 500 億美元市值；案例二：詐騙集團複製企業 CEO 聲音，電話指示財務主管進行緊急跨國轉帳。防禦核心在於建立「多管道獨立交叉驗證 (Cross-Channel Verification)」機制。",
      en: "Investigates cutting-edge threats from multimodal generative AI. Case 1: An AI-generated synthetic image depicting a 'Pentagon explosion' went viral on Twitter, instantly triggering high-frequency algorithmic sell programs that vaporized $50 billion in S&P 500 market cap in under 10 minutes. Case 2: Deepfake voice cloning simulating enterprise CEOs ordering emergency wire transfers. Multi-channel, out-of-band verification is non-negotiable."
    },
    guidingQuestions: {
      zh: "提問：「當連眼見與耳聽都不能為實的時候，我們在做任何重大財務匯款或投資決策前，必須執行哪些驗證步驟？」",
      en: "Verification prompt: 'When seeing and hearing are no longer believing, what verifiable verification protocols must be executed prior to any wire transfer or capital allocation?'"
    },
    keyTakeaways: [
      { zh: "AI 假照片威力：觸發演算法交易高頻掃單，瞬間抹殺數百億市值", en: "Viral AI hoaxes trigger algorithmic cascades, wiping out billions" },
      { zh: "語音複製威脅：短短 3 秒音檔即可克隆家人或主管指示匯款", en: "Voice cloning requires only 3 seconds of sample audio to fake a wire request" },
      { zh: "防禦核心：絕不依賴單一通訊軟體，務必使用雙向離線安全碼查證", en: "Golden Rule: Always verify out-of-band through offline protocols" }
    ],
    visualType: "deepfake-threats",
    visualData: {
      caseA: {
        title: { zh: "案例一：五角大廈襲擊 AI 假圖事件", en: "Case 1: Pentagon Attack AI Hoax" },
        impact: { zh: "美股標普 500 指數 10 分鐘蒸發 500 億美元", en: "$50 Billion erased in 10 minutes by trading algos" },
        lesson: { zh: "高頻演算法只看社群文字，假新聞能瞬間引發流動性真空", en: "NLP bots trade raw tweets; hoaxes cause instant liquidity vacuums" }
      },
      caseB: {
        title: { zh: "案例二：跨國企業 CEO 語音克隆詐騙", en: "Case 2: CEO Deepfake Voice Wire Fraud" },
        impact: { zh: "財務長聽信擬真電話指示，轉出 2,500 萬美元", en: "CFO fooled by voice clone, wiring $25 million abroad" },
        lesson: { zh: "任何大額財務操作必須採用雙人雙重離線簽核", en: "Critical transfers require two-person offline cryptographic auth" }
      }
    }
  },
  {
    id: 16,
    hour: 2,
    category: { zh: "計量實證", en: "Econometrics" },
    tag: { zh: "情緒指數", en: "Sentiment vs VIX" },
    title: {
      zh: "計量實證：新聞情緒指數 (Sentiment Index) 與 VIX",
      en: "Financial Econometrics: Media Sentiment Index vs. VIX Fear Gauge"
    },
    subtitle: {
      zh: "新聞負面情緒詞彙與 VIX 恐慌指數相關係數達 0.82，但 5 日內均值回歸達 78%",
      en: "Media Negative Sentiment Correlates 0.82 with VIX, Yet 78% Mean-Reverts Within 5 Days"
    },
    teachingCore: {
      zh: "本頁展示金融計量學大數據實證研究。學者運用自然語言處理 (NLP) 分析數萬篇財經報導，計算新聞文字中的負面情緒詞彙密度（如 Crash, Panic, Crisis），發現新聞情緒指數與市場恐慌指數 (VIX) 的相關係數高達 0.82。然而計量模型同時證實：由媒體情緒引發的短線劇烈波動，在 5 個交易日之內平均存在 78% 的均值回歸 (Mean Reversion) 修復特性。",
      en: "Presents quantitative NLP research in empirical asset pricing. Textual algorithms mining tens of thousands of financial news articles calculate negative lexical density ('Crisis', 'Collapse', 'Carnage'). The News Sentiment Index exhibits an astonishing 0.82 correlation with the VIX Fear Gauge. Crucially, econometric regressions prove that short-term shocks driven by media hysteria experience a 78% Mean Reversion within 5 trading sessions."
    },
    guidingQuestions: {
      zh: "引導學生解讀數據：「0.82 的高相關性告訴我們媒體情緒會影響股市，但 78% 的均值回歸又給了理性投資人什麼樣的機會？」",
      en: "Data synthesis: 'A 0.82 correlation confirms news rhetoric dictates short-term volatility, but what strategic opportunity does the 78% 5-day mean reversion offer rational investors?'"
    },
    keyTakeaways: [
      { zh: "相關係數 r = 0.82：媒體情緒與市場短期恐慌呈現高度同步", en: "Correlation r = 0.82: Media vocabulary tightly tracks immediate fear spikes" },
      { zh: "78% 均值回歸：情緒性超跌在 5 個交易日內大幅修復", en: "78% Mean Reversion: Emotionally driven crashes repair within 5 sessions" },
      { zh: "策略啟示：不要在新聞情緒最恐慌的當下拋售，等待理性買盤進場", en: "Tactical takeaway: Never liquidate into peak media panic; let algos settle" }
    ],
    visualType: "sentiment-vix-chart",
    visualData: {
      metricA: { val: "0.82", label: { zh: "新聞負面詞彙與 VIX 相關係數", en: "Correlation: Sentiment vs VIX" } },
      metricB: { val: "78%", label: { zh: "情緒引發超跌 5 日內均值回歸機率", en: "5-Day Mean Reversion Probability" } }
    }
  },
  {
    id: 17,
    hour: 2,
    category: { zh: "實證數據", en: "Empirical Evidence" },
    tag: { zh: "均值回歸", en: "Mean Reversion" },
    title: {
      zh: "實證數據：恐慌拋售中的均值回歸 (Mean Reversion)",
      en: "Empirical Evidence: Mean Reversion in Market Overreaction"
    },
    subtitle: {
      zh: "散戶過度反應造成價格跌破內在價值，審計數據揭露後理性買盤修復定價",
      en: "Retail Overreaction Drives Prices Below Intrinsic Value; Audited Facts Restore Equilibrium"
    },
    teachingCore: {
      zh: "本頁深入解說資產價格的均值回歸機制。當市場突發極端負面新聞時，散戶的恐慌性過度反應 (Market Overreaction) 會使股價在數小時內被大幅低估，跌破內在價值線；然而隨著時間推移，第一手審計數據與公司重訊公佈，理性機構買盤進場，價格會重新修正並回歸內在價值。理解均值回歸能幫助投資人在市場大跌時保持冷靜。",
      en: "Explores the fundamental mechanics of Mean Reversion. When an unexpected negative headline erupts, retail panic overreaction depresses asset prices well below intrinsic discounted cash flow baselines. As time unfolds and primary audited filings emerge, institutional liquidity steps in, pulling valuations back to equilibrium. Internalizing mean reversion inoculates investors against panic-selling bottoms."
    },
    guidingQuestions: {
      zh: "提問：「為什麼巴菲特說『在別人恐慌時我貪婪』？這句話背後的計量學依據是不是就是均值回歸？」",
      en: "Buffett inquiry: 'Why did Warren Buffett advise to be greedy when others are fearful? Isn't the quantitative bedrock of this wisdom precisely Mean Reversion?'"
    },
    keyTakeaways: [
      { zh: "市場過度反應 (Overreaction)：情緒驅使價格短期嚴重偏離常態", en: "Market Overreaction: Raw emotion disconnects price from fundamental value" },
      { zh: "內在價值地心引力：長期股價終將向自由現金流均值靠攏", en: "Intrinsic Gravity: Long-term prices inevitably anchor to audited cash flows" },
      { zh: "紀律勝於預測：在市場極端情緒共振時，檢視企業資產負債表", en: "Discipline over forecast: When headlines scream, read balance sheets" }
    ],
    visualType: "mean-reversion-curve",
    visualData: {
      phases: [
        { name: { zh: "階段 1: 突發驚悚新聞", en: "Phase 1: Breaking Shock" }, desc: { zh: "媒體鋪天蓋地渲染末日", en: "Media screams catastrophic collapse" } },
        { name: { zh: "階段 2: 恐慌過度下殺", en: "Phase 2: Overshoot Bottom" }, desc: { zh: "散戶割肉，價格跌破內在價值線", en: "Retail capitulation dips below value line" } },
        { name: { zh: "階段 3: 理性均值回歸", en: "Phase 3: Mean Reversion" }, desc: { zh: "審計公告闢謠，機構進場修復估值", en: "Audited filings clarify; institutions rebalance" } }
      ]
    }
  },
  {
    id: 18,
    hour: 2,
    category: { zh: "專業工具", en: "Professional Tools" },
    tag: { zh: "核心法則", en: "Core Method" },
    title: {
      zh: "專業過濾器：4D Filter 核心法則",
      en: "Professional Toolkit: The 4D Filter Methodology"
    },
    subtitle: {
      zh: "Data (數據) ‧ Disclosure (利益) ‧ Divergence (多元) ‧ Duration (時間軸)",
      en: "Data (Verification) ‧ Disclosure (Conflicts) ‧ Divergence (Perspectives) ‧ Duration (Horizons)"
    },
    teachingCore: {
      zh: "本頁介紹本課程最核心的實用工具——4D Filter 資訊過濾法則。4D 代表：1. Data (數據驗證：是否有公開財報或審計數據支撐？)；2. Disclosure (利益揭露：作者是否持股或存在贊助關係？)；3. Divergence (立場多樣：是否有對立權威觀點？)；4. Duration (時間軸評估：是短線情緒雜訊還是長線現金流改變？)。掌握 4D Filter 能讓學生秒懂新聞真偽。",
      en: "Presents the foundational analytical tool of this entire curriculum: The 4D Filter Framework. 4D encompasses: 1. Data (Is the claim grounded in audited filings or primary regulatory statistics?); 2. Disclosure (Are there hidden conflicts of interest or undisclosed affiliate kickbacks?); 3. Divergence (What are contrary institutional counter-arguments?); 4. Duration (Is this temporary sentiment or a permanent structural shift in free cash flow?). Master the 4D Filter to immunize your portfolio."
    },
    guidingQuestions: {
      zh: "帶領學生朗讀 4D 口訣，並強調：「以後看到任何財經新聞，先在腦海中跑一遍這 4 個 D，你就不會成為被割的韭菜。」",
      en: "Student drill: 'Recite the 4D mantra. Before acting on any breaking news, run it through Data, Disclosure, Divergence, and Duration to avoid becoming retail exit liquidity.'"
    },
    keyTakeaways: [
      { zh: "D1 - Data (30%)：查核官方第一手審計報表與原始數據源", en: "D1 - Data (30%): Audit against primary filings (MOPS/SEC/FRED)" },
      { zh: "D2 - Disclosure (20%)：檢視分析師持股、券商開戶分潤與業配利益", en: "D2 - Disclosure (20%): Verify author positions and sponsorship incentives" },
      { zh: "D3 - Divergence (25%)：強制搜尋反方觀點，打破演算法同溫層偏見", en: "D3 - Divergence (25%): Seek contradictory research to smash echo chambers" },
      { zh: "D4 - Duration (25%)：區分 24 小時短線情緒波動 vs 3 年產業趨勢", en: "D4 - Duration (25%): Contrast 24-hour sentiment against 3-year cash flows" }
    ],
    visualType: "4d-matrix",
    visualData: {
      pillars: [
        { code: "D1", name: "Data 數據驗證", en: "Data Audit", weight: "30%", question: { zh: "有審計財報或官方公告佐證嗎？", en: "Is there primary audited data backing this?" } },
        { code: "D2", name: "Disclosure 利益揭露", en: "Conflict Disclosure", weight: "20%", question: { zh: "作者或媒體持股、贊助關係為何？", en: "Does the author hold shares or affiliate deals?" } },
        { code: "D3", name: "Divergence 立場多樣", en: "View Divergence", weight: "25%", question: { zh: "對立機構的研究報告怎麼說？", en: "What do opposing institutional reports argue?" } },
        { code: "D4", name: "Duration 時間維度", en: "Time Horizon", weight: "25%", question: { zh: "是當日波動還是 3 年實質現金流？", en: "Is this daily buzz or multi-year structural cash flow?" } }
      ]
    }
  },
  {
    id: 19,
    hour: 2,
    category: { zh: "事實查核", en: "Fact Checking" },
    tag: { zh: "權威數據源", en: "Primary Sources" },
    title: {
      zh: "事實查核：四大權威數據源 (MOPS/SEC/CBC/TWSE)",
      en: "Fact Checking: Four Authoritative Financial Data Hubs"
    },
    subtitle: {
      zh: "台灣公開資訊觀測站 ‧ 美國 SEC EDGAR ‧ 中央銀行/聯準會 ‧ 證交所/FRED",
      en: "Taiwan MOPS ‧ US SEC EDGAR ‧ Central Banks (CBC/Fed) ‧ Exchanges & FRED"
    },
    teachingCore: {
      zh: "本頁列出學術與實務界認可的四大官方第一手數據庫，作為 4D Filter 中 Data 驗證的工具箱。1. 上市公司申報：台灣公開資訊觀測站 (MOPS) / 美國 SEC EDGAR；2. 貨幣政策：台灣中央銀行 (CBC) / 美國聯準會 (Fed) 白皮書；3. 市場數據：台灣證券交易所 (TWSE) / 美國 FRED 總體經濟資料庫；4. 國際展望：IMF / World Bank / OECD 官方報告。",
      en: "Inventories the Four Golden Primary Financial Hubs for empirical Data verification: 1. Corporate Filings: Taiwan Market Observation Post System (MOPS) & US SEC EDGAR; 2. Monetary Policy: Central Bank of the Republic of China (CBC) & Federal Reserve Whitepapers; 3. Market & Macro Data: Taiwan Stock Exchange (TWSE) & St. Louis FRED; 4. Multilateral Outlook: IMF, World Bank, and OECD research repositories."
    },
    guidingQuestions: {
      zh: "說明：「遇到任何爭議新聞，不要聽名嘴各說各話，直接連上這四大官網下載 CSV 或 PDF 原始檔，答案一目瞭然。」",
      en: "Actionable command: 'When conflicting reports swirl, bypass pundit talking heads. Navigate straight to these four repositories and inspect the raw CSV or 10-K PDF. Facts reside there.'"
    },
    keyTakeaways: [
      { zh: "MOPS 公開資訊觀測站：上市公司重大訊息與財務審計報告官方權威", en: "MOPS: The ultimate legal baseline for Taiwan disclosures and audited statements" },
      { zh: "SEC EDGAR：美股 10-K 年報與 8-K 重訊的法定義務申報處", en: "SEC EDGAR: Statutory 10-K and 8-K repository for US-listed corporations" },
      { zh: "CBC & Fed 官網：央行利率決議與貨幣政策白皮書第一手出處", en: "Central Banks (CBC/Fed): Primary communiques on discount rates and liquidity" },
      { zh: "TWSE & FRED：免費用於驗證歷史交易、殖利率與總經指標的數據庫", en: "TWSE & FRED: Free institutional databases for historical yields and indicators" }
    ],
    visualType: "four-sources-grid",
    visualData: {
      sources: [
        { name: "MOPS 公開資訊觀測站", en: "Taiwan MOPS", url: "https://mops.twse.com.tw", focus: { zh: "上市公司審計財報、法說會簡報、重大訊息澄清", en: "Audited earnings, earnings calls, major clarification notices" } },
        { name: "SEC EDGAR", en: "US SEC EDGAR", url: "https://www.sec.gov/edgar", focus: { zh: "美股 10-K 年度報告、10-Q 季度報告、內部人持股申報", en: "Annual 10-K, quarterly 10-Q, insider Form 4 trades" } },
        { name: "中央銀行 / 美聯儲 Fed", en: "CBC & Fed", url: "https://www.cbc.gov.tw", focus: { zh: "利率決議聲明、存準率調整、央行理事會議事錄摘要", en: "Discount rate changes, reserve ratios, meeting minutes" } },
        { name: "TWSE & FRED 資料庫", en: "TWSE & St. Louis FRED", url: "https://fred.stlouisfed.org", focus: { zh: "殖利率曲線、CPI/PCE 通膨率、外資三大法人每日買賣超", en: "Yield curves, CPI inflation, institutional net flows" } }
      ]
    }
  },
  {
    id: 20,
    hour: 2,
    category: { zh: "資訊健檢", en: "Information Hygiene" },
    tag: { zh: "飲食盤點", en: "Diet Audit" },
    title: {
      zh: "個人資訊飲食 (Media Diet) 健檢架構",
      en: "Information Hygiene: Personal Financial Media Diet Audit"
    },
    subtitle: {
      zh: "大腦吸收垃圾雜訊會讓錢包生病，三大反思檢視你每天的資訊營養純度",
      en: "Junk Media Sickens Your Wealth; Three Diagnostic Checks on Your Daily Intellectual Nutrition"
    },
    teachingCore: {
      zh: "本頁為第二小時進行統整，提供個人財經資訊飲食健檢的三大反思問題：1. 我每天花在標題黨與短影音的時間，是否遠多於閱讀官方財報與經濟報告？2. 我訂閱的財經頻道，是否都在使用激進情緒詞彙刺激我的神經？3. 我上次自己下載 CSV 數據做驗證是什麼時候？引導學生建立健康的資訊攝取習慣。",
      en: "Consolidates Hour 2 with a Personal Financial Media Diet Health Audit centered on three diagnostic queries: 1. Do I spend more daily hours consuming influencer shorts and clickbait than reading primary filings and whitepapers? 2. Do my subscribed feeds use visceral hyperbole to keep me on edge? 3. When did I last download raw CSV data to conduct my own verification? Inoculate your intellectual diet."
    },
    guidingQuestions: {
      zh: "提示：「就像身體吃垃圾食物會生病一樣，大腦長期吸食垃圾雜訊也會讓你的錢包生病。現在就是進行資訊大掃除的最佳時機。」",
      en: "Physical analogy: 'Just as ultra-processed junk food destroys biological health, chronic ingestion of garbage clickbait destroys financial vitality. Conduct an intellectual detox today.'"
    },
    keyTakeaways: [
      { zh: "檢驗 1：短影音時間 vs 原始財報時間比率是否失衡？", en: "Audit 1: Is your short-video ratio suffocating primary filing study?" },
      { zh: "檢驗 2：訂閱清單是否充滿「必看、血虧、暴賺」情緒毒藥？", en: "Audit 2: Are your notifications flooded with toxic adrenaline triggers?" },
      { zh: "檢驗 3：是否具備主動下載 CSV / 查核原文的求證肌肉記憶？", en: "Audit 3: Do you possess the reflexive muscle to inspect raw CSVs?" }
    ],
    visualType: "diet-audit-triad",
    visualData: {
      checks: [
        { q: { zh: "問題 1：時間分配", en: "Question 1: Allocation" }, text: { zh: "我每天花在短影音與社群的時間，是否超過閱讀官方報告？", en: "Do I spend more time on feeds than primary audited documents?" } },
        { q: { zh: "問題 2：情緒中毒", en: "Question 2: Emotional Charge" }, text: { zh: "我追蹤的名嘴頻道是否持續製造 FOMO 與恐慌焦慮？", en: "Do my bookmarked channels deliberately stoke FOMO and panic?" } },
        { q: { zh: "問題 3：驗證習慣", en: "Question 3: Verification Muscle" }, text: { zh: "過去一個月內，我是否曾親自去 MOPS 或 FRED 下載原始數據？", en: "In the past 30 days, did I personally pull raw data from MOPS/FRED?" } }
      ]
    }
  },

  // ===================== 第三小時 (Slide 21 - 30) =====================
  {
    id: 21,
    hour: 3,
    category: { zh: "數據質疑", en: "Data Skepticism" },
    tag: { zh: "二次驗證", en: "Cross-Verification" },
    title: {
      zh: "數據質疑精神：對權威新聞進行二次交叉驗證",
      en: "Data Skepticism: Rigorous Secondary Cross-Verification of News"
    },
    subtitle: {
      zh: "主流權威媒體亦可能誤讀財報或混淆 YoY/QoQ，堅持向 Raw Data 原始檔核對",
      en: "Prestigious Press Outlets Frequently Misread Filings or Confuse YoY/QoQ; Audit Raw Data"
    },
    teachingCore: {
      zh: "進入第三小時，本頁強調數據質疑精神 (Data Skepticism)。即使是華爾街日報或路透社等主流權威媒體，也可能因非財會背景記者誤讀法說會簡報，或引用錯誤的第三方機構預估值而出錯（例如混淆 YoY 營收成長與 QoQ 季節性下滑，或把非經常性業外損益當作本業利潤）。學生必須養成向 Raw Data 原始資料進行二次交叉驗證的習慣。",
      en: "Kicking off Hour 3 by instilling healthy Data Skepticism. Even tier-one publications (WSJ, Reuters) are vulnerable to non-CPA reporters misinterpreting guidance or citing unvetted estimates. Common traps include confounding YoY expansion with QoQ seasonal dips, or mistaking one-off non-operating land sales for recurring operational margins. Independent secondary cross-verification against raw regulatory tables is mandatory."
    },
    guidingQuestions: {
      zh: "提問：「如果權威媒體報導某公司今年大賺一個股本，我們可以直接相信嗎？應該去哪裡確認這個數字是否包含賣土地的一時收益？」",
      en: "Financial inquiry: 'If an elite outlet screams that a company earned an entire share of capital this year, can we accept it as face value? Where do we verify if this was driven by one-time asset sales?'"
    },
    keyTakeaways: [
      { zh: "權威不等於真理：主流外電記者同樣可能出現財會解讀錯誤", en: "Authority ≠ Absolute Truth: Tier-1 journalists misread financial footnotes" },
      { zh: "常見迷思：混淆 YoY (年增) 與 QoQ (季減)，誤把業外當本業", en: "Common Blunders: Conflating YoY vs QoQ, mistaking one-off gains for core profit" },
      { zh: "解決方案：以企業在證券監管機構上傳的原始 PDF 為唯一裁判", en: "Protocol: Treat regulatory SEC/MOPS statutory filings as the sole arbiter" }
    ],
    visualType: "skepticism-framework",
    visualData: {
      pitfalls: [
        { label: { zh: "陷阱 1: YoY vs QoQ 錯覺", en: "Trap 1: YoY vs QoQ Illusion" }, desc: { zh: "媒體寫「營收暴跌 20%」，其實只是常態淡季 QoQ 下滑，YoY 實為成長 15%", en: "Headline screams 'Revenue crashes 20%', ignoring normal Q1 seasonality while YoY grew 15%" } },
        { label: { zh: "陷阱 2: 業外土地處分灌水", en: "Trap 2: One-Off Non-Operating Gains" }, desc: { zh: "媒體寫「EPS 創歷史新高」，翻看財報發現 80% 來自賣廠房的一次性獲利", en: "EPS reaches record high, yet 80% comes from selling a factory rather than core products" } }
      ]
    }
  },
  {
    id: 22,
    hour: 3,
    category: { zh: "時差結構", en: "Information Asymmetry" },
    tag: { zh: "利多出盡", en: "Sell on the News" },
    title: {
      zh: "機構與散戶資訊差距：法人報告與散戶新聞的時差",
      en: "Institutional vs. Retail Time Lag: The 'Sell on the News' Mechanism"
    },
    subtitle: {
      zh: "法人數週前已完成實地訪調建倉，大眾新聞鋪天蓋地之時，往往是倒貨結帳之日",
      en: "Institutions Accumulate Weeks Ahead; When Headlines Go Mass-Market, It's Time to Distribute"
    },
    teachingCore: {
      zh: "本頁揭露金融市場中經典的「利多出盡 (Sell on the News)」機制。機構法人的產業分析師通常在數週甚至數月前，就已經完成供應鏈訪談與現場調研，提前完成建倉。當大眾免費新聞媒體終於鋪天蓋地報導「某大廠訂單驚人爆發」時，往往是法人已經準備獲利了結、順勢倒貨給散戶的時間點。追逐熱門新聞往往讓散戶高檔接刀。",
      en: "Unpacks the classic 'Sell on the News' dynamic in equity markets. Institutional buy-side analysts conduct on-site factory channel checks and supply chain scuttlebutt weeks or months in advance, completing position accumulation quietly. By the time free mass-market media splashes: 'Giant Lands Record Multi-Billion Order!', institutional desks are executing exit distribution to retail buyers. Chasing breaking news is walking into an exit trap."
    },
    guidingQuestions: {
      zh: "提問：「為什麼明明看到公司公佈利多好消息，隔天股票開高後卻一路殺到平盤甚至翻黑？這背後的資訊時差邏輯是什麼？」",
      en: "Trading puzzle: 'Why does a stock gapping up on blockbuster positive earnings often bleed lower all day into negative territory? What information asymmetry governs this?'"
    },
    keyTakeaways: [
      { zh: "資訊時間軸：供應鏈訪調 ➡️ 投行建倉 ➡️ 免費新聞 ➡️ 散戶追高", en: "Information Pipeline: Channel checks ➡️ Hedge fund buying ➡️ Mass news ➡️ Retail buying" },
      { zh: "買在傳言，賣在事實 (Buy the Rumor, Sell the News)", en: "Buy the Rumor, Sell the News: Capitalize on anticipation; exit on publication" },
      { zh: "散戶解法：避開被大量渲染的利多個股，關注基本面尚未被挖掘的標的", en: "Retail strategy: Avoid over-hyped headlines; focus on undiscovered cash flows" }
    ],
    visualType: "time-lag-pipeline",
    visualData: {
      stages: [
        { t: "T - 30 日", actor: { zh: "機構法人調研", en: "Institutional Fieldwork" }, action: { zh: "供應鏈訪談、小規模默默建倉", en: "Channel checks & low-volume accumulation" } },
        { t: "T - 5 日", actor: { zh: "內部報告流通", en: "Proprietary Intel" }, action: { zh: "外資投行出具買進目標價", en: "Brokerage upgrades target price" } },
        { t: "T 日", actor: { zh: "大眾免費新聞", en: "Mass Free Media" }, action: { zh: "媒體大篇幅報導「訂單塞爆」", en: "Front-page headlines: 'Massive Boom!'" } },
        { t: "T + 1 日", actor: { zh: "倒貨結帳 (散戶套牢)", en: "Distribution & Bagholding" }, action: { zh: "法人獲利了結，散戶高檔接刀", en: "Institutions dump shares; retail gets trapped" } }
      ]
    }
  },
  {
    id: 23,
    hour: 3,
    category: { zh: "演算法偏見", en: "Algorithmic Bias" },
    tag: { zh: "同溫層效應", en: "Filter Bubble" },
    title: {
      zh: "演算法同溫層 (Filter Bubble) 與財經資訊偏見",
      en: "Algorithm Filter Bubbles & Echo Chambers in Investment Bias"
    },
    subtitle: {
      zh: "點擊一次看多影片，演算法餵養 10 支同向內容；主動搜尋反方論點以防盲點",
      en: "A Single Bullish Click Triggers 10 Echoes; Actively Hunt Down Bearish Counter-Evidence"
    },
    teachingCore: {
      zh: "本頁剖析現代社群演算法如何強化個人的「確認偏誤 (Confirmation Bias)」。當你在 YouTube 或 TikTok 點擊了一支看多台積電的影片後，演算法為了留住你的注意力，會持續推播 10 支同樣看多的同溫層影片，讓你誤以為全世界都在一致看好該標的，忽略了對立的風險因子。破解之道在於主動搜尋反方立場的研究報告。",
      en: "Analyzes how algorithmic feeds weaponize Confirmation Bias. Clicking a bullish tech analysis on YouTube prompts recommendation engines to push 10 more hyper-bullish clips to maximize watch-time. This synthetic consensus deceives the investor into believing the entire world agrees, blinding them to underlying risk factors. Antidote: Deliberately search for sober bearish counter-theses."
    },
    guidingQuestions: {
      zh: "建議學生：「試著在搜尋引擎打入你手中持股的『風險』或『利空分析』，看看反方機構提出了哪些你從未想過的隱憂。」",
      en: "Practical assignment: 'Type your core holdings into a research terminal accompanied by 'Downside Risks' or 'Bear Case'. Discover what counter-arguments institutional shorts are evaluating.'"
    },
    keyTakeaways: [
      { zh: "演算法目的：最大化留存與觀看時間，而非保護你的資產安全", en: "Platform Objective: Maximize engagement minutes, not investment returns" },
      { zh: "確認偏誤加劇：只看想看的觀點，使投資人對潛在致命風險徹底失明", en: "Confirmation Amplification: Ignoring red flags creates structural vulnerability" },
      { zh: "破解策略：在每一次下單前，強制列出三個反方看跌的有力理由", en: "Actionable Hedge: Mandate 3 institutional bear arguments before any order" }
    ],
    visualType: "filter-bubble-cycle",
    visualData: {
      cycle: [
        { step: "1. 搜尋偏好", en: "1. Search Preference", text: { zh: "點擊一支看好某科技股的分析影片", en: "Watch a bullish stock breakdown" } },
        { step: "2. 演算法餵養", en: "2. Algorithmic Feed", text: { zh: "推播大量更樂觀的標題與狂熱言論", en: "System feeds hyper-optimistic spin" } },
        { step: "3. 假性共識", en: "3. False Consensus", text: { zh: "誤以為全世界投資人都一致看好", en: "Mistakenly assumes everyone is bullish" } },
        { step: "4. 風險盲目", en: "4. Risk Blindness", text: { zh: "忽視估值過高與供應鏈庫存隱憂", en: "Blind to inventory gluts and rate headwinds" } }
      ]
    }
  },
  {
    id: 24,
    hour: 3,
    category: { zh: "避險思維", en: "Hedging Mindset" },
    tag: { zh: "事件驅動", en: "Event Driven" },
    title: {
      zh: "避險思維：事件驅動 (Event-Driven) 投資中的雜訊過濾",
      en: "Hedging Mindset: Filtering High-Frequency Noise in Event-Driven Markets"
    },
    subtitle: {
      zh: "重大政策決議公佈前 30 分鐘充滿高頻演算法掃單噪音，拉長時間軸避免博弈",
      en: "First 30 Mins of Fed Decisions Are Ruled by Algo Scanners; Lengthen Your Duration Window"
    },
    teachingCore: {
      zh: "本頁介紹重大財經事件發布時的情緒避險策略。在美聯儲 Fed 利率決議或科技巨字財報剛公佈的前 30 分鐘，市場上充斥著高頻演算法程式交易 (Algo-Bots) 的隨機掃單與跳動，此時價格噪音極高且毫無方向性。理性的投資人應該拉長觀察窗口 (Duration)，等待法說會會後問答與完整逐字稿發布後，再進行基本面評估。",
      en: "Covers emotional hedging tactics around macro catalysts. In the first 30 minutes of a Federal Reserve rate release or mega-cap earnings release, tape action is dominated by algorithmic bots sweeping order books. This intraday price action is pure chaotic noise. Rational investors expand their observation window (Duration), awaiting conference call Q&A and full transcripts before making fundamental moves."
    },
    guidingQuestions: {
      zh: "提問：「為什麼在重要決議公佈的前 30 分鐘盲目下單跟暴漲暴跌，跟去賭場下注大小沒有區別？」",
      en: "Trading query: 'Why is trading inside the initial 30 minutes of a FOMC statement mathematically indistinguishable from roulette gambling?'"
    },
    keyTakeaways: [
      { zh: "高頻演算法 (Algo-Bots)：瞬間抓取關鍵字觸發大單，毫無方向性", en: "HFT Bot Volatility: Millisecond keyword scanning creates random chop" },
      { zh: "前 30 分鐘陷阱：洗盤引誘短線散戶追高殺低，雙向割肉", en: "The 30-Minute Trap: Whipsaws retail traders on false breakouts" },
      { zh: "贏家心態：等待塵埃落定，以隔日收盤與完整逐字稿為判斷基準", en: "Winner Mindset: Wait for dust to settle; base trades on earnings call Q&A" }
    ],
    visualType: "event-timeline",
    visualData: {
      zoneA: { time: "0 ~ 30 分鐘", status: { zh: "純雜訊亂流區 (High Noise)", en: "Pure Noise & Bot Friction" }, action: { zh: "絕對禁止下單，觀望演算法搏殺", en: "Hands off keyboard; observe algo chop" } },
      zoneB: { time: "2 小時 ~ 隔日", status: { zh: "真實訊號沉澱區 (Real Signal)", en: "Signal Settlement & Clarity" }, action: { zh: "閱讀法說會逐字稿，評估長期現金流", en: "Analyze full transcript and institutional commentary" } }
    }
  },
  {
    id: 25,
    hour: 3,
    category: { zh: "語言拆解", en: "Linguistic Decoding" },
    tag: { zh: "法說術語", en: "Earnings Call Spin" },
    title: {
      zh: "財經語言拆解：釐清法說會 (Earnings Call) 中的術語包裝",
      en: "Decoding Financial Jargon: Unmasking PR Spin in Earnings Calls"
    },
    subtitle: {
      zh: "「短期逆風」= 業績崩跌；「過渡期庫存調整」= 產品滯銷；穿透修飾直擊數字",
      en: "'Near-Term Headwinds' Means Profit Collapse; 'Inventory Realignment' Means Products Won't Sell"
    },
    teachingCore: {
      zh: "本頁教導學生如何解碼上市企業 CEO 與 CFO 的公關語言包裝。例如：當高階主管說「本季營運面臨短期逆風」，實質翻譯通常是「本季營收與淨利雙雙出現顯著暴跌」；當主管說「產業正處於過渡期庫存調整」，實質翻譯是「產品滯銷、存貨周轉天數暴增」。學生必須穿透公關修詞，直擊財務報表底層的實際數字。",
      en: "Teaches linguistic decoding of executive PR spin on earnings calls. When executives utter 'navigating transitory near-term headwinds', the quantitative translation is often 'operating margins collapsed 400 bps'. When they tout 'healthy channel inventory realignment', it means 'unsold warehouse stock exploded'. Students must pierce rhetorical veils and cross-examine the statutory balance sheet directly."
    },
    guidingQuestions: {
      zh: "進行現場對話解碼：「如果公司法說會說『我們正審慎樂觀評估新產能投產』，這句話背後的真相可能是什麼？」",
      en: "Linguistic drill: 'When management reports they are 'cautiously optimistic while reassessing future capex timelines', what does that footnote likely disclose?'"
    },
    keyTakeaways: [
      { zh: "公關語言本質：避重就輕、以委婉詞彙粉飾經營警訊", en: "Executive Spin Nature: Sugarcoats operational deterioration with euphemisms" },
      { zh: "存貨周轉天數 (DIO)：檢驗「庫存調整」真實嚴重程度的客觀指標", en: "Days Inventory Outstanding (DIO): The true litmus test of warehouse health" },
      { zh: "法說會閱讀重點：不看前半段預錄發言，聚焦後半段分析師尖銳問答", en: "Call Priority: Skip scripted remarks; scrutinize unscripted analyst Q&A" }
    ],
    visualType: "jargon-decoder-table",
    visualData: {
      terms: [
        { spin: { zh: "「營運面臨短期逆風」", en: "'Facing near-term headwinds'" }, truth: { zh: "本季營收與淨利雙雙大暴跌", en: "Revenues and net income collapsed significantly" } },
        { spin: { zh: "「正進行健康的通路庫存調整」", en: "'Conducting channel inventory adjustments'" }, truth: { zh: "產品嚴重滯銷，存貨周轉天數破表", en: "Severe sales freeze; inventory days spiked to record highs" } },
        { spin: { zh: "「審慎樂觀看待長期成長動能」", en: "'Cautiously optimistic on long-term momentum'" }, truth: { zh: "短期完全沒有任何能提振股價的實質利多", en: "Zero near-term growth drivers; cash flow guidance cut" } }
      ]
    }
  },
  {
    id: 26,
    hour: 3,
    category: { zh: "視覺素養", en: "Visual Literacy" },
    tag: { zh: "圖表欺騙", en: "Misleading Charts" },
    title: {
      zh: "數據視覺化迷思：圖表軸線誇大與誤導性視覺",
      en: "Data Visualization Pitfalls: Truncated Axes & Visual Distortion"
    },
    subtitle: {
      zh: "故意截斷 Y 軸將 1% 波動放大為斷崖式跳水；閱讀圖表第一步先檢視刻度原點",
      en: "Truncating Y-Axes Amplifies 1% Dips Into Cliff Dives; Always Inspect Baseline Scales First"
    },
    teachingCore: {
      zh: "本頁探討新聞圖表中的視覺欺騙技巧。媒體為了製造震撼效果，經常故意將圖表 Y 軸的原點從 0 截斷，設定為 95 到 100 之間，使得僅僅 1% 的常態輕微波動，在畫面上看起來像崖壁式的垂直暴跌。視覺素養 (Visual Literacy) 要求我們在閱讀任何財經圖表時，第一時間先看清楚 Y 軸刻度與數據基準線，不被視覺比例所欺騙。",
      en: "Unmasks graphical deception in mainstream infotainment. To engineer maximum drama, media outlets frequently truncate the vertical Y-axis, anchoring scales between 95 and 100 instead of zero. This exaggerates an innocuous 1% normal fluctuation into a catastrophic vertical cliff dive. Visual literacy requires scrutinizing Y-axis baselines before allowing graphic proportions to anchor emotion."
    },
    guidingQuestions: {
      zh: "展示兩張數據相同但 Y 軸刻度不同的圖表，詢問學生：「這兩張圖表帶給你的視覺衝擊有何不同？哪一張才是真實的比例？」",
      en: "Visual comparison: 'Observe these two charts plotting identical numbers. Why does the truncated chart evoke sheer panic? Which one reflects true geometric reality?'"
    },
    keyTakeaways: [
      { zh: "Y 軸截斷術：從 98 開始標記，使 1.5% 跌幅看起來像腰斬崩盤", en: "Truncated Y-Axis: Starting at 98 makes a 1.5% dip look like a 50% collapse" },
      { zh: "時間軸壓縮術：刻意截取局部震盪，隱匿長期穩定向上趨勢", en: "Cherry-Picked Timeframe: Isolating 3 days hides a 5-year steady uptrend" },
      { zh: "防騙守則：不被圖形高低牽著走，親自計算變化的百分比 (Percentage)", en: "Rule: Disregard chart visual steepness; compute delta percentage manually" }
    ],
    visualType: "misleading-chart-compare",
    visualData: {
      chartA: { label: { zh: "截斷 Y 軸 (聳動媒體)", en: "Truncated Y-Axis (Misleading)" }, range: "98 ~ 100", visual: "垂直斷崖式暴跌", enVisual: "Catastrophic Cliff Dive" },
      chartB: { label: { zh: "完整刻度 0 起點 (客觀研究)", en: "Zero-Baseline (Scientific)" }, range: "0 ~ 100", visual: "平緩常態微幅整理", enVisual: "Flat, Routine Minor Retracement" }
    }
  },
  {
    id: 27,
    hour: 3,
    category: { zh: "永續辨驗", en: "ESG Verification" },
    tag: { zh: "綠色洗白", en: "Greenwashing" },
    title: {
      zh: "綠色洗白 (Greenwashing) 與 ESG 新聞真偽辯驗",
      en: "Greenwashing vs. Reality: Verifying ESG & Sustainability Claims"
    },
    subtitle: {
      zh: "口頭宣傳植樹 vs. 經第三方審計的 IFRS S1/S2 與範疇三 (Scope 3) 碳足跡報告",
      en: "PR Tree-Planting Hype vs. Third-Party Audited IFRS S1/S2 & Scope 3 Carbon Disclosures"
    },
    teachingCore: {
      zh: "本頁探討當前最熱門的 ESG 與永續金融新聞真偽。許多企業透過公關新聞稿宣稱植樹百棵、購買綠電，進行「綠色洗白 (Greenwashing)」，卻對核心工廠的高碳排放避而不談。學生必須學會區分企業的口頭公關宣傳，與經過權威機構第三方認證審計的 IFRS S1/S2 永續揭露報告及範疇三 (Scope 3) 碳足跡數據。",
      en: "Tackles Greenwashing in modern ESG investing. Corporations routinely issue glowing PR releases touting minor tree-planting or solar panel installations ('greenwashing'), while obscuring heavy fossil fuel emissions at core manufacturing facilities. Students must delineate between unregulated marketing puffery and third-party audited IFRS S1/S2 sustainability reports and certified Scope 3 supply chain footprints."
    },
    guidingQuestions: {
      zh: "提問：「如果一家石油公司大肆宣傳他們贊助了環保繪畫比賽，這算不算綠色洗白？我們該看什麼報告來查核它的真實碳排？」",
      en: "Greenwashing prompt: 'If an oil conglomerate sponsors an elementary school earth-day poster contest, is that authentic sustainability? Which regulatory filings verify their actual Scope 1-3 emissions?'"
    },
    keyTakeaways: [
      { zh: "綠色洗白定義：誇大環保貢獻以掩飾核心業務的高污染本質", en: "Greenwashing: Exaggerating ecological initiatives to distract from heavy emissions" },
      { zh: "查核金標準：IFRS S1 (一般揭露) 與 S2 (氣候相關揭露) 官方準則", en: "Gold Standard: Statutory IFRS S1 & S2 climate disclosures" },
      { zh: "範疇三 (Scope 3)：最難造假的供應鏈上下游完整溫室氣體碳排", en: "Scope 3: Upstream & downstream supply chain emissions audited by CPAs" }
    ],
    visualType: "greenwashing-table",
    visualData: {
      claims: [
        { type: { zh: "公關綠色宣傳 (PR Greenwash)", en: "PR Greenwash Hype" }, example: { zh: "「我們贊助環保淨灘，落實企業公民綠色使命」", en: "'We sponsored beach cleanups to showcase green citizenship'" }, reality: { zh: "對核心工廠排放數百萬噸溫室氣體隻字未提", en: "Obscures millions of tons of unmitigated coal-powered manufacturing" } },
        { type: { zh: "法定永續報告 (Audited ESG)", en: "Audited Regulatory Filings" }, example: { zh: "會計師確信之範疇一、二、三碳盤查數據報告", en: "CPA-attested Scope 1, 2, and 3 audited greenhouse inventories" }, reality: { zh: "具備具體減碳年限、資本支出 (CAPEX) 與法定義務", en: "Features binding CAPEX commitments and measurable targets" } }
      ]
    }
  },
  {
    id: 28,
    hour: 3,
    category: { zh: "終身素養", en: "Lifelong Mindset" },
    tag: { zh: "思維支柱", en: "Four Pillars" },
    title: {
      zh: "建立終身財經思維：批判性閱讀與系統性思考",
      en: "Lifelong Financial Mindset: Critical Thinking & Systematic Frameworks"
    },
    subtitle: {
      zh: "情感情緒紀律 ‧ 數據求證精神 ‧ 系統邏輯框架 ‧ 長線複利視角",
      en: "Emotional Discipline ‧ Empirical Rigor ‧ Systematic 4D Framework ‧ Long-Term Compounding"
    },
    teachingCore: {
      zh: "本頁總結批判性財經大腦的四大核心支柱：1. 情感情緒紀律（不盲從市場恐慌或狂熱）；2. 數據求證精神（堅持向第一手權威資料庫核對）；3. 系統性邏輯框架（熟練運用 4D Filter 進行多維度分析）；4. 長線複利視角（專注於長期內在價值成長而非短線博弈）。這四大支柱是學生終身受用的資產。",
      en: "Synthesizes the Four Enduring Pillars of the critical financial mind: 1. Emotional Discipline (immunity against collective hysteria and euphoria); 2. Empirical Verification (relentless auditing against primary authoritative repositories); 3. Systematic Analytical Framework (habitual execution of the 4D Filter); 4. Long-Term Compounding Horizon (focusing on multi-year intrinsic cash flows rather than zero-sum noise). These form students' lifelong intellectual fortress."
    },
    guidingQuestions: {
      zh: "引導學生反思：「在今天學到的所有觀念中，哪一項是你過去最常犯錯、未來最想改變的習慣？」",
      en: "Reflective inquiry: 'Among all foundational models explored today, which cognitive trap have you fallen into most frequently, and what concrete rule will you institute to conquer it?'"
    },
    keyTakeaways: [
      { zh: "情緒紀律：在大盤狂熱時保持清醒，在集體恐慌時保持冷靜", en: "Emotional Discipline: Sober during euphoric tops; resolute during panics" },
      { zh: "數據求證：聽見任何傳聞，第一反應是查核 MOPS / SEC 原始報表", en: "Data Verification: Reflexively cross-check claims against statutory filings" },
      { zh: "複利思維：拉長投資時間軸，讓企業實質現金流為你創造回報", en: "Compounding: Align capital with durable enterprise cash generation" }
    ],
    visualType: "four-pillars-grid",
    visualData: {
      pillars: [
        { name: { zh: "1. 情緒紀律", en: "1. Emotional Discipline" }, desc: { zh: "剝離貪婪與恐懼，不讓杏仁核綁架交易大腦", en: "Decouple emotion from capital allocation decisions" } },
        { name: { zh: "2. 數據求證", en: "2. Empirical Rigor" }, desc: { zh: "堅持向第一手官方數據庫取得 Raw Data", en: "Rely on raw primary filings over journalistic spin" } },
        { name: { zh: "3. 4D 系統框架", en: "3. 4D System Filter" }, desc: { zh: "全面跑遍 Data、Disclosure、Divergence、Duration", en: "Systematically run news through 4D protocols" } },
        { name: { zh: "4. 長線複利", en: "4. Long Horizon" }, desc: { zh: "跳出當日短線波動，聚焦 3-5 年企業內在價值", en: "Compound multi-year intrinsic business value" } }
      ]
    }
  },
  {
    id: 29,
    hour: 3,
    category: { zh: "全景總結", en: "Course Synthesis" },
    tag: { zh: "知識體系", en: "Knowledge Tree" },
    title: {
      zh: "第一週課程總結與知識體系關聯圖",
      en: "Week 1 Synthesis: Integrated Knowledge Architecture & Concept Map"
    },
    subtitle: {
      zh: "從媒體演進、倒 U 曲線、4D Filter 到四大數據源的事實查核閉環",
      en: "A Complete Verification Loop: From Media History & SNR to 4D Filter & Statutory Hubs"
    },
    teachingCore: {
      zh: "本頁整合第一週全景知識圖表。從媒體演進史（紙本 ➡️ 廣播 ➡️ 社群 ➡️ GenAI）、訊息過載倒 U 曲線與 SNR 數學模型、行為心理偏誤（框架效應與檸檬市場）、4D Filter 工具（Data, Disclosure, Divergence, Duration），到四大權威數據源事實查核。這套系統構成了「管理探索二」課程最堅實的基石。",
      en: "Presents the panoramic conceptual map uniting Week 1's core curriculum. Tracing media progression (Print ➡️ TV ➡️ Web 2.0 ➡️ GenAI), the mathematical SNR and Inverted U-Curve of overload, behavioral biases (Framing, Lemons Market, Overtrading), the 4D Filter framework, down to authoritative statutory databases (MOPS, SEC, CBC, TWSE). This coherent epistemology forms the bedrock of Explorations in Management II."
    },
    guidingQuestions: {
      zh: "複習總結：「請用一句話告訴隔壁同學，什麼是 4D Filter？我們為什麼需要它？」",
      en: "Peer summary drill: 'In a single concise sentence to your classmate: What is the 4D Filter, and why is it our premier cognitive shield?'"
    },
    keyTakeaways: [
      { zh: "環境認知：理解現代 GenAI 資訊環境中的過度雜訊本質", en: "Environment: Recognize exponential GenAI noise contamination" },
      { zh: "心理免疫：識別框架效應、控制錯覺與演算法同溫層陷阱", en: "Psychology: Neutralize Framing Effects and Echo Chamber biases" },
      { zh: "行動防禦：熟練操作 4D Filter 並對標四大官方數據源查證", en: "Action Defense: Execute the 4D Filter against primary regulatory hubs" }
    ],
    visualType: "knowledge-mindmap",
    visualData: {
      branches: [
        { title: { zh: "第 1 小時：歷史與理論", en: "Hour 1: History & Models" }, items: ["媒體演進史", "訊息過載倒 U 曲線", "SNR 數學模型", "雜訊交易者風險"] },
        { title: { zh: "第 2 小時：偏誤與工具", en: "Hour 2: Biases & Toolkit" }, items: ["框架效應", "檸檬市場", "Deepfake 威脅", "4D Filter 核心法則", "四大權威數據源"] },
        { title: { zh: "第 3 小時：實證與實踐", en: "Hour 3: Empirical & Action" }, items: ["二次交叉驗證", "利多出盡時差", "演算法同溫層", "綠色洗白辨驗", "終身批判思維"] }
      ]
    }
  },
  {
    id: 30,
    hour: 3,
    category: { zh: "反思預告", en: "Reflection & Preview" },
    tag: { zh: "課後行動", en: "Next Steps" },
    title: {
      zh: "學習反思與第二週預告 (物價、通膨與購買力)",
      en: "Reflective Learning & Week 2 Preview: Inflation & Purchasing Power"
    },
    subtitle: {
      zh: "前往線上填寫「4D Filter 檢驗報告」；下週深入探索早餐店物價與通膨真相",
      en: "Submit Your Online 4D Filter Report; Next Week: Breakfast Prices & CPI Truth"
    },
    teachingCore: {
      zh: "本頁為第一週課程畫下圓滿句點，並指引課後學習任務。提醒學生前往雙語網頁點擊「📝 本週課堂作業」按鈕，現場完成並提交 4D Filter 財經新聞檢驗報告。同時預告第二週主題為【物價、通膨與實質購買力】，將帶領大家從早餐店漲價與外送費波動，深入探討 CPI 消費者物價指數的統計真相與央行抗通膨政策。",
      en: "Concludes Week 1 and directs students to immediate practical action. Directs students to click the '📝 Weekly Assignment' modal to draft and submit their statutory 4D Filter News Verification Report. Previews Week 2: 'Consumer Prices, Inflation & Real Purchasing Power'—transitioning from everyday breakfast price shocks and delivery surcharges into the statistical mechanics of CPI and central bank inflation-targeting policies."
    },
    guidingQuestions: {
      zh: "結語：「感謝大家的參與！記得本週出門買早餐時留意價目表，我們下週將一起揭開物價與通膨的神秘面紗！」",
      en: "Adjournment: 'Thank you for your active participation! Keep an eye on local price tags this week—next session, we demystify inflation and purchasing power!'"
    },
    keyTakeaways: [
      { zh: "即刻行動：點擊網頁「📝 課堂作業」填寫 4D Filter 檢驗報告並匯出", en: "Immediate Action: Launch the '📝 Assignment' form and submit your 4D analysis" },
      { zh: "下週預告：【物價、通膨與實質購買力】（CPI、通膨預期、實質薪資）", en: "Next Week: [Prices, Inflation & Purchasing Power] (CPI, wage stagnation, rate hikes)" },
      { zh: "生活觀察：留心觀察本週生活物價波動，為下週實證財務做好準備", en: "Field observation: Track real-world food and grocery receipts for our next lab" }
    ],
    visualType: "preview-card",
    visualData: {
      assignmentPrompt: { zh: "點擊上方導覽列「📝 本週課堂作業」填寫並匯出 PDF/Markdown 繳交", en: "Click '📝 Weekly Assignment' in the top navbar to draft, auto-save, and export your report" },
      nextWeek: {
        week: "Week 02",
        topic: { zh: "物價、通膨與實質購買力", en: "Consumer Prices, Inflation & Purchasing Power" },
        highlights: [
          { zh: "從早餐店加蛋漲價看 CPI 籃子編製迷思", en: "Deconstructing CPI basket weights via breakfast price shocks" },
          { zh: "通膨稅如何悄悄剝削沒有持有實質資產的薪資族", en: "How the silent inflation tax erodes non-asset salaried workers" },
          { zh: "中央銀行抗通膨升息循環與房貸利率聯動機制", en: "Central bank interest rate hikes and mortgage transmission" }
        ]
      }
    }
  }
];

// 3 小時教學進度與活動配比表
const SCHEDULE_TABLE = [
  {
    hour: 1,
    time: "第一小時 (00:00-00:50)",
    timeEn: "Hour 1 (00:00-00:50)",
    modules: "理論與歷史背景 (Slide 01 - 10)",
    modulesEn: "Theoretical & Historical Context (Slide 01 - 10)",
    activity: "🎯 專屬活動：資訊飲食與 SNR 計算盤\n學生評估每日看財報與標題黨分鐘數，計算資訊純度分數。",
    activityEn: "🎯 Hour 1 Lab: Information Diet & SNR Calculator\nCalculate personal information purity score from primary filings vs. clickbait feeds.",
    breakdown: "講授 35 分 | 活動 15 分",
    breakdownEn: "Lecture 35m | Activity 15m",
    slideStart: 1,
    slideEnd: 10
  },
  {
    hour: 2,
    time: "第二小時 (00:50-01:40)",
    timeEn: "Hour 2 (00:50-01:40)",
    modules: "偏誤與防禦工具 (Slide 11 - 20)",
    modulesEn: "Biases & Defensive Framework (Slide 11 - 20)",
    activity: "🎯 專屬活動：新聞標題框架重組大考驗\n將聳動標題黨新聞重組改寫為客觀中立的學術級 Signal 報導。",
    activityEn: "🎯 Hour 2 Lab: Headline Reframing Challenge\nReconstruct sensationalized clickbait into objective, academic Signal reports.",
    breakdown: "講授 35 分 | 活動 15 分",
    breakdownEn: "Lecture 35m | Activity 15m",
    slideStart: 11,
    slideEnd: 20
  },
  {
    hour: 3,
    time: "第三小時 (01:40-02:30)",
    timeEn: "Hour 3 (01:40-02:30)",
    modules: "實證與工具應用 (Slide 21 - 30)",
    modulesEn: "Empirical Application & Synthesis (Slide 21 - 30)",
    activity: "🎮 重磅小遊戲：財經新聞真假與雜訊偵測大挑戰 (4關卡)\n📝 課堂實務作業：4D Filter 檢驗報告現場填寫提交。",
    activityEn: "🎮 Financial News Detective Challenge (4 Levels)\n📝 Assignment: 4D Filter News Verification Report.",
    breakdown: "講授 20 分 | 遊戲 15 分 | 作業 15 分",
    breakdownEn: "Lecture 20m | Game 15m | Homework 15m",
    slideStart: 21,
    slideEnd: 30
  }
];
