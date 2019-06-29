/* acTooltip (v1.0.0) - Copyright 2019 Joseph Cabral - Licensed under MIT
   Docs: https://github.com/Joe1363/acTooltip
*/
var acTooltip = {
  open: function(id, options) {
    var op = (typeof options == 'object');
    var defaultErrorText = 'Unable to load content at this time.';
    var defaultErrorTooltipStyle = 'border:1px solid #000000;background:#ffffff;min-width:240px;padding:5px;';
    acTooltip.close(id);  // Make sure no other instance is open

    if (id && op) {
      var validAnchors = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
      var anchor = ((options.hasOwnProperty('anchor') && (validAnchors.indexOf(options.anchor) != -1)) ? options.anchor : 'top-right' );
      var anchorObj = {'top-right': 'top:0;right:0;', 'top-left': 'top:0;left:0;', 'bottom-right': 'bottom:0;right:0;', 'bottom-left': 'bottom:0;left:0;'};
      var width = ((op && options.hasOwnProperty('width') && options.width) ? ('width:' + options.width) : ''); // Set width if present
      var addClass = ((op && options.hasOwnProperty('addClass')) ? (' class="' + options.addClass + ' "')  : ''); // Set width if present
      var relClass = "<style>.acttElement{position:relative;}</style>";  // Ensure parent div is position relative
      var overlay = '<div id="acTooltipOverlay" onclick="acTooltip.close(\'' + id + '\');" style="width:100%;height:100%;top:0;right:0;bottom:0;left:0;position:fixed;z-index:998;"></div>';
      var overlayClose = ((op && options.hasOwnProperty('overlayClose') && (typeof options.overlayClose == 'boolean') && (options.overlayClose == true)) ? overlay  : '');
      $('#' + id).parent().addClass('acttElement').append(overlayClose);
      $('#' + id).parent().addClass('acttElement').append('<div id="acTooltip"' + addClass + 'style="position:absolute;z-index:999;display:none;' + anchorObj[anchor] + width + '">' + relClass + '<div id="acTooltipContent"></div></div>');
      showContent(op, options);
    }

    function showContent(op, options) {
      if (op && (options.hasOwnProperty('content'))) {
        if (typeof options.content == 'string') {  // Insert provided content
          $('#acTooltipContent').html(options.content);
          $('#acTooltip').slideDown('fast');
        } else if (op && (typeof options.content == 'object') && (options.content.hasOwnProperty('url'))) {  // Load content from given url and insert
          var data = ((options.content.hasOwnProperty('data')) ? options.content.data : {});
          var type = ((options.content.hasOwnProperty('type')) ? options.content.type : "GET");  // Defaults to GET
          var content = $.ajax({ type: type, dataType: 'json', url: options.content.url, data: data });
          content.done(function(data){
            $('#acTooltipContent').html(data.content);
            $('#acTooltip').slideDown('fast');
          });
          content.fail(function(data){
            var msg = ((data && data.hasOwnProperty('responseJSON') && data.responseJSON.hasOwnProperty('message')) ? data.responseJSON.message : '');
            $('#acTooltipContent').html(getErrorMsg(op, options, msg));  $('#acTooltip').slideDown('fast');
          });
        }
      } else {
        getErrorMsg(op, options, '');  // Show error text if no content
      }
    }
    function getErrorMsg(op, options, msg){
      var text = (msg ? msg : ((op && (options.hasOwnProperty('errorText'))) ? options.errorText : defaultErrorText));
      return '<div id="actError" style="' + defaultErrorTooltipStyle + '">' + text + '</div>';
    }
  },
  close: function(id) {
    $('#acTooltipOverlay, #acTooltip').remove();
    $('#' + id).parent().removeClass('acttElement');
  }
};
