angular
	.module('quantum')
	.directive('mainContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/elements/main-content.html',
			link: function(scope, tElem, tAttrs) {

				/**
				 * Sidebar scroll relative to media queries
				 */
				tElem.find('[data-toggle=offcanvas]').click(function() {
      				angular.element('.row-offcanvas').toggleClass('active');
    			});
			}
		}
	})