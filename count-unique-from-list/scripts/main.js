var inputTextarea = document.getElementById("inputTextarea");
var totalCountElm = document.getElementById("totalOutput");
var uniqueCountElm = document.getElementById("uniqueCount");
const outputTextarea = document.getElementById("outputTextarea");
var inputTextareaOldValue = "";
var outputTextareaOldValue = "";
function updateText() {
  var inputTextareaValue = inputTextarea.value;
  const items = inputTextareaValue.split(/\s/).filter((s) => s);
  console.log(items);
  const itemsByKey = {};
  items.forEach((item) => (itemsByKey[item] = true));
  const uniqueCount = Object.keys(itemsByKey).length;
  const totalCount = items.length;
  const uniqueItemsString = Object.keys(itemsByKey).join("\n");
  if (!(inputTextareaValue == inputTextareaOldValue)) {
    totalCountElm.innerText = totalCount;
    uniqueCountElm.innerText = uniqueCount;
    inputTextareaOldValue = inputTextareaValue;
    outputTextarea.value = uniqueItemsString;
  }
}
