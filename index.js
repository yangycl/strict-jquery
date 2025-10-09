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
    },
    getval(ele) {
        if (ele instanceof HTMLInputElement) {
            return ele.value;
        }
        throw new Error("此元素不是input");
    },
    setval(ele, text) {
        if (ele instanceof HTMLInputElement) {
            ele.value = text;
            return;
        }
        throw new Error(`元素 ${ele} 不是input`);
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
        this.ele.addEventListener(event, fun);
        return this;
    }
    val(text) {
        if (text === undefined) {
            return $$$Func.getval(this.ele);
        }
        if (this.ele instanceof HTMLInputElement) {
            $$$Func.setval(this.ele, text);
            return this;
        }
        else {
            throw new Error(`此元素 ${this.ele} 不是input`);
        }
    }
}
;
function $$$(id) {
    return new $$$class(id);
}
