<!DOCTYPE HTML>
<html>
<head>
    <title>Compress</title>

<?php
$commonPath = 'Common/';
$resourcesPath = 'Resources/';
include $commonPath.'header.php';
?>

<script type="text/javascript">
if (location.href.indexOf('cmprss.us') !== -1) {
    location.href = 'http://compress.pjfontillas.localhost';
}
</script>

<script type="text/javascript" src="urls.js"></script>
<script type="text/javascript" src="bookmarks.js"></script>

</head>
<body>
<script type="text/javascript"><!--
google_ad_client = "ca-pub-0798441070151864";
/* Compress Leaderboard Ad */
google_ad_slot = "7571293191";
google_ad_width = 728;
google_ad_height = 90;
//-->
</script>
<div class="horizontal_ad">
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</div>
<div id="compress_container" class="ui-corner-all">
    <div class="tabs">
        <ul>
            <li><a href="#urls">URLs</a></li>
            <li><a href="#bookmarks">Bookmarks</a></li>
        </ul>
        <div id="urls">
            <form id="compress_url_form" method="post">
                <div>
                    <input id="compress_url_form-url" class="required complete_url" name="url" type="text" value="Shorten Links Here" tabIndex="1" />
                    <input id="compress_url_form-source" name="source" type="hidden" value="html"/>
                    <button type="submit">Compress!</button>
                </div>
            </form><!-- #compress_url_form -->
            <ul id="error_list"></ul>
            <div id="results_header">
                <h5 class="shortened_links">Shortened links</h5>
                <h5 class="copy_links"></h5>
                <h5 class="long_links">Long links</h5>
            </div><!-- #results_header -->
            <div id="results">
                <div class="clear-float"></div>
            </div><!-- #results -->
            <div class="clear-float"></div>
        </div><!-- #url -->
        <div id="bookmarks">
            <form id="compress_bookmark_form" method="post">
                <div>
                    <textarea rows="4" col="100" id="compress_bookmark_form-javascript"></textarea>
                </div>
                <div>
                    <button type="submit">Compress JavaScript</button>
                    <button type="reset">Clear</button>
                </div>
                <div>
                    <textarea rows="4" col="100" id="compress_bookmark_form-bookmarklet_source" readonly="readonly"></textarea>
                </div>
                <div>
                    <a href="#" id="compress_bookmark_fork-bookmarklet_link">Your bookmark<a>
                </div>
            </form>
        </div><!-- #bookmarks -->
    </div>
</div>

<?php
include $commonPath.'footer.php';
?>
</body>
</html>
