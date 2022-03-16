import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LiveChatComponent } from './live-chat.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [ LiveChatComponent ],
  declarations: [ LiveChatComponent ]
})
export class LiveChatModule {}
