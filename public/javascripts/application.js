@import "vendor/jquery-1.11.0.min.js";
@import "vendor/details.polyfill.js";
@import "../../govuk_modules/govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js";
@import "../../govuk_modules/govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js";
@import "_showHideContent.js";

$(document).ready(function() {

  // Turn off jQuery animation
  jQuery.fx.off = true;

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Details/summary polyfill
  // See /javascripts/vendor/details.polyfill.js

  // Where .block-label uses the data-target attribute
  // to toggle hidden content
  var toggleContent = new ShowHideContent();
  toggleContent.showHideRadioToggledContent();
  toggleContent.showHideCheckboxToggledContent();
});
