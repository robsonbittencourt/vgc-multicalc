import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pokemon } from 'src/lib/pokemon';
import { TeamExportModalComponent } from '../team-export-modal/team-export-modal.component';

import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-export-pokemon-button',
    templateUrl: './export-pokemon-button.component.html',
    styleUrls: ['./export-pokemon-button.component.scss'],
    standalone: true,
    imports: [MatIcon]
})
export class ExportPokemonButtonComponent {
  
  @Input()
  pokemon: Pokemon

  @Input()
  show: boolean = true

  @Input()
  hidden: boolean = false

  private dialog = inject(MatDialog)

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
