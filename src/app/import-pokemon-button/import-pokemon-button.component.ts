import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Pokemon } from 'src/lib/pokemon';
import { TeamImportModalComponent } from '../team-import-modal/team-import-modal.component';

@Component({
  selector: 'app-import-pokemon-button',
  templateUrl: './import-pokemon-button.component.html',
  styleUrls: ['./import-pokemon-button.component.scss']
})
export class ImportPokemonButtonComponent {

  @Output() 
  pokemonImportedEvent = new EventEmitter<Pokemon>()

  constructor(
    private dialog: MatDialog,
    private pokePasteService: PokePasteParserService
  ) { }

  @Input()
  show: boolean = true

  @Input()
  hidden: boolean = false

  importPokemon() {
    const dialogRef = this.dialog.open(TeamImportModalComponent, { 
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      this.pokemonImportedEvent.emit(pokemonList[0])
    })
  }

}
