/**
 * 115學年度「管理探索二」第十四週互動活動資料庫
 * 單元名稱：生成式 AI 革命、人工智慧產業鏈與未來職場轉型
 */

const W14_AI_ROI_PRESETS = {
  "marketing_team": {
    "title": "行銷與電商企劃團隊 (30 人)",
    "employees": 30,
    "aiCostPerMonth": 30,
    "hoursSavedDaily": 2.0,
    "hourlyWage": 320,
    "usdFx": 32.0,
    "diagnosis": "每月總 AI 軟硬體成本約 2.88 萬台幣，但每人每天節省 2 小時文案與素材產出，全團隊每月節省工時價值高達 42.2 萬台幣！月淨效益達 39.3 萬台幣，年化 ROI 超過 1,360%！"
  },
  "rnd_data_team": {
    "title": "軟體研發與數據團隊 (50 人)",
    "employees": 50,
    "aiCostPerMonth": 40,
    "hoursSavedDaily": 2.5,
    "hourlyWage": 600,
    "usdFx": 32.0,
    "diagnosis": "每月總成本約 6.4 萬台幣，但在 GitHub Copilot 等工具輔助下代碼生產力暴增，每月創造的工時價值突破 165 萬台幣！月淨效益高達 158.6 萬台幣，投資回收期少於 2 週！"
  },
  "admin_support_team": {
    "title": "行政庶務與客服團隊 (100 人)",
    "employees": 100,
    "aiCostPerMonth": 25,
    "hoursSavedDaily": 1.0,
    "hourlyWage": 250,
    "usdFx": 32.0,
    "diagnosis": "每月總成本 8.0 萬台幣，自動化處理繁瑣票據、會議紀錄與常見客服問答，月節省工時價值達 55 萬台幣。月淨效益約 47 萬台幣，大幅降低員工重複性疲勞與錯誤率。"
  }
};

const W14_AI_CHAIN_PRESETS = {
  "private_cloud_heavy": {
    "title": "私有算力重硬體建置型 (預算 500 萬)",
    "totalBudget": 500,
    "hardwareRatio": 55,
    "cloudRatio": 15,
    "modelRatio": 15,
    "appRatio": 15,
    "advice": "重硬體自建 GPU 伺服器機房模式。優點為保護高度敏感金融或醫療商業機密，但需承擔高額設備折舊與維護電費。適合高度監管之大型企業。"
  },
  "cloud_api_agile": {
    "title": "雲端 API 敏捷落地型 (預算 200 萬)",
    "totalBudget": 200,
    "hardwareRatio": 10,
    "cloudRatio": 35,
    "modelRatio": 30,
    "appRatio": 25,
    "advice": "輕資產模式。直接呼叫 OpenAI / Anthropic 等頂尖大模型 API，按用量計費。資本開銷極低且能即時使用全球最新模型，適合中小企業與創新團隊。"
  },
  "vertical_enterprise": {
    "title": "垂直產業領域微調型 (預算 350 萬)",
    "totalBudget": 350,
    "hardwareRatio": 20,
    "cloudRatio": 25,
    "modelRatio": 25,
    "appRatio": 30,
    "advice": "專注於企業私有數據微調 (Fine-tuning) 與員工培訓。將通用大模型轉化為企業內部專屬智庫，垂直應用變現價值最為深厚。"
  }
};

