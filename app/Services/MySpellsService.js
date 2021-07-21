import { ProxyState } from "../AppState.js"
import Spell from "../Models/Spell.js"
import { sandbox } from "./AxiosService.js"

class MySpellsService {

  async getMySpells() {
    const res = await  sandbox.get()
    console.log('data from sandbox' ,res.data)
    ProxyState.mySpells = res.data.map(s => new Spell(s))
  }

  async addSpell() {
    const exists = ProxyState.mySpells.find(s=> s.name == ProxyState.activeSpell.name)
    if(exists){
      throw new Error("You already have that spell")
    }
    const res = await sandbox.post('', ProxyState.activeSpell)
    console.log('data spell from mySpall' ,res.data)
    let newSpell = new Spell(res.data)
    ProxyState.mySpells = [...ProxyState.mySpells, newSpell]
    ProxyState.activeSpell = newSpell;
  }

  async removeSpell() {
    const res = await sandbox.delete(ProxyState.activeSpell.id)
    console.log('data spell from mySpall' ,res.data)
    ProxyState.mySpells = ProxyState.mySpells.filter(m => m.id != ProxyState.activeSpell.id)
    //NOTE active Spell is now empty
    ProxyState.activeSpell = null

  }

  SetSpell(id) {
    let foundSpell = ProxyState.mySpells.find(s => s.id = id)
    if (!foundSpell) {
      throw new Error('Invalid spell id')
    }
    ProxyState.activeSpell = foundSpell
    ProxyState.mySpells = ProxyState.mySpells
  }
}

export const mySpellsService = new MySpellsService()