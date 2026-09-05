/**
 * 115學年度「管理探索二」第二週活動與作業資料庫
 * 單元名稱：物價、通膨與實質購買力
 * 包含 1小時購買力計算盤、2小時縮性通膨偵探、3小時物價遊戲 (4關卡) 與課堂實務作業規準
 */

// ==========================================
// 1. 第 1 小時活動：個人實質購買力縮水計算盤
// ==========================================
const W2_PURCHASING_POWER_PRESETS = [
  {
    id: "student",
    name: "大學打工族 (工讀時薪+外食高佔比)",
    nameEn: "Part-time College Student",
    income: 16000,
    wageGrowth: 4.0,
    foodShare: 55,
    foodInflation: 9.5,
    housingShare: 25,
    housingInflation: 6.0,
    otherShare: 20,
    otherInflation: 4.0,
    desc: "三餐天天外食，手搖杯與便利商店依賴度高，對外食價格極度敏感。"
  },
  {
    id: "freshman",
    name: "社會新鮮人 (租屋小資族)",
    nameEn: "Entry-Level Renter",
    income: 35000,
    wageGrowth: 3.0,
    foodShare: 35,
    foodInflation: 8.0,
    housingShare: 35,
    housingInflation: 7.5,
    otherShare: 30,
    otherInflation: 3.5,
    desc: "租金一年一簽面臨調漲，外食與交通為固定開銷，薪資調幅追不上生活成本。"
  },
  {
    id: "midcareer",
    name: "中階上班族 (雙薪家庭房貸族)",
    nameEn: "Mid-Career Mortgage Payer",
    income: 70000,
    wageGrowth: 2.5,
    foodShare: 25,
    foodInflation: 7.0,
    housingShare: 40,
    housingInflation: 5.0,
    otherShare: 35,
    otherInflation: 4.5,
    desc: "需負擔房貸本息與家庭育兒雜支，資產開始尋求抗通膨生產性配置。"
  }
];

// ==========================================
// 2. 第 2 小時活動：隱形縮性通膨 (Shrinkflation) 偵探考驗
// ==========================================
const W2_SHRINKFLATION_CASES = [
  {
    id: "case1",
    title: "案例一：知名品牌經典脆片洋芋片",
    titleEn: "Case 1: Classic Crispy Potato Chips",
    category: "零食點心",
    oldWeight: 85,
    newWeight: 70,
    unit: "g (克)",
    oldPrice: 35,
    newPrice: 35,
    stealthTactics: "外包裝高度與寬度維持 100% 相同，氮氣填充量增加，視覺上毫無縮水破綻。",
    stealthTacticsEn: "Package height remains identical; nitrogen gas volume increased to maintain visual puffiness.",
    expertAnalysis: "原單位價格為 0.412 元/克，縮水後變為 0.500 元/克。實質單位調漲幅度高達 +21.4%！若保持原本 85 克容量，這包洋芋片相當於直接暴漲至 42.5 元！"
  },
  {
    id: "case2",
    title: "案例二：歐洲進口三角黑巧克力條",
    titleEn: "Case 2: Imported Triangular Chocolate Bar",
    category: "糖果可可",
    oldWeight: 100,
    newWeight: 80,
    unit: "g (克)",
    oldPrice: 55,
    newPrice: 55,
    stealthTactics: "長條外包裝長度不變，但暗中拉大三角形齒輪之間的間距，大幅減少內部可可總塊數。",
    stealthTacticsEn: "Outer cardboard length preserved, but widened gaps between triangular peaks shave off cocoa mass.",
    expertAnalysis: "原單位價格為 0.550 元/克，縮水後跳升至 0.688 元/克。實質隱性調漲幅度達 +25.0%！相當於原規格直接標價 68.8 元銷售。"
  },
  {
    id: "case3",
    title: "案例三：連鎖手搖飲名店大杯拿鐵",
    titleEn: "Case 3: Chain Bubble Tea Brand Large Latte",
    category: "手搖飲品",
    oldWeight: 700,
    newWeight: 600,
    unit: "ml (毫升)",
    oldPrice: 65,
    newPrice: 65,
    stealthTactics: "將飲料杯換成厚底杯型與內凹凹槽，杯口直徑相同，但容量由 700ml 縮減為 600ml。",
    stealthTacticsEn: "Replaced with deep concave bottom cups; rim diameter looks identical but holds 100ml less.",
    expertAnalysis: "原單位價格為 0.093 元/ml，縮水後攀升至 0.108 元/ml。實質調漲幅度為 +16.7%！且若消費者選擇少冰，實質茶飲容量再遭稀釋。"
  },
  {
    id: "case4",
    title: "案例四：超市抗屑清爽控油洗髮精",
    titleEn: "Case 4: Supermarket Anti-Dandruff Shampoo",
    category: "個人日化",
    oldWeight: 800,
    newWeight: 680,
    unit: "ml (毫升)",
    oldPrice: 229,
    newPrice: 229,
    stealthTactics: "外瓶曲線重新流線設計，瓶身稍微拉高拉扁，視覺上更具現代感，但實際容量減少 15%。",
    stealthTacticsEn: "Sleek aerodynamic bottle redesign appears taller on shelves, disguising a 15% volume cut.",
    expertAnalysis: "原單位價格為 0.286 元/ml，縮水後跳升至 0.337 元/ml。實質隱性漲幅達 +17.6%！日化用品消費者對容量極不敏感，是廠商縮水重災區。"
  }
];

