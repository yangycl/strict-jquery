type IdMap = {[id:string]:HTMLElement};
interface $$$Type {
    getid:(id:string) => HTMLElement,
    getstr:(ele:HTMLElement) => string,
    gethtmlstr:(ele:HTMLElement) => string,
    getclass:(classname:string) => IdMap,
    append:(parent:HTMLElement,htmlstr:string) => HTMLElement
    getval:(ele:HTMLElement) => string,
    setval:(ele:HTMLInputElement,text:string) => void|never,
    css:(ele:HTMLElement,style?:Record<string,string>) => CSSStyleDeclaration|"this",
    attr:(ele:HTMLElement, key:string, value?:string) => "this" |string
}
interface ictJQuery {
    ele:HTMLElement,
    append:(htmlstr:string) => this,
    gethtmlstr:() => string,
    getstr:() => string,
    setstr:(str:string) => this,
    on:(event:string,fun:(ev: Event) => void) => this,
    val:(text?:string) => string|this
    css:(style?:Record<string,string>) => CSSStyleDeclaration | this
    attr:(key:string, value?:string) => this | string
}
declare function $$$(id:string) : ictJQuery;

