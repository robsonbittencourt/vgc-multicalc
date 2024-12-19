import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pokemon } from 'src/lib/model/pokemon';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { TeamImportModalComponent } from '../team-import-modal/team-import-modal.component';

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-import-pokemon-button',
  templateUrl: './import-pokemon-button.component.html',
  styleUrls: ['./import-pokemon-button.component.scss'],
  imports: [MatIcon]
})
export class ImportPokemonButtonComponent {

  show = input(true)
  hidden = input(false)

  pokemonImportedEvent = output<Pokemon>()

  private dialog = inject(MatDialog)
  private pokePasteService = inject(PokePasteParserService)

  importPokemon() {
    const dialogRef = this.dialog.open(TeamImportModalComponent, {
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      this.pokemonImportedEvent.emit(pokemonList[0])
    })
  }

}
