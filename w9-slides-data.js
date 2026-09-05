/**
 * 115學年度「管理探索二」第九週教學資料庫
 * 單元名稱：保險基礎、風險管理與個人保障規劃
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W9_SCHEDULE_TABLE = [
  {
    hour: "第一小時 (00:00-00:50)",
    title: "風險管理與保險三大基本原則",
    slides: "Slide 01 - 10",
    summary: "四象限風險矩陣、大數法則算術、保險利益防道德風險、最大誠信據實說明、損害填補原則與全台 2.6張投保率。",
    activity: "🎯 專屬活動：四象限風險矩陣與應對策略檢測器（輸入生活情境判定象限）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第二小時 (00:50-01:40)",
    title: "新鮮人保障金三角與政策改革",
    slides: "Slide 11 - 20",
    summary: "機車打工高風險、意外險、實支實付醫療險雜費自費、2026正本理賠改革、重大傷病一次金、勞保強制險與學團險。",
    activity: "🎯 專屬活動：實支實付醫療險理賠與自負額精算器（精算病房/手術/雜費自負額）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第三小時 (01:40-02:30)",
    title: "保單算術與人情保單避坑實戰",
    slides: "Slide 21 - 30",
    summary: "定期險 vs 終身險保費點差、買定期+投資ETF雙贏算術、拒絕人情保單 4 金律、雙十原則、3,000元保單與據實告知法規。",
    activity: "🎮 重磅小遊戲：保險保障達人大挑戰 (4大關卡) ＋ 📝 課堂實務作業：個人第一張保單需求評估報告",
    timeAlloc: "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W9_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "保險導論 ‧ 風險防禦",
    "categoryEn": "Insurance Intro & Risk Shield",
    "title": "第九週課程導論：保險基礎、風險管理與個人保障規劃",
    "titleEn": "第九週課程導論: 保險基礎、風險管理與個人保障規劃",
    "subtitle": "大一滿 18 歲騎車打工之風險護城河，用最小預算槓桿化解毀滅性人身災難",
    "subtitleEn": "Building personal financial shields for 18-year-old college commuters and student workers",
    "quickTakeaways": [
      "核心重點：大一滿 18 歲騎車打工之風險護城河，用最小預算槓桿化解毀滅性人身災難",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Building personal financial shields for 18-year-old college commuters and student workers",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "問學生：『同學們剛滿 18 歲拿到機車駕照騎車上學時，有沒有想過萬一發生小摔車住院，醫療費用應該由誰負擔？』",
    "discussionQuestionEn": "Discussion Inquiry: 問學生：『同學們剛滿 18 歲拿到機車駕照騎車上學時，有沒有想過萬一發生小摔車住院，醫療費用應該由誰負擔？』",
    "teachingNotes": "本頁為第九週課程導論。講師可以引用諾貝爾經濟學獎得主薩繆爾森 (Paul Samuelson) 名言開場：「保險不是為了讓你發財，而是為了防止你暴貧！」針對大一新鮮人剛滿 18 歲騎機車通勤、打工上學的現實生活切入。說明許多學生誤以為保險是長輩才需要考慮的事，或者被親戚拉去買昂貴的儲蓄險。本單元將帶領大家建立正確的風險轉嫁思維，用最小保費買足最大保障。\n\n【官方數據引述】：金融監督管理委員會 (FSC) 保險局 / 財團法人保險事業發展中心 (TII) 官方數據。"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "學習地圖 ‧ 技能路徑",
    "categoryEn": "Learning Roadmap & Skills",
    "title": "第九週 3 小時學習地圖與核心技能樹",
    "titleEn": "第九週 3 小時學習地圖與核心技能樹",
    "subtitle": "掌握 3 小時學習路徑：原則法理 ➔ 保障金三角 ➔ 定期險算術與人情防坑",
    "subtitleEn": "3-Hour learning map: Legal principles, the protection triad, term math, and sales traps",
    "quickTakeaways": [
      "核心重點：掌握 3 小時學習路徑：原則法理 ➔ 保障金三角 ➔ 定期險算術與人情防坑",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: 3-Hour learning map: Legal principles, the protection triad, term math, and sales traps",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "引導學生在講義上圈出自己目前最擔心的風險類型（如：機車摔車、重大疾病、自費醫療）。",
    "discussionQuestionEn": "Discussion Inquiry: 引導學生在講義上圈出自己目前最擔心的風險類型（如：機車摔車、重大疾病、自費醫療）。",
    "teachingNotes": "本頁為學生構建本週 3 小時的學習地圖。第一小時解密四象限風險矩陣、大數法則、保險利益、最大誠信據實說明與損害填補原則；第二小時聚焦於新鮮人機車/打工高風險、意外險、實支實付醫療險、2026 正本理賠改革、重大傷病險與社會保險底護；第三小時則傳授定期險 vs 終身險保費點差、買定期+投資 ETF 雙贏算術、拒絕人情保單 4 金律與 3,000 元高 CP 值保單配置方案。\n\n【官方數據引述】：115學年度「管理探索二」課程計畫與學習進度規劃網要。"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "風險本質 ‧ 四象限矩陣",
    "categoryEn": "Nature of Risk: 4 Quadrants",
    "title": "什麼是風險 (Risk)？四象限風險管理矩陣 (Risk Matrix)",
    "titleEn": "什麼是風險 (Risk)？四象限風險管理矩陣 (Risk Matrix)",
    "subtitle": "依據發生頻率與損失程度建立四象限，釐清保險專司『低頻高損』災難風險",
    "subtitleEn": "Deconstructing the 4-quadrant risk matrix to focus insurance on low-frequency catastrophic risks",
    "quickTakeaways": [
      "核心重點：依據發生頻率與損失程度建立四象限，釐清保險專司『低頻高損』災難風險",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Deconstructing the 4-quadrant risk matrix to focus insurance on low-frequency catastrophic risks",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『掉了一把雨傘 vs 騎機車撞到超跑住院，哪一個適合用保險來轉嫁？為什麼？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『掉了一把雨傘 vs 騎機車撞到超跑住院，哪一個適合用保險來轉嫁？為什麼？』",
    "teachingNotes": "詳細拆解風險管理矩陣 (Risk Matrix) 的四個象限。依據「發生頻率」與「損失程度」劃分：1. 高頻小損 ➔ 預防減輕；2. 高頻大損 ➔ 避開規避；3. 低頻小損 ➔ 自行承擔；4. **低頻大損 (低發生率、極大損失) ➔ 轉嫁保險**（如嚴重車禍、癌症）。強調保險專門用來處理災難型風險，絕非用來處理遺失雨傘等小事。\n\n【官方數據引述】：薩繆爾森《風險管理與保險學》理論與實務架構。"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "保險數學 ‧ 大數法則",
    "categoryEn": "Actuarial Math: Large Numbers",
    "title": "保險的本質：大數法則 (Law of Large Numbers) 與互助分攤",
    "titleEn": "保險的本質: 大數法則 (Law of Large Numbers) 與互助分攤",
    "subtitle": "大數樣本收斂隨機波動 ‧ 萬人分攤化解個人不可承受之重與公平保費算術",
    "subtitleEn": "The Law of Large Numbers: Mutually pooling risks across thousands to neutralize financial catastrophe",
    "quickTakeaways": [
      "核心重點：大數樣本收斂隨機波動 ‧ 萬人分攤化解個人不可承受之重與公平保費算術",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: The Law of Large Numbers: Mutually pooling risks across thousands to neutralize financial catastrophe",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『如果只有 10 個人組一個保險互助會，大數法則還管用嗎？為什麼保險公司需要數十萬保戶？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『如果只有 10 個人組一個保險互助會，大數法則還管用嗎？為什麼保險公司需要數十萬保戶？』",
    "teachingNotes": "講授保險運作的數學基礎——**大數法則 (Law of Large Numbers)**。說明當觀察樣本足夠龐大時，隨機事件發生的概率會趨近於穩定平均值。公平保費公式：`公平保費 = 預期總理賠金額 / 參與投保總人數 + 營業費用`。數學實例：10,000 名學生每人交 500 元建立 500 萬元水庫，當 5 人發生重大意外時每人領 100 萬元理賠，化解個人毀滅風險。\n\n【官方數據引述】：財團法人保險事業發展中心 (TII) 精算原理說明。"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "黃金原則 ‧ 保險利益",
    "categoryEn": "Golden Rule: Insurable Interest",
    "title": "保險 3 大黃金原則 (一)：保險利益原則 (Insurable Interest)",
    "titleEn": "保險 3 大黃金原則 (一): 保險利益原則 (Insurable Interest)",
    "subtitle": "法律規定要保人對標的之人格利害關係，徹底杜絕賭博與道德謀殺風險",
    "subtitleEn": "Insurable Interest: Legal prerequisite preventing speculative gambling and moral hazards",
    "quickTakeaways": [
      "核心重點：法律規定要保人對標的之人格利害關係，徹底杜絕賭博與道德謀殺風險",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Insurable Interest: Legal prerequisite preventing speculative gambling and moral hazards",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "問學生：『如果你可以幫隔壁完全不認識的同學買 1000 萬人壽保險，社會上會發生什麼可怕的道德風險？』",
    "discussionQuestionEn": "Discussion Inquiry: 問學生：『如果你可以幫隔壁完全不認識的同學買 1000 萬人壽保險，社會上會發生什麼可怕的道德風險？』",
    "teachingNotes": "詳細剖析保險利益原則 (Insurable Interest)。法律規定要保人對被保險人的生命或財產必須存在法律上認可的利害關係（如本人、配偶、直系血親）。核心目的：1. **避免賭博行為**：防止不相干的人利用他人生命投保賭博發財；2. **杜絕道德風險 (Moral Hazard)**：防止有人為了詐領保險金而誘發謀殺或縱火犯罪。\n\n【官方數據引述】：中華民國《保險法》第 16 條與第 17 條規定。"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "黃金原則 ‧ 最大誠信",
    "categoryEn": "Golden Rule: Utmost Good Faith",
    "title": "保險 3 大黃金原則 (二)：最大誠信原則與據實說明義務",
    "titleEn": "保險 3 大黃金原則 (二): 最大誠信原則與據實說明義務",
    "subtitle": "投保如實填寫健康告知書，隱瞞重大病史兩年內保險公司得依法無條件解除",
    "subtitleEn": "Utmost Good Faith: Strict duty to disclose medical histories to prevent policy nullification",
    "quickTakeaways": [
      "核心重點：投保如實填寫健康告知書，隱瞞重大病史兩年內保險公司得依法無條件解除",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Utmost Good Faith: Strict duty to disclose medical histories to prevent policy nullification",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒學生：『聽信業務員口頭說「這個小病不用填」而隱瞞病史，最後受害的一定是你自己！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒學生：『聽信業務員口頭說「這個小病不用填」而隱瞞病史，最後受害的一定是你自己！』",
    "teachingNotes": "剖析最大誠信原則 (Utmost Good Faith) 與《保險法》第 64 條**據實說明義務**。投保填寫健康告知書時，必須據實告知近 2~5 年內的住院、手術、癌症或慢性病史。法律嚴厲警告：若故意隱瞞病史，保險公司在 2 年內發現可**直接解除合約，且不給付理賠金、亦不退還已繳保費！**\n\n【官方數據引述】：中華民國《保險法》第 64 條據實說明條款與裁決案例。"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "黃金原則 ‧ 損害填補",
    "categoryEn": "Golden Rule: Indemnity",
    "title": "保險 3 大黃金原則 (三)：損害填補原則 (Indemnity Principle)",
    "titleEn": "保險 3 大黃金原則 (三): 損害填補原則 (Indemnity Principle)",
    "subtitle": "實際自費多少賠多少，嚴禁重複溢領理賠致富，體現損失填補法理精神",
    "subtitleEn": "Indemnity Principle: Compensating actual financial loss without enabling illicit enrichment",
    "quickTakeaways": [
      "核心重點：實際自費多少賠多少，嚴禁重複溢領理賠致富，體現損失填補法理精神",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Indemnity Principle: Compensating actual financial loss without enabling illicit enrichment",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "強調：『保險是為了補償損失恢復原狀，絕對不是讓你拿來發財或賺錢的工具！』",
    "discussionQuestionEn": "Discussion Inquiry: 強調：『保險是為了補償損失恢復原狀，絕對不是讓你拿來發財或賺錢的工具！』",
    "teachingNotes": "剖析損害填補原則 (Indemnity Principle)。規定財產保險與實支實付型保單之理賠上限以「實際發生的損失金額」為限，禁止不當得利！公式：`理賠上限 = min(實際醫療自費金額, 保單限額)`。實例：車禍住院實際自費花 5 萬元，即使買了 3 張實支實付保單，總理賠金最高就是填補這 5 萬元損失，不能靠住院多賺錢。\n\n【官方數據引述】：金融監督管理委員會 (FSC) 損害填補原則規範。"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "投保實證 ‧ 2.6張盲點",
    "categoryEn": "Empirical Data: 2.6 Policies",
    "title": "實證數據：台灣人平均每人持有 2.6 張壽險保單",
    "titleEn": "實證數據: 台灣人平均每人持有 2.6 張壽險保單",
    "subtitle": "全台每人平均手握 2.6 張保單，透視高保費低保障的儲蓄型人情保單困局",
    "subtitleEn": "Taiwan averages 2.6 life policies per capita: Decoding the high-premium low-protection trap",
    "quickTakeaways": [
      "核心重點：全台每人平均手握 2.6 張保單，透視高保費低保障的儲蓄型人情保單困局",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Taiwan averages 2.6 life policies per capita: Decoding the high-premium low-protection trap",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "問學生：『為什麼台灣人買了這麼多保單，遇到大病或意外時卻常常發現保額根本不夠用？』",
    "discussionQuestionEn": "Discussion Inquiry: 問學生：『為什麼台灣人買了這麼多保單，遇到大病或意外時卻常常發現保額根本不夠用？』",
    "teachingNotes": "引述保險事業發展中心 (TII) 2026 最新官方統計：全台人身保險投保率高達 260% 以上，平均每人持有 2.6 張保單，保險滲透率高達 12.5%（全球頂級）。剖析新鮮人常見痛點：大部分保費都被花在昂貴的「儲蓄險」上，導致實質意外與醫療保障極低，保費負擔過重壓垮大學生生活費。\n\n【官方數據引述】：財團法人保險事業發展中心 (TII) 人身保險業統計年報。"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "契約主體 ‧ 四大角色",
    "categoryEn": "Contract Roles: 4 Parties",
    "title": "保險合約 4 大關鍵角色：要保人、被保險人、受益人與保險公司",
    "titleEn": "保險合約 4 大關鍵角色: 要保人、被保險人、受益人與保險公司",
    "subtitle": "拆解要保人 (出資權利人)、被保險人 (生命標的)、受益人與保險公司四角關係",
    "subtitleEn": "The 4 essential parties: Policyholder, Insured, Beneficiary, and Insurer contract roles",
    "quickTakeaways": [
      "核心重點：拆解要保人 (出資權利人)、被保險人 (生命標的)、受益人與保險公司四角關係",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: The 4 essential parties: Policyholder, Insured, Beneficiary, and Insurer contract roles",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『大一學生小明自己打工繳保費，保單上的要保人與被保險人分別是誰？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『大一學生小明自己打工繳保費，保單上的要保人與被保險人分別是誰？』",
    "teachingNotes": "拆解保單契約書上的四大主體：1. **要保人**：出錢繳保費的人，擁有解約與指定受益人權利；2. **被保險人**：保障標的人體，事故發生在其身上時啟動理賠（如大一學生小明）；3. **受益人**：領理賠金的人，身故保險金可指定父母；4. **保險公司**：承擔風險並依約給付理賠金。\n\n【官方數據引述】：中華民國《保險法》保險契約基本定義。"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "第一小時 ‧ 矩陣預告",
    "categoryEn": "Hour 1 Recap & Lab Preview",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "第一小時小結與專屬活動預告",
    "subtitle": "第一小時法理基礎奠定，開啟【四象限風險矩陣與應對策略檢測器】體驗",
    "subtitleEn": "Hour 1 summary and launching the 4-Quadrant Risk Matrix Interactive Diagnostic Lab",
    "quickTakeaways": [
      "核心重點：第一小時法理基礎奠定，開啟【四象限風險矩陣與應對策略檢測器】體驗",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Hour 1 summary and launching the 4-Quadrant Risk Matrix Interactive Diagnostic Lab",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行風險矩陣判定體驗。",
    "discussionQuestionEn": "Discussion Inquiry: 指導學生開啟網頁版 Modal，準備進行風險矩陣判定體驗。",
    "teachingNotes": "總結第一小時核心觀念：風險矩陣處理「低頻高損」災難；保險 3 大原則（保險利益防賭博、最大誠信據實說明、損害填補防不當得利）；看懂要保人、被保險人與受益人。預告第 1 小時 Modal 實務活動——「四象限風險矩陣與應對策略檢測器」，請學生輸入生活風險情境並判定最佳策略。\n\n【官方數據引述】：115管理探索二團隊建置。"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "現實場景 ‧ 機車與打工",
    "categoryEn": "Campus Scenarios: Scooter Perils",
    "title": "大一新鮮人高風險場景：機車通勤與打工傷害剖析",
    "titleEn": "大一新鮮人高風險場景: 機車通勤與打工傷害剖析",
    "subtitle": "警政署統計 18-24 歲機車死傷之冠，打工燙傷與運動韌帶斷裂之現實防禦",
    "subtitleEn": "Analyzing top campus perils: 18-24 scooter collision rates and part-time job injuries",
    "quickTakeaways": [
      "核心重點：警政署統計 18-24 歲機車死傷之冠，打工燙傷與運動韌帶斷裂之現實防禦",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Analyzing top campus perils: 18-24 scooter collision rates and part-time job injuries",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "問學生：『同學們騎機車上學時，有沒有遇過差點撞到的驚險瞬間？如果摔車住院需要自費 3 萬元，你負擔得起嗎？』",
    "discussionQuestionEn": "Discussion Inquiry: 問學生：『同學們騎機車上學時，有沒有遇過差點撞到的驚險瞬間？如果摔車住院需要自費 3 萬元，你負擔得起嗎？』",
    "teachingNotes": "剖析 18 歲大一新鮮人最常面臨的兩大現實風險：1. **機車交通事故**：警政署統計 18-24 歲機車傷亡率居各年齡層之冠，摔車擦傷與骨折頻傳；2. **打工與運動傷害**：餐廳燙傷、搬重物拉傷、籃球韌帶斷裂導致醫療費與停工損失。結論：大一新鮮人買保險第一優先順序絕對是「意外險 + 意外醫療實支實付」。\n\n【官方數據引述】：內政部警政署交通統計與勞動部職業災害統計。"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "保障金三角 ‧ 意外險",
    "categoryEn": "Triad 1: Accident Insurance",
    "title": "新鮮人保障金三角 (一)：意外險 (Accident Insurance)",
    "titleEn": "新鮮人保障金三角 (一): 意外險 (Accident Insurance)",
    "subtitle": "外來突發非疾病三大要素，以千元保費撬動百萬失能與門診實支實付槓桿",
    "subtitleEn": "Triad Pillar 1: Accident insurance leveraging low premiums for massive disability payouts",
    "quickTakeaways": [
      "核心重點：外來突發非疾病三大要素，以千元保費撬動百萬失能與門診實支實付槓桿",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Triad Pillar 1: Accident insurance leveraging low premiums for massive disability payouts",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『打工時突然盲腸炎發作住院，意外險會理賠嗎？（答案：不會！因為盲腸炎是疾病，不符合「非疾病」要素）』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『打工時突然盲腸炎發作住院，意外險會理賠嗎？（答案：不會！因為盲腸炎是疾病，不符合「非疾病」要素）』",
    "teachingNotes": "講授傷害保險（意外險）的核心概念。意外定義必須同時符合**「外來的、突發的、非疾病的」**三大要素。介紹兩大保障項目：1. **意外身故/失能保額**：按失能等級 1-11 級給付 100%~5%（保額 200 萬年保費約 1,200 元）；2. **意外醫療實支實付**：門診自費藥膏凭收據實報實銷（保額 5 萬年保費約 600 元）。\n\n【官方數據引述】：金管會保險局傷害保險單示範條款。"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "保障金三角 ‧ 實支醫療",
    "categoryEn": "Triad 2: Reimbursement Medical",
    "title": "新鮮人保障金三角 (二)：實支實付醫療險 (Reimbursement Medical)",
    "titleEn": "新鮮人保障金三角 (二): 實支實付醫療險 (Reimbursement Medical)",
    "subtitle": "升等單人病房、達文西微創手術與高價自費標靶藥材雜費之實報實銷盾牌",
    "subtitleEn": "Triad Pillar 2: Reimbursement medical insurance covering private wards and surgical devices",
    "quickTakeaways": [
      "核心重點：升等單人病房、達文西微創手術與高價自費標靶藥材雜費之實報實銷盾牌",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Triad Pillar 2: Reimbursement medical insurance covering private wards and surgical devices",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『如果做一個自費微創手術要花 10 萬元，日額型保單給付 3,000 元 vs 實支實付給付 10 萬元，哪一個才能解決問題？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『如果做一個自費微創手術要花 10 萬元，日額型保單給付 3,000 元 vs 實支實付給付 10 萬元，哪一個才能解決問題？』",
    "teachingNotes": "剖析現代醫療趨勢「住院天數短、自費材料貴」。傳統日額型醫療險（住院一天給 1,000 元）已落伍，**實支實付醫療險**包含三大核心：1. **病房費限額**：補貼升等單人病房差額；2. **手術費限額**：補貼自費微創手術；3. **醫療雜費限額 (核心!)**：補貼最昂貴的自費標靶藥物、水晶體與心臟支架 (15-20萬)。\n\n【官方數據引述】：中華民國人壽保險商業同業公會實支實付條款說明。"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "政策改革 ‧ 正本理賠",
    "categoryEn": "Policy Reform: Original Receipts",
    "title": "2026 最新政策：金管會實支實付醫療險「正本理賠」改革真相",
    "titleEn": "2026 最新政策: 金管會實支實付醫療險「正本理賠」改革真相",
    "subtitle": "告別副本理賠套利，金管會明令落實正本收據差額分攤，回歸損害填補本質",
    "subtitleEn": "2026 FSC Regulatory Reform: Transitioning strictly to original receipts under indemnity rules",
    "quickTakeaways": [
      "核心重點：告別副本理賠套利，金管會明令落實正本收據差額分攤，回歸損害填補本質",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: 2026 FSC Regulatory Reform: Transitioning strictly to original receipts under indemnity rules",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒學生：『新制改革後，實支實付回歸補貼真實醫療花費的本質，不要再聽信副本雙理賠賺錢的話術！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒學生：『新制改革後，實支實付回歸補貼真實醫療花費的本質，不要再聽信副本雙理賠賺錢的話術！』",
    "teachingNotes": "講授 2026 金管會實支實付醫療險**正本理賠與差額填補改革**。過去舊制（副本雙理賠）：花 5 萬拿副本向 2 家申請理賠 10 萬（靠保險賺錢）；2026 新制：必須使用醫院原始正本收據！第一家賠不足部分由第二家開立差額證明填補，總理賠金回歸「損害填補原則」，絕不超過實際花費。\n\n【官方數據引述】：金融監督管理委員會 (FSC) 實支實付醫療險改革公告。"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "保障金三角 ‧ 重大傷病",
    "categoryEn": "Triad 3: Major Illness",
    "title": "新鮮人保障金三角 (三)：重大傷病險 (Major Illness)",
    "titleEn": "新鮮人保障金三角 (三): 重大傷病險 (Major Illness)",
    "subtitle": "全民健保重大傷病卡即啟動一筆過整筆給付，填補癌症與重症初期生活停工衝擊",
    "subtitleEn": "Triad Pillar 3: Major illness lump-sum coverage mitigating immediate income disruption",
    "quickTakeaways": [
      "核心重點：全民健保重大傷病卡即啟動一筆過整筆給付，填補癌症與重症初期生活停工衝擊",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Triad Pillar 3: Major illness lump-sum coverage mitigating immediate income disruption",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『為什麼一次拿到 100 萬現金理賠，比慢慢申請住院門診給付對重病患者更有幫助？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『為什麼一次拿到 100 萬現金理賠，比慢慢申請住院門診給付對重病患者更有幫助？』",
    "teachingNotes": "介紹重大傷病險的強大功能。理賠範圍直接連結衛福部健保「重大傷病卡」（涵蓋癌症、罕見疾病等 300 多項重大疾病）。好處：1. **一次性高額給付**：只要取得重大傷病卡，保險公司一次給付 100 萬元現金；2. **資金高度自由**：可用於昂貴標靶藥物、看護費、營養品或休養期間生活費。\n\n【官方數據引述】：衛生福利部中央健康保險署重大傷病範圍與發卡統計。"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "社會底護 ‧ 勞保強制險",
    "categoryEn": "Social Nets: Labor & Auto Liab",
    "title": "勞保 (Labor Insurance) 與機車強制險 (Compulsory Auto) 底層防護",
    "titleEn": "勞保 (Labor Insurance) 與機車強制險 (Compulsory Auto) 底層防護",
    "subtitle": "強制車險死殘 200 萬與勞保職災醫療給付，大一打工族的兩大底層法定義務護甲",
    "subtitleEn": "Statutory safety nets: Mandatory Auto Liability (2M) and Labor Insurance workplace shields",
    "quickTakeaways": [
      "核心重點：強制車險死殘 200 萬與勞保職災醫療給付，大一打工族的兩大底層法定義務護甲",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Statutory safety nets: Mandatory Auto Liability (2M) and Labor Insurance workplace shields",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒：『打工第一天一定要確認店家有沒有幫你申報勞保！這是你的法定權益。』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒：『打工第一天一定要確認店家有沒有幫你申報勞保！這是你的法定權益。』",
    "teachingNotes": "介紹新鮮人已經擁有的法定社會保險：1. **機車強制險**：政府強制投保，保障車禍「對方受害者」體傷最高 20 萬、身故失能最高 200 萬元；2. **勞工保險**：打工店家依法必須申報，提供職災傷病與醫療補助。強調商業保險是用來補足勞保與強制險保障額度不足的中高層缺口。\n\n【官方數據引述】：勞動部勞工保險局 & 財產保險商業同業公會規範。"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "校園權益 ‧ 學團險",
    "categoryEn": "Campus Rights: Student Group Ins",
    "title": "學生團體保險 (Student Group Insurance) 的隱形權益與申請",
    "titleEn": "學生團體保險 (Student Group Insurance) 的隱形權益與申請",
    "subtitle": "每學期繳交數百元之隱形校園神盾，涵蓋校內外意外摔傷與住院之申請要領",
    "subtitleEn": "Student Group Insurance: Unlocking hidden campus benefits for injuries and hospitalizations",
    "quickTakeaways": [
      "核心重點：每學期繳交數百元之隱形校園神盾，涵蓋校內外意外摔傷與住院之申請要領",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Student Group Insurance: Unlocking hidden campus benefits for injuries and hospitalizations",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "指導學生：『在學校體育課扭傷或打工受傷看門診，記得開立診斷書去衛保組申請學團險理賠！』",
    "discussionQuestionEn": "Discussion Inquiry: 指導學生：『在學校體育課扭傷或打工受傷看門診，記得開立診斷書去衛保組申請學團險理賠！』",
    "teachingNotes": "解密每學期學雜費單裡的 500 元學生團體保險（學團險）。保障範圍涵蓋疾病或意外住院門診、失能與身故。一般住院或意外醫療金額超過門檻（如 500 元）即可憑醫院收據與診斷書向學校衛保組申請理賠補助！提醒大一新鮮人不要忽視這項高 CP 值的隱形權益。\n\n【官方數據引述】：教育部學生團體保險大專校院作業要點。"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "理賠避坑 ‧ 除外等待期",
    "categoryEn": "Claim Traps: Exclusions & Waiting",
    "title": "理賠爭議防範：除外責任 (Exclusions) 與等待期 (Waiting Period)",
    "titleEn": "理賠爭議防範: 除外責任 (Exclusions) 與等待期 (Waiting Period)",
    "subtitle": "明辨故意行為、犯罪與美容非必要手術除外責任，留意癌症保單 30-90 天等待期",
    "subtitleEn": "Avoiding claim disputes: Identifying exclusions, intentional acts, and waiting periods",
    "quickTakeaways": [
      "核心重點：明辨故意行為、犯罪與美容非必要手術除外責任，留意癌症保單 30-90 天等待期",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Avoiding claim disputes: Identifying exclusions, intentional acts, and waiting periods",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒：『買了醫療險第二天發燒去住院，為什麼保險公司不理賠？（因為還在 30 天等待期內！）』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒：『買了醫療險第二天發燒去住院，為什麼保險公司不理賠？（因為還在 30 天等待期內！）』",
    "teachingNotes": "剖析理賠爭議兩大主因：1. **除外責任 (Exclusions)**：故意行為（自殘）、犯罪行為、非法酒駕、整形美容或無必要之療養住院，保險公司不給付；2. **等待期 (Waiting Period)**：醫療險生效後通常有 30 天等待期（癌症險常為 90 天），等待期內發病的疾病不理賠。\n\n【官方數據引述】：金融消費評議中心 (FOI) 保險理賠爭議案例彙編。"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "設計原則 ‧ 保大先近",
    "categoryEn": "Design Tenets: Major First",
    "title": "健全保單設計三大原則：先保障後儲蓄、先近後遠、先大後小",
    "titleEn": "健全保單設計三大原則: 先保障後儲蓄、先近後遠、先大後小",
    "subtitle": "健全保單配置黃金三原則：先保障後儲蓄、先近後遠、先大後小",
    "subtitleEn": "Three sound policy design tenets: Protection before savings, near before far, major before minor",
    "quickTakeaways": [
      "核心重點：健全保單配置黃金三原則：先保障後儲蓄、先近後遠、先大後小",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Three sound policy design tenets: Protection before savings, near before far, major before minor",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "請學生自我檢視：『你的保單有沒有犯了「花大錢買儲蓄險、意外醫療保障卻是零」的錯誤？』",
    "discussionQuestionEn": "Discussion Inquiry: 請學生自我檢視：『你的保單有沒有犯了「花大錢買儲蓄險、意外醫療保障卻是零」的錯誤？』",
    "teachingNotes": "歸納健全保單設計三大原則：1. **先保障、後儲蓄**：先用低保費買足高額風險保障（意外+醫療），有餘力再考慮儲蓄；2. **先近後遠**：優先解決大一當下 1-5 年內的現實風險，而非 50 年後的退休；3. **先大後小**：優先防範家庭無法承受的大災難（失能、癌症），而非小額感冒。\n\n【官方數據引述】：理財規劃師 (CFP) 個人保險規劃標準原則。"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "第二小時 ‧ 試算預告",
    "categoryEn": "Hour 2 Recap & Lab Preview",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "第二小時小結與專屬活動預告",
    "subtitle": "第二小時防禦架構完成，開啟【實支實付醫療險理賠與自負額精算器】實測",
    "subtitleEn": "Hour 2 summary and launching the Medical Reimbursement Claim & Deductible Calculator",
    "quickTakeaways": [
      "核心重點：第二小時防禦架構完成，開啟【實支實付醫療險理賠與自負額精算器】實測",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Hour 2 summary and launching the Medical Reimbursement Claim & Deductible Calculator",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行醫療理賠精算演練。",
    "discussionQuestionEn": "Discussion Inquiry: 指導學生開啟網頁版 Modal，準備進行醫療理賠精算演練。",
    "teachingNotes": "總結第二小時核心觀念：保障金三角（意外險+實支實付+重大傷病）；2026 實支實付正本理賠改革；勞保、強制險與學團險底護；看清除外責任與等待期；遵循「先保障後儲蓄」原則。預告第 2 小時 Modal 實務活動——「實支實付醫療險理賠與自負額精算器」，請學生輸入醫療自費金額算理賠補貼。\n\n【官方數據引述】：115管理探索二團隊建置。"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "保費算術 ‧ 定期vs終身",
    "categoryEn": "Premium Math: Term vs Whole",
    "title": "定期險 (Term) vs. 終身險 (Whole Life) 保費點差大解密",
    "titleEn": "定期險 (Term) vs. 終身險 (Whole Life) 保費點差大解密",
    "subtitle": "一年一約極致低保費 vs 終身綁定高昂資金成本，年輕時的巨大保費點差",
    "subtitleEn": "Term vs Whole Life: Deconstructing the massive annual premium spread for young adults",
    "quickTakeaways": [
      "核心重點：一年一約極致低保費 vs 終身綁定高昂資金成本，年輕時的巨大保費點差",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Term vs Whole Life: Deconstructing the massive annual premium spread for young adults",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提問：『大一學生打工一年賺 10 萬，如果買一張年繳 3 萬元的終身險，會對生活造成什麼災難？』",
    "discussionQuestionEn": "Discussion Inquiry: 提問：『大一學生打工一年賺 10 萬，如果買一張年繳 3 萬元的終身險，會對生活造成什麼災難？』",
    "teachingNotes": "詳細比對定期險 (Term Insurance) 與終身險 (Whole Life Insurance) 的保費算術點差。相同的 100 萬元身故保障：定期險保障指定期間，保費極便宜（20歲新鮮人每年僅需約 1,000~1,500 元）；終身險繳費 20 年保障一輩子（內含解約金），保費極昂貴（每年高達 25,000~35,000 元），會直接壓垮大一學生生活費。\n\n【官方數據引述】：財團法人保險事業發展中心 (TII) 費率比對數據。"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "雙贏策略 ‧ 定期+0050",
    "categoryEn": "Win-Win: Buy Term + 0050 ETF",
    "title": "「先定期、後終身」理財算術：用省下的保費做 0050 ETF 定期定額",
    "titleEn": "「先定期、後終身」理財算術: 用省下的保費做 0050 ETF 定期定額",
    "subtitle": "省下終身險 2 萬保費，定期定額 0050 市值 ETF，30年滾出數百萬資產複利",
    "subtitleEn": "Buy Term and Invest the Difference: Funneling savings into 0050 ETF for lifelong compounding",
    "quickTakeaways": [
      "核心重點：省下終身險 2 萬保費，定期定額 0050 市值 ETF，30年滾出數百萬資產複利",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Buy Term and Invest the Difference: Funneling savings into 0050 ETF for lifelong compounding",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "算一算：『每年省下 27,000 元投入年化報酬率 8% 的 ETF，20 年後複利滾存會變成多少錢？（答案：超過 120 萬元！）』",
    "discussionQuestionEn": "Discussion Inquiry: 算一算：『每年省下 27,000 元投入年化報酬率 8% 的 ETF，20 年後複利滾存會變成多少錢？（答案：超過 120 萬元！）』",
    "teachingNotes": "剖析聰明理財者的雙贏解法——「Buy Term and Invest the Difference (買定期險 + 投資剩餘價差)」。傳統買終身險：每年硬繳 30,000 元買終身險，20 年共繳 60 萬得到低額保障且無流動積蓄；買定期+投資 ETF：每年花 3,000 元買高額定期險，省下的 27,000 元定期定額買 0050/VOO ETF，20 年後獲得高額保障 + 破百萬元股票資產！\n\n【官方數據引述】：理財規劃師 (CFP) \"Buy Term and Invest the Difference\" 試算。"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "人情保單 ‧ 4大防坑",
    "categoryEn": "Sales Traps: 4 Rejection Rules",
    "title": "拒絕人情保單 4 大金律：不買聽不懂的保單、不為人情買高額終身險",
    "titleEn": "拒絕人情保單 4 大金律: 不買聽不懂的保單、不為人情買高額終身險",
    "subtitle": "四不原則：不買看不懂的條款、不為面子買終身險、不買高額儲蓄險、堅持親簽",
    "subtitleEn": "The 4 Golden Rules to resist peer-pressure sales: Never buy confusing or costly policies",
    "quickTakeaways": [
      "核心重點：四不原則：不買看不懂的條款、不為面子買終身險、不買高額儲蓄險、堅持親簽",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: The 4 Golden Rules to resist peer-pressure sales: Never buy confusing or costly policies",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "強調：『收到保單 10 天內隨時可以無條件契撤全額退費，這是法律賦予你的最高防禦護身符！』",
    "discussionQuestionEn": "Discussion Inquiry: 強調：『收到保單 10 天內隨時可以無條件契撤全額退費，這是法律賦予你的最高防禦護身符！』",
    "teachingNotes": "傳授親戚阿姨找你買保險時的理性拒絕防線：1. **聽不懂的絕對不買**（搞不懂理賠條件不簽字）；2. **拒絕高額人情終身險**（不為同情人情壓垮自己）；3. **善用 10 天審閱期契撤權**（收到保單 10 天內享有法定契約撤銷權，無條件退還全額保費）；4. **索取條款明細**（堅持看過官方條款）。\n\n【官方數據引述】：金融消費評議中心 (FOI) 消費者自我保護原則。"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "預算比例 ‧ 雙十原則",
    "categoryEn": "Budget Ratio: The 10/10 Rule",
    "title": "保費預算黃金比例：雙十原則 (保額 10 倍收入，保費不超過 10%)",
    "titleEn": "保費預算黃金比例: 雙十原則 (保額 10 倍收入，保費不超過 10%)",
    "subtitle": "家庭保額應為年收入 10 倍，年繳總保費以不超過個人或家庭年收 10% 為限",
    "subtitleEn": "The 10/10 Rule: Target coverage at 10x annual income while keeping premiums under 10%",
    "quickTakeaways": [
      "核心重點：家庭保額應為年收入 10 倍，年繳總保費以不超過個人或家庭年收 10% 為限",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: The 10/10 Rule: Target coverage at 10x annual income while keeping premiums under 10%",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "請學生心算：『如果你一個月打工收入 10,000 元（年收入 12 萬），依據雙十原則，你一年的保費上限是多少？』",
    "discussionQuestionEn": "Discussion Inquiry: 請學生心算：『如果你一個月打工收入 10,000 元（年收入 12 萬），依據雙十原則，你一年的保費上限是多少？』",
    "teachingNotes": "介紹理財規劃權威的「雙十原則 (10-10 Rule)」：1. **壽險與身故保額 = 年收入 10 倍**（保障失能或身故後家庭 10 年緩衝）；2. **每年保費支出 <= 年收入 10%**（保費絕不可超過年收入一成）。大一學生打工年收 10 萬，年保費應嚴格控制在 **3,000~5,000 元** 以內！\n\n【官方數據引述】：理財規劃師 (CFP) 雙十原則 (10-10 Rule)。"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "官方數據 ‧ FSC與TII",
    "categoryEn": "Official Sources: FSC & TII",
    "title": "實證數據調取：金管會保險局 (FSC) 與保險事業發展中心 (TII) 查閱",
    "titleEn": "實證數據調取: 金管會保險局 (FSC) 與保險事業發展中心 (TII) 查閱",
    "subtitle": "查閱金管會保險局違規裁罰、示範條款與保發中心 (TII) 最新統計數據鏈",
    "subtitleEn": "Authoritative data retrieval: Cross-referencing FSC regulations and TII actuarial reports",
    "quickTakeaways": [
      "核心重點：查閱金管會保險局違規裁罰、示範條款與保發中心 (TII) 最新統計數據鏈",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Authoritative data retrieval: Cross-referencing FSC regulations and TII actuarial reports",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "演示評議中心網站查詢各大保險公司申訴率的方式。",
    "discussionQuestionEn": "Discussion Inquiry: 演示評議中心網站查詢各大保險公司申訴率的方式。",
    "teachingNotes": "手把手教導學生如何查詢權威官方保險數據：1. **保險事業發展中心 (tii.org.tw)**：查詢全台各大保險公司商品條款與試算費率；2. **金管會保險局 (fsc.gov.tw)**：查詢保險公司違規裁罰紀錄；3. **金融消費評議中心 (foi.org.tw)**：查詢各大保險公司的「理賠申訴率」，挑選申訴率低的優良公司！\n\n【官方數據引述】：金管會保險局 暨 財團法人保險事業發展中心 Portal。"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "極致配置 ‧ 3000元保單",
    "categoryEn": "Starter Policy: 3,000 TWD Plan",
    "title": "大一新鮮人第一張保單 3,000 元年保費極致高槓桿配置方案",
    "titleEn": "大一新鮮人第一張保單 3,000 元年保費極致高槓桿配置方案",
    "subtitle": "意外 200 萬 + 意外實支 5 萬 + 實支醫療雜費 15 萬，年保費僅約 3,000 元",
    "subtitleEn": "The 3,000 TWD College Starter Policy: Maximizing high-leverage protection on a budget",
    "quickTakeaways": [
      "核心重點：意外 200 萬 + 意外實支 5 萬 + 實支醫療雜費 15 萬，年保費僅約 3,000 元",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: The 3,000 TWD College Starter Policy: Maximizing high-leverage protection on a budget",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒：『一天只需少喝一杯微糖奶茶，就能幫自己築起堅固的醫療意外護甲！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒：『一天只需少喝一杯微糖奶茶，就能幫自己築起堅固的醫療意外護甲！』",
    "teachingNotes": "展示一年只需 3,000 元的大一高 CP 值保單組合：1. **定期意外險 + 意外醫療實支 (年保費約 1,200 元)**：身故失能 200 萬、意外醫療實支 5 萬；2. **1年期實支實付醫療險 (年保費約 1,800 元)**：住院雜費 15 萬、病房費每日 1,500 元。總保費約 3,000 元/年，一天不到 9 元即可獲得高額防護！\n\n【官方數據引述】：115管理探索二教案保單精算組。"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "核保告知 ‧ 法律後果",
    "categoryEn": "Duty to Disclose: Legal Impact",
    "title": "保險核保與告知義務：隱瞞病史導致拒賠與解除合約的法律後果",
    "titleEn": "保險核保與告知義務: 隱瞞病史導致拒賠與解除合約的法律後果",
    "subtitle": "據實填寫告知書近 2-5 年病史，杜絕遭拒賠又沒收全部保費之法律滅頂災難",
    "subtitleEn": "The absolute duty to disclose: Legal fallout of misrepresenting prior medical conditions",
    "quickTakeaways": [
      "核心重點：據實填寫告知書近 2-5 年病史，杜絕遭拒賠又沒收全部保費之法律滅頂災難",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: The absolute duty to disclose: Legal fallout of misrepresenting prior medical conditions",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒學生：『健康告知書問什麼就答什麼，誠實是獲得理賠保障的唯一道路！』",
    "discussionQuestionEn": "Discussion Inquiry: 提醒學生：『健康告知書問什麼就答什麼，誠實是獲得理賠保障的唯一道路！』",
    "teachingNotes": "剖析《保險法》第 64 條據實告知義務的法律後果。業務員口頭說「小病不用填」是極危險的話術。法律規定：若要保人未據實填寫健康告知書，保險公司於契約成立 2 年內得解除契約；解除契約時，保險公司**免負給付理賠金責任，且已繳保費一律不退還！**\n\n【官方數據引述】：中華民國《保險法》第 64 條與法院裁判字號條款。"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "理性金律 ‧ 4大守則",
    "categoryEn": "Rational Rules: 4 Lifelong Tenets",
    "title": "大一新鮮人個人保障理性使用 4 大金律",
    "titleEn": "大一新鮮人個人保障理性使用 4 大金律",
    "subtitle": "買對不買貴、保大不保小、正本妥善存、定期常檢視，大一新鮮人 4 大金律",
    "subtitleEn": "Four lifelong insurance principles: Buy right, cover big risks, store receipts, review yearly",
    "quickTakeaways": [
      "核心重點：買對不買貴、保大不保小、正本妥善存、定期常檢視，大一新鮮人 4 大金律",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Four lifelong insurance principles: Buy right, cover big risks, store receipts, review yearly",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "請學生齊聲朗讀四金律，深化理性保險信念。",
    "discussionQuestionEn": "Discussion Inquiry: 請學生齊聲朗讀四金律，深化理性保險信念。",
    "teachingNotes": "總結新鮮人終身受用的個人保障四大金律：1. **優先購買定期險**（用超低保費買足高額風險保障）；2. **保障先於儲蓄投資**（做足意外與醫療護甲，省下的錢買 0050 ETF）；3. **據實告知健康史**（誠實填寫，不給保險公司解約拒賠藉口）；4. **堅決拒絕人情保單**（聽不懂不簽，善用 10 天契撤權）。\n\n【官方數據引述】：金管會保險局與消費者文教基金會保護原則。"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "知識全景 ‧ 體系架構",
    "categoryEn": "Panoramic View: Risk Map",
    "title": "第九週全景知識體系圖與觀念整合",
    "titleEn": "第九週全景知識體系圖與觀念整合",
    "subtitle": "全景心智圖架構：從社會保險、商業保障到資產增長之個人全方位防禦網",
    "subtitleEn": "Panoramic risk architecture: Synthesizing social insurance, commercial policies, and ETF growth",
    "quickTakeaways": [
      "核心重點：全景心智圖架構：從社會保險、商業保障到資產增長之個人全方位防禦網",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Panoramic risk architecture: Synthesizing social insurance, commercial policies, and ETF growth",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "discussionQuestionEn": "Discussion Inquiry: 引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "teachingNotes": "以全景邏輯結構圖將第九週 30 頁純教學卡片進行整體串聯：Hour 1 (風險矩陣 ➔ 大數法則 ➔ 保險利益 ➔ 最大誠信據實說明 ➔ 損害填補 ➔ 2.6張投保率) ➔ Hour 2 (機車打工風險 ➔ 意外險 ➔ 實支實付醫療險 ➔ 2026正本理賠改革 ➔ 重大傷病 ➔ 勞保強制險學團險 ➔ 除外等待期 ➔ 3大原則) ➔ Hour 3 (定期vs終身點差 ➔ 買定期+投資ETF ➔ 拒絕人情保單 ➔ 雙十原則 ➔ 3,000元方案 ➔ 據實告知法規 ➔ 4大金律)。\n\n【官方數據引述】：115學年度「管理探索二」課程組全景圖。"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "學習反思 ‧ 第十週預告",
    "categoryEn": "Reflection & Week 10 Preview",
    "title": "學習反思與第十週預告 (不動產、房地產與租買決策財務學)",
    "titleEn": "學習反思與第十週預告 (不動產、房地產與租買決策財務學)",
    "subtitle": "期末考評前哨回顧，預告第十週【不動產、房地產與租買決策財務學】新篇章",
    "subtitleEn": "Reflection on risk management and previewing Week 10: Real Estate & Rent vs Buy Decisions",
    "quickTakeaways": [
      "核心重點：期末考評前哨回顧，預告第十週【不動產、房地產與租買決策財務學】新篇章",
      "理論指引：以四象限風險矩陣與損害填補法理，貫穿大一生活現實與保險配置。",
      "決策行動：秉持『買定期+投資ETF』思維，用最小保費撬動最大人生安全網。"
    ],
    "quickTakeawaysEn": [
      "Core Takeaway: Reflection on risk management and previewing Week 10: Real Estate & Rent vs Buy Decisions",
      "Theoretical Foundation: Applying risk matrices and indemnity principles to personal safety.",
      "Actionable Rule: Adopting the 'Buy Term and Invest the Rest' philosophy for young adults."
    ],
    "discussionQuestion": "提醒學生課後完成作業提交，並預習第十週不動產主題。",
    "discussionQuestionEn": "Discussion Inquiry: 提醒學生課後完成作業提交，並預習第十週不動產主題。",
    "teachingNotes": "恭喜學生完成第九週學習！指導學生點擊 navbar 上方的「📝 本週課堂作業」按鈕，線上填寫並提交「個人第一張保單需求評估與人情保單體檢報告」。預告第十週課程主題：「不動產、房地產與租買決策財務學」，下週將帶大家探索房貸本息攤還算術、租房 vs 買房財務抉擇與青安貸款！\n\n【官方數據引述】：115學年度「管理探索二」課程計畫。"
  }
];