// ==========================================
// 3. 第 3 小時小遊戲：物價與通膨真相大挑戰 (4 關卡)
// ==========================================
const W2_GAME_QUESTIONS = [
  {
    level: 1,
    badge: "關卡 1 / 4 ‧ 體感落差破譯",
    title: "官方 CPI 僅公布 2.1%，為何多數上班族體感通膨覺得高達 8%~10%？",
    titleEn: "Official CPI is 2.1%, yet public sentiment feels like 8-10%. Why?",
    scenario: "行政院主計總處公布最新消費者物價指數 (CPI) 年增率為 2.1%，符合央行 2% 目標。然而街頭民調與網路社群卻一片譁然，普遍抱怨『便當、手搖飲與房租天天在漲，根本漲了快一成！』這項巨大認知落差最核心的統計學與心理學原因是什麼？",
    options: [
      {
        text: "官方統計局蓄意編造假數據，故意隱匿所有民生物資的真實市場價格。",
        isCorrect: false,
        feedback: "❌ 錯誤。主計總處調查數據遵循國際 IMF 標準與嚴謹查價規範，並非捏造假數據，而是加權籃子結構與購買頻率造成的客觀落差。"
      },
      {
        text: "頻率偏誤 (Frequency Bias)：大眾天天購買外食與高頻物資，對其漲價記憶極深；但 CPI 同時包含了數年才買一次且常年降價的 3C 電腦與家電，拉低了總體加權平均數。",
        isCorrect: true,
        feedback: "🎯 正確！這正是經典的『頻率偏誤』！民眾對每日接觸的外食與生活雜支漲價印象強烈，而耐久財 3C 產品的持續跌價大幅拉低了官方平均數。"
      },
      {
        text: "因為台灣民眾平均收入太高，導致消費欲望過剩，純屬消費者心理上的錯覺。",
        isCorrect: false,
        feedback: "❌ 錯誤。薪資成長率 (約 1.8%) 長期落後於外食與居住漲幅，這並非主觀錯覺，而是實質生活開銷真實被侵蝕。"
      },
      {
        text: "因為全台灣所有商家的進口原物料成本都是以美元計價且完全沒有關稅補貼。",
        isCorrect: false,
        feedback: "❌ 錯誤。匯率雖有影響，但這無法解釋大眾體感與官方總體平均數之間的本質落差。"
      }
    ]
  },
  {
    level: 2,
    badge: "關卡 2 / 4 ‧ 縮性通膨精算師",
    title: "超商洋芋片由 85g 縮水至 70g，售價保持 35 元，廠商暗中調漲了多少百分比？",
    titleEn: "Chips shrink from 85g to 70g at $35. What is the stealth price hike percentage?",
    scenario: "某知名零食大廠面臨棕櫚油與馬鈴薯成本上漲，決定不直接更動超商架上 35 元的紅色特價標籤，而是悄悄將每包淨重由 85 克調降為 70 克。作為一名理性的財經偵探，請運用『單位價格 (元/克)』公式，計算出廠商實際上暗中加價了多少？",
    options: [
      {
        text: "廠商售價依然是 35 元，沒有任何調漲，實質調漲率為 0.0%。",
        isCorrect: false,
        feedback: "❌ 嚴重落入廠商包裝陷阱！雖然總價沒變，但你拿到的內容物少了 15 克，單位成本已經大幅暴增！"
      },
      {
        text: "實質調漲率為 +15.0%，因為重量減少了 15 克。",
        isCorrect: false,
        feedback: "❌ 算錯分母！減少 15 克不等於漲價 15%。必須計算單位價格：(35/70 - 35/85) / (35/85)。"
      },
      {
        text: "實質調漲率為 +21.4%！舊單位價格為 0.412 元/克，新單位價格高達 0.500 元/克。",
        isCorrect: true,
        feedback: "🎯 完全正確！計算公式：舊價 = 35/85 ≈ 0.4118 元/克；新價 = 35/70 = 0.5000 元/克。漲幅 = (0.5000 - 0.4118)/0.4118 = +21.4%！相當於原包裝直接漲到 42.5 元！"
      },
      {
        text: "實質調漲率為 +35.0%，因為售價剛好是 35 元。",
        isCorrect: false,
        feedback: "❌ 數字張冠李戴，請使用每克單位價格公式計算。"
      }
    ]
  },
  {
    level: 3,
    badge: "關卡 3 / 4 ‧ 費雪方程式奪魂鋸",
    title: "銀行定存利率 1.5%，生活通膨率 3.5%，將 100 萬存滿一年後的實質購買力如何？",
    titleEn: "Deposit rate 1.5%, Inflation 3.5%. What happens to $1M real purchasing power?",
    scenario: "小明拿到大學畢業積蓄 100 萬元，他極度保守，決定將全數資金存入公股銀行一年期定期存款（名目年利率 1.5%）。同一期間，台灣外食與居住綜合通膨率為 3.5%。一年後小明去銀行刷存摺，看見利息 15,000 元入帳。請問依據費雪方程式 (Fisher Equation)，他的實質財富到底發生了什麼變化？",
    options: [
      {
        text: "小明淨賺了 15,000 元利息，實質購買力增長了 1.5%，是極為明智的理財方式。",
        isCorrect: false,
        feedback: "❌ 這是典型的『貨幣幻覺 (Money Illusion)』！只看名目金額增加，完全忽略了同期物價上漲吃掉了更多購買力。"
      },
      {
        text: "小明處於『負實質利率 (-2.0%)』陷阱，名目利息雖有 1.5 萬，但實質購買力等同淨虧損約 20,000 元！",
        isCorrect: true,
        feedback: "🎯 正解！依據費雪方程式：實質利率 r = 名目利率 (1.5%) - 通膨率 (3.5%) = -2.0%！存款人表面賺利息，實質購買力每年倒貼 2 萬元，這正是被『隱形通膨稅』洗劫的寫照！"
      },
      {
        text: "小明的購買力完全不受影響，因為中央銀行會補償所有銀行存款人的通膨差額。",
        isCorrect: false,
        feedback: "❌ 荒謬。中央銀行絕對不會補償商業銀行存款人的通膨損失，通膨稅的承受者正是現金儲蓄者。"
      },
      {
        text: "小明的實質購買力倒退了 5.0%，因為 1.5% 加上 3.5% 等於 5.0%。",
        isCorrect: false,
        feedback: "❌ 算式錯誤。費雪方程式是『名目利率 減去 通膨率』，並非相加。"
      }
    ]
  },
  {
    level: 4,
    badge: "關卡 4 / 4 ‧ 巴菲特定價權防線",
    title: "面臨全球綠色通膨與電費原物料暴漲 20%，下列哪種資產最能守護投資人財富？",
    titleEn: "Facing 20% cost spikes, which asset best protects investor wealth?",
    scenario: "由於全球推行淨零轉型徵收碳費 (CBAM) 以及國際地緣衝突，工業電價與基礎金屬成本在一年內暴漲了 20%。市場預期高通膨將持續數年。在下列四種資產中，哪一項最符合巴菲特所說的『護城河與定價權 (Pricing Power)』，能將成本 100% 轉嫁給客戶並為投資人創造超越通膨的真實回報？",
    options: [
      {
        text: "毛利率僅 3%~4% 的傳統組裝代工廠，靠著大量薄利多銷維持營運。",
        isCorrect: false,
        feedback: "❌ 代工廠毫無訂價權！客戶一威脅轉單就只能自行吸收成本，20% 的成本暴漲會讓代工廠直接由盈轉虧、面臨破產。"
      },
      {
        text: "放在保險箱內的 1,000 萬元純新台幣紙鈔現金，確保一毛錢都不會縮水。",
        isCorrect: false,
        feedback: "❌ 現金是通膨時代的最大輸家！在 72 法則與複利通膨下，現金購買力只會單向快速蒸發。"
      },
      {
        text: "具備全球先進製程技術壟斷的半導體龍頭 (如台積電) 或高轉換成本的科技生態系企業。",
        isCorrect: true,
        feedback: "🎯 滿分獲勝！巴菲特強調：具備強大護城河與定價權的企業，即使成本暴漲 20%，能無損調漲晶圓售價，全球客戶依然搶著下單！其股息與獲利能完美跑贏通膨！"
      },
      {
        text: "固定配息年利率 2.0% 且無法調降利率的 30 年期長天期公債。",
        isCorrect: false,
        feedback: "❌ 慘敗。通膨推升央行升息預期，固定配息長天期債券價格會大幅崩跌，且固定 2% 息率會被通膨嚴重侵蝕。"
      }
    ]
  }
];

