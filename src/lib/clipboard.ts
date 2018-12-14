export const copyToClipboard = (text: string) => {
  // create invisible textarea
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  // save selection
  const selected =
    document.getSelection()!.rangeCount > 0
      ? document.getSelection()!.getRangeAt(0)
      : false;

  // copy
  el.select();
  document.execCommand("copy");

  // remove textarea
  document.body.removeChild(el);

  // restore selection
  if (selected) {
    document.getSelection()!.removeAllRanges();
    document.getSelection()!.addRange(selected);
  }
};
