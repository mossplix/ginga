// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import $ from 'jquery';
import * as AppActions from '../actions/appActions';


import React from 'react';
import {browserHistory} from 'react-router';
import {FormattedTime} from 'react-intl';

import icon50 from 'images/icon50x50.png';
import bing from 'images/bing.mp3';

export function isEmail(email) {
    // writing a regex to match all valid email addresses is really, really hard (see http://stackoverflow.com/a/201378)
    // so we just do a simple check and rely on a verification email to tell if it's a real address
    return (/^.+@.+$/).test(email);
}

export function cleanUpUrlable(input) {
    var cleaned = input.trim().replace(/-/g, ' ').replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s/g, '-');
    cleaned = cleaned.replace(/-{2,}/, '-');
    cleaned = cleaned.replace(/^\-+/, '');
    cleaned = cleaned.replace(/\-+$/, '');
    return cleaned;
}



export function isChrome() {
    if (navigator.userAgent.indexOf('Chrome') > -1) {
        return true;
    }
    return false;
}

export function isSafari() {
    if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
        return true;
    }
    return false;
}

export function isIosChrome() {
    // https://developer.chrome.com/multidevice/user-agent
    return navigator.userAgent.indexOf('CriOS') !== -1;
}

export function isMobileApp() {
    const userAgent = navigator.userAgent;

    // the mobile app has different user agents for the native api calls and the shim, so handle them both
    const isApi = userAgent.indexOf('Mattermost') !== -1;
    const isShim = userAgent.indexOf('iPhone') !== -1 && userAgent.indexOf('Safari') === -1 && userAgent.indexOf('Chrome') === -1;

    return isApi || isShim;
}

export function isFeatureEnabled(feature) {
    return true;
}



var requestedNotificationPermission = false;

