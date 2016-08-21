﻿// Ion.Sound | version 2.1.3 | https://github.com/IonDen/ion.sound
var ion=ion||{};(function(e){var l=function(a){a&&console&&(console.warn&&"function"===typeof console.warn?console.warn(a):console.log&&"function"===typeof console.log&&console.log(a))};if(e.sound)l("ion.sound already exists!");else if("function"!==typeof Audio&&"object"!==typeof Audio){var g=function(){l("HTML5 Audio is not supported in this browser")};e.sound=function(){};e.sound.play=g;e.sound.stop=g;e.sound.destroy=g;g()}else{var f,m=/iPad|iPhone/.test(navigator.appVersion),k,d={},b={},n,h,c;m?(f=function(a){this.name=a.name;this.paused=this.loop=!1;this.callback=this.sound=null},f.prototype={init:function(){this.sound=k},play:function(a){a||(a={});a.loop?this.paused?this._playLoop(this.loop+1):this._playLoop(a.loop):(this.loop=!1,this._play());a.onEnded&&"function"===typeof a.onEnded&&(this.callback=a.onEnded)},_play:function(){if(this.paused)this.paused=!1;else try{this.sound.currentTime=0}catch(a){}this.sound.removeEventListener("ended");this.sound.addEventListener("ended",this._ended.bind(this),!1);this.sound.src=d.path+this.name+h;this.sound.load();this.sound.play()}}):(f=function(a){this.name=a.name;this.volume=d.volume||.5;this.preload=d.preload?"auto":"none";this.paused=this.loop=!1;this.callback=this.sound=null;"volume"in a&&(this.volume=+a.volume);"preload"in a&&(this.preload=a.preload?"auto":"none")},f.prototype={init:function(){this.sound=new Audio;this.sound.src=d.path+this.name+h;this.sound.load();this.sound.preload=this.preload;this.sound.volume=this.volume;this.sound.addEventListener("ended",this._ended.bind(this),!1)},play:function(a){a||(a={});if(a.volume||0===a.volume)this.volume=+a.volume,this.sound.volume=this.volume;a.loop?this.paused?this._playLoop(this.loop+1):this._playLoop(a.loop):(this.loop=!1,this._play());a.onEnded&&"function"===typeof a.onEnded&&(this.callback=a.onEnded)},_play:function(){if(this.paused)this.paused=!1;else try{this.sound.currentTime=0}catch(a){}this.sound.play()}});f.prototype._playLoop=function(a){"boolean"===typeof a?(this.loop=9999999,this._play()):"number"===typeof a&&(this.loop=a-1,this._play())};f.prototype._ended=function(){0<this.loop&&(--this.loop,this._play());this.callback&&this.callback(this.name)};f.prototype.pause=function(){this.paused=!0;this.sound.pause()};f.prototype.stop=function(){this.loop=!1;this.sound.pause();try{this.sound.currentTime=0}catch(a){}};f.prototype.destroy=function(){this.stop();this.sound.removeEventListener("ended",this._ended.bind(this),!1);this.sound.src="";this.sound=null};e.sound=function(a){d=JSON.parse(JSON.stringify(a));d.path=d.path||"";d.volume=d.volume||.5;d.preload=d.preload||!1;d.mix=d.mix||!0;if(n=d.sounds.length){k=new Audio;a=k.canPlayType("audio/mpeg");var e=k.canPlayType("audio/ogg"),g=k.canPlayType('audio/mp4; codecs="mp4a.40.2"');m?"probably"===a?h=".mp3":"probably"===g?h=".aac":"maybe"===a?h=".mp3":"maybe"===g&&(h=".aac"):h="probably"===a?".mp3":"probably"===e?".ogg":"maybe"===a?".mp3":"maybe"===e?".ogg":".wav";for(c=0;c<n;c++)a=d.sounds[c],b[a.name]=new f(a),b[a.name].init()}else l("No sound-files provided!")};e.sound.version="2.1.3";e.sound.play=function(a,c){b[a]&&b[a].play(c)};e.sound.pause=function(a){if(a&&b[a])b[a].pause();else for(c in b)b.hasOwnProperty(c)&&b[c]&&b[c].pause()};e.sound.stop=function(a){if(a&&b[a])b[a].stop();else for(c in b)b.hasOwnProperty(c)&&b[c]&&b[c].stop()};e.sound.destroy=function(a){if(a&&b[a])b[a].destroy(),b[a]=null;else for(c in b)b.hasOwnProperty(c)&&b[c]&&(b[c].destroy(),b[c]=null)}}})(ion);
