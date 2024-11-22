import { Component, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FieldStore } from 'src/data/field-store';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  standalone: true,
  imports: [MatButtonToggleGroup, MatButtonToggle]
})
export class FieldComponent {
  
  fieldStore = inject(FieldStore)

}
