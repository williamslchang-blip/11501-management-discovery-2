/**
 * 115學年度「管理探索二」第八週教學資料庫
 * 單元名稱：期中學習成果檢核與實戰個案總複習
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W8_SCHEDULE_TABLE = [
  {
    hour: "第一小時 (00:00-00:50)",
    title: "前半學期觀念精華與實戰個案 A/B",
    slides: "Slide 01 - 10",
    summary: "W1素養與偏差、W2通膨購買力、W3利率與債券反向、W4本益比ROE、個案 A (通膨防禦) 與個案 B (台積電評析)。",
    activity: "🎯 專屬活動：W1-W7 觀念對決與迷思快問快答擂台（5道判斷題即時診斷）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第二小時 (00:50-01:40)",
    title: "後半學期精華與跨單元個案 C/D/E",
    slides: "Slide 11 - 20",
    summary: "W5 ETF微笑曲線、W6高利活存上限與信用卡15%、W7外匯點差與DCC、個案 C (10萬配置)、個案 D (海外精算) 與個案 E (宏觀傳導)。",
    activity: "🎯 專屬活動：大學生 10 萬元綜合資產配置模擬器（30/50/20 黃金比例算術）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第三小時 (01:40-02:30)",
    title: "期中會考模擬、常錯陷阱與總評",
    slides: "Slide 21 - 30",
    summary: "期中會考 4 大題型心法、4 大常錯陷阱解密、個人習慣成長自測、W9-W18 藍圖前瞻與 7 大黃金守則總整合。",
    activity: "🎮 重磅小遊戲：期中會考大挑戰 (4大領域測驗) ＋ 📝 課堂實務作業：期中學習反思與個人綜合理財報告",
    timeAlloc: "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W8_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "期中總覽 ‧ 融會貫通",
    "categoryEn": "Midterm Overview & Synthesis",
    "title": "第八週課程導論：期中學習成果檢核與實戰個案總複習",
    "titleEn": "第八週課程導論: 期中學習成果檢核與實戰個案總複習",
    "subtitle": "融會貫通 W1 至 W7 核心素養，以 5 大跨單元真實個案實踐全方位財務決策",
    "subtitleEn": "Integrating W1-W7 financial fundamentals through 5 real-world comprehensive case studies",
    "quickTakeaways": [
      "核心重點：融會貫通 W1 至 W7 核心素養，以 5 大跨單元真實個案實踐全方位財務決策",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Integrating W1-W7 financial fundamentals through 5 real-world comprehensive case studies",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "問學生：『經過前 7 週學習，同學們覺得哪一個單元的觀念對你過去的理財認知衝擊最大？』",
    "discussionQuestionEn": "Discussion Inquiry: 問學生：『經過前 7 週學習，同學們覺得哪一個單元的觀念對你過去的理財認知衝擊最大？』",
    "teachingNotes": "本頁為第八週期中總複習導論。講師可以引用股神巴菲特 (Warren Buffett) 名言開場：「風險來自於你不知道自己在做什麼！」針對大一新鮮人經過前 7 週（財經素養、通膨、利率、股市、ETF、數位金融、外匯）的探索切入。說明期中檢核不是為了死記公式，而是檢驗自己能否將這些知識內化為終身受用的理性決策邏輯。本單元將帶領大家進行跨單元綜合個案演練。\n\n【官方數據引述】：115學年度「管理探索二」課程委員會期中評量規劃網要。"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "期中總覽 ‧ 學習藍圖",
    "categoryEn": "Midterm Review Roadmap",
    "title": "第八週 3 小時學習地圖與期中會考應試策略",
    "titleEn": "第八週 3 小時學習地圖與期中會考應試策略",
    "subtitle": "掌握 3 小時複習節奏、5 大個案實戰心法與期中會考 4 大題型命中策略",
    "subtitleEn": "Mastering the 3-hour review agenda, case solving logic, and midterm exam strategies",
    "quickTakeaways": [
      "核心重點：掌握 3 小時複習節奏、5 大個案實戰心法與期中會考 4 大題型命中策略",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Mastering the 3-hour review agenda, case solving logic, and midterm exam strategies",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "引導學生在講義上記下自己的期中會考目標得分，準備進入 3 小時深度複習。",
    "discussionQuestionEn": "Discussion Inquiry: 引導學生在講義上記下自己的期中會考目標得分，準備進入 3 小時深度複習。",
    "teachingNotes": "本頁為學生構建本週 3 小時的期中複習藍圖。第一小時回顧前半學期 (W1-W4) 觀念精華、通膨防禦個案 A 與台積電評析個案 B；第二小時聚焦於後半學期 (W5-W7) 精華、10 萬資產配置個案 C、海外旅遊個案 D 與宏觀傳導個案 E；第三小時則傳授期中會考 4 大題型心法、4 大常錯陷阱剖析、個人習慣成長自測與 7 大黃金守則總整合。\n\n【官方數據引述】：115學年度「管理探索二」期中審查規範。"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "W1回顧 ‧ 批判素養",
    "categoryEn": "W1 Review: Financial Literacy",
    "title": "W1 核心重申：資訊爆炸時代的財經素養與認知偏差",
    "titleEn": "W1 核心重申: 資訊爆炸時代的財經素養與認知偏差",
    "subtitle": "擺脫 FOMO 盲從與倖存者偏差，以第一原理拆解資訊噪音建立終身防線",
    "subtitleEn": "Dispelling FOMO and survivorship bias to build a critical financial reasoning defense",
    "quickTakeaways": [
      "核心重點：擺脫 FOMO 盲從與倖存者偏差，以第一原理拆解資訊噪音建立終身防線",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Dispelling FOMO and survivorship bias to build a critical financial reasoning defense",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提問：『如果你在社群平台上看到朋友曬出一天賺 30% 的對帳單，你的第一反應應該是什麼？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『如果你在社群平台上看到朋友曬出一天賺 30% 的對帳單，你的第一反應應該是什麼？』",
    "teachingNotes": "重申第一週核心精華：在資訊爆炸時代建立批判性思考防線。剖析兩大常見心理偏差：1. **FOMO (錯失恐懼)**：看到同學或飆股爆賺就急著梭哈，解法是堅持「不懂的商品絕對不買」；2. **倖存者偏差**：只看到少數爆賺網網紅，忽視 90% 慘賠默默離場的散戶，解法是查閱權威機構統計數據。\n\n【官方數據引述】：第一週課程講義與金管會金融知識普及宣導報告。"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "W2回顧 ‧ 通膨購買力",
    "categoryEn": "W2 Review: Inflation & CPI",
    "title": "W2 核心重申：物價通膨 CPI 與實質購買力公式算術",
    "titleEn": "W2 核心重申: 物價通膨 CPI 與實質購買力公式算術",
    "subtitle": "精算名目利率扣除 CPI 通膨率之實質購買力縮水，建立通膨防禦部位",
    "subtitleEn": "Calculating real purchasing power by deducting CPI inflation from nominal rates",
    "quickTakeaways": [
      "核心重點：精算名目利率扣除 CPI 通膨率之實質購買力縮水，建立通膨防禦部位",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Calculating real purchasing power by deducting CPI inflation from nominal rates",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "計算題：『如果便當從 100 元漲到 110 元 (通膨 10%)，你的打工時薪沒變，你的實質時薪是增加了還是減少了？』",
    "discussionQuestionEn": "Discussion Inquiry: 計算題：『如果便當從 100 元漲到 110 元 (通膨 10%)，你的打工時薪沒變，你的實質時薪是增加了還是減少了？』",
    "teachingNotes": "重申第二週核心精華：通膨是無形的財產稅。消費者物價指數 (CPI) 反映生活成本上漲。強調核心算術公式：`實質利率 = 名目利率 - CPI通膨率`。算術實例：把錢存銀行領 1.7% 名目定存利息，但當年度 CPI 通膨率高達 2.5% 時，實質利率為 -0.8%，代表存款一年後實質購買力無形縮水了 0.8%！\n\n【官方數據引述】：第二週課程講義與主計總處 (DGBAS) CPI 統計月報。"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "W3回顧 ‧ 利率蹺蹺板",
    "categoryEn": "W3 Review: Interest Rates",
    "title": "W3 核心重申：利率政策、升降息與債券價格反向關係",
    "titleEn": "W3 核心重申: 利率政策、升降息與債券價格反向關係",
    "subtitle": "看懂央行重貼現率槓桿與債券價格蹺蹺板反向規律，掌握降息週期紅利",
    "subtitleEn": "Understanding the reverse seesaw rule between central bank rate cuts and bond prices",
    "quickTakeaways": [
      "核心重點：看懂央行重貼現率槓桿與債券價格蹺蹺板反向規律，掌握降息週期紅利",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Understanding the reverse seesaw rule between central bank rate cuts and bond prices",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提醒：『買債券 ETF 想賺價差，一定要等到央行【開始降息】的時候，債券價格才會大漲！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒：『買債券 ETF 想賺價差，一定要等到央行【開始降息】的時候，債券價格才會大漲！』",
    "teachingNotes": "重申第三週核心精華：央行升降息槓桿與債券價格蹺蹺板。中央銀行透過調整重貼現率控制市場資金水頭。強調**「利率與債券價格的反向關係 (Pse-Saw Rule)」**：央行升息 ➔ 新發行債券給予更高利息 ➔ 舊債券價格下跌；央行降息 ➔ 市場利率下降 ➔ 舊的高利債券變得搶手 ➔ 舊債券價格暴漲！\n\n【官方數據引述】：第三週課程講義與中央銀行 (CBC) 貨幣政策報告。"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "W4回顧 ‧ 企業估值ROE",
    "categoryEn": "W4 Review: Valuation & ROE",
    "title": "W4 核心重申：股市入門、P/E 本益比與杜邦分析 ROE",
    "titleEn": "W4 核心重申: 股市入門、P/E 本益比與杜邦分析 ROE",
    "subtitle": "拆解企業價值 P/E 回本年數與杜邦三因子 ROE，學會看穿公司獲利本質",
    "subtitleEn": "Deconstructing P/E valuation ratios and DuPont ROE 3-factor business profitability",
    "quickTakeaways": [
      "核心重點：拆解企業價值 P/E 回本年數與杜邦三因子 ROE，學會看穿公司獲利本質",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Deconstructing P/E valuation ratios and DuPont ROE 3-factor business profitability",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提問：『當一家公司的 P/E 高達 50 倍時，代表市場對它的未來成長性抱持什麼期待？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『當一家公司的 P/E 高達 50 倍時，代表市場對它的未來成長性抱持什麼期待？』",
    "teachingNotes": "重申第四週核心精華：買股票就是買企業股權。剖析兩大估值指標：本益比 (P/E = 股價/EPS，代表回本年數) 與股價淨值比 (P/B = 股價/每股淨值)。重申杜邦三因子拆解 ROE：`ROE = 淨利率 × 資產轉速 × 權益乘數`。幫助學生一眼看穿企業獲利是靠高毛利（如台積電）、高轉速（如超商）還是高槓桿（如銀行）。\n\n【官方數據引述】：第四週課程講義與 TWSE 公開資訊觀測站 (MOPS)。"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "實戰個案 A ‧ 通膨防禦",
    "categoryEn": "Case A: Inflation Defense",
    "title": "實戰個案 A：通膨 2.5% + 升息環境下的個人現金流防禦",
    "titleEn": "實戰個案 A: 通膨 2.5% + 升息環境下的個人現金流防禦",
    "subtitle": "大學生小明 15,000 元月現金流實例：應對 2.5% 通膨與升息的收支防禦戰",
    "subtitleEn": "Case A: Protecting personal cash flow under 2.5% inflation and rising rate regimes",
    "quickTakeaways": [
      "核心重點：大學生小明 15,000 元月現金流實例：應對 2.5% 通膨與升息的收支防禦戰",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Case A: Protecting personal cash flow under 2.5% inflation and rising rate regimes",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "請學生算一算：『如果你的月生活費是 12,000 元，你的 3 個月緊急預備金應該是多少錢？』",
    "discussionQuestionEn": "Discussion Inquiry: 請學生算一算：『如果你的月生活費是 12,000 元，你的 3 個月緊急預備金應該是多少錢？』",
    "teachingNotes": "剖析大一學生小明每月 15,000 元生活費的綜合個案。情境：當年度 CPI 通膨率 2.5%、便當漲價 10%、銀行定存 1.7%。若小明把所有錢放在 0.8% 活存，實質購買力將縮水 1.7%。防禦對策：1. 留存 3-6 個月生活費於「數位帳戶 2.5% 高利活存」做緊急預備金；2. 剩餘資金投入低費用率之全市場市值 ETF (如 0050/VOO) 抵抗長期通膨。\n\n【官方數據引述】：115管理探索二教案案例組實務模擬。"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "實戰個案 B ‧ 台積電評析",
    "categoryEn": "Case B: TSMC Valuation",
    "title": "實戰個案 B：台積電 (2330) 財報、殖利率與企業價值綜合評析",
    "titleEn": "實戰個案 B: 台積電 (2330) 財報、殖利率與企業價值綜合評析",
    "subtitle": "全球半導體龍頭毛利護城河、P/E 區間評價與美金營收之匯率敏感度實測",
    "subtitleEn": "Case B: Evaluating TSMC (2330) moats, historical P/E safety margins, and FX exposure",
    "quickTakeaways": [
      "核心重點：全球半導體龍頭毛利護城河、P/E 區間評價與美金營收之匯率敏感度實測",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Case B: Evaluating TSMC (2330) moats, historical P/E safety margins, and FX exposure",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "引導思考：『為什麼新台幣貶值對台積電的財報獲利表現有顯著的正面助攻效果？』",
    "discussionQuestionEn": "Discussion Inquiry: 引導思考：『為什麼新台幣貶值對台積電的財報獲利表現有顯著的正面助攻效果？』",
    "teachingNotes": "以半導體霸主台積電為例進行三面綜合評析：1. **獲利品質 (DuPont)**：毛利率 > 53%、ROE > 28%，屬於高技術護城河的高淨利率優質企業；2. **本益比 (P/E)**：歷史 P/E 區間於 15 至 25 倍常態震盪，評估安全邊際；3. **匯率敏感度**：美金營收計價，台幣貶值 1 元，台積電營業利益率提升約 0.4 個百分點！\n\n【官方數據引述】：台積電 (TSMC) 官方財務報告與 MOPS 公開資訊。"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "考前必讀 ‧ 5大迷思解密",
    "categoryEn": "Myth Busting: 5 Common Traps",
    "title": "前半學期常見 5 大財經觀念迷思解密",
    "titleEn": "前半學期常見 5 大財經觀念迷思解密",
    "subtitle": "拆解股票單價、升息買債、高股息填息、定存實質虧損與新聞明牌 5 大迷思",
    "subtitleEn": "Busting 5 widespread student myths on share price, bond timing, dividends, and deposits",
    "quickTakeaways": [
      "核心重點：拆解股票單價、升息買債、高股息填息、定存實質虧損與新聞明牌 5 大迷思",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Busting 5 widespread student myths on share price, bond timing, dividends, and deposits",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "齊聲複習：『買股票看價值不看單價，看配息要看有沒有填息！』",
    "discussionQuestionEn": "Discussion Inquiry: 齊聲複習：『買股票看價值不看單價，看配息要看有沒有填息！』",
    "teachingNotes": "考前重點解密 5 大常見觀念誤區：1. 10元股票不一定比1000元股票划算（看市值與P/E）；2. 升息時買債券ETF不會立刻大賺（降息才大漲）；3. 高股息沒填息只是左口袋換右口袋；4. 定存 1.7% 扣除通膨後實質獲利為負；5. 聽新聞明牌買股票往往是散戶接盤高點。\n\n【官方數據引述】：115管理探索二團隊彙整常錯題庫。"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "第一小時 ‧ 擂台預告",
    "categoryEn": "Hour 1 Recap & Lab Preview",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "第一小時小結與專屬活動預告",
    "subtitle": "第一小時觀念鞏固，啟動【W1-W7 觀念對決與迷思快問快答擂台】實戰挑戰",
    "subtitleEn": "Hour 1 review summary and launching the Interactive 5-Myth Buster Arena Modal",
    "quickTakeaways": [
      "核心重點：第一小時觀念鞏固，啟動【W1-W7 觀念對決與迷思快問快答擂台】實戰挑戰",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Hour 1 review summary and launching the Interactive 5-Myth Buster Arena Modal",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行迷思快問快答挑戰。",
    "discussionQuestionEn": "Discussion Inquiry: 指導學生開啟網頁版 Modal，準備進行迷思快問快答挑戰。",
    "teachingNotes": "總結第一小時核心觀念：W1-W2 理性防範 FOMO 與通膨實質扣除；W3-W4 降息債券價格暴漲與杜邦 ROE；個案 A/B 通膨防禦與台積電評析。預告第 1 小時 Modal 實務活動——「W1-W7 觀念對決與迷思快問快答擂台」，請學生挑戰 5 大迷思題目，測試迷思抗體得分。\n\n【官方數據引述】：115管理探索二團隊建置。"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "W5回顧 ‧ ETF被動投資",
    "categoryEn": "W5 Review: Index ETFs & DCA",
    "title": "W5 核心重申：ETF 狂熱、定期定額微笑曲線與收益平準金陷阱",
    "titleEn": "W5 核心重申: ETF 狂熱、定期定額微笑曲線與收益平準金陷阱",
    "subtitle": "解析定期定額微笑曲線扣款攤平成本，透視收益平準金與配息來源新規",
    "subtitleEn": "DCA smile curve cost-averaging and regulatory truths behind equalization reserves",
    "quickTakeaways": [
      "核心重點：解析定期定額微笑曲線扣款攤平成本，透視收益平準金與配息來源新規",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: DCA smile curve cost-averaging and regulatory truths behind equalization reserves",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提問：『當股市重挫 20% 時，定期定額扣款的人應該感到恐慌停扣，還是感到高興可以買到更多單位數？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『當股市重挫 20% 時，定期定額扣款的人應該感到恐慌停扣，還是感到高興可以買到更多單位數？』",
    "teachingNotes": "重申第五週核心精華：被動投資與指數革命。定期定額微笑曲線 (DCA)：在市場下跌時持續扣款，買到更多便宜單位數，拉低平均成本，待反彈實現笑臉獲利。收益平準金新規：金管會明令禁止用平準金衝高配息率，配息來源需透明揭露。大一新鮮人首選「全市場型市值 ETF (如 0050/VOO)」，搭配 70% 核心 + 30% 衛星配置。\n\n【官方數據引述】：第五週課程講義與投信投顧公會 (SITCA) 統計。"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "W6回顧 ‧ 數位金融資安",
    "categoryEn": "W6 Review: Digital Banking",
    "title": "W6 核心重申：數位金融、高利活存上限與 15% 循環利息黑洞",
    "titleEn": "W6 核心重申: 數位金融、高利活存上限與 15% 循環利息黑洞",
    "subtitle": "看破 8% 行銷噱頭額度上限，警惕 15% 信用卡循環利息追溯起算黑洞",
    "subtitleEn": "Exposing high-yield savings caps and the compounding trap of 15% revolving credit",
    "quickTakeaways": [
      "核心重點：看破 8% 行銷噱頭額度上限，警惕 15% 信用卡循環利息追溯起算黑洞",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Exposing high-yield savings caps and the compounding trap of 15% revolving credit",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "警告：『信用卡帳單永遠只有【全額繳清】一個選項，絕不要只繳最低應繳金額！』",
    "discussionQuestionEn": "Discussion Inquiry: 警告：『信用卡帳單永遠只有【全額繳清】一個選項，絕不要只繳最低應繳金額！』",
    "teachingNotes": "重申第六週核心精華：數位金融便利性與新鮮人信用保護。數位帳戶高利活存精算：看清「額度上限 (Cap)」，超過部分回歸 0.8% 基本利率。CDIC 300 萬元保障：純網銀與傳統銀行皆享有最高 300 萬存保。信用卡循環利息黑洞：帳戶只繳最低應繳會啟動 15% 循環利息且往回溯及計息！鐵律：永遠全額繳清。\n\n【官方數據引述】：第六週課程講義與金管會銀行局業務規範。"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "W7回顧 ‧ 外匯點差避險",
    "categoryEn": "W7 Review: FX & Spread Math",
    "title": "W7 核心重申：即期 vs 現金匯率、美台利差與升貶值雙刃劍",
    "titleEn": "W7 核心重申: 即期 vs 現金匯率、美台利差與升貶值雙刃劍",
    "subtitle": "掌握即期與現金賣出點差算術，善用雙幣信用卡鎖匯與防範 DCC 陷阱",
    "subtitleEn": "Spot vs cash exchange rate spread arithmetic, dual currency cards, and DCC avoidance",
    "quickTakeaways": [
      "核心重點：掌握即期與現金賣出點差算術，善用雙幣信用卡鎖匯與防範 DCC 陷阱",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Spot vs cash exchange rate spread arithmetic, dual currency cards, and DCC avoidance",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提醒：『出國刷卡看到 POS 機問你要用 TWD 還是 JPY 結算，永遠果斷按 JPY！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒：『出國刷卡看到 POS 機問你要用 TWD 還是 JPY 結算，永遠果斷按 JPY！』",
    "teachingNotes": "重申第七週核心精華：個人外匯與國際貿易。即期匯率 (Spot Rate) 為電子交割，匯率最優惠且免現鈔點差；美台利差 (IRP) 引發資金拋售台幣換美元，推升美元走強；警惕美金高利定存 5% 伴隨的台幣升值匯損風險。海外購物與刷卡結算：堅決拒絕 DDC 新台幣結算，一律選擇「當地貨幣 (USD/JPY/RMB)」。\n\n【官方數據引述】：第七週課程講義與中央銀行 (CBC) 外匯局說明。"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "跨單元個案 C ‧ 10萬配置",
    "categoryEn": "Case C: 100k Asset Mix",
    "title": "跨單元個案 C：大學生 10 萬元資產配置 (高利活存 vs 0050 vs 美金定存)",
    "titleEn": "跨單元個案 C: 大學生 10 萬元資產配置 (高利活存 vs 0050 vs 美金定存)",
    "subtitle": "模擬大一生 10 萬元積蓄：30% 高利活存 + 50% 0050 ETF + 20% 美金定存配置",
    "subtitleEn": "Case C: Designing a 100k college portfolio with 30% savings, 50% ETF, and 20% USD",
    "quickTakeaways": [
      "核心重點：模擬大一生 10 萬元積蓄：30% 高利活存 + 50% 0050 ETF + 20% 美金定存配置",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Case C: Designing a 100k college portfolio with 30% savings, 50% ETF, and 20% USD",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "請學生計算：『如果 10 萬塊全部買高股息 ETF，遇到股市暴跌 30% 且急需用錢時，會面臨什麼困境？』",
    "discussionQuestionEn": "Discussion Inquiry: 請學生計算：『如果 10 萬塊全部買高股息 ETF，遇到股市暴跌 30% 且急需用錢時，會面臨什麼困境？』",
    "teachingNotes": "剖析大一新鮮人 10 萬元打工積蓄的黃金三合一配置：1. **30% 緊急預備金 (3 萬元)**：存入數位帳戶 2.5% 高利活存，兼顧流動性；2. **50% 核心資產 (5 萬元)**：定期定額投入 0050 或 VOO 全市場市值 ETF，享受長期經濟成長；3. **20% 外幣戰略金 (2 萬元)**：分批逢低買進美金/日圓存入外幣帳戶，預備出國與美股投資。\n\n【官方數據引述】：理財規劃師 (CFP) 組合資產配置黃金比例。"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "跨單元個案 D ‧ 海外精算",
    "categoryEn": "Case D: Travel & FX Math",
    "title": "跨單元個案 D：海外購物與旅遊全套精算 (雙幣卡 + 即期匯率 + 2.5% 回饋)",
    "titleEn": "跨單元個案 D: 海外購物與旅遊全套精算 (雙幣卡 + 即期匯率 + 2.5% 回饋)",
    "subtitle": "日本旅遊 3 萬元全套換匯演練：即期換匯 + 雙幣卡扣款 + 2.5% 海外回饋實測",
    "subtitleEn": "Case D: Complete financial simulation of Japan travel with spot FX and 2.5% rebate",
    "quickTakeaways": [
      "核心重點：日本旅遊 3 萬元全套換匯演練：即期換匯 + 雙幣卡扣款 + 2.5% 海外回饋實測",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Case D: Complete financial simulation of Japan travel with spot FX and 2.5% rebate",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "算一算：『透過「即期價+拒絕DDC+雙幣卡」三管齊下，去日本消費 10 萬日圓能總共省下多少錢？』",
    "discussionQuestionEn": "Discussion Inquiry: 算一算：『透過「即期價+拒絕DDC+雙幣卡」三管齊下，去日本消費 10 萬日圓能總共省下多少錢？』",
    "teachingNotes": "精算大一學生赴日旅遊 50,000 日圓消費最佳化：1. **提前線上即期買日圓**：日圓低點 (0.210) 在 App 即期買入，比臨櫃現鈔價 (0.216) 省下 300 元台幣；2. **海外刷卡結算**：選日圓結算，拒絕 DDC 避開 5% 惡劣手續費；3. **高回饋雙幣卡**：使用海外回饋 3.0% 雙幣卡，扣除 1.5% 手續費後淨賺 1.5% 回饋！\n\n【官方數據引述】：115管理探索二教案實務精算組。"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "跨單元個案 E ‧ 宏觀傳導",
    "categoryEn": "Case E: Macro Transmission",
    "title": "跨單元個案 E：美台升降息對外匯、股市與房貸的傳導鏈分析",
    "titleEn": "跨單元個案 E: 美台升降息對外匯、股市與房貸的傳導鏈分析",
    "subtitle": "剖析美聯儲升降息對美元匯率、台股外資流向與台灣房貸利率之連動傳導",
    "subtitleEn": "Case E: Macroeconomic transmission chain of Fed rate shifts on FX, stocks, and mortgages",
    "quickTakeaways": [
      "核心重點：剖析美聯儲升降息對美元匯率、台股外資流向與台灣房貸利率之連動傳導",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Case E: Macroeconomic transmission chain of Fed rate shifts on FX, stocks, and mortgages",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "引導思考：『為什麼美國聯準會坐在華盛頓開會降息，會影響到台灣科學園區的股票價格？』",
    "discussionQuestionEn": "Discussion Inquiry: 引導思考：『為什麼美國聯準會坐在華盛頓開會降息，會影響到台灣科學園區的股票價格？』",
    "teachingNotes": "剖析宏觀經濟「牽一髮而動全身」的連動傳導鏈。當美國聯準會 (Fed) 啟動降息週期時：1. **外匯 (FX)**：美台利差縮小 ➔ 美元指數 DXY 下降 ➔ 資金湧入亞洲，新台幣面臨升值壓力；2. **股市 (Stocks)**：資金成本下降 ➔ 熱錢流入台股與科技股 ➔ 台股與台積電 P/E 獲得向上調升；3. **房貸 (Mortgages)**：央行停止升息，購屋族負擔平穩。\n\n【官方數據引述】：中央銀行與行政院主計總處宏觀經濟模型。"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "權威數據 ‧ 四大資料庫",
    "categoryEn": "Data Hubs: 4 Official Sources",
    "title": "財經數據權威資料庫綜合查閱：DGBAS / TWSE / FSC / CBC 數據鏈",
    "titleEn": "財經數據權威資料庫綜合查閱: DGBAS / TWSE / FSC / CBC 數據鏈",
    "subtitle": "串聯主計總處、證交所、金管會與中央銀行四大官方權威資料庫查閱法",
    "subtitleEn": "Mastering the four primary official data hubs: DGBAS, TWSE, FSC, and CBC databases",
    "quickTakeaways": [
      "核心重點：串聯主計總處、證交所、金管會與中央銀行四大官方權威資料庫查閱法",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Mastering the four primary official data hubs: DGBAS, TWSE, FSC, and CBC databases",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "演示從 MOPS 網站搜尋特定上市公司財報的步驟。",
    "discussionQuestionEn": "Discussion Inquiry: 演示從 MOPS 網站搜尋特定上市公司財報的步驟。",
    "teachingNotes": "介紹大一必知的 4 大台灣官方財經資料庫門戶：1. **主計總處 (dgbas.gov.tw)**：查 CPI 通膨與 GDP 成長率；2. **證交所 (twse.com.tw / MOPS)**：查上市公司財報與 P/E 本益比；3. **金管會銀行局 (bank.gov.tw)**：查數位帳戶統計與存保公告；4. **中央銀行 (cbc.gov.tw)**：查每日匯率收盤與外匯存底。\n\n【官方數據引述】：中華民國四大財經部會官方門戶。"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "資安護甲 ‧ 防詐2FA",
    "categoryEn": "Cybersecurity & Anti-Fraud",
    "title": "大一新鮮人全方位理財資安與防詐護甲",
    "titleEn": "大一新鮮人全方位理財資安與防詐護甲",
    "subtitle": "落實 2FA 雙重驗證、生物辨識、拒點釣魚簡訊與終身防詐 SOP 操作護甲",
    "subtitleEn": "Comprehensive personal cybersecurity: 2FA protocols, phishing defenses, and anti-fraud armor",
    "quickTakeaways": [
      "核心重點：落實 2FA 雙重驗證、生物辨識、拒點釣魚簡訊與終身防詐 SOP 操作護甲",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Comprehensive personal cybersecurity: 2FA protocols, phishing defenses, and anti-fraud armor",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "強調：『資安與防詐是你理財道路上的第一道防線，防線破裂一切歸零！』",
    "discussionQuestionEn": "Discussion Inquiry: 強調：『資安與防詐是你理財道路上的第一道防線，防線破裂一切歸零！』",
    "teachingNotes": "總結保護資產與清白信用的 4 重防禦裝備：1. **2FA 兩步驟驗證**：開啟 App 2FA，OTP 驗證碼視為最高機密絕不透漏；2. **絕不出租金融帳戶**：出借提款卡觸犯《洗錢防制法》，面臨警示帳戶凍結；3. **簡訊短網址防範**：認明 `.com.tw`，不點擊奇怪 `.xyz` 連結；4. **信用卡全額繳清**：遠離 15% 循環利息，建立良好 JCIC 分數。\n\n【官方數據引述】：內政部警政署 165 反詐騙專線與法務部洗錢防制宣導。"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "健檢指標 ‧ 四大財務力",
    "categoryEn": "Financial Health: 4 Metrics",
    "title": "財務健全度 4 大指標自測 (緊急預備金、負債比、儲蓄率、流動性)",
    "titleEn": "財務健全度 4 大指標自測 (緊急預備金、負債比、儲蓄率、流動性)",
    "subtitle": "檢核個人財務體質：緊急預備金月數、儲蓄率、負債比與流動性健康自評",
    "subtitleEn": "Self-assessing the four core financial health indicators: emergency funds, savings, and debt",
    "quickTakeaways": [
      "核心重點：檢核個人財務體質：緊急預備金月數、儲蓄率、負債比與流動性健康自評",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Self-assessing the four core financial health indicators: emergency funds, savings, and debt",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "請學生心算自己當前的月儲蓄率與緊急預備金月數。",
    "discussionQuestionEn": "Discussion Inquiry: 請學生心算自己當前的月儲蓄率與緊急預備金月數。",
    "teachingNotes": "提供大一新鮮人個人財務健康自我健檢表：1. **緊急預備金**：3-6 個月生活費（存於高利活存）；2. **信用卡負債比**：0%（每月全額繳清）；3. **月儲蓄率**：>= 20% 總收入（發薪日先儲蓄後消費）；4. **流動資產比率**：>= 30% 總資產（保留適當現金，避免跌時被迫賣股）。\n\n【官方數據引述】：理財規劃師 (CFP) 個人財務健檢標準表。"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "第二小時 ‧ 模擬器預告",
    "categoryEn": "Hour 2 Recap & Lab Preview",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "第二小時小結與專屬活動預告",
    "subtitle": "第二小時個案整併完成，啟動【大學生 10 萬元綜合資產配置模擬器】實測",
    "subtitleEn": "Hour 2 review summary and launching the 100k Asset Allocation Portfolio Simulator",
    "quickTakeaways": [
      "核心重點：第二小時個案整併完成，啟動【大學生 10 萬元綜合資產配置模擬器】實測",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Hour 2 review summary and launching the 100k Asset Allocation Portfolio Simulator",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行 10 萬元資產配置模擬演練。",
    "discussionQuestionEn": "Discussion Inquiry: 指導學生開啟網頁版 Modal，準備進行 10 萬元資產配置模擬演練。",
    "teachingNotes": "總結第二小時核心觀念：W5-W7 被動投資、高利活存與即期外匯；個案 C/D/E 10萬資產配置、海外旅遊精算與降息傳導鏈；官方 4 大資料庫、資安護甲與 4 大財務健全指標。預告第 2 小時 Modal 實務活動——「大學生 10 萬元綜合資產配置模擬器」，引導學生分配比例並計算預期報酬與回撤。\n\n【官方數據引述】：115管理探索二團隊建置。"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "會考應試 ‧ 4大題型心法",
    "categoryEn": "Exam Strategy: 4 Question Types",
    "title": "期中會考命題方向與 4 大題型解題心法",
    "titleEn": "期中會考命題方向與 4 大題型解題心法",
    "subtitle": "拆解期中會考單選、情境題、計算題與簡答題之命題邏輯與解題策略",
    "subtitleEn": "Decoding midterm exam questions across conceptual, computational, and scenario formats",
    "quickTakeaways": [
      "核心重點：拆解期中會考單選、情境題、計算題與簡答題之命題邏輯與解題策略",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Decoding midterm exam questions across conceptual, computational, and scenario formats",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提醒：『做選擇題時，看到「絕對保證獲利」這種誇大字眼，99% 是錯誤選項！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒：『做選擇題時，看到「絕對保證獲利」這種誇大字眼，99% 是錯誤選項！』",
    "teachingNotes": "解析期中會考評量 4 大維度與高分技巧：1. **觀念觀測題 (30%)**：CPI通膨、名目實質利率、升降息債券價格、P/E；2. **算術應用題 (30%)**：通膨購買力、高利活存上限、海外回饋點差；3. **迷思判讀題 (20%)**：填息陷阱、美金定存匯損、15% 循環利息起算點；4. **綜合個案題 (20%)**：10萬資產配置、雙幣卡、降息傳導鏈。\n\n【官方數據引述】：115學年度「管理探索二」期中會考命題小組。"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "常錯陷阱 1 ‧ 實質利率",
    "categoryEn": "Trap 1: Real Interest Rates",
    "title": "觀念題常錯陷阱 1：名目利率與實質利率的通膨扣除",
    "titleEn": "觀念題常錯陷阱 1: 名目利率與實質利率的通膨扣除",
    "subtitle": "徹底弄懂實質利率 = 名目利率 - CPI 通膨率，避免誤把負收益當獲利",
    "subtitleEn": "Trap 1: Real return arithmetic and subtracting inflation to reveal real purchasing power",
    "quickTakeaways": [
      "核心重點：徹底弄懂實質利率 = 名目利率 - CPI 通膨率，避免誤把負收益當獲利",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Trap 1: Real return arithmetic and subtracting inflation to reveal real purchasing power",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "問學生：『如果題目給的名目利率是 3%，通膨率是 3.5%，實質利率是多少？（答案：-0.5%）』",
    "discussionQuestionEn": "Discussion Inquiry: 問學生：『如果題目給的名目利率是 3%，通膨率是 3.5%，實質利率是多少？（答案：-0.5%）』",
    "teachingNotes": "深度解密會考常錯陷阱 1。題目：「小強把 10 萬元存入銀行獲得 2.0% 年利率，一年後購買力增加 2.0%？」解析：錯！必須扣除 CPI 通膨率。若 CPI 通膨率為 2.8%，實質利率為 `2.0% - 2.8% = -0.8%`，實質購買力反而減少了 0.8%！提醒學生考題一定要看清是否有給定通膨率數字。\n\n【官方數據引述】：115管理探索二考前常錯題庫。"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "常錯陷阱 2 ‧ 高股息填息",
    "categoryEn": "Trap 2: ETF Ex-Dividend Math",
    "title": "觀念題常錯陷阱 2：高股息 ETF 填息與收益平準金配息真相",
    "titleEn": "觀念題常錯陷阱 2: 高股息 ETF 填息與收益平準金配息真相",
    "subtitle": "解密除息並非賺到額外利息，唯有填息才是真正獲利與平準金法規界限",
    "subtitleEn": "Trap 2: High-dividend ETF ex-dividend mechanics and true capital appreciation vs reserves",
    "quickTakeaways": [
      "核心重點：解密除息並非賺到額外利息，唯有填息才是真正獲利與平準金法規界限",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Trap 2: High-dividend ETF ex-dividend mechanics and true capital appreciation vs reserves",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "強調：『只有股價填息了，配到手上的股息才是真正的獲利！』",
    "discussionQuestionEn": "Discussion Inquiry: 強調：『只有股價填息了，配到手上的股息才是真正的獲利！』",
    "teachingNotes": "深度解密會考常錯陷阱 2。題目：「某高股息 ETF 宣稱年化配息率 10%，代表投資人穩賺 10% 報酬？」解析：錯！除息當天股價會直接扣除配息金額。若股價沒有「填息」，配息只是自己左口袋換右口袋；且配息可能包含本金返還（收益平準金）。強調配息率不等同於投資報酬率！\n\n【官方數據引述】：115管理探索二考前常錯題庫。"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "常錯陷阱 3 ‧ 循環利息",
    "categoryEn": "Trap 3: Revolving Interest",
    "title": "觀念題常錯陷阱 3：信用卡 0% 分期與循環利息的起算點",
    "titleEn": "觀念題常錯陷阱 3: 信用卡 0% 分期與循環利息的起算點",
    "subtitle": "剖析信用卡未全額繳清時，自各筆消費入帳日起算之 15% 循環高利黑洞",
    "subtitleEn": "Trap 3: Credit card grace periods vs backdated 15% revolving interest on unpaid balances",
    "quickTakeaways": [
      "核心重點：剖析信用卡未全額繳清時，自各筆消費入帳日起算之 15% 循環高利黑洞",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Trap 3: Credit card grace periods vs backdated 15% revolving interest on unpaid balances",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "警示：『循環利息按日回溯計息非常殘酷，絕不能心存僥倖！』",
    "discussionQuestionEn": "Discussion Inquiry: 警示：『循環利息按日回溯計息非常殘酷，絕不能心存僥倖！』",
    "teachingNotes": "深度解密會考常錯陷阱 3。題目：「信用卡只繳最低應繳金額，未繳餘額的 15% 循環利息從月底繳款截止日開始計算？」解析：大錯特錯！銀行計息起算日是「往回溯及自店家刷卡入帳日當天」開始按日計息！而且當月所有新消費都失去免息期！\n\n【官方數據引述】：115管理探索二考前常錯題庫。"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "常錯陷阱 4 ‧ 美元匯損",
    "categoryEn": "Trap 4: FX Currency Risk",
    "title": "觀念題常錯陷阱 4：美元 5% 高利定存與台幣升值匯損陷阱",
    "titleEn": "觀念題常錯陷阱 4: 美元 5% 高利定存與台幣升值匯損陷阱",
    "subtitle": "看懂美金定存 5% 高息在台幣升值 32.5 轉 30.0 時賺利息賠匯差之致命衝擊",
    "subtitleEn": "Trap 4: Earning 5% USD yield while losing capital to currency appreciation swings",
    "quickTakeaways": [
      "核心重點：看懂美金定存 5% 高息在台幣升值 32.5 轉 30.0 時賺利息賠匯差之致命衝擊",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Trap 4: Earning 5% USD yield while losing capital to currency appreciation swings",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "齊聲朗讀：『賺了利息，小心賠了匯差！外幣理財必須兼顧匯率走勢。』",
    "discussionQuestionEn": "Discussion Inquiry: 齊聲朗讀：『賺了利息，小心賠了匯差！外幣理財必須兼顧匯率走勢。』",
    "teachingNotes": "深度解密會考常錯陷阱 4。題目：「美元定存利率 5% 遠高於台幣定存 1.7%，所以存美元一定比存台幣賺？」解析：錯！忽視了匯率貶值風險。若存入期間新台幣大幅升值 8%（USD/TWD 從 32.5 升至 29.9），美元利息 5% 將完全被 8% 匯損吃掉，總帳反而淨虧損 3%！\n\n【官方數據引述】：115管理探索二考前常錯題庫。"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "自我審視 ‧ 成長量表",
    "categoryEn": "Self-Audit: Habit Evolution",
    "title": "期中大審視：個人前 7 週財經習慣改變與成長自測量表",
    "titleEn": "期中大審視: 個人前 7 週財經習慣改變與成長自測量表",
    "subtitle": "檢驗前 7 週個人生活習慣改變：記帳、拒當月光族、數位帳戶與投資開戶",
    "subtitleEn": "Midterm self-audit: tracking personal behavioral transformation across 7 weeks of study",
    "quickTakeaways": [
      "核心重點：檢驗前 7 週個人生活習慣改變：記帳、拒當月光族、數位帳戶與投資開戶",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Midterm self-audit: tracking personal behavioral transformation across 7 weeks of study",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "請學生為自己在前 8 週的財經素養進步打分（1-10 分）。",
    "discussionQuestionEn": "Discussion Inquiry: 請學生為自己在前 8 週的財經素養進步打分（1-10 分）。",
    "teachingNotes": "引導學生進行期中財經習慣成長自測：從入學前隨意開戶、聽明牌買飆股、看到回饋就刷卡繳最低，轉變為**「精算高利活存上限、定期定額 0050/VOO 微笑曲線、信用卡全額繳清、即期分批換匯與拒絕 DDC 結算」**。見證自己在短短 8 週內的驚人財經素養蛻變！\n\n【官方數據引述】：115管理探索二學生學習成效問卷設計。"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "後續前瞻 ‧ 課程藍圖",
    "categoryEn": "Curriculum Preview: W9-W18",
    "title": "後半學期 (W9-W18) 課程藍圖前瞻：從個人理財邁向產業與全球經濟",
    "titleEn": "後半學期 (W9-W18) 課程藍圖前瞻: 從個人理財邁向產業與全球經濟",
    "subtitle": "預覽從個人財務（保險、房地產、稅務、生涯）邁向國家半導體、AI 與全球宏觀",
    "subtitleEn": "Previewing the journey from personal finance to semiconductors, AI, and global macro",
    "quickTakeaways": [
      "核心重點：預覽從個人財務（保險、房地產、稅務、生涯）邁向國家半導體、AI 與全球宏觀",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Previewing the journey from personal finance to semiconductors, AI, and global macro",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "激勵學生：『期中過後，我們將帶大家解密半導體 AI 產業鏈與全球經濟的精彩趨勢！』",
    "discussionQuestionEn": "Discussion Inquiry: 激勵學生：『期中過後，我們將帶大家解密半導體 AI 產業鏈與全球經濟的精彩趨勢！』",
    "teachingNotes": "前瞻期中過後後半學期的課程藍圖。課程視野將從個人理財邁向產業與全球經濟：W9-W12 聚焦於「保險基礎、房地產租買決策與個人報稅規劃」；W13-W18 踏入「半導體 AI 產業鏈、綠色金融 ESG、加密貨幣 Web3 與期末專案發表」。\n\n【官方數據引述】：115學年度「管理探索二」後半學期課程綱要。"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "終身準則 ‧ 7大金律",
    "categoryEn": "7 Golden Financial Rules",
    "title": "期中全方位財經金律總整合 (7 大黃金守則)",
    "titleEn": "期中全方位財經金律總整合 (7 大黃金守則)",
    "subtitle": "融會前 7 週精華：建立不可動搖的 7 項理財黃金鐵律，伴隨大學四年與未來一生",
    "subtitleEn": "Synthesizing 7 golden financial principles as a lifelong compass for personal wealth",
    "quickTakeaways": [
      "核心重點：融會前 7 週精華：建立不可動搖的 7 項理財黃金鐵律，伴隨大學四年與未來一生",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Synthesizing 7 golden financial principles as a lifelong compass for personal wealth",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "請學生將 7 大黃金守則拍照存留於手機，作為終身理財座右銘。",
    "discussionQuestionEn": "Discussion Inquiry: 請學生將 7 大黃金守則拍照存留於手機，作為終身理財座右銘。",
    "teachingNotes": "總結陪伴大一新鮮人終身受用的 7 大財經黃金守則：1. 不懂的商品絕對不買；2. 實質利率才是真實獲利 (Real Rate)；3. 指數化被動投資長抱 (DCA)；4. 信用卡帳單全額繳清；5. 換匯看即期拒絕 DDC；6. 緊急預備金留足 3-6 個月；7. 2FA 護甲與零出租帳戶。\n\n【官方數據引述】：115學年度「管理探索二」課程核心價值。"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "知識全景 ‧ 體系總結",
    "categoryEn": "Knowledge Graph & Synthesis",
    "title": "第八週全景知識體系圖與期中總結",
    "titleEn": "第八週全景知識體系圖與期中總結",
    "subtitle": "以全景心智圖總覽前 7 週財經知識體系，打通總體經濟與個人決策之任督二脈",
    "subtitleEn": "Visualizing the panoramic knowledge graph bridging personal finance and macroeconomics",
    "quickTakeaways": [
      "核心重點：以全景心智圖總覽前 7 週財經知識體系，打通總體經濟與個人決策之任督二脈",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Visualizing the panoramic knowledge graph bridging personal finance and macroeconomics",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "discussionQuestionEn": "Discussion Inquiry: 引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "teachingNotes": "以全景邏輯結構圖將第八週 30 頁純教學卡片進行整體串聯：Hour 1 (前半學期總複習 ➔ 迷思解密) ➔ Hour 2 (後半學期總複習 ➔ 10萬資產配置 ➔ 雙幣卡精算 ➔ 降息傳導 ➔ 4大官方資料庫 ➔ 財務健檢) ➔ Hour 3 (會考4題型心法 ➔ 4大常錯陷阱 ➔ 成長量表 ➔ 7大黃金守則)。\n\n【官方數據引述】：115學年度「管理探索二」期中全景圖。"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "學習反思 ‧ 第九週預告",
    "categoryEn": "Reflection & W9 Preview",
    "title": "學習反思與第九週預告 (保險基礎、風險管理與個人保障規劃)",
    "titleEn": "學習反思與第九週預告 (保險基礎、風險管理與個人保障規劃)",
    "subtitle": "反思期中學習收穫，預告第九週【保險基礎、風險管理與個人保障規劃】新篇章",
    "subtitleEn": "Midterm reflection and forward preview of Week 9: Insurance Basics & Risk Management",
    "quickTakeaways": [
      "核心重點：反思期中學習收穫，預告第九週【保險基礎、風險管理與個人保障規劃】新篇章",
      "理論指引：深入結合前 7 週基礎，落實於大一日常生活與期中綜合評核。",
      "決策行動：掌握官方權威數據查核，建立理性客觀的財務護城河。"
    ],
    "quickTakeawaysEn": [
      "Key Point: Midterm reflection and forward preview of Week 9: Insurance Basics & Risk Management",
      "Theoretical Grounding: Synthesizing concepts from Weeks 1-7 for college financial health.",
      "Actionable Strategy: Leveraging verified official data to build a resilient financial moat."
    ],
    "discussionQuestion": "提醒學生課後提交期中報告，並預習第九週保險基礎主題。",
    "discussionQuestionEn": "Discussion Inquiry: 提醒學生課後提交期中報告，並預習第九週保險基礎主題。",
    "teachingNotes": "恭喜學生完成第八週期中總複習與學習成果檢核！指導學生點擊 navbar 上方的「📝 本週課堂作業」按鈕，線上填寫並提交「期中學習反思與個人綜合理財報告」。預告第九週課程主題：「保險基礎、風險管理與個人保障規劃」，下週將帶大家探索薩繆爾森風險管理、醫療險與防癌險配置！\n\n【官方數據引述】：115學年度「管理探索二」課程計畫。"
  }
];
