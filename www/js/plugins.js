// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
    [
        { "name": "Community_Basic", "status": true, "description": "基本的なパラメーターを設定するプラグインです。", "parameters": { "cacheLimit": "20", "screenWidth": "816", "screenHeight": "624", "changeWindowWidthTo": "", "changeWindowHeightTo": "", "renderingMode": "auto", "alwaysDash": "off" } },
        { "name": "DTextPicture", "status": true, "description": "動的文字列ピクチャ生成プラグイン", "parameters": { "itemIconSwitchId": "0", "lineSpacingVariableId": "0", "frameWindowSkin": "", "frameWindowPadding": "18", "padCharacter": "0", "prefixText": "" } },
        { "name": "MPP_MapLight", "status": true, "description": "マップの明るさを設定できるようにします。", "parameters": { "Light Colors": "[\"255,255,255\",\"192,128,64\",\"32,32,32\"]", "Front Light": "{\"Radius\":\"6\",\"Angle\":\"90\",\"Oy\":\"4\",\"Turn Duration\":\"24\"}", "Darkness Size": "3" } },
        { "name": "MessageSkip", "status": true, "description": "メッセージスキッププラグイン", "parameters": { "スキップキー": "control", "オートキー": "shift", "スキップスイッチ": "0", "オートスイッチ": "0", "スキップアイコン": "140", "オートアイコン": "75", "アイコンX": "0", "アイコンY": "0", "押し続けスキップ": "true", "オート待機フレーム": "100 + textSize * 10", "終了解除スイッチID": "0", "スキップピクチャ": "", "スキップピクチャX": "500", "スキップピクチャY": "0", "オートピクチャ": "", "オートピクチャX": "750", "オートピクチャY": "0", "スイッチピクチャ": "", "スイッチピクチャトリガー": "0", "スイッチピクチャX": "750", "スイッチピクチャY": "0", "ボタン原点": "0", "ボタン表示スイッチID": "0", "ピクチャ座標タイプ": "relative", "無効化スイッチ": "0" } },
        { "name": "ApngPicture", "status": true, "description": "APNGピクチャプラグイン", "parameters": { "PictureList": "[\"{\\\"FileName\\\":\\\"anime kazumi miya1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage hagu\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage munemomi1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage munemomi2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki shitagi1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki shitagi2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki shitagi3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage huxera1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage huxera2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage huxera3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage miya onani\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tekoki4\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage tintyu1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage yotunbaimomi1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage yotunbaimomi2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage yotunbaimomi3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage kiss1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage kiss2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage kiss3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage kiss4\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage kiss5\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage 69 1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage 69 2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage 69 3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"a cage 69 4\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d4\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d5\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d6\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d7\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d8\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d9\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d10\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d11\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d12\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d13\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d14\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d15\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d16\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d17\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d18\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d19\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d20\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d21\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d22\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d23\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d24\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d25\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d26\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d27\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d28\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d29\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d30\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d31\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d32\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d33\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d34\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d35\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d36\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d37\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d38\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d39\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd1\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd2\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd3\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd4\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd5\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd6\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd7\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd8\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd9\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd10\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd11\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd12\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd13\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd14\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd15\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd16\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd17\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd18\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd19\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd20\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd21\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd22\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd23\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd24\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd25\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd26\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd27\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd28\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　hd29\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d40\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\",\"{\\\"FileName\\\":\\\"shimoyama kage　d41\\\",\\\"CachePolicy\\\":\\\"0\\\",\\\"LoopTimes\\\":\\\"0\\\",\\\"StopSwitch\\\":\\\"0\\\"}\"]", "EnemyList": "[]", "SideEnemyList": "[]", "SceneApngList": "[]", "DefaultLoopTimes": "0", "StopLastFrame": "false", "AllStopSwitch": "0", "FrameCount": "0" } },
        { "name": "PixiApngAndGif", "status": true, "description": "", "parameters": {} },
        { "name": "MPP_MapLight", "status": true, "description": "マップの明るさを設定できるようにします。", "parameters": { "Light Colors": "[\"163,73,164\",\"192,128,64\",\"32,32,32\"]", "Front Light": "{\"Radius\":\"6\",\"Angle\":\"90\",\"Oy\":\"4\",\"Turn Duration\":\"24\"}", "Darkness Size": "3" } },
        { "name": "MPP_MapLight_Op2", "status": true, "description": "リージョンでそのタイルの明るさが変わります。", "parameters": { "Light Level 1 Regions": "1-3", "Light Level 2 Regions": "2", "Light Level 3 Regions": "3", "Light Level 4 Regions": "4", "Light Level 5 Regions": "5", "Light Level 6 Regions": "6", "Light Level 7 Regions": "7" } },
        { "name": "TMAnimeLight", "status": true, "description": "イベントにアニメーション付きの明かりを表示します。", "parameters": { "range": "0.05", "defaultZ": "4", "frames": "100" } },
        { "name": "EventInformation", "status": true, "description": "イベントの頭上に文字を表示したい時に使います", "parameters": {} },
        { "name": "Lunatlazur_ToggleableMessageVisibility (1)", "status": true, "description": "メッセージウィンドウ表示切り替えプラグイン", "parameters": {} },
        { "name": "MessageWindowHidden", "status": false, "description": "メッセージウィンドウ一時消去プラグイン", "parameters": { "triggerButton": "[\"右クリック\"]", "triggerSwitch": "0", "linkPictureNumbers": "[]", "linkShowPictureNumbers": "[]", "disableLinkSwitchId": "0", "disableSwitchId": "0", "disableInBattle": "false", "disableInChoice": "true", "restoreByDecision": "false" } },
        { "name": "BackUpDatabase", "status": true, "description": "データバックアッププラグイン", "parameters": { "backUpPath": "/backup", "includeSave": "false", "timeUnit": "false" } },
        { "name": "PictureCallCommon", "status": true, "description": "ピクチャのボタン化プラグイン", "parameters": { "透明色を考慮": "true", "ピクチャ番号の変数番号": "0", "ポインタX座標の変数番号": "0", "ポインタY座標の変数番号": "0", "タッチ操作抑制": "false", "タッチ操作抑制スイッチ": "0", "戦闘中常にコモン実行": "false", "並列処理として実行": "false", "無効スイッチ": "0" } },
        { "name": "YEP_MessageCore", "status": false, "description": "メッセージの表示方法や機能をカスタマイズすることができます。", "parameters": { "---一般---": "", "Default Rows": "4", "Default Width": "Graphics.boxWidth", "Face Indent": "Window_Base._faceWidth + 24", "Fast Forward": "Input.isPressed('pagedown')", "Word Wrapping": "false", "Description Wrap": "false", "---フォント---": "", "Font Name": "GameFont", "Font Size": "28", "Font Size Change": "12", "Font Changed Max": "96", "Font Changed Min": "12", "---Name Box---": "", "Name Box Buffer X": "-28", "Name Box Buffer Y": "0", "Name Box Padding": "this.standardPadding() * 4", "Name Box Color": "0", "Name Box Clear": "false", "Name Box Added Text": "\\c[6]" } },
        { "name": "Lunatlazur_ActorNameWindow", "status": true, "description": "名前ウィンドウ表示プラグイン", "parameters": { "テキストカラー": "1" } },
        { "name": "Lunatlazur_BackLog", "status": true, "description": "バックログ表示プラグイン", "parameters": { "2カラムレイアウト": "する" } },
        { "name": "Yami_SkipTitle", "status": false, "description": "テストプレイ用にタイトルシーンを飛ばすことができます。", "parameters": {} }
    ];