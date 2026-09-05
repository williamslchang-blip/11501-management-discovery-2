/**
 * 115學年度「管理探索二」第三週活動與作業資料庫
 * 單元名稱：利率、央行與我們的荷包
 * 包含 1小時房貸學貸月付金計算盤、2小時刷卡分期真實利率大考驗、3小時央行荷包大挑戰 (4關卡) 與課堂實務作業規準
 */

// ==========================================
// 1. 第 1 小時活動：升息下的房貸與學貸月付金計算盤
// ==========================================
const W3_LOAN_PRESETS = [
  {
    id: "student",
    name: "🎓 大學就學貸款 (40 萬 / 8 年期)",
    nameEn: "College Student Loan (NT$400k / 8 Yrs)",
    amount: 400000,
    years: 8,
    originalRate: 1.65,
    rateHikeSteps: [0.125, 0.25, 0.5, 0.75, 1.0],
    desc: "大學四年累積的就學貸款本金，畢業後開始按月攤還本息。利率調升直接壓縮新鮮人可支配所得。"
  },
  {
    id: "scooter",
    name: "🛵 大學通勤機車分期 (8 萬 / 2 年期)",
    nameEn: "Scooter Installment Loan (NT$80k / 2 Yrs)",
    amount: 80000,
    years: 2,
    originalRate: 3.50,
    rateHikeSteps: [0.25, 0.5, 1.0, 1.5, 2.0],
    desc: "購買通勤用新車或二手重型機車，短期信用貸款利率較高，月付金彈性攸關打工收入穩定性。"
  },
  {
    id: "mortgage_starter",
    name: "🏠 新婚首購小家庭房貸 (1,000 萬 / 30 年期)",
    nameEn: "First-Time Homebuyer Mortgage (NT$10M / 30 Yrs)",
    amount: 10000000,
    years: 30,
    originalRate: 2.15,
    rateHikeSteps: [0.125, 0.25, 0.5, 0.75, 1.0],
    desc: "青年安心成家或首購房貸，本金龐大且還款期長達 30 年，升息半碼對每月利息支出極具殺傷力。"
  },
  {
    id: "startup",
    name: "💼 青年創業啟動信貸 (200 萬 / 5 年期)",
    nameEn: "Youth Entrepreneurship Loan (NT$2M / 5 Yrs)",
    amount: 2000000,
    years: 5,
    originalRate: 2.85,
    rateHikeSteps: [0.25, 0.5, 0.75, 1.0, 1.5],
    desc: "畢業青年創業開設工作室或微型電商，高利率時期企業融資利息成本大幅加重營運現金流壓力。"
  }
];

