/**
 * 115學年度「管理探索二」第四週教學資料庫
 * 單元名稱：股市入門與企業價值估算
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W4_SCHEDULE_TABLE = [
  {
    "hour": "第一小時 (00:00-00:50)",
    "title": "股票本質與資本市場",
    "slides": "Slide 01 - 10",
    "summary": "買股票的法律本質、一級 IPO vs 二級 TWSE、股東四大權益、台積電股權結構 (外資73%)、普通股 vs 特別股、盤中零股新制、現金股利 vs 股票股利。",
    "activity": "🎯 專屬活動：台積電 / 蘋果股權與零股股利試算盤（輸入持有股數與季配息，計算年度被動收入與微型股東權益）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第二小時 (00:50-01:40)",
    "title": "企業價值與估值指標",
    "slides": "Slide 11 - 20",
    "summary": "價格 vs 價值天秤、本益比 (P/E) 雙向指標、珍奶店 A vs B 實戰估值、彼得林區 PEG 成長比、股價淨值比 (P/B)、高殖利率陷阱、除權息真諦、ROE 杜邦分析、三大財務報表。",
    "activity": "🎯 專屬活動：珍奶店 A vs. B 本益比 P/E & PEG 估值比較器（輸入市值、獲利與成長率，自動研判昂貴/合理/便宜）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第三小時 (01:40-02:30)",
    "title": "護城河與決策紀律",
    "slides": "Slide 21 - 30",
    "summary": "巴菲特五大經濟護城河、資本支出 CAPEX 與折舊、自由現金流 FCF 生命線、葛拉漢安全邊際 (Margin of Safety)、市場先生 (Mr. Market)、能力圈原則、大一新鮮人四大投資金律。",
    "activity": "🎮 重磅小遊戲：股市入門與企業價值估值大挑戰 (4關卡) ＋ 📝 課堂實務作業：標的企業本益比與 ROE 估值分析報告現場提交",
    "timeAlloc": "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W4_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "第四週課程導論：股市入門與企業價值估算",
    "titleEn": "W4 Slide 01: 第四週課程導論：股市入門與企業價值估算",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 01 (Hour 1)",
    "teachingNotes": "本頁旨在開啟第四週的核心主題。引述股神巴菲特名言：「價格是你付出的，價值是你獲得的 (Price is what you pay. Value is what you get.)。」許多社會新鮮人或大學生常以為買股票是賭博、買明牌或下注彩券，但股票的法律與經濟本質是「企業的微型股權」。當你買進 1 股台積電或蘋果股票時，你便真實擁有了這家全球巨擘的資產、專利與未來獲利分紅權。本單元將帶領學生從價格與價值的本質出發，建立理性估值與基本面分析架構。\n\n【官方數據】：引述臺灣證券交易所 (TWSE) 統計，台灣證券市場開戶人數已突破 1,250 萬人，其中 19 至 30 歲年輕族群開戶佔比大幅拉升，顯示大一新鮮人具備極高的理財探索需求。",
    "discussionQuestion": "詢問學生：「如果有一家手搖飲料店開在學校門口生意很好，你拿 10,000 元跟老闆頂下 1% 的股份，這跟你在 App 上買股票有什麼不同？」",
    "discussionQuestionEn": "詢問學生：「如果有一家手搖飲料店開在學校門口生意很好，你拿 10,000 元跟老闆頂下 1% 的股份，這跟你在 App 上買股票有什麼不同？」",
    "quickTakeaways": [
      "第四週課程導論：股市入門與企業價值估算 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 第四週課程導論：股市入門與企業價值估算",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_01"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "第四週 3 小時學習地圖與核心技能樹",
    "titleEn": "W4 Slide 02: 第四週 3 小時學習地圖與核心技能樹",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 02 (Hour 1)",
    "teachingNotes": "本頁為學生展示第四週 3 小時（共 180 分鐘）的完整學習藍圖。第一小時聚焦於股票本質、IPO 一級市場與 TWSE 二級市場區分、股東四大基本權益，以及台積電 (2330) 全球股權結構；第二小時深入企業估值三大核心指標：本益比 (P/E)、股價淨值比 (P/B)、EV/EBITDA、本益比河流圖與同業比對法；第三小時進入三大財務報表速讀、毛利率與純益率分析、巴菲特 ROE 杜邦拆解、經濟護城河與大一理性投資四大金律。\n\n【官方數據】：依據金管會證期局發行規範，本課程規劃完全對齊大一通識零背景學童之通識養成標準。",
    "discussionQuestion": "說明評量方式：「本週我們將進行珍奶店估值 PK 與估值大挑戰小遊戲，大家將學會像華爾街分析師一樣幫企業評定合理股價。」",
    "discussionQuestionEn": "說明評量方式：「本週我們將進行珍奶店估值 PK 與估值大挑戰小遊戲，大家將學會像華爾街分析師一樣幫企業評定合理股價。」",
    "quickTakeaways": [
      "第四週 3 小時學習地圖與核心技能樹 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 第四週 3 小時學習地圖與核心技能樹",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_02"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "股票的本質：買股票到底是在買什麼？",
    "titleEn": "W4 Slide 03: 股票的本質：買股票到底是在買什麼？",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 03 (Hour 1)",
    "teachingNotes": "本頁運用「合夥開連鎖早餐店」的生活化案例解說股票發行。假設 4 位朋友合資 1,000 萬元開飲料店，拆分為 100 萬股（每股面額 10 元）。若你出資 250 萬持有 25 萬股（25% 股權），當飲料店一年賺 200 萬時，你可分得 50 萬元現金股利。當這家公司擴大規模在證交所掛牌上市 (IPO)，這 100 萬股便成為可在公開市場自由交易的股票。教師必須強調：股票絕非空洞數字，每張股票背後都對應著實體廠房、設備與獲利能力。\n\n【官方數據】：引述經濟部商業署《公司法》第 156 條規範，公司資本應分為股份，每股金額一律平等。",
    "discussionQuestion": "請學生思考：「如果你買了早餐店的股票，當早餐店買進新的烤麵包機和咖啡機時，這些設備有包含在你持有的股權裡面嗎？」",
    "discussionQuestionEn": "請學生思考：「如果你買了早餐店的股票，當早餐店買進新的烤麵包機和咖啡機時，這些設備有包含在你持有的股權裡面嗎？」",
    "quickTakeaways": [
      "股票的本質：買股票到底是在買什麼？ 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 股票的本質：買股票到底是在買什麼？",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_03"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "資本市場雙重輪廓：一級市場 (IPO) vs. 二級市場 (TWSE)",
    "titleEn": "W4 Slide 04: 資本市場雙重輪廓：一級市場 (IPO) vs. 二級市場 (TWSE)",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 04 (Hour 1)",
    "teachingNotes": "本頁協助初學者釐清資本市場的兩大層次。一級市場（初級市場/IPO 承銷）是企業向大眾發行新股籌集資金的地方，投資人的資金會直接流入公司帳戶，用於蓋工廠、買設備或進行研發；二級市場（次級市場，如台灣證交所 TWSE、紐約證交所 NYSE）則是投資人之間互相轉讓已發行股票的場所，資金在買賣雙方投資人之間轉移，公司帳戶不會收到任何交易金額。大學生在手機 App 買賣台積電屬於二級市場。\n\n【官方數據】：引述臺灣證券交易所 (TWSE) 統計，台股二級市場每日成交金額約在 3,000 億至 5,000 億元新台幣之間，提供極高流動性。",
    "discussionQuestion": "提問：「當你在 App 買進一張台積電股票，花掉了 100 萬元，請問台積電公司會收到這 100 萬元去蓋晶圓廠嗎？為什麼？」",
    "discussionQuestionEn": "提問：「當你在 App 買進一張台積電股票，花掉了 100 萬元，請問台積電公司會收到這 100 萬元去蓋晶圓廠嗎？為什麼？」",
    "quickTakeaways": [
      "資本市場雙重輪廓：一級市場 (IPO) vs. 二級市場 (TWSE) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 資本市場雙重輪廓：一級市場 (IPO) vs. 二級市場 (TWSE)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_04"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "股東的四大基本權益：分紅、投票與剩餘財產",
    "titleEn": "W4 Slide 05: 股東的四大基本權益：分紅、投票與剩餘財產",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 05 (Hour 1)",
    "teachingNotes": "本頁介紹持有股票所獲得的法律與經濟權益：1. 盈餘分配權：按持股比例參與現金股利與股票股利發放；2. 表決投票權：參與股東常會 (AGM)，對董事選任、重大資產處分進行投票（一股一票）；3. 剩餘財產請求權：若公司不幸解散清算，在清償所有債權人（銀行、債券持有人）後，剩下的殘值按股本分配；4. 股份自由轉讓權：可在公開市場隨時變現，享有流動性。\n\n【官方數據】：引述中華民國《公司法》第 198 條（累積投票制）與第 235 條（股息紅利分配）法律條文。",
    "discussionQuestion": "請學生排列清償順序：「如果一家公司倒閉清算，銀行借款、員工薪水、公司債持有人與普通股股東，誰最後一個拿錢？這代表股東承受什麼風險？」",
    "discussionQuestionEn": "請學生排列清償順序：「如果一家公司倒閉清算，銀行借款、員工薪水、公司債持有人與普通股股東，誰最後一個拿錢？這代表股東承受什麼風險？」",
    "quickTakeaways": [
      "股東的四大基本權益：分紅、投票與剩餘財產 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 股東的四大基本權益：分紅、投票與剩餘財產",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_05"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "實證案例：台積電 (2330 / TSM) 全球股權結構與市值",
    "titleEn": "W4 Slide 06: 實證案例：台積電 (2330 / TSM) 全球股權結構與市值",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 06 (Hour 1)",
    "teachingNotes": "本頁以台灣護國神山台積電 (2330) 為實證案例。截至 2026 最新官方數據，台積電總發行股數為 259.3 億股。當股價為 1,000 元時，總市值高達 25.93 兆元新台幣。拆解其股權結構：外資法人（花旗託管、挪威主權基金、貝萊德、先鋒）高達 73.2%；行政院國發基金持有 6.38%（約 16.5 億股）；本國金融機構與人壽保險持有 11.5%；本國自然人散戶（超過 140 萬股東）佔比約 9.0%。\n\n【官方數據】：依據公開資訊觀測站 (MOPS) 與台灣證券交易所 (TWSE) 2026 年最新股東結構申報資料。",
    "discussionQuestion": "展示數據圖表，詢問學生：「外資持股台積電超過 73%，這對台股指數與新台幣匯率波動會帶來什麼直接連動效果？」",
    "discussionQuestionEn": "展示數據圖表，詢問學生：「外資持股台積電超過 73%，這對台股指數與新台幣匯率波動會帶來什麼直接連動效果？」",
    "quickTakeaways": [
      "實證案例：台積電 (2330 / TSM) 全球股權結構與市值 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 實證案例：台積電 (2330 / TSM) 全球股權結構與市值",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_06"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "普通股 (Common) vs. 優先股 (Preferred) 的權益比較",
    "titleEn": "W4 Slide 07: 普通股 (Common) vs. 優先股 (Preferred) 的權益比較",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 07 (Hour 1)",
    "teachingNotes": "本頁比較企業發行的兩大主要股票類型。普通股 (Common Stock) 具備完整的股東投票權，股利視公司獲利多寡而定，價格波動較大，享有公司暴利成長的資本利得；優先股/特別股 (Preferred Stock) 通常無投票權，但享有固定股利（如 4%~5% 息率），且清算時的受償順序優先於普通股。適合偏好固定收益、不願承擔高股價波動的保守型法人投資人。\n\n【官方數據】：依據美國 SEC 與金管會證期局特別股發行辦法，特別股兼具「債券防守性」與「股票股權」之混合特性。",
    "discussionQuestion": "請學生思考：「如果你是退休族，需要穩定的生活費，你會偏好買普通股還是特別股？為什麼？」",
    "discussionQuestionEn": "請學生思考：「如果你是退休族，需要穩定的生活費，你會偏好買普通股還是特別股？為什麼？」",
    "quickTakeaways": [
      "普通股 (Common) vs. 優先股 (Preferred) 的權益比較 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 普通股 (Common) vs. 優先股 (Preferred) 的權益比較",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_07"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "股票發行與市值算術：市值 (Market Cap) 公式",
    "titleEn": "W4 Slide 08: 股票發行與市值算術：市值 (Market Cap) 公式",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 08 (Hour 1)",
    "teachingNotes": "本頁講解衡量企業規模的最精準尺規——總市值 (Market Capitalization)：$$\\text{Market Cap} = \\text{Stock Price} \\times \\text{Shares Outstanding}$$。教師必須破解大一新鮮人極常見的迷思：「A 股票單股 500 元，B 股票單股 50 元，所以 A 公司比 B 公司貴 10 倍？」這是嚴重的誤解！若公司 A 發行 1 億股（市值 500 億），公司 B 發行 20 億股（市值 1,000 億），公司 B 的實際企業規模比公司 A 大 2 倍！\n\n【官方數據】：引述臺灣證券交易所 (TWSE) 每日發行量加權股價指數市值計算標準。",
    "discussionQuestion": "帶領學生計算：「公司 C 股價 10 元，發行 100 億股；公司 D 股價 200 元，發行 1 億股。請問哪一家公司規模較大？市值分別是多少？」",
    "discussionQuestionEn": "帶領學生計算：「公司 C 股價 10 元，發行 100 億股；公司 D 股價 200 元，發行 1 億股。請問哪一家公司規模較大？市值分別是多少？」",
    "quickTakeaways": [
      "股票發行與市值算術：市值 (Market Cap) 公式 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 股票發行與市值算術：市值 (Market Cap) 公式",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_08"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "買股票能賺什麼？資本利得 (Capital Gain) vs. 股息 (Dividend)",
    "titleEn": "W4 Slide 09: 買股票能賺什麼？資本利得 (Capital Gain) vs. 股息 (Dividend)",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 09 (Hour 1)",
    "teachingNotes": "本頁拆解股票總回報 (Total Return) 的雙引擎公式：$$\\text{Total Return} = \\text{Capital Gain} + \\text{Dividend Yield}$$。1. 資本利得 (Capital Gain)：低價買進、高價賣出獲得的價差收益，源於企業本業獲利成長推升內在價值；2. 股息收益 (Dividend Yield)：公司將年度賺到的盈餘發還給股東。新鮮人必須理解兩者差別，避免只追求高股息卻賠了資本利得價差。\n\n【官方數據】：引述財政部賦稅署證券交易所得稅與股利所得課稅規範。",
    "discussionQuestion": "提問：「如果一家公司每年發 8% 股利，但股價一年跌了 15%，你最終是賺錢還是賠錢？總報酬率是多少？」",
    "discussionQuestionEn": "提問：「如果一家公司每年發 8% 股利，但股價一年跌了 15%，你最終是賺錢還是賠錢？總報酬率是多少？」",
    "quickTakeaways": [
      "買股票能賺什麼？資本利得 (Capital Gain) vs. 股息 (Dividend) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 買股票能賺什麼？資本利得 (Capital Gain) vs. 股息 (Dividend)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_09"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "第一小時 ‧ 股票與資本市場",
    "categoryEn": "Hour 1: Stocks & Capital Markets",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "W4 Slide 10: 第一小時小結與專屬活動預告",
    "subtitle": "115學年度 第四週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 4 Module 10 (Hour 1)",
    "teachingNotes": "本頁為第一小時進行總結，複習股票本質（微型股權）、一級/二級市場差別、市值公式（股價 × 總股數）與總報酬雙引擎。接著指引學生開啟雙語網頁中的第一小時專屬活動「🎯 1小時活動: 零股股權試算」，讓學生輸入 10,000 元預算，試算可買到的台積電或蘋果零股股數、每年可領股利與公司總市值。最後預告第二小時將深入本益比 (P/E) 等三大估值工具。\n\n【官方數據】：115管理探索二團隊開發之零股試算演算法。",
    "discussionQuestion": "提示學生：「請大家點擊網頁頂部按鈕，輸入你的零股買進預算，親眼看看 10,000 元能讓你成為多大企業的股東！」",
    "discussionQuestionEn": "提示學生：「請大家點擊網頁頂部按鈕，輸入你的零股買進預算，親眼看看 10,000 元能讓你成為多大企業的股東！」",
    "quickTakeaways": [
      "第一小時小結與專屬活動預告 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 第一小時小結與專屬活動預告",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_10"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "企業估值的核心靈魂：價格 (Price) 不等於價值 (Value)",
    "titleEn": "W4 Slide 11: 企業估值的核心靈魂：價格 (Price) 不等於價值 (Value)",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 11 (Hour 2)",
    "teachingNotes": "第二小時開始，本頁闡明估值的核心靈魂：評估股票是貴還是便宜，比較的是「你付出的價格」與「公司產生的獲利/資產」之相對比率。在菜市場買蘋果，1 顆 30 元很直觀；但在股市中，100 元的股票 A（每股每年賺 10 元，10 年回本）遠比 20 元的股票 B（每股每年賺 0.4 元，50 年回本）便宜得多！估值的本質就是計算回本年限與相對性。\n\n【官方數據】：引述葛拉漢與杜德經典著作《證券分析》(Security Analysis) 內在價值理論。",
    "discussionQuestion": "請學生比較：「一家門市賣 1,000 萬每年賺 200 萬，另一家賣 300 萬每年賺 10 萬，哪一家店比較便宜？為什麼？」",
    "discussionQuestionEn": "請學生比較：「一家門市賣 1,000 萬每年賺 200 萬，另一家賣 300 萬每年賺 10 萬，哪一家店比較便宜？為什麼？」",
    "quickTakeaways": [
      "企業估值的核心靈魂：價格 (Price) 不等於價值 (Value) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 企業估值的核心靈魂：價格 (Price) 不等於價值 (Value)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_11"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "最普及的估值工具：本益比 (Price-to-Earnings Ratio, P/E)",
    "titleEn": "W4 Slide 12: 最普及的估值工具：本益比 (Price-to-Earnings Ratio, P/E)",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 12 (Hour 2)",
    "teachingNotes": "本頁介紹華爾街最普及的估值指標——本益比 (P/E Ratio)：$$P/E = \\frac{\\text{Stock Price}}{\\text{EPS}} = \\frac{\\text{Market Cap}}{\\text{Net Income}}$$。本益比直觀代表在獲利能力維持不變下，投資人購買這家公司需要幾年能回本。例如台積電年度 EPS 為 40 元，當股價為 800 元時，本益比為 $800 \\div 40 = 20$ 倍（即 20 年回本）。台股大盤歷史平均本益比約在 12 至 18 倍區間輪動。\n\n【官方數據】：引述臺灣證券交易所 (TWSE) 每日發佈之發行量加權股價指數本益比統計資料。",
    "discussionQuestion": "帶領學生計算：「若某家半導體公司股價 500 元，今年 EPS 為 25 元，它的本益比是多少？代表幾年回本？」",
    "discussionQuestionEn": "帶領學生計算：「若某家半導體公司股價 500 元，今年 EPS 為 25 元，它的本益比是多少？代表幾年回本？」",
    "quickTakeaways": [
      "最普及的估值工具：本益比 (Price-to-Earnings Ratio, P/E) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 最普及的估值工具：本益比 (Price-to-Earnings Ratio, P/E)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_12"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "本益比河流圖 (P/E River Chart) 與歷史區間比對",
    "titleEn": "W4 Slide 13: 本益比河流圖 (P/E River Chart) 與歷史區間比對",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 13 (Hour 2)",
    "teachingNotes": "本頁教導學生如何運用「本益比河流圖 (P/E River Chart)」評估個股的相對貴賤。單看 P/E 數字（如 20 倍）無法斷定貴賤，必須與公司自身的 5 年歷史本益比區間比對：1. 紅色河流頂部 (P/E > 25 倍)：代表市場情緒過熱，估值透支未來夢想，修正風險高；2. 黃色河流中游 (P/E 15~20 倍)：屬於歷史合理估值區間；3. 綠色河流底部 (P/E < 12 倍)：代表市場過度悲觀拋售，內在價值具備安全邊際。\n\n【官方數據】：依據 TEJ 台灣經濟新報與國內各大券商法人研究報告評價規範。",
    "discussionQuestion": "展示河流圖，詢問學生：「當股價掉到綠色河流最底部，但公司本業營收依然成長時，這代表什麼投資機會？」",
    "discussionQuestionEn": "展示河流圖，詢問學生：「當股價掉到綠色河流最底部，但公司本業營收依然成長時，這代表什麼投資機會？」",
    "quickTakeaways": [
      "本益比河流圖 (P/E River Chart) 與歷史區間比對 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 本益比河流圖 (P/E River Chart) 與歷史區間比對",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_13"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "價值型 vs. 成長型企業：本益比高低的背後含義",
    "titleEn": "W4 Slide 14: 價值型 vs. 成長型企業：本益比高低的背後含義",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 14 (Hour 2)",
    "teachingNotes": "本頁探討為什麼科技飆股本益比可以高達 40 倍，而水泥股只有 10 倍。本益比實質反映了市場對企業「未來盈餘成長率 ($g$)」的預期：高本益比企業（成長股，如 AI、半導體）買的是未來的暴利成長潛力（EPS 年增 30%~50%），但若成長不如預期易遭殺估值；低本益比企業（價值股，如 金融、水泥、鋼鐵）獲利穩定但無大幅成長空間，提供穩定股利，但需防範衰退型企業的陷阱。\n\n【官方數據】：依據 Morningstar 股票風格箱 (Style Box) 分類標準與證券分析學派理論。",
    "discussionQuestion": "請學生思考：「如果一家 AI 公司的 P/E 高達 50 倍，但明年獲利突然停止成長，它的股價會發生什麼事？」",
    "discussionQuestionEn": "請學生思考：「如果一家 AI 公司的 P/E 高達 50 倍，但明年獲利突然停止成長，它的股價會發生什麼事？」",
    "quickTakeaways": [
      "價值型 vs. 成長型企業：本益比高低的背後含義 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 價值型 vs. 成長型企業：本益比高低的背後含義",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_14"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "第二大估值工具：股價淨值比 (Price-to-Book Ratio, P/B)",
    "titleEn": "W4 Slide 15: 第二大估值工具：股價淨值比 (Price-to-Book Ratio, P/B)",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 15 (Hour 2)",
    "teachingNotes": "本頁介紹第二大估值指標——股價淨值比 (P/B Ratio)：$$P/B = \\frac{\\text{Stock Price}}{\\text{BVPS}}$$。每股淨值 (BVPS) 代表公司清算清償所有負債後，分配給股東的清算殘值。當 P/B < 1.0 倍時，代表股價低於清算價。P/B 極為適合評估銀行、壽險、鋼鐵、面板與記憶體等「重資產」與「景氣循環」產業；輕資產軟體科技股因資產未反映在帳面上，P/B 通常偏高失真。\n\n【官方數據】：引述金管會銀行局與證券交易所景氣循環股評價規範。",
    "discussionQuestion": "提問：「為什麼評估金控公司或金庫銀行時，法人交易員主要看 P/B 淨值比，而不是看 P/E 本益比？」",
    "discussionQuestionEn": "提問：「為什麼評估金控公司或金庫銀行時，法人交易員主要看 P/B 淨值比，而不是看 P/E 本益比？」",
    "quickTakeaways": [
      "第二大估值工具：股價淨值比 (Price-to-Book Ratio, P/B) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 第二大估值工具：股價淨值比 (Price-to-Book Ratio, P/B)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_15"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "法人機構高級工具：企業價值倍數 (EV/EBITDA)",
    "titleEn": "W4 Slide 16: 法人機構高級工具：企業價值倍數 (EV/EBITDA)",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 16 (Hour 2)",
    "teachingNotes": "本頁介紹投資銀行與外資法人併購交易最常使用的進階工具——企業價值倍數 (EV/EBITDA)：$$\\text{EV/EBITDA} = \\frac{\\text{Enterprise Value (EV)}}{\\text{EBITDA}}$$。企業價值 (EV) 等於股市市值加淨負債，代表併購整家公司所需的真實現金；EBITDA 為息稅折舊攤銷前盈餘，代表本業產生的現金流。該指標能排除各國稅率差異、財務槓桿（負債比例）與折舊政策干擾，常用於跨國巨擘與 M&A 估值。\n\n【官方數據】：依據彭博 (Bloomberg) 與 CFA Institute 投資銀行實務估值手冊。",
    "discussionQuestion": "說明 преимуще匙：「為什麼在進行跨國併購時，投資銀行偏好使用 EV/EBITDA 而不是 P/E 比率？」",
    "discussionQuestionEn": "說明 преимуще匙：「為什麼在進行跨國併購時，投資銀行偏好使用 EV/EBITDA 而不是 P/E 比率？」",
    "quickTakeaways": [
      "法人機構高級工具：企業價值倍數 (EV/EBITDA) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 法人機構高級工具：企業價值倍數 (EV/EBITDA)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_16"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "自由現金流折現 (DCF) 估值法簡介",
    "titleEn": "W4 Slide 17: 自由現金流折現 (DCF) 估值法簡介",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 17 (Hour 2)",
    "teachingNotes": "本頁介紹華爾街理論上最嚴謹的絕對估值法 (Absolute Valuation)——DCF 模型：$$\\text{Intrinsic Value} = \\sum_{t=1}^N \\frac{\\text{FCFF}_t}{(1+\\text{WACC})^t} + \\frac{\\text{Terminal Value}}{(1+\\text{WACC})^N}$$。DCF 認為一家公司的內在價值等於其未來營運生命週期內產生的所有自由現金流 (FCFF) 折現回今天的總和。雖然其參數敏感度極高（折現率差 1% 估值差 30%），但它奠定了「資產價值源於未來現金流」的根基。\n\n【官方數據】：引述紐約大學 Stern 商學院 Aswath Damodaran 教授之估值教學體系。",
    "discussionQuestion": "引導學生思考：「為什麼 DCF 模型算出來的價值，會對未來的折現率 (WACC) 與永續成長率非常敏感？」",
    "discussionQuestionEn": "引導學生思考：「為什麼 DCF 模型算出來的價值，會對未來的折現率 (WACC) 與永續成長率非常敏感？」",
    "quickTakeaways": [
      "自由現金流折現 (DCF) 估值法簡介 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 自由現金流折現 (DCF) 估值法簡介",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_17"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "相對估值法：同業比對法 (Multiples Approach) 實務",
    "titleEn": "W4 Slide 18: 相對估值法：同業比對法 (Multiples Approach) 實務",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 18 (Hour 2)",
    "teachingNotes": "本頁示範實務上如何運用 3 步驟「同業比對法 (Peer Multiples)」評估新上市企業的股價：1. 選定同業同群 (Peer Group)：挑選業務與規模相似的上市公司（如半導體 IC 設計挑選聯發科、瑞昱）；2. 計算同業平均本益比：假設同業平均 P/E 為 18 倍；3. 計算目標合理股價：若目標新創公司今年預估 EPS 為 10 元，則合理估值為 $10 \\times 18 = 180$ 元。這是投行 IPO 訂價的核心做法。\n\n【官方數據】：依據券商承銷部 (Underwriting Dept) 新股上市承銷價格計算規範。",
    "discussionQuestion": "帶領學生演練：「如果一家新成立的手搖飲連鎖店要上市，同業平均 P/E 是 15 倍，該店 EPS 是 4 元，它的合理上市價格是多少？」",
    "discussionQuestionEn": "帶領學生演練：「如果一家新成立的手搖飲連鎖店要上市，同業平均 P/E 是 15 倍，該店 EPS 是 4 元，它的合理上市價格是多少？」",
    "quickTakeaways": [
      "相對估值法：同業比對法 (Multiples Approach) 實務 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 相對估值法：同業比對法 (Multiples Approach) 實務",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_18"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "估值陷阱防禦：避開本益比陷阱與一次性獲利誤導",
    "titleEn": "W4 Slide 19: 估值陷阱防禦：避開本益比陷阱與一次性獲利誤導",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 19 (Hour 2)",
    "teachingNotes": "本頁警示大一新鮮人避開兩大極具破壞力的「估值陷阱」：1. 一次性業外暴利陷阱：某公司出售閒置土地門市獲利 10 億，使今年 EPS 暴增至 20 元，股價 60 元（P/E 僅 3 倍）。但明年本業繼續虧損，P/E 3 倍是假象！2. 產業結構性衰退陷阱 (Value Trap)：傳統底片或衰退技術公司，獲利每年崩跌 50%，雖然 P/E 便宜，但 EPS 將持續沉淪使真實成本極高。\n\n【官方數據】：引述財團法人證券投資人保護中心 (SFIPO) 防範財報估值陷阱防護案例。",
    "discussionQuestion": "請學生檢驗：「當你看到一張股票 P/E 只有 3 倍，你第一步應該查閱什麼財務數據來確認它是不是陷阱？」",
    "discussionQuestionEn": "請學生檢驗：「當你看到一張股票 P/E 只有 3 倍，你第一步應該查閱什麼財務數據來確認它是不是陷阱？」",
    "quickTakeaways": [
      "估值陷阱防禦：避開本益比陷阱與一次性獲利誤導 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 估值陷阱防禦：避開本益比陷阱與一次性獲利誤導",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_19"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "第二小時 ‧ 估值與指標陷阱",
    "categoryEn": "Hour 2: Valuation & Indicator Traps",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "W4 Slide 20: 第二小時小結與專屬活動預告",
    "subtitle": "115學年度 第四週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 4 Module 20 (Hour 2)",
    "teachingNotes": "本頁為第二小時劃下句點，總結了本益比 (P/E)、股價淨值比 (P/B)、EV/EBITDA、同業比對法與陷阱防範。接著引導學生開啟雙語網頁中的第二小時專屬活動「🎯 2小時活動: 珍奶店估值」，讓學生親自輸入兩家營運狀況不同的珍奶店單股價格與 EPS，計算 P/E 本益比並找出真正的估值明珠。最後預告第三小時將深入三大財報與巴菲特 ROE 杜邦拆解。\n\n【官方數據】：115管理探索二團隊開發之珍奶店估值 PK 模組。",
    "discussionQuestion": "提示學生：「請大家打開第二小時活動 Modal，試著比較 120 元的珍奶店 A 與 30 元的珍奶店 B，看看哪一家才是真便宜！」",
    "discussionQuestionEn": "提示學生：「請大家打開第二小時活動 Modal，試著比較 120 元的珍奶店 A 與 30 元的珍奶店 B，看看哪一家才是真便宜！」",
    "quickTakeaways": [
      "第二小時小結與專屬活動預告 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 第二小時小結與專屬活動預告",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_20"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "大一財報速讀法：三大財務報表核心連動",
    "titleEn": "W4 Slide 21: 大一財報速讀法：三大財務報表核心連動",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 21 (Hour 3)",
    "teachingNotes": "進入第三小時實證階段，本頁教導新鮮人速讀三大財務報表：1. 損益表 (Income Statement)：動態紀錄一段期間內公司賺多少錢，核心為營業收入 ➔ 毛利 ➔ 營業利益 ➔ 稅後淨利 (EPS)；2. 資產負債表 (Balance Sheet)：靜態快照，核心等式為 $\\text{資產} = \\text{負債} + \\text{股東權益}$；3. 現金流量表 (Cash Flow)：防詐照妖鏡，紀錄營運 (CFO)、投資 (CFI) 與籌資 (CFF) 現金流量，確保公司沒有假帳。\n\n【官方數據】：依據金融監督管理委員會 (FSC) IFRS 國際財務報導準則體系規範。",
    "discussionQuestion": "請學生聯想：「如果損益表顯示公司賺了大錢，但現金流量表顯示營運現金流是負數，這代表公司遇到了什麼問題？」",
    "discussionQuestionEn": "請學生聯想：「如果損益表顯示公司賺了大錢，但現金流量表顯示營運現金流是負數，這代表公司遇到了什麼問題？」",
    "quickTakeaways": [
      "大一財報速讀法：三大財務報表核心連動 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 大一財報速讀法：三大財務報表核心連動",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_21"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "獲利能力三大指標：毛利率、營業利益率與純益率",
    "titleEn": "W4 Slide 22: 獲利能力三大指標：毛利率、營業利益率與純益率",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 22 (Hour 3)",
    "teachingNotes": "本頁剖析企業的獲利品質三部曲：1. 毛利率 (Gross Margin)：$\\frac{\\text{營業毛利}}{\\text{營業收入}}$，反映產品定價權與技術壁壘（如台積電毛利率高達 53%~55%）；2. 營業利益率 (Operating Margin)：$\\frac{\\text{營業利益}}{\\text{營業收入}}$，扣除推銷與研發費用後的本業真實獲利效率；3. 純益率 (Net Margin)：$\\frac{\\text{稅後淨利}}{\\text{營業收入}}$，最終留在股東口袋裡的純利比例。\n\n【官方數據】：依據公開資訊觀測站 (MOPS) 上市公司獲利能力統計比率。",
    "discussionQuestion": "帶領學生比較：「如果一家公司的毛利率高達 60%，但營業利益率只有 5%，這代表這家公司把錢花在什麼地方？」",
    "discussionQuestionEn": "帶領學生比較：「如果一家公司的毛利率高達 60%，但營業利益率只有 5%，這代表這家公司把錢花在什麼地方？」",
    "quickTakeaways": [
      "獲利能力三大指標：毛利率、營業利益率與純益率 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 獲利能力三大指標：毛利率、營業利益率與純益率",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_22"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "股東回報極致：股東權益報酬率 (ROE) 與杜邦拆解",
    "titleEn": "W4 Slide 23: 股東回報極致：股東權益報酬率 (ROE) 與杜邦拆解",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 23 (Hour 3)",
    "teachingNotes": "本頁介紹股神巴菲特最看重的第一指標——股東權益報酬率 (ROE)：$$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Equity}} = \\underbrace{\\frac{\\text{Net Income}}{\\text{Revenue}}}_{\\text{純益率 (獲利力)}} \\times \\underbrace{\\frac{\\text{Revenue}}{\\text{Assets}}}_{\\text{資產週轉率 (效率)}} \\times \\underbrace{\\frac{\\text{Assets}}{\\text{Equity}}}_{\\text{權益乘數 (槓桿)}}$$。巴菲特指出能連續 5 年 ROE 高於 15%~20% 的企業是頂尖企業！杜邦拆解揭示 ROE 來自三大驅動引擎：高利潤率、高資產轉動效率，或高財務槓桿。\n\n【官方數據】：引述杜邦公司 (DuPont) 經典財務管理分析模型與伯克夏哈薩威 (Berkshire Hathaway) 年報。",
    "discussionQuestion": "請學生思考：「如果一家公司的 ROE 高達 30%，但拆解後發現是因為權益乘數 (槓桿) 高達 10 倍，這隱藏了什麼財務風險？」",
    "discussionQuestionEn": "請學生思考：「如果一家公司的 ROE 高達 30%，但拆解後發現是因為權益乘數 (槓桿) 高達 10 倍，這隱藏了什麼財務風險？」",
    "quickTakeaways": [
      "股東回報極致：股東權益報酬率 (ROE) 與杜邦拆解 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 股東回報極致：股東權益報酬率 (ROE) 與杜邦拆解",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_23"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "實證數據調取：臺灣證券交易所 (TWSE) 與 MOPS 查閱",
    "titleEn": "W4 Slide 24: 實證數據調取：臺灣證券交易所 (TWSE) 與 MOPS 查閱",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 24 (Hour 3)",
    "teachingNotes": "本頁教導大一新鮮人拒絕網路明牌與假新聞，直接調取官方權威公開數據：1. 公開資訊觀測站 (MOPS: mops.twse.com.tw)：查詢上市櫃公司每季財務報告、每月營收與重大訊息；2. 臺灣證券交易所 (TWSE: twse.com.tw)：查詢每日收盤價、本益比、殖利率、股價淨值比與三大法人買賣超；3. 金管會證期局 (FSC)：查詢證券法規與法規裁罰，保護自身投資安全。\n\n【官方數據】：依據臺灣證券交易所 (TWSE) 與 MOPS 公開資訊開放平台架構。",
    "discussionQuestion": "引導學生操作：「當你在 LINE 群組看到某人宣稱某家公司月營收暴增 500% 時，你應該去哪個官方網站輸入股票代號驗證？」",
    "discussionQuestionEn": "引導學生操作：「當你在 LINE 群組看到某人宣稱某家公司月營收暴增 500% 時，你應該去哪個官方網站輸入股票代號驗證？」",
    "quickTakeaways": [
      "實證數據調取：臺灣證券交易所 (TWSE) 與 MOPS 查閱 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 實證數據調取：臺灣證券交易所 (TWSE) 與 MOPS 查閱",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_24"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "實證案例：台積電 (2330) vs. 聯電 (2303) P/E 與 ROE 比對",
    "titleEn": "W4 Slide 25: 實證案例：台積電 (2330) vs. 聯電 (2303) P/E 與 ROE 比對",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 25 (Hour 3)",
    "teachingNotes": "本頁進行晶圓代工雙雄台積電 (2330) 與聯電 (2303) 的實證估值比對。台積電主攻 2nm/3nm 先進行程，毛利率約 54.2%，ROE 高達 28.5%，市場給予 20~24 倍的高本益比溢價；聯電主攻成熟製程，毛利率約 32.1%，ROE 約 13.8%，市場本益比約 10~12 倍。實證顯示：資本市場極為聰明，願意給予高 ROE 與高護城河的企業顯著的估值溢價！\n\n【官方數據】：依據臺灣證券交易所 (TWSE) 暨兩家公司最新法人說明會 (Earnings Call) 財報數據。",
    "discussionQuestion": "提問：「為什麼聯電本益比只有 10 倍，但法人交易員卻願意花 22 倍本益比去買台積電？這反映了什麼競爭力差異？」",
    "discussionQuestionEn": "提問：「為什麼聯電本益比只有 10 倍，但法人交易員卻願意花 22 倍本益比去買台積電？這反映了什麼競爭力差異？」",
    "quickTakeaways": [
      "實證案例：台積電 (2330) vs. 聯電 (2303) P/E 與 ROE 比對 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 實證案例：台積電 (2330) vs. 聯電 (2303) P/E 與 ROE 比對",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_25"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "現金殖利率 (Dividend Yield) 與填息安全檢視",
    "titleEn": "W4 Slide 26: 現金殖利率 (Dividend Yield) 與填息安全檢視",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 26 (Hour 3)",
    "teachingNotes": "本頁探討散戶最愛的現金殖利率公式：$$\\text{Dividend Yield} = \\frac{\\text{DPS}}{\\text{Price}} \\times 100\\%$$。教師必須向學生釐清除息 (Ex-Dividend) 鐵律：發放 5 元股利時，除息當天股價會直接扣除 5 元。若股價未能漲回原價（填息），領股息只是「左手換右手」，甚至還要繳所得稅！防範貼息陷阱需檢驗：盈餘發放率適中 (50%~70%) 且本業營收持續成長。\n\n【官方數據】：依據財團法人證券投資人保護中心 (SFIPO) 除權息說明手冊。",
    "discussionQuestion": "請學生思考：「如果一家公司發放 10% 高額股利，但除息後股價連續下跌跌破底，這對投資人造成什麼實質傷害？」",
    "discussionQuestionEn": "請學生思考：「如果一家公司發放 10% 高額股利，但除息後股價連續下跌跌破底，這對投資人造成什麼實質傷害？」",
    "quickTakeaways": [
      "現金殖利率 (Dividend Yield) 與填息安全檢視 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 現金殖利率 (Dividend Yield) 與填息安全檢視",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_26"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "評估企業經濟護城河 (Economic Moats) 與溢價",
    "titleEn": "W4 Slide 27: 評估企業經濟護城河 (Economic Moats) 與溢價",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 27 (Hour 3)",
    "teachingNotes": "本頁介紹評估企業優質度的終極概念——經濟護城河 (Economic Moats)。護城河是保護企業高 ROE 不被競爭者侵蝕的結構性壁壘：1. 無形資產：專利技術（台積電晶圓專利）與品牌（Apple、可口可樂）；2. 網絡效應：用戶越多越有價值（Meta、Visa）；3. 高轉換成本：客戶更換供應商成本極高（Enterprise ERP、ASML 曝光機）；4. 成本優勢：規模經濟帶來的超低成本 (Amazon, Costco)。\n\n【官方數據】：依據 Morningstar 經濟護城河評估體系 (Pat Dorsey 著) 規範。",
    "discussionQuestion": "請學生舉例：「在你手邊使用的 App 或日常生活中，哪一家公司具備極高的『客戶轉換成本』讓你根本離開不了它？」",
    "discussionQuestionEn": "請學生舉例：「在你手邊使用的 App 或日常生活中，哪一家公司具備極高的『客戶轉換成本』讓你根本離開不了它？」",
    "quickTakeaways": [
      "評估企業經濟護城河 (Economic Moats) 與溢價 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 評估企業經濟護城河 (Economic Moats) 與溢價",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_27"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "大一新鮮人理性投資四大金律",
    "titleEn": "W4 Slide 28: 大一新鮮人理性投資四大金律",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 28 (Hour 3)",
    "teachingNotes": "本頁為大一新鮮人總結理性投資的四大金律：1. 絕不聽明牌炒作：不買不懂的公司，拒絕 LINE 飆股群組與社群媒體煽動；2. 堅持基本面與估值：買進前先算 P/E、查看 ROE 與官方財報，確保安全邊際；3. 分散風險不壓單押：利用 ETF 或跨產業配置，防範單一黑天鵝衝擊；4. 陪同好企業長期成長：讓複利效應 (Compounding) 成為財富積累的最佳夥伴。\n\n【官方數據】：依據金管會證期局 (FSC) 投資人教育與保護關懷原則。",
    "discussionQuestion": "請學生分享：「在四大金律中，你覺得哪一條對當前大學生最容易違反？我們應該如何建立自我纪律？」",
    "discussionQuestionEn": "請學生分享：「在四大金律中，你覺得哪一條對當前大學生最容易違反？我們應該如何建立自我纪律？」",
    "quickTakeaways": [
      "大一新鮮人理性投資四大金律 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 大一新鮮人理性投資四大金律",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_28"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "第四週全景知識體系圖與觀念整合",
    "titleEn": "W4 Slide 29: 第四週全景知識體系圖與觀念整合",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 29 (Hour 3)",
    "teachingNotes": "本頁整合第四週全景知識結構圖。從股權本質 (Hour 1: 股票=微型股權 ➔ IPO 一級/TWSE 二級 ➔ 市值=股價×股數 ➔ 總報酬=價差+股息)、估值指標 (Hour 2: 價格≠價值 ➔ P/E 回本年限 ➔ P/E 河流圖 ➔ P/B 淨值比 ➔ 同業比對與陷阱)，到財報實證 (Hour 3: 三大財報 ➔ 毛利率/純益率 ➔ 巴菲特 ROE 杜邦拆解 ➔ 台積電 vs. 聯電實證 ➔ 護城河與 4 大金律)。這套邏輯構成了股票估值與基本面分析的基石。\n\n【官方數據】：115學年度「管理探索二」課程組全景知識圖譜。",
    "discussionQuestion": "複習總結：「請用一句話告訴隔壁同學，為什麼計算本益比 (P/E) 比單看股票一張幾萬塊更能反映股票的貴賤？」",
    "discussionQuestionEn": "複習總結：「請用一句話告訴隔壁同學，為什麼計算本益比 (P/E) 比單看股票一張幾萬塊更能反映股票的貴賤？」",
    "quickTakeaways": [
      "第四週全景知識體系圖與觀念整合 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 第四週全景知識體系圖與觀念整合",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_29"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "第三小時 ‧ 護城河與決策紀律",
    "categoryEn": "Hour 3: Moats & Decision Discipline",
    "title": "學習反思與第五週預告 (ETF 狂熱與被動投資)",
    "titleEn": "W4 Slide 30: 學習反思與第五週預告 (ETF 狂熱與被動投資)",
    "subtitle": "115學年度 第四週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 4 Module 30 (Hour 3)",
    "teachingNotes": "本頁為第四週畫下圓滿句點。提醒學生前往雙語網頁點擊「📝 本週課堂作業」按鈕，現場填寫並提交「標的企業本益比與 ROE 估值分析報告」。同時預告第五週主題為\n\n【官方數據】：115學年度「管理探索二」課程大綱規劃與期末專題進度。",
    "discussionQuestion": "結語：「感謝大家的參與！請記得完成線上課堂作業，我們下週將一起揭開全台 ETF 狂熱背後的財務密碼！」\n四、 3大小時活動與課堂作業詳細執行手冊",
    "discussionQuestionEn": "結語：「感謝大家的參與！請記得完成線上課堂作業，我們下週將一起揭開全台 ETF 狂熱背後的財務密碼！」\n四、 3大小時活動與課堂作業詳細執行手冊",
    "quickTakeaways": [
      "學習反思與第五週預告 (ETF 狂熱與被動投資) 的核心本質與運作機制",
      "穿透市場情緒噪音，聚焦真實企業自由現金流與獲利品質",
      "以公開資訊觀測站 (MOPS) 審計數據建立嚴謹估值思維"
    ],
    "quickTakeawaysEn": [
      "Core principles and mechanics of 學習反思與第五週預告 (ETF 狂熱與被動投資)",
      "Filter emotional noise and focus on real corporate cash flows and earning quality",
      "Establish disciplined valuation models grounded in audited TWSE/MOPS disclosures"
    ],
    "visualType": "w4_slide_30"
  }
];
