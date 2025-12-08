"use strict";
/// <reference path="types/index.d.ts" />
// 全域函式
const $$$Func = {
    getid: (id) => {
        const ele = document.getElementById(id);
        if (!ele)
            throw new Error(`Not found element ${id}`);
        return ele;
    },
    getstr: (ele) => ele.innerText,
    gethtmlstr: (ele) => ele.innerHTML,
    getclass: (classname) => {
        const nodeList = document.getElementsByClassName(classname);
        const arr = Array.from(nodeList).filter((el) => el instanceof HTMLElement);
        const result = {};
        for (let ele of arr)
            result[ele.id] = ele;
        return result;
    },
    append(parent, htmlstr) {
        if (parent === document.body) {
            if (document.currentScript?.parentElement === document.body && document.currentScript) {
                document.currentScript.insertAdjacentHTML("beforebegin", htmlstr);
            }
            else {
                parent.insertAdjacentHTML("beforeend", htmlstr);
            }
        }
        else {
            parent.insertAdjacentHTML("beforeend", htmlstr);
        }
        return parent;
    },
    getval(ele) {
        if (ele instanceof HTMLInputElement)
            return ele.value;
        throw new Error("此元素不是input");
    },
    setval(ele, text) {
        if (ele instanceof HTMLInputElement) {
            ele.value = text;
            return;
        }
        throw new Error(`元素 ${ele} 不是input`);
    },
    css(ele, style) {
        let result;
        Object.keys(style ?? {}).forEach((k) => {
            if (style && style[k]) {
                ele.style.setProperty(k, style[k]);
                result = "this";
            }
        });
        result = getComputedStyle(ele);
        return result;
    },
    attr(ele, key, value) {
        let result;
        if (typeof value == "string") {
            ele.setAttribute(key, value);
            result = "this";
        }
        else {
            result = ele.getAttribute(key) ?? "";
        }
        return result;
    },
    show(ele) {
        ele.style.display = "";
    },
    hide(ele) {
        ele.style.display = "none";
    },
    state(ele) {
        return ele.style.display;
    }
};
// jquery-like class
class $$$class {
    ele;
    constructor(id) {
        this.ele = $$$Func.getid(id);
        if (!this.ele)
            throw new Error(`The class(ele) ${id} not found`);
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
        if (text === undefined)
            return $$$Func.getval(this.ele);
        if (this.ele instanceof HTMLInputElement) {
            $$$Func.setval(this.ele, text);
            return this;
        }
        throw new Error(`此元素 ${this.ele} 不是input`);
    }
    css(style) {
        let result;
        if (style) {
            result = $$$Func.css(this.ele, style);
        }
        else {
            result = $$$Func.css(this.ele);
        }
        return result === "this" ? this : result;
    }
    attr(key, value) {
        let result = $$$Func.attr(this.ele, key, value);
        return result == "this" ? this : result;
    }
    hide() {
        $$$Func.hide(this.ele);
        return this;
    }
    show() {
        $$$Func.show(this.ele);
        return this;
    }
    state() {
        return $$$Func.state(this.ele);
    }
}
// 全域函式
function $$$(id) {
    return new $$$class(id);
}
