//=============================================================================
// 遠景色調変更プラグイン
// tintParallax.js
// Copyright (c) 2018 村人Ａ
//=============================================================================

/*:ja
 * @plugindesc 遠景の色調を変更するプラグインです
 * @author 村人A
 *
 * @help
 *
 * プラグインコマンド:
 *	　#「tintParallax」を宣言し、左から赤、緑、青を0～255の間で指定
 *   tintParallax 255 100 0    #赤255、緑100、青0で色調変化
 *   tintParallax 123 221 10    #赤123、緑221、青10で色調変化
 */

(function () {
	villaA_tintParallaxArray = [];
	villaA_tintParallaxOn = false;

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'tintParallax') {
			villaA_tintParallaxArray = [];
			villaA_tintParallaxOn = true;
			for (var i = 0; i < args.length; i++) {
				villaA_tintParallaxArray.push(parseInt(args[i]))
			}
		}
	}

	var _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
	Spriteset_Map.prototype.updateParallax = function () {
		_Spriteset_Map_updateParallax.call(this);

		if (villaA_tintParallaxOn) {
			var num = villaA_tintParallaxArray;
			var tintnum = "";
			for (var i = 0; i < num.length; i++) {
				num[i] = num[i].toString(16)
				if (num[i].length < 2) {
					num[i] = "0" + num[i];
				}
				tintnum = tintnum + num[i]
			}
			tintnum = "0x" + tintnum
			this._parallax.tint = tintnum;
			villaA_tintParallaxOn = false;
		}

	};
})();