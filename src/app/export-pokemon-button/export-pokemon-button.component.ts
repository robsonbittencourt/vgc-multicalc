import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pokemon } from 'src/lib/pokemon';
import { TeamExportModalComponent } from '../team-export-modal/team-export-modal.component';

@Component({
  selector: 'app-export-pokemon-button',
  templateUrl: './export-pokemon-button.component.html',
  styleUrls: ['./export-pokemon-button.component.scss']
})
export class ExportPokemonButtonComponent {

  @Input()
  pokemon: Pokemon

  constructor(
    private dialog: MatDialog
  ) { }

  @Input()
  show: boolean = true

  @Input()
  hidden: boolean = false

  exportPokemon() {
    this.dialog.open(TeamExportModalComponent, { 
      data: { 
        title: this.pokemon.name,
        content: this.pokemon.showdownTextFormat()
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }

}
