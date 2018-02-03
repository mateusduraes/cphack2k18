import { Component } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  items = [
    {
      title: 'Alberto Souza',
      content: `Galera estou montando um grupo de estudos Java para virarmos a madrugada.`,
      icon: 'calendar',
      time: { subtitle: '03/02 - 10:35 PM' }
    },
    {
      title: 'Evelyn Rocha',
      content: `Alguém disponível para me dar umas dicas em PHP?`,
      icon: 'calendar',
      time: { subtitle: '02/02 - 10:20 PM' }
    },
    {
      title: 'João Dias',
      content: `Estou procurando pessoas para jogar junto. Aguardo vocês próximo ao palco principal.`,
      icon: 'calendar',
      time: { subtitle: '02/02 - 10:00 PM' }
    }
  ];
  constructor() { }
}
