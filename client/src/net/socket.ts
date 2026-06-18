import {io,Socket} from 'socket.io-client';
import type {GameSnapshot,InputState,PlayerId} from '../types';
type Ack={ok:boolean;error?:string;roomCode?:string;playerId?:PlayerId;sessionId?:string;snapshot?:GameSnapshot};
class GameSocket extends EventTarget{
  socket:Socket=io({autoConnect:true}); roomCode=''; playerId?:PlayerId; snapshot?:GameSnapshot;
  constructor(){super();this.socket.on('state',(s:GameSnapshot)=>{this.snapshot=s;this.roomCode=s.roomCode;this.dispatchEvent(new CustomEvent('state',{detail:s}));});this.socket.on('room:closed',()=>this.dispatchEvent(new Event('closed')));this.socket.on('connect',()=>this.tryReconnect());}
  private tryReconnect(){const raw=localStorage.getItem('dlm-session');if(!raw)return;const saved=JSON.parse(raw);this.socket.emit('room:reconnect',saved,(a:Ack)=>{if(a.ok)this.accept(a);});}
  private accept(a:Ack){if(!a.ok||!a.roomCode||!a.playerId||!a.sessionId)return;this.roomCode=a.roomCode;this.playerId=a.playerId;localStorage.setItem('dlm-session',JSON.stringify({roomCode:a.roomCode,sessionId:a.sessionId}));if(a.snapshot){this.snapshot=a.snapshot;this.dispatchEvent(new CustomEvent('state',{detail:a.snapshot}));}}
  create(){return new Promise<Ack>(r=>this.socket.emit('room:create',(a:Ack)=>{if(a.ok)this.accept(a);r(a);}));}
  join(roomCode:string){return new Promise<Ack>(r=>this.socket.emit('room:join',{roomCode},(a:Ack)=>{if(a.ok)this.accept(a);r(a);}));}
  input(input:InputState){if(this.roomCode)this.socket.emit('player:input',{roomCode:this.roomCode,input});}
  restart(){this.socket.emit('game:restart',{roomCode:this.roomCode});}
  leave(){localStorage.removeItem('dlm-session');this.socket.emit('room:leave',{roomCode:this.roomCode});this.roomCode='';this.snapshot=undefined;}
}
export const gameSocket=new GameSocket();
