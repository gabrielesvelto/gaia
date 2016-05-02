/* global AccessibilityHelper, CallLog */

(function(exports) {
  'use strict';

  var selectors = {
    recents: 'recents-panel',
    keypad: 'keypad-panel'
  };
  var currentDestination = null;

  /**
   * Update the current view by initializing the associated code. This also
   * highlights the navigation bar buttons appropriately.
   *
   * @param {String} destination The destination pane.
   */
  function update(destination) {
    var recent = document.getElementById('option-recents');
    var keypad = document.getElementById('option-keypad');
    var tabs = [recent, keypad];

    recent.classList.remove('toolbar-option-selected');
    keypad.classList.remove('toolbar-option-selected');

    switch (destination) {
      case 'recents':
        checkContactsTab();
        recent.classList.add('toolbar-option-selected');
        AccessibilityHelper.setAriaSelected(recent, tabs);
        CallLog.init();
        break;
      case 'keypad':
        checkContactsTab();
        keypad.classList.add('toolbar-option-selected');
        AccessibilityHelper.setAriaSelected(keypad, tabs);
        break;
    }
  }

  exports.Navigation =  {
    get currentView() {
      return currentDestination;
    },
    show: function(destination) {
      var selector = selectors[destination];
      if (!selector) {
        throw new Error(
          'Navigation: Invalid destination: ' + destination);
      }

      var view = document.getElementById(selector);
      if (!view) {
        throw new Error(
          'Navigation: Panel does not exist: ' + destination
        );
      }

      if (currentDestination && currentDestination === destination) {
        return;
      }
      // Update the status of the tab
      view.style.visibility = 'visible';
      // Remove the status of the previous one
      if (currentDestination) {
        var currentSelector = selectors[currentDestination];
        document.getElementById(currentSelector).style.visibility = 'hidden';
      }
      // Update the current view
      currentDestination = destination;
      update(destination);
    },
    showKeypad: function() {
      this.show('keypad');
    },
    showCalllog: function() {
      this.show('recents');
    }
  };
}(window));
