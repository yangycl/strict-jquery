// 全域函式
const $$$Func: $$$Type = {
    getid: (id) => {
        const ele = document.getElementById(id);
        if (!ele) throw new Error(`Not found element ${id}`);
        return ele;
    },
    getstr: (ele) => ele.innerText,
    gethtmlstr: (ele) => ele.innerHTML,
    getclass: (classname: string) => {
        const nodeList = document.getElementsByClassName(classname);
        const arr: HTMLElement[] = Array.from(nodeList).filter(
            (el): el is HTMLElement => el instanceof HTMLElement
        );
        const result: IdMap = {};
        for (let ele of arr) result[ele.id] = ele;
        return result;
    },
    append(parent, htmlstr) {
        if (parent === document.body) {
            if (document.currentScript?.parentElement === document.body && document.currentScript) {
                document.currentScript.insertAdjacentHTML("beforebegin", htmlstr);
            } else {
                parent.insertAdjacentHTML("beforeend", htmlstr);
            }
        } else {
            parent.insertAdjacentHTML("beforeend", htmlstr);
        }
        return parent;
    },
    getval(ele) {
        if (ele instanceof HTMLInputElement) return ele.value;
        throw new Error("此元素不是input");
    },
    setval(ele, text) {
        if (ele instanceof HTMLInputElement) {
            ele.value = text;
            return;
        }
        throw new Error(`元素 ${ele} 不是input`);
    },
    css(ele: HTMLElement, style?: Record<string, string>) {
        let result: CSSStyleDeclaration | "this";
            
        Object.keys(style ?? {}).forEach((k) => {
            if(style && style[k]){
                ele!.style.setProperty(k, style[k]);
            }
        });
    
        result = "this";
    

        result = getComputedStyle(ele);

        return result;
    },
};

// jquery-like class
class $$$class implements ictJQuery {
    ele: HTMLElement;
    constructor(id: string) {
        this.ele = $$$Func.getid(id);
        if (!this.ele) throw new Error(`The class(ele) ${id} not found`);
    }

    append(htmlstr: string): this {
        $$$Func.append(this.ele, htmlstr);
        return this;
    }

    gethtmlstr(): string {
        return $$$Func.gethtmlstr(this.ele);
    }

    getstr(): string {
        return $$$Func.getstr(this.ele);
    }

    setstr(str: string): this {
        this.ele.innerText = str;
        return this;
    }

    on(event: string, fun: (event: Event) => void): this {
        this.ele.addEventListener(event, fun);
        return this;
    }

    val(text?: string): string | this {
        if (text === undefined) return $$$Func.getval(this.ele);
        if (this.ele instanceof HTMLInputElement) {
            $$$Func.setval(this.ele, text);
            return this;
        }
        throw new Error(`此元素 ${this.ele} 不是input`);
    }

    css(style?: Record<string, string>): CSSStyleDeclaration | this {
        let result;
        if(style){
            result = $$$Func.css(this.ele, style);
        }else{
            result = $$$Func.css(this.ele)
        }
        return result === "this" ? this : result;
    }
}

// 全域函式
function $$$ (id: string): ictJQuery {
    return new $$$class(id);
}
