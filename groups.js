let currentGroup = "";

let data = {
  BDA2510: [],
  BDA2503: [],
  CS2509: [],
  AIB2507: [],
  EE2505: []
};

window.onload = () => {
  let params = new URLSearchParams(window.location.search);
  currentGroup = params.get("group");

  document.getElementById("groupTitle").innerText = currentGroup;
  render();
};