const W14_GAME_QUESTIONS = [
  {
    "id": 1,
    "level": 1,
    "badge": "第 1 關 ‧ 生成式 vs 判別式 AI",
    "title": "情境：理解大語言模型 (LLM) 的本質革命",
    "scenario": "大一學生在課堂討論生成式 AI (Generative AI) 與傳統機器學習 (判別式 AI) 的核心差異。下列哪一項描述最準確體現了生成式 AI 的根本突破？",
    "options": [
      {
        "text": "A. 傳統 AI 只能進行分類與數值預測 (如判斷垃圾郵件)，生成式 AI 則具備自主創造全新文本、代碼、圖像甚至音樂的能力",
        "isCorrect": true,
        "feedback": "🎉 完全正確！生成式 AI 基於 Transformer 機制學習巨量人類語言規律，具備強大的『自主生成與跨模態創造』能力！"
      },
      {
        "text": "B. 生成式 AI 完全不依賴任何數據訓練，是外星科技直接注入的意識",
        "isCorrect": false,
        "feedback": "❌ 錯誤！生成式 AI 本質是吸納人類數萬億單詞數據後訓練出的深層神經網路模型。"
      },
      {
        "text": "C. 傳統 AI 運算速度比生成式 AI 快 100 萬倍，因此生成式 AI 即將被淘汰",
        "isCorrect": false,
        "feedback": "❌ 錯誤！生成式 AI 正在席捲全球各行各業，帶來生產力質的飛躍。"
      },
      {
        "text": "D. 生成式 AI 只能做加減乘除小學數學計算，無法理解自然語言",
        "isCorrect": false,
        "feedback": "❌ 錯誤！大語言模型擅長語意理解、推理論證、跨語言翻譯與多輪複雜對話。"
      }
    ]
  },
  {
    "id": 2,
    "level": 2,
    "badge": "第 2 關 ‧ NVIDIA CUDA 護城河",
    "title": "情境：輝達在 AI 算力晶片領域的絕對壟斷",
    "scenario": "許多晶片大廠 (如 AMD、Intel、各雲端大廠 ASIC) 紛紛推出號稱硬體規格極高的 AI 晶片，但目前全球 90% 以上的大模型開發者依然非 NVIDIA GPU 不可。NVIDIA 最難以被跨越的軟體護城河是什麼？",
    "options": [
      {
        "text": "A. NVIDIA 成立了免費送晶片的慈善機構",
        "isCorrect": false,
        "feedback": "❌ 錯誤！NVIDIA 晶片售價高昂且供不應求，毛利率超過 75%！"
      },
      {
        "text": "B. 耕耘近 20 年的 CUDA 平行運算軟體架構與全球數百萬開發者生態系綁定",
        "isCorrect": true,
        "feedback": "🎉 登峰造極！完全正確！CUDA 讓所有頂尖 AI 論文、PyTorch/TensorFlow 模型與驅動深度綁定在 NVIDIA 晶片上，轉換軟體生態的遷移成本極度巨大！"
      },
      {
        "text": "C. 美國法律明文規定禁止任何公司購買 AMD 晶片",
        "isCorrect": false,
        "feedback": "❌ 錯誤！市場競爭遵循自由商業原則，AMD 與其他晶片皆可合法採購。"
      },
      {
        "text": "D. NVIDIA 晶片使用的電晶體比一般晶片大 100 倍",
        "isCorrect": false,
        "feedback": "❌ 錯誤！NVIDIA 採用台積電 4nm/3nm 極限微縮先進製程。"
      }
    ]
  },
  {
    "id": 3,
    "level": 3,
    "badge": "第 3 關 ‧ 企業導入 ROI 與成本控制",
    "title": "情境：企業引進 AI 工具的理性決策評估",
    "scenario": "某跨國企業打算為 200 位行銷與財務員工採購每人每月 30 美元的 AI Copilot 工具。身為管理分析師，你如何客觀衡量這項 AI 投資是否值得？",
    "options": [
      {
        "text": "A. 只要看到競爭對手買，就盲目跟風買單，完全不需要評估產出與效益",
        "isCorrect": false,
        "feedback": "❌ 錯誤！缺乏效益衡量的盲目導入，往往淪為軟體授權浪費的財務黑洞！"
      },
      {
        "text": "B. 計算節省員工撰寫報告與數據處理工時所折合的薪資價值，扣除訂閱費後若淨效益顯著且人均產能提升，即為高度值得的投資",
        "isCorrect": true,
        "feedback": "🎉 完全正確！AI ROI = (每月節省工時總價值 - 訂閱授權成本) ÷ 總建置成本。每人每月僅需節省 2-3 小時工時即可輕鬆打平 30 美元成本！"
      },
      {
        "text": "C. 購買 AI 工具的唯一目的就是立刻開除 90% 的員工",
        "isCorrect": false,
        "feedback": "❌ 錯誤！現代企業導入 AI 是為了『人機協作 (Human-AI Teaming)』賦能員工完成更高價值任務，而非單純裁員。"
      },
      {
        "text": "D. 任何付費軟體都不應該購買，只用完全免費工具即可",
        "isCorrect": false,
        "feedback": "❌ 錯誤！免費工具通常有嚴重的數據隱私外洩風險與功能限制，不利於企業級營運。"
      }
    ]
  },
  {
    "id": 4,
    "level": 4,
    "badge": "第 4 關 ‧ 文組商管人機協作競爭力",
    "title": "情境：面對 AI 自動化浪潮，大專生的不可替代性",
    "scenario": "有人宣稱：『生成式 AI 能秒寫文案、繪圖、寫程式，以後文法商管科系通通要失業！』針對這項焦慮，現代管理學與前瞻職場專家給出的最權威觀點是什麼？",
    "options": [
      {
        "text": "A. 徹底放棄學習，直接躺平不再接觸任何數位工具",
        "isCorrect": false,
        "feedback": "❌ 錯誤！消極抗拒只會被浪潮無情淘汰。"
      },
      {
        "text": "B. AI 不會直接取代人，但懂的使用 AI 進行批判思考、精準提問與跨領域整合的人，將迅速取代不會使用 AI 的人！",
        "isCorrect": true,
        "feedback": "🎉 完美通關！頂級視野！機器越普及，提問能力、批判性查核、道德判斷、同理心與商業洞察力反而越發珍貴！"
      },
      {
        "text": "C. 所有人必須立刻轉系去重念資工系，否則完全沒有出路",
        "isCorrect": false,
        "feedback": "❌ 錯誤！AI 時代更需要懂商業邏輯、法律規範、客戶心理與跨文化溝通的多元人才！"
      },
      {
        "text": "D. 相信 AI 給出的所有數據都是絕對真理，不需要人工查證",
        "isCorrect": false,
        "feedback": "❌ 錯誤！AI 經常產生『幻覺 (Hallucination)』，缺乏人類專業查核將導致致命決策錯誤！"
      }
    ]
  }
];

