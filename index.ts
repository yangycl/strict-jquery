const $$$Func:$$$Type = {
    getid:(id) => {
        let ele = document.getElementById(id);
        if(!ele){
            throw new Error(`Not found element ${id}`);
        }
        return ele;
    },
    getstr(ele) {
        return ele.innerText;
    },
    gethtmlstr(ele){
        return ele.innerHTML;
    },
    getclass(classname:string){
        const nodeList = document.getElementsByClassName(classname);
        const arr:HTMLElement[] = Array.from(nodeList).filter(
            (el): el is HTMLElement => el instanceof HTMLElement
        );
        const result:IdMap = {}
        
        for(let ele of arr){
            if(ele instanceof HTMLElement) {  
                result[ele.id] = ele;
            }else{
                console.warn(`The ele ${ele} not is a HTMLElement`);
            } 
        }
        return result;
    },
    append(parent,htmlstr){
        parent === document.body
            ?document.currentScript?.parentElement === document.body && document.currentScript
                ?document.currentScript.insertAdjacentHTML("beforebegin",htmlstr)
                :parent.insertAdjacentHTML("beforeend",htmlstr)
            :parent.insertAdjacentHTML("beforeend",htmlstr);
        return parent;       
    }
}
class $$$class implements ictJQuery{
    ele: HTMLElement;
    constructor(id:string){
        this.ele = $$$Func.getid(id);
                
        if(!this.ele){
            throw new Error(`The class(ele) ${id} not found`);
        }        
    }
    append(htmlstr: string): this {
        $$$Func.append(this.ele, htmlstr);
        return this;
    }
    gethtmlstr () : string{
        return $$$Func.gethtmlstr(this.ele);
    }
    getstr () : string{
        return $$$Func.getstr(this.ele);
    }
    setstr(str: string) : this{
        this.ele.innerText = str;
        return this;
    }
    on (event: string, fun: (event: Event) => void) : this{
        
        this.ele.addEventListener(event,fun);
        
        return this;
    };
};
function $$$ (id:string):ictJQuery{
    return new $$$class(id);
}
