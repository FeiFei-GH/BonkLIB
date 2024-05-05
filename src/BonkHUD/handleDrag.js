//@Main{Preload}

bonkHUD.dragStart = function (e, dragItem) {
    bonkHUD.focusWindow(dragItem);
    // Prevents dragging from starting on the opacity slider
    if (e.target.classList.contains("bonkhud-drag-header") && !e.target.classList.contains("bonkhud-resize")) {
        let startX = e.clientX;
        let startY = e.clientY;
        let startRight = parseInt(window.getComputedStyle(dragItem).right, 10);
        let startBottom = parseInt(window.getComputedStyle(dragItem).bottom, 10);
        const boundDragMove = bonkHUD.dragMove.bind(null, startX, startY, startRight, startBottom, dragItem);
        document.addEventListener('mousemove', boundDragMove);
        document.addEventListener('mouseup', () => bonkHUD.dragEnd(boundDragMove, dragItem), { once: true });
    }
};

bonkHUD.dragMove = function (startX, startY, startRight, startBottom, dragItem, e) {
    let w = parseFloat(window.getComputedStyle(dragItem).width) / 2;
    let h = parseFloat(window.getComputedStyle(dragItem).height) / 2;
    let moveX = bonkHUD.clamp(startRight + startX - e.clientX, -w, window.innerWidth - w);
    let moveY = bonkHUD.clamp(startBottom + startY - e.clientY, -h, window.innerHeight - h * 2 + 15);
    dragItem.style.right = bonkHUD.pxTorem(moveX) + "rem";
    dragItem.style.bottom = bonkHUD.pxTorem(moveY) + "rem";
};

bonkHUD.dragEnd = function (dragMoveFn, dragItem) {
    document.removeEventListener('mousemove', dragMoveFn);
    let ind = bonkHUD.getWindowIndexByID(dragItem.id.substring(0, dragItem.id.length - 5));
    bonkHUD.windowHold[ind].width = dragItem.style.width;
    bonkHUD.windowHold[ind].height = dragItem.style.height;
    bonkHUD.windowHold[ind].bottom = dragItem.style.bottom;
    bonkHUD.windowHold[ind].right = dragItem.style.right;
    bonkHUD.saveUISetting(bonkHUD.windowHold[ind].id);
};