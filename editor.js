// this will be used to test / fix the editor selection module in YUI
function testInstBlock (width, height ) {
	// block private 
	var block = document.createElement('div'),
	colors = ['black','green','red','yellow'];
	block.style.height = height;
	block.style.width = width;
	block.setAttribute('contentEditable', false);
	this.numberOfTimesCalled = 0;

	this.getBlock = function () {
		this.numberOfTimesCalled++;
		// different color everytime so we can easily till the block apart
		block.style.backgroundColor = colors[this.numberOfTimesCalled%colors.length];
		return block.cloneNode();
	}
}

testInstBlock.prototype = {
	getNumberOfTimesCalled: function() {
		return this.numberOfTimesCalled;
	},
	convertHTMLElementToString: function(element) {
		var container = document.createElement('div');
		container.appendChild(element);
		return container.innerHTML;
	}
}

YUI().use('node','editor', function(Y) {	
	var editor = new Y.EditorBase({
	    	content: '<p>test string</p>',
	    	extracss: ' '// it will erase existing css if we don't pass sonething
	    }),
	    pastBlock = new testInstBlock(50,10);
	editor.render('#main');
	Y.one('#pasteButton').on('click', 
		(function () { 
			return function() {
				var inst = editor.getInstance(),
					currentNode,
					sel = new inst.EditorSelection();

				// first focus the RTE incase the user focus is else where
				editor.focus();

				// we would like to move to end of line so we don't miss up what the user wrote
				// 1 - get the current node the user is on and save it
				currentNode = sel.anchorNode;
				// 2 - change the selection to be at the end of the node
				sel.selectNode(currentNode, true, 1);

				// insert the block
				editor.execCommand('insertHTML', pastBlock.convertHTMLElementToString(pastBlock.getBlock()));
				// insert html after the block so we can write more in the RTE
				//editor.execCommand('insertParagraph');
		}
	})(editor));
});