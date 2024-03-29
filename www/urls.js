(function ($) {
    $(document).ready(function () {
        // global variables
        var clip;

        $.validator.addMethod("complete_url", function(val, elem) {
                // if no url, don't do anything
                if (val.length == 0) {
                    return true;
                }

                // if user has not entered http:// https:// or ftp:// assume they mean http://
                if(!/^(http?|https?|ftp):\/\//i.test(val)) {
                        val = 'http://'+val; // set both the value
                        $(elem).val(val); // also update the form element
                }
                // now check if valid url
                // http://docs.jquery.com/Plugins/Validation/Methods/url
                // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
                return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
        }, 'You must enter a valid URL');

        $("#results_header, #error_list").hide();
        $("#compress_url_form-source").val("ajax");
        $("#compress_url_form").validate({
            errorLabelContainer: "#error_list",
            wrapper: "li",
            rules: {
                    url: "complete_url"
            }
        });
        var obj = $("#compress_url_form-url");
        obj.focus(function () {
            if (obj.val() == "Shorten Links Here") {
                obj.val('');
            }
            obj.css("color", "#000");
        });
        /*
        obj.focusout(function () {
            if (obj.val() == '') {
                obj.val("Shorten Links Here");
            }
            obj.css("color", "#000");
        });
        */
        function shortened_link_template(shortened_link) {
            return [
                '<h5 class="shortened_links"><a href="', shortened_link, '" title="', shortened_link, '">', shortened_link, '</a></h5>'
            ].join('');
        }
        function copy_link_template(copy_link) {
            return [
                '<h5 class="copy_links"><a href="', copy_link, '" title="Click to copy - ', copy_link, '">Copy</a></h5>'
            ].join('');
        }
        function long_link_template(long_link) {
            return [
                '<h5 class="long_links"><a href="', long_link, '" title="Long link - ', long_link, '">', long_link, '</a></h5>'
            ].join('');
        }
        $("#compress_url_form").submit(function (event) {
            event.preventDefault();
            if ($("#compress_url_form").valid()) {
                if ($("#compress_url_form-url").val().indexOf("cmprss.us") !== -1) {
                    $.pnotify({
                        pnotify_title: "Error",
                        pnotify_text: "That link is already compressed!"
                    });
                } else {
                    $("#compress_url_form-url, #compress_url_form button").attr("disabled", "disabled");
                    $.post("url_shortener.php", {
                            "url": $("#compress_url_form-url").val(),
                            "source": $("#compress_url_form-source").val()
                        },
                        function (data) {
                            clip.reposition();
                            $("#results_header").show();
                            $("#results").prepend(shortened_link_template(data) + copy_link_template(data) + long_link_template($("#compress_url_form-url").val()));
                            $("#results h5:nth-child(1), #results h5:nth-child(2), #results h5:nth-child(3)").hide().show("clip", 200).effect("highlight", 5000);
                            $(".copy_links a").mouseenter(function (event) {
                                clip.setText($(this).attr("href"));
                                if (clip.div) {
                                    clip.receiveEvent("mouseout", null);
                                    clip.reposition(this);
                                } else {
                                    clip.glue(this);
                                }
                                clip.receiveEvent("click", null);
                            });
                            $("#compress_url_form-url").val(data);
                            $("#compress_url_form-url, #compress_url_form button").removeAttr("disabled");
                        }
                    );
                }
            } else {
                $("#error_list").show();
            }
        });

        ZeroClipboard.setMoviePath("Resources/zeroclipboard/ZeroClipboard.swf");
        clip = new ZeroClipboard.Client();
        clip.addEventListener("onMouseDown", function () {
            $.pnotify({
                pnotify_title: "Success!",
                pnotify_text: "Copied URL to clipboard"
            });
        });
    });
}(jQuery));