// ==========================================
// 4. 第 3 小時課堂實務作業：個人 CPI 權數自訂與抗通膨報告
// ==========================================
const W2_HOMEWORK_RUBRIC = {
  title: "第二週課堂實務作業：個人 CPI 權數自訂與抗通膨資產調配報告",
  titleEn: "Week 2 Homework: Personal CPI Weights & Anti-Inflation Asset Allocation Report",
  totalWeight: 100,
  dimensions: [
    {
      id: "d1",
      name: "1. 個人 CPI 消費組合權數自訂與官方落差分析",
      nameEn: "Personal CPI Basket vs Official Weights",
      weight: 25,
      guideline: "盤點個人每月真實開銷結構（食物外食、居住租金、交通通訊、3C娛樂等），計算出個人專屬的 CPI 權數比例，並深入論述為何個人體感通膨與官方公布之 2.1% 存在顯著落差。"
    },
    {
      id: "d2",
      name: "2. 生活周遭縮性通膨 (Shrinkflation) 案例查核",
      nameEn: "Real-world Shrinkflation Audit",
      weight: 25,
      guideline: "在日常生活（超市、超商、餐飲、手搖飲）中找出一個真實縮水案例，列出其舊規格/新規格/售價，精確計算出單位價格（元/克或元/ml）與實質隱形調漲率，並剖析廠商包裝心理學手法。"
    },
    {
      id: "d3",
      name: "3. 費雪方程式個人實質報酬率演練",
      nameEn: "Fisher Equation Real Rate Exercise",
      weight: 25,
      guideline: "帶入費雪方程式 r = i - π，評估個人目前所持有的存款或投資工具（如活存 0.7%、定存 1.5%、ETF 配息等），減去個人綜合體感通膨後，算確認個人資產是處於『實質增值』還是『負實質利率侵蝕』狀態。"
    },
    {
      id: "d4",
      name: "4. 4 大抗通膨資產終身調配策略與反思",
      nameEn: "Anti-Inflation Asset Allocation Strategy",
      weight: 25,
      guideline: "評估黃金、優質房地產、TIPS 抗通膨債券、定價權股票 ETF 與個人人力資本，針對自身 1~3 年內可支配資金，提出一份具備具體配置比例與理性邏輯的抗通膨防禦計畫。"
    }
  ]
};

