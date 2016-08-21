webpackHotUpdate(0,{

/***/ 982:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); // Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
	// See License.txt for license information.
	
	exports.isEmail = isEmail;
	exports.cleanUpUrlable = cleanUpUrlable;
	exports.isChrome = isChrome;
	exports.isSafari = isSafari;
	exports.isIosChrome = isIosChrome;
	exports.isMobileApp = isMobileApp;
	exports.isFeatureEnabled = isFeatureEnabled;
	exports.notifyMe = notifyMe;
	exports.ding = ding;
	exports.getUrlParameter = getUrlParameter;
	exports.getDateForUnixTicks = getDateForUnixTicks;
	exports.displayDate = displayDate;
	exports.displayTime = displayTime;
	exports.displayTimeFormatted = displayTimeFormatted;
	exports.isMilitaryTime = isMilitaryTime;
	exports.displayDateTime = displayDateTime;
	exports.displayCommentDateTime = displayCommentDateTime;
	exports.getTimestamp = getTimestamp;
	exports.extractFirstLink = extractFirstLink;
	exports.escapeRegExp = escapeRegExp;
	exports.areObjectsEqual = areObjectsEqual;
	exports.areMapsEqual = areMapsEqual;
	exports.replaceHtmlEntities = replaceHtmlEntities;
	exports.insertHtmlEntities = insertHtmlEntities;
	exports.getFileType = getFileType;
	exports.getPreviewImagePathForFileType = getPreviewImagePathForFileType;
	exports.getIconClassName = getIconClassName;
	exports.splitFileLocation = splitFileLocation;
	exports.getPreviewImagePath = getPreviewImagePath;
	exports.toTitleCase = toTitleCase;
	exports.placeCaretAtEnd = placeCaretAtEnd;
	exports.getCaretPosition = getCaretPosition;
	exports.setSelectionRange = setSelectionRange;
	exports.setCaretPosition = setCaretPosition;
	exports.getSelectedText = getSelectedText;
	exports.isMobile = isMobile;
	exports.isComment = isComment;
	exports.getWindowLocationOrigin = getWindowLocationOrigin;
	exports.fileSizeToString = fileSizeToString;
	exports.getFileUrl = getFileUrl;
	exports.getFileName = getFileName;
	exports.generateId = generateId;
	exports.isBrowserFirefox = isBrowserFirefox;
	exports.isBrowserIE = isBrowserIE;
	exports.isBrowserEdge = isBrowserEdge;
	exports.importSlack = importSlack;
	exports.windowWidth = windowWidth;
	exports.windowHeight = windowHeight;
	exports.isFileTransfer = isFileTransfer;
	exports.clearFileInput = clearFileInput;
	exports.isPostEphemeral = isPostEphemeral;
	exports.getRootId = getRootId;
	exports.localizeMessage = localizeMessage;
	exports.getTeamURLFromAddressBar = getTeamURLFromAddressBar;
	exports.getShortenedTeamURL = getShortenedTeamURL;
	
	var _jquery = __webpack_require__(980);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _appActions = __webpack_require__(983);
	
	var AppActions = _interopRequireWildcard(_appActions);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(159);
	
	var _reactIntl = __webpack_require__(219);
	
	var _icon50x = __webpack_require__(984);
	
	var _icon50x2 = _interopRequireDefault(_icon50x);
	
	var _bing = __webpack_require__(985);
	
	var _bing2 = _interopRequireDefault(_bing);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isEmail(email) {
	    // writing a regex to match all valid email addresses is really, really hard (see http://stackoverflow.com/a/201378)
	    // so we just do a simple check and rely on a verification email to tell if it's a real address
	    return (/^.+@.+$/.test(email)
	    );
	}
	
	function cleanUpUrlable(input) {
	    var cleaned = input.trim().replace(/-/g, ' ').replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s/g, '-');
	    cleaned = cleaned.replace(/-{2,}/, '-');
	    cleaned = cleaned.replace(/^\-+/, '');
	    cleaned = cleaned.replace(/\-+$/, '');
	    return cleaned;
	}
	
	function isChrome() {
	    if (navigator.userAgent.indexOf('Chrome') > -1) {
	        return true;
	    }
	    return false;
	}
	
	function isSafari() {
	    if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
	        return true;
	    }
	    return false;
	}
	
	function isIosChrome() {
	    // https://developer.chrome.com/multidevice/user-agent
	    return navigator.userAgent.indexOf('CriOS') !== -1;
	}
	
	function isMobileApp() {
	    var userAgent = navigator.userAgent;
	
	    // the mobile app has different user agents for the native api calls and the shim, so handle them both
	    var isApi = userAgent.indexOf('Mattermost') !== -1;
	    var isShim = userAgent.indexOf('iPhone') !== -1 && userAgent.indexOf('Safari') === -1 && userAgent.indexOf('Chrome') === -1;
	
	    return isApi || isShim;
	}
	
	function isFeatureEnabled(feature) {
	    return true;
	}
	
	var requestedNotificationPermission = false;
	
	function notifyMe(title, body, channel) {
	    if (!('Notification' in window)) {
	        return;
	    }
	
	    if (Notification.permission === 'granted' || Notification.permission === 'default' && !requestedNotificationPermission) {
	        requestedNotificationPermission = true;
	
	        Notification.requestPermission(function (permission) {
	            if (permission === 'granted') {
	                try {
	                    var notification = new Notification(title, { body: body, tag: body, icon: _icon50x2.default });
	                    notification.onclick = function () {
	                        window.focus();
	                        if (channel) {
	                            AppActions.emitChannelClickEvent(channel);
	                        } else {
	                            _reactRouter.browserHistory.push(TeamStore.getCurrentTeamUrl() + '/channels/town-square');
	                        }
	                    };
	                    setTimeout(function () {
	                        notification.close();
	                    }, 5000);
	                } catch (e) {
	                    console.error(e); //eslint-disable-line no-console
	                }
	            }
	        });
	    }
	}
	
	var canDing = true;
	
	function ding() {
	    if (!isBrowserFirefox() && canDing) {
	        var audio = new Audio(_bing2.default);
	        audio.play();
	        canDing = false;
	        setTimeout(function () {
	            canDing = true;
	            return;
	        }, 3000);
	    }
	}
	
	function getUrlParameter(sParam) {
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] === sParam) {
	            return sParameterName[1];
	        }
	    }
	    return null;
	}
	
	function getDateForUnixTicks(ticks) {
	    return new Date(ticks);
	}
	
	function displayDate(ticks) {
	    var d = new Date(ticks);
	    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	    return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}
	
	function displayTime(ticks, utc) {
	    var d = new Date(ticks);
	    var hours = void 0;
	    var minutes = void 0;
	    var ampm = '';
	    var timezone = '';
	
	    if (utc) {
	        hours = d.getUTCHours();
	        minutes = d.getUTCMinutes();
	        timezone = ' UTC';
	    } else {
	        hours = d.getHours();
	        minutes = d.getMinutes();
	    }
	
	    if (minutes <= 9) {
	        minutes = '0' + minutes;
	    }
	
	    var useMilitaryTime = PreferenceStore.getBool(Constants.Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');
	    if (!useMilitaryTime) {
	        ampm = ' AM';
	        if (hours >= 12) {
	            ampm = ' PM';
	        }
	
	        hours = hours % 12;
	        if (!hours) {
	            hours = '12';
	        }
	    }
	
	    return hours + ':' + minutes + ampm + timezone;
	}
	
	function displayTimeFormatted(ticks) {
	    var useMilitaryTime = PreferenceStore.getBool(Constants.Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');
	
	    return _jsx(_reactIntl.FormattedTime, {
	        value: ticks,
	        hour: 'numeric',
	        minute: 'numeric',
	        hour12: !useMilitaryTime
	    });
	}
	
	function isMilitaryTime() {
	    return PreferenceStore.getBool(Constants.Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');
	}
	
	function displayDateTime(ticks) {
	    var seconds = Math.floor((Date.now() - ticks) / 1000);
	
	    var interval = Math.floor(seconds / 3600);
	
	    if (interval > 24) {
	        return this.displayTime(ticks);
	    }
	
	    if (interval > 1) {
	        return interval + ' hours ago';
	    }
	
	    if (interval === 1) {
	        return interval + ' hour ago';
	    }
	
	    interval = Math.floor(seconds / 60);
	    if (interval >= 2) {
	        return interval + ' minutes ago';
	    }
	
	    if (interval >= 1) {
	        return '1 minute ago';
	    }
	
	    return 'just now';
	}
	
	function displayCommentDateTime(ticks) {
	    return displayDate(ticks) + ' ' + displayTime(ticks);
	}
	
	// returns Unix timestamp in milliseconds
	function getTimestamp() {
	    return Date.now();
	}
	
	// extracts links not styled by Markdown
	function extractFirstLink(text) {
	    var pattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/i;
	    var inText = text;
	
	    // strip out code blocks
	    inText = inText.replace(/`[^`]*`/g, '');
	
	    // strip out inline markdown images
	    inText = inText.replace(/!\[[^\]]*\]\([^\)]*\)/g, '');
	
	    var match = pattern.exec(inText);
	    if (match) {
	        return match[0].trim();
	    }
	
	    return '';
	}
	
	function escapeRegExp(string) {
	    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
	}
	
	// Taken from http://stackoverflow.com/questions/1068834/object-comparison-in-javascript and modified slightly
	function areObjectsEqual(x, y) {
	    var p = void 0;
	    var leftChain = [];
	    var rightChain = [];
	
	    // Remember that NaN === NaN returns false
	    // and isNaN(undefined) returns true
	    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
	        return true;
	    }
	
	    // Compare primitives and functions.
	    // Check if both arguments link to the same object.
	    // Especially useful on step when comparing prototypes
	    if (x === y) {
	        return true;
	    }
	
	    // Works in case when functions are created in constructor.
	    // Comparing dates is a common scenario. Another built-ins?
	    // We can even handle functions passed across iframes
	    if (typeof x === 'function' && typeof y === 'function' || x instanceof Date && y instanceof Date || x instanceof RegExp && y instanceof RegExp || x instanceof String && y instanceof String || x instanceof Number && y instanceof Number) {
	        return x.toString() === y.toString();
	    }
	
	    if (x instanceof Map && y instanceof Map) {
	        return areMapsEqual(x, y);
	    }
	
	    // At last checking prototypes as good a we can
	    if (!(x instanceof Object && y instanceof Object)) {
	        return false;
	    }
	
	    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
	        return false;
	    }
	
	    if (x.constructor !== y.constructor) {
	        return false;
	    }
	
	    if (x.prototype !== y.prototype) {
	        return false;
	    }
	
	    // Check for infinitive linking loops
	    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
	        return false;
	    }
	
	    // Quick checking of one object beeing a subset of another.
	    for (p in y) {
	        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
	            return false;
	        } else if (_typeof(y[p]) !== _typeof(x[p])) {
	            return false;
	        }
	    }
	
	    for (p in x) {
	        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
	            return false;
	        } else if (_typeof(y[p]) !== _typeof(x[p])) {
	            return false;
	        }
	
	        switch (_typeof(x[p])) {
	            case 'object':
	            case 'function':
	
	                leftChain.push(x);
	                rightChain.push(y);
	
	                if (!areObjectsEqual(x[p], y[p])) {
	                    return false;
	                }
	
	                leftChain.pop();
	                rightChain.pop();
	                break;
	
	            default:
	                if (x[p] !== y[p]) {
	                    return false;
	                }
	                break;
	        }
	    }
	
	    return true;
	}
	
	function areMapsEqual(a, b) {
	    if (a.size !== b.size) {
	        return false;
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2);
	
	            var key = _step$value[0];
	            var value = _step$value[1];
	
	            if (!b.has(key)) {
	                return false;
	            }
	
	            if (!areObjectsEqual(value, b.get(key))) {
	                return false;
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    return true;
	}
	
	function replaceHtmlEntities(text) {
	    var tagsToReplace = {
	        '&amp;': '&',
	        '&lt;': '<',
	        '&gt;': '>'
	    };
	    var newtext = text;
	    for (var tag in tagsToReplace) {
	        if ({}.hasOwnProperty.call(tagsToReplace, tag)) {
	            var regex = new RegExp(tag, 'g');
	            newtext = newtext.replace(regex, tagsToReplace[tag]);
	        }
	    }
	    return newtext;
	}
	
	function insertHtmlEntities(text) {
	    var tagsToReplace = {
	        '&': '&amp;',
	        '<': '&lt;',
	        '>': '&gt;'
	    };
	    var newtext = text;
	    for (var tag in tagsToReplace) {
	        if ({}.hasOwnProperty.call(tagsToReplace, tag)) {
	            var regex = new RegExp(tag, 'g');
	            newtext = newtext.replace(regex, tagsToReplace[tag]);
	        }
	    }
	    return newtext;
	}
	
	function getFileType(extin) {
	    var ext = extin.toLowerCase();
	    if (Constants.IMAGE_TYPES.indexOf(ext) > -1) {
	        return 'image';
	    }
	
	    if (Constants.AUDIO_TYPES.indexOf(ext) > -1) {
	        return 'audio';
	    }
	
	    if (Constants.VIDEO_TYPES.indexOf(ext) > -1) {
	        return 'video';
	    }
	
	    if (Constants.SPREADSHEET_TYPES.indexOf(ext) > -1) {
	        return 'spreadsheet';
	    }
	
	    if (Constants.CODE_TYPES.indexOf(ext) > -1) {
	        return 'code';
	    }
	
	    if (Constants.WORD_TYPES.indexOf(ext) > -1) {
	        return 'word';
	    }
	
	    if (Constants.PRESENTATION_TYPES.indexOf(ext) > -1) {
	        return 'presentation';
	    }
	
	    if (Constants.PDF_TYPES.indexOf(ext) > -1) {
	        return 'pdf';
	    }
	
	    if (Constants.PATCH_TYPES.indexOf(ext) > -1) {
	        return 'patch';
	    }
	
	    return 'other';
	}
	
	function getPreviewImagePathForFileType(fileTypeIn) {
	    var fileType = fileTypeIn.toLowerCase();
	
	    var icon;
	    if (fileType in Constants.ICON_FROM_TYPE) {
	        icon = Constants.ICON_FROM_TYPE[fileType];
	    } else {
	        icon = Constants.ICON_FROM_TYPE.other;
	    }
	
	    return icon;
	}
	
	function getIconClassName(fileTypeIn) {
	    var fileType = fileTypeIn.toLowerCase();
	
	    if (fileType in Constants.ICON_NAME_FROM_TYPE) {
	        return Constants.ICON_NAME_FROM_TYPE[fileType];
	    }
	
	    return 'glyphicon-file';
	}
	
	function splitFileLocation(fileLocation) {
	    var fileSplit = fileLocation.split('.');
	
	    var ext = '';
	    if (fileSplit.length > 1) {
	        ext = fileSplit[fileSplit.length - 1];
	        fileSplit.splice(fileSplit.length - 1, 1);
	    }
	
	    var filePath = fileSplit.join('.');
	    var filename = filePath.split('/')[filePath.split('/').length - 1];
	
	    return { ext: ext, name: filename, path: filePath };
	}
	
	function getPreviewImagePath(filename) {
	    // Returns the path to a preview image that can be used to represent a file.
	    var fileInfo = splitFileLocation(filename);
	    var fileType = getFileType(fileInfo.ext);
	
	    if (fileType === 'image') {
	        return getFileUrl(fileInfo.path + '_preview.jpg');
	    }
	
	    // only images have proper previews, so just use a placeholder icon for non-images
	    return getPreviewImagePathForFileType(fileType);
	}
	
	function toTitleCase(str) {
	    function doTitleCase(txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    }
	    return str.replace(/\w\S*/g, doTitleCase);
	}
	
	function placeCaretAtEnd(el) {
	    el.focus();
	    el.selectionStart = el.value.length;
	    el.selectionEnd = el.value.length;
	
	    return;
	}
	
	function getCaretPosition(el) {
	    if (el.selectionStart) {
	        return el.selectionStart;
	    } else if (document.selection) {
	        el.focus();
	
	        var r = document.selection.createRange();
	        if (r == null) {
	            return 0;
	        }
	
	        var re = el.createTextRange();
	        var rc = re.duplicate();
	        re.moveToBookmark(r.getBookmark());
	        rc.setEndPoint('EndToStart', re);
	
	        return rc.text.length;
	    }
	    return 0;
	}
	
	function setSelectionRange(input, selectionStart, selectionEnd) {
	    if (input.setSelectionRange) {
	        input.focus();
	        input.setSelectionRange(selectionStart, selectionEnd);
	    } else if (input.createTextRange) {
	        var range = input.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', selectionEnd);
	        range.moveStart('character', selectionStart);
	        range.select();
	    }
	}
	
	function setCaretPosition(input, pos) {
	    setSelectionRange(input, pos, pos);
	}
	
	function getSelectedText(input) {
	    var selectedText;
	    if (typeof document.selection !== 'undefined') {
	        input.focus();
	        var sel = document.selection.createRange();
	        selectedText = sel.text;
	    } else if (typeof input.selectionStart !== 'undefined') {
	        var startPos = input.selectionStart;
	        var endPos = input.selectionEnd;
	        selectedText = input.value.substring(startPos, endPos);
	    }
	
	    return selectedText;
	}
	
	function isMobile() {
	    return screen.width <= 768;
	}
	
	function isComment(post) {
	    if ('root_id' in post) {
	        return post.root_id !== '' && post.root_id != null;
	    }
	    return false;
	}
	
	Image.prototype.load = function imageLoad(url, progressCallback) {
	    var self = this;
	    var xmlHTTP = new XMLHttpRequest();
	    xmlHTTP.open('GET', url, true);
	    xmlHTTP.responseType = 'arraybuffer';
	    xmlHTTP.onload = function onLoad() {
	        var h = xmlHTTP.getAllResponseHeaders();
	        var m = h.match(/^Content-Type\:\s*(.*?)$/mi);
	        var mimeType = m[1] || 'image/png';
	
	        var blob = new Blob([this.response], { type: mimeType });
	        self.src = window.URL.createObjectURL(blob);
	    };
	    xmlHTTP.onprogress = function onprogress(e) {
	        parseInt(self.completedPercentage = e.loaded / e.total * 100, 10);
	        if (progressCallback) {
	            progressCallback();
	        }
	    };
	    xmlHTTP.onloadstart = function onloadstart() {
	        self.completedPercentage = 0;
	    };
	    xmlHTTP.send();
	};
	
	Image.prototype.completedPercentage = 0;
	
	//IE10 does not set window.location.origin automatically so this must be called instead when using it
	function getWindowLocationOrigin() {
	    var windowLocationOrigin = window.location.origin;
	    if (!windowLocationOrigin) {
	        windowLocationOrigin = window.location.protocol + '//' + window.location.hostname;
	        if (window.location.port) {
	            windowLocationOrigin += ':' + window.location.port;
	        }
	    }
	    return windowLocationOrigin;
	}
	
	// Converts a file size in bytes into a human-readable string of the form '123MB'.
	function fileSizeToString(bytes) {
	    // it's unlikely that we'll have files bigger than this
	    if (bytes > 1024 * 1024 * 1024 * 1024) {
	        return Math.floor(bytes / (1024 * 1024 * 1024 * 1024)) + 'TB';
	    } else if (bytes > 1024 * 1024 * 1024) {
	        return Math.floor(bytes / (1024 * 1024 * 1024)) + 'GB';
	    } else if (bytes > 1024 * 1024) {
	        return Math.floor(bytes / (1024 * 1024)) + 'MB';
	    } else if (bytes > 1024) {
	        return Math.floor(bytes / 1024) + 'KB';
	    }
	
	    return bytes + 'B';
	}
	
	// Converts a filename (like those attached to Post objects) to a url that can be used to retrieve attachments from the server.
	function getFileUrl(filename, isDownload) {
	    var downloadParam = isDownload ? '?download=1' : '';
	    return getWindowLocationOrigin() + '/api/v1/files/get' + filename + downloadParam;
	}
	
	// Gets the name of a file (including extension) from a given url or file path.
	function getFileName(path) {
	    var split = path.split('/');
	    return split[split.length - 1];
	}
	
	// Generates a RFC-4122 version 4 compliant globally unique identifier.
	function generateId() {
	    // implementation taken from http://stackoverflow.com/a/2117523
	    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
	
	    id = id.replace(/[xy]/g, function replaceRandom(c) {
	        var r = Math.floor(Math.random() * 16);
	
	        var v;
	        if (c === 'x') {
	            v = r;
	        } else {
	            v = r & 0x3 | 0x8;
	        }
	
	        return v.toString(16);
	    });
	
	    return id;
	}
	
	function isBrowserFirefox() {
	    return navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	}
	
	// Checks if browser is IE10 or IE11
	function isBrowserIE() {
	    if (window.navigator && window.navigator.userAgent) {
	        var ua = window.navigator.userAgent;
	
	        return ua.indexOf('Trident/7.0') > 0 || ua.indexOf('Trident/6.0') > 0;
	    }
	
	    return false;
	}
	
	function isBrowserEdge() {
	    return window.navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('edge') > -1;
	}
	
	function importSlack(file, success, error) {
	    var formData = new FormData();
	    formData.append('file', file, file.name);
	    formData.append('filesize', file.size);
	    formData.append('importFrom', 'slack');
	
	    client.importSlack(formData, success, error);
	}
	
	function windowWidth() {
	    return (0, _jquery2.default)(window).width();
	}
	
	function windowHeight() {
	    return (0, _jquery2.default)(window).height();
	}
	
	// Checks if a data transfer contains files not text, folders, etc..
	// Slightly modified from http://stackoverflow.com/questions/6848043/how-do-i-detect-a-file-is-being-dragged-rather-than-a-draggable-element-on-my-pa
	function isFileTransfer(files) {
	    if (isBrowserIE()) {
	        return files.types != null && files.types.contains('Files');
	    }
	
	    return files.types != null && (files.types.indexOf ? files.types.indexOf('Files') !== -1 : files.types.contains('application/x-moz-file'));
	}
	
	function clearFileInput(elm) {
	    // clear file input for all modern browsers
	    try {
	        elm.value = '';
	        if (elm.value) {
	            elm.type = 'text';
	            elm.type = 'file';
	        }
	    } catch (e) {
	        // Do nothing
	    }
	}
	
	function isPostEphemeral(post) {
	    return post.type === Constants.POST_TYPE_EPHEMERAL || post.state === Constants.POST_DELETED;
	}
	
	function getRootId(post) {
	    return post.root_id === '' ? post.id : post.root_id;
	}
	
	function localizeMessage(id, defaultMessage) {
	    var translations = LocalizationStore.getTranslations();
	    if (translations) {
	        var value = translations[id];
	        if (value) {
	            return value;
	        }
	    }
	
	    if (defaultMessage) {
	        return defaultMessage;
	    }
	
	    return id;
	}
	
	function getTeamURLFromAddressBar() {
	    return window.location.origin + '/' + window.location.pathname.split('/')[1];
	}
	
	function getShortenedTeamURL() {
	    var teamURL = getTeamURLFromAddressBar();
	    if (teamURL.length > 35) {
	        return teamURL.substring(0, 10) + '...' + teamURL.substring(teamURL.length - 12, teamURL.length) + '/';
	    }
	    return teamURL + '/';
	}

/***/ }

})
//# sourceMappingURL=0.dd48bf75355a27ea5a36.hot-update.js.map