import { ProxyState } from "../AppState.js"
import { mySpellsService } from "../Services/MySpellsService.js"

function _drawAll(){
  let template = ''
  const spells = ProxyState.mySpells
  const activeSpell = ProxyState.activeSpell || {}
  spells.forEach(s => template += `<li class="action" ${activeSpell.id == s.id ? 'text-primary' : ''} onclick="app.mySpellsController.SetSpell('${s.id}')">${s.name}</li>`)
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

  removeSpell(){
    try {
    mySpellsService.removeSpell()
    } catch(error){
      console.log('remove from mylist error:', error)
    }
  }

  SetSpell(id){
    try {
    mySpellsService.SetSpell(id)
    } catch(error){
      console.log('setting from mylist erre:', error)
    }
  }


}