// ==========================================
// 2. 第 2 小時活動：刷卡分期付款真實利率大考驗
// ==========================================
const W3_INSTALLMENT_CASES = [
  {
    id: "case1",
    title: "案例一：最新旗艦智慧型手機 12 期「0 利率」活動",
    titleEn: "Case 1: Flagship Smartphone 12-Month '0% Interest' Promotion",
    category: "3C 旗艦手機",
    price: 36000,
    periods: 12,
    statedRate: 0,
    fee: 1800,
    monthlyPay: 3000,
    feeDesc: "標榜刷卡 0 利率分期，但結帳時需支付『特約商店系統分期手續費 NT$ 1,800 元』。",
    feeDescEn: "Advertised as 0% interest, but an upfront 'merchant installment processing fee' of NT$1,800 is charged at checkout.",
    realApr: 9.23,
    depositMultiple: 5.4,
    expertAnalysis: "【深度審計揭露】：商家雖然標榜利息為 0%，但一次性收取的 1,800 元手續費，經過實質年百分率 (APR) 精算後，**折合年利率高達 9.23%！** 這是目前公營銀行一年期定期存款利率 (1.70%) 的 5.4 倍！表面上看似零利率，實質上你借了一筆昂貴的高利短貸。"
  },
  {
    id: "case2",
    title: "案例二：大學通勤熱門機車 24 期「零元交車」專案",
    titleEn: "Case 2: College Commuter Scooter 24-Month 'Zero Down' Plan",
    category: "交通代步工具",
    price: 82000,
    periods: 24,
    statedRate: 0,
    fee: 4500,
    monthlyPay: 3417,
    feeDesc: "購車免付頭期款直接牽車，每期只要 3,417 元，另收取『動保徵信設定費與分期手續費 NT$ 4,500 元』。",
    feeDescEn: "Zero down payment to ride away, 'only NT$3,417/mo', plus upfront credit assessment & paperwork fees of NT$4,500.",
    realApr: 5.34,
    depositMultiple: 3.1,
    expertAnalysis: "【深度審計揭露】：車行以『零元交車』減輕學生付款心理防線，但 4,500 元的開辦規費已相當於大一打工族 25 個小時的時薪工資！換算實質年利率為 5.34%，整整吃掉你 3 個月的利息收益。"
  },
  {
    id: "case3",
    title: "案例三：電競高效能筆記型電腦 6 期「無卡分期」",
    titleEn: "Case 3: High-Performance Gaming Laptop 6-Month 'Cardless' Credit",
    category: "電腦電競設備",
    price: 45000,
    periods: 6,
    statedRate: 0,
    fee: 1600,
    monthlyPay: 7500,
    feeDesc: "針對沒有信用卡的學生族群，提供免卡快速分期，另收取『平台金流手續費與帳單管理費 NT$ 1,600 元』。",
    feeDescEn: "Targeted at students without credit cards, charging an upfront platform billing service fee of NT$1,600.",
    realApr: 12.80,
    depositMultiple: 7.5,
    expertAnalysis: "【深度審計揭露】：許多大一生因尚未辦信用卡而使用第三方『無卡分期』。借款期間僅短短 6 個月，1,600 元手續費經年化折算後，實質 APR 高達驚人的 12.80%！已經極度逼近信用卡 15% 的法定循環利率天花板。"
  },
  {
    id: "case4",
    title: "案例四：限量潮流球鞋與聯名服飾 3 期分期付款",
    titleEn: "Case 4: Limited Edition Designer Sneakers 3-Month Installment",
    category: "潮流精品服飾",
    price: 12000,
    periods: 3,
    statedRate: 0,
    fee: 600,
    monthlyPay: 4000,
    feeDesc: "潮牌網購結帳選擇 3 期慢付，每期輕鬆付 4,000 元，單筆交易手續費僅收取『NT$ 600 元』。",
    feeDescEn: "Fashion checkout offering 3 easy payments of NT$4,000, plus a seemingly trivial transaction fee of NT$600.",
    realApr: 18.25,
    depositMultiple: 10.7,
    expertAnalysis: "【深度審計揭露】：這是最常見的『微小數字陷阱』！消費者往往覺得 600 元手續費很便宜，但因為還款週期僅有 3 個月，資金被迅速攤還，折合實質年利率高達誇張的 18.25%！實質年息超越了所有正規銀行信貸，屬於暴利型手續費扣除。"
  }
];

