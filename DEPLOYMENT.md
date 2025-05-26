# 永恆紀念園網站部署指南

## 部署前準備清單

### 1. Formspree 表單服務設置
1. 前往 [Formspree.io](https://formspree.io/) 註冊帳號
2. 創建新表單項目
3. 獲取表單 ID（格式：xpzkxxxx）
4. 替換以下文件中的 `YOUR_FORMSPREE_ID`：
   - `index.html` 第 169 行：`action="https://formspree.io/f/YOUR_FORMSPREE_ID"`
   - `js/main.js` 第 207 行：`const formspreeUrl = 'https://formspree.io/f/YOUR_FORMSPREE_ID';`

### 2. 圖片文件檢查
確保以下圖片文件存在（目前為空白佔位文件）：
- `img/garden.jpg` - 關於我們區域的園區圖片
- `img/memorial1.jpg` 到 `img/memorial6.jpg` - 紀念區展示圖片
- `img/favicon.ico` - 網站圖標

### 3. 域名設置
如果使用自定義域名，請更新以下位置的 URL：
- `index.html` 中的所有 `https://www.eternalmemorial.tw` 引用
- `sitemap.xml` 中的所有 URL

## GitHub Pages 部署步驟

### 方法一：通過 GitHub 網頁界面
1. 登錄 GitHub 並創建新倉庫
2. 將所有文件上傳到倉庫根目錄
3. 前往倉庫設置 (Settings)
4. 滾動到 "Pages" 部分
5. 在 "Source" 下選擇 "Deploy from a branch"
6. 選擇 "main" 分支和 "/ (root)" 文件夾
7. 點擊 "Save"

### 方法二：通過 Git 命令行
```bash
# 在項目根目錄執行
git init
git add .
git commit -m "Initial commit: 永恆紀念園網站"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

然後在 GitHub 倉庫設置中啟用 Pages。

## 其他部署選項

### Netlify 部署
1. 前往 [Netlify.com](https://netlify.com)
2. 將整個項目文件夾拖拽到部署區域
3. 網站將自動部署並獲得臨時域名

### Vercel 部署
1. 前往 [Vercel.com](https://vercel.com)
2. 連接 GitHub 倉庫或直接上傳文件
3. 網站將自動部署

## 部署後檢查清單

- [ ] 網站在各種設備上正常顯示（桌面、平板、手機）
- [ ] 所有導航連結正常工作
- [ ] 圖片正確載入（或顯示適當的佔位元素）
- [ ] 表單能夠正常提交（需要 Formspree ID）
- [ ] 滑動輪播正常運作
- [ ] 紀念區篩選功能正常
- [ ] 紀念區搜尋功能正常運作（即時搜尋、清除按鈕、結果統計）
- [ ] 網站載入速度良好
- [ ] SEO 標籤正確設置

## 維護和更新

### 添加新的紀念項目
編輯 `js/main.js` 文件中的 `memorialData` 陣列，添加新項目：

```javascript
{
    id: 7,
    name: "新項目名稱",
    description: "項目描述",
    image: "img/memorial7.jpg",
    category: "family" // 或 "individual" 或 "memorial"
}
```

### 更新聯絡資訊
編輯 `index.html` 文件中的聯絡資訊部分。

### 修改樣式
編輯 `css/style.css` 文件來調整網站外觀。

## 故障排除

### 常見問題
1. **表單無法提交**: 確認 Formspree ID 設置正確
2. **圖片不顯示**: 檢查圖片文件路徑和格式
3. **手機版排版問題**: 檢查 CSS 響應式設計規則
4. **JavaScript 功能失效**: 檢查瀏覽器控制台錯誤信息

### 技術支持
如遇到技術問題，請檢查：
- 瀏覽器開發者工具控制台錯誤
- 網路連線狀態
- CDN 資源載入狀態

## 效能優化建議

1. **圖片優化**: 使用適當尺寸和格式的圖片（建議 WebP 格式）
2. **快取設置**: 在伺服器端設置適當的快取標頭
3. **CDN 使用**: 考慮使用 CDN 加速靜態資源載入
4. **代碼壓縮**: 在生產環境中壓縮 CSS 和 JavaScript 文件

## 更新日誌

- **2025-05-26（下午）**: 完成紀念區搜尋功能實作，包括即時搜尋、結果統計、清除搜尋等功能
- **2025-05-26**: 完成響應式設計優化、表單改善、SEO 優化
- **2025-05-23**: 添加基本網站功能和樣式
- **2025-05-22**: 創建初始網站架構
