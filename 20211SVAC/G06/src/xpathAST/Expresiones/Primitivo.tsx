import { Entorno } from '../../xmlAST/Entorno';
import { Expression, Retorno } from "../../Interfaces/Expresion";
import { Simbolo } from '../../xmlAST/Simbolo';


export enum tipoPrimitivo {
    NUMBER,
    STRING,
    BOOL,
    NODO,
    ATRI,
    RESP,
    error
}

export class Primitivo implements Expression{
    
    constructor (
    public line : Number, 
    public column : Number, 
    public valor : any, 
    public tipoPrimitivo? : tipoPrimitivo) {}

    public execute(ent: Entorno, simboloPadre?:Simbolo) : Retorno {
        
        if (this.tipoPrimitivo === tipoPrimitivo.NUMBER) {
            return { value: Number(this.valor), type: tipoPrimitivo.NUMBER };
        }else if (this.tipoPrimitivo === tipoPrimitivo.STRING) {
            return { value: String(this.valor), type: tipoPrimitivo.STRING };
        }else if (this.valor == "position"){

            if (simboloPadre !== undefined){
                return {value: simboloPadre.pos, type: tipoPrimitivo.NUMBER}
            }else {
                return {value: ent.pos, type: tipoPrimitivo.NUMBER}
            }

        }else if (this.valor == "last"){

            if (simboloPadre !== undefined){
                return {value: simboloPadre.last, type: tipoPrimitivo.NUMBER}
            }else {
                return {value: ent.last, type: tipoPrimitivo.NUMBER}
            }
            
        }else {
            throw new Error("Error Semantico: no se reconoce el valor, Linea: "+this.line+"Column: "+this.column);
        }
    }

    public GraficarAST(texto:string):string {
        texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"" + this.valor.toString() + "\"];\n";
        return texto;
    }
}