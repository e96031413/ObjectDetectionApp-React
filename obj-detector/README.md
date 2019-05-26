# 手機即時影像辨識APP：使用TensorFlow.js和React

### 安裝

```
npx create-react-app obj-detector
cd obj-detector
npm install @tensorflow/tfjs @tensorflow-models/coco-ssd
```

### 程式

```
// 到"obj-detector/src/"資料夾 
// 開啟App.js，將程式碼更換為下方網址內寫的React程式

https://medium.com/r/?url=https%3A%2F%2Ftowardsdatascience.com%2Fturning-your-mobile-phone-camera-into-an-object-detector-on-your-own-1428055b8e01

/*更換App.css的內容如下*/
.app-position {
  position: fixed;
  margin: auto;
}
```

### 佈署

```
npm start
#開啟以下網址查看APP
http://localhost:3000/
```

### 在手機上開

[**使用ngrok讓外網裝置執行電腦Localhost佈署的APP**
*如何從外網連到本地的localhost*medium.com](https://medium.com/@yanweiliu/使用ngrok讓外網裝置執行電腦localhost佈署的app-c60e78e95601)

```
#開啟ngrok.exe後，輸入下方指令後會產生一串網址，將該網址於手機上開啟即可
#手機須使用Chrome開啟
ngrok http 3000
```

https://towardsdatascience.com/turning-your-mobile-phone-camera-into-an-object-detector-on-your-own-1428055b8e01

