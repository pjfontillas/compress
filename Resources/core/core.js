/**
 *  Core Library
 *
 *  Contains things used to address the fundamental flaws of JavaScript.
 *
 *  Copyright 2011, Patrick James Fontillas
 *  Licensed under the MIT and GPL Version 2 licenses.
 *  
 */

var Core = (function () {
  // private methods and variables
  var version = 200;
  var versionString = "v2.0.0";
  return { // public methods and variables
    config: {
      at: "(AT)",
      dot: "(DOT)",
      debug: false
    },
    /**
     *  getVersion
     *    Returns this library's current version as an integer.
     */
    getVersion: function () {
      return version;
    },
    /**
     *  getVersionString ()
     *    Returns version string.
     */
    getVersionString: function () {
      return versionString;
    },
    /**
     *  changePage (String, Element)
     *    Updates <objectID>'s innerHTML with content from <pageName>.
     */
    changePage: function (pageName, objectID) {
      this.fetchData(pageName, null, objectID);
    },
    /**
     *  createCookie (String, String, Int)
     *    Creates a cookie of <name> with <value>, and lasts for number of <days>.
     */
    createCookie: function (name, value, days) {
      var date = new Date();
      var expires;
      if (days) {
        date.setTime(date.getTime() + (days *  24 *  60 *  60 *  1000));
        expires = ["; expires=", date.toGMTString()].join('');
      } else {
        expires = '';
      }
      document.cookie = [name, '=', value, expires, "; path=/"].join('');
    },
    /**
     *  readCookie (String)
     *    Returns value of cookie <name>, if !found, returns null.
     */
    readCookie: function (name) {
      var nameEQ = [name, '='].join('');
      var ca = document.cookie.split(';');
      for (var i = 0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    },
    getCookie: function (name) {
      readCookie(name);
    },
    /**
     *  eraseCookie (String)
     *    Deletes a cookie by assigning its days to a negative value.
     */
    eraseCookie: function (name) {
      this.createCookie(name, '', -1);
    },
    deleteCookie: function (name) {
      this.eraseCookie(name);
    },
    /**
     *  onLoad(Function)
     *    Similar to the onLoad HTML attribute, onLoad() runs the specified
     *    function after the page is done loading.
     */
    addLoadEvent: function (func) {
      $("document").ready(func);
    },
    onLoad: function (func) {
      this.addLoadEvent(func);
    },
    /**
     *  getUrlVariable (String)
     *    Gets the value of a variable embedded in a URL
     *    (e.g.: http://modevious.com/?jsVars=sweet. Pass the name of the variable
     *    (e.g.'s case: jsVar) to the function to get its value.
     */
    getUrlVariable: function (urlVariable) {
            var locationSuffix = location.href.replace(/&amp;/gi, '&').split('?');
            if (typeof(locationSuffix[1]) !== 'undefined') {
                var variableName;
                variableArray = locationSuffix[1].split('&'); // split using &
                for (var arrayPos = 0; arrayPos < variableArray.length; arrayPos++) {
                    variableName = variableArray[arrayPos].split('=')[0];
                    if (variableName === urlVariable) {
                        return variableArray[arrayPos].split('=')[1];
                    }
                }
            }
            return null;
    },
    getURLVariable: function (URLVariable) {
      return this.getUrlVariable(URLVariable);
    },
    /**
     *  showEmail ()
     *    De-obfuscate any email address on the page, replacing the link content
     *    as well as the href attribute.
     */
    showEmail: function () {
      var url;
      $(".enc_email").each(function (a) {
        url = a.href.replace(this.config.at, '@');
        url = url.replace(this.config.dot, '.');
        a.href = url;
        url = url.replace("mailto:", '');
        a.update(url);
      }.bind(this));
    },
    /**
     *  getTime ()
     *    Returns time in HH:MM AM/PM format.
     */
    getTime: function () {
      var a_p = "";
      var d = new Date();
      var curr_hour = d.getHours();
      if (curr_hour < 12) {
        a_p = "AM";
      } else {
        a_p = "PM";
      }
      if (curr_hour === 0) {
        curr_hour = 12;
      }
      if (curr_hour > 12) {
        curr_hour = curr_hour - 12;
      }
      var curr_min = d.getMinutes();
      curr_min = [
        curr_min,
        ''
      ].join('');
      if (curr_min < 10) {
        curr_min = [
          '0',
          curr_min
        ].join('');
      }
      var curr_s = d.getSeconds();
      if (curr_s < 10) {
        curr_s = [
          '0',
          curr_s
        ].join('');
      }
      var curr_ms = d.getMilliseconds();
      if (curr_ms < 100) {
        curr_ms = [
          '0',
          curr_ms
        ].join('');
      }
      return [
        curr_hour,
        ':',
        curr_min,
        ':',
        curr_s,
        ':',
        curr_ms,
        a_p
      ].join('');
    },
    /**
     *  getFileType (String)
     *    Returns the extension for a file/link/url.
     */
    getFileType: function (file) {
      var extArray = [];
      extArray = file.split('.'); // Store extension in last element of array
      return extArray[extArray.length - 1];
    },
    /**
     *  getFileName (String)
     *    Returns the name for a file/link/url.
     */
    getFileName: function (file) {
      var fileArray = [];
      fileArray = file.split('/'); // Store name in the last element of array
      return fileArray[fileArray.length - 1];
    },
    /**
     *  vAlign ()
     *    Vertically aligns an element relative to their parent element. The
     *    element may not have any top or bottom margins, but may be horizontally
     *    aligned (centered) using "margin: 0px auto;". Using "margin: 50px auto;"
     *    will produce errors, and you should not be setting a margin for
     *    top/bottom anyways since you will are vertically aligning the element!
     *    If an element also has the class "centered" then align it horizontally
     *    as well.
     */
    vAlign: function () {
      var parentHeight;
      var thisHeight;
      var newTop;
      var parentWidth;
      var thisWidth;
      var newLeft;
      // align most elements to their parent element
      $(".vAlign").each(function(){
        // get parent height - get element height
        // get difference and set as new top
        parentHeight = $(this).parent().outerHeight(true);
        thisHeight = $(this).outerHeight(true);
        // get the new top positioning but split the free space in half
        newTop = (parentHeight - thisHeight) / 2;
        // if element is larger than parent somehow (ie element vs browser
        //  window) reset newTop to 0 to prevent pushing the element off-screen.
        if (newTop < 1) {
          newTop = 0;
        }
        // set style
        $(this).css({
          "position": "relative",
          "top": [newTop, "px"].join('')
        });
      });
      // some elements should be aligned with the browser window
      $(".vAlignWindow").each(function(){
        // get browser height - get element height
        parentHeight = document.viewport.getHeight();
        thisHeight = $(this).outerHeight(true);
        newTop = (parentHeight - thisHeight) / 2;
        if (newTop < 1) {
          newTop = 0;
        }
        $(this).css({
          "position": "fixed",
          "top": [newTop, "px"].join('')
        });
        if ($(this).hasClass("centered")) {
          parentWidth = document.viewport.getWidth();
          thisWidth = $(this).outerWidth(true);
          newLeft = (parentWidth - thisWidth) / 2;
          if (newLeft < 1) {
            newLeft = 0;
          }
          $(this).css({
            "left": [newLeft, "px"].join('')
          });
        }
      });
    },
    /**
     *  vAlignThis (element)
     *    Vertically aligns a single element. If they also have the class centered
     *    then align it horizontally as well. Only align the element that is sent
     *    assuming we passed a jQuery element/object
     */
    vAlignThis: function (element) {
      var parentHeight;
      var thisHeight;
      var newTop;
      var parentWidth;
      var thisWidth;
      var newLeft;
      if (element.hasClass("vAlignWindow")) {
        parentHeight = document.viewport.getHeight();
        thisHeight = element.outerHeight(true);
        newTop = (parentHeight - thisHeight) / 2;
        if (newTop < 1) {
          newTop = 0;
        }
        element.css({
          'position': 'fixed',
          'top': newTop + 'px'
        });
        if (element.hasClass('centered')) {
          //alert('single element centered to browser');
          parentWidth = document.viewport.getWidth();
          thisWidth = element.outerWidth(true);
          newLeft = (parentWidth - thisWidth) / 2;
          if (newLeft < 1) {
            newLeft = 0;
          }
          element.css({
            "left": [newLeft, "px"].join('')
          });
        }
      } else {
        parentHeight = element.parent().outerHeight(true);
        thisHeight = element.outerHeight(true);
        newTop = (parentHeight - thisHeight) / 2;
        if (newTop < 1) {
          newTop = 0;
        }
        // set style
        element.css({
          "position": "relative",
          "top": [newTop, "px"].join('')
        });
      }
    },
    /**
     *  setStyleSheet (title)
     *    Activates style sheet or group of style sheets matching <title>.
     */
    setActiveStyleSheet: function (title) {
      var i, a;
      for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") !== -1 &&
          a.getAttribute("title")) {
          a.disabled = true;
          if (a.getAttribute("title") === title) {
            a.disabled = false;
          }
        }
      }
      this.createCookie("style", title, 365);
    },
    /**
     *  getActiveStyleSheet ()
     *    Returns title of active style sheet or group of style sheets.
     */
    getActiveStyleSheet: function () {
      var i, a;
      for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") !== -1 &&
          a.getAttribute("title") && !a.disabled) {
          return a.getAttribute("title");
        }
      }
      return null;
    },
    /**
     *  getFlashMovie (movieName)
     *    Returns element of Flash object requested via <movieName>.
     *    IE, as usual, behaves differently than other browsers.
     */
    getFlashMovie: function (movieName) {
      var isIE = navigator.appName.indexOf("Microsoft") != -1;
      return (isIE) ? window[movieName] : document[movieName];
    }
  };
}());

