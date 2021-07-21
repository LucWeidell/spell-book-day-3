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
    const res = await sandbox.post('', ProxyState.activeSpell)
    console.log('data spell from mySpall' ,res.data)
    ProxyState.mySpells = [...ProxyState.mySpells, new Spell(res.data)]
  }

}

export const mySpellsService = new MySpellsService()