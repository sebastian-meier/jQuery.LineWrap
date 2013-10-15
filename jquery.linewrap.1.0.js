/*!
 * jQuery LineWrap Plugin v1.0
 * https://github.com/sebastian-meier/jQuery.LineWrap
 *
 * Copyright 2011, Sebastian Meier
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function($){ 
	$.fn.linewrap = function(options) {  
		var defaults = {  
			padding: Array(3,10,3,10),
			margin: Array(0,0,0,0),
			background: '#ff0000',
			mode: 'word',
			align: 'left',
			extrapadding: 0
		};
		var options = $.extend(defaults, options);  
		return this.each(function() {  
			var obj = $(this);  
			var p1 = '<span class="jq-linewrap-line jq-linewrap-new">';
			var p2 = '</span>';
			var ow = obj.parent().width();
			obj.parent().width(ow - options.padding[1] - options.padding[3] - 2*options.extrapadding);
			var text = obj.html();
			obj.html(text.substr(0, 2));
			var cHeight = obj.height();
			var lines = new Array();
			var last = 0;
			switch(options.mode){
				case 'word':
					var words = text.split(" ");
					var temp;
					for(var i=1; i<words.length+1; i++){
						temp = new Array();
						for(var j=last; j<i; j++){ temp.push(words[j]); }
						obj.html(temp.join(" "));
						if(cHeight != obj.height()){
							temp = new Array();
							for(var j=last; j<i-1; j++){ temp.push(words[j]); }
							lines.push(temp.join(" "));
							last = i-1;
						}
					}
					temp = new Array();
					for(var j=last; j<words.length; j++){ temp.push(words[j]); }
					lines.push(temp.join(" "));
				break;
				default:
					for(var i=1; i<text.length; i++){
						obj.html(text.substr(last, i-last));
						if(cHeight != obj.height()){
							lines.push(text.substr(last, i-last-1));
							last = i-1;
						}
					}
					lines.push(text.substr(last, text.length-last));
				break;
			}
			obj.parent().css('width', ow);
			var html = "";
			for(var a=0; a<lines.length; a++){
				html += p1+lines[a]+p2;
			}
			obj.html(html+'<hr class="jq-linewrap-clear jq-linewrap-new" />');
			$('.jq-linewrap-line.jq-linewrap-new').removeClass('jq-linewrap-new').css({display:'block',"float":options.align,clear:'both',margin:options.margin[0]+'px '+options.margin[1]+'px '+options.margin[2]+'px '+options.margin[3]+'px',padding:options.padding[0]+'px '+options.padding[1]+'px '+options.padding[2]+'px '+options.padding[3]+'px',backgroundColor:options.background,width:'auto',whiteSpace:'nowrap'});
			$('.jq-linewrap-clear.jq-linewrap-new').removeClass('jq-linewrap-new').css({width:'100%',height:'0px',border:'none',clear:'both',margin:'0',padding:'0'});
		});
	};
})(jQuery);
