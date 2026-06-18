import type {InputState} from '../types';
export class VirtualControls{
  state:InputState={left:false,right:false,jump:false}; private keys=new Set<string>(); private onChange:(s:InputState)=>void;
  constructor(root:HTMLElement,onChange:(s:InputState)=>void){this.onChange=onChange;root.innerHTML='<div class="controls"><div class="move"><button data-key="left" aria-label="向左">◀</button><button data-key="right" aria-label="向右">▶</button></div><button class="jump" data-key="jump">跳</button></div>';root.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(b=>{const k=b.dataset.key as keyof InputState;const set=(v:boolean,e:Event)=>{e.preventDefault();this.state[k]=v;b.classList.toggle('pressed',v);this.emit();};b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);set(true,e)});['pointerup','pointercancel','lostpointercapture'].forEach(n=>b.addEventListener(n,e=>set(false,e)));});window.addEventListener('keydown',this.keyDown);window.addEventListener('keyup',this.keyUp);}
  private keyDown=(e:KeyboardEvent)=>{if(['ArrowLeft','KeyA'].includes(e.code))this.keys.add('left');if(['ArrowRight','KeyD'].includes(e.code))this.keys.add('right');if(['ArrowUp','KeyW','Space'].includes(e.code))this.keys.add('jump');this.syncKeys();};
  private keyUp=(e:KeyboardEvent)=>{if(['ArrowLeft','KeyA'].includes(e.code))this.keys.delete('left');if(['ArrowRight','KeyD'].includes(e.code))this.keys.delete('right');if(['ArrowUp','KeyW','Space'].includes(e.code))this.keys.delete('jump');this.syncKeys();};
  private syncKeys(){this.state={left:this.keys.has('left'),right:this.keys.has('right'),jump:this.keys.has('jump')};this.emit();}
  private emit(){this.onChange({...this.state});}
  destroy(){window.removeEventListener('keydown',this.keyDown);window.removeEventListener('keyup',this.keyUp);}
}
