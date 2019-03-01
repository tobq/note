export default function () {
    const sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    const pos = sel.toString().length;
    console.log('pos: ' + pos);
    if (sel.anchorNode !== undefined) sel.collapseToEnd();

    return pos;
}