function updateLink(e) {
  const phone = e.target.value;
  document.getElementById("link").href =
    "https://api.whatsapp.com/send?phone=+91" + phone;
}

updateLink({ target: { value: "" } });