var $c = Core;

/**
 *  Emulates part of the Firebug console and native console
 *  found in Chrome and Safari. Acts as a wrapper for
 *  several console functions. Can be used as a rudimentary console
 *  if the other options aren't available. Can also be used in a
 *  "debug" mode that captures console logs so they can be sent
 *  via email instead.
 */
if (typeof(console) === 'undefined' || $c.config.debug) {
  console = {
    content: [],
    counter: 0,
    config: {
      code: [ // Konami Code
        Event.KEY_UP,
        Event.KEY_UP,
        Event.KEY_DOWN,
        Event.KEY_DOWN,
        Event.KEY_LEFT,
        Event.KEY_RIGHT,
        Event.KEY_LEFT,
        Event.KEY_RIGHT,
        66,
        65
      ]
    },
    /**
     *  Emulates string substitution found in Firebug.
     *  Returns parsed string.
     */
    parse: function (args) {
      var currentArg = 1;
      var parsedString = args[0];
      while (currentArg < args.length) {
        var subPosition = parsedString.indexOf('%');
        if  (subPosition == -1) {
          // simply concactenate everything
          while (currentArg < args.length) {
            parsedString += ' ' + args[currentArg];
            currentArg++;
          }
        } else {
          var subType = parsedString.charAt(subPosition + 1);
          switch (subType) {
            case 's':
            case 'o':
              parsedString = parsedString.sub('%' + subType, String(args[currentArg]));
              break;
            case 'd':
            case 'i':
            case 'f':
              if (isNaN(args[currentArg])) {
                args[currentArg] = 0;
              }
              parsedString = parsedString.sub('%' + subType, Number(args[currentArg]));
              break;
            case 'c':
              // not currently supported
              break;
            default:
              // invalid substitution code
          }
          currentArg++;
        }
      }
      return parsedString;
    },
    log: function () {
      var args = Array.prototype.slice.call(arguments);
      var output = this.parse(args);
      this.write("Log: " + output);
      return output;
    },
    debug: function () {
      var args = Array.prototype.slice.call(arguments);
      var output = this.parse(args);
      this.write("Debug: " + output);
      return output;
    },
    info: function () {
      var args = Array.prototype.slice.call(arguments);
      var output = this.parse(args);
      this.write("Info: " + output);
      return output;
    },
    warn: function () {
      var args = Array.prototype.slice.call(arguments);
      var output = this.parse(args);
      this.write("Warning: " + output);
      return output;
    },
    error: function () {
      var args = Array.prototype.slice.call(arguments);
      var output = this.parse(args);
      this.write("Error: " + output);
      return output;
    },
    assert: function () {
      var args = Array.prototype.slice.call(arguments);
      var output;
      if (!args[0]) {
        args.shift();
        output = this.parse(args);
        this.write("Assertion failed: " + output);
      }
      return arguments;
    },
    clear: function () {
      $("#modevious_console_text").html('');
    },
    send: function () {
      var url = [
        $c.config.modeviousLocation,
        "send_log.php"
      ].join('');
      var log = $("#modevious_console_text").html();
      var ajaxRequest = new Ajax.Request(url, {
        parameters: {
          method: "post",
          log: log,
          url: window.document.location.href
        },
        onSuccess: function (transport) {
          this.info(transport.responseText);
        },
        onFailure: function (transport) {
          this.warn([
            "There was a problem sending the log. Here is the response:",
            transport.status,
            transport.statusText
          ].join(' '));
        }
      });
    },
    /**
     *  show ()
     *    This function moves the console to just under the current vertical offset.
     */
    show: function () {
      if (typeof(jQuery) === 'undefined') {
        $("#modevious_console").css({
          position: "fixed"
        }).animate({
          top: 0
        });
      } else {
        $("#modevious_console").dialog("open");
      }
    },
    /**
     *  hide ()
     *    Moves the log to its height + 500px above the page, effectively hiding it.
     */
    hide: function () {
      if (typeof(jQuery) === 'undefined') {
        $("#modevious_console").animate({
          top: (($("#modevious_console").height() + 500) * -1) + "px"
        });
      } else {
        $("#modevious_console").dialog("hide");
      }
    },
    /**
     *  checkCode (event)
     *    If key presses are done in the correct order this calls the function
     *    that shows the console.
     */
    checkCode: function (event) {
      if (event.keyCode == this.code[this.counter]) {
        this.counter++;
      } else {
        this.counter = 0;
      }
      if (this.counter == this.config.code.length) {
        this.show();
      }
    },
    /**
     *  write (message)
     *    Stores <message> in a log to serve for debugging regardless of
     *    browser used for testing. Can be sent to a server side
     *    script (PHP, ASP, etc.) that can then store the log in a database
     *    or send it via email.
     */
    write: function (message) {
      var args = Array.prototype.slice.call(arguments);
      // log and debug support
      this.content[this.console.length] = [
        $c.getTime(),
        ": ",
        message
      ].join('');
      $("#modevious_console_text").append([
        "<p>",
        this.content[this.log.length - 1],
        "</p>"
      ].join(''));
      return message; // chains message for possible use with other utilities
    }
  }
  if (typeof(window.$config) !== 'undefined') {
    if (typeof(window.$config.console) !== 'undefined') {
      if (typeof(window.$config.console.code) !== 'undefined') {
        this.config.code = window.$config.console.code;
      }
    }
  }
}

