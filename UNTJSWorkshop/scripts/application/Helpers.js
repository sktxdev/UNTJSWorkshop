// ##################################################################################################
// Utility function to auto resize jqgrids when inside tabs:
//  e.g., SetGridAutoResize("#TabSet", ["#tbl1", "#tbl2"]); 
// ##################################################################################################

function SetGridAutoResize(parent, children) {
    parentContainer = parent;
    childGrids = children
    jQuery(window).bind('resize', function () {
        // Get width of parent container
        if (parentContainer != "") {
            var width = jQuery(parentContainer).width();
            if (width == null || width < 1) {
                // For IE, revert to offsetWidth if necessary
                width = $(window).width() - 20;
            }
            width = width - 40; // Fudge factor to prevent horizontal scrollbars and fit inside the tabbed area (parent)
            if (childGrids != null && childGrids.length >= 1) {
                if (width > 0 && Math.abs(width - jQuery(childGrids[0]).width()) > 5) {
                    // Only resize if new width exceeds a minimal threshold
                    // Fixes IE issue with in-place resizing when mousing-over frame bars
                    childGrids.forEach(function (grid) {
                        jQuery(grid).setGridWidth(width);
                    });
                }
            }
        }

    }).trigger('resize');
    // Set initial width based on current window size
    childGrids.forEach(function (grid) {
        if (parentContainer != "") {
            var width = jQuery(parentContainer).width() - 40;
            if (width == null || width < 1) {
                // For IE, revert to offsetWidth if necessary
                width = $(window).width() - 20;
            }
            jQuery(grid).setGridWidth(width);
        }
    });

}
