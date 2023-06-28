//=============================================================================
// Lunatlazur_ToggleableMessageVisibility.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Taku Aoi
// This plugin is released under the zlib/libpng License.
// http://zlib.net/zlib_license.html
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2018/04/01
// ----------------------------------------------------------------------------
// [Web]    : https://lunatlazur.com/
// [Twitter]: https://twitter.com/lunatlazur/
// [GitHub] : https://github.com/Lunatlazur/
//=============================================================================
/*:
 * @plugindesc Toggle message window visibility
 * @author Taku Aoi
 * @help This plugin makes message window visibility toggleable.
 * Tap the close button in the upper right corner of the message window or just
 * right-click to hide the message window.
 * If you right-click with the message window not displayed, the message window
 * will be displayed again.
 */
/*:ja
 * @plugindesc メッセージウィンドウ表示切り替えプラグイン
 * @author あおいたく
 * @help このプラグインはメッセージウィンドウの表示／非表示を切替できるようにします。
 * 右クリックまたはメッセージウィンドウ右上の✕ボタンをタップすると、ウィンドウを
 * 非表示にします。
 * 非表示中に右クリックで再表示します。
 */
(function () {
    var pluginName = 'Lunatlazur_ToggleableMessageVisibility';
    // スペースキーを OK でなくスペースキーとして割り当てる
    Input.keyMapper[32] = 'space';
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        switch ((command || '').toUpperCase()) {
            case 'SHOW_MESSAGE':
            case 'メッセージの表示':
                WindowVisibilityManager.setShowing(true);
                break;
            case 'HIDE_MESSAGE':
            case 'メッセージの非表示':
                WindowVisibilityManager.setHiding(true);
                break;
            case 'TOGGLE_MESSAGE':
            case 'メッセージ表示の切替':
                WindowVisibilityManager.setToggling(true);
                break;
        }
    };
    function _Window_Message_toggleMessage() {
        if (this._hideMessageManager.isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    var _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function () {
        this._hideMessageManager = new HideMessageManager;
        _Window_Message_initMembers.call(this);
        if (this._background === 0) {
            this._hideMessageManager.createHideMessageButton(28);
        }
    };
    var _Window_Message_show = Window_Message.prototype.show;
    Window_Message.prototype.show = function () {
        _Window_Message_show.call(this);
        this._hideMessageManager.handleShow();
    };
    var _Window_Message_hide = Window_Message.prototype.hide;
    Window_Message.prototype.hide = function () {
        _Window_Message_hide.call(this);
        this._hideMessageManager.handleHide(this.subWindows());
    };
    function _Window_Message_isHideButtonTouched() {
        if (this.isOpen() && this.active && TouchInput.isTriggered()) {
            return this._hideMessageManager.isHidingTriggered();
        }
        return false;
    }
    var _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function () {
        if (this._hideMessageManager.isHidden) {
            return true;
        }
        if (this._hideMessageManager.isButtonAvailable && _Window_Message_isHideButtonTouched.call(this)) {
            this.hide();
            return true;
        }
        return _Window_Message_updateInput.apply(this, arguments);
    };
    var _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function () {
        if (this._hideMessageManager.isButtonAvailable) {
            this._hideMessageManager.handleOpennessChanged(this.isOpen(), this.x, this.y, this.width, this.height);
        }
        _Window_Message_update.call(this);
    };
    var _Window_Message_updateWait = Window_Message.prototype.updateWait;
    Window_Message.prototype.updateWait = function () {
        if (!this.isClosed() && !$gameMessage.isChoice()) {
            if (Input.isTriggered('space') || TouchInput.isCancelled()) {
                _Window_Message_toggleMessage.call(this);
            }
            else {
                if (WindowVisibilityManager.isHiding()) {
                    this.hide();
                    WindowVisibilityManager.setHiding(false);
                }
                else if (WindowVisibilityManager.isShowing()) {
                    this.show();
                    WindowVisibilityManager.setShowing(false);
                }
                else if (WindowVisibilityManager.isToggling()) {
                    _Window_Message_toggleMessage.call(this);
                    WindowVisibilityManager.setToggling(false);
                }
            }
        }
        var isWaiting = _Window_Message_updateWait.apply(this, arguments);
        if (this._hideMessageManager.isHidden && this.visible) {
            this.hide();
        }
        return isWaiting;
    };
    var _Window_Message_updateBackground = Window_Message.prototype.updateBackground;
    Window_Message.prototype.updateBackground = function () {
        _Window_Message_updateBackground.call(this);
        if (this._background === 0) {
            this._hideMessageManager.enableButton();
        }
        else {
            this._hideMessageManager.disableButton();
        }
    };
    var _Window_ChoiceList_update = Window_ChoiceList.prototype.update;
    Window_ChoiceList.prototype.update = function () {
        if (!this.visible) {
            return;
        }
        _Window_ChoiceList_update.apply(this, arguments);
    };
    var _Window_NumberInput_update = Window_NumberInput.prototype.update;
    Window_NumberInput.prototype.update = function () {
        if (!this.visible) {
            return;
        }
        _Window_NumberInput_update.apply(this, arguments);
    };
    var _Window_EventItem_update = Window_EventItem.prototype.update;
    Window_EventItem.prototype.update = function () {
        if (!this.visible) {
            return;
        }
        _Window_EventItem_update.apply(this, arguments);
    };
    var WindowVisibilityManager = /** @class */ (function () {
        function WindowVisibilityManager() {
        }
        WindowVisibilityManager.setShowing = function (show) {
            this._show = show;
        };
        WindowVisibilityManager.setHiding = function (hide) {
            this._hide = hide;
        };
        WindowVisibilityManager.setToggling = function (toggle) {
            this._toggle = toggle;
        };
        WindowVisibilityManager.isShowing = function () {
            return this._show;
        };
        WindowVisibilityManager.isHiding = function () {
            return this._hide;
        };
        WindowVisibilityManager.isToggling = function () {
            return this._toggle;
        };
        WindowVisibilityManager._show = false;
        WindowVisibilityManager._hide = false;
        WindowVisibilityManager._toggle = false;
        return WindowVisibilityManager;
    }());
    var HideMessageButton = /** @class */ (function () {
        function HideMessageButton(size) {
            var bitmap = new Bitmap(size, size);
            bitmap.fontFace = 'GameFont';
            bitmap.fontSize = size;
            bitmap.textColor = '#ffffff';
            bitmap.drawText('✕', 0, 0, size, size);
            this._sprite = new Sprite(bitmap);
            this._sprite.x = 0;
            this._sprite.y = 0;
            this._sprite.visible = false;
            SceneManager._scene.addChild(this._sprite);
        }
        Object.defineProperty(HideMessageButton.prototype, "x", {
            get: function () {
                return this._sprite.x;
            },
            set: function (x) {
                this._sprite.x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HideMessageButton.prototype, "y", {
            get: function () {
                return this._sprite.y;
            },
            set: function (y) {
                this._sprite.y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HideMessageButton.prototype, "width", {
            get: function () {
                return this._sprite.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HideMessageButton.prototype, "height", {
            get: function () {
                return this._sprite.height;
            },
            enumerable: true,
            configurable: true
        });
        HideMessageButton.prototype.hide = function () {
            this._sprite.visible = false;
        };
        HideMessageButton.prototype.show = function () {
            this._sprite.visible = true;
        };
        HideMessageButton.prototype.adjust = function (right, top) {
            this.x = right - this.width - 4;
            this.y = top + 4;
        };
        HideMessageButton.prototype.isPointInside = function (x, y) {
            return !!(x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height);
        };
        return HideMessageButton;
    }());
    var HideMessageManager = /** @class */ (function () {
        function HideMessageManager() {
            this._hiddenSubWindows = [];
            this._hideMessageButton = null;
            this._isOpened = false;
            this._isHidden = false;
            this._isButtonAvailable = false;
        }
        Object.defineProperty(HideMessageManager.prototype, "isHidden", {
            get: function () {
                return this._isHidden;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HideMessageManager.prototype, "isOpened", {
            get: function () {
                return this._isOpened;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HideMessageManager.prototype, "isButtonAvailable", {
            get: function () {
                return this._isButtonAvailable;
            },
            enumerable: true,
            configurable: true
        });
        HideMessageManager.prototype.createHideMessageButton = function (size) {
            this._hideMessageButton = new HideMessageButton(size);
            this.enableButton();
        };
        HideMessageManager.prototype.enableButton = function () {
            this._isButtonAvailable = true;
        };
        HideMessageManager.prototype.disableButton = function () {
            this._isButtonAvailable = false;
        };
        HideMessageManager.prototype.handleShow = function () {
            if (this.isButtonAvailable) {
                this._hideMessageButton.show();
            }
            this._hiddenSubWindows.forEach(function (subWindow) { return subWindow.show(); });
            this._hiddenSubWindows = [];
            this._isHidden = false;
        };
        HideMessageManager.prototype.handleHide = function (subWindows) {
            var _this = this;
            if (this.isButtonAvailable) {
                this._hideMessageButton.hide();
            }
            subWindows.forEach(function (subWindow) {
                if (subWindow.visible) {
                    subWindow.hide();
                    if (_this._hiddenSubWindows.indexOf(subWindow) === -1) {
                        _this._hiddenSubWindows.push(subWindow);
                    }
                }
            });
            this._isHidden = true;
        };
        HideMessageManager.prototype.handleOpennessChanged = function (opened, x, y, width, height) {
            if (!this.isButtonAvailable) {
                return;
            }
            if (opened) {
                if (!this.isOpened) {
                    this.handleOpened(x, y, width, height);
                }
            }
            else {
                if (this.isOpened) {
                    this.handleClosing();
                }
            }
        };
        HideMessageManager.prototype.handleOpened = function (x, y, width, height) {
            this._isOpened = true;
            if (this.isButtonAvailable) {
                this._hideMessageButton.adjust(width, y);
                this._hideMessageButton.show();
            }
        };
        HideMessageManager.prototype.handleClosing = function () {
            this._isOpened = false;
            if (this.isButtonAvailable) {
                this._hideMessageButton.hide();
            }
        };
        HideMessageManager.prototype.isHidingTriggered = function () {
            if (this.isButtonAvailable && this._hideMessageButton.width) {
                return this._hideMessageButton.isPointInside(TouchInput.x, TouchInput.y);
            }
            return false;
        };
        return HideMessageManager;
    }());
})();