export function notifyMe(title, body, channel) {
    if (!('Notification' in window)) {
        return;
    }

    if (Notification.permission === 'granted' || (Notification.permission === 'default' && !requestedNotificationPermission)) {
        requestedNotificationPermission = true;

        Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                try {
                    var notification = new Notification(title, {body: body, tag: body, icon: icon50});
                    notification.onclick = () => {
                        window.focus();
                        if (channel) {
                            AppActions.emitChannelClickEvent(channel);
                        } else {
                            browserHistory.push(TeamStore.getCurrentTeamUrl() + '/channels/town-square');
                        }
                    };
                    setTimeout(() => {
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

export function ding() {
    if (!isBrowserFirefox() && canDing) {
        var audio = new Audio(bing);
        audio.play();
        canDing = false;
        setTimeout(() => {
            canDing = true;
            return;
        }, 3000);
    }
}

export function getUrlParameter(sParam) {
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

export function getDateForUnixTicks(ticks) {
    return new Date(ticks);
}

export function displayDate(ticks) {
    var d = new Date(ticks);
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

export function displayTime(ticks, utc) {
    const d = new Date(ticks);
    let hours;
    let minutes;
    let ampm = '';
    let timezone = '';

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

    const useMilitaryTime = PreferenceStore.getBool(Constants.Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');
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

export function displayTimeFormatted(ticks) {
    const useMilitaryTime = PreferenceStore.getBool(Constants.Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');

    return (
        <FormattedTime
            value={ticks}
            hour='numeric'
            minute='numeric'
            hour12={!useMilitaryTime}
        />
    );
}

export function isMilitaryTime() {
    return PreferenceStore.getBool(Constants.Preferences.CATEGORY_DISPLAY_SETTINGS, 'use_military_time');
}

export function displayDateTime(ticks) {
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

export function displayCommentDateTime(ticks) {
    return displayDate(ticks) + ' ' + displayTime(ticks);
}

// returns Unix timestamp in milliseconds
export function getTimestamp() {
    return Date.now();
}

// extracts links not styled by Markdown
export function extractFirstLink(text) {
    const pattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/i;
    let inText = text;

    // strip out code blocks
    inText = inText.replace(/`[^`]*`/g, '');

    // strip out inline markdown images
    inText = inText.replace(/!\[[^\]]*\]\([^\)]*\)/g, '');

    const match = pattern.exec(inText);
    if (match) {
        return match[0].trim();
    }

    return '';
}

export function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

// Taken from http://stackoverflow.com/questions/1068834/object-comparison-in-javascript and modified slightly
export function areObjectsEqual(x, y) {
    let p;
    const leftChain = [];
    const rightChain = [];

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
    if ((typeof x === 'function' && typeof y === 'function') ||
       (x instanceof Date && y instanceof Date) ||
       (x instanceof RegExp && y instanceof RegExp) ||
       (x instanceof String && y instanceof String) ||
       (x instanceof Number && y instanceof Number)) {
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
        } else if (typeof y[p] !== typeof x[p]) {
            return false;
        }
    }

    for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        } else if (typeof y[p] !== typeof x[p]) {
            return false;
        }

        switch (typeof (x[p])) {
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

export function areMapsEqual(a, b) {
    if (a.size !== b.size) {
        return false;
    }

    for (const [key, value] of a) {
        if (!b.has(key)) {
            return false;
        }

        if (!areObjectsEqual(value, b.get(key))) {
            return false;
        }
    }

    return true;
}

export function replaceHtmlEntities(text) {
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

export function insertHtmlEntities(text) {
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



export function getFileType(extin) {
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

export function getPreviewImagePathForFileType(fileTypeIn) {
    var fileType = fileTypeIn.toLowerCase();

    var icon;
    if (fileType in Constants.ICON_FROM_TYPE) {
        icon = Constants.ICON_FROM_TYPE[fileType];
    } else {
        icon = Constants.ICON_FROM_TYPE.other;
    }

    return icon;
}

export function getIconClassName(fileTypeIn) {
    var fileType = fileTypeIn.toLowerCase();

    if (fileType in Constants.ICON_NAME_FROM_TYPE) {
        return Constants.ICON_NAME_FROM_TYPE[fileType];
    }

    return 'glyphicon-file';
}

export function splitFileLocation(fileLocation) {
    var fileSplit = fileLocation.split('.');

    var ext = '';
    if (fileSplit.length > 1) {
        ext = fileSplit[fileSplit.length - 1];
        fileSplit.splice(fileSplit.length - 1, 1);
    }

    var filePath = fileSplit.join('.');
    var filename = filePath.split('/')[filePath.split('/').length - 1];

    return {ext: ext, name: filename, path: filePath};
}

export function getPreviewImagePath(filename) {
    // Returns the path to a preview image that can be used to represent a file.
    const fileInfo = splitFileLocation(filename);
    const fileType = getFileType(fileInfo.ext);

    if (fileType === 'image') {
        return getFileUrl(fileInfo.path + '_preview.jpg');
    }

    // only images have proper previews, so just use a placeholder icon for non-images
    return getPreviewImagePathForFileType(fileType);
}

export function toTitleCase(str) {
    function doTitleCase(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    return str.replace(/\w\S*/g, doTitleCase);
}







export function placeCaretAtEnd(el) {
    el.focus();
    el.selectionStart = el.value.length;
    el.selectionEnd = el.value.length;

    return;
}

export function getCaretPosition(el) {
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

export function setSelectionRange(input, selectionStart, selectionEnd) {
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

export function setCaretPosition(input, pos) {
    setSelectionRange(input, pos, pos);
}

export function getSelectedText(input) {
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



export function isMobile() {
    return screen.width <= 768;
}

export function isComment(post) {
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

        var blob = new Blob([this.response], {type: mimeType});
        self.src = window.URL.createObjectURL(blob);
    };
    xmlHTTP.onprogress = function onprogress(e) {
        parseInt(self.completedPercentage = (e.loaded / e.total) * 100, 10);
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
export function getWindowLocationOrigin() {
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
export function fileSizeToString(bytes) {
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
export function getFileUrl(filename, isDownload) {
    const downloadParam = isDownload ? '?download=1' : '';
    return getWindowLocationOrigin() + '/api/v1/files/get' + filename + downloadParam;
}

// Gets the name of a file (including extension) from a given url or file path.
export function getFileName(path) {
    var split = path.split('/');
    return split[split.length - 1];
}



// Generates a RFC-4122 version 4 compliant globally unique identifier.
export function generateId() {
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

export function isBrowserFirefox() {
    return navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

// Checks if browser is IE10 or IE11
export function isBrowserIE() {
    if (window.navigator && window.navigator.userAgent) {
        var ua = window.navigator.userAgent;

        return ua.indexOf('Trident/7.0') > 0 || ua.indexOf('Trident/6.0') > 0;
    }

    return false;
}

export function isBrowserEdge() {
    return window.navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('edge') > -1;
}




export function importSlack(file, success, error) {
    var formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('filesize', file.size);
    formData.append('importFrom', 'slack');

    client.importSlack(formData, success, error);
}



export function windowWidth() {
    return $(window).width();
}

export function windowHeight() {
    return $(window).height();
}







// Checks if a data transfer contains files not text, folders, etc..
// Slightly modified from http://stackoverflow.com/questions/6848043/how-do-i-detect-a-file-is-being-dragged-rather-than-a-draggable-element-on-my-pa
export function isFileTransfer(files) {
    if (isBrowserIE()) {
        return files.types != null && files.types.contains('Files');
    }

    return files.types != null && (files.types.indexOf ? files.types.indexOf('Files') !== -1 : files.types.contains('application/x-moz-file'));
}

export function clearFileInput(elm) {
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

export function isPostEphemeral(post) {
    return post.type === Constants.POST_TYPE_EPHEMERAL || post.state === Constants.POST_DELETED;
}

export function getRootId(post) {
    return post.root_id === '' ? post.id : post.root_id;
}

export function localizeMessage(id, defaultMessage) {
    const translations = LocalizationStore.getTranslations();
    if (translations) {
        const value = translations[id];
        if (value) {
            return value;
        }
    }

    if (defaultMessage) {
        return defaultMessage;
    }

    return id;
}

export function getTeamURLFromAddressBar() {
    return window.location.origin + '/' + window.location.pathname.split('/')[1];
}

export function getShortenedTeamURL() {
    const teamURL = getTeamURLFromAddressBar();
    if (teamURL.length > 35) {
        return teamURL.substring(0, 10) + '...' + teamURL.substring(teamURL.length - 12, teamURL.length) + '/';
    }
    return teamURL + '/';
}