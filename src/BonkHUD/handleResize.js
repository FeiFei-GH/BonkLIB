//@Main{Preload}

// Function to start resizing the UI
bonkHUD.startResizing = function (e, dragItem, dir, ind) {
    e.stopPropagation(); // Prevent triggering dragStart for dragItem

    let startX = e.clientX;
    let startY = e.clientY;
    let windowX = parseInt(window.getComputedStyle(dragItem).right, 10);
    let windowY = parseInt(window.getComputedStyle(dragItem).bottom, 10);
    let startWidth = parseInt(window.getComputedStyle(dragItem).width, 10);
    let startHeight = parseInt(window.getComputedStyle(dragItem).height, 10);

    function doResize(e) {
        bonkHUD.resizeMove(e, startX, startY, windowX, windowY, startWidth, startHeight, dragItem, dir);
    }

    function stopResizing() {
        bonkHUD.resizeEnd(doResize, dragItem, ind);
    }

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResizing, { once: true });
};

// Function to handle the resize event
bonkHUD.resizeMove = function (e, startX, startY, windowX, windowY, startWidth, startHeight, dragItem, dir) {
    let newWidth = 0;
    let newHeight = 0;
    if(dir == "nw") {
        newWidth = startWidth - (e.clientX - startX);
        newHeight = startHeight - (e.clientY - startY);
        dragItem.style.height = bonkHUD.pxTorem(Math.max(30, newHeight)) + 'rem';
        dragItem.style.width = bonkHUD.pxTorem(Math.max(154, newWidth)) + 'rem';
    } else if(dir == "sw") {
        newWidth = startWidth - (e.clientX - startX);
        newHeight = startHeight + (e.clientY - startY);
        dragItem.style.height = bonkHUD.pxTorem(Math.max(30, newHeight)) + 'rem';
        dragItem.style.bottom = bonkHUD.pxTorem(windowY - (newHeight < 30 ? 30 - startHeight : e.clientY - startY)) + 'rem';
        dragItem.style.width = bonkHUD.pxTorem(Math.max(154, newWidth)) + 'rem';
    } else if(dir == "ne") {
        newWidth = startWidth + (e.clientX - startX);
        newHeight = startHeight - (e.clientY - startY);
        dragItem.style.height = bonkHUD.pxTorem(Math.max(30, newHeight)) + 'rem';
        dragItem.style.width = bonkHUD.pxTorem(Math.max(154, newWidth)) + 'rem';
        dragItem.style.right = bonkHUD.pxTorem(windowX - (newWidth < 154 ? 154 - startWidth : e.clientX - startX)) + 'rem';
    } else {
        newWidth = startWidth + (e.clientX - startX);
        newHeight = startHeight + (e.clientY - startY);
        dragItem.style.height = bonkHUD.pxTorem(Math.max(30, newHeight)) + 'rem';
        dragItem.style.bottom = bonkHUD.pxTorem(windowY - (newHeight < 30 ? 30 - startHeight : e.clientY - startY)) + 'rem';
        dragItem.style.width = bonkHUD.pxTorem(Math.max(154, newWidth)) + 'rem';
        dragItem.style.right = bonkHUD.pxTorem(windowX - (newWidth < 154 ? 154 - startWidth : e.clientX - startX)) + 'rem';
    }
};

// Function to stop the resize event
bonkHUD.resizeEnd = function (resizeMoveFn, dragItem, ind) {
    document.removeEventListener('mousemove', resizeMoveFn);
    //let ind = bonkHUD.getWindowIndexByID(dragItem.id.substring(0, dragItem.id.length - 5));
    bonkHUD.windowHold[ind].width = dragItem.style.width;
    bonkHUD.windowHold[ind].height = dragItem.style.height;
    bonkHUD.windowHold[ind].bottom = dragItem.style.bottom;
    bonkHUD.windowHold[ind].right = dragItem.style.right;
    bonkHUD.saveUISetting(ind);
};