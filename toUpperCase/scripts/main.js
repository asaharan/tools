var inputTextarea=document.getElementById('inputTextarea');
var outputTextarea=document.getElementById('outputTextarea');
var inputTextareaOldValue='';
var outputTextareaOldValue='';
function updateText(){
	var inputTextareaNewValue=inputTextarea.value.toUpperCase();
	if(!(inputTextareaNewValue==inputTextareaOldValue)){
		outputTextarea.value=inputTextareaNewValue;
		inputTextareaOldValue=inputTextareaNewValue;
	}
}
// inputTextarea.addEventListener('keyup',updateText);
// inputTextarea.addEventListener('focus',updateText);