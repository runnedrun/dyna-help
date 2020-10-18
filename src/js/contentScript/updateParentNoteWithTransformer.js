const eventFire = (el, etype) => {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    var evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
};

const dispatchMouseEvent = (el) => {
  const elPosition = el.getBoundingClientRect();

  var event = new MouseEvent("mousedown", {
    view: window,
    bubbles: true,
    cancelable: true,
    screenX: elPosition.left,
    screenY: elPosition.top,
  });

  el.dispatchEvent(event);
};

const updateParentNoteWithTransformer = (transformer) => {
  const parentNote = document.querySelector(".Node-renderedContent.node-line");

  const parentNoteContent = document.querySelector(
    ".Node-content.node-line.needsclick"
  );

  const newContent = transformer(parentNoteContent.innerHTML);
  
  if (newContent) {
    dispatchMouseEvent(parentNote);

    return new Promise((resolve) => {      
      setTimeout(() => {
        parentNoteContent.innerHTML = newContent;
        setTimeout(() => {
          eventFire(parentNoteContent, "keydown");
          resolve();
        }, 100);
      }, 100);
    });
  } else {
    const dateNode = document.querySelector(".node-time")
    if (dateNode) {
      console.log("date node")
      dispatchMouseEvent(dateNode)      
    } else {
      dispatchMouseEvent(parentNote);
    }

    return Promise.resolve(false)
  }
};

export default updateParentNoteWithTransformer;
