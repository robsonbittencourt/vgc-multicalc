      ${this.name} @ ${this.item}
      Ability: ${this.ability}
      Level: ${this.pokemonSmogon.level}
      Tera Type: ${this.teraType}\n      
    `;const e=this.evsDescriptionShowdown();e.length>0&&(i+=`EVs: ${e}\n`),i+=`${this.nature} Nature \n`;const a=this.ivsDescriptionShowdown();return a.length>0&&(i+=`IVs: ${a}\n`),i+=XN`
      - ${this.move1Name}
      - ${this.move2Name}
      - ${this.move3Name}
      - ${this.move4Name}\n