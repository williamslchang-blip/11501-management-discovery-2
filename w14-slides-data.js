/**
 * 115學年度「管理探索二」第十四週教學資料庫
 * 單元名稱：生成式 AI 革命、人工智慧產業鏈與未來職場轉型
 * 包含 30 頁純教學卡片、每頁 150+ 字講授指引、課堂提問與雙語對照
 */

const W14_SCHEDULE_TABLE = [
  {
    "hour": "第一小時 (00:00-00:50)",
    "title": "生成式 AI 原理、三層產業鏈與 NVIDIA 護城河",
    "slides": "Slide 01 - 10",
    "summary": "生成式vs傳統AI、Transformer架構、基礎設施/大模型/應用三層結構、NVIDIA GPU與CUDA生態系、台灣80%伺服器代工霸權與液冷散熱趨勢。",
    "activity": "🎯 專屬活動：企業生成式 AI 導入投資報酬率 (ROI) 試算器（精算人均工時節省與淨效益）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第二小時 (00:50-01:40)",
    "title": "提示詞工程、企業 ROI 算術與防範幻覺法規",
    "slides": "Slide 11 - 20",
    "summary": "Prompt工程四要素、學習與財報分析實戰、企業導入ROI算術、幻覺與著作權陷阱、數據隱私防洩、歐盟AI法案與淘金賣鏟人硬體投資法。",
    "activity": "🎯 專屬活動：AI 人工智慧產業鏈價值分配試算器（模擬各產業鏈分層成本配置效益）",
    "timeAlloc": "講授 35 分 | 活動 15 分"
  },
  {
    "hour": "第三小時 (01:40-02:30)",
    "title": "個人 AI 協作工作流、跨域 3 大能力與 4 大金律",
    "slides": "Slide 21 - 30",
    "summary": "打造個人自動化工作流、大一拿不走的三大核心能力 (提問/批判/整合)、邊緣AI終端換機潮、Deepfake防詐SOP、NVIDIA財報查閱與4大金律。",
    "activity": "🎮 小遊戲：生成式 AI 產業鏈與未來職場達人大挑戰 (4大關卡) 📝 作業：個人職涯人機協作轉型報告",
    "timeAlloc": "講授 20 分 | 遊戲 15 分 | 作業 15 分"
  }
];

