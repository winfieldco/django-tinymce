(function ($) {
  function initTinyMCE($e) {
    if ($e.parents('.empty-form').length == 0) {  // Don't do empty inlines
      var mce_conf = $.parseJSON($e.attr('data-mce-conf'));
      var id = $e.attr('id');
      if ('elements' in mce_conf && mce_conf['mode'] == 'exact') {
        mce_conf['elements'] = id;
      }
      if ($e.attr('data-mce-gz-conf')) {
        tinyMCE_GZ.init($.parseJSON($e.attr('data-mce-gz-conf')));
      }
      if (!tinyMCE.editors[id]) {
        tinyMCE.init(mce_conf);
      }
    }
  }

  $(function () {
    // initialize the TinyMCE editors on load
    $('.tinymce').each(function () {
      initTinyMCE($(this));
    });

    // initialize the TinyMCE editor after adding an inline
    // XXX: We don't use jQuery's click event as it won't work in Django 1.4
    document.body.addEventListener("click", function(ev) {

      // We always use stacked inlines so use this method instead
      var $addRow = $(ev.target).closest('tr').prev();

      setTimeout(function() {  // We have to wait until the inline is added
        $('textarea.tinymce', $addRow.parent()).each(function () {
          initTinyMCE($(this));
        });
      }, 0);
    }, true);
  });
}(django.jQuery));
