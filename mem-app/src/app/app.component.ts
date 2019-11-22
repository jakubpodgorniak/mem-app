import { Component, OnInit } from '@angular/core';
import { Card } from './models/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cards: Card[] = [];
  public guessedCards: Card[] = [];
  public correctAnswers = 0;
  public seconds = 0;

  public ngOnInit(): void {
    this.cards = this.generateCards();

    setInterval(() => {
      if (this.correctAnswers < 10) {
        this.seconds++;
      }
    }, 1000);
  }

  public show(card: Card): void {
    if (card.shown) {
      return;
    }

    card.shown = true;
    this.guessedCards.push(card);

    this.validateGuessedCards();
  }

  public reset(): void {
    this.cards = this.generateCards();
    this.guessedCards = [];
    this.correctAnswers = 0;
    this.seconds = 0;
  }

  private generateCards(): Card[] {
    const cards: Card[] = [];

    for (let i = 0; i < 10; i++) {
      cards.push({ value: i, shown: false, exposed: false });
      cards.push({ value: i, shown: false, exposed: false });
    }

    return this.shuffle(cards);
  }

  private validateGuessedCards(): void {
    if (this.guessedCards.length < 2) {
      return;
    }

    if (this.guessedCards.length === 2 && this.areGuessedCardsEqual()) {
      this.exposeGuessedCards();
      this.spliceGuessedCards();
      this.correctAnswers++;
    } else if (this.guessedCards.length === 3) {
      this.guessedCards[0].shown = false;
      this.guessedCards[1].shown = false;
      this.spliceGuessedCards();
    }
  }

  private areGuessedCardsEqual(): boolean {
    return this.guessedCards[0].value === this.guessedCards[1].value;
  }

  private exposeGuessedCards(): void {
    this.guessedCards[0].exposed = true;
    this.guessedCards[1].exposed = true;
  }

  private spliceGuessedCards(): void {
    this.guessedCards = this.guessedCards.splice(2);
  }

  private shuffle(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
