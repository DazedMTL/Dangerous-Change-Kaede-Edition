(function () {

    //================
    // Copyright (c) 2016 Ponidog /ぽに犬
    // This plugin is released under the MIT License.
    // http://opensource.org/licenses/mit-license.php
    //===============
    //バックログを表示するプラグインですばい。
    //メッセージウィンドウに渡すtextを別途保存してそれを表示させてます。
    //   という基本機能の上に色々ぶっこんでいます。
    // MVverはYep_coreEngine が必要な様子です。
    //
    //
    //コメント文の癖でif(条件式){　　}//if(条件式)
    //という風に}の後ろにその始まった条件式をコメントしてます。
    //自分的にデバックしやすい形という事で。
    //
    // version
    //* ver1.09mv (2021.8/18) メッセージ表示が非アクティブ中にページアップを押した場合に呼び出し。（ホイールアップは設定してない）
    //* ver1.09 (2020.6/7)  ボタンの拡大率をマイナスにしていた場合、メッセージ中のクリック判定が無効になってたので修正
    //* ver1.08 (2020.3/30)  BackLog_YesAddTextとBackLog_NoAddTextを追加。ログにテキストを渡したくない時に使う。
    //* ver1.07 (2019.11/23) 改行コードが入っていた場合の処理をついか
    //* ver1.06 (2019.11/19) BackLogDirectAdd textに変数で設定された配列文字を反映できるようにした。通常のログでは変数は無視されるので使いたい場合に使うこと。
    //* ver1.05 (2019/5/23) メッセージが隠れてる状態でもバックログを右クリックで呼び出す。
    //* ver1.04 (2019/3/26) プラグインコマンド　BackLogDirectAdd text   直接バックログに文字textを追加する。画像テキストなどログに反映されないテキストをどうにかしたいときにつかう。
    //* ver1.03 (2019/02/27) バックログボタンのでっかいのを呼び出し中に出現。スマホ想定。
    //* ver1.02 (2019/01/10) ルビプラグインの処理の修正。
    //* ver1.01 (2018/12/16) メッセージ送りにスペースキーとリターンボタンの検知を追加。（他のマルチプルウィンドウスクリプトプラグインででうまく行ってない為）
    //* ver1.00 (2018/0906) プラグイン機能を使わないようにするコマンドを追加。他メッセージ系プラグイン導入時にyepメッセージコアのネームボックスが消えない問題への対処。
    //* ver0.94 (2018.8/26) 会話中にコモンイベント連動機能。指定の顔アイコンが来たらスイッチをonにする機能を新設。
    //*	コモンイベントのスイッチトリガの並列処理と併せて使ってください。イベント先でスイッチをオフにすること。
    //*	
    //* ver0.93 (2018.1/26) よしだとものりさんの報告を元に戦闘時にバックログを使おうとするとエラーがでる問題を対応
    //* ver0.92 (2017.3/18) 新しいfont適用版でタグの残骸が半角の□で表示されるようになってたのでそれを削除。
    //* ver0.91  (2017. 2/25) スマホで長押しが右クリック判定になってメッセージが隠れまくるので
    //*	スマホ時は画面の3/5より下の長押しでは隠れないようにした。画面上の方で長押しすると隠れる。
    //*
    //*	ルビ振りプラグイン （riru氏のプラグイン。\r[本文,ルビ]　の制御文字)でログにルビなし本文のみを追加するようにした。
    //*	その関係で半角,と[なにか文字]をテキストに使ってる場合は丸ごと消えてしまうので全角の、を使ってもらいたい。
    //*
    //* ver0.9  (2016. 10/6) 最大ログ保存数を設定可能にした。デフォルトは無制限。
    //	あとBackをBuckで一部書いてたのでそれをBackに統一というどうでも良い修正がされた。
    //* ver 0.8 (2016. 10/4) 顔画像なしの地の文が混ざるとわかりづらいのでその対応策を追加
    //* ver 0.7 (2016. 10/3) Yepメッセージコアのネームボックスをログに反映できるようにした関係で色々機能追加。
    //* ver 0.6 (2016. 9/30)右クリックでメッセージウィンドウを隠す処理を追加。
    //* ver 0.5 (2016. 9/28)ページの無限遡りをカット。制御文字の＼！等がログに残るのを削除。
    //*	特殊な制御文字を追加していた場合はGame_Message.prototype.convertEscapeCharactersに適宜追加
    //*	・ページ毎に空行１つ追加して見やすくしたり。
    //* ver 0.4 (2016. 3/31)制御文字に対応させた。
    //* ver0.3 (2016. 3/25)とりあえず出した

    /*:
    * @plugindesc バックログ及びメッセージ周りの補填関係
    * @author ponidog http://ponidog.sakura.ne.jp/
    * https://ci-en.jp/creator/666
    * @desc バックログ ver1.0 (2018. 9/4)
    *
    
     * @param nBackLogDisplayLine
     * @desc 表示行数
     * @default 12
    
    
     * @param nBackLogLimitMax
     * @desc 最大保存ログ行数。0以下で無制限
     * @default -1
    
     * @param nBackLogButtonUp
     * @desc ページアップボタンのピクチャID
     * @default 0
     * @param nBackLogButtonDown
     * @desc ページダウンボタンのピクチャID
     * @default 0
    
     * @param nBackLogButtonHide
     * @desc ウィンドウを隠すボタンのピクチャID
     * @default 0
    
    
     * @param sBackLogButtonBig
     * @desc 画像名。バックログを呼び出し中に上下ボタンを表示。
     * @default 0
     * @param nBackLogButtonUpBig
     * @desc 同バックログがアクティブ中に使うページアップボタンのピクチャID。非アクティブ状態では非表示になる。
     * @default 0
     * @param nBackLogButtonDownBig
     * @desc 同バックログがアクティブ中に使うページダウンボタンのピクチャID。　非アクティブ状態では非表示になる。
     * @default 0
    
     * @param bPoniBKlog_RClickHideON
     * @desc 右クリックでメッセージウィンドウを隠す機能を使う。プラグインの競合を受けやすいので導入時に注意。
     * @type boolean
     * @on Yes
     * @off No
     * @default 0
    
     * @param bBackLogNameOn_forYepMessageCore
     * @desc Yepプラグインの名前欄をログに追加　true/false
     * @type boolean
     * @on Yes
     * @off No
     * @default true
    
     * @param sBackLogTitle
     * @desc ログのタイトル。ログは　　####LOG 1/16 Page##　のように表示されます
     * @default ###LOG
    
     * @param sBackLogTitlePage
     * @desc ログのタイトルの末尾
     * @default Page##
    
     * @param sBackLogNameOn_Flame
     * @desc ログの名前欄の先頭文字
     * @default ●
    
     * @param sBackLogNameOn_Flame2
     * @desc ログの名前欄の文字末尾
     * @default 　
    
     * @param sBackLogNoFaceSymbol
     * @desc 名前欄なしメッセージのログ表示
     * @default ★
    
     * @param sBackLogNoFaceSpace
     * @desc 顔画像がない場合、ログ各行の頭に付ける文字。空白など入れると見やすい。
     * @default
     * 
     * @param bHideMessageCall_In_SwitchNum
     * @desc 右クリックでメッセージを隠した時にｏｎになるスイッチ番号。例えば特定のピクチャを消したい時やSEを鳴らしたい時に使います。
     * コモンイベントの並列処理でスイッチのトリガー監視で別途設定してください。（該当コモンイベントでスイッチをoffにしないとループしますよ）
     * @default 0
     * 
     * @param bHideMessageCall_Out_SwitchNum
     * @desc 右クリックでメッセージを隠した後、戻る際にｏｎになるスイッチ番号
     * @default 0
     * 
     * @param nAnimeOnSwitchNum
     * @desc 会話キャラにコモンイベントを連動させる時のスイッチ番号。スイッチ番号がON状態の時に発動します。
     * ※予約スイッチ番号。使わないスイッチ番号を指定してください。（機能を使わないなら不要です）
     * @default 0
     * 
     * @param bWindowOPENCloseSpeedUp_SwitchNum
     * @desc このスイッチ番号がonならウィンドウの開閉速度を上昇させる。
     * @default 0
     * 
     * @param bAutoSkipSwitchNum
     * @desc このスイッチ番号がonなら自動でメッセージが進んでいく。ver1.10
     * @default 0
     * 
     * @param nButton_1
     * @desc ボタンのピクチャID。　このピクチャ番号をクリックした時に対応するスイッチをｏｎにします。（メッセージ表示中も反応します）
     * @default 0
    
     * @param nButton_switch_1
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
    
    
     * @param nButton_2
     * @desc ボタンのピクチャID
     * @default 0
    
     * @param nButton_switch_2
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
    
     * @param nButton_3
     * @desc ボタンのピクチャID
     * @default 0
    
     * @param nButton_switch_3
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
    
     * @param nButton_4
     * @desc ボタンのピクチャID
     * @default 0
    
     * @param nButton_switch_4
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
    
    //#add_btn
    //必要に応じて追加する
    //
     * @param nButton_5
     * @desc ボタンのピクチャID
     * @default 0
     * @param nButton_switch_5
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
    
     * @param nButton_6
     * @desc ボタンのピクチャID
     * @default 0
     * @param nButton_switch_6
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
     * 
     * @param nButton_7
     * @desc ボタンのピクチャID
     * @default 0
     * @param nButton_switch_7
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
     * 
     * @param nButton_8
     * @desc ボタンのピクチャID
     * @default 0
     * @param nButton_switch_8
     * @desc ボタンのピクチャIDに対応したスイッチ番号
     * @default 0
     * 
    * @help
    *■■■■■■■■■■■■■■
    *	概要
    *■■■■■■■■■■■■■■
    * メッセージ表示中にPageUpかマウスホイールを上に回すことでバックログが表示される
    * プラグインです。
    * 移動中等で呼ぶ場合は別途イベントで設定してください。
    * ※移動中に[pageUp]キーを押した場合呼び出せるようにしました。ver1.09mv
    *
    * またノベル系ゲームに便利な以下の機能もついています。
    *  ・右クリックでメッセージウィンドウを隠します。この状態でもう一度右クリックでバックログを呼べます。
    *	またマウスホイールを下に回すことでメッセージを進めます。
    *  　　（右クリックでメッセージを隠した際に指定スイッチをonすることもできます。SEを鳴らしたい時などに使えます）
    *
    *　・ネームボックスの自動呼出し。
    *	設定した顔アイコンに連動して表示されます。(YepMessageCore必須)
    *　・コモンイベントの連動補助。
    *	メッセージに設定した顔が来るとスイッチがONになります。
    *	別途コモンイベントのスイッチ並列処理をすることでキャラアニメ等の表現が楽
    *	になります。
    *  ・ピクチャにスイッチ番号の指定可。
    *	メッセージ表示中にピクチャボタンを使いたい時に使います。
    *	よくあるセーブデータ呼び出しやコンフィグに使ったり、キャラをクリックした
    *	りする時に使ってください。
    *   スイッチのオフは本体側で制御してください。コモンイベントの並列処理で呼び出し後、同イベントにスイッチのオフをいれます。
    *	　なおMVの仕様としてメッセージ中や選択肢中にコモンイベントを呼び出ししても、
    *     コモンイベントで設定したメッセージや選択肢は読み込みされません。
    * 　
    *■■■■■■■■■■■■■■
    *■■■■■■■■■■■■■■
    * プラグインコマンド
    *■■■■■■■■■■■■■■
    *■■■■
    *■■■■プラグイン使用のオンオフ■■■■
    * STGゲーム等、メッセージを表示しない処理の重いスクリプトの時にはオフにしてみてく
    * ださい。
    * 会話の時だけ使用する方法が軽いです。
    *--------------------------------------
    *▼プラグインコマンド
    * poni_1  または　poniBackLogON
    *	このプラグインの処理を使用する。デフォルトはONです。
    * poni_2 または　poniBackLogOFF
    *	このプラグインの処理を使用しない。
    *　　　なお呼び出し機能等をoffにするだけでテキスト事態はログに追加されます。
    * poni_BackLogUseCheck ?Swicth
    *    現在の使用状態をスイッチ番号？に渡す。
    *---	
    *■■■■■■■■
    *■■■■
    *■■■■ネームボックスの設定
    *メッセージの顔アイコンに設定したネームボックスが自動で呼び出しされます。
    *これで毎回タグをつける必要がなくなります。(yepmessagecoreの機能 \n<名前>　)
    *　リスト登録は　スクリプト中のas_NameListImg配列を直接変更してください。
    * 検索用文字　##NameBox
    *
    * [タグ\n<名前>が文中にある場合 > スクリプトコマンド NameBoxSet > 顔画像リスト登録]
    * 　左が優先してネームボックスに表示されます
    * ゲーム中にころころと変更したい場合はそうすると良いでしょう。
    * なおリスト登録では２つ名の呼び出しにも対応してます。
    *--------------------------------------
    *▼プラグインコマンド
    * NameBoxSet なまえ
    * 　　YepMessageCore必須:名前欄に　なまえを表示。リセットするまで。
    * NameBoxReset
    * 　　YepMessageCore必須:なまえ　をリセットします。
    *
    *■■■■■■■■
    *■■■■
    *■■■■キャラとスイッチ連動
    * メッセージに指定した顔アイコンが使われるとスイッチをONにします。
    * 立ち絵を呼んだり天候を変更させたり色々応用が効きます。
    * 直接スクリプト中の　as_NameListImgSwitch 配列に顔アイコン名とスイッチ番号を設定
    * してください。
    * 検索用文字　##CharaSwitches
    *
    * 設定のコツ
    *	 コモンイベントのトリガーを並列処理でスイッチ指定して使います。。
    *	 そのコモンイベント内でスイッチをオフにしないと永久ループするので注意してく
    *	 ださい。
    * 
    *--------------------------------------
    *▼プラグインコマンド
    * poni_17 or poniBacklog_CharaCommonON
    *	会話中にコモンイベントを連動させる合図です。
    *	顔アイコンのリストに対応したスイッチがonになります。
    *   例えば立ち絵を呼び出し設定している時に呼び出したくない場面で用います。
    *   （１枚絵中のイベントシーンでその間、立ち絵は呼びたくない時など）
    *
    * poni_18 or poni_17off or poniBacklog_CharaCommonOFF
    *　　　　poni_17をオフにします。
    *■■■■■■■■
    *■■■■
    *■■■■バックログ機能の呼び出し
    * デフォルト状態はメッセージ表示中のみにPageUpとマウスホイールでバックログを呼び
    * 出せます。
    * 会話終了後には呼べません。
    * 	以下を別途マップの並列処理などで設定する必要があります。
    *
    *　設定例
    *    ◆条件：スクリプト：Input.isTriggered('pageup') ||TouchInput._wheelY <0
    *　　　◆プラグインコマンド：BackLogStart
    *
    * -----
    * バックログボタンをプラグインで追加した場合は自分でピクチャをマップに追加してください。
    * 
    *--------------------------------------
    *▼プラグインコマンド
    * BackLogStart
    * 　　バックログを開始。
    * BackLogUp
    * 　　ページアップ。
    * BackLogDown
    * 　　ページダウン。
    *
    * BackLogLimitMax
    * 　　最大保存ログ行数を変更する。0以下で無制限保存。
    * 　　＼V[n]の変数も使える。例：BackLogLimitMax \V[1]
    *
    * BackLogDirectAdd
    *     メッセージに表示してないテキストを直接バックログにわたす。
    *     例：BackLogDirectAdd てすとてすと
    *     
    *BackLog_RhideON
    *BackLog_RhideOFF
    *     右クリックでメッセージを隠す機能をオンオフする
    *
    *BackLog_YesAddText
    *BackLog_NoAddText
    *   バックログにテキストを渡すかどうか。
    *   poniBackLogOFFと違ってログに残りません。
    *■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    *	その他
    *■■■■■■■■■■■■■■
    *
    * Rubi_riru.js のルビプラグインの制御文字に対応してます。　\r[文字,ルビ]
    * ログには文字だけが表示されます。
    * その関係で文中に半角の,が使われているとログがおかしくなります。
    *------------
    * ◆バックログ中に他のプラグインの制御文字が表示される場合の処置
    *
    * 他のプラグイン等の制御文字がログに残る場合は
    * 中段ぐらいにある　Game_Message.prototype.convertEscapeCharactersに追記してくだ
    * さい。
    *  （検索用文字##add_Seigyo）
    *----------------
    * ◆ピクチャボタンを増やしたい
    *
    * ボタンは４つありますがコピペして数字ふやして無制限に追加できます。
    * パラメータとスクリプトの追加コピペが必要です。検索『　#add_btn　』の場所をみて
    * ください。
    * 
    *-----
    * ネームボックスのタグはYEPネームタグの\n<名前>に対応してますが
    * 他のプラグインで使うネームタグを追加したい場合は
    *『 #nameTag 』　で検索して出て来る箇所をいじってみてください。
    *
    *-----
    * MultipleWindowSkinSystemと併用する際はウィンドウを隠す機能が使えません。
    * ログは見ることができます。
    * メッセージウィンドウの上に来るように表示ログ数を調整してください。
    * 
    * ＜改造＞
    * b_USE_MultipleWindowSkinSystemの各Window_Messageプロトタイプをスキップするプラグイン命令を追加して
    * かつメニュー呼び出しの位置を画面外に飛ばすことで対応できます。
    * (ウィンドウが多重に同一位置に存在するようになる為、デフォルト以外を飛ばす処理)
    * 
    *-----
    * 使用に関してはMIT準拠です。
    * 成人向けの使用も問題ありません。
    * 成人向け同人ゲームの場合はツイッターのフォローがあると嬉しいです。
    *■■■■■■■■■■■■■■
    *パラメーター
    *■■■■■■■■■■■■■■
    *nBackLogDisplayLine
    *	  表示桁数
    *
    *nBackLogLimitMax
    *	最大保存ログ行数。0以下で無制限。
    *	デフォルトは無制限の設定。なお毎回ロード時にログはリセットされる。
    *
    *nBackLogButtonUp
    *	　ページアップボタンのピクチャID
    *nBackLogButtonDown
    *	 ページダウンボタンのピクチャID
    *nBackLogButtonDown
    *	 メッセージウィンドウを隠すボタンのピクチャID
    *bBackLogNameOn_forYepMessageCore
    *	Yepプラグインの名前欄をログに追加。デフォルトはtrue (true/false)
    *
    *sBackLogNameOn_Flame
    *	 ログの名前欄の先頭文字。デフォルトは●
    * sBackLogNameOn_Flame2
    *	 ログの名前欄の文字末尾。デフォルトは空欄。
    *
    * sBackLogNoFaceSymbol
    *	名前欄なしメッセージのログ表示。
    *	いわゆる地の文の開始合図にも使える。デフォルトは★
    * sBackLogNoFaceSpace
    *	顔画像がない場合、ログ各行の頭に付ける文字。空白など入れるとよい。
    *	デフォルトでスペース入れたら駄目だったので自前で入れてくだされ。
    *	　※名前欄と顔画像なしの場合はsBackLogNoFaceSymbolと併せて適用される。
    *
    * nAnimeOnSwitchNum
    *	キャラ会話にアニメやら人物を半透明化などのコモンイベントを連動させたいとき
    *	に使う合図のスイッチ番号。
    *	（途中でセーブ＆ロードを挟んでも状態が保持されるようにした）
    *	各キャラのコモンイベント呼び出しは別途リストに対応スイッチ番号を入力すること。
    *■■■■■■■■■■■■■■
    *■■■
    * 一部競合するプラグインは別途条件式を付け足してくだされ。
    *　下の方にある上書きする関数が競合原因でごわすよ。
    *
    */


    "use strict";
    var pluginName = 'ponidog_BackLog';


    //

    //==========================================================
    var parameters = PluginManager.parameters('ponidog_BackLog_utf8');
    //表示する行数。最初は小さい数字でテストすると良い
    var nBackLogDisplayLine = Number(parameters['nBackLogDisplayLine'] || 18);

    //最大ログ保持数。マイナス値は無制限。
    var nBackLogLimitMax = Number(parameters['nBackLogLimitMax'] || -1);

    //ボタンピクチャの番号。プラグイン管理からか右の０を書き換え。
    var nBackLogButtonUpId = Number(parameters['nBackLogButtonUp'] || 0);
    var nBackLogButtonDownId = Number(parameters['nBackLogButtonDown'] || 0);
    var nBackLogButtonHideId = Number(parameters['nBackLogButtonHide'] || 0);

    var bButtonON = false;
    var bBuckLogONOFF = true;
    var bBuckLogAddTextONOFF = true;

    var bAutoSkipSwitchNum = Number(parameters['bAutoSkipSwitchNum'] || 0);//ver1.10 add
    console.log("bAutoSkipSwitchNum = " + bAutoSkipSwitchNum);
    var sBackLogButtonBig = String(parameters['sBackLogButtonBig'] || "");
    var nBackLogButtonUpBigId = Number(parameters['nBackLogButtonUpBig'] || 0);
    var nBackLogButtonDownBigId = Number(parameters['nBackLogButtonDownBig'] || 0);

    var bHideMessageCall_In_SwitchNum = Number(parameters['bHideMessageCall_In_SwitchNum'] || 0);
    var bHideMessageCall_Out_SwitchNum = Number(parameters['bHideMessageCall_Out_SwitchNum'] || 0);
    var bHideMessageNow = 0;
    var bWindowOPENCloseSpeedUp_SwitchNum = Number(parameters['bWindowOPENCloseSpeedUp_SwitchNum'] || 0);
    //------------------------------------------------
    //#add_btn
    //スイッチ連動ボタンピクチャの番号。プラグイン管理からか右の０を書き換え。
    //	    ▼　　　　　　　　　　　　　　　▼
    var nButton_1 = Number(parameters['nButton_1'] || 0);
    var nButton_2 = Number(parameters['nButton_2'] || 0);
    var nButton_3 = Number(parameters['nButton_3'] || 0);
    var nButton_4 = Number(parameters['nButton_4'] || 0);
    var nButton_5 = Number(parameters['nButton_5'] || 0);
    var nButton_6 = Number(parameters['nButton_6'] || 0);
    var nButton_7 = Number(parameters['nButton_7'] || 0);
    var nButton_8 = Number(parameters['nButton_8'] || 0);

    //同対応のスイッチ番号#add_btn
    //		　▼　　　　　　　　　　　　　　　　　　▼
    var nButton_switch_1 = Number(parameters['nButton_switch_1'] || 0);
    var nButton_switch_2 = Number(parameters['nButton_switch_2'] || 0);
    var nButton_switch_3 = Number(parameters['nButton_switch_3'] || 0);
    var nButton_switch_4 = Number(parameters['nButton_switch_4'] || 0);
    var nButton_switch_5 = Number(parameters['nButton_switch_5'] || 0);
    var nButton_switch_6 = Number(parameters['nButton_switch_6'] || 0);
    var nButton_switch_7 = Number(parameters['nButton_switch_7'] || 0);
    var nButton_switch_8 = Number(parameters['nButton_switch_8'] || 0);


    //------------------------------------------------


    var sBackLogTitle = String(parameters['sBackLogTitle'] || '##Log');
    var sBackLogTitlePage = String(parameters['sBackLogTitlePage'] || ' Page ##');

    //Yepメッセージコアのネームボックスを反映
    //インスタンス名は　._nameWindow　らしい。
    var bPoniBKlog_RClickHideON = eval(parameters['bPoniBKlog_RClickHideON'] || 'false');

    //bPoniBKlog_RClickHideON = Boolean(bPoniBKlog_RClickHideON);
    //console.log("parameters['bPoniBKlog_RClickHideON']"+parameters['bPoniBKlog_RClickHideON']);


    var bBackLogNameOn = eval(parameters['bBackLogNameOn_forYepMessageCore'] || 'false');
    var sBackLogNameFlame = String(parameters['sBackLogNameOn_Flame'] || '●');
    var sBackLogNameFlame2 = String(parameters['sBackLogNameOn_Flame2'] || '');

    var BitmapRext = "";
    //顔画像なしの時のバックログ処理。
    //名前付き会話文の後の地の文章がわかりづらいので差別化する。
    var sBackLogNoFaceSymbol = String(parameters['sBackLogNoFaceSymbol'] || '');
    var sBackLogNoFaceSpace = String(parameters['sBackLogNoFaceSpace'] || '');
    //==========================================================

    //==========================================================
    // oはオブジェクトの接頭辞のつもりで付けてみた。
    var oBackLog = new BackLog();
    var an_BackLog = [];
    var an_BackLogNowText = [];

    //==========================================================
    //キャラ会話にコモンイベント連動させるときの合図。
    //不要な時までオート呼び出しは煩わしいので。
    var nAnimeOnSwitchNumId = Number(parameters['nAnimeOnSwitchNum'] || 0);






    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //
    //		名前リストの入力欄
    //■■■■                                ■■■■■■■■■
    //"画像名","対応するネームボックスに表示する名前",
    //のセットで入力。画像名は拡張子不要。
    //"Actor1","荒ぶるヒポポタマス",
    //"Actor2","nickname=4",
    //
    //という風に記述をする。
    //改行は挟んでも良いけど最後の""に,を付けないようにきをつける。
    //"nickname=番号"を入れると　二つ名＋キャラ名 が表示される。
    //番号はその二つ名のアクター番号。
    //二つ名の変更は$gameActors.actor(番号).setNickname("変更名")でゲーム内で可能なので
    //かなり融通の利く形のはず。
    //
    // ##NameBox
    //サンプル的に入ってる中身は消して使ってください。

    var as_NameListImg =
        [
            "chuky-king", "コボルトキング",
            "chuky-green", "小さな緑",
            "Face-hvel", "伝説の暇人",
            "Face-chucky-red", "コボルトキング",
            "teatacle", "触手どん",
            "shadowone", "nickname=1",
            "yeid", "nickname=2"
        ];

    //配列なので,の区切りに注意。
    //["img","なまえ",];　って最後の行に,を付けるとエラーでる。
    //["img","なまえ"];　が正解。

    //■■■■                                ■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //
    //		スイッチリストの入力欄
    //■■■■                                ■■■■■■■■■
    //サンプル的に入ってる中身は消して使ってください。
    //メッセージの顔アイコンの名前が一致するとスイッチをオンにする。
    //  例えば　"neko","44",　を追加しておくとneko顔の時44番がｏｎになります。
    //立ち絵呼び出しその他のイベントを組み合わせると便利です。
    // ##CharaSwitches
    var as_NameListImgSwitch =
        [
            "chuky-king", 0,
            "chuky-green", 0
        ];

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //==========================================================
    //==========================================================
    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);


        if ((command) === 'BackLogStart') {
            //oBackLogButton.initialize();
            if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
            oBackLog._nBackLogPage++;
            oBackLog.BackLog_Call();
        }
        if ((command) === 'BackLogUp') {
            oBackLog._BackLogBusy = true;
            Input.update();
            TouchInput.update();
            if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
            oBackLog._nBackLogPage++;
            oBackLog.BackLog_Call();
        }
        if ((command) === 'BackLogDown') {
            oBackLog._BackLogBusy = true;

            Input.update();
            TouchInput.update();
            oBackLog._nBackLogPage--;
            oBackLog.BackLog_Call();
        }

        if ((command) === 'BackLogClose') {
            //ページマイナスで閉じる。
            //console.log("■1189\n");
            // oBackLog._BackLogBusy=false;
            oBackLog._nBackLogPage = -1;
            oBackLog.BackLog_Call();
            /*
             //メッセージウィンドウを表示させる。
                     this.show();
                            this.subWindows().forEach(function(subWindow) { subWindow.show();});
            */
        }


        if ((command) === 'BackLog_NoAddText') {
            bBuckLogAddTextONOFF = false;
        }
        if ((command) === 'BackLog_YesAddText') {
            bBuckLogAddTextONOFF = true;
        }



        if ((command) === 'BackLogLimitMax') {
            var _TempLog = args[0];
            //console.log(_TempLog);

            //　変数＼V[n]ぶっこみに対応させる。
            var bCheck = _TempLog.match(/\\V\[/g);
            if (bCheck) {

                _TempLog = _TempLog.replace(/\\V\[/gi, '');
                _TempLog = _TempLog.replace(/\]/gi, '');
                _TempLog = String($gameVariables.value(parseInt(_TempLog)));

            }//if(_TempLog.match(/\\V\[/gi)

            nBackLogLimitMax = parseInt(_TempLog);
            if (nBackLogLimitMax) an_BackLog = an_BackLog.splice(-nBackLogLimitMax);
        }

        if ((command) === 'NameBoxSet') {
            oBackLog.sNameBoxSet_ponidogBackLog = args[0];//
        }
        if ((command) === 'NameBoxClear' || (command) === 'NameBoxReset') {
            oBackLog.sNameBoxSet_ponidogBackLog = "";
        }

        if ((command) === 'BackLogDirectAdd') {

            var _TempLog = args[0];//

            //　変数＼V[n]ぶっこみに対応させる。
            var bCheck = _TempLog.match(/\\V\[/g);
            if (bCheck) {

                _TempLog = _TempLog.replace(/\\V\[/gi, '');
                _TempLog = _TempLog.replace(/\]/gi, '');
                _TempLog = String($gameVariables.value(parseInt(_TempLog)));

            }//if(_TempLog.match(/\\V\[/gi)

            var _text = _TempLog;

            oBackLog.BackLog_addDirect(_text);
            console.log("■バックログ：" + _text);
        }


        if ((command) === 'poni_1' || (command) === 'poniBackLogON') {
            bBuckLogONOFF = true;
        }
        if ((command) === 'poni_2' || (command) === 'poniBackLogOFF') {
            bBuckLogONOFF = false;
        }

        if ((command) === 'poni_BackLogUseCheck') {
            var n = args[0];//
            $gameSwitches.setValue(n, bBuckLogONOFF);

        }

        if ((command) === 'BackLog_RhideON') {
            bPoniBKlog_RClickHideON = true;
        }

        if ((command) === 'BackLog_RhideOFF') {
            bPoniBKlog_RClickHideON = false;
        }
        /*
                if ( (command)  === 'poni_3' ||(command)  === 'poniBackLogMessageFrame') {
        
        
        var _TempLog=args[0];
        //console.log(_TempLog);
        
        //　変数＼V[n]ぶっこみに対応させる。
        var bCheck=_TempLog.match(/\\V\[/g);
        if(bCheck){
        
        _TempLog =_TempLog.replace(/\\V\[/gi,'');
        _TempLog =_TempLog.replace(/\]/gi,'');
        _TempLog = String($gameVariables.value( parseInt(_TempLog) ) );
        
        }//if(_TempLog.match(/\\V\[/gi)
        
        var nMessageNum=parseInt(_TempLog);
        var faceName="neko", faceIndex=1, x=0, y=0, width=68, height=68;
        $gameScreen.drawFaceOnPicture(nMessageNum,faceName, faceIndex, x, y, width, height);
        
                }
        */

        if ((command) === 'poniBacklog_CharaCommonON' || (command) === 'poni_17') {

            $gameSwitches.setValue(nAnimeOnSwitchNumId, true);//

        }

        if ((command) === 'poniBacklog_CharaCommonOFF' || (command) === 'poni_18' || (command) === 'poni_17off') {

            $gameSwitches.setValue(nAnimeOnSwitchNumId, false);//

        }


    }



    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //	バックログの処理
    //==========================================================
    //	メッセージウィンドウに渡すtextを保存して
    //	それを表示させるのがこのプラグインの目的となる。
    //		やってる事は
    //			・ログ配列にテキストを追加保存
    //			・画面に重ねるレイヤーを作ってそれにログ載せ
    //==========================================================
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //上書き

    //各行
    Game_Message.prototype.add = function (text) {

        //通常メッセージをウィンドウの配列へ渡す
        this._texts.push(text);

        var sNameSet = "";
        //画像リストから現在の顔画像を検索
        var nNameSerch = as_NameListImg.indexOf(this._faceName);

        //
        var nNameSerchSwitch = as_NameListImgSwitch.indexOf(this._faceName);
        //console.log("nNameSerch "+nNameSerch);
        //あれば名前をセットする。
        if (nNameSerch >= 0) {
            sNameSet = as_NameListImg[nNameSerch + 1];

            //画像リストにニックネームを入れた場合の対応
            //直接変数ぶっこんだら無理だったので強引に解決した。
            if (sNameSet.match("nickname=")) {
                var _nActor = sNameSet.split("nickname=", 2);
                sNameSet = $gameActors.actor(parseInt(_nActor[1])).nickname() + $gameActors.actor(parseInt(_nActor[1])).name();
            }//if(sNameSet.match("nickname=")){	
        }//if(nNameSerch>=0){

        //同様にコモンイベント連動のスイッチ番号のセット
        if (nNameSerchSwitch >= 0) {
            var _switchNumActorCommon = as_NameListImgSwitch[nNameSerchSwitch + 1];
            if (_switchNumActorCommon > 0 && $gameSwitches.value(nAnimeOnSwitchNumId) == true) $gameSwitches.setValue(_switchNumActorCommon, true);//
        }//if(nNameSerchSwitch>=0){



        //スクリプトコマンドで名前指定があればそちらを優先する。
        if (oBackLog.sNameBoxSet_ponidogBackLog.length > 0) sNameSet = oBackLog.sNameBoxSet_ponidogBackLog;

        //Yepメッセージコアのネームボックスを使用する場合の処理。
        //現在の配列のindexを返す。
        //this._texts.indexでは所得できなかったので一致する文字列を検索。
        var _count = this._texts.indexOf(text);

        //#nameTag
        //ネームボックスがある場合。\n<> \nc<> \nr<>
        var list = text.match(/\\n\<(.*)\>/g || /\\nc\<(.*)\>/g || /\\nr\<(.*)\>/g);

        //プラグインコマンドでネームボックスが指定されている場合の表示
        //なお文中で指定されてる場合はそちらを優先。
        //#nameTag
        if (!list && _count == 0 && sNameSet.length > 0) {
            this._texts[0] = "\\n<" + sNameSet + ">" + this._texts[0];
        }//!list

        //

        //■
        //バックログに名前を反映する処理
        if (bBackLogNameOn) {

            var sNameSetFull = "";


            //名前表示
            if (!list && _count == 0 && sNameSet.length > 0) {
                sNameSetFull = sBackLogNameFlame + sNameSet + sBackLogNameFlame2;

            }//

            //名前欄が空欄の場合
            if (!list && _count == 0 && sNameSet.length == 0) {
                sNameSetFull = sBackLogNoFaceSymbol;
            }//

            //#nameTag
            if (list) {
                var sName = list[0];
                sName = sName.replace(/\\nc\</g, '');
                sName = sName.replace(/\\nr\</g, '');
                sName = sName.replace(/\\n\</g, '');
                sName = sName.replace(/\>/g, '');
                sNameSet = sName;
                sNameSetFull = sBackLogNameFlame + sName + sBackLogNameFlame2;
            }//if(list)

            //前回表示した名前と違っていれば表示する。
            //地の文のみに適用。会話文が地の文みたいに見えちゃったので。
            if (_count == 0 && sNameSet.length == 0) {
                if (oBackLog.sNameBoxPrev_ponidogBackLog != sNameSetFull) {
                    oBackLog.BackLog_add(sNameSetFull);
                    oBackLog.sNameBoxPrev_ponidogBackLog = sNameSetFull;
                }//if
            }//if(sNameSet.length==0)
            if (_count == 0 && sNameSet.length > 0) {

                oBackLog.BackLog_add(sNameSetFull);
                oBackLog.sNameBoxPrev_ponidogBackLog = sNameSetFull;

            }//if(sNameSet.length>0){

        }//if(bBackLogNameOn



        //制御文字の処理
        var _text = this.convertEscapeCharacters(text);

        //顔画像なしの場合空行を入れて差別化する
        var sTextSpace = "";
        if ($gameMessage.faceName() == "") sTextSpace = sBackLogNoFaceSpace;

        /*
        //バックログに文字列を渡す
         an_BackLog.push( sTextSpace + _text);
         oBackLog.BackLog_add( sTextSpace + _text);
         */

        //改行コードがある場合の処理　ver1.07
        _text = _text.split('\n');
        var iMax = _text.length;
        for (var i = 0; i <= iMax - 1; i++) {
            // oBackLog.BackLog_add(text[i]);

            //バックログに文字列を渡す
            //
            if (bBuckLogAddTextONOFF) an_BackLog.push(sTextSpace + _text[i]);

        }




    };




    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //適度に空行を入れたい

    Game_Message.prototype.setBackground = function (background) {
        //an_BackLog.push("　");//■なんかでも良いかもね
        oBackLog.BackLog_add("　");
        this._background = background;
    };


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //===============
    //追加制御文字
    //=========
    //制御文字は
    //str.replace(pattern, replacement[, flags])
    //を用いている。flags=arguments[1]
    // 1 番目の括弧でキャプチャされたサブマッチの文字列を挿入とのこと。
    Game_Message.prototype.convertEscapeCharacters = function (text) {

        // .replace(/■/g,□)　という命令である。スラッシュ内の文字を置き換え。
        // \\は\一文字を示してるいつもの。
        //前半はデフォルトのソースをコピペ。

        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');

        text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));

        text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));

        text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
            return this.actorName(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
            return this.partyMemberName(parseInt(arguments[1]));
        }.bind(this));

        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);

        //後半。
        //バックログに＼！の！だけ残るのでそれを消す。また類似の命令があれば追加
        //\x1bは前半に変換された＼である。
        text = text.replace(/\x1bC\[(\d+)\]/gi, '\x1b');
        text = text.replace(/\x1bI\[(\d+)\]/gi, '\x1b');
        text = text.replace(/\x1baf\[(\d+)\]/gi, '\x1b');

        text = text.replace(/\x1b!/g, '\x1b');
        text = text.replace(/\x1b>/g, '\x1b');
        text = text.replace(/\x1b</g, '\x1b');
        text = text.replace(/\x1bN/g, '\x1b');
        text = text.replace(/\x1bWC/g, '\x1b');//\WC
        text = text.replace(/\x1bP/g, '\x1b');//\P
        text = text.replace(/\x1bLeft/g, '\x1b');//\Left
        text = text.replace(/\x1bVS/g, '\x1b');//\VS
        text = text.replace(/\x1bPS/g, '\x1b');//\PS
        text = text.replace(/\x1bEC/g, '\x1b');//\EC
        text = text.replace(/\x1bAT/g, '\x1b');//\AT
        text = text.replace(/\x1bWAT/g, '\x1b');//\WAT
        text = text.replace(/\x1bUL/g, '\x1b');//\UL
        text = text.replace(/\x1bCC/g, '\x1b');//\CC
        text = text.replace(/\x1bfn\<(.*)\>/g, '\x1b');//\fn

        //そのまま使えない文字は\を追加する。
        text = text.replace(/\x1b\|/g, '\x1b');
        text = text.replace(/\x1b\^/g, '\x1b');
        text = text.replace(/\x1b\./g, '\x1b');
        text = text.replace(/\x1b\{/g, '\x1b');
        text = text.replace(/\x1b\}/g, '\x1b');
        text = text.replace(/\x1b\$/g, '\x1b');
        text = text.replace(/\x1b\#/g, '\x1b');//

        //YEPメッセージコアのサブウィンドウのネームボックスがある場合の処理
        //名前欄を別途改行表示するので、この場では消す。
        //文頭にネームボックスタグがあるとは限らないので。
        text = text.replace(/\x1bnc\<(.*)\>/g, '\x1b');
        text = text.replace(/\x1bnr\<(.*)\>/g, '\x1b');
        text = text.replace(/\x1bn\<(.*)\>/g, '\x1b');

        //----------
        //##add_Seigyo
        //追加で制御文字がある場合はここらへんに追加記述をします
        //例えば\! なら  text = text.replace(/\x1b!/g, '\x1b');　と記述します
        //　|　などそのまま使えない記号の場合は\を頭に付けます。
        // \|を消したい場合は　text = text.replace(/\x1b\|/g, '\x1b');　と記述します。





        //ルビプラグインの処理。
        //\r[本文,ルビ]の処理
        //本文（ルビ）の形で表示することにした。ver1.02から
        //以前のverでは1行に複数のルビがあると対応が厳しかったため。

        if (text.search(/\x1br\[/gi) >= 0) {
            //fix ver1.02 条件の追加
            text = text.replace(/\x1br\[/gi, '\x1b');
            text = text.replace(/\,/gi, '(');
            text = text.replace(/\]/gi, ')');

            //    text = text.replace(/\,(\D+)\]/gi, '\x1b');
        }


        //新しいfontで\x1bが半角の□で表示されるようになってたのでそれを削除。
        text = text.replace(/\x1b/gi, '');

        return text;
    };

    //■■■■■■■■
    //■■■■■■■■
    //■■■■■■■■

    //==========================================================
    //	data
    //	============
    function BackLog() { }

    BackLog.prototype.initialize = function () {
        this._BackLogBusy = 0;
        this._nBackLogPage = null;
        this._MessageHide = false;


        this._sNameBoxSet_ponidogBackLog = "";
        this._sNameBoxPrev_ponidogBackLog = "";

    };

    BackLog.prototype.BackLogBusy = function () {
        return this._BackLogBusy;
    };


    BackLog.prototype.MassageHide = function () {
        this._MessageHide = true;
        return this._MessageHide;
    };
    BackLog.prototype.MassageShow = function () {
        this._MessageHide = false;
        return this._MessageHide;
    };

    BackLog.prototype.MassageShowNow = function () {
        return !this._MessageHide;
    };

    BackLog.prototype.nBackLogPage = function () {
        return this._nBackLogPage;
    };

    BackLog.prototype.sNameBoxSet_ponidogBackLog = function () {
        return this._sNameBoxSet_ponidogBackLog;
    };
    BackLog.prototype.sNameBoxPrev_ponidogBackLog = function () {
        return this._sNameBoxPrev_ponidogBackLog;
    };
    //------

    BackLog.prototype.BackLog_add = function (text) {
        if (!bBuckLogAddTextONOFF) return;

        //console.log(nBackLogLimitMax);
        //上限ログ数
        if (nBackLogLimitMax > 0) {
            if (an_BackLog.length >= nBackLogLimitMax) an_BackLog.shift();
        }//nBackLogLimitMax>0


        an_BackLog.push(text);
        //  this._texts.push(text);
    };


    BackLog.prototype.BackLog_isBusy = function () {
        return this._BackLogBusy;
    }

    //==========================================================
    //メッセージに表示せずにバックログに追加したい場合に使う
    BackLog.prototype.BackLog_addDirect = function (text) {

        text = text.split('\n');
        var iMax = text.length;
        for (var i = 0; i <= iMax - 1; i++) {
            oBackLog.BackLog_add(text[i]);
        }

    };

    //==========================================================
    //
    //==========================================================
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■
    BackLog.prototype.BackLog_Call = function () {


        if (this._nBackLogPage < 0 || !this._nBackLogPage) this._nBackLogPage = 0;
        if (this._nBackLogPage == null) this._nBackLogPage = 0;



        //	this.MassageHide();

        an_BackLogNowText.delete;
        an_BackLogNowText = [];


        var sBackLog = an_BackLog;
        var nBackLogPage = this._nBackLogPage;

        //
        if (this._nBackLogPage <= 0) {
            //	this.MassageShow();
            this._BackLogBusy = false;
            return;
        }


        var nBackLogLineNum = nBackLogDisplayLine;//
        this._BackLogBusy = true;

        if (sBackLog.length > 0) {


            var nStart = sBackLog.length - nBackLogLineNum * (nBackLogPage);
            if (nStart <= 0 || nStart == null) {
                nStart = 0;
                //ページ遡りの上限
                nBackLogPage = sBackLog.length % nBackLogLineNum == 0 ? parseInt(sBackLog.length / nBackLogLineNum) : parseInt(sBackLog.length / nBackLogLineNum) + 1;
                this._nBackLogPage = nBackLogPage;
            }
            var nBackLogPageMAX = sBackLog.length % nBackLogLineNum == 0 ? parseInt(sBackLog.length / nBackLogLineNum) : parseInt(sBackLog.length / nBackLogLineNum) + 1;
            var nLast = nStart + nBackLogLineNum	//sBackLog.length - nBackLogLineNum*(nBackLogPage);

            var nPageNow = parseInt(sBackLog.length / nBackLogLineNum) - nBackLogPage + 2;

            //ログのタイトル。(ページ/ページマックス)　の表示。変更したい場合は変えてね。
            an_BackLogNowText[0] = sBackLogTitle + " " + Number(nPageNow) + "/" + nBackLogPageMAX + sBackLogTitlePage;

            //ログ内容
            var j = 1;
            for (var i = nStart; i < nLast; i++) {
                if (sBackLog[i]) an_BackLogNowText[j] = sBackLog[i];
                if (!sBackLog[i]) an_BackLogNowText[j] = "";
                j++;
            }//for



        }//if (sBackLog.length > 0) {





        return;
    };//

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■

    //==========================================================
    //==========================================================
    //==========================================================


    //==========================================================
    //	Sp
    //==========================================================
    function Buck_logSp() {
        this.initialize.apply(this, arguments);
    }

    Buck_logSp.prototype = Object.create(Sprite.prototype);
    Buck_logSp.prototype.constructor = Buck_logSp;

    Buck_logSp.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
        this.update();
    };


    Buck_logSp.prototype.createBitmap = function () {
        this.bitmap = new Bitmap(Graphics.width, Graphics.height);
        this.bitmap.fontSize = 32;


    };

    Buck_logSp.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.updateBitmap();
        this.updateVisibility();
    };

    Buck_logSp.prototype.updateBitmap = function () {
        this.redraw();
    };

    Buck_logSp.prototype.redraw = function () {

        var width = this.bitmap.width;
        var height = this.bitmap.height;
        //drawTextのyは以下で計算する。
        //var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        //       = y+ lineHeight/2 -0.7*this.fontSize/2

        this.bitmap.clear();
        var _s_rgba = "rgba(0,0,0,0.5)";
        this.bitmap.fillAll(_s_rgba);

        //バックログ上下エリアを追加
        this.bitmap.fillRect(width - 120, height - 180, 70, 70, '#FFDDDD');
        this.bitmap.fillRect(width - 115, height - 100, 70, 70, '#FFFFFF');
        this.bitmap.drawText("Up", width - 120, height - 180, 70, 70, 'Left');




        var i, nLast = 0;
        if (an_BackLogNowText) nLast = an_BackLogNowText.length - 1;// 0から入るので

        if (an_BackLogNowText == null) return;



        for (i = 0; i <= nLast; i++) {
            var text = this.BackLogText(i);
            this.bitmap.drawText(text, 10, 10 - height / 2 + 0.7 * this.bitmap.fontSize + this.bitmap.fontSize * i, width, height, 'Left');

        }//for
    };

    Buck_logSp.prototype.BackLogText = function (i) {
        var sText = an_BackLogNowText[i];
        if (sText == null) sText = "";
        return sText;
    };

    Buck_logSp.prototype.updateVisibility = function () {
        this.visible = false;
        if (oBackLog._BackLogBusy) this.visible = true;
    };


    //========表示======

    //Spriteset_Base
    Spriteset_Base.prototype.createBackLog = function () {
        this._BackLog = new Buck_logSp();
        this.addChild(this._BackLog);
    };

    var _Spriteset_Base_prototype_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function () {
        _Spriteset_Base_prototype_createUpperLayer.call(this);
        this.createBackLog();
    };

    var _Spriteset_Base_prototype_createSpriteset = Spriteset_Base.prototype.createSpriteset;
    Spriteset_Base.prototype.createSpriteset = function () {
        _Spriteset_Base_prototype_createSpriteset.call(this);
        this.createBackLog();
    };

    //==========================================================

    var _Spriteset_Base_prototype_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function () {
        _Spriteset_Base_prototype_update.call(this);
        if (this._BackLog) this._BackLog.redraw();//fix 20180908
    };

    //==============
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /*
    Game_Screen.prototype.drawFaceOnPicture = function(pictureId,faceName, faceIndex, x, y, width, height) {
    if($gameScreen.picture(pictureId)==null)return 0;
    
        width = width ||68// Window_Base._faceWidth;
        height = height ||68;// Window_Base._faceHeight;
        var Facebitmap = ImageManager.loadFace(faceName);
        var pw = 68;//Window_Base._faceWidth;
        var ph = 68;//Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
            var dw   = Facebitmap.dw || sw;
            var dh   = Facebitmap.dh || sh;
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        //this.Bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy);
    //childrenはSpriteオブジェクトらしい
    //console.log(SceneManager._scene._spriteset._pictureContainer.children[pictureId-1].bitmap._context);
    //debugger;
    SceneManager._scene._spriteset._pictureContainer.children[pictureId-1].bitmap._context.drawImage(Facebitmap,sx, sy, sw, sh, dx, dy, dw, dh);
    
    };
    */


    //==========================================================
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    //	メッセージ中のキー操作関係
    //
    //================▼右クリックとマウスホイールの監視項目================================
    //=======================1)=======Window_Message.prototype.updateWait	============================
    //=======================2)=======Window_Message.prototype.updateInput	============================
    //==========================================================
    //=================の２つの関数を使っている。=========================================
    //●目的効果
    //クリック待ち中のウィンドウを消す。
    //バックログ実行中ならばウィンドウを全てハイドする
    //またメッセージウィンドウを右クリックで隠す処理も追加した。
    //トリアコンタン氏のスクリプトを参考にした。
    //なおMultipleWindowSkinSystem.jsとは相性が悪く、メッセージを隠す処理ができない。

    //==========================================================
    //====マウスホイールはともかく右クリックの監視が他のプラグインとの間で問題になりやすいようだ。========
    //==========================================================

    //■■■■■■■■■■■■■■
    //■■■■■	Window_Message
    //■■■■■
    var _Window_Message_updateWait = Window_Message.prototype.updateWait;
    Window_Message.prototype.updateWait = function () {
        _Window_Message_updateWait.call(this);

        //バックログの使用が許可されてない場合はすぐ戻る。
        if (!bBuckLogONOFF) { return _Window_Message_updateWait.call(this); }


        //各種バタンを押した場合の処置
        if (TouchInput.isTriggered()) {
            if (oBackLog.ButtonPress(nBackLogButtonDownId) || oBackLog.ButtonPress(nBackLogButtonUpId)) { bButtonON = true; return false; }
            ////#add_btn
            //ボタン追加したかったらコピペして数字▼を変更
            if (oBackLog.ButtonPress(nButton_1)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_2)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_3)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_4)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_5)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_6)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_7)) { bButtonON = true; return false; }
            if (oBackLog.ButtonPress(nButton_8)) { bButtonON = true; return false; }
        }//if (TouchInput.isTriggered ()


        if (oBackLog._BackLogBusy) {
            this.hide();
            this.subWindows().forEach(function (subWindow) { subWindow.hide(); });
            //	oBackLog.nameboxHideBackLogScript();





            //クリック
            if (TouchInput.isTriggered() || TouchInput.isCancelled()) {


                //=============================
                //バックログがアクティブ中のUp downエリアを押した場合の処理
                if (oBackLog.ButtonPressUpDownRect('Upkey')) {
                    TouchInput.clear();
                    Input.update();
                    oBackLog._nBackLogPage++;
                    if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
                    oBackLog.BackLog_Call();
                    return false;//クリックの反応は悪くなる
                    return true;
                }

                if (oBackLog.ButtonPressUpDownRect('Downkey')) {
                    TouchInput.clear();
                    Input.update();
                    if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
                    oBackLog._nBackLogPage--;
                    oBackLog.BackLog_Call();
                    return true;
                }//pagedownn
                //=============================





                //バックログ中または右クリックのハイド状態からメッセージウィンドウを見えるように戻す
                TouchInput.clear(); Input.clear();
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });
                oBackLog._BackLogBusy = false;
                oBackLog._nBackLogPage = 0;
                if (bHideMessageNow == 1) $gameSwitches.setValue(bHideMessageCall_Out_SwitchNum, true), bHideMessageNow = 0;//ver1.05
            }//if (TouchInput.isTriggered () ||TouchInput.isCancelled() ){ 

        }// if (oBackLog._BackLogBusy)


        //▼ここから▼バックログが非アクティブ状態の時の処理
        else {

            /*
            //右クリックを押した時に通常のメッセージウィンドウを消去する。
                 if(TouchInput.isCancelled() && oBackLog.IsSmahoRClick() && bPoniBKlog_RClickHideON ){
            
                    TouchInput.clear () ;  
                    Input.clear () ; 
                        if (this.visible) {
                                    this.hide();
                                    this.subWindows().forEach(function(subWindow) { subWindow.hide(); });
                                    this._nameWindow.deactivate();
            //	oBackLog.nameboxHideBackLogScript();
            	
            
                        }  else {
                                this.show();
                                    this.subWindows().forEach(function(subWindow) { subWindow.show();});
                        }
            
                    return false;
                     }//if (TouchInput.isCancelled()&& oBackLog.IsSmahoRClick() && bPoniBKlog_RClickHideON)
            */



            //-------------------
            //メッセージウィンドウが隠れている場合、クリックでも復帰するように処理
            if (!this.visible) {

                //左クリックは常にメッセージウィンドウを見えるように戻す
                if (TouchInput.isTriggered()) {
                    //0905-a	TouchInput.clear () ;    Input.clear () ; 
                    this.show();
                    this.subWindows().forEach(function (subWindow) { subWindow.show(); });
                    if (bHideMessageNow == 1) $gameSwitches.setValue(bHideMessageCall_Out_SwitchNum, true), bHideMessageNow = 0;//ver1.05
                }//if (TouchInput.isTriggered () ){ 




                //ついでページダウンで戻った際もウィンドウを復帰表示
                if (Input.isTriggered('pagedown') || TouchInput._wheelY > 0) {
                    TouchInput.clear();
                    Input.clear();
                    this.show();
                    this.subWindows().forEach(function (subWindow) { subWindow.show(); });
                }//

            }//if (!this.visible) 

        }// if (!oBackLog._BackLogBusy)else



        return _Window_Message_updateWait.call(this);
    };



    //■■■■■■■■■■■■■■■
    //----------//----------
    //■■■■■■■■■■■■■■■
    //----------　　　選択肢またはメッセージ表示後のクリック待ち状態
    //----------//----------
    //----------//----------
    //基本は上書きでの処理にしてる。
    // _Window_Message_updateInput.call(this); を追記すれば他のプラグインとの併用処理になる。
    //-------------
    var _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function () {
        //_Window_Message_updateInput.apply(this, arguments); //追加処理したい時

        //このプラグインを処理しない時はここで戻る。
        if (!bBuckLogONOFF) {
            if (oBackLog._BackLogBusy) { oBackLog._BackLogBusy = false; oBackLog._nBackLogPage = 0; }//バックログ表示中に進めた場合に起こる
            return _Window_Message_updateInput.call(this);
        }//


        /*
        //選択を切り替えした場合の処置。ないと選択選べない。
        if (this.isAnySubWindowActive()) {
            
            return true;  }
            */



        //ボタンを押して呼び出しした場合のチェック
        if (TouchInput.isTriggered()) {

            //メッセージを隠す

            //隠すボタンを押した場合の処理
            if (oBackLog.ButtonPress(nBackLogButtonHideId)) {
                if (this.visible) {
                    this.hide();
                    this.subWindows().forEach(function (subWindow) { subWindow.hide(); });
                    bHideMessageNow = 1;
                    $gameSwitches.setValue(bHideMessageCall_In_SwitchNum, true);//ver1.05
                } else {
                    this.show();
                    this.subWindows().forEach(function (subWindow) { subWindow.show(); });
                    if (bHideMessageNow == 1) $gameSwitches.setValue(bHideMessageCall_Out_SwitchNum, true), bHideMessageNow = 0;//ver1.05
                }
            }//隠すボタンを押した場合の処理--ここまで



            //  console.log(this._choiceWindow.hitTest()); //これは駄目だった。常にー１なので参照していない
            //console.log(this);
            //会話中にスイッチをオンにするボタン。
            //#add_btn
            //ボタン追加したかったらコピペして数字▼を変更 ここも ▼
            if (oBackLog.ButtonPress(nButton_1)) {
                $gameSwitches.setValue(nButton_switch_1, true);//
                return true;
            }//

            if (oBackLog.ButtonPress(nButton_2)) {
                $gameSwitches.setValue(nButton_switch_2, true);//
                return true;
            }//

            if (oBackLog.ButtonPress(nButton_3)) {
                $gameSwitches.setValue(nButton_switch_3, true);//
                return true;
            }//

            if (oBackLog.ButtonPress(nButton_4)) {
                $gameSwitches.setValue(nButton_switch_4, true);//
                return true;
            }//
            if (oBackLog.ButtonPress(nButton_5)) {
                $gameSwitches.setValue(nButton_switch_5, true);//
                return true;
            }//
            if (oBackLog.ButtonPress(nButton_6)) {
                $gameSwitches.setValue(nButton_switch_6, true);//
                return true;
            }//

            if (oBackLog.ButtonPress(nButton_7)) {
                $gameSwitches.setValue(nButton_switch_7, true);//
                return true;
            }//
            if (oBackLog.ButtonPress(nButton_8)) {
                $gameSwitches.setValue(nButton_switch_8, true);//
                return true;
            }//

            //追加ボタンの処理はここまで。  

            //バックログ開始のボタンを押した時の処理。
            if (oBackLog.ButtonPress(nBackLogButtonDownId) || oBackLog.ButtonPress(nBackLogButtonUpId)) {

                if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
                if (oBackLog.ButtonPress(nBackLogButtonDownId)) oBackLog._nBackLogPage--;
                if (oBackLog.ButtonPress(nBackLogButtonUpId)) oBackLog._nBackLogPage++;

                TouchInput.clear();
                Input.clear();

                oBackLog.BackLog_Call();
                return false;
                return true;
            }//if(oBackLog.ButtonPress(nBackLogButtonDownId)||oBackLog.ButtonPress(nBackLogButtonUpId) ){

        }//if(TouchInput.isTriggered()&&bButtonON)

        //メッセージが隠れてる状態での右クリックでもバックログを呼び出す　ver1.05 add
        if (!oBackLog._BackLogBusy && !this.visible && TouchInput.isCancelled() && oBackLog.IsSmahoRClick) {

            // debugger;

            TouchInput.clear();
            Input.clear();

            if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
            oBackLog._nBackLogPage++;
            oBackLog.BackLog_Call();
            return true;

        }


        //バックログを表示中の処理
        if (oBackLog._BackLogBusy) {

            //遡る
            if (Input.isTriggered('pageup') || TouchInput._wheelY < 0) {


                TouchInput.clear();
                Input.update();

                if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
                oBackLog._nBackLogPage++;


                oBackLog.BackLog_Call();
                return false;//クリックの反応は悪くなる
                return true;
            }//pageup

            //進める
            if (Input.isTriggered('pagedown') || TouchInput._wheelY > 0) {
                TouchInput.clear();

                Input.update();
                oBackLog._nBackLogPage--;
                oBackLog.BackLog_Call();
                return true;
            }//pagedownn



            //ページマイナスで閉じる。
            if (oBackLog._nBackLogPage <= 0) {
                //console.log("■1189\n");
                oBackLog._BackLogBusy = false;
                oBackLog._nBackLogPage = 0;
                TouchInput.clear();
                Input.clear();
                this.pause = false;
                //   this.terminateMessage();
                //メッセージウィンドウを表示させる。
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });

                return false;
            }//

            //クリック等でもバックログを閉じる。
            if (this.isTriggered() || TouchInput.isCancelled() && oBackLog.IsSmahoRClick()) {
                if (oBackLog._BackLogBusy && oBackLog.ButtonPressUpDownRect('Upkey')) return true;
                if (oBackLog._BackLogBusy && oBackLog.ButtonPressUpDownRect('Downkey')) return true;


                TouchInput.clear();
                Input.clear();
                oBackLog._BackLogBusy = false;
                oBackLog._nBackLogPage = 0;
                //メッセージウィンドウを表示させる。
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });

                oBackLog._nBackLogPage = 0;
                return false;
            }//if (this.isTriggered())

            return true;
        }//oBackLog._BackLogBusy


        //メッセージのクリックを待たない場合の処理
        if (!this.pause) {
            //右クリック隠す機能使わない時の特殊な処理。常に表示する。
            //メッセージウィンドウがなんらかの原因で隠れていても表示する。
            if (!bPoniBKlog_RClickHideON && !oBackLog._BackLogBusy) {
                this.show();
            }


            //メニュー表示中はここを使っているので表示させるべき。

            if ($gameMessage._choices.length > 0) {
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });
            }

        }// if (!this.pause ) 

        //
        if (this.pause) {

            //右クリックを押した時に通常のメッセージウィンドウを消去する。
            if (TouchInput.isCancelled() && oBackLog.IsSmahoRClick() && bPoniBKlog_RClickHideON) {
                if (oBackLog._BackLogBusy && oBackLog.ButtonPressUpDownRect('Upkey')) return true;
                if (oBackLog._BackLogBusy && oBackLog.ButtonPressUpDownRect('Downkey')) return true;

                //	TouchInput.clear () ;  
                //	Input.clear () ; 
                Input.update();


                /*
                //multipleWindowsystemの機能オンオフによる設定
                if( typeof oBackLog._BackLogBusy=="undefined" ){
                    this.hide();
                    this.subWindows().forEach( function(subWindow) { subWindow.hide(); } );
                    this.nameboxHideBackLogScript();
                    return true;
                }
    console.log("oBackLog._BackLogBusy "+oBackLog._BackLogBusy);
    */

                if (this.visible) {
                    this.hide();
                    this.subWindows().forEach(function (subWindow) { subWindow.hide(); });
                    this.nameboxHideBackLogScript();
                    $gameSwitches.setValue(bHideMessageCall_In_SwitchNum, true);//ver1.05
                    bHideMessageNow = 1;
                    //this._nameWindow.close();

                } else {
                    this.show();
                    this.subWindows().forEach(function (subWindow) { subWindow.show(); });
                    this.nameboxShowBackLogScript();
                    if (bHideMessageNow == 1) $gameSwitches.setValue(bHideMessageCall_Out_SwitchNum, true), bHideMessageNow = 0;//ver1.05

                }


                return true;
            }//if (TouchInput.isCancelled()&& oBackLog.IsSmahoRClick() && bPoniBKlog_RClickHideON)



            //backlog-call
            if (Input.isTriggered('pageup') && !oBackLog._BackLogBusy || TouchInput._wheelY < 0 && !oBackLog._BackLogBusy) {
                Input.update();
                if (!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0;
                oBackLog._nBackLogPage++;
                oBackLog.BackLog_Call();

                return true;
            }//            Input


            if (this.isTriggered() && oBackLog._BackLogBusy) {

                if (oBackLog._BackLogBusy && oBackLog.ButtonPressUpDownRect('Upkey')) return true;
                if (oBackLog._BackLogBusy && oBackLog.ButtonPressUpDownRect('Downkey')) return true;

                TouchInput.clear();
                Input.clear();
                //メッセージウィンドウを表示させる。
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });
                if (bHideMessageNow == 1) $gameSwitches.setValue(bHideMessageCall_Out_SwitchNum, true), bHideMessageNow = 0;//ver1.05
                return true;
            }//            Input


            //通常のメッセージ処理
            if (this.isTriggered() || TouchInput.isLongPressed() || TouchInput._wheelY > 0 || Input.isPressed('ok')) {//ver1.01 fix
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });

                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }

            }//if (this.isTriggered()) 


            //自動メッセージ送り　ver1.10 add
            if ($gameSwitches.value(bAutoSkipSwitchNum)) {
                this.show();
                this.subWindows().forEach(function (subWindow) { subWindow.show(); });

                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }

            }//if( $gameSwitches.value(bAutoSkipSwitchNum) )

            return true;
        }//if (this.pause)


        if (this.isAnySubWindowActive()) {
            // this.HideMultiChoiceListBackLogScript(); 
            return true;
        }//選択を切り替えした場合の処置。ないと選択選べない。


        return false;
    };


    //================▲クリックの監視項目ここまで================================
    //--------------

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //--------------------------------------------------
    //==============Window_NameBox
    //	名前欄が空欄の時にも表示されるのを防ぐ為の処置
    //=========
    /*
    //YEPメッセージコアはこのプラグインにほぼ必須だが他のウィンドウメッセージを追加するプラグインを導入すると
    //ウィンドウを新規追加した際にメッセージコアのネームボックスも新規で作られる。
    //その為本来は表示されない空のネームボックスが画面上に出現してしまうようだ。
    //SceneManager._scene. のchildrenにaddするのでそこで作られたウィンドウを処理しなければならない。
    //複数のウィンドウを追加するプラグインではその数分増加する。
    //
    */

    if (Imported.YEP_MessageCore) {
        var _Window_NameBox_prototype_update = Window_NameBox.prototype.update;
        Window_NameBox.prototype.update = function () {

            _Window_NameBox_prototype_update.call(this);

            /*
            if(this._lastNameText==null ||this._lastNameText==""){
            var nBoxlength= parseInt(SceneManager._scene.children.length);
            for(var i=1;i<=nBoxlength;i++){
            var sNameBox=SceneManager._scene.children[i-1]._lastNameText;
            if(sNameBox!="" || sNameBox==null )this._lastNameText=sNameBox
            if(sNameBox==null){this._lastNameText="";}
            }//for
            }//
            */

            /*
            if(this._lastNameText==null ||this._lastNameText==""){this.opacity = 0;}
            else{
                  this.backOpacity = 200;}
            */



            if (this._parentWindow.isOpening()) {
                //console.log("OPENgNow");

                var nBoxlength = parseInt(SceneManager._scene.children.length);
                for (var i = 1; i <= nBoxlength; i++) {
                    var sNameBox = SceneManager._scene.children[i - 1]._lastNameText;
                    if (SceneManager._scene.children[i - 1]._lastNameText = "") SceneManager._scene.children[i - 1].active = false;
                }//for

                /*
                this.opacity = 200;
                      this.backOpacity = 200;
                if(this.x==0 && this.y==0)this.opacity = 0;
                */


            }
            if (this._parentWindow.isClosing()) {
                //console.log("ClosingNow");

                var nBoxlength = parseInt(SceneManager._scene.children.length);
                for (var i = 1; i <= nBoxlength; i++) {
                    SceneManager._scene.children[i - 1]._lastNameText = "";
                    SceneManager._scene.children[i - 1]._text = "";
                    SceneManager._scene.children[i - 1].active = false;

                    //this.opacity = 0;
                }//for
                //	this._lastNameText="";this.opacity = 0;
            }


            this.opacity = 200;
            this.backOpacity = 200;
            if (this.x == 0 && this.y == 0) this.opacity = 0;

            if (this._parentWindow.visible == false) { this.visible = false; }
            else { this.visible = true; }

        };

    }//if (Imported.YEP_MessageCore) {








    //---------------------
    //

    //右クリック時のYEPネームボックス処理
    //multipleWindowプラグイン等でウィンドウが増えてしまった場合
    //ページアップ等と違ってそのままでは名前欄が隠れないようだ。
    //(メッセージウィンドウの書き換え処理の後waitが入ってないので親ウィンドウの状態を取れてないらしい)
    //YEPネームボックスが追加された特徴がある配列にアクセスして
    //親ウィンドウが存在するならばネームボックスの座標を画面外に飛ばす。
    //visibleをfalseにする処理はMultipleWindowプラグインでは元々上に重ねてるらしく意味がなくなってるらしい。

    Window_Message.prototype.nameboxHideBackLogScript = function () {
        if (!Imported.YEP_MessageCore) return;
        var nBoxlength = parseInt(SceneManager._scene.children.length);


        for (var i = 1; i <= nBoxlength; i++) {

            if (this._nameWindow.parent.children[i - 1] != null) {//fix ver1.03a  [i]になってたので[i-1]へ。右クリックでネームボックスが残るバグはこれ
                if (SceneManager._scene.children[i - 1]._parentWindow) {
                    this._nameWindow.parent.children[i - 1].y = -720;
                }

            }//!null
        }//for
        //this._nameWindow.y=-300;



    };





    Window_Message.prototype.nameboxShowBackLogScript = function () {
        if (!Imported.YEP_MessageCore) return;


        var nBoxlength = parseInt(SceneManager._scene.children.length);
        for (var i = 1; i <= nBoxlength; i++) {
            if (this._nameWindow.parent.children[i] != null) {

                if (SceneManager._scene.children[i - 1]._parentWindow) {

                    if (this._nameWindow.parent.children[i - 1]._text != "") {
                        this._nameWindow.parent.children[i - 1].y = 468;
                    }
                }

            }
        }//for


    };

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // Game_Message.prototype.actorName
    //■■■■■■■■■
    //直接$gameActorsをreturnしたら駄目っぽかったので
    //トリアコンタン氏のスクリプトを参考にした。
    Game_Message.prototype.actorName = function (n) {
        var actor = n >= 1 ? $gameActors.actor(n) : null;
        return actor ? actor.name() : '';
    };

    Game_Message.prototype.partyMemberName = function (n) {
        var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
        return actor ? actor.name() : '';
    };

    //===================

    /*
    //■■■■■■■■■■■■■■■■■■■■■■■■■■
    Window_Message.prototype.update = function() {
        this.checkToNotClose();
        Window_Base.prototype.update.call(this);
        while (!this.isOpening() && !this.isClosing()) {
    
    //console.log(this.subWindows());
    
    
            if (this.updateWait()) {
                return;
            } else if (this.updateLoading()) {
                return;
            } else if (this.updateInput()) {//メッセージを進める処理が終わりにある。
                return;
            } else if (this.updateMessage()) {
                return;
            } else if (this.canStart()) {
                this.startMessage();
            } else {
                this.startInput();
                return;
            }
        }
    
    
    };
    
    
    
    
    //メッセージウィンドウ場所
    Window_Message.prototype.updatePlacement = function() {
      this._positionType = $gameMessage.positionType();
      this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
      this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
     //　if(this._positionType === 2) this.y -= 150;
    //console.log("Graphics.boxHeight=" + Graphics.boxHeight)x
    };
    */

    //ウィンドウを開く速さ
    //255を超過するまでフレーム毎に描写するらしい。デフォルトでは８回
    Window_Base.prototype.updateOpen = function () {
        if (this._opening) {
            this.openness += 52;//デフォルト+32
            if ($gameSwitches.value(bWindowOPENCloseSpeedUp_SwitchNum)) this.openness += 152;

            if (this.isOpen()) {
                this._opening = false;
            }
        }
    };
    Window_Base.prototype.updateClose = function () {
        if (this._closing) {
            this.openness -= 52; // 通常は32
            if ($gameSwitches.value(bWindowOPENCloseSpeedUp_SwitchNum)) this.openness -= 152;
            if (this.isClosed()) {
                this._closing = false;
            }
        }
    };



    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //自動メッセージ送り　ver1.10
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /*
    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown      = function(event) {
        _SceneManager_onKeyDown.apply(this, arguments);
    
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 33://pageUP
                   if(!oBackLog._BackLogBusy){
                        TouchInput.clear () ;  
                        Input.update();   
                        if(!oBackLog._nBackLogPage) oBackLog._nBackLogPage = 0 ;
                        oBackLog._nBackLogPage++;
                        oBackLog.BackLog_Call();
                    }
    
                break;
    
                case 34://pageDown
                if(!oBackLog._BackLogBusy){
                     TouchInput.clear () ;  
                     Input.update();   
                     oBackLog._nBackLogPage--;
                     oBackLog.BackLog_Call();
                 }
                break;
            }
        }
    
    };
    */

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //クリック判定
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //タッチパネルのスマホの場合は長押しで右クリック動作になるので
    //画面下部では右クリックでウィンドウをスキップさせる。
    BackLog.prototype.IsSmahoRClick = function () {

        var ua = window.navigator.userAgent.toLowerCase();
        var sTablet = "false";

        if (ua.indexOf('windows') > 0) sTablet = "[PC]";
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            sTablet = "[SmaFo]";
        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            sTablet = "[Pad]";
        }

        //スマホだった場合の処理。画面の3/5より下でクリックされているかどうかを確認する。
        //下なら右クリック処理を無効にする。
        if (sTablet != "[PC]") {
            var ty = TouchInput.y;
            if (3 * Graphics.height / 5 <= ty) { return false; }
        }//

        return true;
    }//


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //ボタン押したかどうか。
    //マウスカーソルの位置がピクチャの範囲内にあるか調べる。
    //メッセージ表示中でも判定が行えるようにしている。


    BackLog.prototype.ButtonPress = function (picID) {


        if ($gameScreen.picture(picID) == null) return 0;
        if ($gameScreen.picture(picID)._visible == false) return 0;
        if ($gameScreen.picture(picID)._opacity == 0) return 0;
        if (Imported.PictureMotion) { if ($gameScreen.picture(picID)._targetOpacity == 0) return 0; }


        var tx = TouchInput.x;
        var ty = TouchInput.y;

        var nPictureId = picID - 1;
        //配列の[0]に１番を入れて順に格納してるのでアクセスする際にずれを訂正しておく。
        //ver0.93 fix 配列がマイナスになるとエラーになるので戻す。
        if (picID <= 0) return;

        //
        var nButtonW, nButtonH;


        var w = parseInt(SceneManager._scene._spriteset._pictureContainer.children[nPictureId].width);//
        var h = parseInt(SceneManager._scene._spriteset._pictureContainer.children[nPictureId].height);//
        nButtonW = w;
        nButtonH = h;

        var nButton_X = parseInt($gameScreen.picture(picID)._x);
        var nButton_Y = parseInt($gameScreen.picture(picID)._y);
        var nButton_w = parseInt(nButtonW * $gameScreen.picture(picID)._scaleX / 100);
        var nButton_h = parseInt(nButtonH * $gameScreen.picture(picID)._scaleY / 100);

        //fix スケールがマイナスの場合は負になるので。
        nButton_w = Math.abs(nButton_w);
        nButton_h = Math.abs(nButton_h);

        //中心座標ならずれる
        if ($gameScreen.picture(picID)._origin == 1) {
            nButton_X = nButton_X - w / 2;
            nButton_Y = nButton_Y - h / 2;
        }//

        var bHantei = (tx >= nButton_X) && (tx <= nButton_X + nButton_w)
            && (ty >= nButton_Y) && (ty <= nButton_Y + nButton_h);


        //if((tx >= nButton_X) && (tx <= nButton_X+nButton_w) && (ty >= nButton_Y) && (ty <= nButton_Y+nButton_h)){	TouchInput.clear () ;Input.clear () ; }

        return (tx >= nButton_X) && (tx <= nButton_X + nButton_w) && (ty >= nButton_Y) && (ty <= nButton_Y + nButton_h);
    };

    //-------------
    //バックログアクティブ中にアップダウンの範囲を押したかどうか。
    BackLog.prototype.ButtonPressUpDownRect = function (BitmapRext) {

        //  if(!oBackLog._BackLogBusy) return 0;
        //  if(!TouchInput.isTriggered() )return 0;

        var tx = TouchInput.x;
        var ty = TouchInput.y;
        var nButton_X = SceneManager._screenWidth - 120;
        var nButton_Y = SceneManager._screenHeight - 180;


        if (tx <= nButton_X) return 0;
        if (ty <= nButton_Y) return 0;

        var nButton_w = 70;
        var nButton_h = 70;

        //エリア内にあるかどうか判定
        if (BitmapRext == "Downkey") {
            nButton_X = SceneManager._screenWidth - 115;
            nButton_Y = SceneManager._screenHeight - 100;
        }
        var bResult = (tx >= nButton_X) && (tx <= nButton_X + nButton_w) && (ty >= nButton_Y) && (ty <= nButton_Y + nButton_h);
        // console.log(BitmapRext+"="+bResult+" tx"+tx+",ty"+ty+"\n");

        return (tx >= nButton_X) && (tx <= nButton_X + nButton_w) && (ty >= nButton_Y) && (ty <= nButton_Y + nButton_h);


    }

    /*
    var bChoiceOnMultipleWindow=false;
    //選択肢
    Window_Message.prototype.HideMultiChoiceListBackLogScript = function() {
        if (!Imported.MultipleWindowSkinSystem)return; 
      //  SceneManager._scene._multipleMessageWindow.get('test-2').close();
       //if(bChoiceOnMultipleWindow)this._choiceWindow.close(); //選択肢を閉じる
           // console.log(this);
          //  console.log(this._choiceWindow);
        //debugger;
        //this._choiceWindow;
       // this._choiceWindow.parent.children.MultipleWindow_ChoiceList.SETTINGS._opacity=0;
      // this._choiceWindow.parent.children[14]._opacity=0;
    
        //console.log(SceneManager._scene._multipleMessageWindow.get('test-2'));
    //    debugger;
        
       
        };
    
    */

    //非アクティブ中にホイールを回した場合の呼び出し。
    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function (event) {
        _SceneManager_onKeyDown.apply(this, arguments);

        try {

            if (!event.ctrlKey && !event.altKey) {
                switch (event.keyCode) {

                    case 33://PageUp key
                        if (!oBackLog._nBackLogPage) {
                            oBackLog._nBackLogPage = 1;
                            oBackLog.BackLog_Call();
                        }
                        break;
                }
            }


        }
        catch (err) { }


    };

})();
