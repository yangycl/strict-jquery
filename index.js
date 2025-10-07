"use strict";
const $$$Func = {
    getid: (id) => {
        let ele = document.getElementById(id);
        if (!ele) {
            throw new Error(`Not found element ${id}`);
        }
        return ele;
    },
    getstr(ele) {
        return ele.innerText;
    },
    gethtmlstr(ele) {
        return ele.innerHTML;
    },
    getclass(classname) {
        const nodeList = document.getElementsByClassName(classname);
        const arr = Array.from(nodeList).filter((el) => el instanceof HTMLElement);
        const result = {};
        for (let ele of arr) {
            if (ele instanceof HTMLElement) {
                result[ele.id] = ele;
            }
            else {
                console.warn(`The ele ${ele} not is a HTMLElement`);
            }
        }
        return result;
    },
    append(parent, htmlstr) {
        parent === document.body
            ? document.currentScript?.parentElement === document.body && document.currentScript
                ? document.currentScript.insertAdjacentHTML("beforebegin", htmlstr)
                : parent.insertAdjacentHTML("beforeend", htmlstr)
            : parent.insertAdjacentHTML("beforeend", htmlstr);
        return parent;
    }
};
class $$$class {
    ele;
    constructor(id) {
        this.ele = $$$Func.getid(id);
        if (!this.ele) {
            throw new Error(`The class(ele) ${id} not found`);
        }
    }
    append(htmlstr) {
        $$$Func.append(this.ele, htmlstr);
        return this;
    }
    gethtmlstr() {
        return $$$Func.gethtmlstr(this.ele);
    }
    getstr() {
        return $$$Func.getstr(this.ele);
    }
    setstr(str) {
        this.ele.innerText = str;
        return this;
    }
    on(event, fun) {
        if (event === "click") {
            this.ele.addEventListener("click", fun);
        }
        return this;
    }
    ;
}
;
function $$$(id) {
    return new $$$class(id);
}
