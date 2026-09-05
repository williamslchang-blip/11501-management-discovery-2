/**
 * 115學年度「管理探索二」第二週教學資料庫
 * 單元名稱：物價、通膨與實質購買力
 * 包含 30 頁純教學卡片、每頁 100+ 字講授指引、雙語對照 (中/英) 與時程規劃
 */

const W2_SCHEDULE_TABLE = [
  {
    hour: "第一小時 (00:00-00:50)",
    title: "通膨感知與 CPI 結構",
    slides: "Slide 01 - 10",
    summary: "便當外食10年漲幅、CPI拉斯皮爾斯公式、消費籃子權數揭密、總體 vs 核心通膨、72法則購買力蒸發、需求拉動 vs 成本推動、工資物價螺旋。",
    activity: "🎯 專屬活動：個人實質購買力縮水計算盤（輸入加薪幅度與外食漲幅，量化實質購買力蒸發與減半倒數）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第二小時 (00:50-01:40)",
    title: "隱形通膨與理論模型",
    slides: "Slide 11 - 20",
    summary: "縮性通膨 (Shrinkflation) 概念、零食洋芋片包裝縮水案例、享樂品質調整 (Hedonic) 爭議、費雪方程式 (r = i - π) 負實質利率、通膨稅與財富再分配、菜單成本與鞋皮成本、通膨預期自我實現、魏瑪共和國惡性通膨鏡鑑、3大實用防禦指南。",
    activity: "🎯 專屬活動：隱形縮性通膨 (Shrinkflation) 偵探考驗（計算縮水商品單位價格元/克，揭發廠商暗中調漲率）",
    timeAlloc: "講授 35 分 | 活動 15 分"
  },
  {
    hour: "第三小時 (01:40-02:30)",
    title: "實證數據與資產防禦",
    slides: "Slide 21 - 30",
    summary: "主計總處 DGBAS 原始數據庫 CSV 實查、全球央行 2% 通膨目標幕後邏輯、4大抗通膨資產對決（黃金/房產/TIPS/股票）、實質薪資成長率算式、巴菲特護城河與企業訂價權、居住類房租黏性與滯後性、綠色通膨 (Greenflation) 與碳定價、終身資產防禦4大法則、全景知識圖譜。",
    activity: "🎮 重磅小遊戲：物價與通膨真相大挑戰 (4關卡) ＋ 📝 課堂實務作業：個人 CPI 權數自訂與抗通膨報告現場提交",
    timeAlloc: "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W2_SLIDES_DATA = [
  // ==========================================
  // 第一小時：通膨感知與 CPI 結構 (Slide 01 - 10)
  // ==========================================
  {
    id: 1,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "第二週課程導論：物價、通膨與實質購買力",
    titleEn: "Introduction: Price, Inflation and Real Purchasing Power",
    subtitle: "看穿名目數字的假象，奪回個人實質生活水準的主導權",
    subtitleEn: "Seeing Beyond Nominal Illusions: Reclaiming Your Real Purchasing Power",
    quote: "「通貨膨脹是現代社會中最隱蔽的財富重分配工具，它在無聲無息中掠奪懶於思考者的積蓄。」",
    quoteEn: "Inflation is the most stealthy wealth redistribution mechanism in modern society, quietly penalizing passive savers.",
    quickTakeaways: [
      "名目薪資調升 3% 不等於生活變好，若外食與房租上漲 6%，實質購買力正在倒退。",
      "官方 CPI 通膨率是全體平均數，每個人因消費組合不同，承受著截然不同的「體感通膨」。",
      "本週課程將透過 30 頁精解、三大實作互動盤與情境遊戲，徹底破譯物價統計與抗通膨策略。"
    ],
    quickTakeawaysEn: [
      "A 3% nominal raise doesn't mean you are richer if food and rent jump by 6%—your real purchasing power shrinks.",
      "Official CPI is an aggregate macro average; individuals face drastically divergent personal inflation rates.",
      "This week unpacks official price statistics, hidden shrinkflation, and lifelong wealth defense strategies."
    ],
    teachingNotes: "本頁旨在引入第二週的主題。教師應從學生日常生活最熟悉的便當、手搖飲與外食調漲切入。向學生說明：許多人以為薪資調升 3% 就是賺到，卻忽略了同一時間外食與房租上漲了 6%，這意味著個人的實質購買力 (Real Purchasing Power) 正在默默倒退。本單元將幫助學生穿透官方數據的平均值，看清物價真實波動對個人財務健全度的重大影響，並建立一生受用的實質思維。",
    discussionQuestion: "過去一年來，你感受最深刻、調漲最誇張的日常消費是什麼？你認為你的工讀或未來預期薪資成長速度趕得上它嗎？",
    discussionQuestionEn: "Over the past year, which daily expense has experienced the most dramatic price hike in your life? Do you feel your earnings can keep pace?",
    visualType: "image",
    imageSrc: "assets/images/w2_hero_inflation.jpg",
    caption: "圖 1.1 購物籃物價飛漲與實質購買力縮水情境示意圖"
  },
  {
    id: 2,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "第二週 3 小時學習地圖與核心技能樹",
    titleEn: "Week 2 3-Hour Learning Map & Core Skill Tree",
    subtitle: "從生活體感、統計公式、隱形漲價到跨資產配置的完整脈絡",
    subtitleEn: "From Daily Perceptions and Mathematical Indexes to Cross-Asset Wealth Defense",
    quickTakeaways: [
      "第一小時：解密便當10年走勢、CPI拉斯皮爾斯公式、核心通膨與72法則購買力蒸發。",
      "第二小時：拆解隱形縮性通膨 (Shrinkflation)、享樂調整爭議、費雪方程式與魏瑪惡性通膨。",
      "第三小時：實查主計總處數據庫、央行 2% 目標幕後、巴菲特企業訂價權與 4 大抗通膨資產對決。"
    ],
    quickTakeawaysEn: [
      "Hour 1: 10-year bento price series, CPI Laspeyres index, headline vs core, and Rule of 72.",
      "Hour 2: Shrinkflation detective, hedonic quality controversy, Fisher equation, and hyperinflation history.",
      "Hour 3: DGBAS database audit, 2% target logic, Buffett's pricing power moat, and 4 anti-inflation assets."
    ],
    teachingNotes: "本頁向學生揭示第二週完整的 3 小時學習脈絡。第一小時側重於外食費時間序列、CPI 消費者物價指數公式與總體/核心通膨的區分；第二小時深入隱形縮性通膨 (Shrinkflation)、品質調整爭議、費雪效應 (r = i - π) 與通膨稅；第三小時則帶領學生實查主計總處資料庫、解析央行 2% 通膨目標，並評估黃金、房產、TIPS 與股票四大抗通膨資產。引導學生理解實質購買力是貫穿本週的唯一核心指針。",
    discussionQuestion: "本週的精髓在於學會計算『實質單位價格』與『實質報酬率』，大家準備好不再被標價牌騙掉錢包了嗎？",
    discussionQuestionEn: "The essence of this week is calculating real unit prices and real returns—are you ready to never be misled by sticker prices again?",
    visualType: "skill_tree",
    treeNodes: [
      { step: "01", title: "通膨感知與公式", desc: "便當外食走勢 / 拉斯皮爾斯 CPI / 72 法則" },
      { step: "02", title: "隱形吃錢與理論", desc: "縮性通膨 / 費雪方程式 / 通膨稅重分配" },
      { step: "03", title: "實證數據與資產", desc: "DGBAS 資料庫 / 訂價權護城河 / 4大抗通膨資產" }
    ]
  },
  {
    id: 3,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "便當與外食費漲價體驗：10年價格時間序列",
    titleEn: "Dining Out & Bento Costs: A 10-Year Price Time Series",
    subtitle: "外食漲幅高達經常性薪資成長的 3.6 倍，青年生活壓力之源",
    subtitleEn: "Dining Out Inflation Outpaces Wage Growth by 3.6x: The Origin of Modern Cost Pressures",
    quickTakeaways: [
      "2016 年排骨便當平均約 75 元，2021 年突破 90 元，2026 年已普遍突破 125 元 (+66.7%)。",
      "同期台灣工業與服務業經常性薪資僅成長約 18.5%，外食漲幅高達薪資調幅的 3.6 倍！",
      "外食價格具有極高的「向下僵固性 (Sticky Downwards)」，原物料回跌時店家也幾乎不會降價。"
    ],
    quickTakeawaysEn: [
      "Pork chop bentos rose from $75 (2016) to $90 (2021) and over $125 (2026)—a staggering +66.7% leap.",
      "Regular wages grew by only ~18.5% over the same span; dining out price inflation outpaced raises by 3.6x.",
      "Restaurant food shows severe downward stickiness: when commodity prices retreat, retail menu prices rarely fall."
    ],
    teachingNotes: "本頁透過實證時間序列數據展示台灣外食費的暴漲趨勢。從 2016 年排骨便當平均約 75 元，攀升至 2021 年的 90 元，並在 2026 年突破 125 元，累積漲幅高達 66.7%。同期台灣經常性薪資僅成長 18.5%，外食費漲幅高達薪資調幅的 3.6 倍。這項數據有力地解釋了為什麼現代青年即便名目收入增加，體感生活壓力卻指數型上升的原因。教師應點出價格的黏性與不可逆性。",
    discussionQuestion: "為什麼便當價格一旦漲上去，就算國際黃豆、小麥價格大幅回落，店家也幾乎不可能降價？這反映了什麼經濟特性？",
    discussionQuestionEn: "Why is it that once bento prices rise, even if global grain costs plunge, restaurants almost never lower prices?",
    visualType: "chart_bento_wage"
  },
  {
    id: 4,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "消費者物價指數 (CPI) 計算公式與基期概念",
    titleEn: "Consumer Price Index (CPI) Formula & Laspeyres Base Year",
    subtitle: "測量一籃子固定消費品價格變動的加權綜合指標",
    subtitleEn: "A Weighted Composite Index Measuring the Price of a Fixed Consumption Basket",
    quickTakeaways: [
      "CPI 採用拉斯皮爾斯 (Laspeyres) 指數公式：$CPI_t = \\frac{\\sum (P_{it} \\times Q_{i0})}{\\sum (P_{i0} \\times Q_{i0})} \\times 100$。",
      "以基期數量 $Q_{i0}$ 作為固定權重，通膨率即為 CPI 的年增率：$\\text{YoY} = \\frac{CPI_t - CPI_{t-1}}{CPI_{t-1}} \\times 100\\%$。",
      "CPI 是一個相對指數，基期的選定（如民國110年=100）會直接影響各年份指數的呈現數值。"
    ],
    quickTakeawaysEn: [
      "Laspeyres Formula: $CPI_t = \\frac{\\sum (P_{it} \\times Q_{i0})}{\\sum (P_{i0} \\times Q_{i0})} \\times 100$ using fixed base-period quantities.",
      "Inflation rate is the YoY growth rate of CPI: $\\text{YoY} = \\frac{CPI_t - CPI_{t-1}}{CPI_{t-1}} \\times 100\\%$.",
      "CPI is purely an index number relative to a benchmark base year (e.g., 2021 = 100), not an absolute monetary dollar amount."
    ],
    teachingNotes: "本頁介紹官方測量物價的最核心指標——CPI。學術界採用拉斯皮爾斯 (Laspeyres) 加權綜合指數公式，以基期商品數量 Qi0 為固定權數，比較當期價格 Pit 與基期價格 Pi0 的變化。通膨率即為 CPI 的年增率 (YoY)。教師應強調：CPI 是一個「相對指數」，基期的選擇與商品籃子的設定，直接決定了統計結果的呈現。要讓學生看懂分子分母的涵義。",
    discussionQuestion: "如果基期設定在 10 年前（物價低），與設定在 2 年前相比，算出來的 CPI 絕對點數會給大眾帶來什麼不同的心理印象？",
    discussionQuestionEn: "If the base year is set 10 years ago versus 2 years ago, how does the resulting CPI point index alter public perception?",
    visualType: "formula_card_cpi"
  },
  {
    id: 5,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "CPI 消費籃子權數揭密：為何大眾感受落差巨大？",
    titleEn: "CPI Basket Weightings: Why the Huge Perception Gap?",
    subtitle: "頻率偏誤 (Frequency Bias) 導致天天買的外食與久久買的 3C 產生心理矛盾",
    subtitleEn: "Frequency Bias: The Psychological Clash Between Daily Meals and Rare 3C Purchases",
    quickTakeaways: [
      "主計總處調查約 368 項商品，分為 7 大類：食物 (25.4%)、居住 (22.7%)、交通 (14.2%) 等。",
      "頻率偏誤：民眾每天買外食三餐，外食漲價記憶極為深刻；而電視、筆電價格常年下跌，拉低了總平均。",
      "年輕人與租屋族的「個人真實消費籃子」中，外食與房租可能合佔 60% 以上，體感通膨遠高於 2%。"
    ],
    quickTakeawaysEn: [
      "DGBAS surveys ~368 items across 7 categories: Food (25.4%), Housing (22.7%), Transport (14.2%), etc.",
      "Frequency Bias: Consumers buy meals 3 times a day, noticing every price surge, while declining TV/PC prices drag the macro index down.",
      "For students and young renters, food and rent often comprise >60% of expenditures, making personal inflation feel like 8-10%."
    ],
    teachingNotes: "本頁解答新聞常出現的「為何官方 CPI 只有 2.1%，但民眾感覺漲了 10%」的矛盾。主計總處調查約 368 項商品，分為食物類 (25.4%)、居住類 (22.7%)、交通 (14.2%) 等 7 大類。由於一般民眾天天購買外食（購買頻率極高），對食物漲價印象極為強烈；但 CPI 籃子中同時包含了數年才買一次且價格持續下滑的 3C 電子產品，其降價拉低了總體平均數，形成「頻率偏誤 (Frequency Bias)」與統計落差。",
    discussionQuestion: "試著估算你每個月的總支出中，食物與房租佔了多少百分比？是否遠遠高於官方設定的 25.4% 與 22.7%？",
    discussionQuestionEn: "Estimate what percentage of your monthly budget goes into food and rent. Is it substantially higher than the official 25.4% and 22.7% weights?",
    visualType: "basket_weights_matrix"
  },
  {
    id: 6,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "總體通膨 vs. 核心通膨 (Core CPI) 解密",
    titleEn: "Headline CPI vs. Core CPI: What Central Banks Actually Watch",
    subtitle: "排除蔬果與能源波動，精準鎖定經濟體深層的黏性物價",
    subtitleEn: "Excluding Volatile Food & Energy to Measure Deep, Sticky Inflationary Pressures",
    quickTakeaways: [
      "總體通膨 (Headline CPI)：涵蓋所有 368 項商品，極易受到颱風菜價暴漲或中東地緣原油飆漲的短期干擾。",
      "核心通膨 (Core CPI)：扣除蔬果及能源等短期劇烈波動項目，反映經濟體內部真正的長期供需與工資壓力。",
      "全球央行制定貨幣政策（升息或降息）時，皆以 Core CPI 作為主要錨定依據，避免被暫時性供給衝擊誤導。"
    ],
    quickTakeawaysEn: [
      "Headline CPI covers all consumer goods but is heavily skewed by typhoon-hit produce or geopolitical oil shocks.",
      "Core CPI strips out volatile fresh food and energy, revealing underlying structural sticky inflation and wage trends.",
      "Global central banks anchor monetary policy decisions (hiking or cutting rates) exclusively on Core CPI trends."
    ],
    teachingNotes: "本頁剖析央行制定貨幣政策的核心指標差異。總體通膨 (Headline CPI) 涵蓋所有消費品，但極易受到颱風過後蔬菜暴漲、或國際地緣政治引發原油暴跌的短線衝擊；核心通膨 (Core CPI) 則扣除了波動劇烈的蔬果與能源，能夠精準反映經濟體內部的長期供需壓力與黏性物價 (Sticky Prices)，因此全球央行升降息皆以 Core CPI 為唯一指南針。讓學生懂得區別雜訊與實質信號。",
    discussionQuestion: "如果因為強烈颱風導致全台高麗菜價格一週暴漲 100%，央行應該立刻升息嗎？為什麼不能用總體通膨當決策標準？",
    discussionQuestionEn: "If a severe typhoon causes cabbage prices to spike by 100% in a week, should the central bank hike interest rates immediately?",
    visualType: "headline_vs_core"
  },
  {
    id: 7,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "實質購買力蒸發體驗：72 法則與複利效果",
    titleEn: "Purchasing Power Evaporation: The Rule of 72 & Compounding",
    subtitle: "在 3.6% 通膨下，完全不投資的現金 20 年後實質購買力直接腰斬",
    subtitleEn: "At 3.6% Inflation, Pure Cash Loses Exactly 50% of Its Real Purchasing Power in 20 Years",
    quickTakeaways: [
      "72 法則公式：資產購買力減半所需年數 $\\approx \\frac{72}{\\text{年通膨率 (\\%)}}$。",
      "年通膨 3% 時，24 年購買力減半；若年通膨升至 4%，只需 18 年現金價值就只剩下一半！",
      "若預計 30 年後退休，按 3% 通膨複利折現，未來的 1,000 萬實質購買力僅相當於今天的 412 萬元。"
    ],
    quickTakeawaysEn: [
      "Rule of 72 Formula: Years for purchasing power to halve $\\approx \\frac{72}{\\text{Inflation Rate (\\%)}}$.",
      "At 3% annual inflation, money loses half its value in 24 years; at 4%, it takes only 18 years to be cut in half.",
      "A retirement egg-nest of $10M in 30 years at 3% inflation will have the real purchasing power of only $4.12M today."
    ],
    teachingNotes: "本頁介紹評估購買力減半的便捷數學工具——72 法則。將 72 除以年通膨率，即可算出資產實質購買力縮水 50% 所需的年數。在 3.6% 的年通膨率下，無收益的現金購買力在 20 年內就會腰斬一半！若規劃 30 年後退休，按 3% 通膨計算，未來的 1,000 萬退休金實質購買力僅相當於今天的 412 萬元。這展示了將過度資金死存在銀行活期賬戶的巨大風險。",
    discussionQuestion: "如果你手中有 50 萬元工讀積蓄死存在銀行活存（年息 0.7%），在 3.5% 通膨環境下，多少年後它的實質價值只剩 25 萬？",
    discussionQuestionEn: "If you keep $500,000 in a checking account earning 0.7% interest, in a 3.5% inflation environment, how many years until it halving in real value?",
    visualType: "rule_72_chart"
  },
  {
    id: 8,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "需求拉動通膨 vs. 成本推動通膨",
    titleEn: "Demand-Pull vs. Cost-Push Inflation & Stagflation",
    subtitle: "「太多錢追逐太少商品」vs「原物料與碳關稅供給斷鏈」",
    subtitleEn: "'Too Much Money Chasing Too Few Goods' vs 'Supply Chain & Carbon Tariff Cost Shocks'",
    quickTakeaways: [
      "需求拉動通膨 (Demand-Pull)：景氣過熱、政府過度發放補貼或央行印鈔，總需求曲線 (AD) 向右推升。",
      "成本推動通膨 (Cost-Push)：石油禁運危機、極端氣候減產、碳關稅 CBAM 等推高企業邊際成本，總供給 (AS) 左移。",
      "最棘手的總體經濟夢魘是「滯脹 (Stagflation)」：成本推動導致高通膨、經濟停滯與失業率上升並存。"
    ],
    quickTakeawaysEn: [
      "Demand-Pull Inflation: Economic overheating or excessive fiscal stimulus shifts Aggregate Demand (AD) to the right.",
      "Cost-Push Inflation: Supply chain disruptions, oil embargoes, or carbon tariffs shift Aggregate Supply (AS) to the left.",
      "The ultimate economic nightmare is Stagflation: high inflation coexisting with economic contraction and unemployment."
    ],
    teachingNotes: "本頁區分總體經濟學中通膨的兩大成因。需求拉動通膨 (Demand-Pull) 發生在景氣過熱或政府過度印鈔時，「過多的錢追逐過少的商品」，驅使總需求曲線 (AD) 右移；成本推動通膨 (Cost-Push) 則由原物料暴漲（如石油危機）、碳關稅 CBAM 或工資大幅調升驅動，使總供給曲線 (AS) 左移，可能引發最棘手的「滯脹 (Stagflation)」（高通膨與高失業率並存）。教師需引導學生分析供給面衝擊的複雜性。",
    discussionQuestion: "2026 年歐盟與全球全面推行碳邊境稅 (CBAM) 與碳定價，這屬於需求拉動還是成本推動通膨？對製造業有何衝擊？",
    discussionQuestionEn: "The full enforcement of carbon border adjustments (CBAM) and carbon pricing in 2026—does this represent demand-pull or cost-push inflation?",
    visualType: "ad_as_curves"
  },
  {
    id: 9,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "惡性循環：工資—物價螺旋 (Wage-Price Spiral)",
    titleEn: "The Vicious Cycle: Wage-Price Spiral",
    subtitle: "通膨預期形成時，工資上漲與售價調升的自我強化陷阱",
    subtitleEn: "The Self-Reinforcing Feedback Loop Between Wage Demands and Escalating Retail Prices",
    quickTakeaways: [
      "生活開銷上升 $\\rightarrow$ 勞工要求調高名目工資 $\\rightarrow$ 企業人事成本增加 $\\rightarrow$ 企業調漲售價轉嫁 $\\rightarrow$ 啟動新一輪加薪要求。",
      "一旦工資—物價螺旋形成，通膨將具備自我維持性，不再依賴最初的原物料衝擊。",
      "央行為了斬斷惡性螺旋，往往不得不被迫激進升息，甚至不惜以人為冷卻勞動市場與提高失業率為代價。"
    ],
    quickTakeawaysEn: [
      "Higher living costs $\\rightarrow$ workers demand higher nominal pay $\\rightarrow$ corporate payroll costs rise $\\rightarrow$ retail prices hike $\\rightarrow$ renewed wage demands.",
      "Once rooted, the wage-price spiral becomes self-sustaining and stubbornly immune to commodity retreats.",
      "To break this spiral, central banks are often forced into aggressive monetary tightening, deliberately cooling the labor market."
    ],
    teachingNotes: "本頁說明通膨若失去控制時的惡性螺旋機制。當生活物價上漲，工人要求提高薪資以維持生活；企業在支付更高的工資成本後，為了維持毛利率不得不再次調漲產品售價，進而引發新一輪要求加薪的浪潮。這種自我強化循環一旦形成，央行往往必須採取極度劇烈的升息手段，甚至以人為引發經濟衰退與高失業率為代價才能斬斷螺旋。引導學生理解央行官員對工資數據的高度戒備心理。",
    discussionQuestion: "為什麼央行官員看到勞動市場工資大幅成長時，反而會感到緊張並考慮升息？這背後的邏輯是什麼？",
    discussionQuestionEn: "Why do central bankers often react with anxiety and consider rate hikes when labor wage growth accelerates rapidly?",
    visualType: "spiral_diagram"
  },
  {
    id: 10,
    hour: 1,
    category: "第一小時 ‧ 理論與背景",
    categoryEn: "Hour 1: Theory & Background",
    title: "第一小時小結與專屬活動預告",
    titleEn: "Hour 1 Summary & Lab 1 Interactive Preview",
    subtitle: "量化個人實質購買力：你的加薪真的追得上通膨嗎？",
    subtitleEn: "Quantifying Personal Real Purchasing Power: Is Your Wage Growth Real or Illusory?",
    quickTakeaways: [
      "複習：CPI 拉斯皮爾斯公式的權數結構、外食與房租高頻偏誤、72法則購買力腰斬、工資物價螺旋。",
      "開啟專屬活動：「🎯 1小時活動: 購買力計算」，輸入個人月收入、預期調幅與外食漲幅，立即診斷實質購買力。",
      "下一小時預告：深入消費品大廠「縮性通膨 (Shrinkflation)」隱形吃錢技巧與費雪實質利率算式。"
    ],
    quickTakeawaysEn: [
      "Recap: Laspeyres basket weights, frequency bias in dining out/rent, Rule of 72 halving, and wage-price spirals.",
      "Lab 1 Action: Open '🎯 Hr 1: Purchasing Power' to calculate your real net wage change and monthly deficit.",
      "Hour 2 Preview: Unmasking corporate shrinkflation tactics, hedonic index controversies, and Fisher's real interest rate."
    ],
    teachingNotes: "本頁為第一小時進行統整，複習了 CPI 籃子結構、體感落差、72 法則與通膨成因。接著指引學生開啟雙語網頁中的第一小時專屬活動「🎯 1小時活動: 購買力計算」，讓學生輸入自己的薪資調幅與體感外食/房租漲幅，進行個人實質購買力健檢。最後預告第二小時將深入隱形縮性通膨與費雪方程式。教師可挑選計算出實質購買力大幅倒退的學生分享心得。",
    discussionQuestion: "現在請大家點擊網頁頂部按鈕，算算看今年你的加薪幅度到底是有賺到，還是被通膨倒扣了？",
    discussionQuestionEn: "Click the top button to run the calculator: did your recent wage adjustment result in a real gain, or was it wiped out by inflation?",
    visualType: "milestone_hour1"
  },

  // ==========================================
  // 第二小時：隱形通膨與理論模型 (Slide 11 - 20)
  // ==========================================
  {
    id: 11,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "隱形吃錢術：縮性通膨 (Shrinkflation) 概念",
    titleEn: "The Stealth Wealth Drain: Shrinkflation Unmasked",
    subtitle: "價格標籤不變，包裝重量悄悄縮水——消費品廠商的心理戰術",
    subtitleEn: "Unchanged Sticker Prices, Quietly Reduced Net Weights: The Psychology of Modern Retail",
    quickTakeaways: [
      "縮性通膨定義：廠商為了避免直接調漲售價引發抗拒，維持售價不變但暗中減縮內容量或重量。",
      "實質漲幅算式：$\\text{實質調漲率} = \\frac{\\text{新單位價格} - \\text{舊單位價格}}{\\text{舊單位價格}} \\times 100\\%$。",
      "例如：售價維持 50 元，重量由 100g 縮減為 80g，單位價格由 0.50 元/克 暴漲至 0.625 元/克，實質暗中加價 25%！"
    ],
    quickTakeawaysEn: [
      "Shrinkflation is the stealth practice of reducing product size or quantity while maintaining the retail sticker price.",
      "Real Price Hike Formula: $\\text{Real Hike (\\%)} = \\frac{\\text{New Unit Price} - \\text{Old Unit Price}}{\\text{Old Unit Price}} \\times 100\\%$.",
      "Example: A $50 snack reduced from 100g to 80g increases unit cost from $0.50/g to $0.625/g—a hidden +25% inflation!"
    ],
    teachingNotes: "第二小時開始，本頁介紹消費品廠商最常見的隱形漲價策略——縮性通膨 (Shrinkflation)。廠商為了避免引發消費者對標籤價格上漲的反感與抗拒，選擇保持售價不變（如 50 元），但暗中將產品內含的容量或重量縮減（如從 100g 減至 80g）。透過單位價格公式計算：Unit Price Increase = (50/80 - 50/100) / (50/100) = +25%，實質上消費者已被暗中加價了 25%。引導學生掌握單位價格的計算技巧。",
    discussionQuestion: "為什麼廠商寧願偷偷減少 20 克的重量，也不願意直接在包裝上印上漲價 10 元？這反映了消費者什麼心理偏誤？",
    discussionQuestionEn: "Why do corporations prefer secretly cutting 20 grams rather than adding $10 to the sticker price? What behavioral bias does this exploit?",
    visualType: "image",
    imageSrc: "assets/images/w2_shrinkflation.jpg",
    caption: "圖 2.1 縮性通膨前後對比：相同外包裝下的內容物縮水與單位價格飆漲"
  },
  {
    id: 12,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "經典案例：零食、洋芋片與餐飲份量縮水對照",
    titleEn: "Classic Cases: Snacks, Chips, and Restaurant Portions",
    subtitle: "外包裝充氣增加、三角巧克力縫隙變寬、拉麵碗底墊高",
    subtitleEn: "Inflatable Nitrogen Packaging, Widened Chocolate Gaps, and Raised Bowl Bottoms",
    quickTakeaways: [
      "洋芋片充氣戲法：外包裝尺寸與氮氣填充量完全相同，但淨重從 85g 降至 70g，空氣比率大幅提高。",
      "三角巧克力巧思：拉寬巧克力齒輪間隔，外觀長度維持原樣，但實質可可固體減少 15%。",
      "餐飲內用幻象：火鍋肉片薄切透光、外帶飲料杯底加厚加凹、便當白飯厚度減少 20%，全是縮性通膨實踐。"
    ],
    quickTakeawaysEn: [
      "Potato chip packaging retains the exact visual height using nitrogen gas, but net weight is secretly trimmed from 85g to 70g.",
      "Toblerone famously widened the gaps between chocolate peaks, keeping the bar length while shaving off 15% of cocoa content.",
      "Dining tricks: ultra-thin hotpot meat, elevated cup bottoms, and shallower bento boxes are universal shrinkflation tactics."
    ],
    teachingNotes: "本頁透過實體商品案例展示縮性通膨的無所不在。案例一：知名洋芋片品牌保持外包裝尺寸與充氣量不變，但將淨重由 85 克悄悄調降至 70 克；案例二：知名巧克力製造商增加三角形間隙以減少可可重量；案例三：連鎖餐飲業透過增加飯碗底部厚度、減少配菜份量。這些視覺幻象手法成功轉移了消費者對價格的敏感度。請學生分享自己最近在超商遇到的案例。",
    discussionQuestion: "你在超市或超商買零食或手搖飲時，是否曾買到過看似超大包、拆開後卻大半都是空氣或冰塊的商品？",
    discussionQuestionEn: "Have you recently bought snacks or beverages that looked deceptively large on the outside, only to find mostly nitrogen air or ice inside?",
    visualType: "shrinkflation_cases"
  },
  {
    id: 13,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "享樂品質調整 (Hedonic Quality Adjustment) 爭議",
    titleEn: "Hedonic Quality Adjustment: Statistical Magic or Reality?",
    subtitle: "官方統計局如何透過「效能升級」在統計報表上抹去實質價格上漲",
    subtitleEn: "How Statistical Agencies Erase Nominal Price Rises Through Theoretical Quality Upgrades",
    quickTakeaways: [
      "享樂調整邏輯：若新款旗艦手機價格由 30,000 元漲至 35,000 元 (+16.7%)，但處理器與鏡頭效能提升了 30%。",
      "統計局結論：因為「消費者獲得的運算與拍照效能增加幅度超過價格漲幅」，在 CPI 計算中竟被記錄為「價格實質下跌」！",
      "爭議批評：大眾買手機依然必須多掏出 5,000 元現鈔，這種調整被批評為官方人為壓低公布通膨率的統計魔法。"
    ],
    quickTakeawaysEn: [
      "Hedonic Logic: If a flagship smartphone price rises from $30,000 to $35,000 (+16.7%), but computing power improves by 30%...",
      "The Statistical Magic: The agency calculates that performance gains outpaced the price rise, recording it as an effective price drop in CPI!",
      "The Controversy: Consumers still must pay $5,000 more cash out of pocket; critics argue this artificially deflates official inflation."
    ],
    teachingNotes: "本頁探討官方統計機構在計算 CPI 時採用的「享樂品質調整 (Hedonic Adjustment)」。當新款智慧型手機售價從 3 萬元漲至 3.5 萬元 (+16.7%)，若相機畫素與晶片效能提升 30%，統計局會認定「品質提升覆蓋了價格漲幅」，甚至在 CPI 中記為價格下滑！學術界批評這種做法忽略了消費者依然必須從口袋多拿出 5,000 元現金的事實，質疑其為官方拉低 CPI 的統計魔法。讓學生思考生活開銷的實質負擔。",
    discussionQuestion: "如果你不需要最新旗艦機的強大效能，卻必須多付 5,000 元買基礎款，你認為品質調整反映了你的真實生活負擔嗎？",
    discussionQuestionEn: "If you just want basic functions but must pay $5,000 more because base models were upgraded, does hedonic adjustment reflect your reality?",
    visualType: "hedonic_chart"
  },
  {
    id: 14,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "經典學術理論：費雪方程式 (Fisher Equation)",
    titleEn: "Classic Theory: The Fisher Equation & Real Interest Rates",
    subtitle: "破解名目利率假象：負實質利率正在蠶食存款人的終身積蓄",
    subtitleEn: "Piercing the Nominal Rate Illusion: How Negative Real Rates Cannibalize Savers' Wealth",
    quickTakeaways: [
      "費雪方程式：$r = i - \\pi^e$（實質利率 $r$ = 名目利率 $i$ - 預期通膨率 $\\pi^e$）。",
      "負實質利率陷阱：當銀行定存利率為 1.5%，而實際生活通膨為 3.0% 時，實質利率為 $-1.5\\%$！",
      "存入 100 萬元定存一年，表面上獲得 15,000 元利息，實質購買力卻蒸發了 15,000 元以上。"
    ],
    quickTakeawaysEn: [
      "The Fisher Equation: $r = i - \\pi^e$ (Real Interest Rate = Nominal Interest Rate - Expected Inflation).",
      "Negative Real Rate Trap: When bank deposits pay 1.5% but consumer inflation runs at 3.0%, the real rate is $-1.5\\%$.",
      "Depositing $1,000,000 for a year yields $15,000 in nominal interest, but loses over $15,000 in real purchasing power."
    ],
    teachingNotes: "本頁引入歐文·費雪 (Irving Fisher) 的經典理論：r = i - π^e。實質利率 r 等於名目利率 i 減去預期通膨率 π^e。本頁重點在於揭示「負實質利率 (Negative Real Rate)」的危害：當銀行定存名目利率僅為 1.5%，而實際通膨率達 3.0% 時，實質利率為 -1.5%。這意味著死存現金的存款人，財富購買力每年被無形侵蝕 1.5%。引導學生算出自己的實質報酬率。",
    discussionQuestion: "如果把錢存定存利率 1.5%，但外食與生活通膨率高達 4.0%，存了 100 萬一年後，你的實質生活水平到底增加了還是減少了？",
    discussionQuestionEn: "If bank deposits yield 1.5% while daily expenses inflate at 4.0%, did your real wealth grow or contract after one year?",
    visualType: "fisher_equation_card"
  },
  {
    id: 15,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "通膨稅 (Inflation Tax) 與財富再分配效應",
    titleEn: "The Inflation Tax & Massive Wealth Redistribution",
    subtitle: "無須立法表決的隱形課稅：誰在通膨中大賺？誰在通膨中被洗劫？",
    subtitleEn: "The Unlegislated Tax: Who Gains Windfalls and Who Gets Plundered in Inflationary Times?",
    quickTakeaways: [
      "通膨的實質是一種「鑄幣稅與隱形通膨稅 (Inflation Tax)」，由政府與貨幣發行機構獲益。",
      "巨大財富重分配：負債者（政府公債發行方、低利長期房貸借款人）大獲其利，未來還款價值大幅縮水。",
      "受害者群體：固定薪資受薪階級、無資產無房族、持有大量活存與固定配息公債的保守存款人。"
    ],
    quickTakeawaysEn: [
      "Inflation acts as an unlegislated 'Inflation Tax' and seigniorage, quietly transferring purchasing power to the sovereign issuer.",
      "Wealth Transfer Winners: Borrowers and mortgage debtors, whose real debt obligations are continuously devalued by inflation.",
      "Wealth Transfer Losers: Salaried wage-earners, non-asset owners, cash savers, and fixed-coupon bondholders."
    ],
    teachingNotes: "本頁剖析通膨作為一種「無須通過國會立法審議的隱形稅收 (Inflation Tax)」。通膨產生了顯著的財富再分配效應：負債者（債務人，如發行公債的政府或房貸戶）大為受益，因為未來還款的貨幣實質價值大幅縮水，等同獲取了實質補貼；相反地，持有純現金、固定收益債券與無法隨通膨調薪的受薪階級（債權人），財富被無形轉移給實體資產持有者與債務人。帶領學生深入思考階級資產差距的成因。",
    discussionQuestion: "為什麼在通膨時代，適度借入固定低利率房貸買入優質資產的人，反而成了通膨的大贏家？這背後的機制是什麼？",
    discussionQuestionEn: "Why do individuals with fixed-rate mortgage debt often become the biggest financial winners during high-inflation eras?",
    visualType: "wealth_redistribution"
  },
  {
    id: 16,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "菜單成本 (Menu Costs) 與鞋皮成本 (Shoe-leather Costs)",
    titleEn: "Microeconomic Frictions: Menu Costs & Shoe-Leather Costs",
    subtitle: "頻繁變更標價的實體浪費 vs 為了對衝貶值奔波銀行的交易耗損",
    subtitleEn: "Physical Wastes of Repricing vs Time and Transaction Frictions Spent Moving Cash",
    quickTakeaways: [
      "菜單成本 (Menu Costs)：商家因物價頻繁變動，必須不斷重印菜單、修改 POS 系統與電商標價所耗費的成本。",
      "鞋皮成本 (Shoe-leather Costs)：大眾為了避免現金快速貶值，頻繁往返銀行或投資帳戶進行換匯轉帳所磨損的鞋皮與精力。",
      "當通膨高達 10% 以上時，市場價格機制失靈，社會必須消耗巨額人力與資源應付日常標價微調。"
    ],
    quickTakeawaysEn: [
      "Menu Costs: The direct expenses incurred by businesses constantly reprinting catalogs, updating POS systems, and reprogramming digital prices.",
      "Shoe-leather Costs: The time, effort, and transaction fees wasted by individuals making frequent trips to banks to minimize cash holdings.",
      "When inflation runs wild, the price mechanism stumbles, wasting valuable economic resources on mere price synchronization."
    ],
    teachingNotes: "本頁介紹高通膨帶來的兩類微觀社會成本。菜單成本 (Menu Costs) 指商家因物價頻繁變動，必須不斷重新印製實體菜單、更新 POS 系統與官網標價所產生的行政與實體資源浪費；鞋皮成本 (Shoe-leather Costs) 指民眾為了避免手中的現金快速貶值，頻繁往返銀行或投資平台進行資金提領、轉帳與資產轉換所耗費的時間、精力與手續費（意指磨損鞋皮）。引導學生舉出生活中的微觀摩擦力。",
    discussionQuestion: "在極端通膨的國家，為什麼店家甚至乾脆不用標籤紙標價，而是改用粉筆黑板或每日動態匯率標價？",
    discussionQuestionEn: "In hyperinflationary countries, why do shops abandon printed stickers and rely on chalkboards or real-time dollar rates?",
    visualType: "costs_friction_card"
  },
  {
    id: 17,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "認知心理：通膨預期心理 (Inflation Expectations)",
    titleEn: "Behavioral Psychology: Inflation Expectations & Self-Fulfilling Prophecy",
    subtitle: "當所有人都認為明天物價會更貴時，今天就真的會暴漲",
    subtitleEn: "When the Public Expects Prices to Explode Tomorrow, Today's Panic Buying Causes It to Happen",
    quickTakeaways: [
      "自我實現預言 (Self-Fulfilling Prophecy)：大眾預期漲價 $\\rightarrow$ 提前恐慌搶購屯貨 $\\rightarrow$ 總需求暴增 $\\rightarrow$ 促成物價真的暴漲。",
      "廠商預期成本上升 $\\rightarrow$ 提前調高商品標價以自保 $\\rightarrow$ 加速整體通膨惡化。",
      "全球央行最恐懼的並非物價短期波動，而是市場「通膨預期脫錨 (Unanchored Expectations)」。"
    ],
    quickTakeawaysEn: [
      "Self-Fulfilling Prophecy: Consumers expect price hikes $\\rightarrow$ panic buying and hoarding $\\rightarrow$ sudden demand surge $\\rightarrow$ prices explode.",
      "Corporations anticipating cost spikes will preemptively hike prices to protect margins, turning expectations into real inflation.",
      "What central bankers fear most is not a temporary commodity spike, but 'unanchored inflation expectations'."
    ],
    teachingNotes: "本頁探討行為心理學中的「通膨預期與自我實現預言 (Self-Fulfilling Prophecy)」。當社會大眾普遍預期未來的物價會持續暴漲，消費者會選擇「提前搶購」各項商品，企業也會「提前調漲」售價，這種心理預期會直接推升當前的總需求與成本，讓預期的通膨真正成為現實。因此，央行最重要的任務之一就是鎖定與安撫市場的通膨預期 (Anchored Expectations)。引導學生回憶疫情時的衛生紙之亂。",
    discussionQuestion: "如果新聞報導下週衛生紙將因國際紙漿暴漲 30%，今天超市賣場會發生什麼事？這如何體現預期心理的作用？",
    discussionQuestionEn: "If news warns that toilet paper will spike 30% next week due to pulp shortages, what happens today? How does this illustrate expectations?",
    visualType: "expectation_loop"
  },
  {
    id: 18,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "歷史鏡鑑：惡性通膨 (Hyperinflation) 災難",
    titleEn: "Historical Lessons: Hyperinflation Disasters",
    subtitle: "紙鈔用手推車載、面額一百兆：法幣信用崩解的極端終局",
    subtitleEn: "Wheelbarrows of Cash, 100-Trillion Banknotes: The Catastrophic Collapse of Fiat Currency",
    quickTakeaways: [
      "1923 年德國魏瑪共和國：為支付一次大戰賠款日夜印鈔，物價每 49 小時翻倍，一條麵包高達 2,000 億馬克！",
      "2008 年辛巴威：發行面額高達 100 兆 (100 Trillion) 的紙鈔，最終連印製紙鈔的成本都高於紙鈔本身的面值。",
      "歷史啟示：當政府財政赤字毫無節制、以央行印鈔償債時，法定貨幣 (Fiat Currency) 的信用隨時可能瞬間歸零。"
    ],
    quickTakeawaysEn: [
      "Weimar Germany (1923): Printing money to finance war reparations caused prices to double every 49 hours; bread cost 200 billion marks!",
      "Zimbabwe (2008): Printed 100-Trillion-dollar notes until the paper cost exceeded the currency's purchasing power.",
      "The Lesson: When fiscal discipline completely collapses and debt is monetized, fiat currency trust can evaporate into thin air."
    ],
    teachingNotes: "本頁展示通膨失控的極端歷史案例。1923 年德國魏瑪共和國為支付戰爭賠款大印馬克，物價每 49 小時翻倍，民眾需要用手推車載滿紙鈔才能買一條麵包；近代的辛巴威發行了 100 兆面額的紙鈔，委內瑞拉物價上漲數百萬倍。這些案例證明：當國家法幣信用徹底崩解時，市場會退化至以物易物，法定貨幣的功能歸零。教師應啟發學生思考貨幣背後的信用實質。",
    discussionQuestion: "當一個國家的法定貨幣徹底變成廢紙時，什麼樣的物品會成為民間暫時的硬通貨？黃金、美金還是罐頭糧食？",
    discussionQuestionEn: "When a nation's fiat currency turns into worthless scrap paper, what items instantly replace it as reliable hard currency?",
    visualType: "image",
    imageSrc: "assets/images/w2_hyperinflation.jpg",
    caption: "圖 2.2 1923 年魏瑪共和國惡性通膨歷史手推車紙鈔與當代辛巴威對比展覽"
  },
  {
    id: 19,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "識別隱形通膨的 3 大實用防禦指南",
    titleEn: "3 Practical Shields: Identifying & Beating Stealth Inflation",
    subtitle: "看穿包裝陷阱、自訂個人指標、隨時追蹤實質利率",
    subtitleEn: "Piercing Packaging Illusions, Customizing Personal CPI, and Monitoring Real Rates",
    quickTakeaways: [
      "防禦法則一【查驗單位價格 (Unit Price)】：購物不看外包裝總價，直接除算「元/克」或「元/毫升」，秒破縮水詭計。",
      "防禦法則二【自訂個人 CPI 籃子】：依據個人高頻支出（外食 40% + 房租 30%）自訂預算，不被官方 2% 誤導。",
      "防禦法則三【追蹤實質利率 $r$】：確保個人投資組合的年化淨報酬率高於體感通膨，堅拒長期負實質利率資產。"
    ],
    quickTakeawaysEn: [
      "Shield 1 [Inspect Unit Price]: Look past outer box volume—calculate $/gram or $/ml to instantly expose shrinkflation.",
      "Shield 2 [Customize Personal CPI]: Weight your high-frequency staples (e.g., Dining 40% + Rent 30%) instead of official averages.",
      "Shield 3 [Track Real Rate r]: Ensure your net investment return comfortably outpaces local inflation, avoiding the negative real rate trap."
    ],
    teachingNotes: "本頁為第二小時進行實用總結，提供個人防禦 3 大法則：1. 查驗「單位價格 (Unit Price)」：買東西不看外包裝總價，直接計算「元/克」或「元/毫升」，秒破縮性通膨迷思；2. 算個人的「CPI 權數」：依據個人高頻消費（如外食佔 40%）自訂預算指標；3. 追蹤「實質利率 r」：確保投資年化報酬率超越實際通膨率，不讓負實質利率啃蝕財富。帶領學生大聲朗讀三大法則並記憶在心。",
    discussionQuestion: "在超市購物或未來進行資產配置時，哪一個防禦法則最能立刻為你省下冤枉錢？",
    discussionQuestionEn: "When shopping at groceries or allocating personal savings, which of the 3 defense shields can immediately protect your pocketbook?",
    visualType: "three_shields"
  },
  {
    id: 20,
    hour: 2,
    category: "第二小時 ‧ 隱形通膨與理論",
    categoryEn: "Hour 2: Hidden Inflation & Theory",
    title: "第二小時小結與專屬活動預告",
    titleEn: "Hour 2 Summary & Lab 2 Shrinkflation Detective Preview",
    subtitle: "拿起放大鏡：動手拆穿包裝背後的隱性漲價率！",
    subtitleEn: "Grab Your Magnifier: Unmasking Hidden Shrinkflation Rates Behind Clever Packaging!",
    quickTakeaways: [
      "複習：縮性通膨單位價格計算、享樂品質調整爭議、費雪方程式負利率侵蝕、魏瑪歷史教訓與防禦三大法則。",
      "開啟專屬活動：「🎯 2小時活動: 縮性通膨」，輸入零食/手搖飲縮水前後容量與價格，揭露實質調漲率！",
      "下一小時預告：主計總處數據庫實查、央行 2% 通膨目標、巴菲特企業護城河與 4 大抗通膨資產對決。"
    ],
    quickTakeawaysEn: [
      "Recap: Unit price math, hedonic adjustments, Fisher equation real rates, hyperinflation history, and 3 defense shields.",
      "Lab 2 Action: Launch '🎯 Hr 2: Shrinkflation' to input snack weights before and after, revealing true hidden price hikes.",
      "Hour 3 Preview: DGBAS database auditing, the 2% central bank holy grail, Buffett's pricing moat, and 4 asset classes."
    ],
    teachingNotes: "本頁為第二小時劃下句點，指引學生開啟網頁中的第二小時專屬活動「🎯 2小時活動: 縮性通膨」。學生將輸入零食縮水前後的重量與售價，親自計算出廠商暗中隱藏的單位漲價百分比。最後預告第三小時將進入主計總處資料庫實查與 4 大抗通膨資產對決。鼓勵學生善用活動面板比對三組真實預設案例。",
    discussionQuestion: "請大家打開第二小時活動 Modal，幫我們算算看市面上這包零食到底被暗中加價了多少百分比！",
    discussionQuestionEn: "Open the Hour 2 Lab Modal and let's calculate exactly how much hidden price increase was baked into these market snacks!",
    visualType: "milestone_hour2"
  },

  // ==========================================
  // 第三小時：實證數據與資產防禦 (Slide 21 - 30)
  // ==========================================
  {
    id: 21,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "主計總處 CPI 原始數據庫實查 (DGBAS Data Audit)",
    titleEn: "DGBAS Raw CPI Database Audit: Verifying Official Numbers",
    subtitle: "親自下載 368 項商品細項歷史 CSV，看清官方外食與房租統計軌跡",
    subtitleEn: "Auditing 368 Sub-items via Official CSVs to Trace Sticky Dining and Rent Indexes",
    quickTakeaways: [
      "行政院主計總處 (DGBAS) 每月 5~8 號公布物價統計月報，提供完整 CSV/Excel 原始數列下載。",
      "查核外食費子指數 (Food Away from Home Index)：過去 10 年呈現幾乎無回調的「階梯式單向攀升」。",
      "掌握第一手審計技巧：學會不依賴新聞聳動標題，直接以官方各子項權數與年增率交叉印證。"
    ],
    quickTakeawaysEn: [
      "Taiwan's DGBAS releases monthly price bulletins with complete downloadable historical CSV datasets.",
      "Auditing the 'Food Away from Home' sub-index reveals an irreversible staircase ascent over the past decade.",
      "Primary audit skill: bypassing journalistic hype by directly cross-verifying sub-category weights and YoY trends."
    ],
    teachingNotes: "進入第三小時，本頁帶領學生進行官方第一手數據的查驗實務。介紹行政院主計總處 (DGBAS) 的「物價統計月報」資料庫。學生可以親自下載 368 項商品細項的歷史 CSV 數據，學習如何使用 Excel 將「外食費子指數」與「總體 CPI 指數」拉出對比折線圖，實證外食費高度的黏性與漲幅真相。引導學生建立以數據為依託的嚴謹學術態度。",
    discussionQuestion: "學會下載官方 CSV 原始檔後，你以後還會輕易相信網路論壇隨口說的物價數字嗎？理由是什麼？",
    discussionQuestionEn: "After mastering official CSV downloads, will you still naively believe sensational online claims about inflation?",
    visualType: "dgbas_audit_flow"
  },
  {
    id: 22,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "全球央行聖杯：2% 通膨目標 (2% Target) 幕後邏輯",
    titleEn: "The 2% Inflation Holy Grail: Why Central Banks Target 2%, Not 0%",
    subtitle: "為什麼物價完全不漲 (0%) 或持續下跌 (通縮) 對經濟反而是毀滅性災難？",
    subtitleEn: "Why Zero Inflation (0%) or Deflation is an Economic Catastrophe in Modern Systems",
    quickTakeaways: [
      "理由一【防禦致命通縮陷阱 (Deflation Spiral)】：若物價年減 2%，大眾延後消費等待降價，引發企業減產裁員與倒閉潮。",
      "理由二【預留貨幣政策降息空間】：維持 2% 溫和通膨使名目利率處於安全正區間，經濟衰退時央行才有充裕降息空間。",
      "理由三【工資向下僵固性潤滑劑】：名目工資極難調降，溫和通膨能以實質薪資微調維持勞動市場充分就業。"
    ],
    quickTakeawaysEn: [
      "Reason 1 [Deflation Spiral Trap]: If prices drop by 2%, consumers delay purchases, sparking production cuts, layoffs, and bankruptcies.",
      "Reason 2 [Monetary Policy Buffer]: A 2% target keeps nominal interest rates above zero, leaving room to cut rates in recessions.",
      "Reason 3 [Lubricant for Sticky Wages]: Nominal wages are downward rigid; modest inflation allows real wages to adjust flexibly."
    ],
    teachingNotes: "本頁解答經濟學中的經典問題：為什麼全球主要央行（Fed、ECB、台灣央行）都將通膨目標設定在 2%，而不是 0%？理由一：避免陷入致命的「通縮陷阱 (Deflation Spiral)」，若通膨為負數，消費者會延後消費等待降價，引發企業裁員與流動性陷阱；理由二：提供貨幣政策的降息空間，溫和的 2% 通膨能使名目利率保持在正數區間，讓央行在經濟衰退時有足夠的調降利率空間。教師需強調通縮比通膨更可怕的歷史教訓。",
    discussionQuestion: "如果物價每年下跌 2%（通縮），聽起來對買東西很便宜，但為什麼對整體經濟與你的工作就業反而是災難？",
    discussionQuestionEn: "If consumer prices fall 2% every year (deflation), it sounds great for shopping, but why is it catastrophic for job employment?",
    visualType: "two_percent_logic"
  },
  {
    id: 23,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "4 大抗通膨資產對決（黃金 vs. 房產 vs. TIPS vs. 股票）",
    titleEn: "4 Anti-Inflation Assets Showdown: Gold, Property, TIPS, Equity",
    subtitle: "現金流、槓桿效益、購買力鎖定與生產性資產的優劣評析",
    subtitleEn: "Comparing Cash Flows, Leverage, Principal Inflation Indexing, and Productive Business Assets",
    quickTakeaways: [
      "黃金 (Gold)：終極法幣對衝與千古信用錨，缺點是零配息、缺乏現金流，且波動巨大。",
      "優質房地產 (Real Estate)：租金收益通常隨通膨調升，且具備長期固定低利房貸抗通膨槓桿優勢。",
      "抗通膨公債 (TIPS)：美國財政部發行，債券本金直接隨 CPI 指數同向調增，完美鎖定實質購買力。",
      "定價權股票 (Equities)：具備定價權的龍頭企業（如台積電），能將通膨成本完全轉嫁，獲利與股息持續成長。"
    ],
    quickTakeawaysEn: [
      "Physical Gold: The timeless store of value against fiat collapse, though it yields zero interest or operating cash flow.",
      "Prime Real Estate: Rental yields naturally track inflation, turbocharged by the long-term leverage of fixed-rate mortgages.",
      "TIPS (Inflation-Protected Securities): Treasury bond principals adjust directly with CPI, locking in guaranteed real purchasing power.",
      "Pricing-Power Equities: High-moat tech leaders pass 100% of input cost spikes to clients, growing earnings and dividends."
    ],
    teachingNotes: "本頁對比四類經典抗通膨資產的特性：1. 黃金：終極貨幣避險，但缺乏現金串流與利息；2. 實體房產：租金收益隨通膨調升，具備槓桿與實體價值；3. 抗通膨債券 (TIPS)：本金直接按 CPI 指數比例上調，為官方最佳對衝工具；4. 優質股票：具備轉嫁成本能力的龍頭企業（如台積電），能分享企業成長並抗通膨。引導學生認識各類資產的優缺點並規劃綜合配置。",
    discussionQuestion: "這 4 種資產各自有什麼優缺點？如果發生長期溫和通膨，哪一種資產能同時為你提供源源不絕的現金流與資本利得？",
    discussionQuestionEn: "Among these 4 assets, which can deliver both steady ongoing cash distributions and capital appreciation during sustained inflation?",
    visualType: "image",
    imageSrc: "assets/images/w2_anti_inflation_assets.jpg",
    caption: "圖 3.1 四大抗通膨資產防禦矩陣：黃金、實體房產、TIPS 抗通膨債與高訂價權股票"
  },
  {
    id: 24,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "實質薪資成長率算式：你加薪速度趕得上通膨嗎？",
    titleEn: "Real Wage Growth Formula: Is Your Raise Keeping Up?",
    subtitle: "實質薪資成長率 ≈ 名目薪資成長率 - 通貨膨脹率",
    subtitleEn: "Real Wage Growth Rate ≈ Nominal Wage Growth Rate - Inflation Rate",
    quickTakeaways: [
      "核心算式：$\\text{Real Wage Growth} = \\frac{1 + \\text{Nominal Growth}}{1 + \\text{Inflation}} - 1 \\approx \\text{Nominal Growth} - \\text{Inflation}$。",
      "案例演練：今年公司加薪 3.0%，但個人體感外食與房租通膨達 4.2%，實質薪資成長率為 $-1.2\\%$！",
      "殘酷真相：名目帳戶多了 1,500 元，實質能買到的便當與咖啡數量反而縮水，勞動實質購買力正在貶值。"
    ],
    quickTakeawaysEn: [
      "Approximation Formula: $\\text{Real Wage Growth} \\approx \\text{Nominal Wage Growth} - \\text{Inflation Rate}$.",
      "Case Calculation: A 3.0% company salary raise under 4.2% personal inflation equals a real wage contraction of $-1.2\\%$.",
      "The Unforgiving Truth: Even with more dollars in your bank account, your baskets of goods shrink—labor is devalued."
    ],
    teachingNotes: "本頁提供評估個人勞動價值的算式：Real Wage Growth ≈ Nominal Wage Growth - Inflation Rate。案例分析：若今年公司加薪 3.0%，但地區體感 CPI 通膨率為 3.8%，實質薪資成長率為 -0.8%，意味著勞動實質價值倒退。教師應鼓勵學生提升個人專長不可替代性，並將積蓄投入年化報酬高於通膨的資產組合。讓學生深刻體會投資與職涯成長的緊迫性。",
    discussionQuestion: "如果公司每年固定調薪 2%，而物價通膨率長期為 3.5%，工作 10 年後你的實質生活水平是提升了還是大幅下降了？",
    discussionQuestionEn: "If an employer provides a standard 2% annual raise while inflation averages 3.5%, has your living standard risen or fallen after 10 years?",
    visualType: "wage_growth_calc"
  },
  {
    id: 25,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "巴菲特的護城河：企業訂價權 (Pricing Power)",
    titleEn: "Warren Buffett's Moat: Corporate Pricing Power",
    subtitle: "通膨風暴下最堅固的金鐘罩：能將 100% 成本無損轉嫁給客戶的卓越企業",
    subtitleEn: "The Ultimate Inflation Shield: Businesses Capable of Seamlessly Passing 100% of Cost Shocks to Buyers",
    quickTakeaways: [
      "股神巴菲特名言：「評估一家企業最單一重要的指標，就是它是否擁有定價權 (Pricing Power)。」",
      "護城河企業（如台積電先進製程、蘋果生態系）：原物料與電費暴漲 20%，能直接調漲代工費與終端售價，利潤率完全不受影響。",
      "脆弱低毛利企業：缺乏技術壁壘的代工廠不敢調價，一旦成本上升只能自行硬吞，營業利益率直接腰斬歸零。"
    ],
    quickTakeawaysEn: [
      "Warren Buffett's Golden Rule: 'The single most important decision in evaluating a business is pricing power.'",
      "Moat Leaders (TSMC, Apple): When raw materials and energy spike by 20%, they seamlessly raise wafer and retail prices with zero lost demand.",
      "Fragile Low-Margin Firms: Generic manufacturers lack leverage; absorbing input cost inflation destroys their operating margins."
    ],
    teachingNotes: "本頁介紹華倫·巴菲特 (Warren Buffett) 評估企業抗通膨能力的最重要指標——訂價權 (Pricing Power)。具備強大技術護城河或品牌忠誠度的企業（如台積電、蘋果），即使原物料成本暴漲 20%，能順利將成本 100% 轉嫁給客戶而不影響銷量；相反地，缺乏訂價權的低差異化代工廠只能自行吸收成本，導致毛利率暴跌。帶領學生分析商業世界中強弱企業在通膨環境下的兩極分化命運。",
    discussionQuestion: "為什麼台積電調漲先進製程代工價格，蘋果與輝達只能硬著頭皮接受？這種『訂價權』對股票投資人有多關鍵？",
    discussionQuestionEn: "Why do Apple and Nvidia accept TSMC's price hikes without batting an eye? Why is pricing power crucial for equity investors?",
    visualType: "image",
    imageSrc: "assets/images/w2_pricing_power.jpg",
    caption: "圖 3.2 企業護城河與定價權金鐘罩：在原物料通膨風暴中堅不可摧的毛利率壁壘"
  },
  {
    id: 26,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "居住類通膨與房租黏性 (Shelter Inflation & Rent Lag)",
    titleEn: "Shelter Inflation & Rent Lag: Why Housing Inflation is Sticky",
    subtitle: "一年一簽合約造成的 6~12 個月滯後性，中長期核心通膨的頑固核心",
    subtitleEn: "12-Month Lease Cycles Create a 6-12 Month Lag: The Stubborn Engine of Core CPI",
    quickTakeaways: [
      "居住類 (Shelter) 佔 CPI 權數超過 20%，是決定核心通膨能否降溫的最關鍵定海神針。",
      "租金合約滯後性：一般租約為期一年，市場房價暴漲或房貸利率上升，通常需延遲 6 至 12 個月才反映在租約續簽調價中。",
      "向下頑固黏性：房東一旦調高租金，即便後續房市成交量下滑，房租也鮮少主動調降，成為核心通膨難纏的主因。"
    ],
    quickTakeawaysEn: [
      "Shelter accounts for >20% of CPI baskets, acting as the definitive anchor for medium-term Core CPI trends.",
      "Lease Lag: Rental agreements are typically signed for 1-2 years; housing price surges only show up in CPI after a 6-12 month delay.",
      "Downward Stickiness: Once landlords increase rents, market lease rates rarely retract, cementing persistent inflation."
    ],
    teachingNotes: "本頁分析 CPI 中權數超過 20% 的居住類 (Shelter) 項目。居住類通膨具備顯著的「時間滯後性與頑固黏性」。因為房屋租約通常一年一簽，即使房價或利率暴漲，房租調漲往往延後 6 至 12 個月才反映在 CPI 數據中；且房租一旦調漲便極難調降，成為驅動中長期核心通膨居高不下的主要推手。引導租屋學生觀察房東調租的行為模式。",
    discussionQuestion: "如果你在外租屋，房東通常會在合約到期的什麼時候提出漲租金？這如何印證居住類 CPI 的時間滯後性？",
    discussionQuestionEn: "If you rent an apartment, when does the landlord propose rent hikes? How does this confirm the 6-12 month lease lag in CPI?",
    visualType: "shelter_rent_lag"
  },
  {
    id: 27,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "前沿議題：綠色通膨 (Greenflation) 與碳定價",
    titleEn: "Frontier Economics: Greenflation & Carbon Pricing",
    subtitle: "淨零轉型、CBAM 碳邊境稅、關鍵金屬短缺對生產成本的結構性推升",
    subtitleEn: "Net-Zero Transitions, CBAM Tariffs, and Critical Mineral Scarcity Driving Structural Inflation",
    quickTakeaways: [
      "綠色通膨 (Greenflation)：全球推動能源轉型，淘汰便宜燃煤發電、採購高價綠電，導致基礎工業生產成本攀升。",
      "關鍵綠能金屬短缺：電動車與風力發電需要巨量銅、鋰、鎳，金屬原物料需求爆發推高製造業終端售價。",
      "結構性碳定價：2026 歐盟全面徵收 CBAM 碳關稅，高碳排鋼鐵水泥必須支付碳費，此類通膨具有長期不可逆性。"
    ],
    quickTakeawaysEn: [
      "Greenflation: The structural inflation arising from phasing out cheap fossil fuels and purchasing higher-cost renewables.",
      "Critical Mineral Crunch: EVs and wind turbines require massive amounts of copper, lithium, and nickel, driving up hardware prices.",
      "CBAM Carbon Tariffs: Structural carbon pricing creates permanent, non-transitory cost additions to industrial goods."
    ],
    teachingNotes: "本頁探討 2026 年最前沿的財經議題——綠色通膨 (Greenflation)。隨著全球實施碳關稅 CBAM 與淨零轉型，企業淘汰高碳排煤電、採購高價綠電，以及對鋰、銅、鎳等綠能金屬的大量需求，推升了基礎製造業生產成本；鋼鐵、水泥與半導體支付碳費後轉嫁給消費者，形成了結構性的長期通膨壓力。讓學生理解氣候政策背後真實的經濟代價。",
    discussionQuestion: "為了保護地球進行淨零轉型，卻可能導致我們買手機、汽車和房屋變貴，社會該如何權衡這項綠色代價？",
    discussionQuestionEn: "To protect the planet via net-zero transitions, goods become permanently more expensive. How should society balance this green trade-off?",
    visualType: "greenflation_diagram"
  },
  {
    id: 28,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "建立終身抗通膨思維：個人資產防禦 4 大法則",
    titleEn: "Lifelong Anti-Inflation Framework: 4 Core Pillars",
    subtitle: "拒絕純現金死存、佈局定價權資產、善用固定負債對衝、投資個人人力資本",
    subtitleEn: "Reject Idle Cash, Hold Pricing-Power Assets, Hedge via Fixed Liabilities, Invest in Human Capital",
    quickTakeaways: [
      "支柱一【拒絕純現金死存】：僅保留 6 個月生活緊急預備金，其餘資金堅決投入能產生現金流的生產性資產。",
      "支柱二【擁抱定價權資產】：配置具備全球技術壟斷優勢的股票 ETF (如 VT、QQQ、台積電)，分享企業漲價紅利。",
      "支柱三【善用固定低利房貸】：在合理還款能力內持有自住房產，讓通膨自動幫你稀釋固定利率的實質房貸債務。",
      "支柱四【投資個人人力資本】：持續提升不可被 AI 取代的稀缺專業技能，確保年均薪資成長率超越 CPI 通膨。"
    ],
    quickTakeawaysEn: [
      "Pillar 1 [Reject Idle Cash]: Keep strictly 6 months of emergency living reserves; deploy all excess capital into productive assets.",
      "Pillar 2 [Own Pricing-Power Equities]: Allocate to global moat ETFs and tech monopolies capable of raising prices continuously.",
      "Pillar 3 [Hedge with Fixed Mortgages]: Real estate ownership backed by fixed-rate loans allows inflation to melt your real debt load.",
      "Pillar 4 [Invest in Human Capital]: Upgrade irreplaceable specialized skills to ensure your personal salary growth comfortably beats CPI."
    ],
    teachingNotes: "本頁總結個人終身財務防線的四大支柱：1. 拒絕純現金死存（僅留 6 個月緊急預備金）；2. 佈局具備訂價權的生產性資產；3. 運用適度固定利率長期房貸對衝貨幣貶值；4. 投資個人人力資本，確保年薪調幅超越 CPI。這四大支柱是學生終身受用的財富防禦武器。讓每位學生挑選目前最能夠立即著手執行的項目。",
    discussionQuestion: "在四大防禦支柱中，身為大學生的你，目前最容易開始著手執行的是哪一項？你打算如何規劃？",
    discussionQuestionEn: "Among the 4 defense pillars, which is the most accessible for you as a college student to start executing today?",
    visualType: "four_pillars_temple"
  },
  {
    id: 29,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "第二週全景知識體系圖與觀念整合",
    titleEn: "Week 2 Comprehensive Knowledge Matrix & Synthesis",
    subtitle: "穿透生活體感、拆解公式模型、破解隱形漲價到構築資產長城",
    subtitleEn: "From Daily Perceptions to Mathematical Models, Stealth Shrinkflation, and Wealth Shields",
    quickTakeaways: [
      "第一小時核心：便當10年走勢、拉斯皮爾斯 CPI 權數、頻率偏誤、72法則實質購買力腰斬、工資物價螺旋。",
      "第二小時核心：縮性通膨單位價格計算 (元/克)、享樂品質調整爭議、費雪方程式 (r = i - π)、魏瑪惡性通膨。",
      "第三小時核心：主計總處數據庫實查、央行 2% 目標邏輯、巴菲特企業定價權、4 大抗通膨資產與終身防禦四支柱。"
    ],
    quickTakeawaysEn: [
      "Hour 1 Core: 10-year bento trends, Laspeyres index, frequency bias, Rule of 72 halving, wage-price spiral.",
      "Hour 2 Core: Shrinkflation unit pricing ($/g), hedonic quality controversy, Fisher equation real rates, hyperinflation.",
      "Hour 3 Core: DGBAS database audits, 2% target rationale, Buffett's pricing power moat, 4 anti-inflation assets, and 4 pillars."
    ],
    teachingNotes: "本頁整合第二週全景知識結構圖。從生活通膨感受、CPI 拉斯皮爾斯加權公式與體感落差、縮性通膨與品質調整爭議、費雪效應 r = i - π 負利率警告、通膨稅財富再分配，到四大抗通膨資產對決與企業訂價權護城河。這套體系幫助學生構建完整的總體經濟與個人理財邏輯。教師應鼓勵學生運用所學完成後續的遊戲與線上作業。",
    discussionQuestion: "請用一句話告訴隔壁同學，為什麼在通膨時代，把所有資產都存成銀行活存或定存是極其危險的行為？",
    discussionQuestionEn: "In one single sentence, explain to your classmate why parking all your savings in pure cash deposits is dangerous during inflation.",
    visualType: "holistic_matrix"
  },
  {
    id: 30,
    hour: 3,
    category: "第三小時 ‧ 實證數據與資產防禦",
    categoryEn: "Hour 3: Empirical Data & Wealth Defense",
    title: "學習反思與第三週預告 (利率與央行貨幣政策)",
    titleEn: "Reflection & Week 3 Preview: Interest Rates & Central Banks",
    subtitle: "完成線上課堂作業：個人 CPI 權數自訂與抗通膨資產調配報告",
    subtitleEn: "Submit Your Lab Assignment & Get Ready for Week 3 Central Bank Monetary Dynamics",
    quickTakeaways: [
      "課堂作業提醒：點擊頂部「📝 本週課堂作業」按鈕，自訂個人消費籃子、計算縮性通膨與費雪實質利率並提交。",
      "小遊戲成果：請大家進入「🎮 3小時: 偵探遊戲」完成 4 大關卡，領取『抗通膨防禦專家徽章』。",
      "第三週精彩預告：【利率、央行貨幣政策與資產價格】，解析升降息如何牽動全球股、債、房三大市場行情！"
    ],
    quickTakeawaysEn: [
      "Homework Reminder: Click '📝 Homework Report' to build your personal CPI basket, audit shrinkflation, and submit.",
      "Game Challenge: Enter '🎮 Hr 3: Detective Game' to conquer 4 price puzzles and claim your inflation defense badge.",
      "Week 3 Preview: 'Interest Rates, Central Bank Monetary Policy & Asset Prices'—how rate cycles dictate global equities & bonds!"
    ],
    teachingNotes: "本頁為第二週畫下句點。提醒學生前往雙語網頁點擊「📝 本週課堂作業」按鈕，現場填寫並提交「個人 CPI 權數自訂與抗通膨資產調配報告」。同時預告第三週主題為【利率、央行貨幣政策與資產價格】，將帶領大家深入探討央行升降息如何影響全球股市、債市與房地產價格。感謝學生熱情參與並提醒完成存檔與列印。",
    discussionQuestion: "感謝大家的精彩參與！請記得完成線上課堂作業，我們下週將一起探索央行升降息如何撼動全球金融市場！",
    discussionQuestionEn: "Thank you for your active participation! Please complete your online report; next week we will explore central bank rate cycles!",
    visualType: "course_wrapup"
  }
];
