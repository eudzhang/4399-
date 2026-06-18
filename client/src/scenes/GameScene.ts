import Phaser from 'phaser';import {levels} from '../levels';import {gameSocket} from '../net/socket';import {SkinManager} from '../skins/SkinManager';import {WorldView} from '../entities/WorldView';import type {GameSnapshot} from '../types';
export class GameScene extends Phaser.Scene{
 private world?:WorldView;private level=-1;
 constructor(){super('game')}
 create(){this.world=new WorldView(this,new SkinManager());gameSocket.addEventListener('state',this.onState);if(gameSocket.snapshot)this.renderState(gameSocket.snapshot);}
 private onState=(e:Event)=>this.renderState((e as CustomEvent<GameSnapshot>).detail);
 private renderState(s:GameSnapshot){if(s.level!==this.level){this.level=s.level;this.world?.build(levels[s.level]);this.cameras.main.fadeIn(220)}this.world?.update(s)}
 shutdown(){gameSocket.removeEventListener('state',this.onState);this.world?.destroy()}
}
