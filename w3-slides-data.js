/**
 * 115學年度「管理探索二」第三週教學資料庫
 * 單元名稱：利率、央行與我們的荷包 (利率、央行貨幣政策與資產價格)
 * 包含 30 頁純教學卡片、每頁 100+ 字講授指引、雙語對照 (中/英) 與時程規劃
 */

const W3_SCHEDULE_TABLE = [
  {
    hour: "第一小時 (00:00-00:50)",
    title: "生活中的利率與借貸",
    slides: "Slide 01 - 10",
    summary: "學貸車貸生活試算、利率是金錢租金、升息一碼 (0.25%) 解密、3% 數位活存條款門檻、0% 分期付款真實年利率 (APR)、10 萬打工存款配置、房東漲租轉嫁討論。",
    activity: "🎯 專屬活動：升息下的房貸與學貸月付金計算盤（計算央行升息一碼對學貸與房貸的月繳額與便當錢影響）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第二小時 (00:50-01:40)",
    title: "新聞時事與央行開會",
    slides: "Slide 11 - 20",
    summary: "金錢時間價值 (TVM)、台灣央行升息打房迷思、美聯儲降息全球資金水龍頭、科技股折現暴跌與銀行股淨利差 (NIM) 紅利、信用卡 15% 循環利息、買房 vs 租房決策、無風險防詐金字塔、個人利率 3 大黃金法則。",
    activity: "🎯 專屬活動：刷卡分期付款真實利率大考驗（精算 0% 分期背後隱藏的手續費真實年利率 APR）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第三小時 (01:40-02:30)",
    title: "債券解密與防禦理財",
    slides: "Slide 21 - 30",
    summary: "債券殖利率借條白話文、利率與債券價格蹺蹺板、經濟軟著陸 vs 硬著陸飛行航道、大學生 2 步驟理財計畫 (高利活存+ETF)、升息時代 3 大理財地雷、看懂財經新聞 3 步驟、投資人力資本心法、全景知識網絡圖譜。",
    activity: "🎮 重磅小遊戲：央行與荷包知識大挑戰 (4關卡) ＋ 📝 課堂實務作業：央行新聞閱讀與個人 10 萬元存款計畫線上提交",
    timeAlloc: "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W3_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "第三週課程導論：利率、央行與我們的荷包",
    "titleEn": "Introduction: Interest Rates, Central Banks, and Our Wallets",
    "subtitle": "搞懂金錢的租金與央行政策，掌控日常收支與大一理財主導權",
    "subtitleEn": "Mastering the Cost of Money & Monetary Policy for Daily Financial Freedom",
    "quote": "「利率是金錢在時間軸上的租金。理解它，你就能讓錢為你工作；忽略它，你將終身為借款利息打工。」",
    "quoteEn": "Interest rate is the rent of money across time. Understand it, and money works for you; ignore it, and you work for interest.",
    "quickTakeaways": [
      "利率並非財金系專屬的冰冷數字，而是每天決定你我荷包收支的借貸租金。",
      "央行升息與降息，直接牽動學貸月繳額、租金調幅、信用卡循環利息與定存報酬。",
      "大一新生學會利率思維，就能看清零利率分期陷阱，為第一桶金打下堅固基礎。"
    ],
    "quickTakeawaysEn": [
      "Interest rates are not distant jargon; they are the rent of money directly affecting your daily cash flow.",
      "Central bank rate hikes or cuts directly shift student loan payments, rent, credit card costs, and savings returns.",
      "Developing interest rate literacy early shields college students from deceptive 0% installment traps."
    ],
    "teachingNotes": "本頁旨在吸引大一新生的關注。教師可以從新聞熱門標題切入：「大家最近是否有看過新聞說央行升息，或是朋友聊到房貸學貸變貴？」向學生強調：利率並不是財金系專屬的冰冷數字，而是每天都在決定你我口袋要花多少錢的核心因子。本週的目標是用最白話、最生活化的例子，幫大家打通財經新聞的任督二脈，教導非財金科系學生輕鬆掌握個人財務主動權。",
    "discussionQuestion": "今天出門買早餐或搭捷運時，你有想過你存在銀行的錢，每天能拿到多少利息？如果央行升息，你每個月會多付或多賺多少錢？",
    "discussionQuestionEn": "When you buy breakfast or commute today, have you wondered how much interest your bank deposit yields daily? How does a rate hike alter your wallet?",
    "visualType": "image",
    "imageSrc": "assets/images/w3_hero_interest_rates.jpg",
    "caption": "圖 3.1 現代中央銀行貨幣政策、利率天秤與個人借貸收支全景圖"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "第三週 3 小時生活化學習地圖與核心技能樹",
    "titleEn": "Week 3 3-Hour Learning Map & Core Skill Tree",
    "subtitle": "從學貸房貸體感、央行開會到債券白話文的完整知識體系",
    "subtitleEn": "From Student Loans & Mortgage Calculations to Central Bank Policy & Bond Yields",
    "quickTakeaways": [
      "第一小時：學貸車貸生活試算、利率是金錢租金、升息一碼 (0.25%) 解密與分期手續費。",
      "第二小時：金錢時間價值 (TVM)、央行升息打房時事、美聯儲降息資金水龍頭與信用卡循環利息。",
      "第三小時：債券殖利率白話文、利率與債價蹺蹺板、軟著陸 vs 硬著陸，以及大一生第一筆理財計畫。"
    ],
    "quickTakeawaysEn": [
      "Hour 1: Loan impact calculations, interest as money's rent, 25 bps hike decoding, and hidden installment fees.",
      "Hour 2: Time Value of Money (TVM), housing rate cooling myths, Fed liquidity faucet, and 15% credit card trap.",
      "Hour 3: Bond yields demystified, bond price seesaw, soft vs hard landing, and freshman savings plan."
    ],
    "teachingNotes": "本頁向大一新生展現輕鬆、實用的 3 小時學習地圖。第一小時討論學貸、車貸、定存與「什麼是升息一碼」；第二小時介紹唯一的基礎觀念「金錢的時間價值」、新聞報導央行開會與刷卡分期陷阱；第三小時則解密新聞常寫的「債券與降息」、什麼是「軟著陸/硬著陸」，以及大學生如何進行第一筆理財存款規劃。強調本週無需背誦艱深模型，重在建立防禦性素養。",
    "discussionQuestion": "在這次的學習地圖中，哪一個主題最讓你感到好奇或切身相關？你最想在今天課堂解開哪個長久以來的財經問號？",
    "discussionQuestionEn": "Looking at this 3-hour learning roadmap, which topic sparks your curiosity the most? What financial mystery do you hope to resolve today?",
    "visualType": "skill_tree",
    "treeNodes": [
      {
        "step": "01",
        "title": "生活利率與借貸",
        "desc": "學貸房貸試算 / 利率是金錢租金 / 升息一碼換算 / 0%分期手續費"
      },
      {
        "step": "02",
        "title": "新聞時事與央行",
        "desc": "金錢時間價值 / 美聯儲資金水龍頭 / 科技 vs 銀行股 / 信用卡15%循環"
      },
      {
        "step": "03",
        "title": "債券解密與防禦理財",
        "desc": "債券殖利率借據 / 價格蹺蹺板 / 經濟軟硬著陸 / 10萬打工存款配置"
      }
    ]
  },
  {
    "id": 3,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "生活體驗：學貸、買車分期與房貸每個月差多少？",
    "titleEn": "Real-World Experience: Monthly Impacts on Student, Car, and Home Loans",
    "subtitle": "微小的利率變動，如何透過本金規模放大為實質生活負擔",
    "subtitleEn": "How Tiny Interest Rate Shifts Compound Across Different Loan Scales",
    "quickTakeaways": [
      "學貸 40 萬升息 0.5%：一年多付 2,000 元利息，相當於少吃 20 個排骨便當。",
      "房貸 1,000 萬升息 0.5%：一年利息暴增 50,000 元，直接削減一次全家出國旅遊預算。",
      "利率變動看似只有零點幾個百分點，但乘上龐大本金與時間，將嚴重影響個人可支配所得。"
    ],
    "quickTakeawaysEn": [
      "A 0.5% hike on a $400k student loan costs $2,000 extra per year—equivalent to 20 bento boxes.",
      "A 0.5% hike on a $10M mortgage adds $50,000 annually—wiping out a family vacation budget.",
      "Subtle decimal rate shifts scale dramatically with principal size, deeply impacting disposable income."
    ],
    "teachingNotes": "本頁透過學生貼身生活算術引發共鳴。當央行調升利率 0.5% 時，貸款 40 萬元的學貸學生，一年要多付 2,000 元利息，相當於少吃 20 個排骨便當；而對於貸款 1,000 萬元的家庭房貸，一年利息負擔暴增 50,000 元，相當於直接削減了一趟全家出遊的預算。這讓學生深刻體驗到利率調升對家庭與個人的實質衝擊，明白利率調控直接左右每一個家庭的生活幸福感。",
    "discussionQuestion": "如果你每個月必須少吃 2 個排骨便當才能繳足調升後的學貸利息，這對你的大學日常開銷有何具體衝擊？",
    "discussionQuestionEn": "If you had to sacrifice two meals every month to cover increased loan interest, how would it affect your college budgeting mindset?",
    "visualType": "loan_impact_comparison"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "白話文：什麼是「利率」？借錢的租金與存錢的報酬",
    "titleEn": "Plain English: What is Interest? The Rent of Money vs Return on Capital",
    "subtitle": "金錢借貸的雙向租賃契約，決定了資產與負債的成長速度",
    "subtitleEn": "The Two-Way Rental Contract of Capital That Governs Wealth Accumulation",
    "quickTakeaways": [
      "向銀行借錢就像租車：借 100 萬用一年要付租金，這份代價就稱為「利息 (Interest)」。",
      "把錢存在銀行像當包租公：你把資金租給銀行運用，銀行付給你的租金就是「存款利息」。",
      "利率就是「金錢的租金價格」：利率越高，借錢成本越沉重，但儲蓄者的回報也越豐厚。"
    ],
    "quickTakeawaysEn": [
      "Borrowing from a bank is like renting a car: you pay a fee for temporary utility, which is called 'interest'.",
      "Depositing money in a bank makes you the landlord: you rent capital to the bank, and they pay you rent.",
      "Interest rate is the rental price of money: higher rates penalize borrowers but reward diligent savers."
    ],
    "teachingNotes": "本頁為「利率」給出最直白的生活化定義——「金錢的使用租金」。就像去租車公司租車一天要付 1,500 元車租一樣；如果你向銀行借錢（租錢），付給銀行的代價就叫做「利息 (Interest)」。相反地，如果你把錢存在銀行，等於你把錢租給銀行去投資，銀行付給你的租金回報就是「存款利息」。利率越高，代表借錢成本越貴，但存錢收益越高。用生活譬喻打破學生的抽象恐懼。",
    "discussionQuestion": "如果你要把心愛的筆電或機車借給同學用一個月，你會希望對方付你多少使用代價？這和銀行計算利息有何相通之處？",
    "discussionQuestionEn": "If you lent your laptop to a classmate for a month, what compensation would you expect? How does that mirror bank interest?",
    "visualType": "rent_of_money_diagram"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "新聞解密：什麼是「升息一碼」、「半碼」？",
    "titleEn": "News Decoding: What Are 'Hikes of 1 Yard (25 bps)' and 'Half Yard'?",
    "subtitle": "拆解財經主播的專業術語，一秒看懂央行調控的幅度意義",
    "subtitleEn": "Translating Financial Jargon into Everyday Percentage Points and Real Impact",
    "quickTakeaways": [
      "金融界口語的「一碼」= 0.25% (即 25 個基點 Basis Points, bps)。",
      "台灣央行習慣調控「半碼」= 0.125% (12.5 bps)；美聯儲則常以「一碼」或「二碼 (0.5%)」為單位。",
      "央行宣佈升息一碼，代表全體銀行的存放款基準利率全面同步上調 0.25 個百分點。"
    ],
    "quickTakeawaysEn": [
      "In Taiwanese financial parlance, 'One Yard' (一碼) equals 0.25% or 25 basis points (bps).",
      "Taiwan's CBC often adjusts by 'half a yard' (0.125%), while the US Fed moves in full yards (0.25%) or double yards (0.50%).",
      "A one-yard rate hike indicates that commercial lending and deposit benchmark rates shift upwards by 0.25% across the board."
    ],
    "teachingNotes": "本頁為學生解碼電視新聞主播常說的專業術語。金融界稱 0.25% 為「一碼 (1 Basis Point / 25 bps)」，稱 0.125% 為「半碼」。當新聞主播播報「台灣央行決定升息半碼」時，意思就是銀行所有的放款與存款基準年利率，通通調高了 0.125 個百分點。這項換算技能能讓學生第一次看懂財經新聞的實際意義，不再覺得央行公告遙不可及。",
    "discussionQuestion": "如果新聞報導美聯儲宣佈『升息兩碼』，請問美國基準利率一共調升了百分之幾？若是貸款 100 萬元，一年利息多多少？",
    "discussionQuestionEn": "If the Federal Reserve announces a rate hike of 'two yards', by what percentage did rates rise? How much extra interest does a $1M loan owe?",
    "visualType": "basis_points_ruler"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "數位帳戶「3% 高利活存」是真的嗎？條款大揭密",
    "titleEn": "Is '3% High-Yield Digital Savings' Real? Unveiling the Fine Print",
    "subtitle": "拆解行銷宣傳標題，識破額度天花板與任務附加條件",
    "subtitleEn": "Deconstructing Marketing Headlines: Balance Caps, Task Requirements & Duration",
    "quickTakeaways": [
      "額度上限陷阱：3% 高利率通常僅適用於前 5 萬或 10 萬元，超過金額立即降為一般活儲 (0.7%)。",
      "任務解鎖條件：常綁定每月行動支付消費、自動扣繳水電或跨行轉帳次數要求。",
      "活動期限短暫：通常為 3 至 6 個月優惠期，到期後需重新評估資金擺放位置。"
    ],
    "quickTakeawaysEn": [
      "Balance Cap Trap: 3% rates usually apply only to the first NT$50,000 or NT$100,000; excess reverts to 0.7%.",
      "Task Barriers: Often conditioned on debit card transactions, auto-pay setups, or monthly payroll deposits.",
      "Promotional Expiration: High rates typically last 3 to 6 months before settling into baseline yields."
    ],
    "teachingNotes": "本頁拆解許多大學生會被廣告吸引的「數位帳戶年利率 3% 活存」。教導學生看清廣告背後的隱藏條件：1. 額度上限限制（通常僅限前 5 萬元或 10 萬元享有 3%，超過部分回歸一般 0.8% 活存）；2. 任務解鎖條件（要求綁定行動支付或每月轉帳）。引導學生善用高利活存放預備金，但也要注意優惠期限，避免為了賺取微薄利息而產生多餘的消費浪費。",
    "discussionQuestion": "你有開過任何數位銀行的帳戶嗎？你知道你的帳戶最高可以存多少錢拿到高利息嗎？扣除條件後真正拿到的利息有多少？",
    "discussionQuestionEn": "Have you opened any digital bank accounts? Do you know the maximum balance eligible for high yields and the required maintenance tasks?",
    "visualType": "high_yield_account_matrix"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "零利率分期付款真的免費嗎？手續費換算真實利率",
    "titleEn": "Is 0% Installment Truly Free? Converting Fees into Real APR",
    "subtitle": "別被商家標榜的『零利率』蒙蔽，精算開辦費背後的高昂年息",
    "subtitleEn": "Look Beyond 'Zero Interest': Calculating the Hidden Cost of Upfront Handling Charges",
    "quickTakeaways": [
      "買 3 萬元手機分 12 期標榜 0 利率，若收取手續費 1,500 元，實質年利率 (APR) 高達 9.2%！",
      "心理陷阱：分期付款讓人誤以為「每月只要付 2,500 元好便宜」，不知不覺累積大量月付現金流負擔。",
      "牢記原則：凡有額外手續費、開辦費或帳管費的「零利率」，都是披著羊皮的高利息信貸。"
    ],
    "quickTakeawaysEn": [
      "Buying a $30,000 phone in 12 'zero-interest' installments with a $1,500 fee results in a hidden 9.2% APR!",
      "Psychological Trap: Installments create an illusion of affordability ('only $2,500/mo'), leading to accumulated debt.",
      "Golden Rule: Any 'zero interest' plan with upfront origination fees or service charges is expensive credit in disguise."
    ],
    "teachingNotes": "本頁揭露年輕人購買手機或筆電時常見的消費陷阱——「零利率分期付款」。當買 3 萬元的 iPhone 選擇 12 期分期，業者雖然標榜 0 利率，但若收取「帳分手續費/管理費 1,500 元」，經換算後的實質年利率 (APR) 居然高達 9.2%！而且分期付款容易讓人產生「每個月只要付 2,500 元很便宜」的錯覺，不知不覺累積多筆負債。提醒學生務必養成全款購物的嚴謹紀律。",
    "discussionQuestion": "你或身邊朋友買手機、球鞋或機車時，是否曾使用過分期付款？你當時是否有仔細計算手續費折合的年利率？",
    "discussionQuestionEn": "Have you or your peers ever purchased smartphones or sneakers using installment plans? Did you calculate the effective annual interest rate?",
    "visualType": "installment_hidden_apr"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "大學生第一筆 10 萬元存款該怎麼擺才不吃虧？",
    "titleEn": "How Should College Students Allocate Their First $100k Savings?",
    "subtitle": "兼顧隨時提領的流動性與抗通膨孳息，打造最聰明的資產起點",
    "subtitleEn": "Balancing Emergency Liquidity with Yield Generation for a Smart Financial Foundation",
    "quickTakeaways": [
      "最差策略：全放一般活期存款 (0.7%)，一年利息僅 700 元，資產實質購買力被通膨侵蝕殆盡。",
      "最佳配置：5 萬元放數位帳戶 3% 高利活存（年息 1,500 元），兼具突發急用與高收益。",
      "穩定基石：另外 5 萬元轉存 1 年期定存 (1.7%，年息 850 元)，鎖定無風險利息並建立儲蓄紀律。"
    ],
    "quickTakeawaysEn": [
      "Worst Strategy: Leaving the full $100,000 in standard checking (0.7%) earns only $700/yr, quickly eroded by inflation.",
      "Smart Split: Allocate $50,000 to a 3% digital high-yield account for liquidity and earn $1,500 in annual interest.",
      "Stable Anchor: Place the remaining $50,000 into a 1-year time deposit (1.7%) to lock in risk-free gains and build discipline."
    ],
    "teachingNotes": "本頁提供大學生打工存到第一筆 10 萬元時的實用資產放置建議。最差的做法是全部放在一般活期存款（年利率僅 0.7%，一年利息只有 700 元，直接被通膨吃掉）；聰明的做法是將其拆分為「緊急預備金 5 萬元」（放數位帳戶 3% 高利活存，年賺 1,500 元）與「定期存款 5 萬元 (1.7%)」，兼具流動性與利息效益。這套簡單清晰的雙軌法，能讓非財金科系學生立刻落地執行。",
    "discussionQuestion": "如果你現在手上有一筆 10 萬元的打工獎金，你會選擇立刻犒賞自己出國玩，還是按 5:5 比例進行流動性存款配置？為什麼？",
    "discussionQuestionEn": "If you earned $100,000 from a part-time job today, would you spend it on travel or split it between high-yield and time deposits? Why?",
    "visualType": "savings_allocation_100k"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "課堂討論：央行升息會讓房東調漲我們的房租嗎？",
    "titleEn": "Class Discussion: Will Central Bank Rate Hikes Make Landlords Raise Rent?",
    "subtitle": "成本轉嫁機制 vs 市場供需博弈，租屋族的自我保護策略",
    "subtitleEn": "Cost Pass-Through vs Market Supply & Demand: Self-Protection for Renters",
    "quickTakeaways": [
      "轉嫁動機：房東購屋若有高額房貸，當央行升息月付金增加時，往往試圖在換約時調高房租。",
      "市場制約：租金上限取決於周邊租屋市場行情與租客負擔能力，並非房東想漲就能任意調漲。",
      "學生對策：善用一年以上定期租約鎖定租金、檢驗定型化契約條款，並具備市場比價與議價能力。"
    ],
    "quickTakeawaysEn": [
      "Pass-Through Incentive: Landlords carrying mortgages face higher monthly payments after rate hikes and seek to hike rent.",
      "Market Constraint: Rent caps depend on neighborhood supply and tenant affordability; landlords cannot hike unchecked.",
      "Student Defense: Sign multi-year fixed leases, verify standard rental contract protections, and leverage price comparisons."
    ],
    "teachingNotes": "本頁設計課堂小組討論題目。說明房東買房若有房貸負擔，當央行升息導致每月房貸負擔增加時，房東往往會選擇在續約時調漲房租，將額外的利息成本轉嫁給租屋的大學生。引導學生從供需關係與合約角度，討論如何因應房東的漲租要求。提醒學生定型化契約中租期內不得隨意調漲的法律保障，建立實用的生活法律與談判常識。",
    "discussionQuestion": "如果房東在租約到期時說：『因為央行升息，房貸利息變重，下期房租每月要漲 1,000 元』，你覺得合理嗎？你會接受還是換租？",
    "discussionQuestionEn": "If your landlord asks for an extra $1,000/mo due to rate hikes upon lease renewal, do you find it reasonable? How would you negotiate?",
    "visualType": "rent_pass_through_flow"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "第一小時 ‧ 生活利率與借貸",
    "categoryEn": "Hour 1: Daily Rates & Borrowing",
    "title": "第一小時小結與專屬活動預告：房貸學貸月付金計算盤",
    "titleEn": "Hour 1 Wrap-up & Lab Preview: Loan Monthly Payment Calculator",
    "subtitle": "親自試算央行升息對個人與家庭荷包的便當錢衝擊",
    "subtitleEn": "Simulating the Exact Impact of Rate Hikes on Your Personal & Family Cash Flows",
    "quickTakeaways": [
      "第一小時核心回顧：利率即借貸租金、一碼為 0.25%、看穿 3% 高利活存門檻與分期手續費地雷。",
      "即將展開實作：開啟「🎯 1小時活動：房貸學貸計算盤」，輸入貸款規模與升息碼數。",
      "第二小時前瞻：金錢時間價值 (TVM)、美聯儲降息大水龍頭與信用卡 15% 循環利息噩夢。"
    ],
    "quickTakeawaysEn": [
      "Hour 1 Recap: Interest as capital rent, 25 bps hike, fine-print traps in 3% digital savings, and installment fee truths.",
      "Upcoming Lab: Launch the 'Hour 1 Lab: Loan Calculator' to quantify monthly payment shifts under different rate hike paths.",
      "Hour 2 Preview: Time Value of Money (TVM), Fed liquidity easing, and the 15% credit card compounding trap."
    ],
    "teachingNotes": "本頁總結第一小時的學習要點：理解了利率是金錢的租金、一碼為 0.25%、高利活存的限制與分期手續費陷阱。接著指引學生開啟網頁中的「🎯 1小時活動: 房貸學貸計算」，讓學生輸入自己的學貸或想像中的房貸金額，算算看升息對月付金的影響。最後預告第二小時將討論美聯儲新聞與央行總裁，讓課堂無縫銜接至互動環節。",
    "discussionQuestion": "請大家打開第一小時活動 Modal，算算看如果學貸或未來的房貸升息一碼，你一年會因此少吃幾個排骨便當？",
    "discussionQuestionEn": "Please open the Hour 1 Activity Modal: if your loan rates rise by 25 bps, how many bento meals are sacrificed each year?",
    "visualType": "milestone_hour1"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "本週唯一核心觀念：金錢的時間價值 (Time Value of Money)",
    "titleEn": "Core Concept of the Week: Time Value of Money (TVM)",
    "subtitle": "今天的 100 元永遠大於明年的 100 元，利息是延後消費的合理補償",
    "subtitleEn": "Today's Dollar Outweighs Tomorrow's: Interest as Reward for Deferred Consumption",
    "quote": "「金錢是有時間維度的。如果你今天不讓金錢為你成長，時間就會透過通膨奪走它的購買力。」",
    "quoteEn": "Money exists in a temporal dimension. If you don't allow capital to compound today, time and inflation will siphon away its purchasing power.",
    "quickTakeaways": [
      "時間價值本質：今天的 100 元可以立即投資賺取利息，且未來的 100 元購買力會被通膨稀釋。",
      "利息的誕生：他人為了借用你手中的現值進行投資，必須支付「延後消費補償費」，這就是利息。",
      "大一生理財啟示：越早開始儲蓄與複利投資，時間就是你財富擴張的最強大槓桿。"
    ],
    "quickTakeawaysEn": [
      "Essence of TVM: $100 today can be invested to earn interest, whereas $100 in the future suffers from purchasing power decay.",
      "Origin of Interest: Borrowers pay compensation for deferring your current consumption, creating the basis of interest.",
      "Takeaway for Freshmen: The earlier you commence compound investing, the more time acts as your greatest financial multiplier."
    ],
    "teachingNotes": "第二小時開始，本頁介紹本週唯一的基礎觀念——「金錢的時間價值 (Time Value of Money)」。向學生說明：「今天的 100 元，比明年的 100 元更有價值！」因為今天的 100 元拿去存銀行或投資，一年後會變成 102 元；而且明年的 100 元會因通膨買不到一樣多的便當。利息就是別人為了補償你「延後消費」所給予的獎勵。用直覺生活常識取代繁瑣公式。",
    "discussionQuestion": "如果今天給你 1 萬元，或者一年後給你 1 萬元，你會毫不猶豫選擇哪一個？如果要你等一年，對方至少要多給你多少錢你才願意？",
    "discussionQuestionEn": "If offered $10,000 today versus $10,000 a year later, which do you choose? How much extra would convince you to wait a full year?",
    "visualType": "tvm_timeline_model"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "新聞時事：台灣央行總裁開會「升息打房」有效嗎？",
    "titleEn": "News Focus: Does CBC Rate-Hiking Effectively Cool Real Estate?",
    "subtitle": "拆解貨幣政策對房價的真實傳導鏈條，理性看待媒體標題黨",
    "subtitleEn": "Deconstructing Policy Transmission to Property Markets: Scrutinizing Sensational Headlines",
    "quickTakeaways": [
      "媒體推論鏈：升息 ➔ 房貸利息上升 ➔ 購屋融資成本增加 ➔ 買方縮手 ➔ 房價預期下跌。",
      "現實限制：若升息幅度僅半碼 (0.125%)，對高資產買方每月利息影響有限，心理宣示大於實質衝擊。",
      "房價決定因素：除了利率，更受到營造工料成本、土地供給與市場預期心理等多元結構左右。"
    ],
    "quickTakeawaysEn": [
      "Media Narrative: Rate hike ➔ mortgage cost up ➔ purchasing power tightens ➔ housing demand cools ➔ home prices plummet.",
      "Real-World Limiter: Mild hikes (e.g. 12.5 bps) impose negligible strain on cash-rich buyers, acting more as a psychological signal.",
      "Multi-Factor Reality: Real estate values are deeply anchored by land scarcity, construction materials, and structural demand."
    ],
    "teachingNotes": "本頁結合台灣熱門新聞時事。每當央行召開理監事會議升息，新聞常報導「央行重拳升息打房」。說明媒體的邏輯：升息增加房貸利息 ➔ 購屋成本變高 ➔ 買房意願下滑 ➔ 抑制房價飆漲。然而實務上，若升息幅度過小（如僅半碼 0.125%），對每月房貸影響有限，且建造成本居高不下，房價往往依然堅挺。引導學生具備批判性媒體識讀能力。",
    "discussionQuestion": "你覺得新聞報導『升息能讓房價大跌』是真的嗎？你觀察身邊周遭的房價有因為過去幾次升息而明顯變便宜嗎？",
    "discussionQuestionEn": "Do you believe headlines claiming 'rate hikes will crash housing prices'? Have you observed prices falling around your neighborhood?",
    "visualType": "housing_rate_mechanism"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "新聞時事：美國阿伯開會降息，為什麼全球股市大暴動？",
    "titleEn": "News Focus: Why Does a US Fed Rate Cut Trigger Global Stock Market Surges?",
    "subtitle": "美元霸權與全球資金水龍頭效應，外資回流與台積電的連鎖反應",
    "subtitleEn": "US Dollar Hegemony & Global Liquidity Faucets: Foreign Inflows and Tech Rallies",
    "quickTakeaways": [
      "水龍頭效應：美聯儲 (Fed) 降息等於開大全球資金水龍頭，市場上大量便宜的美元開始尋找高報酬標的。",
      "熱錢湧入新興市場：外資借入低利美元，大舉買進台灣台積電 (2330) 等科技權值股，推升加權指數。",
      "匯率雙重效應：外資將美金兌換為新台幣買股，促使台幣強勁升值，形成「股匯雙漲」熱烈行情。"
    ],
    "quickTakeawaysEn": [
      "Liquidity Faucet: Fed rate cuts open global capital spigots; low-cost USD surges across the globe seeking superior yields.",
      "Emerging Market Inflows: Institutional investors allocate into powerhouse equities like TSMC, driving Taiwan's stock market.",
      "Dual Currency Effect: Converting USD to NTD drives currency appreciation, sparking synchronized stock and forex rallies."
    ],
    "teachingNotes": "本頁解釋為什麼美聯儲 (Fed) 主席發表談話，全台灣的財經新聞都在連線直播。因為美金是全球貿易與投資的主要貨幣，美聯儲降息就等於「開大全球的資金水龍頭」，大量便宜的美元資金會湧向全球股市；外資拿到便宜美元後會大舉買進台積電等台灣龍頭股票，並將美金換成台幣，帶動台幣強勢升值。讓學生理解全球宏觀金融與台灣荷包的緊密聯動。",
    "discussionQuestion": "為什麼遠在地球另一端的美國央行降息，台灣的台積電股票會跟著大漲？這背後的水龍頭資金邏輯是什麼？",
    "discussionQuestionEn": "Why does a rate decision made in Washington trigger an immediate stock surge in Taipei? What is the transmission mechanism?",
    "visualType": "image",
    "imageSrc": "assets/images/w3_fed_liquidity.jpg",
    "caption": "圖 3.2 美國聯準會開大全球資金水龍頭與國際熱錢流向示意圖"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "為什麼升息時，新聞常寫「科技股大暴跌」？",
    "titleEn": "Why Do Financial Headlines Cry 'Tech Stocks Crash' During Rate Hikes?",
    "subtitle": "折現率模型生活化解讀：無風險高利定存對高估值成長股的抽血效應",
    "subtitleEn": "Discount Rate Intuition: How Risk-Free Yields Drain Capital from High-Valuation Tech",
    "quickTakeaways": [
      "替代品誘因：當美國國債與定存能輕鬆拿到 5% 無風險利息，大資金就失去冒險投資高估值科技股的動力。",
      "借貸成本飆升：AI 與晶片研發需要大筆借款建廠，升息使利息支出暴增，直接侵蝕企業當期獲利。",
      "未來獲利打折：未來的獲利在較高的利率折現下，今天的價值大幅縮水，使高本益比科技股首當其衝。"
    ],
    "quickTakeawaysEn": [
      "Alternative Asset Pull: When risk-free Treasury yields reach 5%, institutions rotate out of volatile growth equities.",
      "Borrowing Strain: Tech enterprises require heavy capex for AI and servers; rising rates swell debt servicing expenses.",
      "Valuation Compression: High discount rates compress the present value of future cash flows, punishing premium multiples."
    ],
    "teachingNotes": "本頁用最簡單的生活常理，解釋為什麼升息會打擊科技股：1. 替代效應：當銀行定存與無風險國債能輕鬆拿到 5% 利息時，大金主就不太想冒風險去買股價很貴、本益比高的科技股票了；2. 借錢變貴：科技公司需要借大筆資金買伺服器與研發 AI，升息使借款利息暴增，直接吃掉公司利潤。用生動的資金磁吸效應引導學生看懂股市輪動。",
    "discussionQuestion": "如果你把錢存銀行定存就能穩賺 5% 年利息，你還會想拿去買股價波動劇烈、隨時可能套牢虧損的科技股嗎？",
    "discussionQuestionEn": "If you could secure a guaranteed 5% return in insured bank deposits, would you still risk capital on speculative high-tech stocks?",
    "visualType": "tech_stocks_discount_rate"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "為什麼升息對銀行股反而是好消息？",
    "titleEn": "Why Are Rate Hikes Welcome News for Commercial Banking Stocks?",
    "subtitle": "借貸利差 (NIM) 的魔法：放款利息調漲神速，活存利息調升龜速",
    "subtitleEn": "Net Interest Margin (NIM) Dynamics: Lending Yields Surge While Deposit Rates Lag",
    "quickTakeaways": [
      "存放利差擴大：央行升息 0.25%，銀行房貸放款立刻調足 0.25%，但給民眾的活存利息常僅調升 0.10%。",
      "淨利息收入創新高：中間多賺取的「利息差額」全數轉為銀行營運獲利，使金融金控股獲利逆勢暴增。",
      "存股族的最愛：高利率環境下銀行獲利豐厚、配發高額現金股利，成為市場動盪時的防禦型避風港。"
    ],
    "quickTakeawaysEn": [
      "Widening Spread: Banks immediately hike lending rates by 0.25%, while sticky retail deposit rates move up by only 0.10%.",
      "Record Net Interest Income: The expanded spread translates directly into windfall net profits for financial holding companies.",
      "Dividend Haven: Robust banking profitability supports generous cash dividend yields, drawing defensive capital."
    ],
    "teachingNotes": "本頁對比升息對銀行股的正面衝擊。央行一升息，銀行借給客戶房貸與信貸的利率立刻調高 0.25%，但付給民眾的活存利息只調高 0.1%，中間賺取的「借貸利差 (NIM)」大增！利差擴大讓銀行獲利創新高，因此升息新聞發布時，許多喜歡拿穩健股利的存股族會大舉買進金控股票。引導學生理解各產業在利率週期下的不同命運。",
    "discussionQuestion": "為什麼升息的時候科技股哀鴻遍野，但金控銀行股的股價反而逆勢上揚？銀行到底靠什麼業務賺走利潤？",
    "discussionQuestionEn": "Why do tech stocks plunge during rate hikes while financial shares surge? What is the core profit engine of commercial banks?",
    "visualType": "bank_nim_spread"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "生活實戰：信用卡「預支現金」與「循環利息」噩夢",
    "titleEn": "Real-World Combat: Credit Card Cash Advances & 15% Revolving Traps",
    "subtitle": "只繳最低應繳金額的代價：年利率高達 15% 的高利複利深淵",
    "subtitleEn": "The Hidden Cost of Paying Minimum Due: A Devastating 15% Compounding Spiral",
    "quickTakeaways": [
      "最低應繳陷阱：賬單 20,000 元只繳 2,000 元，剩餘 18,000 元立刻啟動高達 15% 的法定上限循環利息！",
      "複利噬人：15% 年利率是一般銀行定存的近 10 倍，利滾利之下，欠款金額將呈指數級暴增。",
      "黃金防禦法則：每月信用卡賬單必須全額繳清！絕不動用循環信用與預借現金，守護個人信用評分。"
    ],
    "quickTakeawaysEn": [
      "Minimum Payment Trap: Paying $2,000 on a $20,000 balance triggers a punishing 15% annual revolving rate on the remaining $18k!",
      "Exponential Compound: 15% APR is nearly ten times typical bank deposit yields, rapidly spiraling unpaid balances out of control.",
      "Golden Rule: Always settle 100% of your credit balance on time! Never activate revolving credit or ATM cash advances."
    ],
    "teachingNotes": "本頁警示年輕人絕對不能踩的個人理財地雷——信用卡「循環利息」。如果信用卡賬單 2 萬元只繳最低應繳金額 2,000 元，剩下的 1.8 萬元會被銀行啟動高達 15% 的年利率計算利滾利！15% 的高利息比任何銀行定存高出 10 倍以上，會讓年輕人快速陷入永遠還不清的卡奴負債深淵。用嚴肅而生活化的口吻提醒學生每月賬單務必全額繳清。",
    "discussionQuestion": "你有沒有看過信用卡賬單上的『最低應繳金額』？為什麼銀行會非常貼心地建議你只繳最低金額？這背後藏著什麼商業目的？",
    "discussionQuestionEn": "Have you seen the 'Minimum Payment Due' line on a credit bill? Why do banks encourage paying minimums? What is their motive?",
    "visualType": "credit_card_snowball"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "理財情境思考：高利率時代，買房還是租房划算？",
    "titleEn": "Financial Dilemma: Renting vs Buying in a High Interest Rate Era",
    "subtitle": "客觀剖析利息現金流負擔 vs 長期資產累積的雙重維度",
    "subtitleEn": "Analyzing Interest Cash Flow Outflows vs Long-Term Equity Accumulation",
    "quickTakeaways": [
      "買房思考：擁有個人資產與強迫儲蓄，但高利率下每月利息負擔沉重，自備款與流動性要求極高。",
      "租房思考：資金靈活度高，可將省下的自備款投入高年化報酬資產，但面臨房東漲租與無產權風險。",
      "客觀結論：無絕對優劣，社會新鮮人應以「個人現金流穩定度」與「職涯流動性」為首要評估依據。"
    ],
    "quickTakeawaysEn": [
      "Buying Perspective: Builds equity and forced savings, but elevated mortgage rates mean heavy interest overhead and rigid cash flow.",
      "Renting Perspective: Provides operational flexibility; capital saved from down payments can compound elsewhere, but lacks tenure security.",
      "Objective Verdict: No universal answer exists; early-career individuals must prioritize cash flow stability and career flexibility."
    ],
    "teachingNotes": "本頁引導學生思考社會新鮮人的居住理財情境。買房優點是擁有個人資產與強迫儲蓄，但高利率下每月利息負擔極沉重；租房優點是不需承擔沉重房貸本息，可將節省下來的首付款投資高收益資產，但缺點是替房東繳房貸且面臨漲租風險。沒有絕對優劣，取決於個人的資金流動性與人生階段規劃，破除非買不可或非租不可的盲目偏見。",
    "discussionQuestion": "等你大學畢業工作幾年、手頭有些積蓄後，你會選擇先租房保持投資彈性，還是咬牙背房貸買一間屬於自己的小窩？為什麼？",
    "discussionQuestionEn": "After graduating and saving your initial capital, will you rent to preserve liquidity or commit to a mortgage to secure a home? Why?",
    "visualType": "buy_vs_rent_matrix"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "防詐警訊：宣稱「月報酬 10% 零風險」的必定是詐騙！",
    "titleEn": "Fraud Alert: Any 'Guaranteed 10% Monthly Return' Is a 100% Scam!",
    "subtitle": "用『無風險基準利率』作為照妖鏡，看破所有高獲利保證的龐氏騙局",
    "subtitleEn": "Using Benchmark Risk-Free Rates as a Litmus Test to Pierce High-Yield Ponzi Schemes",
    "quickTakeaways": [
      "無風險基準：全世界最安全的美國國債與台灣公營銀行，無風險年利率僅約 1.7% 至 4.5%。",
      "荒謬算術：宣稱「月賺 10%」相當於「年化報酬率超過 213%」，連股神巴菲特 (年化約 20%) 都望塵莫及。",
      "防詐鐵律：任何同時出現「保證獲利」、「零風險」、「超高報酬」的投資邀約，100% 是詐騙吸金集團！"
    ],
    "quickTakeawaysEn": [
      "Risk-Free Anchor: The safest US Treasuries and Taiwanese sovereign banks pay annual risk-free yields of roughly 1.7% to 4.5%.",
      "Absurd Math: A 'guaranteed 10% monthly' yield compounds to over 213% annually—dwarfing even Warren Buffett's 20% record.",
      "Golden Defense Rule: Any proposal pairing 'guaranteed capital', 'zero risk', and 'sky-high returns' is unequivocally a financial scam."
    ],
    "teachingNotes": "本頁教導學生運用利率基礎獲得金融防詐免疫力。記住無風險利率基準：連全世界最強的美國政府和台灣銀行，無風險年利率也才 1.7% 到 4% 左右。如果有投資群組或網紅宣稱「保本零風險、每月保證獲利 10%（年化 120%）」，這 100% 是龐氏騙局或詐騙集團在收割資金！教學生用數學常識建立堅不可摧的心智防火牆。",
    "discussionQuestion": "如果你在社群平台看到學長姐貼出『自動跟單機器人，保證每月被動收入 8%，隨時提領』，你會如何用今天學的利率常識點醒他們？",
    "discussionQuestionEn": "If an acquaintance pitches an 'automated trading bot yielding guaranteed 8% monthly passive income', how will you refute it?",
    "visualType": "risk_free_benchmark_pyramid"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "大學生個人利率理財 3 大黃金法則",
    "titleEn": "Freshman Financial Literacy: 3 Golden Rules of Interest Rates",
    "subtitle": "築起個人資產保護城牆，做同儕中最懂守護現金流的聰明人",
    "subtitleEn": "Fortifying Personal Wealth Defense: Mastering Cash Flow Discipline on Campus",
    "quickTakeaways": [
      "法則一：絕對不碰信用卡循環利息（每月賬單務必 100% 全額繳清，不給銀行抽 15% 利息的機會）。",
      "法則二：善用數位帳戶高利活存（將生活備用金放在 2%-3% 活存，讓每一塊錢隨時孳息）。",
      "法則三：算清分期付款真實手續費（買昂貴大件商品前，先算折合年利率是否合理再行下單）。"
    ],
    "quickTakeawaysEn": [
      "Rule 1: Never incur credit card revolving interest—settle 100% of every statement to deny banks a 15% compound gouge.",
      "Rule 2: Maximize high-yield digital checking accounts—park living buffers in 2%-3% accounts so every dollar earns rent.",
      "Rule 3: Calculate the effective APR on installments—scrutinize upfront fees before committing future cash flows."
    ],
    "teachingNotes": "本頁將本小時的學習總結為 3 個實用日常生活動作：1. 絕對不繳信用卡循環利息（每月賬單全額繳清）；2. 善用數位帳戶高利活存（將打工積蓄放在 2%-3% 活存）；3. 算清分期付款真實手續費（買大件商品前先算折合年利率是否划算）。帶領學生朗讀這三大黃金法則，並強調做到了這三點，就比 80% 同齡的大學生更懂保護自己的財富。",
    "discussionQuestion": "這三大黃金法則中，你目前已經落實了哪幾點？哪一點是你覺得身邊同學最常不小心踩雷忽視的？",
    "discussionQuestionEn": "Among these three golden rules, which ones do you already practice? Which one do your peers most frequently neglect?",
    "visualType": "three_golden_rules"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "第二小時 ‧ 新聞時事與央行",
    "categoryEn": "Hour 2: News & Central Banking",
    "title": "第二小時小結與專屬活動預告：刷卡分期真實利率大考驗",
    "titleEn": "Hour 2 Wrap-up & Lab Preview: Uncovering Hidden Installment APR",
    "subtitle": "親自揭開『0 利率』背後的真實年息，掌握消費談判的真實底牌",
    "subtitleEn": "Unveiling the True Annual Cost of Stated 0% Promotions to Master Spending Decisions",
    "quickTakeaways": [
      "第二小時核心回顧：金錢時間價值 (TVM)、美聯儲降息全球效應、科技股 vs 銀行股與 15% 循環利息。",
      "即將展開實作：開啟「🎯 2小時活動：分期付款真實利率大考驗」，輸入手機/機車分期手續費換算真實 APR。",
      "第三小時前瞻：債券借據白話解密、債價蹺蹺板、軟著陸 vs 硬著陸，以及大一生個人存款實戰作業。"
    ],
    "quickTakeawaysEn": [
      "Hour 2 Recap: Time Value of Money, Fed global easing, tech multiples compression, and the 15% debt vortex.",
      "Upcoming Lab: Launch the 'Hour 2 Lab: Installment APR Calculator' to translate phone or scooter charges into effective annual rates.",
      "Hour 3 Preview: Demystifying bond yields as government IOUs, bond seesaws, macro landings, and the $100k savings assignment."
    ],
    "teachingNotes": "本頁為第二小時進行小結，複習了金錢時間價值、美聯儲新聞與信用卡循環利息陷阱。接著指引學生開啟網頁中的「🎯 2小時活動: 分期利率」，輸入商品價格與分期手續費，親自算算看暗藏的真實年利率。最後預告第三小時將用白話文解密「債券」與「經濟軟著陸」，引領學生進入生動的實作階段。",
    "discussionQuestion": "請大家打開第二小時活動 Modal，輸入你最近想買的筆電或手機分期手續費，算算看商家暗地裡扣了你多少年利率！",
    "discussionQuestionEn": "Please launch the Hour 2 Activity Modal, plug in the fees of your dream laptop or scooter, and calculate the actual APR concealed inside!",
    "visualType": "milestone_hour2"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "新聞說的「債券殖利率」到底是什麼？白話文大解密",
    "titleEn": "Demystifying 'Bond Yield' in Plain English: Government IOUs",
    "subtitle": "拋開冰冷數學，用借條借據與利息回報率徹底看懂債券",
    "subtitleEn": "Demystifying Fixed Income: Viewing Bonds as IOUs and Yields as Annual Cash Returns",
    "quote": "「債券就是一張承諾按期付息與到期還本的借據；殖利率，就是你買下這張借據後的實質利息回報百分比。」",
    "quoteEn": "A bond is simply an IOU promising regular interest and principal repayment; yield is the effective annual return on your purchase price.",
    "quickTakeaways": [
      "債券 (Bond) 白話解密：政府或世界級大企業向大眾借錢時開出的「借條借據」，約定每年付息、到期還本。",
      "殖利率 (Yield) 白話解密：你花錢買下這張借據後，**每年實際上能拿到的利息報酬百分比**。",
      "直觀範例：若政府向你借 10,000 元，每年發放 400 元利息，這張借據的年殖利率就是 4%！"
    ],
    "quickTakeawaysEn": [
      "Bond Demystified: An official promissory note (IOU) issued by governments or blue-chip corporations promising coupons and principal.",
      "Yield Demystified: The actual percentage rate of return an investor earns annually relative to the purchase price.",
      "Simple Example: If an IOU costs $10,000 and pays $400 annual coupon, your nominal yield is a straightforward 4%!"
    ],
    "teachingNotes": "第三小時開始，本頁用白話文解密新聞常出現的「債券」與「殖利率」。債券 (Bond) 白話文就是政府或大企業向你借錢開出的「借據借條」，承諾每年付利息與到期還本；殖利率 (Yield) 白話文就是你買下這張借條後，每年實際上能拿到的利息報酬百分比！殖利率越高，代表這張借條利息越甜。用借條概念打破學生對固定收益的陌生感。",
    "discussionQuestion": "如果政府跟你借 1 萬元，承諾每年給你 400 元利息，這張借條的殖利率就是 4%，是不是比想像中平易近人很多？",
    "discussionQuestionEn": "If the treasury borrows $10,000 from you and commits to paying $400 every year, isn't understanding a 4% yield quite intuitive?",
    "visualType": "bond_yield_plain_card"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "為什麼新聞說「利率上升，債券價格下跌」？",
    "titleEn": "Why Do Bond Prices Drop When Interest Rates Rise? The Seesaw Effect",
    "subtitle": "二手跳蚤拍賣市場的常理：舊款低利借據必須降價打折才有人要",
    "subtitleEn": "Secondary Market Dynamics: Older Low-Coupon IOUs Must Discount to Compete",
    "quickTakeaways": [
      "二手拍賣常識：當銀行新推出 5% 高利存款時，你手上只有 2% 利息的舊債券借據就顯得毫無吸引力。",
      "必須打折求售：想在二手市場把這張 2% 舊借據賣掉，你必須**主動降價折扣**給買家，價格因而下跌！",
      "反向蹺蹺板效應：市場利率上升 ➔ 舊債券價格下跌；市場利率下降 ➔ 舊高息債券價格大漲！"
    ],
    "quickTakeawaysEn": [
      "Flea Market Logic: When new bank deposits yield 5%, your old IOU paying only 2% coupon becomes unattractive.",
      "Discounted to Sell: To offload your 2% note on the open market, you must slash its price until its yield matches 5%.",
      "The Invariable Seesaw: When benchmark rates climb, existing bond prices plummet; when rates drop, bond values soar!"
    ],
    "teachingNotes": "本頁用貼近生活的二手拍賣例子，解釋「利率上升，債券價格下跌」的現象。假設你手上有張舊債券每年給 2% 利息，現在銀行推出全新 5% 高利定存。如果你想在二手市場把這張 2% 舊債券賣掉，就必須打折降價賣給別人，別人才願意買。這就是「利率升，舊債價格跌」的道理！引導學生用舊款二手手機出清的邏輯輕鬆理解蹺蹺板效應。",
    "discussionQuestion": "就像二手拍賣新款手機推出後，舊款手機必須降價才有買家接手一樣，升息時舊債券價格打折是不是完全符合人性常理？",
    "discussionQuestionEn": "Just as older phone models must discount when a faster model releases, doesn't discounting older low-rate bonds make total human sense?",
    "visualType": "bond_seesaw_animation"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "新聞用語解密：什麼是經濟「軟著陸」與「硬著陸」？",
    "titleEn": "Macro Vocabulary: What Are Economic 'Soft Landing' and 'Hard Landing'?",
    "subtitle": "央行總裁的飛行駕駛考驗：如何降溫通膨同時避免墜機大蕭條",
    "subtitleEn": "The Central Banker's Flight Deck: Cooling Inflation Without Crashing the Economy",
    "quickTakeaways": [
      "軟著陸 (Soft Landing)：如同客機平穩降落跑道，央行成功抑制物價通膨，且經濟持續溫和成長、失業率平穩。",
      "硬著陸 (Hard Landing)：如同飛機迫降失事，央行升息過猛導致企業融資斷流、裁員潮與經濟衰退陷入蕭條。",
      "投資意義：軟著陸下股市隨後重啟牛市；硬著陸下企業獲利大滑坡，股市面臨劇烈崩跌與資產重洗。"
    ],
    "quickTakeawaysEn": [
      "Soft Landing: Like an airliner gliding onto the runway, inflation cools while the economy avoids recession and unemployment stays low.",
      "Hard Landing: An aggressive policy over-tightening crushes corporate credit, sparking widespread layoffs, bankruptcy, and deep recession.",
      "Market Implication: Soft landings pave the way for sustainable equity bull runs; hard landings trigger steep cyclical bear markets."
    ],
    "teachingNotes": "本頁解密新聞播報降息時常提到的「軟著陸」與「硬著陸」。軟著陸 (Soft Landing) 就像飛機完美降落：央行成功讓通膨降溫，但經濟沒有衰退、大家都有工作，股市隨後大漲；硬著陸 (Hard Landing) 就像墜機事故：央行升息踩煞車過猛，導致企業大量倒閉、失業率暴增、經濟崩盤，股市大跌。用生動的機師飛行譬喻幫助學生建立清晰的宏觀經濟想像。",
    "discussionQuestion": "想像你正在駕駛載有 2,300 萬人的台灣經濟客機，如果要踩煞車讓過熱的引擎降溫，你要如何拿捏力道才能平安滑行跑道？",
    "discussionQuestionEn": "Imagine piloting an airliner carrying 23 million citizens; how gingerly must you tap the brakes to cool overheating engines smoothly?",
    "visualType": "landing_path_diagram"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "大學生如何建立第一個抗通膨與利率風險理財計畫？",
    "titleEn": "Action Plan: A Freshman's Two-Step Anti-Inflation Financial Blueprint",
    "subtitle": "零門檻落地執行：從高利活存預備金到低成本指數化被動投資",
    "subtitleEn": "Zero-Barrier Execution: From Emergency Liquid Buffers to Broad-Market Indexing",
    "quickTakeaways": [
      "第一步：建立 3 至 6 個月生活緊急預備金（存放於數位帳戶 2%~3% 高利活存，維持高流動性與隨時應急）。",
      "第二步：定期定額投資大盤市值型 ETF（如 0050 或 006208，每月從打工錢提撥 1,000-3,000 元）。",
      "長期願景：不需等出社會賺大錢才開始，現在就讓台灣前 50 大龍頭企業的成長紅利替你的錢包打工。"
    ],
    "quickTakeawaysEn": [
      "Step 1: Accumulate a 3-6 month living emergency reserve in a 2%-3% high-yield digital checking account for instant liquidity.",
      "Step 2: Dollar-Cost Average (DCA) into broad-market index ETFs (such as 0050 or 006208) with NT$1,000 to NT$3,000 monthly.",
      "Long-Term Vision: Don't wait until graduation; enlist Taiwan's top 50 industrial titans to work for your financial future today."
    ],
    "teachingNotes": "本頁提供大一新生現在就能開始的 2 步驟實用理財計畫：1. 建立 3-6 個月生活預備金（存在數位帳戶高利活存，保持隨時可提領的流動性）；2. 定期定額投資原型 ETF (如 0050 / 006208)（每個月從打工錢拿出 1,000-3,000 元，參與台灣龍頭企業成長）。鼓勵學生不必等待未來賺大錢，只要養成每月定期儲蓄與投資的好習慣，就能輕鬆戰勝通膨。",
    "discussionQuestion": "每個月從打工收入或生活費省下 1,000 元定期定額買 0050，你覺得對你目前的校園生活負擔大嗎？你願意從下個月開始嘗試嗎？",
    "discussionQuestionEn": "Does allocating NT$1,000 per month from part-time earnings into an index fund feel achievable? Are you willing to start next month?",
    "visualType": "freshman_two_step_plan"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "升息時代大學生絕對不能做的 3 個理財傻事",
    "titleEn": "3 Costly Financial Mistakes College Students Must Avoid in a Rate Hike Cycle",
    "subtitle": "理財的第一步是學會避坑，守住本金就是守住人生的選擇權",
    "subtitleEn": "The First Rule of Wealth Is Capital Preservation: Avoiding Destructive Pitfalls",
    "quickTakeaways": [
      "傻事一：借高利民間借貸或地下融資分期買機車與奢侈品（年利率常暗藏 18%-20% 高利暴力）。",
      "傻事二：把全部打工積蓄聽信明牌開融資開槓桿當沖炒股（在利率波動年代容易幾天內本金歸零）。",
      "傻事三：購買不明來源的海外高收益垃圾債券或虛擬幣高利理財質押（常為龐氏騙局捲款跑路陷阱）。"
    ],
    "quickTakeawaysEn": [
      "Mistake 1: Borrowing from predatory subprime lenders to finance luxury gadgets, where APRs quietly escalate beyond 18%-20%.",
      "Mistake 2: Gambling entire savings on leveraged margin trading or day-trading tips, risking total loss in volatile rate environments.",
      "Mistake 3: Chasing shadowy offshore 'high-yield junk notes' or crypto staking promises that collapse in sudden rug pulls."
    ],
    "teachingNotes": "本頁警示大一學生避免踩中 3 個常見理財地雷：1. 借高利貸或當鋪分期買機車/奢侈品（地下分期實質年利率常高達 18%-20%）；2. 把全部積蓄聽信明牌開槓桿當沖炒股（容易導致本金歸零）；3. 買不明來源的海外高收益垃圾債券或加密貨幣詐騙合約。提示學生理財第一步是學會避坑，不踩這三個地雷，大學的財富安全就成功了一半。",
    "discussionQuestion": "在你的同儕或社群動態中，是否看過有人因為衝動開槓桿炒短線或誤借高利貸而陷入困境？這給我們什麼寶貴警惕？",
    "discussionQuestionEn": "Have you seen classmates suffer heavy losses from day trading or unvetted installment loans? What lesson does that offer?",
    "visualType": "three_stupid_mistakes"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "實務演練：看懂今日財經新聞的三個步驟",
    "titleEn": "Practical Exercise: 3 Systematic Steps to Decipher Any Financial News",
    "subtitle": "建立個人的財經雷達，不再被聳動農場標題牽著鼻子走",
    "subtitleEn": "Building Your Critical Financial Radar to Filter Out Clickbait and Distortions",
    "quickTakeaways": [
      "步驟一：抓主角與政策動作（是美聯儲降息兩碼？還是台灣央行決議升息半碼凍結房市？）。",
      "步驟二：思考對個人荷包的直接衝擊（定存收益增加？學貸月繳變多？還是房東可能醞釀漲租？）。",
      "步驟三：評估對資本市場大方向的影響（降息利多科技權值股？還是升息推升銀行借貸淨利差？）。"
    ],
    "quickTakeawaysEn": [
      "Step 1: Identify the Key Actor & Action (Did the Fed slash rates by 50 bps or did CBC hike 12.5 bps to signal housing limits?).",
      "Step 2: Evaluate Direct Wallet Impacts (Will savings yields climb, student loan payments expand, or rent face upward pressure?).",
      "Step 3: Forecast Broad Market Shifts (Does easing ignite tech stock valuations or does tightening expand bank margins?)."
    ],
    "teachingNotes": "本頁提供以後打開手機閱讀財經新聞的 3 步驟實務演練：1. 抓主角與動作（是美聯儲降息還是台灣央行升息？）；2. 思考對荷包的直接影響（定存利息變多還是變少？學貸負擔增加還是減輕？）；3. 評估對股市大方向的衝擊（降息資金變多有利股市，升息資金變緊促使高估值股票修正）。帶領學生現場拿出手機練習，將知識轉化為隨身能力。",
    "discussionQuestion": "現在請大家拿出手機翻開今天的一則財經即時新聞，用這三步驟告訴我：這條新聞跟你的荷包究竟有什麼實質關係？",
    "discussionQuestionEn": "Pull out your smartphone, browse today's top business headline, and apply these 3 steps: what does this news mean for your wallet?",
    "visualType": "news_reading_three_steps"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "理財心法：先理健康腦，再理口袋錢",
    "titleEn": "Wealth Mindset: Cultivate a Rational Brain Before Chasing Money",
    "subtitle": "大學時期報酬率最高的資產是你自己——投資人力資本勝過盲目炒短線",
    "subtitleEn": "Your Highest-Yield Asset Is Yourself: Investing in Human Capital Tops Speculation",
    "quote": "「在二十歲的年紀，最值得投資的抗通膨高回報資產，不是任何股票或虛擬幣，而是你自己大腦裡的知識與技能。」",
    "quoteEn": "In your twenties, the ultimate high-yielding inflation-proof asset is not a stock or token—it is the knowledge inside your own mind.",
    "quickTakeaways": [
      "最強抗通膨資產：大學四年專注提升外語能力、跨領域專長與專業技能，職場本業起薪成長 20% 遠勝炒股利潤。",
      "理性思維價值：建立冷靜獨立的財經批判思考，不隨媒體恐慌起舞，是陪伴一生的珍貴財金素養。",
      "複利心態：把時間花在累積可持續的專業競爭力，財富自然會伴隨你的職涯價值水到渠成。"
    ],
    "quickTakeawaysEn": [
      "Supreme Inflation Hedge: Deepening specialized skills and foreign language proficiency can boost starting career wages by 20%.",
      "Value of Rationality: Unwavering critical financial thinking insulates you from market herd panic and speculative delusions.",
      "Compounding Mindset: Focus your twenties on compound human capital; monetary rewards naturally follow durable competence."
    ],
    "teachingNotes": "本頁分享大學時期最高回報率的投資心法。在大學時期，投資自己的人力資本（提升專業專長、外語能力與程式技能）是最好的抗通膨資產；未來職場本業加薪 20%，遠勝過盲目炒股的幾百元損益。建立理性冷靜的財經頭腦，不被媒體標題黨嚇到恐慌，就是最棒的財金素養！引導學生將焦點回歸自身成長。",
    "discussionQuestion": "在大學這四年裡，你覺得學好哪一項專業技能或跨領域專長，能讓你在未來職場上最具備不可替代的高薪實力？",
    "discussionQuestionEn": "Throughout your four years of college, which core technical skill or language capability will furnish you with the strongest career pricing power?",
    "visualType": "human_capital_pyramid"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "第三週全景生活化觀念總整理",
    "titleEn": "Week 3 Holistic Concept Synthesis & Knowledge Network",
    "subtitle": "串聯 30 頁核心精要，掌握利率、政策、借貸與個人防禦的全貌",
    "subtitleEn": "Connecting the Dots Across 30 Slides: Rates, Policy Levers, and Personal Defense",
    "quickTakeaways": [
      "核心脈絡：利率即金錢租金 ➔ 升息一碼 (0.25%) 負擔擴大 ➔ 金錢時間價值 (TVM) 延後消費補償。",
      "政策聯動：央行升降息牽動全球股市水龍頭、存放款利差 (NIM) 與二手債券蹺蹺板效應。",
      "防禦實務：拒繳 15% 信用卡循環、精算 0% 分期真實 APR、5:5 配置 10 萬存款與定額佈局 ETF。"
    ],
    "quickTakeawaysEn": [
      "Core Continuity: Interest as capital rent ➔ 25 bps adjustments ➔ Time Value of Money (TVM) rewards deferred consumption.",
      "Policy Linkage: Rate shifts steer global liquidity faucets, banking net interest margins, and secondary bond seesaw swings.",
      "Defensive Habits: Reject 15% revolving credit, calculate real APR on zero-interest deals, and split $100k savings wisely."
    ],
    "teachingNotes": "本頁進行第三週全景觀念總整理：利率是金錢的租金 ➡️ 升息一碼 (0.25%) 增加借貸負擔 ➡️ 金錢時間價值（今天的錢大於未來的錢） ➡️ 避開信用卡循環利息與分期陷阱 ➡️ 看懂美聯儲降息與債券白話文。複習總結，邀請學生用一句話告訴隔壁同學什麼是利率，驗收三小時的吸收成效。",
    "discussionQuestion": "請試著用一句最白話、連阿嬤都聽得懂的話，告訴隔壁同學什麼是『利率』？我們為什麼絕對不能動用信用卡循環利息？",
    "discussionQuestionEn": "In a single sentence that even your grandparents would immediately grasp, explain what 'interest rate' is and why revolving credit is toxic.",
    "visualType": "w3_knowledge_network"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "本週課後作業說明：央行新聞閱讀與個人存款計畫",
    "titleEn": "Homework Briefing: Central Bank News Analysis & Personal $100k Plan",
    "subtitle": "在線線上撰寫與即時成果匯出，連結真實新聞與大一個人理財實戰",
    "subtitleEn": "Online Submission & Report Export: Bridging Macro Policy with Student Finance",
    "quickTakeaways": [
      "第一部分 (30%)：央行新聞解讀——挑選一則近期央行或美聯儲升降息時事，分析其政策決策背景。",
      "第二部分 (30%)：學貸與生活影響——評估該項政策對個人學貸、打工收支或生活費的具體衝擊。",
      "第三部分 (40%)：個人 10 萬元存款規劃——規劃打工積蓄 10 萬元的分配組合並說明理由。"
    ],
    "quickTakeawaysEn": [
      "Part 1 (30%): News Analysis—Select a recent central bank rate decision and analyze its policy rationale.",
      "Part 2 (30%): Wallet Assessment—Evaluate how the policy impacts your student loans, part-time wages, and expenses.",
      "Part 3 (40%): $100k Savings Allocation—Design a practical split for NT$100k across high-yield savings, fixed deposits, and ETFs."
    ],
    "teachingNotes": "本頁指引學生完成本週課堂實務作業。請學生前往雙語網頁點擊「📝 本週課堂作業」按鈕，挑選一份近期央行升降息新聞，說明其對個人生活費或學貸的影響，並規劃個人的 10 萬元存款擺放組合線上提交。介紹網頁內建的範本套用、自動儲存與 PDF / Markdown / JSON 匯出功能，讓學生輕鬆完成課後評量。",
    "discussionQuestion": "請大家點擊頂部導覽列『📝 課堂作業』按鈕，花 10 分鐘在線撰寫並完成你的第一份專業財經新聞與存款規劃報告！",
    "discussionQuestionEn": "Click the '📝 Homework' button in the navigation header to draft and export your personal financial report within 10 minutes!",
    "visualType": "homework_briefing_card"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "第三小時 ‧ 債券解密與防禦理財",
    "categoryEn": "Hour 3: Bonds & Wealth Defense",
    "title": "學習反思與第四週預告：股票市場基礎與如何挑選第一支股票",
    "titleEn": "Reflection & Week 4 Preview: Stock Market Fundamentals & First Stock",
    "subtitle": "恭喜晉升生活財金達人！下週將解密本益比與台積電護城河",
    "subtitleEn": "Congratulations on Elevating Your Financial Literacy! Next Week: P/E Ratios & TSMC",
    "quickTakeaways": [
      "恭喜完成第三週探索！你已經掌握了利率本質、央行政策解讀、避免卡奴負債與債券白話常識。",
      "第四週重磅單元預告：【股票市場基礎與如何挑選第一支股票】。",
      "下週核心主題：什麼是股票股權？本益比 (P/E) 白話解密、台積電護城河與大一零基礎挑股指引。"
    ],
    "quickTakeawaysEn": [
      "Congratulations on completing Week 3! You now command rate literacy, policy decoding, and smart debt avoidance.",
      "Sneak Peek at Week 4: 'Stock Market Fundamentals & How to Pick Your First Stock'.",
      "Next Week's Highlights: Understanding equity ownership, demystifying P/E multiples, and analyzing TSMC's economic moat."
    ],
    "teachingNotes": "本頁為第三週畫下圓滿句點。恭喜學生具備了基礎的利率與央行新聞素養！預告第四週主題為【股票市場基礎與如何挑選第一支股票】，將用最白話的方式解密本益比 (P/E) 與台積電護城河，教大一新生如何零基礎開始理財！感謝大家的積極參與，並叮嚀記得提交課堂線上作業。",
    "discussionQuestion": "回顧今天這 3 小時的學習，哪一個新觀念最顛覆你過去對金錢和新聞的認知？你對下週的股票市場主題有什麼期待？",
    "discussionQuestionEn": "Reflecting on these 3 hours, which concept most transformed your understanding of money? What excites you about next week's stock market unit?",
    "visualType": "course_wrapup_w4_preview"
  }
];