// ==========================================
// 3. 第 3 小時小遊戲：央行與荷包知識大挑戰 (4 關卡)
// ==========================================
const W3_GAME_QUESTIONS = [
  {
    id: 1,
    levelTitle: "關卡 1：一碼是多少與央行升息衝擊",
    levelTitleEn: "Level 1: Decoding 'One Yard' & Rate Hike Shocks",
    scenario: "晚間新聞主播播報：『台灣央行今日召開理監事會議，決議升息一碼以抑制通膨預期。』請問在金融界口語中，『升息一碼』代表基準年利率調升了多少？這項決策對下列哪一個族群最為有利？",
    scenarioEn: "The evening news reports: 'Taiwan CBC has decided to raise benchmark interest rates by one yard to curb inflation expectations.' What percentage does 'one yard' signify, and which demographic benefits most?",
    options: [
      { key: "A", text: "調升 0.10 個百分點，對正在背負 1000 萬房貸的小家庭最有利" },
      { key: "B", text: "調升 0.25 個百分點，對在銀行存有大筆現金定存的儲蓄族最有利", isCorrect: true },
      { key: "C", text: "調升 1.00 個百分點，對需要大筆借款建廠投資的半導體科技公司最有利" },
      { key: "D", text: "調升 0.50 個百分點，對每個月只繳信用卡最低應繳金額的學生最有利" }
    ],
    explanation: "【審計查核精解】：在台灣金融市場口語中，『一碼』代表 25 個基點 (0.25%)，『半碼』代表 0.125%。央行升息會使銀行存放款利率同步調高。對於借款人（如房貸族、企業貸款、卡債族），利息支出將明顯增加；但對於持有大筆現金存款與定存的保守儲蓄族，每期領取的利息收入隨之上升，因此最有利於定存儲蓄族！"
  },
  {
    id: 2,
    levelTitle: "關卡 2：信用卡 15% 循環利息與分期陷阱",
    levelTitleEn: "Level 2: The 15% Credit Card Revolving Trap",
    scenario: "大一生小明剛申辦了人生的第一張信用卡，本月刷卡 30,000 元購買筆記型電腦。收到紙本賬單時，他發現右下方有一欄『最低應繳金額：NT$ 3,000 元』。如果小明選擇只繳最低金額，接下來會發生什麼事？",
    scenarioEn: "Freshman Ming spent NT$30,000 on a laptop with his new credit card. His statement shows a 'Minimum Payment Due: NT$3,000'. If Ming pays only this minimum amount, what will happen next?",
    options: [
      { key: "A", text: "銀行會體諒學生打工不易，免除剩下 27,000 元的所有利息" },
      { key: "B", text: "剩下的 27,000 元將立即啟動高達 15% 的年利率計算利滾利複利，迅速累積巨額卡債", isCorrect: true },
      { key: "C", text: "小明的個人信用評分會大幅暴增，因為銀行最喜歡只繳最低應繳金額的優質客戶" },
      { key: "D", text: "只要在一年內繳清，銀行就完全不會收取任何利息或違約金" }
    ],
    explanation: "【審計查核精解】：『最低應繳金額』是銀行信用卡業務最具威力的獲利工具！只要未在截止日前全額繳清賬單，所有剩餘欠款（27,000元）就會被立即啟動高達 15%（法定上限）的年利率日日計息、利滾利！15% 複利是一般定存利息的近 10 倍，且會重創個人的聯徵信用評分。牢記黃金鐵律：每月信用卡賬單必須 100% 全額繳清！"
  },
  {
    id: 3,
    levelTitle: "關卡 3：美聯儲開大水龍頭與全球資金流向",
    levelTitleEn: "Level 3: The Fed Liquidity Faucet & Global Capital Flows",
    scenario: "美國聯準會 (Fed) 主席發表聲明宣佈降息二碼 (0.50%)，為什麼隔天全台灣財經新聞頭版大幅報導『外資大舉回流台股，台積電強勢飆漲』？這背後的金融傳導邏輯是什麼？",
    scenarioEn: "The US Federal Reserve slashes the benchmark rate by 50 bps. Why do Taiwanese news headlines shout 'Foreign Capital Floods Back, TSMC Surges'? What is the transmission logic?",
    options: [
      { key: "A", text: "美國降息等於開大全球資金水龍頭，便宜美元湧向全球新興市場，外資兌換新台幣大舉買進台積電等權值股", isCorrect: true },
      { key: "B", text: "美國降息代表美國經濟即將崩潰，外資把錢全部無償捐贈給台灣科技供應鏈" },
      { key: "C", text: "降息會使所有銀行的存款利率變為負數，逼迫全台灣散戶把全部存款拿去買台積電" },
      { key: "D", text: "降息代表半導體晶圓廠的水電製造費用直接打折 50%，促使晶片利潤瞬間翻倍" }
    ],
    explanation: "【審計查核精解】：美金是全球國際貿易與投資結算的基準貨幣。美聯儲降息降低了全球借貸美元的資金成本，相當於開大資金水龍頭。國際機構投資人會借出低息美元，換成新台幣湧入台灣等新興市場，大舉敲進獲利能力強、全球競爭力領先的台積電等核心龍頭股，帶動『台股大漲、新台幣強勢升值』的股匯雙漲資金行情！"
  },
  {
    id: 4,
    levelTitle: "關卡 4：無風險基準利率與金融防詐密碼",
    levelTitleEn: "Level 4: Risk-Free Benchmarks & Fraud Immunity",
    scenario: "在通訊軟體或社群動態中，有人發布一個『海外頂級 AI 量化套利基金』，宣稱『每月保證穩賺 10% 淨收益（年化報酬超過 120%），保本零風險，隨時可全額提領』。根據本週學到的利率素養，你該如何正確判斷與應對？",
    scenarioEn: "On social media, a user pitches an 'Offshore AI Arbitrage Fund' promising 'Guaranteed 10% monthly net return, capital insured, zero risk'. Based on our interest rate literacy, how do you judge this?",
    options: [
      { key: "A", text: "太划算了！每個月賺 10% 代表一年翻倍，應該向銀行借信貸全部投入搶賺被動收入" },
      { key: "B", text: "只要平台附有精美的官方網站與名人合照，就代表受到嚴格金融監管，可以放心匯款" },
      { key: "C", text: "100% 是龐氏騙局詐騙！全世界最強的美國國債無風險年利率也僅約 4%，宣稱月賺 10% 零風險必是吸金洗錢套路", isCorrect: true },
      { key: "D", text: "先小額投入 1,000 元試水溫，只要前面幾個月有順利出金，就證明不是詐騙集團" }
    ],
    explanation: "【審計查核精解】：『無風險基準利率 (Risk-Free Benchmark)』是所有金融詐騙的照妖鏡！連全世界主權信用最強的美國政府國庫券與台灣中央銀行，一年無風險利率也僅約 1.7% 至 4.5%。股神巴菲特半個世紀的年化報酬率約 20%。如果一個項目宣稱『保證獲利、零風險、月報酬 10%』，在金融物理學上根本不可能成立，必然是後金補前金的龐氏騙局！請直接封鎖並通報 165 反詐騙專線。"
  }
];

