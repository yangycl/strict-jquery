type IdMap = {[id:string]:HTMLElement};
interface $$$Type {
    getid:(id:string) => HTMLElement,
    getstr:(ele:HTMLElement) => string,
    gethtmlstr:(ele:HTMLElement) => string,
    getclass:(classname:string) => IdMap,
    append:(parent:HTMLElement,htmlstr:string) => HTMLElement
};
