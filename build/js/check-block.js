var checkBlock = (function() {

  var storeCheckTimer = null;

  function bind(checkBlock) {
    if (checkBlock) {
      _bind_checkBlock(checkBlock);
    } else {
      var all_checkBlock = helper.eA(".js-check-block");
      for (var i = 0; i < all_checkBlock.length; i++) {
        _bind_checkBlock(all_checkBlock[i]);
      };
    };
  };

  function _bind_checkBlock(checkBlock) {
    var checkBlockInput = checkBlock.querySelector(".js-check-block-input");
    if (checkBlockInput) {
      checkBlockInput.addEventListener("change", function() {
        clearTimeout(storeCheckTimer);
        storeCheckTimer = setTimeout(delayUpdate, 300, this);
      }, false);
    };
  };

  function delayUpdate(input) {
    _store(input);
    sheet.storeCharacters();
  };

  function _store(input) {
    var checkBlock = helper.getClosest(input, ".js-check-block");
    var checkBlockOptions = helper.makeObject(checkBlock.dataset.checkBlockOptions);
    var newValue = input.checked;
    if (checkBlockOptions.path) {
      helper.setObject({
        object: sheet.getCharacter(),
        path: checkBlockOptions.path,
        newValue: newValue
      });
    };
  };

  function render(checkBlock) {
    if (checkBlock) {
      _render_checkBlock(checkBlock);
    } else {
      var all_checkBlock = helper.eA(".js-check-block");
      for (var i = 0; i < all_checkBlock.length; i++) {
        _render_checkBlock(all_checkBlock[i]);
      };
    };
  };

  function _render_checkBlock(checkBlock) {
    var options = helper.makeObject(checkBlock.dataset.checkBlockOptions);
    var checkBlockInput = checkBlock.querySelector(".js-check-block-input");
    if (options.path) {
      var data = helper.getObject({
        object: sheet.getCharacter(),
        path: options.path
      });
      checkBlockInput.checked = data;
    };
  };

  function clear() {
    var all_checkBlock = helper.eA(".js-check-block");
    for (var i = 0; i < all_checkBlock.length; i++) {
      all_checkBlock[i].checked = false;
    };
  };

  // exposed methods
  return {
    bind: bind,
    clear: clear,
    render: render
  };

})();
