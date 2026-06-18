export type PlayerId='p1'|'p2';
export interface Rect{x:number;y:number;w:number;h:number}
export interface InputState{left:boolean;right:boolean;jump:boolean}
export interface PlayerState extends Rect{id:PlayerId;connected:boolean;atExit:boolean}
export interface DoorState{id:string;open:boolean}
export interface ButtonState{id:string;pressed:boolean}
export interface KeyState{id:string;collected:boolean}
export interface GameSnapshot{roomCode:string;level:number;levelName:string;players:PlayerState[];doors:DoorState[];buttons:ButtonState[];keys:KeyState[];paused:boolean;complete:boolean;revision:number;resetMessage?:string}
export interface LevelData{id:string;name:string;spawn:Record<PlayerId,{x:number;y:number}>;platforms:Rect[];spikes:Rect[];buttons:(Rect&{id:string})[];doors:(Rect&{id:string;requires:{type:'button'|'key'|'allButtons';id?:string}})[];keys:(Rect&{id:string;opens:string})[];exit:Rect}