const W14_SLIDES_DATA = [
  {
    "id": 1,
    "hour": 1,
    "category": "AI導論 ‧ 技術突破",
    "categoryEn": "AI Intro",
    "title": "第十四週課程導論：生成式 AI 革命、人工智慧產業鏈與未來職場轉型",
    "titleEn": "第十四週課程導論：生成式 AI 革命、人工智慧產業鏈與未來職場轉型",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：第十四週課程導論：生成式 AI 革命、人工智慧產業鏈與未來職場轉型，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第十四週課程導論：生成式 AI 革命、人工智慧產業鏈與未來職場轉型，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "問學生：『同學們平時在做報告或寫作業時，已經開始使用 ChatGPT 或 Claude 幫忙了嗎？』",
    "discussionQuestionEn": "問學生：『同學們平時在做報告或寫作業時，已經開始使用 ChatGPT 或 Claude 幫忙了嗎？』",
    "teachingNotes": "本頁為第十四週課程導論。講師可以引用 NVIDIA 執行長黃仁勳名言開場：「AI 不會取代你，但懂的使用 AI 的人將會取代你！」針對大一新鮮人面臨的 AI 浪潮切入。說明生成式 AI 已從學術實驗室走向全球企業與日常生活。本單元將帶領大家拆解 AI 產業鏈三層結構（算力晶片、LLM 大模型、AI 應用）、NVIDIA 算力霸權、廣達/緯創/鴻海 AI 伺服器代工、提示詞工程與職場替代/賦能算術。\n\n【官方數據引述】： Gartner / IDC 全球 AI 支出報告 / NVIDIA Investor Relations。",
    "visualType": "ai-1"
  },
  {
    "id": 2,
    "hour": 1,
    "category": "AI導論 ‧ 技術突破",
    "categoryEn": "AI Intro",
    "title": "第十四週 3 小時學習地圖與核心技能樹",
    "titleEn": "第十四週 3 小時學習地圖與核心技能樹",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：第十四週 3 小時學習地圖與核心技能樹，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第十四週 3 小時學習地圖與核心技能樹，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "引導學生思考自己在未來職場中希望扮演被 AI 替代的角色，還是善用 AI 的超級個人。",
    "discussionQuestionEn": "引導學生思考自己在未來職場中希望扮演被 AI 替代的角色，還是善用 AI 的超級個人。",
    "teachingNotes": "本頁為學生構建本週 3 小時的學習地圖。第一小時解密生成式 AI 定義、AI 三層結構、NVIDIA GPU 霸權、AI 伺服器代工 (廣達/緯創/鴻海)、水冷散熱與 Gartner 數據；第二小時聚焦於 Prompt Engineering 提問技巧、學習/理財 AI 應用、企業 ROI 算術、幻覺與著作權、歐盟 AI 法案與 AI 投資策略；第三小時傳授個人 AI 工作流、大一 3 大能力、Edge AI PC、Deepfake 防詐與 4 大金律。\n\n【官方數據引述】： 115學年度「管理探索二」課程計畫與學習進度規劃網要。",
    "visualType": "ai-2"
  },
  {
    "id": 3,
    "hour": 1,
    "category": "產業分層 ‧ 算力霸權",
    "categoryEn": "Value Chain & Compute",
    "title": "什麼是生成式 AI (Generative AI)？從 ChatGPT 到 Sora",
    "titleEn": "什麼是生成式 AI (Generative AI)？從 ChatGPT 到 Sora",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：什麼是生成式 AI (Generative AI)？從 ChatGPT 到 So，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：什麼是生成式 AI (Generative AI)？從 ChatGPT 到 So，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "演示文字輸入 prompt 瞬間生成高清圖片與影片的驚人過程。",
    "discussionQuestionEn": "演示文字輸入 prompt 瞬間生成高清圖片與影片的驚人過程。",
    "teachingNotes": "講授生成式 AI (Generative AI) 的技術突破：採用深度學習與 Transformer 網絡架構，從傳統「分析數據」跨越至「自主生成全新內容」。範例：1. **文字與程式碼**：ChatGPT (OpenAI)、Claude (Anthropic)、Gemini (Google) 5 秒生成專業分析與程式碼；2. **多模態與視訊**：Midjourney、DALL-E 3、Sora (OpenAI 視訊生成模型) 實現文字轉高清影片。\n\n【官方數據引述】： OpenAI & Google DeepMind 技術白皮書。",
    "visualType": "ai-3"
  },
  {
    "id": 4,
    "hour": 1,
    "category": "產業分層 ‧ 算力霸權",
    "categoryEn": "Value Chain & Compute",
    "title": "AI 產業鏈三層結構：算力晶片、LLM 大模型與上層 AI 應用",
    "titleEn": "AI 產業鏈三層結構：算力晶片、LLM 大模型與上層 AI 應用",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：AI 產業鏈三層結構：算力晶片、LLM 大模型與上層 AI 應用，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：AI 產業鏈三層結構：算力晶片、LLM 大模型與上層 AI 應用，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "用淘金熱比喻：『硬體是賣鏟人，LLM 是開採技術，軟體應用是最終加工售出的金飾！』",
    "discussionQuestionEn": "用淘金熱比喻：『硬體是賣鏟人，LLM 是開採技術，軟體應用是最終加工售出的金飾！』",
    "teachingNotes": "拆解 AI 產業鏈獲利結構：1. **底層：算力硬體 (Compute)**：GPU 算力晶片與 AI 伺服器 (NVIDIA, TSMC, 廣達)，算力為新石油，毛利極高；2. **中層：大語言模型 (LLM)**：基礎模型訓練 (OpenAI, Google Gemini, Meta Llama)，研發資本密集；3. **上層：AI 應用軟體 (Apps)**：Copilot (Microsoft 365, Midjourney)，龐大 SaaS 訂閱潛力。\n\n【官方數據引述】： CB Insights 全球 AI 產業鏈結構圖。",
    "visualType": "ai-4"
  },
  {
    "id": 5,
    "hour": 1,
    "category": "產業分層 ‧ 算力霸權",
    "categoryEn": "Value Chain & Compute",
    "title": "算力就是新石油！NVIDIA GPU 晶片架構與黃仁勳 AI 霸權",
    "titleEn": "算力就是新石油！NVIDIA GPU 晶片架構與黃仁勳 AI 霸權",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：算力就是新石油！NVIDIA GPU 晶片架構與黃仁勳 AI 霸權，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：算力就是新石油！NVIDIA GPU 晶片架構與黃仁勳 AI 霸權，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提問：『為什麼其他科技巨頭砸重金設計晶片，短期內依然無法撼動 NVIDIA 的 CUDA 霸權？（因為軟體生態系綁定）』",
    "discussionQuestionEn": "提問：『為什麼其他科技巨頭砸重金設計晶片，短期內依然無法撼動 NVIDIA 的 CUDA 霸權？（因為軟體生態系綁定）』",
    "teachingNotes": "剖析 NVIDIA 掌控全球 80% 以上 AI 算力的護城河：1. **CUDA 軟體生態系護城河**：NVIDIA 不僅提供 H100/B200 硬體，更憑藉 15 年累積的 CUDA 平台，綁定全球數百萬 AI 工程師；2. **Blackwell B200 晶片**：擁 2,080 億個電晶體，算力提升 5 倍，推動全球資料中心全面升級為 AI 工廠。\n\n【官方數據引述】： NVIDIA GTC 大會技術報告。",
    "visualType": "ai-5"
  },
  {
    "id": 6,
    "hour": 1,
    "category": "產業分層 ‧ 算力霸權",
    "categoryEn": "Value Chain & Compute",
    "title": "AI 伺服器供應鏈：廣達、緯創、鴻海與英業達的角色",
    "titleEn": "AI 伺服器供應鏈：廣達、緯創、鴻海與英業達的角色",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：AI 伺服器供應鏈：廣達、緯創、鴻海與英業達的角色，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：AI 伺服器供應鏈：廣達、緯創、鴻海與英業達的角色，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "強調：『無論全球 AI 軟體怎麼大戰，最後的實體伺服器機櫃全都要由台灣廣達與鴻海製造！』",
    "discussionQuestionEn": "強調：『無論全球 AI 軟體怎麼大戰，最後的實體伺服器機櫃全都要由台灣廣達與鴻海製造！』",
    "teachingNotes": "講授台灣代工巨頭在全球 AI 伺服器中的獨霸地位：全球 80% 以上的 AI 伺服器均由台灣代工大廠組裝製造！1. **廣達 (2382)**：整機系統組裝 (L10/L11) 與水冷櫃設計，主供 NVIDIA NVL72 與 Google；2. **緯創 (3231)**：NVIDIA GPU 晶基板獨家/主要供應商；3. **鴻海 (2317)**：提供垂直整合零組件與整機櫃製造。\n\n【官方數據引述】： Digitimes Research 全球 AI 伺服器調查。",
    "visualType": "ai-6"
  },
  {
    "id": 7,
    "hour": 1,
    "category": "伺服器硬體 ‧ 產業趨勢",
    "categoryEn": "Server Hardware",
    "title": "散熱與關鍵零組件：水冷散熱 (Liquid Cooling) 與 CCL 板",
    "titleEn": "散熱與關鍵零組件：水冷散熱 (Liquid Cooling) 與 CCL 板",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：散熱與關鍵零組件：水冷散熱 (Liquid Cooling) 與 CCL 板，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：散熱與關鍵零組件：水冷散熱 (Liquid Cooling) 與 CCL 板，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "比喻：『AI 晶片就像超級跑車引擎，水冷散熱就是讓引擎高速運轉而不燒毀的水冷系統！』",
    "discussionQuestionEn": "比喻：『AI 晶片就像超級跑車引擎，水冷散熱就是讓引擎高速運轉而不燒毀的水冷系統！』",
    "teachingNotes": "講授 AI 伺服器關鍵硬體升級：AI 伺服器單櫃耗電高達 120kW，傳統風扇散熱無法因應，帶動**水冷散熱 (Liquid Cooling)** 革命！台灣**奇鋐 (3017)、雙鴻 (3324)** 提供水冷板與冷卻分配器 (CDU)。高頻高速傳輸則帶動**台光電 (2383)** 超低損耗銅箔基板 (CCL) 需求。\n\n【官方數據引述】： TrendForce 伺服器散熱與零組件研究。",
    "visualType": "ai-7"
  },
  {
    "id": 8,
    "hour": 1,
    "category": "伺服器硬體 ‧ 產業趨勢",
    "categoryEn": "Server Hardware",
    "title": "實證數據：Gartner 與 IDC 全球生成式 AI 支出預測",
    "titleEn": "實證數據：Gartner 與 IDC 全球生成式 AI 支出預測",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：實證數據：Gartner 與 IDC 全球生成式 AI 支出預測，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：實證數據：Gartner 與 IDC 全球生成式 AI 支出預測，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "問學生：『微軟、微軟、亞馬遜與 Google 每年砸幾百億美元買 AI 伺服器，展現了什麼訊號？』",
    "discussionQuestionEn": "問學生：『微軟、微軟、亞馬遜與 Google 每年砸幾百億美元買 AI 伺服器，展現了什麼訊號？』",
    "teachingNotes": "引述 Gartner 與 IDC 2026 最新數據：全球 AI 產業總支出將於 2027 年突破 **5,000 億美元 (約 16 兆台幣)**，年複合成長率 (CAGR) 高達 35%！AI 伺服器出貨金額占比已超過全球伺服器總採購金額的 **50%**，成為雲端巨頭資本支出的第一大主力。\n\n【官方數據引述】： Gartner Worldwide IT Spending Forecast / IDC Worldwide AI Tracker。",
    "visualType": "ai-8"
  },
  {
    "id": 9,
    "hour": 1,
    "category": "伺服器硬體 ‧ 產業趨勢",
    "categoryEn": "Server Hardware",
    "title": "大一新鮮人看 AI 職場：哪些工作被替代？哪些被賦能？",
    "titleEn": "大一新鮮人看 AI 職場：哪些工作被替代？哪些被賦能？",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：大一新鮮人看 AI 職場：哪些工作被替代？哪些被賦能？，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：大一新鮮人看 AI 職場：哪些工作被替代？哪些被賦能？，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "激勵學生：『不要害怕被 AI 替代，要努力學習成為使用 AI 的超級個人！』",
    "discussionQuestionEn": "激勵學生：『不要害怕被 AI 替代，要努力學習成為使用 AI 的超級個人！』",
    "teachingNotes": "剖析 AI 時代未來職涯發展的雙刃劍：1. **高度易被 AI 替代的工作**：重複性數據輸入、基礎翻譯、初級程式除錯、常規客服；2. **被 AI 大幅賦能的工作**：跨領域整合者、進階系統架構師、提示詞工程師、AI 財務分析師與策略決策者。結論：學會駕馭 AI 的人將成為職場超級個體。\n\n【官方數據引述】： 世界經濟論壇 (WEF)《未來就業報告》。",
    "visualType": "ai-9"
  },
  {
    "id": 10,
    "hour": 1,
    "category": "伺服器硬體 ‧ 產業趨勢",
    "categoryEn": "Server Hardware",
    "title": "第一小時小結與專屬活動預告",
    "titleEn": "第一小時小結與專屬活動預告",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：第一小時小結與專屬活動預告，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第一小時小結與專屬活動預告，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行 AI 算力建置成本與伺服器估值試算。",
    "discussionQuestionEn": "指導學生開啟網頁版 Modal，準備進行 AI 算力建置成本與伺服器估值試算。",
    "teachingNotes": "總結第一小時核心觀念：AI 3 層結構；NVIDIA CUDA 護城河；台灣廣達/緯創/鴻海包辦 80% AI 伺服器代工；水冷散熱趨勢；Gartner 5,000 億美元支出預測。預告第 1 小時 Modal 實務活動——「AI 算力成本與伺服器供應鏈估值計算器」。\n\n【官方數據引述】： 115管理探索二團隊建置。 本單元緊扣當前全球生成式 AI 產業革命脈動，引導大一學生建立理性、技術與商業並重之跨領域視野，掌握從底層晶片至終端應用的全景人機協作思維。",
    "visualType": "ai-10"
  },
  {
    "id": 11,
    "hour": 2,
    "category": "提示工程 ‧ 企業ROI",
    "categoryEn": "Prompt & Enterprise ROI",
    "title": "提示詞工程 (Prompt Engineering) 基礎：精準提問四要素",
    "titleEn": "提示詞工程 (Prompt Engineering) 基礎：精準提問四要素",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：提示詞工程 (Prompt Engineering) 基礎：精準提問四要素，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：提示詞工程 (Prompt Engineering) 基礎：精準提問四要素，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "帶領學生在講義上演練撰寫一組包含 4 要素的專業 Prompt。",
    "discussionQuestionEn": "帶領學生在講義上演練撰寫一組包含 4 要素的專業 Prompt。",
    "teachingNotes": "講授精準操控 AI 的黃金提示詞公式：`黃金提示詞 = 角色設定 (Role) + 背景任務 (Context) + 限制條件 (Constraint) + 輸出格式 (Output Format)`。實例：「你是一位台股資深分析師 (Role)，請分析台積電最新的毛利率表現 (Context)，列出 3 大優劣勢，不要使用複雜專業術語 (Constraint)，以表格形式輸出 (Output Format)。」\n\n【官方數據引述】： OpenAI Prompt Engineering 最佳實務指南。",
    "visualType": "ai-11"
  },
  {
    "id": 12,
    "hour": 2,
    "category": "提示工程 ‧ 企業ROI",
    "categoryEn": "Prompt & Enterprise ROI",
    "title": "AI 工具在大一學習與財務分析實戰：數據處理與圖表",
    "titleEn": "AI 工具在大一學習與財務分析實戰：數據處理與圖表",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：AI 工具在大一學習與財務分析實戰：數據處理與圖表，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：AI 工具在大一學習與財務分析實戰：數據處理與圖表，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "演示將一份資產負債表數據貼入 ChatGPT 並自動生成分析報告的過程。",
    "discussionQuestionEn": "演示將一份資產負債表數據貼入 ChatGPT 並自動生成分析報告的過程。",
    "teachingNotes": "展示 AI 在大一學習與理財分析的 3 大實戰應用：1. **論文與財報速讀**：上傳 100 頁英文年報至 Claude / ChatGPT，10 秒摘要核心亮點；2. **財務數據試算**：使用 Advanced Data Analysis 自動跑 Python 代碼畫股票圖表；3. **簡報大綱生成**：輸入主題，AI 快速梳理 30 頁邏輯架構。\n\n【官方數據引述】： 115管理探索二教案 AI 輔助教學組。",
    "visualType": "ai-12"
  },
  {
    "id": 13,
    "hour": 2,
    "category": "提示工程 ‧ 企業ROI",
    "categoryEn": "Prompt & Enterprise ROI",
    "title": "企業引進 AI 的 ROI 算術：人力縮減 vs. 算力伺服器成本",
    "titleEn": "企業引進 AI 的 ROI 算術：人力縮減 vs. 算力伺服器成本",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：企業引進 AI 的 ROI 算術：人力縮減 vs. 算力伺服器成本，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：企業引進 AI 的 ROI 算術：人力縮減 vs. 算力伺服器成本，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提問：『企業每個月花 $30 美元為員工訂閱 Copilot，省下的時間價值超過多少？（答案：遠超過 30 美元！）』",
    "discussionQuestionEn": "提問：『企業每個月花 $30 美元為員工訂閱 Copilot，省下的時間價值超過多少？（答案：遠超過 30 美元！）』",
    "teachingNotes": "講授企業導入 AI 的投資報酬率算術：`AI ROI = (節省人力與時間效益 - AI 伺服器與 SaaS 訂閱費) / AI 總建置成本 * 100%`。麥肯錫實證數據：成功導入 Copilot AI 的企業，員工每處理一份客戶報告可節省 40% 時間，ROI 於 1.2 年內成功回收成本。\n\n【官方數據引述】： McKinsey 麥肯錫《Generative AI 經濟價值報告》。",
    "visualType": "ai-13"
  },
  {
    "id": 14,
    "hour": 2,
    "category": "提示工程 ‧ 企業ROI",
    "categoryEn": "Prompt & Enterprise ROI",
    "title": "幻覺 (Hallucination) 與著作權陷阱：AI 產出真實性查證",
    "titleEn": "幻覺 (Hallucination) 與著作權陷阱：AI 產出真實性查證",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：幻覺 (Hallucination) 與著作權陷阱：AI 產出真實性查證，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：幻覺 (Hallucination) 與著作權陷阱：AI 產出真實性查證，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提醒：『將 AI 產出的數據或引用文獻拿去 Google 反查，是防範幻覺的必備習慣。』",
    "discussionQuestionEn": "提醒：『將 AI 產出的數據或引用文獻拿去 Google 反查，是防範幻覺的必備習慣。』",
    "teachingNotes": "警告盲目信任 AI 的兩大陷阱：1. **幻覺 (Hallucination)**：大語言模型是「機率文本生成器」，有時會本正經地一本胡說八道（引述不存在的法條或虛構數據）；2. **著作權與侵權爭議**：AI 訓練集可能包含未授權內容，直接複製商業銷售可能面臨著作權訴訟。鐵律：**永遠進行事實查證 (Fact-checking)！**\n\n【官方數據引述】： 智慧財產局 AI 著作權爭議說明。",
    "visualType": "ai-14"
  },
  {
    "id": 15,
    "hour": 2,
    "category": "資安法規 ‧ 巨頭競合",
    "categoryEn": "Security & Giants",
    "title": "數據隱私與資安風險：企業機密外洩與 Deepfake 詐騙",
    "titleEn": "數據隱私與資安風險：企業機密外洩與 Deepfake 詐騙",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：數據隱私與資安風險：企業機密外洩與 Deepfake 詐騙，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：數據隱私與資安風險：企業機密外洩與 Deepfake 詐騙，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提醒：『使用 AI 工具時，永遠不要勾選「允許官方使用我的數據訓練模型」選項！』",
    "discussionQuestionEn": "提醒：『使用 AI 工具時，永遠不要勾選「允許官方使用我的數據訓練模型」選項！』",
    "teachingNotes": "講授數據資安防禦：1. **企業資安機密外洩**：三星工程師曾將未公開晶片原始碼貼入免費版 ChatGPT，導致機密遭訓練集吸收；2. **Deepfake 偽造技術**：詐騙集團利用 3 秒語音樣本複製親友聲音，甚至複製臉部影像進行視訊詐騙。警告：**絕對不能將機密數據與個人身分證字號餵給免費 AI！**\n\n【官方數據引述】： 國家資通安全研究院 (NICS) 資安警訊。",
    "visualType": "ai-15"
  },
  {
    "id": 16,
    "hour": 2,
    "category": "資安法規 ‧ 巨頭競合",
    "categoryEn": "Security & Giants",
    "title": "AI 倫理與法規：歐盟 AI 法案 (EU AI Act) 與全球監管",
    "titleEn": "AI 倫理與法規：歐盟 AI 法案 (EU AI Act) 與全球監管",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：AI 倫理與法規：歐盟 AI 法案 (EU AI Act) 與全球監管，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：AI 倫理與法規：歐盟 AI 法案 (EU AI Act) 與全球監管，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "討論：『為什麼生成式 AI 產出的圖片或影片，法律要求必須明確標註「AI 生成」？（防止偽造詐騙與誤導）』",
    "discussionQuestionEn": "討論：『為什麼生成式 AI 產出的圖片或影片，法律要求必須明確標註「AI 生成」？（防止偽造詐騙與誤導）』",
    "teachingNotes": "講授全球首部硬性監管 AI 的法案——歐盟 AI 法案 (EU AI Act) 風險三分級：1. **不可接受風險**：社交評分、即時生物識別（全球完全禁止）；2. **高風險**：醫療設備、自動化求職篩選（嚴格審查）；3. **有限風險**：聊天機器人、Deepfake（**強制標註「本內容由 AI 生成」！**）。\n\n【官方數據引述】： 歐盟委員會 (European Commission) EU AI Act 官方條文。",
    "visualType": "ai-16"
  },
  {
    "id": 17,
    "hour": 2,
    "category": "資安法規 ‧ 巨頭競合",
    "categoryEn": "Security & Giants",
    "title": "投資 AI 產業鏈理性策略：硬體賣軍火商 vs 上層軟體公司",
    "titleEn": "投資 AI 產業鏈理性策略：硬體賣軍火商 vs 上層軟體公司",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：投資 AI 產業鏈理性策略：硬體賣軍火商 vs 上層軟體公司，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：投資 AI 產業鏈理性策略：硬體賣軍火商 vs 上層軟體公司，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "結論：『投資 AI 優先選擇提供算力與伺服器的硬體龍頭，風險最低且最直接受惠。』",
    "discussionQuestionEn": "結論：『投資 AI 優先選擇提供算力與伺服器的硬體龍頭，風險最低且最直接受惠。』",
    "teachingNotes": "剖析淘金熱「賣鏟人」投資策略：在金淘熱潮中，買賣鏟子的軍火商最穩定賺錢！1. **淘金賣鏟人 (硬體供應鏈)**：不論哪家大模型贏，都需要向 **NVIDIA、台積電、廣達** 採購算力與伺服器，獲利能見度最高；2. **上層軟體公司**：競爭激烈且易被模型升級替代，需選擇具備黏性用戶生態系者 (Microsoft)。\n\n【官方數據引述】： 理財規劃師 (CFP) 科技產業投資架構。",
    "visualType": "ai-17"
  },
  {
    "id": 18,
    "hour": 2,
    "category": "資安法規 ‧ 巨頭競合",
    "categoryEn": "Security & Giants",
    "title": "全球科技巨頭 AI 大戰：Microsoft+OpenAI vs. Google vs. Meta",
    "titleEn": "全球科技巨頭 AI 大戰：Microsoft+OpenAI vs. Google vs. Meta",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：全球科技巨頭 AI 大戰：Microsoft+OpenAI vs. Google，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：全球科技巨頭 AI 大戰：Microsoft+OpenAI vs. Google，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提問：『Meta 為什麼要將強大的 Llama 3 大模型完全免費開源？（答案：建立生態系，打擊競爭對手的閉源壁壘）』",
    "discussionQuestionEn": "提問：『Meta 為什麼要將強大的 Llama 3 大模型完全免費開源？（答案：建立生態系，打擊競爭對手的閉源壁壘）』",
    "teachingNotes": "解析三大科技陣營搶奪次世代作業系統的大戰：1. **Microsoft + OpenAI**：ChatGPT-4o 與 Copilot 綁定 Office 365 企業生態（閉源收費）；2. **Google (Alphabet)**：Gemini 1.5 Pro 與搜尋引擎/Android 整合；3. **Meta (Facebook)**：Llama 3 **完全開源 (Open Source)**，號召全球工程師社群免費使用。\n\n【官方數據引述】： MIT Technology Review 全球 AI 趨勢分析。",
    "visualType": "ai-18"
  },
  {
    "id": 19,
    "hour": 2,
    "category": "資安法規 ‧ 巨頭競合",
    "categoryEn": "Security & Giants",
    "title": "台灣科技業在全球 AI 浪潮中的硬體獨霸地位 (市占率>80%)",
    "titleEn": "台灣科技業在全球 AI 浪潮中的硬體獨霸地位 (市占率>80%)",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：台灣科技業在全球 AI 浪潮中的硬體獨霸地位 (市占率>80%)，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：台灣科技業在全球 AI 浪潮中的硬體獨霸地位 (市占率>80%)，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "讚歎：『全球每一次 AI 算力的升級，都是台灣科技製造業的巨大利多！』",
    "discussionQuestionEn": "讚歎：『全球每一次 AI 算力的升級，都是台灣科技製造業的巨大利多！』",
    "teachingNotes": "展現台灣科技業在全球 AI 浪潮中的硬體獨霸地位：從晶圓代工 (TSMC 100%)、GPU 基板 (緯創 90%)、散熱 (奇鋐 70%) 到伺服器整機 (廣達/鴻海 80%)，台灣硬體代工市占率高達 80% 以上！強大的工程整合能力讓矽谷大廠紛紛來台設立 AI 研發中心。\n\n【官方數據引述】： 經濟部技術處 AI 產業鏈數據。",
    "visualType": "ai-19"
  },
  {
    "id": 20,
    "hour": 2,
    "category": "資安法規 ‧ 巨頭競合",
    "categoryEn": "Security & Giants",
    "title": "第二小時小結與專屬活動預告",
    "titleEn": "第二小時小結與專屬活動預告",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：第二小時小結與專屬活動預告，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第二小時小結與專屬活動預告，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "指導學生開啟網頁版 Modal，準備進行企業 AI ROI 與個人時間效益試算演練。",
    "discussionQuestionEn": "指導學生開啟網頁版 Modal，準備進行企業 AI ROI 與個人時間效益試算演練。",
    "teachingNotes": "總結第二小時核心觀念：Prompt 4 要素；AI 在學習/理財之應用；企業 AI ROI 算術；防範幻覺與歐盟 AI 法案；投資硬體賣鏟人策略；台灣 80% AI 伺服器獨霸地位。預告第 2 小時 Modal 實務活動——「企業 AI ROI 效益與個人 AI 賦能時間精算器」。\n\n【官方數據引述】： 115管理探索二團隊建置。",
    "visualType": "ai-20"
  },
  {
    "id": 21,
    "hour": 3,
    "category": "人機協作 ‧ 關鍵能力",
    "categoryEn": "Human-AI Teaming",
    "title": "打造個人 AI 協作工作流：融入日常學習、理財與簡報",
    "titleEn": "打造個人 AI 協作工作流：融入日常學習、理財與簡報",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：打造個人 AI 協作工作流：融入日常學習、理財與簡報，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：打造個人 AI 協作工作流：融入日常學習、理財與簡報，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "鼓勵學生：『建立自己的 AI 多工具工作流，你一個人就能完成過去一個團隊的工作量！』",
    "discussionQuestionEn": "鼓勵學生：『建立自己的 AI 多工具工作流，你一個人就能完成過去一個團隊的工作量！』",
    "teachingNotes": "手把手教導打造個人每日 AI 自動化多工具協作 SOP：1. **階段 1：收集與摘要 (Information)**：使用 Perplexity / Claude 速讀 50 篇國際財經新聞；2. **階段 2：邏輯分析與試算 (Analysis)**：使用 ChatGPT Code Interpreter 跑 Python 分析數據；3. **階段 3：視覺產出 (Output)**：使用 AI 生成 Markdown 結構，compile 成美觀 HTML 簡報！\n\n【官方數據引述】： 個人 AI 生產力工作流設計。",
    "visualType": "ai-21"
  },
  {
    "id": 22,
    "hour": 3,
    "category": "人機協作 ‧ 關鍵能力",
    "categoryEn": "Human-AI Teaming",
    "title": "大一新鮮人面對 AI 時代 3 大關鍵能力：提問、批判與整合",
    "titleEn": "大一新鮮人面對 AI 時代 3 大關鍵能力：提問、批判與整合",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：大一新鮮人面對 AI 時代 3 大關鍵能力：提問、批判與整合，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：大一新鮮人面對 AI 時代 3 大關鍵能力：提問、批判與整合，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "強調：『答案越來越廉價，提問與批判思考能力反而變得無比昂貴！』",
    "discussionQuestionEn": "強調：『答案越來越廉價，提問與批判思考能力反而變得無比昂貴！』",
    "teachingNotes": "講授機器拿不走的勝出關鍵能力：1. **精準提問力 (Prompting)**：拆解複雜任務為子目標，引導 AI 給出最優解答；2. **批判思考力 (Critical Thinking)**：進行事實查證 (Fact-checking)，辨識幻覺與邏輯破綻；3. **跨領域整合力 (Cross-domain Synthesis)**：將財經、管理、資工與設計跨界結合，解決真實問題。\n\n【官方數據引述】： Harvard Business Review《AI 時代的核心人才能力》。",
    "visualType": "ai-22"
  },
  {
    "id": 23,
    "hour": 3,
    "category": "人機協作 ‧ 關鍵能力",
    "categoryEn": "Human-AI Teaming",
    "title": "邊緣 AI (Edge AI) 趨勢：AI PC 與 AI 智慧手機換機潮",
    "titleEn": "邊緣 AI (Edge AI) 趨勢：AI PC 與 AI 智慧手機換機潮",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：邊緣 AI (Edge AI) 趨勢：AI PC 與 AI 智慧手機換機潮，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：邊緣 AI (Edge AI) 趨勢：AI PC 與 AI 智慧手機換機潮，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提問：『離線狀態下在手機端直接執行 AI 任務，有什麼好處？（答案：極速響應、保護個人數據隱私、不需上傳雲端）』",
    "discussionQuestionEn": "提問：『離線狀態下在手機端直接執行 AI 任務，有什麼好處？（答案：極速響應、保護個人數據隱私、不需上傳雲端）』",
    "teachingNotes": "講授算力從雲端延伸至個人終端裝置的趨勢：AI PC 與 AI 智慧手機內建神經網絡處理單元 (NPU)，能在離線狀態下於筆電/手機端即時執行生成式 AI 任務。Apple Intelligence 與 Copilot+ PC 引爆全球終端換機潮，帶動華碩 (2357)、宏基與聯發科新一波成長。\n\n【官方數據引述】： IDC 全球 AI PC 出貨量市場報告。",
    "visualType": "ai-23"
  },
  {
    "id": 24,
    "hour": 3,
    "category": "人機協作 ‧ 關鍵能力",
    "categoryEn": "Human-AI Teaming",
    "title": "AI 時代個人資安防禦：防範 Deepfake 語音/影像複製詐騙",
    "titleEn": "AI 時代個人資安防禦：防範 Deepfake 語音/影像複製詐騙",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：AI 時代個人資安防禦：防範 Deepfake 語音/影像複製詐騙，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：AI 時代個人資安防禦：防範 Deepfake 語音/影像複製詐騙，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "警告：『接到親友緊急借錢電話或視訊，絕對要先掛斷，用原電話反查或問暗語！』",
    "discussionQuestionEn": "警告：『接到親友緊急借錢電話或視訊，絕對要先掛斷，用原電話反查或問暗語！』",
    "teachingNotes": "講授 Deepfake 防詐實務：詐騙集團利用 3 秒語音樣本複製親友聲音（AI 語音複製），或視訊通話看到親友臉孔（AI 換臉），要求緊急匯款。破解防詐 2 招：1. **設定家人專屬「防詐通關暗語」**；2. 掛斷電話後，**親自撥打原舊電話號碼重新反查確認！**\n\n【官方數據引述】： 內政部警政署 165 反詐騙專線 Deepfake 防詐指引。",
    "visualType": "ai-24"
  },
  {
    "id": 25,
    "hour": 3,
    "category": "人機協作 ‧ 關鍵能力",
    "categoryEn": "Human-AI Teaming",
    "title": "實證數據調取：NVIDIA 財報 (investor.nvidia.com) 實務查閱",
    "titleEn": "實證數據調取：NVIDIA 財報 (investor.nvidia.com) 實務查閱",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：實證數據調取：NVIDIA 財報 (investor.nvidia.com) 實，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：實證數據調取：NVIDIA 財報 (investor.nvidia.com) 實，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "演示進入 NVIDIA IR 網站查閱營收報告與投影片的步驟。",
    "discussionQuestionEn": "演示進入 NVIDIA IR 網站查閱營收報告與投影片的步驟。",
    "teachingNotes": "手把手教導學生登入 NVIDIA 官方 IR 網站：1. 登入 `investor.nvidia.com` 查閱季度財報中 Data Center 營收年增率 (YoY > 200%)；2. 追蹤全美四大雲端巨頭 (Microsoft, Amazon, Google, Meta) 的資本支出展望；3. 培養閱讀原版英文財報的數據能力。\n\n【官方數據引述】： NVIDIA Investor Relations (investor.nvidia.com)。",
    "visualType": "ai-25"
  },
  {
    "id": 26,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "大一新鮮人 AI 時代個人競爭力 4 大金律",
    "titleEn": "大一新鮮人 AI 時代個人競爭力 4 大金律",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：大一新鮮人 AI 時代個人競爭力 4 大金律，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：大一新鮮人 AI 時代個人競爭力 4 大金律，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "請學生齊聲朗讀四金律，建立擁抱 AI 的理性信念。",
    "discussionQuestionEn": "請學生齊聲朗讀四金律，建立擁抱 AI 的理性信念。",
    "teachingNotes": "總結 AI 時代 4 大金律：1. **積極擁抱 AI 成為超級個人**（融入日常學習理財，提升 300% 生產力）；2. **鍛鍊批判思考與查證能力**（對 AI 產出進行事實查證，嚴防幻覺）；3. **理性投資 AI 硬體賣鏟人**（優先布局半導體與 AI 伺服器龍頭）；4. **嚴防 Deepfake 複製詐騙**（設立家族防詐通關暗語）。\n\n【官方數據引述】： 金管會與 AI 科技倫理保護原則。",
    "visualType": "ai-26"
  },
  {
    "id": 27,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "學習實力試算實例：運用 AI 工具提升 300% 學習與理財 SOP",
    "titleEn": "學習實力試算實例：運用 AI 工具提升 300% 學習與理財 SOP",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：學習實力試算實例：運用 AI 工具提升 300% 學習與理財 SOP，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：學習實力試算實例：運用 AI 工具提升 300% 學習與理財 SOP，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "強調：『善用 AI SOP，大學四年你的學習與理財效率將超越同齡人 3 倍以上！』",
    "discussionQuestionEn": "強調：『善用 AI SOP，大學四年你的學習與理財效率將超越同齡人 3 倍以上！』",
    "teachingNotes": "展示大一新鮮人小明運用 AI 進行通識報告與理財試算實例：傳統人工方式閱讀書籍搜尋網頁耗時 15 小時；AI 協作 SOP（Perplexity 整理架構 + ChatGPT 跑 Python + Claude 生成內容）僅需 2 小時完成高品質報告！節省下來的 13 小時拿去打工賺錢或運動學習，效益極大化。\n\n【官方數據引述】： 115管理探索二教案 AI 生產力研究組。",
    "visualType": "ai-27"
  },
  {
    "id": 28,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "擁抱 AI 革命：成為駕馭 AI 的終身學習者與領航者",
    "titleEn": "擁抱 AI 革命：成為駕馭 AI 的終身學習者與領航者",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：擁抱 AI 革命：成為駕馭 AI 的終身學習者與領航者，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：擁抱 AI 革命：成為駕馭 AI 的終身學習者與領航者，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "激勵學生：『駕馭 AI 工具，開創屬於你的無限可能性未來！』",
    "discussionQuestionEn": "激勵學生：『駕馭 AI 工具，開創屬於你的無限可能性未來！』",
    "teachingNotes": "總結 AI 革命的終極價值：AI 是人類歷史上最強大的文明加速器。面對人工智慧時代，恐懼與抗拒毫無意義。大一新鮮人應以積極開放的心態，將 AI 視為個人智力的延伸，保持好奇心並堅守同理心與道德良知，成為駕馭 AI 的領航者！\n\n【官方數據引述】： 115學年度「管理探索二」核心價值。 本單元緊扣當前全球生成式 AI 產業革命脈動，引導大一學生建立理性、技術與商業並重之跨領域視野，掌握從底層晶片至終端應用的全景人機協作思維。",
    "visualType": "ai-28"
  },
  {
    "id": 29,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "第十四週全景知識體系圖與觀念整合",
    "titleEn": "第十四週全景知識體系圖與觀念整合",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：第十四週全景知識體系圖與觀念整合，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：第十四週全景知識體系圖與觀念整合，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "discussionQuestionEn": "引導學生回顧整週學習歷程，確認每一個節點均已融會貫通。",
    "teachingNotes": "以全景邏輯結構圖將第十四週 30 頁純教學卡片進行整體串聯：Hour 1 (GenAI突破 ➔ 3層產業結構 ➔ NVIDIA CUDA護城河 ➔ AI伺服器組裝 ➔ 水冷散熱 ➔ Gartner數據 ➔ 職場替代vs賦能) ➔ Hour 2 (Prompt 4要素 ➔ 學習理財AI實戰 ➔ 企業AI ROI ➔ 幻覺與著作權 ➔ 數據資安 ➔ 歐盟AI法案 ➔ 投資賣鏟人 ➔ 巨頭AI大戰 ➔ 台灣市占80%) ➔ Hour 3 (個人AI工作流 ➔ 大一3能力 ➔ Edge AI PC ➔ Deepfake防詐暗語 ➔ NVIDIA IR查閱 ➔ 300%效率SOP ➔ 4大金律)。\n\n【官方數據引述】： 115學年度「管理探索二」課程組全景圖。",
    "visualType": "ai-29"
  },
  {
    "id": 30,
    "hour": 3,
    "category": "金律實踐 ‧ 總結展望",
    "categoryEn": "Golden Rules & Summary",
    "title": "學習反思與第十五週預告 (綠色金融、ESG 永續投資與碳定價經濟學)",
    "titleEn": "學習反思與第十五週預告 (綠色金融、ESG 永續投資與碳定價經濟學)",
    "subtitle": "深度解析生成式 AI 產業鏈價值流動、企業 ROI 與大專生人機協作核心競爭力",
    "subtitleEn": "Exploring GenAI value chain, enterprise ROI, and human-AI workforce transformation",
    "quickTakeaways": [
      "核心重點：學習反思與第十五週預告 (綠色金融、ESG 永續投資與碳定價經濟學)，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "quickTakeawaysEn": [
      "核心重點：學習反思與第十五週預告 (綠色金融、ESG 永續投資與碳定價經濟學)，掌握大語言模型與算力硬體在智慧時代的關鍵地位。",
      "產業實證：分析 NVIDIA、台積電與伺服器ODM台廠的實質護城河與變現模式。",
      "行動決策：善用精準 Prompt 與批判性查核，將 AI 融入日常學習打造成超級個人。"
    ],
    "discussionQuestion": "提醒學生課後完成作業提交，並預習第十五週綠色金融與 ESG 主題。",
    "discussionQuestionEn": "提醒學生課後完成作業提交，並預習第十五週綠色金融與 ESG 主題。",
    "teachingNotes": "恭喜學生完成第十四週學習！指導學生點擊 navbar 上方的「📝 本週課堂作業」按鈕，線上填寫並提交「個人 AI 工具協作與未來職場轉型報告」。預告第十五週課程主題：「綠色金融、ESG 永續投資與碳定價經濟學」，下週將帶大家探索 ESG 三大柱、碳費與綠色金融！\n\n【官方數據引述】： 115學年度「管理探索二」課程計畫。",
    "visualType": "ai-30"
  }
];
