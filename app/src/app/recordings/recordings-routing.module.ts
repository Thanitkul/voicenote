import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordingsComponent } from './recordings.component';

const routes: Routes = [{ path: '', component: RecordingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordingsRoutingModule { }
