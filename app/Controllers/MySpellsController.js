import { ProxyState } from "../AppState.js"
import { mySpellsService } from "../Services/MySpellsService.js"

function _drawAll(){
  let template = ''
  const spells = ProxyState.mySpells
  spells.forEach(s => template += `<li class="action" onclick="app.mySpellsController.SetSpell('${s.id}')">${s.name}</li>`)
  if(!template){
    template += `<li>No Spells in Book</li>`
  }
  document.getElementById('my-spells').innerHTML = template
}

export default class MySpellsController {

  constructor(){
    ProxyState.on('mySpells', _drawAll)

    this.getMySpells()
  }

  async getMySpells(){
    try{
      await mySpellsService.getMySpells()
    } catch (error) {
      console.log('error getting snadbox spells', error)
    }
  }

  async addSpell(){
    try{
      await mySpellsService.addSpell()
    } catch (error) {
      console.log('error adding spell to snadbox', error)
    }
  }
}