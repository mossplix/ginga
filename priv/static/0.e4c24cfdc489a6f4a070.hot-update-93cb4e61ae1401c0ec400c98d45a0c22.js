webpackHotUpdate(0,{

/***/ 1000:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
	// See License.txt for license information.
	
	exports.formatText = formatText;
	exports.doFormatText = doFormatText;
	exports.sanitizeHtml = sanitizeHtml;
	exports.handleClick = handleClick;
	
	var _autolinker = __webpack_require__(1001);
	
	var _autolinker2 = _interopRequireDefault(_autolinker);
	
	var _chat_constants = __webpack_require__(267);
	
	var _chat_constants2 = _interopRequireDefault(_chat_constants);
	
	var _emoticons = __webpack_require__(988);
	
	var Emoticons = _interopRequireWildcard(_emoticons);
	
	var _markdown = __webpack_require__(1002);
	
	var Markdown = _interopRequireWildcard(_markdown);
	
	var _general = __webpack_require__(982);
	
	var Utils = _interopRequireWildcard(_general);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Performs formatting of user posts including highlighting mentions and search terms and converting urls, hashtags, and
	// @mentions to links by taking a user's message and returning a string of formatted html. Also takes a number of options
	// as part of the second parameter:
	// - searchTerm - If specified, this word is highlighted in the resulting html. Defaults to nothing.
	// - mentionHighlight - Specifies whether or not to highlight mentions of the current user. Defaults to true.
	// - singleline - Specifies whether or not to remove newlines. Defaults to false.
	// - emoticons - Enables emoticon parsing. Defaults to true.
	// - markdown - Enables markdown parsing. Defaults to true.
	function formatText(text) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var output = void 0;
	
	    if (!('markdown' in options) || options.markdown) {
	        // the markdown renderer will call doFormatText as necessary
	        output = Markdown.format(text, options);
	    } else {
	        output = sanitizeHtml(text);
	        output = doFormatText(output, options);
	    }
	
	    // replace newlines with spaces if necessary
	    if (options.singleline) {
	        output = replaceNewlines(output);
	    }
	
	    return output;
	}
	
	// Performs most of the actual formatting work for formatText. Not intended to be called normally.
	function doFormatText(text, options) {
	    var output = text;
	
	    var tokens = new Map();
	
	    // replace important words and phrases with tokens
	    output = autolinkAtMentions(output, tokens);
	    output = autolinkEmails(output, tokens);
	    output = autolinkHashtags(output, tokens);
	
	    if (!('emoticons' in options) || options.emoticon) {
	        output = Emoticons.handleEmoticons(output, tokens);
	    }
	
	    if (options.searchTerm) {
	        output = highlightSearchTerm(output, tokens, options.searchTerm);
	    }
	
	    if (!('mentionHighlight' in options) || options.mentionHighlight) {
	        output = highlightCurrentMentions(output, tokens);
	    }
	
	    // reinsert tokens with formatted versions of the important words and phrases
	    output = replaceTokens(output, tokens);
	
	    return output;
	}
	
	function sanitizeHtml(text) {
	    var output = text;
	
	    // normal string.replace only does a single occurrance so use a regex instead
	    output = output.replace(/&/g, '&amp;');
	    output = output.replace(/</g, '&lt;');
	    output = output.replace(/>/g, '&gt;');
	    output = output.replace(/'/g, '&apos;');
	    output = output.replace(/"/g, '&quot;');
	
	    return output;
	}
	
	// Convert emails into tokens
	function autolinkEmails(text, tokens) {
	    function replaceEmailWithToken(autolinker, match) {
	        var linkText = match.getMatchedText();
	        var url = linkText;
	
	        if (match.getType() === 'email') {
	            url = 'mailto:' + url;
	        }
	
	        var index = tokens.size;
	        var alias = 'MM_EMAIL' + index;
	
	        tokens.set(alias, {
	            value: '<a class="theme" href="' + url + '">' + linkText + '</a>',
	            originalText: linkText
	        });
	
	        return alias;
	    }
	
	    // we can't just use a static autolinker because we need to set replaceFn
	    var autolinker = new _autolinker2.default({
	        urls: false,
	        email: true,
	        phone: false,
	        twitter: false,
	        hashtag: false,
	        replaceFn: replaceEmailWithToken
	    });
	
	    return autolinker.link(text);
	}
	
	function autolinkAtMentions(text, tokens) {
	    // Return true if provided character is punctuation
	    function isPunctuation(character) {
	        var re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
	        return re.test(character);
	    }
	
	    // Test if provided text needs to be highlighted, special mention or current user
	    function mentionExists(u) {
	        return _chat_constants2.default.SPECIAL_MENTIONS.indexOf(u) !== -1; //|| UserStore.getProfileByUsername(u));
	    }
	
	    function addToken(username, mention) {
	        var index = tokens.size;
	        var alias = 'MM_ATMENTION' + index;
	
	        tokens.set(alias, {
	            value: '<a class=\'mention-link\' href=\'#\' data-mention=\'' + username + '\'>' + mention + '</a>',
	            originalText: mention
	        });
	        return alias;
	    }
	
	    function replaceAtMentionWithToken(fullMatch, mention, username) {
	        var usernameLower = username.toLowerCase();
	
	        if (mentionExists(usernameLower)) {
	            // Exact match
	            var alias = addToken(usernameLower, mention, '');
	            return alias;
	        }
	
	        // Not an exact match, attempt to truncate any punctuation to see if we can find a user
	        var originalUsername = usernameLower;
	
	        for (var c = usernameLower.length; c > 0; c--) {
	            if (isPunctuation(usernameLower[c - 1])) {
	                usernameLower = usernameLower.substring(0, c - 1);
	
	                if (mentionExists(usernameLower)) {
	                    var suffix = originalUsername.substr(c - 1);
	                    var _alias = addToken(usernameLower, '@' + usernameLower);
	                    return _alias + suffix;
	                }
	            } else {
	                // If the last character is not punctuation, no point in going any further
	                break;
	            }
	        }
	
	        return fullMatch;
	    }
	
	    var output = text;
	    output = output.replace(/(@([a-z0-9.\-_]*))/gi, replaceAtMentionWithToken);
	
	    return output;
	}
	
	function escapeRegex(text) {
	    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	
	function highlightCurrentMentions(text, tokens) {
	    var output = text;
	
	    var mentionKeys = UserStore.getCurrentMentionKeys();
	
	    // look for any existing tokens which are self mentions and should be highlighted
	    var newTokens = new Map();
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2);
	
	            var alias = _step$value[0];
	            var token = _step$value[1];
	
	            if (mentionKeys.indexOf(token.originalText) !== -1) {
	                var index = tokens.size + newTokens.size;
	                var newAlias = 'MM_SELFMENTION' + index;
	
	                newTokens.set(newAlias, {
	                    value: '<span class=\'mention--highlight\'>' + alias + '</span>',
	                    originalText: token.originalText
	                });
	                output = output.replace(alias, newAlias);
	            }
	        }
	
	        // the new tokens are stashed in a separate map since we can't add objects to a map during iteration
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
	
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	        for (var _iterator2 = newTokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var newToken = _step2.value;
	
	            tokens.set(newToken[0], newToken[1]);
	        }
	
	        // look for self mentions in the text
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	
	    function replaceCurrentMentionWithToken(fullMatch, prefix, mention) {
	        var index = tokens.size;
	        var alias = 'MM_SELFMENTION' + index;
	
	        tokens.set(alias, {
	            value: '<span class=\'mention--highlight\'>' + mention + '</span>',
	            originalText: mention
	        });
	
	        return prefix + alias;
	    }
	
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	        for (var _iterator3 = UserStore.getCurrentMentionKeys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var mention = _step3.value;
	
	            // occasionally we get an empty mention which matches a bunch of empty strings
	            if (!mention) {
	                continue;
	            }
	
	            output = output.replace(new RegExp('(^|\\W)(' + escapeRegex(mention) + ')\\b', 'gi'), replaceCurrentMentionWithToken);
	        }
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }
	
	    return output;
	}
	
	function autolinkHashtags(text, tokens) {
	    var output = text;
	
	    var newTokens = new Map();
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;
	
	    try {
	        for (var _iterator4 = tokens[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var _step4$value = _slicedToArray(_step4.value, 2);
	
	            var alias = _step4$value[0];
	            var token = _step4$value[1];
	
	            if (token.originalText.lastIndexOf('#', 0) === 0) {
	                var index = tokens.size + newTokens.size;
	                var newAlias = 'MM_HASHTAG' + index;
	
	                newTokens.set(newAlias, {
	                    value: '<a class=\'mention-link\' href=\'#\' data-hashtag=\'' + token.originalText + '\'>' + token.originalText + '</a>',
	                    originalText: token.originalText
	                });
	
	                output = output.replace(alias, newAlias);
	            }
	        }
	
	        // the new tokens are stashed in a separate map since we can't add objects to a map during iteration
	    } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                _iterator4.return();
	            }
	        } finally {
	            if (_didIteratorError4) {
	                throw _iteratorError4;
	            }
	        }
	    }
	
	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;
	
	    try {
	        for (var _iterator5 = newTokens[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	            var newToken = _step5.value;
	
	            tokens.set(newToken[0], newToken[1]);
	        }
	
	        // look for hashtags in the text
	    } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	            }
	        } finally {
	            if (_didIteratorError5) {
	                throw _iteratorError5;
	            }
	        }
	    }
	
	    function replaceHashtagWithToken(fullMatch, prefix, hashtag) {
	        var index = tokens.size;
	        var alias = 'MM_HASHTAG' + index;
	
	        var value = hashtag;
	
	        if (hashtag.length > _chat_constants2.default.MIN_HASHTAG_LINK_LENGTH) {
	            value = '<a class=\'mention-link\' href=\'#\' data-hashtag=\'' + hashtag + '\'>' + hashtag + '</a>';
	        }
	
	        tokens.set(alias, {
	            value: value,
	            originalText: hashtag
	        });
	
	        return prefix + alias;
	    }
	
	    return output.replace(/(^|\W)(#[a-zA-ZäöüÄÖÜß][a-zA-Z0-9äöüÄÖÜß.\-_]*)\b/g, replaceHashtagWithToken);
	}
	
	var puncStart = /^[.,()&$!\[\]{}':;\\]+/;
	var puncEnd = /[.,()&$#!\[\]{}':;\\]+$/;
	
	function parseSearchTerms(searchTerm) {
	    var terms = [];
	
	    var termString = searchTerm;
	
	    while (termString) {
	        var captured = void 0;
	
	        // check for a quoted string
	        captured = /^"(.*?)"/.exec(termString);
	        if (captured) {
	            termString = termString.substring(captured[0].length);
	            terms.push(captured[1]);
	            continue;
	        }
	
	        // check for a search flag (and don't add it to terms)
	        captured = /^(?:in|from|channel): ?\S+/.exec(termString);
	        if (captured) {
	            termString = termString.substring(captured[0].length);
	            continue;
	        }
	
	        // capture any plain text up until the next quote or search flag
	        captured = /^.+?(?=\bin|\bfrom|\bchannel|"|$)/.exec(termString);
	        if (captured) {
	            var _terms;
	
	            termString = termString.substring(captured[0].length);
	
	            // break the text up into words based on how the server splits them in SqlPostStore.SearchPosts and then discard empty terms
	            (_terms = terms).push.apply(_terms, _toConsumableArray(captured[0].split(/[ <>+\-\(\)\~\@]/).filter(function (term) {
	                return !!term;
	            })));
	            continue;
	        }
	
	        // we should never reach this point since at least one of the regexes should match something in the remaining text
	        throw new Error('Infinite loop in search term parsing: ' + termString);
	    }
	
	    // remove punctuation from each term
	    terms = terms.map(function (term) {
	        return term.replace(puncStart, '').replace(puncEnd, '');
	    });
	
	    return terms;
	}
	
	function convertSearchTermToRegex(term) {
	    var pattern = void 0;
	    if (term.endsWith('*')) {
	        pattern = '\\b' + escapeRegex(term.substring(0, term.length - 1));
	    } else {
	        pattern = '\\b' + escapeRegex(term) + '\\b';
	    }
	
	    return new RegExp(pattern, 'gi');
	}
	
	function highlightSearchTerm(text, tokens, searchTerm) {
	    var terms = parseSearchTerms(searchTerm);
	
	    if (terms.length === 0) {
	        return text;
	    }
	
	    var output = text;
	
	    function replaceSearchTermWithToken(word) {
	        var index = tokens.size;
	        var alias = 'MM_SEARCHTERM' + index;
	
	        tokens.set(alias, {
	            value: '<span class=\'search-highlight\'>' + word + '</span>',
	            originalText: word
	        });
	
	        return alias;
	    }
	
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;
	
	    try {
	        for (var _iterator6 = terms[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var term = _step6.value;
	
	            // highlight existing tokens matching search terms
	            var newTokens = new Map();
	            var _iteratorNormalCompletion7 = true;
	            var _didIteratorError7 = false;
	            var _iteratorError7 = undefined;
	
	            try {
	                for (var _iterator7 = tokens[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                    var _step7$value = _slicedToArray(_step7.value, 2);
	
	                    var alias = _step7$value[0];
	                    var token = _step7$value[1];
	
	                    if (token.originalText === term.replace(/\*$/, '')) {
	                        var index = tokens.size + newTokens.size;
	                        var newAlias = 'MM_SEARCHTERM' + index;
	
	                        newTokens.set(newAlias, {
	                            value: '<span class=\'search-highlight\'>' + alias + '</span>',
	                            originalText: token.originalText
	                        });
	
	                        output = output.replace(alias, newAlias);
	                    }
	                }
	
	                // the new tokens are stashed in a separate map since we can't add objects to a map during iteration
	            } catch (err) {
	                _didIteratorError7 = true;
	                _iteratorError7 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                        _iterator7.return();
	                    }
	                } finally {
	                    if (_didIteratorError7) {
	                        throw _iteratorError7;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;
	
	            try {
	                for (var _iterator8 = newTokens[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var newToken = _step8.value;
	
	                    tokens.set(newToken[0], newToken[1]);
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	
	            output = output.replace(convertSearchTermToRegex(term), replaceSearchTermWithToken);
	        }
	    } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                _iterator6.return();
	            }
	        } finally {
	            if (_didIteratorError6) {
	                throw _iteratorError6;
	            }
	        }
	    }
	
	    return output;
	}
	
	function replaceTokens(text, tokens) {
	    var output = text;
	
	    // iterate backwards through the map so that we do replacement in the opposite order that we added tokens
	    var aliases = [].concat(_toConsumableArray(tokens.keys()));
	    for (var i = aliases.length - 1; i >= 0; i--) {
	        var alias = aliases[i];
	        var token = tokens.get(alias);
	        output = output.replace(alias, token.value);
	    }
	
	    return output;
	}
	
	function replaceNewlines(text) {
	    return text.replace(/\n/g, ' ');
	}
	
	// A click handler that can be used with the results of TextFormatting.formatText to add default functionality
	// to clicked hashtags and @mentions.
	function handleClick(e) {
	    var mentionAttribute = e.target.getAttributeNode('data-mention');
	    var hashtagAttribute = e.target.getAttributeNode('data-hashtag');
	
	    if (mentionAttribute) {
	        Utils.searchForTerm(mentionAttribute.value);
	    } else if (hashtagAttribute) {
	        Utils.searchForTerm(hashtagAttribute.value);
	    }
	}

/***/ }

})
//# sourceMappingURL=0.e4c24cfdc489a6f4a070.hot-update.js.map