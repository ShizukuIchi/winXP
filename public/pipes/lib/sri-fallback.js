/*
 * Implements non-standard "x-sri-fallback" attribute for use with SRI.
 */

(function () {


var attributeName	= 'x-sri-fallback';

function processNode (node) {
	var fallback		= node.getAttribute && node.getAttribute(attributeName);
	var tagName			= (node.tagName || '').toLowerCase();

	var nodeAttribute	=
		tagName === 'script' && node.src ?
			'src' :
			tagName === 'link' && node.rel === 'stylesheet' && node.href ?
				'href' :
				null
	;

	if (fallback && nodeAttribute) {
		node.onerror	= function () {
			var newNode				= document.createElement(tagName);
			newNode.crossOrigin		= node.crossOrigin;
			newNode.integrity		= node.integrity;
			newNode[nodeAttribute]	= fallback;

			if (tagName === 'link') {
				newNode.rel	= node.rel;
			}

			newNode.onerror	= function () {
				console.log(
					'SRI fallback ' +
					fallback +
					' also failed to match integrity string ' +
					newNode.integrity +
					'.'
				);
			};

			document.head.appendChild(newNode);
		};
	}
}

new MutationObserver(function (mutations) {
	for (var i = 0 ; i < mutations.length ; ++i) {
		var mutation	= mutations[i];
		var addedNodes	= mutation.addedNodes;

		for (var j = 0 ; j < addedNodes.length ; ++j) {
			processNode(addedNodes[j]);
		}

		if (mutation.attributeName === attributeName) {
			processNode(mutation.target);
		}
	}
}).observe(document, {
	childList: true,
	attributes: true,
	characterData: false,
	subtree: true,
	attributeOldValue: false,
	attributeFilter: [attributeName]
});


}());
