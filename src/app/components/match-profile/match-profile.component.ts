import { MatchService } from './../../service/modules_service/match.service';
import { Match } from './../../models/match.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.css']
})
export class MatchProfileComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentMatch: Match = {
    date: '',
    result: '',
    homeTeam: '',
    visitTeam: '',
    visitPointGuard: '',
    visitShootingGuard: '',
    visitSmallForward: '',
    visitPowerForward: '',
    visitCenter: '',
    homePointGuard: '',
    homeShootingGuard: '',
    homeSmallForward: '',
    homePowerForward: '',
    homeCenter: ''
  };

  message = '';
  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMatch(this.route.snapshot.params["id"]);
    }
  }
  getMatch(id: string): void {
    this.matchService.get(id)
      .subscribe({
        next: (data) => {
          this.currentMatch = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateMatch(): void {
    this.message = '';
    this.matchService.update(this.currentMatch.id, this.currentMatch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Mecz został pomyślnie zaktualizowany!';
        },
        error: (e) => console.error(e)
      });
  }
  deleteMatch(): void {
    this.matchService.delete(this.currentMatch.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/matches']);
        },
        error: (e) => console.error(e)
      });
  }

}

