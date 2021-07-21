import { ProxyState } from "../AppState.js"
import { dndApiSpellsService } from "../Services/DndApiSpellsService.js"


function _drawAll(){
  const spells = ProxyState.allDndApiSpells
  let template = ''
  spells.forEach(s => template += `<li class="action" onclick="app.dndApiSpellsController.getSpell('${s.index}')">${s.name}</li>`)
  document.getElementById('api-spells').innerHTML = template
}

function _drawActiveSpell() {
  document.getElementById('active-spell').innerHTML = ProxyState.activeSpell.Template
}

export default class DndApiSpellsController{

  constructor() {
    ProxyState.on('allDndApiSpells',_drawAll)
    ProxyState.on('activeSpell',_drawActiveSpell)

    this.getAllSpells()
  }

  async getAllSpells(){
    try{
      await dndApiSpellsService.getAllSpells()
    } catch (error) {
      console.log('all spells error:', error)
    }
  }

  async getSpell(id) {
    try{
      await dndApiSpellsService.getSpell(id)
    } catch (error) {
    console.log('get Spell error', error)
    }
  }
}