// by the time the document loads the Sound Manager div is already available
$(document).ready(function() {
  // only need to do if sound manager even exists
  if (soundManager !== null) {
    function fixSoundManagerPosition() {
      var soundManagerDiv = $("#sm2-container");
      if (soundManagerDiv === null) {
        setTimeout(fixSoundManagerPosition, 250);
      } else {
        $("#sm2-container").css({
          "position": "absolute",
          "top": "-500px"
        });
        console.log("Fixing soundmanager position.");
      }   
    };
    setTimeout(fixSoundManagerPosition, 250);
  }
});

var stack_topleft = {"dir1": "down", "dir2": "right", "firstpos1": 15, "firstpos2": 15};
var stack_bottomleft = {"dir1": "up", "dir2": "right", "firstpos1": 15, "firstpos2": 15};
var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 15, "firstpos2": 15};

$(document).ready(function() {
  // initialize console
  // if jQuery Dialog is available we will use that
  var theBody = $('body');
  if (typeof(jQuery.fn.dialog) === "undefined") {
    theBody.append([
    "<div id=\"modevious_console\">",
      "<div id=\"modevious_console_top\">",
        "<div id=\"modevious_minimize_console_button\"></div>",
      "</div>",
      "<div id=\"modevious_console_middle\">"
    ].join(''));
  }
  theBody.append("<div id=\"modevious_console_text\"></div>");
  if (typeof(jQuery.fn.dialog) === "undefined") {
    theBody.append([
      "</div>",
      "<div id=\"modevious_console_bottom\"></div>",
    "</div>"
    ].join(''));
    // add close behavior to console close button
    $("#modevious_minimize_console_button").click(function () {
      $("#modevious_console").hide();
    });
    // allow for users to move the console
    $("#modevious_console").draggable({ handle: "#modevious_console_top, #modevious_console_bottom"}).css("position", "fixed");
  } else {
    theWindow = $(window);
    $('#modevious_console_text').dialog({
      autoOpen: false,
      width: theWindow.width() * 0.8,
      height: theWindow.height() * 0.8
    });
  }

  // create keypress listener for code to open console if in debug mode
  if (typeof(console.checkCode) !== 'undefined') {
    if (document.addEventListener) {
      document.addEventListener("keydown", function(event) {
        console.checkCode(event);
      }, false);
    } else {
      document.attachEvent("onkeydown", function(event) {
        console.checkCode(event);
      });
    }
  }

  // initialize jQuery UI
  $(".tabs").tabs();
  $(".accordion").accordion({
    header: "h3",
    autoHeight: false,
    collapsible: true
  });
  $(":button, .button").button();
  $(".buttonset").buttonset();
  $(".draggable").draggable({
    cursor: "move",
    cancel: "p, img, h1, h2, h3, h4, h5, a"
  });
  $(".resizable").resizable();
  console.log("jQuery User Interface initialized.");

  // initialize Expose elements
  $(".expose").click(function(){
    $(this).expose({
      api: true,
      closeOnEsc: false,
      zIndex: 10001
    }).load();
  });
  console.log("Expose elements initialized.");

  // initialize AutoMouseOver elements
  $(".mouse-over").autoMouseOver();
  console.log("AutoMouseOver elements initialized.");

  // initialize email address de-obfuscation
  $c.showEmail();
  console.log("Email addressed de-obfuscated.");

  // set preferred style sheet from cookie if possible
  try {
    if ($c.readCookie("style").length !== 0) {
      $c.setActiveStyleSheet($c.readCookie("style"));
      console.log("Style sheet cookie found, setting active style sheet.");
    }
  } catch (err) {
    console.log("No cookie for style sheet found.");
  }
  console.log("Modevious started and running smoothly!");

  // Automatically initialize $c.vAlign
  var bindVAlign = function(){
    console.log("Window has been resized");
    $(window).unbind("resize", bindVAlign);
    $c.vAlign();
    setTimeout(function () {
      $(window).bind("resize", bindVAlign);
      $c.vAlign();
    }, 250); // 250 ms
  }
  $(window).bind("resize", bindVAlign);

  // After 10 seconds check for Sound Manager, if it fails notify the user and check again in 10 seconds
  setTimeout(function () {
    if (!soundManager.ok()) {
      $.pnotify({
        pnotify_title: "Sound Manager",
        pnotify_text: "Failed to load. Please check that you have Flash installed and that it is not being blocked by a plugin."
      });
      console.log("Sound Manager check after 10 seconds has returned false.");
      setTimeout(function () {
        if (soundManager.ok()) { // false alarm, let the user know that Sound Manager did load correctly
          $.pnotify({
            pnotify_title: "Sound Manager",
            pnotify_text: "False alarm. Sound Manager has finished loading."
          });
          console.log("Sound Manager check after 20 seconds has returned true.");
        } else {
          console.log("Sound Manager check after 20 seconds has returned false.");
        }
      }, 10000);
    } else {
      console.log("Sound Manager check after 10 seconds has returned true.");
    }
  }, 10000);

  //prettyPrint();
  //console.log('Google Code Prettify initialized');
});

