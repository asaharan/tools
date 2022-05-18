let importLibrary = "@chakra-ui/react";
let output = [];
function onSearchTermChange(e) {
  importLibrary = e.target.value;
  setVSCodeSearchInput();
}
function setVSCodeSearchInput() {
  // \{[a-zA-Z\s,]*\}\sfrom[\s\n]"@chakra-ui/react
  const searchTerm = '\\{[a-zA-Z\\s,]*\\}\\sfrom[\\s\\n]"' + importLibrary;
  console.log(document.getElementById("vs-code-search-input"));
  document
    .getElementById("vs-code-search-input")
    .setAttribute("value", searchTerm);
}
function initialise() {
  setVSCodeSearchInput();
}
function setOutput(items) {
  items.forEach((item) => {
    const itemRoot = document.createElement("span");
    const numberElem = document.createElement("span");
    numberElem.innerText = "(" + item.count + ")";
    const nameElem = document.createElement("span");
    nameElem.innerText = item.name;
    itemRoot.appendChild(nameElem);
    itemRoot.appendChild(numberElem);
    itemRoot.classList.add("root");
    numberElem.classList.add("num");
    nameElem.classList.add("name");
    document.getElementById("output").appendChild(itemRoot);
  });
  document.getElementById("import-name-count").innerText = " " + items.length;
}

const fallbackCopyTextToClipboard = (text, cb) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    cb(null);
  } catch (err) {
    cb(new Error(`Failed to copy: ${text}`));
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};
function copyTextToClipboard(text, cb = () => {}) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      cb(null);
    },
    function (err) {
      cb(new Error(`Failed to copy: ${text}`));
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function copyOutput() {
  let outputToCopy = "";
  output.forEach((i) => {
    outputToCopy += i.name + ": " + i.count + "\n";
  });
  copyTextToClipboard(outputToCopy);
}
window.onload = initialise;
function onInputChange(e) {
  let value = e.target.value;
  window.input = value;
  const importLines = [];
  const importedItems = {};
  let line = "";
  let importHasStarted = false;
  let doubleQuoteHasStarted = false;
  function processLine(line) {
    if (line.includes(importLibrary)) {
      const fixedLine = line.replace(/\n\s*[0-9]*:\s*/g, "");
      importLines.push(fixedLine);
      const items = fixedLine
        .split("}")[0]
        .replace("{", "")
        .replace(/\s/g, "")
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i);
      items.forEach((key) => {
        console.log(key);
        if (!importedItems[key]) {
          importedItems[key] = 0;
        }
        importedItems[key] += 1;
      });
    }
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    let char = value[i];
    line += char;
    const importIndex = line.indexOf("import ");
    if (importIndex !== -1 && importIndex === line.length - 7) {
      //   console.log("setting importHasStarted to true", line, importHasStarted);
      line = "";
      importHasStarted = true;
    }
    if (char === '"') {
      if (doubleQuoteHasStarted) {
        // it's closing now;
        processLine(line);
        doubleQuoteHasStarted = false;
        line = "";
        importHasStarted = false;
      } else {
        doubleQuoteHasStarted = true;
      }
    }
  }
  const items = Object.keys(importedItems)
    .map((name) => ({
      name,
      count: importedItems[name],
    }))
    .sort((i, j) => j.count - i.count);
  document.getElementById("output").innerHTML = "";
  document.getElementById("import-name-count").innerHTML = " 0";
  output = items;
  setOutput(items);
}
