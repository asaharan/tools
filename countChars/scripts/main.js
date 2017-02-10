var inputTextarea=document.getElementById('inputTextarea');
var outputTextarea=document.getElementById('outputTextarea');
var inputTextareaOldValue='';
var outputTextareaOldValue='';
function updateText(){
	var inputTextareaNewValue=inputTextarea.value.toUpperCase();
	if(!(inputTextareaNewValue==inputTextareaOldValue)){
		var len = inputTextareaNewValue.length;
		outputTextarea.innerHTML=len+' character' + (len > 1 ? 's':'');
		inputTextareaOldValue=inputTextareaNewValue;
	}
}
updateText();
// inputTextarea.addEventListener('keyup',updateText);
// inputTextarea.addEventListener('focus',updateText);