// 預設作業範本 (供課堂展示與一鍵帶入)
const W2_HOMEWORK_PRESETS = [
  {
    name: "大二租屋大學生 ‧ 陳同學實戰範本",
    studentName: "陳小明",
    studentId: "B11307088",
    cpiAnalysis: "【個人月支出 18,000 元結構拆解】：\n1. 外食與手搖三餐：9,000 元 (權數 50.0%)\n2. 學生套房租金水電：6,200 元 (權數 34.4%)\n3. 機車油錢與通勤：1,200 元 (權數 6.7%)\n4. 書籍文具與娛樂 3C：1,600 元 (權數 8.9%)\n\n【與官方 CPI 比較】：\n主計總處食物類僅佔 25.4%、居住僅佔 22.7%，但我的外食+租金高達 84.4%！去年便當每餐從 95 元漲到 115 元 (+21%)，房租續約從 5,800 調至 6,200 元 (+6.9%)。以我的加權算出的個人 CPI 年通膨率高達 13.1%，這完美解釋了為何官方說物價漲 2.1% 時，我卻覺得生活快要被壓垮！",
    shrinkCase: "【查核品項】：超商某品牌夾心餅乾\n- 舊規格：120 克 / 盒，售價 42 元\n- 新規格：100 克 / 盒，售價 42 元 (維持 42 元特價不變)\n- 單位價格計算：\n  * 舊單位價格 = 42 / 120 = 0.350 元/克\n  * 新單位價格 = 42 / 100 = 0.420 元/克\n  * 實質隱形調漲率 = (0.420 - 0.350) / 0.350 = +20.0%！\n- 廠商手法：外紙盒尺寸完全沒有變小，打開後發現內部塑膠托盤的深度被墊高、餅乾片數由 12 片偷偷減少為 10 片，典型運用『視覺錯覺』轉移消費者對價格的警覺心。",
    fisherExercise: "【存款與實質報酬計算】：\n目前工讀積蓄 60,000 元放在某數位銀行活存，名目年利率為 2.0% (年利息 1,200 元)。\n然而，考量我個人的生活通膨率高達 13.1%（即便按保守核心通膨 3.5% 計算）：\n- 依據費雪方程式：r = i - π\n  * r = 2.0% - 13.1% = -11.1% (若依個人體感籃子)\n  * r = 2.0% - 3.5% = -1.5% (若依官方核心通膨)\n【結論】：即便領到 1,200 元利息，我的 6 萬元積蓄實質購買力每年依然被通膨無情吃掉 900 至 6,600 元！死存現金在實質購買力維度上是不折不扣的虧損投資。",
    assetPlan: "【個人 4 大抗通膨資產調配方案 (總資金 6 萬元)】：\n1. 緊急預備金 (現金/活存)：20,000 元 (佔 33.3%)，僅維持約 1~2 個月基本生活費，不再過度死存。\n2. 定價權全球股票 ETF (如 VT 或台股 0050/台積電零股)：30,000 元 (佔 50.0%)，定期定額買入具備全球科技護城河的優質資產，年化預期報酬 7~9%，足以擊敗長期通膨。\n3. 人力資本投資：10,000 元 (佔 16.7%)，報名 AI 程式與外語檢定課程，提升畢業後起薪競爭力（名目加薪率爭取 > 8%）。\n4. 房產與黃金：學生階段資金不足，暫不配置實體房產，未來就業後將優先評估自住首購族固定低利房貸作為終身抗通膨長城。",
    conclusionGrade: "Highly Defensive",
    decisionSummary: "徹底看穿廠商縮性通膨包裝，拒絕現金死存，將資金投入具備定價權之生產性股票資產與個人人力資本。"
  }
];
