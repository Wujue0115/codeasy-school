# codeasy-school ![GitHub top language](https://img.shields.io/github/languages/top/Wujue0115/codeasy-school) ![GitHub language count](https://img.shields.io/github/languages/count/wujue0115/codeasy-school) ![GitHub](https://img.shields.io/github/license/wujue0115/codeasy-school)

## Description
codeasy school 是一個提供程式教師資訊的實作練習網頁。
透過 [https://mocki.io/](https://mocki.io/) 新增一個能取得教師資訊列表 API，再串接此 API 取得教師資訊，呈現於網頁中。

### Reference
- 網頁 favicon 取自 <a target="_blank" href="https://icons8.com/icon/xl9eZco6hYkD/programming">Programming</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

## Live demo
[https://codeasy-school.wujue.dev/](https://codeasy-school.wujue.dev/)

## Installation
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Accomplishment

&#9989; &nbsp; 使用 Nuxt 開發專案 <br>
&#9989; &nbsp; 以 SCSS 撰寫內容樣式 <br>
&#9989; &nbsp; 應用 component 功能 <br>
&#9989; &nbsp; 應用 computed 功能 <br>
&#9989; &nbsp; 製作輸入類型 text、radio、select，同一 component 切換 prop 來改變對應的輸入類型，並套用 v-model <br>
&#9989; &nbsp; 可切換頁面 <br>
&#9989; &nbsp; 設定 Global 參數讓頁面的顏色主題會隨著更換 <br>
&#9989; &nbsp; 串接一組列表資料 API <br>
&#9989; &nbsp; 程式架構做到最大的沿用性、維護性，並撰寫 Readme <br>
&#9989; &nbsp; 部署至 Firebase Hosting <br>
&#9989; &nbsp; 提供 Github 程式碼 <br>

## Detailed description
此節將描述專案的設計構想，包括後續的維護和沿用構思。

### Main project structure
```
.
├── apis
│   └── teacher-api.js
├── assets
│   └── css
│       ├── main.scss
│       ├── mixins.scss
│       └── variables.scss
├── components
│   ├── search-condition-pane.vue
│   └── teacher-card.vue
├── layouts
│   └── default.vue
├── pages
│   ├── index.vue
│   └── search.vue
├── store
│   └── index.js
└── utils
    └── lcs.js
```

### Entry point (./pages/index.vue)
<img width="600" alt="image" src="https://user-images.githubusercontent.com/56119287/229328506-507c91b4-262a-4a40-b362-91f3575ede00.png"> &nbsp; <img height="305" alt="image" src="https://user-images.githubusercontent.com/56119287/229333738-53e3b229-907e-4952-bbe8-c8b4ca0afe60.png">

網頁首頁切分成左右兩部分，考慮到 RWD，因此將手機和平板切分成上下兩部分。<br>
點擊 Start 按鈕會跳至搜尋教師頁面。

### Header and Footer (./layouts/default.vue)
<img width="765" alt="image" src="https://user-images.githubusercontent.com/56119287/229328847-81f7b7d8-f0f4-4b07-b08c-99003facc5ed.png">

<img width="765" alt="image" src="https://user-images.githubusercontent.com/56119287/229394638-06d94b68-aa87-4401-9031-a7ee44d86490.png">

將 Header 和 Footer 放在 layouts 檔案中，之後若新增其他頁面可以直接套用，不需在每一個頁面都寫一遍。<br>

#### Theme color
  - 在 Header 上提供四種主題顏色如下圖，依序為綠色、藍色、橙色、紫色。
  
    <img height="30" alt="image" src="https://user-images.githubusercontent.com/56119287/229336497-60253649-fdb8-41b7-aee5-b7be7a2b0168.png"><br>
    
    <img width="600" alt="image" src="https://user-images.githubusercontent.com/56119287/229339665-f87c37d4-ab4d-4bd9-bbb6-b7499ae8ede4.png">
     
    <img width="600" alt="image" src="https://user-images.githubusercontent.com/56119287/229339688-6e63baa2-7e17-4608-8262-72c8d0aeffd4.png">
    
    <img width="600" alt="image" src="https://user-images.githubusercontent.com/56119287/229339713-83b734b8-1271-4058-ba45-f71bcd9bd0e5.png">

    <img width="600" alt="image" src="https://user-images.githubusercontent.com/56119287/229339718-04eaa801-4467-4fb7-80e0-776a334b961d.png">
    
  - 透過 global variable 設定不同主題顏色 class，再使用 Vuex 控制主題狀態
  - 若是需增加主題，只要在 ./assets/css/variable.scss 中按照格式 (如下圖) 撰寫主題顏色，接著在 Header 的頁面 (./layouts/default.vue) 增加顏色資料即可直接套用。
  
     <img width="300" alt="image" src="https://user-images.githubusercontent.com/56119287/229336787-8056dfab-3f0e-41f8-8b61-7d1a6425980d.png">

### Search Page (./pages/search.vue)
<img width="600" alt="image" src="https://user-images.githubusercontent.com/56119287/229329191-d05f34a6-2d8b-4206-a91d-098f797784f6.png"> &nbsp; <img height="305" alt="image" src="https://user-images.githubusercontent.com/56119287/229333858-569fbd08-c829-473f-a41b-ebf035afb37e.png">

搜尋頁面切分成上下區塊。上方區塊為搜尋版面，透過 text、radio、select 分別提供使用者不同的搜尋過濾條件 (搜尋內容文字、性別、上課地區)。下方區塊為教師資訊版面，透過 computed 將 API 取得的教師列表資料處理成對應資訊內容，並根據搜尋條件過濾資料。

#### Search Condition Pane (./components/search-condition-pane.vue)
  - 將各種搜尋條件類型包裝進這個 component，透過 props 可以改變不同類型 (text、radio、select)。
  - 另外可透過 v-model 雙向綁定資料，當使用者更改搜尋條件時，父層 component 會依據新搜尋條件過濾顯示資料。
  - 考慮到可能需綁定其他屬性到類型上 (例如：placeholder)，因此用 mainProps 直接綁定到類型上，增加擴充性。
  - 下圖範例是 input 為 text 的基本資料屬性。
  
    <img width="350" alt="image" src="https://user-images.githubusercontent.com/56119287/229329848-825d0a41-f34a-4a74-96f2-f185125bab7d.png">
  
  - 後續如需增加更多類型 (例如：checkbox)，可以繼續在此 component 中製作。若是類型種類過多，可考慮將每個類型切分為獨立的 component，然後再 import 到此檔案中統一管理。

#### Teacher Card (./components/teacher-card.vue)
  - 將單一教師資訊版面包裝成 component，方便使用。
  - 透過 slot 讓大部分教師資料不需用 props 傳遞到此 component，此 component 只需負責樣式的呈現和 rating star 資料處理，易於維護。
  - 以下為 HTML structure of teacher card，後續可以繼續新增教師其他欄位資訊 (例如：聯絡方式)，或是增加教師頁面連結按鈕。
  
    <img width="500" alt="image" src="https://user-images.githubusercontent.com/56119287/229335051-2a38d35e-46b4-4aa1-be2a-ef4690ee15f8.png">
    
#### Search text function optimization
  - 在搜尋文字功能上進行特別處理，盡可能過濾出相關教師資訊。
  - 搜尋文字可用 " " 或 "," 切分，例如 "script, python"，將會裁切成 "script" 和 "python"，只要任一個配對到資料內容皆會顯示該資料。
  - 透過 [LCS algorithm](https://web.ntnu.edu.tw/~algo/Subsequence2.html) 允許搜尋文字不完整時也能盡量配對到資料，例如："pyhn" 可以配對到 python 相關的資料。
  - 只要 LCS 長度 >= 搜尋內容長度 * 0.8 皆能配對資料，允許部分搜尋文字有錯誤時也能盡量配對到資料，例如："puthon" 可以配對到 python 相關的資料。
  
### apis and utils directories
  - apis 資料夾將有串接的 api 進行統一管理，在 fetch 接收完資料後處理並回傳特定格式資料 (例如：JSON)。
  - utils 資料夾存放自己寫的額外功能檔案 (例如：此專案所用的 LCS 演算法)。
  
## License
[MIT](https://github.com/Wujue0115/codeasy-school/blob/master/license)



