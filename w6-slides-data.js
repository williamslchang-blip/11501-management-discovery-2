/**
 * 115學年度「管理探索二」第六週教學資料庫
 * 單元名稱：數位金融、高利活存與銀行業變革
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W6_SCHEDULE_TABLE = [
  {
    "hour": "第一小時 (00:00-00:50)",
    "title": "商業銀行本質與數位帳戶",
    "slides": "Slide 01 - 10",
    "summary": "商業模式、存放款淨利差 (NIM)、信用創造乘數、實體分行成本、全台 2,300萬數位帳戶、純網銀三雄比對、高利活存限額算術、中央存保 300萬法定保障。",
    "activity": "🎯 專屬活動：數位帳戶高利活存與利息精算盤（輸入本金、優惠利率與上限額度，計算實質綜合有效利率與月利息）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第二小時 (00:50-01:40)",
    "title": "支付革命與點數經濟陷阱",
    "slides": "Slide 11 - 20",
    "summary": "現金至行動支付演進、TWQR、信用卡四角架構、海外刷卡 1.5% 手續費算術、DDC 雙幣陷阱、點數經濟 180天過期、分期 0% 誘惑、15% 循環信用利息黑洞、開放銀行 API、CBDC 與 BNPL 先買後付。",
    "activity": "🎯 專屬活動：信用卡現金回饋與海外手續費計算器（輸入刷卡金額與回饋率，精算海外 1.5% 扣除後實質淨收益與拒絕 DDC 決策）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第三小時 (01:40-02:30)",
    "title": "資安防護與新鮮人理財實戰",
    "slides": "Slide 21 - 30",
    "summary": "2FA 雙重驗證、OTP 鐵律、假冒銀行釣魚簡訊識別、人頭帳戶洗錢防制法刑責、金管會與央行數據查詢、大一 1薪轉+2高利活存配置、JCIC 聯徵信用分數積累、跨轉免手續費、大一 4 大金律。",
    "activity": "🎮 重磅小遊戲：數位金融達人大挑戰 (4關卡) ＋ 📝 課堂實務作業：數位帳戶權益比較與防詐防護報告現場提交",
    "timeAlloc": "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W6_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "第六週課程導論：數位金融、高利活存與銀行業變革",
    "titleEn": "W6 Slide 01: Introduction to Fintech, High-Yield Savings & Banking Transformation",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 01 (Hour 1)",
    "teachingNotes": "本頁為第六週課程導論。講師可以引用比爾·蓋茲 (Bill Gates) 經典名言開場：「銀行服務是必要的，但實體銀行不是！(Banking is necessary, banks are not!)」針對大一新鮮人剛滿 18 歲踏入大學、面臨人生第一次開戶與申辦信用卡/簽帳卡的興奮感切入。許多學生被社群廣告上的「高利活存 8%」、「刷卡回饋 10%」大字吸引，但往往不了解銀行背後的商業模式與行銷算術。本單元將帶領大家揭開數位金融與商業銀行的神秘面紗，建立理性務實的金融工具使用態度。\n\n【官方數據】：金融監督管理委員會 (FSC) 銀行局 / 中央銀行 (CBC) 官方資料。",
    "discussionQuestion": "問學生：『同學們上大學後，有沒有去實體銀行排隊開過戶？排了多久？跟手機開戶比起來體驗如何？』",
    "discussionQuestionEn": "Ask students: 'Have you queued up at a physical bank branch to open an account? How long did it take compared to mobile onboarding?'",
    "quickTakeaways": [
      "理解商業銀行本質與『Banking is necessary, banks are not!』之數位趨勢",
      "破除高利活存與高回饋行銷大字迷思，看懂背後額度上限與條件門檻",
      "建立滿 18 歲大一新鮮人個人金融帳戶與數位安全第一道防線"
    ],
    "quickTakeawaysEn": [
      "Understand the banking essence and Bill Gates' fintech paradigm shift",
      "Deconstruct high-yield marketing gimmicks by inspecting balance caps and tasks",
      "Establish the first line of personal banking defense for college freshmen"
    ],
    "visualType": "w6_slide_01"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "第六週 3 小時學習地圖與核心技能樹",
    "titleEn": "W6 Slide 02: 3-Hour Learning Roadmap & Core Skill Tree",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 02 (Hour 1)",
    "teachingNotes": "本頁為學生構建本週 3 小時的完整學習地圖。第一小時解密商業銀行本質、存放款淨利差 (NIM)、部分準備金信用創造機制、純網銀三雄比對與 CDIC 300萬存款保障；第二小時聚焦於支付方式演進、信用卡四角架構、海外 1.5% 手續費算術、180天點數過期陷阱與 15% 循環利息黑洞；第三小時則傳授 2FA 雙重驗證資安防護、釣魚簡訊辨識、人頭帳戶洗錢法律警告，以及 1 薪轉 + 2 數位戶的理財配置與 JCIC 聯徵信用分數建立。\n\n【官方數據】：115學年度「管理探索二」課程計畫與學習進度規劃網要。",
    "discussionQuestion": "引導學生在講義上圈出自己目前最想申辦的數位帳戶名稱，帶著問題進入本週課程。",
    "discussionQuestionEn": "Guide students to circle their preferred digital bank account and set clear learning goals for the week.",
    "quickTakeaways": [
      "完整掌握第一小時 (商業銀行本質)、第二小時 (支付與利息)、第三小時 (資安與實戰) 架構",
      "打通從存款開戶、刷卡消費、防詐防釣魚到個人聯徵信用評分全流程",
      "結合理論量化模型與真實金融 App 介面，落實課堂實務作業"
    ],
    "quickTakeawaysEn": [
      "Master the 3-hour roadmap: Banking basics, Payment & Interest, Cyber safety",
      "Connect the full cycle from account opening, card spending, anti-fraud to credit score",
      "Combine financial quantitative models with real banking apps for practical reporting"
    ],
    "visualType": "w6_slide_02"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "商業銀行的核心商業模式：存款、放款與淨利差 (NIM)",
    "titleEn": "W6 Slide 03: Commercial Bank Business Model: Deposits, Loans & Net Interest Margin (NIM)",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 03 (Hour 1)",
    "teachingNotes": "詳細講解商業銀行 (Commercial Banks) 作為「金融中介 (Financial Intermediary)」的核心盈利邏輯。銀行透過吸收社會大眾的存款並支付低利息（如活存 0.8% 或定存 1.7%），再將資金貸放給購屋族或企業並收取高利息（如房貸 2.2%、車貸 4.0%、信貸 6.0%）。兩者之間的差額即為淨利差 (Net Interest Margin, NIM)。說明 NIM 是商業銀行最主要且穩定的獲利來源，銀行本質上就是『低買高賣資金租金』的批發零售商。\n\n【官方數據】：中央銀行 (CBC) 全體銀行存放款加權平均利率統計月報。",
    "discussionQuestion": "提問：『如果你把 10 萬元存進銀行領 0.8% 利息，銀行拿這筆錢借給別人收 6% 信貸利息，銀行這一趟賺了多少錢？』",
    "discussionQuestionEn": "Question: 'If you deposit 100k at 0.8% and the bank lends it at 6% personal loan, how much spread did the bank pocket?'",
    "quickTakeaways": [
      "商業銀行本質為信用中介：吸收大眾存款、貸放給資金需求者",
      "淨利差 (NIM = 貸款加權平均利率 - 存款加權平均利率) 為銀行核心獲利水龍頭",
      "理解存戶利息是銀行的負債資金成本，貸款是銀行的資產獲利來源"
    ],
    "quickTakeawaysEn": [
      "Commercial banks act as financial intermediaries borrowing short and lending long",
      "Net Interest Margin (NIM) represents the core spread profit of the banking system",
      "Deposits are bank liabilities (interest cost); loans are bank assets (interest revenue)"
    ],
    "visualType": "w6_slide_03"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "信用創造機制：銀行如何「憑空製造貨幣」？",
    "titleEn": "W6 Slide 04: Credit Creation Mechanism: How Banks Create Money Out of Thin Air",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 04 (Hour 1)",
    "teachingNotes": "解密金融體系中最神奇的「部分準備金制度 (Fractional Reserve Banking)」。以央行法定準備率 10% 為例：小明存入 10,000 元，銀行保留 1,000 元準備金，將 9,000 元貸給小華；小華買手機後店家存入銀行，銀行再保留 900 元準備金，將 8,100 元貸給小強... 透過貨幣乘數公式 `貨幣乘數 = 1 / 法定準備率 = 10 倍`，最初的 10,000 元現金最終在社會上創造出高達 100,000 元的廣義貨幣 (M2)！說明現代社會 90% 以上的貨幣都是銀行放款創造出來的數字。\n\n【官方數據】：中央銀行 (CBC) 貨幣供給量 M1A, M1B, M2 統計數據說明。",
    "discussionQuestion": "引導思考：『如果全台灣所有人同一天跑去銀行把存款全部領出來，銀行給得出錢嗎？這就是擠兌 (Bank Run) 的由來。』",
    "discussionQuestionEn": "Thought experiment: 'If everyone in Taiwan withdrew their deposits on the same day, could banks pay? This explains a bank run.'",
    "quickTakeaways": [
      "部分準備金制度允許銀行僅保留少數流動準備金，其餘全額貸放",
      "貨幣乘數公式：乘數 = 1 / 法定準備率，10% 準備率可放大貨幣規模達 10 倍",
      "實體鈔票僅佔貨幣供給極少數，廣義 M2 大部分由商業銀行放款信用創造衍生"
    ],
    "quickTakeawaysEn": [
      "Fractional reserve banking permits banks to hold minimal reserves and lend the rest",
      "Money multiplier formula: Multiplier = 1 / Reserve Ratio (10% creates a 10x expansion)",
      "Physical banknotes form a small fraction of M2; bank credit drives the modern money supply"
    ],
    "visualType": "w6_slide_04"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "傳統銀行實體分行 vs. 數位存款帳戶 (Digital Savings)",
    "titleEn": "W6 Slide 05: Traditional Branches vs. Digital Savings Accounts",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 05 (Hour 1)",
    "teachingNotes": "對比傳統實體分行與數位存款帳戶的營運成本結構。實體銀行負擔昂貴的黃金地段租金、水電保全、防盜金庫設備與大量櫃員薪資，因此僅能給予 0.8% 左右的基本活存利率；而數位帳戶與純網銀「無實體營業據點」，營運成本極低，能將省下來的數億元租金與行政人事成本，轉化為 2.0%~3.5% 的高利活存回饋給年輕數位原生代顧客，實現利潤重分配與雙贏。\n\n【官方數據】：金融監督管理委員會 (FSC) 銀行局數位存款帳戶業務規範。",
    "discussionQuestion": "提問：『如果你是銀行總經理，省下一家分行每年 1,000 萬的租金與人事，你會拿來做什麼行銷推廣？』",
    "discussionQuestionEn": "Question: 'If you saved $10M annually in branch rent and teller salaries, how would you reinvest it to attract Gen Z?'",
    "quickTakeaways": [
      "實體分行需負擔昂貴租金、金庫安防與臨櫃人力，活存利率偏低 (約 0.8%)",
      "數位帳戶採全線上營運，省下數億固定成本直接反饋為高利活存 (2%~3.5%)",
      "數位存款帳戶具備 24 小時隨開隨用、零時差跨行轉帳之極致便利優勢"
    ],
    "quickTakeawaysEn": [
      "Physical branches bear heavy real estate and personnel costs, resulting in lower rates",
      "Digital accounts operate fully online, translating cost savings into higher APYs (2%~3.5%)",
      "Digital banking offers 24/7 instant onboarding, transfers, and transparent tracking"
    ],
    "visualType": "w6_slide_05"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "實證數據：全台數位存款帳戶突破 2,300 萬戶",
    "titleEn": "W6 Slide 06: Empirical Evidence: Taiwan Digital Accounts Surpass 23 Million",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 06 (Hour 1)",
    "teachingNotes": "引述金管會最新官方統計，揭示全台數位存款帳戶開戶數已強勢突破 2,350 萬戶（平均每位成年人擁有 1 戶以上）。將數位帳戶分為兩大陣營：1. 第一類 (傳統銀行設立之數位品牌)：如台新 Richart、國泰世華 CUBE、永豐 DAWHO，戶數超過 1,900 萬戶，市佔率逾 80%；2. 第二類 (純網路銀行 Neobanks)：如 LINE Bank、樂天銀行、將來銀行，戶數突破 400 萬戶。數據顯示數位金融已成為大學生日常生活的標準配備。\n\n【官方數據】：金融監督管理委員會 (FSC) 銀行局 2026 最新數位存款帳戶業務統計報告。",
    "discussionQuestion": "請班上同學舉手統計：『手上有台新 Richart、國泰世華或 LINE Bank 的同學請舉手？看看哪一家在大學生中最受歡迎？』",
    "discussionQuestionEn": "Class survey: 'Show of hands: who has Richart, Cathay, or LINE Bank? Let's see the most popular bank among freshmen.'",
    "quickTakeaways": [
      "全台數位存款帳戶開戶數突破 2,350 萬戶，數位開戶成為全民金融主流",
      "傳統銀行數位副牌 (Richart/DAWHO/CUBE) 市佔逾 80%，純網銀市佔近 20%",
      "大一年輕族群平均每人持有 2~3 個數位帳戶，落實分流儲蓄與高利理財"
    ],
    "quickTakeawaysEn": [
      "Taiwan digital deposit accounts exceed 23.5M, establishing online banking as standard",
      "Traditional bank sub-brands hold 80%+ market share; pure neobanks capture nearly 20%",
      "College students typically maintain 2~3 digital accounts for emergency fund and budget segregation"
    ],
    "visualType": "w6_slide_06"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "純網銀 (Neobanks) 革命：LINE Bank、樂天、將來銀行三雄比對",
    "titleEn": "W6 Slide 07: Neobanks Revolution: LINE Bank, Rakuten & NEXT Bank Compared",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 07 (Hour 1)",
    "teachingNotes": "詳細比對台灣經金管會特許核發營業執照的三家純網路銀行 (Neobanks)：1. LINE Bank (連線商業銀行)：深度整合 LINE 2,100 萬用戶社交生態圈，主打聊天室直接轉帳、分帳免記帳號與 LINE Points 即時發放；2. 樂天國際商業銀行：結合日本樂天集團與國票金控，主打樂天超級點數、日本旅遊跨境取款與樂天桃猿棒球聯名優惠；3. 將來商業銀行：結合中華電信、兆豐銀行與全聯，提供口袋帳戶自由分帳命名與業界最高額度免費跨轉跨提次數。\n\n【官方數據】：各純網銀 2026 官方公開財務報告與金管會業務統計。",
    "discussionQuestion": "提問：『跟朋友吃完飯要分帳時，用 LINE Bank 聊天室直接點擊轉帳，跟手動輸入 16 位數銀行帳號相比，有何體驗差異？』",
    "discussionQuestionEn": "Question: 'When splitting a restaurant bill, what is the experience difference between LINE chat transfers vs 16-digit account inputs?'",
    "quickTakeaways": [
      "純網銀完全不設任何實體分行，全部業務 100% 透過手機 App 運作",
      "LINE Bank 擅長社群社交轉帳、樂天主打日系生態圈、將來銀行主打自由口袋分帳",
      "依據個人生活圈與轉帳習慣選擇最適合之純網銀，享最高優惠"
    ],
    "quickTakeawaysEn": [
      "Neobanks operate with 0 physical branches; 100% services delivered via smartphone apps",
      "LINE Bank excels in social P2P transfers; Rakuten in Japan travel; NEXT Bank in budget pockets",
      "Select your neobank based on your lifestyle ecosystem to maximize perks and free transfers"
    ],
    "visualType": "w6_slide_07"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "拆解高利活存真相：牌告利率 vs. 優惠利率限額算術",
    "titleEn": "W6 Slide 08: Unmasking High-Yield Savings: Headline APY vs. Balance Cap Arithmetic",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 08 (Hour 1)",
    "teachingNotes": "揭露高利活存行銷大字背後的算術陷阱。大一新鮮人常被「高利活存 8%」大字吸引，卻忽視細則中的「金額上限 (Balance Cap)」與「指定任務」。算術實例：某銀行宣稱 8% 活存，但上限僅 10,000 元，超過部分回歸 0.8% 基本牌告利率。若存入 10 萬元，一個月領到的利息僅為 `(10,000 * 8% / 12) + (90,000 * 0.8% / 12) = 66.7 + 60 = 126.7 元`！實質年化利率僅 `126.7 * 12 / 100,000 = 1.52%`。提醒學生看利息廣告時，先看上限金額是多少。\n\n【官方數據】：中央銀行與公平交易委員會 (FTC) 不實金融廣告警示案例。",
    "discussionQuestion": "提醒：『看高利活存不能只看幾 %，一定要先看「優惠額度上限」與「次月是否需要解任務」！』",
    "discussionQuestionEn": "Warning: 'Never look only at the APY percentage; always inspect the maximum balance cap and recurring monthly tasks!'",
    "quickTakeaways": [
      "廣告宣稱 8%~10% 通常僅限極低額度 (如 1 萬~5 萬元)，超過部分回歸普通牌告",
      "綜合有效利率公式：實質利率 = (上限內利息 + 超額利息) / 總存款本金",
      "多餘資金應分流至上限較高之數位帳戶 (如 10萬~30萬享 1.5%~2%)，避免資金閒置"
    ],
    "quickTakeawaysEn": [
      "Advertised 8%~10% APY usually applies only to low caps ($10k~$50k); excess reverts to 0.8%",
      "Effective APY formula: Total Interest Earned / Total Deposited Principal",
      "Allocate surplus cash into accounts with higher caps ($100k~$300k at 1.5%~2%) to optimize returns"
    ],
    "visualType": "w6_slide_08"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "中央存款保險公司 (CDIC) 300 萬元保障機制",
    "titleEn": "W6 Slide 09: Central Deposit Insurance Corp (CDIC) NT$3 Million Guarantee",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 09 (Hour 1)",
    "teachingNotes": "解答學生常見疑慮：「純網銀沒有實體分行，萬一倒閉我的存款會不會憑空蒸發？」說明不論是傳統銀行或純網銀，只要經金管會核准設立並參加存款保險，均受到中央存款保險公司 (CDIC) 的法定保障。每一存款人在同一家要保機構之存款本金加利息，最高保障額度高達新台幣 300 萬元！且保險費依法由銀行全額負擔，存款人無須支付任何費用。讓學生破除純網銀不安全的迷思。\n\n【官方數據】：中央存款保險公司 (CDIC) 存款保險條例第 12 條規定。",
    "discussionQuestion": "問學生：『如果你未來有 500 萬元儲蓄，為了得到 100% 的存款保險全額保障，你應該怎麼存放？（答案：拆存於 2 家不同的存保銀行）』",
    "discussionQuestionEn": "Question: 'If you accumulate NT$5M in savings, how should you store it for 100% CDIC insurance coverage?'",
    "quickTakeaways": [
      "只要是合法存保會員機構，純網銀與實體銀行享有完全相同的 300 萬保額",
      "同一人、同一家金融機構最高賠付上限為新台幣 300 萬元 (本金+利息)",
      "存款保險保費由金融機構繳納，存戶享受 100% 免費法定安全網保護"
    ],
    "quickTakeawaysEn": [
      "Both neobanks and physical banks share identical CDIC protection up to NT$3M per depositor",
      "The statutory insurance covers up to NT$3 million in principal plus accrued interest per institution",
      "Insurance premiums are fully funded by banks; retail depositors enjoy a free legal safety net"
    ],
    "visualType": "w6_slide_09"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "第一小時 ‧ 銀行本質與數位帳戶",
    "categoryEn": "Hour 1: Banking Fundamentals & Digital Accounts",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "W6 Slide 10: Hour 1 Summary & Exclusive Activity Preview",
    "subtitle": "115學年度 第六週 ‧ 第 1 小時核心模組",
    "subtitleEn": "Week 6 Module 10 (Hour 1)",
    "teachingNotes": "總結第一小時核心觀念：商業銀行靠存放款利差 (NIM) 盈利；信用創造放大貨幣供給達 10 倍；數位帳戶靠省租金提供高利活存；精算優惠金額上限避免被行銷大字愚弄；認明 CDIC 300萬存款保障建立安全底氣。預告第 1 小時 Modal 實務體驗活動——「數位帳戶高利活存與利息精算盤」，引導學生輸入本金、優惠利率與上限，即刻計算實質收益與月領便當錢。\n\n【官方數據】：115學年度「管理探索二」課程組全景圖。",
    "discussionQuestion": "指導學生點擊導覽列「🎯 1小時: 高利活存試算」按鈕，準備進行實務精算演練。",
    "discussionQuestionEn": "Direct students to click 'Hr 1: Savings Calculator' on the top navbar to simulate practical high-yield returns.",
    "quickTakeaways": [
      "第一小時里程碑達成：掌握商業銀行盈利架構與數位金融核心利基",
      "識破高利活存行銷限額陷阱，學會精算實質有效年化回報",
      "開啟第 1 小時專屬計算盤，輸入個人打工本金實戰試算"
    ],
    "quickTakeawaysEn": [
      "Hour 1 Milestone reached: Mastered bank profitability and digital savings advantages",
      "Deconstructed headline APY caps to evaluate true net interest yields",
      "Launch the Hour 1 Savings Calculator to simulate personal part-time cash allocation"
    ],
    "visualType": "w6_slide_10"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "支付方式大演進：現金 ➔ 塑膠卡片 ➔ 行動支付 (Apple Pay, TWQR)",
    "titleEn": "W6 Slide 11: Payment Evolution: Cash to Cards to Mobile Payments (Apple Pay, TWQR)",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 11 (Hour 2)",
    "teachingNotes": "梳理人類交易支付方式的三代演進歷程：1. 實體現金 (Cash)：具備高匿名性與離線交易優勢，但無任何消費回饋且遺失無法掛失；2. 塑膠卡片 (Cards)：簽帳金融卡與信用卡，帶來延後付款、記帳便利與消費回饋機制；3. 行動支付 (Mobile Payments)：進一步分為 NFC 感應式 (Apple Pay, Google Pay) 與 QR Code 掃碼式 (LINE Pay, 街口, 全支付)。詳細解構財金公司推動的 TWQR 國家級共用條碼標準，破除過去各家掃碼規格互不相通的市場痛點。\n\n【官方數據】：財金資訊公司 (FISC) 全民通用支付 TWQR 規範說明。",
    "discussionQuestion": "問學生：『大家上大學後，一整天出門完全不拿出實體新台幣硬幣與鈔票的比例有多高？』",
    "discussionQuestionEn": "Ask students: 'What percentage of your daily campus spending is conducted entirely cashless via phone or card?'",
    "quickTakeaways": [
      "支付演進：從現金 (無回饋/易遺失) 到卡片 (延後付款) 到手機掃碼/感應 (秒級結帳)",
      "NFC 感應 (Apple/Google Pay) 走代碼化安全通道，QR Code 掃碼走電子支付清算",
      "國家標準 TWQR 整合百家金融機構與電支，實現一碼通掃之跨機構便利"
    ],
    "quickTakeawaysEn": [
      "Evolution: Cash (no rewards) to plastic cards (credit terms) to mobile NFC/QR code payments",
      "NFC utilizes tokenization security; QR payments integrate e-wallets into single scans",
      "Taiwan's TWQR unified standard connects disparate e-payment providers into one universal code"
    ],
    "visualType": "w6_slide_11"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "信用卡交易四角架構：發卡行、收單行、清算機構與手續費",
    "titleEn": "W6 Slide 12: Four-Party Credit Card Scheme: Issuer, Acquirer, Card Network & Interchange Fees",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 12 (Hour 2)",
    "teachingNotes": "詳細拆解日常刷卡消費幕後的「四角運作模型」：1. 發卡銀行 (Card Issuer)：核發卡片給持卡人，承擔信用風險並提供回饋金；2. 收單機構 (Acquirer)：為商家安裝刷卡機台、提供結算服務，並向商家收取 1.5%~2.5% 的商家手續費 (MDR)；3. 國際清算組織 (Card Scheme)：Visa、Mastercard、JCB 提供全球訊息交換與跨國清算；4. 特約商家 (Merchant)：負擔手續費成本以換取更高的顧客客單價與避免收假鈔風險。\n\n【官方數據】：Visa & Mastercard 國際組織官方刷卡手續費拆解手冊。",
    "discussionQuestion": "提問：『為什麼許多夜市小吃攤或早餐店不願意支援信用卡刷卡？（答案：不想負擔 2% 的手續費與稅務留痕）』",
    "discussionQuestionEn": "Question: 'Why do street stalls often resist credit cards? (Answer: To avoid the 2% merchant fee and tax audits)'",
    "quickTakeaways": [
      "信用卡生態系四大支柱：持卡人/發卡行、商家/收單行、國際清算組織 (Visa/MC)",
      "商家手續費 (約 1.5%~2.5%) 拆解為發卡行交換手續費、收單行利潤與清算網路費",
      "持卡人享受的 1%~2% 現金回饋，本質上來自商家支付手續費之利潤再分配"
    ],
    "quickTakeawaysEn": [
      "The four-party model comprises Cardholder/Issuer, Merchant/Acquirer, and Card Networks",
      "Merchant discount rates (1.5%~2.5%) fund interchange fees, network tolls, and acquirer margin",
      "Consumer cashback (1%~2%) is essentially funded by the merchant processing fee redistribution"
    ],
    "visualType": "w6_slide_12"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "信用卡現金回饋算術：國內 2% / 國外 3% 與海外交易手續費",
    "titleEn": "W6 Slide 13: Cashback Arithmetic: Domestic 2% vs. Foreign 3% & International Fees",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 13 (Hour 2)",
    "teachingNotes": "詳細剖析海外刷卡手續費與現金回饋的淨值算術。當你在國外網站（如 Steam、Netflix、Amazon、Agoda）或出國旅遊刷卡時，發卡銀行會強制收取 1.5% 海外交易手續費（1.0% 為 Visa/Mastercard 國際清算組織費，0.5% 為本國銀行手續費）。實質淨回饋公式：`海外淨回饋率 = 宣稱回饋率 (如 3.0%) - 法定手續費 (1.5%) = 淨賺 1.5%`。特別警告動態貨幣轉換 (DDC) 陷阱：在國外刷卡或網站結帳時，千萬不能選新台幣結算，否則會被加收 4%~5% 的惡劣手續費！\n\n【官方數據】：金管會銀行局信用卡海外交易手續費計收規範標準。",
    "discussionQuestion": "提醒學生：『在國外刷卡或境外網站結帳時，畫面問你要用 TWD 還是當地貨幣，一律選擇當地貨幣！』",
    "discussionQuestionEn": "Rule of thumb: 'When checking out overseas or on cross-border sites, always select local currency instead of TWD!'",
    "quickTakeaways": [
      "海外交易法定手續費為 1.5% (國際組織 1.0% + 發卡行處理費 0.5%)",
      "海外實質淨回饋 = 信用卡海外回饋率 - 1.5% 手續費 (回饋需高於 1.5% 才有賺)",
      "出國與境外網站結帳嚴禁選擇 DDC 雙幣結算 (TWD)，避免被加收 4%~5% 隱性匯差"
    ],
    "quickTakeawaysEn": [
      "Foreign transaction fees are fixed at 1.5% (1.0% card network toll + 0.5% bank processing)",
      "Net foreign cashback = Stated reward rate - 1.5% fee (must exceed 1.5% to yield positive cash)",
      "Never accept Dynamic Currency Conversion (DDC) in TWD overseas to avoid 4%~5% markups"
    ],
    "visualType": "w6_slide_13"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "點數經濟 (Points Economy)：LINE Points、街口幣與過期陷阱",
    "titleEn": "W6 Slide 14: The Points Economy: LINE Points, JKOBank Coins & Expiration Traps",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 14 (Hour 2)",
    "teachingNotes": "剖析銀行與電支平台最愛的「點數經濟 (Points Economy)」。許多信用卡不直接發放真實現金折抵，改發放 LINE Points、街口幣、玉山 Pi 幣等點數（宣稱 1 點 = 1 元）。點數對商家的好處是將用戶牢牢綁定在自己的封閉生態圈內重複消費；但隱藏對消費者的重大陷阱是「效期限制」（多數活動點數僅有 90~180 天效期）。若忘記在期限內折抵，點數會在午夜自動無情歸零，這在會計上稱為銀行的「點數過期收入 (Breakage Revenue)」。\n\n【官方數據】：行政院消費者保護會與消基會點數效期定型化契約規範調查報告。",
    "discussionQuestion": "提問：『同學們有沒有過 LINE Points 或超商點數放到過期被扣掉的痛苦經驗？當時損失了多少錢？』",
    "discussionQuestionEn": "Question: 'Have you ever had reward points expire before you could spend them? How much purchasing power was lost?'",
    "quickTakeaways": [
      "點數經濟將現金回饋轉換為生態圈代幣，刺激持卡人進行更多非必要消費",
      "警惕 90~180 天效期限制：逾期自動歸零，成為銀行的無成本過期收入 (Breakage)",
      "優先選擇直接折抵次期帳單之『現金回饋卡』，或設定點數即時自動折抵"
    ],
    "quickTakeawaysEn": [
      "Points lock consumers into proprietary ecosystems and nudge unnecessary repeat spending",
      "Watch out for 90~180 day expiration: expired points convert into bank breakage profits",
      "Prioritize true cash rebate cards that offset statements automatically over closed points"
    ],
    "visualType": "w6_slide_14"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "分期付款 (Installments) 的心理誘惑與實質利率算術",
    "titleEn": "W6 Slide 15: The Psychology & Hidden Costs of 0% Installments",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 15 (Hour 2)",
    "teachingNotes": "揭露「單筆滿額 0 利率分期」的行為心理學與財務陷阱。行為經濟學研究證明，分期付款會模糊消費時的「付錢之痛 (Pain of Paying)」，讓大一學生誤以為自己買得起超越收入負擔能力的奢侈品（如最新旗艦手機或昂貴耳機）。隱藏財務代價：1. 絕大多數信用卡規定，一旦辦理分期付款，該筆消費將不再享有任何現金回饋；2. 分期總額仍會全額佔用信用卡額度；3. 若某期忘了按時全額繳款，0% 優惠瞬間失效，立即啟動高達 15% 的循環信用利息與違約金！\n\n【官方數據】：金融消費評議中心 (FOI) 信用卡分期爭議評議裁決案例彙編。",
    "discussionQuestion": "警示學生：『買 30,000 元手機分 12 期看似月付 2,500 很輕鬆，但如果你同時分期了手機、機車、衣服，每個月固定扣款就會壓垮你的生活費！』",
    "discussionQuestionEn": "Warning: '$2,500/month for a phone feels light, but stacking phone, scooter, and clothes installments quickly bankrupts living budgets!'",
    "quickTakeaways": [
      "分期 0% 降低消費痛感，容易誘發超出大一負擔能力之衝動透支消費",
      "暗藏條款：辦理分期付款後，多數卡片不再提供原有的 2%~3% 現金回饋",
      "一旦違約未按時繳納，0% 利率立即終止並全額計收 15% 高額循環利息"
    ],
    "quickTakeawaysEn": [
      "Zero-percent installments numb the psychological pain of paying, encouraging overspending",
      "Hidden catch: Most credit cards forfeit baseline 2%~3% cashback once installments are activated",
      "A single missed payment terminates the 0% promotion and triggers 15% compounding interest"
    ],
    "visualType": "w6_slide_15"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "循環信用利息 (Revolving Credit Interest) 的高利黑洞",
    "titleEn": "W6 Slide 16: The Abyss of Revolving Credit Interest (Up to 15%)",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 16 (Hour 2)",
    "teachingNotes": "警示大一新鮮人絕對不能碰的人生第一號財務黑洞——信用卡循環信用利息。當月帳單總額 20,000 元，若只繳納「最低應繳金額」（如 2,000 元），剩下的 18,000 元將立即啟動年化 6%~15% 的高額循環利息。可怕真相在於計息方式：計息起算日不是自繳款截止日算起，而是往前溯及至「各筆消費之商家入帳日當天」按日計息！更嚴重的是，當月隨後的所有新增刷卡消費全部失去免息期，從刷卡當天就開始天天算利息。長期動用將導致債台高築、信用破產。\n\n【官方數據】：金管會銀行局信用卡業務機構管理辦法第 47 條規範。",
    "discussionQuestion": "要求學生牢記鐵律：『信用卡帳單來了，永遠只有一個合法正確的選擇——那就是【全額繳清】！』",
    "discussionQuestionEn": "Golden rule: 'When the credit card bill arrives, there is only one correct decision: Pay In Full Every Single Month!'",
    "quickTakeaways": [
      "信用卡循環利息高達 6%~15%，為台灣法定個人放款利息上限之最高級距",
      "計息起算日往前溯及至『商家入帳日』按日計息，且當月所有新刷卡喪失免息期",
      "動用循環利息將嚴重摧毀 JCIC 個人信用評分，未來無法申辦青年低利房貸"
    ],
    "quickTakeawaysEn": [
      "Revolving credit interest rates climb up to 15%, approaching legal lending caps",
      "Interest retroactively compounds daily from the merchant posting date; grace periods vanish",
      "Revolving credit severely downgrades your JCIC score, disqualifying future prime mortgages"
    ],
    "visualType": "w6_slide_16"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "開放銀行 (Open Banking) API 與三階段架構",
    "titleEn": "W6 Slide 17: Open Banking API Architecture: The 3 Evolutionary Phases",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 17 (Hour 2)",
    "teachingNotes": "介紹金管會推動的「開放銀行 (Open Banking)」戰略藍圖。過去金融數據被各大銀行封閉在各自的專屬資料庫中，開放銀行透過開放應用程式介面 (Open API)，在客戶同意授權下讓第三方服務業者 (TSP) 跨行串聯數據：第一階段（公開資訊查詢：各家利率與房貸試算比對）；第二階段（客戶資訊提供：在麻布記帳等 App 跨行查詢所有銀行的存款餘額與信用卡帳單）；第三階段（交易資訊整合：直接在第三方 App 跨行調撥轉帳付款）。讓金融數據的所有權回歸消費者個人。\n\n【官方數據】：財金資訊公司 (FISC) 開放 API 平台運作規範與技術標準。",
    "discussionQuestion": "問學生：『如果你可以用一個記帳 App 一次看清你在 5 家不同銀行的總資產與支出，這對你管理生活費有何好處？』",
    "discussionQuestionEn": "Question: 'If one budgeting app could aggregate balances across 5 different banks, how would that improve your cash flow management?'",
    "quickTakeaways": [
      "開放銀行將傳統銀行封閉數據開放給經核准的第三方機構 (TSP)，促進金融創新",
      "三階段推進：一階段查公開利率、二階段查個人跨行餘額、三階段直接跨行交易",
      "核心理念在於『資料自主權 (Data Portability)』：用戶擁有自己金融數據的支配權"
    ],
    "quickTakeawaysEn": [
      "Open Banking unlocks siloed bank data via secure APIs to authorized third-party providers",
      "Three progressive phases: Public rates lookup, Account balance aggregation, Direct transactions",
      "Core ethos is financial data portability: empowering users with total ownership over their data"
    ],
    "visualType": "w6_slide_17"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "中央銀行數位貨幣 (CBDC) 的發展與實體現金未來",
    "titleEn": "W6 Slide 18: Central Bank Digital Currency (CBDC) & The Future of Physical Cash",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 18 (Hour 2)",
    "teachingNotes": "對比中央銀行數位貨幣 (Central Bank Digital Currency, CBDC) 與民間去中心化加密貨幣（如比特幣、USDT）。CBDC 是由主權國家中央銀行直接發行並全額背書的數位法定貨幣，具備 100% 法償效力與零信用風險，在法律與經濟實質上完全等同於實體新台幣紙鈔；而加密貨幣無國家信用背書且價格暴起暴落。介紹台灣中央銀行正在推進的零售型 CBDC 概念驗證試驗，包含雙層式運作架構、離線感應付款功能與個人隱私保護機制。\n\n【官方數據】：中央銀行 (CBC) 數位新台幣 (CBDC) 研究報告與試驗進度說明。",
    "discussionQuestion": "引導思考：『如果未來全面普及央行數位新台幣，過年壓歲錢全部變成手機轉帳，實體新台幣紙鈔會不會徹底消失？』",
    "discussionQuestionEn": "Thought experiment: 'If CBDC becomes universal and red envelope gifts go entirely digital, will physical banknotes vanish?'",
    "quickTakeaways": [
      "CBDC 是央行發行的法定貨幣數位形式，具備 100% 無風險與強制法償性",
      "不同於高波動加密貨幣，數位新台幣與實體鈔票享 1:1 絕對等值兌換保證",
      "具備離線交易與可編程性，但在金融穩定與存戶隱私保護間需取得平衡"
    ],
    "quickTakeawaysEn": [
      "CBDC is sovereign legal tender issued digitally by the central bank with zero credit risk",
      "Unlike volatile crypto, digital TWD maintains guaranteed 1:1 parity with fiat banknotes",
      "Features offline capabilities and programmable logic while balancing financial privacy"
    ],
    "visualType": "w6_slide_18"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "嵌入式金融 (Embedded Finance)：先買後付 Buy Now Pay Later (BNPL)",
    "titleEn": "W6 Slide 19: Embedded Finance: Buy Now Pay Later (BNPL) Opportunities & Traps",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 19 (Hour 2)",
    "teachingNotes": "深入剖析專門瞄準無卡族群與大學生的「先買後付 (Buy Now Pay Later, BNPL，如 AFTEE、慢點付、中租銀角零卡)」。BNPL 將信貸服務無縫嵌入在網購結帳流程中，學生只要輸入手機號碼接收簡訊驗證，免財力證明、免信用卡即可無卡分期消費。優點在於無痛降低消費門檻；但暗藏重大財務危機：BNPL 過去未強制串接 JCIC 聯徵中心，容易使缺乏自制力的大學生在多家電商重複借款、過度擴張信用，一旦逾期未繳，將被收取高額延遲利息、違約金並交由催收公司索償！\n\n【官方數據】：金融監督管理委員會 (FSC) 先買後付 (BNPL) 業務自律規範與消費警示手冊。",
    "discussionQuestion": "警示學生：『BNPL 不是免費的禮物，本質上就是一種利息高昂的短期消費信用貸款！』",
    "discussionQuestionEn": "Warning: 'BNPL is not a free lunch; it is fundamentally an unsecured consumer credit line with severe penalties for default!'",
    "quickTakeaways": [
      "BNPL 嵌入電商結帳環節，憑手機號碼即可免卡分期，極度降低消費摩擦力",
      "暗藏信用過度膨脹危機：容易讓人產生『我有錢買』之假象，疊加債務負擔",
      "一旦延遲還款，將面臨高達 10%~16% 違約懲罰利息，並影響個人長期金融信用"
    ],
    "quickTakeawaysEn": [
      "BNPL embeds micro-loans into e-commerce checkout, eliminating friction for cardless students",
      "Poses severe over-leverage hazards: blinds users to their cumulative real debt obligations",
      "Defaulting incurs 10%~16% penalty interest rates and aggressive collections, damaging future credit"
    ],
    "visualType": "w6_slide_19"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "第二小時 ‧ 支付革命與點數陷阱",
    "categoryEn": "Hour 2: Payment Revolution & Points Traps",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "W6 Slide 20: Hour 2 Summary & Exclusive Activity Preview",
    "subtitle": "115學年度 第六週 ‧ 第 2 小時核心模組",
    "subtitleEn": "Week 6 Module 20 (Hour 2)",
    "teachingNotes": "總結第二小時核心觀念：海外刷卡必須扣除 1.5% 法定手續費才是真實淨回饋；警惕 180 天點數到期歸零陷阱；分期 0% 通常喪失現金回饋；絕對不能碰 15% 循環利息黑洞；理解開放銀行、CBDC 與 BNPL 先買後付的理性防禦。預告第 2 小時 Modal 實務體驗活動——「信用卡現金回饋與海外手續費計算器」，指導學生精算海外消費扣除 1.5% 手續費後的實質損益，並學會拒絕 DDC 雙幣結算惡劣匯差。\n\n【官方數據】：115學年度「管理探索二」課程組全景圖。",
    "discussionQuestion": "指導學生點擊導覽列「🎯 2小時: 刷卡回饋計算」按鈕，準備進行海外手續費試算演練。",
    "discussionQuestionEn": "Direct students to click 'Hr 2: Card Calculator' to simulate foreign transaction fees and net cashback rewards.",
    "quickTakeaways": [
      "第二小時里程碑達成：看清刷卡四角架構、手續費算術與點數過期陷阱",
      "建立海外刷卡防坑意識：回饋務必高於 1.5%、嚴厲拒絕 DDC 雙幣結算",
      "開啟第 2 小時專屬計算器，輸入網購金額與宣稱回饋進行實戰試算"
    ],
    "quickTakeawaysEn": [
      "Hour 2 Milestone reached: Deconstructed card interchange, fees, and points expiration",
      "Mastered cross-border spending: ensure rewards beat 1.5% tolls and reject all DDC prompts",
      "Launch the Hour 2 Card Calculator to evaluate net returns on foreign online purchases"
    ],
    "visualType": "w6_slide_20"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "數位金融安全的防禦第一線：兩步驟驗證 (2FA) 與生物辨識",
    "titleEn": "W6 Slide 21: The First Line of Defense: Two-Factor Authentication (2FA) & Biometrics",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 21 (Hour 3)",
    "teachingNotes": "深入講授數位金融資安的三大核心認證維度：1. 知識因素 (Knowledge)：只有你知道的事（帳號密碼、PIN 碼，切勿使用生日或 123456）；2. 持有因素 (Possession)：只有你擁有的物件（綁定之實體手機、SIM 卡、OTP 一次性簡訊驗證碼）；3. 生物特徵 (Inherence)：你本身的生理特徵（Face ID 人臉辨識、指紋辨識）。強調兩步驟驗證 (2FA) 結合兩種以上不同維度認證的強大安全防護力，並立下終身不可違背之鐵律：絕不將簡訊 6 位數 OTP 驗證碼透露給任何人！\n\n【官方數據】：內政部警政署 165 反詐騙諮詢專線資安宣導規範。",
    "discussionQuestion": "問學生：『如果自稱銀行客服打電話來，說系統資安升級要你念出簡訊裡的 6 位數驗證碼，你應該怎麼辦？（答案：立刻掛斷並撥打 165）』",
    "discussionQuestionEn": "Question: 'If a caller claims to be bank support asking for your 6-digit OTP to fix an error, what must you do?'",
    "quickTakeaways": [
      "資安三大驗證要素：知識 (密碼)、持有 (手機/OTP)、生物特徵 (Face ID)",
      "2FA 雙重驗證要求同時滿足兩種以上不同維度，防禦 99% 駭客盜帳號攻擊",
      "黃金鐵律：OTP 一次性驗證碼等同個人印鑑簽名，絕不透露給任何第三方"
    ],
    "quickTakeawaysEn": [
      "Three pillars of authentication: Knowledge (passwords), Possession (devices/OTP), Inherence (biometrics)",
      "2FA mandates combining at least two distinct factors, thwarting 99% of brute-force breaches",
      "Unbreakable rule: The 6-digit OTP serves as your digital signature—never share it with anyone"
    ],
    "visualType": "w6_slide_21"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "全面防範簡訊與通訊軟體釣魚詐騙 (Phishing Attacks)",
    "titleEn": "W6 Slide 22: Thwarting Phishing Scams via SMS & Messaging Apps",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 22 (Hour 3)",
    "teachingNotes": "剖析現代詐騙集團最常使用的「假冒金融機構釣魚簡訊 (Phishing SMS)」手法。詐騙集團利用假發報機偽冒銀行名稱發送簡訊：「【國泰/富邦】您的帳戶發生資安異常，請點擊短網址登入驗證，否則將於 24 小時內永久凍結！」受害人慌亂中點進去，映入眼簾的是複製得一模一樣的假銀行登入網站，一旦輸入網銀身分證字號、使用者密碼與 6 位數 OTP，數十萬存款在 30 秒內全數被轉帳一空！教導學生認明奇怪網址域名（如 `.xyz`、`.top`），永遠自行開啟官方銀行 App，絕不點擊簡訊連結。\n\n【官方數據】：國家通訊傳播委員會 (NCC) 暨 165 全民防騙網統計數據。",
    "discussionQuestion": "教導學生辨識網址：『台灣合法商業銀行的官方網址必定是 `.com.tw` 結尾，任何帶有奇怪符號或境外後綴的網址 100% 是詐騙！』",
    "discussionQuestionEn": "URL check: 'Legitimate Taiwan bank websites always terminate in .com.tw; weird domains like .xyz are 100% phishing traps!'",
    "quickTakeaways": [
      "釣魚簡訊常利用『帳戶凍結』、『積分兌換過期』等恐懼與貪婪情緒誘騙點擊",
      "偽冒網站會即時盜取網銀帳號、密碼與手機 OTP，數秒內完成跨行盜轉",
      "防護金律：不點擊簡訊內的任何超連結，所有銀行操作一律透過官方 App 登入"
    ],
    "quickTakeawaysEn": [
      "Phishing SMS weaponizes fear ('Account Suspended') or greed ('Points Expiring') to lure clicks",
      "Spoofed clone sites intercept credentials and OTPs in real-time to execute automated drainage",
      "Core protection: Never click links inside SMS; conduct all operations exclusively within verified banking apps"
    ],
    "visualType": "w6_slide_22"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "人頭帳戶與洗錢防制法：大一新鮮人絕對不能租借帳戶",
    "titleEn": "W6 Slide 23: Mule Accounts & AML Law: Never Rent or Lend Your Bank Cards",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 23 (Hour 3)",
    "teachingNotes": "嚴正警示大一新鮮人絕對不能碰觸的刑事重罪紅線——提供金融帳戶成為詐騙人頭帳戶。網路社群或求職群組經常刊登假徵才廣告，聲稱「高價租借銀行帳戶、提款卡與網銀密碼，每本帳戶每月躺賺 1 萬~3 萬元」。大一學生若貪圖小利出借，將直接觸犯《洗錢防制法》第 15 條之 2「提供人頭帳戶罪」與《刑法》幫助詐欺罪！法律與金融毀滅性後果：名下全台灣所有銀行帳戶立即被列為「警示帳戶」全面凍結，無法轉帳、領取打工薪水、無法開立新戶，面臨 3 年以下有期徒刑與被害人連帶民事侵權全額賠償責任，人生剛起步信用徹底破產！\n\n【官方數據】：法務部與最高檢察署洗錢防制法懲處案例宣導。",
    "discussionQuestion": "警告學生：『天下絕無白吃午餐！出借提款卡與密碼，你就是詐騙集團的洗錢共犯與代罪羔羊！』",
    "discussionQuestionEn": "Severe warning: 'No free lunch exists! Lending your ATM card and PIN makes you a criminal accomplice and financial scapegoat!'",
    "quickTakeaways": [
      "出借、出租或出售金融帳戶與提款卡，直接觸犯《洗錢防制法》最重判 3 年徒刑",
      "一旦被列為警示帳戶，全台所有銀行帳戶全數凍結，無法開戶、轉帳或領取薪水",
      "需承擔全案詐騙被害人巨額民事連帶賠償責任，毀滅大一未來人生信用"
    ],
    "quickTakeawaysEn": [
      "Lending, renting, or selling bank accounts breaches the AML Act, carrying up to 3 years imprisonment",
      "Designated 'warning accounts' freeze all bank accounts nationwide, barring salaries and digital transfers",
      "Mule account holders face severe joint civil liability to reimburse victims, destroying future financial life"
    ],
    "visualType": "w6_slide_23"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "實證數據調取：金管會銀行局與中央銀行利率查詢",
    "titleEn": "W6 Slide 24: Empirical Inquiries: FSC Banking Bureau & Central Bank Portals",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 24 (Hour 3)",
    "teachingNotes": "手把手教導學生如何跳脫社群網路農場文，查詢最權威的第一手官方金融數據：1. 金管會銀行局官方入口 (bank.gov.tw)：查詢全台各銀行數位存款帳戶最新開戶統計季報、業務執照規範與重大違規裁罰案件；2. 中央銀行官方網站 (cbc.gov.tw)：查詢央行重貼現率基準利率走勢、全體本國銀行存放款加權平均利率與利差 (NIM) 統計；3. 中央存款保險公司 (cdic.gov.tw)：一鍵查詢特定銀行或純網銀是否為合法受保機構，確認 300 萬存款安全保障。\n\n【官方數據】：金融監督管理委員會 (FSC) 暨中央銀行 (CBC) 官方數據門戶。",
    "discussionQuestion": "現場演示官方查詢流程，要求學生記下三大權威官方網址以備作業使用。",
    "discussionQuestionEn": "Demonstrate the live regulatory query workflow and require students to bookmark the official portals for homework.",
    "quickTakeaways": [
      "金管會銀行局 (bank.gov.tw)：查閱數位帳戶官方統計與金融機構合法性執照",
      "中央銀行 (cbc.gov.tw)：調取存放款加權平均利率與政策利差官方月報",
      "中央存保 (cdic.gov.tw)：核實要保會員名冊，確保存款具備 300 萬全額保障"
    ],
    "quickTakeawaysEn": [
      "FSC Banking Bureau: Verify digital banking statistics and legitimate banking licenses",
      "Central Bank of Taiwan: Access weighted deposit/loan rates and NIM historical reports",
      "CDIC Portal: Confirm participating insured member banks to ensure statutory NT$3M coverage"
    ],
    "visualType": "w6_slide_24"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "大一新鮮人數位帳戶組合策略：1 薪轉 + 2 高利活存",
    "titleEn": "W6 Slide 25: College Freshmen Account Portfolio: 1 Payroll + 2 High-Yield Savings",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 25 (Hour 3)",
    "teachingNotes": "傳授專屬大一新鮮人的最佳數位帳戶架構——「1 薪轉 + 2 高利活存」三帳戶分流理財法：1. 帳戶 A (1 戶大型傳統銀行薪轉/日常樞紐)：如國泰世華或中國信託，專門用於學校工讀薪轉、繳交學雜費、綁定行動支付與每月信用卡扣款；2. 帳戶 B (1 戶主力高利活存戶)：如台新 Richart 或永豐 DAWHO，存放 3~10 萬元的緊急預備金，享有 1.5%~3.5% 高利活存，專款儲蓄絕不輕易動用；3. 帳戶 C (1 戶純網銀消費分帳戶)：如 LINE Bank，利用聊天室好友快速分帳免手續費，並存放當月限定的零用錢娛樂預算。\n\n【官方數據】：理財規劃師 (CFP) 青年資產分流管理實務手冊。",
    "discussionQuestion": "請學生隨堂演練：『規劃你每月的打工收入或生活費，說明你打算如何分配存入這 3 個不同功能的帳戶？』",
    "discussionQuestionEn": "Exercise: 'Allocate your monthly part-time earnings or allowance across the 3 specialized accounts.'",
    "quickTakeaways": [
      "帳戶 A (薪轉/生活扣繳戶)：大型銀行樞紐，負責收薪水、繳學費與扣信用卡款",
      "帳戶 B (高利活存儲蓄戶)：存放 3~10 萬緊急預備金，最大化賺取 2%~3.5% 活存息",
      "帳戶 C (純網銀社交消費戶)：LINE Bank 等社交分帳與日常吃喝玩樂限額消費"
    ],
    "quickTakeawaysEn": [
      "Account A (Hub/Payroll): Tier-1 bank for wages, tuition auto-debit, and credit payments",
      "Account B (High-Yield): Safekeeps $30k~$100k emergency reserves maximizing 2%~3.5% APY",
      "Account C (Neobank/Social): LINE Bank for seamless peer splitting and daily entertainment allowance"
    ],
    "visualType": "w6_slide_25"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "建立個人信用聯徵紀錄 (JCIC)：信用卡全額繳清的重要性",
    "titleEn": "W6 Slide 26: Building Your JCIC Credit Profile: The Imperative of Full Monthly Payoff",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 26 (Hour 3)",
    "teachingNotes": "介紹金融界的個人「信用護照」——財團法人金融聯合徵信中心 (JCIC)。銀行未來在評估要不要借錢給你買房、買車，以及能給予多低的房貸利率，完全仰賴 JCIC 個人信用評分 (範圍介於 200 至 800 分)。關鍵加分秘訣：從大一申辦第一張信用卡或簽帳卡開始，長達數年維持「每月全額按時繳清、零延遲紀錄、零動用循環利息」；嚴重扣分黑名單：動用 15% 循環利息、辦理信用卡預借現金、延遲繳款超過一個月、以及三個月內頻繁向超過 3 家銀行申辦信用卡引發「聯徵多查」。\n\n【官方數據】：財團法人金融聯合徵信中心 (JCIC) 個人信用評分說明規範冊。",
    "discussionQuestion": "強調：『從大一辦第一張卡開始，每一次按時全額繳清，都是在為你 10 年後買房子的低利房貸積攢百萬級信用資產！』",
    "discussionQuestionEn": "Rule: 'Every on-time full payoff from age 18 builds valuable credit collateral for your future low-rate home mortgage!'",
    "quickTakeaways": [
      "聯徵評分介於 200~800 分，是未來銀行核發房貸、信貸額度與超低利率之核心依據",
      "加分金鑰：信用卡長線穩定使用、每月帳單 100% 全額準時繳清、無任何違約記錄",
      "扣分地雷：動用循環利息、預借現金、遲繳，以及短期內密集向多家銀行送件辦卡"
    ],
    "quickTakeawaysEn": [
      "JCIC credit scores (200~800) determine future mortgage approvals, credit limits, and interest rates",
      "Top boost factors: Long-standing card usage, flawless on-time full payoffs, zero default history",
      "Severe red flags: Revolving credit balances, cash advances, late fees, and excessive card inquiries"
    ],
    "visualType": "w6_slide_26"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "自動扣繳與免費跨轉/跨提次數極致利用技巧",
    "titleEn": "W6 Slide 27: Automated Transfers & Optimizing Free Monthly Transaction Allowances",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 27 (Hour 3)",
    "teachingNotes": "傳授新鮮人懶人理財與極致省錢實戰技巧。各大數位帳戶通常提供每月 10 次至高達 99 次的免費跨行轉帳與跨行提款優惠。兩大省錢省力技巧：1. 發薪日自動化劃轉 (Pay Yourself First)：在薪轉帳戶設定發薪日隔天自動預約轉帳，固定將 3,000 元直接轉入高利活存儲蓄帳戶，先儲蓄再消費；2. 善用跨行轉帳免手續費：在餐廳分帳、繳交房租或購物轉帳時，一律使用提供免費跨轉次數的數位帳戶轉出，每年省下數千元跨轉手續費（單次 15 元）。\n\n【官方數據】：各數位存款帳戶 2026 最新官方權益公告。",
    "discussionQuestion": "算一算：『如果一個月跨行轉帳與提款 10 次，一年下來光手續費就能省下 `10 * 15 * 12 = 1,800 元`，等於免費吃兩頓大餐！』",
    "discussionQuestionEn": "Math: 'Saving 10 transfer fees monthly saves $1,800 annually ($15 * 10 * 12), paying for two nice celebratory dinners!'",
    "quickTakeaways": [
      "設定發薪日次日自動預約轉帳，實踐『收入 - 儲蓄 = 支出』之富人理財紀律",
      "充分利用數位帳戶每月 10~99 次免費跨行轉帳，告別單次 15 元手續費剝削",
      "綁定信用卡帳單自動全額扣繳，杜絕因忙碌遺忘繳費引發違約金與信用污點"
    ],
    "quickTakeawaysEn": [
      "Automate post-payday transfers to execute the wealth discipline: Income - Savings = Spending",
      "Leverage 10~99 free monthly transfers to eliminate the $15 interbank fee drag",
      "Set auto-debit for full credit card statement balances to avoid late fees and credit marks"
    ],
    "visualType": "w6_slide_27"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "大一新鮮人數位金融理性使用 4 大金律",
    "titleEn": "W6 Slide 28: 4 Golden Rules of Rational Digital Finance for College Freshmen",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 28 (Hour 3)",
    "teachingNotes": "總結大一新鮮人終生受用的數位金融四大黃金防禦戒律：1. 信用卡全額按時繳清（堅決不碰最低應繳，徹底遠離 15% 循環利息吞噬）；2. 開啟 2FA 絕不透密碼（嚴格保護 6 位數 OTP 驗證碼，不點擊任何簡訊連結）；3. 精算高利活存額度（看清優惠上限與任務門檻，不過度透支消費）；4. 絕不出租出借金融帳戶（拒絕求租高價誘惑，守護個人一生的清白信用資產）。\n\n【官方數據】：金融監督管理委員會 (FSC) 銀行局消費者金融保護原則手冊。",
    "discussionQuestion": "請全體學生齊聲朗讀四大金律，將數位金融理性信念內化為個人終身直覺。",
    "discussionQuestionEn": "Recite the 4 golden rules together to internalize safe and rational fintech habits for life.",
    "quickTakeaways": [
      "金律一：信用卡永遠全額繳清，徹底封印 15% 循環信用利息",
      "金律二：全面開啟 2FA，絕不向任何外人透露 6 位數手機 OTP 驗證碼",
      "金律三：看清高利活存金額上限，善用 1 薪轉 + 2 高利活存分流",
      "金律四：絕對不借出、出租金融帳戶與提款卡，嚴守洗錢防制法紅線"
    ],
    "quickTakeawaysEn": [
      "Rule 1: Always pay credit cards in full; never trigger the 15% revolving credit debt trap",
      "Rule 2: Enforce 2FA and never disclose the 6-digit SMS OTP to any external party",
      "Rule 3: Calculate balance caps on high-yield accounts; deploy the 1+2 account segregation",
      "Rule 4: Never lend, rent, or sell bank cards; strictly avoid AML criminal liabilities"
    ],
    "visualType": "w6_slide_28"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "第六週全景知識體系圖與觀念整合",
    "titleEn": "W6 Slide 29: Week 6 Full-Landscape Knowledge Architecture & Integration",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 29 (Hour 3)",
    "teachingNotes": "以全景邏輯架構圖將第六週 30 頁純教學卡片進行系統性觀念整合：第一小時 (存放款利差 NIM ➔ 信用創造乘數 ➔ 傳統分行 vs 數位戶 ➔ 高利活存上限算術 ➔ CDIC 300萬存保) ➔ 第二小時 (現金至行動支付演進 ➔ 信用卡四角架構 ➔ 海外刷卡 1.5% 手續費 ➔ 180天點數過期 ➔ 15% 循環利息 ➔ 開放銀行 & CBDC & BNPL) ➔ 第三小時 (2FA 雙重驗證 ➔ 釣魚簡訊防禦 ➔ 人頭帳戶洗錢刑責 ➔ 1薪轉+2高利活存 ➔ JCIC 聯徵信用維護 ➔ 4 大金律)。\n\n【官方數據】：115學年度「管理探索二」課程計畫總圖表。",
    "discussionQuestion": "引導學生回顧整週學習歷程，確認每一個金融知識節點均已透徹理解。",
    "discussionQuestionEn": "Review the full intellectual map and confirm comprehension across all 30 modular nodes.",
    "quickTakeaways": [
      "五大核心支柱：商業銀行本質、高利活存算術、刷卡支付生態、資安防詐第一線、信用資產建立",
      "破除行銷術語表面假象，以數學思維衡量實質利率、手續費淨值與信用成本",
      "建立現代數位公民必備之健全金融免疫力與個人帳戶資產配置能力"
    ],
    "quickTakeawaysEn": [
      "5 Core Pillars: Banking essence, Savings arithmetic, Card ecosystem, Cyber defense, Credit building",
      "Dismantle marketing buzzwords with quantitative math: true yields, net rewards, credit costs",
      "Establish vital financial immunity and account segregation as a 21st-century digital citizen"
    ],
    "visualType": "w6_slide_29"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "第三小時 ‧ 資安防護與實戰配置",
    "categoryEn": "Hour 3: Cyber Safety & Account Strategy",
    "title": "學習反思與第七週預告 (個人外匯、匯率變動與國際貿易)",
    "titleEn": "W6 Slide 30: Learning Reflections & Week 7 Preview: Forex, FX Rates & Global Trade",
    "subtitle": "115學年度 第六週 ‧ 第 3 小時核心模組",
    "subtitleEn": "Week 6 Module 30 (Hour 3)",
    "teachingNotes": "恭喜學生圓滿完成第六週數位金融課程！指導學生點擊右上角「📝 本週課堂作業」按鈕，現場線上填寫並提交「數位帳戶權益比較與防詐防護報告」。預告第七週課程主題：「個人外匯、匯率變動與國際貿易」，下週將帶領大家跨出新台幣舒適圈，探索美金與日圓換匯最佳時機、即期 vs 現金匯率點差算術、大麥克指數 (PPP)、護國神山台積電出口升貶值影響與央行外匯存底。\n\n【官方數據】：115學年度「管理探索二」課程進度綱要。",
    "discussionQuestion": "提醒學生於期限內完成作業提交，並預習第七週個人外匯主題相關新聞。",
    "discussionQuestionEn": "Remind students to submit the online assignment and preview next week's foreign exchange topics.",
    "quickTakeaways": [
      "全週 30 頁課程圓滿結業，全面解鎖數位金融、高利活存與支付資安必備素養",
      "立即開啟線上實務作業表單，完成數位帳戶比較與個人防詐 SOP 提交",
      "下週預告：個人外匯、匯率變動與國際貿易（探索日圓美金換匯與護國神山出口）"
    ],
    "quickTakeawaysEn": [
      "Week 6 fully accomplished: Unlocked digital banking, high-yield savings, and cyber defense",
      "Launch the online homework modal to submit your digital bank comparison and anti-fraud SOP",
      "Week 7 Preview: Personal Forex, Exchange Rates & Global Trade (JPY/USD and TSMC FX sensitivity)"
    ],
    "visualType": "w6_slide_30"
  }
];
