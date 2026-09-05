/**
 * 115學年度「管理探索二」第十五週教學資料庫
 * 單元名稱：綠色金融、ESG 永續投資與碳定價經濟學
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W15_SCHEDULE_TABLE = [
  {
    "hour": "第一小時 (00:00-00:50)",
    "title": "2050 淨零排放、ESG 三大柱與碳費經濟學",
    "slides": "Slide 01 - 10",
    "summary": "氣候變遷與市場失靈、ESG三大柱 (E/S/G)、碳費定價公式每噸300元、歐盟CBAM碳關稅衝擊、漂綠識破與台灣碳定價戰略。",
    "activity": "🎯 專屬活動：企業碳費與歐盟 CBAM 碳關稅試算器（精算年排萬噸之碳成本與出口扣抵）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第二小時 (00:50-01:40)",
    "title": "ESG 篩選 ETF、碳權交易所與台積電 RE100",
    "slides": "Slide 11 - 20",
    "summary": "00878/00692永續篩選、台灣碳權交易所(TCX)機制、範疇一二三碳盤查SOP、綠色溢價、赤道原則銀行授信與台積電RE100綠電供應鏈。",
    "activity": "🎯 專屬活動：ESG 永續指數投資組合與抗波動模擬器（0050傳統 vs 00878永續配置效益）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第三小時 (01:40-02:30)",
    "title": "永續資產配置、大一綠色職涯與 4 大金律",
    "slides": "Slide 21 - 30",
    "summary": "0050+00878大一永續組合、永續管理師與碳盤查員綠金職涯、自備環保杯綠色生活、防範偽碳權詐騙、TCX查閱與4大金律。",
    "activity": "🎮 小遊戲：ESG 永續理財達人大挑戰 (4大關卡) 📝 作業：個人 carbon 體檢與 ESG 永續投資計畫",
    "timeAlloc": "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W15_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "綠色導論 ‧ 淨零目標",
    "categoryEn": "Green Finance Intro",
    "title": "第十五週課程導論：綠色金融、ESG 永續投資與碳定價經濟學",
    "titleEn": "第十五週課程導論：綠色金融、ESG 永續投資與碳定價經濟學",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：第十五週課程導論：綠色金融、ESG 永續投資與碳定價經濟學，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第十五週課程導論：綠色金融、ESG 永續投資與碳定價經濟學，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "問學生：『同學們平時購買飲料或衣服時，會注意產品包裝上是否有標示「碳足跡」或「環保標章」嗎？』",
    "discussionQuestionEn": "問學生：『同學們平時購買飲料或衣服時，會注意產品包裝上是否有標示「碳足跡」或「環保標章」嗎？』",
    "teachingNotes": "本頁為第十五週課程導論。講師可以引用英格蘭銀行前總裁卡尼名言開場：「氣候變遷是終極的市場失靈，但永續金融將是本世紀最大的財富轉型契機！」針對大一新鮮人面臨的全球「2050 淨零排放 (Net Zero)」浪潮切入。說明永續金融已成為全球資本市場的主流語言。本單元將帶領大家拆解 ESG 三大柱、碳費費率算術、歐盟 CBAM 碳關稅、ESG ETF 與碳盤查 SOP。\n\n【官方數據引述】： 環境部氣候變遷署 / 金管會綠色金融行動方案 / 台灣碳權交易所。",
    "visualType": "esg-1"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "綠色導論 ‧ 淨零目標",
    "categoryEn": "Green Finance Intro",
    "title": "第十五週 3 小時學習地圖與核心技能樹",
    "titleEn": "第十五週 3 小時學習地圖與核心技能樹",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：第十五週 3 小時學習地圖與核心技能樹，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第十五週 3 小時學習地圖與核心技能樹，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "引導學生在講義上記下綠色金融與 ESG 的關鍵定義，準備建立專屬的永續投資組合。",
    "discussionQuestionEn": "引導學生在講義上記下綠色金融與 ESG 的關鍵定義，準備建立專屬的永續投資組合。",
    "teachingNotes": "本頁為學生構建本週 3 小時的學習地圖。第一小時解密 2050 淨零目標、ESG 三大柱 (E/S/G)、碳費 vs 碳稅算術、歐盟 CBAM 碳關稅、企業漂綠辨識與環境部公告費率；第二小時聚焦於 00878 / 00692 ESG ETF 篩選、台灣碳權交易所 (TCX)、範疇 1-3 碳盤查 SOP、綠色溢價與赤道原則；第三小時傳授大一專屬 0050+00878 ESG 資產配置、綠色職涯、減碳生活、防範假綠色基金詐騙與 4 大金律。\n\n【官方數據引述】： 115學年度「管理探索二」課程計畫與學習進度規劃網要。",
    "visualType": "esg-2"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "ESG三大柱 ‧ 碳定價",
    "categoryEn": "ESG & Carbon Pricing",
    "title": "永續浪潮來襲：氣候變遷經濟學與 2050 淨零排放 (Net Zero)",
    "titleEn": "永續浪潮來襲：氣候變遷經濟學與 2050 淨零排放 (Net Zero)",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：永續浪潮來襲：氣候變遷經濟學與 2050 淨零排放 (Net Zero)，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：永續浪潮來襲：氣候變遷經濟學與 2050 淨零排放 (Net Zero)，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提問：『為什麼全球各大企業紛紛承諾在 2050 年前達成淨零排放？如果不轉型會有什麼後果？（答案：面臨碳關稅、碳費與客戶抽單風險）』",
    "discussionQuestionEn": "提問：『為什麼全球各大企業紛紛承諾在 2050 年前達成淨零排放？如果不轉型會有什麼後果？（答案：面臨碳關稅、碳費與客戶抽單風險）』",
    "teachingNotes": "講授 2050 淨零排放 (Net Zero) 的科學目標：透過減碳、再生能源與碳捕捉，使人為溫室氣體排放量與移除量達成抵銷相等的「淨零」狀態。《巴黎氣候協定》目標將全球平均升溫控制在 1.5°C 以內。商業效應：高碳排企業將面臨鉅額碳費用負擔，低碳綠色企業獲得全球資本追捧！\n\n【官方數據引述】： UNFCCC 聯合國氣候變遷公約。",
    "visualType": "esg-3"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "ESG三大柱 ‧ 碳定價",
    "categoryEn": "ESG & Carbon Pricing",
    "title": "ESG 三大柱拆解：環境 (E)、社會 (S) 與公司治理 (G)",
    "titleEn": "ESG 三大柱拆解：環境 (E)、社會 (S) 與公司治理 (G)",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：ESG 三大柱拆解：環境 (E)、社會 (S) 與公司治理 (G)，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：ESG 三大柱拆解：環境 (E)、社會 (S) 與公司治理 (G)，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "用生活比喻：『E 是對地球好，S 是對員工與社區好，G 是對股東與營運誠信好！』",
    "discussionQuestionEn": "用生活比喻：『E 是對地球好，S 是對員工與社區好，G 是對股東與營運誠信好！』",
    "teachingNotes": "剖析評估企業永續經營非財務績效的 ESG 三大柱：1. **E (Environmental 環境)**：溫室氣體減量、水資源管理、再生能源 RE100（如台積電承諾 2040 全面使用綠電）；2. **S (Social 社會)**：員工多元包容 (DEI)、職場工安、社區關懷；3. **G (Governance 公司治理)**：董事會獨立性、反貪腐、股東權益保障。\n\n【官方數據引述】： MSCI ESG Rating 評級架構。",
    "visualType": "esg-4"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "ESG三大柱 ‧ 碳定價",
    "categoryEn": "ESG & Carbon Pricing",
    "title": "什麼是碳定價 (Carbon Pricing)？碳費 (Fee) vs. 碳稅 (Tax)",
    "titleEn": "什麼是碳定價 (Carbon Pricing)？碳費 (Fee) vs. 碳稅 (Tax)",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：什麼是碳定價 (Carbon Pricing)？碳費 (Fee) vs. 碳稅 ，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：什麼是碳定價 (Carbon Pricing)？碳費 (Fee) vs. 碳稅 ，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "算一算：『如果一家鋼鐵廠一年排放 100 萬噸 CO2，碳費每噸 300 元，一年要繳多少碳費？（答案：高達 3 億元台幣！）』",
    "discussionQuestionEn": "算一算：『如果一家鋼鐵廠一年排放 100 萬噸 CO2，碳費每噸 300 元，一年要繳多少碳費？（答案：高達 3 億元台幣！）』",
    "teachingNotes": "講授碳定價經濟學原理：將排碳的外部污染成本內部化。公式：`企業年度碳費負擔 = 溫室氣體總排放量 (公噸) * 指定碳費費率 (元/公噸)`。區分兩大制度：1. **碳費 (Carbon Fee - 台灣採用)**：環境部徵收，專款專用於國家溫室氣體減量基金；2. **碳稅 (Carbon Tax - 歐洲採用)**：財政部徵收納入國庫通用。\n\n【官方數據引述】： 中華民國《氣候變遷因應法》第 28 條規定。",
    "visualType": "esg-5"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "ESG三大柱 ‧ 碳定價",
    "categoryEn": "ESG & Carbon Pricing",
    "title": "歐盟碳邊境調整機制 (CBAM) 與台灣出口製造業衝擊",
    "titleEn": "歐盟碳邊境調整機制 (CBAM) 與台灣出口製造業衝擊",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：歐盟碳邊境調整機制 (CBAM) 與台灣出口製造業衝擊，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：歐盟碳邊境調整機制 (CBAM) 與台灣出口製造業衝擊，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "強調：『CBAM 逼迫全球所有外銷歐盟的製造業，都必須展開真槍實彈的減碳轉型！』",
    "discussionQuestionEn": "強調：『CBAM 逼迫全球所有外銷歐盟的製造業，都必須展開真槍實彈的減碳轉型！』",
    "teachingNotes": "解密歐盟 CBAM 碳關稅震撼彈：進口至歐盟的高碳排產品（鋼鐵、水泥、鋁材、化肥、電力），進口商必須購買 CBAM 憑證彌補碳價差。衝擊：台灣鋼鐵、金屬扣件 (螺絲螺帽) 為出口歐盟重鎮，若台灣未先行在國內繳納碳費，產品將被歐盟補徵高額碳關稅！\n\n【官方數據引述】： 歐盟委員會 CBAM 官方法規白皮書。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-6"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "CBAM衝擊 ‧ 碳費機制",
    "categoryEn": "CBAM & Carbon Tax",
    "title": "企業漂綠 (Greenwashing) 辨識指南與 SASB / GRI 標準",
    "titleEn": "企業漂綠 (Greenwashing) 辨識指南與 SASB / GRI 標準",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：企業漂綠 (Greenwashing) 辨識指南與 SASB / GRI 標準，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：企業漂綠 (Greenwashing) 辨識指南與 SASB / GRI 標準，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提醒：『看企業 ESG 不能只看公關廣告，一定要看有沒有 GRI/SASB 的第三方會計師認證報告！』",
    "discussionQuestionEn": "提醒：『看企業 ESG 不能只看公關廣告，一定要看有沒有 GRI/SASB 的第三方會計師認證報告！』",
    "teachingNotes": "教導辨識假綠色的「企業漂綠 (Greenwashing)」行為：漂綠是指花大錢拍廣告宣傳種植 1,000 棵樹，卻隱瞞工廠每年排放 100 萬噸廢水與碳排！防範心法：查驗企業永續報告書是否通過 **GRI (全球報告倡導組織)** 或 **SASB (永續會計準則委員會)** 第三方獨立查證。\n\n【官方數據引述】： 金管會防範企業漂綠行為監管指引。",
    "visualType": "esg-7"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "CBAM衝擊 ‧ 碳費機制",
    "categoryEn": "CBAM & Carbon Tax",
    "title": "實證數據：環境部與金管會台灣碳費徵收費率公告",
    "titleEn": "實證數據：環境部與金管會台灣碳費徵收費率公告",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：實證數據：環境部與金管會台灣碳費徵收費率公告，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：實證數據：環境部與金管會台灣碳費徵收費率公告，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "問學生：『為什麼環境部給予提出自主減量計畫的企業高達 50-100 元的優惠費率？（鼓勵設備升級實質減碳）』",
    "discussionQuestionEn": "問學生：『為什麼環境部給予提出自主減量計畫的企業高達 50-100 元的優惠費率？（鼓勵設備升級實質減碳）』",
    "teachingNotes": "引述環境部 2026 最新碳費費率公告數據：1. **一般碳費基準費率**：每公噸溫室氣體排放徵收 **300 元台幣**；2. **優惠費率 A/B (自主減量計畫)**：企業若提出符合科學減量目標 (SBTi) 之自主減量計畫，費率大幅降低至 **100 元 ~ 50 元/公噸**，強烈鼓勵企業積極設備轉型。\n\n【官方數據引述】： 環境部氣候變遷署 2026 碳費費率公告。",
    "visualType": "esg-8"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "CBAM衝擊 ‧ 碳費機制",
    "categoryEn": "CBAM & Carbon Tax",
    "title": "綠色債券 (Green Bonds) 與永續發展債券市場運作機制",
    "titleEn": "綠色債券 (Green Bonds) 與永續發展債券市場運作機制",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：綠色債券 (Green Bonds) 與永續發展債券市場運作機制，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：綠色債券 (Green Bonds) 與永續發展債券市場運作機制，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提問：『發行綠色債券與一般債券最大差別是什麼？（答案：資金用途受法律嚴格約束，只能用於綠色專案）』",
    "discussionQuestionEn": "提問：『發行綠色債券與一般債券最大差別是什麼？（答案：資金用途受法律嚴格約束，只能用於綠色專案）』",
    "teachingNotes": "講授綠色債券 (Green Bonds) 機制：企業或政府發行固定收益債券，募集資金**限制 100% 用於綠能、提升能效、污染防治等綠色專案**（如台積電發行綠債興建低碳晶圓廠）。介紹櫃買中心 (TPEx) 永續發展債券專區，設有嚴格審核與追蹤機制。\n\n【官方數據引述】： 證券櫃檯買賣中心 (TPEx) 永續發展債券專區。",
    "visualType": "esg-9"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "CBAM衝擊 ‧ 碳費機制",
    "categoryEn": "CBAM & Carbon Tax",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "第一小時小結與專屬活動預告",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：第一小時小結與專屬活動預告，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第一小時小結與專屬活動預告，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行企業碳費與 CBAM 關稅衝擊試算演練。",
    "discussionQuestionEn": "指導學生開啟網頁版 Modal，準備進行企業碳費與 CBAM 關稅衝擊試算演練。",
    "teachingNotes": "總結第一小時核心觀念：2050 淨零排放目標；ESG 三大柱 (E/S/G)；碳費算術（排放量 × 300元/噸）；歐盟 CBAM 碳關稅衝擊；防範企業漂綠。預告第 1 小時 Modal 實務活動——「企業碳費成本與 CBAM 關稅衝擊試算器」。\n\n【官方數據引述】： 115管理探索二團隊建置。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-10"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "永續ETF ‧ 碳盤查SOP",
    "categoryEn": "ESG ETF & Audit",
    "title": "ESG 篩選 ETF 解析：高股息 + ESG 篩選 (00878 / 00692) 原理",
    "titleEn": "ESG 篩選 ETF 解析：高股息 + ESG 篩選 (00878 / 00692) 原理",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：ESG 篩選 ETF 解析：高股息 + ESG 篩選 (00878 / 0069，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：ESG 篩選 ETF 解析：高股息 + ESG 篩選 (00878 / 0069，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "分析：『00878 為什麼受到小資族歡迎？因為它同時滿足了發放高股息與 ESG 永續篩選兩大優勢！』",
    "discussionQuestionEn": "分析：『00878 為什麼受到小資族歡迎？因為它同時滿足了發放高股息與 ESG 永續篩選兩大優勢！』",
    "teachingNotes": "解析小資族熱門 ESG ETF 運作原理：1. **國泰永續高股息 (00878)**：追蹤 MSCI 台灣 ESG 永續高股息指數，排除 ESG 評級低劣者，結合永續與高股息；2. **富邦公司治理 (00692)**：篩選臺灣公司治理評鑑前 20% 優良企業，涵蓋台積電等優質成分股。\n\n【官方數據引述】： 投信投顧公會 ESG ETF 專區數據。",
    "visualType": "esg-11"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "永續ETF ‧ 碳盤查SOP",
    "categoryEn": "ESG ETF & Audit",
    "title": "碳權交易 (Carbon Trading) 與台灣碳權交易所 (TCX) 機制",
    "titleEn": "碳權交易 (Carbon Trading) 與台灣碳權交易所 (TCX) 機制",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：碳權交易 (Carbon Trading) 與台灣碳權交易所 (TCX) 機制，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：碳權交易 (Carbon Trading) 與台灣碳權交易所 (TCX) 機制，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提問：『碳權可以買賣，這如何激勵企業主動砸錢投入節能減碳？（答案：減碳不僅能省碳費，還能賣碳權賺錢！）』",
    "discussionQuestionEn": "提問：『碳權可以買賣，這如何激勵企業主動砸錢投入節能減碳？（答案：減碳不僅能省碳費，還能賣碳權賺錢！）』",
    "teachingNotes": "解密碳權交易 (Carbon Credit Trading) 運作：1 單位碳權代表 **1 公噸 CO2e 的排放額度**。減碳成效優異者可將多餘碳權賣給超額排碳者。介紹台灣碳權交易所 (TCX, 總部設於高雄)，提供國內自主減量碳權與國外高品質碳權買賣平台。\n\n【官方數據引述】： 台灣碳權交易所 (TCX) 交易規則說明。",
    "visualType": "esg-12"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "永續ETF ‧ 碳盤查SOP",
    "categoryEn": "ESG ETF & Audit",
    "title": "企業碳盤查 (Carbon Footprint) SOP：範疇一、二與範疇三",
    "titleEn": "企業碳盤查 (Carbon Footprint) SOP：範疇一、二與範疇三",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：企業碳盤查 (Carbon Footprint) SOP：範疇一、二與範疇三，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：企業碳盤查 (Carbon Footprint) SOP：範疇一、二與範疇三，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "強調：『蘋果要求供應鏈廠商做的碳盤查，包含了整條價值鏈的範疇三排放！』",
    "discussionQuestionEn": "強調：『蘋果要求供應鏈廠商做的碳盤查，包含了整條價值鏈的範疇三排放！』",
    "teachingNotes": "講授 ISO 14064-1 企業溫室氣體碳盤查三大範疇：1. **範疇一 (Scope 1) 直接排放**：工廠煙囪、公務車汽油燃燒；2. **範疇二 (Scope 2) 間接外購**：外購台電電力、外購蒸氣；3. **範疇三 (Scope 3) 價值鏈上下游**：供應鏈原料製造、員工差旅、產品使用與廢棄。\n\n【官方數據引述】： ISO 14064-1 溫室氣體盤查國際標準。",
    "visualType": "esg-13"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "永續ETF ‧ 碳盤查SOP",
    "categoryEn": "ESG ETF & Audit",
    "title": "綠色溢價 (Green Premium) 與產品碳足跡對消費者的影響",
    "titleEn": "綠色溢價 (Green Premium) 與產品碳足跡對消費者的影響",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：綠色溢價 (Green Premium) 與產品碳足跡對消費者的影響，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：綠色溢價 (Green Premium) 與產品碳足跡對消費者的影響，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "請學生思考：『你願意為了買一杯低碳製造的咖啡，多支付 5 元的綠色溢價嗎？』",
    "discussionQuestionEn": "請學生思考：『你願意為了買一杯低碳製造的咖啡，多支付 5 元的綠色溢價嗎？』",
    "teachingNotes": "講授綠色溢價 (Green Premium) 模型：買零碳/低碳產品比起傳統高碳產品額外高出的成本。公式：`綠色溢價 = 零碳產品售價 - 高碳傳統產品售價`。說明隨著技術規模化生產，綠色溢價將逐漸歸零，使低碳產品成為市場主流。\n\n【官方數據引述】： 比爾·蓋茲《如何避免氣候災難》綠色溢價模型。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-14"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "綠色授信 ‧ 供應鏈",
    "categoryEn": "Green Banking & Supply Chain",
    "title": "綠色金融與銀行授信：赤道原則 (Equator Principles) 融資",
    "titleEn": "綠色金融與銀行授信：赤道原則 (Equator Principles) 融資",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：綠色金融與銀行授信：赤道原則 (Equator Principles) 融資，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：綠色金融與銀行授信：赤道原則 (Equator Principles) 融資，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "總結：『高污染企業未來在銀行將貸不到任何資金，這就是綠色金融的力量！』",
    "discussionQuestionEn": "總結：『高污染企業未來在銀行將貸不到任何資金，這就是綠色金融的力量！』",
    "teachingNotes": "講授銀行業的綠色授信防線——赤道原則 (Equator Principles)：全球大型商業銀行審核大型專案融資 (> 1,000 萬美元) 時，必須評估環境與社會衝擊。台灣主要金控（富邦、國泰、玉山）已簽署赤道原則，停止向新採煤電廠放款！\n\n【官方數據引述】： 赤道原則協會 (Equator Principles Association) 指南。",
    "visualType": "esg-15"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "綠色授信 ‧ 供應鏈",
    "categoryEn": "Green Banking & Supply Chain",
    "title": "永續投資策略：負向排除 vs. 正向篩選 vs. 影響力投資",
    "titleEn": "永續投資策略：負向排除 vs. 正向篩選 vs. 影響力投資",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：永續投資策略：負向排除 vs. 正向篩選 vs. 影響力投資，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：永續投資策略：負向排除 vs. 正向篩選 vs. 影響力投資，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提問：『00878 ETF 屬於哪一種 ESG 投資策略？（答案：正向最佳選股 Best-in-Class）』",
    "discussionQuestionEn": "提問：『00878 ETF 屬於哪一種 ESG 投資策略？（答案：正向最佳選股 Best-in-Class）』",
    "teachingNotes": "解析 3 種主流 ESG 投資選股戰術：1. **負向排除 (Exclusion)**：剔除菸草、軍火、煤炭高污染企業；2. **正向最佳選股 (Best-in-Class)**：同產業中優先選擇 ESG 評分最高者 (00878/00692)；3. **影響力投資 (Impact)**：資金直接投入能產生可衡量綠色效益之專案。\n\n【官方數據引述】： 全球永續投資聯盟 (GSIA) 投資策略分類。",
    "visualType": "esg-16"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "綠色授信 ‧ 供應鏈",
    "categoryEn": "Green Banking & Supply Chain",
    "title": "ESG 投資風險：漂綠罰款、碳費侵蝕利潤與 RE100 綠電瓶頸",
    "titleEn": "ESG 投資風險：漂綠罰款、碳費侵蝕利潤與 RE100 綠電瓶頸",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：ESG 投資風險：漂綠罰款、碳費侵蝕利潤與 RE100 綠電瓶頸，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：ESG 投資風險：漂綠罰款、碳費侵蝕利潤與 RE100 綠電瓶頸，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提醒：『投資 ESG 概念股不能只看口號，要確認企業是否有足夠的綠電與減碳實力。』",
    "discussionQuestionEn": "提醒：『投資 ESG 概念股不能只看口號，要確認企業是否有足夠的綠電與減碳實力。』",
    "teachingNotes": "警告 ESG 投資的隱形轉型風險：1. **漂綠監管重罰風險**：美 SEC 與歐盟加強監管，誇大 ESG 將面臨鉅額罰款與撤資；2. **碳費侵蝕利潤**：高碳排製造業若轉型失敗，年度碳費直接侵蝕獲利；3. **RE100 綠電瓶頸**：台灣綠電供不應求，買不到綠電面臨客戶抽單風險。\n\n【官方數據引述】： 金管會與綠電交易市場監管警訊。",
    "visualType": "esg-17"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "綠色授信 ‧ 供應鏈",
    "categoryEn": "Green Banking & Supply Chain",
    "title": "全球綠能巨頭與台灣綠能供應鏈：台積電 RE100 與風光發電",
    "titleEn": "全球綠能巨頭與台灣綠能供應鏈：台積電 RE100 與風光發電",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：全球綠能巨頭與台灣綠能供應鏈：台積電 RE100 與風光發電，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：全球綠能巨頭與台灣綠能供應鏈：台積電 RE100 與風光發電，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "讚歎：『台積電強勁的綠電需求，成為推動全台灣離岸风電與綠能產業發展的最大買家！』",
    "discussionQuestionEn": "讚歎：『台積電強勁的綠電需求，成為推動全台灣離岸风電與綠能產業發展的最大買家！』",
    "teachingNotes": "講授台積電 RE100 綠電承諾與台灣綠能供應鏈：台積電承諾 2040 年達成 100% 全面使用再生能源 (RE100)，並包下全台絕大部分離岸風電廠之發電量！帶動離岸風電水下基礎 (世紀鋼)、綠能能營 (森崴能源) 與儲能 (台達電) 供應鏈爆發。\n\n【官方數據引述】： RE100 氣候組織官方報告與台積電永續報告書。",
    "visualType": "esg-18"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "綠色授信 ‧ 供應鏈",
    "categoryEn": "Green Banking & Supply Chain",
    "title": "台灣科技業綠色轉型：低碳製造與綠色供應鏈競爭力",
    "titleEn": "台灣科技業綠色轉型：低碳製造與綠色供應鏈競爭力",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：台灣科技業綠色轉型：低碳製造與綠色供應鏈競爭力，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：台灣科技業綠色轉型：低碳製造與綠色供應鏈競爭力，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "強調：『未來科技代工爭奪訂單，不只比誰價格便宜，更比誰的產品碳足跡更低！』",
    "discussionQuestionEn": "強調：『未來科技代工爭奪訂單，不只比誰價格便宜，更比誰的產品碳足跡更低！』",
    "teachingNotes": "講授「減碳力就是接單力」的科技業鐵律：Apple 與 Microsoft 強制要求供應鏈於 2030 年達成碳中和。台灣電子廠升級綠色製造技術（高能效機器、廢水回收、智慧電網）。產品碳足跡越低的廠商，越能穩拿蘋果與微軟長期的獨家大單！\n\n【官方數據引述】： Apple 供應鏈清潔能源計畫年報。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-19"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "綠色授信 ‧ 供應鏈",
    "categoryEn": "Green Banking & Supply Chain",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "第二小時小結與專屬活動預告",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：第二小時小結與專屬活動預告，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第二小時小結與專屬活動預告，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行 ESG ETF 與綠色溢價效益試算演練。",
    "discussionQuestionEn": "指導學生開啟網頁版 Modal，準備進行 ESG ETF 與綠色溢價效益試算演練。",
    "teachingNotes": "總結第二小時核心觀念：00878 / 00692 ESG ETF；碳權交易 (TCX)；範疇 1-3 碳盤查 SOP；赤道原則銀行授信；台積電 RE100 綠電買家。預告第 2 小時 Modal 實務活動——「ESG 篩選 ETF 與綠色溢價評估試算器」。\n\n【官方數據引述】： 115管理探索二團隊建置。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-20"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "資產配置 ‧ 綠金職涯",
    "categoryEn": "Portfolio & Green Careers",
    "title": "打造大一新鮮人永續理財組合：結合 0050/00878 與 ESG 思維",
    "titleEn": "打造大一新鮮人永續理財組合：結合 0050/00878 與 ESG 思維",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：打造大一新鮮人永續理財組合：結合 0050/00878 與 ESG 思維，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：打造大一新鮮人永續理財組合：結合 0050/00878 與 ESG 思維，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "鼓勵學生：『讓你的每一塊錢理財資金，都為地球的永續發展發揮正向影響力！』",
    "discussionQuestionEn": "鼓勵學生：『讓你的每一塊錢理財資金，都為地球的永續發展發揮正向影響力！』",
    "teachingNotes": "手把手教學大一專屬永續理財資產配置：**核心組合：0050 (70%) + 00878 (30%)！** 70% 資金配置全市場台積電龍頭成長；30% 資金配置 ESG 永續高股息。實現兼顧資產成長與運用資本支持低碳綠色企業的雙贏目標！\n\n【官方數據引述】： 理財規劃師 (CFP) ESG 個人資產配置模型。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-21"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "資產配置 ‧ 綠金職涯",
    "categoryEn": "Portfolio & Green Careers",
    "title": "大一新鮮人綠色職涯展望：永續管理師、碳盤查員與 ESG 分析師",
    "titleEn": "大一新鮮人綠色職涯展望：永續管理師、碳盤查員與 ESG 分析師",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：大一新鮮人綠色職涯展望：永續管理師、碳盤查員與 ESG 分析師，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：大一新鮮人綠色職涯展望：永續管理師、碳盤查員與 ESG 分析師，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提示：『不論你主修企管、財金還是工管，考取 ISO 14064 碳盤查證照將大幅提升職場身價！』",
    "discussionQuestionEn": "提示：『不論你主修企管、財金還是工管，考取 ISO 14064 碳盤查證照將大幅提升職場身價！』",
    "teachingNotes": "引導大一學生探索淨零轉型帶爆的新興綠金職缺：1. **永續管理師 (CSO)**：撰寫企業永續報告書、規劃 RE100；2. **碳盤查查驗員 (ISO 14064)**：輔導企業進行範疇 1-3 碳盤查；3. **ESG 永續分析師**：於投信、銀行分析企業 ESG 風險。綠色人才需求暴增！\n\n【官方數據引述】： 104 人力銀行綠色人才薪資白皮書。",
    "visualType": "esg-22"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "資產配置 ‧ 綠金職涯",
    "categoryEn": "Portfolio & Green Careers",
    "title": "綠色生活與消費減碳：減塑、循環經濟與個人碳足跡 App",
    "titleEn": "綠色生活與消費減碳：減塑、循環經濟與個人碳足跡 App",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：綠色生活與消費減碳：減塑、循環經濟與個人碳足跡 App，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：綠色生活與消費減碳：減塑、循環經濟與個人碳足跡 App，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "算一算：『大一學生每天自備環保杯買飲料，四年下來能省下多少錢？（答案：超過 7,000 元！）』",
    "discussionQuestionEn": "算一算：『大一學生每天自備環保杯買飲料，四年下來能省下多少錢？（答案：超過 7,000 元！）』",
    "teachingNotes": "教導日常生活減碳與理財並行實務：1. **自備環保杯優惠**：每杯折抵 5 元（一年省下 1,800 元 + 減少 360 個塑膠杯）；2. **個人碳足跡追蹤 App**：記錄搭捷運減少的碳排；3. **循環經濟二手交易**：教科書與衣物循環利用，減少浪費。\n\n【官方數據引述】： 環境部全民綠生活推廣專區。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-23"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "資產配置 ‧ 綠金職涯",
    "categoryEn": "Portfolio & Green Careers",
    "title": "綠色投資資安防詐：防範假冒綠色債券與偽 ESG 基金詐騙",
    "titleEn": "綠色投資資安防詐：防範假冒綠色債券與偽 ESG 基金詐騙",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：綠色投資資安防詐：防範假冒綠色債券與偽 ESG 基金詐騙，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：綠色投資資安防詐：防範假冒綠色債券與偽 ESG 基金詐騙，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "警告：『凡是宣稱保證高報酬的私下碳權投資，100% 是詐騙！』",
    "discussionQuestionEn": "警告：『凡是宣稱保證高報酬的私下碳權投資，100% 是詐騙！』",
    "teachingNotes": "警告打著「愛地球」旗號的高收益詐騙陷阱：詐騙集團宣稱「投資亞馬遜雨林碳權，保證年化報酬率 20%」，99% 是詐騙資金盤！防範心法：買綠色債券或 ESG 基金，**認明金管會「ESG 基金專區」核准之正規合法基金！**\n\n【官方數據引述】： 內政部警政署 165 反詐騙專線警訊。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-24"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "資產配置 ‧ 綠金職涯",
    "categoryEn": "Portfolio & Green Careers",
    "title": "實證數據調取：台灣碳權交易所 (tcx.com.tw) 查閱",
    "titleEn": "實證數據調取：台灣碳權交易所 (tcx.com.tw) 查閱",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：實證數據調取：台灣碳權交易所 (tcx.com.tw) 查閱，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：實證數據調取：台灣碳權交易所 (tcx.com.tw) 查閱，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "演示進入 TCX 官網查閱國際碳權交易走勢圖表的步驟。",
    "discussionQuestionEn": "演示進入 TCX 官網查閱國際碳權交易走勢圖表的步驟。",
    "teachingNotes": "手把手教導學生登入台灣碳權交易所官網：1. 登入 `tcx.com.tw` 查閱最新國際碳權成報價與交易數量；2. 查閱國內企業自主減量專案碳權核發進度；3. 培養將課堂碳定價理論與真實碳交易數據互相驗證的實證能力。\n\n【官方數據引述】： 台灣碳權交易所 (tcx.com.tw)。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-25"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "大一新鮮人 ESG 永續理財 4 大金律",
    "titleEn": "大一新鮮人 ESG 永續理財 4 大金律",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：大一新鮮人 ESG 永續理財 4 大金律，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：大一新鮮人 ESG 永續理財 4 大金律，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "請學生齊聲朗讀四金律，建立永續理財信念。",
    "discussionQuestionEn": "請學生齊聲朗讀四金律，建立永續理財信念。",
    "teachingNotes": "總結 ESG 永續理財 4 大金律：1. **優先配置 ESG 篩選 ETF**（選擇 00878 / 00692 用資本支持減碳好企業）；2. **嚴防企業漂綠行為**（查驗 GRI/SASB 獨立第三方認證）；3. **理解碳費對企業獲利衝擊**（追蹤高碳排企業轉型能力）；4. **實踐日常低碳省錢生活**（自備環保杯與搭乘大眾運輸）。\n\n【官方數據引述】： 金管會與永續投資 (GSIA) 保護原則。",
    "visualType": "esg-26"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "永續投資試算實例：定期定額 ESG ETF 兼顧收益與永續",
    "titleEn": "永續投資試算實例：定期定額 ESG ETF 兼顧收益與永續",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：永續投資試算實例：定期定額 ESG ETF 兼顧收益與永續，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：永續投資試算實例：定期定額 ESG ETF 兼顧收益與永續，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "強調：『大學四年定期定額買 ESG ETF，畢業時你將握有 17.4 萬元的綠色永續第一桶金！』",
    "discussionQuestionEn": "強調：『大學四年定期定額買 ESG ETF，畢業時你將握有 17.4 萬元的綠色永續第一桶金！』",
    "teachingNotes": "展示大一打工族每月 3,000 元定期定額買 00878 SOP：打工月薪 15,000 元，按 20% 比例提撥 3,000 元定期定額買 00878 (年化股息率 6.5%)。4 年累積成果：`3,000 元 * 48 個月 = 14.4 萬本金 + 複利 3 萬元 = 17.4 萬元永續積蓄！`\n\n【官方數據引述】： 115管理探索二教案永續理財組。",
    "visualType": "esg-27"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "永續發展與世代正義總整合",
    "titleEn": "永續發展與世代正義總整合",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：永續發展與世代正義總整合，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：永續發展與世代正義總整合，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "激勵學生：『成為具備 ESG 永續視野的現代財經公民，共同守護我們的地球！』",
    "discussionQuestionEn": "激勵學生：『成為具備 ESG 永續視野的現代財經公民，共同守護我們的地球！』",
    "teachingNotes": "總結綠色金融的終極價值：理財不只是賺錢，更是為了實現**「世代正義 (Intergenerational Equity)」**。大一新鮮人透過聰明消費與責任投資，用選票與錢包支持低碳企業，引導資本流向真正守護地球的綠色永續產業！\n\n【官方數據引述】： 115學年度「管理探索二」核心價值。 本單元結合理論機制與最新產官學實務，引導大一學生建立責任投資思維，理解碳定價經濟學如何重塑全球資本市場與企業競爭力。",
    "visualType": "esg-28"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "第十五週全景知識體系圖與觀念整合",
    "titleEn": "第十五週全景知識體系圖與觀念整合",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：第十五週全景知識體系圖與觀念整合，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第十五週全景知識體系圖與觀念整合，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "discussionQuestionEn": "引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "teachingNotes": "以全景邏輯結構圖將第十五週 30 頁純教學卡片進行整體串聯：Hour 1 (2050淨零目標 ➔ ESG三大柱 ➔ 碳費公式 [碳排量×300元/噸] ➔ 歐盟CBAM碳關稅 ➔ 漂綠辨識 [GRI/SASB] ➔ 環境部費率公告 ➔ 綠色債券) ➔ Hour 2 (00878/00692 ESG ETF ➔ 碳權交易 [TCX] ➔ 範疇1-3碳盤查SOP ➔ 綠色溢價算術 ➔ 赤道原則融資 ➔ 3大永續策略 ➔ 漂綠與RE100風險 ➔ 台積電RE100) ➔ Hour 3 (0050+00878 ESG配置 ➔ 綠色職涯 ➔ 減碳生活 ➔ 防假綠色基金詐騙 ➔ 碳交所Portal查閱 ➔ 定期定額SOP ➔ 4大金律)。\n\n【官方數據引述】： 115學年度「管理探索二」課程組全景圖。",
    "visualType": "esg-29"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "學習反思與第十六週預告 (加密貨幣、區塊鏈基礎、Web3 與數位資產)",
    "titleEn": "學習反思與第十六週預告 (加密貨幣、區塊鏈基礎、Web3 與數位資產)",
    "subtitle": "深度解析 ESG 三大柱、碳定價經濟學、歐盟 CBAM 碳關稅與大專生綠色責任投資思維",
    "subtitleEn": "Exploring ESG criteria, carbon pricing economics, EU CBAM, and sustainable investing",
    "quickTakeaways": [
      "核心重點：學習反思與第十六週預告 (加密貨幣、區塊鏈基礎、Web3 與數位資產)，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "quickTakeawaysEn": [
      "核心重點：學習反思與第十六週預告 (加密貨幣、區塊鏈基礎、Web3 與數位資產)，掌握碳定價與 ESG 評級重塑全球商業定價的底層邏輯。",
      "產業實證：以環境部碳費徵收、歐盟 CBAM 與台積電 RE100 綠電實例驗證減碳競爭力。",
      "行動決策：配置 00878 / 00692 永續 ETF，以資本力量支持低碳好企業並創造複利成長。"
    ],
    "discussionQuestion": "提醒學生課後完成作業提交，並預習第十六週加密貨幣與區塊鏈主題。",
    "discussionQuestionEn": "提醒學生課後完成作業提交，並預習第十六週加密貨幣與區塊鏈主題。",
    "teachingNotes": "恭喜學生完成第十五週學習！指導學生點擊 navbar 上方的「📝 本週課堂作業」按鈕，線上填寫並提交「個人 carbon 體檢與 ESG 永續投資計畫」。預告第十六週課程主題：「加密貨幣、區塊鏈基礎、Web3 與數位資產風險」，下週將帶大家解密區塊鏈、比特幣 (BTC) 減半、以太坊與防範幣圈詐騙！\n\n【官方數據引述】： 115學年度「管理探索二」課程計畫。",
    "visualType": "esg-30"
  }
];