const W14_HOMEWORK_TEMPLATE = {
  "studentName": "張語婕",
  "studentId": "B11307085",
  "targetPlan": "生成式 AI 產業鏈分析與商管個人人機協作職涯轉型計畫",
  "dim1Inventory": "【從底層晶片至頂層應用之 AI 產業鏈價值分配分析】：\n1. 基礎設施層 (硬體算力)：NVIDIA (GPU)、台積電 (3nm/CoWoS)、廣達/緯創 (AI 伺服器代工) 與奇鋐 (水冷散熱)。此層享有目前 AI 浪潮最確定的『賣鏟人』現金流紅利，毛利率與營收爆發力最強。\n2. 模型層 (大語言模型)：OpenAI (GPT-4o)、Anthropic (Claude 3.5)、Google (Gemini) 與 Meta (Llama 開源生態)。此層研發成本極高，面臨激烈模型參數軍備競賽。\n3. 應用層 (企業與垂直軟體)：微軟 Copilot、Canva、Salesforce 以及各領域專有 AI Agent。長期而言，誰能真正解決終端客戶痛點並實現高效 ROI，誰就能掌握產業鏈最終定價權。",
  "dim2CashFlow": "【企業導入生成式 AI 之 ROI 成本效益評估】：\n1. 成本結構：每人每月 30 美元 (約 NT$ 960 元) 之 Copilot 企業版訂閱費，年化每人成本約 1.15 萬元。\n2. 效益量化：以商管分析師平均月薪 4.5 萬元 (時薪約 280 元) 計算，若每日藉由 AI 整理財報、撰寫郵件與生成簡報節省 1.5 小時，每月節省工時價值達 9,240 元。\n3. 淨效益與結論：月淨效益為 NT$ 8,280 元，年化 ROI 高達 862%！實證顯示只要妥善培訓員工使用 Prompt，導入 AI 具備極強的財務正向回報。",
  "dim3ReserveDebt": "【大學四年文組/商管學生人機協作核心競爭力培養方案】：\n1. 打造個人 AI 自動化工作流：落實『Perplexity 蒐集文獻 ➔ Claude 深度架構分析 ➔ GPT 程式與數據微調 ➔ 人工批判性驗證』的高效閉環。\n2. 強化機器無法取代的三大軟實力：\n   - 精準提問力 (Prompting)：學會將模糊商業問題拆解為清晰參數條件。\n   - 批判性查核力 (Critical Inquiry)：對所有 AI 產出維持懷疑態度，嚴格交叉驗證數據真實性。\n   - 跨領域整合力 (Integration)：結合商管理論、心理學與科技工具，創造獨特商業洞見。\n3. 數位履歷亮點：大學四年累積 3-5 個具備 AI 協作驗證之專案作品集 (Portfolio)，提升職場議價能力。",
  "dim4FireRoadmap": "【AI 幻覺防範、數據資安與著作權倫理規範落地 SOP】：\n1. 防範幻覺查核 SOP：禁止直接採用 AI 引用之法條與數據，一律利用 Google、政府機關官方網站或 MOPS 重訊進行二次實證對照。\n2. 數據隱私防線：嚴格禁止將個人身分證號、銀行帳號或企業未公開財報原始碼輸入公共免費版 AI 模型；在企業內部落實專用隔離沙盒。\n3. 著作權與透明揭露：產出之學術報告或商業專案若有 AI 協作成分，遵循歐盟 AI 法案與國際學術倫理規範，主動誠實標註提示詞與工具版本，確保學術與商業誠信。",
  "conclusionGrade": "A+ (全面且具備實戰避險可行性)",
  "decisionSummary": "擁抱生成式 AI 革命，認清硬體賣鏟人至終端應用的價值鏈流向；拒絕盲目恐慌，以批判思考與人機協作工作流為槓桿，將 AI 轉化為大學四年與未來職場躍升的強大超能力。"
};