// ==========================================
// 4. 第 3 小時課堂實務作業：評分規準與預設範本
// ==========================================
const W3_HOMEWORK_RUBRICS = [
  {
    dim: "D1",
    name: "央行新聞解讀 (News Analysis)",
    weight: 30,
    desc: "挑選近期台灣央行或美聯儲 (Fed) 的升息/降息重大決策新聞，精準提煉政策動作幅度（如升息半碼、降息兩碼），並說明央行決策背後的通膨或景氣背景原因。"
  },
  {
    dim: "D2",
    name: "學貸與生活影響 (Wallet Impact)",
    weight: 30,
    desc: "具體量化與評估該項政策對個人學貸月付金、打工收支平衡、未來租屋租金或家庭房貸負擔的實質衝擊，並以生活化指標（如排骨便當數量或每月現金流）進行具體估算。"
  },
  {
    dim: "D3",
    name: "10 萬元存款擺放規劃 (Savings Plan)",
    weight: 40,
    desc: "為自己假設擁有 10 萬元打工儲蓄時，擬定具體的資產擺放組合（數位帳戶高利活存%、銀行定存%、原型 ETF 定期定額%），兼顧隨時應急的流動性與抗通膨孳息效益。"
  }
];

const W3_HOMEWORK_PRESETS = [
  {
    id: "preset_cbc_hike",
    title: "範本一：台灣央行預防性升息半碼，嚴防外食與房租通膨預期",
    titleEn: "Preset 1: CBC Hikes 12.5 bps to Anchor Inflation & Rent Expectations",
    newsTitle: "抗通膨與房市過熱！央行理監事會決議升息半碼 (0.125%)，重貼現率達 2.0%",
    newsSource: "中央社 / 工商時報 / 央行官方新聞稿",
    newsAnalysis: "台灣央行考量電價調漲與外食餐飲價格具備向下僵固性，為避免民眾通膨預期心理自我實現，同時抑制不動產市場信用過度擴張，採取預防性升息半碼 (0.125%) 決策。這顯示央行首要目標是維持物價穩定與金融體系健全，而非盲目刺激短期經濟成長。",
    personalImpact: `1. 學貸月付影響：若目前有 40 萬元學貸，利率調升 0.125% 後，每年利息支出約增加 500 元，相當於每年少吃 4.5 個排骨便當，短期衝擊溫和但在可承受範圍內。\n2. 租屋成本預警：房東持有之購屋貸款利息成本微幅增加，在下學期租約到期更換時，需防範房東以此為藉口要求每期調漲 500-1,000 元房租。\n3. 定存利息收益：手中打工積蓄的銀行活儲與定存利率將同步小幅調高，能多賺取少許被動利息補貼生活。`,
    savingsPlan: `【10 萬元個人打工積蓄擺放規劃】：\n1. 50,000 元 (50%) 存放於數位銀行「3% 高利活存帳戶」：作為緊急預備金，享有隨時可提領的流動性，每月可領取約 125 元利息（一年 1,500 元），充分對抗通膨。\n2. 30,000 元 (30%) 轉存「1年期銀行定存 (1.72%)」：鎖定無風險基準利息，一年領取約 516 元利息，強迫自己克制非理性購物衝動，建立儲蓄底氣。\n3. 20,000 元 (20%) 拆為每月 2,000 元定期定額買進「大盤市值型 ETF (006208)」：參與台灣科技龍頭長期獲利成長，分散買進成本，讓資產在時間複利中穩健增長。`
  },
  {
    id: "preset_fed_cut",
    title: "範本二：美國聯準會 (Fed) 啟動降息循環，開大全球資金水龍頭",
    titleEn: "Preset 2: US Federal Reserve Initiates Rate Cuts, Unleashing Global Liquidity",
    newsTitle: "美聯儲宣佈降息二碼 (0.5%)！鮑爾稱就業市場降溫，資金水龍頭重啟推升全球股市",
    newsSource: "經濟日報 / 華爾街日報 / 美國聯邦準備理事會聲明",
    newsAnalysis: "美聯儲因美國通膨率穩步降至 2.5% 附近，且非農就業增長放緩，為避免經濟陷入『硬著陸』衰退，決定採取預防性大幅降息二碼 (0.50%)。這標誌著自 2022 年以來的緊縮升息週期正式終結，全球資金借貸成本降低，大量國際資金開始自高利美金定存流出，尋求新興市場與高科技股資產配置。",
    personalImpact: `1. 台幣升值效應：外資大量將美元兌換為新台幣湧入台股買進台積電，推動新台幣強勁升值。這使得進口筆電、手機、甚至未來出國留學旅遊的成本相對變便宜。\n2. 股市情緒昂揚：大盤市值型 ETF 與科技基金淨值迅速攀升，過去定期定額累積的投資組合帳面報酬亮眼。\n3. 美元存款利息縮水：若身邊有朋友持有 5% 高利美元定存，優惠利率將逐步向下調降，需重新思考資產配置策略。`,
    savingsPlan: `【10 萬元個人打工積蓄擺放規劃】：\n1. 40,000 元 (40%) 存放於數位帳戶高利活存 (3%)：保留 4-5 個月生活緊急預備金，隨時應對筆電維修、生病或校外實習開銷。\n2. 20,000 元 (20%) 擺放台幣 1 年期定存 (1.70%)：維持固定收益防線，避免在股市熱絡時衝動將全部資金一次性歐印。\n3. 40,000 元 (40%) 分批定期定額投入「0050 或 006208 原型 ETF」：把握降息循環資金寬鬆紅利，每月定期定額 3,000 元，持續累積台灣 50 大企業股權，實踐時間複利價值。`
  }
];
