type IdMap = {[id:string]:HTMLElement};
interface $$$Type {
    getid:(id:string) => HTMLElement,
    getstr:(ele:HTMLElement) => string,
    gethtmlstr:(ele:HTMLElement) => string,
    getclass:(classname:string) => IdMap,
    append:(parent:HTMLElement,htmlstr:string) => HTMLElement
};
interface ictJQuery {
    ele:HTMLElement,
    append:(htmlstr:string) => this,
    gethtmlstr:() => string,
    getstr:() => string,
    setstr:(str:string) => this,
    on:(event:string,fun:(ev: Event) => void) => this
}
declare function $$$(id:string) : ictJQuery;

